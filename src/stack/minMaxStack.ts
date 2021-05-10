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

// How 2*x - minEle is less than x in push()?
// x < minEle which means x - minEle < 0
// Adding x on both sides
// x - minEle + x < 0 + x
// 2*x - minEle < x
// We can conclude 2*x - minEle < new minEle

// what about getMax()
// insert 1
// max = 1
// stack [1]
// insert 3
// max = 3
// stack [1, 4 (3(value) + 1(current max))]
// pop (value = 4)
// value > max
// real value = current max (3)
// previous max = 4 - 3 = 1

export class MinMaxStack extends Stack<number> {
  minEl: number | null = null;
  maxEl: number | null = null;

  push(value: number): void {
    if (this.minEl === null) {
      this.minEl = value;
    }

    if (this.maxEl === null) {
      this.maxEl = value;
    }

    if (value >= this.minEl && value <= this.maxEl) {
      super.push(value);
    } else {
      if (value < this.minEl) {
        const newValue = 2 * value - this.minEl;
        super.push(newValue);
        this.minEl = value;
      } else {
        const newValue = value + this.maxEl;
        super.push(newValue);
        this.maxEl = value;
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
    } else if (this.maxEl != null && value != null && value > this.maxEl) {
      actualValue = this.maxEl;
      const prevMaxEl = value - this.maxEl;
      this.maxEl = prevMaxEl;
    }

    if (this.storage.length === 0) {
      this.minEl = null;
      this.maxEl = null;
    }

    return actualValue;
  }

  getMin(): number | null {
    return this.minEl;
  }

  getMax(): number | null {
    return this.maxEl;
  }
}
