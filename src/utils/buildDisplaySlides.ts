import type {
  LeaderboardPage,
  PreparedLeaderboards,
  RankedGlobalLeaderboardEntry,
  RankedMachineResult,
} from '../types/leaderboard'

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

export function buildDisplaySlides(leaderboards: PreparedLeaderboards): DisplaySlide[] {
  const localSlides = leaderboards.localLeaderboards.flatMap((leaderboard) =>
    leaderboard.pages.map((page) => ({
      id: `${leaderboard.machineId}-${page.pageIndex}`,
      kind: 'local' as const,
      title: leaderboard.machineName,
      page,
    })),
  )

  const globalSlides = leaderboards.globalLeaderboard.pages.map((page) => ({
    id: `global-${page.pageIndex}`,
    kind: 'global' as const,
    title: leaderboards.globalLeaderboard.title,
    page,
  }))

  return [...localSlides, ...globalSlides]
}
