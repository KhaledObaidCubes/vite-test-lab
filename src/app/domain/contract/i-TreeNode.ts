import type { TNode } from "./i-types";

interface ITreeNode {
  data: TNode;
  numDescendants: string[]; //number
  depth: number;
  indexInParent: number;
  parentTree: ITreeNode | undefined;
  totalNodes: number;
  toMoveID?: string;
  targetID?: string;
}

export type { ITreeNode };
