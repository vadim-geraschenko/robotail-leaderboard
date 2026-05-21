import type { LeaderboardPage } from '../types/leaderboard'

const PAGE_SIZE = 10

export function paginateLeaderboard<T>(entries: T[]): LeaderboardPage<T>[] {
  return Array.from({ length: Math.ceil(entries.length / PAGE_SIZE) }, (_, pageIndex) => {
    const startIndex = pageIndex * PAGE_SIZE
    const pageEntries = entries.slice(startIndex, startIndex + PAGE_SIZE)
    const startRank = startIndex + 1
    const endRank = startIndex + pageEntries.length

    return {
      pageIndex,
      rangeLabel: `${startRank}–${endRank}`,
      startRank,
      endRank,
      entries: pageEntries,
    }
  })
}
