export class Tree<T> {
  value: T;
  children: Tree<T>[];
  constructor(value: T) {
    this.value = value;
    this.children = [];
  }

  insertChild(value: T): void {
    const tree = new Tree(value);
    this.children.push(tree);
  }

  // Uses a Depth-First Traversal
  static traverse<Type>(
    tree: Tree<Type>,
    func: (item: Tree<Type>) => void = console.log
  ): void {
    const stack = [tree];
    while (stack.length > 0) {
      const item = stack.pop();
      if (!item) {
        break;
      }
      func(item);
      item.children.forEach((child) => {
        stack.push(child);
      });
    }
  }

  contains(searchValue: T): boolean {
    let found = false;
    Tree.traverse(this, (item) => {
      if (!found && item.value === searchValue) {
        found = true;
      }
    });
    return found;
  }

  static size<T>(tree: Tree<T>): number {
    let size = 0;
    Tree.traverse(tree, () => {
      size += 1;
    });
    return size;
  }

  static find<T>(tree: Tree<T>, value: T): Tree<T> | false {
    let found: Tree<T> | false = false;
    Tree.traverse(tree, (item) => {
      if (!found && item.value === value) {
        found = item;
      }
    });
    return found;
  }

  insert(parentTree: Tree<T>, value: T): void {
    const tree = new Tree(value);
    parentTree.children.push(tree);
  }

  remove(value: T): void {
    Tree.traverse(this, (item) => {
      const deleted = item.children.find((child) => child.value === value);
      if (deleted) {
        item.children = item.children
          .filter((child) => child.value !== value)
          .concat(deleted.children);
      }
    });
  }

  reorder(node1: T, node2: T): void {
    const first = Tree.find<T>(this, node1);
    const second = Tree.find<T>(this, node2);
    if (!first || !second) {
      return;
    }
    const temp = first.value;
    first.value = second.value;
    second.value = temp;
  }
}
