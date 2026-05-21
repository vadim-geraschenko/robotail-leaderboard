import leaderboardsData from '../data/leaderboards.json'
import type { LeaderboardsData, PreparedLeaderboards } from '../types/leaderboard'
import { buildGlobalLeaderboard } from '../utils/buildGlobalLeaderboard'
import { buildLocalLeaderboards } from '../utils/buildLocalLeaderboards'

const localLeaderboardsData = leaderboardsData as LeaderboardsData

export async function loadLeaderboardsData(): Promise<LeaderboardsData> {
  return localLeaderboardsData
}

export async function getPreparedLeaderboards(): Promise<PreparedLeaderboards> {
  const data = await loadLeaderboardsData()

  return {
    localLeaderboards: buildLocalLeaderboards(data),
    globalLeaderboard: buildGlobalLeaderboard(data),
  }
}
