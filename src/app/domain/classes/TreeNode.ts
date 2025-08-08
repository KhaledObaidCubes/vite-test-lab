import type { ITreeNode } from "../../domain/contract/i-TreeNode";
import type { TNode, TJson } from "../../domain/contract/i-types";
import { v4 as uuidv4 } from "uuid";
import {
  flattTree,
  getAllChildren,
  drawTree,
  drawTreeWithInfo,
  updateNodesParent,
} from "../../domain/utils/tree-sublementry";

class TreeNode implements ITreeNode {
  data: TNode;
  toMoveID?: string | undefined;
  targetID?: string | undefined;
  numDescendants: string[] = [];
  totalNodes: number = 0;
  //Private PRoperties
  private _depth: number | undefined;
  private _indexInParent: number = 0;
  private _parentTree: TreeNode | undefined; //undefined in case it is the root of the tree

  //instead of initialize data, a default empty object is passed
  constructor(
    nodeToAdd: TNode = { name: "DefaultName", id: "000-000-000", children: [] },
    depth: number = 0
  ) {
    this.data = {
      name: nodeToAdd.name,
      id: uuidv4(),
      children: [],
    };

    this._depth = this._depth ?? depth;

    //this function will act as the recursive when adding node(subTree) each time the child have nodes in the children array
    nodeToAdd.children.forEach((x) => this.addChild(x));
  }
  // Add new node(child)
  addChild(node: TreeNode | TNode) {
    //To make sure that each child created is instanceof TreeNode
    const realNode =
      node instanceof TreeNode ? node : new TreeNode(node, this.depth + 1);

    realNode.parentTree = this;
    //this step is recommended when adding
    realNode.depth = this.depth + 1;
    realNode.indexInParent = this.data.children.length;

    // node to its parent children array
    this.data.children.push(realNode);
    this.numDescendants = this.descendentArray(this);
  }

  removeNodeFromChildren(leaf: TreeNode) {
    const foundIndex = this.data.children.findIndex((x) => x == leaf);
    if (foundIndex < 0)
      throw new Error(
        `Child ${JSON.stringify(leaf)} is not a Child to be removed!`
      );
    this.data.children.splice(foundIndex, 1);
  }

  updateIndexInParentForChildren(startIndex = 0) {
    const lamda =
      startIndex == 0
        ? (child: TreeNode, idx: number) => {
            (child as TreeNode).indexInParent = idx;
          }
        : (child: TreeNode, idx: number) => {
            idx >= startIndex && ((child as TreeNode).indexInParent = idx);
          };

    this.data.children.forEach(lamda);
  }

  /**
   *
   * @param tree
   * Receives a Tree to be removed from this tree.
   */
  removeTree(tree: TreeNode) {
    // get parent..
    const parent = tree._parentTree;
    //remove this tree from the children of the parent...
    parent?.removeNodeFromChildren(tree);
    //sync indices to update after removing a child...
    parent?.updateIndexInParentForChildren(tree._indexInParent);
  }

  //////////////////////////// update NODE name BY ID ///////////////////////////////
  updateNodeNameById(idToGet: string, newName: string) {
    let foundNode: TreeNode | undefined;
    function search(node: TreeNode) {
      if (node.data.id === idToGet) {
        foundNode = node;
        return;
      }
      for (const child of node.data.children) {
        search(child as TreeNode);
        if (foundNode) return; // Stop once found
      }
    }
    search(this);
    if (foundNode) {
      foundNode.data.name = newName;
    } else {
      console.warn(`Node with id "${idToGet}" not found.`);
      return;
    }
  }

  //////////////////////////// REMOVE NODE BY ID ///////////////////////////////
  removeNodeById(idToDelete: string): boolean {
    let foundNode: TreeNode | undefined;
    function search(node: TreeNode) {
      if (node.data.id === idToDelete) {
        foundNode = node;
        return;
      }
      for (const child of node.data.children) {
        search(child as TreeNode);
        if (foundNode) return; // Stop once found
      }
    }
    search(this);
    if (foundNode) {
      this.removeTree(foundNode);
      return true;
    } else {
      console.warn(`Node with id "${idToDelete}" not found.`);
      return false;
    }
  }
  ///////////////////// MOVE NODE /////////////////

