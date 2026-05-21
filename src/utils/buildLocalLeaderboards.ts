import type {
  LeaderboardsData,
  LocalLeaderboard,
  Machine,
  RankedMachineResult,
} from '../types/leaderboard'
import { paginateLeaderboard } from './paginateLeaderboard'
import { sortMachineResults, takeTopLeaderboardEntries } from './sortLeaderboard'

export function buildLocalLeaderboard(machine: Machine): LocalLeaderboard {
  const entries = takeTopLeaderboardEntries(sortMachineResults(machine.results)).map(
    (result, index): RankedMachineResult => ({
      ...result,
      rank: index + 1,
    }),
  )

  return {
    machineId: machine.id,
    machineName: machine.name,
    entries,
    pages: paginateLeaderboard(entries),
  }
}

export function buildLocalLeaderboards(data: LeaderboardsData): LocalLeaderboard[] {
  return data.machines.map(buildLocalLeaderboard)
}
