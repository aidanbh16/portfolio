import type { Project } from "../data";

export const STATUS_STYLE: Record<Project["status"], string> = {
  live: "text-signal border-signal/40",
  "in-progress": "text-amber border-amber/40",
  archived: "text-mist border-line",
};

export const STATUS_LABEL: Record<Project["status"], string> = {
  live: "live",
  "in-progress": "in progress",
  archived: "archived",
};
