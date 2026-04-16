"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./recherche-gate.module.css";

const REQUIRED_PASSWORD = "V4b5mDuBs";

export default function RechercheGate() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const canSubmit = useMemo(() => password.trim().length > 0, [password]);

  function handleSubmit(event) {
    event.preventDefault();

    if (password === REQUIRED_PASSWORD) {
      setIsUnlocked(true);
      return;
    }
    setPassword("");
  }

  if (!isUnlocked) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="password"
              className={styles.passwordButton}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Passwort"
              aria-label="Passwort für Recherche"
            />
            <button type="submit" className={styles.hiddenSubmit} disabled={!canSubmit} aria-hidden="true">
              submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Kultur :</h1>

        <p className={styles.text}>
          Kultur bezeichnet im weitesten Sinne alle Erscheinungsformen
          menschlichen Daseins, die auf bestimmten Wertvorstellungen und
          erlernten Verhaltensweisen beruhen und die sich wiederum in der
          dauerhaften Erzeugung und Erhaltung von Werten ausdrücken
        </p>

        <div className={styles.footer}>
          <Link href="/umfrage/themen" className={styles.surveyLink}>
            Zur Umfrage
          </Link>
        </div>
      </div>
    </div>
  );
}
