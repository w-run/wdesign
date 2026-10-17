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
    WdContainer: () => WdContainer_default,
    WdDatePicker: () => WdDatePicker_default,
    WdDrawer: () => WdDrawer_default,
    WdDropdown: () => WdDropdown_default,
    WdEmpty: () => WdEmpty_default,
    WdExplorer: () => WdExplorer_default,
    WdFileList: () => WdFileList_default,
    WdGrid: () => WdGrid_default,
    WdIcon: () => WdIcon_default,
    WdImagePreview: () => WdImagePreview_default,
    WdInput: () => WdInput_default,
    WdListItem: () => WdListItem_default,
    WdModal: () => WdModal_default,
    WdNotification: () => WdNotification_default,
    WdOtp: () => WdOtp_default,
    WdPagination: () => WdPagination_default,
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
    WdSteps: () => WdSteps_default,
    WdSwitch: () => WdSwitch_default,
    WdTable: () => WdTable_default,
    WdTabs: () => WdTabs_default,
    WdTag: () => WdTag_default,
    WdTimeline: () => WdTimeline_default,
    WdTooltip: () => WdTooltip_default,
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
  var Transition = G.Transition;
  var withCtx = G.withCtx;
  var createVNode = G.createVNode;
  var Teleport = G.Teleport;
  var watchEffect = G.watchEffect;
  var withKeys = G.withKeys;
  var createStaticVNode = G.createStaticVNode;
  var resolveDynamicComponent = G.resolveDynamicComponent;
  var nextTick = G.nextTick;

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
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "span",
          {
            class: normalizeClass(["wd-badge", __props.tone === "gray" ? "wd-badge--gray" : ""])
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
  var _hoisted_17 = ["disabled"];
  var WdButton_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdButton" },
    __name: "WdButton",
    props: {
      variant: { type: String, required: false, default: "primary" },
      size: { type: String, required: false, default: "md" },
      disabled: { type: Boolean, required: false, default: false },
      iconOnly: { type: Boolean, required: false, default: false },
      block: { type: Boolean, required: false, default: false }
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
          "wd-btn--block": props.block
        }
      ]);
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("button", {
          "data-wd-hover": "",
          class: normalizeClass(classes.value),
          type: "button",
          disabled: __props.disabled,
          onClick: _cache[0] || (_cache[0] = ($event) => emit("click", $event))
        }, [
          renderSlot(_ctx.$slots, "default")
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
  var _hoisted_25 = {
    key: 1,
    class: "wd-carousel__label"
  };
  var _hoisted_34 = {
    key: 2,
    class: "wd-carousel__dots"
  };
  var _hoisted_42 = ["aria-label", "onClick"];
  var THRESHOLD = 40;
  var WdCarousel_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdCarousel" },
    __name: "WdCarousel",
    props: {
      items: { type: Array, required: false, default: () => [] },
      height: { type: Number, required: false, default: 260 },
      autoplay: { type: Number, required: false, default: 0 },
      showDots: { type: Boolean, required: false, default: true },
      showArrows: { type: Boolean, required: false, default: true }
    },
    setup(__props) {
      const props = __props;
      const PALETTE = ["var(--wd-tint-2)", "var(--wd-success-soft)", "var(--wd-warning-soft)", "var(--wd-field)"];
      const index = ref(0);
      const root = ref(null);
      const dragX = ref(0);
      const trackStyle = computed(() => ({
        transform: `translateX(calc(-${index.value * 100}% + ${dragX.value}px))`,
        transition: dragX.value === 0 ? void 0 : "none"
      }));
      function go(i) {
        const n = props.items.length;
        if (!n) return;
        index.value = (i % n + n) % n;
      }
      let timer = null;
      function start() {
        stop();
        if (props.autoplay > 0 && props.items.length > 1) {
          timer = window.setInterval(() => go(index.value + 1), props.autoplay);
        }
      }
      function stop() {
        if (timer) {
          window.clearInterval(timer);
          timer = null;
        }
      }
      onMounted(start);
      onBeforeUnmount(() => {
        stop();
        detach();
      });
      let startX = 0;
      let startY = 0;
      let swiping = false;
      let decided = false;
      let pid = -1;
      function onDown(e) {
        if (props.items.length < 2) return;
        if (e.pointerType === "mouse" && e.button !== 0) return;
        swiping = true;
        decided = false;
        startX = e.clientX;
        startY = e.clientY;
        pid = e.pointerId;
        try {
          ;
          e.currentTarget.setPointerCapture?.(e.pointerId);
        } catch {
        }
        window.addEventListener("pointermove", onMove, { passive: false });
        window.addEventListener("pointerup", onUp);
        window.addEventListener("pointercancel", onUp);
      }
      function onMove(e) {
        if (!swiping) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
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
        const atEdge = index.value === 0 && dx > 0 || index.value === props.items.length - 1 && dx < 0;
        dragX.value = atEdge ? dx * 0.35 : dx;
      }
      function onUp(e) {
        if (!swiping) return;
        const dx = e.clientX - startX;
        if (decided && Math.abs(dx) > THRESHOLD) {
          go(index.value + (dx < 0 ? 1 : -1));
        }
        end(true);
      }
      function end(restart) {
        swiping = false;
        decided = false;
        dragX.value = 0;
        detach();
        if (restart) start();
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
            onMouseleave: start,
            onPointerdown: onDown
          },
          [
            createElementVNode(
              "div",
              {
                class: "wd-carousel__track",
                style: normalizeStyle(trackStyle.value)
              },
              [
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(__props.items, (it, i) => {
                    return openBlock(), createElementBlock(
                      "div",
                      {
                        key: i,
                        class: "wd-carousel__slide",
                        style: normalizeStyle({ background: PALETTE[i % PALETTE.length] })
                      },
                      [
                        renderSlot(_ctx.$slots, "item", {
                          item: it,
                          index: i
                        }, () => [
                          it.src ? (openBlock(), createElementBlock("img", {
                            key: 0,
                            src: it.src,
                            alt: it.alt || "",
                            class: "wd-carousel__img",
                            draggable: "false"
                          }, null, 8, _hoisted_18)) : (openBlock(), createElementBlock(
                            "span",
                            _hoisted_25,
                            toDisplayString(it.label || `Slide ${i + 1}`),
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
              4
              /* STYLE */
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
                onClick: _cache[1] || (_cache[1] = ($event) => go(index.value - 1))
              },
              [..._cache[5] || (_cache[5] = [
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
                onPointerdown: _cache[2] || (_cache[2] = withModifiers(() => {
                }, ["stop"])),
                onClick: _cache[3] || (_cache[3] = ($event) => go(index.value + 1))
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
                    class: normalizeClass(["wd-carousel__dot", { "wd-carousel__dot--active": i === index.value }]),
                    "aria-label": `\u7B2C ${i + 1} \u5F20`,
                    onPointerdown: _cache[4] || (_cache[4] = withModifiers(() => {
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
  var _hoisted_26 = {
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
          __props.label || _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_26, [
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
  var _hoisted_27 = ["aria-expanded", "onClick"];
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
                  ], 8, _hoisted_27),
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

  // .demo-build/WdDatePicker.ts
  var _hoisted_111 = ["disabled"];
  var _hoisted_28 = {
    key: 0,
    class: "wd-datepicker__value"
  };
  var _hoisted_36 = {
    key: 1,
    class: "wd-datepicker__placeholder"
  };
  var _hoisted_44 = {
    key: 0,
    class: "wd-datepicker__panel"
  };
  var _hoisted_53 = { class: "wd-datepicker__head" };
  var _hoisted_62 = { class: "wd-datepicker__month" };
  var _hoisted_72 = { class: "wd-datepicker__week" };
  var _hoisted_82 = { class: "wd-datepicker__grid" };
  var _hoisted_92 = ["onClick"];
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
      const POP_DURATION = { enter: 200, leave: 140 };
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
                _hoisted_28,
                toDisplayString(__props.modelValue),
                1
                /* TEXT */
              )) : (openBlock(), createElementBlock(
                "span",
                _hoisted_36,
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
            ], 8, _hoisted_111),
            createVNode(Transition, {
              name: "wd-pop",
              duration: POP_DURATION
            }, {
              default: withCtx(() => [
                open.value ? (openBlock(), createElementBlock("div", _hoisted_44, [
                  createElementVNode("div", _hoisted_53, [
                    createElementVNode(
                      "span",
                      _hoisted_62,
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
                  createElementVNode("div", _hoisted_72, [
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
                  createElementVNode("div", _hoisted_82, [
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
                        }, toDisplayString(d.label), 11, _hoisted_92);
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
            })
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdDrawer.ts
  var _hoisted_112 = { class: "wd-drawer__panel" };
  var _hoisted_29 = { class: "wd-drawer__head" };
  var _hoisted_37 = { class: "wd-drawer__title" };
  var _hoisted_45 = { class: "wd-drawer__body" };
  var _hoisted_54 = {
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
                  createElementVNode("div", _hoisted_112, [
                    createElementVNode("div", _hoisted_29, [
                      createElementVNode(
                        "div",
                        _hoisted_37,
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
                    createElementVNode("div", _hoisted_45, [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_54, [
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
  var _hoisted_113 = ["aria-expanded"];
  var _hoisted_210 = {
    key: 0,
    class: "wd-dropdown__menu",
    role: "menu"
  };
  var _hoisted_38 = ["onClick"];
  var WdDropdown_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdDropdown" },
    __name: "WdDropdown",
    props: {
      items: { type: Array, required: false, default: () => [] }
    },
    emits: ["select"],
    setup(__props, { emit: __emit }) {
      const POP_DURATION = { enter: 200, leave: 140 };
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
            ], 40, _hoisted_113),
            createVNode(Transition, {
              name: "wd-pop",
              duration: POP_DURATION
            }, {
              default: withCtx(() => [
                open.value ? (openBlock(), createElementBlock("div", _hoisted_210, [
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
                      }, toDisplayString(it.label), 11, _hoisted_38);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])) : createCommentVNode("v-if", true)
              ]),
              _: 1
              /* STABLE */
            })
          ],
          512
          /* NEED_PATCH */
        );
      };
    }
  });

  // .demo-build/WdEmpty.ts
  var _hoisted_114 = { class: "wd-empty" };
  var _hoisted_211 = { class: "wd-empty__icon" };
  var _hoisted_39 = {
    key: 0,
    class: "wd-empty__title"
  };
  var _hoisted_46 = {
    key: 1,
    class: "wd-empty__desc"
  };
  var _hoisted_55 = {
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
        return openBlock(), createElementBlock("div", _hoisted_114, [
          createElementVNode("div", _hoisted_211, [
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
            _hoisted_39,
            toDisplayString(__props.title),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true),
          __props.description || _ctx.$slots.description ? (openBlock(), createElementBlock("div", _hoisted_46, [
            renderSlot(_ctx.$slots, "description", {}, () => [
              createTextVNode(
                toDisplayString(__props.description),
                1
                /* TEXT */
              )
            ])
          ])) : createCommentVNode("v-if", true),
          _ctx.$slots.action ? (openBlock(), createElementBlock("div", _hoisted_55, [
            renderSlot(_ctx.$slots, "action")
          ])) : createCommentVNode("v-if", true)
        ]);
      };
    }
  });

  // .demo-build/WdExplorer.ts
  var _hoisted_115 = { class: "wd-explorer" };
  var _hoisted_212 = { class: "wd-explorer__side" };
  var _hoisted_310 = ["onClick"];
  var _hoisted_47 = { class: "wd-explorer__folder-name" };
  var _hoisted_56 = { class: "wd-explorer__count" };
  var _hoisted_63 = { class: "wd-explorer__main" };
  var _hoisted_73 = { class: "wd-explorer__bar" };
  var _hoisted_83 = { class: "wd-explorer__path" };
  var _hoisted_93 = { class: "wd-explorer__crumb wd-explorer__crumb--cur" };
  var _hoisted_102 = { class: "wd-explorer__views" };
  var _hoisted_116 = {
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
        return openBlock(), createElementBlock("div", _hoisted_115, [
          createElementVNode("div", _hoisted_212, [
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
                    _hoisted_47,
                    toDisplayString(f.name),
                    1
                    /* TEXT */
                  ),
                  createElementVNode(
                    "span",
                    _hoisted_56,
                    toDisplayString(f.files.length),
                    1
                    /* TEXT */
                  )
                ], 10, _hoisted_310);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          createElementVNode("div", _hoisted_63, [
            createElementVNode("div", _hoisted_73, [
              createElementVNode("div", _hoisted_83, [
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
                  _hoisted_93,
                  toDisplayString(current.value.name),
                  1
                  /* TEXT */
                )
              ]),
              createElementVNode("div", _hoisted_102, [
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
            mode.value === "details" ? (openBlock(), createElementBlock("table", _hoisted_116, [
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
  var _hoisted_117 = { class: "wd-file-list" };
  var _hoisted_213 = ["onClick"];
  var _hoisted_311 = {
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
  var _hoisted_48 = { class: "wd-file-list__icon" };
  var _hoisted_57 = {
    key: 0,
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  };
  var _hoisted_64 = {
    key: 1,
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  };
  var _hoisted_74 = { class: "wd-file-list__name" };
  var _hoisted_84 = { class: "wd-file-list__size" };
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
        return openBlock(), createElementBlock("div", _hoisted_117, [
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
                    row.node.type === "folder" ? (openBlock(), createElementBlock("svg", _hoisted_311, [..._cache[0] || (_cache[0] = [
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
                createElementVNode("span", _hoisted_48, [
                  row.node.type === "folder" ? (openBlock(), createElementBlock("svg", _hoisted_57, [..._cache[1] || (_cache[1] = [
                    createElementVNode(
                      "path",
                      { d: "M4 8a3 3 0 0 1 3-3h2.6c.5 0 1 .2 1.4.6l1 1c.4.4.9.6 1.4.6H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" },
                      null,
                      -1
                      /* CACHED */
                    )
                  ])])) : (openBlock(), createElementBlock("svg", _hoisted_64, [..._cache[2] || (_cache[2] = [
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
                  _hoisted_74,
                  toDisplayString(row.node.name),
                  1
                  /* TEXT */
                ),
                createElementVNode(
                  "span",
                  _hoisted_84,
                  toDisplayString(fmtSize(row.node.size)),
                  1
                  /* TEXT */
                )
              ], 14, _hoisted_213);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
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
  var _hoisted_118 = ["src", "alt"];
  var _hoisted_214 = {
    key: 0,
    class: "wd-preview"
  };
  var _hoisted_312 = ["src", "alt"];
  var _hoisted_49 = {
    key: 0,
    class: "wd-preview__count"
  };
  var _hoisted_58 = { class: "wd-preview__toolbar" };
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
                }, null, 8, _hoisted_118)) : createCommentVNode("v-if", true)
              ])
            ]),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              createVNode(Transition, { name: "wd-preview-fade" }, {
                default: withCtx(() => [
                  open.value ? (openBlock(), createElementBlock("div", _hoisted_214, [
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
                        }, null, 12, _hoisted_312)
                      ],
                      32
                      /* NEED_HYDRATION */
                    ),
                    images.value.length > 1 ? (openBlock(), createElementBlock(
                      "div",
                      _hoisted_49,
                      toDisplayString(cur.value + 1) + " / " + toDisplayString(images.value.length),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    createElementVNode("div", _hoisted_58, [
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
  var _hoisted_119 = {
    key: 0,
    class: "wd-input__icon"
  };
  var _hoisted_215 = ["type", "value", "placeholder", "disabled"];
  var WdInput_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdInput" },
    __name: "WdInput",
    props: {
      modelValue: { type: String, required: false, default: "" },
      placeholder: { type: String, required: false, default: "" },
      shape: { type: String, required: false, default: "pill" },
      type: { type: String, required: false, default: "text" },
      disabled: { type: Boolean, required: false, default: false },
      size: { type: String, required: false, default: "md" }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      function onInput(event) {
        emit("update:modelValue", event.target.value);
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "label",
          {
            class: normalizeClass(["wd-input", { "wd-input--rounded": __props.shape === "rounded", "wd-input--lg": __props.size === "lg", "wd-input--sm": __props.size === "sm" }])
          },
          [
            _ctx.$slots.icon ? (openBlock(), createElementBlock("span", _hoisted_119, [
              renderSlot(_ctx.$slots, "icon")
            ])) : createCommentVNode("v-if", true),
            createElementVNode("input", {
              type: __props.type,
              value: __props.modelValue,
              placeholder: __props.placeholder,
              disabled: __props.disabled,
              onInput
            }, null, 40, _hoisted_215),
            renderSlot(_ctx.$slots, "suffix")
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdListItem.ts
  var _hoisted_120 = {
    key: 0,
    class: "wd-list-item__icon"
  };
  var _hoisted_216 = { class: "wd-list-item__title" };
  var _hoisted_313 = {
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
            _ctx.$slots.icon ? (openBlock(), createElementBlock("span", _hoisted_120, [
              renderSlot(_ctx.$slots, "icon")
            ])) : createCommentVNode("v-if", true),
            createElementVNode(
              "span",
              _hoisted_216,
              toDisplayString(__props.title),
              1
              /* TEXT */
            ),
            __props.meta ? (openBlock(), createElementBlock(
              "span",
              _hoisted_313,
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
  var _hoisted_121 = ["aria-label"];
  var _hoisted_217 = { class: "wd-modal__head" };
  var _hoisted_314 = { class: "wd-modal__title" };
  var _hoisted_410 = { class: "wd-modal__body" };
  var _hoisted_59 = {
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
                    createElementVNode("div", _hoisted_217, [
                      createElementVNode(
                        "div",
                        _hoisted_314,
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
                    createElementVNode("div", _hoisted_410, [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_59, [
                      renderSlot(_ctx.$slots, "footer")
                    ])) : createCommentVNode("v-if", true)
                  ],
                  4
                  /* STYLE */
                )
              ], 8, _hoisted_121)) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          })
        ]);
      };
    }
  });

  // .demo-build/WdNotification.ts
  var _hoisted_123 = { class: "wd-notification__body" };
  var _hoisted_218 = {
    key: 0,
    class: "wd-notification__title"
  };
  var _hoisted_315 = {
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
                  createElementVNode("div", _hoisted_123, [
                    __props.title ? (openBlock(), createElementBlock(
                      "div",
                      _hoisted_218,
                      toDisplayString(__props.title),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true),
                    __props.description || _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_315, [
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
  var _hoisted_124 = ["value", "disabled", "onInput", "onKeydown"];
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
                }, null, 40, _hoisted_124);
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
  var _hoisted_125 = {
    class: "wd-pagination",
    "aria-label": "\u5206\u9875"
  };
  var _hoisted_219 = ["disabled"];
  var _hoisted_316 = {
    key: 0,
    class: "wd-pagination__dots"
  };
  var _hoisted_411 = ["onClick"];
  var _hoisted_510 = ["disabled"];
  var WdPagination_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdPagination" },
    __name: "WdPagination",
    props: {
      modelValue: { type: Number, required: false, default: 1 },
      total: { type: Number, required: false, default: 0 },
      pageSize: { type: Number, required: false, default: 10 }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));
      const range = computed(() => {
        const n = pageCount.value;
        const cur = props.modelValue;
        if (n <= 7) return Array.from({ length: n }, (_, i) => i + 1);
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
        const v = Math.min(Math.max(1, p), pageCount.value);
        if (v !== props.modelValue) emit("update:modelValue", v);
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("nav", _hoisted_125, [
          createElementVNode("button", {
            type: "button",
            class: "wd-pagination__btn",
            "data-wd-hover": "",
            disabled: __props.modelValue <= 1,
            "aria-label": "\u4E0A\u4E00\u9875",
            onClick: _cache[0] || (_cache[0] = ($event) => go(__props.modelValue - 1))
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
                createElementVNode("path", { d: "m15 18-6-6 6-6" })
              ],
              -1
              /* CACHED */
            )
          ])], 8, _hoisted_219),
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(range.value, (p, i) => {
              return openBlock(), createElementBlock(
                Fragment,
                { key: i },
                [
                  p === "..." ? (openBlock(), createElementBlock("span", _hoisted_316, "\u2026")) : (openBlock(), createElementBlock("button", {
                    key: 1,
                    type: "button",
                    class: normalizeClass(["wd-pagination__btn", { "wd-pagination__btn--active": p === __props.modelValue }]),
                    onClick: ($event) => go(p)
                  }, toDisplayString(p), 11, _hoisted_411))
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
            disabled: __props.modelValue >= pageCount.value,
            "aria-label": "\u4E0B\u4E00\u9875",
            onClick: _cache[1] || (_cache[1] = ($event) => go(__props.modelValue + 1))
          }, [..._cache[3] || (_cache[3] = [
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
          ])], 8, _hoisted_510)
        ]);
      };
    }
  });

  // .demo-build/WdPostItem.ts
  var _hoisted_126 = { class: "wd-post-item__title" };
  var _hoisted_220 = {
    key: 0,
    class: "wd-post-item__emoji"
  };
  var _hoisted_317 = {
    key: 0,
    class: "wd-post-item__summary"
  };
  var _hoisted_412 = {
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
            createElementVNode("h3", _hoisted_126, [
              __props.emoji ? (openBlock(), createElementBlock(
                "span",
                _hoisted_220,
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
              _hoisted_317,
              toDisplayString(__props.summary),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            __props.tags.length ? (openBlock(), createElementBlock("div", _hoisted_412, [
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
  var _hoisted_127 = ["aria-valuenow"];
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
        ], 10, _hoisted_127);
      };
    }
  });

  // .demo-build/WdRadioGroup.ts
  var _hoisted_128 = {
    class: "wd-radio-group",
    role: "radiogroup"
  };
  var _hoisted_221 = ["aria-checked", "disabled", "onClick"];
  var _hoisted_318 = { class: "wd-radio__label" };
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
        return openBlock(), createElementBlock("div", _hoisted_128, [
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
                  _hoisted_318,
                  toDisplayString(o.label),
                  1
                  /* TEXT */
                )
              ], 10, _hoisted_221);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  });

  // .demo-build/WdRate.ts
  var _hoisted_129 = ["aria-label", "aria-disabled"];
  var _hoisted_222 = ["aria-checked", "aria-label", "tabindex", "disabled", "onPointerenter", "onClick"];
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
              ])], 42, _hoisted_222);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ], 42, _hoisted_129);
      };
    }
  });

  // .demo-build/WdResult.ts
  var _hoisted_130 = { class: "wd-result__icon" };
  var _hoisted_223 = {
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
  var _hoisted_319 = {
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
  var _hoisted_413 = {
    key: 2,
    width: "30",
    height: "30",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2.6",
    "stroke-linecap": "round"
  };
  var _hoisted_511 = {
    key: 3,
    width: "30",
    height: "30",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2.4",
    "stroke-linecap": "round"
  };
  var _hoisted_65 = {
    key: 0,
    class: "wd-result__title"
  };
  var _hoisted_75 = {
    key: 1,
    class: "wd-result__desc"
  };
  var _hoisted_85 = {
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
            createElementVNode("div", _hoisted_130, [
              renderSlot(_ctx.$slots, "icon", {}, () => [
                __props.status === "success" ? (openBlock(), createElementBlock("svg", _hoisted_223, [..._cache[0] || (_cache[0] = [
                  createElementVNode(
                    "path",
                    { d: "m4.5 12.5 5 5 10-11" },
                    null,
                    -1
                    /* CACHED */
                  )
                ])])) : __props.status === "warning" ? (openBlock(), createElementBlock("svg", _hoisted_319, [..._cache[1] || (_cache[1] = [
                  createElementVNode(
                    "path",
                    { d: "M12 8v5M12 16.5h.01M10.3 4.2 3.6 16.1A2 2 0 0 0 5.3 19h13.4a2 2 0 0 0 1.7-2.9L13.7 4.2a2 2 0 0 0-3.4 0z" },
                    null,
                    -1
                    /* CACHED */
                  )
                ])])) : __props.status === "error" ? (openBlock(), createElementBlock("svg", _hoisted_413, [..._cache[2] || (_cache[2] = [
                  createElementVNode(
                    "path",
                    { d: "M6 6l12 12M18 6 6 18" },
                    null,
                    -1
                    /* CACHED */
                  )
                ])])) : (openBlock(), createElementBlock("svg", _hoisted_511, [..._cache[3] || (_cache[3] = [
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
              _hoisted_65,
              toDisplayString(__props.title),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            __props.description || _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_75, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(
                  toDisplayString(__props.description),
                  1
                  /* TEXT */
                )
              ])
            ])) : createCommentVNode("v-if", true),
            _ctx.$slots.extra ? (openBlock(), createElementBlock("div", _hoisted_85, [
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
  var _hoisted_131 = ["aria-hidden"];
  var _hoisted_224 = ["aria-selected", "tabindex", "onClick"];
  var _hoisted_320 = {
    key: 0,
    class: "wd-segmented-picker"
  };
  var _hoisted_414 = ["aria-expanded"];
  var _hoisted_512 = { class: "wd-segmented-picker__label" };
  var _hoisted_66 = { class: "wd-segmented-picker__meta" };
  var _hoisted_76 = {
    key: 0,
    class: "wd-segmented-picker__panel",
    role: "listbox"
  };
  var _hoisted_86 = ["aria-selected", "onClick"];
  var _hoisted_94 = {
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
                  }, toDisplayString(o.label), 11, _hoisted_224);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ], 42, _hoisted_131),
            createCommentVNode(" \u9009\u9879\u8FC7\u591A\uFF1A\u964D\u7EA7\u4E3A\u4E0B\u62C9\u7B5B\u9009 "),
            mode.value === "dropdown" ? (openBlock(), createElementBlock("div", _hoisted_320, [
              createElementVNode("button", {
                type: "button",
                class: "wd-segmented-picker__trigger",
                "aria-haspopup": "listbox",
                "aria-expanded": dropdownOpen.value,
                onClick: _cache[0] || (_cache[0] = ($event) => dropdownOpen.value = !dropdownOpen.value)
              }, [
                createElementVNode(
                  "span",
                  _hoisted_512,
                  toDisplayString(activeLabel.value),
                  1
                  /* TEXT */
                ),
                createElementVNode(
                  "span",
                  _hoisted_66,
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
              ], 8, _hoisted_414),
              dropdownOpen.value ? (openBlock(), createElementBlock("div", _hoisted_76, [
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
                      o.value === __props.modelValue ? (openBlock(), createElementBlock("svg", _hoisted_94, [..._cache[2] || (_cache[2] = [
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
                    ], 10, _hoisted_86);
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
  var _hoisted_133 = ["disabled"];
  var _hoisted_225 = {
    key: 0,
    class: "wd-select__value"
  };
  var _hoisted_321 = {
    key: 1,
    class: "wd-select__placeholder"
  };
  var _hoisted_415 = {
    key: 0,
    class: "wd-select__menu",
    role: "listbox"
  };
  var _hoisted_513 = ["aria-selected", "onClick"];
  var _hoisted_67 = {
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
  var WdSelect_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdSelect" },
    __name: "WdSelect",
    props: {
      modelValue: { type: [String, Number], required: false, default: "" },
      options: { type: Array, required: false, default: () => [] },
      placeholder: { type: String, required: false, default: "\u8BF7\u9009\u62E9" },
      disabled: { type: Boolean, required: false, default: false }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const POP_DURATION = { enter: 200, leave: 140 };
      const props = __props;
      const emit = __emit;
      const open = ref(false);
      const root = ref();
      const items = computed(
        () => props.options.map((o) => typeof o === "string" ? { label: o, value: o } : o)
      );
      const current = computed(() => items.value.find((o) => o.value === props.modelValue));
      function pick(value) {
        emit("update:modelValue", value);
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
          "div",
          {
            ref_key: "root",
            ref: root,
            class: normalizeClass(["wd-select", { "wd-select--open": open.value, "wd-select--disabled": __props.disabled }])
          },
          [
            createElementVNode("button", {
              type: "button",
              class: normalizeClass(["wd-select__trigger", { "wd-select__trigger--lg": _ctx.size === "lg", "wd-select__trigger--sm": _ctx.size === "sm" }]),
              disabled: __props.disabled,
              onClick: _cache[0] || (_cache[0] = ($event) => open.value = !open.value)
            }, [
              current.value ? (openBlock(), createElementBlock(
                "span",
                _hoisted_225,
                toDisplayString(current.value.label),
                1
                /* TEXT */
              )) : (openBlock(), createElementBlock(
                "span",
                _hoisted_321,
                toDisplayString(__props.placeholder),
                1
                /* TEXT */
              )),
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
                [..._cache[1] || (_cache[1] = [
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
            ], 10, _hoisted_133),
            createVNode(Transition, {
              name: "wd-pop",
              duration: POP_DURATION
            }, {
              default: withCtx(() => [
                open.value ? (openBlock(), createElementBlock("div", _hoisted_415, [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(items.value, (o) => {
                      return openBlock(), createElementBlock("button", {
                        key: o.value,
                        type: "button",
                        role: "option",
                        class: normalizeClass(["wd-select__option", { "wd-select__option--active": o.value === __props.modelValue }]),
                        "aria-selected": o.value === __props.modelValue,
                        onClick: ($event) => pick(o.value)
                      }, [
                        createElementVNode(
                          "span",
                          null,
                          toDisplayString(o.label),
                          1
                          /* TEXT */
                        ),
                        o.value === __props.modelValue ? (openBlock(), createElementBlock("svg", _hoisted_67, [..._cache[2] || (_cache[2] = [
                          createElementVNode(
                            "path",
                            { d: "m4.5 12.5 5 5 10-11" },
                            null,
                            -1
                            /* CACHED */
                          )
                        ])])) : createCommentVNode("v-if", true)
                      ], 10, _hoisted_513);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])) : createCommentVNode("v-if", true)
              ]),
              _: 1
              /* STABLE */
            })
          ],
          2
          /* CLASS */
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
  var _hoisted_134 = { class: "wd-slider" };
  var _hoisted_226 = ["min", "max", "step", "value"];
  var _hoisted_322 = {
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
      const percent = computed(() => {
        const span = props.max - props.min || 1;
        return Math.max(0, Math.min(100, (props.modelValue - props.min) / span * 100));
      });
      const trackStyle = computed(() => ({
        background: `linear-gradient(to right, var(--wd-red) 0%, var(--wd-red) ${percent.value}%, var(--wd-tint-2) ${percent.value}%, var(--wd-tint-2) 100%)`
      }));
      const el = ref(null);
      let dragging = false;
      function onInput(e) {
        const v = Number(e.target.value);
        emit("update:modelValue", v);
      }
      function onPointerDown() {
        dragging = true;
      }
      function onPointerUp() {
        dragging = false;
      }
      watch(
        () => props.modelValue,
        (v) => {
          if (dragging || !el.value) return;
          if (Number(el.value.value) !== v) el.value.value = String(v);
        }
      );
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_134, [
          createElementVNode("input", {
            ref_key: "el",
            ref: el,
            type: "range",
            min: __props.min,
            max: __props.max,
            step: __props.step,
            value: __props.modelValue,
            style: normalizeStyle(trackStyle.value),
            onInput,
            onPointerdown: onPointerDown,
            onPointerup: onPointerUp,
            onPointercancel: onPointerUp
          }, null, 44, _hoisted_226),
          __props.showValue ? (openBlock(), createElementBlock(
            "span",
            _hoisted_322,
            toDisplayString(__props.modelValue),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true)
        ]);
      };
    }
  });

  // .demo-build/WdSortableList.ts
  var _hoisted_135 = ["onPointerdown"];
  var _hoisted_227 = { class: "wd-sortable__label" };
  var _hoisted_323 = { class: "wd-sortable__label" };
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
                        _hoisted_227,
                        toDisplayString(labelOf(it)),
                        1
                        /* TEXT */
                      )
                    ], 42, _hoisted_135);
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
                    _hoisted_323,
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
      size: { type: String, required: false, default: "md" }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "span",
          {
            class: normalizeClass(["wd-spinner", __props.size !== "md" ? `wd-spinner--${__props.size}` : ""]),
            role: "status",
            "aria-label": "\u52A0\u8F7D\u4E2D"
          },
          null,
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdSteps.ts
  var _hoisted_136 = { class: "wd-steps" };
  var _hoisted_228 = { class: "wd-steps__dot" };
  var _hoisted_324 = {
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
  var _hoisted_416 = { class: "wd-steps__label" };
  var _hoisted_514 = {
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
        return openBlock(), createElementBlock("div", _hoisted_136, [
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
                      createElementVNode("span", _hoisted_228, [
                        state(i) === "finish" ? (openBlock(), createElementBlock("svg", _hoisted_324, [..._cache[0] || (_cache[0] = [
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
                      createElementVNode("span", _hoisted_416, [
                        createTextVNode(
                          toDisplayString(s.title) + " ",
                          1
                          /* TEXT */
                        ),
                        s.desc ? (openBlock(), createElementBlock(
                          "em",
                          _hoisted_514,
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
  var _hoisted_137 = ["aria-checked", "disabled"];
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
        ])], 10, _hoisted_137);
      };
    }
  });

  // .demo-build/WdTable.ts
  var _hoisted_138 = { class: "wd-table-wrap" };
  var _hoisted_229 = ["aria-sort", "onClick"];
  var _hoisted_325 = {
    key: 0,
    class: "wd-table__sort"
  };
  var _hoisted_417 = {
    key: 0,
    d: "M12 5l7 7H5l7-7z"
  };
  var _hoisted_515 = {
    key: 1,
    d: "M12 19l-7-7h14l-7 7z"
  };
  var _hoisted_68 = {
    key: 1,
    class: "wd-table__empty"
  };
  var WdTable_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdTable" },
    __name: "WdTable",
    props: {
      columns: { type: Array, required: false, default: () => [] },
      rows: { type: Array, required: false, default: () => [] },
      striped: { type: Boolean, required: false, default: true },
      emptyText: { type: String, required: false, default: "\u6682\u65E0\u6570\u636E" }
    },
    setup(__props) {
      const props = __props;
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
      function toggleSort(key, col) {
        if (!col.sortable) return;
        if (sortKey.value === key) {
          sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
        } else {
          sortKey.value = key;
          sortDir.value = "asc";
        }
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_138, [
          props.rows.length ? (openBlock(), createElementBlock(
            "table",
            {
              key: 0,
              class: normalizeClass(["wd-table", { "wd-table--striped": __props.striped }])
            },
            [
              createElementVNode("thead", null, [
                createElementVNode("tr", null, [
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
                        col.sortable ? (openBlock(), createElementBlock("span", _hoisted_325, [
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
                              sortKey.value !== col.key || sortDir.value === "asc" ? (openBlock(), createElementBlock("path", _hoisted_417)) : (openBlock(), createElementBlock("path", _hoisted_515))
                            ],
                            4
                            /* STYLE */
                          ))
                        ])) : createCommentVNode("v-if", true)
                      ], 14, _hoisted_229);
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
                    return openBlock(), createElementBlock("tr", { key: i }, [
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
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ],
            2
            /* CLASS */
          )) : (openBlock(), createElementBlock(
            "div",
            _hoisted_68,
            toDisplayString(__props.emptyText),
            1
            /* TEXT */
          ))
        ]);
      };
    }
  });

  // .demo-build/WdTabs.ts
  var _hoisted_139 = ["aria-selected", "onClick"];
  var WdTabs_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdTabs" },
    __name: "WdTabs",
    props: {
      modelValue: { type: [String, Number], required: false, default: "" },
      tabs: { type: Array, required: false, default: () => [] },
      block: { type: Boolean, required: false, default: false }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const items = computed(
        () => props.tabs.map((t) => typeof t === "string" ? { label: t, value: t } : t)
      );
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(["wd-tabs", { "wd-tabs--block": __props.block }]),
            role: "tablist"
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
                  class: normalizeClass(["wd-tabs__item", { "wd-tabs__item--active": t.value === __props.modelValue }]),
                  "data-wd-hover": "",
                  "aria-selected": t.value === __props.modelValue,
                  onClick: ($event) => emit("update:modelValue", t.value)
                }, toDisplayString(t.label), 11, _hoisted_139);
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

  // .demo-build/WdTag.ts
  var _hoisted_140 = {
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
            __props.dot ? (openBlock(), createElementBlock("i", _hoisted_140)) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default")
          ],
          2
          /* CLASS */
        );
      };
    }
  });

  // .demo-build/WdTimeline.ts
  var _hoisted_141 = {
    key: 0,
    class: "wd-timeline__period"
  };
  var _hoisted_230 = { class: "wd-timeline__body" };
  var _hoisted_326 = { class: "wd-timeline__title" };
  var _hoisted_418 = {
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
                    _hoisted_141,
                    toDisplayString(it.period),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true),
                  createElementVNode("div", _hoisted_230, [
                    createElementVNode(
                      "h3",
                      _hoisted_326,
                      toDisplayString(it.title),
                      1
                      /* TEXT */
                    ),
                    it.desc ? (openBlock(), createElementBlock(
                      "p",
                      _hoisted_418,
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
  var _hoisted_143 = {
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
                  _hoisted_143,
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

  // .demo-build/WdUpload.ts
  var _hoisted_144 = { class: "wd-upload" };
  var _hoisted_231 = {
    key: 0,
    class: "wd-upload__hint"
  };
  var _hoisted_327 = ["accept", "multiple"];
  var _hoisted_419 = {
    key: 0,
    class: "wd-upload__list"
  };
  var _hoisted_516 = { class: "wd-upload__info" };
  var _hoisted_69 = { class: "wd-upload__name" };
  var _hoisted_77 = { class: "wd-upload__meta" };
  var _hoisted_87 = {
    key: 0,
    class: "wd-upload__progress"
  };
  var _hoisted_95 = ["onClick"];
  var WdUpload_default = /* @__PURE__ */ defineComponent({
    ...{ name: "WdUpload" },
    __name: "WdUpload",
    props: {
      accept: { type: String, required: false, default: "*" },
      multiple: { type: Boolean, required: false, default: false },
      hint: { type: String, required: false, default: "" }
    },
    emits: ["change"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const files = ref([]);
      const dragging = ref(false);
      const input = ref();
      function fmtSize(n) {
        if (n < 1024) return `${n} B`;
        if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
        return `${(n / 1048576).toFixed(1)} MB`;
      }
      function addFiles(list) {
        for (const f of Array.from(list)) {
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
        return openBlock(), createElementBlock("div", _hoisted_144, [
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
                _hoisted_231,
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
              }, null, 40, _hoisted_327)
            ],
            34
            /* CLASS, NEED_HYDRATION */
          ),
          files.value.length ? (openBlock(), createElementBlock("div", _hoisted_419, [
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
                  createElementVNode("div", _hoisted_516, [
                    createElementVNode(
                      "div",
                      _hoisted_69,
                      toDisplayString(f.name),
                      1
                      /* TEXT */
                    ),
                    createElementVNode(
                      "div",
                      _hoisted_77,
                      toDisplayString(fmtSize(f.size)) + " \xB7 " + toDisplayString(f.percent >= 100 ? "\u5DF2\u5B8C\u6210" : "\u4E0A\u4F20\u4E2D " + f.percent + "%"),
                      1
                      /* TEXT */
                    ),
                    f.percent < 100 ? (openBlock(), createElementBlock("div", _hoisted_87, [
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
                  ])], 8, _hoisted_95)
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
  var _hoisted_145 = ["innerHTML"];
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
        }, null, 14, _hoisted_145);
      };
    }
  });
  return __toCommonJS(entry_exports);
})();
