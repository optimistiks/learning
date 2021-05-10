// implement 3 stacks with one array
export class OneArrayThreeStacks<T> {
  // array to store stacks
  storage: Array<T> = [];
  // track length of each stack
  lengths: [number, number, number] = [0, 0, 0];

  // get/set length of stack
  length(index: number, length?: number): number {
    if (length != null) {
      this.lengths[index] = length;
    }
    return this.lengths[index];
  }

  // get/set length of first stack
  lengthFirst(length?: number): number {
    return this.length(0, length);
  }

  // push value into first stack
  pushFirst(value: T): void {
    // push value to the end of storage
    this.storage.push(value);
    // increment length of the first stack
    this.lengthFirst(this.lengthFirst() + 1);
  }

  // pop value from the first stack
  popFirst(): T | undefined {
    if (this.lengthFirst() === 0) {
      // if length of the first stack is zero, return
      // there might be values in the storage but they are from different stacks
      return;
    }
    // decrement length of the first stack
    this.lengthFirst(this.lengthFirst() - 1);
    // pop the value from the storage (first stack values are added using push)
    return this.storage.pop();
  }

  // get/set length of second stack
  lengthSecond(length?: number): number {
    return this.length(1, length);
  }

  // push value into second stack
  pushSecond(value: T): void {
    // unshift value to the start of the storage
    this.storage.unshift(value);
    // increment second stack length
    this.lengthSecond(this.lengthSecond() + 1);
  }

  // pop value from the second stack
  popSecond(): T | undefined {
    if (this.lengthSecond() === 0) {
      // if length of the second stack is zero, return
      // there might be values in the storage but they are from different stacks
      return;
    }
    // decrement length of the first stack
    this.lengthSecond(this.lengthSecond() - 1);
    // shift the value from the storage (second stack values are added using unshift)
    return this.storage.shift();
  }

  // get/set length of third stack
  lengthThird(length?: number): number {
    return this.length(2, length);
  }

  // push value into third stack
  // third stack values are located between two other stacks in storage
  pushThird(value: T): void {
    // insert value at the end of the second stack
    const index = this.lengthSecond();
    this.storage.splice(index, 0, value);
    // increment third stack value
    this.lengthThird(this.lengthThird() + 1);
  }

  // pop value from the thirdStack
  popThird(): T | undefined {
    if (this.lengthThird() === 0) {
      // if length of the third stack is zero, return
      // there might be values in the storage but they are from different stacks
      return;
    }
    // decrement length of the third stack
    this.lengthThird(this.lengthThird() - 1);
    // pop the value from the third stack
    // the last inserted element into the third stack is always at the index === length of the second stack
    const values = this.storage.splice(this.lengthSecond(), 1);
    return values[0];
  }
}
