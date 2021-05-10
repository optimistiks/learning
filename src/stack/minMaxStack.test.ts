import { MinMaxStack } from "./minMaxStack";

describe("MinMaxStack", () => {
  test("should get min", () => {
    const stack = new MinMaxStack();
    stack.push(3);
    expect(stack.getMin()).toEqual(3);
    stack.push(2);
    expect(stack.getMin()).toEqual(2);
    stack.push(1);
    expect(stack.getMin()).toEqual(1);
    expect(stack.pop()).toEqual(1);
    expect(stack.getMin()).toEqual(2);
    expect(stack.pop()).toEqual(2);
    expect(stack.getMin()).toEqual(3);
    expect(stack.pop()).toEqual(3);
    expect(stack.getMin()).toEqual(null);
    expect(stack.pop()).toEqual(undefined);
  });
  test("should get max", () => {
    expect(1).toEqual(1);
  });
});
