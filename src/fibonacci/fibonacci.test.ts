import { fibonacci } from "./fibonacci";

describe("fibonacci", function () {
  it("should do fibonacci", () => {
    expect(fibonacci(1)).toEqual(1);
    expect(fibonacci(9)).toEqual(34);
    expect(fibonacci(15)).toEqual(610);
    expect(fibonacci(20)).toEqual(6765);
  });
});
