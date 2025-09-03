export class ModifyCssProperty extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.inputElement = this.querySelector("input");

    if (this.inputElement) {
      const property = this.getAttribute("property");
      const unit = this.getAttribute("unit") || "";
      const styleValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue(property);
      const formattedStyleValue = styleValue?.substring(
        0,
        styleValue.length - unit.length
      );
      const value = formattedStyleValue;
      this.inputElement.value = value;
      this.updateRootCSS();
      this.inputElement.addEventListener("input", () => {
        this.updateRootCSS();
      });
    } else {
      console.warn(
        "ModifyCssProperty: No input element found to update the CSS property."
      );
    }
  }

  updateRootCSS() {
    const property = this.getAttribute("property");
    const unit = this.getAttribute("unit") || "";
    const inputElement = this.querySelector("input");
    const value = inputElement
      ? inputElement.value
      : this.getAttribute("value");
    // Validate that both property and value are provided
    if (!property || !value) {
      console.error(
        "ModifyCssProperty: 'property' and 'value' attributes are required."
      );
      return;
    }
    const finalValue = `${value}${unit}`.trim();
    // Set the CSS variable on the root element
    document.documentElement.style.setProperty(property, finalValue);
    const span = document.createElement("span");
    span.textContent = `: ${finalValue}`;
    const existingSpan = this.querySelector("span");
    if (existingSpan) {
      existingSpan.replaceWith(span);
    } else {
      this.appendChild(span);
    }
  }
}
