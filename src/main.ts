import "./style.css";
import heroImg from "./assets/hero.png";
import typescriptLogo from "./assets/typescript.svg";
import viteLogo from "./assets/vite.svg";

import { Game } from "./game";

const canvas = document.getElementById("canvas");

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Canvas not found");
}

const game = new Game(canvas);
game.start();
