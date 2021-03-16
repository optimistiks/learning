import { radixSort } from "./radixsort";

describe("radixsort", () => {
  it("should sort", () => {
    expect(radixSort([512, 31, 415, 62, 212, 1024, 1, 808], 10, 4)).toEqual([
      1,
      31,
      62,
      212,
      415,
      512,
      808,
      1024,
    ]);
  });
});
