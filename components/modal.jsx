"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

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

function AboutContent() {
  const languages = ["JavaScript", "TypeScript", "Python", "HTML", "CSS", "SASS"]
  const frameworks = ["React", "Next.js", "React Native", "Django", "Node.js", "Tailwind CSS"]
  const tools = ["VS Code", "Cursor", "Git", "GitHub", "Figma", "Vercel", "Claude Code"]
  const databases = ["PostgreSQL", "MySQL", "MongoDB", "Firebase"]

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
            Hi! I'm <strong style={{ color: "#E74C3C" }}>Ummey Habiba Pinky</strong>
          </p>
          <p style={{ fontSize: "8px", color: "#666", lineHeight: 2 }}>
            🎓 CS Graduate from East West University, Bangladesh
          </p>
          <p style={{ fontSize: "8px", color: "#666", lineHeight: 2 }}>
            💻 Passionate about building web & mobile apps
          </p>
          <p style={{ fontSize: "8px", color: "#666", lineHeight: 2 }}>
            🎬 Developer content creator on YouTube
          </p>
          <p style={{ fontSize: "8px", color: "#666", lineHeight: 2 }}>
            🤖 Currently exploring AI-assisted development with Claude Code, Cursor & more
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <h3 style={{ fontSize: "10px", color: "#8B4513", marginBottom: "10px" }}>
          🎯 CURRENTLY WORKING ON
        </h3>
        <ul style={{ fontSize: "8px", color: "#543E14", lineHeight: 2.2, paddingLeft: "16px" }}>
          <li>🚀 Building my own web apps & mobile apps</li>
          <li>📹 Creating coding videos & tutorials</li>
          <li>🌱 Learning & experimenting with new tech</li>
          <li>💡 Open source contributions</li>
        </ul>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <h3 style={{ fontSize: "10px", color: "#8B4513", marginBottom: "8px" }}>💻 LANGUAGES</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {languages.map((skill) => <SkillBadge key={skill} skill={skill} color="#4169E1" />)}
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <h3 style={{ fontSize: "10px", color: "#8B4513", marginBottom: "8px" }}>⚡ FRAMEWORKS</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {frameworks.map((skill) => <SkillBadge key={skill} skill={skill} color="#73BF2E" />)}
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <h3 style={{ fontSize: "10px", color: "#8B4513", marginBottom: "8px" }}>🛠️ TOOLS</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {tools.map((skill) => <SkillBadge key={skill} skill={skill} color="#FF6B6B" />)}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: "10px", color: "#8B4513", marginBottom: "8px" }}>🗄️ DATABASES</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {databases.map((skill) => <SkillBadge key={skill} skill={skill} color="#9B59B6" />)}
        </div>
      </div>
    </div>
  )
}

