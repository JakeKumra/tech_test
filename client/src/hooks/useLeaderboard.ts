import { useEffect, useState } from 'react'
import { fetchLeaderboard } from '../api/leaderboard'
import { XorO } from '../types'

export type LeaderboardEntry = {
  name: string
  wins: number
}

export const useLeaderboard = (winner: XorO | null) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    const fetchLeaderboardData = async () => { 
      try {
        const data = await fetchLeaderboard() 
        setLeaderboard(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboardData()
  }, [winner]) // Re-fetch leaderboard when leaderboardKey changes

  return { leaderboard, loading, error }
}

