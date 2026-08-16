"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { profile } from "../data";
import { COMMAND_NAMES, runCommand } from "./terminalCommands";
import { ChevronDownIcon } from "./icons";

type Block = { id: number; prompt: string | null; content: ReactNode };

function useClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

let blockId = 0;

function initialHistory(): Block[] {
  return [
    {
      id: blockId++,
      prompt: null,
      content: (
        <div>
          <div className="text-paper">Welcome to aidan@portfolio.</div>
          <div className="text-mist">Type &apos;help&apos; to see available commands.</div>
        </div>
      ),
    },
  ];
}

export function Terminal({ onClose }: { onClose?: () => void }) {
  const [history, setHistory] = useState<Block[]>(initialHistory);
  const [input, setInput] = useState("");
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState<number | null>(null);
  const [copiedFlash, setCopiedFlash] = useState(false);
  const [showCloseHint, setShowCloseHint] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const clock = useClock();

  useEffect(() => {
    const el = outputRef.current;
    if (!el) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reducedMotion ? "auto" : "smooth" });
  }, [history]);

  useEffect(() => {
    const id = setTimeout(() => setShowCloseHint(false), 4500);
    return () => clearTimeout(id);
  }, []);

  const copyEmail = useMemo(
    () => async () => {
      try {
        await navigator.clipboard.writeText(profile.email);
        setCopiedFlash(true);
        setTimeout(() => setCopiedFlash(false), 1500);
      } catch {
        // clipboard unavailable — email is still printed in the terminal output
      }
    },
    [],
  );

  function submit(raw: string) {
    const trimmed = raw.trim();
    if (trimmed) setCommandLog((log) => [...log, trimmed]);
    setLogIndex(null);

    const result = runCommand(trimmed, copyEmail);

    if (result.kind === "clear") {
      setHistory([]);
      return;
    }

    setHistory((h) => [...h, { id: blockId++, prompt: trimmed, content: result.node }]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandLog.length === 0) return;
      const nextIndex = logIndex === null ? commandLog.length - 1 : Math.max(0, logIndex - 1);
      setLogIndex(nextIndex);
      setInput(commandLog[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (logIndex === null) return;
      const nextIndex = logIndex + 1;
      if (nextIndex >= commandLog.length) {
        setLogIndex(null);
        setInput("");
      } else {
        setLogIndex(nextIndex);
        setInput(commandLog[nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const word = input.toLowerCase();
      if (!word) return;
      const matches = COMMAND_NAMES.filter((c) => c.startsWith(word));
      if (matches.length === 1) setInput(matches[0]);
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
    }
  }

  return (
    <div className="relative h-full w-full">
      {onClose && showCloseHint && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 left-[22px] -translate-x-1/2 opacity-60"
        >
          <div className="animate-bob flex flex-col items-center gap-1">
            <span className="whitespace-nowrap rounded-full border border-line bg-panel px-2.5 py-1 font-mono text-[11px] text-paper shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)]">
              Close for Base View
            </span>
            <ChevronDownIcon className="h-4 w-4 text-signal" />
          </div>
        </div>
      )}
      <div
        className="theme-terminal-dark flex h-full w-full cursor-text flex-col overflow-hidden rounded-lg border border-line bg-panel shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_60px_-24px_rgba(0,0,0,0.75)]"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-3 py-2.5 sm:px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {onClose ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  onMouseEnter={() => setShowCloseHint(false)}
                  aria-label="Close terminal"
                  title="Close"
                  className="group/close relative flex h-2.5 w-2.5 cursor-pointer items-center justify-center rounded-full bg-mist/30 transition-colors hover:bg-red-400"
                >
                  <span className="text-[8px] leading-none text-ink opacity-0 transition-opacity group-hover/close:opacity-100">
                    ×
                  </span>
                </button>
              ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-mist/30" aria-hidden />
              )}
              <span className="h-2.5 w-2.5 rounded-full bg-amber/50" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-signal/50" aria-hidden />
            </div>
            <span className="font-mono text-[11px] text-mist sm:text-xs">aidan@portfolio — zsh</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-mist sm:text-xs">
            <span
              className={`h-1.5 w-1.5 rounded-full ${profile.available ? "animate-pulse-soft bg-signal" : "bg-mist"}`}
            />
            <span className="hidden sm:inline">{profile.available ? "available" : "unavailable"}</span>
            <span className="tabular-nums" suppressHydrationWarning>
              {clock ?? "--:--:--"}
            </span>
          </div>
        </div>

        <div
          ref={outputRef}
          className="min-h-0 flex-1 overflow-y-auto px-3 py-3 font-mono text-[12px] leading-relaxed sm:px-4 sm:py-4 sm:text-sm"
        >
          {history.map((block) => (
            <div key={block.id} className="rise-in mb-3 last:mb-0">
              {block.prompt !== null && (
                <div className="flex gap-2">
                  <span className="shrink-0 text-signal">$</span>
                  <span className="text-paper">{block.prompt}</span>
                </div>
              )}
              {block.content && <div className={block.prompt !== null ? "mt-1 pl-4" : ""}>{block.content}</div>}
            </div>
          ))}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
              setInput("");
            }}
            className="flex gap-2"
          >
            <span className="shrink-0 text-signal">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
              className="term-input flex-1 min-w-0 bg-transparent text-paper outline-none placeholder:text-mist/40"
              placeholder="type 'help'"
            />
          </form>
        </div>

        <div
          className={`shrink-0 overflow-hidden border-t border-line px-3 py-1 font-mono text-[10px] text-signal transition-[max-height,opacity] duration-300 sm:px-4 ${
            copiedFlash ? "max-h-6 opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-live="polite"
        >
          ✓ email copied to clipboard
        </div>
      </div>
    </div>
  );
}
