// Complexity of recursive fibonacci is exponential
// O(2^n), we are creating a binary tree of calls
// https://medium.com/@edwinyung/using-fibonacci-to-exemplify-recursion-big-o-and-memoization-9b1b47316c5e
export function fibonacci(n: number): number {
  if (n <= 2) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
