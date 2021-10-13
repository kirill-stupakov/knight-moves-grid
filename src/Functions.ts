import Queue from "./functions/Queue";

type cell = {
  value: number;
  prev: number[];
};

export function createGrid(depth: number): cell[][] {
  if (depth < 0) {
    throw new Error("Depth can't be negative!");
  }

  const length = depth * 4 + 1;
  let array: cell[][] = [...Array(length)].map(() =>
    Array(length)
      .fill(0)
      .map(() => ({ value: -1, prev: [-1, -1] }))
  );

  let q = new Queue<number[]>();
  q.enqueue([depth * 2, depth * 2, 0, -1, -1]);

  while (!q.isEmpty()) {
    const [x, y, currentDepth, prevX, prevY] = q.dequeue();

    if (array[x][y].value !== -1) {
      continue;
    }

    array[x][y].value = currentDepth;
    array[x][y].prev = [prevX, prevY];

    if (currentDepth < depth) {
      [
        [x + 1, y + 2],
        [x + 2, y + 1],
        [x - 1, y - 2],
        [x - 2, y - 1],
        [x + 1, y - 2],
        [x - 2, y + 1],
        [x - 1, y + 2],
        [x + 2, y - 1],
      ]
        .filter(([x, y]) => array[x][y].value === -1)
        .map(([a, b]) => q.enqueue([a, b, currentDepth + 1, x, y]));
    }
  }

  return array;
}

export function remToPx(rem: number): number {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
