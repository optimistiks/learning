import { countingSort } from "./countingsort";

describe("countingsort", () => {
  it("should sort", () => {
    expect(
      countingSort<{ id: number; text?: string }>(
        [
          { id: 1 },
          { id: 3 },
          { id: 4 },
          { id: 4 },
          { id: 3 },
          { id: 0, text: "baz" },
          { id: 3 },
          { id: 4 },
          { id: 0, text: "foo" },
          { id: 0, text: "bar" },
          { id: 3 },
          { id: 2 },
          { id: 0 },
          { id: 4 },
          { id: 0 },
        ],
        (item) => item.id
      )
    ).toEqual([
      { id: 0, text: "baz" },
      { id: 0, text: "foo" },
      { id: 0, text: "bar" },
      { id: 0 },
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 3 },
      { id: 3 },
      { id: 3 },
      { id: 4 },
      { id: 4 },
      { id: 4 },
      { id: 4 },
    ]);
  });
});
