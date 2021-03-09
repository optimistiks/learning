// Bucket sort
// Linear time sort
// Applicable when the input is uniformly distributed across a range
// Stable sort
// The idea is that we distribute the input across k equal-size buckets
// If the input is uniformly distributed, we will end up with small-sized buckets,
// which then can be efficiently sorted using, for example with insertion sort, or recursive bucket sort,
// and then we concatenate the sorted buckets into the final result.
// Worst case time complexity is dictated by the sorting algorithm used to sort buckets. In case of insertion sort it's O(n^2).
// Average running time with uniformly distributed input is O(n + n^2/k + k), which, if k ~ n, simplifies to O(n + k), or rather to O(n) - linear time
// Worst case space complexity is O(n*k), where k is the number of buckets. In a well-implemented BucketSort,
// however, the can drop to O(n + k) by allocating only enough space to hold every element in the array,
// then storing pointers to where each bucket starts.

// recursive bucket sort
export function bucketSort(input: number[], k: number): number[] {
  if (input.length <= 1) {
    return input;
  }

  // find min and max
  const minMax = input.reduce<{ min: number | null; max: number | null }>(
    (acc, item) => {
      if (acc.min == null || item < acc.min) {
        acc.min = item;
      }
      if (acc.max == null || item > acc.max) {
        acc.max = item;
      }
      return acc;
    },
    { min: null, max: null }
  );

  const { min, max } = minMax;

  if (min == null || max == null) {
    return input;
  }

  // find range
  const range = max - min;

  if (range === 0) {
    return input;
  }

  // create k buckets, +1 for the max element
  let buckets: number[][] = Array.from({ length: k + 1 }, () => []);

  input.forEach((item) => {
    // find bucket index in constant time
    const bucketIndex = Math.floor((k * (item - min)) / range);
    buckets[bucketIndex].push(item);
  });

  buckets = buckets.map((bucket) => bucketSort(bucket, k));

  return buckets.reduce((acc, bucket) => [...acc, ...bucket], []);
}
