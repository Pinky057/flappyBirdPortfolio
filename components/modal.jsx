"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import {
  CAMPFIRE,
  CHANNELS,
  EMAIL,
  EXPERIENCE,
  PROJECTS,
  SOCIALS,
  STACK,
  WRITING,
} from "@/content/portfolio"

export default function Modal({ section, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 200)
  }

  const renderContent = () => {
    switch (section) {
      case "about":
        return <AboutContent />
      case "experience":
        return <ExperienceContent />
      case "projects":
        return <ProjectsContent />
      case "youtube":
        return <YouTubeContent />
      case "contact":
        return <ContactContent />
      default:
        return <div>Section not found</div>
    }
  }

  return (
    <div
      className="modal-overlay no-jump"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
      onClick={handleClose}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "#DEB887",
          border: "8px solid #8B4513",
          width: "90%",
          maxWidth: "750px",
          maxHeight: "85vh",
          overflow: "auto",
          padding: "24px",
          position: "relative",
          transform: isVisible ? "scale(1)" : "scale(0.9)",
          transition: "transform 0.2s ease",
          boxShadow: "0 8px 0 #5D4E37, 0 16px 32px rgba(0,0,0,0.5)",
          imageRendering: "pixelated",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="no-jump"
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "#E74C3C",
            border: "4px solid #8B0000",
            borderBottom: "6px solid #5C0000",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <X size={20} strokeWidth={3} />
        </button>

        {renderContent()}
      </div>
    </div>
  )
}

// Retro styled heading component
function RetroHeading({ children, color = "#543E14" }) {
  return (
    <h2
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "16px",
        color: color,
        marginBottom: "20px",
        textShadow: "2px 2px 0 #FFF",
        lineHeight: 1.6,
      }}
    >
      {children}
    </h2>
  )
}

// Retro skill badge
function SkillBadge({ skill, color = "#73BF2E" }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 10px",
        backgroundColor: color,
        color: "white",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "7px",
        border: "3px solid #2E5A1C",
        boxShadow: "0 3px 0 #2E5A1C",
        margin: "3px",
      }}
    >
      {skill}
    </span>
  )
}

/* ---------------------------------------------------------------------------
 * Every panel below reads from content/portfolio.js — the same source the main
 * page renders from. These used to hold their own hardcoded copies, which is
 * how they drifted out of date (wrong name, missing Java/Spring Boot, an old
 * job as "current"). Edit the content file and both surfaces follow.
 * ------------------------------------------------------------------------ */

const BADGE_COLORS = ["#4169E1", "#73BF2E", "#FF6B6B", "#9B59B6", "#E67E22"]

