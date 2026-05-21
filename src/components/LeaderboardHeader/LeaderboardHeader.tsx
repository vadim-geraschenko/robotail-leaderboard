interface LeaderboardHeaderProps {
  title: string
  kind: 'local' | 'global'
  rangeLabel: string
}

export function LeaderboardHeader({ title, kind, rangeLabel }: LeaderboardHeaderProps) {
  const kindLabel = kind === 'local' ? 'Локальная таблица' : 'Глобальная таблица'

  return (
    <header className="leaderboard-header">
      <div className="leaderboard-kicker">
        <span className="leaderboard-kind">{kindLabel}</span>
        <span>Места {rangeLabel}</span>
      </div>
      <h1 className="leaderboard-title">{title}</h1>
      <div className="leaderboard-subtitle">Рейтинг по количеству побед</div>
    </header>
  )
}
