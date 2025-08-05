import type { IRectangle } from "../contract/i-rectangle";

class Rectangle implements IRectangle {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }

  isSquare(): boolean {
    return this.width === this.height;
  }

  infoLogger(msg: string): void {
    console.log(
      `my rect ${msg} have widht= ${this.width}\nand have height= ${this.height}`
    );
  }
}

export { Rectangle };
