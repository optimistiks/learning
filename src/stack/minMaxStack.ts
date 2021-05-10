import { Stack } from "./stack";

// we will use O(1) time and O(1) space technique to get min and max
// the trick is that when we want to push a new value x that is a new minimum value
// we dont push the actual value into the stack, but instead we push 2x – minEl,
// where x is the new value and minEl is the old minimum,
// and after that we set minEl = x
// this is so we can update the minimum when the minimum value is removed from the stack
// how? first, 2x - minEl is always less than x
// imagine we're popping value y, and we see that y < minEl, but it doesnt make sense, because minEl is the minimum
// well it means that y is the minimum, so we need to update minEl
// previous minEl = 2*minEl - y
export class MinMaxStack extends Stack<number> {
  minEl: number | null = null;
  maxEl: number | null = null;

  push(value: number): void {
    if (this.minEl === null) {
      this.minEl = value;
      super.push(value);
    } else {
      if (value >= this.minEl) {
        super.push(value);
      } else {
        const newValue = 2 * value - this.minEl;
        super.push(newValue);
        this.minEl = value;
      }
    }
  }

  pop(): number | undefined {
    const value = super.pop();
    let actualValue = value;

    if (this.minEl != null && value != null && value < this.minEl) {
      actualValue = this.minEl;
      const prevMinEl = 2 * this.minEl - value;
      this.minEl = prevMinEl;
    }

    if (this.storage.length === 0) {
      this.minEl = null;
    }

    return actualValue;
  }

  getMin(): number | null {
    return this.minEl;
  }
}
