/**
 * tq-banner-carousel - Shadow DOM 이미지 배너 캐러셀
 * Swiper 사용, 이미지 URL만 전달
 * 사용: <script src="tokens.js"></script><script src="tq-banner-carousel.js"></script>
 * images: JSON 배열 ["url1","url2"] 또는 쉼표구분 "url1,url2,url3"
 */
(function () {
  "use strict";
  var SWIPER_CDN =
    "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";

  function loadSwiper(callback) {
    if (window.Swiper) {
      callback(window.Swiper);
      return;
    }
    var script = document.createElement("script");
    script.src = SWIPER_CDN;
    script.onload = function () {
      callback(window.Swiper);
    };
    script.onerror = function () {
      console.error("tq-banner-carousel: Swiper 로드 실패");
    };
    document.head.appendChild(script);
  }

  function init() {
    var tokens = window.TQ_TOKENS;
    if (!tokens) return;

    var c = tokens.color;
    var s = tokens.spacing;

    var white = c["semantic-static-white"] || "#ffffff";
    var badgeBg = "rgba(0,0,0,0.35)";

    function escapeUrl(url) {
      return String(url || "")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;");
    }

    function buildSlideHtml(src) {
      var safe = escapeUrl(src);
      return (
        '<div class="tq-banner-slide swiper-slide">' +
        '<img class="tq-banner-slide__img" src="' +
        safe +
        '" alt="" />' +
        "</div>"
      );
    }

    class TqBannerCarouselElement extends HTMLElement {
      static get tagName() {
        return "tq-banner-carousel";
      }
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._swiper = null;
        this._currentIndex = 0;
      }
      connectedCallback() {
        this._parseSlides();
        this._render();
        this._initSwiper();
      }
      disconnectedCallback() {
        if (this._swiper) {
          this._swiper.destroy(true, true);
          this._swiper = null;
        }
      }
      static get observedAttributes() {
        return ["images", "height", "autoplay", "loop"];
      }
      attributeChangedCallback(name) {
        if (name === "images") {
          this._parseSlides();
          this._render();
          if (this._swiper) {
            this._swiper.destroy(true, true);
            this._initSwiper();
          }
        } else if (name === "height") {
          this._render();
          if (this._swiper) this._swiper.update();
        }
      }
      _parseSlides() {
        var val = this.getAttribute("images");
        if (!val) {
          this._slides = [];
          return;
        }
        if (val.indexOf("[") === 0) {
          try {
            var arr = JSON.parse(val);
            this._slides = Array.isArray(arr)
              ? arr.map(function (item) {
                  return typeof item === "string"
                    ? item
                    : item.src || item.url || item.image || "";
                })
              : [];
          } catch (e) {
            this._slides = [];
          }
        } else {
          this._slides = val
            .split(",")
            .map(function (s) {
              return s.trim();
            })
            .filter(Boolean);
        }
      }
      _render() {
        var slides = this._slides || [];
        var html = "";
        var heightVal = this.getAttribute("height") || "";
        var heightStyle = heightVal
          ? "height:" +
            (/\d$/.test(heightVal) ? heightVal + "px" : heightVal) +
            ";"
          : "";
        var aspectStyle = heightVal ? "" : "aspect-ratio:400/120;";

        var swiperCss =
          ".tq-banner-carousel{width:100%;overflow:hidden;background:#f7f7f8;" +
          aspectStyle +
          heightStyle +
          "}.swiper{overflow:hidden;position:relative;width:100%;height:100%}.swiper-wrapper{display:flex;transition-property:transform;box-sizing:content-box;height:100%}.swiper-slide{flex-shrink:0;width:100%;height:100%;position:relative;transition-property:transform;box-sizing:border-box}.tq-banner-slide{width:100%;height:100%}.tq-banner-slide__img{width:100%;height:100%;object-fit:fill;display:block}";

        var slideHtml = slides.map(buildSlideHtml).join("");
        html += '<div class="tq-banner-carousel">';
        html += '<div class="swiper tq-banner-swiper">';
        html += '<div class="swiper-wrapper">' + slideHtml + "</div>";
        html +=
          '<div class="tq-banner-pagination" style="position:absolute;bottom:' +
          s[12] +
          ";right:" +
          s[16] +
          ";display:flex;align-items:center;gap:" +
          s[8] +
          ';pointer-events:none;">';
        html +=
          '<span class="tq-banner-tent" style="color:' +
          white +
          ';opacity:0.9;">' +
          "</span>";
        html +=
          '<span class="tq-banner-counter" style="background:' +
          badgeBg +
          ";color:" +
          white +
          ";padding:" +
          s[4] +
          " " +
          s[8] +
          ';border-radius:999px;font-size:12px;font-weight:600;">';
        html +=
          '<span class="tq-banner-current">1</span>/<span class="tq-banner-total">' +
          slides.length +
          "</span>";
        html += "</span>";
        html += "</div>";
        html += "</div>";
        html += "</div>";

        this.shadowRoot.innerHTML = "<style>" + swiperCss + "</style>" + html;
      }
      _initSwiper() {
        var slides = this._slides || [];
        if (slides.length === 0) return;

        var container = this.shadowRoot.querySelector(".swiper");
        if (!container) return;

        var self = this;

        this._swiper = new window.Swiper(container, {
          slidesPerView: 1,
          spaceBetween: 0,
          loop: this.hasAttribute("loop"),
          autoplay: this.hasAttribute("autoplay")
            ? { delay: 3000, disableOnInteraction: false }
            : false,
          on: {
            slideChange: function (sw) {
              self._currentIndex = sw.realIndex;
              self._updateCounter();
              self.dispatchEvent(
                new CustomEvent("slidechange", {
                  bubbles: true,
                  composed: true,
                  detail: { index: self._currentIndex, total: slides.length },
                })
              );
            },
          },
        });

        this._updateCounter();
      }
      _updateCounter() {
        var total = this._slides ? this._slides.length : 0;
        var current = total > 0 ? (this._currentIndex % total) + 1 : 0;
        var curEl = this.shadowRoot.querySelector(".tq-banner-current");
        var totalEl = this.shadowRoot.querySelector(".tq-banner-total");
        if (curEl) curEl.textContent = String(current);
        if (totalEl) totalEl.textContent = String(total);
      }
    }

    function register() {
      if (
        typeof customElements !== "undefined" &&
        !customElements.get("tq-banner-carousel")
      ) {
        customElements.define("tq-banner-carousel", TqBannerCarouselElement);
      }
    }
    register();
  }

  loadSwiper(function () {
    if (!window.TQ_TOKENS) return;
    init();
  });
})();
