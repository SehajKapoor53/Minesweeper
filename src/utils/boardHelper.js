export const isValid = (row, col, rows, cols) => {
  return row >= 0 && col >= 0 && row < rows && col < cols;
}

export const directions = [
  [-1,-1],[0,-1],[1,-1],
  [-1,0],        [1,0],
  [-1,1], [0,1], [1,1]
]