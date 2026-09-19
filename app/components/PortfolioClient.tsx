"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { DevView } from "./DevView";
import { BaseView } from "./BaseView";

type ViewMode = "dev" | "base";

// Crossfades between Dev View and Base View instead of cutting instantly.
function setViewSmoothly(next: ViewMode, setView: (v: ViewMode) => void) {
  const supportsTransition = typeof document !== "undefined" && "startViewTransition" in document;
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!supportsTransition || reducedMotion) {
    setView(next);
    return;
  }
  (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
    flushSync(() => setView(next));
  });
}

export function PortfolioClient() {
  const [view, setView] = useState<ViewMode>("base");
  const changeView = (next: ViewMode) => setViewSmoothly(next, setView);
  const openDevView = () => changeView("dev");

  if (view === "base") {
    return (
      <div className="flex min-h-screen w-full flex-col bg-ink text-paper">
        <BaseView onOpenDevView={openDevView} />
      </div>
    );
  }

  // Dev View needs real keyboard input and screen real estate for the
  // terminal, so small screens always get Base View. Both are rendered and
  // the breakpoint picks one in CSS, so the server HTML is already right on
  // first paint — no flash of Base View on desktop while JS loads.
  return (
    <>
      <div className="hidden h-[100dvh] w-full flex-col overflow-hidden bg-ink text-paper md:flex">
        <DevView onClose={() => changeView("base")} />
      </div>
      <div className="flex min-h-screen w-full flex-col bg-ink text-paper md:hidden">
        <BaseView onOpenDevView={openDevView} />
      </div>
    </>
  );
}
