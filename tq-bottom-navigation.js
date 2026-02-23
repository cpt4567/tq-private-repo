(function () {
  "use strict";
  var tokens = window.TQ_TOKENS;
  var c = (tokens && tokens.color) || {
    "semantic-label-normal": "#171719",
    "semantic-primary-normal": "#ff4802",
    "semantic-line-normal-gray": "#70737c29",
    "semantic-static-white": "#ffffff",
    "semantic-status-negative": "#da1e28",
  };
  var s = (tokens && tokens.spacing) || { 4: "4px", 9: "9px" };
  var t = (tokens && tokens.typography) || {
    "caption-two-medium": {
      fontSize: "11px",
      fontWeight: 500,
      lineHeight: "127.3%",
    },
  };

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function getTypographyCSS(name) {
    var typo = t[name] || t["caption-two-medium"];
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

  var ICONS = {
    home: '<path d="M21.995 11.98c0 .633-.521 1.129-1.112 1.129h-1.111l.024 5.63q-.001.143-.017.286v.569c0 .777-.622 1.406-1.39 1.406h-.555q-.057 0-.115-.003-.072.004-.146.003l-1.128-.003h-.834c-.767 0-1.39-.63-1.39-1.407v-3.093c0-.622-.496-1.124-1.11-1.124h-2.223c-.615 0-1.112.502-1.112 1.124v3.093c0 .777-.621 1.407-1.389 1.407H6.446q-.078-.001-.157-.008a2 2 0 0 1-.125.008H5.61c-.768 0-1.39-.63-1.39-1.407v-3.936q-.001-.05.004-.099v-2.45H3.11A1.105 1.105 0 0 1 2 11.977c0-.316.104-.597.347-.843L11.25 3.28c.243-.246.52-.281.764-.281.243 0 .521.07.73.246l8.87 7.891c.278.246.416.527.382.844"/>',
    nearme:
      '<path d="m9.917 13.433-7.22-2.927a1 1 0 0 1-.53-.432 1.2 1.2 0 0 1-.167-.6q0-.306.181-.599t.544-.432L19.84 2.087a.97.97 0 0 1 .641-.056q.307.084.53.307t.307.53a.97.97 0 0 1-.056.64l-6.356 17.117a1.06 1.06 0 0 1-.432.544q-.292.18-.6.181-.306 0-.599-.167a1 1 0 0 1-.432-.53zm3.903 3.736 4.516-12.155L6.182 9.53l5.463 2.175z"/>',
    gift: '<path d="M11.059 3.734A3.53 3.53 0 0 0 8.023 2h-.085a3.438 3.438 0 0 0-3.063 5h-1C2.84 7 2 7.84 2 8.875v2.5a1.88 1.88 0 0 0 1.25 1.77V19.5c0 1.379 1.121 2.5 2.5 2.5h12.5c1.379 0 2.5-1.121 2.5-2.5v-6.355a1.88 1.88 0 0 0 1.25-1.77v-2.5C22 7.84 21.16 7 20.125 7h-1a3.44 3.44 0 0 0-3.062-5h-.086c-1.247 0-2.403.66-3.036 1.734L12 5.34l-.941-1.602zm9.066 5.141v2.5H13.25v-2.5h6.875m-9.375 0v2.5H3.875v-2.5h6.875m0 4.375v6.875h-5a.627.627 0 0 1-.625-.625v-6.25zm2.5 6.875V13.25h5.625v6.25a.627.627 0 0 1-.625.625zM16.063 7H13.2l1.359-2.312a1.65 1.65 0 0 1 1.418-.813h.085a1.562 1.562 0 1 1 0 3.125M10.75 7H7.938a1.562 1.562 0 1 1 0-3.125h.085c.582 0 1.125.309 1.418.813L10.801 7z"/>',
    avatar:
      '<path d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562.437-.713 1.162-1.088a14.8 14.8 0 0 1 3.15-1.163A13.8 13.8 0 0 1 12 13q1.65 0 3.25.387 1.6.388 3.15 1.163.724.375 1.163 1.087Q20 16.35 20 17.2v.8q0 .824-.587 1.413A1.93 1.93 0 0 1 18 20H6q-.824 0-1.412-.587A1.93 1.93 0 0 1 4 18"/>',
    heart:
      '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>',
    shopping:
      '<path fill-rule="evenodd" d="M13.753 9.097h5.935c1.491 0 2.607 1.695 2.242 3.466l-1.309 7.18a2.49 2.49 0 0 1-2.243 2.232H5.737a2.49 2.49 0 0 1-2.286-2.233l-1.395-7.2c-.322-1.771.794-3.467 2.285-3.467h6.44l-4.69-5.59A.88.88 0 0 1 7.443 2.41l4.872 5.741 4.293-5.74a.87.87 0 0 1 1.266-.173.89.89 0 0 1 .172 1.235zm5.183 10.334 1.31-7.18a1.51 1.51 0 0 0-.269-1.255.45.45 0 0 0-.29-.182H4.384a.45.45 0 0 0-.29.182c-.27.358-.369.818-.268 1.256l1.31 7.18c.085.504.386.793.558.793h12.684c.172 0 .472-.29.558-.794"/><path d="M12.358 12.52a.88.88 0 0 0-.88.88v3.22a.88.88 0 0 0 1.76-.011v-3.22a.88.88 0 0 0-.88-.869M7.904 13.143a.88.88 0 1 0-1.566.783l1.76 3.51c.145.298.45.486.783.482a.8.8 0 0 0 .386-.086.88.88 0 0 0 .397-1.18zM18.056 12.692a.87.87 0 0 0-1.18.397l-1.76 3.51a.88.88 0 0 0 .397 1.18c.12.059.252.088.386.085a.86.86 0 0 0 .784-.482l1.792-3.51a.88.88 0 0 0-.419-1.18"/>',
  };

  function parseActiveClassName(str) {
    if (!str || typeof str !== "string") return null;
    var fill = str.match(/fill-([a-z0-9-]+)/);
    var color = str.match(/text-([a-z0-9-]+)/);
    return {
      fill: fill ? c[fill[1]] || fill[1] : c["semantic-primary-normal"],
      color: color ? c[color[1]] || color[1] : c["semantic-primary-normal"],
    };
  }

  class TqBottomNavigationElement extends HTMLElement {
    static get tagName() {
      return "tq-bottom-navigation";
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this._parseList();
      this._render();
      this._attachListeners();
    }
    disconnectedCallback() {
      this._detachListeners();
    }
    static get observedAttributes() {
      return ["list", "active", "active-class-name"];
    }
    attributeChangedCallback(name) {
      if (name === "list") this._parseList();
      this._render();
    }
    _parseList() {
      try {
        var val = this.getAttribute("list");
        this._list = val ? JSON.parse(val) : [];
        if (!Array.isArray(this._list)) this._list = [];
      } catch (e) {
        this._list = [];
      }
    }
    get list() {
      return this._list || [];
    }
    set list(val) {
      this.setAttribute("list", JSON.stringify(val || []));
    }
    get active() {
      return this.getAttribute("active") || "";
    }
    set active(val) {
      this.setAttribute("active", String(val || ""));
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
      var btn = e.target.closest(".tq-bottom-nav__item");
      if (!btn) return;
      var label = btn.getAttribute("data-label");
      if (!label) return;
      this.active = label;
      this._render();
      this.dispatchEvent(
        new CustomEvent("activechange", {
          bubbles: true,
          composed: true,
          detail: { active: label },
        })
      );
    }
    _render() {
      var list = this._list || [];
      if (list.length === 0) {
        this.shadowRoot.innerHTML =
          "<style>:host{display:block;width:100%}</style>" +
          '<div style="padding:12px;text-align:center;color:#989ba2;font-size:12px;">list 속성을 설정해주세요</div>';
        return;
      }
      var active = this.active;
      var activeClass = this.getAttribute("active-class-name") || "";
      var activeStyle = parseActiveClassName(activeClass);
      var labelNormal = c["semantic-label-normal"];
      var bgWhite = c["semantic-static-white"];

      var captionStyle =
        "font-family:Pretendard,system-ui,sans-serif;" +
        getTypographyCSS("caption-two-medium");

      var html =
        '<div class="tq-bottom-nav" style="display:flex;width:100%;justify-content:space-between;overflow:hidden;background:' +
        bgWhite +
        ";padding-top:" +
        s[4] +
        ';">';

      list.forEach(
        function (item) {
          var label = item.label || "";
          var iconName = (item.icon || "home").toLowerCase();
          if (iconName === "person") iconName = "avatar";
          var path = ICONS[iconName] || ICONS.home;
          var isPushBadge = !!item.isPushBadge;
          var isActive = active === label;

          var iconColor =
            isActive && activeStyle ? activeStyle.fill : labelNormal;
          var textColor =
            isActive && activeStyle ? activeStyle.color : labelNormal;

          html +=
            '<button type="button" class="tq-bottom-nav__item" data-label="' +
            escapeHtml(label) +
            '" style="display:flex;flex-direction:column;align-items:center;width:100%;text-align:center;padding:' +
            s[9] +
            " 25.5px" +
            ';border:none;background:transparent;cursor:pointer;outline:none;white-space:nowrap;">';

          if (isPushBadge) {
            html +=
              '<span class="tq-bottom-nav__icon-wrap" style="position:relative;display:inline-flex;">';
            html +=
              '<span class="tq-bottom-nav__badge" style="position:absolute;top:-2px;right:-4px;width:6px;height:6px;background:' +
              c["semantic-status-negative"] +
              ';"></span>';
            html +=
              '<svg width="24" height="24" viewBox="0 0 24 24" fill="' +
              iconColor +
              '" style="display:block;">';
            html += path;
            html += "</svg>";
            html += "</span>";
          } else {
            html +=
              '<svg width="24" height="24" viewBox="0 0 24 24" fill="' +
              iconColor +
              '" style="display:block;">';
            html += path;
            html += "</svg>";
          }

          html +=
            '<span style="' +
            captionStyle +
            "color:" +
            textColor +
            ';margin-top:4px;">' +
            escapeHtml(label) +
            "</span>";
          html += "</button>";
        }.bind(this)
      );

      html += "</div>";

      var styles =
        ":host{display:block;width:100%;border:1px solid #e1e2e4;}" +
        ".tq-bottom-nav__item:hover{opacity:0.8}.tq-bottom-nav__item:focus{outline:none}.tq-bottom-nav__item:focus-visible{outline:2px solid " +
        c["semantic-primary-normal"] +
        ";outline-offset:2px}";

      this.shadowRoot.innerHTML = "<style>" + styles + "</style>" + html;
    }
  }

  if (
    typeof customElements !== "undefined" &&
    !customElements.get("tq-bottom-navigation")
  ) {
    customElements.define("tq-bottom-navigation", TqBottomNavigationElement);
  }
})();
