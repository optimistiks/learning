// worst case O(n^2) (nested loops)
// best case O(n) only when array is already sorted
export function bubbleSort(nums: number[]): number[] {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i !== nums.length; ++i) {
      if (nums[i] > nums[i + 1]) {
        const temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return nums;
}
