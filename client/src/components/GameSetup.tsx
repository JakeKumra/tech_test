import React from "react"

type GameSetupProps = {
  player1Name: string
  setPlayer1Name: React.Dispatch<React.SetStateAction<string>>
  player2Name: string
  setPlayer2Name: React.Dispatch<React.SetStateAction<string>>
  inputSize: string
  setInputSize: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: () => void
}

export const GameSetup = ({
  player1Name,
  setPlayer1Name,
  player2Name,
  setPlayer2Name,
  inputSize,
  setInputSize,
  handleSubmit,
}: GameSetupProps) => {
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
