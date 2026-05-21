# Arcade Leaderboard Display

Fullscreen React prototype for a public arcade leaderboard display. The app shows five local machine leaderboards and one global leaderboard, rotates through paged results automatically, and uses local JSON data only.

## Stack

- React
- TypeScript
- Vite
- Local JSON data
- CSS for layout and transition animation

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

The development server starts a Vite app. If the default port is busy, Vite will choose the next available port.

## Data Source

Leaderboard data is stored in `src/data/leaderboards.json`.

The file contains exactly five arcade machines:

- Призовой аркадный автомат «4 в ряд»
- Автомат морской бой «Бродяги морей»
- Аркадный автомат «Миллениум»
- «Ретро игры — Драки» аркадный автомат
- «Ретро игры — Гонки» аркадный автомат

Each machine has at least 25 results. Each result contains:

```ts
{
  id: string
  playerName: string
  wins: number
  score: number
}
```

Data loading is isolated in `src/services/leaderboardService.ts`, so the local JSON source can later be replaced by an API call without moving leaderboard logic into UI components.

## Ranking Logic

The primary ranking metric is `wins`.

`score` is still displayed and used as a tie-breaker, but it is not the primary metric because scores can have different scales across different arcade machines.

Local leaderboards:

- use only one machine's results;
- sort by `wins` descending;
- break ties by `score` descending;
- take top 25;
- paginate as `1–10`, `11–20`, `21–25`.

Global leaderboard:

- groups all results by `playerName`;
- sums `wins` into `totalWins`;
- sums `score` into `totalScore`;
- tracks how many machines each player appears on;
- sorts by `totalWins` descending, then `totalScore` descending;
- takes top 25;
- does not duplicate the same player.

## Display Cycle

The app shows one page at a time and rotates automatically:

```txt
Machine 1 p1
Machine 1 p2
Machine 1 p3
Machine 2 p1
...
Machine 5 p3
Global p1
Global p2
Global p3
repeat
```

The page duration is configured in `src/App.tsx` as `PAGE_DISPLAY_DURATION_MS`.

## Scope

This is a frontend-only prototype. It intentionally does not include:

- backend;
- database;
- authentication;
- admin panel;
- editing or adding results from the UI;
- real API requests;
- WebSocket;
- hardware integration;
- persistent storage;
- routing.
