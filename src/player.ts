import { Game } from "./game";

export class Player {
  private game: Game;
  private x: number;
  private y: number;

  private width = 30;
  private height = 30;

  private speed = 5;

  constructor(game: Game) {
    this.game = game;
    const canvas = this.game.getCanvas();
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    console.log(
      `Init Palyer ${this.x}, ${this.y}, ${this.width}, ${this.height}`,
    );
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

  public update(): void {
    // movement logic later
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    console.log(
      `Drawing Palyer ${this.x}, ${this.y}, ${this.width}, ${this.height}`,
    );
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
