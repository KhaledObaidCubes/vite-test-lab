interface IRectangle {
  width: number
  height: number

  area(): number

  perimeter(): number

  isSquare(): boolean

  mockApiRequest(): Promise<string>

  infoLogger(msg: string): void
}

export type { IRectangle }
