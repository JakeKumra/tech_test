import { XorO } from "../types";

export const checkRowWinner = (
  board: (XorO | undefined)[][],
  rowIndex: number,
  player: XorO
): boolean => {
  return board[rowIndex].every((cell) => cell === player);
};

export const checkColumnWinner = (
  board: (XorO | undefined)[][],
  colIndex: number,
  player: XorO
): boolean => {
  return board.every((row) => row[colIndex] === player);
};

// top left to bottom right e.g. (0, 0), (1, 1), (2,2) in a 3x3 board)
export const checkDiagonalWinner = (
  board: (XorO | undefined)[][],
  rowIndex: number,
  colIndex: number,
  player: XorO
): boolean => {
  // check if the selected cell is on the diagonal line
  if (rowIndex === colIndex) {
    return board.every((row, index) => row[index] === player);
  }
  return false;
};

// top right to bottom left e.g. (0,2), (1,1), (2,0) in a 3x3 board)
export const checkAntiDiagonalWinner = (
  board: (XorO | undefined)[][],
  rowIndex: number,
  colIndex: number,
  player: XorO,
  boardSize: number
): boolean => {
  // check if the selected cell is on the anti-diagnal line
  if (rowIndex + colIndex === boardSize - 1) {
    return board.every((row, index) => {
      // For row `index`, the anti-diagonal column is `boardSize - 1 - index`
      const antiDiagonalColIndex = boardSize - 1 - index;
      return row[antiDiagonalColIndex] === player;
    });
  }
  return false;
};

export const checkDraw = (
  board: (XorO | undefined)[][],
  winner: XorO | null
): boolean => {
  return (
    board.every((row) => row.every((cell) => cell !== undefined)) && !winner
  );
};
