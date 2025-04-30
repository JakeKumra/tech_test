import { XorO } from "../types";

export const checkRowWinner = (board: (XorO | undefined)[][], rowIndex: number, player: XorO): boolean => {
  return board[rowIndex].every(cell => cell === player);
};

export const checkColumnWinner = (board: (XorO | undefined)[][], colIndex: number, player: XorO): boolean => {
  return board.every(row => row[colIndex] === player);
};

export const checkDiagonalWinner = (board: (XorO | undefined)[][], rowIndex: number, colIndex: number, player: XorO): boolean => {
  if (rowIndex === colIndex) {
    return board.every((row, index) => row[index] === player);
  }
  return false;
};

export const checkAntiDiagonalWinner = (board: (XorO | undefined)[][], rowIndex: number, colIndex: number, player: XorO, boardSize: number): boolean => {
  if (rowIndex + colIndex === boardSize - 1) {
    return board.every((row, index) => row[boardSize - 1 - index] === player);
  }
  return false;
};

export const checkDraw = (board: (XorO | undefined)[][], winner: XorO | null): boolean => {
  return board.every(row => row.every(cell => cell !== undefined)) && !winner;
};
