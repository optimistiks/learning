// worst case O(n^2) (nested loop)
// best case O(n) when input is already sorted
// O(1) memory (in place)
// stable
// repeatedly swap adjacent element if they are in wrong order until the whole array is sorted
export function bubbleSort(nums: number[]): number[] {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i !== nums.length; ++i) {
      if (nums[i] > nums[i + 1]) {
        // if current element is greater than the following one, we need to swap them
        // since we need to sort in ascending order
        const temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        // indicate that the swap happened, meaning that we need another pass
        // the algorithm ends when there is a pass without any swaps
        swapped = true;
      }
    }
  } while (swapped);
  return nums;
}
