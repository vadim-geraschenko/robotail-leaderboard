import type {
  LeaderboardPage,
  RankedGlobalLeaderboardEntry,
  RankedMachineResult,
} from '../../types/leaderboard'

type LeaderboardTableProps =
  | {
      kind: 'local'
      page: LeaderboardPage<RankedMachineResult>
    }
  | {
      kind: 'global'
      page: LeaderboardPage<RankedGlobalLeaderboardEntry>
    }

export function LeaderboardTable(props: LeaderboardTableProps) {
  if (props.kind === 'global') {
    return (
      <div className="leaderboard-table-wrap">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Место</th>
              <th>Игрок</th>
              <th className="numeric">Всего побед</th>
              <th className="numeric machines-cell">Автоматов</th>
              <th className="numeric">Суммарные очки</th>
            </tr>
          </thead>
          <tbody>
            {props.page.entries.map((entry) => (
              <tr key={entry.playerName} className={entry.rank <= 3 ? 'top-rank' : undefined}>
                <td className="rank-cell">{entry.rank}</td>
                <td className="player-cell">{entry.playerName}</td>
                <td className="numeric metric-cell">{entry.totalWins}</td>
                <td className="numeric metric-cell">{entry.machinesCount}</td>
                <td className="numeric metric-cell">{entry.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="leaderboard-table-wrap">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Место</th>
            <th>Игрок</th>
            <th className="numeric">Победы</th>
            <th className="numeric">Очки</th>
          </tr>
        </thead>
        <tbody>
          {props.page.entries.map((entry) => (
            <tr key={entry.id} className={entry.rank <= 3 ? 'top-rank' : undefined}>
              <td className="rank-cell">{entry.rank}</td>
              <td className="player-cell">{entry.playerName}</td>
              <td className="numeric metric-cell">{entry.wins}</td>
              <td className="numeric metric-cell">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
