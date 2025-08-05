import type { TreeNode } from "../classes/TreeNode";

type TNode = {
  id: string;
  name: string;
  children: TreeNode[];
};

type TJson = {
  name: string;
  id: string;
  depth: number | undefined;
  indexInParent: number;
  children: any[];
};

type TTreeJson = {
  [key: string]: any;
  children: TTreeJson[];
};

type TCheckedTree = { checked: boolean; indeterminate: boolean };
export type { TNode, TJson, TTreeJson, TCheckedTree };
