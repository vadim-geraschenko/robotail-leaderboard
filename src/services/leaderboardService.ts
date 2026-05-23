import leaderboardsData from '../data/leaderboards.json'
import type { LeaderboardsData, PreparedLeaderboards } from '../types/leaderboard'
import { buildGlobalLeaderboard } from '../utils/buildGlobalLeaderboard'
import { buildLocalLeaderboards } from '../utils/buildLocalLeaderboards'

const localLeaderboardsData = leaderboardsData as LeaderboardsData

export function loadLeaderboardsData(): LeaderboardsData {
  return localLeaderboardsData
}

export function getPreparedLeaderboards(): PreparedLeaderboards {
  const data = loadLeaderboardsData()

  return {
    localLeaderboards: buildLocalLeaderboards(data),
    globalLeaderboard: buildGlobalLeaderboard(data),
  }
}
