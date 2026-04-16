"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "HOME", key: "home" },
  { href: "/umfrage", label: "UMFRAGE", key: "umfrage" },
  { href: "/ergebnis", label: "ERGEBNIS", key: "ergebnis" },
  { href: "/recherche", label: "RECHERCHE", key: "recherche" },
  { href: "/ueber", label: "ÜBER", key: "ueber" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="top-nav">
      <div className="top-nav-inner">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href === "/umfrage" && pathname.startsWith("/umfrage"));

          return (
            <Link
              key={link.key}
              href={link.href}
              className={`nav-pill nav-pill-${link.key} ${
                isActive ? "nav-pill-active" : ""
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

