const canvas = document.getElementById("canvas"); /* : HTMLCanvasElement */
const ctx = canvas.getContext("2d");

const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--color-light");
const squareColor = getComputedStyle(document.documentElement).getPropertyValue("--color-dark");
console.log(backgroundColor)
console.log(canvas);

ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);

const squares = []

function drawSquare(x, y) {
    console.log("in draw square", { "x": x, "y": y });
    ctx.fillStyle = squareColor;
    ctx.fillRect(x, y, 10, 10);
}

function addSquare(x, y) {
    squares.push([x, y]);
}


function anim() {
    console.log("in anim");

    ctx.fillStyle = squareColor;
    squares.forEach((x, y) => drawSquare(x, y));
}

canvas.addEventListener("click", (e) => {
    console.log("click", e)
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawSquare(
        x,
        y,
    );
});