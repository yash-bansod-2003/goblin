export class ImageManager {
  private images = new Map<string, HTMLImageElement>();

  public load(key: string, src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        this.images.set(key, image);
        resolve();
      };

      image.onerror = reject;

      image.src = src;
    });
  }

  public get(key: string): HTMLImageElement {
    const image = this.images.get(key);

    if (!image) {
      throw new Error(`Image '${key}' not found`);
    }

    return image;
  }
}
