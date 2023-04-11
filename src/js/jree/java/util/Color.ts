export class Color {
  rgb: number;

  constructor(_rgb: number) {
    this.rgb = _rgb;
  }

  static getHSBColor = (h: number, s: number, b: number) => {
    s /= 100;
    b /= 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return new Color(((255 * f(5)) << 16) + ((255 * f(3)) << 8) + (255 * f(1)));
  };

  public getRGB() {
    return this.rgb;
  }
}