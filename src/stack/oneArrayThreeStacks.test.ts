import { OneArrayThreeStacks } from "./oneArrayThreeStacks";

describe("OneArrayThreeStacks", () => {
  it("should push and pop", () => {
    const stack = new OneArrayThreeStacks<number>();
    // 111 222 333 444 555 third stack
    // 11 22 33 44 second stack
    // 1 2 3 4 5, 6, 7 first stack
    const numbers = [
      1,
      11,
      22,
      111,
      222,
      2,
      33,
      333,
      3,
      4,
      44,
      5,
      444,
      6,
      7,
      555,
    ];

    numbers.forEach((n) => {
      const str = n.toString();
      if (str.length === 1) {
        stack.pushFirst(n);
      } else if (str.length === 2) {
        stack.pushSecond(n);
      } else {
        stack.pushThird(n);
      }
    });

    expect(stack.storage).toEqual([
      44,
      33,
      22,
      11,
      555,
      444,
      333,
      222,
      111,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
    ]);

    expect(stack.lengths).toEqual([7, 4, 5]);

    expect(stack.popThird()).toEqual(555);
    expect(stack.popThird()).toEqual(444);

    expect(stack.popSecond()).toEqual(44);
    expect(stack.popSecond()).toEqual(33);
    expect(stack.popSecond()).toEqual(22);

    expect(stack.popThird()).toEqual(333);
    expect(stack.popThird()).toEqual(222);

    expect(stack.popFirst()).toEqual(7);
    expect(stack.popFirst()).toEqual(6);
    expect(stack.popFirst()).toEqual(5);
    expect(stack.popFirst()).toEqual(4);
    expect(stack.popFirst()).toEqual(3);
    expect(stack.popFirst()).toEqual(2);
    expect(stack.popFirst()).toEqual(1);
    expect(stack.popFirst()).toEqual(undefined);

    expect(stack.popThird()).toEqual(111);
    expect(stack.popThird()).toEqual(undefined);

    expect(stack.popSecond()).toEqual(11);
    expect(stack.popSecond()).toEqual(undefined);

    expect(stack.lengths).toEqual([0, 0, 0]);
  });
});
