export class Stack<T> {
  storage: Array<T> = [];

  push(value: T): void {
    this.storage.push(value);
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  length(): number {
    return this.storage.length;
  }
}
