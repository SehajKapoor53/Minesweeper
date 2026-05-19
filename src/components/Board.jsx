import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { calculateAdjacentMines, placeMines } from "../utils/boardUtils.js";

const Board = () => {
  const createBoard = (rows, cols) => {
    const board = [];
    for (let i = 0; i < rows; i++) {
      const row = [];

      for (let j = 0; j < cols; j++) {
        row.push({
          x: j,
          y: i,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0,
        });
      }

      board.push(row);
    }
    return board;
  };

  const [board, setBoard] = useState(() => {
    let b = createBoard(9, 9);
    b = placeMines(b, 10);
    b = calculateAdjacentMines(b);
    return b;
  });

  return (
    <div
      className="gap-px p-px grid justify-center"
      style={{
        gridTemplateColumns: `repeat(${board[0].length}, 48px)`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <Cell
            key={`${rowIndex},${cellIndex}`}
            cell={cell}
            rowIndex={rowIndex}
            cellIndex={cellIndex}
            setBoard={setBoard}
            board={board}
          />
        )),
      )}
    </div>
  );
};

export default Board;
