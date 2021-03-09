// Counting sort
// Non-comparative sort
// Linear time sort
// Applicable when integers are in a small range of k, with numbers 0 to k-1
// Stable sort
// Complexity is O(n+k) time and space
// Even if k = n it's still linear
// But it starts to get impractical when the range starts to get bigger than the input (for example when the range is 100n)

export function countingSort<T>(array: T[], getKey: (item: T) => number): T[] {
  // count how many of each key
  const counts = array.reduce<number[]>((acc, item) => {
    const number = getKey(item);
    acc[number] = (acc[number] || 0) + 1;
    return acc;
  }, []);

  // change counts to sum of all previous counts
  for (let i = 0; i < counts.length; ++i) {
    counts[i] = counts[i] + (counts[i - 1] || 0);
  }

  // iterate the original array in reverse (for stability), creating a sorted array of original objects (not just keys)
  const result = [];
  for (let i = array.length - 1; i >= 0; --i) {
    const item = array[i];
    const key = getKey(item);
    // index to insert the item is count - 1
    const insertAt = counts[key] - 1;
    result[insertAt] = item;
    // decrement the count
    counts[key] = insertAt;
  }

  return result;
}
