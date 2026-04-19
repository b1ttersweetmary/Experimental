import Link from "next/link";

export const metadata = {
  title: "Über",
  description: "Seite über Maria Tafler.",
};

export default function UeberPage() {
  return (
    <div
      style={{
        minHeight: "100svh",
        backgroundColor: "#FFB5F5",
        color: "#1D531F",
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
            alignItems: "start",
          }}
        >
          <div
            style={{
              lineHeight: 1.15,
              justifySelf: "start",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#1D531F",
                fontSize: "clamp(1rem, 1.8vw, 2rem)",
                lineHeight: 1.15,
              }}
            >
              Maria Tafler
              <br />
              Master Kommunikationsdesign
              <br />
              Peter Behrens School of Arts, Düsseldorf
            </p>
          </div>

          <div
            style={{
              lineHeight: 1.15,
              justifySelf: "start",
              alignSelf: "end",
            }}
          >
            <a
              href="mailto:info@mariatafler.de"
              className="ueber-email-link"
              style={{
                color: "#1D531F",
                fontSize: "clamp(1rem, 1.8vw, 2rem)",
                lineHeight: 1.15,
                textDecoration: "none",
                fontFamily:
                  "var(--font-remix-a), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              info@mariatafler.de
            </a>
            <br />
            <Link
              href="/ueber/impressum"
              className="ueber-email-link"
              style={{
                display: "inline-block",
                marginTop: "0.25em",
                color: "#1D531F",
                fontSize: "clamp(1rem, 1.8vw, 2rem)",
                lineHeight: 1.15,
                textDecoration: "none",
                fontFamily:
                  "var(--font-remix-a), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Impressum
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

