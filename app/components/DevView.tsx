import { Terminal } from "./Terminal";

export function DevView({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex min-h-0 flex-1 w-full items-center justify-center overflow-hidden p-4 sm:p-8">
      <div className="flex h-[min(72dvh,640px)] w-full max-w-3xl flex-col">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="mb-3 self-start cursor-pointer text-sm text-mist underline decoration-line underline-offset-4 transition-colors hover:text-paper hover:decoration-signal"
          >
            ← Back to the regular site
          </button>
        )}
        <div className="min-h-0 flex-1">
          <Terminal onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
