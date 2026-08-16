// Real content, pulled from resume.

export type Experience = {
  role: string;
  org: string;
  period: string;
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
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const profile = {
  name: "Aidan Holton",
  role: "Software Engineer",
  pitch: "I'm a full-stack developer, with hands-on experience building computer vision and applied ML systems.",
  location: "Dahlonega, GA",
  available: true,
  email: "aidanbh16@gmail.com",
};

export const about = {
  bio: "CS/ML student at the University of North Georgia, focused on full-stack development with hands-on experience in computer vision and applied ML. Currently interning as a Data Engineer at UNG's Office of Data Strategy.",
  education: "B.S. Computer Science, Minor in Machine Learning — University of North Georgia (2022–present)",
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
    "Networking",
  ],
};

export const experience: Experience[] = [
  {
    role: "Data Engineer Intern",
    org: "UNG, Office of Data Strategy",
    period: "Aug 2026 — Present",
    bullets: ["Returned for a second internship term with the Office of Data Strategy."],
    stack: [],
  },
  {
    role: "Software Engineer Intern",
    org: "Gilat DataPath",
    period: "May 2026 — Jul 2026",
    bullets: [
      "Built and deployed a computer vision pipeline that validates hardware engineering drawings against their Bill of Materials, cutting manual review time from ~10 minutes to 1–3 minutes per drawing.",
      "Trained a YOLO object detection model to 99.5% accuracy for detecting part-number balloons on drawings, using SAHI tiling for small-object detection and a self-annotated dataset built in CVAT.",
      "Engineered OCR and table-extraction stages using Tesseract and pdfplumber, handling structural edge cases including split tables, CID-encoded fonts, and fallback extraction paths.",
      "Built a driver generation tool that parses vendor SNMP MIB files and produces TCL device drivers automatically, replacing manual config writing with a two-command workflow; integrated an optional local LLM for gap-filling ambiguous fields.",
    ],
    stack: ["Python", "YOLO", "Pytesseract", "PDFPlumber", "CVAT", "Docker", "Claude Code"],
  },
  {
    role: "Data Engineer Intern",
    org: "UNG, Office of Data Strategy",
    period: "Jan 2026 — May 2026",
    bullets: [
      "Developed structured JSON semantic definitions for reporting views as part of a RAG AI prototype, establishing a consistent semantic format for future view integration.",
      "Wrote SQL queries to extract and aggregate institutional data, building relational tables for UNG's annual Common Data Set to support standardized reporting requirements.",
      "Designed and documented logical ER diagrams for each domain within UNG's Enterprise Data Warehouse, standardizing domain-level documentation across the warehouse.",
      "Reviewed and expanded technical documentation to align with current database structures.",
    ],
    stack: ["SSMS", "SQL", "T-SQL", "JSON"],
  },
  {
    role: "IT Help Desk Technician",
    org: "UNG, IT Service Desk",
    period: "Jan 2024 — May 2026",
    bullets: [
      "Provided in-person Tier 1 technical support to 20,000+ students, faculty, and staff, resolving hardware, software, and account issues across Windows and macOS.",
      "Assisted with account provisioning, password resets, and MFA enrollment, maintaining secure access in accordance with IT policies.",
      "Diagnosed and resolved workstation, printer, and network connectivity issues on-site, minimizing disruptions to operations.",
      "Supported users with common productivity tools and campus systems, including login access and email configuration.",
    ],
    stack: ["ServiceNow", "Windows", "macOS"],
  },
];

export const projects: Project[] = [
  {
    name: "Lucrum",
    status: "live",
    period: "Feb 2026 — Apr 2026",
    bullets: [
      "Designed a full-stack, AI-powered personal finance app using a microservices architecture, with four independently deployable services; frontend live at lucrumproject.com.",
      "Built a Next.js frontend with secure JWT authentication via HTTP-only cookies and middleware-based route protection, connected to three separate backend REST APIs.",
      "Integrated Claude (via LangChain's ChatAnthropic) into a dedicated Account Summary Service to generate personalized, AI-powered financial summaries and recommendations.",
      "Implemented Account Management and Income Management services in Node.js/Express, handling authentication with bcrypt password hashing and scoped PostgreSQL queries via Supabase.",
      "Containerized backend services with Docker and deployed to AWS EC2 with custom subdomains per service; later scaled the backend down to control hosting costs, with the frontend still live on Vercel.",
    ],
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Express", "Docker", "AWS", "Supabase", "LangChain"],
    href: "https://lucrumproject.com",
  },
];

export const skills: SkillGroup[] = [
  {
    label: "languages",
    items: ["JavaScript", "TypeScript", "Python", "SQL", "HTML", "CSS"],
  },
  {
    label: "frameworks",
    items: ["Next.js", "React", "Node.js", "Express", "Tailwind CSS", "LangChain", "YOLO", "Pytesseract"],
  },
  {
    label: "tools",
    items: ["Docker", "AWS", "Supabase", "PostgreSQL", "Git", "SSMS", "CVAT"],
  },
];

export const links = [
  { label: "GitHub", href: "https://github.com/aidanbh16" },
  { label: "LinkedIn", href: "https://linkedin.com/in/aidan-holton/" },
];
