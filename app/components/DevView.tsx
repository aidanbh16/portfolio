import { Terminal } from "./Terminal";

export function DevView({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex min-h-0 flex-1 w-full items-center justify-center overflow-hidden p-4 sm:p-8">
      <div className="h-[min(72dvh,640px)] w-full max-w-3xl">
        <Terminal onClose={onClose} />
      </div>
    </div>
  );
}
