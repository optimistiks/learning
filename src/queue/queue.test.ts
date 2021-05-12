import { Queue } from "./queue";

describe("Stack", () => {
  it("should push and pop", () => {
    const queue = new Queue<number>();
    expect(queue.dequeue()).toEqual(undefined);
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toEqual(1);
    queue.enqueue(4);
    queue.enqueue(5);
    expect(queue.dequeue()).toEqual(2);
    expect(queue.dequeue()).toEqual(3);
    expect(queue.dequeue()).toEqual(4);
    expect(queue.dequeue()).toEqual(5);
    expect(queue.dequeue()).toEqual(undefined);
  });
});
