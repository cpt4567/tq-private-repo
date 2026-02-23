/**
 * tq-category-group - Shadow DOM Category
 * 사용: <script src="tokens.js"></script><script src="tq-category-group.js"></script>
 */
(function () {
  "use strict";
  var tokens = window.TQ_TOKENS;
  if (!tokens) return;
  var c = tokens.color,
    s = tokens.spacing,
    r = tokens.radius,
    t = tokens.typography,
    o = tokens.opacity,
    i = tokens.interaction;

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function getTypographyCSS(name) {
    var typo = t[name] || t["body-two-normal-medium"];
    return (
      "font-size:" +
      typo.fontSize +
      ";font-weight:" +
      typo.fontWeight +
      ";line-height:" +
      typo.lineHeight +
      ";"
    );
  }

  function shadow1(color) {
    return (
      "box-shadow:inset -1px 0 0 0 " +
      color +
      ",inset 1px 0 0 0 " +
      color +
      ",inset 0 -1px 0 0 " +
      color +
      ",inset 0 1px 0 0 " +
      color +
      ";"
    );
  }

  function colorWithOpacity(hex, opacity) {
    var m = String(hex).match(
      /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i
    );
    if (!m) return hex;
    var rv = parseInt(m[1], 16),
      g = parseInt(m[2], 16),
      b = parseInt(m[3], 16);
    var a = m[4] ? parseInt(m[4], 16) / 255 : 1;
    return "rgba(" + rv + "," + g + "," + b + "," + a * opacity + ")";
  }

  var sizeSpec = {
    small: {
      py: s[4],
      px: s[7],
      height: 24,
      radius: r[6],
      typo: "caption-one-medium",
      labelTypo: "caption-one-normal-medium",
    },
    medium: {
      py: s[6],
      px: s[8],
      height: 32,
      radius: r[8],
      typo: "label-one-normal-medium",
      labelTypo: "caption-one-normal-medium",
    },
    large: {
      py: s[7],
      px: s[11],
      height: 36,
      radius: r[10],
      typo: "body-two-normal-medium",
      labelTypo: "caption-one-normal-medium",
    },
    xlarge: {
      py: s[9],
      px: s[12],
      height: 40,
      radius: r[10],
      typo: "body-two-normal-medium",
      labelTypo: "caption-one-normal-medium",
    },
  };

  function buildVariantStyles() {
    var ringGrayFull = "inset 0 0 0 1.5px " + c["semantic-line-normal-gray"];
    var ringGray16 =
      "inset 0 0 0 1.5px " +
      colorWithOpacity(c["semantic-line-normal-gray"], o[16]);
    var shadow1Gray =
      "inset -1px 0 0 0 " +
      c["semantic-line-normal-gray"] +
      ",inset 1px 0 0 0 " +
      c["semantic-line-normal-gray"] +
      ",inset 0 -1px 0 0 " +
      c["semantic-line-normal-gray"] +
      ",inset 0 1px 0 0 " +
      c["semantic-line-normal-gray"];
    return {
      "solid-active":
        "background:" +
        c["semantic-static-black"] +
        ";color:" +
        c["semantic-static-white"] +
        ";border:none;",
      "solid-passive":
        "background:" +
        c["semantic-background-normal-normal"] +
        ";color:" +
        c["semantic-label-alternative"] +
        ";border:none;box-shadow:" +
        ringGrayFull +
        ";",
      "outline-active":
        "background:" +
        colorWithOpacity(c["semantic-primary-normal"], i.normal.hovered) +
        ";color:" +
        c["semantic-primary-normal"] +
        ";border:none;box-shadow:inset 0 0 0 1.5px " +
        colorWithOpacity(c["semantic-primary-normal"], o[43]) +
        ";",
      "outline-passive":
        "background:transparent;color:" +
        c["semantic-label-alternative"] +
        ";border:none;box-shadow:" +
        shadow1Gray +
        "," +
        ringGray16 +
        ";",
    };
  }

  function buildDisabledStyles() {
    var ringGrayFull = "inset 0 0 0 1.5px " + c["semantic-line-normal-gray"];
    return {
      "solid-active":
        "background:" +
        c["semantic-label-disable"] +
        ";color:" +
        c["semantic-label-disable"] +
        ";",
      "solid-passive":
        "background:" +
        c["semantic-fill-alternative"] +
        ";color:" +
        c["semantic-label-alternative"] +
        ";box-shadow:" +
        ringGrayFull +
        ";",
      "outline-active":
        "background:" +
        colorWithOpacity(c["semantic-primary-normal"], i.normal.hovered) +
        ";color:" +
        c["semantic-primary-normal"] +
        ";",
      "outline-passive":
        "background:transparent;color:" +
        c["semantic-label-disable"] +
        ";" +
        shadow1(c["semantic-line-normal-gray"]),
    };
  }

  class TqCategoryGroupElement extends HTMLElement {
    static get tagName() {
      return "tq-category-group";
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._selectedKeys = new Set();
    }
    static get observedAttributes() {
      return [
        "group",
        "outline",
        "size",
        "disabled",
        "selected-keys",
        "selection-mode",
      ];
    }
    connectedCallback() {
      this._parseSelectedKeys();
      this._render();
    }
    attributeChangedCallback(name, oldVal, newVal) {
      if (
        name === "group" ||
        name === "outline" ||
        name === "size" ||
        name === "disabled" ||
        name === "selected-keys" ||
        name === "selection-mode"
      ) {
        if (name === "selected-keys") this._parseSelectedKeys();
        this._render();
      }
    }
    _parseSelectedKeys() {
      try {
        var val = this.getAttribute("selected-keys");
        if (val) {
          var arr = JSON.parse(val);
          this._selectedKeys = new Set(Array.isArray(arr) ? arr : []);
        }
      } catch (e) {}
    }
    get group() {
      try {
        return JSON.parse(this.getAttribute("group") || "[]");
      } catch (e) {
        return [];
      }
    }
    set group(val) {
      this.setAttribute("group", JSON.stringify(val));
    }
    get selectedKeys() {
      return new Set(this._selectedKeys);
    }
    set selectedKeys(val) {
      this._selectedKeys = new Set(val || []);
      this._render();
    }
    _getSelectionMode() {
      return this.getAttribute("selection-mode") || "multiple";
    }
    _getVariant(isSelected, isDisabled) {
      var outline = this.hasAttribute("outline");
      return outline
        ? isSelected
          ? "outline-active"
          : "outline-passive"
        : isSelected
          ? "solid-active"
          : "solid-passive";
    }
    _render() {
      var size = this.getAttribute("size") || "medium";
      var isDisabled = this.hasAttribute("disabled");
      var spec = sizeSpec[size] || sizeSpec.medium;
      var labelTypo = t[spec.labelTypo] || t["caption-one-normal-medium"];
      var variants = buildVariantStyles();
      var disabledStyles = buildDisabledStyles();
      var items = this.group;
      var html = items
        .map(
          function (item, index) {
            var key = item.value !== undefined ? item.value : item.label;
            var isSelected = this._selectedKeys.has(key);
            var variant = this._getVariant(isSelected, isDisabled);
            var disabled = isDisabled ? "disabled" : "";
            var vs =
              isDisabled && disabledStyles[variant]
                ? disabledStyles[variant]
                : variants[variant];
            var safeKey = String(key).replace(/"/g, "&quot;");
            var safeLabel = escapeHtml(item.label || "");
            return (
              '<button type="button" class="tq-category tq-category--' +
              variant +
              " tq-category--" +
              size +
              '" data-key="' +
              safeKey +
              '" data-index="' +
              index +
              '" ' +
              disabled +
              ' style="' +
              vs +
              '"><span class="tq-category__overlay" aria-hidden="true"></span><span class="tq-category__content"><span class="tq-category__label">' +
              safeLabel +
              "</span></span></button>"
            );
          }.bind(this)
        )
        .join("");
      var styles =
        ".tq-category-group{display:flex;flex-wrap:wrap;gap:" +
        s[8] +
        "}.tq-category{position:relative;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;outline:none;font-family:Pretendard,system-ui,sans-serif;box-sizing:border-box;text-align:center;padding:" +
        spec.py +
        " " +
        spec.px +
        ";min-height:" +
        spec.height +
        "px;height:" +
        spec.height +
        "px;border-radius:" +
        spec.radius +
        ";" +
        getTypographyCSS(spec.typo) +
        "border:none;overflow:hidden;transition:background .2s ease}.tq-category:focus{outline:none}.tq-category:disabled{cursor:not-allowed;pointer-events:none}.tq-category__overlay{position:absolute;inset:0;pointer-events:none;background:" +
        c["semantic-label-normal"] +
        ";border-radius:inherit;opacity:0;transition:opacity .2s ease}.tq-category:hover:not(:disabled) .tq-category__overlay{opacity:" +
        i.normal.hovered +
        "}.tq-category:active:not(:disabled) .tq-category__overlay{opacity:" +
        i.normal.pressed +
        "}.tq-category:focus-visible .tq-category__overlay{opacity:" +
        o[8] +
        "}.tq-category__content{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:" +
        s[8] +
        "}.tq-category__label{font-size:" +
        labelTypo.fontSize +
        ";font-weight:" +
        labelTypo.fontWeight +
        ";line-height:" +
        labelTypo.lineHeight +
        ";white-space:nowrap;padding:0 2px}";
      this.shadowRoot.innerHTML =
        "<style>" +
        styles +
        '</style><div class="tq-category-group">' +
        html +
        "</div>";
      this._attachListeners();
    }
    _attachListeners() {
      var container = this.shadowRoot.querySelector(".tq-category-group");
      if (!container) return;
      var mode = this._getSelectionMode();
      container.querySelectorAll(".tq-category").forEach(
        function (btn) {
          btn.addEventListener(
            "click",
            function () {
              if (this.hasAttribute("disabled")) return;
              var key = btn.getAttribute("data-key");
              if (mode === "single") {
                this._selectedKeys = this._selectedKeys.has(key)
                  ? new Set()
                  : new Set([key]);
              } else {
                if (this._selectedKeys.has(key)) this._selectedKeys.delete(key);
                else this._selectedKeys.add(key);
              }
              this._render();
              this.dispatchEvent(
                new CustomEvent("selectionchange", {
                  detail: { selectedKeys: this.selectedKeys },
                  bubbles: true,
                  composed: true,
                })
              );
            }.bind(this)
          );
        }.bind(this)
      );
    }
  }

  if (
    typeof customElements !== "undefined" &&
    !customElements.get("tq-category-group")
  ) {
    customElements.define("tq-category-group", TqCategoryGroupElement);
  }
})();
