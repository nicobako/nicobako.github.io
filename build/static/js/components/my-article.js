export class MyArticle extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("my-article-template");
    if (template === null) {
      console.error("Failed to load template");
    }
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
