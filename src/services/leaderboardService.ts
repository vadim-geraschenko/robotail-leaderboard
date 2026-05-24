import data from '../data/leaderboards.json'
import type {
  GlobalLeaderboardEntry,
  LeaderboardPage,
  LeaderboardsData,
  Machine,
  RankedGlobalLeaderboardEntry,
  RankedMachineResult,
} from '../types/leaderboard'

const TOP_LIMIT = 25
const PAGE_SIZE = 10

export type DisplaySlide =
  | {
      id: string
      kind: 'local'
      title: string
      page: LeaderboardPage<RankedMachineResult>
    }
  | {
      id: string
      kind: 'global'
      title: string
      page: LeaderboardPage<RankedGlobalLeaderboardEntry>
    }

const byName = (left: { playerName: string }, right: { playerName: string }) =>
  left.playerName.localeCompare(right.playerName, 'ru')

const rank = <T>(entries: T[]) =>
  entries.slice(0, TOP_LIMIT).map((entry, index) => ({ ...entry, rank: index + 1 }))

const paginate = <T>(entries: T[]): LeaderboardPage<T>[] =>
  Array.from({ length: Math.ceil(entries.length / PAGE_SIZE) }, (_, index) => {
    const start = index * PAGE_SIZE
    const pageEntries = entries.slice(start, start + PAGE_SIZE)

    return {
      rangeLabel: `${start + 1}–${start + pageEntries.length}`,
      entries: pageEntries,
    }
  })

function buildLocalPages(machine: Machine) {
  const entries = rank(
    [...machine.results].sort(
      (left, right) => right.wins - left.wins || right.score - left.score || byName(left, right),
    ),
  )

  return paginate(entries)
}

function buildGlobalPages(machines: Machine[]) {
  const byPlayer = new Map<string, GlobalLeaderboardEntry>()

  for (const machine of machines) {
    for (const result of machine.results) {
      const entry =
        byPlayer.get(result.playerName) ??
        ({
          playerName: result.playerName,
          totalWins: 0,
          totalScore: 0,
          machines: [],
          machinesCount: 0,
        } satisfies GlobalLeaderboardEntry)

      entry.totalWins += result.wins
      entry.totalScore += result.score

      if (!entry.machines.includes(machine.name)) {
        entry.machines.push(machine.name)
        entry.machinesCount = entry.machines.length
      }

      byPlayer.set(result.playerName, entry)
    }
  }

  const entries = rank(
    Array.from(byPlayer.values()).sort(
      (left, right) =>
        right.totalWins - left.totalWins ||
        right.totalScore - left.totalScore ||
        byName(left, right),
    ),
  )

  return paginate(entries)
}

export function getDisplaySlides(): DisplaySlide[] {
  const { machines } = data as LeaderboardsData
  const localSlides = machines.flatMap((machine) =>
    buildLocalPages(machine).map((page, index) => ({
      id: `${machine.id}-${index}`,
      kind: 'local' as const,
      title: machine.name,
      page,
    })),
  )

  const globalSlides = buildGlobalPages(machines).map((page, index) => ({
    id: `global-${index}`,
    kind: 'global' as const,
    title: 'Глобальная таблица лидеров',
    page,
  }))

  return [...localSlides, ...globalSlides]
}
