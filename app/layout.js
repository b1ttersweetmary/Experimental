import { IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "./Nav";
import CursorDot from "./CursorDot";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const remixA = localFont({
  // Pfad ist relativ zu dieser Datei; bitte die OTF-Datei nach app/fonts/RemixA-Regular.otf kopieren
  src: "./fonts/RemixA-Regular.otf",
  variable: "--font-remix-a",
  weight: "400",
  style: "normal",
});

export const metadata = {
  title: "Deutschland Kultur Frage",
  description:
    "Themenübersicht zu Deutschlandflagge, Deutschland, Alltag, Kultur, Werte, Politik und Zukunft.",
  icons: {
    icon: "/logo-circle.svg",
    shortcut: "/logo-circle.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={`${plexSans.variable} ${remixA.variable}`}>
        <div className="app-shell">
          <Nav />
          <main className="app-content">{children}</main>
          <CursorDot />
        </div>
      </body>
    </html>
  );
}
