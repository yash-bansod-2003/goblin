import "./style.css";

import { Game } from "./game";

const canvas = document.getElementById("canvas");

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Canvas not found");
}

const game = new Game(canvas);
await game.initialize();
game.start();
