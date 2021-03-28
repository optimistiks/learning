import { HashTable } from "./hashtable";

describe("hashtable", () => {
  it("should work", () => {
    const table = new HashTable<string>(5);

    expect(table.length).toEqual(0);

    table.insert("a", "john");
    expect(table.length).toEqual(1);
    expect(table.retrieve("a")).toEqual("john");

    table.insert("b", "james");
    expect(table.length).toEqual(2);
    expect(table.retrieve("a")).toEqual("john");
    expect(table.retrieve("b")).toEqual("james");

    table.remove("a");
    expect(table.length).toEqual(1);
    expect(table.retrieve("a")).toEqual(null);
    expect(table.retrieve("b")).toEqual("james");

    table.insert("c", "cory");
    table.insert("d", "dani");
    table.insert("e", "eli");
    table.insert("f", "frank");
    expect(table.length).toEqual(5);
    expect(table.retrieve("a")).toEqual(null);
    expect(table.retrieve("b")).toEqual("james");
    expect(table.retrieve("c")).toEqual("cory");
    expect(table.retrieve("d")).toEqual("dani");
    expect(table.retrieve("e")).toEqual("eli");
    expect(table.retrieve("f")).toEqual("frank");
  });
});
