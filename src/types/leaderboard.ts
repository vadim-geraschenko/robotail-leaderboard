export type MachineResult = {
  id: string
  playerName: string
  wins: number
  score: number
}

export type Machine = {
  id: string
  name: string
  results: MachineResult[]
}

export type LeaderboardsData = {
  machines: Machine[]
}

export type GlobalLeaderboardEntry = {
  playerName: string
  totalWins: number
  totalScore: number
  machinesCount: number
  machines: string[]
}

export type RankedMachineResult = MachineResult & { rank: number }
export type RankedGlobalLeaderboardEntry = GlobalLeaderboardEntry & { rank: number }

export type LeaderboardPage<T> = {
  rangeLabel: string
  entries: T[]
}
