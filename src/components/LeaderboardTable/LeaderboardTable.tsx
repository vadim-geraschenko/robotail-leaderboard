import './LeaderboardTable.css'
import type {
  LeaderboardPage,
  RankedGlobalLeaderboardEntry,
  RankedMachineResult,
} from '../../types/leaderboard'
import bronzeRankSprite from '../../assets/top-3/bronze.png'
import goldRankSprite from '../../assets/top-3/gold.png'
import silverRankSprite from '../../assets/top-3/silver.png'

type LeaderboardTableProps = {
  kind: 'local' | 'global'
  page: LeaderboardPage<RankedMachineResult> | LeaderboardPage<RankedGlobalLeaderboardEntry>
}

const rankSpriteByPlace = new Map<number, string>([
  [1, goldRankSprite],
  [2, silverRankSprite],
  [3, bronzeRankSprite],
])

const columnsByKind = {
  local: ['Место', 'Игрок', 'Победы', 'Очки'],
  global: ['Место', 'Игрок', 'Всего побед', 'Автоматов', 'Суммарные очки'],
} as const

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

function isGlobalEntry(
  entry: RankedMachineResult | RankedGlobalLeaderboardEntry,
): entry is RankedGlobalLeaderboardEntry {
  return 'totalWins' in entry
}

function LeaderboardRow({ entry }: { entry: RankedMachineResult | RankedGlobalLeaderboardEntry }) {
  return (
    <tr className={getTopRankClass(entry.rank)}>
      <RankCell rank={entry.rank} />
      <td className="player-cell">{entry.playerName}</td>
      {isGlobalEntry(entry) ? (
        <>
          <td className="numeric metric-cell">{entry.totalWins}</td>
          <td className="numeric metric-cell">{entry.machinesCount}</td>
          <td className="numeric metric-cell">{entry.totalScore}</td>
        </>
      ) : (
        <>
          <td className="numeric metric-cell">{entry.wins}</td>
          <td className="numeric metric-cell">{entry.score}</td>
        </>
      )}
    </tr>
  )
}

export function LeaderboardTable(props: LeaderboardTableProps) {
  return (
    <div className="leaderboard-table-wrap">
      <table className="leaderboard-table">
        <thead>
          <tr>
            {columnsByKind[props.kind].map((column) => (
              <th
                key={column}
                className={column === 'Место' || column === 'Игрок' ? undefined : 'numeric'}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.page.entries.map((entry) => (
            <LeaderboardRow
              key={isGlobalEntry(entry) ? entry.playerName : entry.id}
              entry={entry}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
