customElements.define(
  "navigator-component",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const currentPath = window.location.hash;
      if (currentPath === "/" || currentPath === "") {
        this.displayArticle("#home");
      } else {
        this.displayArticle(currentPath);
      }

      const anchors = this.querySelectorAll("a");
      for (const anchor of anchors) {
        anchor.addEventListener("click", async (event) => {
          const id = event.target.getAttribute("href");
          this.displayArticle(id);
          event.preventDefault();
        });
      }
    }

    displayArticle(articleQuerySelector) {
      const content = document.getElementById("content");
      if (!content) {
        console.error("Content element not found in navigator-component.");
        return;
      }
      const articles = content.querySelectorAll("article");
      for (const article of articles) {
        article.style.display = "none";
      }
      const article = document.querySelector(articleQuerySelector);
      if (article) {
        window.history.pushState({}, "", articleQuerySelector);
        article.style.display = "block";
      } else {
        console.error(`Article with ID ${articleQuerySelector} not found.`);
      }
    }
  }
);
