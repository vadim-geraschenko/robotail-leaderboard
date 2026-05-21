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
