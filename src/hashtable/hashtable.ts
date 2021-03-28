/** Class representing a Hash Table */

/**
 * Hash table is an unordered data structure
 * It implements an associative array interface, meaning it maps keys to values
 * It uses a hash function on the key to compute the index where to put the key-value pair
 * Collisions must be handled, with linked lists or in some other way
 * The hash table needs to be resized at certain point to accomodate for an increasing number of items (different strategies exist)
 * In a well implemented hash table,
 *      average compexity of getByKey operation is constant time
 *      average compexity of insertByKey and deleteByKey operations is amortized constant time
 * Worst case is O(n) (for example with bad hashing function)
 */

export class HashTable<T> {
  private storage: [string, T][][];
  private size: number;
  length: number;

  constructor(size: number) {
    this.storage = [];
    this.size = size;
    this.length = 0;
  }

  /*
   * Inserts a new key-value pair
   * @param {string} key - the key associated with the value
   * @param {*} value - the value to insert
   */
  insert(key: string, value: T): void {
    // if length is greater than half of the size, resize
    if (this.length > this.size / 2) {
      this.resize();
    }

    // hash the key with the current size
    const hash = this._hash(key, this.size);

    // set up storage for the hash
    this.storage[hash] = this.storage[hash] || [];

    // keys are unique, if there are no item with such key, add it
    const duplicate = this.storage[hash].find((item) => item[0] === key);
    if (!duplicate) {
      this.storage[hash].push([key, value]);
      this.length += 1;
    }
  }

  private resize(): void {
    // double the size
    this.size = this.size * 2;

    // reset length
    this.length = 0;

    // save storage
    const storage = this.storage;

    // reset storage
    this.storage = [];

    // for each item in old storage, insert it into the new storage
    storage.forEach((items) => {
      items.forEach((item) => {
        this.insert(item[0], item[1]);
      });
    });
  }

  /*
   * Deletes a key-value pair
   * @param {string} key - the key associated with the value
   * @return {*} value - the deleted value
   */
  remove(key: string): T | null {
    // hash key using current size
    const hash = this._hash(key, this.size);

    // find item index
    const itemIndex = this.storage[hash].findIndex((item) => item[0] === key);
    // grab element by index
    const item = this.storage[hash][itemIndex];

    // if item is present, delete it
    if (itemIndex !== -1) {
      this.storage[hash].splice(itemIndex, 1);
      this.length -= 1;
    }

    // if there is no such item, return null
    if (!item) {
      return null;
    }

    // return deleted item value
    return item[1];
  }

  /*
   * Returns the value associated with a key
   * @param {string} key - the key to search for
   * @return {*} - the value associated with the key
   */
  retrieve(key: string): T | null {
    // hash key using current size
    const hash = this._hash(key, this.size);

    if (!this.storage[hash]) {
      return null;
    }

    // get element at hash with the given key
    const item = this.storage[hash].find((item) => item[0] === key);

    // if there is no such element, return null
    if (!item) {
      return null;
    }

    // return item value
    return item[1];
  }

  /*
   * Hashes string value into an integer that can be mapped to an array index
   * @param {string} str - the string to be hashed
   * @param {number} n - the size of the storage array
   * @return {number} - an integer between 0 and n
   */
  _hash(str: string, n: number): number {
    let sum = 0;
    for (let i = 0; i < str.length; i++) sum += str.charCodeAt(i) * 3;
    return sum % n;
  }
}
