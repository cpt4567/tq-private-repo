/**
 * tq-tooltip - Shadow DOM 툴팁 (Tippy.js 사용)
 * 사용: <script src="tq-tooltip.js"></script>
 * <tq-tooltip content="메시지" placement="top" variant="dark">
 *   <button>Hover me</button>
 * </tq-tooltip>
 */
(function () {
  "use strict";
  var POPPER_JS = "https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js";
  var TIPPY_JS = "https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.js";
  var TIPPY_CSS = "https://unpkg.com/tippy.js@6/dist/tippy.css";
  var TIPPY_ANIM = "https://unpkg.com/tippy.js@6/animations/scale-extreme.css";

  var placementMap = {
    topLeft: "top-start",
    top: "top",
    topRight: "top-end",
    rightTop: "right-start",
    right: "right",
    rightBottom: "right-end",
    bottomLeft: "bottom-start",
    bottom: "bottom",
    bottomRight: "bottom-end",
    leftTop: "left-start",
    left: "left",
    leftBottom: "left-end",
  };

  var TQ_TOOLTIP_STYLES =
    ".tippy-box[data-theme~='dark']{background:#1B1C1E}.tippy-box[data-theme~='dark'] .tippy-content{padding:10px}.tippy-box[data-theme~='dark'][data-placement^='top']>.tippy-arrow::before{border-top-color:#1B1C1E}.tippy-box[data-theme~='dark'][data-placement^='bottom']>.tippy-arrow::before{border-bottom-color:#1B1C1E}.tippy-box[data-theme~='dark'][data-placement^='left']>.tippy-arrow::before{border-left-color:#1B1C1E}.tippy-box[data-theme~='dark'][data-placement^='right']>.tippy-arrow::before{border-right-color:#1B1C1E}.tippy-box[data-theme~='light'] .tippy-content{padding:10px}";

  function loadCss(href) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function injectTqTooltipStyles() {
    if (document.getElementById("tq-tooltip-styles")) return;
    var style = document.createElement("style");
    style.id = "tq-tooltip-styles";
    style.textContent = TQ_TOOLTIP_STYLES;
    document.head.appendChild(style);
  }

  function loadScript(src, callback) {
    var script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    script.onerror = function () {
      console.error("tq-tooltip: 로드 실패 " + src);
    };
    document.head.appendChild(script);
  }

  function loadTippy(callback) {
    if (window.tippy) {
      loadCss(TIPPY_CSS);
      loadCss(TIPPY_ANIM);
      injectTqTooltipStyles();
      callback(window.tippy);
      return;
    }
    loadCss(TIPPY_CSS);
    loadCss(TIPPY_ANIM);
    injectTqTooltipStyles();
    if (window.Popper) {
      loadScript(TIPPY_JS, function () {
        callback(window.tippy);
      });
      return;
    }
    loadScript(POPPER_JS, function () {
      loadScript(TIPPY_JS, function () {
        callback(window.tippy);
      });
    });
  }

  function init() {
    class TqTooltipElement extends HTMLElement {
      static get tagName() {
        return "tq-tooltip";
      }
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._tippy = null;
      }
      connectedCallback() {
        this._render();
        this._initTippy();
      }
      disconnectedCallback() {
        if (this._tippy) {
          this._tippy.destroy();
          this._tippy = null;
        }
      }
      static get observedAttributes() {
        return [
          "content",
          "placement",
          "arrow",
          "variant",
          "trigger",
          "disabled",
        ];
      }
      attributeChangedCallback(name) {
        if (
          name === "content" ||
          name === "placement" ||
          name === "arrow" ||
          name === "variant" ||
          name === "trigger" ||
          name === "disabled"
        ) {
          if (this._tippy) {
            this._tippy.setProps(this._getOptions());
          }
        }
      }
      _getOptions() {
        var raw = this.getAttribute("placement") || "top";
        var placement = placementMap[raw] || raw;
        var arrow = this.getAttribute("arrow");
        var hasArrow = arrow !== "false" && arrow !== "0";
        var variant = this.getAttribute("variant") || "dark";
        var trigger = this.getAttribute("trigger") || "mouseenter";
        var content = this.getAttribute("content") || "";
        var disabled = this.hasAttribute("disabled");

        return {
          content: content,
          placement: placement,
          arrow: hasArrow,
          theme: variant,
          trigger: disabled ? "manual" : trigger,
          animation: "scale-extreme",
          duration: 200,
          appendTo: document.body,
          zIndex: 50,
        };
      }
      _render() {
        this.shadowRoot.innerHTML =
          "<style>:host{display:inline-block}</style><slot></slot>";
      }
      _initTippy() {
        if (this.hasAttribute("disabled")) return;
        var content = this.getAttribute("content");
        if (!content) return;

        var tippyFn = window.tippy;
        if (!tippyFn) return;

        var opts = this._getOptions();
        this._tippy = tippyFn(this, opts);
      }
    }

    if (
      typeof customElements !== "undefined" &&
      !customElements.get("tq-tooltip")
    ) {
      customElements.define("tq-tooltip", TqTooltipElement);
    }
  }

  loadTippy(function () {
    init();
  });
})();
