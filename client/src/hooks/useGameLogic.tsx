import { useState } from "react";
import { XorO } from "../types";
import {
  checkAntiDiagonalWinner,
  checkColumnWinner,
  checkDiagonalWinner,
  checkDraw,
  checkRowWinner,
} from "../utils/gameUtils";

export const useGameLogic = (
  boardSize: number | null,
  updateWinnerWinCount: (winnerName: string) => void
) => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<XorO>("X");
  const [winner, setWinner] = useState<XorO | null>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);

  const createEmptyBoard = (boardSize: number) =>
    Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => undefined)
    );

  const checkWinner = (
    board: (XorO | undefined)[][],
    rowIndex: number,
    colIndex: number,
    player: XorO
  ): boolean => {
    const boardSize = board.length;

    if (checkRowWinner(board, rowIndex, player)) return true;

    if (checkColumnWinner(board, colIndex, player)) return true;

    if (checkDiagonalWinner(board, rowIndex, colIndex, player)) return true;

    if (checkAntiDiagonalWinner(board, rowIndex, colIndex, player, boardSize))
      return true;

    return false;
  };

  const handleCellClick = (
    selectedRowIndex: number,
    selectedColIndex: number
  ) => {
    if (winner || board[selectedRowIndex][selectedColIndex]) return;

    const updatedBoard = getUpdatedBoard(
      board,
      selectedRowIndex,
      selectedColIndex,
      currentPlayer
    );

    if (
      checkWinner(
        updatedBoard,
        selectedRowIndex,
        selectedColIndex,
        currentPlayer
      )
    ) {
      setBoard(updatedBoard);
      setWinner(currentPlayer);
      updateWinnerWinCount(currentPlayer);
      return;
    }

    if (checkDraw(updatedBoard, winner)) {
      setBoard(updatedBoard);
      setIsDraw(true);
      return;
    }

    setBoard(updatedBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const restartGame = () => {
    if (boardSize !== null) {
      setBoard(createEmptyBoard(boardSize));
      setWinner(null);
      setCurrentPlayer("X");
      setIsDraw(false);
    }
  };

  return {
    board,
    currentPlayer,
    winner,
    setBoard,
    handleCellClick,
    restartGame,
    createEmptyBoard,
    checkWinner,
    isDraw,
  };
};

const getUpdatedBoard = (
  board: (XorO | undefined)[][],
  selectedRowIndex: number,
  selectedColIndex: number,
  currentPlayer: XorO
) => {
  return board.map((row, rIndex) =>
    row.map((cell, cIndex) =>
      rIndex === selectedRowIndex && cIndex === selectedColIndex
        ? currentPlayer
        : cell
    )
  );
};
