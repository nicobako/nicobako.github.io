"use strict";

document.addEventListener("DOMContentLoaded", function async() {
  console.log("DOM fully loaded and parsed");

  const pagesDetails = document.getElementById("pages");
  const internalLinks = document.querySelectorAll(".nav-internal-link");
  const mainContent = document.getElementById("content");

  const linkClickedEvent = new Event("data-link-clicked");

  for (const link of internalLinks) {
    link.addEventListener("click", async function (event) {
      console.log("link clicked");
      const pageUrl = event.target.getAttribute("data-page");
      const pageContent = await (await fetch(pageUrl)).text();
      const pageDiv = document.createElement("div");
      pageDiv.innerHTML = pageContent;
      mainContent.innerHTML = "";
      mainContent.appendChild(pageDiv.firstChild);
      if (pagesDetails.hasAttribute("open")) {
        pagesDetails.removeAttribute("open");
      }
      event.preventDefault();
      link.dispatchEvent(linkClickedEvent);
      console.log("link clicked event dispatched");

      if (pageUrl === "/pages/reading_practice.html") {
        const submitButton = document.getElementById(
          "reading-practice-generate-button"
        );
        submitButton.addEventListener("click", async (event) => {
          event.preventDefault();
          await doWords();
        });
      }
    });
  }
});

const doWords = async () => {
  const lineCount = document.getElementById("line-count").value;
  const numberOfWordsPerLine = document.getElementById(
    "number-of-words-per-line"
  ).value;

  await loadWords("reading-practice", lineCount, numberOfWordsPerLine);
};

/**
 * @param {string} id - The ID of the HTML element where the words will be displayed.
 * @param {number} numberOfLines - The number of lines to display.
 * @param {number} numberOfWordsPerLine - The number of words to display per line.
 * @returns {Promise<void>} A promise that resolves when the words are loaded and displayed.
 */
const loadWords = async (id, numberOfLines, numberOfWordsPerLine) => {
  const mainElement = document.getElementById(id);
  if (!mainElement) {
    return;
  }
  console.log("Loading words...");
  // Fetch the words from the text file
  const response = await fetch("/static/assets/1000-words.txt");
  const data = await response.text();

  const words = data
    .split("\n")
    .map((word) => word.trim())
    .filter((word) => word.length > 0);
  console.log(words);

  const div = document.createElement("div");
  div.classList.add("light");
  for (let i = 0; i < numberOfLines; i++) {
    const p = document.createElement("p");
    const wordsInLine = [];
    for (let j = 0; j < numberOfWordsPerLine; j++) {
      const randomWordIndex = randomNumber(0, words.length - 1);
      wordsInLine.push(words[randomWordIndex]);
    }
    p.textContent = wordsInLine.join(" ");
    p.classList.add("line");

    div.appendChild(p);
  }

  mainElement.innerHTML = ""; // Clear the main element
  mainElement.appendChild(div);
  console.log("Words loaded and displayed.");
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
