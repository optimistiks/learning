import { TwoStackQueue } from "./twoStackQueue";

describe("TwoStackQueue", () => {
  it("should enqueue and dequeue", () => {
    const queue = new TwoStackQueue();
    const numbers = Array.from({ length: 10 }).map((v, i) => i);
    numbers.forEach((number) => {
      queue.enqueue(number);
    });
    console.log(queue.firstStack, queue.secondStack);
    expect(queue.dequeue()).toEqual(0);
    expect(queue.dequeue()).toEqual(1);
    expect(queue.dequeue()).toEqual(2);
    queue.enqueue(15);
    expect(queue.dequeue()).toEqual(3);
    expect(queue.dequeue()).toEqual(4);
    expect(queue.dequeue()).toEqual(5);
    expect(queue.dequeue()).toEqual(6);
    expect(queue.dequeue()).toEqual(7);
    expect(queue.dequeue()).toEqual(8);
    expect(queue.dequeue()).toEqual(9);
    expect(queue.dequeue()).toEqual(15);
    expect(queue.dequeue()).toEqual(undefined);
  });
});
