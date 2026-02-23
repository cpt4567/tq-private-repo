/**
 * tq-thumbnail - Shadow DOM 썸네일
 * 152x114 사이즈, padding 8px
 * 사용: <script src="tokens.js"></script><script src="tq-thumbnail.js"></script>
 */
(function () {
  "use strict";
  var tokens = window.TQ_TOKENS;
  if (!tokens) return;
  var c = tokens.color,
    r = tokens.radius,
    t = tokens.typography;

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function getTypographyCSS(name) {
    var typo = t[name] || t["caption-one-normal-medium"];
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

  class TqThumbnailElement extends HTMLElement {
    static get tagName() {
      return "tq-thumbnail";
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    static get observedAttributes() {
      return ["title", "description", "image"];
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }
    _render() {
      var title = this.getAttribute("title") || "";
      var description = this.getAttribute("description") || "";
      var image = this.getAttribute("image") || this.getAttribute("src") || "";

      var bgColor = c["atomic-cool-gray-22"] || "#2e2f33";
      var textColor = c["semantic-static-white"] || "#ffffff";
      var radius = r[8] || "8px";

      var html = '<div class="tq-thumbnail">';
      if (image) {
        var safeUrl = image.replace(/"/g, "&quot;").replace(/</g, "&lt;");
        html +=
          '<div class="tq-thumbnail__bg"><img src="' +
          safeUrl +
          '" alt="" /></div>';
      }
      html += '<div class="tq-thumbnail__content">';
      if (title) {
        html += '<div class="tq-thumbnail__title">' + escapeHtml(title) + "</div>";
      }
      if (description) {
        html +=
          '<div class="tq-thumbnail__desc">' +
          escapeHtml(description) +
          "</div>";
      }
      html += "</div></div>";

      var styles =
        ":host{display:inline-block;width:152px;height:114px}" +
        ".tq-thumbnail{position:relative;width:152px;height:114px;padding:8px;box-sizing:border-box;background:" +
        bgColor +
        ";border-radius:" +
        radius +
        ";overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;font-family:Pretendard,system-ui,sans-serif}" +
        ".tq-thumbnail__bg{position:absolute;inset:0;z-index:0}.tq-thumbnail__bg img{width:100%;height:100%;object-fit:cover}" +
        ".tq-thumbnail__content{position:relative;z-index:1}" +
        ".tq-thumbnail__title{" +
        getTypographyCSS("caption-two-bold") +
        "color:" +
        textColor +
        ";margin-bottom:4px}" +
        ".tq-thumbnail__desc{" +
        getTypographyCSS("label-one-normal-bold") +
        "color:" +
        textColor +
        ";word-break:keep-all}";

      this.shadowRoot.innerHTML = "<style>" + styles + "</style>" + html;
    }
    connectedCallback() {
      this._render();
    }
  }

  if (
    typeof customElements !== "undefined" &&
    !customElements.get("tq-thumbnail")
  ) {
    customElements.define("tq-thumbnail", TqThumbnailElement);
  }
})();
