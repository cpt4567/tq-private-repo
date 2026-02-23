/**
 * tq-camp-card - Shadow DOM 캠핑장 카드
 * 그라데이션 배경, 가격/할인/태그 표시
 * 사용: <script src="tokens.js"></script><script src="tq-camp-card.js"></script>
 */
(function () {
  "use strict";
  var tokens = window.TQ_TOKENS;
  if (!tokens) return;
  var c = tokens.color,
    s = tokens.spacing,
    r = tokens.radius,
    t = tokens.typography;

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  class TqCampCardElement extends HTMLElement {
    static get tagName() {
      return "tq-camp-card";
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      var name = this.getAttribute("name") || "";
      var price = this.getAttribute("price") || "";
      var discount = this.getAttribute("discount") || "";
      var originalPrice = this.getAttribute("original-price") || "";
      var tag = this.getAttribute("tag") || "";
      var image = this.getAttribute("image") || this.getAttribute("src") || "";

      var gradient =
        "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)";

      var shadowStyle =
        "0 2px 8px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)";

      var nameTypo =
        t["label-one-normal-medium"] || t["body-two-normal-medium"];
      var priceTypo = t["label-two-regular"] || t["label-two-medium"];
      var discountTypo = t["body-two-normal-bold"];
      var originalTypo = t["body-two-normal-bold"];
      var tagTypo = t["caption-two-medium"] || t["caption-one-medium"];

      var white = c["semantic-static-white"];
      var orange = c["semantic-primary-normal"];

      var safeUrl = image
        ? image.replace(/"/g, "&quot;").replace(/</g, "&lt;")
        : "";
      var bgHtml = image
        ? '<img class="tq-camp-card__img" src="' + safeUrl + '" alt="" />'
        : '<div class="tq-camp-card__bg"></div>';

      var html = '<div class="tq-camp-card__bg-wrap">' + bgHtml + "</div>";
      html +=
        '<div class="tq-camp-card__gradient" style="background:' +
        gradient +
        '"></div>';
      html += '<div class="tq-camp-card__inner">';
      if (name) {
        html +=
          '<div class="tq-camp-card__name">' + escapeHtml(name) + "</div>";
      }
      if (price) {
        html +=
          '<div class="tq-camp-card__price"><span class="tq-camp-card__price-line">' +
          escapeHtml(price) +
          "</span></div>";
      }
      if (discount || originalPrice) {
        html += '<div class="tq-camp-card__row">';
        if (discount) {
          html +=
            '<span class="tq-camp-card__discount">' +
            escapeHtml(discount) +
            "%</span>";
        }
        if (originalPrice) {
          html +=
            '<span class="tq-camp-card__original">' +
            escapeHtml(originalPrice) +
            "</span>";
        }
        html += "</div>";
      }
      if (tag) {
        html += '<div class="tq-camp-card__tag">#' + escapeHtml(tag) + "</div>";
      }
      html += "</div>";

      var styles =
        ".tq-camp-card{display:block;width:240px;height:180px;border-radius:" +
        r[12] +
        ";position:relative;overflow:hidden;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease;box-shadow:" +
        shadowStyle +
        "}.tq-camp-card:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,0.16),0 8px 24px rgba(0,0,0,0.1)}.tq-camp-card__bg-wrap{position:absolute;inset:0;z-index:0;overflow:hidden}.tq-camp-card__img{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;display:block}.tq-camp-card__bg{position:absolute;inset:0;background:#2e2f33}.tq-camp-card__gradient{position:absolute;bottom:0;left:0;right:0;height:66.67%;z-index:10}.tq-camp-card__inner{position:absolute;bottom:0;left:0;right:0;display:flex;flex-direction:column;gap:" +
        s[4] +
        ";padding:" +
        s[12] +
        " " +
        s[12] +
        ";text-align:left;font-family:Pretendard,system-ui,sans-serif;justify-content:flex-end;z-index:20}.tq-camp-card__name{color:" +
        white +
        ";font-size:" +
        nameTypo.fontSize +
        ";font-weight:" +
        nameTypo.fontWeight +
        ";line-height:" +
        nameTypo.lineHeight +
        "}.tq-camp-card__price{color:" +
        white +
        ";font-size:" +
        priceTypo.fontSize +
        ";font-weight:" +
        priceTypo.fontWeight +
        ";line-height:" +
        priceTypo.lineHeight +
        ";letter-spacing:-0.02em}.tq-camp-card__price-line{text-decoration:line-through}.tq-camp-card__row{display:flex;align-items:baseline;gap:" +
        s[4] +
        ";flex-wrap:wrap}.tq-camp-card__discount{color:" +
        orange +
        ";font-size:" +
        discountTypo.fontSize +
        ";font-weight:" +
        discountTypo.fontWeight +
        ";line-height:" +
        discountTypo.lineHeight +
        "}.tq-camp-card__original{color:" +
        white +
        ";font-size:" +
        originalTypo.fontSize +
        ";font-weight:" +
        originalTypo.fontWeight +
        ";line-height:" +
        originalTypo.lineHeight +
        ";opacity:.95}.tq-camp-card__tag{color:" +
        white +
        ";font-size:" +
        tagTypo.fontSize +
        ";font-weight:" +
        tagTypo.fontWeight +
        ";line-height:" +
        tagTypo.lineHeight +
        ";opacity:.85}";

      this.shadowRoot.innerHTML =
        "<style>" +
        styles +
        '</style><div class="tq-camp-card">' +
        html +
        "</div>";
    }
  }

  if (
    typeof customElements !== "undefined" &&
    !customElements.get("tq-camp-card")
  ) {
    customElements.define("tq-camp-card", TqCampCardElement);
  }
})();
