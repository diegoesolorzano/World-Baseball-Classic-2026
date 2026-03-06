import { findTeamById, TBD_TEAM_IDS } from "./teams.js";

const API_URL =
  "https://statsapi.mlb.com/api/v1/schedule?sportId=51&startDate=2026-03-05&endDate=2026-03-17&hydrate=team,venue";

export async function fetchAllGames() {
  const res = await fetch(API_URL, {
    headers: { "User-Agent": "WBC-Calendar/1.0" },
  });

  if (!res.ok) {
    throw new Error(`MLB API returned ${res.status}`);
  }

  const data = await res.json();
  const games = [];

  for (const date of data.dates || []) {
    for (const game of date.games || []) {
      games.push(normalizeGame(game));
    }
  }

  return games.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
}

function normalizeGame(game) {
  const away = game.teams.away;
  const home = game.teams.home;

  const awayTeam = resolveTeam(away.team);
  const homeTeam = resolveTeam(home.team);

  return {
    id: game.gamePk,
    startTime: game.gameDate,
    officialDate: game.officialDate,
    status: game.status.detailedState,
    statusCode: game.status.statusCode,
    description: game.description || "",
    seriesDescription: game.seriesDescription || "",
    venue: game.venue?.name || "TBD",
    dayNight: game.dayNight,
    away: {
      id: away.team.id,
      name: awayTeam.name,
      code: awayTeam.code,
      score: away.score ?? null,
      isWinner: away.isWinner ?? null,
      record: away.leagueRecord
        ? `${away.leagueRecord.wins}-${away.leagueRecord.losses}`
        : null,
    },
    home: {
      id: home.team.id,
      name: homeTeam.name,
      code: homeTeam.code,
      score: home.score ?? null,
      isWinner: home.isWinner ?? null,
      record: home.leagueRecord
        ? `${home.leagueRecord.wins}-${home.leagueRecord.losses}`
        : null,
    },
    isTBD: TBD_TEAM_IDS.has(away.team.id) || TBD_TEAM_IDS.has(home.team.id),
  };
}

function resolveTeam(apiTeam) {
  const known = findTeamById(apiTeam.id);
  if (known) return known;

  // TBD/placeholder team from playoffs
  return {
    id: apiTeam.id,
    code: apiTeam.abbreviation || "TBD",
    name: apiTeam.name || "TBD",
    flag: "",
    pool: null,
  };
}

export function filterByTeam(games, teamId) {
  return games.filter(
    (g) => g.away.id === teamId || g.home.id === teamId
  );
}
