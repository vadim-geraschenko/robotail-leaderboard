import { LeaderboardHeader } from '../LeaderboardHeader/LeaderboardHeader'
import { LeaderboardTable } from '../LeaderboardTable/LeaderboardTable'
import type {
  LeaderboardPage,
  RankedGlobalLeaderboardEntry,
  RankedMachineResult,
} from '../../types/leaderboard'

type LeaderboardScreenProps =
  | {
      kind: 'local'
      title: string
      page: LeaderboardPage<RankedMachineResult>
    }
  | {
      kind: 'global'
      title: string
      page: LeaderboardPage<RankedGlobalLeaderboardEntry>
    }

export function LeaderboardScreen(props: LeaderboardScreenProps) {
  if (props.kind === 'global') {
    return (
      <section className="leaderboard-screen global">
        <LeaderboardHeader
          title={props.title}
          kind={props.kind}
          rangeLabel={props.page.rangeLabel}
        />
        <LeaderboardTable kind={props.kind} page={props.page} />
      </section>
    )
  }

  return (
    <section className="leaderboard-screen local">
      <LeaderboardHeader
        title={props.title}
        kind={props.kind}
        rangeLabel={props.page.rangeLabel}
      />
      <LeaderboardTable kind={props.kind} page={props.page} />
    </section>
  )
}
