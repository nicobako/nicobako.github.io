"use strict";

document.addEventListener("DOMContentLoaded", function async() {
  console.log("DOM fully loaded and parsed");
  loadWords().then(() => {
    console.log("Words loaded successfully");
  }
  ).catch((error) => {
    console.error("Error loading words:", error);
  });
});


const loadWords = async () => {
  const response = await fetch("/static/assets/1000-words.txt");
  const data = await response.text();
  console.log(data);
  const words = data.split("\n").map(word => word.trim()).filter(word => word.length > 0);
  console.log(words);
}