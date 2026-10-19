/* 由 tools/build-demo-components.mjs 生成，请勿手工编辑。
 * 源：src/components/*.vue（72 个）· 依赖全局 Vue
 */
var WD_REAL_MODULE = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // .demo-build/entry.ts
  var entry_exports = {};
  __export(entry_exports, {
    WdAffix: () => WdAffix_default,
    WdAiMessage: () => WdAiMessage_default,
    WdAlert: () => WdAlert_default,
    WdAudioPlayer: () => WdAudioPlayer_default,
    WdAvatar: () => WdAvatar_default,
    WdAvatarGroup: () => WdAvatarGroup_default,
    WdBacktop: () => WdBacktop_default,
    WdBadge: () => WdBadge_default,
    WdBreadcrumb: () => WdBreadcrumb_default,
    WdButton: () => WdButton_default,
    WdCalendar: () => WdCalendar_default,
    WdCard: () => WdCard_default,
    WdCarousel: () => WdCarousel_default,
    WdCascader: () => WdCascader_default,
    WdCheckbox: () => WdCheckbox_default,
    WdCollapse: () => WdCollapse_default,
    WdColorPicker: () => WdColorPicker_default,
    WdCommand: () => WdCommand_default,
    WdContainer: () => WdContainer_default,
    WdDatePicker: () => WdDatePicker_default,
    WdDescriptions: () => WdDescriptions_default,
    WdDivider: () => WdDivider_default,
    WdDrawer: () => WdDrawer_default,
    WdDropdown: () => WdDropdown_default,
    WdEmpty: () => WdEmpty_default,
    WdExplorer: () => WdExplorer_default,
    WdFileList: () => WdFileList_default,
    WdForm: () => WdForm_default,
    WdFormItem: () => WdFormItem_default,
    WdGrid: () => WdGrid_default,
    WdGroup: () => WdGroup_default,
    WdIcon: () => WdIcon_default,
    WdImagePreview: () => WdImagePreview_default,
    WdInput: () => WdInput_default,
    WdListItem: () => WdListItem_default,
    WdMarkdown: () => WdMarkdown_default,
    WdMentions: () => WdMentions_default,
    WdModal: () => WdModal_default,
    WdNav: () => WdNav_default,
    WdNotification: () => WdNotification_default,
    WdOtp: () => WdOtp_default,
    WdPagination: () => WdPagination_default,
    WdPopconfirm: () => WdPopconfirm_default,
    WdPopover: () => WdPopover_default,
    WdPostItem: () => WdPostItem_default,
    WdProgress: () => WdProgress_default,
    WdQRCode: () => WdQRCode_default,
    WdRadioGroup: () => WdRadioGroup_default,
    WdRate: () => WdRate_default,
    WdResult: () => WdResult_default,
    WdScrollbar: () => WdScrollbar_default,
    WdSegmented: () => WdSegmented_default,
    WdSelect: () => WdSelect_default,
    WdSkeleton: () => WdSkeleton_default,
    WdSlider: () => WdSlider_default,
    WdSortableList: () => WdSortableList_default,
    WdSpace: () => WdSpace_default,
    WdSpinner: () => WdSpinner_default,
    WdSplitter: () => WdSplitter_default,
    WdStatistic: () => WdStatistic_default,
    WdSteps: () => WdSteps_default,
    WdSwitch: () => WdSwitch_default,
    WdTable: () => WdTable_default,
    WdTabs: () => WdTabs_default,
    WdTag: () => WdTag_default,
    WdTimeline: () => WdTimeline_default,
    WdTooltip: () => WdTooltip_default,
    WdTransfer: () => WdTransfer_default,
    WdTree: () => WdTree_default,
    WdUpload: () => WdUpload_default,
    WdVideoPlayer: () => WdVideoPlayer_default,
    WdVirtualList: () => WdVirtualList_default,
    WdWatermark: () => WdWatermark_default,
    cachedIconCount: () => cachedIconCount,
    clearIconCache: () => clearIconCache,
    getIcon: () => getIcon,
    getIconSync: () => getIconSync,
    injectIcons: () => injectIcons,
    preloadIcons: () => preloadIcons,
    registerLoaders: () => registerLoaders,
    toast: () => toast
  });

  // .demo-build/shim.ts
  var G = globalThis.Vue;
  var named = new Proxy({}, { get: (_t, k) => G[String(k)] });
  var defineComponent = G.defineComponent;
  var createCommentVNode = G.createCommentVNode;
  var normalizeStyle = G.normalizeStyle;
  var openBlock = G.openBlock;
  var createElementBlock = G.createElementBlock;
  var renderSlot = G.renderSlot;
  var createElementVNode = G.createElementVNode;
  var normalizeClass = G.normalizeClass;
  var computed = G.computed;
  var onBeforeUnmount = G.onBeforeUnmount;
  var onMounted = G.onMounted;
  var ref = G.ref;
  var toDisplayString = G.toDisplayString;
  var createTextVNode = G.createTextVNode;
  var resolveComponent = G.resolveComponent;
  var createVNode = G.createVNode;
  var renderList = G.renderList;
  var Fragment = G.Fragment;
  var watch = G.watch;
  var unref = G.unref;
  var createBlock = G.createBlock;
  var withModifiers = G.withModifiers;
  var Teleport = G.Teleport;
  var nextTick = G.nextTick;
  var vModelText = G.vModelText;
  var withDirectives = G.withDirectives;
  var vShow = G.vShow;
  var toRef = G.toRef;
  var watchEffect = G.watchEffect;
  var withKeys = G.withKeys;
  var provide = G.provide;
  var reactive = G.reactive;
  var inject = G.inject;
  var Transition = G.Transition;
  var withCtx = G.withCtx;
  var resolveDynamicComponent = G.resolveDynamicComponent;
  var getCurrentInstance = G.getCurrentInstance;

  // .demo-build/WdAffix.ts
  var WdAffix_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdAffix" },
    __name: "WdAffix",
    props: {
      position: { type: String, required: false, default: "top" },
      offset: { type: Number, required: false, default: 0 },
      target: { type: [Number, String], required: false, default: void 0 },
      keepWidth: { type: Boolean, required: false, default: true },
      container: { type: String, required: false, default: "" },
      zIndex: { type: Number, required: false, default: 900 }
    },
    emits: ["change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const root = ref(null);
      const affixed = ref(false);
      const placeholder = ref({ width: 0, height: 0, left: 0 });
      const naturalTop = ref(0);
      let scrollEl = null;
      let raf = 0;
      function readScrollTop() {
        if (!scrollEl || scrollEl === window) {
          return window.scrollY ?? window.pageYOffset ?? 0;
        }
        return scrollEl.scrollTop;
      }
      function containerTop() {
        if (!scrollEl || scrollEl === window) return 0;
        return scrollEl.getBoundingClientRect().top;
      }
      function measure() {
        const el = root.value;
        if (!el) return;
        const r = el.getBoundingClientRect();
        placeholder.value = { width: r.width, height: r.height, left: r.left };
        naturalTop.value = r.top - containerTop() + readScrollTop();
      }
      function computeThreshold() {
        if (typeof props.target === "number") return props.target;
        if (typeof props.target === "string" && props.target) {
          const el = document.querySelector(props.target);
          if (el) return el.getBoundingClientRect().bottom;
        }
        return props.position === "top" ? naturalTop.value - props.offset : 0;
      }
      function update() {
        raf = 0;
        const sTop = readScrollTop();
        const threshold = computeThreshold();
        let next;
        if (props.position === "top") {
          next = sTop >= threshold;
        } else {
          const el = scrollEl && scrollEl !== window ? scrollEl : document.documentElement;
          const viewH = scrollEl && scrollEl !== window ? scrollEl.clientHeight : window.innerHeight;
          const maxScroll = el.scrollHeight - viewH;
          next = maxScroll - sTop <= threshold;
        }
        if (next !== affixed.value) {
          if (next) measure();
          affixed.value = next;
          emit("change", next);
        }
      }
      function schedule() {
        if (raf) return;
        raf = requestAnimationFrame(update);
        window.setTimeout(() => {
          if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
            update();
          }
        }, 40);
      }
      const style = computed(() => {
        if (!affixed.value) return {};
        const s = {
          position: "fixed",
          /*
           * left 用**吸附前记录的值**，不能现读 rect。
           * 吸附后 root 已被 fixed 接管，rect.left 会等于 fixed 后的位置，
           * 发生"每帧左移一点"的漂移。
           */
          left: placeholder.value.left + "px",
          zIndex: String(props.zIndex)
        };
        if (props.keepWidth) s.width = placeholder.value.width + "px";
        if (props.position === "top") s.top = props.offset + "px";
        else s.bottom = props.offset + "px";
        return s;
      });
      onMounted(() => {
        scrollEl = props.container ? document.querySelector(props.container) ?? window : window;
        scrollEl.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        requestAnimationFrame(() => {
          measure();
          update();
        });
        window.setTimeout(() => {
          measure();
          update();
        }, 60);
      });
      onBeforeUnmount(() => {
        scrollEl?.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        if (raf) cancelAnimationFrame(raf);
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            ref_key: "root",
            ref: root,
            class: normalizeClass(["wd-affix", { "is-affixed": affixed.value }])
          },
          [
            createCommentVNode(" \u5438\u9644\u65F6\u7528\u5360\u4F4D\u6491\u4F4F\u539F\u7A7A\u95F4\uFF0C\u907F\u514D\u9875\u9762\u5185\u5BB9\u8DF3\u52A8 "),
            affixed.value ? (openBlock(), createElementBlock(
              "div",
              {
                key: 0,
                class: "wd-affix__placeholder",
                style: normalizeStyle({ width: placeholder.value.width + "px", height: placeholder.value.height + "px" }),
                "aria-hidden": "true"
              },
              null,
              4
              /* STYLE */
            )) : createCommentVNode("v-if", true),
            createElementVNode(
              "div",
              {
                class: "wd-affix__content",
                style: normalizeStyle(style.value)
              },
              [
                renderSlot(_ctx.$slots, "default")
              ],
              4
              /* STYLE */
            )
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdAiMessage.ts
  var _hoisted_1 = { class: "wd-ai-msg__avatar" };
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
  var _hoisted_12 = ["onClick"];
  var WdAiMessage_default = /* @__PURE__ */ defineComponent({
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
      const shown = ref(props.content);
      const shownReasoning = ref(props.reasoning);
      const reasoningOpen = ref(props.defaultReasoningOpen);
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
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(["wd-ai-msg", { "wd-ai-msg--self": __props.self }])
          },
          [
            createElementVNode(
              "span",
              _hoisted_1,
              toDisplayString(__props.self ? "\u6211" : "AI"),
              1
              /* TEXT */
            ),
            createElementVNode("div", _hoisted_2, [
              createCommentVNode(" \u6DF1\u5EA6\u601D\u8003\uFF08reasoning_content\uFF09\uFF1A\u72EC\u7ACB\u533A\u57DF\uFF0C\u53EF\u6298\u53E0 "),
              __props.thinking && !shownReasoning.value ? (openBlock(), createElementBlock("div", _hoisted_3, [..._cache[1] || (_cache[1] = [
                createElementVNode(
                  "i",
                  null,
                  null,
                  -1
                  /* CACHED */
                ),
                createElementVNode(
                  "i",
                  null,
                  null,
                  -1
                  /* CACHED */
                ),
                createElementVNode(
                  "i",
                  null,
                  null,
                  -1
                  /* CACHED */
                ),
                createTextVNode(
                  "\u6DF1\u5EA6\u601D\u8003\u4E2D\u2026 ",
                  -1
                  /* CACHED */
                )
              ])])) : createCommentVNode("v-if", true),
              shownReasoning.value ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 1,
                  class: normalizeClass(["wd-ai-msg__reasoning", { "wd-ai-msg__reasoning--open": reasoningOpen.value }])
                },
                [
                  createElementVNode("button", {
                    type: "button",
                    class: "wd-ai-msg__reasoning-head",
                    onClick: _cache[0] || (_cache[0] = ($event) => reasoningOpen.value = !reasoningOpen.value)
                  }, [
                    createVNode(_component_wd_icon, {
                      class: "wd-ai-msg__reasoning-spark",
                      name: "magic",
                      size: 13
                    }),
                    _cache[2] || (_cache[2] = createElementVNode(
                      "span",
                      { class: "wd-ai-msg__reasoning-title" },
                      "\u6DF1\u5EA6\u601D\u8003",
                      -1
                      /* CACHED */
                    )),
                    createElementVNode(
                      "span",
                      _hoisted_4,
                      toDisplayString(__props.reasoningStreaming ? "\u8FDB\u884C\u4E2D" : "\u5DF2\u5B8C\u6210"),
                      1
                      /* TEXT */
                    ),
                    createElementVNode(
                      "span",
                      {
                        class: normalizeClass(["wd-chevron", { "wd-chevron--open": reasoningOpen.value }])
                      },
                      [
                        createVNode(_component_wd_icon, {
                          name: "chevron-down",
                          size: 13
                        })
                      ],
                      2
                      /* CLASS */
                    )
                  ]),
                  createElementVNode("div", _hoisted_5, [
                    createElementVNode("div", _hoisted_6, [
                      createElementVNode("p", _hoisted_7, [
                        createTextVNode(
                          toDisplayString(shownReasoning.value),
                          1
                          /* TEXT */
                        ),
                        __props.reasoningStreaming ? (openBlock(), createElementBlock("span", _hoisted_8, "\u258D")) : createCommentVNode("v-if", true)
                      ])
                    ])
                  ])
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true),
              createCommentVNode(" \u6B63\u6587\uFF08content\uFF09 "),
              __props.content || shown.value ? (openBlock(), createElementBlock("p", _hoisted_9, [
                createTextVNode(
                  toDisplayString(shown.value),
                  1
                  /* TEXT */
                ),
                __props.streaming && shown.value.length < __props.content.length ? (openBlock(), createElementBlock("span", _hoisted_10, "\u258D")) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true),
              __props.actions.length ? (openBlock(), createElementBlock("div", _hoisted_11, [
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(__props.actions, (a) => {
                    return openBlock(), createElementBlock("button", {
                      key: a.label,
                      type: "button",
                      class: normalizeClass(["wd-btn", [`wd-btn--${a.variant || "ghost"}`, "wd-btn--sm"]]),
                      onClick: ($event) => emit("action", a.label)
                    }, toDisplayString(a.label), 11, _hoisted_12);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : createCommentVNode("v-if", true)
            ])
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdAlert.ts
  var _hoisted_13 = { class: "wd-alert__body" };
  var _hoisted_22 = {
    key: 0,
    class: "wd-alert__title"
  };
  var _hoisted_32 = {
    key: 1,
    class: "wd-alert__desc"
  };
  var WdAlert_default = /* @__PURE__ */ defineComponent({
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
      const visible = ref(true);
      function close() {
        visible.value = false;
        emit("close");
      }
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return visible.value ? (openBlock(), createElementBlock(
          "div",
          {
            key: 0,
            class: normalizeClass(["wd-alert", `wd-alert--${__props.variant}`]),
            role: "alert"
          },
          [
            createElementVNode(
              "span",
              {
                class: normalizeClass(["wd-alert__icon wd-dot wd-dot--lg", `wd-dot--${__props.variant}`])
              },
              null,
              2
              /* CLASS */
            ),
            createElementVNode("div", _hoisted_13, [
              __props.title ? (openBlock(), createElementBlock(
                "div",
                _hoisted_22,
                toDisplayString(__props.title),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true),
              __props.description || _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_32, [
                renderSlot(_ctx.$slots, "default", {}, () => [
                  createTextVNode(
                    toDisplayString(__props.description),
                    1
                    /* TEXT */
                  )
                ])
              ])) : createCommentVNode("v-if", true)
            ]),
            __props.closable ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "wd-alert__close",
              "aria-label": "\u5173\u95ED",
              onClick: close
            }, [
              createVNode(_component_wd_icon, {
                name: "warning-circle",
                size: 14
              })
            ])) : createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true);
      };
    }
  });

  // .demo-build/time.ts
  function formatDuration(seconds, forceHours = false) {
    if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
    const total = Math.floor(seconds);
    const h = Math.floor(total / 3600);
    const m = Math.floor(total % 3600 / 60);
    const s = total % 60;
    const pad = (n) => String(n).padStart(2, "0");
    if (h > 0 || forceHours) return `${h}:${pad(m)}:${pad(s)}`;
    return `${m}:${pad(s)}`;
  }

  // .demo-build/WdAudioPlayer.ts
  var _hoisted_14 = ["src", "loop"];
  var _hoisted_23 = { class: "wd-audio__top" };
  var _hoisted_33 = {
    key: 0,
    class: "wd-audio__hero-cover"
  };
  var _hoisted_42 = ["src"];
  var _hoisted_52 = {
    key: 0,
    class: "wd-audio__hero-badge"
  };
  var _hoisted_62 = { class: "wd-audio__head" };
  var _hoisted_72 = { class: "wd-audio__title" };
  var _hoisted_82 = {
    key: 0,
    class: "wd-audio__subtitle"
  };
  var _hoisted_92 = { class: "wd-audio__top-extra" };
  var _hoisted_102 = ["aria-valuenow"];
  var _hoisted_112 = {
    key: 0,
    class: "wd-audio__times"
  };
  var _hoisted_122 = { class: "wd-audio__remain" };
  var _hoisted_132 = { class: "wd-audio__controls" };
  var _hoisted_142 = {
    key: 0,
    class: "wd-audio__rate-anchor"
  };
  var _hoisted_15 = ["aria-label"];
  var _hoisted_16 = {
    key: 0,
    class: "wd-audio__rate-menu wd-audio__rate-menu--card"
  };
  var _hoisted_17 = ["onClick"];
  var _hoisted_18 = {
    key: 1,
    class: "wd-audio__ctl-spacer"
  };
  var _hoisted_19 = ["aria-label"];
  var _hoisted_20 = ["aria-label"];
  var _hoisted_21 = {
    key: 5,
    class: "wd-audio__ctl-spacer"
  };
  var _hoisted_222 = {
    key: 1,
    class: "wd-audio__err"
  };
  var _hoisted_232 = ["aria-label"];
  var _hoisted_24 = ["src"];
  var _hoisted_25 = { class: "wd-audio__cover-play" };
  var _hoisted_26 = {
    key: 0,
    class: "wd-audio__pulse"
  };
  var _hoisted_27 = { class: "wd-audio__main" };
  var _hoisted_28 = {
    key: 0,
    class: "wd-audio__meta"
  };
  var _hoisted_29 = { class: "wd-audio__title" };
  var _hoisted_30 = {
    key: 0,
    class: "wd-audio__subtitle"
  };
  var _hoisted_31 = { class: "wd-audio__progress-row" };
  var _hoisted_322 = { class: "wd-audio__time-cur" };
  var _hoisted_332 = ["aria-valuenow"];
  var _hoisted_34 = ["aria-valuenow"];
  var _hoisted_35 = { class: "wd-audio__time-total" };
  var _hoisted_36 = {
    key: 2,
    class: "wd-audio__err"
  };
  var _hoisted_37 = { class: "wd-audio__side" };
  var _hoisted_38 = {
    key: 0,
    class: "wd-audio__vol"
  };
  var _hoisted_39 = ["aria-label"];
  var _hoisted_40 = {
    key: 1,
    class: "wd-audio__rate"
  };
  var _hoisted_41 = {
    key: 0,
    class: "wd-audio__rate-menu"
  };
  var _hoisted_422 = ["onClick"];
  var _hoisted_43 = ["href"];
  var _hoisted_44 = ["aria-label"];
  var _hoisted_45 = { class: "wd-audio__mini-main" };
  var _hoisted_46 = { class: "wd-audio__mini-text" };
  var _hoisted_47 = { class: "wd-audio__title" };
  var _hoisted_48 = {
    key: 0,
    class: "wd-audio__subtitle"
  };
  var _hoisted_49 = ["aria-valuenow"];
  var _hoisted_50 = { class: "wd-audio__mini-track" };
  var _hoisted_51 = { class: "wd-audio__mini-time" };
  var WAVE_BARS_THICK = 30;
  var WAVE_BARS_FINE = 60;
  var WdAudioPlayer_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdAudioPlayer" },
    __name: "WdAudioPlayer",
    props: {
      src: { type: String, required: false },
      variant: { type: String, required: false, default: "card" },
      compact: { type: Boolean, required: false, default: false },
      title: { type: String, required: false, default: "" },
      subtitle: { type: String, required: false, default: "" },
      cover: { type: String, required: false, default: "" },
      loop: { type: Boolean, required: false, default: false },
      volume: { type: Boolean, required: false, default: true },
      playbackRate: { type: Boolean, required: false, default: true },
      downloadable: { type: Boolean, required: false, default: false },
      navigable: { type: Boolean, required: false, default: true },
      initialVolume: { type: Number, required: false, default: 1 },
      waveform: { type: Array, required: false, default: () => [] },
      inverse: { type: Boolean, required: false, default: false },
      showTime: { type: Boolean, required: false, default: true },
      iconStyle: { type: String, required: false, default: "filled" }
    },
    emits: ["play", "pause", "ended", "timeupdate", "error", "prev", "next"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const mode = computed(() => props.compact ? "mini" : props.variant);
      const audio = ref(null);
      const playing = ref(false);
      const current = ref(0);
      const duration = ref(0);
      const buffered = ref(0);
      const volume = ref(props.initialVolume);
      const muted = ref(false);
      const rate = ref(1);
      const errMsg = ref("");
      const rateOpen = ref(false);
      const progress = computed(
        () => duration.value > 0 ? current.value / duration.value * 100 : 0
      );
      const bufferedPct = computed(
        () => duration.value > 0 ? buffered.value / duration.value * 100 : 0
      );
      const hasCover = computed(() => !!props.cover);
      const bars = computed(() => {
        if (props.waveform.length) return props.waveform;
        return null;
      });
      const waveCount = computed(() => hasCover.value ? WAVE_BARS_FINE : WAVE_BARS_THICK);
      const demoWave = computed(
        () => Array.from({ length: waveCount.value }, (_, i) => {
          const t = i / waveCount.value;
          const v = Math.abs(Math.sin(t * 9.2) * 0.42) + Math.abs(Math.sin(t * 23.7 + 1.3) * 0.28) + Math.abs(Math.sin(t * 4.1 + 2.7) * 0.3);
          const envelope = Math.sin(Math.PI * t) * 0.35 + 0.65;
          return Math.min(1, Math.max(0.06, v * envelope));
        })
      );
      const waveBars = computed(() => {
        if (props.waveform.length) return props.waveform;
        return demoWave.value;
      });
      function togglePlay() {
        const a = audio.value;
        if (!a) return;
        if (a.paused) a.play().catch((e) => {
          errMsg.value = "\u64AD\u653E\u5931\u8D25\uFF1A" + e.message;
        });
        else a.pause();
      }
      const dragging = ref(false);
      const dragPct = ref(0);
      const shownPct = computed(() => dragging.value ? dragPct.value : progress.value);
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
      const remainText = computed(
        () => duration.value > 0 ? "-" + formatDuration(Math.max(0, duration.value - current.value)) : ""
      );
      watch(() => props.src, () => {
        errMsg.value = "";
        current.value = 0;
        duration.value = 0;
        buffered.value = 0;
      });
      onBeforeUnmount(() => {
      });
      __expose({ play: () => audio.value?.play(), pause: () => audio.value?.pause() });
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(["wd-audio", [
              `wd-audio--${mode.value}`,
              {
                "wd-audio--playing": playing.value,
                "wd-audio--inverse": __props.inverse,
                "has-cover": hasCover.value
              }
            ]])
          },
          [
            createElementVNode("audio", {
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
              onLoadedmetadata: onTimeUpdate,
              onError
            }, null, 40, _hoisted_14),
            createCommentVNode(" ==================== \u7AD6\u7248\u5361\u7247 ==================== "),
            mode.value === "card" ? (openBlock(), createElementBlock(
              Fragment,
              { key: 0 },
              [
                createCommentVNode(" \u9876\u90E8\uFF1A\u6709\u5C01\u9762\u65F6\u5C01\u9762\u5728\u5DE6\u3001\u6807\u9898\u5728\u53F3\uFF08\u6A2A\u5411\u6392\u5E03\uFF0C\u89C1\u6837\u5F0F\u8BF4\u660E\uFF09 "),
                createElementVNode("div", _hoisted_23, [
                  hasCover.value ? (openBlock(), createElementBlock("div", _hoisted_33, [
                    renderSlot(_ctx.$slots, "cover", {}, () => [
                      createElementVNode("img", {
                        src: __props.cover,
                        alt: ""
                      }, null, 8, _hoisted_42)
                    ]),
                    playing.value ? (openBlock(), createElementBlock("span", _hoisted_52, [..._cache[7] || (_cache[7] = [
                      createElementVNode(
                        "i",
                        null,
                        null,
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "i",
                        null,
                        null,
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "i",
                        null,
                        null,
                        -1
                        /* CACHED */
                      )
                    ])])) : createCommentVNode("v-if", true)
                  ])) : createCommentVNode("v-if", true),
                  createElementVNode("div", _hoisted_62, [
                    createElementVNode(
                      "div",
                      _hoisted_72,
                      toDisplayString(__props.title),
                      1
                      /* TEXT */
                    ),
                    __props.subtitle ? (openBlock(), createElementBlock(
                      "div",
                      _hoisted_82,
                      toDisplayString(__props.subtitle),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    renderSlot(_ctx.$slots, "info")
                  ]),
                  createElementVNode("div", _hoisted_92, [
                    renderSlot(_ctx.$slots, "actions")
                  ])
                ]),
                createCommentVNode("\n        \u89C6\u89C9\u4E3B\u4F53\uFF1A\n          \u6709\u5C01\u9762 \u2192 \u5927\u5C01\u9762\uFF08\u6B63\u65B9\u5F62\uFF0C\u5706\u89D2\uFF09\uFF0C\u6CE2\u5F62\u5728\u4E0B\u65B9\u7F29\u6210\u7EC6\u5BC6\u4E00\u6761\n          \u65E0\u5C01\u9762 \u2192 \u6CE2\u5F62\u5347\u683C\u4E3A\u4E3B\u4F53\uFF0C\u9AD8\u5EA6\u663E\u8457\u52A0\u5927\uFF0C\u53D6\u4EE3\u5C01\u9762\u7684\u4F4D\u7F6E\n        \u8FD9\u662F\u4E24\u79CD\u53C2\u8003\u8BBE\u8BA1\u7684\u6838\u5FC3\u5DEE\u5F02\uFF0C\u7531\u4E00\u4E2A hasCover \u5206\u652F\u5207\u6362\u3002\n      "),
                createElementVNode("div", {
                  class: normalizeClass(["wd-audio__wave", hasCover.value ? "wd-audio__wave--fine" : "wd-audio__wave--hero"]),
                  role: "slider",
                  tabindex: "0",
                  "aria-label": "\u64AD\u653E\u8FDB\u5EA6",
                  "aria-valuenow": Math.round(shownPct.value),
                  "aria-valuemin": "0",
                  "aria-valuemax": "100",
                  onClick: seekTo,
                  onKeydown: onScrubKey
                }, [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(waveBars.value, (h, i) => {
                      return openBlock(), createElementBlock(
                        "span",
                        {
                          key: i,
                          class: normalizeClass(["wd-audio__wave-bar", { "is-on": i / waveBars.value.length * 100 <= shownPct.value }]),
                          style: normalizeStyle({ height: "100%", transform: `scaleY(${h})` })
                        },
                        null,
                        6
                        /* CLASS, STYLE */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ], 42, _hoisted_102),
                createCommentVNode("\n        \u26A0\uFE0F \u65F6\u957F\u672A\u77E5\u65F6\u6574\u884C\u9690\u85CF\uFF0C\u800C\u4E0D\u662F\u53EA\u7559\u5F53\u524D\u65F6\u95F4\u3002\n        mp3 \u672A\u52A0\u8F7D / \u6D41\u5A92\u4F53\u672A\u5C31\u7EEA\u65F6 duration \u4E3A 0\uFF0C\n        \u82E5\u53EA\u6E32\u67D3 `0:00`\uFF0C\u53F3\u4FA7\u4F1A\u7A7A\u51FA\u4E00\u5927\u7247\uFF0C\u770B\u8D77\u6765\u50CF\u5E03\u5C40\u574F\u4E86\u3002\n        \u884C\u9690\u85CF\u540E\u5361\u7247\u81EA\u7136\u6536\u7D27\uFF0C\u89C6\u89C9\u4E0A\u66F4\u6574\u3002\n      "),
                __props.showTime && duration.value > 0 ? (openBlock(), createElementBlock("div", _hoisted_112, [
                  createElementVNode(
                    "span",
                    null,
                    toDisplayString(unref(formatDuration)(current.value)),
                    1
                    /* TEXT */
                  ),
                  createElementVNode(
                    "span",
                    _hoisted_122,
                    toDisplayString(remainText.value),
                    1
                    /* TEXT */
                  )
                ])) : createCommentVNode("v-if", true),
                createCommentVNode(" \u63A7\u4EF6\uFF1A\u64AD\u653E\u952E\u4E3A\u7EDD\u5BF9\u4E3B\u4F53\uFF0C\u5176\u4F59\u6B21\u7EA7\u4E14\u5F31\u5316 "),
                createElementVNode("div", _hoisted_132, [
                  createCommentVNode('\n          \u500D\u901F\u83DC\u5355\u5FC5\u987B\u4EE5**\u8FD9\u4E2A\u6309\u94AE**\u4E3A\u951A\u70B9\u3002\n          \u26A0\uFE0F \u4E4B\u524D\u83DC\u5355\u5199\u5728 controls \u4E4B\u540E\u3001\u7528 `left:50%; bottom:74px` \u5B9A\u4F4D\uFF0C\n          \u90A3\u662F\u4EE5\u6574\u5F20\u5361\u7247\u4E3A\u53C2\u7167 \u2014\u2014 \u4E8E\u662F\u5B83\u8DD1\u5230\u5361\u7247\u6B63\u4E2D\u504F\u4E0A\uFF08"\u8DD1\u5230\u97F3\u9891\u5361\u7247\u4E0A\u65B9"\uFF09\u3002\n          \u73B0\u5728\u628A\u83DC\u5355\u632A\u8FDB\u6309\u94AE\u7684 wrapper\uFF0C\u5B9A\u4F4D\u4E0A\u4E0B\u6587\u5C31\u662F\u6309\u94AE\u672C\u8EAB\u3002\n        '),
                  __props.playbackRate ? (openBlock(), createElementBlock("span", _hoisted_142, [
                    createElementVNode("button", {
                      type: "button",
                      class: "wd-audio__ctl wd-audio__ctl--text",
                      "aria-label": `\u500D\u901F ${rate.value}x`,
                      onClick: _cache[3] || (_cache[3] = ($event) => rateOpen.value = !rateOpen.value)
                    }, toDisplayString(rate.value) + "\xD7", 9, _hoisted_15),
                    rateOpen.value ? (openBlock(), createElementBlock("div", _hoisted_16, [
                      (openBlock(), createElementBlock(
                        Fragment,
                        null,
                        renderList([0.75, 1, 1.25, 1.5, 2], (r) => {
                          return createElementVNode("button", {
                            key: r,
                            type: "button",
                            class: normalizeClass({ "is-on": r === rate.value }),
                            onClick: ($event) => setRate(r)
                          }, toDisplayString(r) + "\xD7", 11, _hoisted_17);
                        }),
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ])) : createCommentVNode("v-if", true)
                  ])) : (openBlock(), createElementBlock("span", _hoisted_18)),
                  __props.navigable ? (openBlock(), createElementBlock("button", {
                    key: 2,
                    type: "button",
                    class: "wd-audio__ctl",
                    "aria-label": "\u4E0A\u4E00\u9996",
                    onClick: _cache[4] || (_cache[4] = ($event) => emit("prev"))
                  }, [
                    createVNode(_component_wd_icon, {
                      name: "skip-previous",
                      variant: __props.iconStyle,
                      size: 24
                    }, null, 8, ["variant"])
                  ])) : createCommentVNode("v-if", true),
                  createElementVNode("button", {
                    type: "button",
                    class: "wd-audio__main-btn",
                    "aria-label": playing.value ? "\u6682\u505C" : "\u64AD\u653E",
                    onClick: togglePlay
                  }, [
                    createVNode(_component_wd_icon, {
                      name: playing.value ? "pause" : "play",
                      variant: __props.iconStyle,
                      size: 25
                    }, null, 8, ["name", "variant"])
                  ], 8, _hoisted_19),
                  __props.navigable ? (openBlock(), createElementBlock("button", {
                    key: 3,
                    type: "button",
                    class: "wd-audio__ctl",
                    "aria-label": "\u4E0B\u4E00\u9996",
                    onClick: _cache[5] || (_cache[5] = ($event) => emit("next"))
                  }, [
                    createVNode(_component_wd_icon, {
                      name: "skip-next",
                      variant: __props.iconStyle,
                      size: 24
                    }, null, 8, ["variant"])
                  ])) : createCommentVNode("v-if", true),
                  volume.value ? (openBlock(), createElementBlock("button", {
                    key: 4,
                    type: "button",
                    class: "wd-audio__ctl",
                    "aria-label": muted.value ? "\u53D6\u6D88\u9759\u97F3" : "\u9759\u97F3",
                    onClick: toggleMute
                  }, [
                    createVNode(_component_wd_icon, {
                      name: muted.value ? "volume-mute" : "volume-up",
                      variant: __props.iconStyle,
                      size: 24
                    }, null, 8, ["name", "variant"])
                  ], 8, _hoisted_20)) : (openBlock(), createElementBlock("span", _hoisted_21))
                ]),
                errMsg.value ? (openBlock(), createElementBlock(
                  "div",
                  _hoisted_222,
                  toDisplayString(errMsg.value),
                  1
                  /* TEXT */
                )) : createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : mode.value === "bar" ? (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                createCommentVNode(" ==================== \u6A2A\u6761 ==================== "),
                createCommentVNode("  \u5C01\u9762\u5373\u64AD\u653E\u952E\uFF1A\u4E00\u5757\u53EF\u70B9\u51FB\u533A\u57DF\uFF0C\u4E0D\u518D\u5E76\u6392\u4E24\u4E2A\u5143\u7D20 "),
                createElementVNode("button", {
                  type: "button",
                  class: "wd-audio__cover",
                  "aria-label": playing.value ? "\u6682\u505C" : "\u64AD\u653E",
                  onClick: togglePlay
                }, [
                  renderSlot(_ctx.$slots, "cover", {}, () => [
                    __props.cover ? (openBlock(), createElementBlock("img", {
                      key: 0,
                      src: __props.cover,
                      alt: ""
                    }, null, 8, _hoisted_24)) : (openBlock(), createBlock(_component_wd_icon, {
                      key: 1,
                      class: "wd-audio__cover-placeholder",
                      name: "music",
                      variant: __props.iconStyle,
                      size: 22
                    }, null, 8, ["variant"]))
                  ]),
                  createElementVNode("span", _hoisted_25, [
                    createVNode(_component_wd_icon, {
                      name: playing.value ? "pause" : "play",
                      variant: __props.iconStyle,
                      size: 16
                    }, null, 8, ["name", "variant"])
                  ]),
                  playing.value ? (openBlock(), createElementBlock("span", _hoisted_26, [..._cache[8] || (_cache[8] = [
                    createElementVNode(
                      "i",
                      null,
                      null,
                      -1
                      /* CACHED */
                    ),
                    createElementVNode(
                      "i",
                      null,
                      null,
                      -1
                      /* CACHED */
                    ),
                    createElementVNode(
                      "i",
                      null,
                      null,
                      -1
                      /* CACHED */
                    )
                  ])])) : createCommentVNode("v-if", true)
                ], 8, _hoisted_232),
                createElementVNode("div", _hoisted_27, [
                  __props.title || __props.subtitle || _ctx.$slots.info ? (openBlock(), createElementBlock("div", _hoisted_28, [
                    createElementVNode(
                      "span",
                      _hoisted_29,
                      toDisplayString(__props.title),
                      1
                      /* TEXT */
                    ),
                    __props.subtitle ? (openBlock(), createElementBlock(
                      "span",
                      _hoisted_30,
                      toDisplayString(__props.subtitle),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    renderSlot(_ctx.$slots, "info")
                  ])) : createCommentVNode("v-if", true),
                  createCommentVNode('\n          \u65F6\u95F4\u4E0E\u8FDB\u5EA6\u6761**\u540C\u4E00\u884C**\uFF0C\u4E0D\u5355\u72EC\u5360\u4E00\u884C\u3002\n          \u26A0\uFE0F \u4E4B\u524D\u65F6\u95F4\u53E6\u8D77\u4E00\u884C\uFF0C\u5BFC\u81F4\u53F3\u4FA7\u5185\u5BB9\u6BD4\u5DE6\u4FA7\u5C01\u9762\u9AD8\u51FA\u4E24\u884C\uFF0C\n          \u5C01\u9762\u663E\u5F97"\u77EE\u4E86\u4E00\u622A"\uFF0C\u6574\u6761\u91CD\u5FC3\u504F\u4E0A\u3002\n          \u73B0\u5728\uFF1A\u5DF2\u64AD\u65F6\u95F4 \u2192 \u8FDB\u5EA6\u6761 \u2192 \u603B\u65F6\u957F\uFF0C\u4E09\u8005\u5782\u76F4\u5C45\u4E2D\u4E8E\u4E00\u884C\u3002\n        '),
                  createElementVNode("div", _hoisted_31, [
                    createElementVNode(
                      "span",
                      _hoisted_322,
                      toDisplayString(unref(formatDuration)(current.value)),
                      1
                      /* TEXT */
                    ),
                    bars.value ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: "wd-audio__wave",
                      role: "slider",
                      tabindex: "0",
                      "aria-label": "\u64AD\u653E\u8FDB\u5EA6",
                      "aria-valuenow": Math.round(shownPct.value),
                      onClick: seekTo,
                      onKeydown: onScrubKey
                    }, [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(bars.value, (h, i) => {
                          return openBlock(), createElementBlock(
                            "span",
                            {
                              key: i,
                              class: normalizeClass(["wd-audio__wave-bar", { "is-on": i / bars.value.length * 100 <= shownPct.value }]),
                              style: normalizeStyle({ height: "100%", transform: `scaleY(${h})` })
                            },
                            null,
                            6
                            /* CLASS, STYLE */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ], 40, _hoisted_332)) : (openBlock(), createElementBlock("div", {
                      key: 1,
                      class: "wd-audio__scrub",
                      role: "slider",
                      tabindex: "0",
                      "aria-label": "\u64AD\u653E\u8FDB\u5EA6",
                      "aria-valuenow": Math.round(shownPct.value),
                      onClick: seekTo,
                      onKeydown: onScrubKey
                    }, [
                      _cache[9] || (_cache[9] = createElementVNode(
                        "span",
                        { class: "wd-audio__track" },
                        null,
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "span",
                        {
                          class: "wd-audio__buffer",
                          style: normalizeStyle({ width: bufferedPct.value + "%" })
                        },
                        null,
                        4
                        /* STYLE */
                      ),
                      createElementVNode(
                        "span",
                        {
                          class: "wd-audio__played",
                          style: normalizeStyle({ width: shownPct.value + "%" })
                        },
                        null,
                        4
                        /* STYLE */
                      ),
                      createElementVNode(
                        "span",
                        {
                          class: "wd-audio__knob",
                          style: normalizeStyle({ left: shownPct.value + "%" })
                        },
                        null,
                        4
                        /* STYLE */
                      )
                    ], 40, _hoisted_34)),
                    createElementVNode(
                      "span",
                      _hoisted_35,
                      toDisplayString(unref(formatDuration)(duration.value)),
                      1
                      /* TEXT */
                    ),
                    errMsg.value ? (openBlock(), createElementBlock(
                      "span",
                      _hoisted_36,
                      toDisplayString(errMsg.value),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true)
                  ]),
                  renderSlot(_ctx.$slots, "extra")
                ]),
                createElementVNode("div", _hoisted_37, [
                  volume.value ? (openBlock(), createElementBlock("div", _hoisted_38, [
                    createElementVNode("button", {
                      type: "button",
                      class: "wd-audio__ibtn",
                      "aria-label": muted.value ? "\u53D6\u6D88\u9759\u97F3" : "\u9759\u97F3",
                      onClick: toggleMute
                    }, [
                      createVNode(_component_wd_icon, {
                        name: muted.value ? "volume-mute" : "volume-up",
                        variant: __props.iconStyle,
                        size: 15
                      }, null, 8, ["name", "variant"])
                    ], 8, _hoisted_39),
                    createElementVNode("div", {
                      class: "wd-audio__vol-track",
                      onClick: setVolume
                    }, [
                      createElementVNode(
                        "span",
                        {
                          class: "wd-audio__vol-fill",
                          style: normalizeStyle({ width: (muted.value ? 0 : volume.value * 100) + "%" })
                        },
                        null,
                        4
                        /* STYLE */
                      )
                    ])
                  ])) : createCommentVNode("v-if", true),
                  __props.playbackRate ? (openBlock(), createElementBlock("div", _hoisted_40, [
                    createElementVNode(
                      "button",
                      {
                        type: "button",
                        class: "wd-audio__ibtn wd-audio__ibtn--text",
                        onClick: _cache[6] || (_cache[6] = ($event) => rateOpen.value = !rateOpen.value)
                      },
                      toDisplayString(rate.value) + "\xD7",
                      1
                      /* TEXT */
                    ),
                    rateOpen.value ? (openBlock(), createElementBlock("div", _hoisted_41, [
                      (openBlock(), createElementBlock(
                        Fragment,
                        null,
                        renderList([0.75, 1, 1.25, 1.5, 2], (r) => {
                          return createElementVNode("button", {
                            key: r,
                            type: "button",
                            class: normalizeClass({ "is-on": r === rate.value }),
                            onClick: ($event) => setRate(r)
                          }, toDisplayString(r) + "\xD7", 11, _hoisted_422);
                        }),
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ])) : createCommentVNode("v-if", true)
                  ])) : createCommentVNode("v-if", true),
                  __props.downloadable ? (openBlock(), createElementBlock("a", {
                    key: 2,
                    class: "wd-audio__ibtn",
                    href: __props.src,
                    download: "",
                    "aria-label": "\u4E0B\u8F7D"
                  }, [
                    createVNode(_component_wd_icon, {
                      name: "download",
                      variant: __props.iconStyle,
                      size: 15
                    }, null, 8, ["variant"])
                  ], 8, _hoisted_43)) : createCommentVNode("v-if", true),
                  renderSlot(_ctx.$slots, "actions")
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (openBlock(), createElementBlock(
              Fragment,
              { key: 2 },
              [
                createCommentVNode(" ==================== \u8FF7\u4F60\u6A2A\u6761 ==================== "),
                createElementVNode("button", {
                  type: "button",
                  class: "wd-audio__mini-play",
                  "aria-label": playing.value ? "\u6682\u505C" : "\u64AD\u653E",
                  onClick: togglePlay
                }, [
                  createVNode(_component_wd_icon, {
                    name: playing.value ? "pause" : "play",
                    variant: __props.iconStyle,
                    size: 14
                  }, null, 8, ["name", "variant"])
                ], 8, _hoisted_44),
                createElementVNode("div", _hoisted_45, [
                  createElementVNode("div", _hoisted_46, [
                    createElementVNode(
                      "span",
                      _hoisted_47,
                      toDisplayString(__props.title),
                      1
                      /* TEXT */
                    ),
                    __props.subtitle ? (openBlock(), createElementBlock(
                      "span",
                      _hoisted_48,
                      toDisplayString(__props.subtitle),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true)
                  ]),
                  createElementVNode("div", {
                    class: "wd-audio__mini-progress",
                    role: "slider",
                    tabindex: "0",
                    "aria-label": "\u64AD\u653E\u8FDB\u5EA6",
                    "aria-valuenow": Math.round(shownPct.value),
                    onClick: seekTo,
                    onKeydown: onScrubKey
                  }, [
                    createElementVNode("span", _hoisted_50, [
                      createElementVNode(
                        "span",
                        {
                          class: "wd-audio__mini-fill",
                          style: normalizeStyle({ width: shownPct.value + "%" })
                        },
                        null,
                        4
                        /* STYLE */
                      )
                    ])
                  ], 40, _hoisted_49)
                ]),
                createElementVNode(
                  "span",
                  _hoisted_51,
                  toDisplayString(unref(formatDuration)(current.value)) + " / " + toDisplayString(unref(formatDuration)(duration.value)),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdAvatar.ts
  var WdAvatar_default = /* @__PURE__ */ defineComponent({
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
      const label = computed(() => {
        const n = props.name.trim();
        if (!n) return "?";
        if (n.startsWith("+")) return n;
        return n.charAt(0);
      });
      const resolvedTone = computed(() => {
        if (props.tone) return props.tone;
        if (!props.name) return 0;
        let hash = 0;
        for (const ch of props.name) hash = (hash * 31 + ch.charCodeAt(0)) % 3;
        return hash + 1;
      });
      const classes = computed(() => [
        "wd-avatar",
        resolvedTone.value ? `wd-avatar--tone-${resolvedTone.value}` : "",
        props.dark ? "wd-avatar--dark" : "",
        props.size === "sm" ? "wd-avatar--sm" : ""
      ]);
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "span",
          {
            class: normalizeClass(classes.value)
          },
          toDisplayString(label.value),
          3
          /* TEXT, CLASS */
        );
      };
    }
  });

  // .demo-build/WdAvatarGroup.ts
  var _hoisted_110 = { class: "wd-avatars" };
  var WdAvatarGroup_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdAvatarGroup" },
    __name: "WdAvatarGroup",
    props: {
      names: { type: Array, required: false, default: () => [] },
      max: { type: Number, required: false, default: 3 }
    },
    setup(__props) {
      const props = __props;
      const shown = computed(() => props.names.slice(0, props.max));
      const rest = computed(() => Math.max(0, props.names.length - props.max));
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("span", _hoisted_110, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(shown.value, (name, index) => {
              return openBlock(), createBlock(WdAvatar_default, {
                key: index,
                name
              }, null, 8, ["name"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          rest.value ? (openBlock(), createBlock(WdAvatar_default, {
            key: 0,
            name: `+${rest.value}`,
            dark: ""
          }, null, 8, ["name"])) : createCommentVNode("v-if", true)
        ]);
      };
    }
  });

  // .demo-build/WdBacktop.ts
  var _hoisted_111 = ["aria-hidden", "tabindex"];
  var WdBacktop_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdBacktop" },
    __name: "WdBacktop",
    props: {
      visibilityHeight: { type: Number, required: false, default: 320 },
      right: { type: Number, required: false, default: 24 },
      bottom: { type: Number, required: false, default: 24 },
      duration: { type: Number, required: false, default: 420 },
      target: { type: String, required: false, default: "" },
      instant: { type: Boolean, required: false, default: false }
    },
    emits: ["click"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const visible = ref(false);
      let scrollEl = null;
      function readScrollTop() {
        if (scrollEl === window || scrollEl === null) {
          return window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
        }
        return scrollEl.scrollTop;
      }
      function onScroll() {
        visible.value = readScrollTop() > props.visibilityHeight;
      }
      let raf = 0;
      function scrollToTop() {
        const from = readScrollTop();
        if (from <= 0) return;
        if (props.instant) {
          scrollTo(from > 0 ? 0 : 0, true);
          return;
        }
        const start = performance.now();
        const dur = Math.max(1, props.duration);
        const step = (now) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          scrollTo(from * (1 - eased), true);
          if (t < 1) raf = requestAnimationFrame(step);
          else raf = 0;
        };
        raf = requestAnimationFrame(step);
        window.setTimeout(() => {
          if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
            if (readScrollTop() > 0) scrollTo(0, false);
          }
        }, dur + 120);
      }
      function scrollTo(top, smooth) {
        if (scrollEl === window || scrollEl === null) {
          if (smooth) window.scrollTo({ top, behavior: "auto" });
          else window.scrollTo(0, top);
        } else {
          ;
          scrollEl.scrollTop = top;
        }
      }
      function onClick(e) {
        scrollToTop();
        emit("click", e);
      }
      onMounted(() => {
        if (props.target) {
          scrollEl = document.querySelector(props.target);
          if (!scrollEl) {
            scrollEl = window;
          }
        } else {
          scrollEl = window;
        }
        scrollEl.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      });
      onBeforeUnmount(() => {
        scrollEl?.removeEventListener("scroll", onScroll);
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      });
      const style = computed(() => ({
        right: props.right + "px",
        bottom: props.bottom + "px"
      }));
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock("button", {
          type: "button",
          class: normalizeClass(["wd-backtop", { "is-visible": visible.value }]),
          style: normalizeStyle(style.value),
          "aria-hidden": !visible.value,
          tabindex: visible.value ? 0 : -1,
          "aria-label": "\u56DE\u5230\u9876\u90E8",
          onClick
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createVNode(_component_wd_icon, {
              name: "arrow-up",
              size: 18
            })
          ])
        ], 14, _hoisted_111);
      };
    }
  });

  // .demo-build/WdBadge.ts
  var _hoisted_113 = {
    key: 0,
    class: "wd-badge__dot"
  };
  var _hoisted_210 = {
    key: 1,
    class: "wd-badge__count"
  };
  var WdBadge_default = /* @__PURE__ */ defineComponent({
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
      const display = computed(() => {
        if (typeof props.value === "number" && props.max && props.value > props.max) {
          return `${props.max}+`;
        }
        return props.value;
      });
      const showCount = computed(
        () => !props.dot && props.value !== "" && props.value !== void 0 && props.value !== null
      );
      const animReady = ref(false);
      watch(() => props.value, () => {
        animReady.value = true;
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "span",
          {
            class: normalizeClass(["wd-badge", [__props.tone === "gray" ? "wd-badge--gray" : "", { "wd-badge--anim-ready": animReady.value }]])
          },
          [
            renderSlot(_ctx.$slots, "default"),
            __props.dot ? (openBlock(), createElementBlock("span", _hoisted_113)) : showCount.value ? (openBlock(), createElementBlock(
              "span",
              _hoisted_210,
              toDisplayString(display.value),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdBreadcrumb.ts
  var _hoisted_114 = {
    class: "wd-breadcrumb",
    "aria-label": "\u9762\u5305\u5C51"
  };
  var _hoisted_211 = {
    key: 0,
    class: "wd-breadcrumb__sep"
  };
  var _hoisted_310 = ["onClick"];
  var WdBreadcrumb_default = /* @__PURE__ */ defineComponent({
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
        return openBlock(), createElementBlock("nav", _hoisted_114, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(props.items, (item, i) => {
              return openBlock(), createElementBlock(
                Fragment,
                { key: i },
                [
                  i > 0 ? (openBlock(), createElementBlock(
                    "span",
                    _hoisted_211,
                    toDisplayString(__props.separator),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true),
                  createElementVNode("button", {
                    type: "button",
                    class: normalizeClass(["wd-breadcrumb__item", { "wd-breadcrumb__item--current": i === props.items.length - 1 }]),
                    onClick: ($event) => pick(item, i)
                  }, toDisplayString(item.label), 11, _hoisted_310)
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

  // .demo-build/WdButton.ts
  var _hoisted_115 = ["type", "disabled", "aria-busy"];
  var _hoisted_212 = {
    key: 0,
    class: "wd-btn__spinner",
    "aria-hidden": "true"
  };
  var WdButton_default = /* @__PURE__ */ defineComponent({
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
      const classes = computed(() => [
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
        return openBlock(), createElementBlock("button", {
          "data-wd-hover": "",
          class: normalizeClass(classes.value),
          type: __props.type,
          disabled: __props.disabled || __props.loading,
          "aria-busy": __props.loading || void 0,
          onClick
        }, [
          __props.loading ? (openBlock(), createElementBlock("span", _hoisted_212)) : createCommentVNode("v-if", true),
          __props.loading && __props.loadingText ? (openBlock(), createElementBlock(
            Fragment,
            { key: 1 },
            [
              createTextVNode(
                toDisplayString(__props.loadingText),
                1
                /* TEXT */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          )) : renderSlot(_ctx.$slots, "default", {}, void 0, void 0, 2)
        ], 10, _hoisted_115);
      };
    }
  });

  // .demo-build/WdCalendar.ts
  var _hoisted_116 = ["aria-label"];
  var _hoisted_213 = { class: "wd-calendar__head" };
  var _hoisted_311 = { class: "wd-calendar__month" };
  var _hoisted_410 = {
    class: "wd-calendar__week",
    role: "row"
  };
  var _hoisted_53 = {
    class: "wd-calendar__grid",
    role: "rowgroup"
  };
  var _hoisted_63 = ["aria-selected", "disabled", "onClick"];
  var _hoisted_73 = { class: "wd-calendar__day" };
  var _hoisted_83 = {
    key: 0,
    class: "wd-calendar__foot"
  };
  var WdCalendar_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdCalendar" },
    __name: "WdCalendar",
    props: {
      modelValue: { type: String, required: false, default: void 0 },
      defaultValue: { type: String, required: false, default: "" },
      month: { type: String, required: false, default: "" },
      weekStart: { type: Number, required: false, default: 1 },
      min: { type: String, required: false, default: "" },
      max: { type: String, required: false, default: "" },
      clearable: { type: Boolean, required: false, default: true },
      showToday: { type: Boolean, required: false, default: true },
      size: { type: String, required: false, default: "md" }
    },
    emits: ["update:modelValue", "change", "update:month"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      function pad(n) {
        return n < 10 ? "0" + n : String(n);
      }
      function toKey(d) {
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
      }
      function parseKey(s) {
        const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
        if (!m) return null;
        const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
        return isNaN(d.getTime()) ? null : d;
      }
      function todayKey() {
        return toKey(/* @__PURE__ */ new Date());
      }
      const inner = ref(props.defaultValue);
      const isControlled = computed(() => props.modelValue !== void 0);
      const selected = computed(() => isControlled.value ? props.modelValue : inner.value);
      const view = ref({ y: 0, m: 0 });
      function initView() {
        const base = props.month ? /^(\d{4})-(\d{2})$/.exec(props.month) : null;
        if (base) {
          view.value = { y: Number(base[1]), m: Number(base[2]) - 1 };
          return;
        }
        const sel = parseKey(selected.value);
        const d = sel ?? /* @__PURE__ */ new Date();
        view.value = { y: d.getFullYear(), m: d.getMonth() };
      }
      initView();
      watch(
        () => props.month,
        (v) => {
          const m = /^(\d{4})-(\d{2})$/.exec(v || "");
          if (m) view.value = { y: Number(m[1]), m: Number(m[2]) - 1 };
        }
      );
      const WEEK_LABELS = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
      const weekHeads = computed(() => {
        const arr = [...WEEK_LABELS];
        return props.weekStart === 1 ? [...arr.slice(1), arr[0]] : arr;
      });
      const cells = computed(() => {
        const { y, m } = view.value;
        const first = new Date(y, m, 1);
        const firstDow = first.getDay();
        const lead = (firstDow - props.weekStart + 7) % 7;
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        const prevMonthDays = new Date(y, m, 0).getDate();
        const out = [];
        const tk = todayKey();
        const sel = selected.value;
        const minD = parseKey(props.min);
        const maxD = parseKey(props.max);
        const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const makeCell = (d, inMonth) => {
          const key = toKey(d);
          return {
            key,
            day: d.getDate(),
            inMonth,
            isToday: key === tk,
            isSelected: key === sel,
            disabled: !!minD && d < startOfDay(minD) || !!maxD && d > startOfDay(maxD)
          };
        };
        for (let i = lead - 1; i >= 0; i--) {
          const day = prevMonthDays - i;
          const d = new Date(y, m - 1, day);
          out.push(makeCell(d, false));
        }
        for (let day = 1; day <= daysInMonth; day++) {
          out.push(makeCell(new Date(y, m, day), true));
        }
        while (out.length < 42) {
          const day = out.length - lead - daysInMonth + 1;
          out.push(makeCell(new Date(y, m + 1, day), false));
        }
        return out;
      });
      const monthLabel = computed(() => `${view.value.y} \u5E74 ${view.value.m + 1} \u6708`);
      function shiftMonth(delta) {
        let m = view.value.m + delta;
        let y = view.value.y;
        while (m < 0) {
          m += 12;
          y--;
        }
        while (m > 11) {
          m -= 12;
          y++;
        }
        view.value = { y, m };
        emit("update:month", `${y}-${pad(m + 1)}`);
      }
      function pick(cell) {
        if (cell.disabled) return;
        if (!isControlled.value) inner.value = cell.key;
        emit("update:modelValue", cell.key);
        emit("change", cell.key);
        if (!cell.inMonth) {
          const d = parseKey(cell.key);
          if (d) view.value = { y: d.getFullYear(), m: d.getMonth() };
        }
      }
      function goToday() {
        const d = /* @__PURE__ */ new Date();
        view.value = { y: d.getFullYear(), m: d.getMonth() };
        pick({ key: toKey(d), day: d.getDate(), inMonth: true, isToday: true, isSelected: false, disabled: false });
      }
      function clear() {
        if (!isControlled.value) inner.value = "";
        emit("update:modelValue", "");
        emit("change", "");
      }
      function onKeydown(e) {
        const cur = parseKey(selected.value) ?? new Date(view.value.y, view.value.m, 1);
        let next = null;
        if (e.key === "ArrowLeft") next = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() - 1);
        else if (e.key === "ArrowRight") next = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 1);
        else if (e.key === "ArrowUp") next = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() - 7);
        else if (e.key === "ArrowDown") next = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 7);
        else if (e.key === "PageUp") shiftMonth(-1);
        else if (e.key === "PageDown") shiftMonth(1);
        if (next) {
          e.preventDefault();
          view.value = { y: next.getFullYear(), m: next.getMonth() };
          pick({ key: toKey(next), day: next.getDate(), inMonth: true, isToday: false, isSelected: false, disabled: false });
        }
      }
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock("div", {
          class: normalizeClass(["wd-calendar", [`wd-calendar--${__props.size}`]]),
          tabindex: "0",
          role: "grid",
          "aria-label": monthLabel.value,
          onKeydown
        }, [
          createCommentVNode(" \u5934\u90E8\uFF1A\u7FFB\u6708 "),
          createElementVNode("div", _hoisted_213, [
            createElementVNode("button", {
              type: "button",
              class: "wd-calendar__nav",
              "aria-label": "\u4E0A\u4E2A\u6708",
              onClick: _cache[0] || (_cache[0] = ($event) => shiftMonth(-1))
            }, [
              createVNode(_component_wd_icon, {
                name: "chevron-left",
                size: 15
              })
            ]),
            createElementVNode(
              "span",
              _hoisted_311,
              toDisplayString(monthLabel.value),
              1
              /* TEXT */
            ),
            createElementVNode("button", {
              type: "button",
              class: "wd-calendar__nav",
              "aria-label": "\u4E0B\u4E2A\u6708",
              onClick: _cache[1] || (_cache[1] = ($event) => shiftMonth(1))
            }, [
              createVNode(_component_wd_icon, {
                name: "chevron-right",
                size: 15
              })
            ])
          ]),
          createCommentVNode(" \u661F\u671F\u8868\u5934 "),
          createElementVNode("div", _hoisted_410, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(weekHeads.value, (w) => {
                return openBlock(), createElementBlock(
                  "span",
                  {
                    key: w,
                    class: "wd-calendar__weekday",
                    role: "columnheader"
                  },
                  toDisplayString(w),
                  1
                  /* TEXT */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          createCommentVNode(" \u65E5\u671F\u7F51\u683C "),
          createElementVNode("div", _hoisted_53, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(cells.value, (c) => {
                return openBlock(), createElementBlock("button", {
                  key: c.key,
                  type: "button",
                  class: normalizeClass(["wd-calendar__cell", {
                    "is-out": !c.inMonth,
                    "is-today": c.isToday,
                    "is-selected": c.isSelected,
                    "is-disabled": c.disabled
                  }]),
                  role: "gridcell",
                  "aria-selected": c.isSelected,
                  disabled: c.disabled,
                  onClick: ($event) => pick(c)
                }, [
                  createElementVNode(
                    "span",
                    _hoisted_73,
                    toDisplayString(c.day),
                    1
                    /* TEXT */
                  )
                ], 10, _hoisted_63);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          createCommentVNode(" \u5E95\u90E8\u64CD\u4F5C "),
          __props.clearable || __props.showToday ? (openBlock(), createElementBlock("div", _hoisted_83, [
            __props.clearable ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "wd-calendar__action",
              onClick: clear
            }, "\u6E05\u7A7A")) : createCommentVNode("v-if", true),
            __props.showToday ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "wd-calendar__action",
              onClick: goToday
            }, "\u4ECA\u5929")) : createCommentVNode("v-if", true)
          ])) : createCommentVNode("v-if", true)
        ], 42, _hoisted_116);
      };
    }
  });

  // .demo-build/WdCard.ts
  var WdCard_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdCard" },
    __name: "WdCard",
    props: {
      variant: { type: String, required: false, default: "default" },
      padding: { type: String, required: false, default: "md" },
      hoverable: { type: Boolean, required: false, default: false }
    },
    setup(__props) {
      const props = __props;
      const classes = computed(() => [
        "wd-card",
        props.variant !== "default" ? `wd-card--${props.variant}` : "",
        props.padding !== "md" ? `wd-card--pad-${props.padding}` : "",
        props.hoverable ? "wd-card--hoverable" : ""
      ]);
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(classes.value),
            "data-wd-hover": ""
          },
          [
            renderSlot(_ctx.$slots, "default")
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdCarousel.ts
  var _hoisted_117 = ["src", "alt"];
  var _hoisted_214 = {
    key: 1,
    class: "wd-carousel__label"
  };
  var _hoisted_312 = {
    key: 2,
    class: "wd-carousel__dots"
  };
  var _hoisted_411 = ["aria-label", "onClick"];
  var SETTLE_MS = 500;
  var THRESHOLD = 40;
  var WdCarousel_default = /* @__PURE__ */ defineComponent({
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
      const root = ref(null);
      const n = () => props.items.length;
      const looping = () => props.loop && n() > 1;
      const slides = computed(() => {
        const list = props.items;
        if (!list.length) return [];
        if (!looping()) return list.map((it, i) => ({ it, real: i, key: "r" + i }));
        return [
          { it: list[list.length - 1], real: list.length - 1, key: "c-head" },
          ...list.map((it, i) => ({ it, real: i, key: "r" + i })),
          { it: list[0], real: 0, key: "c-tail" }
        ];
      });
      const pos = ref(looping() ? 1 : 0);
      const animating = ref(true);
      const dragX = ref(0);
      const current = computed(() => {
        const total = n() || 1;
        return ((pos.value - (looping() ? 1 : 0)) % total + total) % total;
      });
      const trackStyle = computed(() => ({
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
      onBeforeUnmount(() => {
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
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          "div",
          {
            ref_key: "root",
            ref: root,
            class: "wd-carousel",
            style: normalizeStyle({ height: __props.height + "px" }),
            onMouseenter: stop,
            onMouseleave: restart,
            onPointerdown: onDown
          },
          [
            createElementVNode(
              "div",
              {
                class: "wd-carousel__track",
                style: normalizeStyle(trackStyle.value),
                onTransitionend: onTransitionEnd
              },
              [
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(slides.value, (s) => {
                    return openBlock(), createElementBlock(
                      "div",
                      {
                        key: s.key,
                        class: "wd-carousel__slide",
                        style: normalizeStyle({ background: PALETTE[s.real % PALETTE.length] })
                      },
                      [
                        renderSlot(_ctx.$slots, "item", {
                          item: s.it,
                          index: s.real
                        }, () => [
                          s.it.src ? (openBlock(), createElementBlock("img", {
                            key: 0,
                            src: s.it.src,
                            alt: s.it.alt || "",
                            class: "wd-carousel__img",
                            draggable: "false"
                          }, null, 8, _hoisted_117)) : (openBlock(), createElementBlock(
                            "span",
                            _hoisted_214,
                            toDisplayString(s.it.label || `Slide ${s.real + 1}`),
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
            __props.showArrows && __props.items.length > 1 ? (openBlock(), createElementBlock(
              "button",
              {
                key: 0,
                type: "button",
                class: "wd-icon-btn wd-carousel__arrow wd-carousel__arrow--prev",
                "aria-label": "\u4E0A\u4E00\u5F20",
                onPointerdown: _cache[0] || (_cache[0] = withModifiers(() => {
                }, ["stop"])),
                onClick: prev
              },
              [
                createVNode(_component_wd_icon, {
                  name: "chevron-left",
                  size: 15
                })
              ],
              32
              /* NEED_HYDRATION */
            )) : createCommentVNode("v-if", true),
            __props.showArrows && __props.items.length > 1 ? (openBlock(), createElementBlock(
              "button",
              {
                key: 1,
                type: "button",
                class: "wd-icon-btn wd-carousel__arrow wd-carousel__arrow--next",
                "aria-label": "\u4E0B\u4E00\u5F20",
                onPointerdown: _cache[1] || (_cache[1] = withModifiers(() => {
                }, ["stop"])),
                onClick: next
              },
              [
                createVNode(_component_wd_icon, {
                  name: "chevron-right",
                  size: 15
                })
              ],
              32
              /* NEED_HYDRATION */
            )) : createCommentVNode("v-if", true),
            __props.showDots && __props.items.length > 1 ? (openBlock(), createElementBlock("div", _hoisted_312, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(__props.items, (_, i) => {
                  return openBlock(), createElementBlock("button", {
                    key: i,
                    type: "button",
                    class: normalizeClass(["wd-carousel__dot", { "wd-carousel__dot--active": i === current.value }]),
                    "aria-label": `\u7B2C ${i + 1} \u5F20`,
                    onPointerdown: _cache[2] || (_cache[2] = withModifiers(() => {
                    }, ["stop"])),
                    onClick: ($event) => go(i)
                  }, null, 42, _hoisted_411);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : createCommentVNode("v-if", true)
          ],
          36
          /* STYLE, NEED_HYDRATION */
        );
      };
    }
  });

  // .demo-build/anchor.ts
  function scrollOffset() {
    const x = window.scrollX ?? window.pageXOffset ?? document.documentElement.scrollLeft ?? 0;
    const y = window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
    return { x, y };
  }
  function viewportSize() {
    const vv = window.visualViewport;
    if (vv) return { width: vv.width, height: vv.height };
    return { width: window.innerWidth, height: window.innerHeight };
  }
  function useAnchoredPosition(open, anchor, panel, options = {}) {
    const pos = ref({ top: 0, left: 0 });
    const actual = ref(options.placement || "bottom-start");
    function place() {
      const el = anchor.value;
      if (!el) return;
      const a = el.getBoundingClientRect();
      const pr = panel.value?.getBoundingClientRect();
      const gap = options.gap ?? 6;
      const pw = options.matchWidth ? a.width : options.width ?? pr?.width ?? 0;
      const ph = pr?.height ?? 0;
      const vp = viewportSize();
      const s = scrollOffset();
      const vTop = a.top;
      const vBottom = a.bottom;
      const dTop = a.top + s.y;
      const dBottom = a.bottom + s.y;
      const dLeft = a.left + s.x;
      const dRight = a.right + s.x;
      let placement = options.placement || "bottom-start";
      const wantBottom = placement.startsWith("bottom");
      const fitsBelow = vBottom + gap + ph <= vp.height - 8;
      const fitsAbove = vTop - gap - ph >= 8;
      const goBottom = wantBottom ? fitsBelow || !fitsAbove : !fitsAbove && fitsBelow;
      let top;
      if (goBottom) {
        top = dBottom + gap;
        placement = placement.replace("top", "bottom");
      } else {
        top = dTop - gap - ph;
        placement = placement.replace("bottom", "top");
      }
      let left;
      if (placement.endsWith("start")) left = dLeft;
      else if (placement.endsWith("end")) left = dRight - pw;
      else left = dLeft + a.width / 2 - pw / 2;
      const minLeft = s.x + 8;
      const maxLeft = s.x + vp.width - pw - 8;
      left = Math.max(minLeft, Math.min(left, Math.max(minLeft, maxLeft)));
      pos.value = { top, left };
      actual.value = placement;
    }
    let raf = 0;
    let timer = 0;
    function schedule() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        place();
      });
      clearTimeout(timer);
      timer = window.setTimeout(place, 32);
    }
    function onScroll(e) {
      const t = e.target;
      if (t && panel.value && panel.value.contains(t)) return;
      schedule();
    }
    let vv = null;
    function bind() {
      window.addEventListener("scroll", onScroll, true);
      window.addEventListener("resize", schedule);
      vv = window.visualViewport ?? null;
      if (vv) {
        vv.addEventListener("resize", schedule);
        vv.addEventListener("scroll", schedule);
      }
    }
    function unbind() {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", schedule);
      if (vv) {
        vv.removeEventListener("resize", schedule);
        vv.removeEventListener("scroll", schedule);
        vv = null;
      }
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      clearTimeout(timer);
    }
    watch(open, async (v) => {
      if (v) {
        await nextTick();
        place();
        bind();
        schedule();
      } else {
        unbind();
      }
    });
    let ro = null;
    watch(panel, (el) => {
      ro?.disconnect();
      if (el && typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(() => schedule());
        ro.observe(el);
      }
    });
    onBeforeUnmount(() => {
      ro?.disconnect();
      ro = null;
    });
    onMounted(() => {
      if (open.value) {
        place();
        bind();
      }
    });
    onBeforeUnmount(unbind);
    return { pos, place: schedule, actual };
  }
  function useDismiss(refs, close, enabled, event = "click") {
    function onDoc(e) {
      if (!enabled.value) return;
      const t = e.target;
      if (refs.some((r) => r.value?.contains(t))) return;
      close();
    }
    if (typeof document !== "undefined") document.addEventListener(event, onDoc);
    onBeforeUnmount(() => {
      if (typeof document !== "undefined") document.removeEventListener(event, onDoc);
    });
  }

  // .demo-build/overlay-stack.ts
  var stack = [];
  var seq = 0;
  var overlayDepth = ref(0);
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
    watch(
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
    onBeforeUnmount(() => {
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

  // .demo-build/WdCascader.ts
  var _hoisted_118 = ["tabindex", "aria-expanded"];
  var _hoisted_215 = ["disabled", "aria-selected", "onClick"];
  var _hoisted_313 = { class: "wd-cascader__label" };
  var _hoisted_412 = {
    key: 0,
    class: "wd-cascader__empty"
  };
  var WdCascader_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdCascader" },
    __name: "WdCascader",
    props: {
      options: { type: Array, required: false, default: () => [] },
      modelValue: { type: Array, required: false, default: void 0 },
      placeholder: { type: String, required: false, default: "\u8BF7\u9009\u62E9" },
      changeOnSelect: { type: Boolean, required: false, default: false },
      disabled: { type: Boolean, required: false, default: false },
      clearable: { type: Boolean, required: false, default: true },
      size: { type: String, required: false, default: "md" },
      maxHeight: { type: Number, required: false, default: 280 }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const open = ref(false);
      const mounted = ref(false);
      const rootEl = ref(null);
      const panelEl = ref(null);
      const { pos } = useAnchoredPosition(open, rootEl, panelEl, {
        placement: "bottom-start",
        gap: 6,
        matchWidth: true
      });
      const inner = ref([]);
      const isControlled = computed(() => props.modelValue !== void 0);
      const selected = computed(() => isControlled.value ? props.modelValue : inner.value);
      const browsing = ref([]);
      const columns = computed(() => {
        const out = [props.options];
        let level = props.options;
        for (const v of browsing.value) {
          const hit = level.find((o) => o.value === v);
          if (!hit?.children?.length) break;
          out.push(hit.children);
          level = hit.children;
        }
        return out;
      });
      function pickedAt(level) {
        return browsing.value[level];
      }
      function labelsOf(values) {
        const out = [];
        let level = props.options;
        for (const v of values) {
          const hit = level.find((o) => o.value === v);
          if (!hit) break;
          out.push(hit.label);
          level = hit.children ?? [];
        }
        return out;
      }
      const displayText = computed(() => labelsOf(selected.value).join(" / "));
      watch(open, (v) => {
        if (v) {
          browsing.value = [...selected.value];
        }
      });
      function toggleOpen() {
        if (props.disabled) return;
        if (open.value) close();
        else {
          mounted.value = true;
          open.value = true;
        }
      }
      function close() {
        open.value = false;
        window.setTimeout(() => {
          if (!open.value) mounted.value = false;
        }, 200);
      }
      function pick(level, opt) {
        if (opt.disabled) return;
        const next = browsing.value.slice(0, level);
        next.push(opt.value);
        const hasChildren = !!opt.children?.length;
        if (hasChildren) {
          browsing.value = next;
          if (props.changeOnSelect) commit(next);
          return;
        }
        browsing.value = next;
        commit(next);
        close();
      }
      function commit(values) {
        if (!isControlled.value) inner.value = values;
        emit("update:modelValue", values);
        emit("change", values, labelsOf(values));
      }
      function clear(e) {
        e.stopPropagation();
        browsing.value = [];
        if (!isControlled.value) inner.value = [];
        emit("update:modelValue", []);
        emit("change", [], []);
      }
      function onKeydown(e) {
        if (e.key === "Escape") {
          close();
          return;
        }
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          if (!open.value) toggleOpen();
        }
      }
      useDismiss([rootEl, panelEl], close, open);
      useOverlayLayer(open, panelEl, () => {
        close();
        return true;
      });
      const style = computed(() => ({
        top: pos.value.top + "px",
        left: pos.value.left + "px",
        maxHeight: props.maxHeight + "px"
      }));
      watch(open, async (v) => {
        if (v) {
          await nextTick();
        }
      });
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          Fragment,
          null,
          [
            createElementVNode("div", {
              ref_key: "rootEl",
              ref: rootEl,
              class: normalizeClass(["wd-cascader", [`wd-cascader--${__props.size}`, { "is-open": open.value, "is-disabled": __props.disabled }]]),
              tabindex: __props.disabled ? -1 : 0,
              role: "combobox",
              "aria-expanded": open.value,
              "aria-haspopup": "listbox",
              onClick: toggleOpen,
              onKeydown
            }, [
              createElementVNode(
                "span",
                {
                  class: normalizeClass(["wd-cascader__value", { "is-placeholder": !displayText.value }])
                },
                toDisplayString(displayText.value || __props.placeholder),
                3
                /* TEXT, CLASS */
              ),
              createCommentVNode(" \u6E05\u7A7A\uFF1A\u53EA\u5728\u6709\u503C\u65F6\u51FA\u73B0\uFF0C\u4E14\u4E0D\u89E6\u53D1\u9762\u677F\u5F00\u5173 "),
              __props.clearable && displayText.value && !__props.disabled ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: "wd-cascader__clear",
                role: "button",
                "aria-label": "\u6E05\u7A7A",
                onClick: clear
              }, [
                createVNode(_component_wd_icon, {
                  name: "close",
                  size: 13
                })
              ])) : createCommentVNode("v-if", true),
              createVNode(_component_wd_icon, {
                class: normalizeClass(["wd-cascader__caret", { "is-open": open.value }]),
                name: "chevron-down",
                size: 15
              }, null, 8, ["class"])
            ], 42, _hoisted_118),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              mounted.value ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  ref_key: "panelEl",
                  ref: panelEl,
                  class: normalizeClass(["wd-cascader__panel", { "is-open": open.value }]),
                  style: normalizeStyle(style.value),
                  role: "listbox"
                },
                [
                  createCommentVNode("\n        \u591A\u5217\u5E76\u6392\uFF1A\u6BCF\u4E00\u5C42\u4E00\u5217\u3002\n        \u26A0\uFE0F \u7528 flex \u800C\u4E0D\u662F\u7EDD\u5BF9\u5B9A\u4F4D\u53E0\u52A0 \u2014\u2014 \u5217\u5BBD\u7531\u5185\u5BB9\u51B3\u5B9A\uFF0C\n        \u7EDD\u5BF9\u5B9A\u4F4D\u9700\u8981\u9884\u77E5\u6BCF\u5217\u5BBD\u5EA6\uFF0C\u591A\u8BED\u8A00\u4E0B\u4F1A\u7B97\u9519\u3002\n      "),
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(columns.value, (col, level) => {
                      return openBlock(), createElementBlock("div", {
                        key: level,
                        class: "wd-cascader__column"
                      }, [
                        (openBlock(true), createElementBlock(
                          Fragment,
                          null,
                          renderList(col, (opt) => {
                            return openBlock(), createElementBlock("button", {
                              key: opt.value,
                              type: "button",
                              class: normalizeClass(["wd-cascader__option", {
                                "is-active": pickedAt(level) === opt.value,
                                "is-selected": selected.value[level] === opt.value,
                                "is-disabled": opt.disabled
                              }]),
                              disabled: opt.disabled,
                              role: "option",
                              "aria-selected": selected.value[level] === opt.value,
                              onClick: withModifiers(($event) => pick(level, opt), ["stop"])
                            }, [
                              createElementVNode(
                                "span",
                                _hoisted_313,
                                toDisplayString(opt.label),
                                1
                                /* TEXT */
                              ),
                              opt.children?.length ? (openBlock(), createBlock(_component_wd_icon, {
                                key: 0,
                                class: "wd-cascader__arrow",
                                name: "chevron-right",
                                size: 14
                              })) : selected.value[level] === opt.value ? (openBlock(), createBlock(_component_wd_icon, {
                                key: 1,
                                class: "wd-cascader__check",
                                name: "check",
                                size: 14
                              })) : createCommentVNode("v-if", true)
                            ], 10, _hoisted_215);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        )),
                        col.length === 0 ? (openBlock(), createElementBlock("p", _hoisted_412, "\u6682\u65E0\u9009\u9879")) : createCommentVNode("v-if", true)
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                6
                /* CLASS, STYLE */
              )) : createCommentVNode("v-if", true)
            ]))
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });

  // .demo-build/controllable.ts
  function useControllable(opts) {
    const { modelValue, defaultValue, fallback, onChange } = opts;
    const inst = getCurrentInstance();
    const providedAtSetup = (() => {
      if (opts.isProvided) return null;
      const vp = inst?.vnode?.props;
      if (!vp) return modelValue.value !== void 0;
      return "modelValue" in vp || "model-value" in vp;
    })();
    const controlled = computed(
      () => opts.isProvided ? opts.isProvided() : !!providedAtSetup
    );
    const inner = ref(
      defaultValue?.value !== void 0 ? defaultValue.value : fallback
    );
    const value = computed(() => controlled.value ? modelValue.value : inner.value);
    function set(next) {
      if (!controlled.value) inner.value = next;
      onChange?.(next);
    }
    watch(
      () => modelValue.value,
      (v) => {
        if (controlled.value && v !== void 0) inner.value = v;
      }
    );
    watch(
      () => defaultValue?.value,
      (v) => {
        if (!controlled.value && v !== void 0) inner.value = v;
      }
    );
    return { value, set, controlled, inner };
  }

  // .demo-build/WdCheckbox.ts
  var _hoisted_119 = ["aria-checked", "disabled"];
  var _hoisted_216 = { class: "wd-checkbox__box" };
  var _hoisted_314 = {
    key: 0,
    class: "wd-checkbox__label"
  };
  var WdCheckbox_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdCheckbox" },
    __name: "WdCheckbox",
    props: {
      modelValue: { type: Boolean, required: false },
      defaultValue: { type: Boolean, required: false },
      label: { type: String, required: false, default: "" },
      disabled: { type: Boolean, required: false, default: false }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const { value, set } = useControllable({
        modelValue: computed(() => props.modelValue),
        defaultValue: computed(() => props.defaultValue),
        fallback: false,
        onChange: (v) => {
          emit("update:modelValue", v);
          emit("change", v);
        }
      });
      function toggle() {
        if (!props.disabled) set(!value.value);
      }
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock("button", {
          type: "button",
          role: "checkbox",
          class: normalizeClass(["wd-checkbox", { "wd-checkbox--checked": unref(value), "wd-checkbox--disabled": __props.disabled }]),
          "aria-checked": unref(value),
          disabled: __props.disabled,
          onClick: toggle
        }, [
          createElementVNode("span", _hoisted_216, [
            createVNode(_component_wd_icon, {
              name: "check",
              size: 13
            })
          ]),
          __props.label || _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_314, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(
                toDisplayString(__props.label),
                1
                /* TEXT */
              )
            ])
          ])) : createCommentVNode("v-if", true)
        ], 10, _hoisted_119);
      };
    }
  });

  // .demo-build/WdCollapse.ts
  var _hoisted_120 = { class: "wd-collapse" };
  var _hoisted_217 = ["aria-expanded", "onClick"];
  var _hoisted_315 = { class: "wd-collapse__body" };
  var _hoisted_413 = { class: "wd-collapse__inner" };
  var _hoisted_54 = { class: "wd-collapse__content" };
  var WdCollapse_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdCollapse" },
    __name: "WdCollapse",
    props: {
      modelValue: { type: Array, required: false, default: () => [] },
      items: { type: Array, required: false, default: () => [] },
      accordion: { type: Boolean, required: false, default: false },
      collapsible: { type: Boolean, required: false, default: true }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const openSet = computed(() => new Set(props.modelValue));
      function toggle(i) {
        if (!props.accordion) {
          const next = new Set(props.modelValue);
          if (next.has(i)) next.delete(i);
          else next.add(i);
          emit("update:modelValue", [...next].sort((a, b) => a - b));
          return;
        }
        if (openSet.value.has(i)) {
          emit("update:modelValue", props.collapsible ? [] : [i]);
        } else {
          emit("update:modelValue", [i]);
        }
      }
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock("div", _hoisted_120, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(props.items, (item, i) => {
              return openBlock(), createElementBlock(
                "div",
                {
                  key: i,
                  class: normalizeClass(["wd-collapse__item", { "wd-collapse__item--open": openSet.value.has(i) }])
                },
                [
                  createElementVNode("button", {
                    type: "button",
                    class: "wd-collapse__head",
                    "aria-expanded": openSet.value.has(i),
                    onClick: ($event) => toggle(i)
                  }, [
                    createElementVNode(
                      "span",
                      null,
                      toDisplayString(item.title),
                      1
                      /* TEXT */
                    ),
                    createVNode(_component_wd_icon, {
                      class: normalizeClass(["wd-chevron", { "wd-chevron--open": openSet.value.has(i) }]),
                      name: "chevron-down",
                      size: 15
                    }, null, 8, ["class"])
                  ], 8, _hoisted_217),
                  createElementVNode("div", _hoisted_315, [
                    createElementVNode("div", _hoisted_413, [
                      createElementVNode("div", _hoisted_54, [
                        renderSlot(_ctx.$slots, `item-${i}`, { item }, () => [
                          createTextVNode(
                            toDisplayString(item.content),
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

  // .demo-build/WdColorPicker.ts
  var _hoisted_121 = ["tabindex", "aria-label", "aria-expanded"];
  var _hoisted_218 = {
    key: 0,
    class: "wd-colorpicker__value"
  };
  var _hoisted_316 = { class: "wd-colorpicker__inputs" };
  var _hoisted_414 = { class: "wd-colorpicker__field" };
  var _hoisted_55 = ["value"];
  var _hoisted_64 = { class: "wd-colorpicker__field" };
  var _hoisted_74 = ["value"];
  var _hoisted_84 = { class: "wd-colorpicker__presets" };
  var _hoisted_93 = ["aria-label", "onClick"];
  var WdColorPicker_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdColorPicker" },
    __name: "WdColorPicker",
    props: {
      modelValue: { type: String, required: false, default: void 0 },
      defaultValue: { type: String, required: false, default: "#D62839" },
      presets: { type: Array, required: false, default: () => [
        "#D62839",
        "#E8590C",
        "#F2A93B",
        "#4CAF50",
        "#2E9E8F",
        "#3B82F6",
        "#6366F1",
        "#8B5CF6",
        "#D946A0",
        "#191B1F",
        "#6B7280",
        "#FFFFFF"
      ] },
      editable: { type: Boolean, required: false, default: true },
      size: { type: String, required: false, default: "md" },
      disabled: { type: Boolean, required: false, default: false }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const inner = ref(props.defaultValue);
      const isControlled = computed(() => props.modelValue !== void 0);
      const color = computed(() => {
        const raw = isControlled.value ? props.modelValue : inner.value;
        return normalizeHex(raw) || "#000000";
      });
      function commit(v) {
        const n = normalizeHex(v);
        if (!n) return;
        if (!isControlled.value) inner.value = n;
        emit("update:modelValue", n);
        emit("change", n);
      }
      function normalizeHex(input) {
        if (!input) return null;
        let s = input.trim().replace(/^#/, "");
        if (/^[0-9a-f]{3}$/i.test(s)) {
          s = s.split("").map((c) => c + c).join("");
        }
        if (!/^[0-9a-f]{6}$/i.test(s)) return null;
        return "#" + s.toUpperCase();
      }
      function hexToRgb(hex) {
        const s = hex.replace("#", "");
        return {
          r: parseInt(s.slice(0, 2), 16),
          g: parseInt(s.slice(2, 4), 16),
          b: parseInt(s.slice(4, 6), 16)
        };
      }
      function rgbToHex(r, g, b) {
        const h = (n) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, "0");
        return ("#" + h(r) + h(g) + h(b)).toUpperCase();
      }
      function rgbToHsv(r, g, b) {
        const rn = r / 255, gn = g / 255, bn = b / 255;
        const max = Math.max(rn, gn, bn);
        const min = Math.min(rn, gn, bn);
        const d = max - min;
        let h = 0;
        if (d !== 0) {
          if (max === rn) h = (gn - bn) / d % 6;
          else if (max === gn) h = (bn - rn) / d + 2;
          else h = (rn - gn) / d + 4;
          h *= 60;
          if (h < 0) h += 360;
        }
        return { h, s: max === 0 ? 0 : d / max, v: max };
      }
      function hsvToRgb(h, s, v) {
        const c = v * s;
        const hp = h % 360 / 60;
        const x = c * (1 - Math.abs(hp % 2 - 1));
        let r = 0, g = 0, b = 0;
        if (hp < 1) {
          r = c;
          g = x;
        } else if (hp < 2) {
          r = x;
          g = c;
        } else if (hp < 3) {
          g = c;
          b = x;
        } else if (hp < 4) {
          g = x;
          b = c;
        } else if (hp < 5) {
          r = x;
          b = c;
        } else {
          r = c;
          b = x;
        }
        const m = v - c;
        return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
      }
      const localHsv = ref(null);
      watch(
        () => color.value,
        (v) => {
          const { r, g, b } = hexToRgb(v);
          const next = rgbToHsv(r, g, b);
          const cur = localHsv.value;
          if (!cur || Math.abs(cur.h - next.h) > 0.5 || Math.abs(cur.s - next.s) > 0.01 || Math.abs(cur.v - next.v) > 0.01) {
            localHsv.value = next;
          }
        },
        { immediate: true }
      );
      const hsv = computed(() => localHsv.value ?? { h: 0, s: 0, v: 1 });
      const hexText = ref("");
      watch(
        () => color.value,
        (v) => {
          hexText.value = v;
        },
        { immediate: true }
      );
      const open = ref(false);
      const mounted = ref(false);
      const rootEl = ref(null);
      const panelEl = ref(null);
      const { pos } = useAnchoredPosition(open, rootEl, panelEl, {
        placement: "bottom-start",
        gap: 8
      });
      const panelStyle = computed(() => ({
        top: pos.value.top + "px",
        left: pos.value.left + "px"
      }));
      function toggle() {
        if (props.disabled) return;
        if (open.value) close();
        else {
          mounted.value = true;
          open.value = true;
        }
      }
      function close() {
        open.value = false;
        window.setTimeout(() => {
          if (!open.value) mounted.value = false;
        }, 200);
      }
      useDismiss([rootEl, panelEl], close, open);
      useOverlayLayer(open, panelEl, () => {
        close();
        return true;
      });
      const svEl = ref(null);
      let svDragging = false;
      function updateSv(e) {
        const el = svEl.value;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const s = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        const v = 1 - Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        localHsv.value = { ...hsv.value, s, v };
        const { r: rr, g, b } = hsvToRgb(hsv.value.h, s, v);
        commit(rgbToHex(rr, g, b));
      }
      function onSvDown(e) {
        svDragging = true;
        e.target.setPointerCapture?.(e.pointerId);
        updateSv(e);
      }
      function onSvMove(e) {
        if (svDragging) updateSv(e);
      }
      function onSvUp(e) {
        svDragging = false;
        e.target.releasePointerCapture?.(e.pointerId);
      }
      const hueEl = ref(null);
      let hueDragging = false;
      function updateHue(e) {
        const el = hueEl.value;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const h = Math.min(359.999, Math.max(0, (e.clientX - r.left) / r.width * 360));
        localHsv.value = { ...hsv.value, h };
        const { r: rr, g, b } = hsvToRgb(h, hsv.value.s, hsv.value.v);
        commit(rgbToHex(rr, g, b));
      }
      function onHueDown(e) {
        hueDragging = true;
        e.target.setPointerCapture?.(e.pointerId);
        updateHue(e);
      }
      function onHueMove(e) {
        if (hueDragging) updateHue(e);
      }
      function onHueUp(e) {
        hueDragging = false;
        e.target.releasePointerCapture?.(e.pointerId);
      }
      function onHexInput(e) {
        const raw = e.target.value;
        hexText.value = raw;
        const n = normalizeHex(raw);
        if (n) {
          const { r, g, b } = hexToRgb(n);
          localHsv.value = rgbToHsv(r, g, b);
          commit(n);
        }
      }
      function onHexBlur() {
        hexText.value = color.value;
      }
      const rgbText = computed(() => {
        const { r, g, b } = hexToRgb(color.value);
        return `${r}, ${g}, ${b}`;
      });
      function pickPreset(c) {
        const n = normalizeHex(c);
        if (!n) return;
        const { r, g, b } = hexToRgb(n);
        localHsv.value = rgbToHsv(r, g, b);
        commit(n);
      }
      const pureHue = computed(() => {
        const { r, g, b } = hsvToRgb(hsv.value.h, 1, 1);
        return rgbToHex(r, g, b);
      });
      const knobs = computed(() => ({
        svLeft: `${hsv.value.s * 100}%`,
        svTop: `${(1 - hsv.value.v) * 100}%`,
        hueLeft: `${hsv.value.h / 360 * 100}%`
      }));
      const sizePx = computed(() => ({ sm: 28, md: 34, lg: 42 })[props.size]);
      function onKeydown(e) {
        if (e.key === "Escape") close();
        else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          Fragment,
          null,
          [
            createElementVNode("div", {
              ref_key: "rootEl",
              ref: rootEl,
              class: normalizeClass(["wd-colorpicker", [`wd-colorpicker--${__props.size}`, { "is-open": open.value, "is-disabled": __props.disabled }]]),
              tabindex: __props.disabled ? -1 : 0,
              role: "button",
              "aria-label": `\u989C\u8272 ${color.value}`,
              "aria-expanded": open.value,
              onClick: toggle,
              onKeydown
            }, [
              createElementVNode(
                "span",
                {
                  class: "wd-colorpicker__swatch",
                  style: normalizeStyle({ background: color.value, width: sizePx.value + "px", height: sizePx.value + "px" })
                },
                [
                  createCommentVNode(" \u6D45\u8272\u7CFB\u7684\u8272\u5757\u5728\u767D\u5E95\u4E0A\u770B\u4E0D\u6E05\u8FB9\u754C\uFF0C\u52A0\u4E00\u5708\u5185\u63CF\u8FB9\u538B\u4F4F "),
                  _cache[0] || (_cache[0] = createElementVNode(
                    "span",
                    { class: "wd-colorpicker__swatch-inner" },
                    null,
                    -1
                    /* CACHED */
                  ))
                ],
                4
                /* STYLE */
              ),
              __props.editable ? (openBlock(), createElementBlock(
                "span",
                _hoisted_218,
                toDisplayString(color.value),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true),
              createVNode(_component_wd_icon, {
                class: "wd-colorpicker__caret",
                name: "chevron-down",
                size: 14
              })
            ], 42, _hoisted_121),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              mounted.value ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  ref_key: "panelEl",
                  ref: panelEl,
                  class: normalizeClass(["wd-colorpicker__panel", { "is-open": open.value }]),
                  style: normalizeStyle(panelStyle.value),
                  role: "dialog",
                  "aria-label": "\u9009\u62E9\u989C\u8272"
                },
                [
                  createCommentVNode(" \u9971\u548C\u5EA6/\u660E\u5EA6\u9762\u677F\uFF1A\u767D\u2192\u8272\u76F8\u3001\u900F\u660E\u2192\u9ED1 \u4E24\u5C42\u6E10\u53D8\u53E0\u52A0 "),
                  createElementVNode(
                    "div",
                    {
                      ref_key: "svEl",
                      ref: svEl,
                      class: "wd-colorpicker__sv",
                      style: normalizeStyle({ background: pureHue.value }),
                      onPointerdown: onSvDown,
                      onPointermove: onSvMove,
                      onPointerup: onSvUp,
                      onPointercancel: onSvUp
                    },
                    [
                      _cache[1] || (_cache[1] = createElementVNode(
                        "span",
                        { class: "wd-colorpicker__sv-white" },
                        null,
                        -1
                        /* CACHED */
                      )),
                      _cache[2] || (_cache[2] = createElementVNode(
                        "span",
                        { class: "wd-colorpicker__sv-black" },
                        null,
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "span",
                        {
                          class: "wd-colorpicker__knob",
                          style: normalizeStyle({ left: knobs.value.svLeft, top: knobs.value.svTop })
                        },
                        null,
                        4
                        /* STYLE */
                      )
                    ],
                    36
                    /* STYLE, NEED_HYDRATION */
                  ),
                  createCommentVNode(" \u8272\u76F8\u6761 "),
                  createElementVNode(
                    "div",
                    {
                      ref_key: "hueEl",
                      ref: hueEl,
                      class: "wd-colorpicker__hue",
                      onPointerdown: onHueDown,
                      onPointermove: onHueMove,
                      onPointerup: onHueUp,
                      onPointercancel: onHueUp
                    },
                    [
                      createElementVNode(
                        "span",
                        {
                          class: "wd-colorpicker__knob wd-colorpicker__knob--hue",
                          style: normalizeStyle({ left: knobs.value.hueLeft })
                        },
                        null,
                        4
                        /* STYLE */
                      )
                    ],
                    544
                    /* NEED_HYDRATION, NEED_PATCH */
                  ),
                  createCommentVNode(" \u8272\u503C\u8F93\u5165 "),
                  createElementVNode("div", _hoisted_316, [
                    createElementVNode("label", _hoisted_414, [
                      _cache[3] || (_cache[3] = createElementVNode(
                        "span",
                        null,
                        "HEX",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode("input", {
                        value: hexText.value,
                        maxlength: "7",
                        spellcheck: "false",
                        onInput: onHexInput,
                        onBlur: onHexBlur
                      }, null, 40, _hoisted_55)
                    ]),
                    createElementVNode("label", _hoisted_64, [
                      _cache[4] || (_cache[4] = createElementVNode(
                        "span",
                        null,
                        "RGB",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode("input", {
                        value: rgbText.value,
                        readonly: ""
                      }, null, 8, _hoisted_74)
                    ])
                  ]),
                  createCommentVNode(" \u9884\u8BBE "),
                  createElementVNode("div", _hoisted_84, [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(__props.presets, (c) => {
                        return openBlock(), createElementBlock("button", {
                          key: c,
                          type: "button",
                          class: normalizeClass(["wd-colorpicker__preset", { "is-active": normalizeHex(c) === color.value }]),
                          style: normalizeStyle({ background: c }),
                          "aria-label": c,
                          onClick: ($event) => pickPreset(c)
                        }, null, 14, _hoisted_93);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ],
                6
                /* CLASS, STYLE */
              )) : createCommentVNode("v-if", true)
            ]))
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });

  // .demo-build/WdCommand.ts
  var _hoisted_123 = {
    key: 0,
    class: "wd-command",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "\u547D\u4EE4\u9762\u677F"
  };
  var _hoisted_219 = { class: "wd-command__input-row" };
  var _hoisted_317 = ["placeholder"];
  var _hoisted_415 = {
    key: 0,
    class: "wd-command__group"
  };
  var _hoisted_56 = ["data-idx", "disabled", "onClick", "onMousemove"];
  var _hoisted_65 = {
    key: 0,
    class: "wd-command__item-icon"
  };
  var _hoisted_75 = { class: "wd-command__item-main" };
  var _hoisted_85 = { class: "wd-command__item-label" };
  var _hoisted_94 = {
    key: 0,
    class: "wd-command__item-hint"
  };
  var _hoisted_103 = {
    key: 1,
    class: "wd-command__item-shortcut"
  };
  var _hoisted_1110 = {
    key: 0,
    class: "wd-command__empty"
  };
  var WdCommand_default = /* @__PURE__ */ defineComponent({
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
      const q = ref("");
      const activeIdx = ref(0);
      const inputEl = ref(null);
      const listEl = ref(null);
      function score(item, needle) {
        const low = needle.toLowerCase();
        const label = item.label.toLowerCase();
        if (label.startsWith(low)) return 0;
        if (label.includes(low)) return 1;
        if (item.hint?.toLowerCase().includes(low)) return 2;
        if (item.keywords?.some((k) => k.toLowerCase().includes(low))) return 3;
        return -1;
      }
      const filtered = computed(() => {
        const needle = q.value.trim();
        if (!needle) return props.items;
        return props.items.map((it) => ({ it, s: score(it, needle) })).filter((x) => x.s >= 0).sort((a, b) => a.s - b.s).map((x) => x.it);
      });
      const groups = computed(() => {
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
      const flatFiltered = computed(() => filtered.value.filter((i) => !i.disabled));
      watch(filtered, () => {
        activeIdx.value = 0;
      });
      watch(q, (v) => emit("search", v));
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
      onMounted(() => {
        window.addEventListener("keydown", onGlobalKey);
      });
      onBeforeUnmount(() => {
        window.removeEventListener("keydown", onGlobalKey);
      });
      watch(
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
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createBlock(Teleport, { to: "body" }, [
          __props.modelValue ? (openBlock(), createElementBlock("div", _hoisted_123, [
            createElementVNode("div", {
              class: "wd-command__mask",
              onClick: close
            }),
            createElementVNode(
              "div",
              {
                class: "wd-command__panel",
                style: normalizeStyle({ maxHeight: __props.maxHeight + "px" })
              },
              [
                createElementVNode("div", _hoisted_219, [
                  createVNode(_component_wd_icon, {
                    class: "wd-command__search-icon",
                    name: "search",
                    size: 16
                  }),
                  withDirectives(createElementVNode("input", {
                    ref_key: "inputEl",
                    ref: inputEl,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => q.value = $event),
                    class: "wd-command__input",
                    placeholder: __props.placeholder,
                    type: "text",
                    spellcheck: "false",
                    autocomplete: "off",
                    onKeydown: onKey
                  }, null, 40, _hoisted_317), [
                    [vModelText, q.value]
                  ]),
                  _cache[1] || (_cache[1] = createElementVNode(
                    "kbd",
                    { class: "wd-command__esc" },
                    "ESC",
                    -1
                    /* CACHED */
                  ))
                ]),
                createElementVNode(
                  "div",
                  {
                    ref_key: "listEl",
                    ref: listEl,
                    class: "wd-command__list"
                  },
                  [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(groups.value, (g) => {
                        return openBlock(), createElementBlock(
                          Fragment,
                          {
                            key: g.name
                          },
                          [
                            g.name ? (openBlock(), createElementBlock(
                              "div",
                              _hoisted_415,
                              toDisplayString(g.name),
                              1
                              /* TEXT */
                            )) : createCommentVNode("v-if", true),
                            (openBlock(true), createElementBlock(
                              Fragment,
                              null,
                              renderList(g.items, (it) => {
                                return openBlock(), createElementBlock("button", {
                                  key: it.key,
                                  type: "button",
                                  class: normalizeClass(["wd-command__item", {
                                    "wd-command__item--active": idxOf(it) === activeIdx.value,
                                    "wd-command__item--disabled": it.disabled
                                  }]),
                                  "data-idx": idxOf(it),
                                  disabled: it.disabled,
                                  onClick: ($event) => choose(it),
                                  onMousemove: ($event) => !it.disabled && (activeIdx.value = idxOf(it))
                                }, [
                                  it.icon || _ctx.$slots.icon ? (openBlock(), createElementBlock("span", _hoisted_65, [
                                    renderSlot(_ctx.$slots, "icon", { item: it }, () => [
                                      createVNode(_component_wd_icon, {
                                        name: it.icon,
                                        size: 16
                                      }, null, 8, ["name"])
                                    ])
                                  ])) : createCommentVNode("v-if", true),
                                  createElementVNode("span", _hoisted_75, [
                                    createElementVNode(
                                      "span",
                                      _hoisted_85,
                                      toDisplayString(it.label),
                                      1
                                      /* TEXT */
                                    ),
                                    it.hint ? (openBlock(), createElementBlock(
                                      "span",
                                      _hoisted_94,
                                      toDisplayString(it.hint),
                                      1
                                      /* TEXT */
                                    )) : createCommentVNode("v-if", true)
                                  ]),
                                  it.shortcut ? (openBlock(), createElementBlock(
                                    "kbd",
                                    _hoisted_103,
                                    toDisplayString(it.shortcut),
                                    1
                                    /* TEXT */
                                  )) : createCommentVNode("v-if", true)
                                ], 42, _hoisted_56);
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
                    !filtered.value.length ? (openBlock(), createElementBlock(
                      "div",
                      _hoisted_1110,
                      toDisplayString(__props.emptyText),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true)
                  ],
                  512
                  /* NEED_PATCH */
                ),
                _cache[2] || (_cache[2] = createElementVNode(
                  "div",
                  { class: "wd-command__footer" },
                  [
                    createElementVNode("span", null, [
                      createElementVNode("kbd", null, "\u2191"),
                      createElementVNode("kbd", null, "\u2193"),
                      createTextVNode(" \u9009\u62E9")
                    ]),
                    createElementVNode("span", null, [
                      createElementVNode("kbd", null, "\u21B5"),
                      createTextVNode(" \u786E\u8BA4")
                    ]),
                    createElementVNode("span", null, [
                      createElementVNode("kbd", null, "esc"),
                      createTextVNode(" \u5173\u95ED")
                    ])
                  ],
                  -1
                  /* CACHED */
                ))
              ],
              4
              /* STYLE */
            )
          ])) : createCommentVNode("v-if", true)
        ]);
      };
    }
  });

  // .demo-build/WdContainer.ts
  var WdContainer_default = /* @__PURE__ */ defineComponent({
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
        return openBlock(), createElementBlock(
          "div",
          {
            class: "wd-container",
            style: normalizeStyle({
              maxWidth: __props.maxWidth,
              paddingInline: PAD_X[props.pad],
              paddingBlock: PAD_Y[props.pad]
            })
          },
          [
            renderSlot(_ctx.$slots, "default")
          ],
          4
          /* STYLE */
        );
      };
    }
  });

  // .demo-build/pop-duration.ts
  var reduce = () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function popDuration(enter = 200, leave = 140) {
    return reduce() ? { enter: 1, leave: 1 } : { enter, leave };
  }

  // .demo-build/WdDatePicker.ts
  var _hoisted_124 = ["disabled"];
  var _hoisted_220 = {
    key: 0,
    class: "wd-datepicker__value"
  };
  var _hoisted_318 = {
    key: 1,
    class: "wd-datepicker__placeholder"
  };
  var _hoisted_416 = { class: "wd-datepicker__head" };
  var _hoisted_57 = { class: "wd-datepicker__month" };
  var _hoisted_66 = { class: "wd-datepicker__nav" };
  var _hoisted_76 = { class: "wd-datepicker__week" };
  var _hoisted_86 = { class: "wd-datepicker__grid" };
  var _hoisted_95 = ["onClick"];
  var WdDatePicker_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdDatePicker" },
    __name: "WdDatePicker",
    props: {
      modelValue: { type: String, required: false, default: "" },
      placeholder: { type: String, required: false, default: "\u9009\u62E9\u65E5\u671F" },
      disabled: { type: Boolean, required: false, default: false },
      size: { type: String, required: false, default: "md" }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const POP_DURATION = popDuration();
      const props = __props;
      const emit = __emit;
      const open = ref(false);
      const root = ref();
      const panelEl = ref(null);
      useDismiss([root], () => {
        open.value = false;
      }, open);
      const { pos } = useAnchoredPosition(open, root, panelEl, {
        placement: "bottom-start",
        gap: 8,
        width: 302
      });
      useOverlayLayer(open, root, () => {
        open.value = false;
        return true;
      });
      const view = ref(new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1));
      const WEEK = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"];
      function pad(n) {
        return n < 10 ? `0${n}` : `${n}`;
      }
      function fmt(d) {
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
      }
      const monthLabel = computed(() => `${view.value.getFullYear()} \u5E74 ${view.value.getMonth() + 1} \u6708`);
      const days = computed(() => {
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
      function onKey(e) {
      }
      onMounted(() => {
        document.addEventListener("keydown", onKey);
      });
      onBeforeUnmount(() => {
        document.removeEventListener("keydown", onKey);
      });
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          Fragment,
          null,
          [
            createElementVNode(
              "div",
              {
                ref_key: "root",
                ref: root,
                class: normalizeClass(["wd-datepicker", { "wd-datepicker--open": open.value }])
              },
              [
                createElementVNode("button", {
                  type: "button",
                  class: "wd-datepicker__trigger",
                  disabled: __props.disabled,
                  onClick: toggle
                }, [
                  __props.modelValue ? (openBlock(), createElementBlock(
                    "span",
                    _hoisted_220,
                    toDisplayString(__props.modelValue),
                    1
                    /* TEXT */
                  )) : (openBlock(), createElementBlock(
                    "span",
                    _hoisted_318,
                    toDisplayString(__props.placeholder),
                    1
                    /* TEXT */
                  )),
                  createVNode(_component_wd_icon, {
                    class: "wd-datepicker__icon",
                    name: "calendar",
                    size: 15
                  })
                ], 8, _hoisted_124)
              ],
              2
              /* CLASS */
            ),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              createElementVNode(
                "div",
                {
                  ref_key: "panelEl",
                  ref: panelEl,
                  class: normalizeClass(["wd-datepicker__panel", { "is-open": open.value }]),
                  style: normalizeStyle({ top: unref(pos).top + "px", left: unref(pos).left + "px" })
                },
                [
                  createElementVNode("div", _hoisted_416, [
                    createElementVNode(
                      "span",
                      _hoisted_57,
                      toDisplayString(monthLabel.value),
                      1
                      /* TEXT */
                    ),
                    createElementVNode("span", _hoisted_66, [
                      createElementVNode("button", {
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--sm",
                        "aria-label": "\u4E0A\u4E2A\u6708",
                        onClick: prevMonth
                      }, [
                        createVNode(_component_wd_icon, {
                          name: "chevron-left",
                          size: 14
                        })
                      ]),
                      createElementVNode("button", {
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--sm",
                        "aria-label": "\u4E0B\u4E2A\u6708",
                        onClick: nextMonth
                      }, [
                        createVNode(_component_wd_icon, {
                          name: "chevron-right",
                          size: 14
                        })
                      ])
                    ])
                  ]),
                  createElementVNode("div", _hoisted_76, [
                    (openBlock(), createElementBlock(
                      Fragment,
                      null,
                      renderList(WEEK, (w) => {
                        return createElementVNode(
                          "span",
                          { key: w },
                          toDisplayString(w),
                          1
                          /* TEXT */
                        );
                      }),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ]),
                  createElementVNode("div", _hoisted_86, [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(days.value, (d) => {
                        return openBlock(), createElementBlock("button", {
                          key: d.key,
                          type: "button",
                          class: normalizeClass(["wd-datepicker__day", {
                            "wd-datepicker__day--muted": d.muted,
                            "wd-datepicker__day--today": d.today,
                            "wd-datepicker__day--selected": d.selected
                          }]),
                          onClick: ($event) => pick(d.key)
                        }, toDisplayString(d.label), 11, _hoisted_95);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  createElementVNode("div", { class: "wd-datepicker__foot" }, [
                    createElementVNode("button", {
                      type: "button",
                      class: "wd-datepicker__todaybtn",
                      onClick: pickToday
                    }, "\u56DE\u5230\u4ECA\u5929")
                  ])
                ],
                6
                /* CLASS, STYLE */
              )
            ]))
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });

  // .demo-build/WdDescriptions.ts
  var _hoisted_125 = { class: "wd-descriptions__label" };
  var _hoisted_221 = {
    key: 0,
    class: "wd-descriptions__colon"
  };
  var _hoisted_319 = { class: "wd-descriptions__value" };
  var _hoisted_417 = {
    key: 0,
    class: "wd-descriptions__hint"
  };
  var _hoisted_58 = {
    key: 0,
    class: "wd-descriptions__empty"
  };
  var WdDescriptions_default = /* @__PURE__ */ defineComponent({
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
      const rows = computed(() => {
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
      const styleVars = computed(() => ({ "--wd-desc-cols": String(Math.max(1, props.columns)) }));
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(["wd-descriptions", {
              "wd-descriptions--vertical": __props.vertical,
              "wd-descriptions--striped": __props.striped,
              [`wd-descriptions--${__props.size}`]: true
            }]),
            style: normalizeStyle(styleVars.value)
          },
          [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(rows.value, (row, ri) => {
                return openBlock(), createElementBlock("div", {
                  key: ri,
                  class: "wd-descriptions__row"
                }, [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(row, (item, ci) => {
                      return openBlock(), createElementBlock(
                        "div",
                        {
                          key: ci,
                          class: "wd-descriptions__item",
                          style: normalizeStyle({ "--wd-desc-span": String(item.span || 1) })
                        },
                        [
                          createElementVNode("div", _hoisted_125, [
                            createTextVNode(
                              toDisplayString(item.label),
                              1
                              /* TEXT */
                            ),
                            __props.colon ? (openBlock(), createElementBlock("span", _hoisted_221, "\uFF1A")) : createCommentVNode("v-if", true)
                          ]),
                          createElementVNode("div", _hoisted_319, [
                            renderSlot(_ctx.$slots, item.key || "", {
                              item,
                              value: item.value
                            }, () => [
                              createTextVNode(
                                toDisplayString(item.value ?? "\u2014"),
                                1
                                /* TEXT */
                              )
                            ]),
                            item.hint ? (openBlock(), createElementBlock(
                              "span",
                              _hoisted_417,
                              toDisplayString(item.hint),
                              1
                              /* TEXT */
                            )) : createCommentVNode("v-if", true)
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
            !__props.items.length ? (openBlock(), createElementBlock("div", _hoisted_58, [
              renderSlot(_ctx.$slots, "empty", {}, () => [
                _cache[0] || (_cache[0] = createTextVNode(
                  "\u2014",
                  -1
                  /* CACHED */
                ))
              ])
            ])) : createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        );
      };
    }
  });

  // .demo-build/WdDivider.ts
  var _hoisted_126 = {
    key: 0,
    class: "wd-divider__text"
  };
  var WdDivider_default = /* @__PURE__ */ defineComponent({
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
      const isHorizontal = computed(() => props.direction === "horizontal");
      const classes = computed(() => [
        "wd-divider",
        `wd-divider--${props.direction}`,
        // ← 之前漏了这个，水平线的 ::before 规则因此从未命中
        `wd-divider--${props.variant}`,
        ...isHorizontal.value ? [`wd-divider--${props.align}`] : []
      ]);
      const style = computed(
        () => isHorizontal.value ? { marginTop: `${props.spacing}px`, marginBottom: `${props.spacing}px` } : { marginLeft: `${props.spacing / 2}px`, marginRight: `${props.spacing / 2}px` }
      );
      return (_ctx, _cache) => {
        return isHorizontal.value ? (openBlock(), createElementBlock(
          "div",
          {
            key: 0,
            class: normalizeClass(classes.value),
            style: normalizeStyle(style.value),
            role: "separator",
            "aria-orientation": "horizontal"
          },
          [
            _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_126, [
              renderSlot(_ctx.$slots, "default")
            ])) : createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )) : (openBlock(), createElementBlock(
          "span",
          {
            key: 1,
            class: normalizeClass(classes.value),
            style: normalizeStyle(style.value),
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

  // .demo-build/overlay.ts
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
    watch(open, apply, { immediate: true });
    onBeforeUnmount(() => {
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
    watch(open, async (v) => {
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
    onBeforeUnmount(() => {
      document.removeEventListener("keydown", onKeydown, true);
      if (restoreTo && document.contains(restoreTo)) restoreTo.focus();
    });
  }

  // .demo-build/WdDrawer.ts
  var _hoisted_127 = { class: "wd-drawer__head" };
  var _hoisted_223 = { class: "wd-drawer__title" };
  var _hoisted_320 = { class: "wd-drawer__body" };
  var _hoisted_418 = {
    key: 0,
    class: "wd-drawer__foot"
  };
  var WdDrawer_default = /* @__PURE__ */ defineComponent({
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
      const classes = computed(() => ["wd-drawer", props.side === "left" ? "wd-drawer--left" : ""]);
      const panel = ref(null);
      const mounted = ref(false);
      watchEffect(() => {
        if (props.modelValue) mounted.value = true;
      });
      const openRef = toRef(props, "modelValue");
      const myZ = ref(0);
      watchEffect(() => {
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
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createBlock(Teleport, { to: "body" }, [
          createCommentVNode(" \u540C Modal\uFF1A\u663E\u9690\u7531 .is-open + display \u4FDD\u8BC1\uFF0C\u4E0D\u4F9D\u8D56 Transition \u7684\u65F6\u5E8F "),
          withDirectives(createElementVNode(
            "div",
            {
              class: normalizeClass([classes.value, { "is-open": __props.modelValue }]),
              role: "dialog",
              "aria-modal": "true",
              style: normalizeStyle({ zIndex: myZ.value })
            },
            [
              createElementVNode("div", {
                class: "wd-drawer__mask",
                onClick: _cache[0] || (_cache[0] = ($event) => __props.closeOnMask && close())
              }),
              createElementVNode(
                "div",
                {
                  ref_key: "panel",
                  ref: panel,
                  class: "wd-drawer__panel",
                  tabindex: "-1"
                },
                [
                  createElementVNode("div", _hoisted_127, [
                    createElementVNode(
                      "div",
                      _hoisted_223,
                      toDisplayString(__props.title),
                      1
                      /* TEXT */
                    ),
                    createElementVNode("button", {
                      type: "button",
                      class: "wd-icon-btn",
                      "aria-label": "\u5173\u95ED",
                      onClick: close
                    }, [
                      createVNode(_component_wd_icon, {
                        name: "close",
                        size: 15
                      })
                    ])
                  ]),
                  createElementVNode("div", _hoisted_320, [
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_418, [
                    renderSlot(_ctx.$slots, "footer")
                  ])) : createCommentVNode("v-if", true)
                ],
                512
                /* NEED_PATCH */
              )
            ],
            6
            /* CLASS, STYLE */
          ), [
            [vShow, mounted.value]
          ])
        ]);
      };
    }
  });

  // .demo-build/WdDropdown.ts
  var _hoisted_128 = ["aria-expanded"];
  var _hoisted_224 = ["onClick"];
  var WdDropdown_default = /* @__PURE__ */ defineComponent({
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
      const open = ref(false);
      const root = ref();
      const triggerEl = ref(null);
      const menuEl = ref(null);
      useDismiss([root], () => {
        open.value = false;
      }, open);
      const { pos } = useAnchoredPosition(open, triggerEl, menuEl, {
        placement: "bottom-start",
        gap: 6,
        matchWidth: false
      });
      useOverlayLayer(open, root, () => {
        open.value = false;
        return true;
      });
      function pick(item) {
        if (item.disabled) return;
        emit("select", item.value);
        open.value = false;
      }
      function onKey(e) {
      }
      onMounted(() => {
        document.addEventListener("keydown", onKey);
      });
      onBeforeUnmount(() => {
        document.removeEventListener("keydown", onKey);
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          Fragment,
          null,
          [
            createElementVNode(
              "span",
              {
                ref_key: "root",
                ref: root,
                class: "wd-dropdown"
              },
              [
                createElementVNode("span", {
                  ref_key: "triggerEl",
                  ref: triggerEl,
                  class: "wd-dropdown__trigger",
                  role: "button",
                  tabindex: "0",
                  "aria-haspopup": true,
                  "aria-expanded": open.value,
                  onKeydown: [
                    _cache[0] || (_cache[0] = withKeys(withModifiers(($event) => open.value = !open.value, ["prevent"]), ["enter"])),
                    _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => open.value = !open.value, ["prevent"]), ["space"]))
                  ],
                  onClick: _cache[2] || (_cache[2] = ($event) => open.value = !open.value)
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 40, _hoisted_128)
              ],
              512
              /* NEED_PATCH */
            ),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              createElementVNode(
                "div",
                {
                  ref_key: "menuEl",
                  ref: menuEl,
                  class: normalizeClass(["wd-dropdown__menu", { "is-open": open.value }]),
                  style: normalizeStyle({ top: unref(pos).top + "px", left: unref(pos).left + "px" }),
                  role: "menu"
                },
                [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(props.items, (it) => {
                      return openBlock(), createElementBlock("button", {
                        key: it.value,
                        type: "button",
                        role: "menuitem",
                        class: normalizeClass(["wd-dropdown__item", { "wd-dropdown__item--danger": it.danger, "wd-dropdown__item--disabled": it.disabled }]),
                        "data-wd-hover": "",
                        onClick: ($event) => pick(it)
                      }, toDisplayString(it.label), 11, _hoisted_224);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                6
                /* CLASS, STYLE */
              )
            ]))
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });

  // .demo-build/WdEmpty.ts
  var _hoisted_129 = { class: "wd-empty" };
  var _hoisted_225 = { class: "wd-empty__icon" };
  var _hoisted_321 = {
    key: 0,
    class: "wd-empty__title"
  };
  var _hoisted_419 = {
    key: 1,
    class: "wd-empty__desc"
  };
  var _hoisted_59 = {
    key: 2,
    class: "wd-empty__action"
  };
  var WdEmpty_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdEmpty" },
    __name: "WdEmpty",
    props: {
      title: { type: String, required: false, default: "\u6682\u65E0\u6570\u636E" },
      description: { type: String, required: false, default: "" }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock("div", _hoisted_129, [
          createElementVNode("div", _hoisted_225, [
            renderSlot(_ctx.$slots, "icon", {}, () => [
              createVNode(_component_wd_icon, {
                name: "folder-open",
                size: 30,
                style: { "opacity": ".5" }
              })
            ])
          ]),
          __props.title ? (openBlock(), createElementBlock(
            "div",
            _hoisted_321,
            toDisplayString(__props.title),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true),
          __props.description || _ctx.$slots.description ? (openBlock(), createElementBlock("div", _hoisted_419, [
            renderSlot(_ctx.$slots, "description", {}, () => [
              createTextVNode(
                toDisplayString(__props.description),
                1
                /* TEXT */
              )
            ])
          ])) : createCommentVNode("v-if", true),
          _ctx.$slots.action ? (openBlock(), createElementBlock("div", _hoisted_59, [
            renderSlot(_ctx.$slots, "action")
          ])) : createCommentVNode("v-if", true)
        ]);
      };
    }
  });

  // .demo-build/WdExplorer.ts
  var _hoisted_130 = { class: "wd-explorer" };
  var _hoisted_226 = { class: "wd-explorer__side" };
  var _hoisted_323 = ["onClick"];
  var _hoisted_420 = { class: "wd-explorer__folder-name" };
  var _hoisted_510 = { class: "wd-explorer__count" };
  var _hoisted_67 = { class: "wd-explorer__main" };
  var _hoisted_77 = { class: "wd-explorer__bar" };
  var _hoisted_87 = { class: "wd-explorer__path" };
  var _hoisted_96 = { class: "wd-explorer__crumb wd-explorer__crumb--cur" };
  var _hoisted_104 = { class: "wd-explorer__views" };
  var _hoisted_1111 = {
    key: 0,
    class: "wd-explorer__table"
  };
  var _hoisted_1210 = ["onClick"];
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
  var _hoisted_2110 = { class: "wd-explorer__tile-name" };
  var _hoisted_227 = { class: "wd-explorer__tile-size" };
  var _hoisted_233 = {
    key: 2,
    class: "wd-explorer__empty"
  };
  var WdExplorer_default = /* @__PURE__ */ defineComponent({
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
      const active = ref(0);
      const mode = ref(props.view);
      const current = computed(() => props.folders[active.value] || { name: "", files: [] });
      function fmtSize(n) {
        if (!n) return "\u2014";
        if (n < 1024) return `${n} B`;
        if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
        return `${(n / 1048576).toFixed(1)} MB`;
      }
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock("div", _hoisted_130, [
          createElementVNode("div", _hoisted_226, [
            _cache[3] || (_cache[3] = createElementVNode(
              "div",
              { class: "wd-explorer__side-title" },
              "\u6587\u4EF6\u5939",
              -1
              /* CACHED */
            )),
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(__props.folders, (f, i) => {
                return openBlock(), createElementBlock("button", {
                  key: i,
                  type: "button",
                  class: normalizeClass(["wd-explorer__folder", { "wd-explorer__folder--active": i === active.value }]),
                  onClick: ($event) => active.value = i
                }, [
                  createVNode(_component_wd_icon, {
                    name: "folder",
                    size: 15
                  }),
                  createElementVNode(
                    "span",
                    _hoisted_420,
                    toDisplayString(f.name),
                    1
                    /* TEXT */
                  ),
                  createElementVNode(
                    "span",
                    _hoisted_510,
                    toDisplayString(f.files.length),
                    1
                    /* TEXT */
                  )
                ], 10, _hoisted_323);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          createElementVNode("div", _hoisted_67, [
            createElementVNode("div", _hoisted_77, [
              createElementVNode("div", _hoisted_87, [
                createElementVNode("span", {
                  class: "wd-explorer__crumb",
                  onClick: _cache[0] || (_cache[0] = ($event) => active.value = 0)
                }, "\u5168\u90E8\u6587\u4EF6"),
                _cache[4] || (_cache[4] = createElementVNode(
                  "span",
                  { class: "wd-explorer__sep" },
                  "/",
                  -1
                  /* CACHED */
                )),
                createElementVNode(
                  "span",
                  _hoisted_96,
                  toDisplayString(current.value.name),
                  1
                  /* TEXT */
                )
              ]),
              createElementVNode("div", _hoisted_104, [
                createElementVNode(
                  "button",
                  {
                    type: "button",
                    class: normalizeClass(["wd-explorer__view-btn", { "wd-explorer__view-btn--active": mode.value === "details" }]),
                    title: "\u8BE6\u60C5",
                    onClick: _cache[1] || (_cache[1] = ($event) => mode.value = "details")
                  },
                  [
                    createVNode(_component_wd_icon, {
                      name: "search",
                      size: 15
                    })
                  ],
                  2
                  /* CLASS */
                ),
                createElementVNode(
                  "button",
                  {
                    type: "button",
                    class: normalizeClass(["wd-explorer__view-btn", { "wd-explorer__view-btn--active": mode.value === "icons" }]),
                    title: "\u56FE\u6807",
                    onClick: _cache[2] || (_cache[2] = ($event) => mode.value = "icons")
                  },
                  [
                    createVNode(_component_wd_icon, {
                      name: "layout-grid",
                      size: 15
                    })
                  ],
                  2
                  /* CLASS */
                )
              ])
            ]),
            mode.value === "details" ? (openBlock(), createElementBlock("table", _hoisted_1111, [
              _cache[5] || (_cache[5] = createElementVNode(
                "colgroup",
                null,
                [
                  createElementVNode("col"),
                  createElementVNode("col", { style: { "width": "96px" } }),
                  createElementVNode("col", { style: { "width": "118px" } })
                ],
                -1
                /* CACHED */
              )),
              _cache[6] || (_cache[6] = createElementVNode(
                "thead",
                null,
                [
                  createElementVNode("tr", null, [
                    createElementVNode("th", null, "\u540D\u79F0"),
                    createElementVNode("th", { class: "is-num" }, "\u5927\u5C0F"),
                    createElementVNode("th", { class: "is-num" }, "\u4FEE\u6539\u65F6\u95F4")
                  ])
                ],
                -1
                /* CACHED */
              )),
              createElementVNode("tbody", null, [
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(current.value.files, (f, i) => {
                    return openBlock(), createElementBlock("tr", {
                      key: i,
                      onClick: ($event) => emit("select", f)
                    }, [
                      createElementVNode("td", null, [
                        createElementVNode("span", _hoisted_133, [
                          createElementVNode("span", _hoisted_143, [
                            createVNode(_component_wd_icon, {
                              name: "file",
                              size: 15
                            })
                          ]),
                          createElementVNode(
                            "span",
                            _hoisted_152,
                            toDisplayString(f.name),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      createElementVNode(
                        "td",
                        _hoisted_162,
                        toDisplayString(fmtSize(f.size)),
                        1
                        /* TEXT */
                      ),
                      createElementVNode(
                        "td",
                        _hoisted_172,
                        toDisplayString(f.modified || "\u2014"),
                        1
                        /* TEXT */
                      )
                    ], 8, _hoisted_1210);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ])) : (openBlock(), createElementBlock("div", _hoisted_182, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(current.value.files, (f, i) => {
                  return openBlock(), createElementBlock("button", {
                    key: i,
                    type: "button",
                    class: "wd-explorer__tile",
                    onClick: ($event) => emit("select", f)
                  }, [
                    createElementVNode("span", _hoisted_202, [
                      createVNode(_component_wd_icon, {
                        name: "folder-open",
                        size: 22
                      })
                    ]),
                    createElementVNode(
                      "span",
                      _hoisted_2110,
                      toDisplayString(f.name),
                      1
                      /* TEXT */
                    ),
                    createElementVNode(
                      "span",
                      _hoisted_227,
                      toDisplayString(fmtSize(f.size)),
                      1
                      /* TEXT */
                    )
                  ], 8, _hoisted_192);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])),
            !current.value.files.length ? (openBlock(), createElementBlock("div", _hoisted_233, "\u6B64\u6587\u4EF6\u5939\u4E3A\u7A7A")) : createCommentVNode("v-if", true)
          ])
        ]);
      };
    }
  });

  // .demo-build/WdFileList.ts
  var _hoisted_131 = { class: "wd-file-list" };
  var _hoisted_228 = ["onClick"];
  var _hoisted_324 = { class: "wd-file-list__icon" };
  var _hoisted_421 = { class: "wd-file-list__name" };
  var _hoisted_511 = { class: "wd-file-list__size" };
  var WdFileList_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdFileList" },
    __name: "WdFileList",
    props: {
      items: { type: Array, required: false, default: () => [] }
    },
    emits: ["select"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const openPaths = ref(/* @__PURE__ */ new Set());
      const rows = computed(() => {
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
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock("div", _hoisted_131, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(rows.value, (row) => {
              return openBlock(), createElementBlock("div", {
                key: row.path,
                class: normalizeClass(["wd-file-list__row", `wd-file-list__row--${row.node.type || "file"}`]),
                style: normalizeStyle({ paddingLeft: 12 + row.depth * 20 + "px" }),
                onClick: ($event) => onRow(row)
              }, [
                createCommentVNode(" \u7BAD\u5934\u5217\u59CB\u7EC8\u5360\u4F4D\uFF1A\u6587\u4EF6\u5939\u4E0E\u6587\u4EF6\u7684\u56FE\u6807\u4FDD\u6301\u540C\u5217\u5BF9\u9F50 "),
                createElementVNode(
                  "span",
                  {
                    class: normalizeClass(["wd-file-list__chevron wd-chevron wd-chevron--right", { "wd-chevron--open": openPaths.value.has(row.path) }])
                  },
                  [
                    row.node.type === "folder" ? (openBlock(), createBlock(_component_wd_icon, {
                      key: 0,
                      name: "chevron-down",
                      size: 12
                    })) : createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                ),
                createElementVNode("span", _hoisted_324, [
                  row.node.type === "folder" ? (openBlock(), createBlock(_component_wd_icon, {
                    key: 0,
                    name: "folder",
                    size: 14
                  })) : (openBlock(), createBlock(_component_wd_icon, {
                    key: 1,
                    name: "file",
                    size: 12
                  }))
                ]),
                createElementVNode(
                  "span",
                  _hoisted_421,
                  toDisplayString(row.node.name),
                  1
                  /* TEXT */
                ),
                createElementVNode(
                  "span",
                  _hoisted_511,
                  toDisplayString(fmtSize(row.node.size)),
                  1
                  /* TEXT */
                )
              ], 14, _hoisted_228);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  });

  // .demo-build/form-context.ts
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

  // .demo-build/WdForm.ts
  var WdForm_default = /* @__PURE__ */ defineComponent({
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
      const validating = ref(false);
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
      const formRef = ref(null);
      __expose({ validate, clearValidate, resetFields });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "form",
          {
            ref_key: "formRef",
            ref: formRef,
            class: normalizeClass(["wd-form", [`wd-form--label-${__props.labelPosition}`, { "wd-form--disabled": __props.disabled }]]),
            novalidate: "",
            onSubmit: withModifiers(onSubmit, ["prevent"])
          },
          [
            renderSlot(_ctx.$slots, "default")
          ],
          34
          /* CLASS, NEED_HYDRATION */
        );
      };
    }
  });

  // .demo-build/WdFormItem.ts
  var _hoisted_134 = ["data-form-prop"];
  var _hoisted_229 = {
    key: 0,
    class: "wd-form-item__req",
    "aria-hidden": "true"
  };
  var _hoisted_325 = {
    key: 0,
    class: "wd-form-item__error",
    role: "alert"
  };
  var _hoisted_423 = {
    key: 1,
    class: "wd-form-item__hint"
  };
  var WdFormItem_default = /* @__PURE__ */ defineComponent({
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
      const error = ref("");
      const touched = ref(false);
      const validating = ref(false);
      const mergedRules = computed(() => {
        if (props.rules?.length) return props.rules;
        if (!form || !props.prop) return [];
        return form.rules()[props.prop] ?? [];
      });
      const isRequired = computed(
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
        onBeforeUnmount(() => form.unregister({ prop: props.prop, validate, reset, getError: () => error.value }));
      }
      watch(
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
      const state = computed(() => {
        if (validating.value) return "validating";
        if (error.value) return "error";
        if (touched.value && !isEmpty(currentValue())) return "success";
        return "";
      });
      const disabled = computed(() => form?.disabled() ?? false);
      __expose({ validate, reset, error });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: normalizeClass(["wd-form-item", [`wd-form-item--${state.value}`, { "wd-form-item--disabled": disabled.value }]]),
          "data-form-prop": __props.prop || void 0
        }, [
          __props.label ? (openBlock(), createElementBlock(
            "label",
            {
              key: 0,
              class: "wd-form-item__label",
              style: normalizeStyle(unref(form)?.labelPosition() === "left" ? { width: unref(form)?.labelWidth() } : void 0)
            },
            [
              isRequired.value ? (openBlock(), createElementBlock("span", _hoisted_229, "*")) : createCommentVNode("v-if", true),
              createTextVNode(
                " " + toDisplayString(__props.label),
                1
                /* TEXT */
              )
            ],
            4
            /* STYLE */
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: "wd-form-item__control",
              onFocusout: onFocusOut
            },
            [
              renderSlot(_ctx.$slots, "default"),
              error.value ? (openBlock(), createElementBlock(
                "p",
                _hoisted_325,
                toDisplayString(error.value),
                1
                /* TEXT */
              )) : __props.hint ? (openBlock(), createElementBlock(
                "p",
                _hoisted_423,
                toDisplayString(__props.hint),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true)
            ],
            32
            /* NEED_HYDRATION */
          )
        ], 10, _hoisted_134);
      };
    }
  });

  // .demo-build/WdGrid.ts
  var WdGrid_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdGrid" },
    __name: "WdGrid",
    props: {
      columns: { type: [Number, String], required: false, default: 1 },
      gap: { type: String, required: false, default: "md" },
      gutter: { type: Number, required: false }
    },
    setup(__props) {
      const props = __props;
      const cols = computed(() => {
        if (props.columns === "auto") return "repeat(auto-fit, minmax(200px, 1fr))";
        return `repeat(${props.columns}, 1fr)`;
      });
      const gapValue = computed(() => {
        if (props.gutter) `${props.gutter}px`;
        const val = { sm: 8, md: 16, lg: 24 }[props.gap] || 16;
        return `${val}px`;
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            class: "wd-grid",
            style: normalizeStyle({ gridTemplateColumns: cols.value, gap: gapValue.value })
          },
          [
            renderSlot(_ctx.$slots, "default")
          ],
          4
          /* STYLE */
        );
      };
    }
  });

  // .demo-build/WdGroup.ts
  var _hoisted_135 = ["aria-label", "aria-disabled"];
  var WdGroup_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdGroup" },
    __name: "WdGroup",
    props: {
      variant: { type: String, required: false, default: "capsule" },
      direction: { type: String, required: false, default: "row" },
      size: { type: String, required: false, default: "md" },
      block: { type: Boolean, required: false, default: false },
      disabled: { type: Boolean, required: false, default: false },
      equal: { type: Boolean, required: false, default: false },
      label: { type: String, required: false, default: "" },
      seamless: { type: Boolean, required: false, default: true }
    },
    setup(__props) {
      const props = __props;
      const root = ref(null);
      function markChildren() {
        const el = root.value;
        if (!el) return;
        const kids = Array.from(el.children);
        const n = kids.length;
        kids.forEach((c, i) => {
          c.classList.toggle("wd-group__item", true);
          c.classList.toggle("wd-group__item--first", i === 0);
          c.classList.toggle("wd-group__item--last", i === n - 1);
          c.classList.toggle("wd-group__item--middle", i > 0 && i < n - 1);
          c.classList.toggle("wd-group__item--only", n === 1);
        });
      }
      onMounted(markChildren);
      watch(
        () => root.value ? Array.from(root.value.children).length : 0,
        () => markChildren()
      );
      const classes = computed(() => [
        "wd-group",
        `wd-group--${props.variant}`,
        `wd-group--${props.direction}`,
        `wd-group--${props.size}`,
        {
          "wd-group--block": props.block,
          "wd-group--disabled": props.disabled,
          "wd-group--equal": props.equal,
          "wd-group--seamless": props.seamless
        }
      ]);
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          ref_key: "root",
          ref: root,
          class: normalizeClass(classes.value),
          role: "group",
          "aria-label": __props.label || void 0,
          "aria-disabled": __props.disabled || void 0
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 10, _hoisted_135);
      };
    }
  });

  // .demo-build/WdImagePreview.ts
  var _hoisted_136 = ["src", "alt"];
  var _hoisted_230 = {
    key: 0,
    class: "wd-preview"
  };
  var _hoisted_326 = ["src", "alt"];
  var _hoisted_424 = {
    key: 0,
    class: "wd-preview__count"
  };
  var _hoisted_512 = { class: "wd-preview__toolbar" };
  var WdImagePreview_default = /* @__PURE__ */ defineComponent({
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
      const open = ref(false);
      const cur = ref(props.index);
      const scale = ref(1);
      const rotate = ref(0);
      const images = computed(() => props.list.length ? props.list : props.src ? [props.src] : []);
      watch(
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
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          Fragment,
          null,
          [
            createElementVNode("span", {
              class: "wd-image-preview",
              onClick: openPreview
            }, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                __props.src || __props.list.length ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  src: __props.src || images.value[0],
                  alt: __props.alt,
                  class: "wd-image-preview__thumb"
                }, null, 8, _hoisted_136)) : createCommentVNode("v-if", true)
              ])
            ]),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              createVNode(Transition, {
                name: "wd-preview-fade",
                duration: unref(POP_DURATION)
              }, {
                default: withCtx(() => [
                  open.value ? (openBlock(), createElementBlock("div", _hoisted_230, [
                    createElementVNode("div", {
                      class: "wd-preview__mask",
                      onClick: _cache[0] || (_cache[0] = ($event) => open.value = false)
                    }),
                    createElementVNode(
                      "div",
                      {
                        class: "wd-preview__stage",
                        onWheel: _cache[1] || (_cache[1] = withModifiers(($event) => zoom($event.deltaY > 0 ? -0.15 : 0.15), ["prevent"]))
                      },
                      [
                        createElementVNode("img", {
                          class: "wd-preview__img",
                          src: images.value[cur.value],
                          alt: __props.alt,
                          style: normalizeStyle({ transform: `scale(${scale.value}) rotate(${rotate.value}deg)` })
                        }, null, 12, _hoisted_326)
                      ],
                      32
                      /* NEED_HYDRATION */
                    ),
                    images.value.length > 1 ? (openBlock(), createElementBlock(
                      "div",
                      _hoisted_424,
                      toDisplayString(cur.value + 1) + " / " + toDisplayString(images.value.length),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    createElementVNode("div", _hoisted_512, [
                      images.value.length > 1 ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                        "aria-label": "\u4E0A\u4E00\u5F20",
                        onClick: _cache[2] || (_cache[2] = ($event) => view(cur.value - 1))
                      }, "\u2039")) : createCommentVNode("v-if", true),
                      createElementVNode("button", {
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                        "aria-label": "\u65CB\u8F6C",
                        onClick: _cache[3] || (_cache[3] = ($event) => rotate.value = (rotate.value + 90) % 360)
                      }, "\u21BB"),
                      createElementVNode("button", {
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                        "aria-label": "\u7F29\u5C0F",
                        onClick: _cache[4] || (_cache[4] = ($event) => zoom(-0.25))
                      }, "\u2212"),
                      createElementVNode("button", {
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                        "aria-label": "\u653E\u5927",
                        onClick: _cache[5] || (_cache[5] = ($event) => zoom(0.25))
                      }, "\uFF0B"),
                      createElementVNode("button", {
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                        "aria-label": "\u8FD8\u539F",
                        onClick: resetView
                      }, "1:1"),
                      images.value.length > 1 ? (openBlock(), createElementBlock("button", {
                        key: 1,
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                        "aria-label": "\u4E0B\u4E00\u5F20",
                        onClick: _cache[6] || (_cache[6] = ($event) => view(cur.value + 1))
                      }, "\u203A")) : createCommentVNode("v-if", true),
                      createElementVNode("button", {
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                        "aria-label": "\u5173\u95ED",
                        onClick: _cache[7] || (_cache[7] = ($event) => open.value = false)
                      }, [
                        createVNode(_component_wd_icon, {
                          name: "close",
                          size: 13
                        })
                      ])
                    ])
                  ])) : createCommentVNode("v-if", true)
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

  // .demo-build/WdInput.ts
  var _hoisted_137 = {
    key: 0,
    class: "wd-input__icon"
  };
  var _hoisted_231 = ["type", "value", "placeholder", "disabled", "readonly", "maxlength"];
  var _hoisted_327 = {
    key: 2,
    class: "wd-input__count"
  };
  var WdInput_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdInput" },
    __name: "WdInput",
    props: {
      modelValue: { type: String, required: false },
      defaultValue: { type: String, required: false },
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
    emits: ["update:modelValue", "change", "clear", "enter"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const { value, set } = useControllable({
        modelValue: computed(() => props.modelValue),
        defaultValue: computed(() => props.defaultValue),
        fallback: "",
        onChange: (v) => {
          emit("update:modelValue", v);
          emit("change", v);
        }
      });
      const el = ref(null);
      const hasValue = computed(() => value.value.length > 0);
      const showClear = computed(() => props.clearable && hasValue.value && !props.disabled && !props.readonly);
      const count = computed(() => props.showCount && props.maxlength ? `${value.value.length}/${props.maxlength}` : "");
      function onInput(event) {
        let v = event.target.value;
        if (props.maxlength && v.length > props.maxlength) {
          v = v.slice(0, props.maxlength);
          event.target.value = v;
        }
        set(v);
      }
      function clear() {
        set("");
        emit("clear");
        el.value?.focus();
      }
      function onKeydown(e) {
        if (e.key === "Enter") emit("enter", value.value);
      }
      __expose({ focus: () => el.value?.focus(), blur: () => el.value?.blur() });
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          "label",
          {
            class: normalizeClass(["wd-input", {
              "wd-input--rounded": __props.shape === "rounded",
              "wd-input--lg": __props.size === "lg",
              "wd-input--sm": __props.size === "sm",
              "wd-input--has-count": !!count.value
            }])
          },
          [
            _ctx.$slots.icon ? (openBlock(), createElementBlock("span", _hoisted_137, [
              renderSlot(_ctx.$slots, "icon")
            ])) : createCommentVNode("v-if", true),
            createElementVNode("input", {
              ref_key: "el",
              ref: el,
              type: __props.type,
              value: unref(value),
              placeholder: __props.placeholder,
              disabled: __props.disabled,
              readonly: __props.readonly,
              maxlength: __props.maxlength,
              onInput,
              onKeydown
            }, null, 40, _hoisted_231),
            showClear.value ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "wd-input__clear",
              "aria-label": "\u6E05\u9664",
              onClick: withModifiers(clear, ["prevent"])
            }, [
              createVNode(_component_wd_icon, {
                name: "close",
                size: 13
              })
            ])) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "suffix"),
            count.value ? (openBlock(), createElementBlock(
              "span",
              _hoisted_327,
              toDisplayString(count.value),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdListItem.ts
  var _hoisted_138 = {
    key: 0,
    class: "wd-list-item__icon"
  };
  var _hoisted_234 = { class: "wd-list-item__title" };
  var _hoisted_328 = {
    key: 1,
    class: "wd-list-item__meta"
  };
  var WdListItem_default = /* @__PURE__ */ defineComponent({
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
        return openBlock(), createElementBlock(
          "div",
          {
            "data-wd-hover": "",
            class: normalizeClass(["wd-list-item", { "wd-list-item--clickable": __props.clickable }]),
            onClick: _cache[0] || (_cache[0] = ($event) => __props.clickable && emit("click", $event))
          },
          [
            _ctx.$slots.icon ? (openBlock(), createElementBlock("span", _hoisted_138, [
              renderSlot(_ctx.$slots, "icon")
            ])) : createCommentVNode("v-if", true),
            createElementVNode(
              "span",
              _hoisted_234,
              toDisplayString(__props.title),
              1
              /* TEXT */
            ),
            __props.meta ? (openBlock(), createElementBlock(
              "span",
              _hoisted_328,
              toDisplayString(__props.meta),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "extra")
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/markdown.ts
  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function inline(text) {
    const codes = [];
    let out = text.replace(/`([^`]+)`/g, (_, code) => {
      codes.push(code);
      return `\0CODE${codes.length - 1}\0`;
    });
    out = escapeHtml(out);
    out = out.replace(
      /!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,
      (_, alt, src, title) => `<img src="${src}" alt="${alt}"${title ? ` title="${title}"` : ""} loading="lazy">`
    );
    out = out.replace(
      /\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,
      (_, label, href, title) => {
        const external = /^https?:\/\//i.test(href);
        const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${href}"${title ? ` title="${title}"` : ""}${attrs}>${label}</a>`;
      }
    );
    out = out.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, (m, pre, url) => pre + `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
    out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/__([^_]+)__/g, "<strong>$1</strong>");
    out = out.replace(/(^|[^*])\*(\S[^*\n]*?\S|\S)\*(?=[^*]|$)/g, "$1<em>$2</em>");
    out = out.replace(/(^|[^_])_(\S[^_\n]*?\S|\S)_(?=[^_]|$)/g, "$1<em>$2</em>");
    out = out.replace(/~~([^~]+)~~/g, "<del>$1</del>");
    out = out.replace(/\u0000CODE(\d+)\u0000/g, (_, i) => `<code>${escapeHtml(codes[Number(i)])}</code>`);
    return out;
  }
  function isTableSep(line) {
    return /^\s*\|?[\s:-]*-[\s:|-]*\|?\s*$/.test(line) && line.includes("-");
  }
  function splitRow(line) {
    let s = line.trim();
    if (s.startsWith("|")) s = s.slice(1);
    if (s.endsWith("|")) s = s.slice(0, -1);
    return s.split("|").map((c) => c.trim());
  }
  function parseMarkdown(src) {
    const lines = src.replace(/\r\n?/g, "\n").split("\n");
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const fence = line.match(/^\s*(```|~~~)(.*)$/);
      if (fence) {
        const marker = fence[1];
        const lang = fence[2].trim();
        const buf2 = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith(marker)) {
          buf2.push(lines[i]);
          i++;
        }
        i++;
        const cls = lang ? ` class="language-${escapeHtml(lang)}"` : "";
        out.push(`<pre><code${cls}>${escapeHtml(buf2.join("\n"))}</code></pre>`);
        continue;
      }
      if (/^\s*([-*_])\s*(\1\s*){2,}$/.test(line)) {
        out.push("<hr>");
        i++;
        continue;
      }
      const h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        const lv = h[1].length;
        out.push(`<h${lv}>${inline(h[2].trim())}</h${lv}>`);
        i++;
        continue;
      }
      if (/^\s*>/.test(line)) {
        const buf2 = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) {
          buf2.push(lines[i].replace(/^\s*>\s?/, ""));
          i++;
        }
        out.push(`<blockquote>${parseMarkdown(buf2.join("\n"))}</blockquote>`);
        continue;
      }
      if (line.includes("|") && i + 1 < lines.length && isTableSep(lines[i + 1])) {
        const head = splitRow(line);
        const aligns = splitRow(lines[i + 1]).map((c) => {
          const l = c.startsWith(":");
          const r = c.endsWith(":");
          if (l && r) return "center";
          if (r) return "right";
          if (l) return "left";
          return "";
        });
        i += 2;
        const rows = [];
        while (i < lines.length && lines[i].includes("|") && lines[i].trim() !== "") {
          rows.push(splitRow(lines[i]));
          i++;
        }
        const th = head.map((c, k) => `<th${aligns[k] ? ` style="text-align:${aligns[k]}"` : ""}>${inline(c)}</th>`).join("");
        const tb = rows.map(
          (r) => "<tr>" + head.map((_, k) => `<td${aligns[k] ? ` style="text-align:${aligns[k]}"` : ""}>${inline(r[k] ?? "")}</td>`).join("") + "</tr>"
        ).join("");
        out.push(`<table><thead><tr>${th}</tr></thead><tbody>${tb}</tbody></table>`);
        continue;
      }
      const ul = line.match(/^\s*([-*+])\s+(.*)$/);
      const ol = line.match(/^\s*(\d+)[.)]\s+(.*)$/);
      if (ul || ol) {
        const ordered = !!ol;
        const items = [];
        const re = ordered ? /^\s*(\d+)[.)]\s+(.*)$/ : /^\s*([-*+])\s+(.*)$/;
        while (i < lines.length) {
          const m = lines[i].match(re);
          if (!m) break;
          items.push(m[2]);
          i++;
        }
        const tag = ordered ? "ol" : "ul";
        out.push(`<${tag}>` + items.map((t) => `<li>${inline(t)}</li>`).join("") + `</${tag}>`);
        continue;
      }
      if (line.trim() === "") {
        i++;
        continue;
      }
      const buf = [];
      while (i < lines.length) {
        const l = lines[i];
        if (l.trim() === "") break;
        if (/^(#{1,6}\s|>|```|~~~)/.test(l)) break;
        if (/^\s*([-*+]|\d+[.)])\s+/.test(l)) break;
        if (/^\s*([-*_])\s*(\1\s*){2,}$/.test(l)) break;
        buf.push(l);
        i++;
      }
      if (buf.length) out.push(`<p>${inline(buf.join("\n")).replace(/\n/g, "<br>")}</p>`);
    }
    return out.join("\n");
  }

  // .demo-build/WdMarkdown.ts
  var _hoisted_139 = ["innerHTML"];
  var WdMarkdown_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdMarkdown" },
    __name: "WdMarkdown",
    props: {
      source: { type: String, required: false, default: "" },
      html: { type: String, required: false, default: "" },
      flush: { type: Boolean, required: false, default: false }
    },
    setup(__props) {
      const props = __props;
      const rendered = computed(
        () => props.html ? props.html : parseMarkdown(props.source)
      );
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("article", {
          class: normalizeClass(["wd-markdown", { "wd-markdown--flush": __props.flush }]),
          innerHTML: rendered.value
        }, null, 10, _hoisted_139);
      };
    }
  });

  // .demo-build/WdMentions.ts
  var _hoisted_140 = ["value", "rows", "placeholder", "disabled"];
  var _hoisted_235 = ["aria-selected", "onClick", "onMouseenter"];
  var _hoisted_329 = {
    key: 0,
    class: "wd-mentions__avatar"
  };
  var _hoisted_425 = ["src", "alt"];
  var _hoisted_513 = {
    key: 1,
    class: "wd-mentions__avatar wd-mentions__avatar--text"
  };
  var _hoisted_68 = { class: "wd-mentions__label" };
  var _hoisted_78 = {
    key: 0,
    class: "wd-mentions__desc"
  };
  var _hoisted_88 = {
    key: 1,
    class: "wd-mentions__count"
  };
  var WdMentions_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdMentions" },
    __name: "WdMentions",
    props: {
      modelValue: { type: String, required: false, default: void 0 },
      defaultValue: { type: String, required: false, default: "" },
      users: { type: Array, required: false, default: () => [] },
      placeholder: { type: String, required: false, default: "\u8F93\u5165 @ \u63D0\u53CA\u6210\u5458" },
      rows: { type: Number, required: false, default: 3 },
      disabled: { type: Boolean, required: false, default: false },
      trigger: { type: String, required: false, default: "@" },
      maxOptions: { type: Number, required: false, default: 8 }
    },
    emits: ["update:modelValue", "change", "select"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const inner = ref(props.defaultValue);
      const isControlled = computed(() => props.modelValue !== void 0);
      const text = computed(() => isControlled.value ? props.modelValue : inner.value);
      const ta = ref(null);
      const rootEl = ref(null);
      const panelEl = ref(null);
      const activeQuery = ref(null);
      function detectMention() {
        const el = ta.value;
        if (!el) return;
        const pos2 = el.selectionStart ?? 0;
        const before = text.value.slice(0, pos2);
        const at = before.lastIndexOf(props.trigger);
        if (at < 0) {
          activeQuery.value = null;
          return;
        }
        const frag = before.slice(at + props.trigger.length);
        if (/\s/.test(frag) || frag.length > 20) {
          activeQuery.value = null;
          return;
        }
        activeQuery.value = { start: at, query: frag };
      }
      const filtered = computed(() => {
        const q = activeQuery.value?.query ?? "";
        const list = props.users.filter((u) => !u.disabled);
        if (!q) return list.slice(0, props.maxOptions);
        const lower = q.toLowerCase();
        return list.filter((u) => u.label.toLowerCase().includes(lower) || (u.desc ?? "").toLowerCase().includes(lower)).slice(0, props.maxOptions);
      });
      const open = computed(() => activeQuery.value !== null && filtered.value.length > 0);
      const { pos } = useAnchoredPosition(open, rootEl, panelEl, {
        placement: "bottom-start",
        gap: 6
      });
      const panelStyle = computed(() => ({
        top: pos.value.top + "px",
        left: pos.value.left + "px"
      }));
      const activeIndex = ref(0);
      watch(filtered, () => {
        activeIndex.value = 0;
      });
      function pick(user) {
        const a = activeQuery.value;
        const el = ta.value;
        if (!a || !el) return;
        const insert = props.trigger + (user.value ?? user.label);
        const pos2 = el.selectionStart ?? text.value.length;
        const before = text.value.slice(0, a.start);
        const after = text.value.slice(pos2);
        const next = before + insert + " " + after;
        setText(next);
        emit("select", user);
        activeQuery.value = null;
        nextTick(() => {
          const caret = (before + insert + " ").length;
          el.focus();
          el.setSelectionRange(caret, caret);
        });
      }
      function setText(v) {
        if (!isControlled.value) inner.value = v;
        emit("update:modelValue", v);
        emit("change", v);
      }
      function onInput(e) {
        const v = e.target.value;
        if (!isControlled.value) inner.value = v;
        emit("update:modelValue", v);
        emit("change", v);
        detectMention();
      }
      function onKeydown(e) {
        if (!open.value) return;
        if (e.key === "ArrowDown") {
          e.preventDefault();
          activeIndex.value = (activeIndex.value + 1) % filtered.value.length;
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          activeIndex.value = (activeIndex.value - 1 + filtered.value.length) % filtered.value.length;
        } else if (e.key === "Enter" || e.key === "Tab") {
          e.preventDefault();
          pick(filtered.value[activeIndex.value]);
        } else if (e.key === "Escape") {
          e.preventDefault();
          activeQuery.value = null;
        }
      }
      function onBlur() {
        window.setTimeout(() => {
          activeQuery.value = null;
        }, 140);
      }
      useDismiss([rootEl, panelEl], () => {
        activeQuery.value = null;
      }, open);
      useOverlayLayer(open, panelEl, () => {
        activeQuery.value = null;
        return true;
      });
      const charCount = computed(() => text.value.length);
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            ref_key: "rootEl",
            ref: rootEl,
            class: normalizeClass(["wd-mentions", { "is-disabled": __props.disabled }])
          },
          [
            createElementVNode("textarea", {
              ref_key: "ta",
              ref: ta,
              class: "wd-mentions__input",
              value: text.value,
              rows: __props.rows,
              placeholder: __props.placeholder,
              disabled: __props.disabled,
              onInput,
              onKeydown,
              onBlur,
              onClick: detectMention
            }, null, 40, _hoisted_140),
            open.value ? (openBlock(), createElementBlock(
              "div",
              {
                key: 0,
                ref_key: "panelEl",
                ref: panelEl,
                class: "wd-mentions__panel",
                style: normalizeStyle(panelStyle.value),
                role: "listbox"
              },
              [
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(filtered.value, (u, i) => {
                    return openBlock(), createElementBlock("button", {
                      key: u.id,
                      type: "button",
                      class: normalizeClass(["wd-mentions__option", { "is-active": i === activeIndex.value }]),
                      role: "option",
                      "aria-selected": i === activeIndex.value,
                      onMousedown: _cache[0] || (_cache[0] = withModifiers(() => {
                      }, ["prevent"])),
                      onClick: ($event) => pick(u),
                      onMouseenter: ($event) => activeIndex.value = i
                    }, [
                      u.avatar ? (openBlock(), createElementBlock("span", _hoisted_329, [
                        createElementVNode("img", {
                          src: u.avatar,
                          alt: u.label
                        }, null, 8, _hoisted_425)
                      ])) : (openBlock(), createElementBlock(
                        "span",
                        _hoisted_513,
                        toDisplayString(u.label.slice(0, 1)),
                        1
                        /* TEXT */
                      )),
                      createElementVNode("span", _hoisted_68, [
                        createTextVNode(
                          toDisplayString(u.label) + " ",
                          1
                          /* TEXT */
                        ),
                        u.desc ? (openBlock(), createElementBlock(
                          "span",
                          _hoisted_78,
                          toDisplayString(u.desc),
                          1
                          /* TEXT */
                        )) : createCommentVNode("v-if", true)
                      ])
                    ], 42, _hoisted_235);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              4
              /* STYLE */
            )) : createCommentVNode("v-if", true),
            charCount.value ? (openBlock(), createElementBlock(
              "span",
              _hoisted_88,
              toDisplayString(charCount.value),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdModal.ts
  var _hoisted_141 = ["aria-label"];
  var _hoisted_236 = { class: "wd-modal__head" };
  var _hoisted_330 = { class: "wd-modal__title" };
  var _hoisted_426 = { class: "wd-modal__body" };
  var _hoisted_514 = {
    key: 0,
    class: "wd-modal__foot"
  };
  var WdModal_default = /* @__PURE__ */ defineComponent({
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
      const panel = ref(null);
      const mounted = ref(false);
      watchEffect(() => {
        if (props.modelValue) mounted.value = true;
      });
      const openRef = toRef(props, "modelValue");
      const myZ = ref(0);
      watchEffect(() => {
        if (props.modelValue) myZ.value = nextZIndex();
      });
      useScrollLock(openRef);
      useFocusTrap(openRef, panel, () => {
        close();
        return true;
      });
      const maxWidth = computed(
        () => typeof props.width === "number" ? `${props.width}px` : props.width
      );
      function close() {
        emit("update:modelValue", false);
      }
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createBlock(Teleport, { to: "body" }, [
          createCommentVNode("\n      \u4E0D\u7528 <Transition>\uFF1A\u5176 enter \u9636\u6BB5\u4F9D\u8D56 nextFrame\uFF0C\u52A8\u753B\u65F6\u949F\u505C\u6446\u65F6\n      \uFF08\u540E\u53F0\u6807\u7B7E\u9875 / \u65E0\u5934\u6E32\u67D3 / \u51CF\u5F31\u52A8\u6548\uFF09\u6C38\u4E0D\u63A8\u8FDB\uFF0Center-from \u4F1A\u6B8B\u7559\uFF0C\n      \u5173\u95ED\u65F6\u518D\u53E0 leave-* \u5C31\u5F7B\u5E95\u9500\u6BC1\u4E0D\u6389 \u2014\u2014 \u8868\u73B0\u4E3A\u300C\u5F39\u7A97\u5173\u4E0D\u6389\u3001\u8FD8\u6321\u7740\u70B9\u51FB\u300D\u3002\n      \u6539\u4E3A\u5E38\u9A7B\u8282\u70B9 + .is-open \u7C7B\uFF0C\u53EF\u89C1\u6027\u4EA4\u7ED9 display\uFF0C\u52A8\u753B\u53EA\u8D1F\u8D23\u597D\u770B\u3002\n    "),
          withDirectives(createElementVNode("div", {
            class: normalizeClass(["wd-modal", { "is-open": __props.modelValue }]),
            role: "dialog",
            "aria-modal": "true",
            "aria-label": __props.title || void 0,
            style: normalizeStyle({ zIndex: myZ.value }),
            onTransitionend: _cache[1] || (_cache[1] = withModifiers(
              //@ts-ignore
              (...args) => _ctx.onLeaveEnd && _ctx.onLeaveEnd(...args),
              ["self"]
            ))
          }, [
            createElementVNode("div", {
              class: "wd-modal__mask",
              onClick: _cache[0] || (_cache[0] = ($event) => __props.closeOnMask && close())
            }),
            createElementVNode(
              "div",
              {
                ref_key: "panel",
                ref: panel,
                class: "wd-modal__panel",
                tabindex: "-1",
                style: normalizeStyle({ maxWidth: maxWidth.value })
              },
              [
                createElementVNode("div", _hoisted_236, [
                  createElementVNode(
                    "div",
                    _hoisted_330,
                    toDisplayString(__props.title),
                    1
                    /* TEXT */
                  ),
                  createElementVNode("button", {
                    type: "button",
                    class: "wd-modal__close",
                    "aria-label": "\u5173\u95ED",
                    onClick: close
                  }, [
                    createVNode(_component_wd_icon, {
                      name: "close",
                      size: 15
                    })
                  ])
                ]),
                createElementVNode("div", _hoisted_426, [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_514, [
                  renderSlot(_ctx.$slots, "footer")
                ])) : createCommentVNode("v-if", true)
              ],
              4
              /* STYLE */
            )
          ], 46, _hoisted_141), [
            [vShow, mounted.value]
          ])
        ]);
      };
    }
  });

  // .demo-build/WdNav.ts
  var _hoisted_144 = ["aria-label"];
  var _hoisted_237 = { class: "wd-nav__brand" };
  var _hoisted_331 = {
    key: 0,
    class: "wd-nav__brand-text"
  };
  var _hoisted_427 = ["aria-label", "aria-expanded"];
  var _hoisted_515 = { class: "wd-nav__list" };
  var _hoisted_69 = {
    key: 0,
    class: "wd-nav__group"
  };
  var _hoisted_79 = {
    key: 0,
    class: "wd-nav__icon"
  };
  var _hoisted_89 = {
    key: 1,
    class: "wd-nav__icon-fallback"
  };
  var _hoisted_97 = {
    key: 2,
    class: "wd-nav__dot"
  };
  var _hoisted_105 = {
    key: 1,
    class: "wd-nav__label"
  };
  var _hoisted_1112 = {
    key: 0,
    class: "wd-nav__footer"
  };
  var WdNav_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdNav" },
    __name: "WdNav",
    props: {
      direction: { type: String, required: false, default: "horizontal" },
      items: { type: Array, required: false, default: () => [] },
      active: { type: String, required: false, default: "" },
      brand: { type: String, required: false, default: "" },
      collapsed: { type: Boolean, required: false, default: false },
      iconOnly: { type: Boolean, required: false, default: false },
      sticky: { type: Boolean, required: false, default: true },
      size: { type: String, required: false, default: "md" }
    },
    emits: ["update:active", "select", "update:collapsed"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const isVertical = computed(() => props.direction === "vertical");
      const thin = computed(() => isVertical.value && (props.collapsed || props.iconOnly));
      function onSelect(item, e) {
        if (item.disabled) {
          e.preventDefault();
          return;
        }
        emit("update:active", item.key);
        emit("select", item);
      }
      function toggleCollapse() {
        if (props.iconOnly) return;
        emit("update:collapsed", !props.collapsed);
      }
      const groups = computed(() => {
        if (!isVertical.value) return [{ title: "", items: props.items }];
        const map = /* @__PURE__ */ new Map();
        for (const it of props.items) {
          const g = it.group ?? "";
          if (!map.has(g)) map.set(g, []);
          map.get(g).push(it);
        }
        return [...map.entries()].map(([title, items]) => ({ title, items }));
      });
      const iconSize = computed(() => {
        if (isVertical.value) return props.size === "sm" ? 17 : 19;
        return props.size === "sm" ? 14 : 16;
      });
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock("nav", {
          class: normalizeClass(["wd-nav", [
            `wd-nav--${__props.direction}`,
            `wd-nav--${__props.size}`,
            {
              "is-collapsed": thin.value,
              "is-sticky": __props.sticky && !isVertical.value
            }
          ]]),
          "aria-label": __props.brand || "\u5BFC\u822A"
        }, [
          createCommentVNode(" \u54C1\u724C\u533A "),
          createElementVNode("div", _hoisted_237, [
            renderSlot(_ctx.$slots, "brand", {}, () => [
              __props.brand ? (openBlock(), createElementBlock(
                "span",
                _hoisted_331,
                toDisplayString(__props.brand),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true)
            ]),
            createCommentVNode(" \u7AD6\u680F\u6298\u53E0\u6309\u94AE\uFF1A\u653E\u5728\u54C1\u724C\u4E0B\u65B9\uFF0C\u4E0E\u56FE\u6807\u7AD6\u76F4\u5BF9\u9F50 "),
            isVertical.value && !__props.iconOnly && (__props.collapsed || __props.items.length) ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "wd-nav__collapse",
              "aria-label": __props.collapsed ? "\u5C55\u5F00\u5BFC\u822A" : "\u6536\u8D77\u5BFC\u822A",
              "aria-expanded": !__props.collapsed,
              onClick: toggleCollapse
            }, [
              createVNode(_component_wd_icon, {
                name: __props.collapsed ? "arrow-right" : "arrow-left",
                size: 13
              }, null, 8, ["name"])
            ], 8, _hoisted_427)) : createCommentVNode("v-if", true)
          ]),
          createCommentVNode(" \u5BFC\u822A\u9879 "),
          createElementVNode("div", _hoisted_515, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(groups.value, (g, gi) => {
                return openBlock(), createElementBlock(
                  Fragment,
                  { key: gi },
                  [
                    g.title && !thin.value ? (openBlock(), createElementBlock(
                      "div",
                      _hoisted_69,
                      toDisplayString(g.title),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(g.items, (it) => {
                        return openBlock(), createBlock(resolveDynamicComponent(it.href ? "a" : "button"), {
                          key: it.key,
                          class: normalizeClass(["wd-nav__item", {
                            "is-active": it.key === __props.active,
                            "is-disabled": it.disabled
                          }]),
                          href: it.href,
                          type: it.href ? void 0 : "button",
                          "aria-current": it.key === __props.active ? "page" : void 0,
                          title: thin.value && it.label ? it.label : void 0,
                          onClick: ($event) => onSelect(it, $event)
                        }, {
                          default: withCtx(() => [
                            createCommentVNode('\n            \u56FE\u6807\u5BB9\u5668\u53EA\u5728\u9700\u8981\u65F6\u6E32\u67D3\uFF1A\n              \xB7 \u6709 icon \u2192 \u663E\u793A\u56FE\u6807\n              \xB7 \u7AD6\u680F\u65E0 icon \u2192 \u663E\u793A\u9996\u5B57\u5360\u4F4D\uFF08\u7AD6\u680F\u9760\u56FE\u6807\u8FA8\u8BC6\uFF0C\u5FC5\u987B\u6709\u89C6\u89C9\u951A\u70B9\uFF09\n              \xB7 **\u6A2A\u680F\u65E0 icon \u2192 \u4EC0\u4E48\u90FD\u4E0D\u663E\u793A**\uFF08\u6A2A\u680F\u9760\u6587\u5B57\u8FA8\u8BC6\uFF0C\n                \u52A0\u9996\u5B57\u5360\u4F4D\u4F1A\u51FA\u73B0"\u6307 \u6307\u5357"\u8FD9\u79CD\u91CD\u590D\uFF09\n          '),
                            it.icon || isVertical.value ? (openBlock(), createElementBlock("span", _hoisted_79, [
                              it.icon ? (openBlock(), createBlock(_component_wd_icon, {
                                key: 0,
                                name: it.icon,
                                size: iconSize.value
                              }, null, 8, ["name", "size"])) : (openBlock(), createElementBlock(
                                "span",
                                _hoisted_89,
                                toDisplayString((it.label || "?").slice(0, 1)),
                                1
                                /* TEXT */
                              )),
                              it.dot ? (openBlock(), createElementBlock("span", _hoisted_97)) : createCommentVNode("v-if", true)
                            ])) : createCommentVNode("v-if", true),
                            !thin.value && it.label ? (openBlock(), createElementBlock(
                              "span",
                              _hoisted_105,
                              toDisplayString(it.label),
                              1
                              /* TEXT */
                            )) : createCommentVNode("v-if", true)
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["class", "href", "type", "aria-current", "title", "onClick"]);
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
            ))
          ]),
          createCommentVNode(" \u5E95\u90E8\u533A\uFF08\u4E3B\u9898\u5207\u6362 / \u7528\u6237 / \u9000\u51FA\uFF09 "),
          _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_1112, [
            renderSlot(_ctx.$slots, "footer")
          ])) : createCommentVNode("v-if", true)
        ], 10, _hoisted_144);
      };
    }
  });

  // .demo-build/WdNotification.ts
  var _hoisted_145 = { class: "wd-notification__body" };
  var _hoisted_238 = {
    key: 0,
    class: "wd-notification__title"
  };
  var _hoisted_333 = {
    key: 1,
    class: "wd-notification__desc"
  };
  var WdNotification_default = /* @__PURE__ */ defineComponent({
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
      watchEffect((onCleanup) => {
        if (!props.modelValue) return;
        const fn = (e) => {
          if (e.key === "Escape") close();
        };
        document.addEventListener("keydown", fn);
        onCleanup(() => document.removeEventListener("keydown", fn));
      });
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createBlock(Teleport, { to: "body" }, [
          createVNode(Transition, {
            name: "wd-notification-fade",
            duration: unref(POP_DURATION)
          }, {
            default: withCtx(() => [
              __props.modelValue ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(["wd-notification", `wd-notification--${__props.variant}`]),
                  role: "alert"
                },
                [
                  createElementVNode(
                    "span",
                    {
                      class: normalizeClass(["wd-notification__icon wd-dot wd-dot--lg", `wd-dot--${__props.variant}`])
                    },
                    null,
                    2
                    /* CLASS */
                  ),
                  createElementVNode("div", _hoisted_145, [
                    __props.title ? (openBlock(), createElementBlock(
                      "div",
                      _hoisted_238,
                      toDisplayString(__props.title),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    __props.description || _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_333, [
                      renderSlot(_ctx.$slots, "default", {}, () => [
                        createTextVNode(
                          toDisplayString(__props.description),
                          1
                          /* TEXT */
                        )
                      ])
                    ])) : createCommentVNode("v-if", true)
                  ]),
                  createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn wd-icon-btn--ghost wd-icon-btn--sm",
                    "aria-label": "\u5173\u95ED",
                    onClick: close
                  }, [
                    createVNode(_component_wd_icon, {
                      name: "close",
                      size: 13
                    })
                  ])
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["duration"])
        ]);
      };
    }
  });

  // .demo-build/WdOtp.ts
  var _hoisted_146 = ["value", "disabled", "onInput", "onKeydown"];
  var WdOtp_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdOtp" },
    __name: "WdOtp",
    props: {
      modelValue: { type: String, required: false },
      defaultValue: { type: String, required: false },
      length: { type: Number, required: false, default: 6 },
      disabled: { type: Boolean, required: false, default: false }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const { value, set } = useControllable({
        modelValue: computed(() => props.modelValue),
        defaultValue: computed(() => props.defaultValue),
        fallback: "",
        onChange: (v) => {
          emit("update:modelValue", v);
          emit("change", v);
        }
      });
      const boxes = ref([]);
      function charAt(i) {
        return value.value[i] || "";
      }
      function onInput(i, e) {
        const el = e.target;
        const next = el.value.replace(/\D/g, "").slice(-1);
        const arr = value.value.split("");
        arr[i] = next;
        set(arr.join("").slice(0, props.length));
        if (next && i < props.length - 1) boxes.value[i + 1]?.focus();
      }
      function onKeydown(i, e) {
        if (e.key === "Backspace" && !charAt(i) && i > 0) {
          const arr = value.value.split("");
          arr[i - 1] = "";
          set(arr.join(""));
          boxes.value[i - 1]?.focus();
        }
        if (e.key === "ArrowLeft" && i > 0) boxes.value[i - 1]?.focus();
        if (e.key === "ArrowRight" && i < props.length - 1) boxes.value[i + 1]?.focus();
      }
      function onPaste(e) {
        e.preventDefault();
        const text = (e.clipboardData?.getData("text") || "").replace(/\D/g, "").slice(0, props.length);
        if (!text) return;
        set(text);
        boxes.value[Math.min(text.length, props.length - 1)]?.focus();
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            class: "wd-otp",
            onPaste
          },
          [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(__props.length, (i) => {
                return openBlock(), createElementBlock("input", {
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
                }, null, 40, _hoisted_146);
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

  // .demo-build/WdPagination.ts
  var _hoisted_147 = {
    key: 0,
    class: "wd-pagination__total"
  };
  var _hoisted_239 = ["disabled"];
  var _hoisted_334 = { class: "wd-pagination__simple-text" };
  var _hoisted_428 = ["disabled"];
  var _hoisted_516 = ["disabled"];
  var _hoisted_610 = {
    key: 0,
    class: "wd-pagination__dots"
  };
  var _hoisted_710 = ["aria-current", "onClick"];
  var _hoisted_810 = ["disabled"];
  var _hoisted_98 = {
    key: 3,
    class: "wd-pagination__size"
  };
  var _hoisted_106 = ["value"];
  var _hoisted_1113 = ["value"];
  var WdPagination_default = /* @__PURE__ */ defineComponent({
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
      const animReady = ref(false);
      const size = ref(props.pageSize);
      const pageCount = computed(() => Math.max(1, Math.ceil(props.total / size.value)));
      const range = computed(() => {
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
      const from = computed(() => pageCount.value ? (props.modelValue - 1) * size.value + 1 : 0);
      const to = computed(() => Math.min(props.modelValue * size.value, props.total));
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          "nav",
          {
            class: normalizeClass(["wd-pagination", { "wd-pagination--anim-ready": animReady.value, "wd-pagination--simple": __props.simple }]),
            "aria-label": "\u5206\u9875"
          },
          [
            __props.showTotal ? (openBlock(), createElementBlock(
              "span",
              _hoisted_147,
              " \u7B2C " + toDisplayString(from.value) + "\u2013" + toDisplayString(to.value) + " \u6761 / \u5171 " + toDisplayString(__props.total) + " \u6761 ",
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            createCommentVNode(" \u7B80\u6D01\u6A21\u5F0F "),
            __props.simple ? (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                createElementVNode("button", {
                  type: "button",
                  class: "wd-pagination__btn",
                  "data-wd-hover": "",
                  disabled: __props.modelValue <= 1,
                  "aria-label": "\u4E0A\u4E00\u9875",
                  onClick: _cache[0] || (_cache[0] = ($event) => go(__props.modelValue - 1))
                }, [
                  createVNode(_component_wd_icon, {
                    name: "chevron-left",
                    size: 14
                  })
                ], 8, _hoisted_239),
                createElementVNode(
                  "span",
                  _hoisted_334,
                  toDisplayString(__props.modelValue) + " / " + toDisplayString(pageCount.value),
                  1
                  /* TEXT */
                ),
                createElementVNode("button", {
                  type: "button",
                  class: "wd-pagination__btn",
                  "data-wd-hover": "",
                  disabled: __props.modelValue >= pageCount.value,
                  "aria-label": "\u4E0B\u4E00\u9875",
                  onClick: _cache[1] || (_cache[1] = ($event) => go(__props.modelValue + 1))
                }, [
                  createVNode(_component_wd_icon, {
                    name: "chevron-right",
                    size: 14
                  })
                ], 8, _hoisted_428)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (openBlock(), createElementBlock(
              Fragment,
              { key: 2 },
              [
                createCommentVNode(" \u5B8C\u6574\u6A21\u5F0F "),
                createElementVNode("button", {
                  type: "button",
                  class: "wd-pagination__btn",
                  "data-wd-hover": "",
                  disabled: __props.modelValue <= 1,
                  "aria-label": "\u4E0A\u4E00\u9875",
                  onClick: _cache[2] || (_cache[2] = ($event) => go(__props.modelValue - 1))
                }, [
                  createVNode(_component_wd_icon, {
                    name: "chevron-left",
                    size: 14
                  })
                ], 8, _hoisted_516),
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(range.value, (p, i) => {
                    return openBlock(), createElementBlock(
                      Fragment,
                      { key: i },
                      [
                        p === "..." ? (openBlock(), createElementBlock("span", _hoisted_610, "\u2026")) : (openBlock(), createElementBlock("button", {
                          key: 1,
                          type: "button",
                          class: normalizeClass(["wd-pagination__btn", { "wd-pagination__btn--active": p === __props.modelValue }]),
                          "data-wd-hover": "",
                          "aria-current": p === __props.modelValue ? "page" : void 0,
                          onClick: ($event) => go(p)
                        }, toDisplayString(p), 11, _hoisted_710))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                createElementVNode("button", {
                  type: "button",
                  class: "wd-pagination__btn",
                  "data-wd-hover": "",
                  disabled: __props.modelValue >= pageCount.value,
                  "aria-label": "\u4E0B\u4E00\u9875",
                  onClick: _cache[3] || (_cache[3] = ($event) => go(__props.modelValue + 1))
                }, [
                  createVNode(_component_wd_icon, {
                    name: "chevron-right",
                    size: 14
                  })
                ], 8, _hoisted_810)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            __props.showSizeChanger ? (openBlock(), createElementBlock("label", _hoisted_98, [
              createElementVNode("select", {
                value: size.value,
                onChange: changeSize
              }, [
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(__props.pageSizes, (s) => {
                    return openBlock(), createElementBlock("option", {
                      key: s,
                      value: s
                    }, toDisplayString(s) + " \u6761/\u9875", 9, _hoisted_1113);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], 40, _hoisted_106)
            ])) : createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdPopconfirm.ts
  var _hoisted_148 = ["aria-label", "aria-hidden"];
  var _hoisted_240 = { class: "wd-popconfirm__title" };
  var _hoisted_335 = {
    key: 0,
    class: "wd-popconfirm__icon",
    "aria-hidden": "true"
  };
  var _hoisted_429 = {
    key: 0,
    class: "wd-popconfirm__desc"
  };
  var _hoisted_517 = { class: "wd-popconfirm__actions" };
  var WdPopconfirm_default = /* @__PURE__ */ defineComponent({
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
      const open = ref(false);
      const mounted = ref(false);
      const trigger = ref(null);
      const bubble = ref(null);
      const pos = ref({ top: 0, left: 0 });
      function place() {
        const t = trigger.value?.getBoundingClientRect();
        if (!t) return;
        const sx = window.scrollX ?? window.pageXOffset ?? 0;
        const sy = window.scrollY ?? window.pageYOffset ?? 0;
        const vv = window.visualViewport;
        const vw = vv?.width ?? window.innerWidth;
        const w = props.width;
        let left = t.left + sx + t.width / 2 - w / 2;
        const minLeft = sx + 8;
        const maxLeft = sx + vw - w - 8;
        left = Math.max(minLeft, Math.min(left, Math.max(minLeft, maxLeft)));
        const gap = 10;
        const top = props.placement === "top" ? t.top + sy - gap : t.bottom + sy + gap;
        pos.value = { top, left };
      }
      useDismiss([bubble, trigger], hide, open);
      async function show2() {
        if (props.disabled) return;
        mounted.value = true;
        await nextTick();
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
      function onKey(e) {
        if (open.value && e.key === "Escape") hide();
      }
      watch(open, (v) => {
        if (v) {
          window.addEventListener("scroll", place, true);
          window.addEventListener("resize", place);
        } else {
          window.removeEventListener("scroll", place, true);
          window.removeEventListener("resize", place);
        }
      });
      document.addEventListener("keydown", onKey);
      onBeforeUnmount(() => {
        document.removeEventListener("keydown", onKey);
        window.removeEventListener("scroll", place, true);
        window.removeEventListener("resize", place);
      });
      const bubbleStyle = computed(() => ({
        top: pos.value.top + "px",
        left: pos.value.left + "px",
        width: props.width + "px",
        transform: props.placement === "top" ? "translateY(-100%)" : void 0
      }));
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          Fragment,
          null,
          [
            createElementVNode(
              "span",
              {
                ref_key: "trigger",
                ref: trigger,
                class: normalizeClass(["wd-popconfirm", { "wd-popconfirm--open": open.value }]),
                onClick: _cache[0] || (_cache[0] = ($event) => open.value ? hide() : show2())
              },
              [
                renderSlot(_ctx.$slots, "default")
              ],
              2
              /* CLASS */
            ),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              createCommentVNode("\n      \u4E0D\u7528 <Transition>\uFF1A\u5B83\u7684 enter \u9636\u6BB5\u4F9D\u8D56 nextFrame\uFF0C\u52A8\u753B\u65F6\u949F\u505C\u6446\u65F6\n      \uFF08\u540E\u53F0\u6807\u7B7E\u9875 / \u65E0\u5934\u6E32\u67D3 / \u7CFB\u7EDF\u51CF\u5F31\u52A8\u6548\uFF09\u4E0D\u4F1A\u63A8\u8FDB\uFF0Center-from \u7C7B\n      \u4F1A\u6C38\u4E45\u6B8B\u7559\u5E76\u53E0\u52A0 leave \u7C7B\uFF0C\u5BFC\u81F4\u5143\u7D20\u5361\u5728\u534A\u900F\u660E\u4E14\u65E0\u6CD5\u9500\u6BC1\u3002\n      \u6539\u4E3A\u5E38\u9A7B\u8282\u70B9 + .is-open \u7C7B\u9A71\u52A8 CSS \u8FC7\u6E21\uFF0C\u72B6\u6001\u59CB\u7EC8\u7531\u6211\u4EEC\u638C\u63E1\u3002\n    "),
              withDirectives(createElementVNode("div", {
                ref_key: "bubble",
                ref: bubble,
                class: normalizeClass(["wd-popconfirm__bubble", { "is-open": open.value }]),
                style: normalizeStyle(bubbleStyle.value),
                role: "dialog",
                "aria-label": __props.title,
                "aria-hidden": !open.value,
                onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                }, ["stop"]))
              }, [
                createElementVNode("div", _hoisted_240, [
                  __props.variant === "danger" ? (openBlock(), createElementBlock("span", _hoisted_335, [
                    createVNode(_component_wd_icon, {
                      name: "warning-circle",
                      size: 14
                    })
                  ])) : createCommentVNode("v-if", true),
                  createTextVNode(
                    " " + toDisplayString(__props.title),
                    1
                    /* TEXT */
                  )
                ]),
                __props.description ? (openBlock(), createElementBlock(
                  "p",
                  _hoisted_429,
                  toDisplayString(__props.description),
                  1
                  /* TEXT */
                )) : createCommentVNode("v-if", true),
                createElementVNode("div", _hoisted_517, [
                  createElementVNode(
                    "button",
                    {
                      type: "button",
                      class: "wd-btn wd-btn--tint wd-btn--sm",
                      onClick: cancel
                    },
                    toDisplayString(__props.cancelText),
                    1
                    /* TEXT */
                  ),
                  createElementVNode(
                    "button",
                    {
                      type: "button",
                      "data-ok": "",
                      class: normalizeClass(["wd-btn wd-btn--sm wd-btn--primary", { "wd-popconfirm__ok--danger": __props.variant === "danger" }]),
                      onClick: confirm
                    },
                    toDisplayString(__props.okText),
                    3
                    /* TEXT, CLASS */
                  )
                ])
              ], 14, _hoisted_148), [
                [vShow, mounted.value]
              ])
            ]))
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });

  // .demo-build/WdPopover.ts
  var _hoisted_149 = {
    type: "button",
    class: "wd-popover__default-trigger"
  };
  var _hoisted_241 = ["aria-label"];
  var _hoisted_336 = {
    key: 0,
    class: "wd-popover__head"
  };
  var _hoisted_430 = { class: "wd-popover__title" };
  var _hoisted_518 = { class: "wd-popover__body" };
  var WdPopover_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdPopover" },
    __name: "WdPopover",
    props: {
      trigger: { type: String, required: false, default: "click" },
      title: { type: String, required: false, default: "" },
      placement: { type: String, required: false, default: "bottom-start" },
      gap: { type: Number, required: false, default: 8 },
      width: { type: Number, required: false, default: void 0 },
      closable: { type: Boolean, required: false, default: false },
      disabled: { type: Boolean, required: false, default: false },
      closeOnContent: { type: Boolean, required: false, default: false }
    },
    emits: ["update:open", "open", "close"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const open = ref(false);
      const anchorEl = ref(null);
      const panelEl = ref(null);
      const mounted = ref(false);
      const { pos } = useAnchoredPosition(open, anchorEl, panelEl, {
        placement: props.placement,
        gap: props.gap,
        width: props.width
      });
      const style = computed(() => ({
        top: pos.value.top + "px",
        left: pos.value.left + "px"
      }));
      function show2() {
        if (props.disabled || open.value) return;
        mounted.value = true;
        open.value = true;
        emit("open");
        emit("update:open", true);
      }
      function hide() {
        if (!open.value) return;
        open.value = false;
        emit("close");
        emit("update:open", false);
      }
      function toggle() {
        if (props.disabled) return;
        if (open.value) hide();
        else show2();
      }
      let hoverTimer = 0;
      function onEnter() {
        if (props.trigger !== "hover") return;
        clearTimeout(hoverTimer);
        show2();
      }
      function onLeave() {
        if (props.trigger !== "hover") return;
        clearTimeout(hoverTimer);
        hoverTimer = window.setTimeout(() => {
          if (panelEl.value?.matches(":hover")) return;
          hide();
        }, 120);
      }
      function onClick() {
        if (props.trigger === "click") toggle();
      }
      function onPanelClick(e) {
        if (!props.closeOnContent) return;
        const t = e.target;
        if (t.closest('button, a, input, select, textarea, [role="button"]')) return;
        hide();
      }
      watch(
        () => props.disabled,
        (v) => {
          if (v) hide();
        }
      );
      useDismiss([anchorEl, panelEl], hide, open);
      useOverlayLayer(open, panelEl, () => {
        hide();
        return true;
      });
      watch(open, async (v) => {
        if (v) {
          await nextTick();
          nextTick(() => {
          });
          return;
        }
        window.setTimeout(() => {
          if (!open.value) mounted.value = false;
        }, 200);
      });
      function onKeydown(e) {
        if (e.key === "Escape" && open.value) hide();
      }
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          Fragment,
          null,
          [
            createElementVNode(
              "span",
              {
                ref_key: "anchorEl",
                ref: anchorEl,
                class: "wd-popover",
                onMouseenter: onEnter,
                onMouseleave: onLeave,
                onClick,
                onKeydown
              },
              [
                renderSlot(_ctx.$slots, "trigger", {}, () => [
                  createElementVNode(
                    "button",
                    _hoisted_149,
                    toDisplayString(__props.title || "\u8BE6\u60C5"),
                    1
                    /* TEXT */
                  )
                ])
              ],
              544
              /* NEED_HYDRATION, NEED_PATCH */
            ),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              mounted.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "panelEl",
                ref: panelEl,
                class: normalizeClass(["wd-popover__panel", { "is-open": open.value }]),
                style: normalizeStyle(style.value),
                role: "dialog",
                "aria-label": __props.title || void 0,
                onMouseenter: onEnter,
                onMouseleave: onLeave,
                onClick: onPanelClick
              }, [
                __props.title || __props.closable ? (openBlock(), createElementBlock("div", _hoisted_336, [
                  createElementVNode(
                    "span",
                    _hoisted_430,
                    toDisplayString(__props.title),
                    1
                    /* TEXT */
                  ),
                  __props.closable ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    type: "button",
                    class: "wd-popover__close",
                    "aria-label": "\u5173\u95ED",
                    onClick: hide
                  }, [
                    createVNode(_component_wd_icon, {
                      name: "close",
                      size: 14
                    })
                  ])) : createCommentVNode("v-if", true)
                ])) : createCommentVNode("v-if", true),
                createElementVNode("div", _hoisted_518, [
                  renderSlot(_ctx.$slots, "default")
                ])
              ], 46, _hoisted_241)) : createCommentVNode("v-if", true)
            ]))
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });

  // .demo-build/WdPostItem.ts
  var _hoisted_150 = { class: "wd-post-item__title" };
  var _hoisted_242 = {
    key: 0,
    class: "wd-post-item__emoji"
  };
  var _hoisted_337 = {
    key: 0,
    class: "wd-post-item__summary"
  };
  var _hoisted_431 = {
    key: 1,
    class: "wd-post-item__tags"
  };
  var WdPostItem_default = /* @__PURE__ */ defineComponent({
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
        return openBlock(), createBlock(resolveDynamicComponent(__props.href ? "a" : "div"), {
          href: __props.href,
          class: "wd-post-item"
        }, {
          default: withCtx(() => [
            createElementVNode("h3", _hoisted_150, [
              __props.emoji ? (openBlock(), createElementBlock(
                "span",
                _hoisted_242,
                toDisplayString(__props.emoji),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true),
              createTextVNode(
                toDisplayString(__props.title),
                1
                /* TEXT */
              )
            ]),
            __props.summary ? (openBlock(), createElementBlock(
              "p",
              _hoisted_337,
              toDisplayString(__props.summary),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            __props.tags.length ? (openBlock(), createElementBlock("div", _hoisted_431, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(__props.tags, (t) => {
                  return openBlock(), createElementBlock(
                    "span",
                    {
                      key: t,
                      class: "wd-tag wd-tag--sm wd-tag--gray"
                    },
                    toDisplayString(t),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["href"]);
      };
    }
  });

  // .demo-build/WdProgress.ts
  var _hoisted_151 = ["aria-valuenow"];
  var WdProgress_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdProgress" },
    __name: "WdProgress",
    props: {
      value: { type: Number, required: false, default: 0 },
      thin: { type: Boolean, required: false, default: false },
      onDark: { type: Boolean, required: false, default: false }
    },
    setup(__props) {
      const props = __props;
      const percent = computed(() => Math.max(0, Math.min(100, props.value)));
      const classes = computed(() => [
        "wd-progress",
        props.thin ? "wd-progress--thin" : "",
        props.onDark ? "wd-progress--on-dark" : ""
      ]);
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: normalizeClass(classes.value),
          role: "progressbar",
          "aria-valuenow": percent.value,
          "aria-valuemin": "0",
          "aria-valuemax": "100"
        }, [
          createElementVNode(
            "span",
            {
              class: "wd-progress__bar",
              style: normalizeStyle({ width: percent.value + "%" })
            },
            null,
            4
            /* STYLE */
          )
        ], 10, _hoisted_151);
      };
    }
  });

  // .demo-build/vendor/qrcode-generator.js
  var qrcode = function() {
    var qrcode2 = function(typeNumber, errorCorrectionLevel) {
      var PAD0 = 236;
      var PAD1 = 17;
      var _typeNumber = typeNumber;
      var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
      var _modules = null;
      var _moduleCount = 0;
      var _dataCache = null;
      var _dataList = [];
      var _this = {};
      var makeImpl = function(test, maskPattern) {
        _moduleCount = _typeNumber * 4 + 17;
        _modules = function(moduleCount) {
          var modules = new Array(moduleCount);
          for (var row = 0; row < moduleCount; row += 1) {
            modules[row] = new Array(moduleCount);
            for (var col = 0; col < moduleCount; col += 1) {
              modules[row][col] = null;
            }
          }
          return modules;
        }(_moduleCount);
        setupPositionProbePattern(0, 0);
        setupPositionProbePattern(_moduleCount - 7, 0);
        setupPositionProbePattern(0, _moduleCount - 7);
        setupPositionAdjustPattern();
        setupTimingPattern();
        setupTypeInfo(test, maskPattern);
        if (_typeNumber >= 7) {
          setupTypeNumber(test);
        }
        if (_dataCache == null) {
          _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
        }
        mapData(_dataCache, maskPattern);
      };
      var setupPositionProbePattern = function(row, col) {
        for (var r = -1; r <= 7; r += 1) {
          if (row + r <= -1 || _moduleCount <= row + r) continue;
          for (var c = -1; c <= 7; c += 1) {
            if (col + c <= -1 || _moduleCount <= col + c) continue;
            if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
              _modules[row + r][col + c] = true;
            } else {
              _modules[row + r][col + c] = false;
            }
          }
        }
      };
      var getBestMaskPattern = function() {
        var minLostPoint = 0;
        var pattern = 0;
        for (var i = 0; i < 8; i += 1) {
          makeImpl(true, i);
          var lostPoint = QRUtil.getLostPoint(_this);
          if (i == 0 || minLostPoint > lostPoint) {
            minLostPoint = lostPoint;
            pattern = i;
          }
        }
        return pattern;
      };
      var setupTimingPattern = function() {
        for (var r = 8; r < _moduleCount - 8; r += 1) {
          if (_modules[r][6] != null) {
            continue;
          }
          _modules[r][6] = r % 2 == 0;
        }
        for (var c = 8; c < _moduleCount - 8; c += 1) {
          if (_modules[6][c] != null) {
            continue;
          }
          _modules[6][c] = c % 2 == 0;
        }
      };
      var setupPositionAdjustPattern = function() {
        var pos = QRUtil.getPatternPosition(_typeNumber);
        for (var i = 0; i < pos.length; i += 1) {
          for (var j = 0; j < pos.length; j += 1) {
            var row = pos[i];
            var col = pos[j];
            if (_modules[row][col] != null) {
              continue;
            }
            for (var r = -2; r <= 2; r += 1) {
              for (var c = -2; c <= 2; c += 1) {
                if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                  _modules[row + r][col + c] = true;
                } else {
                  _modules[row + r][col + c] = false;
                }
              }
            }
          }
        }
      };
      var setupTypeNumber = function(test) {
        var bits = QRUtil.getBCHTypeNumber(_typeNumber);
        for (var i = 0; i < 18; i += 1) {
          var mod = !test && (bits >> i & 1) == 1;
          _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
        }
        for (var i = 0; i < 18; i += 1) {
          var mod = !test && (bits >> i & 1) == 1;
          _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
        }
      };
      var setupTypeInfo = function(test, maskPattern) {
        var data = _errorCorrectionLevel << 3 | maskPattern;
        var bits = QRUtil.getBCHTypeInfo(data);
        for (var i = 0; i < 15; i += 1) {
          var mod = !test && (bits >> i & 1) == 1;
          if (i < 6) {
            _modules[i][8] = mod;
          } else if (i < 8) {
            _modules[i + 1][8] = mod;
          } else {
            _modules[_moduleCount - 15 + i][8] = mod;
          }
        }
        for (var i = 0; i < 15; i += 1) {
          var mod = !test && (bits >> i & 1) == 1;
          if (i < 8) {
            _modules[8][_moduleCount - i - 1] = mod;
          } else if (i < 9) {
            _modules[8][15 - i - 1 + 1] = mod;
          } else {
            _modules[8][15 - i - 1] = mod;
          }
        }
        _modules[_moduleCount - 8][8] = !test;
      };
      var mapData = function(data, maskPattern) {
        var inc = -1;
        var row = _moduleCount - 1;
        var bitIndex = 7;
        var byteIndex = 0;
        var maskFunc = QRUtil.getMaskFunction(maskPattern);
        for (var col = _moduleCount - 1; col > 0; col -= 2) {
          if (col == 6) col -= 1;
          while (true) {
            for (var c = 0; c < 2; c += 1) {
              if (_modules[row][col - c] == null) {
                var dark = false;
                if (byteIndex < data.length) {
                  dark = (data[byteIndex] >>> bitIndex & 1) == 1;
                }
                var mask = maskFunc(row, col - c);
                if (mask) {
                  dark = !dark;
                }
                _modules[row][col - c] = dark;
                bitIndex -= 1;
                if (bitIndex == -1) {
                  byteIndex += 1;
                  bitIndex = 7;
                }
              }
            }
            row += inc;
            if (row < 0 || _moduleCount <= row) {
              row -= inc;
              inc = -inc;
              break;
            }
          }
        }
      };
      var createBytes = function(buffer, rsBlocks) {
        var offset = 0;
        var maxDcCount = 0;
        var maxEcCount = 0;
        var dcdata = new Array(rsBlocks.length);
        var ecdata = new Array(rsBlocks.length);
        for (var r = 0; r < rsBlocks.length; r += 1) {
          var dcCount = rsBlocks[r].dataCount;
          var ecCount = rsBlocks[r].totalCount - dcCount;
          maxDcCount = Math.max(maxDcCount, dcCount);
          maxEcCount = Math.max(maxEcCount, ecCount);
          dcdata[r] = new Array(dcCount);
          for (var i = 0; i < dcdata[r].length; i += 1) {
            dcdata[r][i] = 255 & buffer.getBuffer()[i + offset];
          }
          offset += dcCount;
          var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
          var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
          var modPoly = rawPoly.mod(rsPoly);
          ecdata[r] = new Array(rsPoly.getLength() - 1);
          for (var i = 0; i < ecdata[r].length; i += 1) {
            var modIndex = i + modPoly.getLength() - ecdata[r].length;
            ecdata[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
          }
        }
        var totalCodeCount = 0;
        for (var i = 0; i < rsBlocks.length; i += 1) {
          totalCodeCount += rsBlocks[i].totalCount;
        }
        var data = new Array(totalCodeCount);
        var index = 0;
        for (var i = 0; i < maxDcCount; i += 1) {
          for (var r = 0; r < rsBlocks.length; r += 1) {
            if (i < dcdata[r].length) {
              data[index] = dcdata[r][i];
              index += 1;
            }
          }
        }
        for (var i = 0; i < maxEcCount; i += 1) {
          for (var r = 0; r < rsBlocks.length; r += 1) {
            if (i < ecdata[r].length) {
              data[index] = ecdata[r][i];
              index += 1;
            }
          }
        }
        return data;
      };
      var createData = function(typeNumber2, errorCorrectionLevel2, dataList) {
        var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, errorCorrectionLevel2);
        var buffer = qrBitBuffer();
        for (var i = 0; i < dataList.length; i += 1) {
          var data = dataList[i];
          buffer.put(data.getMode(), 4);
          buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
          data.write(buffer);
        }
        var totalDataCount = 0;
        for (var i = 0; i < rsBlocks.length; i += 1) {
          totalDataCount += rsBlocks[i].dataCount;
        }
        if (buffer.getLengthInBits() > totalDataCount * 8) {
          throw "code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")";
        }
        if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
          buffer.put(0, 4);
        }
        while (buffer.getLengthInBits() % 8 != 0) {
          buffer.putBit(false);
        }
        while (true) {
          if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
          }
          buffer.put(PAD0, 8);
          if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
          }
          buffer.put(PAD1, 8);
        }
        return createBytes(buffer, rsBlocks);
      };
      _this.addData = function(data, mode) {
        mode = mode || "Byte";
        var newData = null;
        switch (mode) {
          case "Numeric":
            newData = qrNumber(data);
            break;
          case "Alphanumeric":
            newData = qrAlphaNum(data);
            break;
          case "Byte":
            newData = qr8BitByte(data);
            break;
          case "Kanji":
            newData = qrKanji(data);
            break;
          default:
            throw "mode:" + mode;
        }
        _dataList.push(newData);
        _dataCache = null;
      };
      _this.isDark = function(row, col) {
        if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
          throw row + "," + col;
        }
        return _modules[row][col];
      };
      _this.getModuleCount = function() {
        return _moduleCount;
      };
      _this.make = function() {
        if (_typeNumber < 1) {
          var typeNumber2 = 1;
          for (; typeNumber2 < 40; typeNumber2++) {
            var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, _errorCorrectionLevel);
            var buffer = qrBitBuffer();
            for (var i = 0; i < _dataList.length; i++) {
              var data = _dataList[i];
              buffer.put(data.getMode(), 4);
              buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
              data.write(buffer);
            }
            var totalDataCount = 0;
            for (var i = 0; i < rsBlocks.length; i++) {
              totalDataCount += rsBlocks[i].dataCount;
            }
            if (buffer.getLengthInBits() <= totalDataCount * 8) {
              break;
            }
          }
          _typeNumber = typeNumber2;
        }
        makeImpl(false, getBestMaskPattern());
      };
      _this.createTableTag = function(cellSize, margin) {
        cellSize = cellSize || 2;
        margin = typeof margin == "undefined" ? cellSize * 4 : margin;
        var qrHtml = "";
        qrHtml += '<table style="';
        qrHtml += " border-width: 0px; border-style: none;";
        qrHtml += " border-collapse: collapse;";
        qrHtml += " padding: 0px; margin: " + margin + "px;";
        qrHtml += '">';
        qrHtml += "<tbody>";
        for (var r = 0; r < _this.getModuleCount(); r += 1) {
          qrHtml += "<tr>";
          for (var c = 0; c < _this.getModuleCount(); c += 1) {
            qrHtml += '<td style="';
            qrHtml += " border-width: 0px; border-style: none;";
            qrHtml += " border-collapse: collapse;";
            qrHtml += " padding: 0px; margin: 0px;";
            qrHtml += " width: " + cellSize + "px;";
            qrHtml += " height: " + cellSize + "px;";
            qrHtml += " background-color: ";
            qrHtml += _this.isDark(r, c) ? "#000000" : "#ffffff";
            qrHtml += ";";
            qrHtml += '"/>';
          }
          qrHtml += "</tr>";
        }
        qrHtml += "</tbody>";
        qrHtml += "</table>";
        return qrHtml;
      };
      _this.createSvgTag = function(cellSize, margin, alt, title) {
        var opts = {};
        if (typeof arguments[0] == "object") {
          opts = arguments[0];
          cellSize = opts.cellSize;
          margin = opts.margin;
          alt = opts.alt;
          title = opts.title;
        }
        cellSize = cellSize || 2;
        margin = typeof margin == "undefined" ? cellSize * 4 : margin;
        alt = typeof alt === "string" ? { text: alt } : alt || {};
        alt.text = alt.text || null;
        alt.id = alt.text ? alt.id || "qrcode-description" : null;
        title = typeof title === "string" ? { text: title } : title || {};
        title.text = title.text || null;
        title.id = title.text ? title.id || "qrcode-title" : null;
        var size = _this.getModuleCount() * cellSize + margin * 2;
        var c, mc, r, mr, qrSvg = "", rect;
        rect = "l" + cellSize + ",0 0," + cellSize + " -" + cellSize + ",0 0,-" + cellSize + "z ";
        qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
        qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : "";
        qrSvg += ' viewBox="0 0 ' + size + " " + size + '" ';
        qrSvg += ' preserveAspectRatio="xMinYMin meet"';
        qrSvg += title.text || alt.text ? ' role="img" aria-labelledby="' + escapeXml([title.id, alt.id].join(" ").trim()) + '"' : "";
        qrSvg += ">";
        qrSvg += title.text ? '<title id="' + escapeXml(title.id) + '">' + escapeXml(title.text) + "</title>" : "";
        qrSvg += alt.text ? '<description id="' + escapeXml(alt.id) + '">' + escapeXml(alt.text) + "</description>" : "";
        qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
        qrSvg += '<path d="';
        for (r = 0; r < _this.getModuleCount(); r += 1) {
          mr = r * cellSize + margin;
          for (c = 0; c < _this.getModuleCount(); c += 1) {
            if (_this.isDark(r, c)) {
              mc = c * cellSize + margin;
              qrSvg += "M" + mc + "," + mr + rect;
            }
          }
        }
        qrSvg += '" stroke="transparent" fill="black"/>';
        qrSvg += "</svg>";
        return qrSvg;
      };
      _this.createDataURL = function(cellSize, margin) {
        cellSize = cellSize || 2;
        margin = typeof margin == "undefined" ? cellSize * 4 : margin;
        var size = _this.getModuleCount() * cellSize + margin * 2;
        var min = margin;
        var max = size - margin;
        return createDataURL(size, size, function(x, y) {
          if (min <= x && x < max && min <= y && y < max) {
            var c = Math.floor((x - min) / cellSize);
            var r = Math.floor((y - min) / cellSize);
            return _this.isDark(r, c) ? 0 : 1;
          } else {
            return 1;
          }
        });
      };
      _this.createImgTag = function(cellSize, margin, alt) {
        cellSize = cellSize || 2;
        margin = typeof margin == "undefined" ? cellSize * 4 : margin;
        var size = _this.getModuleCount() * cellSize + margin * 2;
        var img = "";
        img += "<img";
        img += ' src="';
        img += _this.createDataURL(cellSize, margin);
        img += '"';
        img += ' width="';
        img += size;
        img += '"';
        img += ' height="';
        img += size;
        img += '"';
        if (alt) {
          img += ' alt="';
          img += escapeXml(alt);
          img += '"';
        }
        img += "/>";
        return img;
      };
      var escapeXml = function(s) {
        var escaped = "";
        for (var i = 0; i < s.length; i += 1) {
          var c = s.charAt(i);
          switch (c) {
            case "<":
              escaped += "&lt;";
              break;
            case ">":
              escaped += "&gt;";
              break;
            case "&":
              escaped += "&amp;";
              break;
            case '"':
              escaped += "&quot;";
              break;
            default:
              escaped += c;
              break;
          }
        }
        return escaped;
      };
      var _createHalfASCII = function(margin) {
        var cellSize = 1;
        margin = typeof margin == "undefined" ? cellSize * 2 : margin;
        var size = _this.getModuleCount() * cellSize + margin * 2;
        var min = margin;
        var max = size - margin;
        var y, x, r1, r2, p;
        var blocks = {
          "\u2588\u2588": "\u2588",
          "\u2588 ": "\u2580",
          " \u2588": "\u2584",
          "  ": " "
        };
        var blocksLastLineNoMargin = {
          "\u2588\u2588": "\u2580",
          "\u2588 ": "\u2580",
          " \u2588": " ",
          "  ": " "
        };
        var ascii = "";
        for (y = 0; y < size; y += 2) {
          r1 = Math.floor((y - min) / cellSize);
          r2 = Math.floor((y + 1 - min) / cellSize);
          for (x = 0; x < size; x += 1) {
            p = "\u2588";
            if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
              p = " ";
            }
            if (min <= x && x < max && min <= y + 1 && y + 1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
              p += " ";
            } else {
              p += "\u2588";
            }
            ascii += margin < 1 && y + 1 >= max ? blocksLastLineNoMargin[p] : blocks[p];
          }
          ascii += "\n";
        }
        if (size % 2 && margin > 0) {
          return ascii.substring(0, ascii.length - size - 1) + Array(size + 1).join("\u2580");
        }
        return ascii.substring(0, ascii.length - 1);
      };
      _this.createASCII = function(cellSize, margin) {
        cellSize = cellSize || 1;
        if (cellSize < 2) {
          return _createHalfASCII(margin);
        }
        cellSize -= 1;
        margin = typeof margin == "undefined" ? cellSize * 2 : margin;
        var size = _this.getModuleCount() * cellSize + margin * 2;
        var min = margin;
        var max = size - margin;
        var y, x, r, p;
        var white = Array(cellSize + 1).join("\u2588\u2588");
        var black = Array(cellSize + 1).join("  ");
        var ascii = "";
        var line = "";
        for (y = 0; y < size; y += 1) {
          r = Math.floor((y - min) / cellSize);
          line = "";
          for (x = 0; x < size; x += 1) {
            p = 1;
            if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
              p = 0;
            }
            line += p ? white : black;
          }
          for (r = 0; r < cellSize; r += 1) {
            ascii += line + "\n";
          }
        }
        return ascii.substring(0, ascii.length - 1);
      };
      _this.renderTo2dContext = function(context, cellSize) {
        cellSize = cellSize || 2;
        var length = _this.getModuleCount();
        for (var row = 0; row < length; row++) {
          for (var col = 0; col < length; col++) {
            context.fillStyle = _this.isDark(row, col) ? "black" : "white";
            context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
          }
        }
      };
      return _this;
    };
    qrcode2.stringToBytesFuncs = {
      "default": function(s) {
        var bytes = [];
        for (var i = 0; i < s.length; i += 1) {
          var c = s.charCodeAt(i);
          bytes.push(c & 255);
        }
        return bytes;
      }
    };
    qrcode2.stringToBytes = qrcode2.stringToBytesFuncs["default"];
    qrcode2.createStringToBytes = function(unicodeData, numChars) {
      var unicodeMap = function() {
        var bin = base64DecodeInputStream(unicodeData);
        var read = function() {
          var b = bin.read();
          if (b == -1) throw "eof";
          return b;
        };
        var count = 0;
        var unicodeMap2 = {};
        while (true) {
          var b0 = bin.read();
          if (b0 == -1) break;
          var b1 = read();
          var b2 = read();
          var b3 = read();
          var k = String.fromCharCode(b0 << 8 | b1);
          var v = b2 << 8 | b3;
          unicodeMap2[k] = v;
          count += 1;
        }
        if (count != numChars) {
          throw count + " != " + numChars;
        }
        return unicodeMap2;
      }();
      var unknownChar = "?".charCodeAt(0);
      return function(s) {
        var bytes = [];
        for (var i = 0; i < s.length; i += 1) {
          var c = s.charCodeAt(i);
          if (c < 128) {
            bytes.push(c);
          } else {
            var b = unicodeMap[s.charAt(i)];
            if (typeof b == "number") {
              if ((b & 255) == b) {
                bytes.push(b);
              } else {
                bytes.push(b >>> 8);
                bytes.push(b & 255);
              }
            } else {
              bytes.push(unknownChar);
            }
          }
        }
        return bytes;
      };
    };
    var QRMode = {
      MODE_NUMBER: 1 << 0,
      MODE_ALPHA_NUM: 1 << 1,
      MODE_8BIT_BYTE: 1 << 2,
      MODE_KANJI: 1 << 3
    };
    var QRErrorCorrectionLevel = {
      L: 1,
      M: 0,
      Q: 3,
      H: 2
    };
    var QRMaskPattern = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var QRUtil = function() {
      var PATTERN_POSITION_TABLE = [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
      ];
      var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
      var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
      var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
      var _this = {};
      var getBCHDigit = function(data) {
        var digit = 0;
        while (data != 0) {
          digit += 1;
          data >>>= 1;
        }
        return digit;
      };
      _this.getBCHTypeInfo = function(data) {
        var d = data << 10;
        while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
          d ^= G15 << getBCHDigit(d) - getBCHDigit(G15);
        }
        return (data << 10 | d) ^ G15_MASK;
      };
      _this.getBCHTypeNumber = function(data) {
        var d = data << 12;
        while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
          d ^= G18 << getBCHDigit(d) - getBCHDigit(G18);
        }
        return data << 12 | d;
      };
      _this.getPatternPosition = function(typeNumber) {
        return PATTERN_POSITION_TABLE[typeNumber - 1];
      };
      _this.getMaskFunction = function(maskPattern) {
        switch (maskPattern) {
          case QRMaskPattern.PATTERN000:
            return function(i, j) {
              return (i + j) % 2 == 0;
            };
          case QRMaskPattern.PATTERN001:
            return function(i, j) {
              return i % 2 == 0;
            };
          case QRMaskPattern.PATTERN010:
            return function(i, j) {
              return j % 3 == 0;
            };
          case QRMaskPattern.PATTERN011:
            return function(i, j) {
              return (i + j) % 3 == 0;
            };
          case QRMaskPattern.PATTERN100:
            return function(i, j) {
              return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
            };
          case QRMaskPattern.PATTERN101:
            return function(i, j) {
              return i * j % 2 + i * j % 3 == 0;
            };
          case QRMaskPattern.PATTERN110:
            return function(i, j) {
              return (i * j % 2 + i * j % 3) % 2 == 0;
            };
          case QRMaskPattern.PATTERN111:
            return function(i, j) {
              return (i * j % 3 + (i + j) % 2) % 2 == 0;
            };
          default:
            throw "bad maskPattern:" + maskPattern;
        }
      };
      _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
        var a = qrPolynomial([1], 0);
        for (var i = 0; i < errorCorrectLength; i += 1) {
          a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
        }
        return a;
      };
      _this.getLengthInBits = function(mode, type) {
        if (1 <= type && type < 10) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 10;
            case QRMode.MODE_ALPHA_NUM:
              return 9;
            case QRMode.MODE_8BIT_BYTE:
              return 8;
            case QRMode.MODE_KANJI:
              return 8;
            default:
              throw "mode:" + mode;
          }
        } else if (type < 27) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 12;
            case QRMode.MODE_ALPHA_NUM:
              return 11;
            case QRMode.MODE_8BIT_BYTE:
              return 16;
            case QRMode.MODE_KANJI:
              return 10;
            default:
              throw "mode:" + mode;
          }
        } else if (type < 41) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 14;
            case QRMode.MODE_ALPHA_NUM:
              return 13;
            case QRMode.MODE_8BIT_BYTE:
              return 16;
            case QRMode.MODE_KANJI:
              return 12;
            default:
              throw "mode:" + mode;
          }
        } else {
          throw "type:" + type;
        }
      };
      _this.getLostPoint = function(qrcode3) {
        var moduleCount = qrcode3.getModuleCount();
        var lostPoint = 0;
        for (var row = 0; row < moduleCount; row += 1) {
          for (var col = 0; col < moduleCount; col += 1) {
            var sameCount = 0;
            var dark = qrcode3.isDark(row, col);
            for (var r = -1; r <= 1; r += 1) {
              if (row + r < 0 || moduleCount <= row + r) {
                continue;
              }
              for (var c = -1; c <= 1; c += 1) {
                if (col + c < 0 || moduleCount <= col + c) {
                  continue;
                }
                if (r == 0 && c == 0) {
                  continue;
                }
                if (dark == qrcode3.isDark(row + r, col + c)) {
                  sameCount += 1;
                }
              }
            }
            if (sameCount > 5) {
              lostPoint += 3 + sameCount - 5;
            }
          }
        }
        ;
        for (var row = 0; row < moduleCount - 1; row += 1) {
          for (var col = 0; col < moduleCount - 1; col += 1) {
            var count = 0;
            if (qrcode3.isDark(row, col)) count += 1;
            if (qrcode3.isDark(row + 1, col)) count += 1;
            if (qrcode3.isDark(row, col + 1)) count += 1;
            if (qrcode3.isDark(row + 1, col + 1)) count += 1;
            if (count == 0 || count == 4) {
              lostPoint += 3;
            }
          }
        }
        for (var row = 0; row < moduleCount; row += 1) {
          for (var col = 0; col < moduleCount - 6; col += 1) {
            if (qrcode3.isDark(row, col) && !qrcode3.isDark(row, col + 1) && qrcode3.isDark(row, col + 2) && qrcode3.isDark(row, col + 3) && qrcode3.isDark(row, col + 4) && !qrcode3.isDark(row, col + 5) && qrcode3.isDark(row, col + 6)) {
              lostPoint += 40;
            }
          }
        }
        for (var col = 0; col < moduleCount; col += 1) {
          for (var row = 0; row < moduleCount - 6; row += 1) {
            if (qrcode3.isDark(row, col) && !qrcode3.isDark(row + 1, col) && qrcode3.isDark(row + 2, col) && qrcode3.isDark(row + 3, col) && qrcode3.isDark(row + 4, col) && !qrcode3.isDark(row + 5, col) && qrcode3.isDark(row + 6, col)) {
              lostPoint += 40;
            }
          }
        }
        var darkCount = 0;
        for (var col = 0; col < moduleCount; col += 1) {
          for (var row = 0; row < moduleCount; row += 1) {
            if (qrcode3.isDark(row, col)) {
              darkCount += 1;
            }
          }
        }
        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;
        return lostPoint;
      };
      return _this;
    }();
    var QRMath = function() {
      var EXP_TABLE = new Array(256);
      var LOG_TABLE = new Array(256);
      for (var i = 0; i < 8; i += 1) {
        EXP_TABLE[i] = 1 << i;
      }
      for (var i = 8; i < 256; i += 1) {
        EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
      }
      for (var i = 0; i < 255; i += 1) {
        LOG_TABLE[EXP_TABLE[i]] = i;
      }
      var _this = {};
      _this.glog = function(n) {
        if (n < 1) {
          throw "glog(" + n + ")";
        }
        return LOG_TABLE[n];
      };
      _this.gexp = function(n) {
        while (n < 0) {
          n += 255;
        }
        while (n >= 256) {
          n -= 255;
        }
        return EXP_TABLE[n];
      };
      return _this;
    }();
    function qrPolynomial(num, shift) {
      if (typeof num.length == "undefined") {
        throw num.length + "/" + shift;
      }
      var _num = function() {
        var offset = 0;
        while (offset < num.length && num[offset] == 0) {
          offset += 1;
        }
        var _num2 = new Array(num.length - offset + shift);
        for (var i = 0; i < num.length - offset; i += 1) {
          _num2[i] = num[i + offset];
        }
        return _num2;
      }();
      var _this = {};
      _this.getAt = function(index) {
        return _num[index];
      };
      _this.getLength = function() {
        return _num.length;
      };
      _this.multiply = function(e) {
        var num2 = new Array(_this.getLength() + e.getLength() - 1);
        for (var i = 0; i < _this.getLength(); i += 1) {
          for (var j = 0; j < e.getLength(); j += 1) {
            num2[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
          }
        }
        return qrPolynomial(num2, 0);
      };
      _this.mod = function(e) {
        if (_this.getLength() - e.getLength() < 0) {
          return _this;
        }
        var ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));
        var num2 = new Array(_this.getLength());
        for (var i = 0; i < _this.getLength(); i += 1) {
          num2[i] = _this.getAt(i);
        }
        for (var i = 0; i < e.getLength(); i += 1) {
          num2[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
        }
        return qrPolynomial(num2, 0).mod(e);
      };
      return _this;
    }
    ;
    var QRRSBlock = function() {
      var RS_BLOCK_TABLE = [
        // L
        // M
        // Q
        // H
        // 1
        [1, 26, 19],
        [1, 26, 16],
        [1, 26, 13],
        [1, 26, 9],
        // 2
        [1, 44, 34],
        [1, 44, 28],
        [1, 44, 22],
        [1, 44, 16],
        // 3
        [1, 70, 55],
        [1, 70, 44],
        [2, 35, 17],
        [2, 35, 13],
        // 4
        [1, 100, 80],
        [2, 50, 32],
        [2, 50, 24],
        [4, 25, 9],
        // 5
        [1, 134, 108],
        [2, 67, 43],
        [2, 33, 15, 2, 34, 16],
        [2, 33, 11, 2, 34, 12],
        // 6
        [2, 86, 68],
        [4, 43, 27],
        [4, 43, 19],
        [4, 43, 15],
        // 7
        [2, 98, 78],
        [4, 49, 31],
        [2, 32, 14, 4, 33, 15],
        [4, 39, 13, 1, 40, 14],
        // 8
        [2, 121, 97],
        [2, 60, 38, 2, 61, 39],
        [4, 40, 18, 2, 41, 19],
        [4, 40, 14, 2, 41, 15],
        // 9
        [2, 146, 116],
        [3, 58, 36, 2, 59, 37],
        [4, 36, 16, 4, 37, 17],
        [4, 36, 12, 4, 37, 13],
        // 10
        [2, 86, 68, 2, 87, 69],
        [4, 69, 43, 1, 70, 44],
        [6, 43, 19, 2, 44, 20],
        [6, 43, 15, 2, 44, 16],
        // 11
        [4, 101, 81],
        [1, 80, 50, 4, 81, 51],
        [4, 50, 22, 4, 51, 23],
        [3, 36, 12, 8, 37, 13],
        // 12
        [2, 116, 92, 2, 117, 93],
        [6, 58, 36, 2, 59, 37],
        [4, 46, 20, 6, 47, 21],
        [7, 42, 14, 4, 43, 15],
        // 13
        [4, 133, 107],
        [8, 59, 37, 1, 60, 38],
        [8, 44, 20, 4, 45, 21],
        [12, 33, 11, 4, 34, 12],
        // 14
        [3, 145, 115, 1, 146, 116],
        [4, 64, 40, 5, 65, 41],
        [11, 36, 16, 5, 37, 17],
        [11, 36, 12, 5, 37, 13],
        // 15
        [5, 109, 87, 1, 110, 88],
        [5, 65, 41, 5, 66, 42],
        [5, 54, 24, 7, 55, 25],
        [11, 36, 12, 7, 37, 13],
        // 16
        [5, 122, 98, 1, 123, 99],
        [7, 73, 45, 3, 74, 46],
        [15, 43, 19, 2, 44, 20],
        [3, 45, 15, 13, 46, 16],
        // 17
        [1, 135, 107, 5, 136, 108],
        [10, 74, 46, 1, 75, 47],
        [1, 50, 22, 15, 51, 23],
        [2, 42, 14, 17, 43, 15],
        // 18
        [5, 150, 120, 1, 151, 121],
        [9, 69, 43, 4, 70, 44],
        [17, 50, 22, 1, 51, 23],
        [2, 42, 14, 19, 43, 15],
        // 19
        [3, 141, 113, 4, 142, 114],
        [3, 70, 44, 11, 71, 45],
        [17, 47, 21, 4, 48, 22],
        [9, 39, 13, 16, 40, 14],
        // 20
        [3, 135, 107, 5, 136, 108],
        [3, 67, 41, 13, 68, 42],
        [15, 54, 24, 5, 55, 25],
        [15, 43, 15, 10, 44, 16],
        // 21
        [4, 144, 116, 4, 145, 117],
        [17, 68, 42],
        [17, 50, 22, 6, 51, 23],
        [19, 46, 16, 6, 47, 17],
        // 22
        [2, 139, 111, 7, 140, 112],
        [17, 74, 46],
        [7, 54, 24, 16, 55, 25],
        [34, 37, 13],
        // 23
        [4, 151, 121, 5, 152, 122],
        [4, 75, 47, 14, 76, 48],
        [11, 54, 24, 14, 55, 25],
        [16, 45, 15, 14, 46, 16],
        // 24
        [6, 147, 117, 4, 148, 118],
        [6, 73, 45, 14, 74, 46],
        [11, 54, 24, 16, 55, 25],
        [30, 46, 16, 2, 47, 17],
        // 25
        [8, 132, 106, 4, 133, 107],
        [8, 75, 47, 13, 76, 48],
        [7, 54, 24, 22, 55, 25],
        [22, 45, 15, 13, 46, 16],
        // 26
        [10, 142, 114, 2, 143, 115],
        [19, 74, 46, 4, 75, 47],
        [28, 50, 22, 6, 51, 23],
        [33, 46, 16, 4, 47, 17],
        // 27
        [8, 152, 122, 4, 153, 123],
        [22, 73, 45, 3, 74, 46],
        [8, 53, 23, 26, 54, 24],
        [12, 45, 15, 28, 46, 16],
        // 28
        [3, 147, 117, 10, 148, 118],
        [3, 73, 45, 23, 74, 46],
        [4, 54, 24, 31, 55, 25],
        [11, 45, 15, 31, 46, 16],
        // 29
        [7, 146, 116, 7, 147, 117],
        [21, 73, 45, 7, 74, 46],
        [1, 53, 23, 37, 54, 24],
        [19, 45, 15, 26, 46, 16],
        // 30
        [5, 145, 115, 10, 146, 116],
        [19, 75, 47, 10, 76, 48],
        [15, 54, 24, 25, 55, 25],
        [23, 45, 15, 25, 46, 16],
        // 31
        [13, 145, 115, 3, 146, 116],
        [2, 74, 46, 29, 75, 47],
        [42, 54, 24, 1, 55, 25],
        [23, 45, 15, 28, 46, 16],
        // 32
        [17, 145, 115],
        [10, 74, 46, 23, 75, 47],
        [10, 54, 24, 35, 55, 25],
        [19, 45, 15, 35, 46, 16],
        // 33
        [17, 145, 115, 1, 146, 116],
        [14, 74, 46, 21, 75, 47],
        [29, 54, 24, 19, 55, 25],
        [11, 45, 15, 46, 46, 16],
        // 34
        [13, 145, 115, 6, 146, 116],
        [14, 74, 46, 23, 75, 47],
        [44, 54, 24, 7, 55, 25],
        [59, 46, 16, 1, 47, 17],
        // 35
        [12, 151, 121, 7, 152, 122],
        [12, 75, 47, 26, 76, 48],
        [39, 54, 24, 14, 55, 25],
        [22, 45, 15, 41, 46, 16],
        // 36
        [6, 151, 121, 14, 152, 122],
        [6, 75, 47, 34, 76, 48],
        [46, 54, 24, 10, 55, 25],
        [2, 45, 15, 64, 46, 16],
        // 37
        [17, 152, 122, 4, 153, 123],
        [29, 74, 46, 14, 75, 47],
        [49, 54, 24, 10, 55, 25],
        [24, 45, 15, 46, 46, 16],
        // 38
        [4, 152, 122, 18, 153, 123],
        [13, 74, 46, 32, 75, 47],
        [48, 54, 24, 14, 55, 25],
        [42, 45, 15, 32, 46, 16],
        // 39
        [20, 147, 117, 4, 148, 118],
        [40, 75, 47, 7, 76, 48],
        [43, 54, 24, 22, 55, 25],
        [10, 45, 15, 67, 46, 16],
        // 40
        [19, 148, 118, 6, 149, 119],
        [18, 75, 47, 31, 76, 48],
        [34, 54, 24, 34, 55, 25],
        [20, 45, 15, 61, 46, 16]
      ];
      var qrRSBlock = function(totalCount, dataCount) {
        var _this2 = {};
        _this2.totalCount = totalCount;
        _this2.dataCount = dataCount;
        return _this2;
      };
      var _this = {};
      var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {
        switch (errorCorrectionLevel) {
          case QRErrorCorrectionLevel.L:
            return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
          case QRErrorCorrectionLevel.M:
            return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
          case QRErrorCorrectionLevel.Q:
            return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
          case QRErrorCorrectionLevel.H:
            return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
          default:
            return void 0;
        }
      };
      _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {
        var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
        if (typeof rsBlock == "undefined") {
          throw "bad rs block @ typeNumber:" + typeNumber + "/errorCorrectionLevel:" + errorCorrectionLevel;
        }
        var length = rsBlock.length / 3;
        var list = [];
        for (var i = 0; i < length; i += 1) {
          var count = rsBlock[i * 3 + 0];
          var totalCount = rsBlock[i * 3 + 1];
          var dataCount = rsBlock[i * 3 + 2];
          for (var j = 0; j < count; j += 1) {
            list.push(qrRSBlock(totalCount, dataCount));
          }
        }
        return list;
      };
      return _this;
    }();
    var qrBitBuffer = function() {
      var _buffer = [];
      var _length = 0;
      var _this = {};
      _this.getBuffer = function() {
        return _buffer;
      };
      _this.getAt = function(index) {
        var bufIndex = Math.floor(index / 8);
        return (_buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
      };
      _this.put = function(num, length) {
        for (var i = 0; i < length; i += 1) {
          _this.putBit((num >>> length - i - 1 & 1) == 1);
        }
      };
      _this.getLengthInBits = function() {
        return _length;
      };
      _this.putBit = function(bit) {
        var bufIndex = Math.floor(_length / 8);
        if (_buffer.length <= bufIndex) {
          _buffer.push(0);
        }
        if (bit) {
          _buffer[bufIndex] |= 128 >>> _length % 8;
        }
        _length += 1;
      };
      return _this;
    };
    var qrNumber = function(data) {
      var _mode = QRMode.MODE_NUMBER;
      var _data = data;
      var _this = {};
      _this.getMode = function() {
        return _mode;
      };
      _this.getLength = function(buffer) {
        return _data.length;
      };
      _this.write = function(buffer) {
        var data2 = _data;
        var i = 0;
        while (i + 2 < data2.length) {
          buffer.put(strToNum(data2.substring(i, i + 3)), 10);
          i += 3;
        }
        if (i < data2.length) {
          if (data2.length - i == 1) {
            buffer.put(strToNum(data2.substring(i, i + 1)), 4);
          } else if (data2.length - i == 2) {
            buffer.put(strToNum(data2.substring(i, i + 2)), 7);
          }
        }
      };
      var strToNum = function(s) {
        var num = 0;
        for (var i = 0; i < s.length; i += 1) {
          num = num * 10 + chatToNum(s.charAt(i));
        }
        return num;
      };
      var chatToNum = function(c) {
        if ("0" <= c && c <= "9") {
          return c.charCodeAt(0) - "0".charCodeAt(0);
        }
        throw "illegal char :" + c;
      };
      return _this;
    };
    var qrAlphaNum = function(data) {
      var _mode = QRMode.MODE_ALPHA_NUM;
      var _data = data;
      var _this = {};
      _this.getMode = function() {
        return _mode;
      };
      _this.getLength = function(buffer) {
        return _data.length;
      };
      _this.write = function(buffer) {
        var s = _data;
        var i = 0;
        while (i + 1 < s.length) {
          buffer.put(
            getCode(s.charAt(i)) * 45 + getCode(s.charAt(i + 1)),
            11
          );
          i += 2;
        }
        if (i < s.length) {
          buffer.put(getCode(s.charAt(i)), 6);
        }
      };
      var getCode = function(c) {
        if ("0" <= c && c <= "9") {
          return c.charCodeAt(0) - "0".charCodeAt(0);
        } else if ("A" <= c && c <= "Z") {
          return c.charCodeAt(0) - "A".charCodeAt(0) + 10;
        } else {
          switch (c) {
            case " ":
              return 36;
            case "$":
              return 37;
            case "%":
              return 38;
            case "*":
              return 39;
            case "+":
              return 40;
            case "-":
              return 41;
            case ".":
              return 42;
            case "/":
              return 43;
            case ":":
              return 44;
            default:
              throw "illegal char :" + c;
          }
        }
      };
      return _this;
    };
    var qr8BitByte = function(data) {
      var _mode = QRMode.MODE_8BIT_BYTE;
      var _data = data;
      var _bytes = qrcode2.stringToBytes(data);
      var _this = {};
      _this.getMode = function() {
        return _mode;
      };
      _this.getLength = function(buffer) {
        return _bytes.length;
      };
      _this.write = function(buffer) {
        for (var i = 0; i < _bytes.length; i += 1) {
          buffer.put(_bytes[i], 8);
        }
      };
      return _this;
    };
    var qrKanji = function(data) {
      var _mode = QRMode.MODE_KANJI;
      var _data = data;
      var stringToBytes = qrcode2.stringToBytesFuncs["SJIS"];
      if (!stringToBytes) {
        throw "sjis not supported.";
      }
      !function(c, code) {
        var test = stringToBytes(c);
        if (test.length != 2 || (test[0] << 8 | test[1]) != code) {
          throw "sjis not supported.";
        }
      }("\u53CB", 38726);
      var _bytes = stringToBytes(data);
      var _this = {};
      _this.getMode = function() {
        return _mode;
      };
      _this.getLength = function(buffer) {
        return ~~(_bytes.length / 2);
      };
      _this.write = function(buffer) {
        var data2 = _bytes;
        var i = 0;
        while (i + 1 < data2.length) {
          var c = (255 & data2[i]) << 8 | 255 & data2[i + 1];
          if (33088 <= c && c <= 40956) {
            c -= 33088;
          } else if (57408 <= c && c <= 60351) {
            c -= 49472;
          } else {
            throw "illegal char at " + (i + 1) + "/" + c;
          }
          c = (c >>> 8 & 255) * 192 + (c & 255);
          buffer.put(c, 13);
          i += 2;
        }
        if (i < data2.length) {
          throw "illegal char at " + (i + 1);
        }
      };
      return _this;
    };
    var byteArrayOutputStream = function() {
      var _bytes = [];
      var _this = {};
      _this.writeByte = function(b) {
        _bytes.push(b & 255);
      };
      _this.writeShort = function(i) {
        _this.writeByte(i);
        _this.writeByte(i >>> 8);
      };
      _this.writeBytes = function(b, off, len) {
        off = off || 0;
        len = len || b.length;
        for (var i = 0; i < len; i += 1) {
          _this.writeByte(b[i + off]);
        }
      };
      _this.writeString = function(s) {
        for (var i = 0; i < s.length; i += 1) {
          _this.writeByte(s.charCodeAt(i));
        }
      };
      _this.toByteArray = function() {
        return _bytes;
      };
      _this.toString = function() {
        var s = "";
        s += "[";
        for (var i = 0; i < _bytes.length; i += 1) {
          if (i > 0) {
            s += ",";
          }
          s += _bytes[i];
        }
        s += "]";
        return s;
      };
      return _this;
    };
    var base64EncodeOutputStream = function() {
      var _buffer = 0;
      var _buflen = 0;
      var _length = 0;
      var _base64 = "";
      var _this = {};
      var writeEncoded = function(b) {
        _base64 += String.fromCharCode(encode(b & 63));
      };
      var encode = function(n) {
        if (n < 0) {
        } else if (n < 26) {
          return 65 + n;
        } else if (n < 52) {
          return 97 + (n - 26);
        } else if (n < 62) {
          return 48 + (n - 52);
        } else if (n == 62) {
          return 43;
        } else if (n == 63) {
          return 47;
        }
        throw "n:" + n;
      };
      _this.writeByte = function(n) {
        _buffer = _buffer << 8 | n & 255;
        _buflen += 8;
        _length += 1;
        while (_buflen >= 6) {
          writeEncoded(_buffer >>> _buflen - 6);
          _buflen -= 6;
        }
      };
      _this.flush = function() {
        if (_buflen > 0) {
          writeEncoded(_buffer << 6 - _buflen);
          _buffer = 0;
          _buflen = 0;
        }
        if (_length % 3 != 0) {
          var padlen = 3 - _length % 3;
          for (var i = 0; i < padlen; i += 1) {
            _base64 += "=";
          }
        }
      };
      _this.toString = function() {
        return _base64;
      };
      return _this;
    };
    var base64DecodeInputStream = function(str) {
      var _str = str;
      var _pos = 0;
      var _buffer = 0;
      var _buflen = 0;
      var _this = {};
      _this.read = function() {
        while (_buflen < 8) {
          if (_pos >= _str.length) {
            if (_buflen == 0) {
              return -1;
            }
            throw "unexpected end of file./" + _buflen;
          }
          var c = _str.charAt(_pos);
          _pos += 1;
          if (c == "=") {
            _buflen = 0;
            return -1;
          } else if (c.match(/^\s$/)) {
            continue;
          }
          _buffer = _buffer << 6 | decode(c.charCodeAt(0));
          _buflen += 6;
        }
        var n = _buffer >>> _buflen - 8 & 255;
        _buflen -= 8;
        return n;
      };
      var decode = function(c) {
        if (65 <= c && c <= 90) {
          return c - 65;
        } else if (97 <= c && c <= 122) {
          return c - 97 + 26;
        } else if (48 <= c && c <= 57) {
          return c - 48 + 52;
        } else if (c == 43) {
          return 62;
        } else if (c == 47) {
          return 63;
        } else {
          throw "c:" + c;
        }
      };
      return _this;
    };
    var gifImage = function(width, height) {
      var _width = width;
      var _height = height;
      var _data = new Array(width * height);
      var _this = {};
      _this.setPixel = function(x, y, pixel) {
        _data[y * _width + x] = pixel;
      };
      _this.write = function(out) {
        out.writeString("GIF87a");
        out.writeShort(_width);
        out.writeShort(_height);
        out.writeByte(128);
        out.writeByte(0);
        out.writeByte(0);
        out.writeByte(0);
        out.writeByte(0);
        out.writeByte(0);
        out.writeByte(255);
        out.writeByte(255);
        out.writeByte(255);
        out.writeString(",");
        out.writeShort(0);
        out.writeShort(0);
        out.writeShort(_width);
        out.writeShort(_height);
        out.writeByte(0);
        var lzwMinCodeSize = 2;
        var raster = getLZWRaster(lzwMinCodeSize);
        out.writeByte(lzwMinCodeSize);
        var offset = 0;
        while (raster.length - offset > 255) {
          out.writeByte(255);
          out.writeBytes(raster, offset, 255);
          offset += 255;
        }
        out.writeByte(raster.length - offset);
        out.writeBytes(raster, offset, raster.length - offset);
        out.writeByte(0);
        out.writeString(";");
      };
      var bitOutputStream = function(out) {
        var _out = out;
        var _bitLength = 0;
        var _bitBuffer = 0;
        var _this2 = {};
        _this2.write = function(data, length) {
          if (data >>> length != 0) {
            throw "length over";
          }
          while (_bitLength + length >= 8) {
            _out.writeByte(255 & (data << _bitLength | _bitBuffer));
            length -= 8 - _bitLength;
            data >>>= 8 - _bitLength;
            _bitBuffer = 0;
            _bitLength = 0;
          }
          _bitBuffer = data << _bitLength | _bitBuffer;
          _bitLength = _bitLength + length;
        };
        _this2.flush = function() {
          if (_bitLength > 0) {
            _out.writeByte(_bitBuffer);
          }
        };
        return _this2;
      };
      var getLZWRaster = function(lzwMinCodeSize) {
        var clearCode = 1 << lzwMinCodeSize;
        var endCode = (1 << lzwMinCodeSize) + 1;
        var bitLength = lzwMinCodeSize + 1;
        var table = lzwTable();
        for (var i = 0; i < clearCode; i += 1) {
          table.add(String.fromCharCode(i));
        }
        table.add(String.fromCharCode(clearCode));
        table.add(String.fromCharCode(endCode));
        var byteOut = byteArrayOutputStream();
        var bitOut = bitOutputStream(byteOut);
        bitOut.write(clearCode, bitLength);
        var dataIndex = 0;
        var s = String.fromCharCode(_data[dataIndex]);
        dataIndex += 1;
        while (dataIndex < _data.length) {
          var c = String.fromCharCode(_data[dataIndex]);
          dataIndex += 1;
          if (table.contains(s + c)) {
            s = s + c;
          } else {
            bitOut.write(table.indexOf(s), bitLength);
            if (table.size() < 4095) {
              if (table.size() == 1 << bitLength) {
                bitLength += 1;
              }
              table.add(s + c);
            }
            s = c;
          }
        }
        bitOut.write(table.indexOf(s), bitLength);
        bitOut.write(endCode, bitLength);
        bitOut.flush();
        return byteOut.toByteArray();
      };
      var lzwTable = function() {
        var _map = {};
        var _size = 0;
        var _this2 = {};
        _this2.add = function(key) {
          if (_this2.contains(key)) {
            throw "dup key:" + key;
          }
          _map[key] = _size;
          _size += 1;
        };
        _this2.size = function() {
          return _size;
        };
        _this2.indexOf = function(key) {
          return _map[key];
        };
        _this2.contains = function(key) {
          return typeof _map[key] != "undefined";
        };
        return _this2;
      };
      return _this;
    };
    var createDataURL = function(width, height, getPixel) {
      var gif = gifImage(width, height);
      for (var y = 0; y < height; y += 1) {
        for (var x = 0; x < width; x += 1) {
          gif.setPixel(x, y, getPixel(x, y));
        }
      }
      var b = byteArrayOutputStream();
      gif.write(b);
      var base64 = base64EncodeOutputStream();
      var bytes = b.toByteArray();
      for (var i = 0; i < bytes.length; i += 1) {
        base64.writeByte(bytes[i]);
      }
      base64.flush();
      return "data:image/gif;base64," + base64;
    };
    return qrcode2;
  }();
  !function() {
    qrcode.stringToBytesFuncs["UTF-8"] = function(s) {
      function toUTF8Array(str) {
        var utf8 = [];
        for (var i = 0; i < str.length; i++) {
          var charcode = str.charCodeAt(i);
          if (charcode < 128) utf8.push(charcode);
          else if (charcode < 2048) {
            utf8.push(
              192 | charcode >> 6,
              128 | charcode & 63
            );
          } else if (charcode < 55296 || charcode >= 57344) {
            utf8.push(
              224 | charcode >> 12,
              128 | charcode >> 6 & 63,
              128 | charcode & 63
            );
          } else {
            i++;
            charcode = 65536 + ((charcode & 1023) << 10 | str.charCodeAt(i) & 1023);
            utf8.push(
              240 | charcode >> 18,
              128 | charcode >> 12 & 63,
              128 | charcode >> 6 & 63,
              128 | charcode & 63
            );
          }
        }
        return utf8;
      }
      return toUTF8Array(s);
    };
  }();
  (function(factory) {
    if (typeof define === "function" && define.amd) {
      define([], factory);
    } else if (typeof exports === "object") {
      module.exports = factory();
    }
  })(function() {
    return qrcode;
  });
  var qrcode_generator_default = qrcode;

  // .demo-build/qrcode.ts
  function getLib() {
    const m = qrcode_generator_default;
    return m.default ?? m;
  }
  function ensureUtf8(lib) {
    const funcs = lib.stringToBytesFuncs;
    if (funcs && funcs["UTF-8"]) {
      lib.stringToBytes = funcs["UTF-8"];
      return true;
    }
    return false;
  }
  function encodeQr(text, ec = "M", minVersion = 0) {
    try {
      const lib = getLib();
      ensureUtf8(lib);
      const qr = lib(minVersion, ec);
      qr.addData(text, "Byte");
      qr.make();
      const n = qr.getModuleCount();
      const matrix = Array.from(
        { length: n },
        (_, r) => Array.from({ length: n }, (_2, c) => qr.isDark(r, c))
      );
      return {
        matrix,
        version: (n - 17) / 4,
        size: n
      };
    } catch {
      return null;
    }
  }

  // .demo-build/WdQRCode.ts
  var _hoisted_153 = {
    key: 1,
    class: "wd-qrcode__empty"
  };
  var _hoisted_243 = ["viewBox", "width", "height", "shape-rendering", "aria-label"];
  var _hoisted_338 = ["width", "height", "fill"];
  var _hoisted_432 = ["transform"];
  var _hoisted_519 = ["d", "fill"];
  var WdQRCode_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdQRCode" },
    __name: "WdQRCode",
    props: {
      text: { type: String, required: false, default: "" },
      size: { type: Number, required: false, default: 160 },
      level: { type: String, required: false, default: "M" },
      margin: { type: Number, required: false, default: 2 },
      moduleStyle: { type: String, required: false, default: "square" },
      color: { type: String, required: false, default: "#191B1F" },
      background: { type: String, required: false, default: "#FFFFFF" },
      centerBlank: { type: Number, required: false, default: 0 },
      loading: { type: Boolean, required: false, default: false }
    },
    emits: ["error"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const result = computed(() => {
        if (!props.text) return null;
        const r = encodeQr(props.text, props.level);
        if (!r) {
          emit("error", "\u5185\u5BB9\u8FC7\u957F\uFF0C\u65E0\u6CD5\u751F\u6210\u4E8C\u7EF4\u7801");
          return null;
        }
        return r;
      });
      const blankR = computed(() => {
        const r = result.value;
        if (!r || !props.centerBlank) return 0;
        return r.size * Math.min(props.centerBlank, 40) / 200;
      });
      function inBlank(row, col) {
        const radius = blankR.value;
        if (radius <= 0) return false;
        const r = result.value;
        if (!r) return false;
        const cx = r.size / 2;
        const cy = r.size / 2;
        const dx = col + 0.5 - cx;
        const dy = row + 0.5 - cy;
        return dx * dx + dy * dy <= radius * radius;
      }
      const pathData = computed(() => {
        const r = result.value;
        if (!r) return "";
        if (props.moduleStyle === "dot") {
          const parts2 = [];
          const rad = 0.48;
          for (let row = 0; row < r.size; row++) {
            for (let col = 0; col < r.size; col++) {
              if (!r.matrix[row][col] || inBlank(row, col)) continue;
              const cx = col + 0.5;
              const cy = row + 0.5;
              parts2.push(
                `M${cx - rad} ${cy}a${rad} ${rad} 0 1 0 ${rad * 2} 0a${rad} ${rad} 0 1 0 ${-rad * 2} 0`
              );
            }
          }
          return parts2.join("");
        }
        if (props.moduleStyle === "liquid") {
          const parts2 = [];
          const R = 0.5;
          const isOn = (row, col) => {
            if (row < 0 || col < 0 || row >= r.size || col >= r.size) return false;
            if (!r.matrix[row][col]) return false;
            return !inBlank(row, col);
          };
          const rr = (row, col) => {
            const up = isOn(row - 1, col);
            const dn = isOn(row + 1, col);
            const lf = isOn(row, col - 1);
            const rt = isOn(row, col + 1);
            return [
              up || lf ? 0 : R,
              up || rt ? 0 : R,
              dn || rt ? 0 : R,
              dn || lf ? 0 : R
            ];
          };
          for (let row = 0; row < r.size; row++) {
            for (let col = 0; col < r.size; col++) {
              if (!r.matrix[row][col] || inBlank(row, col)) continue;
              const [tl, tr, br, bl] = rr(row, col);
              const x = col;
              const y = row;
              parts2.push(
                `M${x + tl} ${y}H${x + 1 - tr}` + (tr ? `A${tr} ${tr} 0 0 1 ${x + 1} ${y + tr}` : "") + `V${y + 1 - br}` + (br ? `A${br} ${br} 0 0 1 ${x + 1 - br} ${y + 1}` : "") + `H${x + bl}` + (bl ? `A${bl} ${bl} 0 0 1 ${x} ${y + 1 - bl}` : "") + `V${y + tl}` + (tl ? `A${tl} ${tl} 0 0 1 ${x + tl} ${y}` : "") + "Z"
              );
            }
          }
          return parts2.join("");
        }
        const parts = [];
        for (let row = 0; row < r.size; row++) {
          for (let col = 0; col < r.size; col++) {
            if (!r.matrix[row][col] || inBlank(row, col)) continue;
            parts.push(`M${col} ${row}h1v1h-1z`);
          }
        }
        return parts.join("");
      });
      const totalSize = computed(() => result.value ? result.value.size + props.margin * 2 : 0);
      const svgStyle = computed(() => ({
        width: props.size + "px",
        height: props.size + "px",
        background: props.background
      }));
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            class: "wd-qrcode",
            style: normalizeStyle({ width: __props.size + "px", height: __props.size + "px" })
          },
          [
            __props.loading ? (openBlock(), createElementBlock(
              "div",
              {
                key: 0,
                class: "wd-qrcode__skeleton",
                style: normalizeStyle({ width: __props.size + "px", height: __props.size + "px" })
              },
              null,
              4
              /* STYLE */
            )) : !result.value ? (openBlock(), createElementBlock("div", _hoisted_153, "\u65E0\u5185\u5BB9")) : (openBlock(), createElementBlock("svg", {
              key: 2,
              class: "wd-qrcode__svg",
              style: normalizeStyle(svgStyle.value),
              viewBox: `0 0 ${totalSize.value} ${totalSize.value}`,
              width: __props.size,
              height: __props.size,
              "shape-rendering": __props.moduleStyle === "square" ? "crispEdges" : "geometricPrecision",
              role: "img",
              "aria-label": `\u4E8C\u7EF4\u7801\uFF1A${__props.text}`
            }, [
              createElementVNode("rect", {
                width: totalSize.value,
                height: totalSize.value,
                fill: __props.background
              }, null, 8, _hoisted_338),
              createElementVNode("g", {
                transform: `translate(${__props.margin} ${__props.margin})`
              }, [
                createElementVNode("path", {
                  d: pathData.value,
                  fill: __props.color
                }, null, 8, _hoisted_519)
              ], 8, _hoisted_432)
            ], 12, _hoisted_243)),
            createCommentVNode(" \u4E2D\u5FC3\u63D2\u69FD\uFF1A\u53E0\u5728 SVG \u4E4B\u4E0A\uFF0C\u7EDD\u5BF9\u5B9A\u4F4D\u5C45\u4E2D "),
            _ctx.$slots.center && result.value ? (openBlock(), createElementBlock(
              "div",
              {
                key: 3,
                class: "wd-qrcode__center",
                style: normalizeStyle(__props.centerBlank ? { width: `calc(${__props.size}px * ${__props.centerBlank / 100}), maxWidth: none` } : void 0)
              },
              [
                renderSlot(_ctx.$slots, "center")
              ],
              4
              /* STYLE */
            )) : createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        );
      };
    }
  });

  // .demo-build/WdRadioGroup.ts
  var _hoisted_154 = {
    class: "wd-radio-group",
    role: "radiogroup"
  };
  var _hoisted_244 = ["aria-checked", "disabled", "onClick"];
  var _hoisted_339 = { class: "wd-radio__label" };
  var WdRadioGroup_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdRadioGroup" },
    __name: "WdRadioGroup",
    props: {
      modelValue: { type: [String, Number], required: false },
      defaultValue: { type: [String, Number], required: false },
      options: { type: Array, required: false, default: () => [] },
      disabled: { type: Boolean, required: false, default: false }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const { value, set } = useControllable({
        modelValue: computed(() => props.modelValue),
        defaultValue: computed(() => props.defaultValue),
        fallback: "",
        onChange: (v) => {
          emit("update:modelValue", v);
          emit("change", v);
        }
      });
      const items = computed(
        () => props.options.map((o) => typeof o === "string" ? { label: o, value: o } : o)
      );
      function pick(value2) {
        if (!props.disabled) set(value2);
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_154, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(items.value, (o) => {
              return openBlock(), createElementBlock("button", {
                key: o.value,
                type: "button",
                role: "radio",
                class: normalizeClass(["wd-radio", { "wd-radio--checked": unref(value) === o.value, "wd-radio--disabled": __props.disabled }]),
                "aria-checked": unref(value) === o.value,
                disabled: __props.disabled,
                onClick: ($event) => pick(o.value)
              }, [
                _cache[0] || (_cache[0] = createElementVNode(
                  "span",
                  { class: "wd-radio__dot" },
                  [
                    createElementVNode("span", { class: "wd-radio__inner" })
                  ],
                  -1
                  /* CACHED */
                )),
                createElementVNode(
                  "span",
                  _hoisted_339,
                  toDisplayString(o.label),
                  1
                  /* TEXT */
                )
              ], 10, _hoisted_244);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  });

  // .demo-build/WdRate.ts
  var _hoisted_155 = ["aria-label", "aria-disabled"];
  var _hoisted_245 = ["aria-checked", "aria-label", "tabindex", "disabled", "onPointerenter", "onClick"];
  var WdRate_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdRate" },
    __name: "WdRate",
    props: {
      modelValue: { type: Number, required: false },
      defaultValue: { type: Number, required: false },
      count: { type: Number, required: false, default: 5 },
      disabled: { type: Boolean, required: false, default: false },
      clearable: { type: Boolean, required: false, default: true }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const { value, set } = useControllable({
        modelValue: computed(() => props.modelValue),
        defaultValue: computed(() => props.defaultValue),
        fallback: 0,
        onChange: (v) => {
          emit("update:modelValue", v);
          emit("change", v);
        }
      });
      const hover = ref(-1);
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
        const next = value.value === i + 1 ? props.clearable ? 0 : i + 1 : i + 1;
        set(next);
      }
      const shown = computed(() => hover.value >= 0 ? hover.value + 1 : props.modelValue);
      const root = ref(null);
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
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock("div", {
          ref_key: "root",
          ref: root,
          class: normalizeClass(["wd-rate", { "wd-rate--disabled": __props.disabled }]),
          role: "radiogroup",
          "aria-label": `\u8BC4\u5206\uFF0C\u5171 ${__props.count} \u661F\uFF0C\u5F53\u524D ${unref(value)} \u661F`,
          "aria-disabled": __props.disabled || void 0,
          onMouseleave: _cache[1] || (_cache[1] = ($event) => hover.value = -1),
          onKeydown
        }, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(__props.count, (i) => {
              return openBlock(), createElementBlock("button", {
                key: i,
                type: "button",
                class: normalizeClass(["wd-rate__item", { "wd-rate__item--on": i <= shown.value }]),
                role: "radio",
                "aria-checked": i === unref(value),
                "aria-label": `${i} \u661F`,
                tabindex: __props.disabled ? -1 : i === (unref(value) || (hover.value >= 0 ? hover.value + 1 : 1)) ? 0 : -1,
                disabled: __props.disabled,
                onPointerenter: ($event) => onEnter(i - 1, $event),
                onPointerleave: _cache[0] || (_cache[0] = ($event) => onLeave($event)),
                onClick: ($event) => pick(i - 1)
              }, [
                createVNode(_component_wd_icon, {
                  name: "star",
                  size: 22
                })
              ], 42, _hoisted_245);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ], 42, _hoisted_155);
      };
    }
  });

  // .demo-build/WdResult.ts
  var _hoisted_156 = { class: "wd-result__icon" };
  var _hoisted_246 = {
    key: 0,
    class: "wd-result__title"
  };
  var _hoisted_340 = {
    key: 1,
    class: "wd-result__desc"
  };
  var _hoisted_433 = {
    key: 2,
    class: "wd-result__extra"
  };
  var WdResult_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdResult" },
    __name: "WdResult",
    props: {
      status: { type: String, required: false, default: "info" },
      title: { type: String, required: false, default: "" },
      description: { type: String, required: false, default: "" }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(["wd-result", `wd-result--${__props.status}`])
          },
          [
            createElementVNode("div", _hoisted_156, [
              renderSlot(_ctx.$slots, "icon", {}, () => [
                __props.status === "success" ? (openBlock(), createBlock(_component_wd_icon, {
                  key: 0,
                  name: "check-circle",
                  size: 30
                })) : __props.status === "warning" ? (openBlock(), createBlock(_component_wd_icon, {
                  key: 1,
                  name: "warning-circle",
                  size: 30
                })) : __props.status === "error" ? (openBlock(), createBlock(_component_wd_icon, {
                  key: 2,
                  name: "close-circle",
                  size: 30
                })) : (openBlock(), createBlock(_component_wd_icon, {
                  key: 3,
                  name: "info-circle",
                  size: 30
                }))
              ])
            ]),
            __props.title ? (openBlock(), createElementBlock(
              "div",
              _hoisted_246,
              toDisplayString(__props.title),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            __props.description || _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_340, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(
                  toDisplayString(__props.description),
                  1
                  /* TEXT */
                )
              ])
            ])) : createCommentVNode("v-if", true),
            _ctx.$slots.extra ? (openBlock(), createElementBlock("div", _hoisted_433, [
              renderSlot(_ctx.$slots, "extra")
            ])) : createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdScrollbar.ts
  var WdScrollbar_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdScrollbar" },
    __name: "WdScrollbar",
    props: {
      maxHeight: { type: [String, Number], required: false, default: void 0 },
      size: { type: Number, required: false, default: 8 },
      always: { type: Boolean, required: false, default: false },
      native: { type: Boolean, required: false, default: false }
    },
    setup(__props) {
      const props = __props;
      const wrap = ref(null);
      const view = ref(null);
      const thumb = ref({ top: 0, height: 0 });
      const showThumb = ref(false);
      const hovering = ref(false);
      const dragging = ref(false);
      const overflow = ref(false);
      let ro = null;
      let mo = null;
      function measure() {
        const v = view.value;
        const w = wrap.value;
        if (!v || !w) return;
        const { scrollHeight, clientHeight, scrollTop } = v;
        overflow.value = scrollHeight > clientHeight + 1;
        if (!overflow.value) {
          showThumb.value = false;
          return;
        }
        const trackH = w.clientHeight;
        const ratio = clientHeight / scrollHeight;
        const h = Math.max(28, Math.round(trackH * ratio));
        const maxTop = trackH - h;
        const maxScroll = scrollHeight - clientHeight;
        const top = maxScroll > 0 ? scrollTop / maxScroll * maxTop : 0;
        thumb.value = { top, height: h };
        showThumb.value = true;
      }
      function onScroll() {
        measure();
      }
      let dragStartY = 0;
      let dragStartTop = 0;
      function onThumbDown(e) {
        const v = view.value;
        const w = wrap.value;
        if (!v || !w) return;
        e.preventDefault();
        dragging.value = true;
        dragStartY = e.clientY;
        dragStartTop = thumb.value.top;
        e.target.setPointerCapture?.(e.pointerId);
      }
      function onThumbMove(e) {
        if (!dragging.value) return;
        const v = view.value;
        const w = wrap.value;
        if (!v || !w) return;
        const delta = e.clientY - dragStartY;
        const maxTop = w.clientHeight - thumb.value.height;
        if (maxTop <= 0) return;
        const nextTop = Math.max(0, Math.min(dragStartTop + delta, maxTop));
        const maxScroll = v.scrollHeight - v.clientHeight;
        v.scrollTop = nextTop / maxTop * maxScroll;
      }
      function onThumbUp(e) {
        dragging.value = false;
        e.target.releasePointerCapture?.(e.pointerId);
      }
      function onTrackDown(e) {
        const v = view.value;
        const w = wrap.value;
        if (!v || !w) return;
        const rect = w.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const page = v.clientHeight;
        if (y < thumb.value.top) v.scrollTop -= page;
        else v.scrollTop += page;
        measure();
      }
      watch(
        () => props.maxHeight,
        () => nextTick(measure)
      );
      onMounted(async () => {
        await nextTick();
        measure();
        const v = view.value;
        const w = wrap.value;
        if (!v || !w) return;
        v.addEventListener("scroll", onScroll, { passive: true });
        w.addEventListener("mouseenter", () => {
          hovering.value = true;
        });
        w.addEventListener("mouseleave", () => {
          hovering.value = false;
        });
        if (typeof ResizeObserver !== "undefined") {
          ro = new ResizeObserver(() => measure());
          ro.observe(v);
          ro.observe(w);
        }
        if (typeof MutationObserver !== "undefined") {
          mo = new MutationObserver(() => measure());
          mo.observe(v, { childList: true, subtree: true, characterData: true });
        }
      });
      onBeforeUnmount(() => {
        view.value?.removeEventListener("scroll", onScroll);
        ro?.disconnect();
        mo?.disconnect();
      });
      const wrapStyle = computed(() => {
        if (props.maxHeight === void 0) return {};
        return {
          maxHeight: typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight
        };
      });
      const visible = computed(() => props.always || hovering.value || dragging.value);
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            ref_key: "wrap",
            ref: wrap,
            class: normalizeClass(["wd-scrollbar", { "is-hover": visible.value, "is-overflow": overflow.value }]),
            style: normalizeStyle(wrapStyle.value),
            onMouseenter: _cache[0] || (_cache[0] = ($event) => hovering.value = true),
            onMouseleave: _cache[1] || (_cache[1] = ($event) => hovering.value = false)
          },
          [
            createElementVNode(
              "div",
              {
                ref_key: "view",
                ref: view,
                class: normalizeClass(["wd-scrollbar__view", { "is-native": __props.native }])
              },
              [
                renderSlot(_ctx.$slots, "default")
              ],
              2
              /* CLASS */
            ),
            createCommentVNode("\n      \u81EA\u5B9A\u4E49\u6ED1\u5757\u3002\n      \u26A0\uFE0F \u539F\u751F\u6EDA\u52A8\u6761\u7528 CSS \u9690\u85CF\uFF08scrollbar-width: none + ::-webkit-scrollbar\uFF09\uFF0C\n      \u4F46**\u6EDA\u52A8\u80FD\u529B\u5B8C\u5168\u4FDD\u7559** \u2014\u2014 \u7528 JS \u6A21\u62DF\u6EDA\u52A8\u4F1A\u4E22\u5931\u60EF\u6027\u3001\u952E\u76D8\u3001\u89E6\u63A7\u677F\u652F\u6301\u3002\n      \u8FD9\u662F\u672C\u7EC4\u4EF6\u6700\u5BB9\u6613\u5199\u9519\u7684\u5730\u65B9\uFF1A\u8981\u300C\u53EA\u6362\u5916\u89C2\uFF0C\u4E0D\u6362\u6EDA\u52A8\u673A\u5236\u300D\u3002\n    "),
            !__props.native && overflow.value ? (openBlock(), createElementBlock(
              "div",
              {
                key: 0,
                class: normalizeClass(["wd-scrollbar__track", { "is-visible": visible.value }]),
                style: normalizeStyle({ width: __props.size + "px" }),
                onMousedown: withModifiers(onTrackDown, ["self"])
              },
              [
                createElementVNode(
                  "div",
                  {
                    class: normalizeClass(["wd-scrollbar__thumb", { "is-dragging": dragging.value }]),
                    style: normalizeStyle({ top: thumb.value.top + "px", height: thumb.value.height + "px" }),
                    onPointerdown: onThumbDown,
                    onPointermove: onThumbMove,
                    onPointerup: onThumbUp,
                    onPointercancel: onThumbUp
                  },
                  null,
                  38
                  /* CLASS, STYLE, NEED_HYDRATION */
                )
              ],
              38
              /* CLASS, STYLE, NEED_HYDRATION */
            )) : createCommentVNode("v-if", true)
          ],
          38
          /* CLASS, STYLE, NEED_HYDRATION */
        );
      };
    }
  });

  // .demo-build/WdSegmented.ts
  var _hoisted_157 = ["aria-hidden"];
  var _hoisted_247 = ["aria-selected", "tabindex", "onClick"];
  var _hoisted_341 = {
    key: 0,
    class: "wd-segmented-picker"
  };
  var _hoisted_434 = ["aria-expanded"];
  var _hoisted_520 = { class: "wd-segmented-picker__label" };
  var _hoisted_611 = { class: "wd-segmented-picker__meta" };
  var _hoisted_711 = {
    key: 0,
    class: "wd-segmented-picker__panel",
    role: "listbox"
  };
  var _hoisted_811 = ["aria-selected", "onClick"];
  var WdSegmented_default = /* @__PURE__ */ defineComponent({
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
      const items = computed(
        () => props.options.map((o) => typeof o === "string" ? { label: o, value: o } : o)
      );
      const activeLabel = computed(
        () => items.value.find((o) => o.value === props.modelValue)?.label ?? ""
      );
      const wrap = ref();
      const track = ref();
      const slider = ref();
      const mode = ref("flat");
      const canLeft = ref(false);
      const canRight = ref(false);
      const dropdownOpen = ref(false);
      useDismiss([wrap], () => {
        dropdownOpen.value = false;
      }, dropdownOpen);
      useOverlayLayer(dropdownOpen, wrap, () => {
        dropdownOpen.value = false;
        return true;
      });
      const sliderSettled = ref(false);
      function updateSlider() {
        const t = track.value;
        const s = slider.value;
        if (!t || !s || mode.value === "dropdown") return;
        const active = t.querySelector(".wd-segmented__item--active");
        if (!active) return;
        if (!sliderSettled.value) {
          s.classList.add("is-initial");
          place(active, s);
          const settle = () => {
            if (sliderSettled.value) return;
            s.classList.remove("is-initial");
            sliderSettled.value = true;
          };
          requestAnimationFrame(settle);
          setTimeout(settle, 60);
          return;
        }
        place(active, s);
      }
      function place(active, s) {
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
        } else if (props.overflow === "scroll") {
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
        nextTick(() => {
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
      function onKey(e) {
      }
      let ro;
      onMounted(async () => {
        await nextTick();
        measure();
        window.addEventListener("resize", measure);
        document.addEventListener("keydown", onKey);
        if (typeof ResizeObserver !== "undefined" && wrap.value) {
          ro = new ResizeObserver(() => measure());
          ro.observe(wrap.value);
        }
      });
      onBeforeUnmount(() => {
        window.removeEventListener("resize", measure);
        document.removeEventListener("keydown", onKey);
        ro?.disconnect();
      });
      watch(
        () => props.modelValue,
        () => nextTick(() => {
          updateSlider();
          scrollActiveIntoView();
        })
      );
      watch(
        items,
        () => nextTick(() => {
          measure();
        })
      );
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          "div",
          {
            ref_key: "wrap",
            ref: wrap,
            class: normalizeClass(["wd-segmented-wrap", {
              "wd-segmented-wrap--auto": __props.overflow === "auto",
              "wd-segmented-wrap--scroll": mode.value === "scroll",
              "wd-segmented-wrap--measuring": mode.value === "dropdown",
              "wd-segmented-wrap--fade-l": canLeft.value,
              "wd-segmented-wrap--fade-r": canRight.value
            }])
          },
          [
            createElementVNode("div", {
              ref_key: "track",
              ref: track,
              class: normalizeClass(["wd-segmented", { "wd-segmented--block": __props.block, "wd-segmented--dark": __props.tone === "dark" }]),
              "aria-hidden": mode.value === "dropdown",
              role: "tablist",
              onScroll: updateFades
            }, [
              createElementVNode(
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
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(items.value, (o) => {
                  return openBlock(), createElementBlock("button", {
                    key: o.value,
                    type: "button",
                    role: "tab",
                    class: normalizeClass(["wd-segmented__item", { "wd-segmented__item--active": o.value === __props.modelValue }]),
                    "aria-selected": o.value === __props.modelValue,
                    tabindex: mode.value === "dropdown" ? -1 : 0,
                    onClick: ($event) => emit("update:modelValue", o.value)
                  }, toDisplayString(o.label), 11, _hoisted_247);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ], 42, _hoisted_157),
            createCommentVNode(" \u9009\u9879\u8FC7\u591A\uFF1A\u964D\u7EA7\u4E3A\u4E0B\u62C9\u7B5B\u9009 "),
            mode.value === "dropdown" ? (openBlock(), createElementBlock("div", _hoisted_341, [
              createElementVNode("button", {
                type: "button",
                class: "wd-segmented-picker__trigger",
                "aria-haspopup": "listbox",
                "aria-expanded": dropdownOpen.value,
                onClick: _cache[0] || (_cache[0] = ($event) => dropdownOpen.value = !dropdownOpen.value)
              }, [
                createElementVNode(
                  "span",
                  _hoisted_520,
                  toDisplayString(activeLabel.value),
                  1
                  /* TEXT */
                ),
                createElementVNode(
                  "span",
                  _hoisted_611,
                  toDisplayString(items.value.length) + " \u9879",
                  1
                  /* TEXT */
                ),
                createVNode(_component_wd_icon, {
                  class: normalizeClass(["wd-segmented-picker__caret", { "is-open": dropdownOpen.value }]),
                  name: "chevron-down",
                  size: 16
                }, null, 8, ["class"])
              ], 8, _hoisted_434),
              dropdownOpen.value ? (openBlock(), createElementBlock("div", _hoisted_711, [
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(items.value, (o) => {
                    return openBlock(), createElementBlock("button", {
                      key: o.value,
                      type: "button",
                      role: "option",
                      "aria-selected": o.value === __props.modelValue,
                      class: normalizeClass(["wd-segmented-picker__option", { "wd-segmented-picker__option--active": o.value === __props.modelValue }]),
                      onClick: ($event) => pick(o.value)
                    }, [
                      createElementVNode(
                        "span",
                        null,
                        toDisplayString(o.label),
                        1
                        /* TEXT */
                      ),
                      o.value === __props.modelValue ? (openBlock(), createBlock(_component_wd_icon, {
                        key: 0,
                        name: "check",
                        size: 15
                      })) : createCommentVNode("v-if", true)
                    ], 10, _hoisted_811);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : createCommentVNode("v-if", true)
            ])) : createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdSelect.ts
  var _hoisted_158 = ["disabled", "aria-expanded"];
  var _hoisted_248 = {
    key: 0,
    class: "wd-select__tags"
  };
  var _hoisted_342 = ["aria-label", "onClick"];
  var _hoisted_435 = {
    key: 0,
    class: "wd-select__tag wd-select__tag--more"
  };
  var _hoisted_521 = { class: "wd-select__value" };
  var _hoisted_612 = {
    key: 2,
    class: "wd-select__placeholder"
  };
  var _hoisted_712 = { class: "wd-select__actions" };
  var _hoisted_812 = ["aria-multiselectable"];
  var _hoisted_99 = {
    key: 0,
    class: "wd-select__search"
  };
  var _hoisted_107 = ["aria-selected", "disabled", "onClick", "onMouseenter"];
  var _hoisted_1114 = {
    key: 1,
    class: "wd-select__empty"
  };
  var WdSelect_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdSelect" },
    __name: "WdSelect",
    props: {
      modelValue: { type: [String, Number, Array], required: false },
      defaultValue: { type: [String, Number, Array], required: false },
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
      const open = ref(false);
      const root = ref();
      const triggerEl = ref(null);
      const menuEl = ref(null);
      const { pos } = useAnchoredPosition(open, triggerEl, menuEl, {
        placement: "bottom-start",
        gap: 6,
        matchWidth: true
      });
      useOverlayLayer(open, root, () => {
        open.value = false;
        return true;
      });
      const search = ref("");
      useDismiss([root], () => {
        open.value = false;
        search.value = "";
      }, open);
      const searchEl = ref(null);
      const activeIndex = ref(-1);
      const items = computed(
        () => props.options.map((o) => typeof o === "string" ? { label: o, value: o, disabled: false } : { disabled: false, ...o })
      );
      const { value: ctlValue, set } = useControllable({
        modelValue: computed(() => props.modelValue),
        defaultValue: computed(() => props.defaultValue),
        fallback: props.multiple ? [] : "",
        onChange: (v) => {
          set(v);
        }
      });
      const selected = computed(() => {
        const v = ctlValue.value;
        if (props.multiple) return Array.isArray(v) ? v : [];
        return v === "" || v === void 0 || Array.isArray(v) ? [] : [v];
      });
      const selectedItems = computed(() => selected.value.map((v) => items.value.find((o) => o.value === v)).filter(Boolean));
      const visible = computed(() => {
        const kw = search.value.trim().toLowerCase();
        if (!kw || !props.filterable) return items.value;
        return items.value.filter((o) => String(o.label).toLowerCase().includes(kw));
      });
      const hasValue = computed(() => selected.value.length > 0);
      const showClear = computed(() => props.clearable && hasValue.value && !props.disabled);
      const shownTags = computed(() => selectedItems.value.slice(0, props.maxTagCount));
      const overflowCount = computed(() => Math.max(0, selectedItems.value.length - props.maxTagCount));
      const singleLabel = computed(() => selectedItems.value[0]?.label ?? "");
      function toggle(v) {
        const opt = items.value.find((o) => o.value === v);
        if (opt?.disabled) return;
        if (props.multiple) {
          const set2 = new Set(selected.value);
          set2.has(v) ? set2.delete(v) : set2.add(v);
          const next = Array.from(set2);
          set2(next);
        } else {
          set(v);
          open.value = false;
        }
        search.value = "";
      }
      function removeTag(v, e) {
        e.stopPropagation();
        if (props.disabled) return;
        const next = selected.value.filter((x) => x !== v);
        set(next);
      }
      function clear(e) {
        e?.stopPropagation();
        const next = props.multiple ? [] : "";
        set(next);
        emit("clear");
      }
      async function toggleOpen() {
        if (props.disabled) return;
        open.value = !open.value;
        if (open.value) {
          activeIndex.value = Math.max(0, visible.value.findIndex((o) => o.value === selected.value[0]));
          await nextTick();
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
      watch(visible, (list) => {
        if (activeIndex.value >= list.length) activeIndex.value = list.length - 1;
      });
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          Fragment,
          null,
          [
            createElementVNode(
              "div",
              {
                ref_key: "root",
                ref: root,
                class: normalizeClass(["wd-select", { "wd-select--open": open.value, "wd-select--disabled": __props.disabled, "wd-select--multiple": __props.multiple }]),
                onKeydown
              },
              [
                createElementVNode("button", {
                  ref_key: "triggerEl",
                  ref: triggerEl,
                  type: "button",
                  class: normalizeClass(["wd-select__trigger", [`wd-select__trigger--${__props.size}`, { "wd-select__trigger--tags": __props.multiple && hasValue.value }]]),
                  disabled: __props.disabled,
                  "aria-expanded": open.value,
                  "aria-haspopup": "listbox",
                  onClick: toggleOpen
                }, [
                  createCommentVNode(" \u591A\u9009\uFF1A\u6807\u7B7E\u5806\u53E0 "),
                  __props.multiple && hasValue.value ? (openBlock(), createElementBlock("span", _hoisted_248, [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(shownTags.value, (o) => {
                        return openBlock(), createElementBlock("span", {
                          key: o.value,
                          class: "wd-select__tag"
                        }, [
                          createTextVNode(
                            toDisplayString(o.label) + " ",
                            1
                            /* TEXT */
                          ),
                          !__props.disabled ? (openBlock(), createElementBlock("button", {
                            key: 0,
                            type: "button",
                            class: "wd-select__tag-x",
                            "aria-label": `\u79FB\u9664 ${o.label}`,
                            onClick: ($event) => removeTag(o.value, $event)
                          }, [
                            createVNode(_component_wd_icon, {
                              name: "close",
                              size: 10
                            })
                          ], 8, _hoisted_342)) : createCommentVNode("v-if", true)
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    overflowCount.value ? (openBlock(), createElementBlock(
                      "span",
                      _hoisted_435,
                      "+" + toDisplayString(overflowCount.value),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true)
                  ])) : !__props.multiple && hasValue.value ? (openBlock(), createElementBlock(
                    Fragment,
                    { key: 1 },
                    [
                      createCommentVNode(" \u5355\u9009 "),
                      createElementVNode(
                        "span",
                        _hoisted_521,
                        toDisplayString(singleLabel.value),
                        1
                        /* TEXT */
                      )
                    ],
                    2112
                    /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                  )) : (openBlock(), createElementBlock(
                    "span",
                    _hoisted_612,
                    toDisplayString(__props.placeholder),
                    1
                    /* TEXT */
                  )),
                  createElementVNode("span", _hoisted_712, [
                    showClear.value ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      type: "button",
                      class: "wd-select__clear",
                      "aria-label": "\u6E05\u9664",
                      onClick: clear
                    }, [
                      createVNode(_component_wd_icon, {
                        name: "close",
                        size: 12
                      })
                    ])) : createCommentVNode("v-if", true),
                    createVNode(_component_wd_icon, {
                      class: normalizeClass(["wd-chevron", { "wd-chevron--open": open.value }]),
                      name: "chevron-down",
                      size: 14
                    }, null, 8, ["class"])
                  ])
                ], 10, _hoisted_158)
              ],
              34
              /* CLASS, NEED_HYDRATION */
            ),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              createElementVNode("div", {
                ref_key: "menuEl",
                ref: menuEl,
                class: normalizeClass(["wd-select__menu", { "is-open": open.value }]),
                style: normalizeStyle({ top: unref(pos).top + "px", left: unref(pos).left + "px", minWidth: "200px" }),
                role: "listbox",
                "aria-multiselectable": __props.multiple || void 0
              }, [
                createCommentVNode(" \u641C\u7D22\u6846 "),
                __props.filterable ? (openBlock(), createElementBlock("div", _hoisted_99, [
                  withDirectives(createElementVNode(
                    "input",
                    {
                      ref_key: "searchEl",
                      ref: searchEl,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => search.value = $event),
                      type: "text",
                      placeholder: "\u8F93\u5165\u5173\u952E\u5B57\u7B5B\u9009\u2026",
                      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                      }, ["stop"]))
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vModelText, search.value]
                  ])
                ])) : createCommentVNode("v-if", true),
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(visible.value, (o, i) => {
                    return openBlock(), createElementBlock("button", {
                      key: o.value,
                      type: "button",
                      role: "option",
                      class: normalizeClass(["wd-select__option", {
                        "wd-select__option--active": selected.value.includes(o.value),
                        "wd-select__option--hover": i === activeIndex.value,
                        "wd-select__option--disabled": o.disabled
                      }]),
                      "aria-selected": selected.value.includes(o.value),
                      disabled: o.disabled,
                      onClick: ($event) => toggle(o.value),
                      onMouseenter: ($event) => activeIndex.value = i
                    }, [
                      createElementVNode(
                        "span",
                        null,
                        toDisplayString(o.label),
                        1
                        /* TEXT */
                      ),
                      selected.value.includes(o.value) ? (openBlock(), createBlock(_component_wd_icon, {
                        key: 0,
                        class: "wd-select__option-mark",
                        name: "check",
                        size: 14
                      })) : createCommentVNode("v-if", true)
                    ], 42, _hoisted_107);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                !visible.value.length ? (openBlock(), createElementBlock("div", _hoisted_1114, "\u65E0\u5339\u914D\u9879")) : createCommentVNode("v-if", true)
              ], 14, _hoisted_812)
            ]))
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });

  // .demo-build/WdSkeleton.ts
  var WdSkeleton_default = /* @__PURE__ */ defineComponent({
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
      const itemStyle = computed(() => {
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
        return openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(["wd-skeleton", `wd-skeleton--${__props.variant}`]),
            "aria-hidden": "true"
          },
          [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(__props.count, (i) => {
                return openBlock(), createElementBlock(
                  "span",
                  {
                    key: i,
                    class: normalizeClass(["wd-skeleton__item", { "wd-skeleton__item--text": __props.variant === "text" }]),
                    style: normalizeStyle(itemStyle.value)
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

  // .demo-build/WdSlider.ts
  var _hoisted_159 = { class: "wd-slider" };
  var _hoisted_249 = ["min", "max", "step", "value"];
  var _hoisted_343 = {
    key: 0,
    class: "wd-slider__value"
  };
  var WdSlider_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdSlider" },
    __name: "WdSlider",
    props: {
      modelValue: { type: Number, required: false },
      defaultValue: { type: Number, required: false },
      min: { type: Number, required: false, default: 0 },
      max: { type: Number, required: false, default: 100 },
      step: { type: Number, required: false, default: 1 },
      showValue: { type: Boolean, required: false, default: true }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const el = ref(null);
      const { value: ctl, set } = useControllable({
        modelValue: computed(() => props.modelValue),
        defaultValue: computed(() => props.defaultValue),
        fallback: 0,
        onChange: (v) => {
          emit("update:modelValue", v);
          emit("change", v);
        }
      });
      const live = ref(null);
      const current = computed(() => live.value !== null ? live.value : ctl.value);
      const percent = computed(() => {
        const span = props.max - props.min || 1;
        return Math.max(0, Math.min(100, (current.value - props.min) / span * 100));
      });
      const trackStyle = computed(() => ({
        background: `linear-gradient(to right, var(--wd-red) 0%, var(--wd-red) ${percent.value}%, var(--wd-tint-2) ${percent.value}%, var(--wd-tint-2) 100%)`
      }));
      function onInput(e) {
        const v = Number(e.target.value);
        live.value = v;
        set(v);
      }
      watch(
        () => props.modelValue,
        (v) => {
          if (live.value !== null && v !== live.value) live.value = null;
        }
      );
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_159, [
          createElementVNode("input", {
            ref_key: "el",
            ref: el,
            type: "range",
            min: __props.min,
            max: __props.max,
            step: __props.step,
            value: current.value,
            style: normalizeStyle(trackStyle.value),
            onInput
          }, null, 44, _hoisted_249),
          __props.showValue ? (openBlock(), createElementBlock(
            "span",
            _hoisted_343,
            toDisplayString(current.value),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true)
        ]);
      };
    }
  });

  // .demo-build/WdSortableList.ts
  var _hoisted_160 = ["onPointerdown"];
  var _hoisted_250 = {
    class: "wd-sortable__handle",
    "aria-hidden": "true"
  };
  var _hoisted_344 = { class: "wd-sortable__label" };
  var _hoisted_436 = {
    class: "wd-sortable__handle",
    "aria-hidden": "true"
  };
  var _hoisted_522 = { class: "wd-sortable__label" };
  var DRAG_THRESHOLD = 4;
  var WdSortableList_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdSortableList" },
    __name: "WdSortableList",
    props: {
      modelValue: { type: Array, required: false, default: () => [] }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const list = ref(null);
      function labelOf(it) {
        return typeof it === "string" ? it : it.label;
      }
      const dragging = ref(false);
      const fromIndex = ref(-1);
      const overIndex = ref(-1);
      const ghost = ref(null);
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
      onBeforeUnmount(cleanup);
      const dropLineTop = computed(() => {
        if (!dragging.value || overIndex.value < 0 || !list.value) return null;
        const els = itemEls();
        if (!els.length) return null;
        const base = list.value.getBoundingClientRect();
        const i = overIndex.value;
        return i < els.length ? els[i].getBoundingClientRect().top - base.top : els[els.length - 1].getBoundingClientRect().bottom - base.top;
      });
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          Fragment,
          null,
          [
            createElementVNode(
              "div",
              {
                class: normalizeClass(["wd-sortable", { "wd-sortable--dragging": dragging.value }]),
                ref_key: "list",
                ref: list
              },
              [
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(__props.modelValue, (it, i) => {
                    return openBlock(), createElementBlock("div", {
                      key: i,
                      class: normalizeClass(["wd-sortable__item", {
                        "wd-sortable__item--drag": dragging.value && fromIndex.value === i,
                        "wd-sortable__item--over": dragging.value && overIndex.value === i && fromIndex.value !== i
                      }]),
                      onPointerdown: ($event) => onPointerDown($event, i)
                    }, [
                      createElementVNode("span", _hoisted_250, [
                        createVNode(_component_wd_icon, {
                          name: "dots-drag",
                          size: 14
                        })
                      ]),
                      createElementVNode(
                        "span",
                        _hoisted_344,
                        toDisplayString(labelOf(it)),
                        1
                        /* TEXT */
                      )
                    ], 42, _hoisted_160);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                dropLineTop.value !== null ? (openBlock(), createElementBlock(
                  "div",
                  {
                    key: 0,
                    class: "wd-sortable__drop-line",
                    style: normalizeStyle({ top: dropLineTop.value + "px" })
                  },
                  null,
                  4
                  /* STYLE */
                )) : createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            ),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              ghost.value ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: "wd-sortable__clone",
                  style: normalizeStyle({ top: ghost.value.top + "px", left: ghost.value.left + "px", width: ghost.value.width + "px" })
                },
                [
                  createElementVNode("span", _hoisted_436, [
                    createVNode(_component_wd_icon, {
                      name: "dots-drag",
                      size: 14
                    })
                  ]),
                  createElementVNode(
                    "span",
                    _hoisted_522,
                    toDisplayString(ghost.value.label),
                    1
                    /* TEXT */
                  )
                ],
                4
                /* STYLE */
              )) : createCommentVNode("v-if", true)
            ]))
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });

  // .demo-build/WdSpace.ts
  var WdSpace_default = /* @__PURE__ */ defineComponent({
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
      const gap = computed(() => {
        if (typeof props.size === "number") return `${props.size}px`;
        return { sm: "var(--wd-space-2)", md: "var(--wd-space-3)", lg: "var(--wd-space-6)" }[props.size];
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(["wd-space", {
              "wd-space--col": __props.direction === "col",
              "wd-space--wrap": __props.wrap,
              "wd-space--between": __props.between,
              "wd-space--center": __props.center,
              "wd-space--grow": __props.grow
            }]),
            style: normalizeStyle({ gap: gap.value })
          },
          [
            renderSlot(_ctx.$slots, "default")
          ],
          6
          /* CLASS, STYLE */
        );
      };
    }
  });

  // .demo-build/WdSpinner.ts
  var WdSpinner_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdSpinner" },
    __name: "WdSpinner",
    props: {
      size: { type: [String, Number], required: false, default: "md" }
    },
    setup(__props) {
      const props = __props;
      const PRESET = { sm: "18px", md: "28px", lg: "40px" };
      const style = computed(() => {
        if (typeof props.size === "number") {
          const px = Math.max(8, props.size);
          const bw = Math.max(2, Math.round(px * 0.11 * 10) / 10);
          return { width: `${px}px`, height: `${px}px`, borderWidth: `${bw}px` };
        }
        return {};
      });
      const cls = computed(() => typeof props.size === "string" && props.size !== "md" ? `wd-spinner--${props.size}` : "");
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "span",
          {
            class: normalizeClass(["wd-spinner", cls.value]),
            style: normalizeStyle(style.value),
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

  // .demo-build/WdSplitter.ts
  var _hoisted_161 = ["aria-orientation", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-label"];
  var WdSplitter_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdSplitter" },
    __name: "WdSplitter",
    props: {
      direction: { type: String, required: false, default: "horizontal" },
      modelValue: { type: Number, required: false, default: void 0 },
      defaultValue: { type: Number, required: false, default: 50 },
      min: { type: Number, required: false, default: 10 },
      max: { type: Number, required: false, default: 90 },
      size: { type: Number, required: false, default: 6 },
      disabled: { type: Boolean, required: false, default: false }
    },
    emits: ["update:modelValue", "resize", "resizeEnd"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const root = ref(null);
      const inner = ref(props.defaultValue);
      const isControlled = computed(() => props.modelValue !== void 0);
      const ratio = computed(() => isControlled.value ? props.modelValue : inner.value);
      let dragging = false;
      let lastRatio = 0;
      function clamp(v) {
        return Math.max(props.min, Math.min(props.max, v));
      }
      function apply(v, final = false) {
        const c = clamp(v);
        lastRatio = c;
        if (!isControlled.value) inner.value = c;
        emit("resize", c);
        if (final) {
          emit("update:modelValue", c);
          emit("resizeEnd", c);
        }
      }
      function ratioFromEvent(e) {
        const el = root.value;
        if (!el) return null;
        const r = el.getBoundingClientRect();
        if (props.direction === "horizontal") {
          if (r.width === 0) return null;
          return (e.clientX - r.left) / r.width * 100;
        }
        if (r.height === 0) return null;
        return (e.clientY - r.top) / r.height * 100;
      }
      function onDown(e) {
        if (props.disabled) return;
        e.preventDefault();
        dragging = true;
        lastRatio = ratio.value;
        e.currentTarget.setPointerCapture?.(e.pointerId);
        document.body.style.cursor = props.direction === "horizontal" ? "col-resize" : "row-resize";
        document.body.style.userSelect = "none";
      }
      function onMove(e) {
        if (!dragging) return;
        const v = ratioFromEvent(e);
        if (v !== null) apply(v);
      }
      function onUp(e) {
        if (!dragging) return;
        dragging = false;
        e.currentTarget.releasePointerCapture?.(e.pointerId);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        emit("update:modelValue", lastRatio);
        emit("resizeEnd", lastRatio);
      }
      function onKeydown(e) {
        if (props.disabled) return;
        const step = e.shiftKey ? 10 : 2;
        const forward = props.direction === "horizontal" ? "ArrowRight" : "ArrowDown";
        const back = props.direction === "horizontal" ? "ArrowLeft" : "ArrowUp";
        if (e.key === forward) {
          e.preventDefault();
          apply(ratio.value + step, true);
        } else if (e.key === back) {
          e.preventDefault();
          apply(ratio.value - step, true);
        } else if (e.key === "Home") {
          e.preventDefault();
          apply(props.min, true);
        } else if (e.key === "End") {
          e.preventDefault();
          apply(props.max, true);
        }
      }
      function onDblClick() {
        if (props.disabled) return;
        apply(props.defaultValue, true);
      }
      onBeforeUnmount(() => {
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      });
      watch(
        () => props.modelValue,
        (v) => {
          if (v !== void 0) lastRatio = v;
        }
      );
      const firstStyle = computed(
        () => props.direction === "horizontal" ? { width: `calc(${ratio.value}% - ${props.size / 2}px)` } : { height: `calc(${ratio.value}% - ${props.size / 2}px)` }
      );
      const secondStyle = computed(() => ({ flex: "1 1 0", minWidth: "0", minHeight: "0" }));
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            ref_key: "root",
            ref: root,
            class: normalizeClass(["wd-splitter", [`wd-splitter--${__props.direction}`, { "is-dragging": unref(dragging), "is-disabled": __props.disabled }]])
          },
          [
            createElementVNode(
              "div",
              {
                class: "wd-splitter__pane",
                style: normalizeStyle(firstStyle.value)
              },
              [
                renderSlot(_ctx.$slots, "first")
              ],
              4
              /* STYLE */
            ),
            createCommentVNode('\n      \u5206\u9694\u6761\uFF1Arole="separator" + aria-valuenow \u662F\u65E0\u969C\u788D\u6807\u51C6\u505A\u6CD5\uFF0C\n      \u952E\u76D8\u5DE6\u53F3/\u4E0A\u4E0B\u7BAD\u5934\u53EF\u8C03\u8282\uFF0CHome/End \u5230\u4E24\u7AEF\u3002\n    '),
            createElementVNode("div", {
              class: "wd-splitter__bar",
              style: normalizeStyle(__props.direction === "horizontal" ? { width: __props.size + "px" } : { height: __props.size + "px" }),
              role: "separator",
              tabindex: "0",
              "aria-orientation": __props.direction === "horizontal" ? "vertical" : "horizontal",
              "aria-valuenow": Math.round(ratio.value),
              "aria-valuemin": __props.min,
              "aria-valuemax": __props.max,
              "aria-label": `\u5206\u9694\u6761 ${Math.round(ratio.value)}%`,
              onPointerdown: onDown,
              onPointermove: onMove,
              onPointerup: onUp,
              onPointercancel: onUp,
              onKeydown,
              onDblclick: onDblClick
            }, [
              createCommentVNode(" \u6293\u63E1\u63D0\u793A\uFF1A\u4E09\u6839\u77ED\u6A2A\u7EBF\uFF0C\u53EA\u6709 hover/\u62D6\u62FD\u65F6\u624D\u663E\u5F62 "),
              createElementVNode(
                "span",
                {
                  class: normalizeClass(["wd-splitter__grip", { "is-visible": !__props.disabled }])
                },
                null,
                2
                /* CLASS */
              )
            ], 44, _hoisted_161),
            createElementVNode(
              "div",
              {
                class: "wd-splitter__pane wd-splitter__pane--second",
                style: normalizeStyle(secondStyle.value)
              },
              [
                renderSlot(_ctx.$slots, "second")
              ],
              4
              /* STYLE */
            )
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdStatistic.ts
  var _hoisted_163 = { class: "wd-statistic" };
  var _hoisted_251 = {
    key: 0,
    class: "wd-statistic__title"
  };
  var _hoisted_345 = { class: "wd-statistic__value" };
  var _hoisted_437 = {
    key: 0,
    class: "wd-statistic__affix"
  };
  var _hoisted_523 = { class: "wd-statistic__num" };
  var _hoisted_613 = {
    key: 1,
    class: "wd-statistic__affix wd-statistic__affix--suffix"
  };
  var _hoisted_713 = {
    key: 1,
    class: "wd-statistic__footer"
  };
  var WdStatistic_default = /* @__PURE__ */ defineComponent({
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
      const shown = ref(props.animated ? 0 : props.value);
      let raf = 0;
      let startAt = 0;
      const from = ref(0);
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
      onMounted(() => {
        if (props.animated) animateTo(props.value);
        else shown.value = props.value;
      });
      onBeforeUnmount(() => {
        cancelAnimationFrame(raf);
        if (fallback) window.clearTimeout(fallback);
      });
      watch(() => props.value, (v) => animateTo(v));
      const text = computed(() => {
        const fixed = Math.abs(shown.value).toFixed(props.precision);
        let [int, dec] = fixed.split(".");
        if (props.separator) int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const sign = shown.value < 0 ? "-" : "";
        return sign + int + (dec ? "." + dec : "");
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_163, [
          __props.title ? (openBlock(), createElementBlock(
            "div",
            _hoisted_251,
            toDisplayString(__props.title),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true),
          createElementVNode("div", _hoisted_345, [
            __props.prefix ? (openBlock(), createElementBlock(
              "span",
              _hoisted_437,
              toDisplayString(__props.prefix),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            createElementVNode(
              "span",
              _hoisted_523,
              toDisplayString(text.value),
              1
              /* TEXT */
            ),
            __props.suffix ? (openBlock(), createElementBlock(
              "span",
              _hoisted_613,
              toDisplayString(__props.suffix),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true)
          ]),
          _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_713, [
            renderSlot(_ctx.$slots, "footer")
          ])) : createCommentVNode("v-if", true)
        ]);
      };
    }
  });

  // .demo-build/WdSteps.ts
  var _hoisted_164 = { class: "wd-steps" };
  var _hoisted_252 = { class: "wd-steps__dot" };
  var _hoisted_346 = { class: "wd-steps__label" };
  var _hoisted_438 = {
    key: 0,
    class: "wd-steps__desc"
  };
  var WdSteps_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdSteps" },
    __name: "WdSteps",
    props: {
      steps: { type: Array, required: false, default: () => [] },
      current: { type: Number, required: false, default: 0 }
    },
    setup(__props) {
      const props = __props;
      const items = computed(
        () => props.steps.map((s) => typeof s === "string" ? { title: s, desc: "" } : { desc: "", ...s })
      );
      function state(i) {
        if (i < props.current) return "finish";
        if (i === props.current) return "process";
        return "wait";
      }
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock("div", _hoisted_164, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(items.value, (s, i) => {
              return openBlock(), createElementBlock(
                Fragment,
                { key: i },
                [
                  createElementVNode(
                    "div",
                    {
                      class: normalizeClass(["wd-steps__item", `wd-steps__item--${state(i)}`])
                    },
                    [
                      createElementVNode("span", _hoisted_252, [
                        state(i) === "finish" ? (openBlock(), createBlock(_component_wd_icon, {
                          key: 0,
                          name: "check",
                          size: 13
                        })) : (openBlock(), createElementBlock(
                          Fragment,
                          { key: 1 },
                          [
                            createTextVNode(
                              toDisplayString(i + 1),
                              1
                              /* TEXT */
                            )
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ]),
                      createElementVNode("span", _hoisted_346, [
                        createTextVNode(
                          toDisplayString(s.title) + " ",
                          1
                          /* TEXT */
                        ),
                        s.desc ? (openBlock(), createElementBlock(
                          "em",
                          _hoisted_438,
                          toDisplayString(s.desc),
                          1
                          /* TEXT */
                        )) : createCommentVNode("v-if", true)
                      ])
                    ],
                    2
                    /* CLASS */
                  ),
                  i < items.value.length - 1 ? (openBlock(), createElementBlock(
                    "span",
                    {
                      key: 0,
                      class: normalizeClass(["wd-steps__bar", { "wd-steps__bar--done": i < __props.current }])
                    },
                    null,
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true)
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

  // .demo-build/WdSwitch.ts
  var _hoisted_165 = ["aria-checked", "data-controlled", "disabled"];
  var WdSwitch_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdSwitch" },
    __name: "WdSwitch",
    props: {
      modelValue: { type: Boolean, required: false },
      defaultValue: { type: Boolean, required: false },
      disabled: { type: Boolean, required: false, default: false }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const { value, set, controlled } = useControllable({
        modelValue: computed(() => props.modelValue),
        defaultValue: computed(() => props.defaultValue),
        fallback: false,
        onChange: (v) => {
          emit("update:modelValue", v);
          emit("change", v);
        }
      });
      function toggle() {
        if (!props.disabled) set(!value.value);
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("button", {
          type: "button",
          role: "switch",
          class: normalizeClass(["wd-switch", { "wd-switch--off": !unref(value) }]),
          "aria-checked": unref(value),
          "data-controlled": unref(controlled) ? "true" : "false",
          disabled: __props.disabled,
          onClick: toggle
        }, [..._cache[0] || (_cache[0] = [
          createElementVNode(
            "span",
            { class: "wd-switch__knob" },
            null,
            -1
            /* CACHED */
          )
        ])], 10, _hoisted_165);
      };
    }
  });

  // .demo-build/WdTable.ts
  var _hoisted_166 = {
    key: 0,
    class: "wd-table__th wd-table__th--expand",
    "aria-label": "\u5C55\u5F00"
  };
  var _hoisted_253 = {
    key: 1,
    class: "wd-table__th wd-table__th--check"
  };
  var _hoisted_347 = ["aria-checked"];
  var _hoisted_439 = ["aria-sort", "onClick"];
  var _hoisted_524 = {
    key: 0,
    class: "wd-table__sort"
  };
  var _hoisted_614 = ["onClick"];
  var _hoisted_714 = ["aria-expanded", "onClick"];
  var _hoisted_813 = ["aria-checked", "onClick"];
  var _hoisted_910 = ["aria-expanded", "aria-label", "onClick"];
  var _hoisted_108 = {
    key: 0,
    class: "wd-table__expand-row"
  };
  var _hoisted_1115 = ["colspan"];
  var _hoisted_1211 = {
    key: 1,
    class: "wd-table__empty"
  };
  var _hoisted_1310 = {
    key: 2,
    class: "wd-table__loading"
  };
  var WdTable_default = /* @__PURE__ */ defineComponent({
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
      maxHeight: { type: [Number, String], required: false, default: "" },
      tree: { type: Boolean, required: false, default: false },
      childrenKey: { type: String, required: false, default: "children" },
      defaultExpandAll: { type: Boolean, required: false, default: false },
      expandable: { type: Boolean, required: false, default: false },
      expandColspan: { type: Number, required: false, default: 0 },
      size: { type: String, required: false, default: "md" }
    },
    emits: ["update:selected", "change", "row-click", "expand-change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const sortKey = ref("");
      const sortDir = ref("asc");
      const expandedKeys = ref(/* @__PURE__ */ new Set());
      function rowKeyOf(row, i) {
        const k = props.rowKey;
        if (k && row[k] !== void 0) return String(row[k]);
        return String(i);
      }
      function collectKeys(rows, prefix = "") {
        const out = [];
        rows.forEach((r, i) => {
          const k = prefix ? `${prefix}-${i}` : String(i);
          out.push(props.rowKey && r[props.rowKey] !== void 0 ? String(r[props.rowKey]) : k);
          const kids = r[props.childrenKey];
          if (Array.isArray(kids) && kids.length) out.push(...collectKeys(kids, k));
        });
        return out;
      }
      if (props.defaultExpandAll) {
        expandedKeys.value = new Set(collectKeys(props.rows));
      }
      const flatRows = computed(() => {
        if (!props.tree) {
          return props.rows.map((row, i) => ({
            row,
            depth: 0,
            key: rowKeyOf(row, i),
            hasChildren: false,
            expanded: false,
            parentKey: null,
            indexInParent: i,
            hasNextSibling: i < props.rows.length - 1
          }));
        }
        const out = [];
        const walk = (rows, depth, parentKey) => {
          rows.forEach((row, i) => {
            const key = rowKeyOf(row, i) === String(i) && depth > 0 ? `${parentKey}-${i}` : rowKeyOf(row, i);
            const kids = row[props.childrenKey];
            const hasChildren = Array.isArray(kids) && kids.length > 0;
            const expanded = expandedKeys.value.has(key);
            out.push({
              row,
              depth,
              key,
              hasChildren,
              expanded,
              parentKey,
              indexInParent: i,
              hasNextSibling: i < rows.length - 1
            });
            if (hasChildren && expanded) {
              walk(kids, depth + 1, key);
            }
          });
        };
        walk(props.rows, 0, null);
        return out;
      });
      function toggleExpand(item, e) {
        e?.stopPropagation();
        const next = new Set(expandedKeys.value);
        if (next.has(item.key)) next.delete(item.key);
        else next.add(item.key);
        expandedKeys.value = next;
        emit("expand-change", item.row, next.has(item.key));
      }
      const sorted = computed(() => {
        if (!sortKey.value || props.tree) return flatRows.value;
        const arr = [...flatRows.value];
        arr.sort((a, b) => {
          const av = String(a.row[sortKey.value] ?? "");
          const bv = String(b.row[sortKey.value] ?? "");
          const cmp = av.localeCompare(bv, "zh-CN", { numeric: true });
          return sortDir.value === "asc" ? cmp : -cmp;
        });
        return arr;
      });
      const selectedKeys = computed(() => new Set(props.selected.map((r, i) => rowKeyOf(r, i))));
      function isChecked(row, i) {
        return props.selected.some((r) => r === row || rowKeyOf(r, 0) === rowKeyOf(row, i));
      }
      const allChecked = computed(
        () => props.rows.length > 0 && props.rows.every((r, i) => isChecked(r, i))
      );
      const someChecked = computed(() => props.selected.length > 0 && !allChecked.value);
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
      const expandedRowKeys = ref(/* @__PURE__ */ new Set());
      function toggleRowExpand(item, e) {
        e?.stopPropagation();
        const next = new Set(expandedRowKeys.value);
        if (next.has(item.key)) next.delete(item.key);
        else next.add(item.key);
        expandedRowKeys.value = next;
      }
      const leftCols = computed(() => props.columns.filter((c) => c.fixed === "left"));
      const rightCols = computed(() => props.columns.filter((c) => c.fixed === "right"));
      const leftOffsets = computed(() => {
        const map = {};
        let acc = 0;
        if (props.expandable) acc += 40;
        if (props.selectable) acc += 44;
        for (const c of leftCols.value) {
          map[c.key] = acc + "px";
          acc += parseWidth(c.width);
        }
        return map;
      });
      const rightOffsets = computed(() => {
        const map = {};
        let acc = 0;
        for (let i = rightCols.value.length - 1; i >= 0; i--) {
          const c = rightCols.value[i];
          map[c.key] = acc + "px";
          acc += parseWidth(c.width);
        }
        return map;
      });
      function parseWidth(w) {
        if (!w) return 120;
        const n = parseFloat(w);
        return isNaN(n) ? 120 : n;
      }
      const wrapStyle = computed(
        () => props.maxHeight ? { maxHeight: typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight } : void 0
      );
      const colspan = computed(() => {
        if (props.expandColspan) return props.expandColspan;
        return props.columns.length + (props.selectable ? 1 : 0) + (props.expandable ? 1 : 0);
      });
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(["wd-table-wrap", {
              "wd-table-wrap--loading": __props.loading,
              "wd-table-wrap--fixed": leftCols.value.length || rightCols.value.length
            }]),
            style: normalizeStyle(wrapStyle.value)
          },
          [
            props.rows.length ? (openBlock(), createElementBlock(
              "table",
              {
                key: 0,
                class: normalizeClass(["wd-table", [`wd-table--${__props.size}`, { "wd-table--striped": __props.striped, "wd-table--tree": __props.tree }]])
              },
              [
                createElementVNode("thead", null, [
                  createElementVNode("tr", null, [
                    __props.expandable ? (openBlock(), createElementBlock("th", _hoisted_166)) : createCommentVNode("v-if", true),
                    __props.selectable ? (openBlock(), createElementBlock("th", _hoisted_253, [
                      createElementVNode("button", {
                        type: "button",
                        class: normalizeClass(["wd-table__check", { "wd-table__check--on": allChecked.value, "wd-table__check--part": someChecked.value }]),
                        "aria-checked": allChecked.value ? "true" : someChecked.value ? "mixed" : "false",
                        role: "checkbox",
                        "aria-label": "\u5168\u9009",
                        onClick: toggleAll
                      }, [
                        someChecked.value && !allChecked.value ? (openBlock(), createBlock(_component_wd_icon, {
                          key: 0,
                          name: "minus",
                          size: 10
                        })) : allChecked.value ? (openBlock(), createBlock(_component_wd_icon, {
                          key: 1,
                          name: "check",
                          size: 10
                        })) : createCommentVNode("v-if", true)
                      ], 10, _hoisted_347)
                    ])) : createCommentVNode("v-if", true),
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(props.columns, (col) => {
                        return openBlock(), createElementBlock("th", {
                          key: col.key,
                          style: normalizeStyle([
                            col.width ? { width: col.width } : void 0,
                            col.fixed === "left" ? { position: "sticky", left: leftOffsets.value[col.key], zIndex: 3 } : void 0,
                            col.fixed === "right" ? { position: "sticky", right: rightOffsets.value[col.key], zIndex: 3 } : void 0
                          ]),
                          class: normalizeClass(["wd-table__th", {
                            "wd-table__th--sort": col.sortable,
                            "wd-table__th--fixed-left": col.fixed === "left",
                            "wd-table__th--fixed-right": col.fixed === "right",
                            "wd-table__th--ellipsis": col.ellipsis
                          }]),
                          "aria-sort": sortKey.value === col.key ? sortDir.value === "asc" ? "ascending" : "descending" : "none",
                          onClick: ($event) => toggleSort(col.key, col)
                        }, [
                          createTextVNode(
                            toDisplayString(col.title) + " ",
                            1
                            /* TEXT */
                          ),
                          col.sortable ? (openBlock(), createElementBlock("span", _hoisted_524, [
                            createVNode(_component_wd_icon, {
                              name: sortKey.value !== col.key || sortDir.value === "asc" ? "arrow-up" : "arrow-down",
                              size: 12,
                              style: normalizeStyle({ color: sortKey.value === col.key ? "var(--wd-red)" : "var(--wd-ink-3)" })
                            }, null, 8, ["name", "style"])
                          ])) : createCommentVNode("v-if", true)
                        ], 14, _hoisted_439);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ]),
                createElementVNode("tbody", null, [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(sorted.value, (item, i) => {
                      return openBlock(), createElementBlock(
                        Fragment,
                        {
                          key: item.key
                        },
                        [
                          createElementVNode("tr", {
                            class: normalizeClass(["wd-table__row", {
                              "wd-table__row--checked": __props.selectable && isChecked(item.row, i),
                              "wd-table__row--expanded": expandedRowKeys.value.has(item.key)
                            }]),
                            onClick: ($event) => emit("row-click", item.row, i)
                          }, [
                            createCommentVNode(" \u5C55\u5F00\u5217 "),
                            __props.expandable ? (openBlock(), createElementBlock("td", {
                              key: 0,
                              class: "wd-table__td--expand",
                              onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                              }, ["stop"]))
                            }, [
                              createElementVNode("button", {
                                type: "button",
                                class: normalizeClass(["wd-table__expander", { "is-open": expandedRowKeys.value.has(item.key) }]),
                                "aria-expanded": expandedRowKeys.value.has(item.key),
                                "aria-label": "\u5C55\u5F00\u884C",
                                onClick: ($event) => toggleRowExpand(item, $event)
                              }, [
                                createVNode(_component_wd_icon, {
                                  name: "chevron-right",
                                  size: 13
                                })
                              ], 10, _hoisted_714)
                            ])) : createCommentVNode("v-if", true),
                            createCommentVNode(" \u52FE\u9009\u5217 "),
                            __props.selectable ? (openBlock(), createElementBlock("td", {
                              key: 1,
                              class: "wd-table__td--check",
                              onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                              }, ["stop"]))
                            }, [
                              createElementVNode("button", {
                                type: "button",
                                class: normalizeClass(["wd-table__check", { "wd-table__check--on": isChecked(item.row, i) }]),
                                "aria-checked": isChecked(item.row, i) ? "true" : "false",
                                role: "checkbox",
                                "aria-label": "\u9009\u62E9\u6B64\u884C",
                                onClick: ($event) => toggleRow(item.row)
                              }, [
                                isChecked(item.row, i) ? (openBlock(), createBlock(_component_wd_icon, {
                                  key: 0,
                                  name: "check",
                                  size: 10
                                })) : createCommentVNode("v-if", true)
                              ], 10, _hoisted_813)
                            ])) : createCommentVNode("v-if", true),
                            createCommentVNode(" \u6570\u636E\u5217 "),
                            (openBlock(true), createElementBlock(
                              Fragment,
                              null,
                              renderList(props.columns, (col, ci) => {
                                return openBlock(), createElementBlock(
                                  "td",
                                  {
                                    key: col.key,
                                    style: normalizeStyle([
                                      col.align ? { textAlign: col.align } : void 0,
                                      col.fixed === "left" ? { position: "sticky", left: leftOffsets.value[col.key], zIndex: 2 } : void 0,
                                      col.fixed === "right" ? { position: "sticky", right: rightOffsets.value[col.key], zIndex: 2 } : void 0
                                    ]),
                                    class: normalizeClass({
                                      "wd-table__td--fixed-left": col.fixed === "left",
                                      "wd-table__td--fixed-right": col.fixed === "right",
                                      "wd-table__td--ellipsis": col.ellipsis
                                    })
                                  },
                                  [
                                    createCommentVNode("\n                \u6811\u5F62\u7F29\u8FDB\u653E\u5728**\u7B2C\u4E00\u5217\u7684\u5355\u5143\u683C\u5185\u90E8**\uFF0C\u800C\u4E0D\u662F\u7ED9\u6574\u884C\u52A0 padding\uFF1A\n                \u6574\u884C\u52A0 padding \u4F1A\u628A\u56FA\u5B9A\u5217\u4E5F\u63A8\u504F\uFF0C\u7F29\u8FDB\u5E94\u8BE5\u662F\u5185\u5BB9\u5C42\u7684\u5C5E\u6027\u3002\n              "),
                                    __props.tree && ci === 0 ? (openBlock(), createElementBlock(
                                      "span",
                                      {
                                        key: 0,
                                        class: "wd-table__indent",
                                        style: normalizeStyle({ paddingLeft: item.depth * 18 + "px" })
                                      },
                                      [
                                        item.hasChildren ? (openBlock(), createElementBlock("button", {
                                          key: 0,
                                          type: "button",
                                          class: normalizeClass(["wd-table__tree-toggle", { "is-open": item.expanded }]),
                                          "aria-expanded": item.expanded,
                                          "aria-label": item.expanded ? "\u6536\u8D77" : "\u5C55\u5F00",
                                          onClick: withModifiers(($event) => toggleExpand(item, $event), ["stop"])
                                        }, [
                                          createVNode(_component_wd_icon, {
                                            name: "chevron-right",
                                            size: 12
                                          })
                                        ], 10, _hoisted_910)) : (openBlock(), createElementBlock(
                                          Fragment,
                                          { key: 1 },
                                          [
                                            createCommentVNode(" \u65E0\u5B50\u8282\u70B9\u7684\u53F6\u5B50\uFF1A\u5360\u4E00\u4E2A\u4E0E\u7BAD\u5934\u7B49\u5BBD\u7684\u4F4D\uFF0C\u4FDD\u6301\u6587\u5B57\u5BF9\u9F50 "),
                                            _cache[2] || (_cache[2] = createElementVNode(
                                              "span",
                                              { class: "wd-table__tree-spacer" },
                                              null,
                                              -1
                                              /* CACHED */
                                            ))
                                          ],
                                          2112
                                          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                        ))
                                      ],
                                      4
                                      /* STYLE */
                                    )) : createCommentVNode("v-if", true),
                                    renderSlot(_ctx.$slots, `cell-${col.key}`, {
                                      row: item.row,
                                      value: item.row[col.key],
                                      depth: item.depth
                                    }, () => [
                                      createTextVNode(
                                        toDisplayString(item.row[col.key]),
                                        1
                                        /* TEXT */
                                      )
                                    ])
                                  ],
                                  6
                                  /* CLASS, STYLE */
                                );
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ], 10, _hoisted_614),
                          createCommentVNode(" \u884C\u5C55\u5F00\u8BE6\u60C5 "),
                          __props.expandable && expandedRowKeys.value.has(item.key) ? (openBlock(), createElementBlock("tr", _hoisted_108, [
                            createElementVNode("td", {
                              colspan: colspan.value,
                              class: "wd-table__expand-cell"
                            }, [
                              renderSlot(_ctx.$slots, "expand", {
                                row: item.row,
                                index: i
                              }, () => [
                                _cache[3] || (_cache[3] = createElementVNode(
                                  "span",
                                  { class: "wd-table__expand-empty" },
                                  "\u672A\u63D0\u4F9B expand \u63D2\u69FD",
                                  -1
                                  /* CACHED */
                                ))
                              ])
                            ], 8, _hoisted_1115)
                          ])) : createCommentVNode("v-if", true)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ],
              2
              /* CLASS */
            )) : !__props.loading ? (openBlock(), createElementBlock(
              "div",
              _hoisted_1211,
              toDisplayString(__props.emptyText),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            createCommentVNode(" \u52A0\u8F7D\u4E2D\uFF1A\u76D6\u4E00\u5C42\u534A\u900F\u660E\u906E\u7F69 + \u8F6C\u5708\uFF0C\u4FDD\u7559\u8868\u5934\u7ED3\u6784 "),
            __props.loading ? (openBlock(), createElementBlock("div", _hoisted_1310, [
              _cache[4] || (_cache[4] = createElementVNode(
                "span",
                { class: "wd-spinner" },
                null,
                -1
                /* CACHED */
              )),
              createElementVNode(
                "span",
                null,
                toDisplayString(__props.loadingText),
                1
                /* TEXT */
              )
            ])) : createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        );
      };
    }
  });

  // .demo-build/WdTabs.ts
  var _hoisted_167 = ["aria-selected", "disabled", "tabindex", "onClick"];
  var _hoisted_254 = { class: "wd-tabs__label" };
  var _hoisted_348 = ["aria-label", "onClick"];
  var WdTabs_default = /* @__PURE__ */ defineComponent({
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
      const animReady = ref(false);
      function select(v) {
        animReady.value = true;
        emit("update:modelValue", v);
      }
      const items = computed(
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
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(["wd-tabs", {
              "wd-tabs--block": __props.block,
              "wd-tabs--anim-ready": animReady.value,
              "wd-tabs--scrollable": __props.scrollable,
              "wd-tabs--closable": items.value.some((t) => t.closable)
            }]),
            role: "tablist",
            onKeydown
          },
          [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(items.value, (t) => {
                return openBlock(), createElementBlock("button", {
                  key: t.value,
                  type: "button",
                  role: "tab",
                  class: normalizeClass(["wd-tabs__item", {
                    "wd-tabs__item--active": t.value === __props.modelValue,
                    "wd-tabs__item--disabled": t.disabled
                  }]),
                  "data-wd-hover": "",
                  "aria-selected": t.value === __props.modelValue,
                  disabled: t.disabled,
                  tabindex: t.value === __props.modelValue ? 0 : -1,
                  onClick: ($event) => select(t.value)
                }, [
                  createElementVNode(
                    "span",
                    _hoisted_254,
                    toDisplayString(t.label),
                    1
                    /* TEXT */
                  ),
                  t.closable && !t.disabled ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: "wd-tabs__close",
                    role: "button",
                    "aria-label": `\u5173\u95ED ${t.label}`,
                    onClick: ($event) => close(t, $event)
                  }, [
                    createVNode(_component_wd_icon, {
                      name: "close",
                      size: 10
                    })
                  ], 8, _hoisted_348)) : createCommentVNode("v-if", true)
                ], 10, _hoisted_167);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            __props.addable ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "wd-tabs__add",
              "aria-label": "\u65B0\u5EFA",
              "data-wd-hover": "",
              onClick: _cache[0] || (_cache[0] = ($event) => emit("add"))
            }, [
              createVNode(_component_wd_icon, {
                name: "plus",
                size: 14
              })
            ])) : createCommentVNode("v-if", true)
          ],
          34
          /* CLASS, NEED_HYDRATION */
        );
      };
    }
  });

  // .demo-build/WdTag.ts
  var _hoisted_168 = {
    key: 0,
    class: "wd-tag__dot"
  };
  var WdTag_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdTag" },
    __name: "WdTag",
    props: {
      variant: { type: String, required: false, default: "tint" },
      size: { type: String, required: false },
      dot: { type: Boolean, required: false, default: false }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "span",
          {
            class: normalizeClass(["wd-tag", [`wd-tag--${__props.variant}`, { "wd-tag--lg": __props.size === "lg", "wd-tag--sm": __props.size === "sm" }]]),
            "data-wd-hover": ""
          },
          [
            __props.dot ? (openBlock(), createElementBlock("i", _hoisted_168)) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default")
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdTimeline.ts
  var _hoisted_169 = ["onClick"];
  var _hoisted_255 = { class: "wd-timeline__node" };
  var _hoisted_349 = {
    key: 1,
    class: "wd-timeline__dot"
  };
  var _hoisted_440 = { class: "wd-timeline__body" };
  var _hoisted_525 = {
    key: 0,
    class: "wd-timeline__period"
  };
  var _hoisted_615 = { class: "wd-timeline__title" };
  var _hoisted_715 = {
    key: 1,
    class: "wd-timeline__desc"
  };
  var WdTimeline_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdTimeline" },
    __name: "WdTimeline",
    props: {
      items: { type: Array, required: true },
      line: { type: Boolean, required: false, default: false },
      mode: { type: String, required: false, default: "vertical" },
      lineStyle: { type: String, required: false, default: "solid" },
      size: { type: String, required: false, default: "md" },
      collapsible: { type: Boolean, required: false, default: false }
    },
    emits: ["item-click"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const expanded = ref(/* @__PURE__ */ new Set());
      function toggle(i, item) {
        if (!props.collapsible || !item.detail) return;
        const next = new Set(expanded.value);
        if (next.has(i)) next.delete(i);
        else next.add(i);
        expanded.value = next;
        emit("item-click", item, i);
      }
      const resolvedLine = computed(() => {
        if (props.lineStyle !== "solid") return props.lineStyle;
        return props.line ? "solid" : "none";
      });
      const isHorizontal = computed(() => props.mode === "horizontal");
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          "ul",
          {
            class: normalizeClass(["wd-timeline", [
              `wd-timeline--${__props.mode}`,
              `wd-timeline--line-${resolvedLine.value}`,
              `wd-timeline--${__props.size}`
            ]])
          },
          [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(__props.items, (it, i) => {
                return openBlock(), createElementBlock("li", {
                  key: i,
                  class: normalizeClass(["wd-timeline__item", {
                    "is-active": it.active,
                    "is-disabled": it.disabled,
                    "is-clickable": __props.collapsible && it.detail,
                    "is-expanded": expanded.value.has(i),
                    "is-last": i === __props.items.length - 1
                  }]),
                  style: normalizeStyle(it.color ? { "--tl-color": it.color } : void 0),
                  onClick: ($event) => toggle(i, it)
                }, [
                  createCommentVNode(" \u8282\u70B9 "),
                  createElementVNode("span", _hoisted_255, [
                    it.icon ? (openBlock(), createBlock(_component_wd_icon, {
                      key: 0,
                      name: it.icon,
                      size: __props.size === "sm" ? 11 : 13
                    }, null, 8, ["name", "size"])) : (openBlock(), createElementBlock("span", _hoisted_349))
                  ]),
                  createCommentVNode(" \u4E3B\u4F53 "),
                  createElementVNode("div", _hoisted_440, [
                    it.period ? (openBlock(), createElementBlock(
                      "span",
                      _hoisted_525,
                      toDisplayString(it.period),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    createElementVNode("h3", _hoisted_615, [
                      createTextVNode(
                        toDisplayString(it.title) + " ",
                        1
                        /* TEXT */
                      ),
                      __props.collapsible && it.detail ? (openBlock(), createBlock(_component_wd_icon, {
                        key: 0,
                        class: normalizeClass(["wd-timeline__caret", { "is-open": expanded.value.has(i) }]),
                        name: "chevron-down",
                        size: 13
                      }, null, 8, ["class"])) : createCommentVNode("v-if", true)
                    ]),
                    it.desc ? (openBlock(), createElementBlock(
                      "p",
                      _hoisted_715,
                      toDisplayString(it.desc),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    createCommentVNode("\n          \u6298\u53E0\u5185\u5BB9\u7528 v-show \u800C\u975E v-if\uFF1A\n          \u5C55\u5F00/\u6536\u8D77\u662F\u9AD8\u9891\u64CD\u4F5C\uFF0C\u4FDD\u7559 DOM \u907F\u514D\u6BCF\u6B21\u91CD\u5EFA\uFF1B\n          \u540C\u65F6 v-show \u4E0D\u53C2\u4E0E Transition\uFF0C\u7ED5\u5F00\u52A8\u753B\u65F6\u949F\u505C\u6446\u7684\u95EE\u9898\u3002\n        "),
                    __props.collapsible && it.detail ? withDirectives((openBlock(), createElementBlock(
                      "div",
                      {
                        key: 2,
                        class: "wd-timeline__detail"
                      },
                      toDisplayString(it.detail),
                      513
                      /* TEXT, NEED_PATCH */
                    )), [
                      [vShow, expanded.value.has(i)]
                    ]) : createCommentVNode("v-if", true)
                  ])
                ], 14, _hoisted_169);
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

  // .demo-build/WdTooltip.ts
  var WdTooltip_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdTooltip" },
    __name: "WdTooltip",
    props: {
      content: { type: String, required: false, default: "" },
      placement: { type: String, required: false, default: "top" }
    },
    setup(__props) {
      const props = __props;
      const open = ref(false);
      const anchorEl = ref(null);
      const panelEl = ref(null);
      const { pos } = useAnchoredPosition(open, anchorEl, panelEl, {
        placement: props.placement === "top" ? "top-start" : "bottom-start",
        gap: 8
      });
      const style = computed(() => ({
        top: pos.value.top + "px",
        left: pos.value.left + "px"
      }));
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          Fragment,
          null,
          [
            createElementVNode(
              "span",
              {
                ref_key: "anchorEl",
                ref: anchorEl,
                class: "wd-tooltip",
                onMouseenter: _cache[0] || (_cache[0] = ($event) => open.value = true),
                onMouseleave: _cache[1] || (_cache[1] = ($event) => open.value = false),
                onFocusin: _cache[2] || (_cache[2] = ($event) => open.value = true),
                onFocusout: _cache[3] || (_cache[3] = ($event) => open.value = false)
              },
              [
                renderSlot(_ctx.$slots, "default")
              ],
              544
              /* NEED_HYDRATION, NEED_PATCH */
            ),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              createCommentVNode("\n      \u663E\u9690\u7528 .is-open + display\uFF0C\u4E0D\u7528 <Transition>\uFF1A\n      \u65F6\u949F\u505C\u6446\u65F6 enter-from \u4F1A\u6B8B\u7559\uFF0C\u6C14\u6CE1\u5361\u5728\u534A\u900F\u660E\u6216\u6C38\u4E0D\u6D88\u5931\u3002\n\n      \u26A0\uFE0F \u4E0D\u80FD\u7528 v-show\uFF1A\u5B83\u628A `display:none` \u5199\u6210**\u5185\u8054\u6837\u5F0F**\uFF0C\n      \u4F18\u5148\u7EA7\u9AD8\u4E8E `.is-open { display: block }`\uFF0C\u7ED3\u679C\u6C38\u8FDC\u663E\u793A\u4E0D\u51FA\u6765\u3002\n      \u6539\u4E3A\u300C\u8282\u70B9\u5E38\u9A7B + \u53EA\u9760\u7C7B\u5207\u6362\u300D\uFF0Cdisplay \u5B8C\u5168\u4EA4\u7ED9 CSS\u3002\n    "),
              createElementVNode(
                "span",
                {
                  ref_key: "panelEl",
                  ref: panelEl,
                  class: normalizeClass(["wd-tooltip__bubble", { "is-open": open.value }]),
                  style: normalizeStyle(style.value),
                  role: "tooltip"
                },
                toDisplayString(__props.content),
                7
                /* TEXT, CLASS, STYLE */
              )
            ]))
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });

  // .demo-build/WdTransfer.ts
  var _hoisted_170 = { class: "wd-transfer__panel" };
  var _hoisted_256 = { class: "wd-transfer__head" };
  var _hoisted_350 = { class: "wd-transfer__check-all" };
  var _hoisted_441 = ["checked", ".indeterminate"];
  var _hoisted_526 = { class: "wd-transfer__count" };
  var _hoisted_616 = {
    key: 0,
    class: "wd-transfer__search"
  };
  var _hoisted_716 = {
    key: 0,
    class: "wd-transfer__empty"
  };
  var _hoisted_814 = ["aria-checked", "aria-disabled"];
  var _hoisted_911 = { class: "wd-transfer__label" };
  var _hoisted_109 = {
    key: 0,
    class: "wd-transfer__desc"
  };
  var _hoisted_1116 = { class: "wd-transfer__ops" };
  var _hoisted_1212 = ["disabled"];
  var _hoisted_1311 = ["disabled"];
  var _hoisted_1410 = { class: "wd-transfer__panel" };
  var _hoisted_1510 = { class: "wd-transfer__head" };
  var _hoisted_1610 = { class: "wd-transfer__check-all" };
  var _hoisted_173 = ["checked", ".indeterminate"];
  var _hoisted_183 = { class: "wd-transfer__count" };
  var _hoisted_193 = {
    key: 0,
    class: "wd-transfer__search"
  };
  var _hoisted_203 = {
    key: 0,
    class: "wd-transfer__empty"
  };
  var _hoisted_2111 = ["aria-disabled"];
  var _hoisted_2210 = { class: "wd-transfer__label" };
  var _hoisted_2310 = {
    key: 0,
    class: "wd-transfer__desc"
  };
  var WdTransfer_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdTransfer" },
    __name: "WdTransfer",
    props: {
      data: { type: Array, required: false, default: () => [] },
      modelValue: { type: Array, required: false, default: void 0 },
      sourceTitle: { type: String, required: false, default: "\u5F85\u9009" },
      targetTitle: { type: String, required: false, default: "\u5DF2\u9009" },
      searchPlaceholder: { type: String, required: false, default: "\u641C\u7D22" },
      height: { type: Number, required: false, default: 280 },
      filterable: { type: Boolean, required: false, default: true },
      disabled: { type: Boolean, required: false, default: false }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const inner = ref([]);
      const isControlled = computed(() => props.modelValue !== void 0);
      const selectedKeys = computed(() => isControlled.value ? props.modelValue : inner.value);
      const leftQuery = ref("");
      const rightQuery = ref("");
      function match(item, q) {
        if (!q.trim()) return true;
        const s = q.trim().toLowerCase();
        return item.label.toLowerCase().includes(s) || (item.desc ?? "").toLowerCase().includes(s);
      }
      const selectedSet = computed(() => new Set(selectedKeys.value));
      const leftList = computed(
        () => props.data.filter((d) => !selectedSet.value.has(d.key) && match(d, leftQuery.value))
      );
      const rightList = computed(
        () => props.data.filter((d) => selectedSet.value.has(d.key) && match(d, rightQuery.value))
      );
      const leftChecked = ref(/* @__PURE__ */ new Set());
      const rightChecked = ref(/* @__PURE__ */ new Set());
      function toggleCheck(side, key) {
        const set = side === "left" ? leftChecked : rightChecked;
        const next = new Set(set.value);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        set.value = next;
      }
      function checkAll(side, list) {
        const set = side === "left" ? leftChecked : rightChecked;
        const enabled = list.filter((d) => !d.disabled).map((d) => d.key);
        const allOn = enabled.length > 0 && enabled.every((k) => set.value.has(k));
        const next = new Set(set.value);
        enabled.forEach((k) => allOn ? next.delete(k) : next.add(k));
        set.value = next;
      }
      function isAllChecked(list, set) {
        const enabled = list.filter((d) => !d.disabled);
        return enabled.length > 0 && enabled.every((d) => set.has(d.key));
      }
      function move(dir) {
        if (props.disabled) return;
        const from = dir === "right" ? leftChecked.value : rightChecked.value;
        if (from.size === 0) return;
        const keys = [...from];
        let next;
        if (dir === "right") {
          next = [...selectedKeys.value, ...keys.filter((k) => !selectedSet.value.has(k))];
        } else {
          const drop = new Set(keys);
          next = selectedKeys.value.filter((k) => !drop.has(k));
        }
        if (!isControlled.value) inner.value = next;
        emit("update:modelValue", next);
        emit("change", next, dir);
        if (dir === "right") leftChecked.value = /* @__PURE__ */ new Set();
        else rightChecked.value = /* @__PURE__ */ new Set();
      }
      const canMoveRight = computed(() => leftChecked.value.size > 0 && !props.disabled);
      const canMoveLeft = computed(() => rightChecked.value.size > 0 && !props.disabled);
      return (_ctx, _cache) => {
        const _component_wd_input = resolveComponent("wd-input");
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(["wd-transfer", { "is-disabled": __props.disabled }])
          },
          [
            createCommentVNode(" ---------------- \u5DE6\u4FA7\uFF1A\u5F85\u9009 ---------------- "),
            createElementVNode("div", _hoisted_170, [
              createElementVNode("div", _hoisted_256, [
                createElementVNode("label", _hoisted_350, [
                  createElementVNode("input", {
                    type: "checkbox",
                    checked: isAllChecked(leftList.value, leftChecked.value),
                    ".indeterminate": leftChecked.value.size > 0 && !isAllChecked(leftList.value, leftChecked.value),
                    onChange: _cache[0] || (_cache[0] = ($event) => checkAll("left", leftList.value))
                  }, null, 40, _hoisted_441),
                  createElementVNode(
                    "span",
                    null,
                    toDisplayString(__props.sourceTitle),
                    1
                    /* TEXT */
                  )
                ]),
                createCommentVNode('\n          \u8BA1\u6570\u8BED\u4E49\uFF1A\u9ED8\u8BA4\u663E\u793A\u603B\u6570\uFF0C\u6709\u52FE\u9009\u65F6\u663E\u793A"\u5DF2\u52FE M / \u5171 N"\u3002\n          \u26A0\uFE0F \u4E4B\u524D\u5DE6\u53F3\u90FD\u5199 `\u52FE\u9009\u6570 / \u5217\u8868\u957F\u5EA6`\uFF0C\n          \u53F3\u4FA7\u5217\u8868\u957F\u5EA6\u5C31\u662F\u5DF2\u9009\u603B\u6570\uFF0C\u4E8E\u662F\u51FA\u73B0"0/2"\u8FD9\u79CD\n          \u770B\u8D77\u6765\u50CF"\u4E00\u4E2A\u90FD\u6CA1\u9009"\u7684\u8BEF\u5BFC\u6587\u6848 \u2014\u2014 \u5B9E\u9645\u662F\u6709 2 \u9879\u5DF2\u9009\u3002\n        '),
                createElementVNode("span", _hoisted_526, [
                  leftChecked.value.size ? (openBlock(), createElementBlock(
                    Fragment,
                    { key: 0 },
                    [
                      createTextVNode(
                        toDisplayString(leftChecked.value.size) + " / ",
                        1
                        /* TEXT */
                      )
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : createCommentVNode("v-if", true),
                  createTextVNode(
                    toDisplayString(leftList.value.length) + " \u9879 ",
                    1
                    /* TEXT */
                  )
                ])
              ]),
              __props.filterable ? (openBlock(), createElementBlock("div", _hoisted_616, [
                createVNode(_component_wd_input, {
                  modelValue: leftQuery.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => leftQuery.value = $event),
                  placeholder: __props.searchPlaceholder,
                  size: "sm",
                  clearable: ""
                }, null, 8, ["modelValue", "placeholder"])
              ])) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  class: "wd-transfer__list",
                  style: normalizeStyle({ height: __props.height + "px" })
                },
                [
                  leftList.value.length === 0 ? (openBlock(), createElementBlock(
                    "p",
                    _hoisted_716,
                    toDisplayString(__props.data.length === 0 ? "\u6682\u65E0\u6570\u636E" : "\u6CA1\u6709\u53EF\u79FB\u52A8\u9879"),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true),
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(leftList.value, (d) => {
                      return openBlock(), createElementBlock(
                        "label",
                        {
                          key: d.key,
                          class: normalizeClass(["wd-transfer__item", { "is-checked": leftChecked.value.has(d.key), "is-disabled": d.disabled }])
                        },
                        [
                          createCommentVNode("\n            \u81EA\u5B9A\u4E49\u5706\u5F62\u52FE\u9009\u6307\u793A\u5668\uFF0C\u4E0D\u7528\u539F\u751F checkbox\u3002\n            \u539F\u751F\u6846\u5728\u5404\u5E73\u53F0\u5B57\u5F62/\u5C3A\u5BF8\u4E0D\u4E00\uFF0C\u4E14\u65B9\u5F62\u4E0E\u5168\u7AD9\u300C\u5706\u5F62\u4F18\u5148\u300D\u51B2\u7A81\u3002\n            role=checkbox + aria-checked \u4FDD\u8BC1\u65E0\u969C\u788D\u8BED\u4E49\u4E0D\u4E22\u3002\n          "),
                          createElementVNode("span", {
                            class: normalizeClass(["wd-transfer__tick", { "is-on": leftChecked.value.has(d.key) }]),
                            role: "checkbox",
                            "aria-checked": leftChecked.value.has(d.key),
                            "aria-disabled": d.disabled || __props.disabled
                          }, [
                            leftChecked.value.has(d.key) ? (openBlock(), createBlock(_component_wd_icon, {
                              key: 0,
                              name: "check",
                              size: 10
                            })) : createCommentVNode("v-if", true)
                          ], 10, _hoisted_814),
                          createElementVNode("span", _hoisted_911, [
                            createTextVNode(
                              toDisplayString(d.label) + " ",
                              1
                              /* TEXT */
                            ),
                            d.desc ? (openBlock(), createElementBlock(
                              "span",
                              _hoisted_109,
                              toDisplayString(d.desc),
                              1
                              /* TEXT */
                            )) : createCommentVNode("v-if", true)
                          ])
                        ],
                        2
                        /* CLASS */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                4
                /* STYLE */
              )
            ]),
            createCommentVNode(" ---------------- \u4E2D\u95F4\u6309\u94AE ---------------- "),
            createElementVNode("div", _hoisted_1116, [
              createElementVNode("button", {
                type: "button",
                class: "wd-transfer__op",
                disabled: !canMoveRight.value,
                "aria-label": "\u79FB\u5165\u53F3\u4FA7",
                onClick: _cache[2] || (_cache[2] = ($event) => move("right"))
              }, [
                createVNode(_component_wd_icon, {
                  name: "arrow-right",
                  size: 16
                })
              ], 8, _hoisted_1212),
              createElementVNode("button", {
                type: "button",
                class: "wd-transfer__op",
                disabled: !canMoveLeft.value,
                "aria-label": "\u79FB\u56DE\u5DE6\u4FA7",
                onClick: _cache[3] || (_cache[3] = ($event) => move("left"))
              }, [
                createVNode(_component_wd_icon, {
                  name: "arrow-left",
                  size: 16
                })
              ], 8, _hoisted_1311)
            ]),
            createCommentVNode(" ---------------- \u53F3\u4FA7\uFF1A\u5DF2\u9009 ---------------- "),
            createElementVNode("div", _hoisted_1410, [
              createElementVNode("div", _hoisted_1510, [
                createElementVNode("label", _hoisted_1610, [
                  createElementVNode("input", {
                    type: "checkbox",
                    checked: isAllChecked(rightList.value, rightChecked.value),
                    ".indeterminate": rightChecked.value.size > 0 && !isAllChecked(rightList.value, rightChecked.value),
                    onChange: _cache[4] || (_cache[4] = ($event) => checkAll("right", rightList.value))
                  }, null, 40, _hoisted_173),
                  createElementVNode(
                    "span",
                    null,
                    toDisplayString(__props.targetTitle),
                    1
                    /* TEXT */
                  )
                ]),
                createCommentVNode(' \u53F3\u4FA7\uFF1A\u5217\u8868\u957F\u5EA6\u672C\u8EAB\u5C31\u662F"\u5DF2\u9009\u603B\u6570"\uFF0C\u4E0D\u518D\u91CD\u590D\u8868\u8FBE '),
                createElementVNode("span", _hoisted_183, [
                  rightChecked.value.size ? (openBlock(), createElementBlock(
                    Fragment,
                    { key: 0 },
                    [
                      createTextVNode(
                        "\u5DF2\u52FE " + toDisplayString(rightChecked.value.size) + " \xB7 ",
                        1
                        /* TEXT */
                      )
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : createCommentVNode("v-if", true),
                  createTextVNode(
                    "\u5171 " + toDisplayString(rightList.value.length) + " \u9879 ",
                    1
                    /* TEXT */
                  )
                ])
              ]),
              __props.filterable ? (openBlock(), createElementBlock("div", _hoisted_193, [
                createVNode(_component_wd_input, {
                  modelValue: rightQuery.value,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => rightQuery.value = $event),
                  placeholder: __props.searchPlaceholder,
                  size: "sm",
                  clearable: ""
                }, null, 8, ["modelValue", "placeholder"])
              ])) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  class: "wd-transfer__list",
                  style: normalizeStyle({ height: __props.height + "px" })
                },
                [
                  rightList.value.length === 0 ? (openBlock(), createElementBlock("p", _hoisted_203, "\u8FD8\u6CA1\u6709\u9009\u4E2D\u9879")) : createCommentVNode("v-if", true),
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(rightList.value, (d) => {
                      return openBlock(), createElementBlock(
                        "label",
                        {
                          key: d.key,
                          class: normalizeClass(["wd-transfer__item", { "is-checked": true, "is-disabled": d.disabled }])
                        },
                        [
                          createElementVNode("span", {
                            class: normalizeClass(["wd-transfer__tick", { "is-on": true }]),
                            role: "checkbox",
                            "aria-checked": true,
                            "aria-disabled": d.disabled || __props.disabled
                          }, [
                            createVNode(_component_wd_icon, {
                              name: "check",
                              size: 10
                            })
                          ], 8, _hoisted_2111),
                          createElementVNode("span", _hoisted_2210, [
                            createTextVNode(
                              toDisplayString(d.label) + " ",
                              1
                              /* TEXT */
                            ),
                            d.desc ? (openBlock(), createElementBlock(
                              "span",
                              _hoisted_2310,
                              toDisplayString(d.desc),
                              1
                              /* TEXT */
                            )) : createCommentVNode("v-if", true)
                          ])
                        ],
                        2
                        /* CLASS */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                4
                /* STYLE */
              )
            ])
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdTree.ts
  var _hoisted_171 = ["data-k", "tabindex", "aria-expanded", "aria-selected", "aria-disabled", "onClick", "onKeydown"];
  var _hoisted_257 = ["onClick"];
  var _hoisted_351 = ["checked", ".indeterminate", "disabled", "onChange"];
  var _hoisted_442 = {
    key: 1,
    class: "wd-tree__icon"
  };
  var _hoisted_527 = { class: "wd-tree__label" };
  var _hoisted_617 = {
    key: 0,
    class: "wd-tree__empty"
  };
  var WdTree_default = /* @__PURE__ */ defineComponent({
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
      const innerExpanded = ref([...props.expandedKeys]);
      const expanded = computed(() => props.expandedKeys ? props.expandedKeys : innerExpanded.value);
      function isExpanded(k) {
        return expanded.value.includes(k);
      }
      const innerChecked = ref([...props.checkedKeys]);
      const checked = computed(() => props.checkedKeys ? props.checkedKeys : innerChecked.value);
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
      const flat = computed(() => {
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
      const focusKey = ref(null);
      const treeEl = ref(null);
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
      watch(
        () => props.expandedKeys,
        (v) => {
          if (v) innerExpanded.value = [...v];
        }
      );
      watch(
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
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          "div",
          {
            ref_key: "treeEl",
            ref: treeEl,
            class: normalizeClass(["wd-tree", { "wd-tree--line": __props.showLine }]),
            role: "tree",
            onKeydown: _cache[2] || (_cache[2] = withModifiers(() => {
            }, ["self", "prevent"]))
          },
          [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(flat.value, (entry) => {
                return openBlock(), createElementBlock("div", {
                  key: keyOf(entry.node),
                  class: normalizeClass(["wd-tree__node", {
                    "wd-tree__node--selected": __props.selectedKey === keyOf(entry.node),
                    "wd-tree__node--disabled": entry.node.disabled
                  }]),
                  role: "treeitem",
                  "data-k": keyOf(entry.node),
                  tabindex: entry.node.disabled ? -1 : 0,
                  "aria-expanded": entry.node.children?.length ? isExpanded(keyOf(entry.node)) : void 0,
                  "aria-selected": __props.selectedKey === keyOf(entry.node),
                  "aria-disabled": entry.node.disabled || void 0,
                  style: normalizeStyle({ paddingLeft: depthPad(entry.depth), "--wd-tree-line-x": lineX(entry.depth) }),
                  onClick: ($event) => select(entry.node),
                  onKeydown: ($event) => onKeydown($event, entry)
                }, [
                  createElementVNode("span", {
                    class: normalizeClass(["wd-tree__arrow", { "wd-tree__arrow--open": isExpanded(keyOf(entry.node)), "wd-tree__arrow--leaf": !entry.node.children?.length }]),
                    onClick: withModifiers(($event) => entry.node.children?.length && toggleExpand(entry.node), ["stop"])
                  }, [
                    entry.node.children?.length ? (openBlock(), createBlock(_component_wd_icon, {
                      key: 0,
                      name: "chevron-right",
                      size: 10
                    })) : createCommentVNode("v-if", true)
                  ], 10, _hoisted_257),
                  __props.checkable ? (openBlock(), createElementBlock("label", {
                    key: 0,
                    class: "wd-tree__check",
                    onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                    }, ["stop"]))
                  }, [
                    createElementVNode("input", {
                      type: "checkbox",
                      checked: isChecked(keyOf(entry.node)),
                      ".indeterminate": isIndeterminate(entry.node),
                      disabled: entry.node.disabled,
                      onChange: ($event) => toggleCheck(entry.node)
                    }, null, 40, _hoisted_351)
                  ])) : createCommentVNode("v-if", true),
                  entry.node.icon || _ctx.$slots.icon ? (openBlock(), createElementBlock("span", _hoisted_442, [
                    renderSlot(_ctx.$slots, "icon", {
                      node: entry.node
                    }, () => [
                      createTextVNode(
                        toDisplayString(entry.node.icon),
                        1
                        /* TEXT */
                      )
                    ])
                  ])) : createCommentVNode("v-if", true),
                  createElementVNode("span", _hoisted_527, [
                    renderSlot(_ctx.$slots, "label", {
                      node: entry.node
                    }, () => [
                      createTextVNode(
                        toDisplayString(entry.node.label),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  _ctx.$slots.extra ? (openBlock(), createElementBlock("span", {
                    key: 2,
                    class: "wd-tree__extra",
                    onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                    }, ["stop"]))
                  }, [
                    renderSlot(_ctx.$slots, "extra", {
                      node: entry.node
                    })
                  ])) : createCommentVNode("v-if", true)
                ], 46, _hoisted_171);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            !flat.value.length ? (openBlock(), createElementBlock(
              "div",
              _hoisted_617,
              toDisplayString(__props.emptyText),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true)
          ],
          34
          /* CLASS, NEED_HYDRATION */
        );
      };
    }
  });

  // .demo-build/WdUpload.ts
  var _hoisted_174 = { class: "wd-upload" };
  var _hoisted_258 = { class: "wd-upload__icon" };
  var _hoisted_352 = {
    key: 0,
    class: "wd-upload__hint"
  };
  var _hoisted_443 = ["accept", "multiple"];
  var _hoisted_528 = {
    key: 1,
    class: "wd-upload__error"
  };
  var _hoisted_618 = {
    key: 0,
    class: "wd-upload__list"
  };
  var _hoisted_717 = { class: "wd-upload__file-icon" };
  var _hoisted_815 = { class: "wd-upload__info" };
  var _hoisted_912 = { class: "wd-upload__name" };
  var _hoisted_1010 = { class: "wd-upload__meta" };
  var _hoisted_1117 = {
    key: 0,
    class: "wd-upload__progress"
  };
  var _hoisted_1213 = ["onClick"];
  var WdUpload_default = /* @__PURE__ */ defineComponent({
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
      const error = ref("");
      const files = ref([]);
      const dragging = ref(false);
      const input = ref();
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
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock("div", _hoisted_174, [
          createElementVNode(
            "div",
            {
              class: normalizeClass(["wd-upload__zone", { "wd-upload__zone--over": dragging.value }]),
              onClick: openPicker,
              onDragover: _cache[0] || (_cache[0] = withModifiers(($event) => dragging.value = true, ["prevent"])),
              onDragleave: _cache[1] || (_cache[1] = ($event) => dragging.value = false),
              onDrop
            },
            [
              createElementVNode("span", _hoisted_258, [
                createVNode(_component_wd_icon, {
                  name: "upload",
                  size: 30
                })
              ]),
              _cache[2] || (_cache[2] = createElementVNode(
                "span",
                { class: "wd-upload__hint" },
                [
                  createElementVNode("strong", null, "\u70B9\u51FB\u9009\u62E9"),
                  createTextVNode(" \u6216\u62D6\u62FD\u6587\u4EF6\u5230\u8FD9\u91CC")
                ],
                -1
                /* CACHED */
              )),
              __props.hint ? (openBlock(), createElementBlock(
                "span",
                _hoisted_352,
                toDisplayString(__props.hint),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true),
              _cache[3] || (_cache[3] = createElementVNode(
                "span",
                { class: "wd-upload__browse" },
                "\u6D4F\u89C8\u6587\u4EF6",
                -1
                /* CACHED */
              )),
              createElementVNode("input", {
                ref_key: "input",
                ref: input,
                class: "wd-upload__input",
                type: "file",
                accept: __props.accept,
                multiple: __props.multiple,
                onChange: onPick
              }, null, 40, _hoisted_443),
              error.value ? (openBlock(), createElementBlock(
                "span",
                _hoisted_528,
                toDisplayString(error.value),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true)
            ],
            34
            /* CLASS, NEED_HYDRATION */
          ),
          __props.showList && files.value.length ? (openBlock(), createElementBlock("div", _hoisted_618, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(files.value, (f, i) => {
                return openBlock(), createElementBlock("div", {
                  key: i,
                  class: "wd-upload__item"
                }, [
                  createElementVNode("span", _hoisted_717, [
                    createVNode(_component_wd_icon, {
                      name: "file",
                      size: 16
                    })
                  ]),
                  createElementVNode("div", _hoisted_815, [
                    createElementVNode(
                      "div",
                      _hoisted_912,
                      toDisplayString(f.name),
                      1
                      /* TEXT */
                    ),
                    createElementVNode(
                      "div",
                      _hoisted_1010,
                      toDisplayString(fmtSize(f.size)) + " \xB7 " + toDisplayString(f.percent >= 100 ? "\u5DF2\u5B8C\u6210" : "\u4E0A\u4F20\u4E2D " + f.percent + "%"),
                      1
                      /* TEXT */
                    ),
                    f.percent < 100 ? (openBlock(), createElementBlock("div", _hoisted_1117, [
                      createElementVNode(
                        "span",
                        {
                          class: "wd-upload__progress-bar",
                          style: normalizeStyle({ width: f.percent + "%" })
                        },
                        null,
                        4
                        /* STYLE */
                      )
                    ])) : createCommentVNode("v-if", true)
                  ]),
                  createElementVNode("button", {
                    type: "button",
                    class: "wd-upload__remove",
                    "aria-label": "\u79FB\u9664",
                    onClick: withModifiers(($event) => remove(i), ["stop"])
                  }, [
                    createVNode(_component_wd_icon, {
                      name: "close",
                      size: 13
                    })
                  ], 8, _hoisted_1213)
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : createCommentVNode("v-if", true)
        ]);
      };
    }
  });

  // .demo-build/WdVideoPlayer.ts
  var _hoisted_175 = ["poster", "loop", "muted", "autoplay"];
  var _hoisted_259 = {
    key: 0,
    class: "wd-vplayer__title"
  };
  var _hoisted_353 = {
    key: 1,
    class: "wd-vplayer__live"
  };
  var _hoisted_444 = { class: "wd-vplayer__overlay" };
  var _hoisted_529 = {
    key: 1,
    class: "wd-vplayer__loading",
    "aria-hidden": "true"
  };
  var _hoisted_619 = {
    key: 2,
    class: "wd-vplayer__error"
  };
  var _hoisted_718 = ["aria-valuenow"];
  var _hoisted_816 = { class: "wd-vplayer__row" };
  var _hoisted_913 = ["aria-label"];
  var _hoisted_1011 = ["disabled"];
  var _hoisted_1118 = ["disabled"];
  var _hoisted_1214 = {
    key: 1,
    class: "wd-vplayer__time"
  };
  var _hoisted_1312 = { class: "wd-vplayer__time" };
  var _hoisted_1411 = { class: "wd-vplayer__vol" };
  var _hoisted_1511 = ["aria-label"];
  var _hoisted_1611 = {
    key: 3,
    class: "wd-vplayer__panel-wrap"
  };
  var _hoisted_176 = ["aria-expanded"];
  var _hoisted_184 = ["onClick"];
  var _hoisted_194 = {
    key: 4,
    class: "wd-vplayer__panel-wrap"
  };
  var _hoisted_204 = ["aria-expanded"];
  var _hoisted_2112 = { class: "wd-vplayer__eps-head" };
  var _hoisted_2211 = { class: "wd-vplayer__eps-grid" };
  var _hoisted_2311 = ["disabled", "onClick"];
  var _hoisted_2410 = {
    key: 0,
    class: "wd-vplayer__ep-tag"
  };
  var WdVideoPlayer_default = /* @__PURE__ */ defineComponent({
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
    emits: ["play", "pause", "ended", "timeupdate", "error", "change-episode", "rate-change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const video = ref(null);
      const wrap = ref(null);
      const playing = ref(false);
      const current = ref(0);
      const duration = ref(0);
      const buffered = ref(0);
      const volume = ref(1);
      const muted = ref(props.muted);
      const rate = ref(1);
      const ready = ref(false);
      const errMsg = ref("");
      const isFullscreen = ref(false);
      const isLive = computed(() => props.mode === "live");
      let hls = null;
      const HLS = globalThis.Hls;
      const isM3u8 = computed(() => /\.m3u8(\?|$)/i.test(props.src));
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
      const hovering = ref(false);
      const panelOpen = ref("");
      const barVisible = computed(
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
      const showCursor = computed(() => !isFullscreen.value || barVisible.value);
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
      const progress = computed(() => {
        if (isLive.value || !isFinite(duration.value) || duration.value <= 0) return 0;
        return current.value / duration.value * 100;
      });
      const bufferedPct = computed(() => duration.value > 0 ? buffered.value / duration.value * 100 : 0);
      const remain = computed(() => Math.max(0, duration.value - current.value));
      const liveClock = ref("");
      let clockTimer;
      function tickClock() {
        const d = /* @__PURE__ */ new Date();
        const p = (n) => String(n).padStart(2, "0");
        liveClock.value = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
      }
      watch(playing, (v) => {
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
      const dragging = ref(false);
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
      const epIndex = computed(
        () => props.episodes.findIndex((e) => e.key === props.currentEpisode)
      );
      const hasPrev = computed(() => props.episodeNav && epIndex.value > 0);
      const hasNext = computed(
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
      watch(() => props.src, async () => {
        ready.value = false;
        current.value = 0;
        duration.value = 0;
        buffered.value = 0;
        await nextTick();
        mountSource();
      });
      onMounted(() => {
        mountSource();
        if (props.autoplay) armLoadTimeout();
        document.addEventListener("fullscreenchange", onFsChange);
      });
      watch(() => props.muted, (m) => {
        if (video.value) video.value.muted = m;
      });
      onBeforeUnmount(() => {
        if (hideTimer) clearTimeout(hideTimer);
        if (clockTimer) clearInterval(clockTimer);
        clearLoadTimeout();
        destroyHls();
        document.removeEventListener("fullscreenchange", onFsChange);
      });
      return (_ctx, _cache) => {
        const _component_wd_icon = resolveComponent("wd-icon");
        return openBlock(), createElementBlock(
          "div",
          {
            ref_key: "wrap",
            ref: wrap,
            class: normalizeClass(["wd-vplayer", { "is-playing": playing.value, "is-fullscreen": isFullscreen.value, "no-cursor": !showCursor.value }]),
            onMousemove: poke,
            onMouseleave: onLeave,
            onTouchstartPassive: poke
          },
          [
            createElementVNode("video", {
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
            }, null, 40, _hoisted_175),
            createCommentVNode(" ===== \u70B9\u51FB\u5C42\uFF1A\u6574\u4E2A\u753B\u9762\u53EF\u6682\u505C\uFF08\u9F20\u6807\u6307\u9488\u4E0D\u663E\u793A\uFF09 ===== "),
            createElementVNode("div", {
              class: "wd-vplayer__hit",
              onClick: togglePlay
            }),
            createCommentVNode(" ===== \u9876\u90E8\u6E10\u53D8\u6761\uFF1A\u6807\u9898 + \u76F4\u64AD\u6807\u8BC6 ===== "),
            createElementVNode(
              "div",
              {
                class: normalizeClass(["wd-vplayer__top", { "is-visible": barVisible.value }])
              },
              [
                __props.title ? (openBlock(), createElementBlock(
                  "span",
                  _hoisted_259,
                  toDisplayString(__props.title),
                  1
                  /* TEXT */
                )) : createCommentVNode("v-if", true),
                isLive.value ? (openBlock(), createElementBlock("span", _hoisted_353, [..._cache[10] || (_cache[10] = [
                  createElementVNode(
                    "i",
                    { class: "wd-vplayer__live-dot" },
                    null,
                    -1
                    /* CACHED */
                  ),
                  createTextVNode(
                    "\u76F4\u64AD ",
                    -1
                    /* CACHED */
                  )
                ])])) : createCommentVNode("v-if", true),
                createCommentVNode(" \u9876\u90E8\u53F3\u4FA7\uFF1A\u6E05\u6670\u5EA6\u5207\u6362\u3001\u5F39\u5E55\u5F00\u5173\u3001\u7247\u6E90\u7B49 "),
                _cache[11] || (_cache[11] = createElementVNode(
                  "span",
                  { class: "wd-vplayer__spacer" },
                  null,
                  -1
                  /* CACHED */
                )),
                renderSlot(_ctx.$slots, "top-right")
              ],
              2
              /* CLASS */
            ),
            createCommentVNode(" ===== \u753B\u9762\u8986\u76D6\u5C42\uFF1A\u5F39\u5E55 / \u81EA\u5B9A\u4E49\u5B57\u5E55 / \u6C34\u5370 ===== "),
            createElementVNode("div", _hoisted_444, [
              renderSlot(_ctx.$slots, "overlay", {
                playing: playing.value,
                current: current.value,
                duration: duration.value
              })
            ]),
            createCommentVNode(" ===== \u4E2D\u592E\u5927\u64AD\u653E\u6309\u94AE\uFF08\u672A\u64AD\u653E\u65F6\uFF09 ===== "),
            !playing.value && !errMsg.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "wd-vplayer__big",
              "aria-label": "\u64AD\u653E",
              onClick: withModifiers(togglePlay, ["stop"])
            }, [
              createVNode(_component_wd_icon, {
                name: "play",
                variant: __props.iconStyle,
                size: 30
              }, null, 8, ["variant"])
            ])) : createCommentVNode("v-if", true),
            createCommentVNode(" \u52A0\u8F7D\u4E2D "),
            !ready.value && !errMsg.value ? (openBlock(), createElementBlock("div", _hoisted_529, [..._cache[12] || (_cache[12] = [
              createElementVNode(
                "span",
                { class: "wd-vplayer__spinner" },
                null,
                -1
                /* CACHED */
              )
            ])])) : createCommentVNode("v-if", true),
            createCommentVNode(" \u9519\u8BEF "),
            errMsg.value ? (openBlock(), createElementBlock("div", _hoisted_619, [
              createVNode(_component_wd_icon, {
                name: "warning-circle",
                variant: __props.iconStyle,
                size: 22
              }, null, 8, ["variant"]),
              createElementVNode(
                "span",
                null,
                toDisplayString(errMsg.value),
                1
                /* TEXT */
              )
            ])) : createCommentVNode("v-if", true),
            createCommentVNode(" ===== \u5E95\u90E8\u957F\u6761\uFF08\u5168\u90E8\u63A7\u4EF6\uFF09 ===== "),
            createElementVNode(
              "div",
              {
                class: normalizeClass(["wd-vplayer__bottom", { "is-visible": barVisible.value }])
              },
              [
                renderSlot(_ctx.$slots, "above-controls"),
                createCommentVNode(" \u8FDB\u5EA6\u6761\uFF08\u70B9\u64AD\uFF09 "),
                !isLive.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "wd-vplayer__scrub",
                  role: "slider",
                  tabindex: "0",
                  "aria-label": "\u64AD\u653E\u8FDB\u5EA6",
                  "aria-valuenow": Math.round(progress.value),
                  "aria-valuemin": "0",
                  "aria-valuemax": "100",
                  onClick: withModifiers(seekAt, ["stop"]),
                  onKeydown: onScrubKey
                }, [
                  _cache[13] || (_cache[13] = createElementVNode(
                    "span",
                    { class: "wd-vplayer__track" },
                    null,
                    -1
                    /* CACHED */
                  )),
                  createElementVNode(
                    "span",
                    {
                      class: "wd-vplayer__buffer",
                      style: normalizeStyle({ width: bufferedPct.value + "%" })
                    },
                    null,
                    4
                    /* STYLE */
                  ),
                  createElementVNode(
                    "span",
                    {
                      class: "wd-vplayer__played",
                      style: normalizeStyle({ width: progress.value + "%" })
                    },
                    null,
                    4
                    /* STYLE */
                  ),
                  createElementVNode(
                    "span",
                    {
                      class: "wd-vplayer__knob",
                      style: normalizeStyle({ left: progress.value + "%" })
                    },
                    null,
                    4
                    /* STYLE */
                  )
                ], 40, _hoisted_718)) : (openBlock(), createElementBlock(
                  Fragment,
                  { key: 1 },
                  [
                    createCommentVNode(" \u76F4\u64AD\uFF1A\u4E0D\u505A\u8FDB\u5EA6\u6761\uFF0C\u53EA\u663E\u793A\u4E00\u6761\u300C\u5B9E\u65F6\u300D\u7EC6\u7EBF "),
                    _cache[14] || (_cache[14] = createElementVNode(
                      "div",
                      { class: "wd-vplayer__live-bar" },
                      [
                        createElementVNode("span")
                      ],
                      -1
                      /* CACHED */
                    ))
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )),
                createElementVNode("div", _hoisted_816, [
                  createCommentVNode(" \u63A7\u5236\u6761\u6700\u5DE6\uFF1A\u6781\u5C11\u7528\uFF0C\u7559\u7ED9\u81EA\u5B9A\u4E49\u5165\u53E3 "),
                  renderSlot(_ctx.$slots, "controls-start"),
                  createElementVNode("button", {
                    type: "button",
                    class: "wd-vplayer__btn",
                    "aria-label": playing.value ? "\u6682\u505C" : "\u64AD\u653E",
                    onClick: withModifiers(togglePlay, ["stop"])
                  }, [
                    createVNode(_component_wd_icon, {
                      name: playing.value ? "pause" : "play",
                      variant: __props.iconStyle,
                      size: 18
                    }, null, 8, ["name", "variant"])
                  ], 8, _hoisted_913),
                  createCommentVNode(" \u4E0A\u4E0B\u96C6 "),
                  __props.episodeNav && __props.episodes.length ? (openBlock(), createElementBlock(
                    Fragment,
                    { key: 0 },
                    [
                      createElementVNode("button", {
                        type: "button",
                        class: "wd-vplayer__btn",
                        disabled: !hasPrev.value,
                        "aria-label": "\u4E0A\u4E00\u96C6",
                        onClick: withModifiers(prevEpisode, ["stop"])
                      }, [
                        createVNode(_component_wd_icon, {
                          name: "skip-previous",
                          variant: __props.iconStyle,
                          size: 17
                        }, null, 8, ["variant"])
                      ], 8, _hoisted_1011),
                      createElementVNode("button", {
                        type: "button",
                        class: "wd-vplayer__btn",
                        disabled: !hasNext.value,
                        "aria-label": "\u4E0B\u4E00\u96C6",
                        onClick: withModifiers(nextEpisode, ["stop"])
                      }, [
                        createVNode(_component_wd_icon, {
                          name: "skip-next",
                          variant: __props.iconStyle,
                          size: 17
                        }, null, 8, ["variant"])
                      ], 8, _hoisted_1118)
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : createCommentVNode("v-if", true),
                  !isLive.value ? (openBlock(), createElementBlock(
                    "span",
                    _hoisted_1214,
                    toDisplayString(unref(formatDuration)(current.value)) + " / " + toDisplayString(unref(formatDuration)(duration.value)),
                    1
                    /* TEXT */
                  )) : (openBlock(), createElementBlock(
                    Fragment,
                    { key: 2 },
                    [
                      createCommentVNode(' \u76F4\u64AD\u7684 currentTime \u662F\u76F8\u5BF9\u8D77\u64AD\u7684\u504F\u79FB\uFF0C\u4E0D\u662F\u8282\u76EE\u65F6\u95F4\uFF0C\n             \u663E\u793A "\u5DF2\u76F4\u64AD 00:00" \u4F1A\u8BA9\u7528\u6237\u56F0\u60D1 \u2192 \u6539\u663E\u793A\u5F53\u524D\u65F6\u523B '),
                      createElementVNode(
                        "span",
                        _hoisted_1312,
                        toDisplayString(liveClock.value),
                        1
                        /* TEXT */
                      )
                    ],
                    2112
                    /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                  )),
                  _cache[15] || (_cache[15] = createElementVNode(
                    "span",
                    { class: "wd-vplayer__spacer" },
                    null,
                    -1
                    /* CACHED */
                  )),
                  createCommentVNode(" \u53F3\u4FA7\u6269\u5C55\u4F4D\uFF1A\u5B57\u5E55\u3001\u97F3\u8F68\u3001\u6E05\u6670\u5EA6\u7B49\uFF08\u5728\u539F\u751F\u63A7\u4EF6\u4E4B\u524D\uFF09 "),
                  renderSlot(_ctx.$slots, "controls-end"),
                  createCommentVNode(" \u97F3\u91CF\uFF1Ahover \u5C55\u5F00\u6ED1\u6761\uFF0C\u907F\u514D\u957F\u671F\u5360\u5BBD "),
                  createElementVNode("div", _hoisted_1411, [
                    createElementVNode("button", {
                      type: "button",
                      class: "wd-vplayer__btn",
                      "aria-label": muted.value ? "\u53D6\u6D88\u9759\u97F3" : "\u9759\u97F3",
                      onClick: withModifiers(toggleMute, ["stop"])
                    }, [
                      createVNode(_component_wd_icon, {
                        name: muted.value ? "volume-mute" : "volume-up",
                        variant: __props.iconStyle,
                        size: 17
                      }, null, 8, ["name", "variant"])
                    ], 8, _hoisted_1511),
                    createElementVNode("div", {
                      class: "wd-vplayer__vol-slider",
                      onClick: withModifiers(setVolumeAt, ["stop"])
                    }, [
                      createElementVNode(
                        "span",
                        {
                          class: "wd-vplayer__vol-fill",
                          style: normalizeStyle({ width: (muted.value ? 0 : volume.value * 100) + "%" })
                        },
                        null,
                        4
                        /* STYLE */
                      )
                    ])
                  ]),
                  createCommentVNode(" \u500D\u901F\uFF08\u70B9\u64AD\uFF09 "),
                  !isLive.value ? (openBlock(), createElementBlock("div", _hoisted_1611, [
                    createElementVNode("button", {
                      type: "button",
                      class: "wd-vplayer__btn wd-vplayer__btn--text",
                      "aria-expanded": panelOpen.value === "rate",
                      "aria-label": "\u500D\u901F",
                      onClick: _cache[6] || (_cache[6] = withModifiers(($event) => togglePanel("rate"), ["stop"]))
                    }, toDisplayString(rate.value) + "\xD7", 9, _hoisted_176),
                    panelOpen.value === "rate" ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: "wd-vplayer__panel wd-vplayer__panel--rates",
                      onClick: _cache[7] || (_cache[7] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(__props.rates, (r) => {
                          return openBlock(), createElementBlock("button", {
                            key: r,
                            type: "button",
                            class: normalizeClass({ "is-on": r === rate.value }),
                            onClick: ($event) => setRate(r)
                          }, toDisplayString(r) + "\xD7", 11, _hoisted_184);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])) : createCommentVNode("v-if", true)
                  ])) : createCommentVNode("v-if", true),
                  createCommentVNode(" \u9009\u96C6 "),
                  __props.playlist && __props.episodes.length ? (openBlock(), createElementBlock("div", _hoisted_194, [
                    createElementVNode("button", {
                      type: "button",
                      class: "wd-vplayer__btn",
                      "aria-expanded": panelOpen.value === "playlist",
                      "aria-label": "\u9009\u96C6",
                      onClick: _cache[8] || (_cache[8] = withModifiers(($event) => togglePanel("playlist"), ["stop"]))
                    }, [
                      createVNode(_component_wd_icon, {
                        name: "playlist",
                        variant: __props.iconStyle,
                        size: 17
                      }, null, 8, ["variant"])
                    ], 8, _hoisted_204),
                    panelOpen.value === "playlist" ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: "wd-vplayer__panel wd-vplayer__panel--eps",
                      onClick: _cache[9] || (_cache[9] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createElementVNode(
                        "div",
                        _hoisted_2112,
                        "\u9009\u96C6 \xB7 \u5171 " + toDisplayString(__props.episodes.length) + " \u96C6",
                        1
                        /* TEXT */
                      ),
                      createElementVNode("div", _hoisted_2211, [
                        (openBlock(true), createElementBlock(
                          Fragment,
                          null,
                          renderList(__props.episodes, (ep, i) => {
                            return openBlock(), createElementBlock("button", {
                              key: ep.key,
                              type: "button",
                              class: normalizeClass(["wd-vplayer__ep", { "is-on": ep.key === __props.currentEpisode, "is-off": ep.disabled }]),
                              disabled: ep.disabled,
                              onClick: ($event) => goEpisode(ep, i)
                            }, [
                              createElementVNode(
                                "span",
                                null,
                                toDisplayString(ep.label),
                                1
                                /* TEXT */
                              ),
                              ep.tag ? (openBlock(), createElementBlock(
                                "i",
                                _hoisted_2410,
                                toDisplayString(ep.tag),
                                1
                                /* TEXT */
                              )) : createCommentVNode("v-if", true)
                            ], 10, _hoisted_2311);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ])) : createCommentVNode("v-if", true)
                  ])) : createCommentVNode("v-if", true),
                  __props.pip ? (openBlock(), createElementBlock("button", {
                    key: 5,
                    type: "button",
                    class: "wd-vplayer__btn",
                    "aria-label": "\u753B\u4E2D\u753B",
                    onClick: withModifiers(togglePip, ["stop"])
                  }, [
                    createVNode(_component_wd_icon, {
                      name: "pip",
                      variant: __props.iconStyle,
                      size: 17
                    }, null, 8, ["variant"])
                  ])) : createCommentVNode("v-if", true),
                  createElementVNode("button", {
                    type: "button",
                    class: "wd-vplayer__btn",
                    "aria-label": "\u5168\u5C4F",
                    onClick: withModifiers(toggleFullscreen, ["stop"])
                  }, [
                    createVNode(_component_wd_icon, {
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

  // .demo-build/WdVirtualList.ts
  var _hoisted_177 = {
    key: 1,
    class: "wd-vlist__empty"
  };
  var WdVirtualList_default = /* @__PURE__ */ defineComponent({
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
    emits: ["scroll", "reach-end"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const viewport = ref(null);
      const scrollTop = ref(0);
      const totalHeight = computed(() => props.items.length * props.itemHeight);
      const range = computed(() => {
        const h = props.height;
        const start = Math.floor(scrollTop.value / props.itemHeight);
        const visible = Math.ceil(h / props.itemHeight);
        const from = Math.max(0, start - props.buffer);
        const to = Math.min(props.items.length, start + visible + props.buffer);
        return { from, to };
      });
      const visibleItems = computed(
        () => props.items.slice(range.value.from, range.value.to).map((item, i) => ({
          item,
          index: range.value.from + i
        }))
      );
      const offsetY = computed(() => range.value.from * props.itemHeight);
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
      watch(
        () => props.items.length,
        async () => {
          await nextTick();
          const el = viewport.value;
          if (!el) return;
          const max = Math.max(0, totalHeight.value - props.height);
          if (el.scrollTop > max) el.scrollTop = max;
        }
      );
      onMounted(() => {
        if (viewport.value) scrollTop.value = viewport.value.scrollTop;
      });
      __expose({ scrollToIndex, scrollToTop });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            ref_key: "viewport",
            ref: viewport,
            class: normalizeClass(["wd-vlist", { "wd-vlist--hide-scrollbar": __props.hideScrollbar }]),
            style: normalizeStyle({ height: typeof __props.height === "number" ? __props.height + "px" : __props.height }),
            onScrollPassive: onScroll
          },
          [
            __props.items.length ? (openBlock(), createElementBlock(
              "div",
              {
                key: 0,
                class: "wd-vlist__phantom",
                style: normalizeStyle({ height: totalHeight.value + "px" })
              },
              [
                createElementVNode(
                  "div",
                  {
                    class: "wd-vlist__window",
                    style: normalizeStyle({ transform: `translateY(${offsetY.value}px)` })
                  },
                  [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(visibleItems.value, (entry) => {
                        return openBlock(), createElementBlock(
                          "div",
                          {
                            key: keyOf(entry.item, entry.index),
                            class: "wd-vlist__item",
                            style: normalizeStyle({ height: __props.itemHeight + "px" })
                          },
                          [
                            renderSlot(_ctx.$slots, "default", {
                              item: entry.item,
                              index: entry.index
                            }, () => [
                              createTextVNode(
                                toDisplayString(entry.item),
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
            )) : (openBlock(), createElementBlock(
              "div",
              _hoisted_177,
              toDisplayString(__props.emptyText),
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

  // .demo-build/WdWatermark.ts
  var WdWatermark_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdWatermark" },
    __name: "WdWatermark",
    props: {
      text: { type: [String, Array], required: false, default: "" },
      image: { type: String, required: false, default: "" },
      fontSize: { type: Number, required: false, default: 14 },
      color: { type: String, required: false, default: "rgba(0, 0, 0, 0.08)" },
      gap: { type: Number, required: false, default: 80 },
      rotate: { type: Number, required: false, default: -22 },
      offset: { type: Number, required: false, default: 12 },
      zIndex: { type: Number, required: false, default: 9 }
    },
    setup(__props) {
      const props = __props;
      const root = ref(null);
      const bg = ref("");
      function render() {
        if (typeof document === "undefined") return;
        const el = root.value;
        if (!el) return;
        const w = el.clientWidth;
        const h = el.clientHeight;
        if (w === 0 || h === 0) return;
        const lines = Array.isArray(props.text) ? props.text : props.text ? [props.text] : [];
        if (!props.image && lines.length === 0) {
          bg.value = "";
          return;
        }
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const gap = Math.max(20, props.gap);
        const fs = Math.max(8, props.fontSize);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let cellW;
        let cellH;
        let draw;
        if (props.image) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            const size = gap;
            canvas.width = size * dpr;
            canvas.height = size * dpr;
            canvas.style.width = size + "px";
            canvas.style.height = size + "px";
            ctx.scale(dpr, dpr);
            ctx.globalAlpha = 0.15;
            ctx.drawImage(img, 0, 0, size, size);
            bg.value = canvas.toDataURL("image/png");
          };
          img.src = props.image;
          return;
        }
        ctx.font = `600 ${fs}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
        const maxLineW = Math.max(...lines.map((l) => ctx.measureText(l).width));
        const lineH = fs * 1.5;
        const blockW = maxLineW;
        const blockH = lineH * lines.length;
        const rot = Math.abs(props.rotate) * Math.PI / 180;
        const cos = Math.cos(rot);
        const sin = Math.sin(rot);
        cellW = Math.ceil(blockW * cos + blockH * sin) + gap;
        cellH = Math.ceil(blockW * sin + blockH * cos) + gap;
        canvas.width = cellW * dpr;
        canvas.height = cellH * dpr;
        canvas.style.width = cellW + "px";
        canvas.style.height = cellH + "px";
        ctx.scale(dpr, dpr);
        ctx.translate(cellW / 2, cellH / 2);
        ctx.rotate(props.rotate * Math.PI / 180);
        ctx.fillStyle = props.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `600 ${fs}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
        const startY = -blockH / 2 + lineH / 2;
        lines.forEach((line, i) => {
          ctx.fillText(line, 0, startY + i * lineH);
        });
        bg.value = canvas.toDataURL("image/png");
      }
      let ro = null;
      let timer = 0;
      function scheduleRender() {
        clearTimeout(timer);
        timer = window.setTimeout(render, 60);
      }
      onMounted(() => {
        render();
        if (typeof ResizeObserver !== "undefined" && root.value) {
          ro = new ResizeObserver(() => scheduleRender());
          ro.observe(root.value);
        }
      });
      watch(
        () => [props.text, props.image, props.fontSize, props.color, props.gap, props.rotate],
        () => scheduleRender(),
        { deep: true }
      );
      onBeforeUnmount(() => {
        ro?.disconnect();
        clearTimeout(timer);
      });
      const bgStyle = computed(() => {
        if (!bg.value) return {};
        return {
          backgroundImage: `url(${bg.value})`,
          backgroundRepeat: "repeat",
          backgroundPosition: `${props.offset}px ${props.offset}px`,
          zIndex: String(props.zIndex)
        };
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            ref_key: "root",
            ref: root,
            class: "wd-watermark"
          },
          [
            renderSlot(_ctx.$slots, "default"),
            createCommentVNode("\n      \u6C34\u5370\u5C42\uFF1A\n      \xB7 pointer-events: none \u2014\u2014 \u7EDD\u4E0D\u80FD\u6321\u4F4F\u4E0B\u65B9\u7684\u4EA4\u4E92\n      \xB7 \u6CA1\u6709 include \u5230\u65E0\u969C\u788D\u6811 \u2014\u2014 \u6C34\u5370\u662F\u7EAF\u89C6\u89C9\u4FE1\u606F\uFF0C\u8BFB\u5C4F\u4E0D\u8BE5\u8BFB\n      \xB7 background-image \u5E73\u94FA\uFF0C\u800C\u975E DOM \u8282\u70B9\u94FA\u6EE1\n    "),
            bg.value ? (openBlock(), createElementBlock(
              "div",
              {
                key: 0,
                class: "wd-watermark__layer",
                style: normalizeStyle(bgStyle.value),
                "aria-hidden": "true"
              },
              null,
              4
              /* STYLE */
            )) : createCommentVNode("v-if", true)
          ],
          512
          /* NEED_PATCH */
        );
      };
    }
  });

  // .demo-build/optical.ts
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

  // .demo-build/registry.ts
  var cache = /* @__PURE__ */ new Map();
  var inflight = /* @__PURE__ */ new Map();
  function inlineData() {
    return globalThis.WD_ICONS;
  }
  var loaders = {};
  function registerLoaders(map) {
    loaders = map;
  }
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
      const inline2 = inlineData();
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
        const raw = inline2?.[`${st}/${name}`];
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
  function clearIconCache() {
    cache.clear();
    inflight.clear();
  }
  function cachedIconCount() {
    return cache.size;
  }

  // .demo-build/WdIcon.ts
  var _hoisted_178 = ["innerHTML"];
  var WdIcon_default = /* @__PURE__ */ defineComponent({
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
        return openBlock(), createElementBlock("span", {
          class: normalizeClass(["wd-icon", { "wd-icon--optical": factor.value !== 1 }]),
          style: normalizeStyle({ width: sizePx.value, height: sizePx.value }),
          innerHTML: svg.value
        }, null, 14, _hoisted_178);
      };
    }
  });

  // src/components/toast.ts
  var container = null;
  var MAX_STACK = 4;
  function ensureContainer() {
    if (!container || !document.body.contains(container)) {
      container = document.createElement("div");
      container.className = "wd-toasts";
      document.body.appendChild(container);
    }
    return container;
  }
  function setLive(el, type) {
    const assert = type === "warning" || type === "danger";
    el.setAttribute("role", assert ? "alert" : "status");
    el.setAttribute("aria-live", assert ? "assertive" : "polite");
    el.setAttribute("aria-atomic", "true");
  }
  function show(message, options = {}) {
    if (typeof document === "undefined") return;
    const { type = "info", duration = 2400 } = options;
    const wrap = ensureContainer();
    setLive(wrap, type);
    while (wrap.children.length >= MAX_STACK) {
      wrap.removeChild(wrap.firstChild);
    }
    const el = document.createElement("div");
    el.className = `wd-toast wd-toast--${type} wd-toast--enter`;
    const dot = document.createElement("span");
    dot.className = "wd-dot wd-dot--" + type;
    const text = document.createElement("span");
    text.textContent = message;
    el.appendChild(dot);
    el.appendChild(text);
    wrap.appendChild(el);
    requestAnimationFrame(() => el.classList.remove("wd-toast--enter"));
    let done = false;
    const dismiss = () => {
      if (done) return;
      done = true;
      el.classList.add("wd-toast--leave");
      window.setTimeout(() => el.remove(), 260);
    };
    window.setTimeout(dismiss, duration);
    el.addEventListener("click", dismiss);
  }
  var toast = Object.assign(
    (message, options) => show(message, options),
    {
      info: (message, options) => show(message, { ...options, type: "info" }),
      success: (message, options) => show(message, { ...options, type: "success" }),
      warning: (message, options) => show(message, { ...options, type: "warning" }),
      danger: (message, options) => show(message, { ...options, type: "danger" })
    }
  );
  return __toCommonJS(entry_exports);
})();

;(function(){
  var M = (typeof WD_REAL_MODULE !== 'undefined' ? WD_REAL_MODULE : window.WD_REAL_MODULE) || {};
  window.WD_REAL = { ALL: [] };
  ["WdAffix","WdAiMessage","WdAlert","WdAudioPlayer","WdAvatar","WdAvatarGroup","WdBacktop","WdBadge","WdBreadcrumb","WdButton","WdCalendar","WdCard","WdCarousel","WdCascader","WdCheckbox","WdCollapse","WdColorPicker","WdCommand","WdContainer","WdDatePicker","WdDescriptions","WdDivider","WdDrawer","WdDropdown","WdEmpty","WdExplorer","WdFileList","WdForm","WdFormItem","WdGrid","WdGroup","WdImagePreview","WdInput","WdListItem","WdMarkdown","WdMentions","WdModal","WdNav","WdNotification","WdOtp","WdPagination","WdPopconfirm","WdPopover","WdPostItem","WdProgress","WdQRCode","WdRadioGroup","WdRate","WdResult","WdScrollbar","WdSegmented","WdSelect","WdSkeleton","WdSlider","WdSortableList","WdSpace","WdSpinner","WdSplitter","WdStatistic","WdSteps","WdSwitch","WdTable","WdTabs","WdTag","WdTimeline","WdTooltip","WdTransfer","WdTree","WdUpload","WdVideoPlayer","WdVirtualList","WdWatermark","WdIcon"].forEach(function(n){
    if (M[n]) { window.WD_REAL[n] = M[n]; window.WD_REAL.ALL.push(M[n]); }
  });
  // 命令式 toast
  window.WDtoast = M.toast;
  // 暴露图标注册表 API（预加载 / 缓存），供页面在 mount 前预热
  window.WdIcons = {
    preloadIcons: M.preloadIcons,
    getIcon: M.getIcon,
    getIconSync: M.getIconSync,
    injectIcons: M.injectIcons,
    registerLoaders: M.registerLoaders,
    cachedIconCount: M.cachedIconCount,
    clearIconCache: M.clearIconCache,
  };
})();
