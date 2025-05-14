import React, { useState } from "react";
import { addUser, updateUserWinCount } from "./api/userApi";
import { GameBoard } from "./components/GameBoard";
import { GameSetup } from "./components/GameSetup";
import GameStatus from "./components/GameStatus";
import { Leaderboard } from "./components/Leaderboard";
import { useGameLogic } from "./hooks/useGameLogic";

export const Main = () => {
  const [inputSize, setInputSize] = useState("");
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [boardSize, setBoardSize] = useState<number | null>(null);
  const [players, setPlayers] = useState<{ X: string; O: string }>({
    X: "",
    O: "",
  });

  const {
    board,
    currentPlayer,
    winner,
    isDraw,
    setBoard,
    handleCellClick,
    restartGame,
    createEmptyBoard,
  } = useGameLogic(boardSize, updateUserWinCount);

  const handleSubmit = async () => {
    const size = parseInt(inputSize);

    if (containsValidInputs(size, player1Name, player2Name)) {
      try {
        await addUser(player1Name);
        await addUser(player2Name);

        setPlayers({ X: player1Name, O: player2Name });
        setBoardSize(size);
        setBoard(createEmptyBoard(size));
      } catch (error) {
        console.error("Error during user creation:", error);
      }
    }
  };

  const handleRestartGame = () => {
    restartGame();
    setBoardSize(null);
    setPlayer1Name("");
    setPlayer2Name("");
    setInputSize("");
  };

  if (winner) {
    updateUserWinCount(players[winner]);
  }

  if (boardSize === null) {
    return (
      <GameSetup
        player1Name={player1Name}
        setPlayer1Name={setPlayer1Name}
        player2Name={player2Name}
        setPlayer2Name={setPlayer2Name}
        inputSize={inputSize}
        setInputSize={setInputSize}
        handleSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="flex mt-10 gap-12 justify-center">
      <div className="flex flex-col items-center gap-10">
        <div className="font-bold text-4xl text-blue-600 mb-6">Tic Tac Toe</div>
        <GameBoard board={board} handleCellClick={handleCellClick} />
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
  );
};

const containsValidInputs = (
  size: number,
  player1Name: string,
  player2Name: string
) => {
  return !isNaN(size) && size >= 3 && size <= 15 && player1Name && player2Name;
};
