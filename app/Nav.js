"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

const links = [
  { href: "/", label: "HOME", key: "home" },
  { href: "/umfrage", label: "UMFRAGE", key: "umfrage" },
  { href: "/ergebnis", label: "ERGEBNIS", key: "ergebnis" },
  { href: "/recherche", label: "RECHERCHE", key: "recherche" },
  { href: "/ueber", label: "ÜBER", key: "ueber" },
];

export default function Nav() {
  const pathname = usePathname();
  const navRef = useRef(null);

  /** Echte Höhe der mehrzeiligen Nav → --nav-height, damit padding-top vom Inhalt passt */
  useLayoutEffect(() => {
    const root = document.documentElement;
    const nav = navRef.current;
    if (!nav) return;

    const sync = () => {
      const h = Math.round(nav.getBoundingClientRect().height);
      root.style.setProperty("--nav-height", `${h}px`);
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(nav);
    window.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("resize", sync);
    window.addEventListener("orientationchange", sync);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);
    };
  }, [pathname]);

  return (
    <nav ref={navRef} className="top-nav">
      <div className="top-nav-inner">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href === "/umfrage" && pathname.startsWith("/umfrage")) ||
            (link.href === "/ueber" &&
              (pathname === "/ueber" || pathname.startsWith("/ueber/")));

          return (
            <Link
              key={link.key}
              href={link.href}
              className={`nav-pill nav-pill-${link.key} ${
                isActive ? "nav-pill-active" : ""
              } ${link.key === "home" && pathname === "/" ? "nav-pill-home-front" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
