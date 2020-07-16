class Snack {
  /** @example
   * 1. The First Element of The Array is Snake Head = snake.body[0].
   * 2. By adding new Victor { x,y }: and Removes the last to display Snake movement.
   */
  body: Victor2D[];
  isdead: boolean;
  directionQueue: ("Right" | "Left" | "Up" | "Down")[] = [];

  constructor() {
    this.body = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ];
    this.isdead = false;
    this.directionQueue.push("Right");
    food.pickNewRendomFoodPos(this.body);
  }

  /** @example for (Victor of Snake.body[]) show Squere
   * if Snake.directionQueue[].length is more 1
   * then first item is removed.
   */
  show() {
    ctx.fillStyle = "#fff";
    for (let bodyPart of this.body) {
      ctx.fillRect(bodyPart.x, bodyPart.y, BOX, BOX);

      ctx.strokeStyle = "#000";
      ctx.strokeRect(bodyPart.x, bodyPart.y, BOX, BOX);
    }

    ctx.fillStyle = "#f00";
    ctx.fillRect(this.body[0].x, this.body[0].y, BOX, BOX);
  }

  /** @example 1. deadLogic , EatLogic;
   *  2. Add new Victor{}; begaing of Snake.body[] && Remove Last;
   *  3. return true if Snake is dead else undefiend
   */
  update() {
    if (this.isdead) {
      clearInterval(game);
      return true;
    }

    let head = this.body[0];

    /** @example if Snake is On the Food Spot...
     *  1. Food.pickNewRendomFoodPos()
     *  2. Then Incress snake length by adding new Victor; in the begain of Snake.body[]
     * */
    let eatLogic = head.x == food.pos.x && head.y == food.pos.y;
    if (eatLogic) {
      food.pickNewRendomFoodPos(this.body);
      this.body.unshift(head);
    }

    let go = this.directionQueue[0],
    directionX = 0,
    directionY = 0;
    if (this.directionQueue.length > 1) this.directionQueue.shift();
    if (go == "Up") directionY = -BOX;
    else if (go === "Down") directionY = BOX;
    else if (go === "Left") directionX = -BOX;
    else if (go === "Right") directionX = BOX;

    /**@example
     * SnakeHead = this.body[0] , BOX = 1;
     * newPosition = SnakeHead + directionX | directionY;
     *  {11 , 10} = { 10 , 10 }  + { BOX , 0 }  >>
     *  { 9 , 10} = { 10 , 10 }  + {-BOX , 0 }  <<
     *  {10 ,  9} = { 10 , 10 }  + { 0, -BOX }  ^^
     *  {10 , 11} = { 10 , 10 }  + { 0,  BOX }  vv
     */
    let newPosition = {
      x: head.x + directionX,
      y: head.y + directionY,
    };

    if (this.collision(newPosition)) return (this.isdead = true);

    this.body.pop();
    this.body.unshift(newPosition);
  }

  /** @param position Check if is there any collision with wall or snake body */
  collision(position: Victor2D) {
    let deadLogic =
      position.x <= -BOX ||
      position.y <= -BOX ||
      position.x >= WIDTH ||
      position.y >= HEIGHT;

    if (deadLogic) return true;
    for (const tail of this.body)
      if (tail.x == position.x && tail.y == position.y) return true;
  }
}
