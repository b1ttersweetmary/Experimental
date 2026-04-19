"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styles from "./question-step.module.css";
import { getOrCreateUserId } from "@/lib/clientUserId";

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

  const baseRadius = 260;
  const radius = baseRadius + (index % 5) * 30;

  let x = Math.cos(angle) * radius;
  let y = Math.sin(angle) * (radius * 0.55);

  const minCenterPaddingY = 110;
  if (Math.abs(y) < minCenterPaddingY) {
    y = y >= 0 ? minCenterPaddingY : -minCenterPaddingY;
  }

  return { x, y };
}

const FLAG_SRC_PNG = "/deutschlandflagge.png";
const FLAG_SRC_JPG = "/deutschlandflagge.jpg";
const FLAG_SRC_FALLBACK = "https://pngimg.com/d/germany_flag_PNG16.png";

const SUBMITTED_KEY = "umfrageSubmitted";

export default function QuestionStepClient({ step }) {
  const currentIndex = STEPS.findIndex((s) => s.slug === step);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const current = STEPS[safeIndex];

  const prev = safeIndex > 0 ? STEPS[safeIndex - 1] : null;
  const next = safeIndex < STEPS.length - 1 ? STEPS[safeIndex + 1] : null;

  const router = useRouter();

  const topicNameForStorage = current.resultPath.replace(/^\//, "");

  const [userId, setUserId] = useState("");
  useEffect(() => {
    setUserId(getOrCreateUserId());
  }, []);

  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [flagSrc, setFlagSrc] = useState(FLAG_SRC_PNG);

  useEffect(() => {
    if (current.isFlag) setFlagSrc(FLAG_SRC_PNG);
  }, [current.isFlag, step]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/responses?questionId=${encodeURIComponent(topicNameForStorage)}`
        );
        const data = await res.json().catch(() => ({ responses: [] }));
        if (cancelled) return;
        const list = Array.isArray(data.responses)
          ? data.responses.map((r) => ({
              id: r.id,
              text: r.text,
              ownerId: r.userId,
            }))
          : [];
        // Nur eigene Einträge: Fremde Antworten nur auf den Ergebnis-/Themen-Seiten
        const mine =
          userId.length > 0
            ? list.filter((item) => item.ownerId === userId)
            : [];
        setItems(mine);
      } catch (e) {
        console.warn("Antworten laden fehlgeschlagen", e);
        if (!cancelled) setItems([]);
      }
      setInput("");
    })();
    return () => {
      cancelled = true;
    };
  }, [step, topicNameForStorage, userId]);

  const positioned = useMemo(
    () =>
      items.map((item, idx) => ({
        ...item,
        ...randomPosition(idx),
      })),
    [items]
  );

  const handleAdd = async () => {
    const value = input.trim();
    if (!value) return;
    // userId aus State kommt erst nach useEffect — beim schnellen Tippen + Enter wäre es sonst leer
    const uid = userId || getOrCreateUserId();
    if (uid !== userId) setUserId(uid);
    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: topicNameForStorage,
          text: value,
          userId: uid,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        console.warn("Speichern fehlgeschlagen", res.status, errText);
        return;
      }
      const data = await res.json();
      const r = data.response;
      if (!r?.id) return;
      setItems((prev) => [...prev, { id: r.id, text: r.text, ownerId: r.userId }]);
    } catch (e) {
      console.error(e);
    }
    setInput("");
  };

  const handleRemoveChip = async (itemId) => {
    if (!userId) return;
    try {
      const res = await fetch(`/api/responses/${encodeURIComponent(itemId)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) return;
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitAll = () => {
    try {
      localStorage.setItem(SUBMITTED_KEY, "true");
    } catch (e) {
      console.warn(e);
    }
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
              {userId && item.ownerId === userId && (
                <button
                  type="button"
                  className={styles.chipClose}
                  onClick={() => handleRemoveChip(item.id)}
                >
                  ×
                </button>
              )}
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
                  if (e.key !== "Enter") return;
                  e.preventDefault();
                  handleAdd();
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
