import type { ReactNode } from "react";
import Image from "next/image";
import { about, experience, links, profile, projects, recommendations, skills } from "../data";
import { Reveal } from "./Reveal";
import { STATUS_LABEL, STATUS_STYLE } from "./projectStatus";

// Roles and projects show this many bullets up front; the rest sit behind a "Show N more" toggle.
const VISIBLE_BULLETS = 2;

const textLink =
  "cursor-pointer underline decoration-mist/50 decoration-1 underline-offset-4 transition-colors hover:text-paper hover:decoration-signal";

const accentLink =
  "cursor-pointer font-medium text-signal underline decoration-signal/40 underline-offset-4 transition-colors hover:decoration-signal";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <Reveal className="border-t border-line">
      <section aria-labelledby={id} className="mx-auto max-w-4xl px-5 pt-14 pb-16 sm:px-8 md:pt-20 md:pb-24">
        <h2 id={id} className="mb-8 text-2xl font-semibold tracking-tight text-paper">
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-4 max-w-[46rem] list-disc space-y-2 pl-5 text-mist marker:text-mist/50">
      {bullets.map((b) => (
        <li key={b} className="pl-1 leading-relaxed">
          {b}
        </li>
      ))}
    </ul>
  );
}

function CollapsibleBullets({ bullets }: { bullets: string[] }) {
  if (bullets.length <= VISIBLE_BULLETS) return <BulletList bullets={bullets} />;
  const hidden = bullets.length - VISIBLE_BULLETS;
  return (
    <>
      <BulletList bullets={bullets.slice(0, VISIBLE_BULLETS)} />
      <details className="group">
        <summary className="mt-3 inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-signal underline-offset-4 hover:underline group-open:hidden [&::-webkit-details-marker]:hidden">
          Show {hidden} more
          <span aria-hidden>↓</span>
        </summary>
        <BulletList bullets={bullets.slice(VISIBLE_BULLETS)} />
      </details>
    </>
  );
}

