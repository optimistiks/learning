/*

AVL tree is a self balancing binary search tree.
Every correct AVL tree is a correct binary search tree, but not vice versa.
It solves the main issue of binary search trees, when tree goes out of balance giving you O(n) time.
It solves it by rebalancing itself on every change (addition/deletion).
So it has average and worst time complexity of O(nlogn).
It guarantees that no branch of the tree will be more than 1 node higher than the other branch of the tree,
while maintaining the validity of the binary search tree.

A height of the node is the maximum number of steps needed to reach a leaf node on either side.
A node is unbalanced if it's left height is greater than the right height by more than 1 (or vice versa).
A node can rebalance itself by performing a series of steps called rotation (right rotation and left rotation).

*/

export class Tree<T> {
  root: Node<T> | null;
  constructor() {
    this.root = null;
  }

  add(value: T): void {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    this.root.add(new Node(value));
  }

  delete(value: T): void {
    if (this.root === null) {
      return;
    }
    this.root = this.root.delete(value);
  }

  toObject(): Node<T> | null {
    return this.root;
  }
}

class Node<T> {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
  height: number;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 0;
  }

  // get height of the left child
  // if there is no left child it's 0
  // otherwise it's left.height + 1 (for the left node itself)
  getLeftHeight(): number {
    if (this.left === null) {
      return 0;
    }
    return this.left.height + 1;
  }

  // same as left, but for the right
  getRightHeight(): number {
    if (this.right === null) {
      return 0;
    }
    return this.right.height + 1;
  }

  // update heights of left and right child and for itself
  // needed after adding/deleting/rebalancing
  updateHeight(): void {
    if (this.left) this.left.updateHeight();
    if (this.right) this.right.updateHeight();
    this.height = Math.max(this.getLeftHeight(), this.getRightHeight());
  }

  // recursively add a node, rebalancing on the way up
  add(node: Node<T>): void {
    if (node.value < this.value) {
      if (this.left) {
        this.left.add(node);
      } else {
        this.left = node;
      }
    } else {
      if (this.right) {
        this.right.add(node);
      } else {
        this.right = node;
      }
    }

    this.updateHeight();
    this.rebalance();
  }

  // recursively delete a node, rebalancing on the way up
  delete(value: T): Node<T> | null {
    if (this.value === value) {
      return this._delete();
    }

    if (value < this.value && this.left) {
      this.left = this.left.delete(value);
    } else if (this.right) {
      this.right = this.right.delete(value);
    }

    this.updateHeight();
    this.rebalance();

    return this;
  }

  rebalance(): void {
    // so, if node is out of balance
    // either the left child is taller, or the right
    // when right child is taller, you perform the right rotation
    // when left child is taller, you perform the left rotation

    // but,

    // before you perform the rotation, you need to check the children of the taller child

    // for example, node A is out of balance, right child (node B) is taller,
    // BUT the left child of the node B is heavier than the right child of the node B,
    // you first need to perform the left rotation on the node B, and after that, your right rotation of the unbalanced node A

    // opposite example, node C is out of balance, left child (node D) is taller,
    // BUT the right child of the node D is taller than the left child of the node D,
    // you first need to perform the right rotation on the node D, and after that, your left rotation of the unbalanced node C

    // In short, you perform a double rotation when the opposite child is heavy during a rotation.

    if (this.getLeftHeight() - this.getRightHeight() > 1 && this.left) {
      if (this.left.getRightHeight() > this.left.getLeftHeight()) {
        this.left.rotateRight();
      }
      this.rotateLeft();
    } else if (this.getRightHeight() - this.getLeftHeight() > 1 && this.right) {
      if (this.right.getLeftHeight() > this.right.getRightHeight()) {
        this.right.rotateLeft();
      }
      this.rotateRight();
    }
    this.updateHeight();
  }

  rotateRight(): void {
    if (!this.right) {
      return;
    }

    // the unbalanced node that we're rotating is node A (this one)
    // node B is the right child of node A

    // first, swap A.value and B.value
    const temp = this.value;
    this.value = this.right.value;
    this.right.value = temp;

    // save current A.left into a temporary variable
    // move B to A.left
    const left = this.left;
    this.left = this.right;

    // now both A.left and A.right point to B
    // move B.right to A.right
    this.right = this.right.right;

    // now A.left points B, and A.right points to former B.right
    // move B.left to B.right
    // move previously saved A.left to B.left
    this.left.right = this.left.left;
    this.left.left = left;

    this.updateHeight();
  }

  rotateLeft() {
    if (!this.left) {
      return;
    }

    // swap values this and this.left
    const temp = this.value;
    this.value = this.left.value;
    this.left.value = temp;

    // save this.right to var
    // move this.left to this.right
    const right = this.right;
    this.right = this.left;

    // move this.left.left to this.left
    this.left = this.left.left;

    // move this.right.right to this.right.left
    this.right.left = this.right.right;
    // put saved this.right to this.right.right
    this.right.right = right;

    this.updateHeight();
  }

  isLeaf(): boolean {
    return this.left === null && this.right === null;
  }

  hasSingleChild(): boolean {
    return (
      (this.left === null && this.right !== null) ||
      (this.left !== null && this.right === null)
    );
  }

  getSingleChild(): Node<T> | null {
    return this.left || this.right;
  }

  getSuccessor(): Node<T> | null {
    let successor = this.right;
    while (successor && successor.left) {
      successor = successor.left;
    }
    return successor;
  }

  // performs the basic BST deletion logic
  // if this node is a leaf node, just return null
  // if node has only one child, set this.value to the child.value, and set left and right to null
  // if node has both children, find a successor node, set this.value to successor.value, and delete the successor node
  _delete() {
    if (this.isLeaf()) {
      return null;
    } else if (this.hasSingleChild()) {
      const singleChild = this.getSingleChild();
      if (singleChild) {
        this.value = singleChild.value;
        this.left = null;
        this.right = null;
      }
    } else {
      const successor = this.getSuccessor();
      if (successor && this.right) {
        this.value = successor.value;
        this.right = this.right.delete(successor.value);
      }
    }
    return this;
  }
}
