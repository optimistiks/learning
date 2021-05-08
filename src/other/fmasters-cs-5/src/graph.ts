export class Graph {
  nodes: number[];
  adjList: { [key: number]: number[] };
  constructor() {
    this.nodes = [];
    this.adjList = {};
  }

  addNode(node: number): void {
    this.nodes.push(node);
    this.adjList[node] = [];
  }

  addEdge(node1: number, node2: number): void {
    this.adjList[node1].push(node2);
    this.adjList[node2].push(node1);
  }

  removeNode(node: number): void {
    this.nodes = this.nodes.filter((n) => node !== n);
    delete this.adjList[node];
    this.nodes.forEach((n) => {
      this.adjList[n] = this.adjList[n].filter((adjN) => adjN !== node);
    });
  }

  removeEdge(node1: number, node2: number): void | string {
    if (!this.adjList[node1] || !this.adjList[node2]) {
      return "Please pass in valid indices";
    }
    this.adjList[node1] = this.adjList[node1].filter((n) => n !== node2);
    this.adjList[node2] = this.adjList[node2].filter((n) => n !== node1);
  }

  depthFirstTraversal(
    startingNode?: number,
    func = console.log
  ): void | string {
    if (!startingNode) {
      return "No starting node was provided";
    }
    const queue = [startingNode];
    const visited: number[] = [];
    while (queue.length > 0) {
      const item = queue.pop();
      if (!item) {
        break;
      }
      visited.push(item);
      func(item);
      this.adjList[item].forEach((child) => {
        if (!visited.includes(child)) {
          queue.unshift(child);
        }
      });
    }
  }

  breadthFirstTraversal(
    startingNode?: number,
    func = console.log
  ): void | string {
    if (!startingNode) {
      return "No starting node was provided";
    }
    const stack = [startingNode];
    const visited: number[] = [];
    while (stack.length > 0) {
      const item = stack.pop();
      if (!item) {
        break;
      }
      visited.push(item);
      func(item);
      this.adjList[item].forEach((child) => {
        if (!visited.includes(child)) {
          stack.push(child);
        }
      });
    }
  }
}
