"use strict";

import { words } from "./words.js";

export class ReadingPractice extends HTMLElement {
  static observedAttributes = [
    "num-lines",
    "num-words-per-line",
    "display-vertical-line",
  ];
  constructor() {
    super();
  }

  connectedCallback() {
    this.words = words;

    this.lineCount = this.parseInt(this.getAttribute("num-lines"), 25);

    this.numberOfWordsPerLine = this.parseInt(
      this.getAttribute("num-words-per-line"),
      3
    );

    this.displayVerticalLine = this.parseBoolean(
      this.getAttribute("display-vertical-line"),
      true
    );

    const incrementButton = this.querySelector(".increment-button");
    if (incrementButton) {
      incrementButton.addEventListener("click", () => {
        this.setAttribute("num-words-per-line", this.numberOfWordsPerLine + 1);
      });
    }
    const decrementButton = this.querySelector(".decrement-button");
    if (decrementButton) {
      decrementButton.addEventListener("click", () => {
        this.setAttribute(
          "num-words-per-line",
          (this.numberOfWordsPerLine -= 1)
        );
      });
    }

    const generateButton = this.querySelector(".generate-button");
    if (generateButton) {
      generateButton.addEventListener("click", () => {
        this.render();
      });
    }

    const toggleLineButton = this.querySelector(".toggle-vertical-line-button");
    if (toggleLineButton) {
      toggleLineButton.addEventListener("click", () => {
        this.setAttribute("display-vertical-line", !this.displayVerticalLine);
      });
    }

    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "num-lines") {
      this.lineCount = this.parseInt(newValue, oldValue);
    } else if (name === "num-words-per-line") {
      this.numberOfWordsPerLine = this.parseInt(newValue, oldValue);
    } else if (name === "display-vertical-line") {
      this.displayVerticalLine = this.parseBoolean(newValue, oldValue);
    }
    this.render();
  }

  render() {
    this.content = this.querySelector(".reading-practice-content");
    if (!this.content) {
      console.error("Content element not found in reading-practice component.");
      return;
    }
    const div = document.createElement("div");

    for (let i = 0; i < this.lineCount; i++) {
      const p = document.createElement("p");
      const wordsInLine = [];
      for (let j = 0; j < this.numberOfWordsPerLine; j++) {
        const randomWord = this.randomWord();
        wordsInLine.push(randomWord);
      }
      p.textContent = wordsInLine.join(" ");
      p.classList.add("line");

      div.appendChild(p);
    }
    if (this.displayVerticalLine) {
      div.classList.add("vertical-line");
    } else {
      div.classList.remove("vertical-line");
    }

    this.content.innerHTML = ""; // Clear the main element
    this.content.appendChild(div);
  }

  randomWord() {
    const randomIndex = this.randomNumber(0, this.words.length - 1);
    return this.words[randomIndex];
  }
  randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  parseInt(value, defaultValue) {
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue) || parsedValue <= 0) {
      return defaultValue;
    }
    return parsedValue;
  }
  parseBoolean(value, defaultValue) {
    if (value === "true" || value === "1") {
      return true;
    } else if (value === "false" || value === "0") {
      return false;
    }
    return defaultValue;
  }
}
