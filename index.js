class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addVertex(vertex) {
    this.adjList.set(vertex, []);
  }

  addEdge(vertex1, vertex2) {
    this.adjList.get(vertex1).push(vertex2);
    this.adjList.get(vertex2).push(vertex1);
  }

  bfs(startingVertex) {
    const visited = new Set();
    const queue = [];

    visited.add(startingVertex);
    queue.push(startingVertex);

    while (queue.length > 0) {
      const currentVertex = queue.shift();
      console.log(currentVertex);

      const neighbors = this.adjList.get(currentVertex);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }

  dfs(startingVertex) {
    const visited = new Set();
    this.dfsRecursive(startingVertex, visited);
  }

  dfsRecursive(vertex, visited) {
    visited.add(vertex);
    console.log(vertex);

    const neighbors = this.adjList.get(vertex);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this.dfsRecursive(neighbor, visited);
      }
    }
  }

  countNodesAtLevel(startingVertex, targetLevel) {
    const visited = new Set();
    const queue = [];
    let currentLevel = 0;
    let nodesAtTargetLevel = 0;

    visited.add(startingVertex);
    queue.push({ vertex: startingVertex, level: currentLevel });

    while (queue.length > 0) {
      const { vertex, level } = queue.shift();

      if (level === targetLevel) {
        nodesAtTargetLevel++;
      }

      const neighbors = this.adjList.get(vertex);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push({ vertex: neighbor, level: level + 1 });
        }
      }
    }

    return nodesAtTargetLevel;
  }

  countTreesInForest() {
    const visited = new Set();
    let treeCount = 0;

    for (const vertex of this.adjList.keys()) {
      if (!visited.has(vertex)) {
        this.dfsRecursive(vertex, visited);
        treeCount++;
      }
    }

    return treeCount;
  }

  hasCycle() {
    const visited = new Set();
    const recursionStack = new Set();

    for (const vertex of this.adjList.keys()) {
      if (!visited.has(vertex)) {
        if (this.hasCycleRecursive(vertex, visited, recursionStack)) {
          return true;
        }
      }
    }

    return false;
  }

  hasCycleRecursive(vertex, visited, recursionStack) {
    visited.add(vertex);
    recursionStack.add(vertex);

    const neighbors = this.adjList.get(vertex);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (this.hasCycleRecursive(neighbor, visited, recursionStack)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true;
      }
    }

    recursionStack.delete(vertex);
    return false;
  }
}





const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');

console.log('BFS Traversal:');
graph.bfs('A');


console.log('DFS Traversal:');
graph.dfs('A');


const graph2 = new Graph();
graph2.addVertex('A');
graph2.addVertex('B');
graph2.addVertex('C');
graph2.addVertex('D');
graph2.addVertex('E');
graph2.addEdge('A', 'B');
graph2.addEdge('A', 'C');
graph2.addEdge('B', 'D');
graph2.addEdge('C', 'E');

console.log('Number of nodes at level 2:', graph2.countNodesAtLevel('A', 2));


console.log('Number of trees in the forest:', graph.countTreesInForest());

const graph3 = new Graph();
graph3.addVertex('A');
graph3.addVertex('B');
graph3.addVertex('C');
graph3.addVertex('D');
graph3.addEdge('A', 'B');
graph3.addEdge('B', 'C');
graph3.addEdge('C', 'A'); 

console.log('Does the graph have a cycle?', graph3.hasCycle());
