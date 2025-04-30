import React, { useState } from "react"
import { Leaderboard } from "./components/Leaderboard"
import { useGameLogic } from "./hooks/useGameLogic"
import { addUser, updateUserWinCount } from "./api/userApi"
import GameStatus from "./components/GameStatus"
import { GameBoard } from "./components/GameBoard"

export const Main = () => {
  const [inputSize, setInputSize] = useState("")
  const [player1Name, setPlayer1Name] = useState("")
  const [player2Name, setPlayer2Name] = useState("")
  const [boardSize, setBoardSize] = useState<number | null>(null)
  const [players, setPlayers] = useState<{ X: string; O: string }>({ X: "", O: "" })

  const {
    board,
    currentPlayer,
    winner,
    isDraw,
    setBoard,
    handleCellClick,
    restartGame,
    createEmptyBoard,
  } = useGameLogic(boardSize, updateUserWinCount)

  const handleSubmit = async () => {
    const size = parseInt(inputSize)
    if (!isNaN(size) && size > 0 && player1Name && player2Name) {
      await addUser(player1Name)
      await addUser(player2Name)

      setPlayers({ X: player1Name, O: player2Name })
      setBoardSize(size)
      setBoard(createEmptyBoard(size))
    }
  }

  const handleRestartGame = () => {
    restartGame()
    setBoardSize(null)
    setPlayer1Name("")
    setPlayer2Name("")
    setInputSize("")
  }

  if (boardSize === null) {
    return (
      <div className="flex flex-col items-center mt-10 gap-6">
        <div className="text-3xl font-semibold text-center mb-4">Set Up Game</div>

        <input
          type="text"
          placeholder="Player 1 Name (X)"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 w-72 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Player 2 Name (O)"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 w-72 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          min="1"
          placeholder="Board Size"
          value={inputSize}
          onChange={(e) => setInputSize(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 w-40 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="px-6 py-3 mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Start Game
        </button>
      </div>
    )
  }

  if (winner) {
    updateUserWinCount(players[winner])
  }

  return (
    <div className="flex mt-10 gap-12 justify-center">
      <div className="flex flex-col items-center gap-10">
        <div className="font-bold text-4xl text-blue-600 mb-6">Tic Tac Toe</div>

        <GameBoard 
          board={board}
          handleCellClick={handleCellClick}
        />

        <GameStatus
          winner={winner}
          isDraw={isDraw}
          currentPlayer={currentPlayer}
          players={players}
          onRestart={handleRestartGame}
        />
      </div>

      <Leaderboard winner={winner} />
    </div>
  )
}
