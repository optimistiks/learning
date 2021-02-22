// Factorial of a positive integer n is a product of all positive integers less than or equal to n.
// 5! = 5*4*3*2*1 = 120
// recursive factorial complexity O(n)
// that is, if you assume multiplication as O(1)
export function factorial(n: number): number {
  if (n < 0) {
    throw new Error("Negative number given");
  }
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}
