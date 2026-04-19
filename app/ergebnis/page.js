import Link from "next/link";

const ITEMS = [
  { slug: "deutschlandflagge", label: "DEUTSCHLANDFLAGGE", href: "/Deutschlandflagge" },
  { slug: "deutschland", label: "DEUTSCHLAND", href: "/Deutschland" },
  { slug: "alltag", label: "ALLTAG", href: "/Alltag" },
  { slug: "kultur", label: "KULTUR", href: "/Kultur" },
  { slug: "werte", label: "WERTE", href: "/Werte" },
  { slug: "politik", label: "POLITIK", href: "/Politik" },
  { slug: "zukunft", label: "ZUKUNFT", href: "/Zukunft" },
];

export default function ErgebnisPage() {
  return (
    <div
      className="ergebnis-page-shell"
      style={{
        backgroundColor: "#C5CCFF",
        color: "#580A1B",
        paddingTop: "calc(var(--nav-height) + 4px)",
        paddingBottom: "16px",
        paddingLeft: "var(--page-gutter)",
        paddingRight: "var(--page-gutter)",
        boxSizing: "border-box",
        fontFamily:
          "var(--font-remix-a), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div className="ergebnis-list">
        {ITEMS.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="ergebnis-link"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "4px 16px",
              fontSize: "clamp(2.5rem, 5.3vw, 4.2rem)",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#580A1B",
              textAlign: "center",
            }}
          >
            {item.slug === "deutschlandflagge" ? (
              <span className="deutschlandflagge-wrap">
                <span className="deutschlandflagge-full">DEUTSCHLANDFLAGGE</span>
                <span className="deutschlandflagge-mobile">
                  <span className="deutschlandflagge-mobile-line">DEUTSCHLAND</span>
                  <span className="deutschlandflagge-mobile-line">FLAGGE</span>
                </span>
              </span>
            ) : (
              item.label
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

