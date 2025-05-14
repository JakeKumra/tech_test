import React from "react";

type GameStatusProps = {
  winner: string | null;
  isDraw: boolean;
  currentPlayer: string;
  players: { X: string; O: string };
  onRestart: () => void;
};

const GameStatus = ({
  winner,
  isDraw,
  currentPlayer,
  players,
  onRestart,
}: GameStatusProps) => {
  if (winner) {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="text-2xl font-semibold text-green-600">
          🎉 Winner: {players[winner]} ({winner})
        </div>
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Restart Game
        </button>
      </div>
    );
  }

  if (isDraw) {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="text-2xl font-semibold text-red-600">
          🙁 It's a draw!
        </div>
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Restart Game
        </button>
      </div>
    );
  }

  return (
    <div className="text-xl font-medium">
      Current Player: {players[currentPlayer]} ({currentPlayer})
    </div>
  );
};

export default GameStatus;
