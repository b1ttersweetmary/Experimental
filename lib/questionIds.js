/** Erlaubte questionId-Werte (Pfad ohne Slash, wie z. B. Deutschlandflagge) */

export const ALLOWED_QUESTION_IDS = new Set([
  "Deutschlandflagge",
  "Deutschland",
  "Alltag",
  "Kultur",
  "Werte",
  "Politik",
  "Zukunft",
]);

export function isAllowedQuestionId(id) {
  return typeof id === "string" && ALLOWED_QUESTION_IDS.has(id.trim());
}
