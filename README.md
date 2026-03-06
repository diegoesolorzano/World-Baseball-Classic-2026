# World Baseball Classic 2026 - Calendar

Auto-updating `.ics` calendars for the 2026 World Baseball Classic. Subscribe to your team's calendar and get game times, scores, and results updated automatically.

**[View Calendar](https://diegoesolorzano.github.io/World-Baseball-Classic-2026/)**

## How it works

1. Fetches game data from the MLB Stats API every few hours
2. Generates `.ics` calendar files for each of the 20 teams + a full tournament calendar
3. Deploys to GitHub Pages so calendars are subscribable from any calendar app

As teams advance through the tournament, playoff games are automatically added to team calendars.

## Teams

| Pool A (San Juan) | Pool B (Houston) | Pool C (Tokyo) | Pool D (Miami) |
|---|---|---|---|
| Canada | Brazil | Australia | Dominican Republic |
| Colombia | Great Britain | Chinese Taipei | Israel |
| Cuba | Italy | Czechia | Netherlands |
| Panama | Mexico | Japan | Nicaragua |
| Puerto Rico | United States | South Korea | Venezuela |

## Subscribe

Pick your team at the [landing page](https://diegoesolorzano.github.io/World-Baseball-Classic-2026/) or use a direct URL:

```
https://diegoesolorzano.github.io/World-Baseball-Classic-2026/calendars/ven.ics
```

Replace `ven` with your team's code (`usa`, `dom`, `jpn`, `mex`, `pur`, etc.). Use `all` for the full tournament.

**Google Calendar:** Settings > Add calendar > From URL > paste the link.

**Apple Calendar:** File > New Subscription > paste the link.

## Data source

All game data comes from the [MLB Stats API](https://statsapi.mlb.com). Updated every 3 hours during pool play, every hour during elimination rounds.
