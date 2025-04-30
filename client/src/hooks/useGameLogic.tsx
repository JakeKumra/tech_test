import { useState } from "react"
import { XorO } from "../types"

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

    // check row winner
    if (board[rowIndex].every(cell => cell === player)) return true

    // check column winner
    if (board.every(row => row[colIndex] === player)) return true

    // check diagonal winner
    if (rowIndex === colIndex && board.every((row, index) => row[index] === player)) return true

    // check anti-diagonal winner
    if (rowIndex + colIndex === boardSize - 1 && board.every((row, index) => row[boardSize - 1 - index] === player)) return true

    return false
  }

  const checkDraw = (board: (XorO | undefined)[][]): boolean => {
    return board.every(row => row.every(cell => cell !== undefined)) && !winner
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
  
    if (checkDraw(updatedBoard)) {
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
