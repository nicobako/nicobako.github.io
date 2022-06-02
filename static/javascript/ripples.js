const canvas = document.getElementById("canvas"); /* : HTMLCanvasElement */
const ctx = canvas.getContext("2d");

const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--color-dark");
console.log(backgroundColor)

ctx.fillStyle = backgroundColor;
ctx.fillRect(10, 10, 15, 15);