// A divide-and-conquer algorithm like mergesort.
// picks an element as a pivot element
// and then partitions the array around that pivot element
// the way that all elements less than the pivot are to the left of the pivot
// and all elements greater than the pivot are to the right of the pivot
// then it calls itself on each side of the pivot to do the same thing
// worst case scenario O(n^2) if pivot happens to be the largest or smallest element all the time (quite rare)
// average and best O(nlogn)
// unlike mergesort, does not require any extra space (in-place)
// not stable
export function quickSort(
  nums: number[],
  start = 0,
  end = nums.length - 1
): void {
  if (end - start < 1) {
    return;
  }
  const pivotIndex = partition(nums, start, end);
  quickSort(nums, start, pivotIndex - 1);
  quickSort(nums, pivotIndex + 1, end);
}

// start - index of the first element
// end - index of the last element
// partition the array [start..end] around the pivot element (last)
function partition(nums: number[], start: number, end: number) {
  // this is the position where we insert our pivot on the last step
  let pivotPoint = start;

  // take last element as a pivot element
  const pivotIndex = end;
  const pivot = nums[pivotIndex];

  // reorder the elements around the pivot point
  for (let i = start; i < pivotIndex; ++i) {
    if (nums[i] < pivot) {
      const temp = nums[pivotPoint];
      nums[pivotPoint] = nums[i];
      nums[i] = temp;
      ++pivotPoint;
    }
  }

  // insert out pivot element at the pivotPoint position
  const temp = nums[pivotPoint];
  nums[pivotPoint] = pivot;
  nums[pivotIndex] = temp;

  return pivotPoint;
}
