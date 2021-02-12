import { insertionSort } from "./insertionsort";

describe("insertion sort", function () {
  it("should sort correctly", () => {
    const nums = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    insertionSort(nums);
    expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
