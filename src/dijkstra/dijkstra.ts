// the gist of Dijkstra's algorithm
//  we start at root node, we set it's distance to 0
//  we consider this node visited,
//  we consider all other nodes unvisited
//  we calculate distance for the node's siblings (as sum of the current node + edge weight)
//  then from all unvisited nodes we grab the one with min distance
//  we repeat the process for the min node (mark visited, calc siblings distance, pick min from unvisited, and so on)
// as a result, we know minimum distance to each node
// to reconstruct the actual path to each node,
// we can keep track of the parent node each time we find the shortest path to a node
// Dijkstra's algorithm works for directed and undirected graphs
// Dijkstra's algorithm requires edge weights to be positive
// even though there are some edge cases where it might give correct result with negative edges and even negative cycles
// Time Complexity of Dijkstra's Algorithm is O ( V^2 ) but with min-priority queue it drops down to O ( V + ElogV ) .

// get distance of node from distances array
// infinity means unknown
function getDistance(node: number | null, distances: number[]) {
  return node == null || distances[node] == null
    ? Number.POSITIVE_INFINITY
    : distances[node];
}

// update distances for every sibling of the node
function updateDistances(graph: number[][], node: number, distances: number[]) {
  const nodeDistance = getDistance(node, distances);
  graph.forEach((_, to) => {
    if (graph[to][node] === 0) {
      return;
    }
    const newDistance = nodeDistance + graph[to][node];
    const toDistance = getDistance(to, distances);
    if (newDistance < toDistance) {
      distances[to] = newDistance;
    }
  });
}

// find minimum distance node from the ones we haven't visited
function getMinDistanceNode(
  graph: number[][],
  visited: boolean[],
  distances: number[]
) {
  return graph.reduce<number | null>((minNode, _, node) => {
    if (visited[node]) {
      // skip visited nodes
      return minNode;
    }

    const minNodeDistance = getDistance(minNode, distances);
    const nodeDistance = getDistance(node, distances);

    if (nodeDistance < minNodeDistance) {
      return node;
    }

    return minNode;
  }, null);
}

export function buildSpt(graph: number[][], root: number): number[] {
  const distances = [];
  const visited = [];

  // the starting node is root node
  // the distance of the root node is 0
  let from: number | null = root;
  distances[from] = 0;

  // the algorithm ends when there is no node to continue
  // it maybe that we processed all nodes, or it might be that some nodes are unreachable
  while (from != null) {
    updateDistances(graph, from, distances);
    // add current node to visited
    visited[from] = true;
    // find new from - a node with a minimal calculated distance among not visited
    from = getMinDistanceNode(graph, visited, distances);
  }

  return distances;
}
