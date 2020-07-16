const cvs = <HTMLCanvasElement>document.getElementById("snake"),
  ctx = cvs.getContext("2d"),
  BOX = 25,
  GridX = 25,
  GridY = 45,
  food = new Food(),
  snack = new Snack(),
  WIDTH = BOX * GridY,
  HEIGHT = BOX * GridX,
  game = setInterval(draw, 1000 / 10);

cvs.width = WIDTH;
cvs.height = HEIGHT;

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  food.show();

  snack.show();
  snack.update();
}

document.addEventListener("keydown", direction);
function direction({ keyCode }: { keyCode: number }) {
  let lastInput = snack.directionQueue[snack.directionQueue.length - 1];

  if (keyCode == 38 && lastInput != "Up" && lastInput != "Down")
    snack.directionQueue.push("Up");
  if (keyCode == 40 && lastInput != "Down" && lastInput != "Up")
    snack.directionQueue.push("Down");
  if (keyCode == 37 && lastInput != "Left" && lastInput != "Right")
    snack.directionQueue.push("Left");
  if (keyCode == 39 && lastInput != "Right" && lastInput != "Left")
    snack.directionQueue.push("Right");
}

interface Victor2D {
  x: number;
  y: number;
}
