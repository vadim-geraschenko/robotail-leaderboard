import type {
  GlobalLeaderboard,
  GlobalLeaderboardEntry,
  LeaderboardsData,
  RankedGlobalLeaderboardEntry,
} from '../types/leaderboard'
import { paginateLeaderboard } from './paginateLeaderboard'
import {
  sortGlobalLeaderboardEntries,
  takeTopLeaderboardEntries,
} from './sortLeaderboard'

export function buildGlobalLeaderboard(data: LeaderboardsData): GlobalLeaderboard {
  const entriesByPlayer = new Map<
    string,
    GlobalLeaderboardEntry & { machineNames: Set<string> }
  >()

  for (const machine of data.machines) {
    for (const result of machine.results) {
      const existingEntry = entriesByPlayer.get(result.playerName)

      if (existingEntry) {
        existingEntry.totalWins += result.wins
        existingEntry.totalScore += result.score
        existingEntry.machineNames.add(machine.name)
        existingEntry.machines = [...existingEntry.machineNames]
        existingEntry.machinesCount = existingEntry.machineNames.size
        continue
      }

      entriesByPlayer.set(result.playerName, {
        playerName: result.playerName,
        totalWins: result.wins,
        totalScore: result.score,
        machinesCount: 1,
        machines: [machine.name],
        machineNames: new Set([machine.name]),
      })
    }
  }

  const entries = Array.from(entriesByPlayer.values()).map((entry) => ({
    playerName: entry.playerName,
    totalWins: entry.totalWins,
    totalScore: entry.totalScore,
    machinesCount: entry.machinesCount,
    machines: entry.machines,
  }))
  const rankedEntries = takeTopLeaderboardEntries(sortGlobalLeaderboardEntries(entries)).map(
    (entry, index): RankedGlobalLeaderboardEntry => ({
      ...entry,
      rank: index + 1,
    }),
  )

  return {
    title: 'Глобальная таблица лидеров',
    entries: rankedEntries,
    pages: paginateLeaderboard(rankedEntries),
  }
}
