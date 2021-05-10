import { Stack } from "./stack";

describe("Stack", () => {
  it("should push and pop", () => {
    const stack = new Stack<number>();
    expect(stack.pop()).toEqual(undefined);
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toEqual(3);
    stack.push(4);
    stack.push(5);
    expect(stack.pop()).toEqual(5);
    expect(stack.pop()).toEqual(4);
    expect(stack.pop()).toEqual(2);
    expect(stack.pop()).toEqual(1);
    expect(stack.pop()).toEqual(undefined);
  });
});
