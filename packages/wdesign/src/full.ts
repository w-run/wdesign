// =============================================================
//  wdesign — 全量注册插件
//
//    import WdUI from '@w-run/wdesign/full'
//    app.use(WdUI)
//
//  ⚠️ 这个入口会引入全部组件（体积最大），只在确实用到大部分组件时选择。
//     按需引入请用：import { WdButton } from "@w-run/wdesign"
// =============================================================
import type { App, Plugin } from 'vue'
import WdAccordion from './components/WdAccordion.vue'
import WdAccordionItem from './components/WdAccordionItem.vue'
import WdAffix from './components/WdAffix.vue'
import WdAiMessage from './components/WdAiMessage.vue'
import WdAlert from './components/WdAlert.vue'
import WdAudioPlayer from './components/WdAudioPlayer.vue'
import WdAvatar from './components/WdAvatar.vue'
import WdAvatarGroup from './components/WdAvatarGroup.vue'
import WdBacktop from './components/WdBacktop.vue'
import WdBadge from './components/WdBadge.vue'
import WdBreadcrumb from './components/WdBreadcrumb.vue'
import WdButton from './components/WdButton.vue'
import WdCard from './components/WdCard.vue'
import WdCarousel from './components/WdCarousel.vue'
import WdCascader from './components/WdCascader.vue'
import WdCheckbox from './components/WdCheckbox.vue'
import WdCollapse from './components/WdCollapse.vue'
import WdCommand from './components/WdCommand.vue'
import WdContainer from './components/WdContainer.vue'
import WdDatePicker from './components/WdDatePicker.vue'
import WdDescriptions from './components/WdDescriptions.vue'
import WdDivider from './components/WdDivider.vue'
import WdDrawer from './components/WdDrawer.vue'
import WdDropdown from './components/WdDropdown.vue'
import WdEmpty from './components/WdEmpty.vue'
import WdExplorer from './components/WdExplorer.vue'
import WdFileList from './components/WdFileList.vue'
import WdForm from './components/WdForm.vue'
import WdFormItem from './components/WdFormItem.vue'
import WdGrid from './components/WdGrid.vue'
import WdGroup from './components/WdGroup.vue'
import WdImagePreview from './components/WdImagePreview.vue'
import WdInput from './components/WdInput.vue'
import WdListItem from './components/WdListItem.vue'
import WdMarkdown from './components/WdMarkdown.vue'
import WdModal from './components/WdModal.vue'
import WdNotification from './components/WdNotification.vue'
import WdOtp from './components/WdOtp.vue'
import WdPagination from './components/WdPagination.vue'
import WdPopconfirm from './components/WdPopconfirm.vue'
import WdPopover from './components/WdPopover.vue'
import WdPostItem from './components/WdPostItem.vue'
import WdProgress from './components/WdProgress.vue'
import WdQRCode from './components/WdQRCode.vue'
import WdRadioGroup from './components/WdRadioGroup.vue'
import WdRate from './components/WdRate.vue'
import WdResult from './components/WdResult.vue'
import WdScrollbar from './components/WdScrollbar.vue'
import WdSegmented from './components/WdSegmented.vue'
import WdSelect from './components/WdSelect.vue'
import WdSkeleton from './components/WdSkeleton.vue'
import WdSlider from './components/WdSlider.vue'
import WdSortableList from './components/WdSortableList.vue'
import WdSpace from './components/WdSpace.vue'
import WdSpinner from './components/WdSpinner.vue'
import WdStatistic from './components/WdStatistic.vue'
import WdSteps from './components/WdSteps.vue'
import WdSwitch from './components/WdSwitch.vue'
import WdTable from './components/WdTable.vue'
import WdTabs from './components/WdTabs.vue'
import WdTag from './components/WdTag.vue'
import WdTimeline from './components/WdTimeline.vue'
import WdTooltip from './components/WdTooltip.vue'
import WdTransfer from './components/WdTransfer.vue'
import WdTree from './components/WdTree.vue'
import WdUpload from './components/WdUpload.vue'
import WdVideoPlayer from './components/WdVideoPlayer.vue'
import WdVirtualList from './components/WdVirtualList.vue'
import WdWatermark from './components/WdWatermark.vue'

const components = [
  WdAccordion,
  WdAccordionItem,
  WdAffix,
  WdAiMessage,
  WdAlert,
  WdAudioPlayer,
  WdAvatar,
  WdAvatarGroup,
  WdBacktop,
  WdBadge,
  WdBreadcrumb,
  WdButton,
  WdCard,
  WdCarousel,
  WdCascader,
  WdCheckbox,
  WdCollapse,
  WdCommand,
  WdContainer,
  WdDatePicker,
  WdDescriptions,
  WdDivider,
  WdDrawer,
  WdDropdown,
  WdEmpty,
  WdExplorer,
  WdFileList,
  WdForm,
  WdFormItem,
  WdGrid,
  WdGroup,
  WdImagePreview,
  WdInput,
  WdListItem,
  WdMarkdown,
  WdModal,
  WdNotification,
  WdOtp,
  WdPagination,
  WdPopconfirm,
  WdPopover,
  WdPostItem,
  WdProgress,
  WdQRCode,
  WdRadioGroup,
  WdRate,
  WdResult,
  WdScrollbar,
  WdSegmented,
  WdSelect,
  WdSkeleton,
  WdSlider,
  WdSortableList,
  WdSpace,
  WdSpinner,
  WdStatistic,
  WdSteps,
  WdSwitch,
  WdTable,
  WdTabs,
  WdTag,
  WdTimeline,
  WdTooltip,
  WdTransfer,
  WdTree,
  WdUpload,
  WdVideoPlayer,
  WdVirtualList,
  WdWatermark,
]

export const WdUI: Plugin = {
  install(app: App) {
    for (const component of components) {
      const name = (component as { name?: string }).name
      if (name) app.component(name, component)
    }
  },
}

export default WdUI

// 同时透出具名导出，方便 `import WdUI, { WdButton } from "@w-run/wdesign/full"`
export * from './index'
