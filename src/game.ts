import { Player } from "./player";
import { InputHandler } from "./input-handler";
import { ImageManager } from "./image-manager";

import playerImg from "./assets/player.png";

export class Game {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly player: Player;
  public readonly input: InputHandler;
  public readonly images: ImageManager;

  private previousFrameTime = 0;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("2D context not supported");
    }

    this.canvas = canvas;
    this.ctx = ctx;

    this.resize();
    this.input = new InputHandler();
    this.images = new ImageManager();
    this.player = new Player(this);
    window.addEventListener("resize", () => this.resize());
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  private resize(): void {
    const size = 30;
    this.canvas.width = window.innerWidth - (window.innerWidth % size);
    this.canvas.height = window.innerHeight - (window.innerHeight % size);
  }

  public async initialize(): Promise<void> {
    await this.images.load("player", playerImg);
  }

  public debug(): void {
    this.ctx.strokeStyle = "#444";
    this.ctx.lineWidth = 1;
    const size = 30;

    this.ctx.beginPath();
    for (let i = 0; i < this.canvas.width; i = i + size) {
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.canvas.height);
    }

    for (let i = 0; i < this.canvas.height; i = i + size) {
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.canvas.width, i);
    }

    this.ctx.stroke();
  }

  public start(): void {
    requestAnimationFrame(this.gameLoop);
  }

  private gameLoop = (currentTime: number): void => {
    const deltaTime = currentTime - this.previousFrameTime;

    this.previousFrameTime = currentTime;

    this.update(deltaTime);
    this.render();
    requestAnimationFrame(this.gameLoop);
  };

  private update(deltaTime: number): void {
    this.player.update(deltaTime);
  }

  private render(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.debug();
    this.player.draw(this.ctx);
  }
}
