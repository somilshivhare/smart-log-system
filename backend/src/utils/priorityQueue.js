/**
 * Priority Queue Implementation
 * 
 * This is a DSA (Data Structure and Algorithm) implementation of a Priority Queue.
 * Priority queues are used to manage logs based on their priority levels.
 * 
 * In a priority queue, elements are served based on priority rather than
 * insertion order. Higher priority items are processed first.
 * 
 * This implementation uses a min-heap structure where lower numbers = higher priority.
 */

class PriorityQueue {
  constructor() {
    // Array to store heap elements
    // Each element is [priority, data]
    this.heap = [];
  }

  /**
   * Get parent index of a node
   * @param {number} index - Current node index
   * @returns {number} Parent index
   */
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Get left child index
   * @param {number} index - Current node index
   * @returns {number} Left child index
   */
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  /**
   * Get right child index
   * @param {number} index - Current node index
   * @returns {number} Right child index
   */
  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  /**
   * Swap two elements in the heap
   * @param {number} i - First index
   * @param {number} j - Second index
   */
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  /**
   * Insert an element into the priority queue
   * Time Complexity: O(log n)
   * @param {number} priority - Priority value (lower = higher priority)
   * @param {*} data - Data to store
   */
  enqueue(priority, data) {
    // Add element to the end of the heap
    this.heap.push([priority, data]);
    
    // Bubble up to maintain heap property
    this.bubbleUp(this.heap.length - 1);
  }

  /**
   * Remove and return the highest priority element
   * Time Complexity: O(log n)
   * @returns {*|null} Highest priority element or null if empty
   */
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    // Get the root (highest priority)
    const root = this.heap[0];
    
    // Move last element to root
    const last = this.heap.pop();
    
    if (this.heap.length > 0) {
      this.heap[0] = last;
      // Bubble down to maintain heap property
      this.bubbleDown(0);
    }

    return root[1]; // Return the data
  }

  /**
   * Bubble up to maintain min-heap property
   * @param {number} index - Starting index
   */
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      
      // If current priority is less than parent, swap
      if (this.heap[index][0] < this.heap[parentIndex][0]) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  /**
   * Bubble down to maintain min-heap property
   * @param {number} index - Starting index
   */
  bubbleDown(index) {
    while (true) {
      let smallest = index;
      const leftChild = this.getLeftChildIndex(index);
      const rightChild = this.getRightChildIndex(index);

      // Compare with left child
      if (
        leftChild < this.heap.length &&
        this.heap[leftChild][0] < this.heap[smallest][0]
      ) {
        smallest = leftChild;
      }

      // Compare with right child
      if (
        rightChild < this.heap.length &&
        this.heap[rightChild][0] < this.heap[smallest][0]
      ) {
        smallest = rightChild;
      }

      // If smallest is not the current node, swap and continue
      if (smallest !== index) {
        this.swap(index, smallest);
        index = smallest;
      } else {
        break;
      }
    }
  }

  /**
   * Peek at the highest priority element without removing it
   * @returns {*|null} Highest priority element or null if empty
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.heap[0][1];
  }

  /**
   * Check if the queue is empty
   * @returns {boolean}
   */
  isEmpty() {
    return this.heap.length === 0;
  }

  /**
   * Get the size of the queue
   * @returns {number}
   */
  size() {
    return this.heap.length;
  }

  /**
   * Clear all elements from the queue
   */
  clear() {
    this.heap = [];
  }

  /**
   * Convert queue to array (for debugging)
   * @returns {Array} Array of [priority, data] pairs
   */
  toArray() {
    return [...this.heap];
  }
}

export default PriorityQueue;

/**
 * Example Usage:
 * 
 * const pq = new PriorityQueue();
 * pq.enqueue(3, { message: 'Info log', level: 'info' });
 * pq.enqueue(1, { message: 'Critical log', level: 'critical' });
 * pq.enqueue(2, { message: 'Error log', level: 'error' });
 * 
 * console.log(pq.dequeue()); // { message: 'Critical log', level: 'critical' } (priority 1)
 * console.log(pq.dequeue()); // { message: 'Error log', level: 'error' } (priority 2)
 * console.log(pq.dequeue()); // { message: 'Info log', level: 'info' } (priority 3)
 */

