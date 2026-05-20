import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { calculateAdjacentMines, checkWin, placeMines } from "../utils/boardUtils.js";

const Board = () => {


  const createBoard = (rows, cols) => {
    const board = [];
    for (let i = 0; i < rows; i++) {
      const row = [];

      for (let j = 0; j < cols; j++) {
        row.push({
          r: i,
          c: j,
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
  

  const [firstclickdone, setFirstclickdone] = useState(false);
  const [board, setBoard] = useState(() => createBoard(9, 9));
  const [gameState, setGameState] = useState("idle")


  if(checkWin(board)){
    setGameState("won")
  }



  return (
    <div
      className="
      gap-0.5
      p-3
      grid
      justify-center
      bg-zinc-800
      rounded-2xl
      shadow-2xl
      border border-zinc-700
      "
      style={{
        gridTemplateColumns: `repeat(${board[0].length}, 48px)`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <Cell
            key={`${rowIndex},${cellIndex}`}
            cell={cell}
            setBoard={setBoard}
            board={board}
            firstclickdone={firstclickdone}
            setFirstclickdone={setFirstclickdone}
            gameState={gameState}
            setGameState={setGameState}
          />
        )),
      )}
    </div>
  );
};

export default Board;
