// a binary search tree is a data structure where elements greater than the root are on the right,
// and elements less than the root are on the left
// same is true for all nested subtrees
// it allows nlogn time for access, insert and delete on average
// however the worst case is O(n) since the tree can get out of balance
// for example when we take a sorted array and add it to the tree,
// all elements will end up on one side of tree
export class Tree<T> {
  value: T | null;
  left: Tree<T> | null;
  right: Tree<T> | null;

  constructor(value?: T) {
    this.value = value || null;
    this.left = null;
    this.right = null;
  }

  add(value: T): void {
    if (this.value === null) {
      this.value = value;
      return;
    }

    const tree = new Tree<T>(value);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let check: Tree<T> | null = this;

    while (check) {
      if (
        tree.value !== null &&
        check.value !== null &&
        tree.value < check.value
      ) {
        if (check.left === null) {
          check.left = tree;
          check = null;
        } else {
          check = check.left;
        }
      } else {
        if (check.right === null) {
          check.right = tree;
          check = null;
        } else {
          check = check.right;
        }
      }
    }
  }
}
