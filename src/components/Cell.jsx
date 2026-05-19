import React from "react";

const Cell = ({ cell, rowIndex, cellIndex, board, setBoard, className }) => {
  let isFlagged = cell.isFlagged;
  let isMine = cell.isMine;
  let isRevealed = cell.isRevealed;
  let adjacentMines = cell.adjacentMines;

  const handleFlag = (e) => {
    e.preventDefault();
    if (board[rowIndex][cellIndex].isRevealed === false){
      const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
      newBoard[rowIndex][cellIndex].isFlagged =
        !newBoard[rowIndex][cellIndex].isFlagged;
      setBoard(newBoard);
    }
  }

  const handleReveal=() => {
    if (board[rowIndex][cellIndex].isFlagged === false){
      const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
      newBoard[rowIndex][cellIndex].isRevealed =true
      setBoard(newBoard);
    }
  }

  return (
    <div
      onClick={handleReveal}
      onContextMenu={handleFlag}
      className={`w-12 h-12 cursor-pointer
      ${cell.isFlagged
        ? "bg-red-500"
        : cell.isRevealed
        ? "bg-green-500"
        : "bg-zinc-500"}
      `}
    ></div>
  );
};

export default Cell
