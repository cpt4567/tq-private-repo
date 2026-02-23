/**
 * tq-accommodation-card - Shadow DOM 숙소 카드
 * 이미지(상단) + 태그/제목/가격(하단) 세로 레이아웃
 * 사용: <script src="tokens.js"></script><script src="tq-accommodation-card.js"></script>
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

  class TqAccommodationCardElement extends HTMLElement {
    static get tagName() {
      return "tq-accommodation-card";
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      var image = this.getAttribute("image") || this.getAttribute("src") || "";
      var caption =
        this.getAttribute("caption") ||
        this.getAttribute("overlay-caption") ||
        "";
      var tags = this.getAttribute("tags") || "";
      var title = this.getAttribute("title") || "";
      var price = this.getAttribute("price") || "";
      var discount = this.getAttribute("discount") || "";
      var originalPrice = this.getAttribute("original-price") || "";

      var tagList = tags
        ? tags
            .split(",")
            .map(function (t) {
              return t.trim();
            })
            .filter(Boolean)
        : [];
      var safeUrl = image
        ? image.replace(/"/g, "&quot;").replace(/</g, "&lt;")
        : "";

      var captionTypo = t["label-two-bold"] || t["label-two-medium"];
      var titleTypo = t["body-one-normal-bold"] || t["label-one-normal-bold"];
      var priceTypo = t["label-two-regular"] || t["label-two-medium"];
      var discountTypo = t["body-two-normal-bold"];
      var tagTypo = t["caption-two-medium"] || t["caption-one-medium"];

      var labelColor = c["semantic-label-normal"];
      var labelAlt = c["semantic-label-alternative"];
      var orange = c["semantic-primary-normal"];
      var tagBg = "rgba(0,189,222,0.12)";
      var tagText = c["semantic-accent-foreground-cyan"] || "#0098b2";
      var placeholderBg = "#f7f7f8";

      var gradient =
        "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 100%)";

      var html = '<div class="tq-acc-card">';

      html += '<div class="tq-acc-card__img-wrap">';
      if (image) {
        html += '<img class="tq-acc-card__img" src="' + safeUrl + '" alt="" />';
      } else {
        html += '<div class="tq-acc-card__placeholder"></div>';
      }
      html +=
        '<div class="tq-acc-card__gradient" style="background:' +
        gradient +
        '">';
      if (caption) {
        html +=
          '<span class="tq-acc-card__caption">' +
          escapeHtml(caption) +
          "</span>";
      }
      html += "</div>";
      html += "</div>";

      html += '<div class="tq-acc-card__body">';
      if (tagList.length) {
        html += '<div class="tq-acc-card__tags">';
        tagList.forEach(function (tag) {
          html +=
            '<span class="tq-acc-card__tag">' + escapeHtml(tag) + "</span>";
        });
        html += "</div>";
      }
      if (title) {
        html +=
          '<div class="tq-acc-card__title">' + escapeHtml(title) + "</div>";
      }
      if (price || discount || originalPrice) {
        html += '<div class="tq-acc-card__price-wrap">';
        if (price) {
          html +=
            '<span class="tq-acc-card__price-old">' +
            escapeHtml(price) +
            "</span>";
        }
        if (discount || originalPrice) {
          html += '<div class="tq-acc-card__price-row">';
          if (discount) {
            html +=
              '<span class="tq-acc-card__discount">' +
              escapeHtml(discount) +
              "%</span>";
          }
          if (originalPrice) {
            html +=
              '<span class="tq-acc-card__price-current">' +
              escapeHtml(originalPrice) +
              "</span>";
          }
          html += "</div>";
        }
        html += "</div>";
      }
      html += "</div>";
      html += "</div>";

      var lineColor = c["semantic-line-normal-gray"] || "#70737c29";
      var styles =
        ".tq-acc-card{display:block;width:152px;font-family:Pretendard,system-ui,sans-serif}.tq-acc-card__img-wrap{width:152px;height:114px;overflow:hidden;background:" +
        placeholderBg +
        ";border-radius:" +
        r[8] +
        ";border:1px solid " +
        lineColor +
        ";position:relative}.tq-acc-card__img{width:100%;height:100%;object-fit:fill;display:block}.tq-acc-card__placeholder{width:100%;height:100%;background:" +
        placeholderBg +
        "}.tq-acc-card__gradient{position:absolute;top:0;left:0;right:0;height:10.33%;pointer-events:none;z-index:1;border-radius:" +
        r[8] +
        " " +
        r[8] +
        " 0 0;display:flex;flex-direction:column;align-items:flex-start;padding:10px}.tq-acc-card__caption{color:#fff;font-size:" +
        captionTypo.fontSize +
        ";font-weight:" +
        captionTypo.fontWeight +
        ";line-height:" +
        captionTypo.lineHeight +
        ";white-space:pre-line}.tq-acc-card__body{margin-top:" +
        s[12] +
        ";padding:0;display:flex;flex-direction:column;gap:" +
        s[8] +
        ";text-align:left}.tq-acc-card__tags{display:flex;flex-wrap:wrap;gap:" +
        s[6] +
        "}.tq-acc-card__tag{display:inline-flex;padding:" +
        s[3] +
        " " +
        s[6] +
        ";border-radius:" +
        r[6] +
        ";background:" +
        tagBg +
        ";color:" +
        tagText +
        ";font-size:" +
        tagTypo.fontSize +
        ";font-weight:" +
        tagTypo.fontWeight +
        ";line-height:" +
        tagTypo.lineHeight +
        "}.tq-acc-card__title{color:" +
        labelColor +
        ";font-size:" +
        titleTypo.fontSize +
        ";font-weight:" +
        titleTypo.fontWeight +
        ";line-height:" +
        titleTypo.lineHeight +
        "}.tq-acc-card__price-wrap{display:flex;flex-direction:column;gap:" +
        s[3] +
        "}.tq-acc-card__price-old{color:" +
        labelAlt +
        ";font-size:" +
        priceTypo.fontSize +
        ";font-weight:" +
        priceTypo.fontWeight +
        ";text-decoration:line-through}.tq-acc-card__price-row{display:flex;align-items:baseline;gap:" +
        s[4] +
        "}.tq-acc-card__discount{color:" +
        orange +
        ";font-size:" +
        discountTypo.fontSize +
        ";font-weight:" +
        discountTypo.fontWeight +
        ";line-height:" +
        discountTypo.lineHeight +
        "}.tq-acc-card__price-current{color:" +
        labelColor +
        ";font-size:" +
        discountTypo.fontSize +
        ";font-weight:" +
        discountTypo.fontWeight +
        ";line-height:" +
        discountTypo.lineHeight +
        "}";

      this.shadowRoot.innerHTML = "<style>" + styles + "</style>" + html;
    }
  }

  if (
    typeof customElements !== "undefined" &&
    !customElements.get("tq-accommodation-card")
  ) {
    customElements.define("tq-accommodation-card", TqAccommodationCardElement);
  }
})();
