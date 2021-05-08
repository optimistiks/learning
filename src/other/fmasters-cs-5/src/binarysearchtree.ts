class Node<T> {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree<T> {
  root: Node<T> | null;
  constructor() {
    this.root = null;
  }

  insert(value: T): void {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (current.left !== newNode && current.right !== newNode) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
        } else {
          current = current.left;
        }
      } else {
        if (!current.right) {
          current.right = newNode;
        } else {
          current = current.right;
        }
      }
    }
  }

  contains(value: T): boolean {
    let found = false;
    if (!this.root) {
      return found;
    }
    const func = (node: Node<T>) => {
      if (node.value === value) {
        found = true;
      }
    };
    this.inOrderTraversal(this.root, func);
    return found;
  }

  find(value: T): Node<T> | null {
    let found = null;
    if (!this.root) {
      return found;
    }
    const func = (node: Node<T>) => {
      if (node.value === value) {
        found = node;
      }
    };
    this.inOrderTraversal(this.root, func);
    return found;
  }

  min(node: Node<T> | null = null): Node<T> | null {
    let min = node;
    while (min && min.left) {
      min = min.left;
    }
    return min;
  }

  max(node: Node<T>): Node<T> {
    let max = node;
    while (max && max.right) {
      max = max.right;
    }
    return max;
  }

  remove(value: T): void {
    const node = this.find(value);
    if (!node) {
      return;
    }
    this.removeNode(node);
  }

  removeNode(node: Node<T>): void {
    if (!node.left && !node.right) {
      if (node === this.root) {
        // delete root node
        this.root = null;
      } else {
        // delete leaf node
        const parent = this.getParent(node);
        if (!parent) {
          return;
        }
        if (parent.left === node) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      }
    } else if (node.left && node.right) {
      // delete node with both children
      const successor = this.min(node.right);
      if (!successor) {
        return;
      }
      this.removeNode(successor);
      node.value = successor.value;
    } else {
      // delete node with only one child
      if (node.left) {
        node.value = node.left.value;
        node.left = node.left.left;
      } else if (node.right) {
        node.value = node.right.value;
        node.right = node.right.right;
      }
    }
  }

  getParent(node: Node<T>): Node<T> | null {
    if (this.root === node) {
      return null;
    }
    let parent = null;
    let current = this.root;
    while (!parent && current) {
      if (current.left === node || current.right === node) {
        parent = current;
      } else {
        if (node.value < current.value) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
    }
    return parent;
  }

  // left, root, right
  inOrderTraversal(node: Node<T>, func = console.log): void {
    if (node.left) this.inOrderTraversal(node.left, func);
    func(node);
    if (node.right) this.inOrderTraversal(node.right, func);
  }

  // root, left, right
  preOrderTraversal(node: Node<T>, func = console.log): void {
    func(node);
    if (node.left) this.preOrderTraversal(node.left, func);
    if (node.right) this.preOrderTraversal(node.right, func);
  }

  // left, right, root
  postOrderTraversal(node: Node<T>, func = console.log): void {
    if (node.left) this.postOrderTraversal(node.left, func);
    if (node.right) this.postOrderTraversal(node.right, func);
    func(node);
  }
}

export { BinarySearchTree, Node };
