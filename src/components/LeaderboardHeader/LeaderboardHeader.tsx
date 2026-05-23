import './LeaderboardHeader.css'
import fourInARowSprite from '../../../codex/arcade_sprites_transparent/arcade_sprite_01_4_in_a_row.png'
import seaBattleSprite from '../../../codex/arcade_sprites_transparent/arcade_sprite_02_sea_battle.png'
import millenniumSprite from '../../../codex/arcade_sprites_transparent/arcade_sprite_03_millennium.png'
import fightingSprite from '../../../codex/arcade_sprites_transparent/arcade_sprite_04_fighting.png'
import raceSprite from '../../../codex/arcade_sprites_transparent/arcade_sprite_05_race.png'
import globalSprite from '../../../codex/arcade_sprites_transparent/arcade_sprite_06_global_leaderboard.png'

interface LeaderboardHeaderProps {
  title: string
  kind: 'local' | 'global'
  rangeLabel: string
}

type HeaderConfig = {
  displayTitle: string
  spriteSrc?: string
}

const localHeaderByTitle = new Map<string, HeaderConfig>([
  [
    'Призовой аркадный автомат «4 в ряд»',
    { displayTitle: '4 в ряд', spriteSrc: fourInARowSprite },
  ],
  [
    'Автомат морской бой «Бродяги морей»',
    { displayTitle: 'Бродяги морей', spriteSrc: seaBattleSprite },
  ],
  [
    'Аркадный автомат «Миллениум»',
    { displayTitle: 'Миллениум', spriteSrc: millenniumSprite },
  ],
  [
    '«Ретро игры — Драки» аркадный автомат',
    { displayTitle: 'Ретро игры — Драки', spriteSrc: fightingSprite },
  ],
  [
    '«Ретро игры — Гонки» аркадный автомат',
    { displayTitle: 'Ретро игры — Гонки', spriteSrc: raceSprite },
  ],
])

export function LeaderboardHeader({ title, kind, rangeLabel }: LeaderboardHeaderProps) {
  const header =
    kind === 'global'
      ? { displayTitle: 'Общий рейтинг', spriteSrc: globalSprite }
      : (localHeaderByTitle.get(title) ?? { displayTitle: title, spriteSrc: undefined })

  return (
    <header className="leaderboard-header">
      <h1 className="leaderboard-title">Таблица лидеров</h1>
      <div className="leaderboard-marquee">
        {header.spriteSrc ? (
          <div className="leaderboard-symbol" aria-hidden="true">
            <img src={header.spriteSrc} alt="" />
          </div>
        ) : null}
        <div className="leaderboard-name">{header.displayTitle}</div>
        <div className="leaderboard-range">Места {rangeLabel}</div>
      </div>
    </header>
  )
}
