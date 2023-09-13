class Stack {
  constructor() {
    this.items = [];
  }

  /**
   * Adds an element to the top of the stack.
   *
   * @param {type} element - The element to add to the stack.
   */
  push(element) {
    this.items.push(element);
  }

  /**
   * Removes and returns the element at the top of the stack.
   *
   * @return {type} The element at the top of the stack.
   */
  pop() {
    return this.items.pop();
  }

  /**
   * Returns the element at the top of the stack without removing it.
   *
   * @return {type} The element at the top of the stack.
   */
  peek() {
    return this.items[this.items.length - 1];
  }
}
// Create a new instance of the Stack class
const stack = new Stack();

// Add elements to the stack
stack.push(5);
stack.push(10);
stack.push(15);

// Remove and return the element at the top of the stack
const poppedElement = stack.pop();
console.log(poppedElement); // Output: 15

// Get the element at the top of the stack without removing it
const topElement = stack.peek();
console.log(topElement); // Output: 10
class Queue {
  constructor() {
    this.items = [];
  }

  /**
   * Adds an element to the end of the queue.
   *
   * @param {type} element - The element to add to the queue.
   */
  enqueue(element) {
    this.items.push(element);
  }

  /**
   * Removes and returns the element at the front of the queue.
   *
   * @return {type} The element at the front of the queue.
   */
  dequeue() {
    return this.items.shift();
  }

  /**
   * Returns the element at the front of the queue without removing it.
   *
   * @return {type} The element at the front of the queue.
   */
  peek() {
    return this.items[0];
  }
}

class MinMaxStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
    this.maxStack = [];
  }

  /**
   * @param {any} value - The value to be pushed onto the stack.
   */
  push(value) {
    this.stack.push(value);

    // Update minStack
    if (this.minStack.length === 0 || value <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(value);
    }

    // Update maxStack
    if (this.maxStack.length === 0 || value >= this.maxStack[this.maxStack.length - 1]) {
      this.maxStack.push(value);
    }
  }

  /**
   * @returns {*} The top element of the stack.
   * @throws {Error} If the stack is empty.
   */
  pop() {
    // Check if the stack is empty
    if (this.stack.length === 0) {
      throw new Error("Stack is empty");
    }

    // Remove the top element from the stack
    const value = this.stack.pop();

    // Update the minStack if necessary
    if (value === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }

    // Update the maxStack if necessary
    if (value === this.maxStack[this.maxStack.length - 1]) {
      this.maxStack.pop();
    }

    // Return the top element of the stack
    return value;
  }

  /**
   * Returns the minimum element in the stack.
   * @throws {Error} If the stack is empty.
   * @returns {number} The minimum element in the stack.
   */
  getMin() {
    // Check if the stack is empty
    if (this.minStack.length === 0) {
      throw new Error("Stack is empty");
    }

    // Return the top element of the minStack
    return this.minStack[this.minStack.length - 1];
  }

  /**
   * Retrieves the maximum element from the stack.
   *
   * @returns {number} The maximum element from the stack.
   * @throws {Error} If the stack is empty.
   */
  getMax() {
    if (this.maxStack.length === 0) {
      throw new Error("Stack is empty");
    }
    return this.maxStack[this.maxStack.length - 1];
  }

  /**
   * Retrieves the top element of the stack without removing it.
   *
   * @returns {any} The top element of the stack.
   * @throws {Error} If the stack is empty.
   */
  peek() {
    // Check if the stack is empty
    if (this.stack.length === 0) {
      throw new Error("Stack is empty");
    }

    // Retrieve and return the top element of the stack
    return this.stack[this.stack.length - 1];
  }
}

const minMaxStack = new MinMaxStack();
minMaxStack.push(5);
minMaxStack.push(2);
minMaxStack.push(10);

console.log(minMaxStack.getMin()); // Output: 2
console.log(minMaxStack.getMax()); // Output: 10
console.log(minMaxStack.peek()); // Output: 10

