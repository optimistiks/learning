/*

Binary Search Tree

A tree-like data structure where all values less than the node.value go to the left of the node,
and values greater than the nodevalue go to the right of the node
Average operation complexity is O(logn)
However worst case is O(n), since the tree can go out of balance
For example, after adding a sorted array into the tree, all of them will go to one side,
resulting in an unbalanced tree where left side has zero nodes and right side has all the nodes.

*/

export class Tree<T> {
  root: Node<T> | null;
  constructor() {
    this.root = null;
  }

  // iteratively go left or right from the root
  // until we find a place to add the node
  add(value: T): void {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let done = false;
    let current = this.root;

    while (!done) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = new Node(value);
          done = true;
        } else {
          current = current.left;
        }
      } else {
        if (current.right === null) {
          current.right = new Node(value);
          done = true;
        } else {
          current = current.right;
        }
      }
    }
  }

  // iteratively go left or right from the root
  // until we find the node to delete
  delete(value: T): void {
    let parent = null;
    let current = this.root;

    while (current !== null && current.value !== value) {
      if (value < current.value) {
        parent = current;
        current = current.left;
      } else {
        parent = current;
        current = current.right;
      }
    }

    if (current === null) {
      // we haven't found the value to delete
      return;
    }

    if (!parent) {
      if (this.root) {
        this.root = this.root.delete();
      }
      return;
    }

    if (parent.left === current) {
      parent.left = current.delete();
    } else {
      parent.right = current.delete();
    }
  }

  toObject(): Node<T> | null {
    return this.root;
  }
}

class Node<T> {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // checks if this node is a leaf node, meaning it has no children
  isLeaf(): boolean {
    return this.left === null && this.right === null;
  }

  // checks if this node has only one child (either left or right) (makes deletion easier)
  hasSingleChild(): boolean {
    return (
      (this.left === null && this.right !== null) ||
      (this.left !== null && this.right === null)
    );
  }

  // returns a single child of the node (makes deletion easier)
  getSingleChild(): Node<T> | null {
    return this.left || this.right;
  }

  // get a successor node of this node
  // successor.value is a closest greater value to this.value
  // which means that successor node is the left-most leaf node of this.right
  // or, if this.right has no children, successor node is this.right itself
  // also returns the successor's node parent
  getSuccessorWithParent(): [Node<T> | null, Node<T> | null] {
    let successorParent = null;
    let successor = this.right;
    while (successor != null && successor.left) {
      successorParent = successor;
      successor = successor.left;
    }
    return [successor, successorParent];
  }

  // handles the deletion of this node
  // if this is a leaf node it just returns null
  // (its expected that the caller of this method will replace the reference to this node with the null value)
  // if this node has only single child, it replaces this.value with singleChild.value (doesnt matter if it's left or right)
  // if this node has two children, it gets the successor node, replaces this.value with successor.value, and deletes the successor node
  delete(): Node<T> | null {
    if (this.isLeaf()) {
      return null;
    } else if (this.hasSingleChild()) {
      const singleChild = this.getSingleChild();
      if (singleChild) {
        this.value = singleChild.value;
        this.left = null;
        this.right = null;
      }
      return this;
    } else {
      const [successor, successorParent] = this.getSuccessorWithParent();
      if (successor) {
        this.value = successor.value;
      }
      if (successorParent === null) {
        this.right = null;
      } else if (successor) {
        successorParent.left = successor.delete();
      }
      return this;
    }
  }
}
