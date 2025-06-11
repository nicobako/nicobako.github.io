export class ModifyCssProperty extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.inputElement = this.querySelector("input");

    if (this.inputElement) {
      const property = this.getAttribute("property");
      const value =
        document.documentElement.style.getPropertyValue(property) ||
        this.getAttribute("value");
      this.inputElement.value = value;
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
    // Set the CSS variable on the root element
    document.documentElement.style.setProperty(property, value);
  }
}
