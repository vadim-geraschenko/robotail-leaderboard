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

const localSpriteByTitle = new Map<string, string>([
  ['Призовой аркадный автомат «4 в ряд»', fourInARowSprite],
  ['Автомат морской бой «Бродяги морей»', seaBattleSprite],
  ['Аркадный автомат «Миллениум»', millenniumSprite],
  ['«Ретро игры — Драки» аркадный автомат', fightingSprite],
  ['«Ретро игры — Гонки» аркадный автомат', raceSprite],
])

const localDisplayTitleByTitle = new Map<string, string>([
  ['Призовой аркадный автомат «4 в ряд»', '4 в ряд'],
  ['Автомат морской бой «Бродяги морей»', 'Бродяги морей'],
  ['Аркадный автомат «Миллениум»', 'Миллениум'],
  ['«Ретро игры — Драки» аркадный автомат', 'Ретро игры — Драки'],
  ['«Ретро игры — Гонки» аркадный автомат', 'Ретро игры — Гонки'],
])

export function LeaderboardHeader({ title, kind, rangeLabel }: LeaderboardHeaderProps) {
  const spriteSrc = kind === 'global' ? globalSprite : localSpriteByTitle.get(title)
  const displayTitle =
    kind === 'global' ? 'Общий рейтинг' : (localDisplayTitleByTitle.get(title) ?? title)

  return (
    <header className="leaderboard-header">
      <h1 className="leaderboard-title">Таблица лидеров</h1>
      <div className="leaderboard-marquee">
        {spriteSrc ? (
          <div className="leaderboard-symbol" aria-hidden="true">
            <img src={spriteSrc} alt="" />
          </div>
        ) : null}
        <div className="leaderboard-name">{displayTitle}</div>
        <div className="leaderboard-range">Места {rangeLabel}</div>
      </div>
    </header>
  )
}
