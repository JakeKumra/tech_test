import { useState } from "react"
import { XorO } from "../types"
import { checkRowWinner, checkColumnWinner, checkDiagonalWinner, checkAntiDiagonalWinner, checkDraw } from "../utils/gameUtils"

export const useGameLogic = (boardSize: number | null, updateWinnerWinCount: (winnerName: string) => void) => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([])
  const [currentPlayer, setCurrentPlayer] = useState<XorO>('X')
  const [winner, setWinner] = useState<XorO | null>(null)
  const [isDraw, setIsDraw] = useState<boolean>(false)

  const createEmptyBoard = (boardSize: number) =>
    Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => undefined)
    )

  const checkWinner = (
    board: (XorO | undefined)[][],
    rowIndex: number,
    colIndex: number,
    player: XorO
  ): boolean => {
    const boardSize = board.length

    if (checkRowWinner(board, rowIndex, player)) return true;

    if (checkColumnWinner(board, colIndex, player)) return true;

    if (checkDiagonalWinner(board, rowIndex, colIndex, player)) return true;

    if (checkAntiDiagonalWinner(board, rowIndex, colIndex, player, boardSize)) return true;

    return false
  }

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (winner || board[rowIndex][colIndex]) return
  
    const updatedBoard = board.map((row, rIndex) => 
      row.map((cell, cIndex) => 
        rIndex === rowIndex && cIndex === colIndex ? currentPlayer : cell
      )
    )
  
    if (checkWinner(updatedBoard, rowIndex, colIndex, currentPlayer)) {
      setBoard(updatedBoard)
      setWinner(currentPlayer)
      updateWinnerWinCount(currentPlayer)
      return
    }
  
    if (checkDraw(updatedBoard, winner)) {
      setBoard(updatedBoard)
      setIsDraw(true)
      return
    }
  
    setBoard(updatedBoard)
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }
  

  const restartGame = () => {
    if (boardSize !== null) {
      setBoard(createEmptyBoard(boardSize))
      setWinner(null)
      setCurrentPlayer('X')
      setIsDraw(false)
    }
  }

  return { board, currentPlayer, winner, setBoard, handleCellClick, restartGame, createEmptyBoard, checkWinner, isDraw }
}
