import React, { useState } from "react"
import { Leaderboard } from "./components/Leaderboard"
import { useGameLogic } from "./hooks/useGameLogic"

export const Main = () => {
  const [inputSize, setInputSize] = useState('')
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')
  const [boardSize, setBoardSize] = useState<number | null>(null)
  const [players, setPlayers] = useState<{ X: string; O: string }>({ X: '', O: '' })

  // temp leaderboard
  const leaderboard = [
    { player: 'Player 1', score: 5 },
    { player: 'Player 2', score: 3 },
    { player: 'Player 3', score: 2 },
    { player: 'Player 4', score: 1 },
  ]

  const { board, currentPlayer, winner, isDraw, setBoard, handleCellClick, restartGame, createEmptyBoard } = useGameLogic(boardSize)

  const handleSubmit = () => {
    const size = parseInt(inputSize)
    if (!isNaN(size) && size > 0 && player1Name && player2Name) {
      setPlayers({ X: player1Name, O: player2Name })
      setBoardSize(size)
      setBoard(createEmptyBoard(size))
    }
  }

  const handleRestartGame = () => {
    restartGame()
    setBoardSize(null) 
    setPlayer1Name('') 
    setPlayer2Name('')
    setInputSize('') 
  }

  if (boardSize === null) {
    return (
      <div className='flex flex-col items-center mt-10 gap-6'>
        <div className='text-3xl font-semibold text-center mb-4'>Set Up Game</div>
        <input
          type='text'
          placeholder='Player 1 Name (X)'
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          className='border border-gray-400 rounded-md px-4 py-2 w-72 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <input
          type='text'
          placeholder='Player 2 Name (O)'
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          className='border border-gray-400 rounded-md px-4 py-2 w-72 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <input
          type='number'
          min='1'
          placeholder='Board Size'
          value={inputSize}
          onChange={(e) => setInputSize(e.target.value)}
          className='border border-gray-400 rounded-md px-4 py-2 w-40 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <button
          onClick={handleSubmit}
          className='px-6 py-3 mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200'
        >
          Start Game
        </button>
      </div>
    )
  }

  return (
    <div className='flex mt-10 gap-12 justify-center'>
      <div className='flex flex-col items-center gap-10'>
        <div className='font-bold text-4xl text-blue-600 mb-6'>Tic Tac Toe</div>
        <div className='flex flex-col gap-2'>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className='flex gap-2'>
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`border-4 border-gray-700 w-16 h-16 flex items-center justify-center text-3xl font-bold cursor-pointer transition-transform duration-200 hover:scale-105 ${cell ? 'bg-gray-200' : 'bg-white'}`}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
        {winner ? (
          <div className='flex flex-col items-center gap-6'>
            <div className='text-2xl font-semibold text-green-600'>
              🎉 Winner: {players[winner]} ({winner})
            </div>
            <button
              onClick={handleRestartGame}
              className='px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200'
            >
              Restart Game
            </button>
          </div>
        ) : isDraw ? (
          <div className='flex flex-col items-center gap-6'>
            <div className='text-2xl font-semibold text-red-600'>
              🙁 It's a draw!
            </div>
            <button
              onClick={handleRestartGame}
              className='px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200'
            >
              Restart Game
            </button>
          </div>
        ) : (
          <div className='text-xl font-medium'>
            Current Player: {players[currentPlayer]} ({currentPlayer})
          </div>
        )}
      </div>
      
      {boardSize !== null && <Leaderboard leaderboard={leaderboard} />}
    </div>
  )
}
