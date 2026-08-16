import type { ReactNode } from "react";
import type { Experience, Project } from "../data";
import { about, experience, links, profile, projects, skills } from "../data";

export type CommandResult = { kind: "node"; node: ReactNode } | { kind: "clear" };

export const COMMAND_NAMES = [
  "help",
  "about",
  "education",
  "experience",
  "projects",
  "skills",
  "contact",
  "resume",
  "email",
  "whoami",
  "date",
  "ls",
  "clear",
  "sudo",
];

const STATUS_STYLE: Record<Project["status"], string> = {
  live: "text-signal border-signal/40",
  "in-progress": "text-amber border-amber/40",
  archived: "text-mist border-line",
};

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "live",
  "in-progress": "in progress",
  archived: "archived",
};

function Plain({ lines }: { lines: string[] }) {
  return (
    <div>
      {lines.map((l, i) => (l === "" ? <div key={i} className="h-2" /> : <div key={i} className="text-paper">{l}</div>))}
    </div>
  );
}

function NoMatches({ term }: { term: string }) {
  return <div className="text-mist">grep: no matches for &quot;{term}&quot;</div>;
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-mist/60" />
      <span className="text-mist">{children}</span>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-1.5 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span key={t} className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-mist">
          {t}
        </span>
      ))}
    </div>
  );
}

function matchesTerm(haystack: string[], term: string) {
  const t = term.toLowerCase();
  return haystack.some((s) => s.toLowerCase().includes(t));
}

function ExperienceEntry({ role }: { role: Experience }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <span className="font-medium text-paper">
          {role.role} <span className="font-normal text-mist">· {role.org}</span>
        </span>
        <span className="shrink-0 font-mono text-[11px] text-mist">{role.period}</span>
      </div>
      <div className="mt-1.5 space-y-1">
        {role.bullets.map((b, i) => (
          <Bullet key={i}>{b}</Bullet>
        ))}
      </div>
      <Tags items={role.stack} />
    </div>
  );
}

