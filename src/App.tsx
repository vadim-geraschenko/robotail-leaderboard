import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { LeaderboardScreen } from './components/LeaderboardScreen/LeaderboardScreen'
import { getPreparedLeaderboards } from './services/leaderboardService'
import { buildDisplaySlides } from './utils/buildDisplaySlides'

const PAGE_DISPLAY_DURATION_MS = 5000

function App() {
  const leaderboards = useMemo(() => getPreparedLeaderboards(), [])
  const displaySlides = useMemo(() => buildDisplaySlides(leaderboards), [leaderboards])
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  useEffect(() => {
    if (displaySlides.length === 0) {
      return undefined
    }

    const timerId = window.setInterval(() => {
      setActiveSlideIndex((currentIndex) => (currentIndex + 1) % displaySlides.length)
    }, PAGE_DISPLAY_DURATION_MS)

    return () => {
      window.clearInterval(timerId)
    }
  }, [displaySlides.length])

  const activeSlide = displaySlides[activeSlideIndex]

  return (
    <main className="app-shell">
      <div className="app-stage">
        <LeaderboardScreen
          key={activeSlide.id}
          kind={activeSlide.kind}
          title={activeSlide.title}
          page={activeSlide.page}
        />
      </div>
    </main>
  )
}

export default App