function ExperienceContent() {
  const experiences = [
    {
      title: "Software Developer",
      company: "Freelance & Personal Projects",
      period: "2023 - Present",
      description: "Building web applications using React, Next.js, and modern JavaScript. Working on AI-assisted development projects.",
      icon: "💼",
    },
    {
      title: "Content Creator",
      company: "YouTube - @ishratpinky",
      period: "2021 - Present",
      description: "Creating developer tutorials, VS Code tips & themes, CSS tricks, and coding content. Growing dev community.",
      icon: "🎬",
    },
    {
      title: "Open Source Contributor",
      company: "GitHub - Pinky057",
      period: "Ongoing",
      description: "Contributing to open source projects, building public repos, and sharing code with the community.",
      icon: "🐙",
    },
    {
      title: "CS Graduate",
      company: "East West University",
      period: "Completed",
      description: "Bachelor's in Computer Science with focus on software development, algorithms, and web technologies.",
      icon: "🎓",
    },
  ]

  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace" }}>
      <RetroHeading color="#4169E1">💼 EXPERIENCE</RetroHeading>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {experiences.map((exp, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#F5DEB3",
              border: "4px solid #8B4513",
              padding: "14px",
              boxShadow: "0 4px 0 #5D4E37",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "22px" }}>{exp.icon}</span>
              <div style={{ flex: 1, minWidth: "150px" }}>
                <h3 style={{ fontSize: "10px", color: "#543E14", marginBottom: "4px" }}>
                  {exp.title}
                </h3>
                <p style={{ fontSize: "8px", color: "#73BF2E" }}>{exp.company}</p>
              </div>
              <span
                style={{
                  fontSize: "7px",
                  color: "#8B4513",
                  backgroundColor: "#DEB887",
                  padding: "4px 8px",
                  border: "2px solid #8B4513",
                }}
              >
                {exp.period}
              </span>
            </div>
            <p style={{ fontSize: "7px", color: "#666", lineHeight: 2 }}>
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsContent() {
  const projects = [
    {
      title: "LinkedIn Clone",
      description: "Full LinkedIn UI clone with feed & profiles",
      tech: ["React", "Next.js", "Tailwind"],
      link: "https://linedin-clone.vercel.app/",
      icon: "💼",
    },
    {
      title: "Hulu 2.0 Clone",
      description: "Movie streaming UI with TMDB API",
      tech: ["React", "Next.js", "TMDB API"],
      link: "https://hulu-2-0-clone-beta.vercel.app/",
      icon: "🎬",
    },
    {
      title: "CSS Buttons Collection",
      description: "Beautiful hover effects & animations",
      tech: ["HTML", "CSS", "Animations"],
      link: "https://css-buttons-three.vercel.app/",
      icon: "🎨",
    },
    {
      title: "Quote Extension",
      description: "Daily quotes Chrome extension",
      tech: ["JavaScript", "Chrome API"],
      link: "https://github.com/Pinky057/GetQuoetsEveryday-Extension",
      icon: "🧩",
    },
    {
      title: "Login Form UI",
      description: "Material UI form with validation",
      tech: ["React", "Material UI", "Formik"],
      link: "https://login-form-material-ui.vercel.app/",
      icon: "🔐",
    },
    {
      title: "This Portfolio!",
      description: "Flappy Bird game portfolio",
      tech: ["Next.js", "React", "Canvas"],
      link: "https://github.com/Pinky057/flappyBirdPortfolio",
      icon: "🎮",
    },
  ]

  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace" }}>
      <RetroHeading color="#32CD32">🚀 PROJECTS</RetroHeading>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              backgroundColor: "#F5DEB3",
              border: "4px solid #228B22",
              padding: "12px",
              textDecoration: "none",
              boxShadow: "0 4px 0 #1A5A1A",
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 6px 0 #1A5A1A"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 0 #1A5A1A"
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "6px" }}>{project.icon}</div>
            <h3 style={{ fontSize: "9px", color: "#543E14", marginBottom: "4px" }}>
              {project.title}
            </h3>
            <p style={{ fontSize: "6px", color: "#666", marginBottom: "8px", lineHeight: 1.8 }}>
              {project.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "5px",
                    backgroundColor: "#73BF2E",
                    color: "white",
                    padding: "2px 5px",
                    border: "2px solid #2E5A1C",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function YouTubeContent() {
  const videos = [
    {
      title: "How to make VS Code transparent",
      description: "Make your VS Code look glassy and aesthetic",
      thumbnail: "https://i.ytimg.com/vi/7nOhaT_6mgE/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=7nOhaT_6mgE",
      views: "Popular",
    },
    {
      title: "Top 10 VS Code Themes",
      description: "Coolest themes you need to try",
      thumbnail: "https://i.ytimg.com/vi/Gnkwj8cIbGk/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=Gnkwj8cIbGk",
      views: "Must Watch",
    },
    {
      title: "CSS Buttons Hover Effects",
      description: "Beautiful button animations tutorial",
      thumbnail: "https://i.ytimg.com/vi/PxCnjA92EN8/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=PxCnjA92EN8",
      views: "Tutorial",
    },
    {
      title: "CSS Background Blend Mode",
      description: "Creative CSS visual effects",
      thumbnail: "https://i.ytimg.com/vi/aCkOKtTuZQg/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=aCkOKtTuZQg",
      views: "CSS Tips",
    },
    {
      title: "Chrome Extension Tutorial",
      description: "Build your first Chrome extension",
      thumbnail: "https://i.ytimg.com/vi/mLAb6_LZmYU/maxresdefault.jpg",
      link: "https://youtu.be/mLAb6_LZmYU",
      views: "Tutorial",
    },
  ]

  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace" }}>
      <RetroHeading color="#FF0000">📺 YOUTUBE</RetroHeading>

      <div style={{ marginBottom: "16px", textAlign: "center" }}>
        <a
          href="https://www.youtube.com/channel/UC6K4SX8PCmBKrj6-G4PRLYQ"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            backgroundColor: "#FF0000",
            color: "white",
            textDecoration: "none",
            fontSize: "10px",
            border: "4px solid #990000",
            boxShadow: "0 4px 0 #660000",
          }}
        >
          🔔 SUBSCRIBE TO MY CHANNEL
        </a>
      </div>

      <p style={{ fontSize: "8px", color: "#543E14", lineHeight: 2, marginBottom: "16px", textAlign: "center" }}>
        I create dev tutorials, VS Code tips, CSS tricks & coding content!
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {videos.map((video, index) => (
          <a
            key={index}
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              gap: "12px",
              backgroundColor: "#F5DEB3",
              border: "4px solid #8B4513",
              padding: "10px",
              textDecoration: "none",
              boxShadow: "0 4px 0 #5D4E37",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#EED9A4"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#F5DEB3"
            }}
          >
            <div
              style={{
                width: "120px",
                height: "68px",
                backgroundColor: "#333",
                flexShrink: 0,
                overflow: "hidden",
                border: "2px solid #8B4513",
              }}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontSize: "6px",
                  backgroundColor: "#FF0000",
                  color: "white",
                  padding: "2px 6px",
                  marginBottom: "4px",
                  display: "inline-block",
                }}
              >
                {video.views}
              </span>
              <h3 style={{ fontSize: "8px", color: "#543E14", marginBottom: "4px", lineHeight: 1.5 }}>
                {video.title}
              </h3>
              <p style={{ fontSize: "6px", color: "#666", lineHeight: 1.6 }}>
                {video.description}
              </p>
            </div>
            <div style={{ fontSize: "20px" }}>▶️</div>
          </a>
        ))}
      </div>
    </div>
  )
}

