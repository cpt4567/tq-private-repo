/**
 * tq-button - Shadow DOM Button
 * 사용: <script src="tokens.js"></script><script src="tq-button.js"></script>
 */
(function () {
  "use strict";
  var tokens = window.TQ_TOKENS;
  if (!tokens) return;
  var c = tokens.color,
    s = tokens.spacing,
    r = tokens.radius,
    t = tokens.typography,
    i = tokens.interaction;

  function getTypographyCSS(name) {
    var typo = t[name] || t["body-two-normal-bold"];
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

  class TqButtonElement extends HTMLElement {
    static get tagName() {
      return "tq-button";
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    static get observedAttributes() {
      return ["variant", "type", "size", "disabled", "text-color", "full-width"];
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }
    _render() {
      var variant = this.getAttribute("variant") || "solid";
      var type = this.getAttribute("type") || "primary";
      var size = this.getAttribute("size") || "large";
      var disabled = this.hasAttribute("disabled");
      var textColor = this.getAttribute("text-color") || "";
      var fullWidth = this.hasAttribute("full-width");

      var sizeSpec = {
        small: { py: s[7], px: s[14], radius: r[8], typo: "label-two-bold" },
        medium: {
          py: s[9],
          px: s[20],
          radius: r[10],
          typo: "body-two-normal-bold",
        },
        large: {
          py: s[12],
          px: s[28],
          radius: r[12],
          typo: "body-one-normal-bold",
        },
      };
      var spec = sizeSpec[size] || sizeSpec.large;

      var textSpec =
        variant === "text"
          ? {
              small: { py: s[4], typo: "label-one-normal-bold" },
              medium: { py: s[4], typo: "body-one-normal-bold" },
            }
          : null;
      var textSizeSpec = (textSpec && textSpec[size]) ||
        (textSpec && textSpec.medium) || {
          py: s[4],
          typo: "body-one-normal-bold",
        };

      var iv =
        variant === "solid"
          ? type === "primary"
            ? "strong"
            : "normal"
          : variant === "outlined"
            ? type === "primary"
              ? "normal"
              : "light"
            : "normal";
      var ih = (i[iv] && i[iv].hovered) || "0.05";
      var ip = (i[iv] && i[iv].pressed) || "0.12";

      var base =
        ".tq-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;outline:none;font-family:Pretendard,system-ui,sans-serif;overflow:hidden}.tq-btn:focus{outline:none}.tq-btn:disabled{cursor:not-allowed;pointer-events:none}.tq-btn__overlay{position:absolute;inset:0;pointer-events:none;background:" +
        c["semantic-label-normal"] +
        ";border-radius:inherit;opacity:0;transition:opacity .2s ease}.tq-btn__content{position:relative;z-index:1}.tq-btn:hover:not(:disabled) .tq-btn__overlay{opacity:" +
        ih +
        "}.tq-btn:active:not(:disabled) .tq-btn__overlay{opacity:" +
        ip +
        "}.tq-btn:focus-visible:not(:disabled) .tq-btn__overlay{opacity:" +
        ip +
        "}";

      var sizeStyles =
        variant === "text"
          ? ".tq-btn--small{padding:" +
            textSizeSpec.py +
            " 0;border-radius:" +
            r[12] +
            ";border:none;background:transparent;" +
            getTypographyCSS(textSizeSpec.typo) +
            "}.tq-btn--medium{padding:" +
            textSizeSpec.py +
            " 0;border-radius:" +
            r[12] +
            ";border:none;background:transparent;" +
            getTypographyCSS(textSizeSpec.typo) +
            "}"
          : ".tq-btn--small{padding:" +
            spec.py +
            " " +
            spec.px +
            ";border-radius:" +
            spec.radius +
            ";" +
            getTypographyCSS(spec.typo) +
            "}.tq-btn--medium{padding:" +
            spec.py +
            " " +
            spec.px +
            ";border-radius:" +
            spec.radius +
            ";" +
            getTypographyCSS(spec.typo) +
            "}.tq-btn--large{padding:" +
            spec.py +
            " " +
            spec.px +
            ";border-radius:" +
            spec.radius +
            ";" +
            getTypographyCSS(spec.typo) +
            "}";

      var v = {
        solid: {
          primary:
            "background:" +
            c["semantic-primary-normal"] +
            ";color:" +
            c["semantic-static-white"] +
            ";border:none",
          primaryDisabled:
            "background:" +
            c["atomic-cool-gray-98"] +
            ";color:" +
            c["semantic-label-assistive"],
          assistive:
            "background:" +
            c["semantic-fill-normal"] +
            ";color:" +
            c["atomic-cool-gray-22"] +
            ";border:none",
          assistiveDisabled:
            "background:" +
            c["atomic-cool-gray-98"] +
            ";color:" +
            c["semantic-label-assistive"],
        },
        outlined: {
          primary:
            "background:transparent;color:" +
            c["semantic-primary-normal"] +
            ";border:1px solid " +
            c["semantic-primary-normal"],
          primaryDisabled:
            "background:transparent;color:" +
            c["semantic-label-disable"] +
            ";border:1px solid " +
            c["semantic-line-normal-gray"],
          secondary:
            "background:transparent;color:" +
            c["semantic-primary-normal"] +
            ";border:1px solid " +
            c["semantic-line-normal-gray"],
          assistive:
            "background:transparent;color:" +
            c["semantic-label-alternative"] +
            ";border:1px solid " +
            c["semantic-line-normal-gray"],
        },
        text: {
          primary:
            "background:transparent;color:" +
            c["semantic-primary-normal"] +
            ";border:none",
          primaryDisabled:
            "background:transparent;color:" + c["semantic-label-disable"],
          assistive:
            "background:transparent;color:" +
            c["semantic-label-alternative"] +
            ";border:none",
          assistiveDisabled:
            "background:transparent;color:" + c["semantic-label-disable"],
        },
      };

      var vs = v[variant] || v.solid;
      var tk =
        type === "primary"
          ? "primary"
          : type === "secondary"
            ? "secondary"
            : "assistive";
      var colorOverride = textColor ? ".tq-btn{color:" + textColor + "!important}" : "";
      var widthOverride = fullWidth ? ".tq-btn{width:100%;display:flex}" : "";
      var styles =
        base +
        sizeStyles +
        ".tq-btn--" +
        variant +
        ".tq-btn--" +
        type +
        "{" +
        (vs[tk] || "") +
        "}.tq-btn--" +
        variant +
        ".tq-btn--" +
        type +
        ":disabled{" +
        (vs[tk + "Disabled"] || vs[tk] || "") +
        "}" +
        colorOverride +
        widthOverride;

      this.shadowRoot.innerHTML =
        "<style>" +
        styles +
        '</style><button class="tq-btn tq-btn--' +
        variant +
        " tq-btn--" +
        type +
        " tq-btn--" +
        size +
        '" type="button"' +
        (disabled ? " disabled" : "") +
        '><span class="tq-btn__overlay" aria-hidden="true"></span><span class="tq-btn__content"><slot></slot></span></button>';
    }
    connectedCallback() {
      this._render();
    }
  }

  if (
    typeof customElements !== "undefined" &&
    !customElements.get("tq-button")
  ) {
    customElements.define("tq-button", TqButtonElement);
  }
})();
