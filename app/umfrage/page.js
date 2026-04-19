import Link from "next/link";

export default function UmfrageIntroPage() {
  return (
    <div
      style={{
        minHeight: "100svh",
        backgroundColor: "#1D531F",
        color: "#000000",
        paddingTop: "calc(var(--nav-height) + var(--nav-content-gap))",
        paddingBottom: "20px",
        paddingLeft: "calc(var(--page-gutter) + 8px)",
        paddingRight: "calc(var(--page-gutter) + 8px)",
        boxSizing: "border-box",
        fontFamily:
          "var(--font-remix-a), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "20px",
            alignItems: "end",
          }}
        >
          <h1
            style={{
              justifySelf: "start",
              color: "#FFB5F5",
              fontSize: "clamp(2.5rem, 5.3vw, 4.2rem)",
              lineHeight: 1.05,
              fontWeight: 500,
              margin: 0,
            }}
          >
            Was bedeutet
            <br />
            „Deutschland“
            <br />
            für dich?
          </h1>
          <div
            style={{
              lineHeight: 1.15,
              justifySelf: "end",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#FFB5F5",
                fontSize: "clamp(1.1rem, 1.9vw, 2rem)",
              }}
            >
              Diese Umfrage ist Teil meiner Recherche im Masterstudium
              Kommunikationsdesign. Sie ist ein offener Versuch, sich Fragen
              anzunähern, auf die es keine eindeutigen Antworten gibt.
            </p>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "20px",
            alignItems: "start",
            marginTop: "4px",
          }}
        >
          <div
            className="umfrage-spacer-block"
            style={{
              minHeight: "170px",
            }}
          />
          <div
            style={{
              color: "#EBEBEB",
              lineHeight: 1.15,
              fontSize: "clamp(1rem, 1.6vw, 1.8rem)",
              justifySelf: "end",
              fontFamily:
                "var(--font-plex-sans), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            <p style={{ margin: 0 }}>
              Ausgangspunkt sind Beobachtungen aus Gesprächen: Begriffe und
              Symbole wie die Deutschlandflagge werden oft nicht neutral
              wahrgenommen, sondern als politisch aufgeladen. Für manche ist sie
              selbstverständlich, für andere mit Unbehagen verbunden. Ähnlich
              vielschichtig erscheinen auch Vorstellungen von „Deutschland“,
              „Kultur“, „Heimat“ oder „Stolz“.
            </p>
            <p style={{ marginTop: "0.9em", marginBottom: 0 }}>
              Mich interessiert, wie solche Bedeutungen entstehen, wie sie sich
              verschieben und welche persönlichen, gesellschaftlichen oder
              erlernten Bilder dahinterstehen. Die Umfrage versteht sich als
              offener Raum, um genau diese Gedanken sichtbar zu machen – ohne
              Bewertung, ohne Einordnung, ohne richtige oder falsche Antworten.
            </p>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
            alignItems: "end",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <div style={{ justifySelf: "start" }}>
            <p
              style={{
                color: "#EBEBEB",
                fontSize: "clamp(0.82rem, 1.2vw, 1.3rem)",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Schreibe alles auf, was dir einfällt.
              <br />
              Wörter, Gefühle, Sätze, Erfahrungen, Erinnerungen,
              <br />
              Klischees, Erlerntes und
              Verworfenes.
            </p>
            <p
              style={{
                color: "#EBEBEB",
                fontSize: "clamp(0.82rem, 1.2vw, 1.3rem)",
                lineHeight: 1.2,
                marginTop: "22px",
                marginBottom: 0,
              }}
            >
              Keine Zeitbegrenzung · Doppelnennungen sind willkommen
            </p>
          </div>

          <Link
            href="/umfrage/themen"
            style={{
              minWidth: "min(180px, 100%)",
              padding: "10px 32px 6px 32px",
              borderRadius: "40px",
              backgroundColor: "#45DC75",
              color: "#000000",
              border: "1px solid #000000",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "1rem",
              lineHeight: 1,
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily:
                "var(--font-remix-a), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifySelf: "end",
            }}
          >
            Zur Umfrage
          </Link>
        </section>
      </div>
    </div>
  );
}

