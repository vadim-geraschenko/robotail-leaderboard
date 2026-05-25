import './LeaderboardTable.css'
import bronzeRank from '../assets/top-3/bronze.png'
import goldRank from '../assets/top-3/gold.png'
import silverRank from '../assets/top-3/silver.png'
import type {
  LeaderboardPage,
  RankedGlobalLeaderboardEntry,
  RankedMachineResult,
} from '../types/leaderboard'

type Entry = RankedMachineResult | RankedGlobalLeaderboardEntry
type Props = {
  kind: 'local' | 'global'
  page: LeaderboardPage<Entry>
  transition: 'screen-switch' | 'page-scroll'
}

const rankSprites = [goldRank, silverRank, bronzeRank]
const columns = {
  local: ['Место', 'Игрок', 'Победы', 'Очки'],
  global: ['Место', 'Игрок', 'Всего побед', 'Автоматов', 'Суммарные очки'],
}

function isGlobal(entry: Entry): entry is RankedGlobalLeaderboardEntry {
  return 'totalWins' in entry
}

function Rank({ rank }: { rank: number }) {
  const sprite = rankSprites[rank - 1]

  return (
    <td className="rank-cell">{sprite ? <img src={sprite} alt={`${rank} место`} /> : rank}</td>
  )
}

export function LeaderboardTable({ kind, page, transition }: Props) {
  return (
    <div className="leaderboard-table-wrap">
      <table className="leaderboard-table">
        <thead>
          <tr>
            {columns[kind].map((column) => (
              <th
                key={column}
                className={column === 'Место' || column === 'Игрок' ? '' : 'numeric'}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody key={page.rangeLabel} className={transition}>
          {page.entries.map((entry) => (
            <tr
              key={isGlobal(entry) ? entry.playerName : entry.id}
              className={entry.rank <= 3 ? `top-rank top-rank-${entry.rank}` : ''}
            >
              <Rank rank={entry.rank} />
              <td className="player-cell">{entry.playerName}</td>
              {isGlobal(entry) ? (
                <>
                  <td className="numeric">{entry.totalWins}</td>
                  <td className="numeric">{entry.machinesCount}</td>
                  <td className="numeric">{entry.totalScore}</td>
                </>
              ) : (
                <>
                  <td className="numeric">{entry.wins}</td>
                  <td className="numeric">{entry.score}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
