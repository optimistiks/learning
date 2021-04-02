// Linked list is a data structure where each node has a pointer to the next node

// advantages over arrays:
// dynamically sized (memory-wise)
// faster insertion-deletion
// slower access

// generally speaking, insertion or deletion is constant time in linked list,
// that is if you have access to the node you want to delete or insert before/after
// if you don't have the node, O(n) work is required to find that node

class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  length: number;
  head: Node<T> | null;
  tail: Node<T> | null;

  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  push(value: T): void {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    }
    if (this.tail) {
      this.tail.next = node;
    }
    this.tail = node;
    ++this.length;
  }

  pop(): T | null {
    return this.delete(this.length - 1);
  }

  getNodeByIndex(index: number): Node<T> | null {
    if (index < 0 || index > this.length - 1) {
      return null;
    }

    if (index === 0) {
      return this.head;
    }

    if (index === this.length - 1) {
      return this.tail;
    }

    let item = this.head;
    let i = 0;

    while (item && i < index) {
      item = item.next;
      ++i;
    }

    return item;
  }

  get(index: number): T | null {
    const node = this.getNodeByIndex(index);
    return node ? node.value : null;
  }

  delete(index: number): T | null {
    let value: T | null = null;

    const node = this.getNodeByIndex(index);
    if (node) {
      value = node.value;
      this.deleteNode(node);
    }

    return value;
  }

  reverse(): void {
    let previous = null;
    let current = this.head;
    while (current) {
      const temp = current.next;
      current.next = previous;
      previous = current;
      current = temp;
    }
    const head = this.head;
    this.head = this.tail;
    this.tail = head;
  }

  print(): void {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }

  deleteNode(node: Node<T>): void {
    if (this.head === node) {
      this.head = node.next;
    }

    if (node.next) {
      node.value = node.next.value;
      node.next = node.next.next;
    } else if (this.tail === node) {
      let current = this.head;
      while (current && current.next !== node) {
        current = current.next;
      }
      if (current) {
        current.next = null;
        this.tail = current;
      }
    }

    this.length -= 1;
  }

  removeDuplicates(): void {
    const storage = new Set<T>();
    let current = this.head;
    while (current) {
      if (storage.has(current.value)) {
        this.deleteNode(current);
        // deleting a node "shifts" the next node to the current one (changes value)
        // so we don't change current in this case
      } else {
        storage.add(current.value);
        current = current.next;
      }
    }
  }
}
