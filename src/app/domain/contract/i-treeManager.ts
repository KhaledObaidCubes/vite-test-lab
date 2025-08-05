type ITreeManager<T> = {
  children: ITreeManager<T>[]
} & T

export type { ITreeManager }
