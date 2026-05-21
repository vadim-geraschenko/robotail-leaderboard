import { useEffect, useState } from 'react'
import './App.css'
import { LeaderboardScreen } from './components/LeaderboardScreen/LeaderboardScreen'
import { getPreparedLeaderboards } from './services/leaderboardService'
import type { PreparedLeaderboards } from './types/leaderboard'

function App() {
  const [leaderboards, setLeaderboards] = useState<PreparedLeaderboards | null>(null)

  useEffect(() => {
    void getPreparedLeaderboards().then(setLeaderboards)
  }, [])

  if (!leaderboards) {
    return (
      <main className="app-shell">
        <div className="loading-state">Загрузка таблиц лидеров</div>
      </main>
    )
  }

  const firstLocalLeaderboard = leaderboards.localLeaderboards[0]
  const firstLocalPage = firstLocalLeaderboard.pages[0]
  const firstGlobalPage = leaderboards.globalLeaderboard.pages[0]

  return (
    <main className="app-shell">
      <div className="app-stage">
        <LeaderboardScreen
          kind="local"
          title={firstLocalLeaderboard.machineName}
          page={firstLocalPage}
        />
        <LeaderboardScreen
          kind="global"
          title={leaderboards.globalLeaderboard.title}
          page={firstGlobalPage}
        />
      </div>
    </main>
  )
}

export default App