function ProjectEntry({ project }: { project: Project }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium text-paper">{project.name}</span>
        <span
          className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${STATUS_STYLE[project.status]}`}
        >
          {STATUS_LABEL[project.status]}
        </span>
        <span className="font-mono text-[11px] text-mist">{project.period}</span>
      </div>
      <div className="mt-1.5 space-y-1">
        {project.bullets.map((b, i) => (
          <Bullet key={i}>{b}</Bullet>
        ))}
      </div>
      <Tags items={project.stack} />
      {project.href && (
        <div className="mt-1.5">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-signal underline decoration-signal/30 underline-offset-2 transition-colors hover:decoration-signal"
          >
            {project.href.replace(/^https?:\/\//, "")} ↗
          </a>
        </div>
      )}
    </div>
  );
}

function aboutNode(): ReactNode {
  return (
    <div className="space-y-1.5">
      <div>
        <span className="font-medium text-paper">{profile.name}</span>{" "}
        <span className="text-mist">— {profile.role}</span>
      </div>
      <div className="text-paper/90">{profile.pitch}</div>
      <div className="pt-0.5 text-mist">{about.bio}</div>
    </div>
  );
}

function educationNode(): ReactNode {
  return (
    <div className="space-y-2.5">
      <div className="text-paper">{about.education}</div>
      <div>
        <div className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-mist">coursework</div>
        <Tags items={about.coursework} />
      </div>
    </div>
  );
}

function experienceNode(term?: string): ReactNode {
  const matches = term
    ? experience.filter((r) => matchesTerm([r.role, r.org, r.period, ...r.bullets, ...r.stack], term))
    : experience;
  if (term && matches.length === 0) return <NoMatches term={term} />;
  return (
    <div className="space-y-4">
      {matches.map((r) => (
        <ExperienceEntry key={`${r.org}-${r.period}`} role={r} />
      ))}
    </div>
  );
}

function projectsNode(term?: string): ReactNode {
  const matches = term
    ? projects.filter((p) => matchesTerm([p.name, p.status, p.period, ...p.bullets, ...p.stack], term))
    : projects;
  if (term && matches.length === 0) return <NoMatches term={term} />;
  return (
    <div className="space-y-4">
      {matches.map((p) => (
        <ProjectEntry key={p.name} project={p} />
      ))}
    </div>
  );
}

function skillsNode(term?: string): ReactNode {
  const t = term?.toLowerCase();
  const groups = skills
    .map((g) => ({ ...g, items: t ? g.items.filter((i) => i.toLowerCase().includes(t)) : g.items }))
    .filter((g) => g.items.length > 0);
  if (term && groups.length === 0) return <NoMatches term={term} />;
  return (
    <div className="space-y-2">
      {groups.map((g, i) => (
        <div key={g.label} className="flex items-baseline gap-2">
          <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-widest text-mist">{g.label}</span>
          <div className="flex flex-wrap gap-1.5">
            {g.items.map((item) => (
              <span
                key={item}
                className={`rounded-full border px-2 py-0.5 font-mono text-[10px] text-paper ${
                  i % 2 === 0 ? "border-signal/40 bg-signal/10" : "border-amber/40 bg-amber/10"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function helpNode(): ReactNode {
  const rows: [string, string][] = [
    ["about", "who I am"],
    ["education", "degree + coursework"],
    ["experience", "work history"],
    ["projects", "things I've built"],
    ["skills", "tools & languages"],
    ["contact", "how to reach me"],
    ["resume", "open my resume"],
    ["clear", "clear the terminal"],
  ];
  return (
    <div>
      <div className="mb-1.5 text-paper">available commands:</div>
      <div className="space-y-0.5">
        {rows.map(([cmd, desc]) => (
          <div key={cmd} className="flex gap-3">
            <span className="w-24 shrink-0 text-signal">{cmd}</span>
            <span className="text-mist">{desc}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-mist">
        tip: pipe experience, projects, or skills into grep — e.g. <span className="text-paper">experience | grep python</span>
      </div>
    </div>
  );
}

function contactNode(copyEmail: () => void): ReactNode {
  return (
    <div className="space-y-1">
      <div>
        <button
          type="button"
          onClick={copyEmail}
          className="cursor-pointer text-signal underline decoration-signal/30 underline-offset-2 transition-colors hover:decoration-signal"
        >
          {profile.email}
        </button>{" "}
        <span className="text-mist">(click, or type &apos;email&apos;, to copy)</span>
      </div>
      {links.map((link) => (
        <div key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-mist underline decoration-line underline-offset-2 transition-colors hover:text-paper hover:decoration-signal"
          >
            {link.href.replace(/^https?:\/\//, "")}
          </a>
        </div>
      ))}
    </div>
  );
}

function extractGrepTerm(pipes: string[]): string | undefined {
  for (const pipe of pipes) {
    const match = pipe.match(/^grep\s+(-i\s+)?"?([^"]+)"?$/i);
    if (match) return match[2];
  }
  return undefined;
}

export function runCommand(raw: string, copyEmail: () => void): CommandResult {
  const segments = raw.split("|").map((s) => s.trim());
  const [base, ...pipes] = segments;
  const [cmdRaw] = base.split(/\s+/).filter(Boolean);
  const cmd = (cmdRaw ?? "").toLowerCase();
  const term = extractGrepTerm(pipes);

  if (cmd === "") return { kind: "node", node: null };
  if (cmd === "clear") return { kind: "clear" };

  if (cmd === "sudo") {
    return {
      kind: "node",
      node: <Plain lines={["Nice try. You don't have root on this system.", "(this incident has been logged)"]} />,
    };
  }

  if (cmd === "whoami") {
    return { kind: "node", node: <Plain lines={[`${profile.name.toLowerCase().replace(" ", "-")} (${profile.role})`]} /> };
  }

  if (cmd === "date") {
    return { kind: "node", node: <Plain lines={[new Date().toString()]} /> };
  }

  if (cmd === "ls") {
    return {
      kind: "node",
      node: (
        <Plain
          lines={["about.md  education.md  experience.log  projects/  skills.json  contact.sh", "", "run 'help' for commands"]}
        />
      ),
    };
  }

  if (cmd === "help") return { kind: "node", node: helpNode() };
  if (cmd === "about") return { kind: "node", node: aboutNode() };
  if (cmd === "education") return { kind: "node", node: educationNode() };
  if (cmd === "experience") return { kind: "node", node: experienceNode(term) };
  if (cmd === "projects") return { kind: "node", node: projectsNode(term) };
  if (cmd === "skills") return { kind: "node", node: skillsNode(term) };

  if (cmd === "email") {
    copyEmail();
    return { kind: "node", node: <Plain lines={[`✓ copied ${profile.email} to clipboard`]} /> };
  }

  if (cmd === "resume") {
    if (typeof window !== "undefined") window.open("/resume.pdf", "_blank", "noopener,noreferrer");
    return {
      kind: "node",
      node: (
        <span>
          opening{" "}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-signal underline decoration-signal/30 underline-offset-2 transition-colors hover:decoration-signal"
          >
            resume.pdf
          </a>{" "}
          ↗
        </span>
      ),
    };
  }

  if (cmd === "contact") return { kind: "node", node: contactNode(copyEmail) };

  return {
    kind: "node",
    node: <Plain lines={[`command not found: ${cmd}`, "type 'help' to see available commands"]} />,
  };
}
