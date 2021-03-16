// Radix sort
// Non-comparative
// Stable sort
// Can use either counting sort or bucket sort as a subroutine
// The idea is to sort numbers by their digits,
// either starting from the most significant, or from the least significant (MSD/LSD)
// MSD produces order more suitable for strings, and LSD for numbers
// Time complexity depends on the number of digits d and on base b, O(d(n+b))
// Since we're doing d passes of the subroutine sorting algorithm
// The algorithm runs in linear time when b and n are of the same magnitude and d is a known constant
// Space complexity is O(n + b)

// LSD radix sort
export function radixSort(input: number[], b: number, d: number): number[] {
  // array of b buckets
  const buckets: number[][] = Array.from({ length: b }, () => []);

  let result = input;
  // iterate starting from the least significant digit
  for (let i = d - 1; i >= 0; --i) {
    // iterate the input array
    for (let j = 0; j < result.length; ++j) {
      let item = result[j].toString();
      // pad item with zeros if needed
      item =
        Array.from({ length: d - item.length })
          .fill(0)
          .join("") + item;
      // grab the digit
      const digit = item[i];
      // put item into appropriate bucket
      buckets[parseInt(digit, b)].push(result[j]);
    }
    // iterate buckets to reconstruct a sorted array and empty the buckets
    const sorted = [];
    for (let bi = 0; bi < buckets.length; ++bi) {
      const bucket = buckets[bi];
      while (bucket.length > 0) {
        sorted.push(bucket.shift() as number);
      }
    }
    result = sorted;
  }

  return result;
}
