import type { Game } from "./game";

export interface MapConfiguration {
  tileSize: number;
  mapWidth: number;
  mapHeight: number;
  layers: {
    name: string,
    tiles: {
      id: string;
      x: number;
      y: number
    }[],
    collider: boolean,
  }[]
}

export class Map {
  private readonly tilesetColumns = 8;
  private readonly tilesetRows = 6;
  private game: Game;
  private readonly configuration: MapConfiguration;

  constructor(game: Game, configuration: MapConfiguration) {
    this.game = game;
    this.configuration = configuration;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const image = this.game.images.get("spritesheet");
    const sourceTileSize = this.configuration.tileSize;
    const destinationTileSize = sourceTileSize * 2;
    const tileCount = this.tilesetColumns * this.tilesetRows;

    for (const layer of this.configuration.layers.reverse()) {
      for (const tile of layer.tiles) {
        const id = Number(tile.id);

        if (
          !Number.isInteger(id) ||
          id < 0 ||
          id >= tileCount ||
          !Number.isInteger(tile.x) ||
          tile.x < 0 ||
          tile.x >= this.configuration.mapWidth ||
          !Number.isInteger(tile.y) ||
          tile.y < 0 ||
          tile.y >= this.configuration.mapHeight
        ) {
          throw new Error(`Invalid map tile '${tile.id}' at (${tile.x}, ${tile.y})`);
        }

        const sourceX = (id % this.tilesetColumns) * sourceTileSize;
        const sourceY = Math.floor(id / this.tilesetColumns) * sourceTileSize;
        const destinationX = tile.x * destinationTileSize;
        const destinationY = tile.y * destinationTileSize;

        ctx.drawImage(
          image,
          sourceX,
          sourceY,
          sourceTileSize,
          sourceTileSize,
          destinationX,
          destinationY,
          destinationTileSize,
          destinationTileSize,
        );
      }
    }
  }
}
