// Heap sort
// Comparison sort based on Binary heap data structure
// In-place
// Generally not stable, but can be made stable
// Binary tree is a structure where each node has at most 2 children
// Complete binary tree is a binary tree where each node has exactly 2 children, except possibly the last one (so all nodes are shifted to the left as much as possible)
// Binary heap is a complete binary tree where each node is larger (max-heap) or smaller (min-heap) than its children (recursively in the subtree)
// Complexity of heapify is O(logn), complexity of building the heap is O(n), heap sort complexity is O(nlogn)

export const heapSort = (array: number[]): number[] => {
  // create a max heap from the array
  createMaxHeap(array);

  let end = array.length - 1;

  while (end > 0) {
    // swap first element and the last element of the array and run heapify on the first element
    // shifting the end to the left (sorted portion)
    // until we reach the beginning of the array
    const temp = array[end];
    array[end] = array[0];
    array[0] = temp;
    heapify(array, 0, end);
    end--;
  }

  return array;
};

const createMaxHeap = (array: number[]) => {
  // start in the middle of the array (since all elements to the right are children of elements to the left)
  let current = Math.ceil(array.length / 2);

  while (current >= 0) {
    // move left from the middle, calling heapify on the items
    heapify(array, current, array.length);
    current--;
  }
};

const heapify = (array: number[], index: number, heapSize: number) => {
  // perform heapify routine on one element in an array
  // heapSize is to preserve a sorted portion of the array in case of heapSort

  const item = array[index];

  // in a heap, a left child of a node is at index 2n+1, right child is at 2n+2
  const leftChildIndex = 2 * index + 1;
  const rightChildIndex = 2 * index + 2;

  const leftChild = leftChildIndex < heapSize ? array[leftChildIndex] : null;
  const rightChild = rightChildIndex < heapSize ? array[rightChildIndex] : null;

  if (
    leftChild != null &&
    leftChild > item &&
    (rightChild == null || leftChild > rightChild)
  ) {
    // if left child is the biggest one, swap it with the item, and call heapify on the swapped element to ensure heap validity
    array[leftChildIndex] = item;
    array[index] = leftChild;
    heapify(array, leftChildIndex, heapSize);
  } else if (
    rightChild != null &&
    rightChild > item &&
    (leftChild == null || rightChild > leftChild)
  ) {
    // if right child is the biggest one, swap it with the item, and call heapify on the swapped element to ensure heap validity
    array[rightChildIndex] = item;
    array[index] = rightChild;
    heapify(array, rightChildIndex, heapSize);
  }
};
