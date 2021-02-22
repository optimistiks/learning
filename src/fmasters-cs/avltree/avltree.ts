// avl tree is one of the self-balanced types of trees
// it solves the problem with binary search trees when one side can grow too big
// in avl tree worst and average time complexity of operations is O(n logn)
// each tree has a weight determined by the children's weight
// tree with only value and without any children has weight === 1
// on every add, it checks if tree became unbalanced
// meaning the difference between left child weight and right child weight is greater than 1
// if that's the case, the tree rebalances itself by rotating left or right (depending on which branch is heavier)
// rotation basically makes the heavy child the new subtree root and swaps the children accordingly to maintain the bst validity
export class Tree<T> {
  value: T | null;
  left: Tree<T> | null;
  right: Tree<T> | null;
  weight: number;

  constructor(value?: T) {
    this.value = value || null;
    this.left = null;
    this.right = null;
    this.weight = value ? 1 : 0;
  }

  add(value: T): void {
    if (this.value === null) {
      this.value = value;
      this.weight = 1;
      return;
    }

    if (value < this.value) {
      if (this.left) {
        this.left.add(value);
      } else {
        this.left = new Tree(value);
      }
    } else {
      if (this.right) {
        this.right.add(value);
      } else {
        this.right = new Tree(value);
      }
    }

    this.updateWeight();

    const leftWeight = this.left ? this.left.weight : 0;
    const rightWeight = this.right ? this.right.weight : 0;

    if (leftWeight - rightWeight > 1) {
      // this tree is out of balance, left branch is heavier, need to rotate left
      if (this.left && this.left.right && this.left.right.value !== null) {
        // special case - the left child is right heavy, first need to rotate right the child
        this.left.rotateRight();
      }
      this.rotateLeft();
    } else if (rightWeight - leftWeight > 1) {
      // this tree is out of balance, right branch is heavier, need to rotate right
      if (this.right && this.right.left && this.right.left.value !== null) {
        // special case - the left child is right heavy, first need to rotate right the child
        // special case
        // a double rotation when the opposite child is heavy during a rotation
        // so for example, this tree is right heavy
        // but the right child is left heavy
        // so we first perform a left rotation on that left heavy child
        this.right.rotateLeft();
      }
      this.rotateRight();
    }
  }

  rotateRight(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const nodeA = this; // 5
    const nodeB = this.right; // 8
    const nodeC = this.right ? this.right.right : null; // null

    if (!nodeA || !nodeB) {
      return;
    }

    // swap values A and B
    const temp = nodeA.value;
    nodeA.value = nodeB.value;
    nodeB.value = temp;
    // 8 (right 5 (right null, left 7))

    // make node B left child of node A
    const originalLeft = nodeA.left;
    nodeA.left = nodeB;
    // 8(left 5(right null, left 7), right the same)

    // make node C right child of node A
    nodeA.right = nodeC;

    //?
    nodeB.right = nodeB.left;

    // move node B's right child to its left child (?)

    // make node A's original left child left child of node B
    nodeB.left = originalLeft;

    if (nodeC) nodeC.updateWeight();
    if (nodeB) nodeB.updateWeight();
    if (nodeA) nodeA.updateWeight();
  }

  rotateLeft(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const nodeA = this;
    const nodeB = this.left;
    const nodeC = this.left ? this.left.left : null;

    if (!nodeA || !nodeB) {
      return;
    }

    // swap values A and B
    const temp = nodeA.value;
    nodeA.value = nodeB.value;
    nodeB.value = temp;

    // make node B right child of node A
    const originalRight = nodeA.right;
    nodeA.right = nodeB;

    // make node C left child of node A
    nodeA.left = nodeC;

    nodeB.left = nodeB.right;

    // make node A's original right child right child of node B
    nodeB.right = originalRight;

    if (nodeC) nodeC.updateWeight();
    if (nodeB) nodeB.updateWeight();
    if (nodeA) nodeA.updateWeight();
  }

  updateWeight(): void {
    this.weight =
      Math.max(
        this.left ? this.left.weight : 0,
        this.right ? this.right.weight : 0
      ) + (this.value !== null ? 1 : 0);
  }
}
