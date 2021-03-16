// example implementation of an Array data structure
// delete is O(n), push, pop and get are constant

// advantages over linked lists:
// constant time random access
// disadvantages
// statically sized memory-wise

// random access operations (get by index) are constant time
// however operations like insert/delete from the middle of the array require O(n) time
// due to the need to shift all the elements after the one you touched
export class ArrayList<T = unknown> {
  length: number;
  data: Record<number, T>;

  constructor() {
    this.length = 0;
    this.data = {};
  }

  push(value: T): void {
    this.data[this.length++] = value;
  }

  pop(): T | undefined {
    return this.delete(this.length - 1);
  }

  get(index: number): T {
    return this.data[index];
  }

  delete(index: number): T | undefined {
    if (index >= this.length || index < 0) {
      return;
    }
    const value = this.get(index);
    this._collapse(index);
    return value;
  }

  _collapse(index: number): void {
    --this.length;
    for (let i = index; i < this.length; ++i) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length];
  }
}
