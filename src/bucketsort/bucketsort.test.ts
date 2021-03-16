import { bucketSort } from "./bucketsort";

describe("bucketsort", () => {
  it("should sort", () => {
    expect(bucketSort([0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51], 3)).toEqual([
      0.23,
      0.25,
      0.32,
      0.42,
      0.47,
      0.51,
      0.52,
    ]);
    expect(bucketSort([0.5, 0.5, 0.5, 0.1, 0.5, 0.5, 0.5], 3)).toEqual([
      0.1,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
    ]);
    expect(bucketSort([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], 3)).toEqual([
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
    ]);
  });
});
