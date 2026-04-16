"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styles from "./question-step.module.css";

const STEPS = [
  {
    slug: "deutschlandflagge",
    label: "DEUTSCHLANDFLAGGE",
    resultPath: "/Deutschlandflagge",
    isFlag: true,
  },
  { slug: "deutschland", label: "DEUTSCHLAND", resultPath: "/Deutschland" },
  { slug: "alltag", label: "ALLTAG", resultPath: "/Alltag" },
  { slug: "kultur", label: "KULTUR", resultPath: "/Kultur" },
  { slug: "werte", label: "WERTE", resultPath: "/Werte" },
  { slug: "politik", label: "POLITIK", resultPath: "/Politik" },
  { slug: "zukunft", label: "ZUKUNFT", resultPath: "/Zukunft" },
];

function randomPosition(index) {
  const angle = (index * 137.5 * Math.PI) / 180;

  // Größeren Abstand zur Mitte herstellen,
  // damit neue Begriffe nicht direkt unter dem Wort / der Flagge liegen
  const baseRadius = 260;
  const radius = baseRadius + (index % 5) * 30;

  let x = Math.cos(angle) * radius;
  let y = Math.sin(angle) * (radius * 0.55);

  // Vertikalen „Schutzbereich“ um das Zentrum erzwingen
  const minCenterPaddingY = 110;
  if (Math.abs(y) < minCenterPaddingY) {
    y = y >= 0 ? minCenterPaddingY : -minCenterPaddingY;
  }

  return { x, y };
}

const FLAG_SRC_PNG = "/deutschlandflagge.png";
const FLAG_SRC_JPG = "/deutschlandflagge.jpg";
const FLAG_SRC_FALLBACK = "https://pngimg.com/d/germany_flag_PNG16.png";

const DRAFT_KEY_PREFIX = "umfrageDraftTerms:";
const FINAL_KEY_PREFIX = "umfrageFinalTerms:";
const SUBMITTED_KEY = "umfrageSubmitted";

