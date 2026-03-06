import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchAllGames, filterByTeam } from "./scraper.js";
import { generateICS } from "./ics.js";
import { TEAMS } from "./teams.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "..");
const CALENDARS_DIR = join(ROOT_DIR, "calendars");

async function main() {
  console.log("Fetching games from MLB Stats API...");
  const allGames = await fetchAllGames();
  console.log(`Found ${allGames.length} total games`);

  mkdirSync(CALENDARS_DIR, { recursive: true });

  // Generate full tournament calendar
  const allICS = generateICS(allGames, "Full Tournament");
  writeFileSync(join(CALENDARS_DIR, "all.ics"), allICS, "utf-8");
  console.log(`all (Full Tournament): ${allGames.length} games`);

  // Generate per-team calendars
  for (const team of TEAMS) {
    const teamGames = filterByTeam(allGames, team.id);
    console.log(`${team.code} (${team.name}): ${teamGames.length} games`);

    const ics = generateICS(teamGames, team.name);
    const filePath = join(CALENDARS_DIR, `${team.code.toLowerCase()}.ics`);
    writeFileSync(filePath, ics, "utf-8");
  }

  // Generate data.json for the landing page
  const data = {
    updatedAt: new Date().toISOString(),
    teams: TEAMS,
    games: allGames,
  };
  writeFileSync(join(ROOT_DIR, "data.json"), JSON.stringify(data), "utf-8");
  console.log(
    `\nGenerated ${TEAMS.length + 1} calendars (${TEAMS.length} teams + full tournament) + data.json`
  );
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
