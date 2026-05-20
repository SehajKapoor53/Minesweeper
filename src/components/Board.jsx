import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import {
  calculateAdjacentMines,
  checkWin,
  placeMines,
} from "../utils/boardUtils.js";

const Board = ({ flagsLeft, setFlagsLeft, time, setTime, config }) => {
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
  const [gameState, setGameState] = useState("idle");
  const [board, setBoard] = useState(createBoard(config.rows, config.cols));
  useEffect(() => {
    setBoard(createBoard(config.rows, config.cols));
  }, [config]);

  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, setTime]);

  useEffect(() => {
    setGameState("idle");
    setFirstclickdone(false);
    setTime(0);
  }, [config]);

  useEffect(() => {
    if (checkWin(board)) {
      setGameState("won");
    }
  }, [board]);


  return (
    <>
    {gameState === "won" && (
  <div className="absolute text-green-500 text-5xl font-bold p-5 bg-gray-800/50 rounded-4xl">
    🎉 You Win
  </div>
)}

{gameState === "lost" && (
  <div className="absolute text-red-500 text-5xl font-bold p-5 bg-gray-800/50 rounded-4xl">
    💥 You Lose
  </div>
)}
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
            mines={config.mines}
            {...{
              cell,
              setBoard,
              board,
              firstclickdone,
              setFirstclickdone,
              gameState,
              setGameState,
              flagsLeft,
              setFlagsLeft,
            }}
          />
        )),
      )}
      
      {/* {gameState==='won' &&<div className="text-5xl text-nowrap">YOU WIN!!!</div> }
      {gameState==='lost' &&<div className="text-5xl text-nowrap">YOU LOST!!!</div> } */}

    </div></>
  );
};

export default Board;
