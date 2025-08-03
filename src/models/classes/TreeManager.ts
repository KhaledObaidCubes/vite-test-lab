import type { ITreeManager } from "../interfaces/i-treeManager"
export class TreeManager<T> {
  data: ITreeManager<T>
  parent?: TreeManager<T>
  children: TreeManager<T>[] = []
  depth = 0
  toMoveID?: string | undefined

  constructor(data: ITreeManager<T>) {
    this.data = data
    this.buildTree(data)
  }

  private buildTree(data: ITreeManager<T>) {
    for (const childData of data.children) {
      const childNode = new TreeManager<T>(childData)
      childNode.parent = this
      childNode.depth = this.depth + 1
      this.children.push(childNode)
    }
  }

  addNode(data: ITreeManager<T>): TreeManager<T> {
    const newNode = new TreeManager<T>(data)
    newNode.parent = this
    newNode.depth = this.depth + 1
    this.children.push(newNode)
    return newNode
  }

  //----------------------- add node that doesn't depend on node id ------------------
  addNodeToTarget(
    targetNode: TreeManager<T>,
    nodeToAdd: TreeManager<T>
  ): boolean {
    if (!targetNode || !nodeToAdd) {
      console.warn(
        "Invalid input: targetNode and nodeToAdd must be valid TreeManager instances."
      )
      return false
    }

    // Set parent of the new node
    nodeToAdd.parent = targetNode

    // Add to targetNode's children
    nodeToAdd.depth = this.depth + 1
    targetNode.children.push(nodeToAdd)
    nodeToAdd.updateChildDepths()
    return true
  }

  //--------------- Add instance node manager ------------
  addNodeInstance(node: TreeManager<T>): boolean {
    if (node === this || this.isDescendantOf(node)) {
      console.warn("Cannot add a node to itself or its descendants.")
      return false
    }
    node.parent = this
    node.depth = this.depth + 1
    this.children.push(node)
    node.updateChildDepths()
    return true
  }

  //------------------- remove any node -------------------------
  removeNode(node: TreeManager<T>): boolean {
    if (node.depth == 0) {
      console.warn("Cannot remove the root node.")
      return false
    }

    const parent = node.parent
    //if parent was undefined
    if (!parent) return false
    //if the children doesn't exist
    const index = parent.children.indexOf(node)
    if (index === -1) return false

    parent.children.splice(index, 1)
    node.parent = undefined
    node.depth = 0
    node.updateChildDepths()
    return true
  }

  //---------------- update node depth ----------------------------
  private updateChildDepths(): void {
    for (const child of this.children) {
      child.depth = this.depth + 1
      child.updateChildDepths()
    }
  }
  //-------------- update descendant ------------------------
  private isDescendantOf(potentialAncestor: TreeManager<T>): boolean {
    let current: TreeManager<T> | undefined = this.parent
    while (current) {
      if (current === potentialAncestor) return true
      current = current.parent
    }
    return false
  }

  //---------------------- Return tree data in JSON format ------------------
  toJSONFormat(): any {
    return {
      ...this.data,
      children: this.children.map((child) => child.toJSONFormat()),
    }
  }
}
