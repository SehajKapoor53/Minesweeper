import React from "react";
import Cell from "./Cell";

const Board = () => {
  const board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  return (
    <div
      className="gap-px p-px grid justify-center"
      style={{
        gridTemplateColumns: "repeat(9, 48px)",
      }}
    >
      {board.flatMap((row, rowIndex) =>
        row.map((cell, cellIndex) => <Cell key={`${rowIndex},${cellIndex}`} />),
      )}
    </div>
  );
};

export default Board;
