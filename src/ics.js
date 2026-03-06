const GAME_DURATION_MS = 3.5 * 60 * 60 * 1000; // 3.5 hours

export function generateICS(games, calendarName) {
  const events = games.map(buildEvent).join("");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WBC//World Baseball Classic 2026//EN",
    `X-WR-CALNAME:WBC 2026 - ${calendarName}`,
    "X-WR-TIMEZONE:UTC",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-PUBLISHED-TTL:PT6H",
    events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

function buildEvent(game) {
  const start = new Date(game.startTime);
  const end = new Date(start.getTime() + GAME_DURATION_MS);

  const isFinal = game.statusCode === "F" || game.statusCode === "FR";
  const isLive =
    game.statusCode === "I" ||
    game.statusCode === "MA" ||
    game.statusCode === "MF";

  let summary = `${game.away.name} vs ${game.home.name}`;
  if (isFinal && game.away.score != null && game.home.score != null) {
    summary += ` (${game.away.score}-${game.home.score})`;
  }

  const descParts = [];
  if (game.description) descParts.push(game.description);
  if (game.seriesDescription) descParts.push(game.seriesDescription);
  if (isFinal && game.away.score != null) {
    const winner = game.away.isWinner ? game.away.name : game.home.name;
    descParts.push(`Final: ${game.away.name} ${game.away.score} - ${game.home.name} ${game.home.score}`);
    descParts.push(`Winner: ${winner}`);
  }
  if (game.away.record) {
    descParts.push(`${game.away.code}: ${game.away.record} | ${game.home.code}: ${game.home.record}`);
  }

  let status = "TENTATIVE";
  if (isFinal) status = "CONFIRMED";
  if (isLive) status = "CONFIRMED";

  const lines = [
    "BEGIN:VEVENT",
    `UID:wbc2026-${game.id}@worldbaseballclassic`,
    `DTSTAMP:${formatDateUTC(new Date())}`,
    `DTSTART:${formatDateUTC(start)}`,
    `DTEND:${formatDateUTC(end)}`,
    `SUMMARY:${escapeICS(summary)}`,
    `DESCRIPTION:${escapeICS(descParts.join("\\n"))}`,
    `LOCATION:${escapeICS(game.venue)}`,
    `STATUS:${status}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeICS(summary)} starts in 30 minutes`,
    "END:VALARM",
    "END:VEVENT",
  ];

  return lines.join("\r\n") + "\r\n";
}

function formatDateUTC(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeICS(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}
