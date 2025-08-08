interface IRectangle {
  width: number;
  height: number;

  area(): number;

  perimeter(): number;

  isSquare(): boolean;
}

export type { IRectangle };
