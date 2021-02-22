// Linked list is a data structure where each node has a pointer to the next node

// advantages over arrays:
// dynamically sized (memory-wise)
// faster insertion-deletion
// slower access

// generally speaking, insertion or deletion is constant time in linked list,
// that is if you have access to the node before the one you want to delete or insert
// if you don't have the node, O(n) work is required to find that node

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

    if (this.length === 0) {
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

  _get(index: number): Node<T> | null {
    let item = null;
    let i = 0;
    while (i <= index) {
      item = i === 0 ? this.head : item ? item.next : null;
      ++i;
    }
    return item;
  }

  get(index: number): T | null {
    const item = this._get(index);
    return item ? item.value : null;
  }

  delete(index: number): T | null {
    if (this.length === 0) {
      return null;
    }

    const prev = this._get(index - 1);
    const item = prev ? prev.next : this.head;

    if (index === 0 && this.head) {
      this.head = this.head.next;
    }

    if (prev && prev.next) {
      prev.next = prev.next.next;
    }

    if (index === this.length - 1) {
      this.tail = prev;
      if (this.tail) {
        this.tail.next = null;
      }
    }

    --this.length;

    return item ? item.value : null;
  }
}

class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}
