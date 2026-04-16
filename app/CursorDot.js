"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getCursorColor(pathname) {
  if (!pathname) return "#ebebeb";
  if (
    pathname === "/Deutschlandflagge" ||
    pathname === "/Deutschland" ||
    pathname === "/Alltag" ||
    pathname === "/Kultur" ||
    pathname === "/Werte" ||
    pathname === "/Politik" ||
    pathname === "/Zukunft"
  ) {
    return "#ffffff";
  }
  if (pathname === "/") return "#ebebeb";
  if (pathname.startsWith("/umfrage")) return "#ffb5f5";
  if (pathname.startsWith("/recherche")) return "#c5ccff";
  if (pathname === "/ergebnis") return "#580a1b";
  if (pathname.startsWith("/ueber")) return "#1d531f";
  return "#ffb5f5";
}

export default function CursorDot() {
  const dotRef = useRef(null);
  const rafRef = useRef(0);
  const latestRef = useRef({ x: 0, y: 0 });
  const pathname = usePathname();

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    dot.style.backgroundColor = getCursorColor(pathname);
  }, [pathname]);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e) => {
      latestRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        const { x, y } = latestRef.current;
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        rafRef.current = 0;
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />;
}

