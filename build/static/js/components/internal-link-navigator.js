"use strict";
export class InternalLinkNavigator extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // when the component is added to the DOM
    this.displayCurrentHash();

    // when browser history changes
    window.addEventListener("hashchange", (event) => {
      this.displayCurrentHash();
    });

    const internalLinks = this.querySelectorAll(".internal-link");
    for (const anchor of internalLinks) {
      anchor.addEventListener("click", async (event) => {
        if (event.target === null || event.target.tagName !== "A") {
          return;
        }
        const id = event.target.getAttribute("href");
        this.displayArticle(id);
        // do not prevent default behavior
        // as we want the browser to update the URL
        // event.preventDefault();
      });
    }
  }

  displayArticle(articleQuerySelector) {
    const articles = this.querySelectorAll("my-article");
    for (const article of articles) {
      article.classList.add("hidden");
    }
    const article = document.querySelector(articleQuerySelector);
    if (article) {
      article.classList.remove("hidden");
    } else {
      console.error(`Article with ID ${articleQuerySelector} not found.`);
    }
  }

  displayCurrentHash() {
    const currentPath = window.location.hash;
    if (currentPath === "/" || currentPath === "") {
      this.displayArticle("#home");
    } else {
      this.displayArticle(currentPath);
    }
  }
}
