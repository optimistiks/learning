type Node = { value: number; left?: Node | null; right?: Node | null };

export const preorderTraverse: (
  node: Node | undefined | null,
  array: number[]
) => number[] = (node, array) => {
  // fill this out
  // process the node, then left, then right
  if (node == null) {
    return array;
  }
  array.push(node.value);
  preorderTraverse(node.left, array);
  preorderTraverse(node.right, array);
  return array;
};

export const inorderTraverse: (
  node: Node | undefined | null,
  array: number[]
) => number[] = (node, array) => {
  // fill this out
  // process left tree, node, then right tree
  if (node == null) {
    return array;
  }
  inorderTraverse(node.left, array);
  array.push(node.value);
  inorderTraverse(node.right, array);
  return array;
};

export const postorderTraverse: (
  node: Node | undefined | null,
  array: number[]
) => number[] = (node, array) => {
  // fill this out
  // process left tree, right tree, then node
  if (node == null) {
    return array;
  }
  postorderTraverse(node.left, array);
  postorderTraverse(node.right, array);
  array.push(node.value);
  return array;
};
