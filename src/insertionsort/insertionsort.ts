// best case scenario - when array is already sorted - O(n) (no swaps, inner loop is skipped)
// worst case scenario - when input is in reverse order - O(n^2)
// memory O(1) (in-place)
// stable
// good when input is mostly sorted
// takes the current element and compares it to it's predecessors
// swaps with a predecessor if predecessor is larger
export function insertionSort(nums: number[]): number[] {
  for (let i = 1; i < nums.length; ++i) {
    if (nums[i] > nums[i - 1]) {
      // if current element is greater than the previous one, continue
      // this guarantees the best case O(n) since the inner loop is skipped
      continue;
    }
    const item = nums[i];
    for (let j = i - 1; j >= 0; --j) {
      // iterate the sorted portion of the array backwards
      // starts with the previous element and ends at 0
      if (item < nums[j]) {
        // compare current element with the previous element
        // if current element is less than the previous, swap them
        nums[j + 1] = nums[j];
        nums[j] = item;
      }
    }
  }
  return nums;
}
