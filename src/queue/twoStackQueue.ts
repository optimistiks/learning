import { Queue } from "./queue";
import { Stack } from "../stack/stack";

// there are 2 ways of making a queue with two stacks
// first is to increase the cost of enqueue operation
// second is to increase the cost of dequeue operation
// we add all elements to stack 1, and we remove all elements from stack 2
// if stack 2 is empty we move all elements from stack 1 to stack 2
// since we are only moving elements when the stack 2 is empty
// the amortized complexity of dequeue is O(1)
export class TwoStackQueue<T> extends Queue<T> {
  firstStack: Stack<T> = new Stack<T>();
  secondStack: Stack<T> = new Stack<T>();
  enqueue(value: T): void {
    this.firstStack.push(value);
  }
  dequeue(): T | undefined {
    if (this.secondStack.length() === 0) {
      while (this.firstStack.length() > 0) {
        const value = this.firstStack.pop();
        if (value != null) {
          this.secondStack.push(value);
        }
      }
    }
    return this.secondStack.pop();
  }
}
