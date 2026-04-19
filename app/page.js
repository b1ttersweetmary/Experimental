export default function Home() {
  return (
    <div
      style={{
        minHeight: "100svh",
        backgroundColor: "#000000",
        color: "var(--nav-button-gray)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingTop: "calc(var(--nav-height) + var(--nav-content-gap))",
        paddingBottom: "16px",
        paddingLeft: "var(--page-gutter)",
        paddingRight: "var(--page-gutter)",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontFamily:
            "var(--font-remix-a), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontSize: "clamp(2.5rem, 5.3vw, 4.2rem)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        DEUTSCHLAND? KULTUR?
      </h1>
    </div>
  );
}
