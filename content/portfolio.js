/**
 * Everything the trail displays, kept out of the layout so content edits never
 * mean touching JSX. Order within each list is the order it renders.
 */

export const STACK = [
  { group: "Languages", accent: "sky", items: ["Java", "TypeScript", "JavaScript", "Python", "SQL"] },
  {
    group: "Frontend & mobile",
    accent: "leaf",
    items: ["React", "Next.js", "React Native", "Tailwind", "HTML5 Canvas", "Framer Motion"],
  },
  { group: "Backend", accent: "bark", items: ["Spring Boot", "Hibernate", "Node.js", "Django"] },
  { group: "Data", accent: "ember", items: ["Oracle", "PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { group: "Ops & tools", accent: "bloom", items: ["Docker", "AWS", "Vercel", "GitHub Actions"] },
]

/**
 * Employment history, newest first.
 *
 * TODO(pinky): fill in the Princess Cruise Lines title, start date and a line
 * about what you actually build there — I left it deliberately thin rather than
 * inventing details. The older roles are carried over from the previous site.
 */
export const EXPERIENCE = [
  {
    role: "Full Stack Engineer",
    company: "Princess Cruise Lines",
    period: "Present",
    body:
      "Building and maintaining full-stack features end to end — Java, Spring Boot and Hibernate on the server, React on the screen.",
    tags: ["Java", "Spring Boot", "Hibernate", "React"],
    accent: "sky",
    emoji: "🚢",
    current: true,
  },
  {
    // Deliberately carries no period and no "currently" marker — dating this
    // one would read as moonlighting next to the current role.
    role: "Remote work & personal projects",
    company: "Independent",
    body:
      "Remote client engagements and my own builds, deployed and live rather than sitting in a repo. Most of what's in the next section came out of this.",
    tags: ["Next.js", "React", "Deployed"],
    accent: "ember",
    emoji: "🌐",
  },
  {
    role: "Full Stack Software Developer",
    company: "Quad Theory Ltd & others",
    period: "2024 — 2026",
    body:
      "Full-stack web apps in React, Node.js and TypeScript. WCAG-compliant e-commerce, payment gateways, and MarTech plumbing (Google Analytics, Tag Manager).",
    tags: ["React", "Node.js", "TypeScript", "a11y"],
    accent: "leaf",
    emoji: "💻",
  },
  {
    role: "Full Stack Developer",
    company: "TS360 Test Automation",
    period: "2022 — 2024",
    body:
      "Chrome extensions and automation frameworks with Node.js, React and Selenium. Wired up CI/CD on GitHub Actions.",
    tags: ["Selenium", "Node.js", "GitHub Actions"],
    accent: "bark",
    emoji: "⚙️",
  },
  {
    role: "Software Developer",
    company: "EON Group of Industries",
    period: "2019 — 2021",
    body:
      "HR management systems used by 1000+ employees, plus e-commerce modules with secure payments and real-time syncing.",
    tags: ["Full-stack", "Payments", "Real-time"],
    accent: "bloom",
    emoji: "🏢",
  },
]

export const PROJECTS = [
  {
    title: "Nexus Dashboard",
    blurb:
      "Admin template with an AI assistant and a charting system. The one that nearly broke me — and the reason I now respect virtualised tables.",
    tech: ["Next.js", "Tailwind", "Framer"],
    href: "https://nexus-dashboard-phi-five.vercel.app/",
    accent: "sky",
    featured: true,
    emoji: "⭐",
  },
  {
    title: "Meridian Travel",
    blurb: "Travel booking platform with live Leaflet mapping and dynamic pricing.",
    tech: ["Next.js", "Leaflet", "Tailwind"],
    href: "https://meridian-travel-69ym.vercel.app/",
    accent: "leaf",
    emoji: "🌍",
  },
  {
    title: "Juicy Fruits Merge",
    blurb: "Physics puzzle game, published on CrazyGames. Matter.js doing the heavy lifting.",
    tech: ["Matter.js", "Canvas", "Physics"],
    href: "https://crazygames.com/",
    accent: "ember",
    emoji: "🍉",
  },
  {
    title: "Hulu 2.0 Clone",
    blurb: "Streaming catalogue wired to the live TMDB API.",
    tech: ["React", "TMDB API", "Tailwind"],
    href: "https://hulu-2-0-clone-beta.vercel.app/",
    accent: "bloom",
    emoji: "🎬",
  },
  {
    title: "LinkedIn Clone",
    blurb: "Pixel-accurate rebuild of the feed and profile mechanics.",
    tech: ["React", "Tailwind", "Vercel"],
    href: "https://linedin-clone.vercel.app/",
    accent: "sky",
    emoji: "💼",
  },
  {
    title: "Button Studio",
    blurb: "A pile of hover states and micro-interactions, built purely because I enjoy it.",
    tech: ["Vanilla CSS", "Animations"],
    href: "https://css-buttons-three.vercel.app/",
    accent: "bark",
    emoji: "🎨",
  },
]

/**
 * The road. Each stop wants a real conflict, not a skill name — what broke and
 * what you did about it is the thing people remember.
 */
export const MILESTONES = [
  {
    level: "Stop one",
    title: "The div that would not centre",
    body:
      "HTML and CSS, learned the slow way. Three days on a layout I could now write in three minutes — but I have never once forgotten how the box model works.",
    tags: ["HTML5", "CSS3", "Flexbox", "Grid"],
    accent: "bark",
    emoji: "🌱",
  },
  {
    level: "Stop two",
    title: "Making it move",
    body:
      "JavaScript, the DOM, and the first time I shipped something that broke in a browser I had not tested. Learned to read a stack trace instead of guessing.",
    tags: ["ES6+", "DOM", "Fetch", "JSON"],
    accent: "ember",
    emoji: "⚡",
  },
  {
    level: "Stop three",
    title: "Learning to think in components",
    body:
      "React rewired how I break problems apart. Also where I learned that state in the wrong place will follow you around for months.",
    tags: ["React", "Hooks", "Redux", "SPA"],
    accent: "sky",
    emoji: "🧩",
  },
  {
    level: "Where I am",
    title: "Shipping things people use",
    body:
      "Next.js, full-stack, real users. WCAG-compliant e-commerce, payment gateways, analytics plumbing. The work got less glamorous and much more satisfying.",
    tags: ["Next.js", "TypeScript", "Node.js", "a11y"],
    accent: "leaf",
    emoji: "👑",
  },
]

export const WRITING = [
  {
    title: "I built the “Premium” admin template I couldn't find for free",
    meta: "3 min read · dev.to",
    href: "https://dev.to/pinky057/i-built-the-premium-admin-template-i-couldnt-find-for-free-nextjs-tailwind-ilo",
    accent: "leaf",
    featured: true,
  },
  {
    title: "I stopped writing code. Here's what I do instead",
    meta: "Vibe coding in 2025",
    href: "https://dev.to/pinky057/i-stopped-writing-code-heres-what-i-do-instead-vibe-coding-in-2025-5661",
    accent: "sky",
  },
  {
    title: "Blooming WeCoded landing page",
    meta: "WeCoded challenge",
    href: "https://dev.to/pinky057/blooming-wecoded-landing-page-9lo",
    accent: "bloom",
  },
]

/**
 * The two channels are split deliberately: the tech one belongs up in "voice",
 * the life one belongs down at the campfire. Presenting them as two identical
 * cards flattened the difference that makes them interesting.
 */
export const CHANNELS = {
  tech: {
    name: "Ishrat Jahan",
    tagline: "Devlogs, tooling, and things I broke on purpose",
    href: "https://www.youtube.com/@ishrat_jahan",
    accent: "sky",
  },
  life: {
    name: "Social Journal",
    tagline: "The unedited version — days off, cooking, wandering about",
    href: "https://www.youtube.com/channel/UCL_GOcGp5TFtz5lamCZMtwg",
    accent: "ember",
  },
}

/**
 * Things around the campfire. Each one is an object you'd actually find at a
 * camp, not a pill in a row.
 */
export const CAMPFIRE = [
  {
    id: "cooking",
    emoji: "🍲",
    label: "Cooking",
    accent: "ember",
    note:
      "The pot on the fire. I cook when a deploy goes badly — something slow, with too many steps, where the only thing that can go wrong is me.",
  },
  {
    id: "crochet",
    emoji: "🧶",
    label: "Crochet",
    accent: "bloom",
    note:
      "Counting stitches is debugging with softer consequences. Half my flat is now covered in things I made while thinking about something else.",
  },
  {
    id: "garden",
    emoji: "🌱",
    label: "Gardening",
    accent: "leaf",
    note:
      "The only project with a compile time measured in weeks. Very good for the ego.",
  },
  {
    id: "clay",
    emoji: "🏺",
    label: "Clay & pixel art",
    accent: "bark",
    note:
      "Both are the same instinct: push something small around until it looks right.",
  },
  {
    id: "reading",
    emoji: "📚",
    label: "Reading",
    accent: "sky",
    note:
      "Mostly fantasy, mostly at hours I should be asleep. Blame the cat, she starts it.",
  },
  {
    id: "games",
    emoji: "🎮",
    label: "Quiet games",
    accent: "leaf",
    note:
      "Nothing with a timer. Give me a farm, a fishing rod, and no stakes whatsoever.",
  },
]

export const SOCIALS = [
  { name: "GitHub", href: "https://github.com/Pinky057" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/ishrat-pinky-jahan/" },
  { name: "dev.to", href: "https://dev.to/pinky057" },
  { name: "Instagram", href: "https://www.instagram.com/ishrat.designs/" },
]

export const EMAIL = "ishratjahanpinky2@gmail.com"

/** Pre-fills the subject so an incoming message is easy to spot. */
export const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Hello from your portfolio"
)}`
