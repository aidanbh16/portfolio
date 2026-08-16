"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
import { DevView } from "./DevView";
import { BaseView } from "./BaseView";

type ViewMode = "dev" | "base";

const DESKTOP_QUERY = "(min-width: 768px)";

// Runs before paint on the client so the desktop/mobile branch is correct
// on first frame instead of flashing Base View then swapping to Dev View.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

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
  const isDesktop = useIsDesktop();
  const [view, setView] = useState<ViewMode>("dev");
  const changeView = (next: ViewMode) => setViewSmoothly(next, setView);

  // Dev View needs real keyboard input and screen real estate for the
  // terminal — on small screens everyone always gets Base View.
  const effectiveView: ViewMode = isDesktop ? view : "base";

  if (effectiveView === "dev") {
    return (
      <div className="theme-light flex h-[100dvh] w-full flex-col overflow-hidden bg-ink text-paper">
        <DevView onClose={() => changeView("base")} />
      </div>
    );
  }

  return (
    <div className="theme-light flex min-h-screen w-full flex-col bg-ink text-paper">
      <BaseView onOpenDevView={isDesktop ? () => changeView("dev") : undefined} />
    </div>
  );
}
