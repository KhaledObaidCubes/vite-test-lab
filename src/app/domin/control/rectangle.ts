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

  async mockApiRequest(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Mock response after...");
      }, 1000); // 1000ms = 1 second (your comment says 5s, this is 1s)
    });
  }

  infoLogger(msg: string): void {
    console.log(
      `my rect ${msg} have widht= ${this.width}\nand have height= ${this.height}`
    );
  }
}

export { Rectangle };
