import { isValid, directions } from "./boardHelper"

export const calculateAdjacentMines = (board) => {
  const rows = board.length
  const cols = board[0].length

  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })))

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (newBoard[i][j].isMine) continue
      let count = 0

      for (let [dx, dy] of directions) {
        let newRow = i + dx
        let newCol = j + dy

        if (
          isValid(newRow, newCol, rows, cols) &&
          newBoard[newRow][newCol].isMine
        )
          count++
      }

      newBoard[i][j].adjacentMines = count
    }
  }
  return newBoard
};

export const placeMines = (board, mineCount) => {
  const rows = board.length
  const cols = board[0].length

  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })))
  let placed = 0
  while (placed < mineCount) {
    const r = Math.floor(Math.random() * rows)
    const c = Math.floor(Math.random() * cols)

    if (!newBoard[r][c].isMine) {
      newBoard[r][c].isMine = true
      placed++
    }
  }

  return newBoard
}

export const floodFill= (board,startRow,startCol) => {
  const rows = board.length
  const cols = board[0].length
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })))

  const queue = [[startRow,startCol]]

  while (queue.length) {
  
    let [r,c] = queue.shift();
    const cell = newBoard[r][c]

    if(cell.isFlagged || cell.isRevealed)  continue
    cell.isRevealed = true;

    if(cell.adjacentMines !== 0) continue
    for (const [dx,dy] of directions) {
      const newRow = r + dx
      const newCol = c + dy

      if(isValid(newRow,newCol,rows,cols)&&!newBoard[newRow][newCol].isRevealed){
        queue.push([newRow,newCol])
      }
    }
  }
  return newBoard
}