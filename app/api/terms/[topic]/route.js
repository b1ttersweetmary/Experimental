import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const HEADINGS = [
  "Deutschlandflagge",
  "Deutschland",
  "Alltag",
  "Kultur",
  "Werte",
  "Politik",
  "Zukunft",
];

function getTermsForTopic(topic) {
  const normalizedTopic = topic.trim();

  // Sonderfall: Deutschlandflagge aus eigener Datei lesen
  if (normalizedTopic === "Deutschlandflagge") {
    const filePath = path.join(
      process.cwd(),
      "data",
      "deutschlandflagge.txt"
    );

    const raw = fs.readFileSync(filePath, "utf8");
    return raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  // Standardfall: große Umfrage-Datei mit Überschriften
  const filePath = path.join(
    process.cwd(),
    "..",
    "00 HSD DÜSSELDORF",
    "2025",
    "Master",
    "ExperimentalDesign",
    "Master_ExperimentalDesign_Umfrage.txt"
  );

  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);

  const headingsSet = new Set(HEADINGS);

  const isHeadingAt = (index) => {
    const line = lines[index]?.trim();
    if (!headingsSet.has(line)) return false;
    const nextBlank =
      index + 1 >= lines.length || lines[index + 1].trim() === "";
    return nextBlank;
  };

  let currentHeading = null;
  const terms = [];

  for (let i = 0; i < lines.length; i++) {
    if (isHeadingAt(i)) {
      currentHeading = lines[i].trim();
      continue;
    }

    if (currentHeading === normalizedTopic) {
      const text = lines[i].trim();
      if (!text) continue;
      if (headingsSet.has(text)) continue;
      terms.push(text);
    }
  }

  return terms;
}

export async function GET(_request, { params }) {
  const topicParam = params.topic || "";
  const decoded = decodeURIComponent(topicParam);

  try {
    const terms = getTermsForTopic(decoded);
    return NextResponse.json({ topic: decoded, terms });
  } catch (error) {
    console.error("Fehler beim Lesen der Umfrage-Datei:", error);
    return NextResponse.json(
      { topic: decoded, terms: [], error: "Konnte Datei nicht lesen." },
      { status: 500 }
    );
  }
}