function AboutContent() {
  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace" }}>
      <RetroHeading>👤 ABOUT ME</RetroHeading>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "#4EC0CA",
            border: "4px solid #2A7A8A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            flexShrink: 0,
          }}
        >
          👩‍💻
        </div>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <p style={{ fontSize: "11px", color: "#543E14", lineHeight: 1.8, marginBottom: "8px" }}>
            Hi! I&apos;m <strong style={{ color: "#E74C3C" }}>Ishrat Jahan Pinky</strong>
          </p>
          <p style={{ fontSize: "8px", color: "#666", lineHeight: 2 }}>
            💼 Full Stack Engineer at Princess Cruise Lines
          </p>
          <p style={{ fontSize: "8px", color: "#666", lineHeight: 2 }}>
            ☕ Java, Spring Boot & Hibernate on the server
          </p>
          <p style={{ fontSize: "8px", color: "#666", lineHeight: 2 }}>
            ⚛️ React & Next.js on the screen
          </p>
          <p style={{ fontSize: "8px", color: "#666", lineHeight: 2 }}>
            🎬 Developer content creator on YouTube
          </p>
        </div>
      </div>

      {STACK.map((group, i) => (
        <div key={group.group} style={{ marginBottom: "16px" }}>
          <h3 style={{ fontSize: "10px", color: "#8B4513", marginBottom: "8px" }}>
            {group.group.toUpperCase()}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {group.items.map((skill) => (
              <SkillBadge key={skill} skill={skill} color={BADGE_COLORS[i % BADGE_COLORS.length]} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ExperienceContent() {
  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace" }}>
      <RetroHeading color="#4169E1">💼 EXPERIENCE</RetroHeading>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {EXPERIENCE.map((job) => (
          <div
            key={job.company}
            style={{
              backgroundColor: "#F5DEB3",
              border: "4px solid #8B4513",
              padding: "14px",
              boxShadow: "0 4px 0 #5D4E37",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "22px" }}>{job.emoji}</span>
              <div style={{ flex: 1, minWidth: "150px" }}>
                <h3 style={{ fontSize: "10px", color: "#543E14", marginBottom: "4px", lineHeight: 1.6 }}>
                  {job.role}
                </h3>
                <p style={{ fontSize: "8px", color: "#73BF2E" }}>{job.company}</p>
              </div>
              {job.period && (
                <span
                  style={{
                    fontSize: "7px",
                    color: "#8B4513",
                    backgroundColor: "#DEB887",
                    padding: "4px 8px",
                    border: "2px solid #8B4513",
                  }}
                >
                  {job.period}
                </span>
              )}
            </div>
            <p style={{ fontSize: "7px", color: "#666", lineHeight: 2 }}>{job.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsContent() {
  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace" }}>
      <RetroHeading color="#73BF2E">🚀 PROJECTS</RetroHeading>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {PROJECTS.map((project) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              backgroundColor: "#F5DEB3",
              border: "4px solid #8B4513",
              padding: "14px",
              boxShadow: "0 4px 0 #5D4E37",
              textDecoration: "none",
            }}
          >
            <h3 style={{ fontSize: "10px", color: "#543E14", marginBottom: "8px", lineHeight: 1.6 }}>
              {project.emoji} {project.title}
            </h3>
            <p style={{ fontSize: "7px", color: "#666", lineHeight: 2, marginBottom: "8px" }}>
              {project.blurb}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {project.tech.map((t) => (
                <SkillBadge key={t} skill={t} color="#4169E1" />
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function YouTubeContent() {
  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace" }}>
      <RetroHeading color="#E74C3C">🎬 CHANNELS & WRITING</RetroHeading>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
        {[CHANNELS.tech, CHANNELS.life].map((channel) => (
          <a
            key={channel.name}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              backgroundColor: "#F5DEB3",
              border: "4px solid #8B4513",
              padding: "14px",
              boxShadow: "0 4px 0 #5D4E37",
              textDecoration: "none",
            }}
          >
            <h3 style={{ fontSize: "10px", color: "#543E14", marginBottom: "6px" }}>
              ▶ {channel.name}
            </h3>
            <p style={{ fontSize: "7px", color: "#666", lineHeight: 2 }}>{channel.tagline}</p>
          </a>
        ))}
      </div>

      <h3 style={{ fontSize: "10px", color: "#8B4513", marginBottom: "10px" }}>📝 WRITING</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {WRITING.map((post) => (
          <a
            key={post.title}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              backgroundColor: "#DEB887",
              border: "3px solid #8B4513",
              padding: "10px",
              textDecoration: "none",
            }}
          >
            <p style={{ fontSize: "8px", color: "#543E14", lineHeight: 1.8 }}>{post.title}</p>
            <p style={{ fontSize: "7px", color: "#8B4513", marginTop: "6px" }}>{post.meta}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

function ContactContent() {
  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace" }}>
      <RetroHeading color="#9B59B6">📧 CONTACT</RetroHeading>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "10px", color: "#8B4513", marginBottom: "10px" }}>✉️ EMAIL</h3>
        <a
          href={`mailto:${EMAIL}`}
          style={{
            display: "inline-block",
            fontSize: "8px",
            color: "#543E14",
            backgroundColor: "#DEB887",
            padding: "10px 14px",
            textDecoration: "none",
            border: "3px solid #8B4513",
            boxShadow: "0 3px 0 #5D4E37",
          }}
        >
          {EMAIL}
        </a>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "10px", color: "#8B4513", marginBottom: "10px" }}>🌿 OFF THE CLOCK</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {CAMPFIRE.map((item) => (
            <SkillBadge key={item.id} skill={`${item.emoji} ${item.label}`} color="#73BF2E" />
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: "10px", color: "#8B4513", marginBottom: "10px" }}>🔗 FIND ME EVERYWHERE</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {SOCIALS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 12px",
                backgroundColor: "#FF6B6B",
                color: "white",
                textDecoration: "none",
                border: "3px solid #8B0000",
                boxShadow: "0 3px 0 #5C0000",
                fontSize: "7px",
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: "24px",
          padding: "16px",
          backgroundColor: "#F5DEB3",
          border: "4px dashed #8B4513",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "10px", color: "#543E14", marginBottom: "8px" }}>🎮 THANKS FOR PLAYING!</p>
        <p style={{ fontSize: "7px", color: "#666" }}>Made with ❤️ by Pinky using Next.js</p>
      </div>
    </div>
  )
}
