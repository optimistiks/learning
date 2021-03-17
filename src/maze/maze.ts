import { Direction, Maze, randomizeDirection } from "./utils";

// a recursive backtracking algorithm to generate a maze
// https://weblog.jamisbuck.org/2010/12/27/maze-generation-recursive-backtracking
/*
Here’s the mile-high view of recursive backtracking:
Choose a starting point in the field.
Randomly choose a wall at that point and carve a passage through to the adjacent cell, 
but only if the adjacent cell has not been visited yet. This becomes the new current cell.
If all adjacent cells have been visited, back up to the last cell that has uncarved walls and repeat.
The algorithm ends when the process has backed all the way up to the starting point.
*/

export const generateMaze = (
  maze: Maze,
  [xStart, yStart]: [number, number]
): Maze => {
  const current = maze[yStart][xStart];
  current.visited = true;

  const direction = randomizeDirection();

  if (!direction) {
    return maze;
  }

  direction.forEach((dir) => {
    const [x, y] = dirToPoint(dir, [xStart, yStart]);
    const node = maze[y] ? maze[y][x] : null;
    if (node == null || node.visited) {
      return;
    }
    current[dir] = false;
    node[getOppositeDir(dir)] = false;
    generateMaze(maze, [x, y]);
  });
  // code goes here
  return maze;
};

function getOppositeDir(dir: Direction): Direction {
  const vert = dir === "n" ? "s" : dir === "s" ? "n" : null;
  const horiz = dir === "e" ? "w" : dir === "w" ? "e" : null;
  return (vert || horiz)!;
}

function dirToPoint(dir: string, [x, y]: [number, number]) {
  if (dir === "n") {
    return [x, y + 1];
  } else if (dir === "s") {
    return [x, y - 1];
  } else if (dir === "e") {
    return [x + 1, y];
  } else {
    return [x - 1, y];
  }
}
