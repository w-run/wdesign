// .lib-build/WdIcon.ts
import { defineComponent as _defineComponent } from "vue";
import { normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
import { computed, ref, watchEffect } from "vue";

// .lib-build/optical.ts
var OPTICAL_TALL = /* @__PURE__ */ new Set([
  // 33 个
  "arrow-down",
  "arrow-down-left",
  "arrow-down-right",
  "arrow-left",
  "arrow-right",
  "arrow-up",
  "arrow-up-left",
  "arrow-up-right",
  "check",
  "chevron-down",
  "chevron-left",
  "chevron-left-alt",
  "chevron-left-double-alt",
  "chevron-right",
  "chevron-right-alt",
  "chevron-right-double-alt",
  "chevron-up",
  "chevrons-down",
  "chevrons-left",
  "chevrons-right",
  "chevrons-up",
  "command-line",
  "dots-drag",
  "dots-horizontal",
  "dots-vertical",
  "hr-line",
  "list",
  "menu",
  "minus",
  "pause",
  "play",
  "plus",
  "point"
]);
var OPTICAL_LIGHT = /* @__PURE__ */ new Set([
  // 20 个
  "activity",
  "circle-alt",
  "close",
  "corner-down-left",
  "corner-down-right",
  "corner-left-down",
  "corner-left-up",
  "corner-right-down",
  "corner-right-up",
  "corner-up-left",
  "corner-up-right",
  "eye-off",
  "git-commit",
  "italic",
  "maximize",
  "minimize",
  "text",
  "trending-down",
  "trending-up",
  "zoom-in-arrow"
]);
var OPTICAL_HEAVY = /* @__PURE__ */ new Set([
  // 49 个
  "ad",
  "apps",
  "arrow-down-circle",
  "arrow-right-circle",
  "arrow-up-circle",
  "board",
  "box-back",
  "box-go",
  "box-ok",
  "box-prize",
  "brackets",
  "calculator",
  "cancel",
  "check-circle",
  "clipboard",
  "clock",
  "close-circle",
  "develop",
  "file",
  "file-minus",
  "file-plus",
  "folder",
  "folder-manage",
  "folder-minus",
  "folder-plus",
  "folders",
  "help-circle",
  "id-card",
  "identity",
  "image",
  "info-circle",
  "language",
  "layout-dashboard",
  "layout-grid",
  "message",
  "message-circle",
  "message-read",
  "minus-circle",
  "minus-square",
  "money-bag",
  "monitor",
  "pause-circle",
  "pip",
  "plus-circle",
  "plus-square",
  "shopping-bag",
  "ticket",
  "video",
  "warning-circle"
]);
var DEFAULT_OPTICAL = {
  tall: 1.14,
  light: 1.08,
  heavy: 0.97,
  shrinkHeavy: true
};
function opticalFactor(name, opts = DEFAULT_OPTICAL) {
  const o = { ...DEFAULT_OPTICAL, ...opts };
  if (OPTICAL_TALL.has(name)) return o.tall;
  if (OPTICAL_LIGHT.has(name)) return o.light;
  if (o.shrinkHeavy && OPTICAL_HEAVY.has(name)) return o.heavy;
  return 1;
}

// .lib-build/registry.ts
var cache = /* @__PURE__ */ new Map();
var inflight = /* @__PURE__ */ new Map();
function inlineData() {
  return globalThis.WD_ICONS;
}
var loaders = {};
function styleOrder(style) {
  return style === "filled" ? ["filled", "outlined"] : ["outlined", "filled"];
}
function getIconSync(name, style = "outlined") {
  for (const st of styleOrder(style)) {
    const hit = cache.get(`${st}/${name}`);
    if (hit) return hit;
  }
  return void 0;
}
function getIcon(name, style = "outlined") {
  const hit = getIconSync(name, style);
  if (hit) return Promise.resolve(hit);
  const key = `${style}/${name}`;
  const pending = inflight.get(key);
  if (pending) return pending;
  const task = (async () => {
    const inline = inlineData();
    for (const st of styleOrder(style)) {
      const path = `../icons/${st}/${name}.svg`;
      if (loaders[path]) {
        try {
          const raw2 = await loaders[path]();
          cache.set(`${st}/${name}`, raw2);
          return raw2;
        } catch {
        }
      }
      const raw = inline?.[`${st}/${name}`];
      if (raw) {
        cache.set(`${st}/${name}`, raw);
        return raw;
      }
    }
    return void 0;
  })();
  inflight.set(key, task);
  task.finally(() => inflight.delete(key));
  return task;
}
async function preloadIcons(names, style = "outlined") {
  const results = await Promise.all(names.map((n) => getIcon(n, style)));
  return results.filter(Boolean).length;
}
function injectIcons(map) {
  for (const [k, v] of Object.entries(map)) {
    if (v) cache.set(k, v);
  }
}

// .lib-build/WdIcon.ts
var _hoisted_1 = ["innerHTML"];
var WdIcon_default = /* @__PURE__ */ _defineComponent({
  ...{ name: "WdIcon" },
  __name: "WdIcon",
  props: {
    name: { type: String, required: true },
    variant: { type: String, required: false, default: "outlined" },
    size: { type: [Number, String], required: false, default: 24 },
    filled: { type: Boolean, required: false, default: false },
    optical: { type: Boolean, required: false, default: true }
  },
  setup(__props) {
    const props = __props;
    const svg = ref("");
    const resolvedStyle = computed(() => props.filled ? "filled" : props.variant);
    const factor = computed(() => props.optical ? opticalFactor(props.name) : 1);
    const sizePx = computed(() => {
      const base = typeof props.size === "number" ? props.size : parseFloat(props.size) || 24;
      return `${Math.round(base * factor.value * 100) / 100}px`;
    });
    watchEffect(() => {
      const name = props.name;
      const style = resolvedStyle.value;
      const hit = getIconSync(name, style);
      if (hit) {
        svg.value = hit;
        return;
      }
      let alive = true;
      getIcon(name, style).then((raw) => {
        if (alive) svg.value = raw ?? "";
      });
      return () => {
        alive = false;
      };
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("span", {
        class: _normalizeClass(["wd-icon", { "wd-icon--optical": factor.value !== 1 }]),
        style: _normalizeStyle({ width: sizePx.value, height: sizePx.value }),
        innerHTML: svg.value
      }, null, 14, _hoisted_1);
    };
  }
});

// .lib-build/WdAiMessage.ts
import { defineComponent as _defineComponent2 } from "vue";
import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createCommentVNode as _createCommentVNode, createTextVNode as _createTextVNode, openBlock as _openBlock2, createElementBlock as _createElementBlock2, resolveComponent as _resolveComponent, createVNode as _createVNode, normalizeClass as _normalizeClass2, renderList as _renderList, Fragment as _Fragment } from "vue";
import { onBeforeUnmount, ref as ref2, watch } from "vue";
var _hoisted_12 = { class: "wd-ai-msg__avatar" };
var _hoisted_2 = { class: "wd-ai-msg__bubble" };
var _hoisted_3 = {
  key: 0,
  class: "wd-ai-msg__thinking"
};
var _hoisted_4 = { class: "wd-ai-msg__reasoning-state" };
var _hoisted_5 = { class: "wd-ai-msg__reasoning-body" };
var _hoisted_6 = { class: "wd-ai-msg__reasoning-inner" };
var _hoisted_7 = { class: "wd-ai-msg__reasoning-text" };
var _hoisted_8 = {
  key: 0,
  class: "wd-ai-msg__cursor"
};
var _hoisted_9 = {
  key: 2,
  class: "wd-ai-msg__text"
};
var _hoisted_10 = {
  key: 0,
  class: "wd-ai-msg__cursor"
};
var _hoisted_11 = {
  key: 3,
  class: "wd-ai-msg__actions"
};
var _hoisted_122 = ["onClick"];
var WdAiMessage_default = /* @__PURE__ */ _defineComponent2({
  ...{ name: "WdAiMessage" },
  __name: "WdAiMessage",
  props: {
    content: { type: String, required: false, default: "" },
    reasoning: { type: String, required: false, default: "" },
    self: { type: Boolean, required: false, default: false },
    thinking: { type: Boolean, required: false, default: false },
    streaming: { type: Boolean, required: false, default: false },
    reasoningStreaming: { type: Boolean, required: false, default: false },
    speed: { type: Number, required: false, default: 24 },
    actions: { type: Array, required: false, default: () => [] },
    defaultReasoningOpen: { type: Boolean, required: false, default: true }
  },
  emits: ["action", "stream-end", "reasoning-end"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const shown = ref2(props.content);
    const shownReasoning = ref2(props.reasoning);
    const reasoningOpen = ref2(props.defaultReasoningOpen);
    let contentTimer = null;
    let reasoningTimer = null;
    function stopContent() {
      if (contentTimer) {
        window.clearInterval(contentTimer);
        contentTimer = null;
      }
    }
    function stopReasoning() {
      if (reasoningTimer) {
        window.clearInterval(reasoningTimer);
        reasoningTimer = null;
      }
    }
    function startContent() {
      stopContent();
      shown.value = "";
      let i = 0;
      contentTimer = window.setInterval(() => {
        i += 1;
        shown.value = props.content.slice(0, i);
        if (i >= props.content.length) {
          stopContent();
          emit("stream-end");
        }
      }, Math.max(8, props.speed));
    }
    function startReasoning() {
      stopReasoning();
      shownReasoning.value = "";
      let i = 0;
      reasoningTimer = window.setInterval(() => {
        i += 1;
        shownReasoning.value = props.reasoning.slice(0, i);
        if (i >= props.reasoning.length) {
          stopReasoning();
          emit("reasoning-end");
          if (props.defaultReasoningOpen) reasoningOpen.value = false;
        }
      }, Math.max(8, props.speed));
    }
    watch(
      () => props.streaming,
      (v) => {
        if (v) startContent();
        else {
          stopContent();
          shown.value = props.content;
        }
      },
      { immediate: true }
    );
    watch(
      () => props.reasoningStreaming,
      (v) => {
        if (v) startReasoning();
        else {
          stopReasoning();
          shownReasoning.value = props.reasoning;
        }
      },
      { immediate: true }
    );
    watch(
      () => props.content,
      (v) => {
        if (!props.streaming) shown.value = v;
      }
    );
    watch(
      () => props.reasoning,
      (v) => {
        if (!props.reasoningStreaming) shownReasoning.value = v;
      }
    );
    onBeforeUnmount(() => {
      stopContent();
      stopReasoning();
    });
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent("wd-icon");
      return _openBlock2(), _createElementBlock2(
        "div",
        {
          class: _normalizeClass2(["wd-ai-msg", { "wd-ai-msg--self": __props.self }])
        },
        [
          _createElementVNode(
            "span",
            _hoisted_12,
            _toDisplayString(__props.self ? "\u6211" : "AI"),
            1
            /* TEXT */
          ),
          _createElementVNode("div", _hoisted_2, [
            _createCommentVNode(" \u6DF1\u5EA6\u601D\u8003\uFF08reasoning_content\uFF09\uFF1A\u72EC\u7ACB\u533A\u57DF\uFF0C\u53EF\u6298\u53E0 "),
            __props.thinking && !shownReasoning.value ? (_openBlock2(), _createElementBlock2("div", _hoisted_3, [..._cache[1] || (_cache[1] = [
              _createElementVNode(
                "i",
                null,
                null,
                -1
                /* CACHED */
              ),
              _createElementVNode(
                "i",
                null,
                null,
                -1
                /* CACHED */
              ),
              _createElementVNode(
                "i",
                null,
                null,
                -1
                /* CACHED */
              ),
              _createTextVNode(
                "\u6DF1\u5EA6\u601D\u8003\u4E2D\u2026 ",
                -1
                /* CACHED */
              )
            ])])) : _createCommentVNode("v-if", true),
            shownReasoning.value ? (_openBlock2(), _createElementBlock2(
              "div",
              {
                key: 1,
                class: _normalizeClass2(["wd-ai-msg__reasoning", { "wd-ai-msg__reasoning--open": reasoningOpen.value }])
              },
              [
                _createElementVNode("button", {
                  type: "button",
                  class: "wd-ai-msg__reasoning-head",
                  onClick: _cache[0] || (_cache[0] = ($event) => reasoningOpen.value = !reasoningOpen.value)
                }, [
                  _createVNode(_component_wd_icon, {
                    class: "wd-ai-msg__reasoning-spark",
                    name: "magic",
                    size: 13
                  }),
                  _cache[2] || (_cache[2] = _createElementVNode(
                    "span",
                    { class: "wd-ai-msg__reasoning-title" },
                    "\u6DF1\u5EA6\u601D\u8003",
                    -1
                    /* CACHED */
                  )),
                  _createElementVNode(
                    "span",
                    _hoisted_4,
                    _toDisplayString(__props.reasoningStreaming ? "\u8FDB\u884C\u4E2D" : "\u5DF2\u5B8C\u6210"),
                    1
                    /* TEXT */
                  ),
                  _createElementVNode(
                    "span",
                    {
                      class: _normalizeClass2(["wd-chevron", { "wd-chevron--open": reasoningOpen.value }])
                    },
                    [
                      _createVNode(_component_wd_icon, {
                        name: "chevron-down",
                        size: 13
                      })
                    ],
                    2
                    /* CLASS */
                  )
                ]),
                _createElementVNode("div", _hoisted_5, [
                  _createElementVNode("div", _hoisted_6, [
                    _createElementVNode("p", _hoisted_7, [
                      _createTextVNode(
                        _toDisplayString(shownReasoning.value),
                        1
                        /* TEXT */
                      ),
                      __props.reasoningStreaming ? (_openBlock2(), _createElementBlock2("span", _hoisted_8, "\u258D")) : _createCommentVNode("v-if", true)
                    ])
                  ])
                ])
              ],
              2
              /* CLASS */
            )) : _createCommentVNode("v-if", true),
            _createCommentVNode(" \u6B63\u6587\uFF08content\uFF09 "),
            __props.content || shown.value ? (_openBlock2(), _createElementBlock2("p", _hoisted_9, [
              _createTextVNode(
                _toDisplayString(shown.value),
                1
                /* TEXT */
              ),
              __props.streaming && shown.value.length < __props.content.length ? (_openBlock2(), _createElementBlock2("span", _hoisted_10, "\u258D")) : _createCommentVNode("v-if", true)
            ])) : _createCommentVNode("v-if", true),
            __props.actions.length ? (_openBlock2(), _createElementBlock2("div", _hoisted_11, [
              (_openBlock2(true), _createElementBlock2(
                _Fragment,
                null,
                _renderList(__props.actions, (a) => {
                  return _openBlock2(), _createElementBlock2("button", {
                    key: a.label,
                    type: "button",
                    class: _normalizeClass2(["wd-btn", [`wd-btn--${a.variant || "ghost"}`, "wd-btn--sm"]]),
                    onClick: ($event) => emit("action", a.label)
                  }, _toDisplayString(a.label), 11, _hoisted_122);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : _createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      );
    };
  }
});

// .lib-build/WdAlert.ts
import { defineComponent as _defineComponent3 } from "vue";
import { normalizeClass as _normalizeClass3, createElementVNode as _createElementVNode2, toDisplayString as _toDisplayString2, openBlock as _openBlock3, createElementBlock as _createElementBlock3, createCommentVNode as _createCommentVNode2, renderSlot as _renderSlot, createTextVNode as _createTextVNode2, resolveComponent as _resolveComponent2, createVNode as _createVNode2 } from "vue";
import { ref as ref3 } from "vue";
var _hoisted_13 = { class: "wd-alert__body" };
var _hoisted_22 = {
  key: 0,
  class: "wd-alert__title"
};
var _hoisted_32 = {
  key: 1,
  class: "wd-alert__desc"
};
var WdAlert_default = /* @__PURE__ */ _defineComponent3({
  ...{ name: "WdAlert" },
  __name: "WdAlert",
  props: {
    variant: { type: String, required: false, default: "info" },
    title: { type: String, required: false, default: "" },
    description: { type: String, required: false, default: "" },
    closable: { type: Boolean, required: false, default: false }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const visible = ref3(true);
    function close() {
      visible.value = false;
      emit("close");
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent2("wd-icon");
      return visible.value ? (_openBlock3(), _createElementBlock3(
        "div",
        {
          key: 0,
          class: _normalizeClass3(["wd-alert", `wd-alert--${__props.variant}`]),
          role: "alert"
        },
        [
          _createElementVNode2(
            "span",
            {
              class: _normalizeClass3(["wd-alert__icon wd-dot wd-dot--lg", `wd-dot--${__props.variant}`])
            },
            null,
            2
            /* CLASS */
          ),
          _createElementVNode2("div", _hoisted_13, [
            __props.title ? (_openBlock3(), _createElementBlock3(
              "div",
              _hoisted_22,
              _toDisplayString2(__props.title),
              1
              /* TEXT */
            )) : _createCommentVNode2("v-if", true),
            __props.description || _ctx.$slots.default ? (_openBlock3(), _createElementBlock3("div", _hoisted_32, [
              _renderSlot(_ctx.$slots, "default", {}, () => [
                _createTextVNode2(
                  _toDisplayString2(__props.description),
                  1
                  /* TEXT */
                )
              ])
            ])) : _createCommentVNode2("v-if", true)
          ]),
          __props.closable ? (_openBlock3(), _createElementBlock3("button", {
            key: 0,
            type: "button",
            class: "wd-alert__close",
            "aria-label": "\u5173\u95ED",
            onClick: close
          }, [
            _createVNode2(_component_wd_icon, {
              name: "warning-circle",
              size: 14
            })
          ])) : _createCommentVNode2("v-if", true)
        ],
        2
        /* CLASS */
      )) : _createCommentVNode2("v-if", true);
    };
  }
});

// .lib-build/WdAudioPlayer.ts
import { defineComponent as _defineComponent4 } from "vue";
import { createElementVNode as _createElementVNode3, createCommentVNode as _createCommentVNode3, renderSlot as _renderSlot2, openBlock as _openBlock4, createElementBlock as _createElementBlock4, resolveComponent as _resolveComponent3, createBlock as _createBlock, toDisplayString as _toDisplayString3, renderList as _renderList2, Fragment as _Fragment2, normalizeClass as _normalizeClass4, normalizeStyle as _normalizeStyle2, createVNode as _createVNode3 } from "vue";
import { computed as computed2, ref as ref4, watch as watch2 } from "vue";
var _hoisted_14 = ["src", "loop"];
var _hoisted_23 = {
  key: 0,
  class: "wd-audio__cover"
};
var _hoisted_33 = ["src"];
var _hoisted_42 = {
  key: 0,
  class: "wd-audio__pulse"
};
var _hoisted_52 = ["aria-label"];
var _hoisted_62 = { class: "wd-audio__main" };
var _hoisted_72 = {
  key: 0,
  class: "wd-audio__meta"
};
var _hoisted_82 = { class: "wd-audio__title" };
var _hoisted_92 = {
  key: 0,
  class: "wd-audio__subtitle"
};
var _hoisted_102 = ["aria-valuenow"];
var _hoisted_112 = ["aria-valuenow"];
var _hoisted_123 = { class: "wd-audio__time" };
var _hoisted_132 = {
  key: 0,
  class: "wd-audio__err"
};
var _hoisted_142 = {
  key: 1,
  class: "wd-audio__side"
};
var _hoisted_15 = {
  key: 0,
  class: "wd-audio__vol"
};
var _hoisted_16 = ["aria-label"];
var _hoisted_17 = {
  key: 1,
  class: "wd-audio__rate"
};
var _hoisted_18 = {
  key: 0,
  class: "wd-audio__rate-menu"
};
var _hoisted_19 = ["onClick"];
var _hoisted_20 = ["href"];
var WdAudioPlayer_default = /* @__PURE__ */ _defineComponent4({
  ...{ name: "WdAudioPlayer" },
  __name: "WdAudioPlayer",
  props: {
    src: { type: String, required: false, default: "" },
    title: { type: String, required: false, default: "" },
    subtitle: { type: String, required: false, default: "" },
    cover: { type: String, required: false, default: "" },
    loop: { type: Boolean, required: false, default: false },
    volume: { type: Boolean, required: false, default: true },
    playbackRate: { type: Boolean, required: false, default: true },
    downloadable: { type: Boolean, required: false, default: false },
    compact: { type: Boolean, required: false, default: false },
    initialVolume: { type: Number, required: false, default: 1 },
    waveform: { type: Array, required: false, default: () => [] },
    iconStyle: { type: String, required: false, default: "outlined" }
  },
  emits: ["play", "pause", "ended", "timeupdate", "error"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const audio = ref4(null);
    const playing = ref4(false);
    const current = ref4(0);
    const duration = ref4(0);
    const buffered = ref4(0);
    const volume = ref4(props.initialVolume);
    const muted = ref4(false);
    const rate = ref4(1);
    const ready = ref4(false);
    const errMsg = ref4("");
    const rateOpen = ref4(false);
    function fmtTime(t) {
      if (!isFinite(t) || t < 0) t = 0;
      const m = Math.floor(t / 60);
      const s = Math.floor(t % 60);
      return `${m}:${String(s).padStart(2, "0")}`;
    }
    const progress = computed2(() => duration.value > 0 ? current.value / duration.value * 100 : 0);
    const bufferedPct = computed2(() => duration.value > 0 ? buffered.value / duration.value * 100 : 0);
    const remain = computed2(() => Math.max(0, duration.value - current.value));
    const bars = computed2(() => {
      if (props.waveform.length) return props.waveform;
      return null;
    });
    function togglePlay() {
      const a = audio.value;
      if (!a) return;
      if (a.paused) a.play().catch((e) => {
        errMsg.value = "\u64AD\u653E\u5931\u8D25\uFF1A" + e.message;
      });
      else a.pause();
    }
    const dragging = ref4(false);
    const dragPct = ref4(0);
    const shownPct = computed2(() => dragging.value ? dragPct.value : progress.value);
    function pctFrom(e, el) {
      const r = el.getBoundingClientRect();
      return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    }
    function seekTo(e) {
      const a = audio.value;
      if (!a || !duration.value) return;
      const t = pctFrom(e, e.currentTarget) * duration.value;
      a.currentTime = t;
      current.value = t;
    }
    function onScrubKey(e) {
      const a = audio.value;
      if (!a) return;
      if (e.key === "ArrowRight") {
        a.currentTime = Math.min(a.duration || 0, a.currentTime + 5);
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        a.currentTime = Math.max(0, a.currentTime - 5);
        e.preventDefault();
      } else if (e.key === " " || e.key === "Enter") {
        togglePlay();
        e.preventDefault();
      }
    }
    function onTimeUpdate() {
      const a = audio.value;
      if (!a) return;
      if (!dragging.value) current.value = a.currentTime;
      duration.value = a.duration || 0;
      emit("timeupdate", current.value, duration.value);
    }
    function onProgress() {
      const a = audio.value;
      if (!a || !a.buffered.length) return;
      buffered.value = a.buffered.end(a.buffered.length - 1);
    }
    function setVolume(e) {
      const a = audio.value;
      if (!a) return;
      const r = pctFrom(e, e.currentTarget);
      volume.value = r;
      a.volume = r;
      a.muted = r === 0;
      muted.value = a.muted;
    }
    function toggleMute() {
      const a = audio.value;
      if (!a) return;
      a.muted = !a.muted;
      muted.value = a.muted;
      if (!a.muted && a.volume === 0) {
        a.volume = 0.5;
        volume.value = 0.5;
      }
    }
    function setRate(r) {
      const a = audio.value;
      if (!a) return;
      a.playbackRate = r;
      rate.value = r;
      rateOpen.value = false;
    }
    function onError() {
      const a = audio.value;
      const map = { 1: "\u52A0\u8F7D\u88AB\u4E2D\u65AD", 2: "\u7F51\u7EDC\u9519\u8BEF", 3: "\u89E3\u7801\u5931\u8D25", 4: "\u5730\u5740\u4E0D\u652F\u6301" };
      errMsg.value = map[a?.error?.code || 0] || "\u97F3\u9891\u52A0\u8F7D\u5931\u8D25";
      emit("error", errMsg.value);
    }
    watch2(() => props.src, () => {
      errMsg.value = "";
      ready.value = false;
      current.value = 0;
      duration.value = 0;
      buffered.value = 0;
    });
    __expose({ play: () => audio.value?.play(), pause: () => audio.value?.pause() });
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent3("wd-icon");
      return _openBlock4(), _createElementBlock4(
        "div",
        {
          class: _normalizeClass4(["wd-audio", { "wd-audio--compact": __props.compact, "wd-audio--playing": playing.value }])
        },
        [
          _createElementVNode3("audio", {
            ref_key: "audio",
            ref: audio,
            src: __props.src,
            loop: __props.loop,
            preload: "metadata",
            onPlay: _cache[0] || (_cache[0] = ($event) => {
              playing.value = true;
              emit("play");
            }),
            onPause: _cache[1] || (_cache[1] = ($event) => {
              playing.value = false;
              emit("pause");
            }),
            onEnded: _cache[2] || (_cache[2] = ($event) => {
              playing.value = false;
              emit("ended");
            }),
            onTimeupdate: onTimeUpdate,
            onProgress,
            onLoadedmetadata: _cache[3] || (_cache[3] = ($event) => {
              ready.value = true;
              onTimeUpdate();
            }),
            onError
          }, null, 40, _hoisted_14),
          _createCommentVNode3(" \u5C01\u9762 "),
          __props.cover || !__props.compact || _ctx.$slots.cover ? (_openBlock4(), _createElementBlock4("div", _hoisted_23, [
            _renderSlot2(_ctx.$slots, "cover", {}, () => [
              __props.cover ? (_openBlock4(), _createElementBlock4("img", {
                key: 0,
                src: __props.cover,
                alt: ""
              }, null, 8, _hoisted_33)) : (_openBlock4(), _createBlock(_component_wd_icon, {
                key: 1,
                name: "music",
                variant: __props.iconStyle,
                size: __props.compact ? 16 : 20
              }, null, 8, ["variant", "size"]))
            ]),
            _createCommentVNode3(" \u64AD\u653E\u4E2D\u7684\u8DF3\u52A8\u6307\u793A "),
            playing.value ? (_openBlock4(), _createElementBlock4("span", _hoisted_42, [..._cache[5] || (_cache[5] = [
              _createElementVNode3(
                "i",
                null,
                null,
                -1
                /* CACHED */
              ),
              _createElementVNode3(
                "i",
                null,
                null,
                -1
                /* CACHED */
              ),
              _createElementVNode3(
                "i",
                null,
                null,
                -1
                /* CACHED */
              )
            ])])) : _createCommentVNode3("v-if", true)
          ])) : _createCommentVNode3("v-if", true),
          _createElementVNode3("button", {
            type: "button",
            class: "wd-audio__play",
            "aria-label": playing.value ? "\u6682\u505C" : "\u64AD\u653E",
            onClick: togglePlay
          }, [
            playing.value ? (_openBlock4(), _createBlock(_component_wd_icon, {
              key: 0,
              name: "pause",
              variant: __props.iconStyle,
              size: 16
            }, null, 8, ["variant"])) : (_openBlock4(), _createBlock(_component_wd_icon, {
              key: 1,
              name: "play",
              variant: __props.iconStyle,
              size: 16
            }, null, 8, ["variant"]))
          ], 8, _hoisted_52),
          _createElementVNode3("div", _hoisted_62, [
            __props.title || __props.subtitle || _ctx.$slots.info ? (_openBlock4(), _createElementBlock4("div", _hoisted_72, [
              _createElementVNode3(
                "span",
                _hoisted_82,
                _toDisplayString3(__props.title),
                1
                /* TEXT */
              ),
              __props.subtitle ? (_openBlock4(), _createElementBlock4(
                "span",
                _hoisted_92,
                _toDisplayString3(__props.subtitle),
                1
                /* TEXT */
              )) : _createCommentVNode3("v-if", true),
              _createCommentVNode3(" \u6807\u9898\u4E0B\u65B9\u6269\u5C55\u4F4D\uFF1A\u6B4C\u8BCD\u3001\u6807\u7B7E\u3001\u4F5C\u8005\u94FE\u63A5\u7B49 "),
              _renderSlot2(_ctx.$slots, "info")
            ])) : _createCommentVNode3("v-if", true),
            _createCommentVNode3(" \u6CE2\u5F62\u6A21\u5F0F "),
            bars.value ? (_openBlock4(), _createElementBlock4("div", {
              key: 1,
              class: "wd-audio__wave",
              role: "slider",
              tabindex: "0",
              "aria-label": "\u64AD\u653E\u8FDB\u5EA6",
              "aria-valuenow": Math.round(shownPct.value),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              onClick: seekTo,
              onKeydown: onScrubKey
            }, [
              (_openBlock4(true), _createElementBlock4(
                _Fragment2,
                null,
                _renderList2(bars.value, (h, i) => {
                  return _openBlock4(), _createElementBlock4(
                    "span",
                    {
                      key: i,
                      class: _normalizeClass4(["wd-audio__wave-bar", { "is-on": i / bars.value.length * 100 <= shownPct.value }]),
                      style: _normalizeStyle2({ height: Math.max(12, h * 100) + "%" })
                    },
                    null,
                    6
                    /* CLASS, STYLE */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ], 40, _hoisted_102)) : (_openBlock4(), _createElementBlock4(
              _Fragment2,
              { key: 2 },
              [
                _createCommentVNode3(" \u8FDB\u5EA6\u7EBF\u6A21\u5F0F "),
                _createElementVNode3("div", {
                  class: "wd-audio__scrub",
                  role: "slider",
                  tabindex: "0",
                  "aria-label": "\u64AD\u653E\u8FDB\u5EA6",
                  "aria-valuenow": Math.round(shownPct.value),
                  "aria-valuemin": "0",
                  "aria-valuemax": "100",
                  onClick: seekTo,
                  onKeydown: onScrubKey
                }, [
                  _cache[6] || (_cache[6] = _createElementVNode3(
                    "span",
                    { class: "wd-audio__track" },
                    null,
                    -1
                    /* CACHED */
                  )),
                  _createElementVNode3(
                    "span",
                    {
                      class: "wd-audio__buffer",
                      style: _normalizeStyle2({ width: bufferedPct.value + "%" })
                    },
                    null,
                    4
                    /* STYLE */
                  ),
                  _createElementVNode3(
                    "span",
                    {
                      class: "wd-audio__played",
                      style: _normalizeStyle2({ width: shownPct.value + "%" })
                    },
                    null,
                    4
                    /* STYLE */
                  ),
                  _createElementVNode3(
                    "span",
                    {
                      class: "wd-audio__knob",
                      style: _normalizeStyle2({ left: shownPct.value + "%" })
                    },
                    null,
                    4
                    /* STYLE */
                  )
                ], 40, _hoisted_112)
              ],
              2112
              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
            )),
            _createElementVNode3("div", _hoisted_123, [
              _createElementVNode3(
                "span",
                null,
                _toDisplayString3(fmtTime(current.value)),
                1
                /* TEXT */
              ),
              _cache[7] || (_cache[7] = _createElementVNode3(
                "span",
                { class: "wd-audio__time-sep" },
                "/",
                -1
                /* CACHED */
              )),
              _createElementVNode3(
                "span",
                null,
                _toDisplayString3(fmtTime(duration.value)),
                1
                /* TEXT */
              ),
              errMsg.value ? (_openBlock4(), _createElementBlock4(
                "span",
                _hoisted_132,
                _toDisplayString3(errMsg.value),
                1
                /* TEXT */
              )) : _createCommentVNode3("v-if", true),
              _createCommentVNode3(" \u65F6\u95F4\u884C\u53F3\u4FA7\u6269\u5C55\u4F4D "),
              _renderSlot2(_ctx.$slots, "extra")
            ])
          ]),
          !__props.compact ? (_openBlock4(), _createElementBlock4("div", _hoisted_142, [
            volume.value ? (_openBlock4(), _createElementBlock4("div", _hoisted_15, [
              _createElementVNode3("button", {
                type: "button",
                class: "wd-audio__ibtn",
                "aria-label": muted.value ? "\u53D6\u6D88\u9759\u97F3" : "\u9759\u97F3",
                onClick: toggleMute
              }, [
                muted.value || volume.value === 0 ? (_openBlock4(), _createBlock(_component_wd_icon, {
                  key: 0,
                  name: "volume-mute",
                  variant: __props.iconStyle,
                  size: 15
                }, null, 8, ["variant"])) : (_openBlock4(), _createBlock(_component_wd_icon, {
                  key: 1,
                  name: "volume-up",
                  variant: __props.iconStyle,
                  size: 15
                }, null, 8, ["variant"]))
              ], 8, _hoisted_16),
              _createElementVNode3("div", {
                class: "wd-audio__vol-track",
                onClick: setVolume
              }, [
                _createElementVNode3(
                  "span",
                  {
                    class: "wd-audio__vol-fill",
                    style: _normalizeStyle2({ width: (muted.value ? 0 : volume.value * 100) + "%" })
                  },
                  null,
                  4
                  /* STYLE */
                )
              ])
            ])) : _createCommentVNode3("v-if", true),
            __props.playbackRate ? (_openBlock4(), _createElementBlock4("div", _hoisted_17, [
              _createElementVNode3(
                "button",
                {
                  type: "button",
                  class: "wd-audio__ibtn wd-audio__ibtn--text",
                  onClick: _cache[4] || (_cache[4] = ($event) => rateOpen.value = !rateOpen.value)
                },
                _toDisplayString3(rate.value) + "\xD7 ",
                1
                /* TEXT */
              ),
              rateOpen.value ? (_openBlock4(), _createElementBlock4("div", _hoisted_18, [
                (_openBlock4(), _createElementBlock4(
                  _Fragment2,
                  null,
                  _renderList2([0.75, 1, 1.25, 1.5, 2], (r) => {
                    return _createElementVNode3("button", {
                      key: r,
                      type: "button",
                      class: _normalizeClass4({ "is-on": r === rate.value }),
                      onClick: ($event) => setRate(r)
                    }, _toDisplayString3(r) + "\xD7", 11, _hoisted_19);
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ])) : _createCommentVNode3("v-if", true)
            ])) : _createCommentVNode3("v-if", true),
            __props.downloadable ? (_openBlock4(), _createElementBlock4("a", {
              key: 2,
              class: "wd-audio__ibtn",
              href: __props.src,
              download: "",
              "aria-label": "\u4E0B\u8F7D"
            }, [
              _createVNode3(_component_wd_icon, {
                name: "download",
                variant: __props.iconStyle,
                size: 15
              }, null, 8, ["variant"])
            ], 8, _hoisted_20)) : _createCommentVNode3("v-if", true),
            _createCommentVNode3(" \u53F3\u4FA7\u6269\u5C55\u4F4D\uFF1A\u6536\u85CF / \u52A0\u5165\u961F\u5217 / \u5206\u4EAB\u7B49 "),
            _renderSlot2(_ctx.$slots, "actions")
          ])) : _createCommentVNode3("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

// .lib-build/WdAvatar.ts
import { defineComponent as _defineComponent5 } from "vue";
import { toDisplayString as _toDisplayString4, normalizeClass as _normalizeClass5, openBlock as _openBlock5, createElementBlock as _createElementBlock5 } from "vue";
import { computed as computed3 } from "vue";
var WdAvatar_default = /* @__PURE__ */ _defineComponent5({
  ...{ name: "WdAvatar" },
  __name: "WdAvatar",
  props: {
    name: { type: String, required: false, default: "" },
    tone: { type: Number, required: false, default: 0 },
    dark: { type: Boolean, required: false, default: false },
    size: { type: String, required: false, default: "md" }
  },
  setup(__props) {
    const props = __props;
    const label = computed3(() => {
      const n = props.name.trim();
      if (!n) return "?";
      if (n.startsWith("+")) return n;
      return n.charAt(0);
    });
    const resolvedTone = computed3(() => {
      if (props.tone) return props.tone;
      if (!props.name) return 0;
      let hash = 0;
      for (const ch of props.name) hash = (hash * 31 + ch.charCodeAt(0)) % 3;
      return hash + 1;
    });
    const classes = computed3(() => [
      "wd-avatar",
      resolvedTone.value ? `wd-avatar--tone-${resolvedTone.value}` : "",
      props.dark ? "wd-avatar--dark" : "",
      props.size === "sm" ? "wd-avatar--sm" : ""
    ]);
    return (_ctx, _cache) => {
      return _openBlock5(), _createElementBlock5(
        "span",
        {
          class: _normalizeClass5(classes.value)
        },
        _toDisplayString4(label.value),
        3
        /* TEXT, CLASS */
      );
    };
  }
});

// .lib-build/WdAvatarGroup.ts
import { defineComponent as _defineComponent6 } from "vue";
import { renderList as _renderList3, Fragment as _Fragment3, openBlock as _openBlock6, createElementBlock as _createElementBlock6, createBlock as _createBlock2, createCommentVNode as _createCommentVNode4 } from "vue";
import { computed as computed4 } from "vue";
var _hoisted_110 = { class: "wd-avatars" };
var WdAvatarGroup_default = /* @__PURE__ */ _defineComponent6({
  ...{ name: "WdAvatarGroup" },
  __name: "WdAvatarGroup",
  props: {
    names: { type: Array, required: false, default: () => [] },
    max: { type: Number, required: false, default: 3 }
  },
  setup(__props) {
    const props = __props;
    const shown = computed4(() => props.names.slice(0, props.max));
    const rest = computed4(() => Math.max(0, props.names.length - props.max));
    return (_ctx, _cache) => {
      return _openBlock6(), _createElementBlock6("span", _hoisted_110, [
        (_openBlock6(true), _createElementBlock6(
          _Fragment3,
          null,
          _renderList3(shown.value, (name, index) => {
            return _openBlock6(), _createBlock2(WdAvatar_default, {
              key: index,
              name
            }, null, 8, ["name"]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        rest.value ? (_openBlock6(), _createBlock2(WdAvatar_default, {
          key: 0,
          name: `+${rest.value}`,
          dark: ""
        }, null, 8, ["name"])) : _createCommentVNode4("v-if", true)
      ]);
    };
  }
});

// .lib-build/WdBadge.ts
import { defineComponent as _defineComponent7 } from "vue";
import { renderSlot as _renderSlot3, openBlock as _openBlock7, createElementBlock as _createElementBlock7, createCommentVNode as _createCommentVNode5, toDisplayString as _toDisplayString5, normalizeClass as _normalizeClass6 } from "vue";
import { computed as computed5, ref as ref5, watch as watch3 } from "vue";
var _hoisted_111 = {
  key: 0,
  class: "wd-badge__dot"
};
var _hoisted_24 = {
  key: 1,
  class: "wd-badge__count"
};
var WdBadge_default = /* @__PURE__ */ _defineComponent7({
  ...{ name: "WdBadge" },
  __name: "WdBadge",
  props: {
    value: { type: [Number, String], required: false, default: "" },
    dot: { type: Boolean, required: false, default: false },
    max: { type: Number, required: false, default: 99 },
    tone: { type: String, required: false, default: "red" }
  },
  setup(__props) {
    const props = __props;
    const display = computed5(() => {
      if (typeof props.value === "number" && props.max && props.value > props.max) {
        return `${props.max}+`;
      }
      return props.value;
    });
    const showCount = computed5(
      () => !props.dot && props.value !== "" && props.value !== void 0 && props.value !== null
    );
    const animReady = ref5(false);
    watch3(() => props.value, () => {
      animReady.value = true;
    });
    return (_ctx, _cache) => {
      return _openBlock7(), _createElementBlock7(
        "span",
        {
          class: _normalizeClass6(["wd-badge", [__props.tone === "gray" ? "wd-badge--gray" : "", { "wd-badge--anim-ready": animReady.value }]])
        },
        [
          _renderSlot3(_ctx.$slots, "default"),
          __props.dot ? (_openBlock7(), _createElementBlock7("span", _hoisted_111)) : showCount.value ? (_openBlock7(), _createElementBlock7(
            "span",
            _hoisted_24,
            _toDisplayString5(display.value),
            1
            /* TEXT */
          )) : _createCommentVNode5("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

// .lib-build/WdBreadcrumb.ts
import { defineComponent as _defineComponent8 } from "vue";
import { renderList as _renderList4, Fragment as _Fragment4, openBlock as _openBlock8, createElementBlock as _createElementBlock8, toDisplayString as _toDisplayString6, createCommentVNode as _createCommentVNode6, normalizeClass as _normalizeClass7, createElementVNode as _createElementVNode4 } from "vue";
var _hoisted_113 = {
  class: "wd-breadcrumb",
  "aria-label": "\u9762\u5305\u5C51"
};
var _hoisted_25 = {
  key: 0,
  class: "wd-breadcrumb__sep"
};
var _hoisted_34 = ["onClick"];
var WdBreadcrumb_default = /* @__PURE__ */ _defineComponent8({
  ...{ name: "WdBreadcrumb" },
  __name: "WdBreadcrumb",
  props: {
    items: { type: Array, required: false, default: () => [] },
    separator: { type: String, required: false, default: "/" }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function pick(item, index) {
      if (index === props.items.length - 1) return;
      emit("select", item.value ?? index, index);
    }
    return (_ctx, _cache) => {
      return _openBlock8(), _createElementBlock8("nav", _hoisted_113, [
        (_openBlock8(true), _createElementBlock8(
          _Fragment4,
          null,
          _renderList4(props.items, (item, i) => {
            return _openBlock8(), _createElementBlock8(
              _Fragment4,
              { key: i },
              [
                i > 0 ? (_openBlock8(), _createElementBlock8(
                  "span",
                  _hoisted_25,
                  _toDisplayString6(__props.separator),
                  1
                  /* TEXT */
                )) : _createCommentVNode6("v-if", true),
                _createElementVNode4("button", {
                  type: "button",
                  class: _normalizeClass7(["wd-breadcrumb__item", { "wd-breadcrumb__item--current": i === props.items.length - 1 }]),
                  onClick: ($event) => pick(item, i)
                }, _toDisplayString6(item.label), 11, _hoisted_34)
              ],
              64
              /* STABLE_FRAGMENT */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]);
    };
  }
});

// .lib-build/WdButton.ts
import { defineComponent as _defineComponent9 } from "vue";
import { openBlock as _openBlock9, createElementBlock as _createElementBlock9, createCommentVNode as _createCommentVNode7, toDisplayString as _toDisplayString7, createTextVNode as _createTextVNode3, Fragment as _Fragment5, renderSlot as _renderSlot4, normalizeClass as _normalizeClass8 } from "vue";
import { computed as computed6 } from "vue";
var _hoisted_114 = ["type", "disabled", "aria-busy"];
var _hoisted_26 = {
  key: 0,
  class: "wd-btn__spinner",
  "aria-hidden": "true"
};
var WdButton_default = /* @__PURE__ */ _defineComponent9({
  ...{ name: "WdButton" },
  __name: "WdButton",
  props: {
    variant: { type: String, required: false, default: "primary" },
    size: { type: String, required: false, default: "md" },
    disabled: { type: Boolean, required: false, default: false },
    iconOnly: { type: Boolean, required: false, default: false },
    block: { type: Boolean, required: false, default: false },
    loading: { type: Boolean, required: false, default: false },
    loadingText: { type: String, required: false, default: "" },
    type: { type: String, required: false, default: "button" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const classes = computed6(() => [
      "wd-btn",
      `wd-btn--${props.variant}`,
      `wd-btn--${props.size}`,
      {
        "wd-btn--icon": props.iconOnly,
        "wd-btn--block": props.block,
        "wd-btn--loading": props.loading
      }
    ]);
    function onClick(e) {
      if (props.loading || props.disabled) return;
      emit("click", e);
    }
    return (_ctx, _cache) => {
      return _openBlock9(), _createElementBlock9("button", {
        "data-wd-hover": "",
        class: _normalizeClass8(classes.value),
        type: __props.type,
        disabled: __props.disabled || __props.loading,
        "aria-busy": __props.loading || void 0,
        onClick
      }, [
        __props.loading ? (_openBlock9(), _createElementBlock9("span", _hoisted_26)) : _createCommentVNode7("v-if", true),
        __props.loading && __props.loadingText ? (_openBlock9(), _createElementBlock9(
          _Fragment5,
          { key: 1 },
          [
            _createTextVNode3(
              _toDisplayString7(__props.loadingText),
              1
              /* TEXT */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        )) : _renderSlot4(_ctx.$slots, "default", {}, void 0, void 0, 2)
      ], 10, _hoisted_114);
    };
  }
});

// .lib-build/WdCard.ts
import { defineComponent as _defineComponent10 } from "vue";
import { renderSlot as _renderSlot5, normalizeClass as _normalizeClass9, openBlock as _openBlock10, createElementBlock as _createElementBlock10 } from "vue";
import { computed as computed7 } from "vue";
var WdCard_default = /* @__PURE__ */ _defineComponent10({
  ...{ name: "WdCard" },
  __name: "WdCard",
  props: {
    variant: { type: String, required: false, default: "default" },
    padding: { type: String, required: false, default: "md" },
    hoverable: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const classes = computed7(() => [
      "wd-card",
      props.variant !== "default" ? `wd-card--${props.variant}` : "",
      props.padding !== "md" ? `wd-card--pad-${props.padding}` : "",
      props.hoverable ? "wd-card--hoverable" : ""
    ]);
    return (_ctx, _cache) => {
      return _openBlock10(), _createElementBlock10(
        "div",
        {
          class: _normalizeClass9(classes.value),
          "data-wd-hover": ""
        },
        [
          _renderSlot5(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      );
    };
  }
});

// .lib-build/WdCarousel.ts
import { defineComponent as _defineComponent11 } from "vue";
import { renderList as _renderList5, Fragment as _Fragment6, openBlock as _openBlock11, createElementBlock as _createElementBlock11, renderSlot as _renderSlot6, createCommentVNode as _createCommentVNode8, toDisplayString as _toDisplayString8, normalizeStyle as _normalizeStyle3, createElementVNode as _createElementVNode5, resolveComponent as _resolveComponent4, createVNode as _createVNode4, withModifiers as _withModifiers, normalizeClass as _normalizeClass10 } from "vue";
import { computed as computed8, onBeforeUnmount as onBeforeUnmount3, onMounted, ref as ref6 } from "vue";
var _hoisted_115 = ["src", "alt"];
var _hoisted_27 = {
  key: 1,
  class: "wd-carousel__label"
};
var _hoisted_35 = {
  key: 2,
  class: "wd-carousel__dots"
};
var _hoisted_43 = ["aria-label", "onClick"];
var SETTLE_MS = 500;
var THRESHOLD = 40;
var WdCarousel_default = /* @__PURE__ */ _defineComponent11({
  ...{ name: "WdCarousel" },
  __name: "WdCarousel",
  props: {
    items: { type: Array, required: false, default: () => [] },
    height: { type: Number, required: false, default: 260 },
    autoplay: { type: Number, required: false, default: 0 },
    showDots: { type: Boolean, required: false, default: true },
    showArrows: { type: Boolean, required: false, default: true },
    loop: { type: Boolean, required: false, default: true }
  },
  setup(__props) {
    const props = __props;
    const PALETTE = ["var(--wd-tint-2)", "var(--wd-success-soft)", "var(--wd-warning-soft)", "var(--wd-field)"];
    const root = ref6(null);
    const n = () => props.items.length;
    const looping = () => props.loop && n() > 1;
    const slides = computed8(() => {
      const list = props.items;
      if (!list.length) return [];
      if (!looping()) return list.map((it, i) => ({ it, real: i, key: "r" + i }));
      return [
        { it: list[list.length - 1], real: list.length - 1, key: "c-head" },
        ...list.map((it, i) => ({ it, real: i, key: "r" + i })),
        { it: list[0], real: 0, key: "c-tail" }
      ];
    });
    const pos = ref6(looping() ? 1 : 0);
    const animating = ref6(true);
    const dragX = ref6(0);
    const current = computed8(() => {
      const total = n() || 1;
      return ((pos.value - (looping() ? 1 : 0)) % total + total) % total;
    });
    const trackStyle = computed8(() => ({
      transform: `translateX(calc(-${pos.value * 100}% + ${dragX.value}px))`,
      transition: animating.value ? void 0 : "none"
    }));
    function go(i) {
      if (!n()) return;
      animating.value = true;
      pos.value = (looping() ? 1 : 0) + i;
      scheduleSettle();
      restart();
    }
    function next() {
      if (!n()) return;
      animating.value = true;
      pos.value += 1;
      if (!looping()) pos.value = pos.value % n();
      scheduleSettle();
      restart();
    }
    function prev() {
      if (!n()) return;
      animating.value = true;
      pos.value -= 1;
      if (!looping()) pos.value = (pos.value + n()) % n();
      scheduleSettle();
      restart();
    }
    let settleTimer = null;
    function scheduleSettle() {
      if (settleTimer) window.clearTimeout(settleTimer);
      if (!looping()) return;
      settleTimer = window.setTimeout(normalize, SETTLE_MS);
    }
    function normalize() {
      if (!looping()) return;
      if (pos.value === 0) jumpTo(n());
      else if (pos.value === n() + 1) jumpTo(1);
    }
    function onTransitionEnd() {
      if (settleTimer) {
        window.clearTimeout(settleTimer);
        settleTimer = null;
      }
      normalize();
    }
    function jumpTo(target) {
      animating.value = false;
      pos.value = target;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        animating.value = true;
      }));
    }
    let timer = null;
    function restart() {
      stop();
      if (props.autoplay > 0 && n() > 1) timer = window.setInterval(next, props.autoplay);
    }
    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }
    onMounted(() => {
      pos.value = looping() ? 1 : 0;
      restart();
    });
    onBeforeUnmount3(() => {
      stop();
      detach();
      if (settleTimer) window.clearTimeout(settleTimer);
    });
    let startX = 0, startY = 0, swiping = false, decided = false;
    function onDown(e) {
      if (n() < 2) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      swiping = true;
      decided = false;
      startX = e.clientX;
      startY = e.clientY;
      try {
        e.currentTarget.setPointerCapture?.(e.pointerId);
      } catch {
      }
      window.addEventListener("pointermove", onMove, { passive: false });
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    }
    function onMove(e) {
      if (!swiping) return;
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (!decided) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          end(false);
          return;
        }
        decided = true;
        stop();
      }
      if (e.cancelable) e.preventDefault();
      dragX.value = dx;
    }
    function onUp(e) {
      if (!swiping) return;
      const dx = e.clientX - startX;
      if (decided && Math.abs(dx) > THRESHOLD) {
        if (dx < 0) next();
        else prev();
      }
      end(true);
    }
    function end(again) {
      swiping = false;
      decided = false;
      dragX.value = 0;
      detach();
      if (again) restart();
    }
    function detach() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent4("wd-icon");
      return _openBlock11(), _createElementBlock11(
        "div",
        {
          ref_key: "root",
          ref: root,
          class: "wd-carousel",
          style: _normalizeStyle3({ height: __props.height + "px" }),
          onMouseenter: stop,
          onMouseleave: restart,
          onPointerdown: onDown
        },
        [
          _createElementVNode5(
            "div",
            {
              class: "wd-carousel__track",
              style: _normalizeStyle3(trackStyle.value),
              onTransitionend: onTransitionEnd
            },
            [
              (_openBlock11(true), _createElementBlock11(
                _Fragment6,
                null,
                _renderList5(slides.value, (s) => {
                  return _openBlock11(), _createElementBlock11(
                    "div",
                    {
                      key: s.key,
                      class: "wd-carousel__slide",
                      style: _normalizeStyle3({ background: PALETTE[s.real % PALETTE.length] })
                    },
                    [
                      _renderSlot6(_ctx.$slots, "item", {
                        item: s.it,
                        index: s.real
                      }, () => [
                        s.it.src ? (_openBlock11(), _createElementBlock11("img", {
                          key: 0,
                          src: s.it.src,
                          alt: s.it.alt || "",
                          class: "wd-carousel__img",
                          draggable: "false"
                        }, null, 8, _hoisted_115)) : (_openBlock11(), _createElementBlock11(
                          "span",
                          _hoisted_27,
                          _toDisplayString8(s.it.label || `Slide ${s.real + 1}`),
                          1
                          /* TEXT */
                        ))
                      ])
                    ],
                    4
                    /* STYLE */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            36
            /* STYLE, NEED_HYDRATION */
          ),
          __props.showArrows && __props.items.length > 1 ? (_openBlock11(), _createElementBlock11(
            "button",
            {
              key: 0,
              type: "button",
              class: "wd-icon-btn wd-carousel__arrow wd-carousel__arrow--prev",
              "aria-label": "\u4E0A\u4E00\u5F20",
              onPointerdown: _cache[0] || (_cache[0] = _withModifiers(() => {
              }, ["stop"])),
              onClick: prev
            },
            [
              _createVNode4(_component_wd_icon, {
                name: "chevron-left",
                size: 15
              })
            ],
            32
            /* NEED_HYDRATION */
          )) : _createCommentVNode8("v-if", true),
          __props.showArrows && __props.items.length > 1 ? (_openBlock11(), _createElementBlock11(
            "button",
            {
              key: 1,
              type: "button",
              class: "wd-icon-btn wd-carousel__arrow wd-carousel__arrow--next",
              "aria-label": "\u4E0B\u4E00\u5F20",
              onPointerdown: _cache[1] || (_cache[1] = _withModifiers(() => {
              }, ["stop"])),
              onClick: next
            },
            [
              _createVNode4(_component_wd_icon, {
                name: "chevron-right",
                size: 15
              })
            ],
            32
            /* NEED_HYDRATION */
          )) : _createCommentVNode8("v-if", true),
          __props.showDots && __props.items.length > 1 ? (_openBlock11(), _createElementBlock11("div", _hoisted_35, [
            (_openBlock11(true), _createElementBlock11(
              _Fragment6,
              null,
              _renderList5(__props.items, (_, i) => {
                return _openBlock11(), _createElementBlock11("button", {
                  key: i,
                  type: "button",
                  class: _normalizeClass10(["wd-carousel__dot", { "wd-carousel__dot--active": i === current.value }]),
                  "aria-label": `\u7B2C ${i + 1} \u5F20`,
                  onPointerdown: _cache[2] || (_cache[2] = _withModifiers(() => {
                  }, ["stop"])),
                  onClick: ($event) => go(i)
                }, null, 42, _hoisted_43);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : _createCommentVNode8("v-if", true)
        ],
        36
        /* STYLE, NEED_HYDRATION */
      );
    };
  }
});

// .lib-build/WdCheckbox.ts
import { defineComponent as _defineComponent12 } from "vue";
import { resolveComponent as _resolveComponent5, createVNode as _createVNode5, createElementVNode as _createElementVNode6, renderSlot as _renderSlot7, toDisplayString as _toDisplayString9, createTextVNode as _createTextVNode4, openBlock as _openBlock12, createElementBlock as _createElementBlock12, createCommentVNode as _createCommentVNode9, normalizeClass as _normalizeClass11 } from "vue";
var _hoisted_116 = ["aria-checked", "disabled"];
var _hoisted_28 = { class: "wd-checkbox__box" };
var _hoisted_36 = {
  key: 0,
  class: "wd-checkbox__label"
};
var WdCheckbox_default = /* @__PURE__ */ _defineComponent12({
  ...{ name: "WdCheckbox" },
  __name: "WdCheckbox",
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    label: { type: String, required: false, default: "" },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function toggle() {
      if (!props.disabled) emit("update:modelValue", !props.modelValue);
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent5("wd-icon");
      return _openBlock12(), _createElementBlock12("button", {
        type: "button",
        role: "checkbox",
        class: _normalizeClass11(["wd-checkbox", { "wd-checkbox--checked": __props.modelValue, "wd-checkbox--disabled": __props.disabled }]),
        "aria-checked": __props.modelValue,
        disabled: __props.disabled,
        onClick: toggle
      }, [
        _createElementVNode6("span", _hoisted_28, [
          _createVNode5(_component_wd_icon, {
            name: "check",
            size: 13
          })
        ]),
        __props.label || _ctx.$slots.default ? (_openBlock12(), _createElementBlock12("span", _hoisted_36, [
          _renderSlot7(_ctx.$slots, "default", {}, () => [
            _createTextVNode4(
              _toDisplayString9(__props.label),
              1
              /* TEXT */
            )
          ])
        ])) : _createCommentVNode9("v-if", true)
      ], 10, _hoisted_116);
    };
  }
});

// .lib-build/WdCollapse.ts
import { defineComponent as _defineComponent13 } from "vue";
import { renderList as _renderList6, Fragment as _Fragment7, openBlock as _openBlock13, createElementBlock as _createElementBlock13, toDisplayString as _toDisplayString10, createElementVNode as _createElementVNode7, resolveComponent as _resolveComponent6, normalizeClass as _normalizeClass12, createVNode as _createVNode6, renderSlot as _renderSlot8, createTextVNode as _createTextVNode5 } from "vue";
import { computed as computed9 } from "vue";
var _hoisted_117 = { class: "wd-collapse" };
var _hoisted_29 = ["aria-expanded", "onClick"];
var _hoisted_37 = { class: "wd-collapse__body" };
var _hoisted_44 = { class: "wd-collapse__inner" };
var _hoisted_53 = { class: "wd-collapse__content" };
var WdCollapse_default = /* @__PURE__ */ _defineComponent13({
  ...{ name: "WdCollapse" },
  __name: "WdCollapse",
  props: {
    modelValue: { type: Array, required: false, default: () => [] },
    items: { type: Array, required: false, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const openSet = computed9(() => new Set(props.modelValue));
    function toggle(i) {
      const next = new Set(props.modelValue);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      emit("update:modelValue", [...next].sort((a, b) => a - b));
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent6("wd-icon");
      return _openBlock13(), _createElementBlock13("div", _hoisted_117, [
        (_openBlock13(true), _createElementBlock13(
          _Fragment7,
          null,
          _renderList6(props.items, (item, i) => {
            return _openBlock13(), _createElementBlock13(
              "div",
              {
                key: i,
                class: _normalizeClass12(["wd-collapse__item", { "wd-collapse__item--open": openSet.value.has(i) }])
              },
              [
                _createElementVNode7("button", {
                  type: "button",
                  class: "wd-collapse__head",
                  "aria-expanded": openSet.value.has(i),
                  onClick: ($event) => toggle(i)
                }, [
                  _createElementVNode7(
                    "span",
                    null,
                    _toDisplayString10(item.title),
                    1
                    /* TEXT */
                  ),
                  _createVNode6(_component_wd_icon, {
                    class: _normalizeClass12(["wd-chevron", { "wd-chevron--open": openSet.value.has(i) }]),
                    name: "chevron-down",
                    size: 15
                  }, null, 8, ["class"])
                ], 8, _hoisted_29),
                _createElementVNode7("div", _hoisted_37, [
                  _createElementVNode7("div", _hoisted_44, [
                    _createElementVNode7("div", _hoisted_53, [
                      _renderSlot8(_ctx.$slots, `item-${i}`, { item }, () => [
                        _createTextVNode5(
                          _toDisplayString10(item.content),
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ])
                ])
              ],
              2
              /* CLASS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]);
    };
  }
});

// .lib-build/WdCommand.ts
import { defineComponent as _defineComponent14 } from "vue";
import { createElementVNode as _createElementVNode8, resolveComponent as _resolveComponent7, createVNode as _createVNode7, vModelText as _vModelText, withDirectives as _withDirectives, renderList as _renderList7, Fragment as _Fragment8, openBlock as _openBlock14, createElementBlock as _createElementBlock14, toDisplayString as _toDisplayString11, createCommentVNode as _createCommentVNode10, renderSlot as _renderSlot9, normalizeClass as _normalizeClass13, createTextVNode as _createTextVNode6, normalizeStyle as _normalizeStyle4, Teleport as _Teleport, createBlock as _createBlock3 } from "vue";
import { computed as computed10, nextTick, onBeforeUnmount as onBeforeUnmount4, onMounted as onMounted2, ref as ref7, watch as watch4 } from "vue";
var _hoisted_118 = {
  key: 0,
  class: "wd-command",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "\u547D\u4EE4\u9762\u677F"
};
var _hoisted_210 = { class: "wd-command__input-row" };
var _hoisted_38 = ["placeholder"];
var _hoisted_45 = {
  key: 0,
  class: "wd-command__group"
};
var _hoisted_54 = ["data-idx", "disabled", "onClick", "onMousemove"];
var _hoisted_63 = {
  key: 0,
  class: "wd-command__item-icon"
};
var _hoisted_73 = { class: "wd-command__item-main" };
var _hoisted_83 = { class: "wd-command__item-label" };
var _hoisted_93 = {
  key: 0,
  class: "wd-command__item-hint"
};
var _hoisted_103 = {
  key: 1,
  class: "wd-command__item-shortcut"
};
var _hoisted_119 = {
  key: 0,
  class: "wd-command__empty"
};
var WdCommand_default = /* @__PURE__ */ _defineComponent14({
  ...{ name: "WdCommand" },
  __name: "WdCommand",
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    items: { type: Array, required: false, default: () => [] },
    placeholder: { type: String, required: false, default: "\u8F93\u5165\u547D\u4EE4\u6216\u641C\u7D22\u2026" },
    emptyText: { type: String, required: false, default: "\u6CA1\u6709\u5339\u914D\u7684\u7ED3\u679C" },
    autofocus: { type: Boolean, required: false, default: true },
    maxHeight: { type: Number, required: false, default: 380 }
  },
  emits: ["update:modelValue", "select", "search"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const q = ref7("");
    const activeIdx = ref7(0);
    const inputEl = ref7(null);
    const listEl = ref7(null);
    function score(item, needle) {
      const low = needle.toLowerCase();
      const label = item.label.toLowerCase();
      if (label.startsWith(low)) return 0;
      if (label.includes(low)) return 1;
      if (item.hint?.toLowerCase().includes(low)) return 2;
      if (item.keywords?.some((k) => k.toLowerCase().includes(low))) return 3;
      return -1;
    }
    const filtered = computed10(() => {
      const needle = q.value.trim();
      if (!needle) return props.items;
      return props.items.map((it) => ({ it, s: score(it, needle) })).filter((x) => x.s >= 0).sort((a, b) => a.s - b.s).map((x) => x.it);
    });
    const groups = computed10(() => {
      const out = [];
      const idx = /* @__PURE__ */ new Map();
      for (const it of filtered.value) {
        const g = it.group || "";
        if (!idx.has(g)) {
          idx.set(g, out.length);
          out.push({ name: g, items: [] });
        }
        out[idx.get(g)].items.push(it);
      }
      return out;
    });
    const flatFiltered = computed10(() => filtered.value.filter((i) => !i.disabled));
    watch4(filtered, () => {
      activeIdx.value = 0;
    });
    watch4(q, (v) => emit("search", v));
    function close() {
      emit("update:modelValue", false);
      q.value = "";
    }
    function choose(it) {
      const target = it ?? flatFiltered.value[activeIdx.value];
      if (!target || target.disabled) return;
      emit("select", target);
      close();
    }
    function move(dir) {
      const n = flatFiltered.value.length;
      if (!n) return;
      activeIdx.value = (activeIdx.value + dir + n) % n;
      nextTick(() => {
        listEl.value?.querySelector(`[data-idx="${activeIdx.value}"]`)?.scrollIntoView({ block: "nearest" });
      });
    }
    function idxOf(item) {
      return flatFiltered.value.indexOf(item);
    }
    function onKey(e) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          move(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          move(-1);
          break;
        case "Enter":
          e.preventDefault();
          choose();
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
      }
    }
    function onGlobalKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        emit("update:modelValue", !props.modelValue);
      }
    }
    onMounted2(() => {
      window.addEventListener("keydown", onGlobalKey);
    });
    onBeforeUnmount4(() => {
      window.removeEventListener("keydown", onGlobalKey);
    });
    watch4(
      () => props.modelValue,
      async (v) => {
        if (v) {
          q.value = "";
          activeIdx.value = 0;
          await nextTick();
          if (props.autofocus) inputEl.value?.focus();
        }
      }
    );
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent7("wd-icon");
      return _openBlock14(), _createBlock3(_Teleport, { to: "body" }, [
        __props.modelValue ? (_openBlock14(), _createElementBlock14("div", _hoisted_118, [
          _createElementVNode8("div", {
            class: "wd-command__mask",
            onClick: close
          }),
          _createElementVNode8(
            "div",
            {
              class: "wd-command__panel",
              style: _normalizeStyle4({ maxHeight: __props.maxHeight + "px" })
            },
            [
              _createElementVNode8("div", _hoisted_210, [
                _createVNode7(_component_wd_icon, {
                  class: "wd-command__search-icon",
                  name: "search",
                  size: 16
                }),
                _withDirectives(_createElementVNode8("input", {
                  ref_key: "inputEl",
                  ref: inputEl,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => q.value = $event),
                  class: "wd-command__input",
                  placeholder: __props.placeholder,
                  type: "text",
                  spellcheck: "false",
                  autocomplete: "off",
                  onKeydown: onKey
                }, null, 40, _hoisted_38), [
                  [_vModelText, q.value]
                ]),
                _cache[1] || (_cache[1] = _createElementVNode8(
                  "kbd",
                  { class: "wd-command__esc" },
                  "ESC",
                  -1
                  /* CACHED */
                ))
              ]),
              _createElementVNode8(
                "div",
                {
                  ref_key: "listEl",
                  ref: listEl,
                  class: "wd-command__list"
                },
                [
                  (_openBlock14(true), _createElementBlock14(
                    _Fragment8,
                    null,
                    _renderList7(groups.value, (g) => {
                      return _openBlock14(), _createElementBlock14(
                        _Fragment8,
                        {
                          key: g.name
                        },
                        [
                          g.name ? (_openBlock14(), _createElementBlock14(
                            "div",
                            _hoisted_45,
                            _toDisplayString11(g.name),
                            1
                            /* TEXT */
                          )) : _createCommentVNode10("v-if", true),
                          (_openBlock14(true), _createElementBlock14(
                            _Fragment8,
                            null,
                            _renderList7(g.items, (it) => {
                              return _openBlock14(), _createElementBlock14("button", {
                                key: it.key,
                                type: "button",
                                class: _normalizeClass13(["wd-command__item", {
                                  "wd-command__item--active": idxOf(it) === activeIdx.value,
                                  "wd-command__item--disabled": it.disabled
                                }]),
                                "data-idx": idxOf(it),
                                disabled: it.disabled,
                                onClick: ($event) => choose(it),
                                onMousemove: ($event) => !it.disabled && (activeIdx.value = idxOf(it))
                              }, [
                                it.icon || _ctx.$slots.icon ? (_openBlock14(), _createElementBlock14("span", _hoisted_63, [
                                  _renderSlot9(_ctx.$slots, "icon", { item: it }, () => [
                                    _createVNode7(_component_wd_icon, {
                                      name: it.icon,
                                      size: 16
                                    }, null, 8, ["name"])
                                  ])
                                ])) : _createCommentVNode10("v-if", true),
                                _createElementVNode8("span", _hoisted_73, [
                                  _createElementVNode8(
                                    "span",
                                    _hoisted_83,
                                    _toDisplayString11(it.label),
                                    1
                                    /* TEXT */
                                  ),
                                  it.hint ? (_openBlock14(), _createElementBlock14(
                                    "span",
                                    _hoisted_93,
                                    _toDisplayString11(it.hint),
                                    1
                                    /* TEXT */
                                  )) : _createCommentVNode10("v-if", true)
                                ]),
                                it.shortcut ? (_openBlock14(), _createElementBlock14(
                                  "kbd",
                                  _hoisted_103,
                                  _toDisplayString11(it.shortcut),
                                  1
                                  /* TEXT */
                                )) : _createCommentVNode10("v-if", true)
                              ], 42, _hoisted_54);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  !filtered.value.length ? (_openBlock14(), _createElementBlock14(
                    "div",
                    _hoisted_119,
                    _toDisplayString11(__props.emptyText),
                    1
                    /* TEXT */
                  )) : _createCommentVNode10("v-if", true)
                ],
                512
                /* NEED_PATCH */
              ),
              _cache[2] || (_cache[2] = _createElementVNode8(
                "div",
                { class: "wd-command__footer" },
                [
                  _createElementVNode8("span", null, [
                    _createElementVNode8("kbd", null, "\u2191"),
                    _createElementVNode8("kbd", null, "\u2193"),
                    _createTextVNode6(" \u9009\u62E9")
                  ]),
                  _createElementVNode8("span", null, [
                    _createElementVNode8("kbd", null, "\u21B5"),
                    _createTextVNode6(" \u786E\u8BA4")
                  ]),
                  _createElementVNode8("span", null, [
                    _createElementVNode8("kbd", null, "esc"),
                    _createTextVNode6(" \u5173\u95ED")
                  ])
                ],
                -1
                /* CACHED */
              ))
            ],
            4
            /* STYLE */
          )
        ])) : _createCommentVNode10("v-if", true)
      ]);
    };
  }
});

// .lib-build/WdContainer.ts
import { defineComponent as _defineComponent15 } from "vue";
import { renderSlot as _renderSlot10, normalizeStyle as _normalizeStyle5, openBlock as _openBlock15, createElementBlock as _createElementBlock15 } from "vue";
var WdContainer_default = /* @__PURE__ */ _defineComponent15({
  ...{ name: "WdContainer" },
  __name: "WdContainer",
  props: {
    maxWidth: { type: String, required: false, default: "1200px" },
    pad: { type: String, required: false, default: "md" }
  },
  setup(__props) {
    const props = __props;
    const PAD_X = { sm: "var(--wd-space-3)", md: "var(--wd-space-4)", lg: "var(--wd-space-6)" };
    const PAD_Y = { sm: "var(--wd-space-3)", md: "var(--wd-space-4)", lg: "var(--wd-space-6)" };
    return (_ctx, _cache) => {
      return _openBlock15(), _createElementBlock15(
        "div",
        {
          class: "wd-container",
          style: _normalizeStyle5({
            maxWidth: __props.maxWidth,
            paddingInline: PAD_X[props.pad],
            paddingBlock: PAD_Y[props.pad]
          })
        },
        [
          _renderSlot10(_ctx.$slots, "default")
        ],
        4
        /* STYLE */
      );
    };
  }
});

// .lib-build/WdDatePicker.ts
import { defineComponent as _defineComponent16 } from "vue";
import { toDisplayString as _toDisplayString12, openBlock as _openBlock16, createElementBlock as _createElementBlock16, createCommentVNode as _createCommentVNode11, resolveComponent as _resolveComponent8, createVNode as _createVNode8, createElementVNode as _createElementVNode9, unref as _unref, renderList as _renderList8, Fragment as _Fragment9, normalizeClass as _normalizeClass14, Transition as _Transition, withCtx as _withCtx } from "vue";
import { computed as computed11, onBeforeUnmount as onBeforeUnmount6, onMounted as onMounted3, ref as ref9 } from "vue";

// .lib-build/overlay-stack.ts
import { onBeforeUnmount as onBeforeUnmount5, ref as ref8, watch as watch5 } from "vue";
var stack = [];
var seq = 0;
var overlayDepth = ref8(0);
var BASE_Z = 1e3;
var zSeq = 0;
function nextZIndex() {
  return BASE_Z + ++zSeq * 10;
}
function topOverlay() {
  return stack[stack.length - 1];
}
function isTopOverlay(id) {
  const t = topOverlay();
  return !!t && t.id === id;
}
function pushOverlay(entry) {
  const id = ++seq;
  stack.push({ ...entry, id });
  overlayDepth.value = stack.length;
  return id;
}
function removeOverlay(id) {
  const i = stack.findIndex((e) => e.id === id);
  if (i >= 0) stack.splice(i, 1);
  overlayDepth.value = stack.length;
}
function useOverlayLayer(open, panel, onEsc) {
  let myId = null;
  watch5(
    open,
    (v) => {
      if (v) {
        const active = document.activeElement;
        myId = pushOverlay({
          panel,
          restoreTo: active && active !== document.body ? active : null,
          onEscape: onEsc
        });
      } else if (myId !== null) {
        removeOverlay(myId);
        myId = null;
      }
    },
    { immediate: true }
  );
  onBeforeUnmount5(() => {
    if (myId !== null) {
      removeOverlay(myId);
      myId = null;
    }
  });
  return {
    /** 本层是否在栈顶（需要响应键盘时先判断它） */
    isTop: () => myId === null ? false : isTopOverlay(myId)
  };
}
var installed = false;
function installOverlayKeyboard() {
  if (installed || typeof document === "undefined") return;
  installed = true;
  document.addEventListener(
    "keydown",
    (e) => {
      const top = topOverlay();
      if (!top) return;
      if (e.key === "Escape") {
        const handled = top.onEscape?.();
        if (handled !== false) {
          e.stopPropagation();
        }
      }
    },
    true
  );
}

// .lib-build/pop-duration.ts
var reduce = () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function popDuration(enter = 200, leave = 140) {
  return reduce() ? { enter: 1, leave: 1 } : { enter, leave };
}

// .lib-build/WdDatePicker.ts
var _hoisted_120 = ["disabled"];
var _hoisted_211 = {
  key: 0,
  class: "wd-datepicker__value"
};
var _hoisted_39 = {
  key: 1,
  class: "wd-datepicker__placeholder"
};
var _hoisted_46 = {
  key: 0,
  class: "wd-datepicker__panel"
};
var _hoisted_55 = { class: "wd-datepicker__head" };
var _hoisted_64 = { class: "wd-datepicker__month" };
var _hoisted_74 = { class: "wd-datepicker__nav" };
var _hoisted_84 = { class: "wd-datepicker__week" };
var _hoisted_94 = { class: "wd-datepicker__grid" };
var _hoisted_104 = ["onClick"];
var WdDatePicker_default = /* @__PURE__ */ _defineComponent16({
  ...{ name: "WdDatePicker" },
  __name: "WdDatePicker",
  props: {
    modelValue: { type: String, required: false, default: "" },
    placeholder: { type: String, required: false, default: "\u9009\u62E9\u65E5\u671F" },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const POP_DURATION = popDuration();
    const props = __props;
    const emit = __emit;
    const open = ref9(false);
    const root = ref9();
    useOverlayLayer(open, root, () => {
      open.value = false;
      return true;
    });
    const view = ref9(new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1));
    const WEEK = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"];
    function pad(n) {
      return n < 10 ? `0${n}` : `${n}`;
    }
    function fmt(d) {
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    }
    const monthLabel = computed11(() => `${view.value.getFullYear()} \u5E74 ${view.value.getMonth() + 1} \u6708`);
    const days = computed11(() => {
      const first = view.value;
      const startIdx = (first.getDay() + 6) % 7;
      const start = new Date(first);
      start.setDate(1 - startIdx);
      const today = fmt(/* @__PURE__ */ new Date());
      const list = [];
      for (let i = 0; i < 42; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const key = fmt(d);
        list.push({
          key,
          label: d.getDate(),
          muted: d.getMonth() !== first.getMonth(),
          today: key === today,
          selected: key === props.modelValue
        });
      }
      return list;
    });
    function prevMonth() {
      view.value = new Date(view.value.getFullYear(), view.value.getMonth() - 1, 1);
    }
    function nextMonth() {
      view.value = new Date(view.value.getFullYear(), view.value.getMonth() + 1, 1);
    }
    function pick(key) {
      emit("update:modelValue", key);
      open.value = false;
    }
    function pickToday() {
      const now = /* @__PURE__ */ new Date();
      view.value = new Date(now.getFullYear(), now.getMonth(), 1);
      pick(fmt(now));
    }
    function toggle() {
      if (props.disabled) return;
      open.value = !open.value;
      if (open.value && props.modelValue) {
        const d = new Date(props.modelValue);
        if (!Number.isNaN(d.getTime())) {
          view.value = new Date(d.getFullYear(), d.getMonth(), 1);
        }
      }
    }
    function onDocClick(e) {
      if (root.value && !root.value.contains(e.target)) open.value = false;
    }
    function onKey(e) {
    }
    onMounted3(() => {
      document.addEventListener("click", onDocClick);
      document.addEventListener("keydown", onKey);
    });
    onBeforeUnmount6(() => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    });
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent8("wd-icon");
      return _openBlock16(), _createElementBlock16(
        "div",
        {
          ref_key: "root",
          ref: root,
          class: _normalizeClass14(["wd-datepicker", { "wd-datepicker--open": open.value }])
        },
        [
          _createElementVNode9("button", {
            type: "button",
            class: "wd-datepicker__trigger",
            disabled: __props.disabled,
            onClick: toggle
          }, [
            __props.modelValue ? (_openBlock16(), _createElementBlock16(
              "span",
              _hoisted_211,
              _toDisplayString12(__props.modelValue),
              1
              /* TEXT */
            )) : (_openBlock16(), _createElementBlock16(
              "span",
              _hoisted_39,
              _toDisplayString12(__props.placeholder),
              1
              /* TEXT */
            )),
            _createVNode8(_component_wd_icon, {
              class: "wd-datepicker__icon",
              name: "calendar",
              size: 15
            })
          ], 8, _hoisted_120),
          _createVNode8(_Transition, {
            name: "wd-pop",
            duration: _unref(POP_DURATION)
          }, {
            default: _withCtx(() => [
              open.value ? (_openBlock16(), _createElementBlock16("div", _hoisted_46, [
                _createElementVNode9("div", _hoisted_55, [
                  _createElementVNode9(
                    "span",
                    _hoisted_64,
                    _toDisplayString12(monthLabel.value),
                    1
                    /* TEXT */
                  ),
                  _createElementVNode9("span", _hoisted_74, [
                    _createElementVNode9("button", {
                      type: "button",
                      class: "wd-icon-btn wd-icon-btn--sm",
                      "aria-label": "\u4E0A\u4E2A\u6708",
                      onClick: prevMonth
                    }, [
                      _createVNode8(_component_wd_icon, {
                        name: "chevron-left",
                        size: 14
                      })
                    ]),
                    _createElementVNode9("button", {
                      type: "button",
                      class: "wd-icon-btn wd-icon-btn--sm",
                      "aria-label": "\u4E0B\u4E2A\u6708",
                      onClick: nextMonth
                    }, [
                      _createVNode8(_component_wd_icon, {
                        name: "chevron-right",
                        size: 14
                      })
                    ])
                  ])
                ]),
                _createElementVNode9("div", _hoisted_84, [
                  (_openBlock16(), _createElementBlock16(
                    _Fragment9,
                    null,
                    _renderList8(WEEK, (w) => {
                      return _createElementVNode9(
                        "span",
                        { key: w },
                        _toDisplayString12(w),
                        1
                        /* TEXT */
                      );
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ]),
                _createElementVNode9("div", _hoisted_94, [
                  (_openBlock16(true), _createElementBlock16(
                    _Fragment9,
                    null,
                    _renderList8(days.value, (d) => {
                      return _openBlock16(), _createElementBlock16("button", {
                        key: d.key,
                        type: "button",
                        class: _normalizeClass14(["wd-datepicker__day", {
                          "wd-datepicker__day--muted": d.muted,
                          "wd-datepicker__day--today": d.today,
                          "wd-datepicker__day--selected": d.selected
                        }]),
                        onClick: ($event) => pick(d.key)
                      }, _toDisplayString12(d.label), 11, _hoisted_104);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _createElementVNode9("div", { class: "wd-datepicker__foot" }, [
                  _createElementVNode9("button", {
                    type: "button",
                    class: "wd-datepicker__todaybtn",
                    onClick: pickToday
                  }, "\u56DE\u5230\u4ECA\u5929")
                ])
              ])) : _createCommentVNode11("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }, 8, ["duration"])
        ],
        2
        /* CLASS */
      );
    };
  }
});

// .lib-build/WdDescriptions.ts
import { defineComponent as _defineComponent17 } from "vue";
import { renderList as _renderList9, Fragment as _Fragment10, openBlock as _openBlock17, createElementBlock as _createElementBlock17, toDisplayString as _toDisplayString13, createCommentVNode as _createCommentVNode12, createTextVNode as _createTextVNode7, createElementVNode as _createElementVNode10, renderSlot as _renderSlot11, normalizeStyle as _normalizeStyle6, normalizeClass as _normalizeClass15 } from "vue";
import { computed as computed12 } from "vue";
var _hoisted_121 = { class: "wd-descriptions__label" };
var _hoisted_212 = {
  key: 0,
  class: "wd-descriptions__colon"
};
var _hoisted_310 = { class: "wd-descriptions__value" };
var _hoisted_47 = {
  key: 0,
  class: "wd-descriptions__hint"
};
var _hoisted_56 = {
  key: 0,
  class: "wd-descriptions__empty"
};
var WdDescriptions_default = /* @__PURE__ */ _defineComponent17({
  ...{ name: "WdDescriptions" },
  __name: "WdDescriptions",
  props: {
    items: { type: Array, required: false, default: () => [] },
    columns: { type: Number, required: false, default: 3 },
    vertical: { type: Boolean, required: false, default: false },
    striped: { type: Boolean, required: false, default: false },
    colon: { type: Boolean, required: false, default: false },
    size: { type: String, required: false, default: "md" }
  },
  setup(__props) {
    const props = __props;
    const rows = computed12(() => {
      const out = [];
      const cols = Math.max(1, props.columns);
      let cur = [];
      let used = 0;
      for (const it of props.items) {
        const span = Math.min(it.span || 1, cols);
        if (used + span > cols && cur.length) {
          out.push(cur);
          cur = [];
          used = 0;
        }
        cur.push({ ...it, span });
        used += span;
        if (used >= cols) {
          out.push(cur);
          cur = [];
          used = 0;
        }
      }
      if (cur.length) out.push(cur);
      return out;
    });
    const styleVars = computed12(() => ({ "--wd-desc-cols": String(Math.max(1, props.columns)) }));
    return (_ctx, _cache) => {
      return _openBlock17(), _createElementBlock17(
        "div",
        {
          class: _normalizeClass15(["wd-descriptions", {
            "wd-descriptions--vertical": __props.vertical,
            "wd-descriptions--striped": __props.striped,
            [`wd-descriptions--${__props.size}`]: true
          }]),
          style: _normalizeStyle6(styleVars.value)
        },
        [
          (_openBlock17(true), _createElementBlock17(
            _Fragment10,
            null,
            _renderList9(rows.value, (row, ri) => {
              return _openBlock17(), _createElementBlock17("div", {
                key: ri,
                class: "wd-descriptions__row"
              }, [
                (_openBlock17(true), _createElementBlock17(
                  _Fragment10,
                  null,
                  _renderList9(row, (item, ci) => {
                    return _openBlock17(), _createElementBlock17(
                      "div",
                      {
                        key: ci,
                        class: "wd-descriptions__item",
                        style: _normalizeStyle6({ "--wd-desc-span": String(item.span || 1) })
                      },
                      [
                        _createElementVNode10("div", _hoisted_121, [
                          _createTextVNode7(
                            _toDisplayString13(item.label),
                            1
                            /* TEXT */
                          ),
                          __props.colon ? (_openBlock17(), _createElementBlock17("span", _hoisted_212, "\uFF1A")) : _createCommentVNode12("v-if", true)
                        ]),
                        _createElementVNode10("div", _hoisted_310, [
                          _renderSlot11(_ctx.$slots, item.key || "", {
                            item,
                            value: item.value
                          }, () => [
                            _createTextVNode7(
                              _toDisplayString13(item.value ?? "\u2014"),
                              1
                              /* TEXT */
                            )
                          ]),
                          item.hint ? (_openBlock17(), _createElementBlock17(
                            "span",
                            _hoisted_47,
                            _toDisplayString13(item.hint),
                            1
                            /* TEXT */
                          )) : _createCommentVNode12("v-if", true)
                        ])
                      ],
                      4
                      /* STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          !__props.items.length ? (_openBlock17(), _createElementBlock17("div", _hoisted_56, [
            _renderSlot11(_ctx.$slots, "empty", {}, () => [
              _cache[0] || (_cache[0] = _createTextVNode7(
                "\u2014",
                -1
                /* CACHED */
              ))
            ])
          ])) : _createCommentVNode12("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

// .lib-build/WdDivider.ts
import { defineComponent as _defineComponent18 } from "vue";
import { renderSlot as _renderSlot12, openBlock as _openBlock18, createElementBlock as _createElementBlock18, createCommentVNode as _createCommentVNode13, normalizeClass as _normalizeClass16, normalizeStyle as _normalizeStyle7 } from "vue";
import { computed as computed13 } from "vue";
var _hoisted_124 = {
  key: 0,
  class: "wd-divider__text"
};
var WdDivider_default = /* @__PURE__ */ _defineComponent18({
  ...{ name: "WdDivider" },
  __name: "WdDivider",
  props: {
    direction: { type: String, required: false, default: "horizontal" },
    align: { type: String, required: false, default: "center" },
    variant: { type: String, required: false, default: "solid" },
    spacing: { type: Number, required: false, default: 16 }
  },
  setup(__props) {
    const props = __props;
    const isHorizontal = computed13(() => props.direction === "horizontal");
    const classes = computed13(() => [
      "wd-divider",
      `wd-divider--${props.direction}`,
      // ← 之前漏了这个，水平线的 ::before 规则因此从未命中
      `wd-divider--${props.variant}`,
      ...isHorizontal.value ? [`wd-divider--${props.align}`] : []
    ]);
    const style = computed13(
      () => isHorizontal.value ? { marginTop: `${props.spacing}px`, marginBottom: `${props.spacing}px` } : { marginLeft: `${props.spacing / 2}px`, marginRight: `${props.spacing / 2}px` }
    );
    return (_ctx, _cache) => {
      return isHorizontal.value ? (_openBlock18(), _createElementBlock18(
        "div",
        {
          key: 0,
          class: _normalizeClass16(classes.value),
          style: _normalizeStyle7(style.value),
          role: "separator",
          "aria-orientation": "horizontal"
        },
        [
          _ctx.$slots.default ? (_openBlock18(), _createElementBlock18("span", _hoisted_124, [
            _renderSlot12(_ctx.$slots, "default")
          ])) : _createCommentVNode13("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      )) : (_openBlock18(), _createElementBlock18(
        "span",
        {
          key: 1,
          class: _normalizeClass16(classes.value),
          style: _normalizeStyle7(style.value),
          role: "separator",
          "aria-orientation": "vertical"
        },
        null,
        6
        /* CLASS, STYLE */
      ));
    };
  }
});

// .lib-build/WdDrawer.ts
import { defineComponent as _defineComponent19 } from "vue";
import { createCommentVNode as _createCommentVNode14, createElementVNode as _createElementVNode11, toDisplayString as _toDisplayString14, resolveComponent as _resolveComponent9, createVNode as _createVNode9, renderSlot as _renderSlot13, openBlock as _openBlock19, createElementBlock as _createElementBlock19, vShow as _vShow, normalizeClass as _normalizeClass17, normalizeStyle as _normalizeStyle8, withDirectives as _withDirectives2, Teleport as _Teleport2, createBlock as _createBlock4 } from "vue";
import { computed as computed14, ref as ref11, toRef, watchEffect as watchEffect2 } from "vue";

// .lib-build/overlay.ts
import { onBeforeUnmount as onBeforeUnmount7, ref as ref10, watch as watch6 } from "vue";
var lockCount = 0;
var savedOverflow = "";
var savedPadding = "";
function lockScroll() {
  if (lockCount === 0) {
    const body = document.body;
    savedOverflow = body.style.overflow;
    savedPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
  }
  lockCount++;
}
function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow;
    document.body.style.paddingRight = savedPadding;
  }
}
function useScrollLock(open) {
  let locked = false;
  const apply = (v) => {
    if (v && !locked) {
      lockScroll();
      locked = true;
    } else if (!v && locked) {
      unlockScroll();
      locked = false;
    }
  };
  watch6(open, apply, { immediate: true });
  onBeforeUnmount7(() => {
    if (locked) {
      unlockScroll();
      locked = false;
    }
  });
}
var FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(", ");
function useFocusTrap(open, panel, onEsc) {
  installOverlayKeyboard();
  const layer = useOverlayLayer(open, panel, onEsc);
  let restoreTo = null;
  function focusables() {
    if (!panel.value) return [];
    return Array.from(panel.value.querySelectorAll(FOCUSABLE)).filter((el) => el.offsetParent !== null || el === document.activeElement);
  }
  function onKeydown(e) {
    if (!open.value || e.key !== "Tab") return;
    if (!layer.isTop()) return;
    const nodes = focusables();
    if (!nodes.length) {
      e.preventDefault();
      return;
    }
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement;
    if (e.shiftKey) {
      if (active === first || !panel.value?.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last || !panel.value?.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  }
  watch6(open, async (v) => {
    if (v) {
      restoreTo = document.activeElement;
      await Promise.resolve();
      setTimeout(() => {
        const nodes = focusables();
        if (nodes.length) nodes[0].focus();
        else panel.value?.focus?.();
      }, 0);
    } else if (restoreTo) {
      if (document.contains(restoreTo)) restoreTo.focus();
      else {
        const top = topOverlay();
        const el = top?.panel.value;
        if (el) el.focus?.();
      }
      restoreTo = null;
    }
  });
  if (typeof document !== "undefined") {
    document.addEventListener("keydown", onKeydown, true);
  }
  onBeforeUnmount7(() => {
    document.removeEventListener("keydown", onKeydown, true);
    if (restoreTo && document.contains(restoreTo)) restoreTo.focus();
  });
}

// .lib-build/WdDrawer.ts
var _hoisted_125 = { class: "wd-drawer__head" };
var _hoisted_213 = { class: "wd-drawer__title" };
var _hoisted_311 = { class: "wd-drawer__body" };
var _hoisted_48 = {
  key: 0,
  class: "wd-drawer__foot"
};
var WdDrawer_default = /* @__PURE__ */ _defineComponent19({
  ...{ name: "WdDrawer" },
  __name: "WdDrawer",
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    title: { type: String, required: false, default: "" },
    side: { type: String, required: false, default: "right" },
    closeOnMask: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const POP_DURATION = popDuration();
    const props = __props;
    const emit = __emit;
    const classes = computed14(() => ["wd-drawer", props.side === "left" ? "wd-drawer--left" : ""]);
    const panel = ref11(null);
    const mounted = ref11(false);
    watchEffect2(() => {
      if (props.modelValue) mounted.value = true;
    });
    const openRef = toRef(props, "modelValue");
    const myZ = ref11(0);
    watchEffect2(() => {
      if (props.modelValue) myZ.value = nextZIndex();
    });
    useScrollLock(openRef);
    useFocusTrap(openRef, panel, () => {
      close();
      return true;
    });
    function close() {
      emit("update:modelValue", false);
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent9("wd-icon");
      return _openBlock19(), _createBlock4(_Teleport2, { to: "body" }, [
        _createCommentVNode14(" \u540C Modal\uFF1A\u663E\u9690\u7531 .is-open + display \u4FDD\u8BC1\uFF0C\u4E0D\u4F9D\u8D56 Transition \u7684\u65F6\u5E8F "),
        _withDirectives2(_createElementVNode11(
          "div",
          {
            class: _normalizeClass17([classes.value, { "is-open": __props.modelValue }]),
            role: "dialog",
            "aria-modal": "true",
            style: _normalizeStyle8({ zIndex: myZ.value })
          },
          [
            _createElementVNode11("div", {
              class: "wd-drawer__mask",
              onClick: _cache[0] || (_cache[0] = ($event) => __props.closeOnMask && close())
            }),
            _createElementVNode11(
              "div",
              {
                ref_key: "panel",
                ref: panel,
                class: "wd-drawer__panel",
                tabindex: "-1"
              },
              [
                _createElementVNode11("div", _hoisted_125, [
                  _createElementVNode11(
                    "div",
                    _hoisted_213,
                    _toDisplayString14(__props.title),
                    1
                    /* TEXT */
                  ),
                  _createElementVNode11("button", {
                    type: "button",
                    class: "wd-icon-btn",
                    "aria-label": "\u5173\u95ED",
                    onClick: close
                  }, [
                    _createVNode9(_component_wd_icon, {
                      name: "close",
                      size: 15
                    })
                  ])
                ]),
                _createElementVNode11("div", _hoisted_311, [
                  _renderSlot13(_ctx.$slots, "default")
                ]),
                _ctx.$slots.footer ? (_openBlock19(), _createElementBlock19("div", _hoisted_48, [
                  _renderSlot13(_ctx.$slots, "footer")
                ])) : _createCommentVNode14("v-if", true)
              ],
              512
              /* NEED_PATCH */
            )
          ],
          6
          /* CLASS, STYLE */
        ), [
          [_vShow, mounted.value]
        ])
      ]);
    };
  }
});

// .lib-build/WdDropdown.ts
import { defineComponent as _defineComponent20 } from "vue";
import { renderSlot as _renderSlot14, withModifiers as _withModifiers2, withKeys as _withKeys, createElementVNode as _createElementVNode12, unref as _unref2, renderList as _renderList10, Fragment as _Fragment11, openBlock as _openBlock20, createElementBlock as _createElementBlock20, toDisplayString as _toDisplayString15, normalizeClass as _normalizeClass18, createCommentVNode as _createCommentVNode15, Transition as _Transition2, withCtx as _withCtx2, createVNode as _createVNode10 } from "vue";
import { onBeforeUnmount as onBeforeUnmount8, onMounted as onMounted4, ref as ref12 } from "vue";
var _hoisted_126 = ["aria-expanded"];
var _hoisted_214 = {
  key: 0,
  class: "wd-dropdown__menu",
  role: "menu"
};
var _hoisted_312 = ["onClick"];
var WdDropdown_default = /* @__PURE__ */ _defineComponent20({
  ...{ name: "WdDropdown" },
  __name: "WdDropdown",
  props: {
    items: { type: Array, required: false, default: () => [] }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const POP_DURATION = popDuration();
    const props = __props;
    const emit = __emit;
    const open = ref12(false);
    const root = ref12();
    useOverlayLayer(open, root, () => {
      open.value = false;
      return true;
    });
    function pick(item) {
      if (item.disabled) return;
      emit("select", item.value);
      open.value = false;
    }
    function onDocClick(e) {
      if (root.value && !root.value.contains(e.target)) open.value = false;
    }
    function onKey(e) {
    }
    onMounted4(() => {
      document.addEventListener("click", onDocClick);
      document.addEventListener("keydown", onKey);
    });
    onBeforeUnmount8(() => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    });
    return (_ctx, _cache) => {
      return _openBlock20(), _createElementBlock20(
        "span",
        {
          ref_key: "root",
          ref: root,
          class: "wd-dropdown"
        },
        [
          _createElementVNode12("span", {
            class: "wd-dropdown__trigger",
            role: "button",
            tabindex: "0",
            "aria-haspopup": true,
            "aria-expanded": open.value,
            onKeydown: [
              _cache[0] || (_cache[0] = _withKeys(_withModifiers2(($event) => open.value = !open.value, ["prevent"]), ["enter"])),
              _cache[1] || (_cache[1] = _withKeys(_withModifiers2(($event) => open.value = !open.value, ["prevent"]), ["space"]))
            ],
            onClick: _cache[2] || (_cache[2] = ($event) => open.value = !open.value)
          }, [
            _renderSlot14(_ctx.$slots, "default")
          ], 40, _hoisted_126),
          _createVNode10(_Transition2, {
            name: "wd-pop",
            duration: _unref2(POP_DURATION)
          }, {
            default: _withCtx2(() => [
              open.value ? (_openBlock20(), _createElementBlock20("div", _hoisted_214, [
                (_openBlock20(true), _createElementBlock20(
                  _Fragment11,
                  null,
                  _renderList10(props.items, (it) => {
                    return _openBlock20(), _createElementBlock20("button", {
                      key: it.value,
                      type: "button",
                      role: "menuitem",
                      class: _normalizeClass18(["wd-dropdown__item", { "wd-dropdown__item--danger": it.danger, "wd-dropdown__item--disabled": it.disabled }]),
                      "data-wd-hover": "",
                      onClick: ($event) => pick(it)
                    }, _toDisplayString15(it.label), 11, _hoisted_312);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : _createCommentVNode15("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }, 8, ["duration"])
        ],
        512
        /* NEED_PATCH */
      );
    };
  }
});

// .lib-build/WdEmpty.ts
import { defineComponent as _defineComponent21 } from "vue";
import { renderSlot as _renderSlot15, resolveComponent as _resolveComponent10, createVNode as _createVNode11, createElementVNode as _createElementVNode13, toDisplayString as _toDisplayString16, openBlock as _openBlock21, createElementBlock as _createElementBlock21, createCommentVNode as _createCommentVNode16, createTextVNode as _createTextVNode8 } from "vue";
var _hoisted_127 = { class: "wd-empty" };
var _hoisted_215 = { class: "wd-empty__icon" };
var _hoisted_313 = {
  key: 0,
  class: "wd-empty__title"
};
var _hoisted_49 = {
  key: 1,
  class: "wd-empty__desc"
};
var _hoisted_57 = {
  key: 2,
  class: "wd-empty__action"
};
var WdEmpty_default = /* @__PURE__ */ _defineComponent21({
  ...{ name: "WdEmpty" },
  __name: "WdEmpty",
  props: {
    title: { type: String, required: false, default: "\u6682\u65E0\u6570\u636E" },
    description: { type: String, required: false, default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent10("wd-icon");
      return _openBlock21(), _createElementBlock21("div", _hoisted_127, [
        _createElementVNode13("div", _hoisted_215, [
          _renderSlot15(_ctx.$slots, "icon", {}, () => [
            _createVNode11(_component_wd_icon, {
              name: "folder-open",
              size: 30,
              style: { "opacity": ".5" }
            })
          ])
        ]),
        __props.title ? (_openBlock21(), _createElementBlock21(
          "div",
          _hoisted_313,
          _toDisplayString16(__props.title),
          1
          /* TEXT */
        )) : _createCommentVNode16("v-if", true),
        __props.description || _ctx.$slots.description ? (_openBlock21(), _createElementBlock21("div", _hoisted_49, [
          _renderSlot15(_ctx.$slots, "description", {}, () => [
            _createTextVNode8(
              _toDisplayString16(__props.description),
              1
              /* TEXT */
            )
          ])
        ])) : _createCommentVNode16("v-if", true),
        _ctx.$slots.action ? (_openBlock21(), _createElementBlock21("div", _hoisted_57, [
          _renderSlot15(_ctx.$slots, "action")
        ])) : _createCommentVNode16("v-if", true)
      ]);
    };
  }
});

// .lib-build/WdExplorer.ts
import { defineComponent as _defineComponent22 } from "vue";
import { createElementVNode as _createElementVNode14, renderList as _renderList11, Fragment as _Fragment12, openBlock as _openBlock22, createElementBlock as _createElementBlock22, resolveComponent as _resolveComponent11, createVNode as _createVNode12, toDisplayString as _toDisplayString17, normalizeClass as _normalizeClass19, createCommentVNode as _createCommentVNode17 } from "vue";
import { computed as computed15, ref as ref13 } from "vue";
var _hoisted_128 = { class: "wd-explorer" };
var _hoisted_216 = { class: "wd-explorer__side" };
var _hoisted_314 = ["onClick"];
var _hoisted_410 = { class: "wd-explorer__folder-name" };
var _hoisted_58 = { class: "wd-explorer__count" };
var _hoisted_65 = { class: "wd-explorer__main" };
var _hoisted_75 = { class: "wd-explorer__bar" };
var _hoisted_85 = { class: "wd-explorer__path" };
var _hoisted_95 = { class: "wd-explorer__crumb wd-explorer__crumb--cur" };
var _hoisted_105 = { class: "wd-explorer__views" };
var _hoisted_1110 = {
  key: 0,
  class: "wd-explorer__table"
};
var _hoisted_129 = ["onClick"];
var _hoisted_133 = { class: "wd-explorer__name" };
var _hoisted_143 = { class: "wd-explorer__file-chip" };
var _hoisted_152 = { class: "wd-explorer__file-name" };
var _hoisted_162 = { class: "is-num" };
var _hoisted_172 = { class: "is-num" };
var _hoisted_182 = {
  key: 1,
  class: "wd-explorer__grid"
};
var _hoisted_192 = ["onClick"];
var _hoisted_202 = { class: "wd-explorer__tile-icon" };
var _hoisted_21 = { class: "wd-explorer__tile-name" };
var _hoisted_222 = { class: "wd-explorer__tile-size" };
var _hoisted_232 = {
  key: 2,
  class: "wd-explorer__empty"
};
var WdExplorer_default = /* @__PURE__ */ _defineComponent22({
  ...{ name: "WdExplorer" },
  __name: "WdExplorer",
  props: {
    folders: { type: Array, required: false, default: () => [] },
    view: { type: String, required: false, default: "details" }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const active = ref13(0);
    const mode = ref13(props.view);
    const current = computed15(() => props.folders[active.value] || { name: "", files: [] });
    function fmtSize(n) {
      if (!n) return "\u2014";
      if (n < 1024) return `${n} B`;
      if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
      return `${(n / 1048576).toFixed(1)} MB`;
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent11("wd-icon");
      return _openBlock22(), _createElementBlock22("div", _hoisted_128, [
        _createElementVNode14("div", _hoisted_216, [
          _cache[3] || (_cache[3] = _createElementVNode14(
            "div",
            { class: "wd-explorer__side-title" },
            "\u6587\u4EF6\u5939",
            -1
            /* CACHED */
          )),
          (_openBlock22(true), _createElementBlock22(
            _Fragment12,
            null,
            _renderList11(__props.folders, (f, i) => {
              return _openBlock22(), _createElementBlock22("button", {
                key: i,
                type: "button",
                class: _normalizeClass19(["wd-explorer__folder", { "wd-explorer__folder--active": i === active.value }]),
                onClick: ($event) => active.value = i
              }, [
                _createVNode12(_component_wd_icon, {
                  name: "folder",
                  size: 15
                }),
                _createElementVNode14(
                  "span",
                  _hoisted_410,
                  _toDisplayString17(f.name),
                  1
                  /* TEXT */
                ),
                _createElementVNode14(
                  "span",
                  _hoisted_58,
                  _toDisplayString17(f.files.length),
                  1
                  /* TEXT */
                )
              ], 10, _hoisted_314);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _createElementVNode14("div", _hoisted_65, [
          _createElementVNode14("div", _hoisted_75, [
            _createElementVNode14("div", _hoisted_85, [
              _createElementVNode14("span", {
                class: "wd-explorer__crumb",
                onClick: _cache[0] || (_cache[0] = ($event) => active.value = 0)
              }, "\u5168\u90E8\u6587\u4EF6"),
              _cache[4] || (_cache[4] = _createElementVNode14(
                "span",
                { class: "wd-explorer__sep" },
                "/",
                -1
                /* CACHED */
              )),
              _createElementVNode14(
                "span",
                _hoisted_95,
                _toDisplayString17(current.value.name),
                1
                /* TEXT */
              )
            ]),
            _createElementVNode14("div", _hoisted_105, [
              _createElementVNode14(
                "button",
                {
                  type: "button",
                  class: _normalizeClass19(["wd-explorer__view-btn", { "wd-explorer__view-btn--active": mode.value === "details" }]),
                  title: "\u8BE6\u60C5",
                  onClick: _cache[1] || (_cache[1] = ($event) => mode.value = "details")
                },
                [
                  _createVNode12(_component_wd_icon, {
                    name: "search",
                    size: 15
                  })
                ],
                2
                /* CLASS */
              ),
              _createElementVNode14(
                "button",
                {
                  type: "button",
                  class: _normalizeClass19(["wd-explorer__view-btn", { "wd-explorer__view-btn--active": mode.value === "icons" }]),
                  title: "\u56FE\u6807",
                  onClick: _cache[2] || (_cache[2] = ($event) => mode.value = "icons")
                },
                [
                  _createVNode12(_component_wd_icon, {
                    name: "layout-grid",
                    size: 15
                  })
                ],
                2
                /* CLASS */
              )
            ])
          ]),
          mode.value === "details" ? (_openBlock22(), _createElementBlock22("table", _hoisted_1110, [
            _cache[5] || (_cache[5] = _createElementVNode14(
              "colgroup",
              null,
              [
                _createElementVNode14("col"),
                _createElementVNode14("col", { style: { "width": "96px" } }),
                _createElementVNode14("col", { style: { "width": "118px" } })
              ],
              -1
              /* CACHED */
            )),
            _cache[6] || (_cache[6] = _createElementVNode14(
              "thead",
              null,
              [
                _createElementVNode14("tr", null, [
                  _createElementVNode14("th", null, "\u540D\u79F0"),
                  _createElementVNode14("th", { class: "is-num" }, "\u5927\u5C0F"),
                  _createElementVNode14("th", { class: "is-num" }, "\u4FEE\u6539\u65F6\u95F4")
                ])
              ],
              -1
              /* CACHED */
            )),
            _createElementVNode14("tbody", null, [
              (_openBlock22(true), _createElementBlock22(
                _Fragment12,
                null,
                _renderList11(current.value.files, (f, i) => {
                  return _openBlock22(), _createElementBlock22("tr", {
                    key: i,
                    onClick: ($event) => emit("select", f)
                  }, [
                    _createElementVNode14("td", null, [
                      _createElementVNode14("span", _hoisted_133, [
                        _createElementVNode14("span", _hoisted_143, [
                          _createVNode12(_component_wd_icon, {
                            name: "file",
                            size: 15
                          })
                        ]),
                        _createElementVNode14(
                          "span",
                          _hoisted_152,
                          _toDisplayString17(f.name),
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    _createElementVNode14(
                      "td",
                      _hoisted_162,
                      _toDisplayString17(fmtSize(f.size)),
                      1
                      /* TEXT */
                    ),
                    _createElementVNode14(
                      "td",
                      _hoisted_172,
                      _toDisplayString17(f.modified || "\u2014"),
                      1
                      /* TEXT */
                    )
                  ], 8, _hoisted_129);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ])) : (_openBlock22(), _createElementBlock22("div", _hoisted_182, [
            (_openBlock22(true), _createElementBlock22(
              _Fragment12,
              null,
              _renderList11(current.value.files, (f, i) => {
                return _openBlock22(), _createElementBlock22("button", {
                  key: i,
                  type: "button",
                  class: "wd-explorer__tile",
                  onClick: ($event) => emit("select", f)
                }, [
                  _createElementVNode14("span", _hoisted_202, [
                    _createVNode12(_component_wd_icon, {
                      name: "folder-open",
                      size: 22
                    })
                  ]),
                  _createElementVNode14(
                    "span",
                    _hoisted_21,
                    _toDisplayString17(f.name),
                    1
                    /* TEXT */
                  ),
                  _createElementVNode14(
                    "span",
                    _hoisted_222,
                    _toDisplayString17(fmtSize(f.size)),
                    1
                    /* TEXT */
                  )
                ], 8, _hoisted_192);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])),
          !current.value.files.length ? (_openBlock22(), _createElementBlock22("div", _hoisted_232, "\u6B64\u6587\u4EF6\u5939\u4E3A\u7A7A")) : _createCommentVNode17("v-if", true)
        ])
      ]);
    };
  }
});

// .lib-build/WdFileList.ts
import { defineComponent as _defineComponent23 } from "vue";
import { renderList as _renderList12, Fragment as _Fragment13, openBlock as _openBlock23, createElementBlock as _createElementBlock23, createCommentVNode as _createCommentVNode18, resolveComponent as _resolveComponent12, createBlock as _createBlock5, normalizeClass as _normalizeClass20, createElementVNode as _createElementVNode15, toDisplayString as _toDisplayString18, normalizeStyle as _normalizeStyle9 } from "vue";
import { computed as computed16, ref as ref14 } from "vue";
var _hoisted_130 = { class: "wd-file-list" };
var _hoisted_217 = ["onClick"];
var _hoisted_315 = { class: "wd-file-list__icon" };
var _hoisted_411 = { class: "wd-file-list__name" };
var _hoisted_59 = { class: "wd-file-list__size" };
var WdFileList_default = /* @__PURE__ */ _defineComponent23({
  ...{ name: "WdFileList" },
  __name: "WdFileList",
  props: {
    items: { type: Array, required: false, default: () => [] }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const openPaths = ref14(/* @__PURE__ */ new Set());
    const rows = computed16(() => {
      const out = [];
      const walk = (nodes, depth, base) => {
        nodes.forEach((n, i) => {
          const path = `${base}${i}/`;
          out.push({ node: n, depth, path });
          if (n.type === "folder" && openPaths.value.has(path)) {
            walk(n.children || [], depth + 1, path);
          }
        });
      };
      walk(props.items, 0, "");
      return out;
    });
    function onRow(row) {
      if (row.node.type === "folder") {
        const s = new Set(openPaths.value);
        if (s.has(row.path)) s.delete(row.path);
        else s.add(row.path);
        openPaths.value = s;
      } else {
        emit("select", row.node);
      }
    }
    function fmtSize(n) {
      if (!n) return "";
      if (n < 1024) return `${n} B`;
      if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
      return `${(n / 1048576).toFixed(1)} MB`;
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent12("wd-icon");
      return _openBlock23(), _createElementBlock23("div", _hoisted_130, [
        (_openBlock23(true), _createElementBlock23(
          _Fragment13,
          null,
          _renderList12(rows.value, (row) => {
            return _openBlock23(), _createElementBlock23("div", {
              key: row.path,
              class: _normalizeClass20(["wd-file-list__row", `wd-file-list__row--${row.node.type || "file"}`]),
              style: _normalizeStyle9({ paddingLeft: 12 + row.depth * 20 + "px" }),
              onClick: ($event) => onRow(row)
            }, [
              _createCommentVNode18(" \u7BAD\u5934\u5217\u59CB\u7EC8\u5360\u4F4D\uFF1A\u6587\u4EF6\u5939\u4E0E\u6587\u4EF6\u7684\u56FE\u6807\u4FDD\u6301\u540C\u5217\u5BF9\u9F50 "),
              _createElementVNode15(
                "span",
                {
                  class: _normalizeClass20(["wd-file-list__chevron wd-chevron wd-chevron--right", { "wd-chevron--open": openPaths.value.has(row.path) }])
                },
                [
                  row.node.type === "folder" ? (_openBlock23(), _createBlock5(_component_wd_icon, {
                    key: 0,
                    name: "chevron-down",
                    size: 12
                  })) : _createCommentVNode18("v-if", true)
                ],
                2
                /* CLASS */
              ),
              _createElementVNode15("span", _hoisted_315, [
                row.node.type === "folder" ? (_openBlock23(), _createBlock5(_component_wd_icon, {
                  key: 0,
                  name: "folder",
                  size: 14
                })) : (_openBlock23(), _createBlock5(_component_wd_icon, {
                  key: 1,
                  name: "file",
                  size: 12
                }))
              ]),
              _createElementVNode15(
                "span",
                _hoisted_411,
                _toDisplayString18(row.node.name),
                1
                /* TEXT */
              ),
              _createElementVNode15(
                "span",
                _hoisted_59,
                _toDisplayString18(fmtSize(row.node.size)),
                1
                /* TEXT */
              )
            ], 14, _hoisted_217);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]);
    };
  }
});

// .lib-build/WdForm.ts
import { defineComponent as _defineComponent24 } from "vue";
import { renderSlot as _renderSlot16, withModifiers as _withModifiers3, normalizeClass as _normalizeClass21, openBlock as _openBlock24, createElementBlock as _createElementBlock24 } from "vue";
import { provide, reactive, ref as ref15 } from "vue";

// .lib-build/form-context.ts
var FORM_CONTEXT = Symbol("wd-form");
var FORM_ITEM_CONTEXT = Symbol("wd-form-item");
function isEmpty(v) {
  if (v === void 0 || v === null) return true;
  if (typeof v === "string") return v.trim() === "";
  if (Array.isArray(v)) return v.length === 0;
  return false;
}
async function runRules(rules, value, model) {
  for (const r of rules) {
    if (r.required && isEmpty(value)) {
      return r.message || "\u6B64\u9879\u4E3A\u5FC5\u586B";
    }
    if (isEmpty(value) && !r.required) continue;
    if (typeof value === "string") {
      if (r.min !== void 0 && value.length < r.min) {
        return r.message || `\u81F3\u5C11 ${r.min} \u4E2A\u5B57\u7B26`;
      }
      if (r.max !== void 0 && value.length > r.max) {
        return r.message || `\u6700\u591A ${r.max} \u4E2A\u5B57\u7B26`;
      }
    }
    if (r.pattern && typeof value === "string" && !r.pattern.test(value)) {
      return r.message || "\u683C\u5F0F\u4E0D\u6B63\u786E";
    }
    if (r.validator) {
      const out = await r.validator(value, model);
      if (out !== true) return typeof out === "string" ? out : r.message || "\u6821\u9A8C\u672A\u901A\u8FC7";
    }
  }
  return "";
}

// .lib-build/WdForm.ts
var WdForm_default = /* @__PURE__ */ _defineComponent24({
  ...{ name: "WdForm" },
  __name: "WdForm",
  props: {
    modelValue: { type: Object, required: false, default: () => ({}) },
    rules: { type: null, required: false, default: () => ({}) },
    labelPosition: { type: String, required: false, default: "top" },
    labelWidth: { type: String, required: false, default: "96px" },
    disabled: { type: Boolean, required: false, default: false },
    scrollToError: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue", "submit", "validate"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const items = reactive(/* @__PURE__ */ new Map());
    function register(item) {
      items.set(item.prop, item);
    }
    function unregister(item) {
      items.delete(item.prop);
    }
    async function notifyChange(prop, trigger) {
      const item = items.get(prop);
      if (!item) return;
      await item.validate(trigger);
    }
    provide(FORM_CONTEXT, {
      model: () => props.modelValue,
      rules: () => props.rules,
      disabled: () => props.disabled,
      labelPosition: () => props.labelPosition,
      labelWidth: () => props.labelWidth,
      register,
      unregister,
      notifyChange
    });
    const validating = ref15(false);
    async function validate(prop) {
      validating.value = true;
      try {
        const targets = prop ? [items.get(prop)].filter(Boolean) : Array.from(items.values());
        const results = await Promise.all(targets.map((it) => it.validate()));
        const ok = results.every(Boolean);
        const errors = {};
        for (const it of targets) {
          const e = it.getError();
          if (e) errors[it.prop] = e;
        }
        emit("validate", ok, errors);
        if (!ok && props.scrollToError) scrollToFirstError(errors);
        return ok;
      } finally {
        validating.value = false;
      }
    }
    function scrollToFirstError(errors) {
      const first = Object.keys(errors)[0];
      if (!first) return;
      const el = formRef.value?.querySelector(`[data-form-prop="${first}"]`);
      el?.scrollIntoView?.({ block: "center", behavior: "smooth" });
    }
    function clearValidate(prop) {
      if (prop) items.get(prop)?.reset();
      else items.forEach((it) => it.reset());
    }
    function resetFields() {
      const model = { ...props.modelValue };
      items.forEach((it, prop) => {
        model[prop] = void 0;
        it.reset();
      });
      emit("update:modelValue", model);
    }
    function onSubmit() {
      validate().then((ok) => {
        if (ok) emit("submit", props.modelValue);
      });
    }
    const formRef = ref15(null);
    __expose({ validate, clearValidate, resetFields });
    return (_ctx, _cache) => {
      return _openBlock24(), _createElementBlock24(
        "form",
        {
          ref_key: "formRef",
          ref: formRef,
          class: _normalizeClass21(["wd-form", [`wd-form--label-${__props.labelPosition}`, { "wd-form--disabled": __props.disabled }]]),
          novalidate: "",
          onSubmit: _withModifiers3(onSubmit, ["prevent"])
        },
        [
          _renderSlot16(_ctx.$slots, "default")
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
});

// .lib-build/WdFormItem.ts
import { defineComponent as _defineComponent25 } from "vue";
import { unref as _unref3, openBlock as _openBlock25, createElementBlock as _createElementBlock25, createCommentVNode as _createCommentVNode19, toDisplayString as _toDisplayString19, createTextVNode as _createTextVNode9, normalizeStyle as _normalizeStyle10, renderSlot as _renderSlot17, createElementVNode as _createElementVNode16, normalizeClass as _normalizeClass22 } from "vue";
import { computed as computed17, inject, onBeforeUnmount as onBeforeUnmount9, ref as ref16, watch as watch7 } from "vue";
var _hoisted_131 = ["data-form-prop"];
var _hoisted_218 = {
  key: 0,
  class: "wd-form-item__req",
  "aria-hidden": "true"
};
var _hoisted_316 = {
  key: 0,
  class: "wd-form-item__error",
  role: "alert"
};
var _hoisted_412 = {
  key: 1,
  class: "wd-form-item__hint"
};
var WdFormItem_default = /* @__PURE__ */ _defineComponent25({
  ...{ name: "WdFormItem" },
  __name: "WdFormItem",
  props: {
    prop: { type: String, required: false, default: "" },
    label: { type: String, required: false },
    rules: { type: Array, required: false },
    required: { type: Boolean, required: false, default: false },
    hint: { type: String, required: false },
    validateTrigger: { type: null, required: false, default: "change" }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const form = inject(FORM_CONTEXT, null);
    const error = ref16("");
    const touched = ref16(false);
    const validating = ref16(false);
    const mergedRules = computed17(() => {
      if (props.rules?.length) return props.rules;
      if (!form || !props.prop) return [];
      return form.rules()[props.prop] ?? [];
    });
    const isRequired = computed17(
      () => props.required || mergedRules.value.some((r) => r.required)
    );
    function currentValue() {
      return form?.model()?.[props.prop];
    }
    async function validate(trigger) {
      if (!mergedRules.value.length) {
        error.value = "";
        return true;
      }
      const rules = trigger ? mergedRules.value.filter((r) => !r.trigger || r.trigger === trigger) : mergedRules.value;
      if (!rules.length) return true;
      validating.value = true;
      try {
        const msg = await runRules(rules, currentValue(), form?.model() ?? {});
        error.value = msg;
        touched.value = true;
        return !msg;
      } finally {
        validating.value = false;
      }
    }
    function reset() {
      error.value = "";
      touched.value = false;
    }
    if (form && props.prop) {
      form.register({ prop: props.prop, validate, reset, getError: () => error.value });
      onBeforeUnmount9(() => form.unregister({ prop: props.prop, validate, reset, getError: () => error.value }));
    }
    watch7(
      () => form && props.prop ? form.model()[props.prop] : void 0,
      (v, old) => {
        if (v === old) return;
        if (props.validateTrigger === "change") validate("change");
      }
    );
    function onFocusOut(e) {
      const next = e.relatedTarget;
      if (next && e.currentTarget.contains(next)) return;
      validate("blur");
    }
    const state = computed17(() => {
      if (validating.value) return "validating";
      if (error.value) return "error";
      if (touched.value && !isEmpty(currentValue())) return "success";
      return "";
    });
    const disabled = computed17(() => form?.disabled() ?? false);
    __expose({ validate, reset, error });
    return (_ctx, _cache) => {
      return _openBlock25(), _createElementBlock25("div", {
        class: _normalizeClass22(["wd-form-item", [`wd-form-item--${state.value}`, { "wd-form-item--disabled": disabled.value }]]),
        "data-form-prop": __props.prop || void 0
      }, [
        __props.label ? (_openBlock25(), _createElementBlock25(
          "label",
          {
            key: 0,
            class: "wd-form-item__label",
            style: _normalizeStyle10(_unref3(form)?.labelPosition() === "left" ? { width: _unref3(form)?.labelWidth() } : void 0)
          },
          [
            isRequired.value ? (_openBlock25(), _createElementBlock25("span", _hoisted_218, "*")) : _createCommentVNode19("v-if", true),
            _createTextVNode9(
              " " + _toDisplayString19(__props.label),
              1
              /* TEXT */
            )
          ],
          4
          /* STYLE */
        )) : _createCommentVNode19("v-if", true),
        _createElementVNode16(
          "div",
          {
            class: "wd-form-item__control",
            onFocusout: onFocusOut
          },
          [
            _renderSlot17(_ctx.$slots, "default"),
            error.value ? (_openBlock25(), _createElementBlock25(
              "p",
              _hoisted_316,
              _toDisplayString19(error.value),
              1
              /* TEXT */
            )) : __props.hint ? (_openBlock25(), _createElementBlock25(
              "p",
              _hoisted_412,
              _toDisplayString19(__props.hint),
              1
              /* TEXT */
            )) : _createCommentVNode19("v-if", true)
          ],
          32
          /* NEED_HYDRATION */
        )
      ], 10, _hoisted_131);
    };
  }
});

// .lib-build/WdGrid.ts
import { defineComponent as _defineComponent26 } from "vue";
import { renderSlot as _renderSlot18, normalizeStyle as _normalizeStyle11, openBlock as _openBlock26, createElementBlock as _createElementBlock26 } from "vue";
import { computed as computed18 } from "vue";
var WdGrid_default = /* @__PURE__ */ _defineComponent26({
  ...{ name: "WdGrid" },
  __name: "WdGrid",
  props: {
    columns: { type: [Number, String], required: false, default: 1 },
    gap: { type: String, required: false, default: "md" },
    gutter: { type: Number, required: false }
  },
  setup(__props) {
    const props = __props;
    const cols = computed18(() => {
      if (props.columns === "auto") return "repeat(auto-fit, minmax(200px, 1fr))";
      return `repeat(${props.columns}, 1fr)`;
    });
    const gapValue = computed18(() => {
      if (props.gutter) `${props.gutter}px`;
      const val = { sm: 8, md: 16, lg: 24 }[props.gap] || 16;
      return `${val}px`;
    });
    return (_ctx, _cache) => {
      return _openBlock26(), _createElementBlock26(
        "div",
        {
          class: "wd-grid",
          style: _normalizeStyle11({ gridTemplateColumns: cols.value, gap: gapValue.value })
        },
        [
          _renderSlot18(_ctx.$slots, "default")
        ],
        4
        /* STYLE */
      );
    };
  }
});

// .lib-build/WdImagePreview.ts
import { defineComponent as _defineComponent27 } from "vue";
import { renderSlot as _renderSlot19, openBlock as _openBlock27, createElementBlock as _createElementBlock27, createCommentVNode as _createCommentVNode20, createElementVNode as _createElementVNode17, unref as _unref4, normalizeStyle as _normalizeStyle12, withModifiers as _withModifiers4, toDisplayString as _toDisplayString20, resolveComponent as _resolveComponent13, createVNode as _createVNode13, Transition as _Transition3, withCtx as _withCtx3, Teleport as _Teleport3, createBlock as _createBlock6, Fragment as _Fragment14 } from "vue";
import { computed as computed19, ref as ref17, watch as watch8 } from "vue";
var _hoisted_134 = ["src", "alt"];
var _hoisted_219 = {
  key: 0,
  class: "wd-preview"
};
var _hoisted_317 = ["src", "alt"];
var _hoisted_413 = {
  key: 0,
  class: "wd-preview__count"
};
var _hoisted_510 = { class: "wd-preview__toolbar" };
var WdImagePreview_default = /* @__PURE__ */ _defineComponent27({
  ...{ name: "WdImagePreview" },
  __name: "WdImagePreview",
  props: {
    src: { type: String, required: false, default: "" },
    list: { type: Array, required: false, default: () => [] },
    alt: { type: String, required: false, default: "" },
    index: { type: Number, required: false, default: 0 }
  },
  setup(__props) {
    const POP_DURATION = popDuration();
    const props = __props;
    const open = ref17(false);
    const cur = ref17(props.index);
    const scale = ref17(1);
    const rotate = ref17(0);
    const images = computed19(() => props.list.length ? props.list : props.src ? [props.src] : []);
    watch8(
      () => props.index,
      (v) => {
        cur.value = v;
      }
    );
    function view(i) {
      const n = images.value.length;
      if (!n) return;
      cur.value = (i % n + n) % n;
      scale.value = 1;
      rotate.value = 0;
    }
    function zoom(d) {
      scale.value = Math.min(4, Math.max(0.4, Math.round((scale.value + d) * 100) / 100));
    }
    function resetView() {
      scale.value = 1;
      rotate.value = 0;
    }
    function openPreview() {
      if (!images.value.length) return;
      resetView();
      open.value = true;
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent13("wd-icon");
      return _openBlock27(), _createElementBlock27(
        _Fragment14,
        null,
        [
          _createElementVNode17("span", {
            class: "wd-image-preview",
            onClick: openPreview
          }, [
            _renderSlot19(_ctx.$slots, "default", {}, () => [
              __props.src || __props.list.length ? (_openBlock27(), _createElementBlock27("img", {
                key: 0,
                src: __props.src || images.value[0],
                alt: __props.alt,
                class: "wd-image-preview__thumb"
              }, null, 8, _hoisted_134)) : _createCommentVNode20("v-if", true)
            ])
          ]),
          (_openBlock27(), _createBlock6(_Teleport3, { to: "body" }, [
            _createVNode13(_Transition3, {
              name: "wd-preview-fade",
              duration: _unref4(POP_DURATION)
            }, {
              default: _withCtx3(() => [
                open.value ? (_openBlock27(), _createElementBlock27("div", _hoisted_219, [
                  _createElementVNode17("div", {
                    class: "wd-preview__mask",
                    onClick: _cache[0] || (_cache[0] = ($event) => open.value = false)
                  }),
                  _createElementVNode17(
                    "div",
                    {
                      class: "wd-preview__stage",
                      onWheel: _cache[1] || (_cache[1] = _withModifiers4(($event) => zoom($event.deltaY > 0 ? -0.15 : 0.15), ["prevent"]))
                    },
                    [
                      _createElementVNode17("img", {
                        class: "wd-preview__img",
                        src: images.value[cur.value],
                        alt: __props.alt,
                        style: _normalizeStyle12({ transform: `scale(${scale.value}) rotate(${rotate.value}deg)` })
                      }, null, 12, _hoisted_317)
                    ],
                    32
                    /* NEED_HYDRATION */
                  ),
                  images.value.length > 1 ? (_openBlock27(), _createElementBlock27(
                    "div",
                    _hoisted_413,
                    _toDisplayString20(cur.value + 1) + " / " + _toDisplayString20(images.value.length),
                    1
                    /* TEXT */
                  )) : _createCommentVNode20("v-if", true),
                  _createElementVNode17("div", _hoisted_510, [
                    images.value.length > 1 ? (_openBlock27(), _createElementBlock27("button", {
                      key: 0,
                      type: "button",
                      class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                      "aria-label": "\u4E0A\u4E00\u5F20",
                      onClick: _cache[2] || (_cache[2] = ($event) => view(cur.value - 1))
                    }, "\u2039")) : _createCommentVNode20("v-if", true),
                    _createElementVNode17("button", {
                      type: "button",
                      class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                      "aria-label": "\u65CB\u8F6C",
                      onClick: _cache[3] || (_cache[3] = ($event) => rotate.value = (rotate.value + 90) % 360)
                    }, "\u21BB"),
                    _createElementVNode17("button", {
                      type: "button",
                      class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                      "aria-label": "\u7F29\u5C0F",
                      onClick: _cache[4] || (_cache[4] = ($event) => zoom(-0.25))
                    }, "\u2212"),
                    _createElementVNode17("button", {
                      type: "button",
                      class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                      "aria-label": "\u653E\u5927",
                      onClick: _cache[5] || (_cache[5] = ($event) => zoom(0.25))
                    }, "\uFF0B"),
                    _createElementVNode17("button", {
                      type: "button",
                      class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                      "aria-label": "\u8FD8\u539F",
                      onClick: resetView
                    }, "1:1"),
                    images.value.length > 1 ? (_openBlock27(), _createElementBlock27("button", {
                      key: 1,
                      type: "button",
                      class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                      "aria-label": "\u4E0B\u4E00\u5F20",
                      onClick: _cache[6] || (_cache[6] = ($event) => view(cur.value + 1))
                    }, "\u203A")) : _createCommentVNode20("v-if", true),
                    _createElementVNode17("button", {
                      type: "button",
                      class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                      "aria-label": "\u5173\u95ED",
                      onClick: _cache[7] || (_cache[7] = ($event) => open.value = false)
                    }, [
                      _createVNode13(_component_wd_icon, {
                        name: "close",
                        size: 13
                      })
                    ])
                  ])
                ])) : _createCommentVNode20("v-if", true)
              ]),
              _: 1
              /* STABLE */
            }, 8, ["duration"])
          ]))
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});

// .lib-build/WdInput.ts
import { defineComponent as _defineComponent28 } from "vue";
import { renderSlot as _renderSlot20, openBlock as _openBlock28, createElementBlock as _createElementBlock28, createCommentVNode as _createCommentVNode21, createElementVNode as _createElementVNode18, resolveComponent as _resolveComponent14, createVNode as _createVNode14, withModifiers as _withModifiers5, toDisplayString as _toDisplayString21, normalizeClass as _normalizeClass23 } from "vue";
import { computed as computed20, ref as ref18 } from "vue";
var _hoisted_135 = {
  key: 0,
  class: "wd-input__icon"
};
var _hoisted_220 = ["type", "value", "placeholder", "disabled", "readonly", "maxlength"];
var _hoisted_318 = {
  key: 2,
  class: "wd-input__count"
};
var WdInput_default = /* @__PURE__ */ _defineComponent28({
  ...{ name: "WdInput" },
  __name: "WdInput",
  props: {
    modelValue: { type: String, required: false, default: "" },
    placeholder: { type: String, required: false, default: "" },
    shape: { type: String, required: false, default: "pill" },
    type: { type: String, required: false, default: "text" },
    disabled: { type: Boolean, required: false, default: false },
    size: { type: String, required: false, default: "md" },
    clearable: { type: Boolean, required: false, default: false },
    maxlength: { type: Number, required: false },
    showCount: { type: Boolean, required: false, default: false },
    readonly: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue", "clear", "enter"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const el = ref18(null);
    const hasValue = computed20(() => props.modelValue.length > 0);
    const showClear = computed20(() => props.clearable && hasValue.value && !props.disabled && !props.readonly);
    const count = computed20(() => props.showCount && props.maxlength ? `${props.modelValue.length}/${props.maxlength}` : "");
    function onInput(event) {
      let v = event.target.value;
      if (props.maxlength && v.length > props.maxlength) {
        v = v.slice(0, props.maxlength);
        event.target.value = v;
      }
      emit("update:modelValue", v);
    }
    function clear() {
      emit("update:modelValue", "");
      emit("clear");
      el.value?.focus();
    }
    function onKeydown(e) {
      if (e.key === "Enter") emit("enter", props.modelValue);
    }
    __expose({ focus: () => el.value?.focus(), blur: () => el.value?.blur() });
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent14("wd-icon");
      return _openBlock28(), _createElementBlock28(
        "label",
        {
          class: _normalizeClass23(["wd-input", {
            "wd-input--rounded": __props.shape === "rounded",
            "wd-input--lg": __props.size === "lg",
            "wd-input--sm": __props.size === "sm",
            "wd-input--has-count": !!count.value
          }])
        },
        [
          _ctx.$slots.icon ? (_openBlock28(), _createElementBlock28("span", _hoisted_135, [
            _renderSlot20(_ctx.$slots, "icon")
          ])) : _createCommentVNode21("v-if", true),
          _createElementVNode18("input", {
            ref_key: "el",
            ref: el,
            type: __props.type,
            value: __props.modelValue,
            placeholder: __props.placeholder,
            disabled: __props.disabled,
            readonly: __props.readonly,
            maxlength: __props.maxlength,
            onInput,
            onKeydown
          }, null, 40, _hoisted_220),
          showClear.value ? (_openBlock28(), _createElementBlock28("button", {
            key: 1,
            type: "button",
            class: "wd-input__clear",
            "aria-label": "\u6E05\u9664",
            onClick: _withModifiers5(clear, ["prevent"])
          }, [
            _createVNode14(_component_wd_icon, {
              name: "close",
              size: 13
            })
          ])) : _createCommentVNode21("v-if", true),
          _renderSlot20(_ctx.$slots, "suffix"),
          count.value ? (_openBlock28(), _createElementBlock28(
            "span",
            _hoisted_318,
            _toDisplayString21(count.value),
            1
            /* TEXT */
          )) : _createCommentVNode21("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

// .lib-build/WdListItem.ts
import { defineComponent as _defineComponent29 } from "vue";
import { renderSlot as _renderSlot21, openBlock as _openBlock29, createElementBlock as _createElementBlock29, createCommentVNode as _createCommentVNode22, toDisplayString as _toDisplayString22, createElementVNode as _createElementVNode19, normalizeClass as _normalizeClass24 } from "vue";
var _hoisted_136 = {
  key: 0,
  class: "wd-list-item__icon"
};
var _hoisted_221 = { class: "wd-list-item__title" };
var _hoisted_319 = {
  key: 1,
  class: "wd-list-item__meta"
};
var WdListItem_default = /* @__PURE__ */ _defineComponent29({
  ...{ name: "WdListItem" },
  __name: "WdListItem",
  props: {
    title: { type: String, required: false, default: "" },
    meta: { type: String, required: false, default: "" },
    clickable: { type: Boolean, required: false, default: true }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _cache) => {
      return _openBlock29(), _createElementBlock29(
        "div",
        {
          "data-wd-hover": "",
          class: _normalizeClass24(["wd-list-item", { "wd-list-item--clickable": __props.clickable }]),
          onClick: _cache[0] || (_cache[0] = ($event) => __props.clickable && emit("click", $event))
        },
        [
          _ctx.$slots.icon ? (_openBlock29(), _createElementBlock29("span", _hoisted_136, [
            _renderSlot21(_ctx.$slots, "icon")
          ])) : _createCommentVNode22("v-if", true),
          _createElementVNode19(
            "span",
            _hoisted_221,
            _toDisplayString22(__props.title),
            1
            /* TEXT */
          ),
          __props.meta ? (_openBlock29(), _createElementBlock29(
            "span",
            _hoisted_319,
            _toDisplayString22(__props.meta),
            1
            /* TEXT */
          )) : _createCommentVNode22("v-if", true),
          _renderSlot21(_ctx.$slots, "extra")
        ],
        2
        /* CLASS */
      );
    };
  }
});

// .lib-build/WdModal.ts
import { defineComponent as _defineComponent30 } from "vue";
import { createCommentVNode as _createCommentVNode23, createElementVNode as _createElementVNode20, toDisplayString as _toDisplayString23, resolveComponent as _resolveComponent15, createVNode as _createVNode15, renderSlot as _renderSlot22, openBlock as _openBlock30, createElementBlock as _createElementBlock30, normalizeStyle as _normalizeStyle13, vShow as _vShow2, withModifiers as _withModifiers6, normalizeClass as _normalizeClass25, withDirectives as _withDirectives3, Teleport as _Teleport4, createBlock as _createBlock7 } from "vue";
import { computed as computed21, ref as ref19, toRef as toRef2, watchEffect as watchEffect3 } from "vue";
var _hoisted_137 = ["aria-label"];
var _hoisted_223 = { class: "wd-modal__head" };
var _hoisted_320 = { class: "wd-modal__title" };
var _hoisted_414 = { class: "wd-modal__body" };
var _hoisted_511 = {
  key: 0,
  class: "wd-modal__foot"
};
var WdModal_default = /* @__PURE__ */ _defineComponent30({
  ...{ name: "WdModal" },
  __name: "WdModal",
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    title: { type: String, required: false, default: "" },
    width: { type: [Number, String], required: false, default: 440 },
    closeOnMask: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const POP_DURATION = popDuration();
    const props = __props;
    const emit = __emit;
    const panel = ref19(null);
    const mounted = ref19(false);
    watchEffect3(() => {
      if (props.modelValue) mounted.value = true;
    });
    const openRef = toRef2(props, "modelValue");
    const myZ = ref19(0);
    watchEffect3(() => {
      if (props.modelValue) myZ.value = nextZIndex();
    });
    useScrollLock(openRef);
    useFocusTrap(openRef, panel, () => {
      close();
      return true;
    });
    const maxWidth = computed21(
      () => typeof props.width === "number" ? `${props.width}px` : props.width
    );
    function close() {
      emit("update:modelValue", false);
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent15("wd-icon");
      return _openBlock30(), _createBlock7(_Teleport4, { to: "body" }, [
        _createCommentVNode23("\n      \u4E0D\u7528 <Transition>\uFF1A\u5176 enter \u9636\u6BB5\u4F9D\u8D56 nextFrame\uFF0C\u52A8\u753B\u65F6\u949F\u505C\u6446\u65F6\n      \uFF08\u540E\u53F0\u6807\u7B7E\u9875 / \u65E0\u5934\u6E32\u67D3 / \u51CF\u5F31\u52A8\u6548\uFF09\u6C38\u4E0D\u63A8\u8FDB\uFF0Center-from \u4F1A\u6B8B\u7559\uFF0C\n      \u5173\u95ED\u65F6\u518D\u53E0 leave-* \u5C31\u5F7B\u5E95\u9500\u6BC1\u4E0D\u6389 \u2014\u2014 \u8868\u73B0\u4E3A\u300C\u5F39\u7A97\u5173\u4E0D\u6389\u3001\u8FD8\u6321\u7740\u70B9\u51FB\u300D\u3002\n      \u6539\u4E3A\u5E38\u9A7B\u8282\u70B9 + .is-open \u7C7B\uFF0C\u53EF\u89C1\u6027\u4EA4\u7ED9 display\uFF0C\u52A8\u753B\u53EA\u8D1F\u8D23\u597D\u770B\u3002\n    "),
        _withDirectives3(_createElementVNode20("div", {
          class: _normalizeClass25(["wd-modal", { "is-open": __props.modelValue }]),
          role: "dialog",
          "aria-modal": "true",
          "aria-label": __props.title || void 0,
          style: _normalizeStyle13({ zIndex: myZ.value }),
          onTransitionend: _cache[1] || (_cache[1] = _withModifiers6(
            //@ts-ignore
            (...args) => _ctx.onLeaveEnd && _ctx.onLeaveEnd(...args),
            ["self"]
          ))
        }, [
          _createElementVNode20("div", {
            class: "wd-modal__mask",
            onClick: _cache[0] || (_cache[0] = ($event) => __props.closeOnMask && close())
          }),
          _createElementVNode20(
            "div",
            {
              ref_key: "panel",
              ref: panel,
              class: "wd-modal__panel",
              tabindex: "-1",
              style: _normalizeStyle13({ maxWidth: maxWidth.value })
            },
            [
              _createElementVNode20("div", _hoisted_223, [
                _createElementVNode20(
                  "div",
                  _hoisted_320,
                  _toDisplayString23(__props.title),
                  1
                  /* TEXT */
                ),
                _createElementVNode20("button", {
                  type: "button",
                  class: "wd-icon-btn",
                  "aria-label": "\u5173\u95ED",
                  onClick: close
                }, [
                  _createVNode15(_component_wd_icon, {
                    name: "close",
                    size: 15
                  })
                ])
              ]),
              _createElementVNode20("div", _hoisted_414, [
                _renderSlot22(_ctx.$slots, "default")
              ]),
              _ctx.$slots.footer ? (_openBlock30(), _createElementBlock30("div", _hoisted_511, [
                _renderSlot22(_ctx.$slots, "footer")
              ])) : _createCommentVNode23("v-if", true)
            ],
            4
            /* STYLE */
          )
        ], 46, _hoisted_137), [
          [_vShow2, mounted.value]
        ])
      ]);
    };
  }
});

// .lib-build/WdNotification.ts
import { defineComponent as _defineComponent31 } from "vue";
import { unref as _unref5, normalizeClass as _normalizeClass26, createElementVNode as _createElementVNode21, toDisplayString as _toDisplayString24, openBlock as _openBlock31, createElementBlock as _createElementBlock31, createCommentVNode as _createCommentVNode24, renderSlot as _renderSlot23, createTextVNode as _createTextVNode10, resolveComponent as _resolveComponent16, createVNode as _createVNode16, Transition as _Transition4, withCtx as _withCtx4, Teleport as _Teleport5, createBlock as _createBlock8 } from "vue";
import { watchEffect as watchEffect4 } from "vue";
var _hoisted_138 = { class: "wd-notification__body" };
var _hoisted_224 = {
  key: 0,
  class: "wd-notification__title"
};
var _hoisted_321 = {
  key: 1,
  class: "wd-notification__desc"
};
var WdNotification_default = /* @__PURE__ */ _defineComponent31({
  ...{ name: "WdNotification" },
  __name: "WdNotification",
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    title: { type: String, required: false, default: "" },
    description: { type: String, required: false, default: "" },
    variant: { type: String, required: false, default: "info" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const POP_DURATION = popDuration();
    const props = __props;
    const emit = __emit;
    function close() {
      emit("update:modelValue", false);
    }
    watchEffect4((onCleanup) => {
      if (!props.modelValue) return;
      const fn = (e) => {
        if (e.key === "Escape") close();
      };
      document.addEventListener("keydown", fn);
      onCleanup(() => document.removeEventListener("keydown", fn));
    });
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent16("wd-icon");
      return _openBlock31(), _createBlock8(_Teleport5, { to: "body" }, [
        _createVNode16(_Transition4, {
          name: "wd-notification-fade",
          duration: _unref5(POP_DURATION)
        }, {
          default: _withCtx4(() => [
            __props.modelValue ? (_openBlock31(), _createElementBlock31(
              "div",
              {
                key: 0,
                class: _normalizeClass26(["wd-notification", `wd-notification--${__props.variant}`]),
                role: "alert"
              },
              [
                _createElementVNode21(
                  "span",
                  {
                    class: _normalizeClass26(["wd-notification__icon wd-dot wd-dot--lg", `wd-dot--${__props.variant}`])
                  },
                  null,
                  2
                  /* CLASS */
                ),
                _createElementVNode21("div", _hoisted_138, [
                  __props.title ? (_openBlock31(), _createElementBlock31(
                    "div",
                    _hoisted_224,
                    _toDisplayString24(__props.title),
                    1
                    /* TEXT */
                  )) : _createCommentVNode24("v-if", true),
                  __props.description || _ctx.$slots.default ? (_openBlock31(), _createElementBlock31("div", _hoisted_321, [
                    _renderSlot23(_ctx.$slots, "default", {}, () => [
                      _createTextVNode10(
                        _toDisplayString24(__props.description),
                        1
                        /* TEXT */
                      )
                    ])
                  ])) : _createCommentVNode24("v-if", true)
                ]),
                _createElementVNode21("button", {
                  type: "button",
                  class: "wd-icon-btn wd-icon-btn--ghost wd-icon-btn--sm",
                  "aria-label": "\u5173\u95ED",
                  onClick: close
                }, [
                  _createVNode16(_component_wd_icon, {
                    name: "close",
                    size: 13
                  })
                ])
              ],
              2
              /* CLASS */
            )) : _createCommentVNode24("v-if", true)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["duration"])
      ]);
    };
  }
});

// .lib-build/WdOtp.ts
import { defineComponent as _defineComponent32 } from "vue";
import { renderList as _renderList13, Fragment as _Fragment15, openBlock as _openBlock32, createElementBlock as _createElementBlock32 } from "vue";
import { ref as ref20 } from "vue";
var _hoisted_139 = ["value", "disabled", "onInput", "onKeydown"];
var WdOtp_default = /* @__PURE__ */ _defineComponent32({
  ...{ name: "WdOtp" },
  __name: "WdOtp",
  props: {
    modelValue: { type: String, required: false, default: "" },
    length: { type: Number, required: false, default: 6 },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const boxes = ref20([]);
    function charAt(i) {
      return props.modelValue[i] || "";
    }
    function onInput(i, e) {
      const el = e.target;
      const next = el.value.replace(/\D/g, "").slice(-1);
      const arr = props.modelValue.split("");
      arr[i] = next;
      emit("update:modelValue", arr.join("").slice(0, props.length));
      if (next && i < props.length - 1) boxes.value[i + 1]?.focus();
    }
    function onKeydown(i, e) {
      if (e.key === "Backspace" && !charAt(i) && i > 0) {
        const arr = props.modelValue.split("");
        arr[i - 1] = "";
        emit("update:modelValue", arr.join(""));
        boxes.value[i - 1]?.focus();
      }
      if (e.key === "ArrowLeft" && i > 0) boxes.value[i - 1]?.focus();
      if (e.key === "ArrowRight" && i < props.length - 1) boxes.value[i + 1]?.focus();
    }
    function onPaste(e) {
      e.preventDefault();
      const text = (e.clipboardData?.getData("text") || "").replace(/\D/g, "").slice(0, props.length);
      if (!text) return;
      emit("update:modelValue", text);
      boxes.value[Math.min(text.length, props.length - 1)]?.focus();
    }
    return (_ctx, _cache) => {
      return _openBlock32(), _createElementBlock32(
        "div",
        {
          class: "wd-otp",
          onPaste
        },
        [
          (_openBlock32(true), _createElementBlock32(
            _Fragment15,
            null,
            _renderList13(__props.length, (i) => {
              return _openBlock32(), _createElementBlock32("input", {
                key: i,
                ref_for: true,
                ref_key: "boxes",
                ref: boxes,
                class: "wd-otp__box",
                value: charAt(i - 1),
                disabled: __props.disabled,
                inputmode: "numeric",
                maxlength: "1",
                autocomplete: "one-time-code",
                onInput: ($event) => onInput(i - 1, $event),
                onKeydown: ($event) => onKeydown(i - 1, $event)
              }, null, 40, _hoisted_139);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        32
        /* NEED_HYDRATION */
      );
    };
  }
});

// .lib-build/WdPagination.ts
import { defineComponent as _defineComponent33 } from "vue";
import { toDisplayString as _toDisplayString25, openBlock as _openBlock33, createElementBlock as _createElementBlock33, createCommentVNode as _createCommentVNode25, resolveComponent as _resolveComponent17, createVNode as _createVNode17, createElementVNode as _createElementVNode22, Fragment as _Fragment16, renderList as _renderList14, normalizeClass as _normalizeClass27 } from "vue";
import { computed as computed22, ref as ref21 } from "vue";
var _hoisted_140 = {
  key: 0,
  class: "wd-pagination__total"
};
var _hoisted_225 = ["disabled"];
var _hoisted_322 = { class: "wd-pagination__simple-text" };
var _hoisted_415 = ["disabled"];
var _hoisted_512 = ["disabled"];
var _hoisted_66 = {
  key: 0,
  class: "wd-pagination__dots"
};
var _hoisted_76 = ["aria-current", "onClick"];
var _hoisted_86 = ["disabled"];
var _hoisted_96 = {
  key: 3,
  class: "wd-pagination__size"
};
var _hoisted_106 = ["value"];
var _hoisted_1111 = ["value"];
var WdPagination_default = /* @__PURE__ */ _defineComponent33({
  ...{ name: "WdPagination" },
  __name: "WdPagination",
  props: {
    modelValue: { type: Number, required: false, default: 1 },
    total: { type: Number, required: false, default: 0 },
    pageSize: { type: Number, required: false, default: 10 },
    simple: { type: Boolean, required: false, default: false },
    showTotal: { type: Boolean, required: false, default: false },
    showSizeChanger: { type: Boolean, required: false, default: false },
    pageSizes: { type: Array, required: false, default: () => [10, 20, 50] },
    compact: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue", "update:pageSize", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const animReady = ref21(false);
    const size = ref21(props.pageSize);
    const pageCount = computed22(() => Math.max(1, Math.ceil(props.total / size.value)));
    const range = computed22(() => {
      const n = pageCount.value;
      const cur = props.modelValue;
      if (!props.compact || n <= 7) return Array.from({ length: n }, (_, i) => i + 1);
      const pages = [1];
      const left = Math.max(2, cur - 1);
      const right = Math.min(n - 1, cur + 1);
      if (left > 2) pages.push("...");
      for (let i = left; i <= right; i++) pages.push(i);
      if (right < n - 1) pages.push("...");
      pages.push(n);
      return pages;
    });
    function go(p) {
      animReady.value = true;
      const v = Math.min(Math.max(1, p), pageCount.value);
      if (v === props.modelValue) return;
      emit("update:modelValue", v);
      emit("change", v, size.value);
    }
    function changeSize(e) {
      const v = Number(e.target.value);
      size.value = v;
      emit("update:pageSize", v);
      const max = Math.max(1, Math.ceil(props.total / v));
      const p = Math.min(props.modelValue, max);
      emit("update:modelValue", p);
      emit("change", p, v);
    }
    const from = computed22(() => pageCount.value ? (props.modelValue - 1) * size.value + 1 : 0);
    const to = computed22(() => Math.min(props.modelValue * size.value, props.total));
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent17("wd-icon");
      return _openBlock33(), _createElementBlock33(
        "nav",
        {
          class: _normalizeClass27(["wd-pagination", { "wd-pagination--anim-ready": animReady.value, "wd-pagination--simple": __props.simple }]),
          "aria-label": "\u5206\u9875"
        },
        [
          __props.showTotal ? (_openBlock33(), _createElementBlock33(
            "span",
            _hoisted_140,
            " \u7B2C " + _toDisplayString25(from.value) + "\u2013" + _toDisplayString25(to.value) + " \u6761 / \u5171 " + _toDisplayString25(__props.total) + " \u6761 ",
            1
            /* TEXT */
          )) : _createCommentVNode25("v-if", true),
          _createCommentVNode25(" \u7B80\u6D01\u6A21\u5F0F "),
          __props.simple ? (_openBlock33(), _createElementBlock33(
            _Fragment16,
            { key: 1 },
            [
              _createElementVNode22("button", {
                type: "button",
                class: "wd-pagination__btn",
                "data-wd-hover": "",
                disabled: __props.modelValue <= 1,
                "aria-label": "\u4E0A\u4E00\u9875",
                onClick: _cache[0] || (_cache[0] = ($event) => go(__props.modelValue - 1))
              }, [
                _createVNode17(_component_wd_icon, {
                  name: "chevron-left",
                  size: 14
                })
              ], 8, _hoisted_225),
              _createElementVNode22(
                "span",
                _hoisted_322,
                _toDisplayString25(__props.modelValue) + " / " + _toDisplayString25(pageCount.value),
                1
                /* TEXT */
              ),
              _createElementVNode22("button", {
                type: "button",
                class: "wd-pagination__btn",
                "data-wd-hover": "",
                disabled: __props.modelValue >= pageCount.value,
                "aria-label": "\u4E0B\u4E00\u9875",
                onClick: _cache[1] || (_cache[1] = ($event) => go(__props.modelValue + 1))
              }, [
                _createVNode17(_component_wd_icon, {
                  name: "chevron-right",
                  size: 14
                })
              ], 8, _hoisted_415)
            ],
            64
            /* STABLE_FRAGMENT */
          )) : (_openBlock33(), _createElementBlock33(
            _Fragment16,
            { key: 2 },
            [
              _createCommentVNode25(" \u5B8C\u6574\u6A21\u5F0F "),
              _createElementVNode22("button", {
                type: "button",
                class: "wd-pagination__btn",
                "data-wd-hover": "",
                disabled: __props.modelValue <= 1,
                "aria-label": "\u4E0A\u4E00\u9875",
                onClick: _cache[2] || (_cache[2] = ($event) => go(__props.modelValue - 1))
              }, [
                _createVNode17(_component_wd_icon, {
                  name: "chevron-left",
                  size: 14
                })
              ], 8, _hoisted_512),
              (_openBlock33(true), _createElementBlock33(
                _Fragment16,
                null,
                _renderList14(range.value, (p, i) => {
                  return _openBlock33(), _createElementBlock33(
                    _Fragment16,
                    { key: i },
                    [
                      p === "..." ? (_openBlock33(), _createElementBlock33("span", _hoisted_66, "\u2026")) : (_openBlock33(), _createElementBlock33("button", {
                        key: 1,
                        type: "button",
                        class: _normalizeClass27(["wd-pagination__btn", { "wd-pagination__btn--active": p === __props.modelValue }]),
                        "data-wd-hover": "",
                        "aria-current": p === __props.modelValue ? "page" : void 0,
                        onClick: ($event) => go(p)
                      }, _toDisplayString25(p), 11, _hoisted_76))
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              _createElementVNode22("button", {
                type: "button",
                class: "wd-pagination__btn",
                "data-wd-hover": "",
                disabled: __props.modelValue >= pageCount.value,
                "aria-label": "\u4E0B\u4E00\u9875",
                onClick: _cache[3] || (_cache[3] = ($event) => go(__props.modelValue + 1))
              }, [
                _createVNode17(_component_wd_icon, {
                  name: "chevron-right",
                  size: 14
                })
              ], 8, _hoisted_86)
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          __props.showSizeChanger ? (_openBlock33(), _createElementBlock33("label", _hoisted_96, [
            _createElementVNode22("select", {
              value: size.value,
              onChange: changeSize
            }, [
              (_openBlock33(true), _createElementBlock33(
                _Fragment16,
                null,
                _renderList14(__props.pageSizes, (s) => {
                  return _openBlock33(), _createElementBlock33("option", {
                    key: s,
                    value: s
                  }, _toDisplayString25(s) + " \u6761/\u9875", 9, _hoisted_1111);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ], 40, _hoisted_106)
          ])) : _createCommentVNode25("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

// .lib-build/WdPopconfirm.ts
import { defineComponent as _defineComponent34 } from "vue";
import { renderSlot as _renderSlot24, normalizeClass as _normalizeClass28, createElementVNode as _createElementVNode23, createCommentVNode as _createCommentVNode26, resolveComponent as _resolveComponent18, createVNode as _createVNode18, openBlock as _openBlock34, createElementBlock as _createElementBlock34, toDisplayString as _toDisplayString26, createTextVNode as _createTextVNode11, vShow as _vShow3, withModifiers as _withModifiers7, normalizeStyle as _normalizeStyle14, withDirectives as _withDirectives4, Teleport as _Teleport6, createBlock as _createBlock9, Fragment as _Fragment17 } from "vue";
import { computed as computed23, nextTick as nextTick2, onBeforeUnmount as onBeforeUnmount10, ref as ref22, watch as watch9 } from "vue";
var _hoisted_141 = ["aria-label", "aria-hidden"];
var _hoisted_226 = { class: "wd-popconfirm__title" };
var _hoisted_323 = {
  key: 0,
  class: "wd-popconfirm__icon",
  "aria-hidden": "true"
};
var _hoisted_416 = {
  key: 0,
  class: "wd-popconfirm__desc"
};
var _hoisted_513 = { class: "wd-popconfirm__actions" };
var WdPopconfirm_default = /* @__PURE__ */ _defineComponent34({
  ...{ name: "WdPopconfirm" },
  __name: "WdPopconfirm",
  props: {
    title: { type: String, required: false, default: "\u786E\u5B9A\u6267\u884C\u6B64\u64CD\u4F5C\uFF1F" },
    description: { type: String, required: false, default: "" },
    okText: { type: String, required: false, default: "\u786E\u5B9A" },
    cancelText: { type: String, required: false, default: "\u53D6\u6D88" },
    variant: { type: String, required: false, default: "default" },
    placement: { type: String, required: false, default: "top" },
    disabled: { type: Boolean, required: false, default: false },
    width: { type: Number, required: false, default: 240 }
  },
  emits: ["confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    const POP_DURATION = popDuration();
    const props = __props;
    const emit = __emit;
    const open = ref22(false);
    const mounted = ref22(false);
    const trigger = ref22(null);
    const bubble = ref22(null);
    const pos = ref22({ top: 0, left: 0 });
    function place() {
      const t = trigger.value?.getBoundingClientRect();
      if (!t) return;
      const w = props.width;
      let left = t.left + t.width / 2 - w / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - w - 8));
      const gap = 10;
      const top = props.placement === "top" ? t.top - gap : t.bottom + gap;
      pos.value = { top, left };
    }
    async function show() {
      if (props.disabled) return;
      mounted.value = true;
      await nextTick2();
      place();
      requestAnimationFrame(() => {
        open.value = true;
        bubble.value?.querySelector("[data-ok]")?.focus?.();
      });
      setTimeout(() => {
        if (!open.value) open.value = true;
      }, 60);
    }
    function hide() {
      open.value = false;
    }
    function confirm() {
      hide();
      emit("confirm");
    }
    function cancel() {
      hide();
      emit("cancel");
    }
    function onDocDown(e) {
      if (!open.value) return;
      const target = e.target;
      if (bubble.value?.contains(target) || trigger.value?.contains(target)) return;
      hide();
    }
    function onKey(e) {
      if (open.value && e.key === "Escape") hide();
    }
    watch9(open, (v) => {
      if (v) {
        window.addEventListener("scroll", place, true);
        window.addEventListener("resize", place);
      } else {
        window.removeEventListener("scroll", place, true);
        window.removeEventListener("resize", place);
      }
    });
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onKey);
    onBeforeUnmount10(() => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    });
    const bubbleStyle = computed23(() => ({
      top: pos.value.top + "px",
      left: pos.value.left + "px",
      width: props.width + "px",
      transform: props.placement === "top" ? "translateY(-100%)" : void 0
    }));
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent18("wd-icon");
      return _openBlock34(), _createElementBlock34(
        _Fragment17,
        null,
        [
          _createElementVNode23(
            "span",
            {
              ref_key: "trigger",
              ref: trigger,
              class: _normalizeClass28(["wd-popconfirm", { "wd-popconfirm--open": open.value }]),
              onClick: _cache[0] || (_cache[0] = ($event) => open.value ? hide() : show())
            },
            [
              _renderSlot24(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          ),
          (_openBlock34(), _createBlock9(_Teleport6, { to: "body" }, [
            _createCommentVNode26("\n      \u4E0D\u7528 <Transition>\uFF1A\u5B83\u7684 enter \u9636\u6BB5\u4F9D\u8D56 nextFrame\uFF0C\u52A8\u753B\u65F6\u949F\u505C\u6446\u65F6\n      \uFF08\u540E\u53F0\u6807\u7B7E\u9875 / \u65E0\u5934\u6E32\u67D3 / \u7CFB\u7EDF\u51CF\u5F31\u52A8\u6548\uFF09\u4E0D\u4F1A\u63A8\u8FDB\uFF0Center-from \u7C7B\n      \u4F1A\u6C38\u4E45\u6B8B\u7559\u5E76\u53E0\u52A0 leave \u7C7B\uFF0C\u5BFC\u81F4\u5143\u7D20\u5361\u5728\u534A\u900F\u660E\u4E14\u65E0\u6CD5\u9500\u6BC1\u3002\n      \u6539\u4E3A\u5E38\u9A7B\u8282\u70B9 + .is-open \u7C7B\u9A71\u52A8 CSS \u8FC7\u6E21\uFF0C\u72B6\u6001\u59CB\u7EC8\u7531\u6211\u4EEC\u638C\u63E1\u3002\n    "),
            _withDirectives4(_createElementVNode23("div", {
              ref_key: "bubble",
              ref: bubble,
              class: _normalizeClass28(["wd-popconfirm__bubble", { "is-open": open.value }]),
              style: _normalizeStyle14(bubbleStyle.value),
              role: "dialog",
              "aria-label": __props.title,
              "aria-hidden": !open.value,
              onClick: _cache[1] || (_cache[1] = _withModifiers7(() => {
              }, ["stop"]))
            }, [
              _createElementVNode23("div", _hoisted_226, [
                __props.variant === "danger" ? (_openBlock34(), _createElementBlock34("span", _hoisted_323, [
                  _createVNode18(_component_wd_icon, {
                    name: "warning-circle",
                    size: 14
                  })
                ])) : _createCommentVNode26("v-if", true),
                _createTextVNode11(
                  " " + _toDisplayString26(__props.title),
                  1
                  /* TEXT */
                )
              ]),
              __props.description ? (_openBlock34(), _createElementBlock34(
                "p",
                _hoisted_416,
                _toDisplayString26(__props.description),
                1
                /* TEXT */
              )) : _createCommentVNode26("v-if", true),
              _createElementVNode23("div", _hoisted_513, [
                _createElementVNode23(
                  "button",
                  {
                    type: "button",
                    class: "wd-btn wd-btn--tint wd-btn--sm",
                    onClick: cancel
                  },
                  _toDisplayString26(__props.cancelText),
                  1
                  /* TEXT */
                ),
                _createElementVNode23(
                  "button",
                  {
                    type: "button",
                    "data-ok": "",
                    class: _normalizeClass28(["wd-btn wd-btn--sm wd-btn--primary", { "wd-popconfirm__ok--danger": __props.variant === "danger" }]),
                    onClick: confirm
                  },
                  _toDisplayString26(__props.okText),
                  3
                  /* TEXT, CLASS */
                )
              ])
            ], 14, _hoisted_141), [
              [_vShow3, mounted.value]
            ])
          ]))
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});

// .lib-build/WdPostItem.ts
import { defineComponent as _defineComponent35 } from "vue";
import { toDisplayString as _toDisplayString27, openBlock as _openBlock35, createElementBlock as _createElementBlock35, createCommentVNode as _createCommentVNode27, createTextVNode as _createTextVNode12, createElementVNode as _createElementVNode24, renderList as _renderList15, Fragment as _Fragment18, resolveDynamicComponent as _resolveDynamicComponent, withCtx as _withCtx5, createBlock as _createBlock10 } from "vue";
var _hoisted_144 = { class: "wd-post-item__title" };
var _hoisted_227 = {
  key: 0,
  class: "wd-post-item__emoji"
};
var _hoisted_324 = {
  key: 0,
  class: "wd-post-item__summary"
};
var _hoisted_417 = {
  key: 1,
  class: "wd-post-item__tags"
};
var WdPostItem_default = /* @__PURE__ */ _defineComponent35({
  ...{ name: "WdPostItem" },
  __name: "WdPostItem",
  props: {
    title: { type: String, required: true },
    summary: { type: String, required: false },
    tags: { type: Array, required: false, default: () => [] },
    emoji: { type: String, required: false },
    href: { type: String, required: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return _openBlock35(), _createBlock10(_resolveDynamicComponent(__props.href ? "a" : "div"), {
        href: __props.href,
        class: "wd-post-item"
      }, {
        default: _withCtx5(() => [
          _createElementVNode24("h3", _hoisted_144, [
            __props.emoji ? (_openBlock35(), _createElementBlock35(
              "span",
              _hoisted_227,
              _toDisplayString27(__props.emoji),
              1
              /* TEXT */
            )) : _createCommentVNode27("v-if", true),
            _createTextVNode12(
              _toDisplayString27(__props.title),
              1
              /* TEXT */
            )
          ]),
          __props.summary ? (_openBlock35(), _createElementBlock35(
            "p",
            _hoisted_324,
            _toDisplayString27(__props.summary),
            1
            /* TEXT */
          )) : _createCommentVNode27("v-if", true),
          __props.tags.length ? (_openBlock35(), _createElementBlock35("div", _hoisted_417, [
            (_openBlock35(true), _createElementBlock35(
              _Fragment18,
              null,
              _renderList15(__props.tags, (t) => {
                return _openBlock35(), _createElementBlock35(
                  "span",
                  {
                    key: t,
                    class: "wd-tag wd-tag--sm wd-tag--gray"
                  },
                  _toDisplayString27(t),
                  1
                  /* TEXT */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : _createCommentVNode27("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["href"]);
    };
  }
});

// .lib-build/WdProgress.ts
import { defineComponent as _defineComponent36 } from "vue";
import { normalizeStyle as _normalizeStyle15, createElementVNode as _createElementVNode25, normalizeClass as _normalizeClass29, openBlock as _openBlock36, createElementBlock as _createElementBlock36 } from "vue";
import { computed as computed24 } from "vue";
var _hoisted_145 = ["aria-valuenow"];
var WdProgress_default = /* @__PURE__ */ _defineComponent36({
  ...{ name: "WdProgress" },
  __name: "WdProgress",
  props: {
    value: { type: Number, required: false, default: 0 },
    thin: { type: Boolean, required: false, default: false },
    onDark: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const percent = computed24(() => Math.max(0, Math.min(100, props.value)));
    const classes = computed24(() => [
      "wd-progress",
      props.thin ? "wd-progress--thin" : "",
      props.onDark ? "wd-progress--on-dark" : ""
    ]);
    return (_ctx, _cache) => {
      return _openBlock36(), _createElementBlock36("div", {
        class: _normalizeClass29(classes.value),
        role: "progressbar",
        "aria-valuenow": percent.value,
        "aria-valuemin": "0",
        "aria-valuemax": "100"
      }, [
        _createElementVNode25(
          "span",
          {
            class: "wd-progress__bar",
            style: _normalizeStyle15({ width: percent.value + "%" })
          },
          null,
          4
          /* STYLE */
        )
      ], 10, _hoisted_145);
    };
  }
});

// .lib-build/WdRadioGroup.ts
import { defineComponent as _defineComponent37 } from "vue";
import { renderList as _renderList16, Fragment as _Fragment19, openBlock as _openBlock37, createElementBlock as _createElementBlock37, createElementVNode as _createElementVNode26, toDisplayString as _toDisplayString28, normalizeClass as _normalizeClass30 } from "vue";
import { computed as computed25 } from "vue";
var _hoisted_146 = {
  class: "wd-radio-group",
  role: "radiogroup"
};
var _hoisted_228 = ["aria-checked", "disabled", "onClick"];
var _hoisted_325 = { class: "wd-radio__label" };
var WdRadioGroup_default = /* @__PURE__ */ _defineComponent37({
  ...{ name: "WdRadioGroup" },
  __name: "WdRadioGroup",
  props: {
    modelValue: { type: [String, Number], required: false, default: "" },
    options: { type: Array, required: false, default: () => [] },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const items = computed25(
      () => props.options.map((o) => typeof o === "string" ? { label: o, value: o } : o)
    );
    function pick(value) {
      if (!props.disabled) emit("update:modelValue", value);
    }
    return (_ctx, _cache) => {
      return _openBlock37(), _createElementBlock37("div", _hoisted_146, [
        (_openBlock37(true), _createElementBlock37(
          _Fragment19,
          null,
          _renderList16(items.value, (o) => {
            return _openBlock37(), _createElementBlock37("button", {
              key: o.value,
              type: "button",
              role: "radio",
              class: _normalizeClass30(["wd-radio", { "wd-radio--checked": __props.modelValue === o.value, "wd-radio--disabled": __props.disabled }]),
              "aria-checked": __props.modelValue === o.value,
              disabled: __props.disabled,
              onClick: ($event) => pick(o.value)
            }, [
              _cache[0] || (_cache[0] = _createElementVNode26(
                "span",
                { class: "wd-radio__dot" },
                [
                  _createElementVNode26("span", { class: "wd-radio__inner" })
                ],
                -1
                /* CACHED */
              )),
              _createElementVNode26(
                "span",
                _hoisted_325,
                _toDisplayString28(o.label),
                1
                /* TEXT */
              )
            ], 10, _hoisted_228);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]);
    };
  }
});

// .lib-build/WdRate.ts
import { defineComponent as _defineComponent38 } from "vue";
import { renderList as _renderList17, Fragment as _Fragment20, openBlock as _openBlock38, createElementBlock as _createElementBlock38, resolveComponent as _resolveComponent19, createVNode as _createVNode19, normalizeClass as _normalizeClass31 } from "vue";
import { computed as computed26, ref as ref23 } from "vue";
var _hoisted_147 = ["aria-label", "aria-disabled"];
var _hoisted_229 = ["aria-checked", "aria-label", "tabindex", "disabled", "onPointerenter", "onClick"];
var WdRate_default = /* @__PURE__ */ _defineComponent38({
  ...{ name: "WdRate" },
  __name: "WdRate",
  props: {
    modelValue: { type: Number, required: false, default: 0 },
    count: { type: Number, required: false, default: 5 },
    disabled: { type: Boolean, required: false, default: false },
    clearable: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const hover = ref23(-1);
    function isHoverPointer(e) {
      return e.pointerType === "mouse" || e.pointerType === "pen";
    }
    function onEnter(i, e) {
      if (props.disabled || !isHoverPointer(e)) return;
      hover.value = i;
    }
    function onLeave(e) {
      if (!isHoverPointer(e)) return;
      hover.value = -1;
    }
    function pick(i) {
      if (props.disabled) return;
      hover.value = -1;
      const next = props.modelValue === i + 1 ? props.clearable ? 0 : i + 1 : i + 1;
      emit("update:modelValue", next);
    }
    const shown = computed26(() => hover.value >= 0 ? hover.value + 1 : props.modelValue);
    const root = ref23(null);
    function onKeydown(e) {
      if (props.disabled) return;
      const cur = props.modelValue;
      let next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") next = Math.min(props.count, cur + 1);
      else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = Math.max(0, cur - 1);
      else if (e.key === "Home") next = 1;
      else if (e.key === "End") next = props.count;
      else if (e.key === "Delete" || e.key === "Backspace") next = 0;
      if (next === null) return;
      e.preventDefault();
      emit("update:modelValue", next);
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent19("wd-icon");
      return _openBlock38(), _createElementBlock38("div", {
        ref_key: "root",
        ref: root,
        class: _normalizeClass31(["wd-rate", { "wd-rate--disabled": __props.disabled }]),
        role: "radiogroup",
        "aria-label": `\u8BC4\u5206\uFF0C\u5171 ${__props.count} \u661F\uFF0C\u5F53\u524D ${__props.modelValue} \u661F`,
        "aria-disabled": __props.disabled || void 0,
        onMouseleave: _cache[1] || (_cache[1] = ($event) => hover.value = -1),
        onKeydown
      }, [
        (_openBlock38(true), _createElementBlock38(
          _Fragment20,
          null,
          _renderList17(__props.count, (i) => {
            return _openBlock38(), _createElementBlock38("button", {
              key: i,
              type: "button",
              class: _normalizeClass31(["wd-rate__item", { "wd-rate__item--on": i <= shown.value }]),
              role: "radio",
              "aria-checked": i === __props.modelValue,
              "aria-label": `${i} \u661F`,
              tabindex: __props.disabled ? -1 : i === (__props.modelValue || (hover.value >= 0 ? hover.value + 1 : 1)) ? 0 : -1,
              disabled: __props.disabled,
              onPointerenter: ($event) => onEnter(i - 1, $event),
              onPointerleave: _cache[0] || (_cache[0] = ($event) => onLeave($event)),
              onClick: ($event) => pick(i - 1)
            }, [
              _createVNode19(_component_wd_icon, {
                name: "star",
                size: 22
              })
            ], 42, _hoisted_229);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 42, _hoisted_147);
    };
  }
});

// .lib-build/WdResult.ts
import { defineComponent as _defineComponent39 } from "vue";
import { renderSlot as _renderSlot25, resolveComponent as _resolveComponent20, openBlock as _openBlock39, createBlock as _createBlock11, createCommentVNode as _createCommentVNode28, createElementVNode as _createElementVNode27, toDisplayString as _toDisplayString29, createElementBlock as _createElementBlock39, createTextVNode as _createTextVNode13, normalizeClass as _normalizeClass32 } from "vue";
var _hoisted_148 = { class: "wd-result__icon" };
var _hoisted_230 = {
  key: 0,
  class: "wd-result__title"
};
var _hoisted_326 = {
  key: 1,
  class: "wd-result__desc"
};
var _hoisted_418 = {
  key: 2,
  class: "wd-result__extra"
};
var WdResult_default = /* @__PURE__ */ _defineComponent39({
  ...{ name: "WdResult" },
  __name: "WdResult",
  props: {
    status: { type: String, required: false, default: "info" },
    title: { type: String, required: false, default: "" },
    description: { type: String, required: false, default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent20("wd-icon");
      return _openBlock39(), _createElementBlock39(
        "div",
        {
          class: _normalizeClass32(["wd-result", `wd-result--${__props.status}`])
        },
        [
          _createElementVNode27("div", _hoisted_148, [
            _renderSlot25(_ctx.$slots, "icon", {}, () => [
              __props.status === "success" ? (_openBlock39(), _createBlock11(_component_wd_icon, {
                key: 0,
                name: "check-circle",
                size: 30
              })) : __props.status === "warning" ? (_openBlock39(), _createBlock11(_component_wd_icon, {
                key: 1,
                name: "warning-circle",
                size: 30
              })) : __props.status === "error" ? (_openBlock39(), _createBlock11(_component_wd_icon, {
                key: 2,
                name: "close-circle",
                size: 30
              })) : (_openBlock39(), _createBlock11(_component_wd_icon, {
                key: 3,
                name: "info-circle",
                size: 30
              }))
            ])
          ]),
          __props.title ? (_openBlock39(), _createElementBlock39(
            "div",
            _hoisted_230,
            _toDisplayString29(__props.title),
            1
            /* TEXT */
          )) : _createCommentVNode28("v-if", true),
          __props.description || _ctx.$slots.default ? (_openBlock39(), _createElementBlock39("div", _hoisted_326, [
            _renderSlot25(_ctx.$slots, "default", {}, () => [
              _createTextVNode13(
                _toDisplayString29(__props.description),
                1
                /* TEXT */
              )
            ])
          ])) : _createCommentVNode28("v-if", true),
          _ctx.$slots.extra ? (_openBlock39(), _createElementBlock39("div", _hoisted_418, [
            _renderSlot25(_ctx.$slots, "extra")
          ])) : _createCommentVNode28("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

// .lib-build/WdSegmented.ts
import { defineComponent as _defineComponent40 } from "vue";
import { createElementVNode as _createElementVNode28, renderList as _renderList18, Fragment as _Fragment21, openBlock as _openBlock40, createElementBlock as _createElementBlock40, toDisplayString as _toDisplayString30, normalizeClass as _normalizeClass33, createCommentVNode as _createCommentVNode29, resolveComponent as _resolveComponent21, createVNode as _createVNode20, createBlock as _createBlock12 } from "vue";
import { computed as computed27, nextTick as nextTick3, onBeforeUnmount as onBeforeUnmount11, onMounted as onMounted5, ref as ref24, watch as watch10 } from "vue";
var _hoisted_149 = ["aria-hidden"];
var _hoisted_231 = ["aria-selected", "tabindex", "onClick"];
var _hoisted_327 = {
  key: 0,
  class: "wd-segmented-picker"
};
var _hoisted_419 = ["aria-expanded"];
var _hoisted_514 = { class: "wd-segmented-picker__label" };
var _hoisted_67 = { class: "wd-segmented-picker__meta" };
var _hoisted_77 = {
  key: 0,
  class: "wd-segmented-picker__panel",
  role: "listbox"
};
var _hoisted_87 = ["aria-selected", "onClick"];
var WdSegmented_default = /* @__PURE__ */ _defineComponent40({
  ...{ name: "WdSegmented" },
  __name: "WdSegmented",
  props: {
    modelValue: { type: [String, Number], required: false, default: "" },
    options: { type: Array, required: false, default: () => [] },
    block: { type: Boolean, required: false, default: false },
    tone: { type: String, required: false, default: "light" },
    overflow: { type: String, required: false, default: "wrap" },
    overflowMax: { type: Number, required: false, default: 15 }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const items = computed27(
      () => props.options.map((o) => typeof o === "string" ? { label: o, value: o } : o)
    );
    const activeLabel = computed27(
      () => items.value.find((o) => o.value === props.modelValue)?.label ?? ""
    );
    const wrap = ref24();
    const track = ref24();
    const slider = ref24();
    const mode = ref24("flat");
    const canLeft = ref24(false);
    const canRight = ref24(false);
    const dropdownOpen = ref24(false);
    useOverlayLayer(dropdownOpen, wrap, () => {
      dropdownOpen.value = false;
      return true;
    });
    function updateSlider() {
      const t = track.value;
      const s = slider.value;
      if (!t || !s || mode.value === "dropdown") return;
      const active = t.querySelector(".wd-segmented__item--active");
      if (!active) return;
      s.style.transform = `translate(${active.offsetLeft - s.offsetLeft}px, ${active.offsetTop - s.offsetTop}px)`;
      s.style.width = `${active.offsetWidth}px`;
      s.style.height = `${active.offsetHeight}px`;
    }
    function measure() {
      const w = wrap.value;
      const t = track.value;
      if (!t || !w) return;
      if (props.overflow === "wrap") {
        mode.value = "flat";
        return;
      }
      if (props.overflow === "scroll") {
        mode.value = "scroll";
      } else {
        const cs = getComputedStyle(t);
        const pad = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
        const gap = parseFloat(cs.columnGap) || parseFloat(cs.gap) || 0;
        const kids = Array.from(t.querySelectorAll(".wd-segmented__item"));
        const content = kids.reduce((sum, k) => sum + k.offsetWidth, 0) + gap * Math.max(0, kids.length - 1) + pad;
        const wcs = getComputedStyle(w);
        const available = w.clientWidth - (parseFloat(wcs.paddingLeft) || 0) - (parseFloat(wcs.paddingRight) || 0);
        if (content <= available + 1) mode.value = "flat";
        else if (kids.length > props.overflowMax) mode.value = "dropdown";
        else mode.value = "scroll";
      }
      nextTick3(() => {
        updateSlider();
        updateFades();
      });
    }
    function updateFades() {
      const t = track.value;
      if (!t || mode.value !== "scroll") {
        canLeft.value = false;
        canRight.value = false;
        return;
      }
      const max = t.scrollWidth - t.clientWidth;
      canLeft.value = t.scrollLeft > 1;
      canRight.value = max > 1 && t.scrollLeft < max - 1;
    }
    function scrollActiveIntoView() {
      const t = track.value;
      if (!t || mode.value !== "scroll") return;
      const align = () => {
        const active = t.querySelector(".wd-segmented__item--active");
        if (!active) return;
        const pad = 8;
        const left = active.offsetLeft - pad;
        const right = active.offsetLeft + active.offsetWidth + pad;
        if (left < t.scrollLeft) t.scrollTo({ left, behavior: "smooth" });
        else if (right > t.scrollLeft + t.clientWidth) t.scrollTo({ left: right - t.clientWidth, behavior: "smooth" });
      };
      align();
      t.addEventListener("scrollend", align, { once: true });
    }
    function pick(v) {
      emit("update:modelValue", v);
      dropdownOpen.value = false;
    }
    function onDocClick(e) {
      if (wrap.value && !wrap.value.contains(e.target)) dropdownOpen.value = false;
    }
    function onKey(e) {
    }
    let ro;
    onMounted5(async () => {
      await nextTick3();
      measure();
      window.addEventListener("resize", measure);
      document.addEventListener("click", onDocClick);
      document.addEventListener("keydown", onKey);
      if (typeof ResizeObserver !== "undefined" && wrap.value) {
        ro = new ResizeObserver(() => measure());
        ro.observe(wrap.value);
      }
    });
    onBeforeUnmount11(() => {
      window.removeEventListener("resize", measure);
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
      ro?.disconnect();
    });
    watch10(
      () => props.modelValue,
      () => nextTick3(() => {
        updateSlider();
        scrollActiveIntoView();
      })
    );
    watch10(
      items,
      () => nextTick3(() => {
        measure();
      })
    );
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent21("wd-icon");
      return _openBlock40(), _createElementBlock40(
        "div",
        {
          ref_key: "wrap",
          ref: wrap,
          class: _normalizeClass33(["wd-segmented-wrap", {
            "wd-segmented-wrap--auto": __props.overflow === "auto",
            "wd-segmented-wrap--scroll": mode.value === "scroll",
            "wd-segmented-wrap--measuring": mode.value === "dropdown",
            "wd-segmented-wrap--fade-l": canLeft.value,
            "wd-segmented-wrap--fade-r": canRight.value
          }])
        },
        [
          _createElementVNode28("div", {
            ref_key: "track",
            ref: track,
            class: _normalizeClass33(["wd-segmented", { "wd-segmented--block": __props.block, "wd-segmented--dark": __props.tone === "dark" }]),
            "aria-hidden": mode.value === "dropdown",
            role: "tablist",
            onScroll: updateFades
          }, [
            _createElementVNode28(
              "span",
              {
                ref_key: "slider",
                ref: slider,
                class: "wd-segmented__slider"
              },
              null,
              512
              /* NEED_PATCH */
            ),
            (_openBlock40(true), _createElementBlock40(
              _Fragment21,
              null,
              _renderList18(items.value, (o) => {
                return _openBlock40(), _createElementBlock40("button", {
                  key: o.value,
                  type: "button",
                  role: "tab",
                  class: _normalizeClass33(["wd-segmented__item", { "wd-segmented__item--active": o.value === __props.modelValue }]),
                  "aria-selected": o.value === __props.modelValue,
                  tabindex: mode.value === "dropdown" ? -1 : 0,
                  onClick: ($event) => emit("update:modelValue", o.value)
                }, _toDisplayString30(o.label), 11, _hoisted_231);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 42, _hoisted_149),
          _createCommentVNode29(" \u9009\u9879\u8FC7\u591A\uFF1A\u964D\u7EA7\u4E3A\u4E0B\u62C9\u7B5B\u9009 "),
          mode.value === "dropdown" ? (_openBlock40(), _createElementBlock40("div", _hoisted_327, [
            _createElementVNode28("button", {
              type: "button",
              class: "wd-segmented-picker__trigger",
              "aria-haspopup": "listbox",
              "aria-expanded": dropdownOpen.value,
              onClick: _cache[0] || (_cache[0] = ($event) => dropdownOpen.value = !dropdownOpen.value)
            }, [
              _createElementVNode28(
                "span",
                _hoisted_514,
                _toDisplayString30(activeLabel.value),
                1
                /* TEXT */
              ),
              _createElementVNode28(
                "span",
                _hoisted_67,
                _toDisplayString30(items.value.length) + " \u9879",
                1
                /* TEXT */
              ),
              _createVNode20(_component_wd_icon, {
                class: _normalizeClass33(["wd-segmented-picker__caret", { "is-open": dropdownOpen.value }]),
                name: "chevron-down",
                size: 16
              }, null, 8, ["class"])
            ], 8, _hoisted_419),
            dropdownOpen.value ? (_openBlock40(), _createElementBlock40("div", _hoisted_77, [
              (_openBlock40(true), _createElementBlock40(
                _Fragment21,
                null,
                _renderList18(items.value, (o) => {
                  return _openBlock40(), _createElementBlock40("button", {
                    key: o.value,
                    type: "button",
                    role: "option",
                    "aria-selected": o.value === __props.modelValue,
                    class: _normalizeClass33(["wd-segmented-picker__option", { "wd-segmented-picker__option--active": o.value === __props.modelValue }]),
                    onClick: ($event) => pick(o.value)
                  }, [
                    _createElementVNode28(
                      "span",
                      null,
                      _toDisplayString30(o.label),
                      1
                      /* TEXT */
                    ),
                    o.value === __props.modelValue ? (_openBlock40(), _createBlock12(_component_wd_icon, {
                      key: 0,
                      name: "check",
                      size: 15
                    })) : _createCommentVNode29("v-if", true)
                  ], 10, _hoisted_87);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : _createCommentVNode29("v-if", true)
          ])) : _createCommentVNode29("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

// .lib-build/WdSelect.ts
import { defineComponent as _defineComponent41 } from "vue";
import { createCommentVNode as _createCommentVNode30, renderList as _renderList19, Fragment as _Fragment22, openBlock as _openBlock41, createElementBlock as _createElementBlock41, toDisplayString as _toDisplayString31, resolveComponent as _resolveComponent22, createVNode as _createVNode21, createTextVNode as _createTextVNode14, createElementVNode as _createElementVNode29, normalizeClass as _normalizeClass34, unref as _unref6, vModelText as _vModelText2, withModifiers as _withModifiers8, withDirectives as _withDirectives5, createBlock as _createBlock13, Transition as _Transition5, withCtx as _withCtx6 } from "vue";
import { computed as computed28, nextTick as nextTick4, onBeforeUnmount as onBeforeUnmount12, onMounted as onMounted6, ref as ref25, watch as watch11 } from "vue";
var _hoisted_150 = ["disabled", "aria-expanded"];
var _hoisted_233 = {
  key: 0,
  class: "wd-select__tags"
};
var _hoisted_328 = ["aria-label", "onClick"];
var _hoisted_420 = {
  key: 0,
  class: "wd-select__tag wd-select__tag--more"
};
var _hoisted_515 = { class: "wd-select__value" };
var _hoisted_68 = {
  key: 2,
  class: "wd-select__placeholder"
};
var _hoisted_78 = { class: "wd-select__actions" };
var _hoisted_88 = ["aria-multiselectable"];
var _hoisted_97 = {
  key: 0,
  class: "wd-select__search"
};
var _hoisted_107 = ["aria-selected", "disabled", "onClick", "onMouseenter"];
var _hoisted_1112 = {
  key: 1,
  class: "wd-select__empty"
};
var WdSelect_default = /* @__PURE__ */ _defineComponent41({
  ...{ name: "WdSelect" },
  __name: "WdSelect",
  props: {
    modelValue: { type: [String, Number, Array], required: false, default: "" },
    options: { type: Array, required: false, default: () => [] },
    placeholder: { type: String, required: false, default: "\u8BF7\u9009\u62E9" },
    disabled: { type: Boolean, required: false, default: false },
    size: { type: String, required: false, default: "md" },
    multiple: { type: Boolean, required: false, default: false },
    filterable: { type: Boolean, required: false, default: false },
    clearable: { type: Boolean, required: false, default: false },
    maxTagCount: { type: Number, required: false, default: 3 }
  },
  emits: ["update:modelValue", "change", "clear"],
  setup(__props, { emit: __emit }) {
    const POP_DURATION = popDuration();
    const props = __props;
    const emit = __emit;
    const open = ref25(false);
    const root = ref25();
    useOverlayLayer(open, root, () => {
      open.value = false;
      return true;
    });
    const search = ref25("");
    const searchEl = ref25(null);
    const activeIndex = ref25(-1);
    const items = computed28(
      () => props.options.map((o) => typeof o === "string" ? { label: o, value: o, disabled: false } : { disabled: false, ...o })
    );
    const selected = computed28(() => {
      if (props.multiple) return Array.isArray(props.modelValue) ? props.modelValue : [];
      return props.modelValue === "" || props.modelValue === void 0 ? [] : [props.modelValue];
    });
    const selectedItems = computed28(() => selected.value.map((v) => items.value.find((o) => o.value === v)).filter(Boolean));
    const visible = computed28(() => {
      const kw = search.value.trim().toLowerCase();
      if (!kw || !props.filterable) return items.value;
      return items.value.filter((o) => String(o.label).toLowerCase().includes(kw));
    });
    const hasValue = computed28(() => selected.value.length > 0);
    const showClear = computed28(() => props.clearable && hasValue.value && !props.disabled);
    const shownTags = computed28(() => selectedItems.value.slice(0, props.maxTagCount));
    const overflowCount = computed28(() => Math.max(0, selectedItems.value.length - props.maxTagCount));
    const singleLabel = computed28(() => selectedItems.value[0]?.label ?? "");
    function toggle(v) {
      const opt = items.value.find((o) => o.value === v);
      if (opt?.disabled) return;
      if (props.multiple) {
        const set = new Set(selected.value);
        set.has(v) ? set.delete(v) : set.add(v);
        const next = Array.from(set);
        emit("update:modelValue", next);
        emit("change", next);
      } else {
        emit("update:modelValue", v);
        emit("change", v);
        open.value = false;
      }
      search.value = "";
    }
    function removeTag(v, e) {
      e.stopPropagation();
      if (props.disabled) return;
      const next = selected.value.filter((x) => x !== v);
      emit("update:modelValue", next);
      emit("change", next);
    }
    function clear(e) {
      e?.stopPropagation();
      const next = props.multiple ? [] : "";
      emit("update:modelValue", next);
      emit("change", next);
      emit("clear");
    }
    async function toggleOpen() {
      if (props.disabled) return;
      open.value = !open.value;
      if (open.value) {
        activeIndex.value = Math.max(0, visible.value.findIndex((o) => o.value === selected.value[0]));
        await nextTick4();
        if (props.filterable) searchEl.value?.focus();
      } else {
        search.value = "";
      }
    }
    function onKeydown(e) {
      if (props.disabled) return;
      if (!open.value && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
        e.preventDefault();
        toggleOpen();
        return;
      }
      if (!open.value) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const n = visible.value.length;
        if (!n) return;
        const dir = e.key === "ArrowDown" ? 1 : -1;
        activeIndex.value = (activeIndex.value + dir + n) % n;
      } else if (e.key === "Enter") {
        e.preventDefault();
        const opt = visible.value[activeIndex.value];
        if (opt) toggle(opt.value);
      }
    }
    function onDocClick(e) {
      if (root.value && !root.value.contains(e.target)) {
        open.value = false;
        search.value = "";
      }
    }
    onMounted6(() => document.addEventListener("click", onDocClick));
    onBeforeUnmount12(() => document.removeEventListener("click", onDocClick));
    watch11(visible, (list) => {
      if (activeIndex.value >= list.length) activeIndex.value = list.length - 1;
    });
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent22("wd-icon");
      return _openBlock41(), _createElementBlock41(
        "div",
        {
          ref_key: "root",
          ref: root,
          class: _normalizeClass34(["wd-select", { "wd-select--open": open.value, "wd-select--disabled": __props.disabled, "wd-select--multiple": __props.multiple }]),
          onKeydown
        },
        [
          _createElementVNode29("button", {
            type: "button",
            class: _normalizeClass34(["wd-select__trigger", [`wd-select__trigger--${__props.size}`, { "wd-select__trigger--tags": __props.multiple && hasValue.value }]]),
            disabled: __props.disabled,
            "aria-expanded": open.value,
            "aria-haspopup": "listbox",
            onClick: toggleOpen
          }, [
            _createCommentVNode30(" \u591A\u9009\uFF1A\u6807\u7B7E\u5806\u53E0 "),
            __props.multiple && hasValue.value ? (_openBlock41(), _createElementBlock41("span", _hoisted_233, [
              (_openBlock41(true), _createElementBlock41(
                _Fragment22,
                null,
                _renderList19(shownTags.value, (o) => {
                  return _openBlock41(), _createElementBlock41("span", {
                    key: o.value,
                    class: "wd-select__tag"
                  }, [
                    _createTextVNode14(
                      _toDisplayString31(o.label) + " ",
                      1
                      /* TEXT */
                    ),
                    !__props.disabled ? (_openBlock41(), _createElementBlock41("button", {
                      key: 0,
                      type: "button",
                      class: "wd-select__tag-x",
                      "aria-label": `\u79FB\u9664 ${o.label}`,
                      onClick: ($event) => removeTag(o.value, $event)
                    }, [
                      _createVNode21(_component_wd_icon, {
                        name: "close",
                        size: 10
                      })
                    ], 8, _hoisted_328)) : _createCommentVNode30("v-if", true)
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              overflowCount.value ? (_openBlock41(), _createElementBlock41(
                "span",
                _hoisted_420,
                "+" + _toDisplayString31(overflowCount.value),
                1
                /* TEXT */
              )) : _createCommentVNode30("v-if", true)
            ])) : !__props.multiple && hasValue.value ? (_openBlock41(), _createElementBlock41(
              _Fragment22,
              { key: 1 },
              [
                _createCommentVNode30(" \u5355\u9009 "),
                _createElementVNode29(
                  "span",
                  _hoisted_515,
                  _toDisplayString31(singleLabel.value),
                  1
                  /* TEXT */
                )
              ],
              2112
              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
            )) : (_openBlock41(), _createElementBlock41(
              "span",
              _hoisted_68,
              _toDisplayString31(__props.placeholder),
              1
              /* TEXT */
            )),
            _createElementVNode29("span", _hoisted_78, [
              showClear.value ? (_openBlock41(), _createElementBlock41("button", {
                key: 0,
                type: "button",
                class: "wd-select__clear",
                "aria-label": "\u6E05\u9664",
                onClick: clear
              }, [
                _createVNode21(_component_wd_icon, {
                  name: "close",
                  size: 12
                })
              ])) : _createCommentVNode30("v-if", true),
              _createVNode21(_component_wd_icon, {
                class: _normalizeClass34(["wd-chevron", { "wd-chevron--open": open.value }]),
                name: "chevron-down",
                size: 14
              }, null, 8, ["class"])
            ])
          ], 10, _hoisted_150),
          _createVNode21(_Transition5, {
            name: "wd-pop",
            duration: _unref6(POP_DURATION)
          }, {
            default: _withCtx6(() => [
              open.value ? (_openBlock41(), _createElementBlock41("div", {
                key: 0,
                class: "wd-select__menu",
                role: "listbox",
                "aria-multiselectable": __props.multiple || void 0
              }, [
                _createCommentVNode30(" \u641C\u7D22\u6846 "),
                __props.filterable ? (_openBlock41(), _createElementBlock41("div", _hoisted_97, [
                  _withDirectives5(_createElementVNode29(
                    "input",
                    {
                      ref_key: "searchEl",
                      ref: searchEl,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => search.value = $event),
                      type: "text",
                      placeholder: "\u8F93\u5165\u5173\u952E\u5B57\u7B5B\u9009\u2026",
                      onClick: _cache[1] || (_cache[1] = _withModifiers8(() => {
                      }, ["stop"]))
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [_vModelText2, search.value]
                  ])
                ])) : _createCommentVNode30("v-if", true),
                (_openBlock41(true), _createElementBlock41(
                  _Fragment22,
                  null,
                  _renderList19(visible.value, (o, i) => {
                    return _openBlock41(), _createElementBlock41("button", {
                      key: o.value,
                      type: "button",
                      role: "option",
                      class: _normalizeClass34(["wd-select__option", {
                        "wd-select__option--active": selected.value.includes(o.value),
                        "wd-select__option--hover": i === activeIndex.value,
                        "wd-select__option--disabled": o.disabled
                      }]),
                      "aria-selected": selected.value.includes(o.value),
                      disabled: o.disabled,
                      onClick: ($event) => toggle(o.value),
                      onMouseenter: ($event) => activeIndex.value = i
                    }, [
                      _createElementVNode29(
                        "span",
                        null,
                        _toDisplayString31(o.label),
                        1
                        /* TEXT */
                      ),
                      selected.value.includes(o.value) ? (_openBlock41(), _createBlock13(_component_wd_icon, {
                        key: 0,
                        class: "wd-select__option-mark",
                        name: "check",
                        size: 14
                      })) : _createCommentVNode30("v-if", true)
                    ], 42, _hoisted_107);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                !visible.value.length ? (_openBlock41(), _createElementBlock41("div", _hoisted_1112, "\u65E0\u5339\u914D\u9879")) : _createCommentVNode30("v-if", true)
              ], 8, _hoisted_88)) : _createCommentVNode30("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }, 8, ["duration"])
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
});

// .lib-build/WdSkeleton.ts
import { defineComponent as _defineComponent42 } from "vue";
import { renderList as _renderList20, Fragment as _Fragment23, openBlock as _openBlock42, createElementBlock as _createElementBlock42, normalizeClass as _normalizeClass35, normalizeStyle as _normalizeStyle16 } from "vue";
import { computed as computed29 } from "vue";
var WdSkeleton_default = /* @__PURE__ */ _defineComponent42({
  ...{ name: "WdSkeleton" },
  __name: "WdSkeleton",
  props: {
    variant: { type: String, required: false, default: "text" },
    width: { type: [Number, String], required: false, default: "" },
    height: { type: [Number, String], required: false, default: "" },
    count: { type: Number, required: false, default: 3 }
  },
  setup(__props) {
    const props = __props;
    function toSize(v) {
      if (v === "" || v === void 0 || v === null) return "";
      return typeof v === "number" ? `${v}px` : v;
    }
    const itemStyle = computed29(() => {
      const style = {};
      if (props.variant === "circle") {
        const s = toSize(props.width) || "48px";
        style.width = s;
        style.height = toSize(props.height) || s;
      } else {
        if (props.width) style.width = toSize(props.width);
        if (props.height) style.height = toSize(props.height);
        if (props.variant === "rect" && !props.height) style.height = "80px";
      }
      return style;
    });
    return (_ctx, _cache) => {
      return _openBlock42(), _createElementBlock42(
        "div",
        {
          class: _normalizeClass35(["wd-skeleton", `wd-skeleton--${__props.variant}`]),
          "aria-hidden": "true"
        },
        [
          (_openBlock42(true), _createElementBlock42(
            _Fragment23,
            null,
            _renderList20(__props.count, (i) => {
              return _openBlock42(), _createElementBlock42(
                "span",
                {
                  key: i,
                  class: _normalizeClass35(["wd-skeleton__item", { "wd-skeleton__item--text": __props.variant === "text" }]),
                  style: _normalizeStyle16(itemStyle.value)
                },
                null,
                6
                /* CLASS, STYLE */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      );
    };
  }
});

// .lib-build/WdSlider.ts
import { defineComponent as _defineComponent43 } from "vue";
import { normalizeStyle as _normalizeStyle17, createElementVNode as _createElementVNode30, toDisplayString as _toDisplayString32, openBlock as _openBlock43, createElementBlock as _createElementBlock43, createCommentVNode as _createCommentVNode31 } from "vue";
import { computed as computed30, ref as ref26, watch as watch12 } from "vue";
var _hoisted_151 = { class: "wd-slider" };
var _hoisted_234 = ["min", "max", "step", "value"];
var _hoisted_329 = {
  key: 0,
  class: "wd-slider__value"
};
var WdSlider_default = /* @__PURE__ */ _defineComponent43({
  ...{ name: "WdSlider" },
  __name: "WdSlider",
  props: {
    modelValue: { type: Number, required: false, default: 0 },
    min: { type: Number, required: false, default: 0 },
    max: { type: Number, required: false, default: 100 },
    step: { type: Number, required: false, default: 1 },
    showValue: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const el = ref26(null);
    const live = ref26(null);
    const current = computed30(() => live.value !== null ? live.value : props.modelValue);
    const percent = computed30(() => {
      const span = props.max - props.min || 1;
      return Math.max(0, Math.min(100, (current.value - props.min) / span * 100));
    });
    const trackStyle = computed30(() => ({
      background: `linear-gradient(to right, var(--wd-red) 0%, var(--wd-red) ${percent.value}%, var(--wd-tint-2) ${percent.value}%, var(--wd-tint-2) 100%)`
    }));
    function onInput(e) {
      const v = Number(e.target.value);
      live.value = v;
      emit("update:modelValue", v);
    }
    watch12(
      () => props.modelValue,
      (v) => {
        if (live.value !== null && v !== live.value) live.value = null;
      }
    );
    return (_ctx, _cache) => {
      return _openBlock43(), _createElementBlock43("div", _hoisted_151, [
        _createElementVNode30("input", {
          ref_key: "el",
          ref: el,
          type: "range",
          min: __props.min,
          max: __props.max,
          step: __props.step,
          value: current.value,
          style: _normalizeStyle17(trackStyle.value),
          onInput
        }, null, 44, _hoisted_234),
        __props.showValue ? (_openBlock43(), _createElementBlock43(
          "span",
          _hoisted_329,
          _toDisplayString32(current.value),
          1
          /* TEXT */
        )) : _createCommentVNode31("v-if", true)
      ]);
    };
  }
});

// .lib-build/WdSortableList.ts
import { defineComponent as _defineComponent44 } from "vue";
import { renderList as _renderList21, Fragment as _Fragment24, openBlock as _openBlock44, createElementBlock as _createElementBlock44, resolveComponent as _resolveComponent23, createVNode as _createVNode22, createElementVNode as _createElementVNode31, toDisplayString as _toDisplayString33, normalizeClass as _normalizeClass36, normalizeStyle as _normalizeStyle18, createCommentVNode as _createCommentVNode32, Teleport as _Teleport7, createBlock as _createBlock14 } from "vue";
import { computed as computed31, onBeforeUnmount as onBeforeUnmount13, ref as ref27 } from "vue";
var _hoisted_153 = ["onPointerdown"];
var _hoisted_235 = {
  class: "wd-sortable__handle",
  "aria-hidden": "true"
};
var _hoisted_330 = { class: "wd-sortable__label" };
var _hoisted_421 = {
  class: "wd-sortable__handle",
  "aria-hidden": "true"
};
var _hoisted_516 = { class: "wd-sortable__label" };
var DRAG_THRESHOLD = 4;
var WdSortableList_default = /* @__PURE__ */ _defineComponent44({
  ...{ name: "WdSortableList" },
  __name: "WdSortableList",
  props: {
    modelValue: { type: Array, required: false, default: () => [] }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const list = ref27(null);
    function labelOf(it) {
      return typeof it === "string" ? it : it.label;
    }
    const dragging = ref27(false);
    const fromIndex = ref27(-1);
    const overIndex = ref27(-1);
    const ghost = ref27(null);
    let startY = 0;
    let startX = 0;
    let armed = false;
    function itemEls() {
      if (!list.value) return [];
      return Array.from(list.value.querySelectorAll(".wd-sortable__item"));
    }
    function computeOver(y) {
      const els = itemEls();
      for (let i = 0; i < els.length; i++) {
        const r = els[i].getBoundingClientRect();
        if (y < r.top + r.height / 2) return i;
      }
      return els.length;
    }
    function onPointerDown(e, i) {
      if (e.button !== void 0 && e.button !== 0) return;
      armed = true;
      dragging.value = false;
      fromIndex.value = i;
      startY = e.clientY;
      startX = e.clientX;
      try {
        ;
        e.currentTarget.setPointerCapture?.(e.pointerId);
      } catch {
      }
      window.addEventListener("pointermove", onPointerMove, { passive: false });
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
    }
    function onPointerMove(e) {
      if (!armed) return;
      if (!dragging.value) {
        if (Math.abs(e.clientY - startY) < DRAG_THRESHOLD && Math.abs(e.clientX - startX) < DRAG_THRESHOLD) return;
        dragging.value = true;
        const el = itemEls()[fromIndex.value];
        if (el) {
          const r = el.getBoundingClientRect();
          ghost.value = {
            top: r.top,
            left: r.left,
            width: r.width,
            label: labelOf(props.modelValue[fromIndex.value])
          };
        }
      }
      if (e.cancelable) e.preventDefault();
      if (ghost.value) ghost.value.top = e.clientY - 20;
      overIndex.value = computeOver(e.clientY);
    }
    function onPointerUp() {
      if (dragging.value && fromIndex.value >= 0 && overIndex.value >= 0) {
        let to = overIndex.value;
        if (to > fromIndex.value) to -= 1;
        if (to !== fromIndex.value) {
          const arr = [...props.modelValue];
          const [moved] = arr.splice(fromIndex.value, 1);
          arr.splice(to, 0, moved);
          emit("update:modelValue", arr);
          emit("change", arr);
        }
      }
      cleanup();
    }
    function cleanup() {
      armed = false;
      dragging.value = false;
      fromIndex.value = -1;
      overIndex.value = -1;
      ghost.value = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    }
    onBeforeUnmount13(cleanup);
    const dropLineTop = computed31(() => {
      if (!dragging.value || overIndex.value < 0 || !list.value) return null;
      const els = itemEls();
      if (!els.length) return null;
      const base = list.value.getBoundingClientRect();
      const i = overIndex.value;
      return i < els.length ? els[i].getBoundingClientRect().top - base.top : els[els.length - 1].getBoundingClientRect().bottom - base.top;
    });
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent23("wd-icon");
      return _openBlock44(), _createElementBlock44(
        _Fragment24,
        null,
        [
          _createElementVNode31(
            "div",
            {
              class: _normalizeClass36(["wd-sortable", { "wd-sortable--dragging": dragging.value }]),
              ref_key: "list",
              ref: list
            },
            [
              (_openBlock44(true), _createElementBlock44(
                _Fragment24,
                null,
                _renderList21(__props.modelValue, (it, i) => {
                  return _openBlock44(), _createElementBlock44("div", {
                    key: i,
                    class: _normalizeClass36(["wd-sortable__item", {
                      "wd-sortable__item--drag": dragging.value && fromIndex.value === i,
                      "wd-sortable__item--over": dragging.value && overIndex.value === i && fromIndex.value !== i
                    }]),
                    onPointerdown: ($event) => onPointerDown($event, i)
                  }, [
                    _createElementVNode31("span", _hoisted_235, [
                      _createVNode22(_component_wd_icon, {
                        name: "dots-drag",
                        size: 14
                      })
                    ]),
                    _createElementVNode31(
                      "span",
                      _hoisted_330,
                      _toDisplayString33(labelOf(it)),
                      1
                      /* TEXT */
                    )
                  ], 42, _hoisted_153);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              dropLineTop.value !== null ? (_openBlock44(), _createElementBlock44(
                "div",
                {
                  key: 0,
                  class: "wd-sortable__drop-line",
                  style: _normalizeStyle18({ top: dropLineTop.value + "px" })
                },
                null,
                4
                /* STYLE */
              )) : _createCommentVNode32("v-if", true)
            ],
            2
            /* CLASS */
          ),
          (_openBlock44(), _createBlock14(_Teleport7, { to: "body" }, [
            ghost.value ? (_openBlock44(), _createElementBlock44(
              "div",
              {
                key: 0,
                class: "wd-sortable__clone",
                style: _normalizeStyle18({ top: ghost.value.top + "px", left: ghost.value.left + "px", width: ghost.value.width + "px" })
              },
              [
                _createElementVNode31("span", _hoisted_421, [
                  _createVNode22(_component_wd_icon, {
                    name: "dots-drag",
                    size: 14
                  })
                ]),
                _createElementVNode31(
                  "span",
                  _hoisted_516,
                  _toDisplayString33(ghost.value.label),
                  1
                  /* TEXT */
                )
              ],
              4
              /* STYLE */
            )) : _createCommentVNode32("v-if", true)
          ]))
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});

// .lib-build/WdSpace.ts
import { defineComponent as _defineComponent45 } from "vue";
import { renderSlot as _renderSlot26, normalizeClass as _normalizeClass37, normalizeStyle as _normalizeStyle19, openBlock as _openBlock45, createElementBlock as _createElementBlock45 } from "vue";
import { computed as computed32 } from "vue";
var WdSpace_default = /* @__PURE__ */ _defineComponent45({
  ...{ name: "WdSpace" },
  __name: "WdSpace",
  props: {
    size: { type: [String, Number], required: false, default: "md" },
    direction: { type: String, required: false, default: "row" },
    wrap: { type: Boolean, required: false, default: false },
    between: { type: Boolean, required: false, default: false },
    center: { type: Boolean, required: false, default: false },
    grow: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const gap = computed32(() => {
      if (typeof props.size === "number") return `${props.size}px`;
      return { sm: "var(--wd-space-2)", md: "var(--wd-space-3)", lg: "var(--wd-space-6)" }[props.size];
    });
    return (_ctx, _cache) => {
      return _openBlock45(), _createElementBlock45(
        "div",
        {
          class: _normalizeClass37(["wd-space", {
            "wd-space--col": __props.direction === "col",
            "wd-space--wrap": __props.wrap,
            "wd-space--between": __props.between,
            "wd-space--center": __props.center,
            "wd-space--grow": __props.grow
          }]),
          style: _normalizeStyle19({ gap: gap.value })
        },
        [
          _renderSlot26(_ctx.$slots, "default")
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

// .lib-build/WdSpinner.ts
import { defineComponent as _defineComponent46 } from "vue";
import { normalizeClass as _normalizeClass38, normalizeStyle as _normalizeStyle20, openBlock as _openBlock46, createElementBlock as _createElementBlock46 } from "vue";
import { computed as computed33 } from "vue";
var WdSpinner_default = /* @__PURE__ */ _defineComponent46({
  ...{ name: "WdSpinner" },
  __name: "WdSpinner",
  props: {
    size: { type: [String, Number], required: false, default: "md" }
  },
  setup(__props) {
    const props = __props;
    const PRESET = { sm: "18px", md: "28px", lg: "40px" };
    const style = computed33(() => {
      if (typeof props.size === "number") {
        const px = Math.max(8, props.size);
        const bw = Math.max(2, Math.round(px * 0.11 * 10) / 10);
        return { width: `${px}px`, height: `${px}px`, borderWidth: `${bw}px` };
      }
      return {};
    });
    const cls = computed33(() => typeof props.size === "string" && props.size !== "md" ? `wd-spinner--${props.size}` : "");
    return (_ctx, _cache) => {
      return _openBlock46(), _createElementBlock46(
        "span",
        {
          class: _normalizeClass38(["wd-spinner", cls.value]),
          style: _normalizeStyle20(style.value),
          role: "status",
          "aria-label": "\u52A0\u8F7D\u4E2D"
        },
        null,
        6
        /* CLASS, STYLE */
      );
    };
  }
});

// .lib-build/WdStatistic.ts
import { defineComponent as _defineComponent47 } from "vue";
import { toDisplayString as _toDisplayString34, openBlock as _openBlock47, createElementBlock as _createElementBlock47, createCommentVNode as _createCommentVNode33, createElementVNode as _createElementVNode32, renderSlot as _renderSlot27 } from "vue";
import { computed as computed34, onBeforeUnmount as onBeforeUnmount14, onMounted as onMounted7, ref as ref28, watch as watch13 } from "vue";
var _hoisted_154 = { class: "wd-statistic" };
var _hoisted_236 = {
  key: 0,
  class: "wd-statistic__title"
};
var _hoisted_331 = { class: "wd-statistic__value" };
var _hoisted_422 = {
  key: 0,
  class: "wd-statistic__affix"
};
var _hoisted_517 = { class: "wd-statistic__num" };
var _hoisted_69 = {
  key: 1,
  class: "wd-statistic__affix wd-statistic__affix--suffix"
};
var _hoisted_79 = {
  key: 1,
  class: "wd-statistic__footer"
};
var WdStatistic_default = /* @__PURE__ */ _defineComponent47({
  ...{ name: "WdStatistic" },
  __name: "WdStatistic",
  props: {
    value: { type: Number, required: false, default: 0 },
    title: { type: String, required: false, default: "" },
    prefix: { type: String, required: false, default: "" },
    suffix: { type: String, required: false, default: "" },
    precision: { type: Number, required: false, default: 0 },
    separator: { type: Boolean, required: false, default: true },
    animated: { type: Boolean, required: false, default: true },
    duration: { type: Number, required: false, default: 900 }
  },
  setup(__props) {
    const props = __props;
    const shown = ref28(props.animated ? 0 : props.value);
    let raf = 0;
    let startAt = 0;
    const from = ref28(0);
    const REDUCE = () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let fallback;
    function animateTo(to) {
      cancelAnimationFrame(raf);
      if (fallback) window.clearTimeout(fallback);
      if (!props.animated || REDUCE()) {
        shown.value = to;
        return;
      }
      from.value = shown.value;
      startAt = 0;
      fallback = window.setTimeout(() => {
        cancelAnimationFrame(raf);
        shown.value = to;
      }, props.duration + 120);
      const step = (ts) => {
        if (!startAt) startAt = ts;
        const t = Math.min(1, (ts - startAt) / props.duration);
        const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        shown.value = from.value + (to - from.value) * e;
        if (t < 1) raf = requestAnimationFrame(step);
        else {
          shown.value = to;
          if (fallback) {
            window.clearTimeout(fallback);
            fallback = void 0;
          }
        }
      };
      raf = requestAnimationFrame(step);
    }
    onMounted7(() => {
      if (props.animated) animateTo(props.value);
      else shown.value = props.value;
    });
    onBeforeUnmount14(() => {
      cancelAnimationFrame(raf);
      if (fallback) window.clearTimeout(fallback);
    });
    watch13(() => props.value, (v) => animateTo(v));
    const text = computed34(() => {
      const fixed = Math.abs(shown.value).toFixed(props.precision);
      let [int, dec] = fixed.split(".");
      if (props.separator) int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const sign = shown.value < 0 ? "-" : "";
      return sign + int + (dec ? "." + dec : "");
    });
    return (_ctx, _cache) => {
      return _openBlock47(), _createElementBlock47("div", _hoisted_154, [
        __props.title ? (_openBlock47(), _createElementBlock47(
          "div",
          _hoisted_236,
          _toDisplayString34(__props.title),
          1
          /* TEXT */
        )) : _createCommentVNode33("v-if", true),
        _createElementVNode32("div", _hoisted_331, [
          __props.prefix ? (_openBlock47(), _createElementBlock47(
            "span",
            _hoisted_422,
            _toDisplayString34(__props.prefix),
            1
            /* TEXT */
          )) : _createCommentVNode33("v-if", true),
          _createElementVNode32(
            "span",
            _hoisted_517,
            _toDisplayString34(text.value),
            1
            /* TEXT */
          ),
          __props.suffix ? (_openBlock47(), _createElementBlock47(
            "span",
            _hoisted_69,
            _toDisplayString34(__props.suffix),
            1
            /* TEXT */
          )) : _createCommentVNode33("v-if", true)
        ]),
        _ctx.$slots.footer ? (_openBlock47(), _createElementBlock47("div", _hoisted_79, [
          _renderSlot27(_ctx.$slots, "footer")
        ])) : _createCommentVNode33("v-if", true)
      ]);
    };
  }
});

// .lib-build/WdSteps.ts
import { defineComponent as _defineComponent48 } from "vue";
import { renderList as _renderList22, Fragment as _Fragment25, openBlock as _openBlock48, createElementBlock as _createElementBlock48, resolveComponent as _resolveComponent24, createBlock as _createBlock15, createCommentVNode as _createCommentVNode34, toDisplayString as _toDisplayString35, createTextVNode as _createTextVNode15, createElementVNode as _createElementVNode33, normalizeClass as _normalizeClass39 } from "vue";
import { computed as computed35 } from "vue";
var _hoisted_155 = { class: "wd-steps" };
var _hoisted_237 = { class: "wd-steps__dot" };
var _hoisted_332 = { class: "wd-steps__label" };
var _hoisted_423 = {
  key: 0,
  class: "wd-steps__desc"
};
var WdSteps_default = /* @__PURE__ */ _defineComponent48({
  ...{ name: "WdSteps" },
  __name: "WdSteps",
  props: {
    steps: { type: Array, required: false, default: () => [] },
    current: { type: Number, required: false, default: 0 }
  },
  setup(__props) {
    const props = __props;
    const items = computed35(
      () => props.steps.map((s) => typeof s === "string" ? { title: s, desc: "" } : { desc: "", ...s })
    );
    function state(i) {
      if (i < props.current) return "finish";
      if (i === props.current) return "process";
      return "wait";
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent24("wd-icon");
      return _openBlock48(), _createElementBlock48("div", _hoisted_155, [
        (_openBlock48(true), _createElementBlock48(
          _Fragment25,
          null,
          _renderList22(items.value, (s, i) => {
            return _openBlock48(), _createElementBlock48(
              _Fragment25,
              { key: i },
              [
                _createElementVNode33(
                  "div",
                  {
                    class: _normalizeClass39(["wd-steps__item", `wd-steps__item--${state(i)}`])
                  },
                  [
                    _createElementVNode33("span", _hoisted_237, [
                      state(i) === "finish" ? (_openBlock48(), _createBlock15(_component_wd_icon, {
                        key: 0,
                        name: "check",
                        size: 13
                      })) : (_openBlock48(), _createElementBlock48(
                        _Fragment25,
                        { key: 1 },
                        [
                          _createTextVNode15(
                            _toDisplayString35(i + 1),
                            1
                            /* TEXT */
                          )
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ]),
                    _createElementVNode33("span", _hoisted_332, [
                      _createTextVNode15(
                        _toDisplayString35(s.title) + " ",
                        1
                        /* TEXT */
                      ),
                      s.desc ? (_openBlock48(), _createElementBlock48(
                        "em",
                        _hoisted_423,
                        _toDisplayString35(s.desc),
                        1
                        /* TEXT */
                      )) : _createCommentVNode34("v-if", true)
                    ])
                  ],
                  2
                  /* CLASS */
                ),
                i < items.value.length - 1 ? (_openBlock48(), _createElementBlock48(
                  "span",
                  {
                    key: 0,
                    class: _normalizeClass39(["wd-steps__bar", { "wd-steps__bar--done": i < __props.current }])
                  },
                  null,
                  2
                  /* CLASS */
                )) : _createCommentVNode34("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]);
    };
  }
});

// .lib-build/WdSwitch.ts
import { defineComponent as _defineComponent49 } from "vue";
import { createElementVNode as _createElementVNode34, normalizeClass as _normalizeClass40, openBlock as _openBlock49, createElementBlock as _createElementBlock49 } from "vue";
var _hoisted_156 = ["aria-checked", "disabled"];
var WdSwitch_default = /* @__PURE__ */ _defineComponent49({
  ...{ name: "WdSwitch" },
  __name: "WdSwitch",
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _cache) => {
      return _openBlock49(), _createElementBlock49("button", {
        type: "button",
        role: "switch",
        class: _normalizeClass40(["wd-switch", { "wd-switch--off": !__props.modelValue }]),
        "aria-checked": __props.modelValue,
        disabled: __props.disabled,
        onClick: _cache[0] || (_cache[0] = ($event) => emit("update:modelValue", !__props.modelValue))
      }, [..._cache[1] || (_cache[1] = [
        _createElementVNode34(
          "span",
          { class: "wd-switch__knob" },
          null,
          -1
          /* CACHED */
        )
      ])], 10, _hoisted_156);
    };
  }
});

// .lib-build/WdTable.ts
import { defineComponent as _defineComponent50 } from "vue";
import { resolveComponent as _resolveComponent25, openBlock as _openBlock50, createBlock as _createBlock16, createCommentVNode as _createCommentVNode35, normalizeClass as _normalizeClass41, createElementVNode as _createElementVNode35, createElementBlock as _createElementBlock50, renderList as _renderList23, Fragment as _Fragment26, toDisplayString as _toDisplayString36, normalizeStyle as _normalizeStyle21, createVNode as _createVNode23, createTextVNode as _createTextVNode16, withModifiers as _withModifiers9, renderSlot as _renderSlot28 } from "vue";
import { computed as computed36, ref as ref29 } from "vue";
var _hoisted_157 = {
  key: 0,
  class: "wd-table__th wd-table__th--check"
};
var _hoisted_238 = ["aria-checked"];
var _hoisted_333 = ["aria-sort", "onClick"];
var _hoisted_424 = {
  key: 0,
  class: "wd-table__sort"
};
var _hoisted_518 = ["onClick"];
var _hoisted_610 = ["aria-checked", "onClick"];
var _hoisted_710 = {
  key: 1,
  class: "wd-table__empty"
};
var _hoisted_89 = {
  key: 2,
  class: "wd-table__loading"
};
var WdTable_default = /* @__PURE__ */ _defineComponent50({
  ...{ name: "WdTable" },
  __name: "WdTable",
  props: {
    columns: { type: Array, required: false, default: () => [] },
    rows: { type: Array, required: false, default: () => [] },
    striped: { type: Boolean, required: false, default: true },
    emptyText: { type: String, required: false, default: "\u6682\u65E0\u6570\u636E" },
    loading: { type: Boolean, required: false, default: false },
    loadingText: { type: String, required: false, default: "\u52A0\u8F7D\u4E2D\u2026" },
    selectable: { type: Boolean, required: false, default: false },
    selected: { type: Array, required: false, default: () => [] },
    rowKey: { type: String, required: false, default: "" },
    maxHeight: { type: [Number, String], required: false, default: "" }
  },
  emits: ["update:selected", "change", "rowClick"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const sortKey = ref29("");
    const sortDir = ref29("asc");
    const sorted = computed36(() => {
      if (!sortKey.value) return props.rows;
      return [...props.rows].sort((a, b) => {
        const av = String(a[sortKey.value] ?? ""), bv = String(b[sortKey.value] ?? "");
        const cmp = av.localeCompare(bv, "zh-CN", { numeric: true });
        return sortDir.value === "asc" ? cmp : -cmp;
      });
    });
    function keyOf(row, i) {
      const k = props.rowKey;
      return k && row[k] !== void 0 ? String(row[k]) : String(i);
    }
    const selectedKeys = computed36(() => new Set(props.selected.map((r, i) => keyOf(r, i))));
    const isChecked = (row, i) => props.selected.some((r) => keyOf(r, 0) === keyOf(row, i) || r === row);
    const allChecked = computed36(
      () => props.rows.length > 0 && props.rows.every((r, i) => props.selected.some((s) => s === r || keyOf(s, 0) === keyOf(r, i)))
    );
    const someChecked = computed36(() => props.selected.length > 0 && !allChecked.value);
    function toggleRow(row) {
      const next = props.selected.includes(row) ? props.selected.filter((r) => r !== row) : [...props.selected, row];
      emit("update:selected", next);
      emit("change", next);
    }
    function toggleAll() {
      const next = allChecked.value ? [] : [...props.rows];
      emit("update:selected", next);
      emit("change", next);
    }
    function toggleSort(key, col) {
      if (!col.sortable) return;
      if (sortKey.value === key) {
        sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
      } else {
        sortKey.value = key;
        sortDir.value = "asc";
      }
    }
    const wrapStyle = computed36(
      () => props.maxHeight ? { maxHeight: typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight } : void 0
    );
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent25("wd-icon");
      return _openBlock50(), _createElementBlock50(
        "div",
        {
          class: _normalizeClass41(["wd-table-wrap", { "wd-table-wrap--loading": __props.loading }]),
          style: _normalizeStyle21(wrapStyle.value)
        },
        [
          props.rows.length ? (_openBlock50(), _createElementBlock50(
            "table",
            {
              key: 0,
              class: _normalizeClass41(["wd-table", { "wd-table--striped": __props.striped }])
            },
            [
              _createElementVNode35("thead", null, [
                _createElementVNode35("tr", null, [
                  __props.selectable ? (_openBlock50(), _createElementBlock50("th", _hoisted_157, [
                    _createElementVNode35("button", {
                      type: "button",
                      class: _normalizeClass41(["wd-table__check", { "wd-table__check--on": allChecked.value, "wd-table__check--part": someChecked.value }]),
                      "aria-checked": allChecked.value ? "true" : someChecked.value ? "mixed" : "false",
                      role: "checkbox",
                      "aria-label": "\u5168\u9009",
                      onClick: toggleAll
                    }, [
                      someChecked.value && !allChecked.value ? (_openBlock50(), _createBlock16(_component_wd_icon, {
                        key: 0,
                        name: "minus",
                        size: 10
                      })) : allChecked.value ? (_openBlock50(), _createBlock16(_component_wd_icon, {
                        key: 1,
                        name: "check",
                        size: 10
                      })) : _createCommentVNode35("v-if", true)
                    ], 10, _hoisted_238)
                  ])) : _createCommentVNode35("v-if", true),
                  (_openBlock50(true), _createElementBlock50(
                    _Fragment26,
                    null,
                    _renderList23(props.columns, (col) => {
                      return _openBlock50(), _createElementBlock50("th", {
                        key: col.key,
                        style: _normalizeStyle21(col.width ? { width: col.width } : void 0),
                        class: _normalizeClass41(["wd-table__th", { "wd-table__th--sort": col.sortable }]),
                        "aria-sort": sortKey.value === col.key ? sortDir.value === "asc" ? "ascending" : "descending" : "none",
                        onClick: ($event) => toggleSort(col.key, col)
                      }, [
                        _createTextVNode16(
                          _toDisplayString36(col.title) + " ",
                          1
                          /* TEXT */
                        ),
                        col.sortable ? (_openBlock50(), _createElementBlock50("span", _hoisted_424, [
                          _createVNode23(_component_wd_icon, {
                            name: sortKey.value !== col.key || sortDir.value === "asc" ? "arrow-up" : "arrow-down",
                            size: 12,
                            style: _normalizeStyle21({ color: sortKey.value === col.key ? "var(--wd-red)" : "var(--wd-ink-3)" })
                          }, null, 8, ["name", "style"])
                        ])) : _createCommentVNode35("v-if", true)
                      ], 14, _hoisted_333);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              _createElementVNode35("tbody", null, [
                (_openBlock50(true), _createElementBlock50(
                  _Fragment26,
                  null,
                  _renderList23(sorted.value, (row, i) => {
                    return _openBlock50(), _createElementBlock50("tr", {
                      key: keyOf(row, i),
                      class: _normalizeClass41({ "wd-table__row--checked": __props.selectable && __props.selected.includes(row) }),
                      onClick: ($event) => emit("rowClick", row, i)
                    }, [
                      __props.selectable ? (_openBlock50(), _createElementBlock50("td", {
                        key: 0,
                        class: "wd-table__td--check",
                        onClick: _cache[0] || (_cache[0] = _withModifiers9(() => {
                        }, ["stop"]))
                      }, [
                        _createElementVNode35("button", {
                          type: "button",
                          class: _normalizeClass41(["wd-table__check", { "wd-table__check--on": __props.selected.includes(row) }]),
                          "aria-checked": __props.selected.includes(row) ? "true" : "false",
                          role: "checkbox",
                          "aria-label": "\u9009\u62E9\u6B64\u884C",
                          onClick: ($event) => toggleRow(row)
                        }, [
                          __props.selected.includes(row) ? (_openBlock50(), _createBlock16(_component_wd_icon, {
                            key: 0,
                            name: "check",
                            size: 10
                          })) : _createCommentVNode35("v-if", true)
                        ], 10, _hoisted_610)
                      ])) : _createCommentVNode35("v-if", true),
                      (_openBlock50(true), _createElementBlock50(
                        _Fragment26,
                        null,
                        _renderList23(props.columns, (col) => {
                          return _openBlock50(), _createElementBlock50(
                            "td",
                            {
                              key: col.key,
                              style: _normalizeStyle21(col.align ? { textAlign: col.align } : void 0)
                            },
                            [
                              _renderSlot28(_ctx.$slots, `cell-${col.key}`, {
                                row,
                                value: row[col.key]
                              }, () => [
                                _createTextVNode16(
                                  _toDisplayString36(row[col.key]),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ],
                            4
                            /* STYLE */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ], 10, _hoisted_518);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ],
            2
            /* CLASS */
          )) : !__props.loading ? (_openBlock50(), _createElementBlock50(
            "div",
            _hoisted_710,
            _toDisplayString36(__props.emptyText),
            1
            /* TEXT */
          )) : _createCommentVNode35("v-if", true),
          _createCommentVNode35(" \u52A0\u8F7D\u4E2D\uFF1A\u76D6\u4E00\u5C42\u534A\u900F\u660E\u906E\u7F69 + \u8F6C\u5708\uFF0C\u4FDD\u7559\u8868\u5934\u7ED3\u6784 "),
          __props.loading ? (_openBlock50(), _createElementBlock50("div", _hoisted_89, [
            _cache[1] || (_cache[1] = _createElementVNode35(
              "span",
              { class: "wd-spinner" },
              null,
              -1
              /* CACHED */
            )),
            _createElementVNode35(
              "span",
              null,
              _toDisplayString36(__props.loadingText),
              1
              /* TEXT */
            )
          ])) : _createCommentVNode35("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

// .lib-build/WdTabs.ts
import { defineComponent as _defineComponent51 } from "vue";
import { renderList as _renderList24, Fragment as _Fragment27, openBlock as _openBlock51, createElementBlock as _createElementBlock51, toDisplayString as _toDisplayString37, createElementVNode as _createElementVNode36, resolveComponent as _resolveComponent26, createVNode as _createVNode24, createCommentVNode as _createCommentVNode36, normalizeClass as _normalizeClass42 } from "vue";
import { computed as computed37, ref as ref30 } from "vue";
var _hoisted_158 = ["aria-selected", "disabled", "tabindex", "onClick"];
var _hoisted_239 = { class: "wd-tabs__label" };
var _hoisted_334 = ["aria-label", "onClick"];
var WdTabs_default = /* @__PURE__ */ _defineComponent51({
  ...{ name: "WdTabs" },
  __name: "WdTabs",
  props: {
    modelValue: { type: [String, Number], required: false, default: "" },
    tabs: { type: Array, required: false, default: () => [] },
    block: { type: Boolean, required: false, default: false },
    closable: { type: Boolean, required: false, default: false },
    addable: { type: Boolean, required: false, default: false },
    scrollable: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue", "close", "add"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const animReady = ref30(false);
    function select(v) {
      animReady.value = true;
      emit("update:modelValue", v);
    }
    const items = computed37(
      () => props.tabs.map((t) => {
        const raw = typeof t === "string" ? { label: t, value: t } : t;
        const canClose = "closable" in raw ? raw.closable === true : props.closable;
        return { label: raw.label, value: raw.value, closable: canClose, disabled: raw.disabled === true };
      })
    );
    function close(t, e) {
      e.stopPropagation();
      emit("close", t.value);
    }
    function onKeydown(e) {
      const list = items.value.filter((t) => !t.disabled);
      if (!list.length) return;
      const cur = list.findIndex((t) => t.value === props.modelValue);
      let next = -1;
      if (e.key === "ArrowRight") next = (cur + 1) % list.length;
      else if (e.key === "ArrowLeft") next = (cur - 1 + list.length) % list.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = list.length - 1;
      if (next < 0) return;
      e.preventDefault();
      select(list[next].value);
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent26("wd-icon");
      return _openBlock51(), _createElementBlock51(
        "div",
        {
          class: _normalizeClass42(["wd-tabs", {
            "wd-tabs--block": __props.block,
            "wd-tabs--anim-ready": animReady.value,
            "wd-tabs--scrollable": __props.scrollable,
            "wd-tabs--closable": items.value.some((t) => t.closable)
          }]),
          role: "tablist",
          onKeydown
        },
        [
          (_openBlock51(true), _createElementBlock51(
            _Fragment27,
            null,
            _renderList24(items.value, (t) => {
              return _openBlock51(), _createElementBlock51("button", {
                key: t.value,
                type: "button",
                role: "tab",
                class: _normalizeClass42(["wd-tabs__item", {
                  "wd-tabs__item--active": t.value === __props.modelValue,
                  "wd-tabs__item--disabled": t.disabled
                }]),
                "data-wd-hover": "",
                "aria-selected": t.value === __props.modelValue,
                disabled: t.disabled,
                tabindex: t.value === __props.modelValue ? 0 : -1,
                onClick: ($event) => select(t.value)
              }, [
                _createElementVNode36(
                  "span",
                  _hoisted_239,
                  _toDisplayString37(t.label),
                  1
                  /* TEXT */
                ),
                t.closable && !t.disabled ? (_openBlock51(), _createElementBlock51("span", {
                  key: 0,
                  class: "wd-tabs__close",
                  role: "button",
                  "aria-label": `\u5173\u95ED ${t.label}`,
                  onClick: ($event) => close(t, $event)
                }, [
                  _createVNode24(_component_wd_icon, {
                    name: "close",
                    size: 10
                  })
                ], 8, _hoisted_334)) : _createCommentVNode36("v-if", true)
              ], 10, _hoisted_158);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          __props.addable ? (_openBlock51(), _createElementBlock51("button", {
            key: 0,
            type: "button",
            class: "wd-tabs__add",
            "aria-label": "\u65B0\u5EFA",
            "data-wd-hover": "",
            onClick: _cache[0] || (_cache[0] = ($event) => emit("add"))
          }, [
            _createVNode24(_component_wd_icon, {
              name: "plus",
              size: 14
            })
          ])) : _createCommentVNode36("v-if", true)
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
});

// .lib-build/WdTag.ts
import { defineComponent as _defineComponent52 } from "vue";
import { openBlock as _openBlock52, createElementBlock as _createElementBlock52, createCommentVNode as _createCommentVNode37, renderSlot as _renderSlot29, normalizeClass as _normalizeClass43 } from "vue";
var _hoisted_159 = {
  key: 0,
  class: "wd-tag__dot"
};
var WdTag_default = /* @__PURE__ */ _defineComponent52({
  ...{ name: "WdTag" },
  __name: "WdTag",
  props: {
    variant: { type: String, required: false, default: "tint" },
    size: { type: String, required: false },
    dot: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return _openBlock52(), _createElementBlock52(
        "span",
        {
          class: _normalizeClass43(["wd-tag", [`wd-tag--${__props.variant}`, { "wd-tag--lg": __props.size === "lg", "wd-tag--sm": __props.size === "sm" }]]),
          "data-wd-hover": ""
        },
        [
          __props.dot ? (_openBlock52(), _createElementBlock52("i", _hoisted_159)) : _createCommentVNode37("v-if", true),
          _renderSlot29(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      );
    };
  }
});

// .lib-build/WdTimeline.ts
import { defineComponent as _defineComponent53 } from "vue";
import { renderList as _renderList25, Fragment as _Fragment28, openBlock as _openBlock53, createElementBlock as _createElementBlock53, toDisplayString as _toDisplayString38, createCommentVNode as _createCommentVNode38, createElementVNode as _createElementVNode37, normalizeClass as _normalizeClass44 } from "vue";
var _hoisted_160 = {
  key: 0,
  class: "wd-timeline__period"
};
var _hoisted_240 = { class: "wd-timeline__body" };
var _hoisted_335 = { class: "wd-timeline__title" };
var _hoisted_425 = {
  key: 0,
  class: "wd-timeline__desc"
};
var WdTimeline_default = /* @__PURE__ */ _defineComponent53({
  ...{ name: "WdTimeline" },
  __name: "WdTimeline",
  props: {
    items: { type: Array, required: true },
    line: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return _openBlock53(), _createElementBlock53(
        "ul",
        {
          class: _normalizeClass44(["wd-timeline", { "wd-timeline--line": __props.line }])
        },
        [
          (_openBlock53(true), _createElementBlock53(
            _Fragment28,
            null,
            _renderList25(__props.items, (it, i) => {
              return _openBlock53(), _createElementBlock53("li", {
                key: i,
                class: "wd-timeline__item"
              }, [
                it.period ? (_openBlock53(), _createElementBlock53(
                  "span",
                  _hoisted_160,
                  _toDisplayString38(it.period),
                  1
                  /* TEXT */
                )) : _createCommentVNode38("v-if", true),
                _createElementVNode37("div", _hoisted_240, [
                  _createElementVNode37(
                    "h3",
                    _hoisted_335,
                    _toDisplayString38(it.title),
                    1
                    /* TEXT */
                  ),
                  it.desc ? (_openBlock53(), _createElementBlock53(
                    "p",
                    _hoisted_425,
                    _toDisplayString38(it.desc),
                    1
                    /* TEXT */
                  )) : _createCommentVNode38("v-if", true)
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      );
    };
  }
});

// .lib-build/WdTooltip.ts
import { defineComponent as _defineComponent54 } from "vue";
import { renderSlot as _renderSlot30, unref as _unref7, toDisplayString as _toDisplayString39, openBlock as _openBlock54, createElementBlock as _createElementBlock54, createCommentVNode as _createCommentVNode39, Transition as _Transition6, withCtx as _withCtx7, createVNode as _createVNode25, normalizeClass as _normalizeClass45 } from "vue";
import { ref as ref31 } from "vue";
var _hoisted_161 = {
  key: 0,
  class: "wd-tooltip__bubble",
  role: "tooltip"
};
var WdTooltip_default = /* @__PURE__ */ _defineComponent54({
  ...{ name: "WdTooltip" },
  __name: "WdTooltip",
  props: {
    content: { type: String, required: false, default: "" },
    placement: { type: String, required: false, default: "top" }
  },
  setup(__props) {
    const POP_DURATION = popDuration();
    const open = ref31(false);
    return (_ctx, _cache) => {
      return _openBlock54(), _createElementBlock54(
        "span",
        {
          class: _normalizeClass45(["wd-tooltip", [`wd-tooltip--${__props.placement}`, { "wd-tooltip--open": open.value }]]),
          onMouseenter: _cache[0] || (_cache[0] = ($event) => open.value = true),
          onMouseleave: _cache[1] || (_cache[1] = ($event) => open.value = false),
          onFocusin: _cache[2] || (_cache[2] = ($event) => open.value = true),
          onFocusout: _cache[3] || (_cache[3] = ($event) => open.value = false)
        },
        [
          _renderSlot30(_ctx.$slots, "default"),
          _createVNode25(_Transition6, {
            name: "wd-pop",
            duration: _unref7(POP_DURATION)
          }, {
            default: _withCtx7(() => [
              open.value ? (_openBlock54(), _createElementBlock54(
                "span",
                _hoisted_161,
                _toDisplayString39(__props.content),
                1
                /* TEXT */
              )) : _createCommentVNode39("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }, 8, ["duration"])
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
});

// .lib-build/WdTree.ts
import { defineComponent as _defineComponent55 } from "vue";
import { renderList as _renderList26, Fragment as _Fragment29, openBlock as _openBlock55, createElementBlock as _createElementBlock55, resolveComponent as _resolveComponent27, createBlock as _createBlock17, createCommentVNode as _createCommentVNode40, withModifiers as _withModifiers10, normalizeClass as _normalizeClass46, createElementVNode as _createElementVNode38, renderSlot as _renderSlot31, toDisplayString as _toDisplayString40, createTextVNode as _createTextVNode17, normalizeStyle as _normalizeStyle22 } from "vue";
import { computed as computed38, ref as ref32, watch as watch14 } from "vue";
var _hoisted_163 = ["data-k", "tabindex", "aria-expanded", "aria-selected", "aria-disabled", "onClick", "onKeydown"];
var _hoisted_241 = ["onClick"];
var _hoisted_336 = ["checked", ".indeterminate", "disabled", "onChange"];
var _hoisted_426 = {
  key: 1,
  class: "wd-tree__icon"
};
var _hoisted_519 = { class: "wd-tree__label" };
var _hoisted_611 = {
  key: 0,
  class: "wd-tree__empty"
};
var WdTree_default = /* @__PURE__ */ _defineComponent55({
  ...{ name: "WdTree" },
  __name: "WdTree",
  props: {
    nodes: { type: Array, required: false, default: () => [] },
    expandedKeys: { type: Array, required: false, default: () => [] },
    selectedKey: { type: [String, Number, null], required: false, default: null },
    checkable: { type: Boolean, required: false, default: false },
    checkedKeys: { type: Array, required: false, default: () => [] },
    cascade: { type: Boolean, required: false, default: true },
    showLine: { type: Boolean, required: false, default: false },
    emptyText: { type: String, required: false, default: "\u6682\u65E0\u6570\u636E" },
    indent: { type: Number, required: false, default: 18 }
  },
  emits: ["update:expandedKeys", "update:selectedKey", "update:checkedKeys", "select", "check", "expand"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const keyOf = (n) => n.key ?? n.label;
    const innerExpanded = ref32([...props.expandedKeys]);
    const expanded = computed38(() => props.expandedKeys ? props.expandedKeys : innerExpanded.value);
    function isExpanded(k) {
      return expanded.value.includes(k);
    }
    const innerChecked = ref32([...props.checkedKeys]);
    const checked = computed38(() => props.checkedKeys ? props.checkedKeys : innerChecked.value);
    const isChecked = (k) => checked.value.includes(k);
    function collectKeys(n, out = []) {
      out.push(keyOf(n));
      n.children?.forEach((c) => collectKeys(c, out));
      return out;
    }
    function ancestry(target, list = props.nodes, trail = []) {
      for (const n of list) {
        if (keyOf(n) === target) return trail;
        if (n.children) {
          const r = ancestry(target, n.children, [...trail, n]);
          if (r.length || keyOf(n) === target) return r;
        }
      }
      return [];
    }
    function toggleExpand(n) {
      const k = keyOf(n);
      const next = isExpanded(k) ? expanded.value.filter((x) => x !== k) : [...expanded.value, k];
      if (!props.expandedKeys) innerExpanded.value = next;
      emit("update:expandedKeys", next);
      emit("expand", n, !isExpanded(k));
    }
    function select(n) {
      if (n.disabled) return;
      emit("update:selectedKey", keyOf(n));
      emit("select", n);
    }
    function toggleCheck(n) {
      if (n.disabled) return;
      const k = keyOf(n);
      const on = !isChecked(k);
      let next = new Set(checked.value);
      const setDeep = (node, v) => {
        const kk = keyOf(node);
        if (v) next.add(kk);
        else next.delete(kk);
        node.children?.forEach((c) => setDeep(c, v));
      };
      if (props.cascade) setDeep(n, on);
      else on ? next.add(k) : next.delete(k);
      if (props.cascade) {
        let chain = ancestry(k);
        for (let i = chain.length - 1; i >= 0; i--) {
          const p = chain[i];
          const kids = p.children || [];
          const all = kids.length > 0 && kids.every((c) => next.has(keyOf(c)));
          all ? next.add(keyOf(p)) : next.delete(keyOf(p));
        }
      }
      const arr = [...next];
      if (!props.checkedKeys) innerChecked.value = arr;
      emit("update:checkedKeys", arr);
      emit("check", n, on);
    }
    function isIndeterminate(n) {
      if (!props.checkable || !props.cascade) return false;
      const kids = n.children || [];
      if (!kids.length) return false;
      const on = kids.filter((c) => isChecked(keyOf(c))).length;
      return on > 0 && on < kids.length;
    }
    const flat = computed38(() => {
      const out = [];
      const walk = (list, depth, parent) => {
        for (const n of list) {
          out.push({ node: n, depth, parent });
          if (n.children?.length && isExpanded(keyOf(n))) walk(n.children, depth + 1, n);
        }
      };
      walk(props.nodes, 0, null);
      return out;
    });
    const focusKey = ref32(null);
    const treeEl = ref32(null);
    function focusNode(k) {
      focusKey.value = k;
      treeEl.value?.querySelector(`[data-k="${CSS.escape(String(k))}"]`)?.focus();
    }
    function moveFocus(dir) {
      const list = flat.value.filter((x) => !x.node.disabled);
      if (!list.length) return;
      const curKey = document.activeElement?.getAttribute?.("data-k") ?? (focusKey.value !== null ? String(focusKey.value) : null) ?? (props.selectedKey !== null && props.selectedKey !== void 0 ? String(props.selectedKey) : null);
      const i = list.findIndex((x) => String(keyOf(x.node)) === curKey);
      const next = i < 0 ? 0 : Math.min(list.length - 1, Math.max(0, i + dir));
      focusNode(keyOf(list[next].node));
    }
    function onKeydown(e, entry) {
      const n = entry.node;
      const k = keyOf(n);
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          moveFocus(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          moveFocus(-1);
          break;
        case "ArrowRight":
          e.preventDefault();
          if (n.children?.length && !isExpanded(k)) toggleExpand(n);
          else moveFocus(1);
          break;
        case "ArrowLeft": {
          e.preventDefault();
          const parent = flat.value.find((x) => keyOf(x.node) === k)?.parent;
          if (n.children?.length && isExpanded(k)) toggleExpand(n);
          else if (parent) focusNode(keyOf(parent));
          break;
        }
        case "Enter":
        case " ":
          e.preventDefault();
          select(n);
          break;
      }
    }
    watch14(
      () => props.expandedKeys,
      (v) => {
        if (v) innerExpanded.value = [...v];
      }
    );
    watch14(
      () => props.checkedKeys,
      (v) => {
        if (v) innerChecked.value = [...v];
      }
    );
    const depthPad = (d) => `${d * props.indent + 8}px`;
    function lineX(depth) {
      if (!depth) return "0px";
      return `${(depth - 1) * props.indent + 8 + 8}px`;
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent27("wd-icon");
      return _openBlock55(), _createElementBlock55(
        "div",
        {
          ref_key: "treeEl",
          ref: treeEl,
          class: _normalizeClass46(["wd-tree", { "wd-tree--line": __props.showLine }]),
          role: "tree",
          onKeydown: _cache[2] || (_cache[2] = _withModifiers10(() => {
          }, ["self", "prevent"]))
        },
        [
          (_openBlock55(true), _createElementBlock55(
            _Fragment29,
            null,
            _renderList26(flat.value, (entry) => {
              return _openBlock55(), _createElementBlock55("div", {
                key: keyOf(entry.node),
                class: _normalizeClass46(["wd-tree__node", {
                  "wd-tree__node--selected": __props.selectedKey === keyOf(entry.node),
                  "wd-tree__node--disabled": entry.node.disabled
                }]),
                role: "treeitem",
                "data-k": keyOf(entry.node),
                tabindex: entry.node.disabled ? -1 : 0,
                "aria-expanded": entry.node.children?.length ? isExpanded(keyOf(entry.node)) : void 0,
                "aria-selected": __props.selectedKey === keyOf(entry.node),
                "aria-disabled": entry.node.disabled || void 0,
                style: _normalizeStyle22({ paddingLeft: depthPad(entry.depth), "--wd-tree-line-x": lineX(entry.depth) }),
                onClick: ($event) => select(entry.node),
                onKeydown: ($event) => onKeydown($event, entry)
              }, [
                _createElementVNode38("span", {
                  class: _normalizeClass46(["wd-tree__arrow", { "wd-tree__arrow--open": isExpanded(keyOf(entry.node)), "wd-tree__arrow--leaf": !entry.node.children?.length }]),
                  onClick: _withModifiers10(($event) => entry.node.children?.length && toggleExpand(entry.node), ["stop"])
                }, [
                  entry.node.children?.length ? (_openBlock55(), _createBlock17(_component_wd_icon, {
                    key: 0,
                    name: "chevron-right",
                    size: 10
                  })) : _createCommentVNode40("v-if", true)
                ], 10, _hoisted_241),
                __props.checkable ? (_openBlock55(), _createElementBlock55("label", {
                  key: 0,
                  class: "wd-tree__check",
                  onClick: _cache[0] || (_cache[0] = _withModifiers10(() => {
                  }, ["stop"]))
                }, [
                  _createElementVNode38("input", {
                    type: "checkbox",
                    checked: isChecked(keyOf(entry.node)),
                    ".indeterminate": isIndeterminate(entry.node),
                    disabled: entry.node.disabled,
                    onChange: ($event) => toggleCheck(entry.node)
                  }, null, 40, _hoisted_336)
                ])) : _createCommentVNode40("v-if", true),
                entry.node.icon || _ctx.$slots.icon ? (_openBlock55(), _createElementBlock55("span", _hoisted_426, [
                  _renderSlot31(_ctx.$slots, "icon", {
                    node: entry.node
                  }, () => [
                    _createTextVNode17(
                      _toDisplayString40(entry.node.icon),
                      1
                      /* TEXT */
                    )
                  ])
                ])) : _createCommentVNode40("v-if", true),
                _createElementVNode38("span", _hoisted_519, [
                  _renderSlot31(_ctx.$slots, "label", {
                    node: entry.node
                  }, () => [
                    _createTextVNode17(
                      _toDisplayString40(entry.node.label),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                _ctx.$slots.extra ? (_openBlock55(), _createElementBlock55("span", {
                  key: 2,
                  class: "wd-tree__extra",
                  onClick: _cache[1] || (_cache[1] = _withModifiers10(() => {
                  }, ["stop"]))
                }, [
                  _renderSlot31(_ctx.$slots, "extra", {
                    node: entry.node
                  })
                ])) : _createCommentVNode40("v-if", true)
              ], 46, _hoisted_163);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          !flat.value.length ? (_openBlock55(), _createElementBlock55(
            "div",
            _hoisted_611,
            _toDisplayString40(__props.emptyText),
            1
            /* TEXT */
          )) : _createCommentVNode40("v-if", true)
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
});

// .lib-build/WdUpload.ts
import { defineComponent as _defineComponent56 } from "vue";
import { resolveComponent as _resolveComponent28, createVNode as _createVNode26, createElementVNode as _createElementVNode39, createTextVNode as _createTextVNode18, toDisplayString as _toDisplayString41, openBlock as _openBlock56, createElementBlock as _createElementBlock56, createCommentVNode as _createCommentVNode41, withModifiers as _withModifiers11, normalizeClass as _normalizeClass47, renderList as _renderList27, Fragment as _Fragment30, normalizeStyle as _normalizeStyle23 } from "vue";
import { ref as ref33 } from "vue";
var _hoisted_164 = { class: "wd-upload" };
var _hoisted_242 = { class: "wd-upload__icon" };
var _hoisted_337 = {
  key: 0,
  class: "wd-upload__hint"
};
var _hoisted_427 = ["accept", "multiple"];
var _hoisted_520 = {
  key: 1,
  class: "wd-upload__error"
};
var _hoisted_612 = {
  key: 0,
  class: "wd-upload__list"
};
var _hoisted_711 = { class: "wd-upload__file-icon" };
var _hoisted_810 = { class: "wd-upload__info" };
var _hoisted_98 = { class: "wd-upload__name" };
var _hoisted_108 = { class: "wd-upload__meta" };
var _hoisted_1113 = {
  key: 0,
  class: "wd-upload__progress"
};
var _hoisted_1210 = ["onClick"];
var WdUpload_default = /* @__PURE__ */ _defineComponent56({
  ...{ name: "WdUpload" },
  __name: "WdUpload",
  props: {
    accept: { type: String, required: false, default: "*" },
    multiple: { type: Boolean, required: false, default: false },
    hint: { type: String, required: false, default: "" },
    maxCount: { type: Number, required: false, default: 0 },
    maxSize: { type: Number, required: false, default: 0 },
    showList: { type: Boolean, required: false, default: true }
  },
  emits: ["change", "exceed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const error = ref33("");
    const files = ref33([]);
    const dragging = ref33(false);
    const input = ref33();
    function fmtSize(n) {
      if (n < 1024) return `${n} B`;
      if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
      return `${(n / 1048576).toFixed(1)} MB`;
    }
    function addFiles(list) {
      error.value = "";
      for (const f of Array.from(list)) {
        if (props.maxCount > 0 && files.value.length >= props.maxCount) {
          error.value = `\u6700\u591A\u4E0A\u4F20 ${props.maxCount} \u4E2A\u6587\u4EF6`;
          emit("exceed", "count", f);
          break;
        }
        if (props.maxSize > 0 && f.size > props.maxSize) {
          error.value = `${f.name} \u8D85\u8FC7 ${fmtSize(props.maxSize)} \u4E0A\u9650`;
          emit("exceed", "size", f);
          continue;
        }
        if (!props.multiple && files.value.length >= 1) files.value = [];
        const item = { name: f.name, size: f.size, percent: 0 };
        files.value.push(item);
        emit("change", files.value);
        const timer = window.setInterval(() => {
          item.percent = Math.min(100, item.percent + Math.round(12 + Math.random() * 16));
          if (item.percent >= 100) window.clearInterval(timer);
        }, 120);
      }
    }
    function openPicker() {
      input.value?.click();
    }
    function onPick(e) {
      const target = e.target;
      addFiles(target.files || []);
      target.value = "";
    }
    function onDrop(e) {
      e.preventDefault();
      dragging.value = false;
      if (e.dataTransfer) addFiles(e.dataTransfer.files);
    }
    function remove(i) {
      files.value.splice(i, 1);
      emit("change", files.value);
    }
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent28("wd-icon");
      return _openBlock56(), _createElementBlock56("div", _hoisted_164, [
        _createElementVNode39(
          "div",
          {
            class: _normalizeClass47(["wd-upload__zone", { "wd-upload__zone--over": dragging.value }]),
            onClick: openPicker,
            onDragover: _cache[0] || (_cache[0] = _withModifiers11(($event) => dragging.value = true, ["prevent"])),
            onDragleave: _cache[1] || (_cache[1] = ($event) => dragging.value = false),
            onDrop
          },
          [
            _createElementVNode39("span", _hoisted_242, [
              _createVNode26(_component_wd_icon, {
                name: "upload",
                size: 30
              })
            ]),
            _cache[2] || (_cache[2] = _createElementVNode39(
              "span",
              { class: "wd-upload__hint" },
              [
                _createElementVNode39("strong", null, "\u70B9\u51FB\u9009\u62E9"),
                _createTextVNode18(" \u6216\u62D6\u62FD\u6587\u4EF6\u5230\u8FD9\u91CC")
              ],
              -1
              /* CACHED */
            )),
            __props.hint ? (_openBlock56(), _createElementBlock56(
              "span",
              _hoisted_337,
              _toDisplayString41(__props.hint),
              1
              /* TEXT */
            )) : _createCommentVNode41("v-if", true),
            _cache[3] || (_cache[3] = _createElementVNode39(
              "span",
              { class: "wd-upload__browse" },
              "\u6D4F\u89C8\u6587\u4EF6",
              -1
              /* CACHED */
            )),
            _createElementVNode39("input", {
              ref_key: "input",
              ref: input,
              class: "wd-upload__input",
              type: "file",
              accept: __props.accept,
              multiple: __props.multiple,
              onChange: onPick
            }, null, 40, _hoisted_427),
            error.value ? (_openBlock56(), _createElementBlock56(
              "span",
              _hoisted_520,
              _toDisplayString41(error.value),
              1
              /* TEXT */
            )) : _createCommentVNode41("v-if", true)
          ],
          34
          /* CLASS, NEED_HYDRATION */
        ),
        __props.showList && files.value.length ? (_openBlock56(), _createElementBlock56("div", _hoisted_612, [
          (_openBlock56(true), _createElementBlock56(
            _Fragment30,
            null,
            _renderList27(files.value, (f, i) => {
              return _openBlock56(), _createElementBlock56("div", {
                key: i,
                class: "wd-upload__item"
              }, [
                _createElementVNode39("span", _hoisted_711, [
                  _createVNode26(_component_wd_icon, {
                    name: "file",
                    size: 16
                  })
                ]),
                _createElementVNode39("div", _hoisted_810, [
                  _createElementVNode39(
                    "div",
                    _hoisted_98,
                    _toDisplayString41(f.name),
                    1
                    /* TEXT */
                  ),
                  _createElementVNode39(
                    "div",
                    _hoisted_108,
                    _toDisplayString41(fmtSize(f.size)) + " \xB7 " + _toDisplayString41(f.percent >= 100 ? "\u5DF2\u5B8C\u6210" : "\u4E0A\u4F20\u4E2D " + f.percent + "%"),
                    1
                    /* TEXT */
                  ),
                  f.percent < 100 ? (_openBlock56(), _createElementBlock56("div", _hoisted_1113, [
                    _createElementVNode39(
                      "span",
                      {
                        class: "wd-upload__progress-bar",
                        style: _normalizeStyle23({ width: f.percent + "%" })
                      },
                      null,
                      4
                      /* STYLE */
                    )
                  ])) : _createCommentVNode41("v-if", true)
                ]),
                _createElementVNode39("button", {
                  type: "button",
                  class: "wd-upload__remove",
                  "aria-label": "\u79FB\u9664",
                  onClick: _withModifiers11(($event) => remove(i), ["stop"])
                }, [
                  _createVNode26(_component_wd_icon, {
                    name: "close",
                    size: 13
                  })
                ], 8, _hoisted_1210)
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : _createCommentVNode41("v-if", true)
      ]);
    };
  }
});

// .lib-build/WdVideoPlayer.ts
import { defineComponent as _defineComponent57 } from "vue";
import { createElementVNode as _createElementVNode40, createCommentVNode as _createCommentVNode42, toDisplayString as _toDisplayString42, openBlock as _openBlock57, createElementBlock as _createElementBlock57, createTextVNode as _createTextVNode19, renderSlot as _renderSlot32, normalizeClass as _normalizeClass48, resolveComponent as _resolveComponent29, createVNode as _createVNode27, withModifiers as _withModifiers12, normalizeStyle as _normalizeStyle24, Fragment as _Fragment31, renderList as _renderList28 } from "vue";
import { computed as computed39, nextTick as nextTick5, onBeforeUnmount as onBeforeUnmount15, onMounted as onMounted8, ref as ref34, watch as watch15 } from "vue";
var _hoisted_165 = ["poster", "loop", "muted", "autoplay"];
var _hoisted_243 = {
  key: 0,
  class: "wd-vplayer__title"
};
var _hoisted_338 = {
  key: 1,
  class: "wd-vplayer__live"
};
var _hoisted_428 = { class: "wd-vplayer__overlay" };
var _hoisted_521 = {
  key: 1,
  class: "wd-vplayer__loading",
  "aria-hidden": "true"
};
var _hoisted_613 = {
  key: 2,
  class: "wd-vplayer__error"
};
var _hoisted_712 = ["aria-valuenow"];
var _hoisted_811 = { class: "wd-vplayer__row" };
var _hoisted_99 = ["aria-label"];
var _hoisted_109 = ["disabled"];
var _hoisted_1114 = ["disabled"];
var _hoisted_1211 = {
  key: 1,
  class: "wd-vplayer__time"
};
var _hoisted_1310 = { class: "wd-vplayer__time" };
var _hoisted_1410 = { class: "wd-vplayer__vol" };
var _hoisted_1510 = ["aria-label"];
var _hoisted_166 = {
  key: 3,
  class: "wd-vplayer__panel-wrap"
};
var _hoisted_173 = ["aria-expanded"];
var _hoisted_183 = ["onClick"];
var _hoisted_193 = {
  key: 4,
  class: "wd-vplayer__panel-wrap"
};
var _hoisted_203 = ["aria-expanded"];
var _hoisted_2110 = { class: "wd-vplayer__eps-head" };
var _hoisted_2210 = { class: "wd-vplayer__eps-grid" };
var _hoisted_2310 = ["disabled", "onClick"];
var _hoisted_244 = {
  key: 0,
  class: "wd-vplayer__ep-tag"
};
var WdVideoPlayer_default = /* @__PURE__ */ _defineComponent57({
  ...{ name: "WdVideoPlayer" },
  __name: "WdVideoPlayer",
  props: {
    src: { type: String, required: false, default: "" },
    mode: { type: String, required: false, default: "vod" },
    poster: { type: String, required: false, default: "" },
    title: { type: String, required: false, default: "" },
    controlsMode: { type: String, required: false, default: "auto" },
    autoplay: { type: Boolean, required: false, default: false },
    loop: { type: Boolean, required: false, default: false },
    muted: { type: Boolean, required: false, default: false },
    rates: { type: Array, required: false, default: () => [0.75, 1, 1.25, 1.5, 2] },
    episodes: { type: Array, required: false, default: () => [] },
    currentEpisode: { type: [String, Number], required: false, default: void 0 },
    episodeNav: { type: Boolean, required: false, default: true },
    playlist: { type: Boolean, required: false, default: true },
    pip: { type: Boolean, required: false, default: true },
    hls: { type: String, required: false, default: "auto" },
    liveSync: { type: Boolean, required: false, default: true },
    iconStyle: { type: String, required: false, default: "filled" }
  },
  emits: ["play", "pause", "ended", "timeupdate", "error", "changeEpisode", "rateChange"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const video = ref34(null);
    const wrap = ref34(null);
    const playing = ref34(false);
    const current = ref34(0);
    const duration = ref34(0);
    const buffered = ref34(0);
    const volume = ref34(1);
    const muted = ref34(props.muted);
    const rate = ref34(1);
    const ready = ref34(false);
    const errMsg = ref34("");
    const isFullscreen = ref34(false);
    const isLive = computed39(() => props.mode === "live");
    let hls = null;
    const HLS = globalThis.Hls;
    const isM3u8 = computed39(() => /\.m3u8(\?|$)/i.test(props.src));
    let loadTimer;
    function armLoadTimeout() {
      if (loadTimer) clearTimeout(loadTimer);
      loadTimer = setTimeout(() => {
        const v = video.value;
        if (ready.value || v && v.readyState >= 1 || errMsg.value) return;
        errMsg.value = "\u52A0\u8F7D\u8D85\u65F6\uFF0C\u8BF7\u68C0\u67E5\u5730\u5740\u6216\u7F51\u7EDC";
        emit("error", errMsg.value);
      }, 15e3);
    }
    function clearLoadTimeout() {
      if (loadTimer) {
        clearTimeout(loadTimer);
        loadTimer = void 0;
      }
    }
    function destroyHls() {
      if (hls) {
        try {
          hls.destroy();
        } catch {
        }
        hls = null;
      }
    }
    const canNativeHls = () => {
      const v = document.createElement("video");
      return !!v.canPlayType("application/vnd.apple.mpegurl");
    };
    const hasMSE = () => typeof MediaSource !== "undefined";
    let tryFallbackHls = false;
    function mountSource() {
      const v = video.value;
      if (!v) return;
      destroyHls();
      clearLoadTimeout();
      v.removeAttribute("src");
      v.load();
      errMsg.value = "";
      tryFallbackHls = false;
      if (props.hls === "off" || !isM3u8.value) {
        v.src = props.src;
        return;
      }
      if (props.hls === "hlsjs") {
        attachHls();
        return;
      }
      if (canNativeHls()) {
        tryFallbackHls = !!HLS && hasMSE();
        v.src = props.src;
        return;
      }
      if (HLS && hasMSE()) {
        attachHls();
        return;
      }
      v.src = props.src;
    }
    function attachHls() {
      const v = video.value;
      if (!v || !HLS) return;
      hls = new HLS({
        // 直播从近边缘起播，别从头拉一堆积压分片
        liveSyncDurationCount: props.liveSync ? 3 : 6,
        enableWorker: true,
        lowLatencyMode: false
      });
      hls.on("hlsError", (_e, data) => {
        if (!data?.fatal) return;
        if (data.type === "mediaError") {
          hls?.recoverMediaError();
          return;
        }
        errMsg.value = "\u76F4\u64AD\u6D41\u8FDE\u63A5\u5931\u8D25";
        emit("error", errMsg.value);
      });
      hls.loadSource(props.src);
      hls.attachMedia(v);
    }
    const hovering = ref34(false);
    const panelOpen = ref34("");
    const barVisible = computed39(
      () => props.controlsMode === "always" || !playing.value || hovering.value || panelOpen.value !== "" || !ready.value
    );
    let hideTimer;
    function poke() {
      hovering.value = true;
      if (hideTimer) clearTimeout(hideTimer);
      if (props.controlsMode === "auto" && playing.value && !panelOpen.value) {
        hideTimer = setTimeout(() => {
          hovering.value = false;
        }, 2600);
      }
    }
    function onLeave() {
      if (hideTimer) clearTimeout(hideTimer);
      hovering.value = false;
    }
    const showCursor = computed39(() => !isFullscreen.value || barVisible.value);
    function togglePlay() {
      const v = video.value;
      if (!v) return;
      if (v.paused) {
        if (!ready.value) armLoadTimeout();
        v.play().catch((e) => {
          errMsg.value = "\u64AD\u653E\u5931\u8D25\uFF1A" + e.message;
        });
      } else {
        v.pause();
      }
    }
    function fmtTime(t) {
      if (!isFinite(t) || t < 0) t = 0;
      const h = Math.floor(t / 3600);
      const m = Math.floor(t % 3600 / 60);
      const s = Math.floor(t % 60);
      if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      return `${m}:${String(s).padStart(2, "0")}`;
    }
    const progress = computed39(() => {
      if (isLive.value || !isFinite(duration.value) || duration.value <= 0) return 0;
      return current.value / duration.value * 100;
    });
    const bufferedPct = computed39(() => duration.value > 0 ? buffered.value / duration.value * 100 : 0);
    const remain = computed39(() => Math.max(0, duration.value - current.value));
    const liveClock = ref34("");
    let clockTimer;
    function tickClock() {
      const d = /* @__PURE__ */ new Date();
      const p = (n) => String(n).padStart(2, "0");
      liveClock.value = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    }
    watch15(playing, (v) => {
      if (v && isLive.value) {
        tickClock();
        clockTimer = setInterval(tickClock, 1e3);
      } else if (clockTimer) {
        clearInterval(clockTimer);
        clockTimer = void 0;
      }
    });
    function onTimeUpdate() {
      const v = video.value;
      if (!v) return;
      if (errMsg.value && v.readyState >= 2) errMsg.value = "";
      current.value = v.currentTime;
      duration.value = v.duration || 0;
      emit("timeupdate", current.value, duration.value);
    }
    function onProgressEvt() {
      const v = video.value;
      if (!v || !v.buffered.length) return;
      buffered.value = v.buffered.end(v.buffered.length - 1);
    }
    const dragging = ref34(false);
    function ratioFrom(e, el) {
      const r = el.getBoundingClientRect();
      return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    }
    function seekAt(e) {
      const v = video.value;
      if (!v || isLive.value || !duration.value) return;
      const t = ratioFrom(e, e.currentTarget) * duration.value;
      v.currentTime = t;
      current.value = t;
    }
    function onScrubKey(e) {
      const v = video.value;
      if (!v) return;
      if (e.key === "ArrowRight" && !isLive.value) {
        v.currentTime = Math.min(v.duration || 0, v.currentTime + 5);
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && !isLive.value) {
        v.currentTime = Math.max(0, v.currentTime - 5);
        e.preventDefault();
      } else if (e.key === " " || e.key === "Enter") {
        togglePlay();
        e.preventDefault();
      }
    }
    function setVolumeAt(e) {
      const v = video.value;
      if (!v) return;
      const r = ratioFrom(e, e.currentTarget);
      volume.value = r;
      v.volume = r;
      v.muted = r === 0;
      muted.value = v.muted;
    }
    function toggleMute() {
      const v = video.value;
      if (!v) return;
      v.muted = !v.muted;
      muted.value = v.muted;
      if (!v.muted && v.volume === 0) {
        v.volume = 0.5;
        volume.value = 0.5;
      }
    }
    function setRate(r) {
      const v = video.value;
      if (!v) return;
      v.playbackRate = r;
      rate.value = r;
      panelOpen.value = "";
      emit("rateChange", r);
    }
    function togglePanel(p) {
      panelOpen.value = panelOpen.value === p ? "" : p;
    }
    const epIndex = computed39(
      () => props.episodes.findIndex((e) => e.key === props.currentEpisode)
    );
    const hasPrev = computed39(() => props.episodeNav && epIndex.value > 0);
    const hasNext = computed39(
      () => props.episodeNav && epIndex.value >= 0 && epIndex.value < props.episodes.length - 1
    );
    function goEpisode(ep, idx) {
      if (!ep || ep.disabled) return;
      emit("changeEpisode", ep, idx);
      if (ep.src && video.value) {
        video.value.src = ep.src;
        video.value.play().catch(() => {
        });
      }
      panelOpen.value = "";
    }
    function prevEpisode() {
      if (hasPrev.value) goEpisode(props.episodes[epIndex.value - 1], epIndex.value - 1);
    }
    function nextEpisode() {
      if (hasNext.value) goEpisode(props.episodes[epIndex.value + 1], epIndex.value + 1);
    }
    async function togglePip() {
      const v = video.value;
      if (!v || !document.pictureInPictureEnabled) return;
      try {
        if (document.pictureInPictureElement) await document.exitPictureInPicture();
        else await v.requestPictureInPicture();
      } catch {
        errMsg.value = "\u753B\u4E2D\u753B\u4E0D\u53EF\u7528";
      }
    }
    function toggleFullscreen() {
      const el = wrap.value;
      if (!el) return;
      if (document.fullscreenElement) document.exitFullscreen();
      else el.requestFullscreen?.().catch(() => {
        errMsg.value = "\u5168\u5C4F\u88AB\u62D2\u7EDD\uFF08\u9700\u7528\u6237\u624B\u52BF\uFF09";
      });
    }
    function onFsChange() {
      isFullscreen.value = !!document.fullscreenElement;
      poke();
    }
    function onError() {
      const v = video.value;
      if (tryFallbackHls && HLS && hasMSE()) {
        tryFallbackHls = false;
        attachHls();
        return;
      }
      const map = { 1: "\u52A0\u8F7D\u88AB\u4E2D\u65AD", 2: "\u7F51\u7EDC\u9519\u8BEF", 3: "\u89E3\u7801\u5931\u8D25", 4: "\u5730\u5740\u4E0D\u652F\u6301\u6216\u683C\u5F0F\u4E0D\u517C\u5BB9" };
      errMsg.value = map[v?.error?.code || 0] || "\u89C6\u9891\u52A0\u8F7D\u5931\u8D25";
      emit("error", errMsg.value);
    }
    watch15(() => props.src, async () => {
      ready.value = false;
      current.value = 0;
      duration.value = 0;
      buffered.value = 0;
      await nextTick5();
      mountSource();
    });
    onMounted8(() => {
      mountSource();
      if (props.autoplay) armLoadTimeout();
      document.addEventListener("fullscreenchange", onFsChange);
    });
    watch15(() => props.muted, (m) => {
      if (video.value) video.value.muted = m;
    });
    onBeforeUnmount15(() => {
      if (hideTimer) clearTimeout(hideTimer);
      if (clockTimer) clearInterval(clockTimer);
      clearLoadTimeout();
      destroyHls();
      document.removeEventListener("fullscreenchange", onFsChange);
    });
    return (_ctx, _cache) => {
      const _component_wd_icon = _resolveComponent29("wd-icon");
      return _openBlock57(), _createElementBlock57(
        "div",
        {
          ref_key: "wrap",
          ref: wrap,
          class: _normalizeClass48(["wd-vplayer", { "is-playing": playing.value, "is-fullscreen": isFullscreen.value, "no-cursor": !showCursor.value }]),
          onMousemove: poke,
          onMouseleave: onLeave,
          onTouchstartPassive: poke
        },
        [
          _createElementVNode40("video", {
            ref_key: "video",
            ref: video,
            class: "wd-vplayer__el",
            poster: __props.poster,
            loop: __props.loop,
            muted: muted.value,
            autoplay: __props.autoplay,
            playsinline: "",
            preload: "metadata",
            onClick: togglePlay,
            onDblclick: toggleFullscreen,
            onPlay: _cache[0] || (_cache[0] = ($event) => {
              playing.value = true;
              poke();
              emit("play");
            }),
            onPause: _cache[1] || (_cache[1] = ($event) => {
              playing.value = false;
              emit("pause");
            }),
            onEnded: _cache[2] || (_cache[2] = ($event) => {
              playing.value = false;
              emit("ended");
            }),
            onTimeupdate: onTimeUpdate,
            onProgress: onProgressEvt,
            onLoadedmetadata: _cache[3] || (_cache[3] = ($event) => {
              ready.value = true;
              errMsg.value = "";
              clearLoadTimeout();
              onTimeUpdate();
            }),
            onCanplay: _cache[4] || (_cache[4] = ($event) => {
              ready.value = true;
              errMsg.value = "";
              clearLoadTimeout();
            }),
            onPlaying: _cache[5] || (_cache[5] = ($event) => errMsg.value = ""),
            onError
          }, null, 40, _hoisted_165),
          _createCommentVNode42(" ===== \u70B9\u51FB\u5C42\uFF1A\u6574\u4E2A\u753B\u9762\u53EF\u6682\u505C\uFF08\u9F20\u6807\u6307\u9488\u4E0D\u663E\u793A\uFF09 ===== "),
          _createElementVNode40("div", {
            class: "wd-vplayer__hit",
            onClick: togglePlay
          }),
          _createCommentVNode42(" ===== \u9876\u90E8\u6E10\u53D8\u6761\uFF1A\u6807\u9898 + \u76F4\u64AD\u6807\u8BC6 ===== "),
          _createElementVNode40(
            "div",
            {
              class: _normalizeClass48(["wd-vplayer__top", { "is-visible": barVisible.value }])
            },
            [
              __props.title ? (_openBlock57(), _createElementBlock57(
                "span",
                _hoisted_243,
                _toDisplayString42(__props.title),
                1
                /* TEXT */
              )) : _createCommentVNode42("v-if", true),
              isLive.value ? (_openBlock57(), _createElementBlock57("span", _hoisted_338, [..._cache[10] || (_cache[10] = [
                _createElementVNode40(
                  "i",
                  { class: "wd-vplayer__live-dot" },
                  null,
                  -1
                  /* CACHED */
                ),
                _createTextVNode19(
                  "\u76F4\u64AD ",
                  -1
                  /* CACHED */
                )
              ])])) : _createCommentVNode42("v-if", true),
              _createCommentVNode42(" \u9876\u90E8\u53F3\u4FA7\uFF1A\u6E05\u6670\u5EA6\u5207\u6362\u3001\u5F39\u5E55\u5F00\u5173\u3001\u7247\u6E90\u7B49 "),
              _cache[11] || (_cache[11] = _createElementVNode40(
                "span",
                { class: "wd-vplayer__spacer" },
                null,
                -1
                /* CACHED */
              )),
              _renderSlot32(_ctx.$slots, "top-right")
            ],
            2
            /* CLASS */
          ),
          _createCommentVNode42(" ===== \u753B\u9762\u8986\u76D6\u5C42\uFF1A\u5F39\u5E55 / \u81EA\u5B9A\u4E49\u5B57\u5E55 / \u6C34\u5370 ===== "),
          _createElementVNode40("div", _hoisted_428, [
            _renderSlot32(_ctx.$slots, "overlay", {
              playing: playing.value,
              current: current.value,
              duration: duration.value
            })
          ]),
          _createCommentVNode42(" ===== \u4E2D\u592E\u5927\u64AD\u653E\u6309\u94AE\uFF08\u672A\u64AD\u653E\u65F6\uFF09 ===== "),
          !playing.value && !errMsg.value ? (_openBlock57(), _createElementBlock57("button", {
            key: 0,
            type: "button",
            class: "wd-vplayer__big",
            "aria-label": "\u64AD\u653E",
            onClick: _withModifiers12(togglePlay, ["stop"])
          }, [
            _createVNode27(_component_wd_icon, {
              name: "play",
              variant: __props.iconStyle,
              size: 30
            }, null, 8, ["variant"])
          ])) : _createCommentVNode42("v-if", true),
          _createCommentVNode42(" \u52A0\u8F7D\u4E2D "),
          !ready.value && !errMsg.value ? (_openBlock57(), _createElementBlock57("div", _hoisted_521, [..._cache[12] || (_cache[12] = [
            _createElementVNode40(
              "span",
              { class: "wd-vplayer__spinner" },
              null,
              -1
              /* CACHED */
            )
          ])])) : _createCommentVNode42("v-if", true),
          _createCommentVNode42(" \u9519\u8BEF "),
          errMsg.value ? (_openBlock57(), _createElementBlock57("div", _hoisted_613, [
            _createVNode27(_component_wd_icon, {
              name: "warning-circle",
              variant: __props.iconStyle,
              size: 22
            }, null, 8, ["variant"]),
            _createElementVNode40(
              "span",
              null,
              _toDisplayString42(errMsg.value),
              1
              /* TEXT */
            )
          ])) : _createCommentVNode42("v-if", true),
          _createCommentVNode42(" ===== \u5E95\u90E8\u957F\u6761\uFF08\u5168\u90E8\u63A7\u4EF6\uFF09 ===== "),
          _createElementVNode40(
            "div",
            {
              class: _normalizeClass48(["wd-vplayer__bottom", { "is-visible": barVisible.value }])
            },
            [
              _renderSlot32(_ctx.$slots, "above-controls"),
              _createCommentVNode42(" \u8FDB\u5EA6\u6761\uFF08\u70B9\u64AD\uFF09 "),
              !isLive.value ? (_openBlock57(), _createElementBlock57("div", {
                key: 0,
                class: "wd-vplayer__scrub",
                role: "slider",
                tabindex: "0",
                "aria-label": "\u64AD\u653E\u8FDB\u5EA6",
                "aria-valuenow": Math.round(progress.value),
                "aria-valuemin": "0",
                "aria-valuemax": "100",
                onClick: _withModifiers12(seekAt, ["stop"]),
                onKeydown: onScrubKey
              }, [
                _cache[13] || (_cache[13] = _createElementVNode40(
                  "span",
                  { class: "wd-vplayer__track" },
                  null,
                  -1
                  /* CACHED */
                )),
                _createElementVNode40(
                  "span",
                  {
                    class: "wd-vplayer__buffer",
                    style: _normalizeStyle24({ width: bufferedPct.value + "%" })
                  },
                  null,
                  4
                  /* STYLE */
                ),
                _createElementVNode40(
                  "span",
                  {
                    class: "wd-vplayer__played",
                    style: _normalizeStyle24({ width: progress.value + "%" })
                  },
                  null,
                  4
                  /* STYLE */
                ),
                _createElementVNode40(
                  "span",
                  {
                    class: "wd-vplayer__knob",
                    style: _normalizeStyle24({ left: progress.value + "%" })
                  },
                  null,
                  4
                  /* STYLE */
                )
              ], 40, _hoisted_712)) : (_openBlock57(), _createElementBlock57(
                _Fragment31,
                { key: 1 },
                [
                  _createCommentVNode42(" \u76F4\u64AD\uFF1A\u4E0D\u505A\u8FDB\u5EA6\u6761\uFF0C\u53EA\u663E\u793A\u4E00\u6761\u300C\u5B9E\u65F6\u300D\u7EC6\u7EBF "),
                  _cache[14] || (_cache[14] = _createElementVNode40(
                    "div",
                    { class: "wd-vplayer__live-bar" },
                    [
                      _createElementVNode40("span")
                    ],
                    -1
                    /* CACHED */
                  ))
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )),
              _createElementVNode40("div", _hoisted_811, [
                _createCommentVNode42(" \u63A7\u5236\u6761\u6700\u5DE6\uFF1A\u6781\u5C11\u7528\uFF0C\u7559\u7ED9\u81EA\u5B9A\u4E49\u5165\u53E3 "),
                _renderSlot32(_ctx.$slots, "controls-start"),
                _createElementVNode40("button", {
                  type: "button",
                  class: "wd-vplayer__btn",
                  "aria-label": playing.value ? "\u6682\u505C" : "\u64AD\u653E",
                  onClick: _withModifiers12(togglePlay, ["stop"])
                }, [
                  _createVNode27(_component_wd_icon, {
                    name: playing.value ? "pause" : "play",
                    variant: __props.iconStyle,
                    size: 18
                  }, null, 8, ["name", "variant"])
                ], 8, _hoisted_99),
                _createCommentVNode42(" \u4E0A\u4E0B\u96C6 "),
                __props.episodeNav && __props.episodes.length ? (_openBlock57(), _createElementBlock57(
                  _Fragment31,
                  { key: 0 },
                  [
                    _createElementVNode40("button", {
                      type: "button",
                      class: "wd-vplayer__btn",
                      disabled: !hasPrev.value,
                      "aria-label": "\u4E0A\u4E00\u96C6",
                      onClick: _withModifiers12(prevEpisode, ["stop"])
                    }, [
                      _createVNode27(_component_wd_icon, {
                        name: "skip-previous",
                        variant: __props.iconStyle,
                        size: 17
                      }, null, 8, ["variant"])
                    ], 8, _hoisted_109),
                    _createElementVNode40("button", {
                      type: "button",
                      class: "wd-vplayer__btn",
                      disabled: !hasNext.value,
                      "aria-label": "\u4E0B\u4E00\u96C6",
                      onClick: _withModifiers12(nextEpisode, ["stop"])
                    }, [
                      _createVNode27(_component_wd_icon, {
                        name: "skip-next",
                        variant: __props.iconStyle,
                        size: 17
                      }, null, 8, ["variant"])
                    ], 8, _hoisted_1114)
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : _createCommentVNode42("v-if", true),
                !isLive.value ? (_openBlock57(), _createElementBlock57(
                  "span",
                  _hoisted_1211,
                  _toDisplayString42(fmtTime(current.value)) + " / " + _toDisplayString42(fmtTime(duration.value)),
                  1
                  /* TEXT */
                )) : (_openBlock57(), _createElementBlock57(
                  _Fragment31,
                  { key: 2 },
                  [
                    _createCommentVNode42(' \u76F4\u64AD\u7684 currentTime \u662F\u76F8\u5BF9\u8D77\u64AD\u7684\u504F\u79FB\uFF0C\u4E0D\u662F\u8282\u76EE\u65F6\u95F4\uFF0C\n             \u663E\u793A "\u5DF2\u76F4\u64AD 00:00" \u4F1A\u8BA9\u7528\u6237\u56F0\u60D1 \u2192 \u6539\u663E\u793A\u5F53\u524D\u65F6\u523B '),
                    _createElementVNode40(
                      "span",
                      _hoisted_1310,
                      _toDisplayString42(liveClock.value),
                      1
                      /* TEXT */
                    )
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )),
                _cache[15] || (_cache[15] = _createElementVNode40(
                  "span",
                  { class: "wd-vplayer__spacer" },
                  null,
                  -1
                  /* CACHED */
                )),
                _createCommentVNode42(" \u53F3\u4FA7\u6269\u5C55\u4F4D\uFF1A\u5B57\u5E55\u3001\u97F3\u8F68\u3001\u6E05\u6670\u5EA6\u7B49\uFF08\u5728\u539F\u751F\u63A7\u4EF6\u4E4B\u524D\uFF09 "),
                _renderSlot32(_ctx.$slots, "controls-end"),
                _createCommentVNode42(" \u97F3\u91CF\uFF1Ahover \u5C55\u5F00\u6ED1\u6761\uFF0C\u907F\u514D\u957F\u671F\u5360\u5BBD "),
                _createElementVNode40("div", _hoisted_1410, [
                  _createElementVNode40("button", {
                    type: "button",
                    class: "wd-vplayer__btn",
                    "aria-label": muted.value ? "\u53D6\u6D88\u9759\u97F3" : "\u9759\u97F3",
                    onClick: _withModifiers12(toggleMute, ["stop"])
                  }, [
                    _createVNode27(_component_wd_icon, {
                      name: muted.value ? "volume-mute" : "volume-up",
                      variant: __props.iconStyle,
                      size: 17
                    }, null, 8, ["name", "variant"])
                  ], 8, _hoisted_1510),
                  _createElementVNode40("div", {
                    class: "wd-vplayer__vol-slider",
                    onClick: _withModifiers12(setVolumeAt, ["stop"])
                  }, [
                    _createElementVNode40(
                      "span",
                      {
                        class: "wd-vplayer__vol-fill",
                        style: _normalizeStyle24({ width: (muted.value ? 0 : volume.value * 100) + "%" })
                      },
                      null,
                      4
                      /* STYLE */
                    )
                  ])
                ]),
                _createCommentVNode42(" \u500D\u901F\uFF08\u70B9\u64AD\uFF09 "),
                !isLive.value ? (_openBlock57(), _createElementBlock57("div", _hoisted_166, [
                  _createElementVNode40("button", {
                    type: "button",
                    class: "wd-vplayer__btn wd-vplayer__btn--text",
                    "aria-expanded": panelOpen.value === "rate",
                    "aria-label": "\u500D\u901F",
                    onClick: _cache[6] || (_cache[6] = _withModifiers12(($event) => togglePanel("rate"), ["stop"]))
                  }, _toDisplayString42(rate.value) + "\xD7", 9, _hoisted_173),
                  panelOpen.value === "rate" ? (_openBlock57(), _createElementBlock57("div", {
                    key: 0,
                    class: "wd-vplayer__panel wd-vplayer__panel--rates",
                    onClick: _cache[7] || (_cache[7] = _withModifiers12(() => {
                    }, ["stop"]))
                  }, [
                    (_openBlock57(true), _createElementBlock57(
                      _Fragment31,
                      null,
                      _renderList28(__props.rates, (r) => {
                        return _openBlock57(), _createElementBlock57("button", {
                          key: r,
                          type: "button",
                          class: _normalizeClass48({ "is-on": r === rate.value }),
                          onClick: ($event) => setRate(r)
                        }, _toDisplayString42(r) + "\xD7", 11, _hoisted_183);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])) : _createCommentVNode42("v-if", true)
                ])) : _createCommentVNode42("v-if", true),
                _createCommentVNode42(" \u9009\u96C6 "),
                __props.playlist && __props.episodes.length ? (_openBlock57(), _createElementBlock57("div", _hoisted_193, [
                  _createElementVNode40("button", {
                    type: "button",
                    class: "wd-vplayer__btn",
                    "aria-expanded": panelOpen.value === "playlist",
                    "aria-label": "\u9009\u96C6",
                    onClick: _cache[8] || (_cache[8] = _withModifiers12(($event) => togglePanel("playlist"), ["stop"]))
                  }, [
                    _createVNode27(_component_wd_icon, {
                      name: "playlist",
                      variant: __props.iconStyle,
                      size: 17
                    }, null, 8, ["variant"])
                  ], 8, _hoisted_203),
                  panelOpen.value === "playlist" ? (_openBlock57(), _createElementBlock57("div", {
                    key: 0,
                    class: "wd-vplayer__panel wd-vplayer__panel--eps",
                    onClick: _cache[9] || (_cache[9] = _withModifiers12(() => {
                    }, ["stop"]))
                  }, [
                    _createElementVNode40(
                      "div",
                      _hoisted_2110,
                      "\u9009\u96C6 \xB7 \u5171 " + _toDisplayString42(__props.episodes.length) + " \u96C6",
                      1
                      /* TEXT */
                    ),
                    _createElementVNode40("div", _hoisted_2210, [
                      (_openBlock57(true), _createElementBlock57(
                        _Fragment31,
                        null,
                        _renderList28(__props.episodes, (ep, i) => {
                          return _openBlock57(), _createElementBlock57("button", {
                            key: ep.key,
                            type: "button",
                            class: _normalizeClass48(["wd-vplayer__ep", { "is-on": ep.key === __props.currentEpisode, "is-off": ep.disabled }]),
                            disabled: ep.disabled,
                            onClick: ($event) => goEpisode(ep, i)
                          }, [
                            _createElementVNode40(
                              "span",
                              null,
                              _toDisplayString42(ep.label),
                              1
                              /* TEXT */
                            ),
                            ep.tag ? (_openBlock57(), _createElementBlock57(
                              "i",
                              _hoisted_244,
                              _toDisplayString42(ep.tag),
                              1
                              /* TEXT */
                            )) : _createCommentVNode42("v-if", true)
                          ], 10, _hoisted_2310);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ])) : _createCommentVNode42("v-if", true)
                ])) : _createCommentVNode42("v-if", true),
                __props.pip ? (_openBlock57(), _createElementBlock57("button", {
                  key: 5,
                  type: "button",
                  class: "wd-vplayer__btn",
                  "aria-label": "\u753B\u4E2D\u753B",
                  onClick: _withModifiers12(togglePip, ["stop"])
                }, [
                  _createVNode27(_component_wd_icon, {
                    name: "pip",
                    variant: __props.iconStyle,
                    size: 17
                  }, null, 8, ["variant"])
                ])) : _createCommentVNode42("v-if", true),
                _createElementVNode40("button", {
                  type: "button",
                  class: "wd-vplayer__btn",
                  "aria-label": "\u5168\u5C4F",
                  onClick: _withModifiers12(toggleFullscreen, ["stop"])
                }, [
                  _createVNode27(_component_wd_icon, {
                    name: "maximize",
                    variant: __props.iconStyle,
                    size: 17
                  }, null, 8, ["variant"])
                ])
              ])
            ],
            2
            /* CLASS */
          )
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
});

// .lib-build/WdVirtualList.ts
import { defineComponent as _defineComponent58 } from "vue";
import { renderList as _renderList29, Fragment as _Fragment32, openBlock as _openBlock58, createElementBlock as _createElementBlock58, renderSlot as _renderSlot33, toDisplayString as _toDisplayString43, createTextVNode as _createTextVNode20, normalizeStyle as _normalizeStyle25, createElementVNode as _createElementVNode41, normalizeClass as _normalizeClass49 } from "vue";
import { computed as computed40, nextTick as nextTick6, onMounted as onMounted9, ref as ref35, watch as watch16 } from "vue";
var _hoisted_167 = {
  key: 1,
  class: "wd-vlist__empty"
};
var WdVirtualList_default = /* @__PURE__ */ _defineComponent58({
  ...{ name: "WdVirtualList" },
  __name: "WdVirtualList",
  props: {
    items: { type: Array, required: false, default: () => [] },
    itemHeight: { type: Number, required: false, default: 40 },
    height: { type: Number, required: false, default: 400 },
    buffer: { type: Number, required: false, default: 4 },
    itemKey: { type: String, required: false, default: "" },
    emptyText: { type: String, required: false, default: "\u6682\u65E0\u6570\u636E" },
    hideScrollbar: { type: Boolean, required: false, default: false }
  },
  emits: ["scroll", "reachEnd"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const viewport = ref35(null);
    const scrollTop = ref35(0);
    const totalHeight = computed40(() => props.items.length * props.itemHeight);
    const range = computed40(() => {
      const h = props.height;
      const start = Math.floor(scrollTop.value / props.itemHeight);
      const visible = Math.ceil(h / props.itemHeight);
      const from = Math.max(0, start - props.buffer);
      const to = Math.min(props.items.length, start + visible + props.buffer);
      return { from, to };
    });
    const visibleItems = computed40(
      () => props.items.slice(range.value.from, range.value.to).map((item, i) => ({
        item,
        index: range.value.from + i
      }))
    );
    const offsetY = computed40(() => range.value.from * props.itemHeight);
    function onScroll(e) {
      const el = e.target;
      scrollTop.value = el.scrollTop;
      emit("scroll", el.scrollTop);
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) emit("reachEnd");
    }
    function keyOf(item, index) {
      if (props.itemKey && item && typeof item === "object") {
        const v = item[props.itemKey];
        if (v !== void 0) return v;
      }
      return index;
    }
    function scrollToIndex(index, align = "start") {
      const el = viewport.value;
      if (!el) return;
      const max = Math.max(0, totalHeight.value - props.height);
      let top = index * props.itemHeight;
      if (align === "center") top -= (props.height - props.itemHeight) / 2;
      else if (align === "end") top -= props.height - props.itemHeight;
      el.scrollTop = Math.min(max, Math.max(0, top));
    }
    function scrollToTop() {
      if (viewport.value) viewport.value.scrollTop = 0;
    }
    watch16(
      () => props.items.length,
      async () => {
        await nextTick6();
        const el = viewport.value;
        if (!el) return;
        const max = Math.max(0, totalHeight.value - props.height);
        if (el.scrollTop > max) el.scrollTop = max;
      }
    );
    onMounted9(() => {
      if (viewport.value) scrollTop.value = viewport.value.scrollTop;
    });
    __expose({ scrollToIndex, scrollToTop });
    return (_ctx, _cache) => {
      return _openBlock58(), _createElementBlock58(
        "div",
        {
          ref_key: "viewport",
          ref: viewport,
          class: _normalizeClass49(["wd-vlist", { "wd-vlist--hide-scrollbar": __props.hideScrollbar }]),
          style: _normalizeStyle25({ height: typeof __props.height === "number" ? __props.height + "px" : __props.height }),
          onScrollPassive: onScroll
        },
        [
          __props.items.length ? (_openBlock58(), _createElementBlock58(
            "div",
            {
              key: 0,
              class: "wd-vlist__phantom",
              style: _normalizeStyle25({ height: totalHeight.value + "px" })
            },
            [
              _createElementVNode41(
                "div",
                {
                  class: "wd-vlist__window",
                  style: _normalizeStyle25({ transform: `translateY(${offsetY.value}px)` })
                },
                [
                  (_openBlock58(true), _createElementBlock58(
                    _Fragment32,
                    null,
                    _renderList29(visibleItems.value, (entry) => {
                      return _openBlock58(), _createElementBlock58(
                        "div",
                        {
                          key: keyOf(entry.item, entry.index),
                          class: "wd-vlist__item",
                          style: _normalizeStyle25({ height: __props.itemHeight + "px" })
                        },
                        [
                          _renderSlot33(_ctx.$slots, "default", {
                            item: entry.item,
                            index: entry.index
                          }, () => [
                            _createTextVNode20(
                              _toDisplayString43(entry.item),
                              1
                              /* TEXT */
                            )
                          ])
                        ],
                        4
                        /* STYLE */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                4
                /* STYLE */
              )
            ],
            4
            /* STYLE */
          )) : (_openBlock58(), _createElementBlock58(
            "div",
            _hoisted_167,
            _toDisplayString43(__props.emptyText),
            1
            /* TEXT */
          ))
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      );
    };
  }
});

// .lib-build/hover.ts
function supportsHover() {
  return typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(hover: hover)").matches : false;
}
function addHover(root, options = {}) {
  if (typeof window === "undefined") return () => {
  };
  const {
    className = "is-hover",
    touchFeedback = 120,
    suppressOnScroll = true
  } = options;
  const target = root ?? document;
  const useNativeHover = supportsHover();
  let current = null;
  let touchTimer;
  let scrolling = false;
  let scrollTimer;
  function clear(el2) {
    const node = el2 ?? current;
    if (node) node.classList.remove(className);
    if (node === current) current = null;
  }
  function clearAll() {
    target.querySelectorAll(`.${className}`).forEach((el2) => el2.classList.remove(className));
    if (current) current.classList.remove(className);
    current = null;
  }
  function onPointerOver(e) {
    if (!useNativeHover || scrolling) return;
    if (e.pointerType === "touch") return;
    const el2 = e.target?.closest("[data-wd-hover], .wd-hoverable");
    if (!el2 || el2 === current) return;
    if (current && current.contains(el2)) return;
    clear();
    current = el2;
    el2.classList.add(className);
  }
  function onPointerOut(e) {
    if (!useNativeHover) return;
    const el2 = e.target?.closest("[data-wd-hover], .wd-hoverable");
    if (!el2) return;
    const to = e.relatedTarget;
    if (to && el2.contains(to)) return;
    clear(el2);
  }
  function onPointerDown(e) {
    if (useNativeHover || touchFeedback <= 0) return;
    if (e.pointerType !== "touch") return;
    const el2 = e.target?.closest?.("[data-wd-hover], .wd-hoverable");
    if (!el2) return;
    if (touchTimer) window.clearTimeout(touchTimer);
    clear();
    current = el2;
    el2.classList.add(className);
    touchTimer = window.setTimeout(() => clear(el2), touchFeedback);
  }
  function onPointerUp() {
    if (useNativeHover) return;
    if (touchTimer) window.clearTimeout(touchTimer);
    touchTimer = window.setTimeout(() => clear(), touchFeedback);
  }
  function onScroll() {
    if (!suppressOnScroll) return;
    scrolling = true;
    clearAll();
    if (scrollTimer) window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      scrolling = false;
    }, 160);
  }
  function onBlur() {
    clearAll();
  }
  function onVisibility() {
    if (document.hidden) clearAll();
  }
  const el = target;
  const add = el.addEventListener ? el : document;
  add.addEventListener("pointerover", onPointerOver, { passive: true });
  add.addEventListener("pointerout", onPointerOut, { passive: true });
  add.addEventListener("pointerdown", onPointerDown, { passive: true });
  add.addEventListener("pointerup", onPointerUp, { passive: true });
  add.addEventListener("pointercancel", onPointerUp, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true, capture: true });
  window.addEventListener("blur", onBlur);
  document.addEventListener("visibilitychange", onVisibility);
  return function stop() {
    add.removeEventListener("pointerover", onPointerOver);
    add.removeEventListener("pointerout", onPointerOut);
    add.removeEventListener("pointerdown", onPointerDown);
    add.removeEventListener("pointerup", onPointerUp);
    add.removeEventListener("pointercancel", onPointerUp);
    window.removeEventListener("scroll", onScroll, { capture: true });
    window.removeEventListener("blur", onBlur);
    document.removeEventListener("visibilitychange", onVisibility);
    if (touchTimer) window.clearTimeout(touchTimer);
    if (scrollTimer) window.clearTimeout(scrollTimer);
    clearAll();
  };
}
export {
  WdAiMessage_default as WdAiMessage,
  WdAlert_default as WdAlert,
  WdAudioPlayer_default as WdAudioPlayer,
  WdAvatar_default as WdAvatar,
  WdAvatarGroup_default as WdAvatarGroup,
  WdBadge_default as WdBadge,
  WdBreadcrumb_default as WdBreadcrumb,
  WdButton_default as WdButton,
  WdCard_default as WdCard,
  WdCarousel_default as WdCarousel,
  WdCheckbox_default as WdCheckbox,
  WdCollapse_default as WdCollapse,
  WdCommand_default as WdCommand,
  WdContainer_default as WdContainer,
  WdDatePicker_default as WdDatePicker,
  WdDescriptions_default as WdDescriptions,
  WdDivider_default as WdDivider,
  WdDrawer_default as WdDrawer,
  WdDropdown_default as WdDropdown,
  WdEmpty_default as WdEmpty,
  WdExplorer_default as WdExplorer,
  WdFileList_default as WdFileList,
  WdForm_default as WdForm,
  WdFormItem_default as WdFormItem,
  WdGrid_default as WdGrid,
  WdIcon_default as WdIcon,
  WdImagePreview_default as WdImagePreview,
  WdInput_default as WdInput,
  WdListItem_default as WdListItem,
  WdModal_default as WdModal,
  WdNotification_default as WdNotification,
  WdOtp_default as WdOtp,
  WdPagination_default as WdPagination,
  WdPopconfirm_default as WdPopconfirm,
  WdPostItem_default as WdPostItem,
  WdProgress_default as WdProgress,
  WdRadioGroup_default as WdRadioGroup,
  WdRate_default as WdRate,
  WdResult_default as WdResult,
  WdSegmented_default as WdSegmented,
  WdSelect_default as WdSelect,
  WdSkeleton_default as WdSkeleton,
  WdSlider_default as WdSlider,
  WdSortableList_default as WdSortableList,
  WdSpace_default as WdSpace,
  WdSpinner_default as WdSpinner,
  WdStatistic_default as WdStatistic,
  WdSteps_default as WdSteps,
  WdSwitch_default as WdSwitch,
  WdTable_default as WdTable,
  WdTabs_default as WdTabs,
  WdTag_default as WdTag,
  WdTimeline_default as WdTimeline,
  WdTooltip_default as WdTooltip,
  WdTree_default as WdTree,
  WdUpload_default as WdUpload,
  WdVideoPlayer_default as WdVideoPlayer,
  WdVirtualList_default as WdVirtualList,
  addHover,
  getIcon,
  getIconSync,
  injectIcons,
  preloadIcons
};
