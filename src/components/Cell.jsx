import React from "react";
import {
  floodFill,
  createSafeZone,
  placeMines,
  calculateAdjacentMines,
} from "../utils/boardUtils";

const Cell = ({ cell, board, setBoard, firstclickdone, setFirstclickdone, gameState, setGameState, mines, flagsLeft, setFlagsLeft }) => {


  const r = cell.r;
  const c = cell.c;

  if (gameState === "lost" || gameState === "won") return;

  const handleFlag = (e) => {
    e.preventDefault();
    if (board[r][c].isRevealed) return;
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    if(newBoard[r][c].isFlagged === true){
      newBoard[r][c].isFlagged = false;
      setFlagsLeft(f=>f+1)
    }else{
      newBoard[r][c].isFlagged = true;
      setFlagsLeft(f=>f-1)
    }
    setBoard(newBoard);
  };

  const handleReveal = () => {
    if (board[r][c].isFlagged) return;
    let newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    if (!firstclickdone) {
      const safeZone = createSafeZone(newBoard, r, c);
      newBoard = placeMines(newBoard, mines, safeZone);
      newBoard = calculateAdjacentMines(newBoard);
      setFirstclickdone(true);
      setGameState("playing");
    }

    const current = newBoard[r][c];

    if (current.isMine) {
      current.isRevealed = true;
      setBoard(newBoard);
      setGameState("lost")
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
      className={`text-zinc-800 w-12 h-12 cursor-pointer flex justify-center items-center text-3xl
      ${
        cell.isFlagged
          ? "bg-amber-200"
          : cell.isRevealed
          ? "bg-slate-400 border border-zinc-700"
          : "bg-emerald-500 hover:bg-emerald-400"
      }
      `}
    >
      {cell.isFlagged && <img src="/flag.svg" />}
      {cell.isRevealed && cell.adjacentMines > 0 && <p>{cell.adjacentMines}</p>}
      {cell.isMine && cell.isRevealed && <img className="bg-red-500" src="/mine.svg" />}
    </div>
  );
};

export default Cell;
