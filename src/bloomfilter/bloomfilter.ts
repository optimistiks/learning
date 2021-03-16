import XXH from "xxhashjs";
// here are your hashing functions. it's not essential you know how they work
// a library called xxhashjs is being loaded (as XXH) and we're using three different
// instances of that as your hashing functions
const h1 = (string: string) =>
  Math.abs(XXH.h32(0xabcd).update(string).digest().toNumber() % 100);
const h2 = (string: string) =>
  Math.abs(XXH.h32(0x1234).update(string).digest().toNumber() % 100);
const h3 = (string: string) =>
  Math.abs(XXH.h32(0x6789).update(string).digest().toNumber() % 100);

// fill out these two methods
// `add` adds a string to the bloom filter and returns void (nothing, undefined)
// `contains` takes a string and tells you if a string is maybe in the bloom filter
export class BloomFilter {
  array: BitArray;
  constructor() {
    this.array = new BitArray(100);
  }
  add(string: string): void {
    const hashes = [h1(string), h2(string), h3(string)];
    hashes.forEach((hash) => this.array.setBit(hash));
  }
  contains(string: string): boolean {
    const hashes = [h1(string), h2(string), h3(string)];
    return hashes.every((hash) => this.array.getBit(hash));
  }
}

// try to mimic bit array in Javascript, for bloom filter, just for educational purposes
class BitArray {
  array: Uint8Array;
  itemBits = 8;

  // size = desired number of bits
  constructor(size: number) {
    this.array = new Uint8Array(Math.ceil(size / this.itemBits));
  }

  // returns true is bit at index is set to 1, false otherwise
  getBit(index: number): boolean {
    const { item, itemBit } = this._getBitAddress(index);
    // so what's happening here
    // first, the << operator
    // it pads the binary value with zeros from the right
    // for example, if you take 0b1 as initial value, and call 0b1 << 1
    // it will add one zero on the right ,resulting in binary value of 0b10
    // second, the & operator
    // it will return zero if any of two bits are zero (on the same position)
    // so for example 0b0001 & 0b1000 will return 0 since there are no bits on the same position that are 1, which means all bits turned to 0
    // however 0b0101 & 0b0100 will return 0b0100 since second bit is 1 in both values, so it stays at 1, and all other bits are turned to 0
    // so it's useful if we want to check if a certain bit is set to 1 or not
    return !!(this.array[item] & (0b1 << this._getShift(itemBit)));
  }

  // sets bit at index to 1
  setBit(index: number): number {
    const { item, itemBit } = this._getBitAddress(index);
    // see << explanation above
    // now, the | operator
    // it flips both bits to 1 if at least one is set to 1
    // for example 0b0101 & 0b1000 result in 0b1101 (first bit is flipped, the rest stays as is)
    this.array[item] = this.array[item] | (0b1 << this._getShift(itemBit));
    return this.array[item];
  }

  _getShift(itemBit: number): number {
    // we want to pad the bit with zeros from the right
    // which means to get the bit at index 0 we need to pad the bit with 7 zeros so we get something like 0b10000000
    return this.itemBits - 1 - itemBit;
  }

  _getBitAddress(index: number): { item: number; itemBit: number } {
    // we know each item in this.array is 8 bits
    // index is the index of a bit we want to check
    // so index can be for example 50 (since there can be a lot of items in this.array, 8 bits each)
    // so first we divide index by the number of bits in one item, and we floor the result
    // it will give us the index of the item that we need in the array (in case of 50, it will be 6)
    const item = Math.floor(index / this.itemBits);
    // next, we want to know what bit we want to check in that particular array item
    // so we grab the remainder of the division, it will be our bit index
    // (for example remainder of 50 / 8 is 2, which means we need to check bit at index 2 in the array item at index 6)
    const itemBit = index % this.itemBits;
    return { item, itemBit };
  }
}
