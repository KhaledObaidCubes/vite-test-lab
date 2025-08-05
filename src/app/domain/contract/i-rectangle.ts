interface IRectangle {
  width: number;
  height: number;

  area(): number;

  perimeter(): number;

  isSquare(): boolean;

  infoLogger(msg: string): void;
}

export type { IRectangle };
