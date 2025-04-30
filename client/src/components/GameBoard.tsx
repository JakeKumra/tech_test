import React from "react";
import { XorO } from "../types";

type GameBoardProps = {
  board: (XorO | undefined)[][];
  handleCellClick: (row: number, col: number) => void;
};

export const GameBoard = ({ board, handleCellClick }: GameBoardProps) => {
  return (
    <div className="flex flex-col gap-2">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              className={`border-4 border-gray-700 w-16 h-16 flex items-center justify-center text-3xl font-bold cursor-pointer transition-transform duration-200 hover:scale-105 ${
                cell ? "bg-gray-200" : "bg-white"
              }`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