minMaxStack.pop();
console.log(minMaxStack.getMin()); // Output: 2
console.log(minMaxStack.getMax()); // Output: 5
console.log(minMaxStack.peek()); // Output: 2

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  /**
   * Inserts a new node with the given value into the binary search tree.
   * @param {any} value - The value to be inserted.
   */
  insert(value) {
    // Create a new node with the given value
    const newNode = new Node(value);

    // If the root is null, set the new node as the root
    if (!this.root) {
      this.root = newNode;
    } else {
      // Otherwise, insert the new node into the tree
      this.insertNode(this.root, newNode);
    }
  }

  /**
   * Inserts a new node into the binary tree.
   * @param {Node} node - The current node being checked.
   * @param {Node} newNode - The new node to be inserted.
   */
  insertNode(node, newNode) {
    // If the value of the new node is less than the value of the current node,
    // check if there is a left child. If not, assign the new node to the left child.
    // Otherwise, recursively call the insertNode function on the left child.
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      // If the value of the new node is greater than or equal to the value of the current node,
      // check if there is a right child. If not, assign the new node to the right child.
      // Otherwise, recursively call the insertNode function on the right child.
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  search(value) {
    return this.searchNode(this.root, value);
  }

  /**
   * Searches for a node with the given value in the binary tree.
   * @param {Node} node - The root node of the binary tree to search in.
   * @param {number} value - The value to search for.
   * @returns {boolean} - True if the node with the given value is found, false otherwise.
   */
  searchNode(node, value) {
    // Check if the node is null
    if (!node) {
      return false;
    }

    // Check if the current node has the desired value
    if (node.value === value) {
      return true;
    }

    // Recursively search the left or right subtree based on the value
    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else {
      return this.searchNode(node.right, value);
    }
  }

  /**
   * Perform an in-order traversal of the binary tree.
   */
  inOrderTraversal() {
    // Call the helper function to perform in-order traversal starting from the root node
    this.inOrderTraversalNode(this.root);
  }

  /**
   * Helper function for in-order traversal of the binary tree.
   * @param {Node} node - The current node being traversed.
   */
  inOrderTraversalNode(node) {
    // Base case: if the node is null, return
    if (node === null) {
      return;
    }

    // Recursively traverse the left subtree
    this.inOrderTraversalNode(node.left);

    // Process the current node
    console.log(node.data);

    // Recursively traverse the right subtree
    this.inOrderTraversalNode(node.right);
  }

  inOrderTraversalNode(node) {
    if (node) {
      this.inOrderTraversalNode(node.left);
      console.log(node.value);
      this.inOrderTraversalNode(node.right);
    }
  }

  preOrderTraversal() {
    this.preOrderTraversalNode(this.root);
  }

  preOrderTraversalNode(node) {
    if (node) {
      console.log(node.value);
      this.preOrderTraversalNode(node.left);
      this.preOrderTraversalNode(node.right);
    }
  }

  postOrderTraversal() {
    this.postOrderTraversalNode(this.root);
  }

  postOrderTraversalNode(node) {
    if (node) {
      this.postOrderTraversalNode(node.left);
      this.postOrderTraversalNode(node.right);
      console.log(node.value);
    }
  }
}

// Demonstration
const binaryTree = new BinaryTree();
binaryTree.insert(5);
binaryTree.insert(3);
binaryTree.insert(7);
binaryTree.insert(2);
binaryTree.insert(4);
binaryTree.insert(6);
binaryTree.insert(8);

console.log(binaryTree.search(7)); // Output: true
console.log(binaryTree.search(9)); // Output: false

console.log("In-order traversal:");
binaryTree.inOrderTraversal(); // Output: 2 3 4 5 6 7 8

console.log("Pre-order traversal:");
binaryTree.preOrderTraversal(); // Output: 5 3 2 4 7 6 8

console.log("Post-order traversal:");
binaryTree.postOrderTraversal(); // Output: 2 4 3 6 8 7 5



class Graph {
  constructor() {
    this.vertices = new Map();
  }

  /**
   * Adds a vertex to the graph.
   * @param {any} vertex - The vertex to be added.
   */
    addVertex(vertex) {
    // Check if the vertex is already present in the graph
    if (!this.vertices.has(vertex)) {
      // If not present, add the vertex to the graph with an empty adjacency list
      this.vertices.set(vertex, []);
    }
  }

