/**
 * tq-camp-list-card - Shadow DOM 캠핑장 리스트 카드
 * 좌측 텍스트(순번/이름/주소/가격) + 우측 92x92 이미지
 * tq-camp-card 색상·사이즈 참고
 * 사용: <script src="tokens.js"></script><script src="tq-camp-list-card.js"></script>
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

  class TqCampListCardElement extends HTMLElement {
    static get tagName() {
      return "tq-camp-list-card";
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    static get observedAttributes() {
      return [
        "order",
        "name",
        "address",
        "count",
        "discount",
        "price",
        "image",
      ];
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }
    _render() {
      var order = this.getAttribute("order") || "";
      var name = this.getAttribute("name") || "";
      var address = this.getAttribute("address") || "";
      var count = this.getAttribute("count") || "";
      var discount = this.getAttribute("discount") || "";
      var price = this.getAttribute("price") || "";
      var image = this.getAttribute("image") || this.getAttribute("src") || "";

      var placeholderBg = "#F8F0EF";
      var labelColor = c["semantic-label-normal"] || "#171719";
      var labelAlt = "#37383C9C";
      var orange = c["semantic-primary-normal"] || "#ff4802";
      var white = c["semantic-background-normal-normal"] || "#ffffff";
      var imgBorderColor = c["semantic-line-solid-normal"] || "#e1e2e4";

      var nameTypo = t["label-one-normal-bold"] || t["label-one-normal-medium"];
      var priceTypo = t["body-two-normal-bold"];
      var discountTypo = t["body-two-normal-bold"];

      var html = '<div class="tq-camp-list-card">';
      html += '<div class="tq-camp-list-card__body">';
      if (order) {
        html +=
          '<span class="tq-camp-list-card__order">' +
          escapeHtml(order) +
          "</span>";
      }
      html += '<div class="tq-camp-list-card__text">';
      if (name) {
        html +=
          '<div class="tq-camp-list-card__name">' +
          escapeHtml(name) +
          "</div>";
      }
      if (address) {
        html +=
          '<div class="tq-camp-list-card__address">' +
          escapeHtml(address) +
          "</div>";
      }
      if (count) {
        html +=
          '<div class="tq-camp-list-card__count">' +
          escapeHtml(count) +
          "</div>";
      }
      if (discount || price) {
        html += '<div class="tq-camp-list-card__price-row">';
        if (discount) {
          html +=
            '<span class="tq-camp-list-card__discount">' +
            escapeHtml(discount) +
            "%</span>";
        }
        if (price) {
          html +=
            '<span class="tq-camp-list-card__price">' +
            escapeHtml(price) +
            "</span>";
        }
        html += "</div>";
      }
      html += "</div></div>";

      html += '<div class="tq-camp-list-card__img-wrap">';
      if (image) {
        var safeUrl = image.replace(/"/g, "&quot;").replace(/</g, "&lt;");
        html +=
          '<img class="tq-camp-list-card__img" src="' +
          safeUrl +
          '" alt="" />';
      } else {
        html += '<div class="tq-camp-list-card__placeholder">';
        html +=
          '<svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 16L8 10L14 16L22 8L30 16V20H2V16Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="8" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>';
        html += "</div>";
      }
      html += "</div>";
      html += "</div>";

      var styles =
        ":host{display:block;min-width:0}" +
        ".tq-camp-list-card{display:flex;align-items:stretch;gap:" +
        s[8] +
        ";padding:12px " +
        s[12] +
        ";background:" +
        white +
        ";font-family:Pretendard,system-ui,sans-serif;min-height:92px;box-sizing:border-box}" +
        ".tq-camp-list-card__body{flex:1;min-width:0;display:flex;gap:0;text-align:left}" +
        ".tq-camp-list-card__order{flex-shrink:0;font-size:50px;font-weight:700;line-height:150%;color:" +
        labelColor +
        "}" +
        ".tq-camp-list-card__text{flex:1;min-width:0;display:flex;flex-direction:column;gap:" +
        s[4] +
        ";justify-content:center;padding-left:" +
        s[16] +
        ";padding-right:" +
        s[8] +
        "}" +
        ".tq-camp-list-card__name{color:" +
        labelColor +
        ";" +
        getTypographyCSS("label-one-normal-bold") +
        "}" +
        ".tq-camp-list-card__address{color:" +
        labelAlt +
        ";" +
        getTypographyCSS("caption-one-medium") +
        "}" +
        ".tq-camp-list-card__count{color:" +
        labelAlt +
        ";" +
        getTypographyCSS("caption-one-medium") +
        "}" +
        ".tq-camp-list-card__price-row{display:flex;align-items:baseline;gap:" +
        s[4] +
        ";flex-wrap:wrap}" +
        ".tq-camp-list-card__discount{color:" +
        orange +
        ";font-size:" +
        discountTypo.fontSize +
        ";font-weight:" +
        discountTypo.fontWeight +
        ";line-height:" +
        discountTypo.lineHeight +
        "}" +
        ".tq-camp-list-card__price{color:" +
        labelColor +
        ";font-size:" +
        priceTypo.fontSize +
        ";font-weight:" +
        priceTypo.fontWeight +
        ";line-height:" +
        priceTypo.lineHeight +
        "}" +
        ".tq-camp-list-card__img-wrap{flex-shrink:0;width:92px;height:92px;overflow:hidden;background:" +
        placeholderBg +
        ";border:1px solid " +
        imgBorderColor +
        ";border-radius:" +
        r[8] +
        "}" +
        ".tq-camp-list-card__img{width:100%;height:100%;object-fit:cover;display:block}" +
        ".tq-camp-list-card__placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:" +
        labelAlt +
        "}";

      this.shadowRoot.innerHTML = "<style>" + styles + "</style>" + html;
    }
    connectedCallback() {
      this._render();
    }
  }

  if (
    typeof customElements !== "undefined" &&
    !customElements.get("tq-camp-list-card")
  ) {
    customElements.define("tq-camp-list-card", TqCampListCardElement);
  }
})();
