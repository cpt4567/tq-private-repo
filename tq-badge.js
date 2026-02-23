/**
 * tq-badge - Shadow DOM Badge
 * 사용: <script src="tokens.js"></script><script src="tq-badge.js"></script>
 */
(function () {
  "use strict";
  var tokens = window.TQ_TOKENS;
  if (!tokens) return;
  var c = tokens.color,
    s = tokens.spacing,
    r = tokens.radius,
    t = tokens.typography;

  function getTypographyCSS(name) {
    var typo = t[name] || t["label-two-medium"];
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

  var SOLID_WHITE_TEXT = new Set([
    "semantic-primary-normal",
    "semantic-primary-strong",
    "semantic-primary-heavy",
    "semantic-label-normal",
    "semantic-label-strong",
    "semantic-status-positive",
    "semantic-status-cautionary",
    "semantic-status-negative",
    "semantic-status-informative",
    "semantic-static-black",
    "semantic-accent-background-red-orange",
    "semantic-accent-background-lime",
    "semantic-accent-background-cyan",
    "semantic-accent-background-light-blue",
    "semantic-accent-background-violet",
    "semantic-accent-background-purple",
    "semantic-accent-background-pink",
    "semantic-inverse-background",
  ]);

  function shadow1(color) {
    return (
      "box-shadow:inset -1px 0 0 0 " +
      color +
      ",inset 1px 0 0 0 " +
      color +
      ",inset 0 -1px 0 0 " +
      color +
      ",inset 0 1px 0 0 " +
      color +
      ";"
    );
  }

  function colorWithOpacity(hex, opacity) {
    var m = String(hex).match(
      /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i
    );
    if (!m) return hex;
    var rv = parseInt(m[1], 16),
      g = parseInt(m[2], 16),
      b = parseInt(m[3], 16);
    var a = m[4] ? parseInt(m[4], 16) / 255 : 1;
    return "rgba(" + rv + "," + g + "," + b + "," + a * opacity + ")";
  }

  var SOLID_OPACITY = 0.05;

  function buildColorMap() {
    var map = {};
    for (var k in c) {
      var bg = c[k];
      var textSolid = SOLID_WHITE_TEXT.has(k) ? c["semantic-static-white"] : bg;
      if (k.indexOf("semantic-label-") === 0 && !SOLID_WHITE_TEXT.has(k)) {
        textSolid = c["semantic-label-normal"];
      }
      map[k] = {
        solid:
          "background:" +
          colorWithOpacity(bg, SOLID_OPACITY) +
          ";color:" +
          textSolid +
          ";border:none;",
        outline:
          "background:" +
          colorWithOpacity(bg, SOLID_OPACITY) +
          ";color:" +
          bg +
          ";border:none;" +
          shadow1(bg),
        fill: "fill:" + bg + ";",
      };
    }
    return map;
  }

  var colorMap = buildColorMap();
  colorMap.primary = colorMap["semantic-primary-normal"];
  colorMap.label = colorMap["semantic-label-alternative"];
  colorMap.positive = colorMap["semantic-status-positive"];
  colorMap.negative = colorMap["semantic-status-negative"];
  colorMap.cautionary = colorMap["semantic-status-cautionary"];
  colorMap.informative = colorMap["semantic-status-informative"];

  class TqBadgeElement extends HTMLElement {
    static get tagName() {
      return "tq-badge";
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    _resolveColorKey(color) {
      var a = {
        primary: "semantic-primary-normal",
        label: "semantic-label-alternative",
        positive: "semantic-status-positive",
        negative: "semantic-status-negative",
        cautionary: "semantic-status-cautionary",
        informative: "semantic-status-informative",
      };
      return a[color] || color;
    }
    connectedCallback() {
      var variant = this.getAttribute("variant") || "outline";
      var color = this.getAttribute("color") || "primary";
      var size = this.getAttribute("size") || "medium";

      var sizeSpec = {
        xsmall: {
          py: s[3],
          px: s[6],
          height: 20,
          radius: r[6],
          typo: "caption-two-medium",
        },
        small: {
          py: s[3],
          px: s[6],
          height: 24,
          radius: r[6],
          typo: "caption-one-medium",
        },
        medium: {
          py: s[3],
          px: s[8],
          height: 28,
          radius: r[8],
          typo: "label-two-medium",
        },
      };
      var spec = sizeSpec[size] || sizeSpec.medium;

      var col = colorMap[color] || colorMap.primary;
      var variantStyle = col[variant] || col.solid;
      var fillStyle = col.fill || "";
      var colorKey = this._resolveColorKey(color);

      var styles =
        ".tq-badge{display:inline-flex;align-items:center;justify-content:center;gap:" +
        s[4] +
        ";font-family:Pretendard,system-ui,sans-serif;box-sizing:border-box;text-align:center;padding:" +
        spec.py +
        " " +
        spec.px +
        ";min-height:" +
        spec.height +
        "px;border-radius:" +
        spec.radius +
        ";" +
        getTypographyCSS(spec.typo) +
        "border:none;outline:none}.tq-badge--" +
        variant +
        ".tq-badge--" +
        colorKey +
        "{" +
        variantStyle +
        '}.tq-badge__content{display:inline-flex;align-items:center}.tq-badge slot[name="left-icon"]::slotted(*),.tq-badge slot[name="right-icon"]::slotted(*){display:inline-flex;flex-shrink:0;' +
        fillStyle +
        '}.tq-badge--xsmall slot[name="left-icon"]::slotted(*),.tq-badge--xsmall slot[name="right-icon"]::slotted(*){width:12px;height:12px}.tq-badge--small slot[name="left-icon"]::slotted(*),.tq-badge--small slot[name="right-icon"]::slotted(*){width:14px;height:14px}.tq-badge--medium slot[name="left-icon"]::slotted(*),.tq-badge--medium slot[name="right-icon"]::slotted(*){width:16px;height:16px}';

      this.shadowRoot.innerHTML =
        "<style>" +
        styles +
        '</style><span class="tq-badge tq-badge--' +
        variant +
        " tq-badge--" +
        colorKey +
        " tq-badge--" +
        size +
        '"><slot name="left-icon"></slot><span class="tq-badge__content" part="content"><slot></slot></span><slot name="right-icon"></slot></span>';
    }
  }

  if (
    typeof customElements !== "undefined" &&
    !customElements.get("tq-badge")
  ) {
    customElements.define("tq-badge", TqBadgeElement);
  }
})();
