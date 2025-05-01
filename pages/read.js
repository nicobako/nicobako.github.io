"use strict";

/**
 * Loads a list of words from a text file and displays them in the specified HTML element.
 *
 * @param {string} id - The ID of the HTML element where the words will be displayed.
 * @param {number} numberOfLines - The number of lines to display.
 * @param {number} numberOfWordsPerLine - The number of words to display per line.
 * @returns {Promise<void>} A promise that resolves when the words are loaded and displayed.
 */
export const loadWords = async (id, numberOfLines, numberOfWordsPerLine) => {
  const mainElement = document.getElementById(id);
  if (!mainElement) {
    console.error(`Element with ID ${id} not found.`);
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
  for (let i = 0; i < numberOfLines; i++) {
    const p = document.createElement("p");
    for (let j = 0; j < numberOfWordsPerLine; j++) {
      const randomWordIndex = randomNumber(0, words.length - 1);
      const span = document.createElement("span");
      span.textContent = words[randomWordIndex];
      p.appendChild(span);
    }
    div.appendChild(p);
  }

  mainElement.innerHTML = ""; // Clear the main element
  mainElement.appendChild(div);
  console.log("Words loaded and displayed.");
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
