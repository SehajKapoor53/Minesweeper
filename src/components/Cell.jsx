import React from "react";
import {
  floodFill,
  createSafeZone,
  placeMines,
  calculateAdjacentMines,
} from "../utils/boardUtils";

const Cell = ({ cell, board, setBoard, firstclickdone, setFirstclickdone }) => {
  const r = cell.r;
  const c = cell.c;

  const handleFlag = (e) => {
    e.preventDefault();
    if (board[r][c].isRevealed) return;
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;
    setBoard(newBoard);
  };

  const handleReveal = () => {
    if (board[r][c].isFlagged) return;
    let newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    if (!firstclickdone) {
      const safeZone = createSafeZone(newBoard, r, c);
      newBoard = placeMines(newBoard, 10, safeZone);
      newBoard = calculateAdjacentMines(newBoard);
      setFirstclickdone(true);
    }

    const current = newBoard[r][c];
    if (current.isMine) {
      current.isRevealed = true;
      setBoard(newBoard);
      return;
    }

    if (current.adjacentMines === 0) {
      newBoard = floodFill(newBoard, r, c);
    } else {
      current.isRevealed = true;
    }
    setBoard(newBoard);
  }

  return (
    <div
      onClick={handleReveal}
      onContextMenu={handleFlag}
      className={`w-12 h-12 cursor-pointer flex justify-center items-center text-3xl
      ${
        cell.isFlagged
          ? "bg-red-500"
          : cell.isRevealed
          ? "bg-zinc-500"
          : "bg-green-500"
      }
      `}
    >
      {cell.isFlagged && <img src="/flag.svg" />}
      {cell.isRevealed && cell.adjacentMines > 0 && <p>{cell.adjacentMines}</p>}
      {cell.isMine && cell.isRevealed && <img src="/mine.svg" />}
    </div>
  );
};

export default Cell;
