"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import Game from "@/components/game"
import Modal from "@/components/modal"
import { GameProvider } from "@/context/game-context"
import { TrailProvider } from "@/context/trail-context"

import Sky from "@/components/trail/sky"
import ParallaxForest from "@/components/trail/parallax-forest"
import Fireflies from "@/components/trail/fireflies"
import Atmosphere from "@/components/trail/atmosphere"
import Companion from "@/components/trail/companion"
import Mochi from "@/components/trail/mochi"
import TrailNav from "@/components/trail/trail-nav"
import Hero from "@/components/trail/hero"
import Annotation from "@/components/trail/annotation"
import SceneBackdrop from "@/components/trail/scene-backdrop"
import ContactActions from "@/components/trail/contact-actions"
import Card, { Chip, Tag } from "@/components/trail/card"

import {
  CAMPFIRE,
  CHANNELS,
  EXPERIENCE,
  MILESTONES,
  PROJECTS,
  SOCIALS,
  STACK,
  WRITING,
} from "@/content/portfolio"

/**
 * The trail runs top to bottom from the public self to the private one:
 *
 *   intro -> about -> experience -> projects -> journey -> voice -> person -> contact
 *
 * The light arc in <Sky> descends with it, so by the time a reader reaches the
 * cooking and the crochet they are sitting at a campfire. That is the whole
 * design; section order is load-bearing, not cosmetic.
 */
export default function Home() {
  return (
    <TrailProvider>
      <Atmosphere />
      <Sky />
      <ParallaxForest />
      <Fireflies />
      <TrailNav />
      <Companion />
      <Mochi />

      <main className="relative min-h-screen overflow-x-hidden pb-24 font-sans">
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <JourneySection />
        <VoiceSection />
        <PersonSection />
        <ContactSection />
      </main>
    </TrailProvider>
  )
}

/* ---------------------------------------------------------------- shared ---- */

function SectionHeading({ eyebrow, title, lead, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className={"mb-14 max-w-2xl " + className}
    >
      <span
        className="mb-3 block text-[11px] font-extrabold uppercase tracking-[0.28em]"
        style={{ color: "var(--ink-faint)" }}
      >
        {eyebrow}
      </span>
      <h2
        className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl"
        style={{ color: "var(--ink)" }}
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-lg font-medium leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          {lead}
        </p>
      )}
    </motion.div>
  )
}

function Section({ id, chapter, children, className = "" }) {
  return (
    <section
      id={id}
      data-chapter={chapter}
      className={"relative z-10 mx-auto w-full max-w-6xl px-6 py-24 md:px-10 md:py-32 " + className}
    >
      {children}
    </section>
  )
}

/* ----------------------------------------------------------------- about ---- */