export default function QuestionStepClient({ step }) {
  const currentIndex = STEPS.findIndex((s) => s.slug === step);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const current = STEPS[safeIndex];

  const prev = safeIndex > 0 ? STEPS[safeIndex - 1] : null;
  const next = safeIndex < STEPS.length - 1 ? STEPS[safeIndex + 1] : null;

  const router = useRouter();

  const topicNameForStorage = current.resultPath.replace(/^\//, "");

  const getOrCreateOwnerId = () => {
    try {
      const key = "umfrageOwnerId";
      const existing = localStorage.getItem(key);
      if (existing) return existing;
      const generated =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `owner-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(key, generated);
      return generated;
    } catch (e) {
      // Fallback: immer eine nicht-leere ID
      return `owner-${Date.now()}`;
    }
  };

  const [ownerId] = useState(getOrCreateOwnerId);

  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [flagSrc, setFlagSrc] = useState(FLAG_SRC_PNG);

  const persistDraft = (nextItems) => {
    try {
      const normalized = (Array.isArray(nextItems) ? nextItems : []).map((it) => ({
        ...it,
        ownerId: it?.ownerId ?? ownerId,
      }));
      localStorage.setItem(
        `${DRAFT_KEY_PREFIX}${topicNameForStorage}`,
        JSON.stringify(normalized)
      );

      // Wenn bereits abgeschickt wurde: auch final aktualisieren,
      // damit sich die Ergebnisse sofort ändern.
      const submitted = localStorage.getItem(SUBMITTED_KEY) === "true";
      if (submitted) {
        localStorage.setItem(
          `${FINAL_KEY_PREFIX}${topicNameForStorage}`,
          JSON.stringify(normalized)
        );
      }
    } catch (e) {
      // localStorage evtl. blockiert -> UI soll trotzdem funktionieren
      console.warn("Draft persist failed", e);
    }
  };

  const loadDraft = () => {
    try {
      const submitted = localStorage.getItem(SUBMITTED_KEY) === "true";
      const draftRaw = localStorage.getItem(
        `${DRAFT_KEY_PREFIX}${topicNameForStorage}`
      );
      const finalRaw = localStorage.getItem(
        `${FINAL_KEY_PREFIX}${topicNameForStorage}`
      );

      const rawToParse = draftRaw ?? (submitted ? finalRaw : null);
      const parsed = rawToParse ? JSON.parse(rawToParse) : [];

      if (!Array.isArray(parsed)) return [];

      return parsed
        .map((entry) => {
          const id = entry?.id ?? `custom-${Date.now()}`;
          const text = entry?.text ?? entry?.term;
          if (typeof text !== "string" || !text.trim()) return null;
          return {
            id: String(id),
            text,
            ownerId: typeof entry?.ownerId === "string" ? entry.ownerId : ownerId,
          };
        })
        .filter(Boolean);
    } catch (e) {
      console.warn("Draft load failed", e);
      return [];
    }
  };

  useEffect(() => {
    // Wenn der Nutzer zwischen Steps navigiert, Flagge zurücksetzen.
    if (current.isFlag) setFlagSrc(FLAG_SRC_PNG);
  }, [current.isFlag, step]);

  useEffect(() => {
    // Draft terms laden (damit es beim Hin- und Her-Navigieren nicht verschwindet)
    const loaded = loadDraft();
    setItems(loaded);
    setInput("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const positioned = useMemo(
    () =>
      items.map((item, idx) => ({
        ...item,
        ...randomPosition(idx),
      })),
    [items]
  );

  const handleAdd = () => {
    const value = input.trim();
    if (!value) return;
    setItems((prevItems) => {
      const next = [
        ...prevItems,
        {
          id: `custom-${Date.now()}-${prevItems.length}`,
          text: value,
          ownerId,
        },
      ];
      persistDraft(next);
      return next;
    });
    setInput("");
  };

  const handleSubmitAll = () => {
    try {
      // Final terms für alle Kategorien setzen (Deutschlandflagge -> Zukunft)
      for (const s of STEPS) {
        const name = s.resultPath.replace(/^\//, "");
        const draftRaw = localStorage.getItem(`${DRAFT_KEY_PREFIX}${name}`);
        const parsed = draftRaw ? JSON.parse(draftRaw) : [];
        const normalized = Array.isArray(parsed)
          ? parsed
              .map((entry, idx) => {
                const id = entry?.id ?? `${name}-custom-${Date.now()}-${idx}`;
                const text =
                  entry?.text != null ? entry.text : entry?.term != null ? entry.term : "";
                if (typeof text !== "string" || !text.trim()) return null;
                return {
                  id: String(id),
                  text,
                  ownerId:
                    typeof entry?.ownerId === "string" ? entry.ownerId : ownerId,
                };
              })
              .filter(Boolean)
          : [];
        localStorage.setItem(
          `${FINAL_KEY_PREFIX}${name}`,
          JSON.stringify(normalized)
        );
      }
      localStorage.setItem(SUBMITTED_KEY, "true");
    } catch (e) {
      console.warn("Submit failed", e);
    }

    // Zur Übersicht der Ergebnisse
    router.push("/ergebnis");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.canvas}>
          {positioned.map((item) => (
            <div
              key={item.id}
              className={styles.chip}
              style={{ transform: `translate(${item.x}px, ${item.y}px)` }}
            >
              <span>{item.text}</span>
              <button
                type="button"
                className={styles.chipClose}
                onClick={() =>
                  setItems((prevItems) => {
                    const next = prevItems.filter((i) => i.id !== item.id);
                    persistDraft(next);
                    return next;
                  })
                }
              >
                ×
              </button>
            </div>
          ))}

          {current.isFlag ? (
            <img
              key={flagSrc}
              className={styles.flag}
              src={flagSrc}
              alt="Deutschlandflagge"
              onError={() => {
                setFlagSrc((prevSrc) => {
                  if (prevSrc === FLAG_SRC_PNG) return FLAG_SRC_JPG;
                  if (prevSrc === FLAG_SRC_JPG) return FLAG_SRC_FALLBACK;
                  return FLAG_SRC_FALLBACK;
                });
              }}
              loading="eager"
            />
          ) : (
            <Link href={current.resultPath} className={styles.centerWord}>
              {current.label}
            </Link>
          )}

          <div className={styles.controls}>
            <div className={styles.inputBar}>
              <input
                type="text"
                placeholder="hier eingeben"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdd();
                }}
                className={styles.input}
              />
            </div>
          </div>

          {current.slug === "zukunft" && (
            <button
              type="button"
              className={`${styles.submitButton} ${styles.submitButtonZukunft}`}
              onClick={handleSubmitAll}
            >
              Abschicken
            </button>
          )}

          <div className={styles.arrows}>
            {prev ? (
              <Link href={`/umfrage/themen/${prev.slug}`} className={styles.arrow}>
                <img
                  src="/pfeilnachrechts.svg"
                  alt="Zurück"
                  className={styles.arrowIconLeft}
                />
              </Link>
            ) : (
              <span className={styles.arrowPlaceholder} />
            )}
            {next ? (
              <Link href={`/umfrage/themen/${next.slug}`} className={styles.arrow}>
                <img
                  src="/pfeilnachrechts.svg"
                  alt="Weiter"
                  className={styles.arrowIcon}
                />
              </Link>
            ) : (
              <span className={styles.arrowPlaceholder} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

