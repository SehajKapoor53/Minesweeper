import React from "react";
import { isValid, directions } from "../utils/boardHelper.js";

const Cell = ({ cell, rowIndex, cellIndex, board, setBoard, className }) => {
  let isFlagged = cell.isFlagged;
  let isMine = cell.isMine;
  let isRevealed = cell.isRevealed;
  let adjacentMines = cell.adjacentMines;

  const handleFlag = (e) => {
    e.preventDefault();
    if (board[rowIndex][cellIndex].isRevealed) return;
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[rowIndex][cellIndex].isFlagged =
    !newBoard[rowIndex][cellIndex].isFlagged;
    setBoard(newBoard);
  }

  const calculateAdjacentMines = (board) => {
    const rows = board.length
    const cols = board[0].length

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    for (let i = 0;  y<rows; y++) {
      for (let j = 0; x<cols; x++) {
        
        if (newBoard[i][j].isMine) continue;
        let count = 0

        for (let [dx,dy] of directions) {
          let newRow = i + dx
          let newCol = j + dy

          if(isValid(newRow,newCol,rows,cols) && newBoard[newRow][newCol].isMine) count++;

        }

        newBoard[i][j].adjacentMines = count

      }
      
    }
    return newBoard
  }

  const handleReveal=() => {
    if (board[rowIndex][cellIndex].isFlagged) return;
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[rowIndex][cellIndex].isRevealed = true
    setBoard(newBoard)
  }
  

  return (
    <div
      onClick={handleReveal}
      onContextMenu={handleFlag}
      className={`w-12 h-12 cursor-pointer
      ${cell.isFlagged
        ? "bg-red-500"
        : cell.isRevealed
        ? "bg-zinc-500"
        : "bg-green-500"}
      `}
    >
      {cell.isFlagged && <img alt="flag" src="../../public/flag.svg"/>}
    </div>
  );
}

export default Cell
