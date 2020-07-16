class Food {
  pos: Victor2D;

  constructor() {
    this.pos = { x: 0, y: 0 };
  }

  show() {
    ctx.fillStyle = "#ff0";
    ctx.fillRect(this.pos.x, this.pos.y, BOX, BOX);
  }

  pickNewRendomFoodPos(snackBody: Victor2D[]) {
    let possibleFoodPositions: Victor2D[] = [],
      gridX: number,
      gridY: number,
      possible: boolean;

    for (let x = 0; x < GridY; x++) {
      gridX = x * BOX;
      for (let y = 0; y < GridX; y++) {
        possible = true;
        gridY = y * BOX;
        for (const tail of snackBody)
          if (gridX == tail.x && gridY == tail.y) {
            possible = false;
            break;
          }
        if (possible) possibleFoodPositions.push({ x: gridX, y: gridY });
      }
    }

    let randomFoodIndex = randomInteger(0, possibleFoodPositions.length - 1);
    this.pos = possibleFoodPositions[randomFoodIndex];
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