function StackLine({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  // Each separator stays glued to the item before it, so a wrapped line
  // never starts with a stray "·".
  return (
    <p className="mt-4 font-mono text-xs leading-relaxed text-mist">
      {items.map((item, i) => (
        <span key={item} className="whitespace-nowrap">
          {item}
          {i < items.length - 1 && " · "}
        </span>
      ))}
    </p>
  );
}

export function BaseView({ onOpenDevView }: { onOpenDevView?: () => void }) {
  const currentRoles = experience.filter((role) => role.period.includes("Present"));

  return (
    <div className="w-full">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-20 focus:rounded-md focus:bg-paper focus:px-3 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-10 border-b border-line bg-ink/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3.5 sm:px-8">
          <span className="font-semibold text-paper">{profile.name}</span>
          <nav className="flex items-center gap-5 text-sm text-mist">
            {onOpenDevView && (
              <button type="button" onClick={onOpenDevView} className={`hidden md:inline ${textLink}`}>
                Terminal
              </button>
            )}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={textLink}>
              Résumé
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="mx-auto grid max-w-4xl gap-10 px-5 pt-16 pb-20 sm:px-8 md:grid-cols-[1fr_16rem] md:items-end md:gap-12 md:pt-24 md:pb-24">
          <div>
            <p className="rise-in text-sm text-mist">
              {profile.role} · {profile.location}
            </p>
            <h1
              className="rise-in mt-3 text-5xl font-semibold tracking-tight text-paper sm:text-6xl"
              style={{ animationDelay: "60ms" }}
            >
              {profile.name}
            </h1>
            <p
              className="rise-in mt-5 max-w-[34rem] text-lg leading-relaxed text-mist sm:text-xl"
              style={{ animationDelay: "120ms" }}
            >
              {profile.pitch}
            </p>
            <div
              className="rise-in mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
              style={{ animationDelay: "180ms" }}
            >
              <a
                href={`mailto:${profile.email}`}
                className="cursor-pointer rounded-md bg-paper px-4 py-2.5 font-medium text-ink transition-opacity hover:opacity-90 active:translate-y-px"
              >
                Email me
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={`text-mist ${textLink}`}>
                Résumé
              </a>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-mist ${textLink}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            {onOpenDevView && (
              <p className="rise-in mt-7 hidden text-sm text-mist md:block" style={{ animationDelay: "240ms" }}>
                Rather use a terminal?{" "}
                <button type="button" onClick={onOpenDevView} className={`font-medium text-paper ${textLink}`}>
                  Open this site as one
                </button>
              </p>
            )}
          </div>

          <aside
            aria-label="Currently"
            className="rise-in border-l-2 border-signal/40 pl-5 text-sm"
            style={{ animationDelay: "240ms" }}
          >
            <p className="font-medium text-paper">Currently</p>
            <ul className="mt-2 space-y-2.5">
              {currentRoles.map((role) => (
                <li key={`${role.org}-${role.period}`}>
                  <span className="block text-paper">{role.role}</span>
                  <span className="block text-mist">{role.org}</span>
                </li>
              ))}
              <li>
                <span className="block text-paper">{about.studying}</span>
                <span className="block text-mist">Graduating {about.graduating}</span>
              </li>
            </ul>
            <p className="mt-4 flex items-center gap-2 font-medium text-signal">
              <span aria-hidden className={`h-2 w-2 rounded-full ${profile.available ? "bg-signal" : "bg-mist"}`} />
              {profile.available ? "Open to new roles" : "Not looking right now"}
            </p>
          </aside>
        </section>

        <Section id="about" title="About">
          <p className="max-w-[46rem] text-lg leading-relaxed text-paper/90">{about.bio}</p>
          <p className="mt-6 max-w-[46rem] text-sm text-mist">
            <span className="font-medium text-paper">Education:</span> {about.education}
          </p>
        </Section>

        <Section id="experience" title="Experience">
          <div className="divide-y divide-line">
            {experience.map((role) => (
              <article key={`${role.org}-${role.period}`} className="py-10 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-paper">{role.role}</h3>
                  <span className="font-mono text-xs whitespace-nowrap text-mist">{role.period}</span>
                </div>
                <p className="text-mist">{role.org}</p>
                {role.impact && (
                  <ul className="mt-4 max-w-[46rem] space-y-1 rounded-md bg-panel-2 px-4 py-3">
                    {role.impact.map((line) => (
                      <li key={line} className="flex gap-2.5 font-medium text-paper">
                        <span aria-hidden className="text-signal">
                          ↗
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
                <CollapsibleBullets bullets={role.bullets} />
                <StackLine items={role.stack} />
              </article>
            ))}
          </div>
        </Section>

        <Section id="recommendations" title="Recommendations">
          <div className="grid gap-6 md:grid-cols-2">
            {recommendations.map((rec) => (
              <figure key={rec.name} className="flex flex-col rounded-md border border-line p-6">
                <blockquote className="flex-1 text-lg leading-relaxed text-paper">&ldquo;{rec.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="block font-semibold text-paper">{rec.name}</span>
                  <span className="block text-mist">
                    {rec.title}, {rec.org}
                  </span>
                  <a
                    href={rec.letterHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-3 inline-block ${accentLink}`}
                  >
                    Read the full letter (PDF) ↗
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="space-y-8">
            {projects.map((project) => (
              <article key={project.name} className="overflow-hidden rounded-md border border-line">
                {project.image && (
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    sizes="(min-width: 896px) 832px, 100vw"
                    className="h-auto w-full border-b border-line"
                  />
                )}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {project.logo && (
                      <Image src={project.logo} alt="" width={24} height={24} className="h-6 w-6 rounded-full" />
                    )}
                    <h3 className="text-lg font-semibold text-paper">{project.name}</h3>
                    <span
                      className={`rounded-full border px-2 text-xs leading-5 font-medium ${STATUS_STYLE[project.status]}`}
                    >
                      {STATUS_LABEL[project.status]}
                    </span>
                    <span className="font-mono text-xs text-mist">{project.period}</span>
                  </div>
                  <CollapsibleBullets bullets={project.bullets} />
                  <StackLine items={project.stack} />
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-4 inline-block text-sm ${accentLink}`}
                    >
                      Visit {project.href.replace(/^https?:\/\//, "")} ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <dl className="max-w-[46rem] space-y-4">
            {skills.map((group) => (
              <div key={group.label} className="sm:flex sm:gap-6">
                <dt className="text-sm font-medium text-paper capitalize sm:w-28 sm:shrink-0 sm:pt-0.5">
                  {group.label}
                </dt>
                <dd className="leading-relaxed text-mist">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="contact" title="Contact">
          <p className="text-mist">The fastest way to reach me is email.</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-2 inline-block text-2xl font-semibold text-signal underline decoration-signal/40 decoration-1 underline-offset-[6px] transition-colors hover:decoration-signal sm:text-3xl"
          >
            {profile.email}
          </a>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
            {links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={textLink}>
                {link.label} ↗
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={textLink}>
              Résumé (PDF) ↗
            </a>
          </p>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-between gap-2 px-5 py-8 text-xs text-mist sm:px-8">
          <span>
            {profile.name} · {profile.location}
          </span>
          <span>Built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}
