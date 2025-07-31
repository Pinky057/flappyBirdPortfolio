"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

export default function Modal({ section, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation timing
    setIsVisible(true)

    // Add event listener for escape key
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for animation to complete
  }

  // Content based on section
  const renderContent = () => {
    switch (section) {
      case "about":
        return <AboutContent />
      case "experience":
        return <ExperienceContent />
      case "projects":
        return <ProjectsContent />
      case "contact":
        return <ContactContent />
      default:
        return <div>Section not found</div>
    }
  }

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      onClick={handleClose}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "800px",
          maxHeight: "80vh",
          overflow: "auto",
          padding: "30px",
          position: "relative",
          transform: isVisible ? "scale(1)" : "scale(0.9)",
          transition: "transform 0.3s ease",
          boxShadow: "0 5px 30px rgba(0, 0, 0, 0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-button"
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#f1f1f1",
          }}
        >
          <X size={24} />
        </button>

        {renderContent()}
      </div>
    </div>
  )
}

// Section content components
function AboutContent() {
  return (
    <div className="section-content">
      <h2 style={{ color: "#2D4B73", marginBottom: "20px", fontSize: "28px" }}>About Me</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px" }}>
          <img
            src="/placeholder.svg?height=300&width=300"
            alt="Profile"
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "5px solid #5ECCE1",
            }}
          />
        </div>
        <div style={{ flex: "2 1 400px" }}>
          <p style={{ marginBottom: "15px", lineHeight: "1.6" }}>
            Hello! I'm a passionate web developer with expertise in building interactive, user-friendly applications. I
            specialize in React, Next.js, and modern JavaScript.
          </p>
          <p style={{ marginBottom: "15px", lineHeight: "1.6" }}>
            My journey in web development started 5 years ago, and I've been in love with creating digital experiences
            ever since. I enjoy solving complex problems and turning ideas into reality through code.
          </p>
          <h3 style={{ color: "#2D4B73", margin: "20px 0 10px", fontSize: "22px" }}>Skills</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Node.js", "GraphQL", "UI/UX Design"].map(
              (skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#5ECCE1",
                    color: "white",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {skill}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ExperienceContent() {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "Jan 2022 - Present",
      description:
        "Leading the frontend development team in building responsive and accessible web applications using React and Next.js. Implemented state management solutions and optimized performance.",
    },
    {
      title: "Web Developer",
      company: "Digital Solutions Agency",
      period: "Mar 2019 - Dec 2021",
      description:
        "Developed and maintained client websites and web applications. Collaborated with designers to implement pixel-perfect UI. Worked with various APIs and backend systems.",
    },
    {
      title: "Junior Developer",
      company: "StartUp Labs",
      period: "Jun 2017 - Feb 2019",
      description:
        "Assisted in the development of web applications. Learned and implemented best practices in frontend development. Participated in code reviews and team meetings.",
    },
  ]

  return (
    <div className="section-content">
      <h2 style={{ color: "#2D4B73", marginBottom: "20px", fontSize: "28px" }}>Work Experience</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        {experiences.map((exp, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "#f8f9fa",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", flexWrap: "wrap" }}>
              <h3 style={{ color: "#2D4B73", fontSize: "22px", margin: 0 }}>{exp.title}</h3>
              <span style={{ color: "#5ECCE1", fontWeight: "bold" }}>{exp.period}</span>
            </div>
            <div style={{ color: "#FF7D2D", fontWeight: "bold", marginBottom: "10px" }}>{exp.company}</div>
            <p style={{ margin: 0, lineHeight: "1.6" }}>{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsContent() {
  const projects = [
    {
      title: "E-commerce Platform",
      image: "/placeholder.svg?height=200&width=300",
      description: "A full-featured online store with product catalog, shopping cart, and payment processing.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      link: "#",
    },
    {
      title: "Task Management App",
      image: "/placeholder.svg?height=200&width=300",
      description: "A productivity application for managing tasks, projects, and team collaboration.",
      technologies: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
      link: "#",
    },
    {
      title: "Weather Dashboard",
      image: "/placeholder.svg?height=200&width=300",
      description: "An interactive weather application showing forecasts and historical data.",
      technologies: ["React", "Chart.js", "Weather API", "Styled Components"],
      link: "#",
    },
  ]

  return (
    <div className="section-content">
      <h2 style={{ color: "#2D4B73", marginBottom: "20px", fontSize: "28px" }}>Projects</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {projects.map((project, index) => (
          <div
            key={index}
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 3px 15px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ color: "#2D4B73", marginBottom: "10px", fontSize: "20px" }}>{project.title}</h3>
              <p style={{ marginBottom: "15px", fontSize: "14px", lineHeight: "1.5" }}>{project.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "15px" }}>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#5ECCE1",
                      color: "white",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                style={{
                  display: "inline-block",
                  padding: "8px 15px",
                  backgroundColor: "#FF7D2D",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#D45E00"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FF7D2D"
                }}
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactContent() {
  return (
    <div className="section-content">
      <h2 style={{ color: "#E74C3C", marginBottom: "20px", fontSize: "28px" }}>Contact Me</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
        <div style={{ flex: "1 1 300px" }}>
          <p style={{ marginBottom: "20px", lineHeight: "1.6" }}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel
            free to reach out using the form or through my social media profiles.
          </p>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#E74C3C", marginBottom: "10px", fontSize: "18px" }}>Email</h3>
            <a href="mailto:contact@example.com" style={{ color: "#5ECCE1", textDecoration: "none" }}>
              contact@example.com
            </a>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#E74C3C", marginBottom: "10px", fontSize: "18px" }}>Location</h3>
            <p style={{ margin: 0 }}>San Francisco, CA</p>
          </div>

          <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
            {["GitHub", "LinkedIn", "Twitter"].map((platform) => (
              <a
                key={platform}
                href="#"
                style={{
                  display: "inline-block",
                  padding: "10px 15px",
                  backgroundColor: "#E74C3C",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#C0392B"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#E74C3C"
                }}
              >
                {platform}
              </a>
            ))}
          </div>
        </div>

        <div style={{ flex: "1 1 300px" }}>
          <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div>
              <label htmlFor="name" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
            </div>

            <div>
              <label htmlFor="email" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
            </div>

            <div>
              <label htmlFor="message" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                  resize: "vertical",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "12px",
                backgroundColor: "#E74C3C",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#C0392B"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#E74C3C"
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

