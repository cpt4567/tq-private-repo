/**
 * tq-bottom-sheet - Shadow DOM 바텀시트
 * 사용: <script src="tokens.js"></script><script src="tq-bottom-sheet.js"></script>
 * <tq-bottom-sheet>
 *   <button slot="trigger">열기</button>
 *   <div slot="content">내용</div>
 * </tq-bottom-sheet>
 */
(function () {
  "use strict";
  var tokens = window.TQ_TOKENS;
  var c = (tokens && tokens.color) || {
    "semantic-static-white": "#ffffff",
    "semantic-background-normal-normal": "#ffffff",
    "semantic-line-normal-gray": "#70737c29",
    "semantic-label-normal": "#171719",
    "semantic-label-strong": "#000000",
  };
  var s = (tokens && tokens.spacing) || {
    7: "7px",
    12: "12px",
    16: "16px",
    20: "20px",
    32: "32px",
  };
  var r = (tokens && tokens.radius) || { 20: "20px" };

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  class TqBottomSheetElement extends HTMLElement {
    static get tagName() {
      return "tq-bottom-sheet";
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._open = false;
      this._boundBackdropClick = this._handleBackdropClick.bind(this);
      this._boundCloseClick = this._handleCloseClick.bind(this);
    }
    connectedCallback() {
      this._render();
      this._attachTrigger();
    }
    disconnectedCallback() {
      this._detachListeners();
    }
    static get observedAttributes() {
      return [
        "open",
        "resize",
        "fixed-height",
        "show-close",
        "dismissable",
        "heading",
      ];
    }
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === "open") {
        this._open = this.hasAttribute("open");
        this._updateVisibility();
      } else if (
        (name === "resize" || name === "fixed-height") &&
        this.shadowRoot
      ) {
        this._updateSheetStyle();
      } else if (name === "heading" && this.shadowRoot) {
        this._render();
      }
    }
    get open() {
      return this.hasAttribute("open");
    }
    set open(val) {
      if (val) {
        this.setAttribute("open", "");
      } else {
        this.removeAttribute("open");
      }
    }
    _render() {
      var resize = this.getAttribute("resize") || "hug";
      var fixedHeight = this.getAttribute("fixed-height") || "";
      var showClose = this.hasAttribute("show-close");
      var heading = this.getAttribute("heading") || "";
      var dismissable =
        !this.hasAttribute("dismissable") ||
        this.getAttribute("dismissable") !== "false";

      var sheetHeightStyle = "";
      if (resize === "fill") {
        sheetHeightStyle = "height:95%;max-height:95vh;";
      } else if (resize === "fixed" && fixedHeight) {
        sheetHeightStyle =
          "height:" + escapeHtml(fixedHeight) + ";max-height:95vh;";
      } else if (resize === "hug") {
        sheetHeightStyle = "height:fit-content;max-height:95vh;";
      } else {
        sheetHeightStyle = "max-height:95vh;";
      }

      var white = c["semantic-static-white"] || "#ffffff";
      var bgNormal = c["semantic-background-normal-normal"] || white;
      var lineGray = c["semantic-line-normal-gray"] || "#70737c29";
      var labelStrong = c["semantic-label-strong"] || "#000000";

      var closeSvg =
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      var closeBtnHtml = showClose
        ? '<button type="button" class="tq-bottom-sheet__close" aria-label="닫기" style="color:' +
          (c["semantic-label-normal"] || "#171719") +
          '">' +
          closeSvg +
          "</button>"
        : "";

      var titleHtml = heading
        ? '<span class="tq-bottom-sheet__title" aria-label="타이틀">' +
          escapeHtml(heading) +
          "</span>"
        : "";

      var styles =
        ".tq-bottom-sheet{display:contents}" +
        ".tq-bottom-sheet__overlay{position:fixed;inset:0;z-index:60;background:rgba(0,0,0,0.5);opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease;touch-action:none}" +
        ".tq-bottom-sheet__overlay[data-open]{opacity:1;visibility:visible}" +
        ".tq-bottom-sheet__panel{position:fixed;bottom:0;left:0;right:0;margin:0 auto;max-width:640px;transform:translateY(100%);background:" +
        white +
        ";border-radius:" +
        (r[20] || "20px") +
        " " +
        (r[20] || "20px") +
        " 0 0;overflow:hidden;box-shadow:0 -4px 20px rgba(0,0,0,0.15);z-index:61;display:flex;flex-direction:column;transition:transform .3s cubic-bezier(0.32,0.72,0,1)}" +
        ".tq-bottom-sheet__panel[data-open]{transform:translateY(0)}" +
        ".tq-bottom-sheet__nav{display:flex;align-items:center;justify-content:space-between;border-bottom:0.5px solid " +
        lineGray +
        ";border-radius:" +
        (r[20] || "20px") +
        " " +
        (r[20] || "20px") +
        " 0 0;padding:" +
        s[20] +
        " " +
        s[16] +
        ";background:" +
        bgNormal +
        ";flex-shrink:0;min-height:28px;position:relative}" +
        ".tq-bottom-sheet__title{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:17px;font-weight:700;color:" +
        labelStrong +
        ";text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90%;pointer-events:none}" +
        ".tq-bottom-sheet__close{position:absolute;right:" +
        s[16] +
        ";top:50%;transform:translateY(-50%);width:40px;height:40px;border:none;background:transparent;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;flex-shrink:0;z-index:1}" +
        ".tq-bottom-sheet__close:hover{opacity:0.7}" +
        ".tq-bottom-sheet__body{flex:1;min-height:0;overflow-y:auto;padding:" +
        s[20] +
        " " +
        s[32] +
        ";font-family:Pretendard,system-ui,sans-serif}";

      var hasNav = heading || showClose;
      var navHtml = hasNav
        ? '<div class="tq-bottom-sheet__nav">' +
          titleHtml +
          closeBtnHtml +
          "</div>"
        : "";

      var html =
        '<div class="tq-bottom-sheet">' +
        '<div class="tq-bottom-sheet__overlay" data-open id="overlay" role="presentation"></div>' +
        '<div class="tq-bottom-sheet__panel" data-open id="panel" style="' +
        sheetHeightStyle +
        '">' +
        navHtml +
        '<div class="tq-bottom-sheet__body"><slot name="content"></slot></div>' +
        "</div>" +
        '<slot name="trigger"></slot>' +
        "</div>";

      this.shadowRoot.innerHTML = "<style>" + styles + "</style>" + html;

      this._overlay = this.shadowRoot.getElementById("overlay");
      this._panel = this.shadowRoot.getElementById("panel");
      this._open = this.hasAttribute("open");
      this._updateVisibility();
      this._attachListeners();
    }
    _updateVisibility() {
      if (!this._overlay || !this._panel) return;
      if (this._open) {
        this._overlay.setAttribute("data-open", "");
        this._panel.setAttribute("data-open", "");
        document.body.style.overflow = "hidden";
      } else {
        this._overlay.removeAttribute("data-open");
        this._panel.removeAttribute("data-open");
        document.body.style.overflow = "";
      }
    }
    _updateSheetStyle() {
      var panel = this._panel;
      if (!panel) return;
      var resize = this.getAttribute("resize") || "hug";
      var fixedHeight = this.getAttribute("fixed-height") || "";
      var style = "";
      if (resize === "fill") {
        style = "height:95%;max-height:95vh;";
      } else if (resize === "fixed" && fixedHeight) {
        style = "height:" + escapeHtml(fixedHeight) + ";max-height:95vh;";
      } else if (resize === "hug") {
        style = "height:fit-content;max-height:95vh;";
      }
      if (style) panel.setAttribute("style", style);
    }
    _attachTrigger() {
      var self = this;
      var triggerSlot = this.shadowRoot.querySelector('slot[name="trigger"]');
      if (!triggerSlot) return;
      function attachToSlot() {
        var nodes = triggerSlot.assignedNodes();
        var trigger = nodes.find(function (n) {
          return n.nodeType === Node.ELEMENT_NODE;
        });
        if (trigger && trigger.addEventListener && !trigger._tqSheetBound) {
          trigger._tqSheetBound = true;
          trigger.addEventListener(
            "click",
            self._handleTriggerClick.bind(self)
          );
        }
      }
      attachToSlot();
      triggerSlot.addEventListener("slotchange", attachToSlot);
    }
    _handleTriggerClick() {
      this.open = true;
      this.dispatchEvent(
        new CustomEvent("sheetopen", { bubbles: true, composed: true })
      );
    }
    _attachListeners() {
      if (!this._overlay) return;
      var dismissable =
        !this.hasAttribute("dismissable") ||
        this.getAttribute("dismissable") !== "false";
      if (dismissable) {
        this._overlay.addEventListener("click", this._boundBackdropClick);
      }
      var closeBtn = this.shadowRoot.querySelector(".tq-bottom-sheet__close");
      if (closeBtn) {
        closeBtn.addEventListener("click", this._boundCloseClick);
      }
    }
    _detachListeners() {
      if (this._overlay) {
        this._overlay.removeEventListener("click", this._boundBackdropClick);
      }
      var closeBtn = this.shadowRoot.querySelector(".tq-bottom-sheet__close");
      if (closeBtn) {
        closeBtn.removeEventListener("click", this._boundCloseClick);
      }
      document.body.style.overflow = "";
    }
    _handleBackdropClick(e) {
      if (e.target === this._overlay) {
        this._close();
      }
    }
    _handleCloseClick() {
      this._close();
    }
    _close() {
      this.open = false;
      this.dispatchEvent(
        new CustomEvent("sheetclose", { bubbles: true, composed: true })
      );
    }
  }

  if (
    typeof customElements !== "undefined" &&
    !customElements.get("tq-bottom-sheet")
  ) {
    customElements.define("tq-bottom-sheet", TqBottomSheetElement);
  }
})();
