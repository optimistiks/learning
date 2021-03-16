type Node = { value: string; left?: Node | null; right?: Node | null };

export const breadthFirstTraverse: (
  queue: Node[],
  array: string[]
) => string[] = (queue, array) => {
  let node = queue.pop();
  while (node) {
    array.push(node.value);
    if (node.left) {
      queue.unshift(node.left);
    }
    if (node.right) {
      queue.unshift(node.right);
    }
    node = queue.pop();
  }
  return array;
};
