export class BinaryTree<T> {
  value: T;
  left: BinaryTree<T> | null;
  right: BinaryTree<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insertChild(value: T): void {
    let found = null;
    const queue: Array<BinaryTree<T> | null> = [this];

    // BFS traversal to insert child in level order
    while (found === null && queue.length > 0) {
      const node = queue.shift();
      if (!node) {
        break;
      }
      if (!node.left || !node.right) {
        found = node;
      }
      queue.push(node.left);
      queue.push(node.right);
    }

    if (!found) {
      return;
    }

    const tree = new BinaryTree(value);

    if (!found.left) {
      found.left = tree;
    } else if (!found.right) {
      found.right = tree;
    }
  }

  // left, root, right
  inOrderTraversal(func = console.log): void {
    if (this.left) {
      this.left.inOrderTraversal(func);
    }
    func(this);
    if (this.right) {
      this.right.inOrderTraversal(func);
    }
  }

  // root, left, right
  preOrderTraversal(func = console.log): void {
    func(this);
    if (this.left) {
      this.left.preOrderTraversal(func);
    }
    if (this.right) {
      this.right.preOrderTraversal(func);
    }
  }

  // left, right, root
  postOrderTraversal(func = console.log): void {
    if (this.left) {
      this.left.postOrderTraversal(func);
    }
    if (this.right) {
      this.right.postOrderTraversal(func);
    }
    func(this);
  }
}
