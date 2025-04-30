import { useState } from "react"
import { XorO } from "../types"

export const useGameLogic = (boardSize: number | null) => {
    const [board, setBoard] = useState<(XorO | undefined)[][]>([])
    const [currentPlayer, setCurrentPlayer] = useState<XorO>('X')
    const [winner, setWinner] = useState<XorO | null>(null)
    const [isDraw, setIsDraw] = useState<boolean>(false)
  
    const createEmptyBoard = (size: number) =>
      Array.from({ length: size }, () =>
        Array.from({ length: size }, () => undefined)
      )
  
    const checkWinner = (
      board: (XorO | undefined)[][],
      row: number,
      col: number,
      player: XorO
    ): boolean => {
      const size = board.length
  
      // check row winner
      if (board[row].every(cell => cell === player)) return true
  
      // check column winner
      if (board.every(r => r[col] === player)) return true
  
      // check diagonal winner
      if (row === col && board.every((r, idx) => r[idx] === player)) return true
  
      // check anti-diagonal winner
      if (row + col === size - 1 && board.every((r, idx) => r[size - 1 - idx] === player)) return true
  
      return false
    }
  
    const checkDraw = (board: (XorO | undefined)[][]): boolean => {
      return board.every(row => row.every(cell => cell !== undefined)) && !winner
    }
  
    const handleCellClick = (rowIndex: number, colIndex: number) => {
      if (winner || board[rowIndex][colIndex]) return
  
      const newBoard = board.map((row, r) =>
        row.map((cell, c) => (r === rowIndex && c === colIndex ? currentPlayer : cell))
      )
  
      if (checkWinner(newBoard, rowIndex, colIndex, currentPlayer)) {
        setBoard(newBoard)
        setWinner(currentPlayer)
        return
      }
  
      if (checkDraw(newBoard)) {
        setBoard(newBoard)
        setIsDraw(true)
        return
      }
  
      setBoard(newBoard)
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
  