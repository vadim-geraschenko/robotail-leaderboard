import type { GlobalLeaderboardEntry, MachineResult } from '../types/leaderboard'

export const TOP_LEADERBOARD_LIMIT = 25

export function sortMachineResults<T extends MachineResult>(results: T[]): T[] {
  return [...results].sort((left, right) => {
    const winsDifference = right.wins - left.wins

    if (winsDifference !== 0) {
      return winsDifference
    }

    const scoreDifference = right.score - left.score

    if (scoreDifference !== 0) {
      return scoreDifference
    }

    return left.playerName.localeCompare(right.playerName, 'ru')
  })
}

export function sortGlobalLeaderboardEntries<T extends GlobalLeaderboardEntry>(
  entries: T[],
): T[] {
  return [...entries].sort((left, right) => {
    const winsDifference = right.totalWins - left.totalWins

    if (winsDifference !== 0) {
      return winsDifference
    }

    const scoreDifference = right.totalScore - left.totalScore

    if (scoreDifference !== 0) {
      return scoreDifference
    }

    return left.playerName.localeCompare(right.playerName, 'ru')
  })
}

export function takeTopLeaderboardEntries<T>(entries: T[]): T[] {
  return entries.slice(0, TOP_LEADERBOARD_LIMIT)
}
