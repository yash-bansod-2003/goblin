import { Game } from "./game";

export class Player {
  private game: Game;
  private x: number;
  private y: number;

  private width = 30;
  private height = 30;

  private speed = 50;

  constructor(game: Game) {
    this.game = game;
    const canvas = this.game.getCanvas();
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  }
  public moveLeft(): void {
    this.x -= this.speed;
  }

  public moveRight(): void {
    this.x += this.speed;
  }

  public moveUp(): void {
    this.y -= this.speed;
  }

  public moveDown(): void {
    this.y += this.speed;
  }

  public update(deltaTime: number): void {
    const seconds = deltaTime / 1000;

    if (this.game.input.pressed("KeyA")) {
      this.x -= this.speed * seconds;
    }

    if (this.game.input.pressed("KeyD")) {
      this.x += this.speed * seconds;
    }

    if (this.game.input.pressed("KeyW")) {
      this.y -= this.speed * seconds;
    }

    if (this.game.input.pressed("KeyS")) {
      this.y += this.speed * seconds;
    }

    const canvas = this.game.getCanvas();
    this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
    this.y = Math.max(0, Math.min(canvas.height - this.height, this.y));
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
