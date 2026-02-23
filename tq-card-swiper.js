/**
 * tq-card-swiper - Swiper 래퍼 (카드/썸네일 가로 스크롤)
 * 자식 요소를 swiper-slide로 감싸서 다닥다닥 붙게 출력
 * 사용: <script src="tq-card-swiper.js"></script>
 * <tq-card-swiper space-between="12">
 *   <tq-camp-card ...></tq-camp-card>
 *   <tq-accommodation-card ...></tq-accommodation-card>
 *   <tq-thumbnail ...></tq-thumbnail>
 * </tq-card-swiper>
 */
(function () {
  "use strict";
  var SWIPER_CDN =
    "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
  var SWIPER_CSS =
    "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";

  function loadSwiper(callback) {
    function run() {
      requestAnimationFrame(function () {
        callback(window.Swiper);
      });
    }
    if (window.Swiper) {
      run();
      return;
    }
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = SWIPER_CSS;
    document.head.appendChild(link);

    var script = document.createElement("script");
    script.src = SWIPER_CDN;
    script.onload = run;
    script.onerror = function () {
      console.error("tq-card-swiper: Swiper 로드 실패");
    };
    document.head.appendChild(script);
  }

  class TqCardSwiperElement extends HTMLElement {
    static get tagName() {
      return "tq-card-swiper";
    }
    constructor() {
      super();
      this._swiper = null;
      this._resizeObserver = null;
    }
    connectedCallback() {
      var self = this;
      setTimeout(function () {
        self._build();
        if (self.querySelector(".swiper")) {
          loadSwiper(function () {
            self._initSwiper();
          });
        }
      }, 0);
    }
    disconnectedCallback() {
      if (this._resizeObserver && this._swiper) {
        this._resizeObserver.disconnect();
        this._resizeObserver = null;
      }
      if (this._swiper) {
        this._swiper.destroy(true, true);
        this._swiper = null;
      }
    }
    _build() {
      if (this.querySelector(".swiper")) return;
      var children = Array.from(this.children).filter(function (el) {
        return el.tagName !== "STYLE";
      });
      if (children.length === 0) return;

      var gridRows = parseInt(this.getAttribute("grid-rows") || "0", 10);
      if (gridRows > 1) this.classList.add("tq-card-swiper--grid");

      var wrapper = document.createElement("div");
      wrapper.className = "swiper-wrapper tq-card-swiper__wrapper";

      for (var i = 0; i < children.length; i++) {
        var slide = document.createElement("div");
        slide.className = "swiper-slide tq-card-swiper__slide";
        slide.appendChild(children[i]);
        wrapper.appendChild(slide);
      }

      var container = document.createElement("div");
      container.className = "swiper tq-card-swiper";
      container.appendChild(wrapper);

      this.appendChild(container);

      var style = document.createElement("style");
      style.textContent =
        "tq-card-swiper{display:block;width:100%;min-width:0}.tq-card-swiper .swiper{overflow:hidden;width:100%;padding:8px 0}.tq-card-swiper:not(.tq-card-swiper--grid) .swiper-wrapper{display:flex;transition-property:transform;will-change:transform;justify-content:flex-start!important}.tq-card-swiper:not(.tq-card-swiper--grid) .swiper-slide{flex-shrink:0;width:auto}.tq-card-swiper .swiper-slide{height:auto;box-sizing:border-box}.tq-card-swiper--grid .swiper-slide{height:auto}";
      this.insertBefore(style, container);
    }
    _initSwiper() {
      var container = this.querySelector(".swiper");
      if (!container) return;

      var spaceBetween = parseInt(this.getAttribute("space-between") || "12", 10);
      var gridRows = parseInt(this.getAttribute("grid-rows") || "0", 10);
      
      var slideWidth = parseInt(this.getAttribute("slide-width") || "152", 10);
      var slideHeight = parseInt(this.getAttribute("slide-height") || "500", 10);
      
      var opts = {
        spaceBetween: spaceBetween,
        centeredSlides: false,
        freeMode: false,
        grabCursor: true,
        resistance: true,
        resistanceRatio: 0.85,
        ...(slideWidth && { width: slideWidth }),
        ...(slideHeight && { height: slideHeight }),
      };

      if (gridRows > 1) {
        opts.grid = { rows: gridRows, fill: "row" };
      } else {
        opts.slidesPerView = "auto";
      }

      this._swiper = new window.Swiper(container, opts);

    
    }
  }

  if (
    typeof customElements !== "undefined" &&
    !customElements.get("tq-card-swiper")
  ) {
    customElements.define("tq-card-swiper", TqCardSwiperElement);
  }
})();
