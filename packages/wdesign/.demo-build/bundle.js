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
    WdAiMessage: () => WdAiMessage_default,
    WdAlert: () => WdAlert_default,
    WdAvatar: () => WdAvatar_default,
    WdAvatarGroup: () => WdAvatarGroup_default,
    WdBadge: () => WdBadge_default,
    WdBreadcrumb: () => WdBreadcrumb_default,
    WdButton: () => WdButton_default,
    WdCard: () => WdCard_default,
    WdCarousel: () => WdCarousel_default,
    WdCheckbox: () => WdCheckbox_default,
    WdCollapse: () => WdCollapse_default,
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
    WdIcon: () => WdIcon_default,
    WdImagePreview: () => WdImagePreview_default,
    WdInput: () => WdInput_default,
    WdListItem: () => WdListItem_default,
    WdModal: () => WdModal_default,
    WdNotification: () => WdNotification_default,
    WdOtp: () => WdOtp_default,
    WdPagination: () => WdPagination_default,
    WdPopconfirm: () => WdPopconfirm_default,
    WdPostItem: () => WdPostItem_default,
    WdProgress: () => WdProgress_default,
    WdRadioGroup: () => WdRadioGroup_default,
    WdRate: () => WdRate_default,
    WdResult: () => WdResult_default,
    WdSegmented: () => WdSegmented_default,
    WdSelect: () => WdSelect_default,
    WdSkeleton: () => WdSkeleton_default,
    WdSlider: () => WdSlider_default,
    WdSortableList: () => WdSortableList_default,
    WdSpace: () => WdSpace_default,
    WdSpinner: () => WdSpinner_default,
    WdStatistic: () => WdStatistic_default,
    WdSteps: () => WdSteps_default,
    WdSwitch: () => WdSwitch_default,
    WdTable: () => WdTable_default,
    WdTabs: () => WdTabs_default,
    WdTag: () => WdTag_default,
    WdTimeline: () => WdTimeline_default,
    WdTooltip: () => WdTooltip_default,
    WdTree: () => WdTree_default,
    WdUpload: () => WdUpload_default
  });

  // .demo-build/shim.ts
  var G = globalThis.Vue;
  var named = new Proxy({}, { get: (_t, k) => G[String(k)] });
  var defineComponent = G.defineComponent;
  var toDisplayString = G.toDisplayString;
  var createElementVNode = G.createElementVNode;
  var createCommentVNode = G.createCommentVNode;
  var createTextVNode = G.createTextVNode;
  var openBlock = G.openBlock;
  var createElementBlock = G.createElementBlock;
  var normalizeClass = G.normalizeClass;
  var renderList = G.renderList;
  var Fragment = G.Fragment;
  var onBeforeUnmount = G.onBeforeUnmount;
  var ref = G.ref;
  var watch = G.watch;
  var renderSlot = G.renderSlot;
  var computed = G.computed;
  var createBlock = G.createBlock;
  var normalizeStyle = G.normalizeStyle;
  var withModifiers = G.withModifiers;
  var onMounted = G.onMounted;
  var vModelText = G.vModelText;
  var withDirectives = G.withDirectives;
  var resolveComponent = G.resolveComponent;
  var createVNode = G.createVNode;
  var Teleport = G.Teleport;
  var nextTick = G.nextTick;
  var unref = G.unref;
  var Transition = G.Transition;
  var withCtx = G.withCtx;
  var watchEffect = G.watchEffect;
  var withKeys = G.withKeys;
  var createStaticVNode = G.createStaticVNode;
  var provide = G.provide;
  var reactive = G.reactive;
  var inject = G.inject;
  var vShow = G.vShow;
  var resolveDynamicComponent = G.resolveDynamicComponent;

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
                    _cache[3] || (_cache[3] = createElementVNode(
                      "svg",
                      {
                        class: "wd-ai-msg__reasoning-spark",
                        width: "13",
                        height: "13",
                        viewBox: "0 0 24 24",
                        fill: "currentColor"
                      },
                      [
                        createElementVNode("path", { d: "M12 2.5l1.9 5.2 5.3 1.9-5.3 1.9L12 16.7l-1.9-5.2-5.3-1.9 5.3-1.9z" })
                      ],
                      -1
                      /* CACHED */
                    )),
                    _cache[4] || (_cache[4] = createElementVNode(
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
                      [..._cache[2] || (_cache[2] = [
                        createElementVNode(
                          "svg",
                          {
                            width: "13",
                            height: "13",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2.6",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          },
                          [
                            createElementVNode("path", { d: "m6 9 6 6 6-6" })
                          ],
                          -1
                          /* CACHED */
                        )
                      ])],
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
            }, [..._cache[0] || (_cache[0] = [
              createElementVNode(
                "svg",
                {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.6",
                  "stroke-linecap": "round"
                },
                [
                  createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                ],
                -1
                /* CACHED */
              )
            ])])) : createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true);
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
  var _hoisted_14 = { class: "wd-avatars" };
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
        return openBlock(), createElementBlock("span", _hoisted_14, [
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

  // .demo-build/WdBadge.ts
  var _hoisted_15 = {
    key: 0,
    class: "wd-badge__dot"
  };
  var _hoisted_23 = {
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
            __props.dot ? (openBlock(), createElementBlock("span", _hoisted_15)) : showCount.value ? (openBlock(), createElementBlock(
              "span",
              _hoisted_23,
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
  var _hoisted_16 = {
    class: "wd-breadcrumb",
    "aria-label": "\u9762\u5305\u5C51"
  };
  var _hoisted_24 = {
    key: 0,
    class: "wd-breadcrumb__sep"
  };
  var _hoisted_33 = ["onClick"];
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
        return openBlock(), createElementBlock("nav", _hoisted_16, [
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
                    _hoisted_24,
                    toDisplayString(__props.separator),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true),
                  createElementVNode("button", {
                    type: "button",
                    class: normalizeClass(["wd-breadcrumb__item", { "wd-breadcrumb__item--current": i === props.items.length - 1 }]),
                    onClick: ($event) => pick(item, i)
                  }, toDisplayString(item.label), 11, _hoisted_33)
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
  var _hoisted_17 = ["type", "disabled", "aria-busy"];
  var _hoisted_25 = {
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
          __props.loading ? (openBlock(), createElementBlock("span", _hoisted_25)) : createCommentVNode("v-if", true),
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
        ], 10, _hoisted_17);
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
  var _hoisted_18 = ["src", "alt"];
  var _hoisted_26 = {
    key: 1,
    class: "wd-carousel__label"
  };
  var _hoisted_34 = {
    key: 2,
    class: "wd-carousel__dots"
  };
  var _hoisted_42 = ["aria-label", "onClick"];
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
                          }, null, 8, _hoisted_18)) : (openBlock(), createElementBlock(
                            "span",
                            _hoisted_26,
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
              [..._cache[3] || (_cache[3] = [
                createElementVNode(
                  "svg",
                  {
                    width: "15",
                    height: "15",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.6",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  },
                  [
                    createElementVNode("path", { d: "m15 18-6-6 6-6" })
                  ],
                  -1
                  /* CACHED */
                )
              ])],
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
              [..._cache[4] || (_cache[4] = [
                createElementVNode(
                  "svg",
                  {
                    width: "15",
                    height: "15",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.6",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  },
                  [
                    createElementVNode("path", { d: "m9 6 6 6-6 6" })
                  ],
                  -1
                  /* CACHED */
                )
              ])],
              32
              /* NEED_HYDRATION */
            )) : createCommentVNode("v-if", true),
            __props.showDots && __props.items.length > 1 ? (openBlock(), createElementBlock("div", _hoisted_34, [
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
                  }, null, 42, _hoisted_42);
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

  // .demo-build/WdCheckbox.ts
  var _hoisted_19 = ["aria-checked", "disabled"];
  var _hoisted_27 = {
    key: 0,
    class: "wd-checkbox__label"
  };
  var WdCheckbox_default = /* @__PURE__ */ defineComponent({
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
        return openBlock(), createElementBlock("button", {
          type: "button",
          role: "checkbox",
          class: normalizeClass(["wd-checkbox", { "wd-checkbox--checked": __props.modelValue, "wd-checkbox--disabled": __props.disabled }]),
          "aria-checked": __props.modelValue,
          disabled: __props.disabled,
          onClick: toggle
        }, [
          _cache[0] || (_cache[0] = createElementVNode(
            "span",
            { class: "wd-checkbox__box" },
            [
              createElementVNode("svg", {
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "3.4",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                createElementVNode("path", { d: "m4.5 12.5 5 5 10-11" })
              ])
            ],
            -1
            /* CACHED */
          )),
          __props.label || _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_27, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(
                toDisplayString(__props.label),
                1
                /* TEXT */
              )
            ])
          ])) : createCommentVNode("v-if", true)
        ], 10, _hoisted_19);
      };
    }
  });

  // .demo-build/WdCollapse.ts
  var _hoisted_110 = { class: "wd-collapse" };
  var _hoisted_28 = ["aria-expanded", "onClick"];
  var _hoisted_35 = { class: "wd-collapse__body" };
  var _hoisted_43 = { class: "wd-collapse__inner" };
  var _hoisted_52 = { class: "wd-collapse__content" };
  var WdCollapse_default = /* @__PURE__ */ defineComponent({
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
      const openSet = computed(() => new Set(props.modelValue));
      function toggle(i) {
        const next = new Set(props.modelValue);
        if (next.has(i)) next.delete(i);
        else next.add(i);
        emit("update:modelValue", [...next].sort((a, b) => a - b));
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_110, [
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
                    (openBlock(), createElementBlock(
                      "svg",
                      {
                        class: normalizeClass(["wd-chevron", { "wd-chevron--open": openSet.value.has(i) }]),
                        width: "15",
                        height: "15",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2.4",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      },
                      [..._cache[0] || (_cache[0] = [
                        createElementVNode(
                          "path",
                          { d: "m6 9 6 6 6-6" },
                          null,
                          -1
                          /* CACHED */
                        )
                      ])],
                      2
                      /* CLASS */
                    ))
                  ], 8, _hoisted_28),
                  createElementVNode("div", _hoisted_35, [
                    createElementVNode("div", _hoisted_43, [
                      createElementVNode("div", _hoisted_52, [
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

  // .demo-build/WdCommand.ts
  var _hoisted_111 = {
    key: 0,
    class: "wd-command",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "\u547D\u4EE4\u9762\u677F"
  };
  var _hoisted_29 = { class: "wd-command__input-row" };
  var _hoisted_36 = ["placeholder"];
  var _hoisted_44 = {
    key: 0,
    class: "wd-command__group"
  };
  var _hoisted_53 = ["data-idx", "disabled", "onClick", "onMousemove"];
  var _hoisted_62 = {
    key: 0,
    class: "wd-command__item-icon"
  };
  var _hoisted_72 = { class: "wd-command__item-main" };
  var _hoisted_82 = { class: "wd-command__item-label" };
  var _hoisted_92 = {
    key: 0,
    class: "wd-command__item-hint"
  };
  var _hoisted_102 = {
    key: 1,
    class: "wd-command__item-shortcut"
  };
  var _hoisted_112 = {
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
          __props.modelValue ? (openBlock(), createElementBlock("div", _hoisted_111, [
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
                createElementVNode("div", _hoisted_29, [
                  _cache[1] || (_cache[1] = createElementVNode(
                    "svg",
                    {
                      class: "wd-command__search-icon",
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.2",
                      "stroke-linecap": "round"
                    },
                    [
                      createElementVNode("circle", {
                        cx: "11",
                        cy: "11",
                        r: "7"
                      }),
                      createElementVNode("path", { d: "m20 20-3.2-3.2" })
                    ],
                    -1
                    /* CACHED */
                  )),
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
                  }, null, 40, _hoisted_36), [
                    [vModelText, q.value]
                  ]),
                  _cache[2] || (_cache[2] = createElementVNode(
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
                              _hoisted_44,
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
                                  it.icon || _ctx.$slots.icon ? (openBlock(), createElementBlock("span", _hoisted_62, [
                                    renderSlot(_ctx.$slots, "icon", { item: it }, () => [
                                      createVNode(_component_wd_icon, {
                                        name: it.icon,
                                        size: 16
                                      }, null, 8, ["name"])
                                    ])
                                  ])) : createCommentVNode("v-if", true),
                                  createElementVNode("span", _hoisted_72, [
                                    createElementVNode(
                                      "span",
                                      _hoisted_82,
                                      toDisplayString(it.label),
                                      1
                                      /* TEXT */
                                    ),
                                    it.hint ? (openBlock(), createElementBlock(
                                      "span",
                                      _hoisted_92,
                                      toDisplayString(it.hint),
                                      1
                                      /* TEXT */
                                    )) : createCommentVNode("v-if", true)
                                  ]),
                                  it.shortcut ? (openBlock(), createElementBlock(
                                    "kbd",
                                    _hoisted_102,
                                    toDisplayString(it.shortcut),
                                    1
                                    /* TEXT */
                                  )) : createCommentVNode("v-if", true)
                                ], 42, _hoisted_53);
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
                      _hoisted_112,
                      toDisplayString(__props.emptyText),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true)
                  ],
                  512
                  /* NEED_PATCH */
                ),
                _cache[3] || (_cache[3] = createElementVNode(
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
  var _hoisted_113 = ["disabled"];
  var _hoisted_210 = {
    key: 0,
    class: "wd-datepicker__value"
  };
  var _hoisted_37 = {
    key: 1,
    class: "wd-datepicker__placeholder"
  };
  var _hoisted_45 = {
    key: 0,
    class: "wd-datepicker__panel"
  };
  var _hoisted_54 = { class: "wd-datepicker__head" };
  var _hoisted_63 = { class: "wd-datepicker__month" };
  var _hoisted_73 = { class: "wd-datepicker__week" };
  var _hoisted_83 = { class: "wd-datepicker__grid" };
  var _hoisted_93 = ["onClick"];
  var WdDatePicker_default = /* @__PURE__ */ defineComponent({
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
      const open = ref(false);
      const root = ref();
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
      function onDocClick(e) {
        if (root.value && !root.value.contains(e.target)) open.value = false;
      }
      function onKey(e) {
        if (e.key === "Escape") open.value = false;
      }
      onMounted(() => {
        document.addEventListener("click", onDocClick);
        document.addEventListener("keydown", onKey);
      });
      onBeforeUnmount(() => {
        document.removeEventListener("click", onDocClick);
        document.removeEventListener("keydown", onKey);
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
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
                _hoisted_210,
                toDisplayString(__props.modelValue),
                1
                /* TEXT */
              )) : (openBlock(), createElementBlock(
                "span",
                _hoisted_37,
                toDisplayString(__props.placeholder),
                1
                /* TEXT */
              )),
              _cache[0] || (_cache[0] = createElementVNode(
                "svg",
                {
                  class: "wd-datepicker__icon",
                  width: "15",
                  height: "15",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round"
                },
                [
                  createElementVNode("rect", {
                    x: "3.5",
                    y: "5",
                    width: "17",
                    height: "16",
                    rx: "4"
                  }),
                  createElementVNode("path", { d: "M3.5 10h17M8 3v4M16 3v4" })
                ],
                -1
                /* CACHED */
              ))
            ], 8, _hoisted_113),
            createVNode(Transition, {
              name: "wd-pop",
              duration: unref(POP_DURATION)
            }, {
              default: withCtx(() => [
                open.value ? (openBlock(), createElementBlock("div", _hoisted_45, [
                  createElementVNode("div", _hoisted_54, [
                    createElementVNode(
                      "span",
                      _hoisted_63,
                      toDisplayString(monthLabel.value),
                      1
                      /* TEXT */
                    ),
                    createElementVNode("span", { class: "wd-datepicker__nav" }, [
                      createElementVNode("button", {
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--sm",
                        "aria-label": "\u4E0A\u4E2A\u6708",
                        onClick: prevMonth
                      }, [..._cache[1] || (_cache[1] = [
                        createElementVNode(
                          "svg",
                          {
                            width: "14",
                            height: "14",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2.6",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          },
                          [
                            createElementVNode("path", { d: "m15 18-6-6 6-6" })
                          ],
                          -1
                          /* CACHED */
                        )
                      ])]),
                      createElementVNode("button", {
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--sm",
                        "aria-label": "\u4E0B\u4E2A\u6708",
                        onClick: nextMonth
                      }, [..._cache[2] || (_cache[2] = [
                        createElementVNode(
                          "svg",
                          {
                            width: "14",
                            height: "14",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2.6",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          },
                          [
                            createElementVNode("path", { d: "m9 6 6 6-6 6" })
                          ],
                          -1
                          /* CACHED */
                        )
                      ])])
                    ])
                  ]),
                  createElementVNode("div", _hoisted_73, [
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
                  createElementVNode("div", _hoisted_83, [
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
                        }, toDisplayString(d.label), 11, _hoisted_93);
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
                ])) : createCommentVNode("v-if", true)
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

  // .demo-build/WdDescriptions.ts
  var _hoisted_114 = { class: "wd-descriptions__label" };
  var _hoisted_211 = {
    key: 0,
    class: "wd-descriptions__colon"
  };
  var _hoisted_38 = { class: "wd-descriptions__value" };
  var _hoisted_46 = {
    key: 0,
    class: "wd-descriptions__hint"
  };
  var _hoisted_55 = {
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
                          createElementVNode("div", _hoisted_114, [
                            createTextVNode(
                              toDisplayString(item.label),
                              1
                              /* TEXT */
                            ),
                            __props.colon ? (openBlock(), createElementBlock("span", _hoisted_211, "\uFF1A")) : createCommentVNode("v-if", true)
                          ]),
                          createElementVNode("div", _hoisted_38, [
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
                              _hoisted_46,
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
            !__props.items.length ? (openBlock(), createElementBlock("div", _hoisted_55, [
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
  var _hoisted_115 = {
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
            _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_115, [
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

  // .demo-build/WdDrawer.ts
  var _hoisted_116 = { class: "wd-drawer__panel" };
  var _hoisted_212 = { class: "wd-drawer__head" };
  var _hoisted_39 = { class: "wd-drawer__title" };
  var _hoisted_47 = { class: "wd-drawer__body" };
  var _hoisted_56 = {
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
      const props = __props;
      const emit = __emit;
      const classes = computed(() => ["wd-drawer", props.side === "left" ? "wd-drawer--left" : ""]);
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
        return openBlock(), createBlock(Teleport, { to: "body" }, [
          createVNode(Transition, { name: "wd-drawer-fade" }, {
            default: withCtx(() => [
              __props.modelValue ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(classes.value),
                  role: "dialog",
                  "aria-modal": "true"
                },
                [
                  createElementVNode("div", {
                    class: "wd-drawer__mask",
                    onClick: _cache[0] || (_cache[0] = ($event) => __props.closeOnMask && close())
                  }),
                  createElementVNode("div", _hoisted_116, [
                    createElementVNode("div", _hoisted_212, [
                      createElementVNode(
                        "div",
                        _hoisted_39,
                        toDisplayString(__props.title),
                        1
                        /* TEXT */
                      ),
                      createElementVNode("button", {
                        type: "button",
                        class: "wd-icon-btn",
                        "aria-label": "\u5173\u95ED",
                        onClick: close
                      }, [..._cache[1] || (_cache[1] = [
                        createElementVNode(
                          "svg",
                          {
                            width: "15",
                            height: "15",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2.6",
                            "stroke-linecap": "round"
                          },
                          [
                            createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                          ],
                          -1
                          /* CACHED */
                        )
                      ])])
                    ]),
                    createElementVNode("div", _hoisted_47, [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_56, [
                      renderSlot(_ctx.$slots, "footer")
                    ])) : createCommentVNode("v-if", true)
                  ])
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          })
        ]);
      };
    }
  });

  // .demo-build/WdDropdown.ts
  var _hoisted_117 = ["aria-expanded"];
  var _hoisted_213 = {
    key: 0,
    class: "wd-dropdown__menu",
    role: "menu"
  };
  var _hoisted_310 = ["onClick"];
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
      function pick(item) {
        if (item.disabled) return;
        emit("select", item.value);
        open.value = false;
      }
      function onDocClick(e) {
        if (root.value && !root.value.contains(e.target)) open.value = false;
      }
      function onKey(e) {
        if (e.key === "Escape") open.value = false;
      }
      onMounted(() => {
        document.addEventListener("click", onDocClick);
        document.addEventListener("keydown", onKey);
      });
      onBeforeUnmount(() => {
        document.removeEventListener("click", onDocClick);
        document.removeEventListener("keydown", onKey);
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "span",
          {
            ref_key: "root",
            ref: root,
            class: "wd-dropdown"
          },
          [
            createElementVNode("span", {
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
            ], 40, _hoisted_117),
            createVNode(Transition, {
              name: "wd-pop",
              duration: unref(POP_DURATION)
            }, {
              default: withCtx(() => [
                open.value ? (openBlock(), createElementBlock("div", _hoisted_213, [
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
                      }, toDisplayString(it.label), 11, _hoisted_310);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])) : createCommentVNode("v-if", true)
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

  // .demo-build/WdEmpty.ts
  var _hoisted_118 = { class: "wd-empty" };
  var _hoisted_214 = { class: "wd-empty__icon" };
  var _hoisted_311 = {
    key: 0,
    class: "wd-empty__title"
  };
  var _hoisted_48 = {
    key: 1,
    class: "wd-empty__desc"
  };
  var _hoisted_57 = {
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
        return openBlock(), createElementBlock("div", _hoisted_118, [
          createElementVNode("div", _hoisted_214, [
            renderSlot(_ctx.$slots, "icon", {}, () => [
              _cache[0] || (_cache[0] = createElementVNode(
                "svg",
                {
                  width: "30",
                  height: "30",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.7",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                },
                [
                  createElementVNode("path", { d: "M22 12h-6l-2 3h-4l-2-3H2" }),
                  createElementVNode("path", { d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" })
                ],
                -1
                /* CACHED */
              ))
            ])
          ]),
          __props.title ? (openBlock(), createElementBlock(
            "div",
            _hoisted_311,
            toDisplayString(__props.title),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true),
          __props.description || _ctx.$slots.description ? (openBlock(), createElementBlock("div", _hoisted_48, [
            renderSlot(_ctx.$slots, "description", {}, () => [
              createTextVNode(
                toDisplayString(__props.description),
                1
                /* TEXT */
              )
            ])
          ])) : createCommentVNode("v-if", true),
          _ctx.$slots.action ? (openBlock(), createElementBlock("div", _hoisted_57, [
            renderSlot(_ctx.$slots, "action")
          ])) : createCommentVNode("v-if", true)
        ]);
      };
    }
  });

  // .demo-build/WdExplorer.ts
  var _hoisted_119 = { class: "wd-explorer" };
  var _hoisted_215 = { class: "wd-explorer__side" };
  var _hoisted_312 = ["onClick"];
  var _hoisted_49 = { class: "wd-explorer__folder-name" };
  var _hoisted_58 = { class: "wd-explorer__count" };
  var _hoisted_64 = { class: "wd-explorer__main" };
  var _hoisted_74 = { class: "wd-explorer__bar" };
  var _hoisted_84 = { class: "wd-explorer__path" };
  var _hoisted_94 = { class: "wd-explorer__crumb wd-explorer__crumb--cur" };
  var _hoisted_103 = { class: "wd-explorer__views" };
  var _hoisted_1110 = {
    key: 0,
    class: "wd-explorer__table"
  };
  var _hoisted_122 = ["onClick"];
  var _hoisted_132 = { class: "wd-explorer__name" };
  var _hoisted_142 = { class: "wd-explorer__file-name" };
  var _hoisted_152 = { class: "is-num" };
  var _hoisted_162 = { class: "is-num" };
  var _hoisted_172 = {
    key: 1,
    class: "wd-explorer__grid"
  };
  var _hoisted_182 = ["onClick"];
  var _hoisted_192 = { class: "wd-explorer__tile-name" };
  var _hoisted_20 = { class: "wd-explorer__tile-size" };
  var _hoisted_21 = {
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
        return openBlock(), createElementBlock("div", _hoisted_119, [
          createElementVNode("div", _hoisted_215, [
            _cache[4] || (_cache[4] = createElementVNode(
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
                  _cache[3] || (_cache[3] = createElementVNode(
                    "svg",
                    {
                      width: "15",
                      height: "15",
                      viewBox: "0 0 24 24",
                      fill: "currentColor"
                    },
                    [
                      createElementVNode("path", { d: "M4 8a3 3 0 0 1 3-3h2.6c.5 0 1 .2 1.4.6l1 1c.4.4.9.6 1.4.6H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" })
                    ],
                    -1
                    /* CACHED */
                  )),
                  createElementVNode(
                    "span",
                    _hoisted_49,
                    toDisplayString(f.name),
                    1
                    /* TEXT */
                  ),
                  createElementVNode(
                    "span",
                    _hoisted_58,
                    toDisplayString(f.files.length),
                    1
                    /* TEXT */
                  )
                ], 10, _hoisted_312);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          createElementVNode("div", _hoisted_64, [
            createElementVNode("div", _hoisted_74, [
              createElementVNode("div", _hoisted_84, [
                createElementVNode("span", {
                  class: "wd-explorer__crumb",
                  onClick: _cache[0] || (_cache[0] = ($event) => active.value = 0)
                }, "\u5168\u90E8\u6587\u4EF6"),
                _cache[5] || (_cache[5] = createElementVNode(
                  "span",
                  { class: "wd-explorer__sep" },
                  "/",
                  -1
                  /* CACHED */
                )),
                createElementVNode(
                  "span",
                  _hoisted_94,
                  toDisplayString(current.value.name),
                  1
                  /* TEXT */
                )
              ]),
              createElementVNode("div", _hoisted_103, [
                createElementVNode(
                  "button",
                  {
                    type: "button",
                    class: normalizeClass(["wd-explorer__view-btn", { "wd-explorer__view-btn--active": mode.value === "details" }]),
                    title: "\u8BE6\u60C5",
                    onClick: _cache[1] || (_cache[1] = ($event) => mode.value = "details")
                  },
                  [..._cache[6] || (_cache[6] = [
                    createElementVNode(
                      "svg",
                      {
                        width: "15",
                        height: "15",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2.2",
                        "stroke-linecap": "round"
                      },
                      [
                        createElementVNode("path", { d: "M4 6h16M4 12h16M4 18h16" })
                      ],
                      -1
                      /* CACHED */
                    )
                  ])],
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
                  [..._cache[7] || (_cache[7] = [
                    createStaticVNode('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="4" y="4" width="6.5" height="6.5" rx="2"></rect><rect x="13.5" y="4" width="6.5" height="6.5" rx="2"></rect><rect x="4" y="13.5" width="6.5" height="6.5" rx="2"></rect><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2"></rect></svg>', 1)
                  ])],
                  2
                  /* CLASS */
                )
              ])
            ]),
            mode.value === "details" ? (openBlock(), createElementBlock("table", _hoisted_1110, [
              _cache[9] || (_cache[9] = createElementVNode(
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
              _cache[10] || (_cache[10] = createElementVNode(
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
                        createElementVNode("span", _hoisted_132, [
                          _cache[8] || (_cache[8] = createElementVNode(
                            "span",
                            { class: "wd-explorer__file-chip" },
                            [
                              createElementVNode("svg", {
                                width: "15",
                                height: "15",
                                viewBox: "0 0 24 24",
                                fill: "currentColor"
                              }, [
                                createElementVNode("path", { d: "M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" })
                              ])
                            ],
                            -1
                            /* CACHED */
                          )),
                          createElementVNode(
                            "span",
                            _hoisted_142,
                            toDisplayString(f.name),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      createElementVNode(
                        "td",
                        _hoisted_152,
                        toDisplayString(fmtSize(f.size)),
                        1
                        /* TEXT */
                      ),
                      createElementVNode(
                        "td",
                        _hoisted_162,
                        toDisplayString(f.modified || "\u2014"),
                        1
                        /* TEXT */
                      )
                    ], 8, _hoisted_122);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ])) : (openBlock(), createElementBlock("div", _hoisted_172, [
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
                    _cache[11] || (_cache[11] = createElementVNode(
                      "span",
                      { class: "wd-explorer__tile-icon" },
                      [
                        createElementVNode("svg", {
                          width: "22",
                          height: "22",
                          viewBox: "0 0 24 24",
                          fill: "currentColor"
                        }, [
                          createElementVNode("path", { d: "M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" })
                        ])
                      ],
                      -1
                      /* CACHED */
                    )),
                    createElementVNode(
                      "span",
                      _hoisted_192,
                      toDisplayString(f.name),
                      1
                      /* TEXT */
                    ),
                    createElementVNode(
                      "span",
                      _hoisted_20,
                      toDisplayString(fmtSize(f.size)),
                      1
                      /* TEXT */
                    )
                  ], 8, _hoisted_182);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])),
            !current.value.files.length ? (openBlock(), createElementBlock("div", _hoisted_21, "\u6B64\u6587\u4EF6\u5939\u4E3A\u7A7A")) : createCommentVNode("v-if", true)
          ])
        ]);
      };
    }
  });

  // .demo-build/WdFileList.ts
  var _hoisted_120 = { class: "wd-file-list" };
  var _hoisted_216 = ["onClick"];
  var _hoisted_313 = {
    key: 0,
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2.6",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  var _hoisted_410 = { class: "wd-file-list__icon" };
  var _hoisted_59 = {
    key: 0,
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  };
  var _hoisted_65 = {
    key: 1,
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  };
  var _hoisted_75 = { class: "wd-file-list__name" };
  var _hoisted_85 = { class: "wd-file-list__size" };
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
        return openBlock(), createElementBlock("div", _hoisted_120, [
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
                    row.node.type === "folder" ? (openBlock(), createElementBlock("svg", _hoisted_313, [..._cache[0] || (_cache[0] = [
                      createElementVNode(
                        "path",
                        { d: "m9 6 6 6-6 6" },
                        null,
                        -1
                        /* CACHED */
                      )
                    ])])) : createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                ),
                createElementVNode("span", _hoisted_410, [
                  row.node.type === "folder" ? (openBlock(), createElementBlock("svg", _hoisted_59, [..._cache[1] || (_cache[1] = [
                    createElementVNode(
                      "path",
                      { d: "M4 8a3 3 0 0 1 3-3h2.6c.5 0 1 .2 1.4.6l1 1c.4.4.9.6 1.4.6H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" },
                      null,
                      -1
                      /* CACHED */
                    )
                  ])])) : (openBlock(), createElementBlock("svg", _hoisted_65, [..._cache[2] || (_cache[2] = [
                    createElementVNode(
                      "path",
                      { d: "M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" },
                      null,
                      -1
                      /* CACHED */
                    )
                  ])]))
                ]),
                createElementVNode(
                  "span",
                  _hoisted_75,
                  toDisplayString(row.node.name),
                  1
                  /* TEXT */
                ),
                createElementVNode(
                  "span",
                  _hoisted_85,
                  toDisplayString(fmtSize(row.node.size)),
                  1
                  /* TEXT */
                )
              ], 14, _hoisted_216);
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
  var _hoisted_121 = ["data-form-prop"];
  var _hoisted_217 = {
    key: 0,
    class: "wd-form-item__req",
    "aria-hidden": "true"
  };
  var _hoisted_314 = {
    key: 0,
    class: "wd-form-item__error",
    role: "alert"
  };
  var _hoisted_411 = {
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
              isRequired.value ? (openBlock(), createElementBlock("span", _hoisted_217, "*")) : createCommentVNode("v-if", true),
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
                _hoisted_314,
                toDisplayString(error.value),
                1
                /* TEXT */
              )) : __props.hint ? (openBlock(), createElementBlock(
                "p",
                _hoisted_411,
                toDisplayString(__props.hint),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true)
            ],
            32
            /* NEED_HYDRATION */
          )
        ], 10, _hoisted_121);
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

  // .demo-build/WdImagePreview.ts
  var _hoisted_123 = ["src", "alt"];
  var _hoisted_218 = {
    key: 0,
    class: "wd-preview"
  };
  var _hoisted_315 = ["src", "alt"];
  var _hoisted_412 = {
    key: 0,
    class: "wd-preview__count"
  };
  var _hoisted_510 = { class: "wd-preview__toolbar" };
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
                }, null, 8, _hoisted_123)) : createCommentVNode("v-if", true)
              ])
            ]),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              createVNode(Transition, { name: "wd-preview-fade" }, {
                default: withCtx(() => [
                  open.value ? (openBlock(), createElementBlock("div", _hoisted_218, [
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
                        }, null, 12, _hoisted_315)
                      ],
                      32
                      /* NEED_HYDRATION */
                    ),
                    images.value.length > 1 ? (openBlock(), createElementBlock(
                      "div",
                      _hoisted_412,
                      toDisplayString(cur.value + 1) + " / " + toDisplayString(images.value.length),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    createElementVNode("div", _hoisted_510, [
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
                      }, [..._cache[8] || (_cache[8] = [
                        createElementVNode(
                          "svg",
                          {
                            width: "13",
                            height: "13",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2.6",
                            "stroke-linecap": "round"
                          },
                          [
                            createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                          ],
                          -1
                          /* CACHED */
                        )
                      ])])
                    ])
                  ])) : createCommentVNode("v-if", true)
                ]),
                _: 1
                /* STABLE */
              })
            ]))
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });

  // .demo-build/WdInput.ts
  var _hoisted_124 = {
    key: 0,
    class: "wd-input__icon"
  };
  var _hoisted_219 = ["type", "value", "placeholder", "disabled", "readonly", "maxlength"];
  var _hoisted_316 = {
    key: 2,
    class: "wd-input__count"
  };
  var WdInput_default = /* @__PURE__ */ defineComponent({
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
      const el = ref(null);
      const hasValue = computed(() => props.modelValue.length > 0);
      const showClear = computed(() => props.clearable && hasValue.value && !props.disabled && !props.readonly);
      const count = computed(() => props.showCount && props.maxlength ? `${props.modelValue.length}/${props.maxlength}` : "");
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
            _ctx.$slots.icon ? (openBlock(), createElementBlock("span", _hoisted_124, [
              renderSlot(_ctx.$slots, "icon")
            ])) : createCommentVNode("v-if", true),
            createElementVNode("input", {
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
            }, null, 40, _hoisted_219),
            showClear.value ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "wd-input__clear",
              "aria-label": "\u6E05\u9664",
              onClick: withModifiers(clear, ["prevent"])
            }, [..._cache[0] || (_cache[0] = [
              createElementVNode(
                "svg",
                {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.6",
                  "stroke-linecap": "round"
                },
                [
                  createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                ],
                -1
                /* CACHED */
              )
            ])])) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "suffix"),
            count.value ? (openBlock(), createElementBlock(
              "span",
              _hoisted_316,
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
  var _hoisted_125 = {
    key: 0,
    class: "wd-list-item__icon"
  };
  var _hoisted_220 = { class: "wd-list-item__title" };
  var _hoisted_317 = {
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
            _ctx.$slots.icon ? (openBlock(), createElementBlock("span", _hoisted_125, [
              renderSlot(_ctx.$slots, "icon")
            ])) : createCommentVNode("v-if", true),
            createElementVNode(
              "span",
              _hoisted_220,
              toDisplayString(__props.title),
              1
              /* TEXT */
            ),
            __props.meta ? (openBlock(), createElementBlock(
              "span",
              _hoisted_317,
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

  // .demo-build/WdModal.ts
  var _hoisted_126 = ["aria-label"];
  var _hoisted_221 = { class: "wd-modal__head" };
  var _hoisted_318 = { class: "wd-modal__title" };
  var _hoisted_413 = { class: "wd-modal__body" };
  var _hoisted_511 = {
    key: 0,
    class: "wd-modal__foot"
  };
  var FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
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
      const props = __props;
      const emit = __emit;
      const panel = ref(null);
      let lastActive = null;
      const maxWidth = computed(
        () => typeof props.width === "number" ? `${props.width}px` : props.width
      );
      function close() {
        emit("update:modelValue", false);
      }
      function onKeydown(e) {
        if (e.key === "Escape") {
          close();
          return;
        }
        if (e.key !== "Tab" || !panel.value) return;
        const nodes = Array.from(panel.value.querySelectorAll(FOCUSABLE));
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !panel.value.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
      watchEffect((onCleanup) => {
        if (!props.modelValue) return;
        lastActive = document.activeElement;
        document.addEventListener("keydown", onKeydown);
        requestAnimationFrame(() => {
          const el = panel.value;
          if (!el) return;
          const first = el.querySelector(FOCUSABLE);
          (first ?? el).focus();
        });
        onCleanup(() => {
          document.removeEventListener("keydown", onKeydown);
          lastActive?.focus?.();
          lastActive = null;
        });
      });
      return (_ctx, _cache) => {
        return openBlock(), createBlock(Teleport, { to: "body" }, [
          createVNode(Transition, { name: "wd-modal-fade" }, {
            default: withCtx(() => [
              __props.modelValue ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "wd-modal",
                role: "dialog",
                "aria-modal": "true",
                "aria-label": __props.title || void 0
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
                    createElementVNode("div", _hoisted_221, [
                      createElementVNode(
                        "div",
                        _hoisted_318,
                        toDisplayString(__props.title),
                        1
                        /* TEXT */
                      ),
                      createElementVNode("button", {
                        type: "button",
                        class: "wd-icon-btn",
                        "aria-label": "\u5173\u95ED",
                        onClick: close
                      }, [..._cache[1] || (_cache[1] = [
                        createElementVNode(
                          "svg",
                          {
                            width: "15",
                            height: "15",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2.6",
                            "stroke-linecap": "round"
                          },
                          [
                            createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                          ],
                          -1
                          /* CACHED */
                        )
                      ])])
                    ]),
                    createElementVNode("div", _hoisted_413, [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_511, [
                      renderSlot(_ctx.$slots, "footer")
                    ])) : createCommentVNode("v-if", true)
                  ],
                  4
                  /* STYLE */
                )
              ], 8, _hoisted_126)) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          })
        ]);
      };
    }
  });

  // .demo-build/WdNotification.ts
  var _hoisted_127 = { class: "wd-notification__body" };
  var _hoisted_222 = {
    key: 0,
    class: "wd-notification__title"
  };
  var _hoisted_319 = {
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
        return openBlock(), createBlock(Teleport, { to: "body" }, [
          createVNode(Transition, { name: "wd-notification-fade" }, {
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
                  createElementVNode("div", _hoisted_127, [
                    __props.title ? (openBlock(), createElementBlock(
                      "div",
                      _hoisted_222,
                      toDisplayString(__props.title),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    __props.description || _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_319, [
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
                  }, [..._cache[0] || (_cache[0] = [
                    createElementVNode(
                      "svg",
                      {
                        width: "13",
                        height: "13",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2.6",
                        "stroke-linecap": "round"
                      },
                      [
                        createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                      ],
                      -1
                      /* CACHED */
                    )
                  ])])
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          })
        ]);
      };
    }
  });

  // .demo-build/WdOtp.ts
  var _hoisted_128 = ["value", "disabled", "onInput", "onKeydown"];
  var WdOtp_default = /* @__PURE__ */ defineComponent({
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
      const boxes = ref([]);
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
                }, null, 40, _hoisted_128);
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
  var _hoisted_129 = {
    key: 0,
    class: "wd-pagination__total"
  };
  var _hoisted_223 = ["disabled"];
  var _hoisted_320 = { class: "wd-pagination__simple-text" };
  var _hoisted_414 = ["disabled"];
  var _hoisted_512 = ["disabled"];
  var _hoisted_66 = {
    key: 0,
    class: "wd-pagination__dots"
  };
  var _hoisted_76 = ["aria-current", "onClick"];
  var _hoisted_86 = ["disabled"];
  var _hoisted_95 = {
    key: 3,
    class: "wd-pagination__size"
  };
  var _hoisted_104 = ["value"];
  var _hoisted_1111 = ["value"];
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
        return openBlock(), createElementBlock(
          "nav",
          {
            class: normalizeClass(["wd-pagination", { "wd-pagination--anim-ready": animReady.value, "wd-pagination--simple": __props.simple }]),
            "aria-label": "\u5206\u9875"
          },
          [
            __props.showTotal ? (openBlock(), createElementBlock(
              "span",
              _hoisted_129,
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
                }, [..._cache[4] || (_cache[4] = [
                  createElementVNode(
                    "svg",
                    {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.6",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    },
                    [
                      createElementVNode("path", { d: "m15 18-6-6 6-6" })
                    ],
                    -1
                    /* CACHED */
                  )
                ])], 8, _hoisted_223),
                createElementVNode(
                  "span",
                  _hoisted_320,
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
                }, [..._cache[5] || (_cache[5] = [
                  createElementVNode(
                    "svg",
                    {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.6",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    },
                    [
                      createElementVNode("path", { d: "m9 6 6 6-6 6" })
                    ],
                    -1
                    /* CACHED */
                  )
                ])], 8, _hoisted_414)
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
                }, [..._cache[6] || (_cache[6] = [
                  createElementVNode(
                    "svg",
                    {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.6",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    },
                    [
                      createElementVNode("path", { d: "m15 18-6-6 6-6" })
                    ],
                    -1
                    /* CACHED */
                  )
                ])], 8, _hoisted_512),
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(range.value, (p, i) => {
                    return openBlock(), createElementBlock(
                      Fragment,
                      { key: i },
                      [
                        p === "..." ? (openBlock(), createElementBlock("span", _hoisted_66, "\u2026")) : (openBlock(), createElementBlock("button", {
                          key: 1,
                          type: "button",
                          class: normalizeClass(["wd-pagination__btn", { "wd-pagination__btn--active": p === __props.modelValue }]),
                          "data-wd-hover": "",
                          "aria-current": p === __props.modelValue ? "page" : void 0,
                          onClick: ($event) => go(p)
                        }, toDisplayString(p), 11, _hoisted_76))
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
                }, [..._cache[7] || (_cache[7] = [
                  createElementVNode(
                    "svg",
                    {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.6",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    },
                    [
                      createElementVNode("path", { d: "m9 6 6 6-6 6" })
                    ],
                    -1
                    /* CACHED */
                  )
                ])], 8, _hoisted_86)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            __props.showSizeChanger ? (openBlock(), createElementBlock("label", _hoisted_95, [
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
                    }, toDisplayString(s) + " \u6761/\u9875", 9, _hoisted_1111);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], 40, _hoisted_104)
            ])) : createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdPopconfirm.ts
  var _hoisted_130 = ["aria-label", "aria-hidden"];
  var _hoisted_224 = { class: "wd-popconfirm__title" };
  var _hoisted_321 = {
    key: 0,
    class: "wd-popconfirm__icon",
    "aria-hidden": "true"
  };
  var _hoisted_415 = {
    key: 0,
    class: "wd-popconfirm__desc"
  };
  var _hoisted_513 = { class: "wd-popconfirm__actions" };
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
      function onDocDown(e) {
        if (!open.value) return;
        const target = e.target;
        if (bubble.value?.contains(target) || trigger.value?.contains(target)) return;
        hide();
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
      document.addEventListener("mousedown", onDocDown);
      document.addEventListener("keydown", onKey);
      onBeforeUnmount(() => {
        document.removeEventListener("mousedown", onDocDown);
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
                onClick: _cache[0] || (_cache[0] = ($event) => open.value ? hide() : show())
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
                createElementVNode("div", _hoisted_224, [
                  __props.variant === "danger" ? (openBlock(), createElementBlock("span", _hoisted_321, [..._cache[2] || (_cache[2] = [
                    createElementVNode(
                      "svg",
                      {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2.4",
                        "stroke-linecap": "round"
                      },
                      [
                        createElementVNode("path", { d: "M12 8v5" }),
                        createElementVNode("circle", {
                          cx: "12",
                          cy: "17",
                          r: ".6",
                          fill: "currentColor"
                        }),
                        createElementVNode("circle", {
                          cx: "12",
                          cy: "12",
                          r: "9"
                        })
                      ],
                      -1
                      /* CACHED */
                    )
                  ])])) : createCommentVNode("v-if", true),
                  createTextVNode(
                    " " + toDisplayString(__props.title),
                    1
                    /* TEXT */
                  )
                ]),
                __props.description ? (openBlock(), createElementBlock(
                  "p",
                  _hoisted_415,
                  toDisplayString(__props.description),
                  1
                  /* TEXT */
                )) : createCommentVNode("v-if", true),
                createElementVNode("div", _hoisted_513, [
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
              ], 14, _hoisted_130), [
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

  // .demo-build/WdPostItem.ts
  var _hoisted_131 = { class: "wd-post-item__title" };
  var _hoisted_225 = {
    key: 0,
    class: "wd-post-item__emoji"
  };
  var _hoisted_322 = {
    key: 0,
    class: "wd-post-item__summary"
  };
  var _hoisted_416 = {
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
            createElementVNode("h3", _hoisted_131, [
              __props.emoji ? (openBlock(), createElementBlock(
                "span",
                _hoisted_225,
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
              _hoisted_322,
              toDisplayString(__props.summary),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            __props.tags.length ? (openBlock(), createElementBlock("div", _hoisted_416, [
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
  var _hoisted_133 = ["aria-valuenow"];
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
        ], 10, _hoisted_133);
      };
    }
  });

  // .demo-build/WdRadioGroup.ts
  var _hoisted_134 = {
    class: "wd-radio-group",
    role: "radiogroup"
  };
  var _hoisted_226 = ["aria-checked", "disabled", "onClick"];
  var _hoisted_323 = { class: "wd-radio__label" };
  var WdRadioGroup_default = /* @__PURE__ */ defineComponent({
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
      const items = computed(
        () => props.options.map((o) => typeof o === "string" ? { label: o, value: o } : o)
      );
      function pick(value) {
        if (!props.disabled) emit("update:modelValue", value);
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_134, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(items.value, (o) => {
              return openBlock(), createElementBlock("button", {
                key: o.value,
                type: "button",
                role: "radio",
                class: normalizeClass(["wd-radio", { "wd-radio--checked": __props.modelValue === o.value, "wd-radio--disabled": __props.disabled }]),
                "aria-checked": __props.modelValue === o.value,
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
                  _hoisted_323,
                  toDisplayString(o.label),
                  1
                  /* TEXT */
                )
              ], 10, _hoisted_226);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  });

  // .demo-build/WdRate.ts
  var _hoisted_135 = ["aria-label", "aria-disabled"];
  var _hoisted_227 = ["aria-checked", "aria-label", "tabindex", "disabled", "onPointerenter", "onClick"];
  var WdRate_default = /* @__PURE__ */ defineComponent({
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
        const next = props.modelValue === i + 1 ? props.clearable ? 0 : i + 1 : i + 1;
        emit("update:modelValue", next);
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
        return openBlock(), createElementBlock("div", {
          ref_key: "root",
          ref: root,
          class: normalizeClass(["wd-rate", { "wd-rate--disabled": __props.disabled }]),
          role: "radiogroup",
          "aria-label": `\u8BC4\u5206\uFF0C\u5171 ${__props.count} \u661F\uFF0C\u5F53\u524D ${__props.modelValue} \u661F`,
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
                "aria-checked": i === __props.modelValue,
                "aria-label": `${i} \u661F`,
                tabindex: __props.disabled ? -1 : i === (__props.modelValue || (hover.value >= 0 ? hover.value + 1 : 1)) ? 0 : -1,
                disabled: __props.disabled,
                onPointerenter: ($event) => onEnter(i - 1, $event),
                onPointerleave: _cache[0] || (_cache[0] = ($event) => onLeave($event)),
                onClick: ($event) => pick(i - 1)
              }, [..._cache[2] || (_cache[2] = [
                createElementVNode(
                  "svg",
                  {
                    width: "22",
                    height: "22",
                    viewBox: "0 0 24 24",
                    fill: "currentColor"
                  },
                  [
                    createElementVNode("path", { d: "M12 2.8l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 16.9l-5.6 2.9 1.2-6.2L3 9.3l6.3-.8z" })
                  ],
                  -1
                  /* CACHED */
                )
              ])], 42, _hoisted_227);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ], 42, _hoisted_135);
      };
    }
  });

  // .demo-build/WdResult.ts
  var _hoisted_136 = { class: "wd-result__icon" };
  var _hoisted_228 = {
    key: 0,
    width: "30",
    height: "30",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2.6",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  var _hoisted_324 = {
    key: 1,
    width: "30",
    height: "30",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2.4",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  var _hoisted_417 = {
    key: 2,
    width: "30",
    height: "30",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2.6",
    "stroke-linecap": "round"
  };
  var _hoisted_514 = {
    key: 3,
    width: "30",
    height: "30",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2.4",
    "stroke-linecap": "round"
  };
  var _hoisted_67 = {
    key: 0,
    class: "wd-result__title"
  };
  var _hoisted_77 = {
    key: 1,
    class: "wd-result__desc"
  };
  var _hoisted_87 = {
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
        return openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(["wd-result", `wd-result--${__props.status}`])
          },
          [
            createElementVNode("div", _hoisted_136, [
              renderSlot(_ctx.$slots, "icon", {}, () => [
                __props.status === "success" ? (openBlock(), createElementBlock("svg", _hoisted_228, [..._cache[0] || (_cache[0] = [
                  createElementVNode(
                    "path",
                    { d: "m4.5 12.5 5 5 10-11" },
                    null,
                    -1
                    /* CACHED */
                  )
                ])])) : __props.status === "warning" ? (openBlock(), createElementBlock("svg", _hoisted_324, [..._cache[1] || (_cache[1] = [
                  createElementVNode(
                    "path",
                    { d: "M12 8v5M12 16.5h.01M10.3 4.2 3.6 16.1A2 2 0 0 0 5.3 19h13.4a2 2 0 0 0 1.7-2.9L13.7 4.2a2 2 0 0 0-3.4 0z" },
                    null,
                    -1
                    /* CACHED */
                  )
                ])])) : __props.status === "error" ? (openBlock(), createElementBlock("svg", _hoisted_417, [..._cache[2] || (_cache[2] = [
                  createElementVNode(
                    "path",
                    { d: "M6 6l12 12M18 6 6 18" },
                    null,
                    -1
                    /* CACHED */
                  )
                ])])) : (openBlock(), createElementBlock("svg", _hoisted_514, [..._cache[3] || (_cache[3] = [
                  createElementVNode(
                    "path",
                    { d: "M12 11v6M12 7.5h.01" },
                    null,
                    -1
                    /* CACHED */
                  ),
                  createElementVNode(
                    "circle",
                    {
                      cx: "12",
                      cy: "12",
                      r: "9"
                    },
                    null,
                    -1
                    /* CACHED */
                  )
                ])]))
              ])
            ]),
            __props.title ? (openBlock(), createElementBlock(
              "div",
              _hoisted_67,
              toDisplayString(__props.title),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            __props.description || _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_77, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(
                  toDisplayString(__props.description),
                  1
                  /* TEXT */
                )
              ])
            ])) : createCommentVNode("v-if", true),
            _ctx.$slots.extra ? (openBlock(), createElementBlock("div", _hoisted_87, [
              renderSlot(_ctx.$slots, "extra")
            ])) : createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdSegmented.ts
  var _hoisted_137 = ["aria-hidden"];
  var _hoisted_229 = ["aria-selected", "tabindex", "onClick"];
  var _hoisted_325 = {
    key: 0,
    class: "wd-segmented-picker"
  };
  var _hoisted_418 = ["aria-expanded"];
  var _hoisted_515 = { class: "wd-segmented-picker__label" };
  var _hoisted_68 = { class: "wd-segmented-picker__meta" };
  var _hoisted_78 = {
    key: 0,
    class: "wd-segmented-picker__panel",
    role: "listbox"
  };
  var _hoisted_88 = ["aria-selected", "onClick"];
  var _hoisted_96 = {
    key: 0,
    viewBox: "0 0 24 24",
    width: "15",
    height: "15",
    fill: "none",
    "aria-hidden": "true"
  };
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
      function onDocClick(e) {
        if (wrap.value && !wrap.value.contains(e.target)) dropdownOpen.value = false;
      }
      function onKey(e) {
        if (e.key === "Escape") dropdownOpen.value = false;
      }
      let ro;
      onMounted(async () => {
        await nextTick();
        measure();
        window.addEventListener("resize", measure);
        document.addEventListener("click", onDocClick);
        document.addEventListener("keydown", onKey);
        if (typeof ResizeObserver !== "undefined" && wrap.value) {
          ro = new ResizeObserver(() => measure());
          ro.observe(wrap.value);
        }
      });
      onBeforeUnmount(() => {
        window.removeEventListener("resize", measure);
        document.removeEventListener("click", onDocClick);
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
                  }, toDisplayString(o.label), 11, _hoisted_229);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ], 42, _hoisted_137),
            createCommentVNode(" \u9009\u9879\u8FC7\u591A\uFF1A\u964D\u7EA7\u4E3A\u4E0B\u62C9\u7B5B\u9009 "),
            mode.value === "dropdown" ? (openBlock(), createElementBlock("div", _hoisted_325, [
              createElementVNode("button", {
                type: "button",
                class: "wd-segmented-picker__trigger",
                "aria-haspopup": "listbox",
                "aria-expanded": dropdownOpen.value,
                onClick: _cache[0] || (_cache[0] = ($event) => dropdownOpen.value = !dropdownOpen.value)
              }, [
                createElementVNode(
                  "span",
                  _hoisted_515,
                  toDisplayString(activeLabel.value),
                  1
                  /* TEXT */
                ),
                createElementVNode(
                  "span",
                  _hoisted_68,
                  toDisplayString(items.value.length) + " \u9879",
                  1
                  /* TEXT */
                ),
                (openBlock(), createElementBlock(
                  "svg",
                  {
                    class: normalizeClass(["wd-segmented-picker__caret", { "is-open": dropdownOpen.value }]),
                    viewBox: "0 0 24 24",
                    width: "16",
                    height: "16",
                    fill: "none",
                    "aria-hidden": "true"
                  },
                  [..._cache[1] || (_cache[1] = [
                    createElementVNode(
                      "path",
                      {
                        d: "M6 9l6 6 6-6",
                        stroke: "currentColor",
                        "stroke-width": "2.2",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      },
                      null,
                      -1
                      /* CACHED */
                    )
                  ])],
                  2
                  /* CLASS */
                ))
              ], 8, _hoisted_418),
              dropdownOpen.value ? (openBlock(), createElementBlock("div", _hoisted_78, [
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
                      o.value === __props.modelValue ? (openBlock(), createElementBlock("svg", _hoisted_96, [..._cache[2] || (_cache[2] = [
                        createElementVNode(
                          "path",
                          {
                            d: "M5 13l4 4L19 7",
                            stroke: "currentColor",
                            "stroke-width": "2.4",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          },
                          null,
                          -1
                          /* CACHED */
                        )
                      ])])) : createCommentVNode("v-if", true)
                    ], 10, _hoisted_88);
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
  var _hoisted_138 = ["disabled", "aria-expanded"];
  var _hoisted_230 = {
    key: 0,
    class: "wd-select__tags"
  };
  var _hoisted_326 = ["aria-label", "onClick"];
  var _hoisted_419 = {
    key: 0,
    class: "wd-select__tag wd-select__tag--more"
  };
  var _hoisted_516 = { class: "wd-select__value" };
  var _hoisted_69 = {
    key: 2,
    class: "wd-select__placeholder"
  };
  var _hoisted_79 = { class: "wd-select__actions" };
  var _hoisted_89 = ["aria-multiselectable"];
  var _hoisted_97 = {
    key: 0,
    class: "wd-select__search"
  };
  var _hoisted_105 = ["aria-selected", "disabled", "onClick", "onMouseenter"];
  var _hoisted_1112 = {
    key: 0,
    class: "wd-select__option-mark",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "3",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  var _hoisted_1210 = {
    key: 1,
    class: "wd-select__empty"
  };
  var WdSelect_default = /* @__PURE__ */ defineComponent({
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
      const open = ref(false);
      const root = ref();
      const search = ref("");
      const searchEl = ref(null);
      const activeIndex = ref(-1);
      const items = computed(
        () => props.options.map((o) => typeof o === "string" ? { label: o, value: o, disabled: false } : { disabled: false, ...o })
      );
      const selected = computed(() => {
        if (props.multiple) return Array.isArray(props.modelValue) ? props.modelValue : [];
        return props.modelValue === "" || props.modelValue === void 0 ? [] : [props.modelValue];
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
          await nextTick();
          if (props.filterable) searchEl.value?.focus();
        } else {
          search.value = "";
        }
      }
      function onKeydown(e) {
        if (props.disabled) return;
        if (e.key === "Escape") {
          open.value = false;
          return;
        }
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
      onMounted(() => document.addEventListener("click", onDocClick));
      onBeforeUnmount(() => document.removeEventListener("click", onDocClick));
      watch(visible, (list) => {
        if (activeIndex.value >= list.length) activeIndex.value = list.length - 1;
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            ref_key: "root",
            ref: root,
            class: normalizeClass(["wd-select", { "wd-select--open": open.value, "wd-select--disabled": __props.disabled, "wd-select--multiple": __props.multiple }]),
            onKeydown
          },
          [
            createElementVNode("button", {
              type: "button",
              class: normalizeClass(["wd-select__trigger", [`wd-select__trigger--${__props.size}`, { "wd-select__trigger--tags": __props.multiple && hasValue.value }]]),
              disabled: __props.disabled,
              "aria-expanded": open.value,
              "aria-haspopup": "listbox",
              onClick: toggleOpen
            }, [
              createCommentVNode(" \u591A\u9009\uFF1A\u6807\u7B7E\u5806\u53E0 "),
              __props.multiple && hasValue.value ? (openBlock(), createElementBlock("span", _hoisted_230, [
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
                      }, [..._cache[2] || (_cache[2] = [
                        createElementVNode(
                          "svg",
                          {
                            width: "10",
                            height: "10",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "3.2",
                            "stroke-linecap": "round"
                          },
                          [
                            createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                          ],
                          -1
                          /* CACHED */
                        )
                      ])], 8, _hoisted_326)) : createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                overflowCount.value ? (openBlock(), createElementBlock(
                  "span",
                  _hoisted_419,
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
                    _hoisted_516,
                    toDisplayString(singleLabel.value),
                    1
                    /* TEXT */
                  )
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : (openBlock(), createElementBlock(
                "span",
                _hoisted_69,
                toDisplayString(__props.placeholder),
                1
                /* TEXT */
              )),
              createElementVNode("span", _hoisted_79, [
                showClear.value ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  type: "button",
                  class: "wd-select__clear",
                  "aria-label": "\u6E05\u9664",
                  onClick: clear
                }, [..._cache[3] || (_cache[3] = [
                  createElementVNode(
                    "svg",
                    {
                      width: "12",
                      height: "12",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "3",
                      "stroke-linecap": "round"
                    },
                    [
                      createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                    ],
                    -1
                    /* CACHED */
                  )
                ])])) : createCommentVNode("v-if", true),
                (openBlock(), createElementBlock(
                  "svg",
                  {
                    class: normalizeClass(["wd-chevron", { "wd-chevron--open": open.value }]),
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.4",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  },
                  [..._cache[4] || (_cache[4] = [
                    createElementVNode(
                      "path",
                      { d: "m6 9 6 6 6-6" },
                      null,
                      -1
                      /* CACHED */
                    )
                  ])],
                  2
                  /* CLASS */
                ))
              ])
            ], 10, _hoisted_138),
            createVNode(Transition, {
              name: "wd-pop",
              duration: unref(POP_DURATION)
            }, {
              default: withCtx(() => [
                open.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "wd-select__menu",
                  role: "listbox",
                  "aria-multiselectable": __props.multiple || void 0
                }, [
                  createCommentVNode(" \u641C\u7D22\u6846 "),
                  __props.filterable ? (openBlock(), createElementBlock("div", _hoisted_97, [
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
                        selected.value.includes(o.value) ? (openBlock(), createElementBlock("svg", _hoisted_1112, [..._cache[5] || (_cache[5] = [
                          createElementVNode(
                            "path",
                            { d: "m4.5 12.5 5 5 10-11" },
                            null,
                            -1
                            /* CACHED */
                          )
                        ])])) : createCommentVNode("v-if", true)
                      ], 42, _hoisted_105);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  !visible.value.length ? (openBlock(), createElementBlock("div", _hoisted_1210, "\u65E0\u5339\u914D\u9879")) : createCommentVNode("v-if", true)
                ], 8, _hoisted_89)) : createCommentVNode("v-if", true)
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
  var _hoisted_139 = { class: "wd-slider" };
  var _hoisted_231 = ["min", "max", "step", "value"];
  var _hoisted_327 = {
    key: 0,
    class: "wd-slider__value"
  };
  var WdSlider_default = /* @__PURE__ */ defineComponent({
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
      const el = ref(null);
      const live = ref(null);
      const current = computed(() => live.value !== null ? live.value : props.modelValue);
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
        emit("update:modelValue", v);
      }
      watch(
        () => props.modelValue,
        (v) => {
          if (live.value !== null && v !== live.value) live.value = null;
        }
      );
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_139, [
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
          }, null, 44, _hoisted_231),
          __props.showValue ? (openBlock(), createElementBlock(
            "span",
            _hoisted_327,
            toDisplayString(current.value),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true)
        ]);
      };
    }
  });

  // .demo-build/WdSortableList.ts
  var _hoisted_140 = ["onPointerdown"];
  var _hoisted_232 = { class: "wd-sortable__label" };
  var _hoisted_328 = { class: "wd-sortable__label" };
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
                      _cache[0] || (_cache[0] = createStaticVNode('<span class="wd-sortable__handle" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.6"></circle><circle cx="15" cy="6" r="1.6"></circle><circle cx="9" cy="12" r="1.6"></circle><circle cx="15" cy="12" r="1.6"></circle><circle cx="9" cy="18" r="1.6"></circle><circle cx="15" cy="18" r="1.6"></circle></svg></span>', 1)),
                      createElementVNode(
                        "span",
                        _hoisted_232,
                        toDisplayString(labelOf(it)),
                        1
                        /* TEXT */
                      )
                    ], 42, _hoisted_140);
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
                  _cache[1] || (_cache[1] = createElementVNode(
                    "span",
                    {
                      class: "wd-sortable__handle",
                      "aria-hidden": "true"
                    },
                    [
                      createElementVNode("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "currentColor"
                      }, [
                        createElementVNode("circle", {
                          cx: "9",
                          cy: "6",
                          r: "1.6"
                        }),
                        createElementVNode("circle", {
                          cx: "15",
                          cy: "6",
                          r: "1.6"
                        }),
                        createElementVNode("circle", {
                          cx: "9",
                          cy: "12",
                          r: "1.6"
                        }),
                        createElementVNode("circle", {
                          cx: "15",
                          cy: "12",
                          r: "1.6"
                        }),
                        createElementVNode("circle", {
                          cx: "9",
                          cy: "18",
                          r: "1.6"
                        }),
                        createElementVNode("circle", {
                          cx: "15",
                          cy: "18",
                          r: "1.6"
                        })
                      ])
                    ],
                    -1
                    /* CACHED */
                  )),
                  createElementVNode(
                    "span",
                    _hoisted_328,
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

  // .demo-build/WdStatistic.ts
  var _hoisted_141 = { class: "wd-statistic" };
  var _hoisted_233 = {
    key: 0,
    class: "wd-statistic__title"
  };
  var _hoisted_329 = { class: "wd-statistic__value" };
  var _hoisted_420 = {
    key: 0,
    class: "wd-statistic__affix"
  };
  var _hoisted_517 = { class: "wd-statistic__num" };
  var _hoisted_610 = {
    key: 1,
    class: "wd-statistic__affix wd-statistic__affix--suffix"
  };
  var _hoisted_710 = {
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
        return openBlock(), createElementBlock("div", _hoisted_141, [
          __props.title ? (openBlock(), createElementBlock(
            "div",
            _hoisted_233,
            toDisplayString(__props.title),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true),
          createElementVNode("div", _hoisted_329, [
            __props.prefix ? (openBlock(), createElementBlock(
              "span",
              _hoisted_420,
              toDisplayString(__props.prefix),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            createElementVNode(
              "span",
              _hoisted_517,
              toDisplayString(text.value),
              1
              /* TEXT */
            ),
            __props.suffix ? (openBlock(), createElementBlock(
              "span",
              _hoisted_610,
              toDisplayString(__props.suffix),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true)
          ]),
          _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_710, [
            renderSlot(_ctx.$slots, "footer")
          ])) : createCommentVNode("v-if", true)
        ]);
      };
    }
  });

  // .demo-build/WdSteps.ts
  var _hoisted_143 = { class: "wd-steps" };
  var _hoisted_234 = { class: "wd-steps__dot" };
  var _hoisted_330 = {
    key: 0,
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "3.4",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  var _hoisted_421 = { class: "wd-steps__label" };
  var _hoisted_518 = {
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
        return openBlock(), createElementBlock("div", _hoisted_143, [
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
                      createElementVNode("span", _hoisted_234, [
                        state(i) === "finish" ? (openBlock(), createElementBlock("svg", _hoisted_330, [..._cache[0] || (_cache[0] = [
                          createElementVNode(
                            "path",
                            { d: "m4.5 12.5 5 5 10-11" },
                            null,
                            -1
                            /* CACHED */
                          )
                        ])])) : (openBlock(), createElementBlock(
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
                      createElementVNode("span", _hoisted_421, [
                        createTextVNode(
                          toDisplayString(s.title) + " ",
                          1
                          /* TEXT */
                        ),
                        s.desc ? (openBlock(), createElementBlock(
                          "em",
                          _hoisted_518,
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
  var _hoisted_144 = ["aria-checked", "disabled"];
  var WdSwitch_default = /* @__PURE__ */ defineComponent({
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
        return openBlock(), createElementBlock("button", {
          type: "button",
          role: "switch",
          class: normalizeClass(["wd-switch", { "wd-switch--off": !__props.modelValue }]),
          "aria-checked": __props.modelValue,
          disabled: __props.disabled,
          onClick: _cache[0] || (_cache[0] = ($event) => emit("update:modelValue", !__props.modelValue))
        }, [..._cache[1] || (_cache[1] = [
          createElementVNode(
            "span",
            { class: "wd-switch__knob" },
            null,
            -1
            /* CACHED */
          )
        ])], 10, _hoisted_144);
      };
    }
  });

  // .demo-build/WdTable.ts
  var _hoisted_145 = {
    key: 0,
    class: "wd-table__th wd-table__th--check"
  };
  var _hoisted_235 = ["aria-checked"];
  var _hoisted_331 = {
    key: 0,
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "3.6",
    "stroke-linecap": "round"
  };
  var _hoisted_422 = {
    key: 1,
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "3.6",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  var _hoisted_519 = ["aria-sort", "onClick"];
  var _hoisted_611 = {
    key: 0,
    class: "wd-table__sort"
  };
  var _hoisted_711 = {
    key: 0,
    d: "M12 5l7 7H5l7-7z"
  };
  var _hoisted_810 = {
    key: 1,
    d: "M12 19l-7-7h14l-7 7z"
  };
  var _hoisted_98 = ["onClick"];
  var _hoisted_106 = ["aria-checked", "onClick"];
  var _hoisted_1113 = {
    key: 0,
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "3.6",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
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
      maxHeight: { type: [Number, String], required: false, default: "" }
    },
    emits: ["update:selected", "change", "rowClick"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const sortKey = ref("");
      const sortDir = ref("asc");
      const sorted = computed(() => {
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
      const selectedKeys = computed(() => new Set(props.selected.map((r, i) => keyOf(r, i))));
      const isChecked = (row, i) => props.selected.some((r) => keyOf(r, 0) === keyOf(row, i) || r === row);
      const allChecked = computed(
        () => props.rows.length > 0 && props.rows.every((r, i) => props.selected.some((s) => s === r || keyOf(s, 0) === keyOf(r, i)))
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
      const wrapStyle = computed(
        () => props.maxHeight ? { maxHeight: typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight } : void 0
      );
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(["wd-table-wrap", { "wd-table-wrap--loading": __props.loading }]),
            style: normalizeStyle(wrapStyle.value)
          },
          [
            props.rows.length ? (openBlock(), createElementBlock(
              "table",
              {
                key: 0,
                class: normalizeClass(["wd-table", { "wd-table--striped": __props.striped }])
              },
              [
                createElementVNode("thead", null, [
                  createElementVNode("tr", null, [
                    __props.selectable ? (openBlock(), createElementBlock("th", _hoisted_145, [
                      createElementVNode("button", {
                        type: "button",
                        class: normalizeClass(["wd-table__check", { "wd-table__check--on": allChecked.value, "wd-table__check--part": someChecked.value }]),
                        "aria-checked": allChecked.value ? "true" : someChecked.value ? "mixed" : "false",
                        role: "checkbox",
                        "aria-label": "\u5168\u9009",
                        onClick: toggleAll
                      }, [
                        someChecked.value && !allChecked.value ? (openBlock(), createElementBlock("svg", _hoisted_331, [..._cache[1] || (_cache[1] = [
                          createElementVNode(
                            "path",
                            { d: "M6 12h12" },
                            null,
                            -1
                            /* CACHED */
                          )
                        ])])) : allChecked.value ? (openBlock(), createElementBlock("svg", _hoisted_422, [..._cache[2] || (_cache[2] = [
                          createElementVNode(
                            "path",
                            { d: "m4.5 12.5 5 5 10-11" },
                            null,
                            -1
                            /* CACHED */
                          )
                        ])])) : createCommentVNode("v-if", true)
                      ], 10, _hoisted_235)
                    ])) : createCommentVNode("v-if", true),
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(props.columns, (col) => {
                        return openBlock(), createElementBlock("th", {
                          key: col.key,
                          style: normalizeStyle(col.width ? { width: col.width } : void 0),
                          class: normalizeClass(["wd-table__th", { "wd-table__th--sort": col.sortable }]),
                          "aria-sort": sortKey.value === col.key ? sortDir.value === "asc" ? "ascending" : "descending" : "none",
                          onClick: ($event) => toggleSort(col.key, col)
                        }, [
                          createTextVNode(
                            toDisplayString(col.title) + " ",
                            1
                            /* TEXT */
                          ),
                          col.sortable ? (openBlock(), createElementBlock("span", _hoisted_611, [
                            (openBlock(), createElementBlock(
                              "svg",
                              {
                                width: "12",
                                height: "12",
                                viewBox: "0 0 24 24",
                                fill: "currentColor",
                                style: normalizeStyle({ color: sortKey.value === col.key ? "var(--wd-red)" : "var(--wd-ink-3)" })
                              },
                              [
                                sortKey.value !== col.key || sortDir.value === "asc" ? (openBlock(), createElementBlock("path", _hoisted_711)) : (openBlock(), createElementBlock("path", _hoisted_810))
                              ],
                              4
                              /* STYLE */
                            ))
                          ])) : createCommentVNode("v-if", true)
                        ], 14, _hoisted_519);
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
                    renderList(sorted.value, (row, i) => {
                      return openBlock(), createElementBlock("tr", {
                        key: keyOf(row, i),
                        class: normalizeClass({ "wd-table__row--checked": __props.selectable && __props.selected.includes(row) }),
                        onClick: ($event) => emit("rowClick", row, i)
                      }, [
                        __props.selectable ? (openBlock(), createElementBlock("td", {
                          key: 0,
                          class: "wd-table__td--check",
                          onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                          }, ["stop"]))
                        }, [
                          createElementVNode("button", {
                            type: "button",
                            class: normalizeClass(["wd-table__check", { "wd-table__check--on": __props.selected.includes(row) }]),
                            "aria-checked": __props.selected.includes(row) ? "true" : "false",
                            role: "checkbox",
                            "aria-label": "\u9009\u62E9\u6B64\u884C",
                            onClick: ($event) => toggleRow(row)
                          }, [
                            __props.selected.includes(row) ? (openBlock(), createElementBlock("svg", _hoisted_1113, [..._cache[3] || (_cache[3] = [
                              createElementVNode(
                                "path",
                                { d: "m4.5 12.5 5 5 10-11" },
                                null,
                                -1
                                /* CACHED */
                              )
                            ])])) : createCommentVNode("v-if", true)
                          ], 10, _hoisted_106)
                        ])) : createCommentVNode("v-if", true),
                        (openBlock(true), createElementBlock(
                          Fragment,
                          null,
                          renderList(props.columns, (col) => {
                            return openBlock(), createElementBlock(
                              "td",
                              {
                                key: col.key,
                                style: normalizeStyle(col.align ? { textAlign: col.align } : void 0)
                              },
                              [
                                renderSlot(_ctx.$slots, `cell-${col.key}`, {
                                  row,
                                  value: row[col.key]
                                }, () => [
                                  createTextVNode(
                                    toDisplayString(row[col.key]),
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
                      ], 10, _hoisted_98);
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
  var _hoisted_146 = ["aria-selected", "disabled", "tabindex", "onClick"];
  var _hoisted_236 = { class: "wd-tabs__label" };
  var _hoisted_332 = ["aria-label", "onClick"];
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
                    _hoisted_236,
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
                  }, [..._cache[1] || (_cache[1] = [
                    createElementVNode(
                      "svg",
                      {
                        width: "10",
                        height: "10",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "3",
                        "stroke-linecap": "round"
                      },
                      [
                        createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                      ],
                      -1
                      /* CACHED */
                    )
                  ])], 8, _hoisted_332)) : createCommentVNode("v-if", true)
                ], 10, _hoisted_146);
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
            }, [..._cache[2] || (_cache[2] = [
              createElementVNode(
                "svg",
                {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.6",
                  "stroke-linecap": "round"
                },
                [
                  createElementVNode("path", { d: "M12 5v14M5 12h14" })
                ],
                -1
                /* CACHED */
              )
            ])])) : createCommentVNode("v-if", true)
          ],
          34
          /* CLASS, NEED_HYDRATION */
        );
      };
    }
  });

  // .demo-build/WdTag.ts
  var _hoisted_147 = {
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
            __props.dot ? (openBlock(), createElementBlock("i", _hoisted_147)) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default")
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdTimeline.ts
  var _hoisted_148 = {
    key: 0,
    class: "wd-timeline__period"
  };
  var _hoisted_237 = { class: "wd-timeline__body" };
  var _hoisted_333 = { class: "wd-timeline__title" };
  var _hoisted_423 = {
    key: 0,
    class: "wd-timeline__desc"
  };
  var WdTimeline_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdTimeline" },
    __name: "WdTimeline",
    props: {
      items: { type: Array, required: true },
      line: { type: Boolean, required: false, default: false }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "ul",
          {
            class: normalizeClass(["wd-timeline", { "wd-timeline--line": __props.line }])
          },
          [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(__props.items, (it, i) => {
                return openBlock(), createElementBlock("li", {
                  key: i,
                  class: "wd-timeline__item"
                }, [
                  it.period ? (openBlock(), createElementBlock(
                    "span",
                    _hoisted_148,
                    toDisplayString(it.period),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true),
                  createElementVNode("div", _hoisted_237, [
                    createElementVNode(
                      "h3",
                      _hoisted_333,
                      toDisplayString(it.title),
                      1
                      /* TEXT */
                    ),
                    it.desc ? (openBlock(), createElementBlock(
                      "p",
                      _hoisted_423,
                      toDisplayString(it.desc),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true)
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

  // .demo-build/WdTooltip.ts
  var _hoisted_149 = {
    key: 0,
    class: "wd-tooltip__bubble",
    role: "tooltip"
  };
  var WdTooltip_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdTooltip" },
    __name: "WdTooltip",
    props: {
      content: { type: String, required: false, default: "" },
      placement: { type: String, required: false, default: "top" }
    },
    setup(__props) {
      const open = ref(false);
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "span",
          {
            class: normalizeClass(["wd-tooltip", [`wd-tooltip--${__props.placement}`, { "wd-tooltip--open": open.value }]]),
            onMouseenter: _cache[0] || (_cache[0] = ($event) => open.value = true),
            onMouseleave: _cache[1] || (_cache[1] = ($event) => open.value = false),
            onFocusin: _cache[2] || (_cache[2] = ($event) => open.value = true),
            onFocusout: _cache[3] || (_cache[3] = ($event) => open.value = false)
          },
          [
            renderSlot(_ctx.$slots, "default"),
            createVNode(Transition, { name: "wd-pop" }, {
              default: withCtx(() => [
                open.value ? (openBlock(), createElementBlock(
                  "span",
                  _hoisted_149,
                  toDisplayString(__props.content),
                  1
                  /* TEXT */
                )) : createCommentVNode("v-if", true)
              ]),
              _: 1
              /* STABLE */
            })
          ],
          34
          /* CLASS, NEED_HYDRATION */
        );
      };
    }
  });

  // .demo-build/WdTree.ts
  var _hoisted_150 = ["data-k", "tabindex", "aria-expanded", "aria-selected", "aria-disabled", "onClick", "onKeydown"];
  var _hoisted_238 = ["onClick"];
  var _hoisted_334 = {
    key: 0,
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "3",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  var _hoisted_424 = ["checked", ".indeterminate", "disabled", "onChange"];
  var _hoisted_520 = {
    key: 1,
    class: "wd-tree__icon"
  };
  var _hoisted_612 = { class: "wd-tree__label" };
  var _hoisted_712 = {
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
                    entry.node.children?.length ? (openBlock(), createElementBlock("svg", _hoisted_334, [..._cache[3] || (_cache[3] = [
                      createElementVNode(
                        "path",
                        { d: "m9 6 6 6-6 6" },
                        null,
                        -1
                        /* CACHED */
                      )
                    ])])) : createCommentVNode("v-if", true)
                  ], 10, _hoisted_238),
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
                    }, null, 40, _hoisted_424)
                  ])) : createCommentVNode("v-if", true),
                  entry.node.icon || _ctx.$slots.icon ? (openBlock(), createElementBlock("span", _hoisted_520, [
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
                  createElementVNode("span", _hoisted_612, [
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
                ], 46, _hoisted_150);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            !flat.value.length ? (openBlock(), createElementBlock(
              "div",
              _hoisted_712,
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
  var _hoisted_151 = { class: "wd-upload" };
  var _hoisted_239 = {
    key: 0,
    class: "wd-upload__hint"
  };
  var _hoisted_335 = ["accept", "multiple"];
  var _hoisted_425 = {
    key: 1,
    class: "wd-upload__error"
  };
  var _hoisted_521 = {
    key: 0,
    class: "wd-upload__list"
  };
  var _hoisted_613 = { class: "wd-upload__info" };
  var _hoisted_713 = { class: "wd-upload__name" };
  var _hoisted_811 = { class: "wd-upload__meta" };
  var _hoisted_99 = {
    key: 0,
    class: "wd-upload__progress"
  };
  var _hoisted_107 = ["onClick"];
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
        return openBlock(), createElementBlock("div", _hoisted_151, [
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
              _cache[2] || (_cache[2] = createStaticVNode('<span class="wd-upload__icon"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4m0 0-4 4m4-4 4 4"></path><path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"></path></svg></span><span class="wd-upload__hint"><strong>\u70B9\u51FB\u9009\u62E9</strong> \u6216\u62D6\u62FD\u6587\u4EF6\u5230\u8FD9\u91CC</span>', 2)),
              __props.hint ? (openBlock(), createElementBlock(
                "span",
                _hoisted_239,
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
              }, null, 40, _hoisted_335),
              error.value ? (openBlock(), createElementBlock(
                "span",
                _hoisted_425,
                toDisplayString(error.value),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true)
            ],
            34
            /* CLASS, NEED_HYDRATION */
          ),
          __props.showList && files.value.length ? (openBlock(), createElementBlock("div", _hoisted_521, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(files.value, (f, i) => {
                return openBlock(), createElementBlock("div", {
                  key: i,
                  class: "wd-upload__item"
                }, [
                  _cache[5] || (_cache[5] = createElementVNode(
                    "span",
                    { class: "wd-upload__file-icon" },
                    [
                      createElementVNode("svg", {
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "currentColor"
                      }, [
                        createElementVNode("path", { d: "M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" })
                      ])
                    ],
                    -1
                    /* CACHED */
                  )),
                  createElementVNode("div", _hoisted_613, [
                    createElementVNode(
                      "div",
                      _hoisted_713,
                      toDisplayString(f.name),
                      1
                      /* TEXT */
                    ),
                    createElementVNode(
                      "div",
                      _hoisted_811,
                      toDisplayString(fmtSize(f.size)) + " \xB7 " + toDisplayString(f.percent >= 100 ? "\u5DF2\u5B8C\u6210" : "\u4E0A\u4F20\u4E2D " + f.percent + "%"),
                      1
                      /* TEXT */
                    ),
                    f.percent < 100 ? (openBlock(), createElementBlock("div", _hoisted_99, [
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
                  }, [..._cache[4] || (_cache[4] = [
                    createElementVNode(
                      "svg",
                      {
                        width: "13",
                        height: "13",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2.6",
                        "stroke-linecap": "round"
                      },
                      [
                        createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                      ],
                      -1
                      /* CACHED */
                    )
                  ])], 8, _hoisted_107)
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

  // .demo-build/WdIcon.ts
  var import_meta = {};
  var _hoisted_153 = ["innerHTML"];
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
      const loaders = typeof import_meta !== "undefined" && typeof import_meta.glob === "function" ? import_meta.glob("../icons/*/*.svg", { query: "?raw", import: "default" }) : {};
      const svg = ref("");
      const resolvedStyle = computed(() => props.filled ? "filled" : props.variant);
      const factor = computed(() => props.optical ? opticalFactor(props.name) : 1);
      const sizePx = computed(() => {
        const base = typeof props.size === "number" ? props.size : parseFloat(props.size) || 24;
        return `${Math.round(base * factor.value * 100) / 100}px`;
      });
      watchEffect(async () => {
        const order = resolvedStyle.value === "filled" ? ["filled", "outlined"] : ["outlined", "filled"];
        const inline = globalThis.WD_ICONS;
        for (const st of order) {
          const key = `../icons/${st}/${props.name}.svg`;
          if (loaders[key]) {
            svg.value = await loaders[key]();
            return;
          }
          if (inline?.[`${st}/${props.name}`]) {
            svg.value = inline[`${st}/${props.name}`];
            return;
          }
        }
        svg.value = "";
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("span", {
          class: normalizeClass(["wd-icon", { "wd-icon--optical": factor.value !== 1 }]),
          style: normalizeStyle({ width: sizePx.value, height: sizePx.value }),
          innerHTML: svg.value
        }, null, 14, _hoisted_153);
      };
    }
  });
  return __toCommonJS(entry_exports);
})();
