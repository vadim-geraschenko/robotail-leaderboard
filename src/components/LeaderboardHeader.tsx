import './LeaderboardHeader.css'
import fourInARow from '../assets/arcade/arcade_sprite_01_4_in_a_row.png'
import seaBattle from '../assets/arcade/arcade_sprite_02_sea_battle.png'
import millennium from '../assets/arcade/arcade_sprite_03_millennium.png'
import fighting from '../assets/arcade/arcade_sprite_04_fighting.png'
import race from '../assets/arcade/arcade_sprite_05_race.png'
import globalSprite from '../assets/arcade/arcade_sprite_06_global_leaderboard.png'

type Props = {
  kind: 'local' | 'global'
  title: string
  rangeLabel: string
}

const headerByTitle: ReadonlyMap<string, readonly [string, string]> = new Map([
  ['Призовой аркадный автомат «4 в ряд»', ['4 в ряд', fourInARow]],
  ['Автомат морской бой «Бродяги морей»', ['Бродяги морей', seaBattle]],
  ['Аркадный автомат «Миллениум»', ['Миллениум', millennium]],
  ['«Ретро игры — Драки» аркадный автомат', ['Ретро игры — Драки', fighting]],
  ['«Ретро игры — Гонки» аркадный автомат', ['Ретро игры — Гонки', race]],
] as const)

export function LeaderboardHeader({ kind, title, rangeLabel }: Props) {
  const [name, image] =
    kind === 'global'
      ? ['Общий рейтинг', globalSprite]
      : (headerByTitle.get(title) ?? [title, undefined])

  return (
    <header className="leaderboard-header">
      <h1>Таблица лидеров</h1>
      <div className="leaderboard-marquee">
        {image && <img className="leaderboard-symbol" src={image} alt="" />}
        <div className="leaderboard-name">{name}</div>
        <div className="leaderboard-range">Места {rangeLabel}</div>
      </div>
    </header>
  )
}
