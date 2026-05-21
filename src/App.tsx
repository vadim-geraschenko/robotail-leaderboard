import { useEffect, useState } from 'react'
import './App.css'
import { LeaderboardScreen } from './components/LeaderboardScreen/LeaderboardScreen'
import { getPreparedLeaderboards } from './services/leaderboardService'
import type {
  LeaderboardPage,
  PreparedLeaderboards,
  RankedGlobalLeaderboardEntry,
  RankedMachineResult,
} from './types/leaderboard'

const PAGE_DISPLAY_DURATION_MS = 5000

type DisplaySlide =
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

function buildDisplaySlides(leaderboards: PreparedLeaderboards): DisplaySlide[] {
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

function renderDisplaySlide(slide: DisplaySlide) {
  if (slide.kind === 'global') {
    return (
      <LeaderboardScreen
        key={slide.id}
        kind={slide.kind}
        title={slide.title}
        page={slide.page}
      />
    )
  }

  return (
    <LeaderboardScreen
      key={slide.id}
      kind={slide.kind}
      title={slide.title}
      page={slide.page}
    />
  )
}

function App() {
  const [leaderboards, setLeaderboards] = useState<PreparedLeaderboards | null>(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [isRotationPaused, setIsRotationPaused] = useState(false)

  useEffect(() => {
    void getPreparedLeaderboards().then(setLeaderboards)
  }, [])

  const displaySlides = leaderboards ? buildDisplaySlides(leaderboards) : []

  useEffect(() => {
    if (displaySlides.length === 0 || isRotationPaused) {
      return undefined
    }

    const timerId = window.setInterval(() => {
      setActiveSlideIndex((currentIndex) => (currentIndex + 1) % displaySlides.length)
    }, PAGE_DISPLAY_DURATION_MS)

    return () => {
      window.clearInterval(timerId)
    }
  }, [displaySlides.length, isRotationPaused])

  if (!leaderboards) {
    return (
      <main className="app-shell">
        <div className="loading-state">Загрузка таблиц лидеров</div>
      </main>
    )
  }

  const activeSlide = displaySlides[activeSlideIndex]

  return (
    <main className="app-shell">
      <button
        className="dx-pause-button"
        type="button"
        aria-pressed={isRotationPaused}
        onClick={() => setIsRotationPaused((currentValue) => !currentValue)}
      >
        <span className="dx-pause-button__tag">TEMP DX</span>
        <span>{isRotationPaused ? 'Продолжить ротацию' : 'Пауза ротации'}</span>
        <span className="dx-pause-button__note">позже скрыть</span>
      </button>
      <div className="app-stage single">{renderDisplaySlide(activeSlide)}</div>
    </main>
  )
}

export default App
