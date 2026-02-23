/**
 * tq-tab - Shadow DOM Tab
 * 기존 tab.tsx와 동일한 스타일/동작
 * 사용: <script src="tokens.js"></script><script src="tq-tab.js"></script>
 */
(function () {
  "use strict";
  var tokens = window.TQ_TOKENS;
  if (!tokens) return;
  var c = tokens.color,
    s = tokens.spacing,
    t = tokens.typography;

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function getTypographyCSS(name) {
    var typo = t[name] || t["body-two-normal-bold"];
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

  var sizeSpec = {
    small: { height: 40, typo: "body-two-normal-bold" },
    medium: { height: 48, typo: "headline-two-bold" },
    large: { height: 56, typo: "heading-two-bold" },
  };

  class TqTabElement extends HTMLElement {
    static get tagName() {
      return "tq-tab";
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._selectedIndex = 0;
    }
    connectedCallback() {
      this._parseItems();
      this._parseSelectedIndex();
      this._render();
      this._attachListeners();
    }
    disconnectedCallback() {
      this._detachListeners();
    }
    static get observedAttributes() {
      return ["items", "selected-index", "size", "resize", "padding"];
    }
    attributeChangedCallback(name) {
      if (
        name === "items" ||
        name === "selected-index" ||
        name === "size" ||
        name === "resize" ||
        name === "padding"
      ) {
        if (name === "items") this._parseItems();
        if (name === "selected-index") this._parseSelectedIndex();
        this._render();
      }
    }
    _parseItems() {
      try {
        var val = this.getAttribute("items");
        this._items = val ? JSON.parse(val) : [];
        if (!Array.isArray(this._items)) this._items = [];
      } catch (e) {
        this._items = [];
      }
    }
    _parseSelectedIndex() {
      var items = this._items || [];
      var val = this.getAttribute("selected-index");
      if (val !== null && val !== undefined && val !== "") {
        var idx = parseInt(val, 10);
        if (!isNaN(idx) && idx >= 0)
          this._selectedIndex = Math.min(idx, items.length - 1);
      } else {
        var found = items.findIndex(function (item) {
          return item.selected === true;
        });
        if (found >= 0) this._selectedIndex = found;
      }
      if (this._selectedIndex < 0 || items.length === 0)
        this._selectedIndex = 0;
    }
    get items() {
      return this._items || [];
    }
    set items(val) {
      this.setAttribute("items", JSON.stringify(val || []));
    }
    get selectedIndex() {
      return this._selectedIndex;
    }
    set selectedIndex(val) {
      this._selectedIndex = Math.max(0, Math.min(val, this._items.length - 1));
      this.setAttribute("selected-index", String(this._selectedIndex));
      this._render();
    }
    _attachListeners() {
      var root = this.shadowRoot;
      if (!root) return;
      this._boundClick = this._handleClick.bind(this);
      root.addEventListener("click", this._boundClick);
    }
    _detachListeners() {
      var root = this.shadowRoot;
      if (root && this._boundClick) {
        root.removeEventListener("click", this._boundClick);
      }
    }
    _handleClick(e) {
      var btn = e.target.closest(".tq-tab__item");
      if (!btn) return;
      var idx = parseInt(btn.getAttribute("data-index"), 10);
      if (isNaN(idx)) return;
      this._selectedIndex = idx;
      this.setAttribute("selected-index", String(idx));
      this._render();
      this.dispatchEvent(
        new CustomEvent("selectionchange", {
          bubbles: true,
          composed: true,
          detail: { selectedIndex: idx },
        })
      );
    }
    _render() {
      var items = this._items || [];
      var size = this.getAttribute("size") || "medium";
      var resize = this.getAttribute("resize") || "fill";
      var padding = this.hasAttribute("padding")
        ? this.getAttribute("padding") !== "false"
        : true;
      var spec = sizeSpec[size] || sizeSpec.medium;
      var labelStrong = c["semantic-label-strong"];
      var labelAssistive = c["semantic-label-assistive"];
      var lineAlt = c["semantic-line-normal-alternative"];

      var containerStyle =
        "display:flex;flex-direction:row;border:0;border-bottom:1px solid " +
        lineAlt +
        ";gap:" +
        (resize === "hug" ? s[24] : "0") +
        ";" +
        (resize === "fill" ? "justify-content:space-evenly;" : "") +
        (resize === "hug" ? "min-width:max-content;" : "") +
        (padding
          ? "padding-right:" + s[20] + ";margin-left:" + s[20] + ";"
          : "");

      var itemBaseStyle =
        "display:flex;justify-content:center;align-items:center;cursor:pointer;white-space:nowrap;position:relative;height:" +
        spec.height +
        "px;font-family:Pretendard,system-ui,sans-serif;" +
        getTypographyCSS(spec.typo) +
        "border:none;background:transparent;outline:none;";

      var itemHugStyle = "width:fit-content;";
      var itemFillStyle = "flex:1;min-width:0;";

      var html =
        '<div class="tq-tab" style="z-index:0;display:flex;width:100%;flex-direction:row;align-items:center;justify-content:space-between;">';
      html +=
        '<div class="tq-tab__scroll" style="position:relative;flex:1;min-width:0;overflow-x:auto;">';
      html += '<div class="tq-tab__container" style="' + containerStyle + '">';

      items.forEach(function (item, index) {
        var isActive = index === this._selectedIndex;
        var text = item.text || item.label || "";
        var safeText = escapeHtml(text);
        var itemStyle =
          itemBaseStyle +
          (resize === "hug" ? itemHugStyle : itemFillStyle) +
          "color:" +
          (isActive ? labelStrong : labelAssistive) +
          ";" +
          (isActive
            ? "border-bottom:2px solid " + labelStrong + ";"
            : "border-bottom:2px solid transparent;");
        html +=
          '<button type="button" class="tq-tab__item" data-index="' +
          index +
          '" style="' +
          itemStyle +
          '">' +
          safeText +
          "</button>";
      }, this);

      html += "</div>";
      html += "</div>";

      if (this.hasAttribute("trailing")) {
        html +=
          '<div class="tq-tab__trailing" style="position:relative;margin-left:' +
          s[20] +
          ';width:48px;flex-shrink:0;display:flex;align-items:center;justify-content:center;">';
        html += '<slot name="trailing"></slot>';
        html += "</div>";
      }
      html += "</div>";

      var styles =
        ".tq-tab__scroll::-webkit-scrollbar{height:4px}.tq-tab__scroll::-webkit-scrollbar-track{background:transparent}.tq-tab__scroll::-webkit-scrollbar-thumb{background:" +
        lineAlt +
        ";border-radius:2px}.tq-tab__item:hover{color:" +
        labelStrong +
        "}";

      this.shadowRoot.innerHTML = "<style>" + styles + "</style>" + html;
    }
  }

  if (typeof customElements !== "undefined" && !customElements.get("tq-tab")) {
    customElements.define("tq-tab", TqTabElement);
  }
})();
