import './LeaderboardScreen.css'
import { LeaderboardHeader } from '../LeaderboardHeader/LeaderboardHeader'
import { LeaderboardTable } from '../LeaderboardTable/LeaderboardTable'
import type {
  LeaderboardPage,
  RankedGlobalLeaderboardEntry,
  RankedMachineResult,
} from '../../types/leaderboard'

type LeaderboardScreenProps =
  {
    kind: 'local' | 'global'
    title: string
    page: LeaderboardPage<RankedMachineResult> | LeaderboardPage<RankedGlobalLeaderboardEntry>
  }

export function LeaderboardScreen(props: LeaderboardScreenProps) {
  return (
    <section className={`leaderboard-screen ${props.kind}`}>
      <LeaderboardHeader
        title={props.title}
        kind={props.kind}
        rangeLabel={props.page.rangeLabel}
      />
      <LeaderboardTable kind={props.kind} page={props.page} />
    </section>
  )
}
