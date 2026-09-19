// Real content, pulled from resume.

export type Experience = {
  role: string;
  org: string;
  period: string;
  // Headline results, one short line each, shown above the bullets so a
  // skimming reader sees them first.
  impact?: string[];
  bullets: string[];
  stack: string[];
};

export type Project = {
  name: string;
  status: "live" | "archived" | "in-progress";
  period: string;
  bullets: string[];
  stack: string[];
  href?: string;
  image?: { src: string; alt: string; width: number; height: number };
  logo?: string;
};

export type Recommendation = {
  quote: string;
  name: string;
  title: string;
  org: string;
  letterHref: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const siteUrl = "https://aidanholton.dev";

export const profile = {
  name: "Aidan Holton",
  role: "Software Engineer",
  pitch: "I'm a full-stack developer, with hands-on experience building computer vision and applied ML systems.",
  location: "Dahlonega, GA",
  available: true,
  email: "aidanbh16@gmail.com",
};

export const about = {
  bio: "CS/ML student at the University of North Georgia, focused on full-stack development with hands-on experience in computer vision and applied ML. Currently building a Next.js storefront for Platinum TCG and back at UNG's Strategic Impact & Engagement office as a Data Engineer Intern.",
  // Short forms for the "Right now" list beside the hero.
  studying: "B.S. Computer Science, minor in ML",
  graduating: "May 2027",
  education: "B.S. Computer Science, Minor in Machine Learning — University of North Georgia (Aug 2022 — May 2027)",
  coursework: [
    "Software Engineering",
    "Machine Learning",
    "AI in Manufacturing",
    "Web Programming",
    "Databases",
    "Introduction to UNIX",
    "Secure Software Development",
    "Digital Information Processing",
    "Data Structures and Algorithms",
    "Networking & Communications",
  ],
};

export const experience: Experience[] = [
  {
    role: "Data Engineer Intern",
    org: "UNG, Strategic Impact & Engagement",
    period: "Aug 2026 — Present",
    impact: ["Automated a reporting process that used to need a $40–50k/yr role"],
    bullets: [
      "Automated UNG's Common Data Set (CDS) reporting by building analytical SQL tables in SQL Server (SSMS) that generate form answers directly from source data and surfacing them through Microsoft Report Builder, replacing a manual compilation process that had required a dedicated role costing roughly $40–50k per year.",
      "Owned the project end to end, spanning data discovery, analytical table design, and query development.",
      "Partnered with Institutional Research to locate, interpret, and validate source data, running working meetings with IR staff to map CDS requirements to available systems.",
    ],
    stack: ["SSMS", "SQL", "Microsoft Report Builder", "Lucidchart"],
  },
  {
    role: "Software Developer",
    org: "Platinum TCG",
    period: "Aug 2026 — Present",
    bullets: [
      "Built a Next.js storefront and admin console for a trading card shop (platinum-tcg.com) using the App Router, React Server Components for data loading and Server Actions for every form, with Postgres on Supabase behind it.",
      "Integrated AWS S3 for images with short-lived presigned URLs for anything a customer uploaded, AWS SES for transactional email, and Redis counters for rate limiting the public forms by IP.",
    ],
    stack: ["Next.js", "AWS S3", "AWS SES", "Redis", "Supabase", "Vercel", "Claude Code"],
  },
  {
    role: "Software Engineer Intern",
    org: "Gilat DataPath (via Georgia Tech PIN Program)",
    period: "May 2026 — Jul 2026",
    impact: ["Cut drawing review time from ~10 min to 1–3 min", "Trained a detection model to 99.5% accuracy"],
    bullets: [
      "Rebuilt and significantly improved a computer vision pipeline that validates hardware engineering drawings against their Bill of Materials, cutting manual review time from ~10 minutes to 1–3 minutes per drawing.",
      "Trained a YOLO object detection model to 99.5% accuracy for detecting part-number balloons on drawings, using SAHI tiling for small-object detection and a self-annotated dataset built in CVAT.",
      "Engineered OCR and table-extraction stages using Tesseract and pdfplumber, handling structural edge cases including split tables, CID-encoded fonts, and fallback extraction paths.",
      "Built a driver generation tool that parses vendor SNMP MIB files and produces TCL device drivers automatically, replacing manual config writing with a two-command workflow; integrated an optional local LLM for gap-filling ambiguous fields. Currently in use and confirmed to increase productivity for the software team.",
    ],
    stack: ["Python", "YOLO", "Pytesseract", "PDFPlumber", "CVAT", "Docker", "Claude Code"],
  },
  {
    role: "Data Engineer Intern",
    org: "UNG, Strategic Impact & Engagement",
    period: "Jan 2026 — May 2026",
    bullets: [
      "Developed structured JSON semantic definitions for reporting views as part of a RAG AI prototype, establishing a consistent semantic format to support future view integration within the semantic layer.",
      "Wrote SQL queries to extract and aggregate institutional data, building relational tables for UNG's annual Common Data Set to support standardized reporting requirements.",
      "Designed and documented logical ER diagrams for each domain within UNG's Enterprise Data Warehouse, improving visibility into schema structure and standardizing domain-level documentation across the warehouse.",
      "Reviewed and expanded technical documentation to align with current database structures.",
    ],
    stack: ["SSMS", "SQL", "T-SQL", "JSON", "Lucidchart"],
  },
  {
    role: "IT Help Desk Technician",
    org: "UNG, IT Service Desk",
    period: "Jan 2024 — May 2026",
    impact: ["Supported 20,000+ students, faculty, and staff"],
    bullets: [
      "Provided in-person Tier 1 technical support to 20,000+ students, faculty, and staff, resolving hardware, software, and account issues across Windows and macOS.",
      "Assisted with account provisioning, password resets, and MFA enrollment, maintaining secure access in accordance with IT policies.",
      "Diagnosed and resolved workstation, printer, and network connectivity issues on-site, minimizing disruptions to operations.",
      "Supported users with common productivity tools and campus systems, including login access and email configuration.",
      "Helped train newly hired student technicians and improve the team's documented procedures.",
    ],
    stack: ["ServiceNow", "Windows", "macOS"],
  },
];

export const projects: Project[] = [
  {
    name: "Platinum TCG",
    status: "live",
    period: "Aug 2026 — Present",
    bullets: [
      "Storefront for a Pokémon and Magic: The Gathering shop: browsable inventory, item requests, and forms for selling a collection or bulk cards.",
      "Listings link out to the marketplace where checkout happens, backed by an admin console for running the shop.",
    ],
    stack: ["Next.js", "Supabase", "AWS S3", "AWS SES", "Redis", "Vercel"],
    href: "https://platinum-tcg.com",
    image: {
      src: "/projects/platinum-tcg-collections.png",
      alt: "Platinum TCG's Sell Your Collection page: a headline reading \"Your collection deserves a closer look\" beside an illustrated card binder under a magnifying glass.",
      width: 1190,
      height: 776,
    },
    logo: "/projects/platinum-tcg-logo.png",
  },
  {
    name: "Lucrum",
    status: "live",
    period: "Feb 2026 — Apr 2026",
    bullets: [
      "Designed and deployed a full-stack, AI-powered personal finance app using a microservices architecture, with four independently deployed services; frontend live at lucrumproject.com.",
      "Built a Next.js frontend with secure JWT authentication via HTTP-only cookies and middleware-based route protection, connected to three separate backend REST APIs.",
      "Integrated Claude (via LangChain's ChatAnthropic) into a dedicated Account Summary Service to generate personalized, AI-powered financial summaries and actionable recommendations from a user's income and expense data.",
      "Implemented separate Account Management and Income Management services in Node.js/Express, handling user authentication with bcrypt password hashing and scoped PostgreSQL queries via Supabase.",
      "Containerized backend services with Docker and deployed to AWS EC2 with custom subdomains per service; later scaled the backend down to control hosting costs, with the frontend still live on Vercel.",
    ],
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Express", "Docker", "AWS", "Supabase", "LangChain", "Git"],
    href: "https://lucrumproject.com",
  },
];

export const skills: SkillGroup[] = [
  {
    label: "languages",
    items: ["Java", "JavaScript", "TypeScript", "Python", "SQL", "HTML", "CSS"],
  },
  {
    label: "frameworks",
    items: ["Next.js", "React", "Node.js", "Express", "Spring Boot", "Tailwind CSS", "LangChain", "YOLO", "Pytesseract"],
  },
  {
    label: "tools",
    items: ["Docker", "AWS", "Supabase", "PostgreSQL", "SQLite", "Redis", "Ollama", "Vercel", "Git", "SSMS", "Microsoft Report Builder", "CVAT"],
  },
];

export const links = [
  { label: "GitHub", href: "https://github.com/aidanbh16" },
  { label: "LinkedIn", href: "https://linkedin.com/in/aidan-holton/" },
];

export const recommendations: Recommendation[] = [
  {
    quote:
      "He communicates his work clearly and demonstrates it effectively, whether he is walking an engineer through a technical detail or presenting progress to leadership.",
    name: "Patrick J. Lentz",
    title: "Principal Software Architect",
    org: "Gilat DataPath",
    letterHref: "/letters/patrick-lentz-gilat-datapath.pdf",
  },
  {
    quote:
      "Aidan was an invaluable team member, and I am confident that he will prove himself vital to any organization.",
    name: "Katrena Pardue",
    title: "Director, IT Communications and Customer Success",
    org: "University of North Georgia",
    letterHref: "/letters/katrena-pardue-ung.pdf",
  },
];
