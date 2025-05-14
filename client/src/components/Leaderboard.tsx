import React from "react";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { XorO } from "../types";

export const Leaderboard = ({ winner }: { winner: XorO | null }) => {
  const { leaderboard, loading, error } = useLeaderboard(winner);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error loading leaderboard: {error}</div>;

  return (
    <div className="flex flex-col items-center border-l-2 pl-10">
      <div className="text-xl font-bold mb-4">Leaderboard</div>
      <div className="space-y-2">
        {leaderboard.map((entry, index) => (
          <div key={index} className="flex justify-between w-40">
            <div>{entry.name}</div>
            <div>{entry.wins}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
