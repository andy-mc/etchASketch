const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");

const shakebutton = document.querySelector(".shake");

const MOVE_AMOUNT = 10; // all capital and underscore want to say is a true constants

ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 30;

let x;
let y;
let hue;
const { width, height } = canvas;

initCanvas();

function initCanvas() {
  x = Math.floor(Math.random() * width);
  y = Math.floor(Math.random() * height);
  hue = Math.floor(Math.random() * 360);

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath(); // start the drawing
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function draw({ key }) {
  ctx.beginPath(); // start the drawing

  hue += 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.moveTo(x, y);

  switch (key) {
    case "ArrowLeft":
      x -= MOVE_AMOUNT;
      break;
    case "ArrowUp":
      y -= MOVE_AMOUNT;
      break;
    case "ArrowRight":
      x += MOVE_AMOUNT;
      break;
    case "ArrowDown":
      y += MOVE_AMOUNT;
      break;

    default:
      break;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
}

function handleKey(event) {
  if (event.key.includes("Arrow")) {
    event.preventDefault();
    draw({ key: event.key });
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
}

function handleShake(event) {
  canvas.classList.add("shake");
  clearCanvas();
  initCanvas();
}

window.addEventListener("keydown", handleKey);
canvas.addEventListener("animationend", function(params) {
  canvas.classList.remove("shake");
});

shakebutton.addEventListener("click", handleShake);
