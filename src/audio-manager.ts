export class AudioManager {
  private readonly sounds = new Map<string, HTMLAudioElement>();

  public load(key: string, src: string): void {
    const audio = new Audio(src);

    this.sounds.set(key, audio);
  }

  public play(key: string): void {
    const sound = this.sounds.get(key);

    if (!sound) {
      throw new Error(`Sound '${key}' not found`);
    }

    sound.currentTime = 0;
    sound.play();
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
