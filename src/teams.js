export const TEAMS = [
  // Pool A - San Juan, Puerto Rico
  { id: 784, code: "CAN", name: "Canada", flag: "\u{1F1E8}\u{1F1E6}", pool: "A" },
  { id: 792, code: "COL", name: "Colombia", flag: "\u{1F1E8}\u{1F1F4}", pool: "A" },
  { id: 798, code: "CUB", name: "Cuba", flag: "\u{1F1E8}\u{1F1FA}", pool: "A" },
  { id: 890, code: "PAN", name: "Panama", flag: "\u{1F1F5}\u{1F1E6}", pool: "A" },
  { id: 897, code: "PUR", name: "Puerto Rico", flag: "\u{1F1F5}\u{1F1F7}", pool: "A" },

  // Pool B - Houston, Texas
  { id: 776, code: "BRA", name: "Brazil", flag: "\u{1F1E7}\u{1F1F7}", pool: "B" },
  { id: 821, code: "GBR", name: "Great Britain", flag: "\u{1F1EC}\u{1F1E7}", pool: "B" },
  { id: 841, code: "ITA", name: "Italy", flag: "\u{1F1EE}\u{1F1F9}", pool: "B" },
  { id: 867, code: "MEX", name: "Mexico", flag: "\u{1F1F2}\u{1F1FD}", pool: "B" },
  { id: 940, code: "USA", name: "United States", flag: "\u{1F1FA}\u{1F1F8}", pool: "B" },

  // Pool C - Tokyo, Japan
  { id: 760, code: "AUS", name: "Australia", flag: "\u{1F1E6}\u{1F1FA}", pool: "C" },
  { id: 791, code: "TPE", name: "Chinese Taipei", flag: "\u{1F3CC}", pool: "C" },
  { id: 800, code: "CZE", name: "Czechia", flag: "\u{1F1E8}\u{1F1FF}", pool: "C" },
  { id: 843, code: "JPN", name: "Japan", flag: "\u{1F1EF}\u{1F1F5}", pool: "C" },
  { id: 1171, code: "KOR", name: "South Korea", flag: "\u{1F1F0}\u{1F1F7}", pool: "C" },

  // Pool D - Miami, Florida
  { id: 805, code: "DOM", name: "Dominican Republic", flag: "\u{1F1E9}\u{1F1F4}", pool: "D" },
  { id: 840, code: "ISR", name: "Israel", flag: "\u{1F1EE}\u{1F1F1}", pool: "D" },
  { id: 878, code: "NED", name: "Netherlands", flag: "\u{1F1F3}\u{1F1F1}", pool: "D" },
  { id: 881, code: "NCA", name: "Nicaragua", flag: "\u{1F1F3}\u{1F1EE}", pool: "D" },
  { id: 944, code: "VEN", name: "Venezuela", flag: "\u{1F1FB}\u{1F1EA}", pool: "D" },
];

// TBD placeholder team IDs used by MLB API for playoff rounds
export const TBD_TEAM_IDS = new Set([
  3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, // Pool winners/runners-up
  4560, 4561, 4562, 4563, // Quarterfinal winners
  3010, 3011, // Semifinal winners
]);

export function findTeamById(id) {
  return TEAMS.find((t) => t.id === id) || null;
}

export function findTeamByCode(code) {
  return TEAMS.find((t) => t.code === code) || null;
}
