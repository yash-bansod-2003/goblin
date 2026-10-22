import { Game } from "./game";

export class Player {
  private game: Game;
  private x: number;
  private y: number;

  private width = 40;
  private height = 40;

  private speed = 80;

  constructor(game: Game) {
    this.game = game;
    const canvas = this.game.getCanvas();
    this.x = (canvas.width - this.width) / 2;
    this.y = (canvas.height - this.height) / 2;
  }
  public moveLeft(seconds: number): void {
    const audio = this.game.audio.get("pause");
    audio.play();
    this.x -= this.speed * seconds;
  }

  public moveRight(seconds: number): void {
    const audio = this.game.audio.get("pause");
    audio.play();
    this.x += this.speed * seconds;
  }

  public moveUp(seconds: number): void {
    const audio = this.game.audio.get("pause");
    audio.play();
    this.y -= this.speed * seconds;
  }

  public moveDown(seconds: number): void {
    const audio = this.game.audio.get("pause");
    audio.play();
    this.y += this.speed * seconds;
  }

  public update(deltaTime: number): void {
    const seconds = deltaTime / 1000;

    if (this.game.input.pressed("ArrowLeft")) {
      this.moveLeft(seconds);
    }

    if (this.game.input.pressed("ArrowRight")) {
      this.moveRight(seconds);
    }

    if (this.game.input.pressed("ArrowUp")) {
      this.moveUp(seconds);
    }

    if (this.game.input.pressed("ArrowDown")) {
      this.moveDown(seconds);
    }

    const canvas = this.game.getCanvas();
    this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
    this.y = Math.max(0, Math.min(canvas.height - this.height, this.y));
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    try {
      const image = this.game.images.get("player");
      ctx.drawImage(image, this.x, this.y, this.width, this.height);
    } catch {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
