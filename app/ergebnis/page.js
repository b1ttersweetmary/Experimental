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
      style={{
        minHeight: "100svh",
        backgroundColor: "#C5CCFF",
        color: "#580A1B",
        paddingTop: "calc(var(--nav-height) + 4px)",
        paddingBottom: "8px",
        paddingLeft: "var(--page-gutter)",
        paddingRight: "var(--page-gutter)",
        boxSizing: "border-box",
        overflow: "hidden",
        fontFamily:
          "var(--font-remix-a), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
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
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

