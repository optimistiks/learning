import { buildSpt } from "./dijkstra";

describe("Dijkstras algorithm", () => {
  it("should find shortest path", () => {
    // adjacency matrix
    // if graph[i][j] is not 0, it means there is an edge from i to j
    // the value of graph[i][j] determines the weight of the edge
    const graph = [
      [0, 0, 0, 0, 0],
      [10, 0, 0, 0, 0],
      [0, 10, 0, 0, 0],
      [5, 0, 10, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    const spt = buildSpt(graph, 0);
    expect(spt).toEqual([0, 10, 20, 5]);
  });
  it("should find shortest path", () => {
    const graph = [
      [0, 0, 0, 0, 0],
      [10, 0, 0, 0, 0],
      [0, 10, 0, 0, 0],
      [0, 0, 10, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    const spt = buildSpt(graph, 0);
    expect(spt).toEqual([0, 10, 20, 30]);
  });
});
