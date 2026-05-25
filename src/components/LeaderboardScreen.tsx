import './LeaderboardScreen.css'
import type { DisplaySlide } from '../services/leaderboardService'
import { LeaderboardHeader } from './LeaderboardHeader'
import { LeaderboardTable } from './LeaderboardTable'

type Props = {
  slide: DisplaySlide
  transition: 'screen-switch' | 'page-scroll'
}

export function LeaderboardScreen({ slide, transition }: Props) {
  return (
    <section className={`leaderboard-screen ${slide.kind}`}>
      <LeaderboardHeader kind={slide.kind} title={slide.title} rangeLabel={slide.page.rangeLabel} />
      <LeaderboardTable kind={slide.kind} page={slide.page} transition={transition} />
    </section>
  )
}
