import React, { useState, useEffect } from "react";

import "./Grid.scss";
import { remToPx } from "../../Functions";

interface Props {
  cells: { value: number; prev: number[] }[][];
  startHue: number;
  endHue: number;
  maximumDepth: number;
}

const Grid: React.FC<Props> = ({ cells, startHue, endHue, maximumDepth }) => {
  const [selectedCell, setSelectedCell] = useState<number[] | null>(null);
  const [path, setPath] = useState<number[][] | null>(null);

  useEffect(() => setSelectedCell(null), [cells]);

  useEffect(() => {
    if (selectedCell == null) {
      setPath(null);
      return;
    }

    let prev = cells[selectedCell[0]][selectedCell[1]].prev;
    let newPath: number[][] = [selectedCell];

    while (prev[0] !== -1 && prev[1] !== -1) {
      newPath.push(prev);
      prev = cells[prev[0]][prev[1]].prev;
    }

    setPath(newPath);
  }, [selectedCell]);

  // console.log(path);

  const rem = remToPx(1);

  const availableSpace = Math.min(window.innerWidth, window.innerHeight);
  const gridMargin = 2 * rem;
  const cellMargin = 0.1;

  // wN + 2*w*CM*N = AV - 2GM
  const cellWidth =
    (availableSpace - 2 * gridMargin) / (cells.length * (cellMargin * 2 + 1));

  const displayCells = cells.map((row, index_x) => (
    <div className="row" key={index_x}>
      {row.map((cell, index_y) => (
        <div
          className="cell"
          style={{
            width: cellWidth,
            height: cellWidth,
            margin: cellWidth * cellMargin,
            borderRadius: 2 * cellWidth * cellMargin,
            backgroundColor:
              cell.value === -1
                ? "#0001"
                : `hsla(
                        ${
                          startHue +
                          ((endHue - startHue) * cell.value) / maximumDepth
                        },
                        60%,
                        50%,
                        ${
                          selectedCell == null ||
                          path?.some(([x, y]) => x === index_x && y === index_y)
                            ? "100%"
                            : "20%"
                        }
                      )`,
          }}
          onClick={
            cell.value === -1
              ? () => setSelectedCell(null)
              : () => setSelectedCell([index_x, index_y])
          }
          // onMouseLeave={() => setSelectedCell(null)}
          key={index_y}
        />
      ))}
    </div>
  ));

  return (
    <div className="grid" style={{ margin: gridMargin }}>
      {displayCells}
    </div>
  );
};

export default Grid;
