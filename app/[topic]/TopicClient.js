"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./topic.module.css";
import { getOrCreateUserId } from "@/lib/clientUserId";
import deutschlandflaggeTerms from "../../data/deutschlandflagge.json";
import deutschlandTerms from "../../data/deutschland.json";
import alltagTerms from "../../data/alltag.json";
import kulturTerms from "../../data/kultur.json";
import werteTerms from "../../data/werte.json";
import zukunftTerms from "../../data/zukunft.json";
import politikTerms from "../../data/politik.json";

const FALLBACK_BUBBLE_WIDTH = 160;
const FALLBACK_BUBBLE_HEIGHT = 40;
const COLORS = [
  "#FFE5E5",
  "#FFF4CF",
  "#E5FFE5",
  "#E5F0FF",
  "#F0E5FF",
  "#FFE5F5",
];

export default function TopicClient({ topic }) {
  const decodedTopic = topic;

  const [ownerId, setOwnerId] = useState("");
  useEffect(() => {
    setOwnerId(getOrCreateUserId());
  }, []);

  const [terms, setTerms] = useState([]);
  const [extraTerms, setExtraTerms] = useState([]); // {id, term, ownerId}
  const [positions, setPositions] = useState({});
  const [draggingId, setDraggingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [sortedMode, setSortedMode] = useState(false);
  const areaRef = useRef(null);
  const termRefs = useRef({});

  const termsWithIds = useMemo(() => {
    const baseTerms = terms.map((term, index) => ({
      id: `${decodedTopic}-${index}`,
      term,
      isCustom: false,
      ownerId: null,
    }));
    const normalizedExtra = extraTerms
      .map((entry, idx) => {
        const id =
          entry?.id != null ? String(entry.id) : `${decodedTopic}-custom-${idx}`;
        const termValue =
          entry?.term != null ? entry.term : entry?.text != null ? entry.text : "";
        if (typeof termValue !== "string") return null;
        if (!termValue.trim()) return null;
        return {
          id,
          term: termValue,
          isCustom: true,
          ownerId:
            typeof entry?.ownerId === "string" ? entry.ownerId : ownerId,
        };
      })
      .filter(Boolean);

    return [...baseTerms, ...normalizedExtra];
  }, [terms, extraTerms, decodedTopic]);

  const sortedTermsWithIds = useMemo(() => {
    return [...termsWithIds].sort((a, b) =>
      a.term.localeCompare(b.term, "de", { sensitivity: "base" })
    );
  }, [termsWithIds]);

  useEffect(() => {
    async function loadTerms() {
      // Für Deutschlandflagge: Begriffe direkt aus lokaler JSON-Datei
      if (decodedTopic === "Deutschlandflagge") {
        setTerms(Array.isArray(deutschlandflaggeTerms) ? deutschlandflaggeTerms : []);
        return;
      }

      // Für Deutschland: Begriffe aus eigener JSON-Datei
      if (decodedTopic === "Deutschland") {
        setTerms(Array.isArray(deutschlandTerms) ? deutschlandTerms : []);
        return;
      }

      // Für Alltag: Begriffe aus eigener JSON-Datei
      if (decodedTopic === "Alltag") {
        setTerms(Array.isArray(alltagTerms) ? alltagTerms : []);
        return;
      }

      // Für Kultur: Begriffe aus eigener JSON-Datei
      if (decodedTopic === "Kultur") {
        setTerms(Array.isArray(kulturTerms) ? kulturTerms : []);
        return;
      }

      // Für Werte: Begriffe aus eigener JSON-Datei
      if (decodedTopic === "Werte") {
        setTerms(Array.isArray(werteTerms) ? werteTerms : []);
        return;
      }

      // Für Zukunft: Begriffe aus eigener JSON-Datei
      if (decodedTopic === "Zukunft") {
        setTerms(Array.isArray(zukunftTerms) ? zukunftTerms : []);
        return;
      }

      // Für Politik: Begriffe aus eigener JSON-Datei
      if (decodedTopic === "Politik") {
        setTerms(Array.isArray(politikTerms) ? politikTerms : []);
        return;
      }

      try {
        const response = await fetch(
          `/api/terms/${encodeURIComponent(decodedTopic)}`
        );
        if (!response.ok) return;
        const data = await response.json();
        setTerms(Array.isArray(data.terms) ? data.terms : []);
      } catch (error) {
        console.error("Fehler beim Laden der Begriffe:", error);
      }
    }

    loadTerms();
  }, [decodedTopic]);

  useEffect(() => {
    let cancelled = false;

    async function loadExtras() {
      try {
        const res = await fetch(
          `/api/responses?questionId=${encodeURIComponent(decodedTopic)}`
        );
        const data = await res.json().catch(() => ({ responses: [] }));
        if (cancelled) return;
        const normalized = Array.isArray(data.responses)
          ? data.responses.map((r) => ({
              id: r.id,
              term: r.text,
              ownerId: r.userId,
            }))
          : [];
        setExtraTerms(normalized);
      } catch (e) {
        console.warn("Failed to load responses", e);
        if (!cancelled) setExtraTerms([]);
      }
    }

    loadExtras();
    const interval = setInterval(loadExtras, 25000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [decodedTopic]);

  const handleRemoveExtraTerm = async (id) => {
    const entry = extraTerms.find((t) => t.id === id);
    if (!entry) return;
    if (entry.ownerId !== ownerId || !ownerId) return;

    try {
      const res = await fetch(`/api/responses/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: ownerId }),
      });
      if (!res.ok) return;

      setExtraTerms((prev) => prev.filter((t) => t.id !== id));
      setPositions((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      delete termRefs.current[id];
    } catch (e) {
      console.warn("Remove term failed", e);
    }
  };

  useEffect(() => {
    if (!termsWithIds.length || sortedMode) return;
    if (!areaRef.current) return;

    const rect = areaRef.current.getBoundingClientRect();
    const areaWidth = rect.width;
    const areaHeight = rect.height;

    const TOGGLE_SAFE_WIDTH = 80; // geschützter Bereich von links
    const TOGGLE_SAFE_HEIGHT = 40; // geschützter Bereich vom unteren Rand

    setPositions((prev) => {
      const next = { ...prev };

      termsWithIds.forEach(({ id }) => {
        if (!next[id]) {
          const width = areaWidth || 1200;
          const height = areaHeight || 800;

          const el = termRefs.current[id];
          const bubbleWidth = el?.offsetWidth || FALLBACK_BUBBLE_WIDTH;
          const bubbleHeight = el?.offsetHeight || FALLBACK_BUBBLE_HEIGHT;

          const maxX = Math.max(0, width - bubbleWidth);
          const maxY = Math.max(0, height - bubbleHeight - TOGGLE_SAFE_HEIGHT);

          next[id] = {
            x: Math.random() * maxX,
            y: Math.random() * maxY,
          };
        }
      });

      return next;
    });
  }, [termsWithIds, sortedMode]);

  const handlePointerDown = (id, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDraggingId(id);
    setOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handlePointerMove = (event) => {
    if (!draggingId || sortedMode) return;

    const containerRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - containerRect.left - offset.x;
    const y = event.clientY - containerRect.top - offset.y;

    const width = containerRect.width;
    const height = containerRect.height;

    const el = termRefs.current[draggingId];
    const bubbleWidth = el?.offsetWidth || FALLBACK_BUBBLE_WIDTH;
    const bubbleHeight = el?.offsetHeight || FALLBACK_BUBBLE_HEIGHT;

    setPositions((prev) => ({
      ...prev,
      [draggingId]: {
        x: Math.max(0, Math.min(width - bubbleWidth, x)),
        y: Math.max(0, Math.min(height - bubbleHeight, y)),
      },
    }));
  };

  const handlePointerUp = () => {
    setDraggingId(null);
  };

  const sortToggle = (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setSortedMode((prev) => !prev)}
    >
      <span
        className={`${styles["toggle-knob"]} ${
          sortedMode ? styles["toggle-knob-on"] : ""
        }`}
      />
    </button>
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {decodedTopic !== "Deutschlandflagge" &&
          decodedTopic !== "Deutschland" &&
          decodedTopic !== "Alltag" &&
          decodedTopic !== "Kultur" &&
          decodedTopic !== "Werte" &&
          decodedTopic !== "Zukunft" &&
          decodedTopic !== "Politik" && (
          <header className={styles.header}>
            <h1 className={styles.title}>{decodedTopic}</h1>
          </header>
        )}

        <section
          className={`${styles.area} ${sortedMode ? styles.areaSortedMode : ""}`}
          ref={areaRef}
          onPointerMove={sortedMode ? undefined : handlePointerMove}
          onPointerUp={sortedMode ? undefined : handlePointerUp}
          onPointerLeave={sortedMode ? undefined : handlePointerUp}
        >
          {termsWithIds.length === 0 ? (
            <>
              {!sortedMode && (
                <div className={styles.controlBar}>{sortToggle}</div>
              )}
              <p className={styles.placeholder}>
                {decodedTopic === "Deutschlandflagge"
                  ? "Keine Begriffe geladen – bitte Seite neu laden oder Server-Log prüfen."
                  : "Hier können später Begriffe aus deiner Datei stehen."}
              </p>
              {sortedMode && (
                <div className={styles.controlBarOrdered}>{sortToggle}</div>
              )}
            </>
          ) : sortedMode ? (
            <>
              <div className={styles.sortedGrid}>
                {sortedTermsWithIds.map(({ id, term, isCustom, ownerId: termOwnerId }) => (
                  <button
                    key={id}
                    type="button"
                    className={`${styles.term} ${styles.termSorted}`}
                  >
                    <span className={styles.termLabel}>{term}</span>
                    {isCustom && termOwnerId === ownerId && (
                      <span
                        className={styles.termDelete}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveExtraTerm(id);
                        }}
                      >
                        ×
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className={styles.controlBarOrdered}>{sortToggle}</div>
            </>
          ) : (
            <>
              <div className={styles.controlBar}>{sortToggle}</div>
              {termsWithIds.map(({ id, term, isCustom, ownerId: termOwnerId }) => {
                const pos = positions[id] ?? { x: 0, y: 0 };

                return (
                  <button
                    key={id}
                    type="button"
                    className={styles.term}
                    ref={(el) => {
                      if (el) {
                        termRefs.current[id] = el;
                      }
                    }}
                    style={{
                      transform: `translate(${pos.x}px, ${pos.y}px)`,
                      backgroundColor: "#ebebeb",
                      borderColor: "#000000",
                    }}
                    onPointerDown={(event) => handlePointerDown(id, event)}
                  >
                    <span className={styles.termLabel}>{term}</span>
                    {isCustom && termOwnerId === ownerId && (
                      <span
                        className={styles.termDelete}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveExtraTerm(id);
                        }}
                      >
                        ×
                      </span>
                    )}
                  </button>
                );
              })}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

