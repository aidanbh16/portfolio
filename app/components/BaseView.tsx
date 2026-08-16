import type { ReactNode } from "react";
import { about, experience, links, profile, projects, skills } from "../data";
import type { Project } from "../data";
import { Reveal } from "./Reveal";
import { GitHubIcon, LinkedInIcon, MailIcon, TerminalIcon } from "./icons";

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

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-mist sm:mb-8">{children}</h2>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-line bg-panel/60 px-3 py-1 text-sm text-paper/90">
      {children}
    </span>
  );
}

function ContactIconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-ink text-mist transition-colors group-hover:border-signal/40 group-hover:text-signal">
      {children}
    </span>
  );
}

function ContactArrow() {
  return (
    <span
      aria-hidden
      className="shrink-0 text-mist transition-all group-hover:translate-x-0.5 group-hover:text-signal"
    >
      ↗
    </span>
  );
}

export function BaseView({ onOpenDevView }: { onOpenDevView?: () => void }) {
  return (
    <div className="w-full">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink/90 px-5 py-3.5 backdrop-blur-sm sm:px-8">
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${profile.available ? "animate-pulse-soft bg-signal" : "bg-mist"}`}
          />
          <span className="font-medium text-paper">{profile.name}</span>
        </div>
        <div className="flex items-center gap-2.5">
          {onOpenDevView && (
            <button
              type="button"
              onClick={onOpenDevView}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm text-paper transition-all hover:-translate-y-0.5 hover:border-signal/50"
            >
              <TerminalIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Dev View</span>
            </button>
          )}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer rounded-full border border-line px-3.5 py-1.5 text-sm text-paper transition-all hover:-translate-y-0.5 hover:border-signal/50"
          >
            Resume
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <span className="rise-in block font-mono text-xs uppercase tracking-widest text-signal">
            {profile.role}
          </span>
          <h1
            className="rise-in mt-3 text-4xl font-semibold tracking-tight text-paper sm:text-6xl"
            style={{ animationDelay: "60ms" }}
          >
            {profile.name}
          </h1>
          <p
            className="rise-in mt-5 max-w-xl text-lg leading-relaxed text-mist sm:text-xl"
            style={{ animationDelay: "120ms" }}
          >
            {profile.pitch}
          </p>
          <div
            className="rise-in mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "180ms" }}
          >
            <a
              href={`mailto:${profile.email}`}
              className="cursor-pointer rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Email me
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded-full border border-line px-5 py-2.5 text-sm text-paper transition-all hover:-translate-y-0.5 hover:border-signal/50"
            >
              View resume
            </a>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-sm text-mist underline decoration-line underline-offset-4 transition-colors hover:text-paper hover:decoration-signal"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <Reveal className="border-t border-line px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>About</SectionHeading>
            <p className="max-w-2xl text-base leading-relaxed text-paper/90 sm:text-lg">{about.bio}</p>
            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-line bg-panel/60 p-4">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-mist">Education</dt>
                <dd className="mt-1.5 text-sm text-paper">{about.education}</dd>
              </div>
              <div className="rounded-lg border border-line bg-panel/60 p-4">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-mist">Based in</dt>
                <dd className="mt-1.5 text-sm text-paper">{profile.location}</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal className="border-t border-line px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-10">
              {experience.map((role) => (
                <div key={`${role.org}-${role.period}`} className="border-l border-line pl-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-medium text-paper">
                      {role.role} <span className="text-mist">· {role.org}</span>
                    </h3>
                    <span className="font-mono text-xs text-mist">{role.period}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {role.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-mist sm:text-base">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-mist/60" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  {role.stack.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {role.stack.map((tech) => (
                        <Chip key={tech}>{tech}</Chip>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="border-t border-line px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>Projects</SectionHeading>
            <div className="space-y-6">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="rounded-lg border border-line bg-panel/60 p-5 transition-colors hover:border-line/80 sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-medium text-paper">{project.name}</h3>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide ${STATUS_STYLE[project.status]}`}
                    >
                      {STATUS_LABEL[project.status]}
                    </span>
                    <span className="font-mono text-xs text-mist">{project.period}</span>
                  </div>
                  <ul className="mt-4 space-y-1.5">
                    {project.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-mist sm:text-base">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-mist/60" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                  </div>
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block cursor-pointer text-sm text-signal underline decoration-signal/30 underline-offset-4 transition-colors hover:decoration-signal"
                    >
                      Visit {project.name.toLowerCase()} ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="border-t border-line px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>Skills</SectionHeading>
            <div className="space-y-5">
              {skills.map((group) => (
                <div key={group.label}>
                  <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-mist">
                    {group.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="border-t border-line px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>Contact</SectionHeading>
            <div className="grid gap-8 sm:grid-cols-[1fr_1.15fr] sm:gap-10">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${profile.available ? "animate-pulse-soft bg-signal" : "bg-mist"}`}
                  />
                  <span className="font-mono text-xs uppercase tracking-widest text-mist">
                    {profile.available ? "Available for new roles" : "Not currently available"}
                  </span>
                </div>
                <p className="max-w-sm text-base leading-relaxed text-paper/90 sm:text-lg">
                  Open to new roles and interesting problems — the fastest way to reach me is
                  email.
                </p>
              </div>

              <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-panel">
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex cursor-pointer items-center gap-4 px-5 py-4 transition-colors hover:bg-panel-2 sm:px-6"
                >
                  <ContactIconBadge>
                    <MailIcon />
                  </ContactIconBadge>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-paper">Email</span>
                    <span className="block truncate text-sm text-mist">{profile.email}</span>
                  </span>
                  <ContactArrow />
                </a>
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex cursor-pointer items-center gap-4 px-5 py-4 transition-colors hover:bg-panel-2 sm:px-6"
                  >
                    <ContactIconBadge>
                      {link.label === "GitHub" ? <GitHubIcon /> : <LinkedInIcon />}
                    </ContactIconBadge>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-paper">{link.label}</span>
                      <span className="block truncate text-sm text-mist">
                        {link.href.replace(/^https?:\/\//, "")}
                      </span>
                    </span>
                    <ContactArrow />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </main>

      <footer className="border-t border-line px-5 py-8 text-center font-mono text-xs text-mist sm:px-8">
        {profile.name} · {profile.location}
      </footer>
    </div>
  );
}
