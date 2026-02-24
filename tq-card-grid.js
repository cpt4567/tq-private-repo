/**
 * tq-card-grid - 그리드 스와이퍼 (2행 + 가로 스와이프)
 * Swiper Grid 모드. tq-thumbnail(152x114) 등 고정 크기 카드용.
 * 사용: <script src="tq-card-swiper.js"></script><script src="tq-card-grid.js"></script>
 * <tq-card-grid rows="2" space-between="12">
 *   <tq-thumbnail ...></tq-thumbnail>
 *   ...
 * </tq-card-grid>
 */
(function () {
  "use strict";

  var SWIPER_CDN = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
  var SWIPER_CSS = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";

  var pendingInits = [];
  var swiperLoading = false;

  function loadSwiper(callback) {
    if (window.__TQ_LOAD_SWIPER) {
      window.__TQ_LOAD_SWIPER(callback);
      return;
    }
    if (window.Swiper) {
      callback(window.Swiper);
      return;
    }
    pendingInits.push(callback);
    if (swiperLoading) return;
    swiperLoading = true;

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = SWIPER_CSS;
    document.head.appendChild(link);

    var script = document.createElement("script");
    script.src = SWIPER_CDN;
    script.onload = function () {
      swiperLoading = false;
      var list = pendingInits.splice(0, pendingInits.length);
      list.forEach(function (cb) {
        cb(window.Swiper);
      });
    };
    script.onerror = function () {
      swiperLoading = false;
      pendingInits.length = 0;
      console.error("tq-card-grid: Swiper 로드 실패");
    };
    document.head.appendChild(script);
  }

  var style = document.createElement("style");
  style.textContent =
    "tq-card-grid{display:block;width:100%;min-width:0;overflow:hidden}.tq-card-grid .swiper{overflow:hidden;width:100%;padding:8px 0}.tq-card-grid .swiper-wrapper{display:flex;flex-wrap:wrap;flex-direction:row;transition-property:transform;will-change:transform}.tq-card-grid .swiper-slide{flex:0 0 auto;width:152px;height:114px;box-sizing:border-box}";
  document.head.appendChild(style);

  function whenReady(element, fn) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        fn(element);
      });
    });
  }

  function runBuild(element) {
    element._build();
    if (element.querySelector(".swiper")) {
      loadSwiper(function () {
        whenReady(element, element._initSwiper.bind(element));
      });
    }
  }

  class TqCardGridElement extends HTMLElement {
    static get tagName() {
      return "tq-card-grid";
    }
    constructor() {
      super();
      this._swiper = null;
    }
    connectedCallback() {
      var self = this;
      queueMicrotask(function () {
        if (self.children.length > 0) {
          runBuild(self);
        } else {
          setTimeout(function () {
            runBuild(self);
          }, 0);
        }
      });
    }
    disconnectedCallback() {
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

      var rows = parseInt(this.getAttribute("rows") || "2", 10);
      var gap = parseInt(this.getAttribute("space-between") || "12", 10);
      var colSize = parseInt(this.getAttribute("col-size") || "152", 10);
      var rowSize = parseInt(this.getAttribute("row-size") || "114", 10);

      var wrapper = document.createElement("div");
      wrapper.className = "swiper-wrapper tq-card-grid__wrapper";

      for (var i = 0; i < children.length; i++) {
        var slide = document.createElement("div");
        slide.className = "swiper-slide tq-card-grid__slide";
        slide.style.width = colSize + "px";
        slide.style.height = rowSize + "px";
        slide.appendChild(children[i]);
        wrapper.appendChild(slide);
      }

      var container = document.createElement("div");
      container.className = "swiper swiper-grid tq-card-grid";
      container.style.height = rows * rowSize + (rows - 1) * gap + "px";
      container.appendChild(wrapper);
      this.appendChild(container);
    }
    _initSwiper() {
      var container = this.querySelector(".swiper");
      if (!container || this._swiper) return;
      if (container.offsetWidth === 0) {
        whenReady(this, this._initSwiper.bind(this));
        return;
      }

      var spaceBetween = parseInt(this.getAttribute("space-between") || "12", 10);
      var rows = parseInt(this.getAttribute("rows") || "2", 10);

      this._swiper = new window.Swiper(container, {
        direction: "horizontal",
        slidesPerView: "auto",
        spaceBetween: spaceBetween,
        grid: { rows: rows, fill: "row" },
        centeredSlides: false,
        freeMode: false,
        grabCursor: true,
        resistance: true,
        resistanceRatio: 0.85,
      });

      var swiper = this._swiper;
      requestAnimationFrame(function () {
        if (swiper && !swiper.destroyed) {
          swiper.update();
        }
      });
    }
  }

  if (
    typeof customElements !== "undefined" &&
    !customElements.get("tq-card-grid")
  ) {
    customElements.define("tq-card-grid", TqCardGridElement);
  }
})();
