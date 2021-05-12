export class Queue<T> {
  storage: T[] = [];
  enqueue(value: T): void {
    this.storage.unshift(value);
  }
  dequeue(): T | undefined {
    return this.storage.pop();
  }
}