  /**
   * Adds an edge between two vertices.
   *
   * @param {type} vertex1 - The first vertex to connect.
   * @param {type} vertex2 - The second vertex to connect.
   * @return {type} - No return value.
   */
  addEdge(vertex1, vertex2) {
    this.vertices.get(vertex1).push(vertex2);
    this.vertices.get(vertex2).push(vertex1);
  }

  /**
   * Performs a depth-first search starting from the specified vertex.
   *
   * @param {Vertex} startVertex - The starting vertex for the search.
   */
  dfs(startVertex) {
    const visited = new Set();
    this.dfsRecursive(startVertex, visited);
  }

  /**
   * Performs a depth-first search (DFS) on a graph recursively starting from the specified vertex.
   *
   * @param {Vertex} vertex - The starting vertex for the DFS.
   * @param {Set<Vertex>} visited - A set to keep track of visited vertices.
   */
  dfsRecursive(vertex, visited) {
    visited.add(vertex);
    console.log(vertex);

    const neighbors = this.vertices.get(vertex);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this.dfsRecursive(neighbor, visited);
      }
    }
  }

  /**
   * Performs a breadth-first search starting from the specified vertex.
   *
   * @param {type} startVertex - The vertex to start the search from.
   * @return {type} - None.
   */
  bfs(startVertex) {
    const visited = new Set();
    const queue = [];

    visited.add(startVertex);
    queue.push(startVertex);

    while (queue.length > 0) {
      const currentVertex = queue.shift();
      console.log(currentVertex);

      const neighbors = this.vertices.get(currentVertex);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }

  /**
   * Finds the shortest distances from a given start vertex to all other vertices using Dijkstra's algorithm.
   *
   * @param {any} startVertex - The vertex from which to start the search for shortest distances.
   * @return {object} An object containing the shortest distances and the previous vertices in the shortest path.
   */
  dijkstra(startVertex) {
    const distances = new Map();
    const previous = new Map();
    const queue = [];

    for (const vertex of this.vertices.keys()) {
      distances.set(vertex, Infinity);
      previous.set(vertex, null);
      queue.push(vertex);
    }

    distances.set(startVertex, 0);

    while (queue.length > 0) {
      const currentVertex = this.getMinDistanceVertex(queue, distances);
      queue.splice(queue.indexOf(currentVertex), 1);

      const neighbors = this.vertices.get(currentVertex);

      for (const neighbor of neighbors) {
        const distance = distances.get(currentVertex) + 1;

        if (distance < distances.get(neighbor)) {
          distances.set(neighbor, distance);
          previous.set(neighbor, currentVertex);
        }
      }
    }

    return { distances, previous };
  }

  /**
   * Finds the vertex with the minimum distance in the given list of vertices.
   *
   * @param {Array} vertices - The list of vertices to search.
   * @param {Map} distances - The map of vertex-distance pairs.
   * @return {Object|null} The vertex with the minimum distance, or null if no vertex is found.
   */
  getMinDistanceVertex(vertices, distances) {
    let minDistance = Infinity;
    let minVertex = null;

    for (const vertex of vertices) {
      if (distances.get(vertex) < minDistance) {
        minDistance = distances.get(vertex);
        minVertex = vertex;
      }
    }

    return minVertex;
  }

  /**
   * Finds the shortest path between two vertices.
   *
   * @param {type} startVertex - the starting vertex
   * @param {type} endVertex - the ending vertex
   * @return {type} an array of vertices representing the shortest path
   */
  shortestPath(startVertex, endVertex) {
    const { distances, previous } = this.dijkstra(startVertex);
    const path = [];

    let currentVertex = endVertex;
    while (currentVertex !== null) {
      path.unshift(currentVertex);
      currentVertex = previous.get(currentVertex);
    }

    return path;
  }
}

// Demonstration
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');
graph.addEdge('D', 'E');
graph.addEdge('D', 'F');
graph.addEdge('E', 'F');

console.log("Depth-First Search:");
graph.dfs('A'); // Output: A B D E C F

console.log("Breadth-First Search:");
graph.bfs('A'); // Output: A B C D E F