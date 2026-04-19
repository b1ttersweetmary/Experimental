/**
 * Anonyme Nutzer-ID: beim ersten Aufruf erzeugen, in localStorage halten.
 * Migriert bestehenden Schlüssel umfrageOwnerId → umfrageUserId.
 */

const STORAGE_KEY = "umfrageUserId";
const LEGACY_KEY = "umfrageOwnerId";

export function getOrCreateUserId() {
  try {
    if (typeof window === "undefined") return "";
    let id = localStorage.getItem(STORAGE_KEY);
    if (id) return id;
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      localStorage.setItem(STORAGE_KEY, legacy);
      return legacy;
    }
    const generated =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `user-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(STORAGE_KEY, generated);
    return generated;
  } catch {
    return `user-${Date.now()}`;
  }
}