function ContactContent() {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/Pinky057", icon: "🐙" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/ishrat-pinky-jahan/", icon: "💼" },
    { name: "YouTube", url: "https://www.youtube.com/channel/UC6K4SX8PCmBKrj6-G4PRLYQ", icon: "📺" },
    { name: "DEV.to", url: "https://dev.to/pinky057", icon: "📝" },
    { name: "Instagram", url: "https://www.instagram.com/ishrat.designs/", icon: "📸" },
    { name: "Behance", url: "https://www.behance.net/ishratjahapinky", icon: "🎨" },
    { name: "CodePen", url: "https://codepen.io/Ishrat_Pinky", icon: "✏️" },
    { name: "CSS Battle", url: "https://cssbattle.dev/player/ishratpinky", icon: "⚔️" },
  ]

  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace" }}>
      <RetroHeading color="#FF6B6B">📧 CONTACT ME</RetroHeading>

      <p style={{ fontSize: "8px", color: "#543E14", lineHeight: 2, marginBottom: "20px" }}>
        I'm always open to discussing new projects, creative ideas, collaborations or opportunities!
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "10px", color: "#8B4513", marginBottom: "10px" }}>
          📬 EMAIL ME
        </h3>
        <a
          href="mailto:ishratjahanpinky2@gmail.com"
          style={{
            display: "inline-block",
            fontSize: "8px",
            color: "#4169E1",
            textDecoration: "none",
            backgroundColor: "#F5DEB3",
            padding: "10px 16px",
            border: "3px solid #8B4513",
            boxShadow: "0 3px 0 #5D4E37",
          }}
        >
          ishratjahanpinky2@gmail.com
        </a>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "10px", color: "#8B4513", marginBottom: "10px" }}>
          📍 LOCATION
        </h3>
        <p style={{ fontSize: "8px", color: "#543E14" }}>
          🇧🇩 Bangladesh
        </p>
      </div>

      <div>
        <h3 style={{ fontSize: "10px", color: "#8B4513", marginBottom: "10px" }}>
          🔗 FIND ME EVERYWHERE
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 12px",
                backgroundColor: "#FF6B6B",
                color: "white",
                textDecoration: "none",
                border: "3px solid #8B0000",
                boxShadow: "0 3px 0 #5C0000",
                fontSize: "7px",
                transition: "transform 0.1s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <span style={{ fontSize: "14px" }}>{link.icon}</span>
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
        <p style={{ fontSize: "10px", color: "#543E14", marginBottom: "8px" }}>
          🎮 THANKS FOR PLAYING!
        </p>
        <p style={{ fontSize: "7px", color: "#666" }}>
          Made with ❤️ by Pinky using Next.js & Claude Code
        </p>
      </div>
    </div>
  )
}
