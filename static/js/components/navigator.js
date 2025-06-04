"use strict";
export class PageNavigator extends HTMLElement {
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

    const anchors = this.querySelectorAll("a");
    for (const anchor of anchors) {
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
      article.style.display = "block";
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
