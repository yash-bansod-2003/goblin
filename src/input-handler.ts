export class InputHandler {
  private readonly keys = new Set<string>();

  constructor() {
    window.addEventListener("keydown", (e) => {
      this.keys.add(e.code);
    });

    window.addEventListener("keyup", (e) => {
      this.keys.delete(e.code);
    });
  }

  public pressed(key: string): boolean {
    return this.keys.has(key);
  }
}
