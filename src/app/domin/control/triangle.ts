import type { ITriangle } from "../contract/i-triangle";

class Triangle implements ITriangle {
  base: number;
  height: number;
  constructor(base: number, height: number) {
    this.base = base;
    this.height = height;
  }

  area(): number {
    return (this.base * this.height) / 2;
  }

  triangleType(): string {
    if (this.height == (Math.sqrt(3) / 2) * this.base)
      return "Equilateral Triangle";
    else return "unknown";
  }
}

export { Triangle };
