import React from 'react'

type LeaderboardProps = {
  leaderboard: { player: string; score: number }[]
}

export const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
  return (
    <div className='flex flex-col items-center border-l-2 pl-10'>
      <div className='text-xl font-bold mb-4'>Leaderboard</div>
      <div className='space-y-2'>
        {leaderboard.map((entry, index) => (
          <div key={index} className='flex justify-between w-40'>
            <div>{entry.player}</div>
            <div>{entry.score}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
