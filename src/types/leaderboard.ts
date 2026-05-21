export interface MachineResult {
  id: string
  playerName: string
  wins: number
  score: number
}

export interface Machine {
  id: string
  name: string
  results: MachineResult[]
}

export interface LeaderboardsData {
  machines: Machine[]
}

export interface GlobalLeaderboardEntry {
  playerName: string
  totalWins: number
  totalScore: number
  machinesCount: number
  machines: string[]
}

export interface RankedMachineResult extends MachineResult {
  rank: number
}

export interface RankedGlobalLeaderboardEntry extends GlobalLeaderboardEntry {
  rank: number
}

export interface LeaderboardPage<T> {
  pageIndex: number
  rangeLabel: string
  startRank: number
  endRank: number
  entries: T[]
}

export interface LocalLeaderboard {
  machineId: string
  machineName: string
  entries: RankedMachineResult[]
  pages: LeaderboardPage<RankedMachineResult>[]
}

export interface GlobalLeaderboard {
  title: string
  entries: RankedGlobalLeaderboardEntry[]
  pages: LeaderboardPage<RankedGlobalLeaderboardEntry>[]
}

export interface PreparedLeaderboards {
  localLeaderboards: LocalLeaderboard[]
  globalLeaderboard: GlobalLeaderboard
}
