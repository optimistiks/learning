import { quickSort } from "./quicksort";

describe("quickSort", function () {
  it("quicksort an array", () => {
    const input = [10, 8, 2, 1, 6, 3, 9, 4, 7, 5];
    quickSort(input);
    expect(input).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
