export class AudioManager {
  private readonly sounds = new Map<string, HTMLAudioElement>();

  public load(key: string, src: string): Promise<void> {
    return new Promise((resolve) => {
      const audio = new Audio(src);

      const onReady = () => {
        this.sounds.set(key, audio);
        cleanup();
        resolve();
      };

      const onError = () => {
        cleanup();
        resolve();
      };

      const cleanup = () => {
        audio.removeEventListener("canplaythrough", onReady);
        audio.removeEventListener("error", onError);
      };

      audio.addEventListener("canplaythrough", onReady, { once: true });
      audio.addEventListener("error", onError, { once: true });
      audio.load();
    });
  }

  public play(key: string): void {
    const sound = this.sounds.get(key);

    if (!sound) {
      throw new Error(`Sound '${key}' not found`);
    }

    sound.currentTime = 0;
    sound.play().catch(console.error);
  }

  public pause(key: string): void {
    const sound = this.sounds.get(key);

    if (!sound) {
      throw new Error(`Sound '${key}' not found`);
    }

    sound.pause();
  }

  public stop(key: string): void {
    const sound = this.sounds.get(key);

    if (!sound) {
      throw new Error(`Sound '${key}' not found`);
    }

    sound.pause();
    sound.currentTime = 0;
  }

  public setVolume(key: string, volume: number): void {
    const sound = this.sounds.get(key);

    if (!sound) {
      throw new Error(`Sound '${key}' not found`);
    }

    sound.volume = volume;
  }

  public get(key: string): HTMLAudioElement {
    const sound = this.sounds.get(key);
    if (!sound) {
      throw new Error(`Sound '${key}' not found`);
    }

    return sound;
  }
}
