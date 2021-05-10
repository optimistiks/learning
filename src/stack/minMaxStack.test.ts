import { MinMaxStack } from "./minMaxStack";

describe("MinMaxStack", () => {
  test("should get min", () => {
    const stack = new MinMaxStack();

    stack.push(33);
    expect(stack.getMin()).toEqual(33);

    stack.push(22);
    expect(stack.getMin()).toEqual(22);

    stack.push(11);
    expect(stack.getMin()).toEqual(11);

    expect(stack.pop()).toEqual(11);
    expect(stack.getMin()).toEqual(22);

    expect(stack.pop()).toEqual(22);
    expect(stack.getMin()).toEqual(33);

    expect(stack.pop()).toEqual(33);
    expect(stack.getMin()).toEqual(null);

    expect(stack.pop()).toEqual(undefined);
  });
  test("should get max", () => {
    const stack = new MinMaxStack();

    stack.push(11);
    expect(stack.getMax()).toEqual(11);

    stack.push(22);
    expect(stack.getMax()).toEqual(22);

    stack.push(33);
    expect(stack.getMax()).toEqual(33);

    expect(stack.pop()).toEqual(33);
    expect(stack.getMax()).toEqual(22);

    expect(stack.pop()).toEqual(22);
    expect(stack.getMax()).toEqual(11);

    expect(stack.pop()).toEqual(11);
    expect(stack.getMax()).toEqual(null);

    expect(stack.pop()).toEqual(undefined);
  });
});