function AboutSection() {
  return (
    <Section id="about" chapter="about">
      <SectionHeading
        eyebrow="The useful part"
        title="What I actually do"
        lead="Full-stack, but the frontend is where I'm opinionated. I build interfaces that hold up under real users, real data and real deadlines."
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {/* Photo card — taped in like something out of a journal */}
        <Card accent="leaf" seed={7} interactive={false} tape className="sm:col-span-2 xl:col-span-1 !p-4">
          <span
            className="relative block aspect-[10/9] w-full overflow-hidden rounded-[1.4rem]"
            style={{ boxShadow: "0 8px 22px -10px var(--shadow)" }}
          >
            <Image
              src="/scenes/desk.webp"
              alt="Pinky working on a laptop under a wisteria tree, cat asleep beside her"
              fill
              sizes="(max-width: 640px) 90vw, 380px"
              className="object-cover"
            />
          </span>
          <p className="mt-3 text-center text-sm font-medium italic" style={{ color: "var(--ink-soft)" }}>
            A fairly accurate depiction of the setup.
          </p>
        </Card>

        {STACK.map((group, i) => (
          <Card key={group.group} accent={group.accent} seed={i} leaf={i === 0}>
            <h3
              className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.2em]"
              style={{ color: "var(--ink-faint)" }}
            >
              {group.group}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------ experience ---- */

function ExperienceSection() {
  return (
    <Section id="experience" chapter="experience">
      <SectionHeading
        eyebrow="Where I've worked"
        title="Six years of shipping"
        lead="Currently a full-stack engineer at Princess Cruise Lines."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {EXPERIENCE.map((job, i) => (
          <Card key={job.company} accent={job.accent} seed={i + 4} leaf={job.current}>
            <div className="mb-4 flex items-start gap-4">
              <Chip>{job.emoji}</Chip>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-xl font-bold leading-tight" style={{ color: "var(--ink)" }}>
                  {job.role}
                </h3>
                <p className="mt-1 text-sm font-bold" style={{ color: "var(--accent-text)" }}>
                  {job.company}
                </p>
              </div>
            </div>

            {(job.period || job.current) && (
              <div className="mb-4 flex items-center gap-2">
                {job.period && (
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em]"
                    style={{ background: "var(--accent-wash)", color: "var(--accent-text)" }}
                  >
                    {job.period}
                  </span>
                )}
                {job.current && (
                  <span className="flex items-center gap-1.5 text-[11px] font-bold" style={{ color: "var(--ink-faint)" }}>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5aa06a] opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3f8f52]" />
                    </span>
                    Currently here
                  </span>
                )}
              </div>
            )}

            <p className="mb-5 text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {job.body}
            </p>

            <div className="flex flex-wrap gap-2">
              {job.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------- projects ---- */

function ProjectsSection() {
  return (
    <Section id="projects" chapter="projects">
      <SectionHeading
        eyebrow="The work"
        title="Things I've shipped"
        lead="All live, all clickable. None of these are mockups."
      />

      <Annotation
        label="the hard one"
        direction="down-right"
        className="absolute right-8 top-32 z-20 hidden h-[133px] w-[190px] xl:block"
        color="var(--ink-faint)"
        delay={0.3}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <Card
            key={project.title}
            as="a"
            href={project.href}
            target="_blank"
            rel="noreferrer"
            accent={project.accent}
            seed={i}
            leaf={project.featured}
            className="flex flex-col"
          >
            <Chip className="mb-5">{project.emoji}</Chip>

            <h3 className="mb-2 font-serif text-2xl font-bold leading-tight" style={{ color: "var(--ink)" }}>
              {project.title}
            </h3>

            <p className="mb-6 flex-1 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {project.blurb}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* --------------------------------------------------------------- journey ---- */

function JourneySection() {
  return (
    <Section id="journey" chapter="journey">
      <SectionHeading
        eyebrow="The road"
        title="How I got here"
        lead="Four stops, in order. The interesting part of each one is what went wrong."
      />

      <div className="relative">
        {/* Dotted trail line */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-[27px] top-6 hidden w-px border-l-2 border-dotted md:block"
          style={{ borderColor: "var(--ink-faint)" }}
        />

        <div className="space-y-6">
          {MILESTONES.map((stop, i) => (
            <div key={stop.title} className="relative md:pl-20">
              {/* Trail marker */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-8 hidden h-14 w-14 items-center justify-center rounded-full text-2xl md:flex"
                style={{ background: "var(--surface)", boxShadow: "0 6px 18px -8px var(--shadow)" }}
              >
                {stop.emoji}
              </span>

              <Card accent={stop.accent} seed={i + 2} tape={i === 0}>
                <span
                  className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.2em]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {stop.level}
                </span>
                <h3
                  className="mb-3 font-serif text-2xl font-bold leading-tight md:text-3xl"
                  style={{ color: "var(--ink)" }}
                >
                  {stop.title}
                </h3>
                <p className="mb-5 text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {stop.body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {stop.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ----------------------------------------------------------------- voice ---- */

function VoiceSection() {
  const channel = CHANNELS.tech

  return (
    <Section id="voice" chapter="voice">
      <SectionHeading
        eyebrow="The voice"
        title="I write things down"
        lead="Mostly so I stop making the same mistake twice. Some of it ends up published."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {WRITING.map((post, i) => (
          <Card
            key={post.title}
            as="a"
            href={post.href}
            target="_blank"
            rel="noreferrer"
            accent={post.accent}
            seed={i + 1}
            leaf={post.featured}
            className={post.featured ? "lg:col-span-2" : ""}
          >
            {post.featured && (
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em]"
                style={{ background: "var(--accent-wash)", color: "var(--accent-text)" }}
              >
                Featured
              </span>
            )}
            <h3
              className={
                "mb-3 font-serif font-bold leading-tight " +
                (post.featured ? "text-2xl md:text-3xl" : "text-xl")
              }
              style={{ color: "var(--ink)" }}
            >
              {post.title}
            </h3>
            <p className="text-sm font-medium" style={{ color: "var(--ink-faint)" }}>
              {post.meta}
            </p>
          </Card>
        ))}

        {/* The tech channel belongs up here with the writing, not next to the
            life channel — they are doing different jobs. */}
        <Card as="a" href={channel.href} target="_blank" rel="noreferrer" accent={channel.accent} seed={5}>
          <div className="flex items-center gap-4">
            <Chip>
              <YouTubeMark />
            </Chip>
            <div>
              <h3 className="font-serif text-xl font-bold leading-tight" style={{ color: "var(--ink)" }}>
                {channel.name}
              </h3>
              <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
                {channel.tagline}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------------- person ---- */

function PersonSection() {
  const [openId, setOpenId] = useState(CAMPFIRE[0].id)
  const [activeSection, setActiveSection] = useState(null)
  const [powered, setPowered] = useState(false)
  const [runId, setRunId] = useState(0)
  const open = CAMPFIRE.find((item) => item.id === openId) ?? CAMPFIRE[0]
  const channel = CHANNELS.life

  // Closing the game also drops any open info panel and bumps the run id, so
  // powering back on always starts from a clean slate.
  const setPoweredSafely = (next) => {
    setPowered(next)
    if (!next) {
      setActiveSection(null)
      setRunId((n) => n + 1)
    }
  }

  return (
    <Section id="person" chapter="person">
      <SectionHeading
        eyebrow="Off the clock"
        title="Everyone calls me Pinky"
        lead="The CV stops here. This is the rest of it — the things I make when nothing has to ship."
      />

      {/* Painted campfire scene as a banner — nothing sits on top of it */}
      <SceneBackdrop
        src="/scenes/campfire.webp"
        alt="Pinky sitting under a wisteria tree with a laptop, coffee and a sleeping cat"
        caption="Where most of this gets made"
      />

      {/* Things around the fire */}
      <div className="mb-8 flex flex-wrap gap-3">
        {CAMPFIRE.map((item) => {
          const isOpen = item.id === openId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenId(item.id)}
              aria-pressed={isOpen}
              className="flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-bold transition-transform hover:-translate-y-1"
              style={{
                background: "var(--surface)",
                color: isOpen ? "var(--ink)" : "var(--ink-soft)",
                boxShadow: isOpen
                  ? "0 14px 30px -12px var(--shadow)"
                  : "0 6px 16px -10px var(--shadow)",
                outline: isOpen ? "2px solid var(--ink-faint)" : "none",
                outlineOffset: "2px",
              }}
            >
              <span className="text-xl">{item.emoji}</span>
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card accent={open.accent} seed={3} interactive={false} leaf>
          <motion.div key={open.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Chip className="mb-5">{open.emoji}</Chip>
            <h3 className="mb-3 font-serif text-2xl font-bold" style={{ color: "var(--ink)" }}>
              {open.label}
            </h3>
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {open.note}
            </p>
          </motion.div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card as="a" href={channel.href} target="_blank" rel="noreferrer" accent={channel.accent} seed={6} tape>
            <div className="flex items-center gap-4">
              <Chip>
                <YouTubeMark />
              </Chip>
              <div>
                <h3 className="font-serif text-xl font-bold leading-tight" style={{ color: "var(--ink)" }}>
                  {channel.name}
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
                  {channel.tagline}
                </p>
              </div>
            </div>
          </Card>

          {/* Mochi, doing her share of the work */}
          <Card accent="ember" seed={7} interactive={false} className="flex items-center gap-5 !p-5">
            <span
              className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-2xl"
              style={{ boxShadow: "0 6px 16px -8px var(--shadow)" }}
            >
              <Image src="/scenes/mochi-asleep.webp" alt="Mochi the cat, asleep in the grass" fill className="object-cover" />
            </span>
            <p className="text-sm font-medium italic leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Mochi, mid-contribution.
            </p>
          </Card>
        </div>
      </div>

      {/* The game lives at the campfire — it is something she is playing, which
          is also why its pixel art no longer clashes with the illustration. */}
      <div className="mt-16">
        <Annotation
          label="just for fun"
          direction="down-left"
          className="absolute right-6 z-20 hidden h-[126px] w-[180px] -translate-y-24 lg:block"
          color="var(--ink-faint)"
        />

        <Console powered={powered} onPower={() => setPoweredSafely(!powered)}>
          {powered ? (
            // Remounting on `runId` is the clean way to end a run: the game and
            // its provider are torn down entirely, so no score, obstacle or
            // paused state can survive into the next one.
            <GameProvider key={runId}>
              <Game isPaused={Boolean(activeSection)} onSectionClick={setActiveSection} />
              {activeSection && <Modal section={activeSection} onClose={() => setActiveSection(null)} />}
            </GameProvider>
          ) : (
            <ConsoleOff onStart={() => setPowered(true)} />
          )}
        </Console>
      </div>
    </Section>
  )
}

/** Handheld frame so the retro pixel art reads as a device in her world. */
function Console({ children, powered, onPower }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-4xl rounded-[2.5rem] p-4 md:p-6"
      style={{ background: "var(--surface)", boxShadow: "0 30px 60px -24px var(--shadow)" }}
    >
      <div className="mb-3 flex items-center justify-between px-3">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.24em]" style={{ color: "var(--ink-faint)" }}>
          Pinky&apos;s handheld
        </span>
        <span className="flex items-center gap-3">
          {powered && (
            <button
              type="button"
              onClick={onPower}
              aria-label="Close the game"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--surface-sunk)", color: "var(--ink-soft)" }}
            >
              <CloseIcon /> Close
            </button>
          )}
          <span className="flex gap-1.5">
            <Dot color={powered ? "#e58a4e" : "#cbd0c9"} />
            <Dot color={powered ? "#f2b544" : "#cbd0c9"} />
            <Dot color={powered ? "#84a98c" : "#cbd0c9"} />
          </span>
        </span>
      </div>

      <div className="h-[400px] overflow-hidden rounded-[1.6rem] md:h-[480px]" style={{ background: "#0f1a20" }}>
        {children}
      </div>

      <p className="mt-4 text-center text-xs font-medium" style={{ color: "var(--ink-faint)" }}>
        {powered ? "Tap or press space to fly. Try to beat 10." : "Entirely optional. It is here because I enjoyed making it."}
      </p>
    </motion.div>
  )
}

/** Idle screen — the game only mounts once someone chooses to switch it on. */
function ConsoleOff({ onStart }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
      <span className="text-5xl">🎮</span>
      <p className="max-w-xs text-sm font-medium leading-relaxed text-[#8fa39a]">
        A small Flappy Bird I built. Fly through the pipes, collect the panels.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="rounded-full px-8 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-1"
        style={{ background: "#3f6b47", boxShadow: "0 12px 26px -12px rgba(0,0,0,0.6)" }}
      >
        Switch it on
      </button>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function Dot({ color }) {
  return <span className="block h-2 w-2 rounded-full" style={{ background: color }} />
}

/* --------------------------------------------------------------- contact ---- */

function ContactSection() {
  return (
    <Section id="contact" chapter="contact" className="pb-40">
      <Card accent="ember" seed={0} interactive={false} className="text-center md:p-14">
        <h2 className="font-serif text-4xl font-bold md:text-5xl" style={{ color: "var(--ink)" }}>
          That&apos;s the whole trail.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg font-medium" style={{ color: "var(--ink-soft)" }}>
          Need someone to build the part people actually touch? Or just want to argue about
          whether the cat counts as a contributor?
        </p>

        <ContactActions />

        <div
          className="mt-14 flex flex-col items-center justify-between gap-5 pt-8 text-sm font-bold md:flex-row"
          style={{ borderTop: "1px solid var(--edge)", color: "var(--ink-soft)" }}
        >
          <span>© {new Date().getFullYear()} Ishrat Jahan Pinky</span>
          <nav className="flex flex-wrap justify-center gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                {social.name}
              </a>
            ))}
          </nav>
        </div>
      </Card>
    </Section>
  )
}

function YouTubeMark() {
  return (
    <svg className="h-6 w-6" fill="#ff4d4d" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    </svg>
  )
}
