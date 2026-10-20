#!/usr/bin/env python3
"""
把手写的内联 SVG 替换为 WdIcon。

为什么必须这么做：
  1. 手写 SVG 无法跟随图标库迭代（图标改了，组件里的副本不会变）
  2. 各组件各写一份，描边粗细/圆角/光学尺寸不一致
  3. 增加包体积：每个 SVG 都是一段重复的 path 字符串
  4. 无法利用预加载与缓存 —— WdIcon 有 registry 缓存，手写的没有

策略：
  按「出现顺序」精确替换，每条规则只作用于指定文件。
  宁少勿错：匹配不到的跳过并报告，不猜。
"""
import re
import sys
from pathlib import Path

SRC = Path(__file__).resolve().parent.parent / 'src/components'

# (文件, 原始 SVG 的识别特征(正则), 替换成, 出现次数上限)
# 特征尽量取 path 的 d 值片段 —— 这是每个图标最稳定的指纹
RULES = [
    # ---------------- 关闭 X ----------------
    ('WdTabs.vue',
     r'<svg width="10" height="10"[^>]*><path d="M6 6l12 12M18 6 6 18"></path></svg>',
     '<wd-icon name="close" :size="10" />'),

    ('WdModal.vue',
     r'<svg width="15" height="15"[^>]*stroke-width="2.6"[^>]*><path d="M6 6l12 12M18 6 6 18"></path></svg>',
     '<wd-icon name="close" :size="15" />'),

    ('WdDrawer.vue',
     r'<svg width="15" height="15"[^>]*stroke-width="2.6"[^>]*><path d="M6 6l12 12M18 6 6 18"></path></svg>',
     '<wd-icon name="close" :size="15" />'),

    ('WdNotification.vue',
     r'<svg width="13" height="13"[^>]*><path d="M6 6l12 12M18 6 6 18"></path></svg>',
     '<wd-icon name="close" :size="13" />'),

    ('WdInput.vue',
     r'<svg width="13" height="13"[^>]*><path d="M6 6l12 12M18 6 6 18"></path></svg>',
     '<wd-icon name="close" :size="13" />'),

    ('WdImagePreview.vue',
     r'<svg width="13" height="13"[^>]*><path d="M6 6l12 12M18 6 6 18"></path></svg>',
     '<wd-icon name="close" :size="13" />'),

    # ---------------- 加号 ----------------
    ('WdTabs.vue',
     r'<svg width="14" height="14"[^>]*stroke-width="2.6"[^>]*><path d="M12 5v14M5 12h14"></path></svg>',
     '<wd-icon name="plus" :size="14" />'),

    # ---------------- 箭头（分页 / 轮播） ----------------
    ('WdPagination.vue',
     r'<svg width="14" height="14"[^>]*><path d="m15 18-6-6 6-6"></path></svg>',
     '<wd-icon name="chevron-left" :size="14" />'),
    ('WdPagination.vue',
     r'<svg width="14" height="14"[^>]*><path d="m9 6 6 6-6 6"></path></svg>',
     '<wd-icon name="chevron-right" :size="14" />'),

    ('WdCarousel.vue',
     r'<svg width="15" height="15"[^>]*><path d="m15 18-6-6 6-6"></path></svg>',
     '<wd-icon name="chevron-left" :size="15" />'),
    ('WdCarousel.vue',
     r'<svg width="15" height="15"[^>]*><path d="m9 6 6 6-6 6"></path></svg>',
     '<wd-icon name="chevron-right" :size="15" />'),

    # ---------------- 树 / 文件列表的展开箭头 ----------------
    ('WdTree.vue',
     r'<svg v-if="entry\.node\.children\?\.length" width="10" height="10"[^>]*><path d="m9 6 6 6-6 6"></path></svg>',
     '<wd-icon v-if="entry.node.children?.length" name="caret-right" :size="10" />'),

    # ---------------- 日期选择器 ----------------
    ('WdDatePicker.vue',
     r'<svg class="wd-datepicker__icon" width="15" height="15"[^>]*>.*?</svg>',
     '<wd-icon class="wd-datepicker__icon" name="calendar" :size="15" />'),
    ('WdDatePicker.vue',
     r'<svg width="14" height="14"[^>]*><path d="m15 18-6-6 6-6"></path></svg>',
     '<wd-icon name="chevron-left" :size="14" />'),
    ('WdDatePicker.vue',
     r'<svg width="14" height="14"[^>]*><path d="m9 6 6 6-6 6"></path></svg>',
     '<wd-icon name="chevron-right" :size="14" />'),

    # ---------------- 提示 / 状态 ----------------
    ('WdAlert.vue',
     r'<svg width="14" height="14"[^>]*>.*?</svg>',
     '<wd-icon name="warning-circle" :size="14" />'),

    ('WdPopconfirm.vue',
     r'<svg width="14" height="14"[^>]*stroke-width="2.4"[^>]*>.*?</svg>',
     '<wd-icon name="warning-circle" :size="14" />'),

    # ---------------- 搜索 ----------------
    ('WdCommand.vue',
     r'<svg class="wd-command__search-icon" width="16" height="16"[^>]*>.*?</svg>',
     '<wd-icon class="wd-command__search-icon" name="search" :size="16" />'),

    # ---------------- 空状态 ----------------
    ('WdEmpty.vue',
     r'<svg width="30" height="30"[^>]*>.*?</svg>',
     '<wd-icon name="tray" :size="30" style="opacity:.5" />'),

    # ---------------- 上传 ----------------
    ('WdUpload.vue',
     r'<svg width="34" height="34"[^>]*>.*?</svg>',
     '<wd-icon name="upload" :size="30" />'),
    ('WdUpload.vue',
     r'<svg width="16" height="16"[^>]*fill="currentColor"[^>]*><path d="M6 4a2 2 0 0 1 2-2h6\.6L20 7\.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"></path></svg>',
     '<wd-icon name="file" :size="16" />'),
    ('WdUpload.vue',
     r'<svg width="13" height="13"[^>]*><path d="M6 6l12 12M18 6 6 18"></path></svg>',
     '<wd-icon name="close" :size="13" />'),

    # ---------------- 复选框勾 ----------------
    ('WdCheckbox.vue',
     r'<svg width="13" height="13"[^>]*stroke-width="3\.4"[^>]*><path d="m4\.5 12\.5 5 5 10-11"></path></svg>',
     '<wd-icon name="check" :size="13" />'),

    ('WdSteps.vue',
     r'<svg v-if="state\(i\) === \'finish\'" width="13" height="13"[^>]*>.*?</svg>',
     '<wd-icon v-if="state(i) === \'finish\'" name="check" :size="13" />'),

    # ---------------- 表格勾选 ----------------
    ('WdTable.vue',
     r'<svg v-if="someChecked && !allChecked" width="10" height="10"[^>]*><path d="M6 12h12"></path></svg>',
     '<wd-icon v-if="someChecked && !allChecked" name="minus" :size="10" />'),
    ('WdTable.vue',
     r'<svg v-else-if="allChecked" width="10" height="10"[^>]*>.*?</svg>',
     '<wd-icon v-else-if="allChecked" name="check" :size="10" />'),
    ('WdTable.vue',
     r'<svg v-if="selected\.includes\(row\)" width="10" height="10"[^>]*>.*?</svg>',
     '<wd-icon v-if="selected.includes(row)" name="check" :size="10" />'),

    # ---------------- 选择器 ----------------
    ('WdSelect.vue',
     r'<svg width="10" height="10"[^>]*><path d="M6 6l12 12M18 6 6 18"></path></svg>',
     '<wd-icon name="close" :size="10" />'),
    ('WdSelect.vue',
     r'<svg v-if="selected\.includes\(o\.value\)" class="wd-select__option-mark" width="14" height="14"[^>]*>.*?</svg>',
     '<wd-icon v-if="selected.includes(o.value)" class="wd-select__option-mark" name="check" :size="14" />'),

    # ---------------- 评分星 ----------------
    ('WdRate.vue',
     r'<svg width="22" height="22"[^>]*fill="currentColor"[^>]*><path d="M12 2\.8l2\.7 5\.7 6\.3\.8-4\.6 4\.3 1\.2 6\.2-5\.6-3-5\.6 3 1\.2-6\.2-4\.6-4\.3 6\.3-\.8z"></path></svg>',
     '<wd-icon name="star" :size="22" />'),

    # ---------------- 结果页图标 ----------------
    ('WdResult.vue',
     r'<svg v-if="status === \'success\'" width="30" height="30"[^>]*>.*?</svg>',
     '<wd-icon v-if="status === \'success\'" name="check-circle" :size="30" />'),
    ('WdResult.vue',
     r'<svg v-else-if="status === \'warning\'" width="30" height="30"[^>]*>.*?</svg>',
     '<wd-icon v-else-if="status === \'warning\'" name="warning-circle" :size="30" />'),
    ('WdResult.vue',
     r'<svg v-else-if="status === \'error\'" width="30" height="30"[^>]*>.*?</svg>',
     '<wd-icon v-else-if="status === \'error\'" name="close-circle" :size="30" />'),
    ('WdResult.vue',
     r'<svg v-else width="30" height="30"[^>]*>.*?</svg>',
     '<wd-icon v-else name="info-circle" :size="30" />'),

    # ---------------- 拖拽手柄 ----------------
    ('WdSortableList.vue',
     r'<svg width="14" height="14"[^>]*><circle cx="9" cy="6" r="1\.6"></circle>.*?</svg>',
     '<wd-icon name="dots-six-vertical" :size="14" />'),

    # ---------------- 播放器 ----------------
    ('WdVideoPlayer.vue',
     r'<svg width="30" height="30" viewBox="0 0 256 256" fill="currentColor"><path d="M92 40v176l132-88z"></path></svg>',
     '<wd-icon name="play" :variant="iconStyle" :size="30" />'),

    ('WdAudioPlayer.vue',
     r'<svg v-if="playing" width="16" height="16" viewBox="0 0 256 256" fill="currentColor">.*?</svg>',
     '<wd-icon v-if="playing" name="pause" :variant="iconStyle" :size="16" />'),
    ('WdAudioPlayer.vue',
     r'<svg v-else width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M92 40v176l132-88z"></path></svg>',
     '<wd-icon v-else name="play" :variant="iconStyle" :size="16" />'),
    ('WdAudioPlayer.vue',
     r'<svg v-if="muted \|\| volume === 0" width="15" height="15"[^>]*>.*?</svg>',
     '<wd-icon v-if="muted || volume === 0" name="volume-mute" :variant="iconStyle" :size="15" />'),
    ('WdAudioPlayer.vue',
     r'<svg v-else width="15" height="15"[^>]*>.*?</svg>',
     '<wd-icon v-else name="volume-up" :variant="iconStyle" :size="15" />'),
]


def main():
    applied, missed = 0, []
    for fname, pattern, repl in RULES:
        path = SRC / fname
        if not path.exists():
            missed.append(f'{fname}: 文件不存在')
            continue
        text = path.read_text(encoding='utf-8')
        # DOTALL 让 .*? 能跨行
        new, n = re.subn(pattern, repl, text, count=1, flags=re.S)
        if n:
            path.write_text(new, encoding='utf-8')
            applied += 1
        else:
            missed.append(f'{fname}: 未匹配 → {pattern[:60]}')

    print(f'✅ 替换 {applied} 处')
    if missed:
        print(f'\n⚠️ {len(missed)} 条未生效：')
        for m in missed:
            print('  ', m)
    return 0 if not missed else 1


if __name__ == '__main__':
    sys.exit(main())
