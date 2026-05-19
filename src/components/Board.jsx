import React, { useState } from "react";
import Cell from "./Cell";

const Board = () => {
  const createBoard = (rows,cols) => {
    const board = []
    for (let i = 0; i < rows; i++) {
      const row=[]
    
      for (let j = 0; j < cols; j++) {
        row.push({
          x:j,
          y:i,
          isMine:false,
          isRevealed:false,
          isFlagged:false,
          adjacentMines:0
        })
        
      }

      board.push(row)
    }
    return board
  }
  const [board,setBoard] = useState(createBoard(9,9))

  return (
    <div
      className="gap-px p-px grid justify-center"
      style={{
        gridTemplateColumns: `repeat(${board[0].length}, 48px)`
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) =>
          <Cell key={`${rowIndex},${cellIndex}`} cell={cell} rowIndex={rowIndex} cellIndex={cellIndex} setBoard={setBoard} board={board} className={cell.isFlagged===true ? "bg-red-500" : ""}/>)
      )}
    </div>
  );
};

export default Board;
