// best case scenario - when array is already sorted - O(n) (no swaps, inner loop is skipped)
// worst case scenario - when input is in reverse order - O(n^2)
// good when input is mostly sorted
export function insertionSort(nums: number[]): number[] {
  for (let i = 1; i < nums.length; ++i) {
    if (nums[i] > nums[i - 1]) {
      continue;
    }
    const item = nums[i];
    for (let j = i - 1; j >= 0; --j) {
      if (item < nums[j]) {
        nums[j + 1] = nums[j];
        nums[j] = item;
      }
    }
  }
  return nums;
}
