import type {
  LeaderboardPage,
  RankedGlobalLeaderboardEntry,
  RankedMachineResult,
} from '../../types/leaderboard'
import bronzeRankSprite from '../../assets/top-3/bronze.png'
import goldRankSprite from '../../assets/top-3/gold.png'
import silverRankSprite from '../../assets/top-3/silver.png'

type LeaderboardTableProps =
  | {
      kind: 'local'
      page: LeaderboardPage<RankedMachineResult>
    }
  | {
      kind: 'global'
      page: LeaderboardPage<RankedGlobalLeaderboardEntry>
    }

const rankSpriteByPlace = new Map<number, string>([
  [1, goldRankSprite],
  [2, silverRankSprite],
  [3, bronzeRankSprite],
])

function getTopRankClass(rank: number) {
  return rank <= 3 ? `top-rank top-rank-${rank}` : undefined
}

function RankCell({ rank }: { rank: number }) {
  const rankSprite = rankSpriteByPlace.get(rank)

  return (
    <td className="rank-cell">
      {rankSprite ? (
        <img className="rank-sprite" src={rankSprite} alt={`${rank} место`} />
      ) : (
        rank
      )}
    </td>
  )
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
              <tr key={entry.playerName} className={getTopRankClass(entry.rank)}>
                <RankCell rank={entry.rank} />
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
            <tr key={entry.id} className={getTopRankClass(entry.rank)}>
              <RankCell rank={entry.rank} />
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