  moveNode(fromID: string, toID: string): boolean {
    let fromNode: TreeNode | undefined = undefined;
    let toNode: TreeNode | undefined = undefined;
    const stack: TreeNode[] = [this];
    while (stack.length && (!fromNode || !toNode)) {
      const node = stack.pop()!;
      if (node.data.id === fromID) fromNode = node;
      if (node.data.id === toID) toNode = node;

      for (const child of node.data.children) {
        stack.push(child as TreeNode);
      }
    }
    if (!fromNode || !toNode || fromNode === this || fromNode === toNode) {
      console.warn("Invalid move: node not found, moving root, or self move.");
      return false;
    }
    let current: TreeNode | undefined = toNode;
    while (current) {
      if (current === fromNode) {
        console.warn("Cannot move a node into one of its descendants.");
        return false;
      }
      current = current.parentTree;
    }
    fromNode.parentTree?.removeNodeFromChildren(fromNode);
    fromNode.parentTree?.updateIndexInParentForChildren(fromNode.indexInParent);

    toNode.addChild(fromNode);
    return true;
  }
  //////////////////// ADD NODE BY ID /////////////

  addNodeByID(toID: string, leaf: TreeNode): boolean {
    let toNode: TreeNode | undefined = undefined;
    const stack: TreeNode[] = [this];
    while (stack.length && !toNode) {
      const node = stack.pop()!;
      if (node.data.id === toID) toNode = node;

      for (const child of node.data.children) {
        stack.push(child as TreeNode);
      }
    }
    if (!toNode) {
      console.warn("Invalid move: node not found, moving root, or self move.");
      return false;
    }
    toNode.addChild(leaf);
    return true;
  }

  /////////////////////////////////////////////////

  // return tree as JSON
  toJSONFormat(): TJson {
    return {
      name: this.data.name,
      id: this.data.id,
      depth: this._depth,
      indexInParent: this.indexInParent,
      children: this.data.children.map((x) => x.toJSONFormat()),
    };
  }

  totalNodeNumber(): number {
    return getAllChildren(this);
  }

  getTreeShape(withInfo: boolean): string {
    if (withInfo) {
      return drawTreeWithInfo(this);
    } else {
      return drawTree(this);
    }
  }

  set depth(value: number) {
    this._depth = value;
  }
  get depth() {
    return (this._depth = this._depth ?? this.depth);
  }

  set indexInParent(value: number) {
    this._indexInParent = value;
  }
  get indexInParent() {
    return this._indexInParent;
  }

  set parentTree(value: TreeNode | undefined) {
    //if (!value) throw new Error('CANNOT SET PARENT TO UNDEFINED')
    this._parentTree = value;
  }
  get parentTree() {
    return this._parentTree;
  }

  get flattenArray() {
    return flattTree(this);
  }

  public updateChildParent(node: TreeNode) {
    updateNodesParent(node);
  }
  private updateDescendants() {
    //this.numDescendants = getAllChildren(this) - 1
    //the total node should be only on the root (all nodes including root)
    //this.totalNodes = getAllChildren(this)
  }

  public updateAncestorsDescendants() {
    let current: TreeNode | undefined = this;
    while (current) {
      current;
      current.updateDescendants();
      current = current.parentTree;
    }
  }
  descendentArray(node: TreeNode) {
    let desndncArr: string[] = [];
    //add children to the array
    desndncArr = node.data.children.map((child) => child.data.name);
    // count self node
    desndncArr.push(node.data.name);
    function addParentName(node: TreeNode) {
      if (node.parentTree) {
        desndncArr.push(node.parentTree.data.name);
        addParentName(node.parentTree);
      }
    }
    addParentName(node);
    return desndncArr;
    //return node.parentTree?.data.name
  }
}

export { TreeNode };
