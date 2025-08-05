import { TreeNode } from "../classes/TreeNode";

const addTreeNode = (targetTree: TreeNode, node: TreeNode) => {
  node.indexInParent = targetTree.data.children.length; //tested

  node.parentTree = targetTree as TreeNode;
  node.depth = targetTree.depth + 1; //tested

  targetTree.data.children.push(node); // directly add node, no need to re-wrap the wrong code was targetTree.data.children.push(new TreeNode(node))
};

const flattTree = (data: TreeNode) => {
  const result: object[] = [];

  function recurse(node: TreeNode) {
    if (!node) return;

    result.push({ name: node.data.name });
    node.data.children.forEach((child: TreeNode) => recurse(child as TreeNode));
  }

  recurse(data);
  data.totalNodes = result.length;
  return result;
};

const getAllChildren = (data: TreeNode): number => {
  let counter = 0;

  function recurse(node: TreeNode) {
    if (!node) return;
    counter += 1;
    node.data.children.forEach((child: TreeNode) => recurse(child as TreeNode));
  }

  recurse(data);
  return counter;
};

const drawTreeWithInfo = (
  node: TreeNode,
  prefix: string = "",
  isLast: boolean = true
): string => {
  let result: string =
    node.depth == 0 && node.indexInParent == 0
      ? prefix +
        (isLast ? "═══ " : "╠══ ") +
        `${node.data.name || "Unnamed"} (IIP=${node.indexInParent})\n`
      : prefix +
        (isLast ? "╚══ " : "╠══ ") +
        `${node.data.name || "Unnamed"} (IIP=${node.indexInParent})\n`;
  const children = node.data.children;
  const childCount = children.length;

  children.forEach((child: TreeNode, index: number) => {
    const isLastChild = index === childCount - 1;
    result += drawTreeWithInfo(
      child as TreeNode,
      prefix + (isLast ? "    " : "║   "),
      isLastChild
    );
  });

  return result;
};

const drawTree = (
  node: TreeNode,
  prefix: string = "",
  isLast: boolean = true
): string => {
  let result: string =
    node.depth == 0 && node.indexInParent == 0
      ? prefix +
        (isLast ? "─── " : "├── ") +
        `${node.data.name || "Unnamed"}[${node.data.id}]\n`
      : prefix +
        (isLast ? "└── " : "├── ") +
        `${node.data.name || "Unnamed"}[${node.data.id}]\n`;
  const children = node.data.children;
  const childCount = children.length;

  children.forEach((child: TreeNode, index: number) => {
    const isLastChild = index === childCount - 1;
    result += drawTree(
      child as TreeNode,
      prefix + (isLast ? "    " : "│   "),
      isLastChild
    );
  });

  return result;
};

const updateNodeDepthsAndIndex = (node: TreeNode, parent: TreeNode) => {
  node.depth = parent.depth + 1;
  node.data.children.forEach((child: TreeNode, index: number) => {
    const childNode = child as TreeNode;
    childNode.parentTree = node;
    childNode.indexInParent = index; // Set the correct index here (node index in its parent)
    updateNodeDepthsAndIndex(childNode, node);
  });
};

const updateNodesParent = (node: TreeNode) => {
  node.data.children.forEach((child: TreeNode) => {
    const childNode = child as TreeNode;
    childNode.parentTree = node;
    updateNodesParent(childNode);
  });
};

export {
  addTreeNode,
  flattTree,
  getAllChildren,
  drawTreeWithInfo,
  drawTree,
  updateNodesParent,
}; //updateNodeDepthsAndIndex }
