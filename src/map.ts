import type { Game } from "./game";

export class Map {
  private game: Game;
  private readonly tileWidth = 100;
  private readonly tileHeight = 72;

  constructor(game: Game) {
    this.game = game;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const canvas = this.game.getCanvas();

    try {
      const image = this.game.images.get("map");

      ctx.drawImage(image, 10, 10, 2496, 1696, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;

      for (let y = 0; y < canvas.height; y += this.tileHeight + 10) {
        for (let x = 0; x < canvas.width; x += this.tileWidth + 12) {
          ctx.strokeRect(x, y, this.tileWidth, this.tileHeight);
        }
      }
    } catch {
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
}
