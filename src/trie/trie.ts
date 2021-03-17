// A trie, or a prefix tree, is a tree data structure that most often used to store and search strings
// A single string is "spread" across the tree with each node representing an individual character
// To indicate complete strings some nodes are marked as "end of word"
// To construct words a depth-first traversal is required
// The maximum number of children of a node is equal to the size of the alphabet
// Trie supports search, insert and delete operations in O(L) time where L is the length of the word
// Disadvantage: memory requirement. O(w*m) where m is average word length and w is the amount of words

class Node {
  eow: boolean;
  letter: string;
  children: { [key: string]: Node };
  constructor(letter: string) {
    this.eow = false;
    this.letter = letter;
    this.children = {};
  }

  add(string: string) {
    const letter = string[0].toLowerCase();

    if (!this.children[letter]) {
      this.children[letter] = new Node(letter);
    }

    if (string.length > 1) {
      this.children[letter].add(string.slice(1));
    } else {
      this.children[letter].eow = true;
    }
  }

  collect(search = "", str = ""): string[] {
    const prefix = str + this.letter;

    const children = Object.values(this.children);

    if (children.length === 0) {
      return [prefix];
    }

    const results = children
      .filter((child) => (search ? child.letter === search[0] : true))
      .map((child) => child.collect(search.slice(1), prefix))
      .reduce((acc, res) => [...acc, ...res], []);

    if (this.eow) {
      results.push(prefix);
    }

    return results;
  }

  complete(string: string) {
    return this.collect(string);
  }
}

export const createTrie = (words: string[]): Node => {
  const root = new Node("");

  words.forEach((word) => {
    root.add(word);
  });

  return root;
};
