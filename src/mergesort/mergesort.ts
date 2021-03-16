// A divide-and-conquer algorithm
// splits the array in two halves and calls itself on each of the half and then merges the result
// to split the array we use the middle element
// worst O(nlogn), average and best are the same,
// since it always splits the array in half, and stitching takes linear time
// requires O(n) additional space for temporary arrays
// stable
export function mergeSort(nums: number[], l = 0, r = nums.length - 1): void {
  if (r <= l) {
    return;
  }
  // determine middle index taking into account left and right index
  // so if the whole array is 0..9, but we are called on a 5..9 subarray, it will give us 7
  const m = Math.floor((r - l) / 2 + l);
  mergeSort(nums, l, m);
  mergeSort(nums, m + 1, r);
  stitch(nums, l, m, r);
}

// l - index of the left item
// r - index of right item
// m - index of the middle item
function stitch(nums: number[], l: number, m: number, r: number) {
  // create temporary arrays
  // [l..m] and [m+1..r]
  const left = [];
  const right = [];
  for (let i = l; i <= r; ++i) {
    if (i <= m) {
      left.push(nums[i]);
    } else {
      right.push(nums[i]);
    }
  }

  // now we're going to iterate both arrays simultaneously
  // keep track of a "cursor" in each of the arrays
  // also keep trask of a "cursor" in the main nums[l..r] subarray
  // and put items in the main subarray in sorted order

  // left "cursor"
  let i = 0;
  // right "cursor"
  let j = 0;
  // nums[l..r] "cursor"
  let k = l;
  // we're going to iterate until one of the cursors is at the end of it's respective array
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      nums[k] = left[i];
      ++i;
    } else {
      nums[k] = right[j];
      ++j;
    }
    ++k;
  }

  // there might be some elements left either in left or right half, put them at the end of the subarray
  while (i < left.length) {
    nums[k] = left[i];
    ++i;
    ++k;
  }
  while (j < right.length) {
    nums[k] = right[j];
    ++j;
    ++k;
  }
}
