export class ToggleVisibility extends HTMLElement {
  static observedAttributes = ["item-selector"];

  constructor() {
    super();
  }
  connectedCallback() {
    this.itemSelector = this.getAttribute("item-selector") || "";

    this.addEventListener("click", (event) => {
      const item = document.querySelector(this.itemSelector);
      if (!item) {
        console.error(
          `ToggleVisibility: No item found with selector "${this.itemSelector}"`
        );
        return;
      }
      item.classList.toggle("hidden");
    });
  }
}
