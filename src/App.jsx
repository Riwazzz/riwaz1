import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownRight,
  Braces,
  Code2,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Server,
  X,
} from 'lucide-react'
import { useState } from 'react'
import SpatialBackground from './components/SpatialBackground'
import TiltSurface from './components/TiltSurface'

const projectData = [
  {
    number: '01',
    title: 'TryOn: AI Virtual Dressing Room',
    area: 'Computer vision',
    description:
      'A virtual try-on system using Python and OpenCV for body-region detection, image alignment and garment visualization.',
    stack: ['Python', 'OpenCV', 'Computer Vision'],
    focus: 'Image processing, body-region detection, alignment and user interaction.',
  },
  {
    number: '02',
    title: 'Online Examination Management System',
    area: 'Full-stack web',
    description:
      'A secure multi-role examination platform with automated exam generation, authentication and PostgreSQL-backed REST APIs.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'],
    focus: 'Role-based workflows, API design, authentication and database-backed exam management.',
  },
  {
    number: '03',
    title: 'Film Production Management Platform',
    area: 'Full-stack platform',
    description:
      'A production management platform that brings HR, CRM, finance and production logistics into one system.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'],
    focus: 'Complex workflows, structured data and scalable API-driven features.',
  },
  {
    number: '04',
    title: 'Educational Guidebook App',
    area: 'Application development',
    description:
      'An educational application for structured learning content and exercise solutions with straightforward navigation.',
    stack: ['Application development', 'UI design', 'Education'],
    focus: 'Content structure, usability and clear navigation.',
  },
]

const skillGroups = [
  {
    title: 'Frontend',
    icon: Code2,
    items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    title: 'Backend and data',
    icon: Server,
    items: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs'],
  },
  {
    title: 'Development tools',
    icon: Braces,
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'pgAdmin', 'OpenCV'],
  },
]

const navItems = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Education', '#education'],
  ['Contact', '#contact'],
]

// Add the exact profile URLs here before launch. They are intentionally not guessed.
const FacebookIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/riwazzz', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/riwaz-acharya-514999332', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/ig_riwaz', icon: Instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/acharyariwaz', icon: FacebookIcon },
]

function SectionTitle({ index, title, text }) {
  return (
    <div className="section-heading">
      <div className="section-index">{index}</div>
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </div>
  )
}

function SocialLinks({ compact = false }) {
  const configured = socialLinks.filter((item) => item.href)

  return (
    <div className={compact ? 'social-links social-links-compact' : 'social-links'}>
      {configured.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`${label} profile`}>
          {Icon && <Icon size={compact ? 15 : 17} />}
          <span>{label}</span>
          {!compact && <ExternalLink size={13} />}
        </a>
      ))}
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const project = projectData[activeProject]

  return (
    <div className="site-shell">
      <SpatialBackground />
      <div className="scene-vignette" aria-hidden="true" />

      <header className="site-header">
        <nav className="nav-wrap" aria-label="Primary navigation">
          <a href="#home" className="brand" aria-label="Riwaz Acharya home">
            <span className="brand-mark">RA</span>
            <span>Riwaz Acharya</span>
          </a>

          <div className="desktop-nav">
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </div>

          <a className="nav-resume" href="/Riwaz_Acharya_CV.pdf" target="_blank" rel="noreferrer">
            Resume <ExternalLink size={14} />
          </a>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="mobile-nav">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a href="/Riwaz_Acharya_CV.pdf" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Resume</a>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-copy">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              Full-stack developer · Pokhara, Nepal
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.03 }}
            >
              Building web products from interface to database.
            </motion.h1>

            <motion.p
              className="hero-intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.07 }}
            >
              I am Riwaz Acharya. I work with React, Node.js, Python and PostgreSQL, with project experience across examination systems, production software and computer vision.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.11 }}
            >
              <a href="#projects" className="button button-primary">
                View projects <ArrowDownRight size={17} />
              </a>
              <a href="mailto:acharyariwaz29@gmail.com" className="button button-secondary">
                <Mail size={17} /> Contact me
              </a>
            </motion.div>

            <motion.div
              className="hero-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.16 }}
            >
              <span><MapPin size={15} /> Pokhara, Nepal</span>
              <a href="mailto:acharyariwaz29@gmail.com"><Mail size={15} /> acharyariwaz29@gmail.com</a>
            </motion.div>
          </div>

          <motion.div
            className="hero-system-map"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            aria-label="Core full-stack technologies"
          >
            <div className="system-map-label">CORE STACK</div>
            <div className="system-line">
              <span>01</span>
              <div><strong>Interface</strong><small>React · JavaScript · Tailwind CSS</small></div>
            </div>
            <div className="system-line system-line-offset">
              <span>02</span>
              <div><strong>Application</strong><small>Node.js · Python · REST APIs</small></div>
            </div>
            <div className="system-line system-line-deep">
              <span>03</span>
              <div><strong>Data</strong><small>PostgreSQL · Database design</small></div>
            </div>

          </motion.div>
        </section>

        <section id="about" className="content-section">
          <SectionTitle
            index="01"
            title="About"
            text="I build complete web products and care about how the interface, application logic and data model work together."
          />

          <div className="about-grid">
            <TiltSurface className="info-card">
              <Code2 size={22} />
              <h3>Interface engineering</h3>
              <p>Responsive React interfaces, reusable components and clear interaction states.</p>
            </TiltSurface>
            <TiltSurface className="info-card">
              <Database size={22} />
              <h3>Backend and data</h3>
              <p>REST APIs, PostgreSQL, authentication and structured data flows for complete web systems.</p>
            </TiltSurface>
            <TiltSurface className="info-card">
              <GraduationCap size={22} />
              <h3>Engineering education</h3>
              <p>B.E. Electronics Engineering at Paschimanchal Campus, IOE, with expected completion in 2030.</p>
            </TiltSurface>
          </div>
        </section>

        <section id="skills" className="content-section">
          <SectionTitle
            index="02"
            title="Technical skills"
            text="My current stack covers frontend development, backend services, databases and the tools used to build and test them."
          />

          <div className="skills-grid">
            {skillGroups.map(({ title, icon: Icon, items }) => (
              <TiltSurface className="skill-panel" key={title}>
                <div className="skill-panel-title">
                  <Icon size={19} />
                  <h3>{title}</h3>
                </div>
                <ul>
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </TiltSurface>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section projects-section">
          <SectionTitle
            index="03"
            title="Selected projects"
            text="Project work across full-stack systems, application development and computer vision."
          />

          <div className="project-browser">
            <div className="project-list" role="tablist" aria-label="Projects">
              {projectData.map((item, index) => (
                <button
                  type="button"
                  key={item.title}
                  role="tab"
                  aria-selected={activeProject === index}
                  className={`project-tab ${activeProject === index ? 'project-tab-active' : ''}`}
                  onClick={() => setActiveProject(index)}
                >
                  <span>{item.number}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.area}</small>
                  </div>
                </button>
              ))}
            </div>

            <TiltSurface className="project-detail" role="tabpanel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <p className="project-kicker">Project {project.number} · {project.area}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-block">
                    <span>Focus</span>
                    <p>{project.focus}</p>
                  </div>

                  <div className="project-block">
                    <span>Stack</span>
                    <div className="stack-list">
                      {project.stack.map((item) => <b key={item}>{item}</b>)}
                    </div>
                  </div>

                  <a href="https://github.com/riwazzz" target="_blank" rel="noreferrer" className="text-link">
                    GitHub profile <ExternalLink size={15} />
                  </a>
                </motion.div>
              </AnimatePresence>
            </TiltSurface>
          </div>
        </section>

        <section id="education" className="content-section">
          <SectionTitle index="04" title="Education" />

          <div className="education-list">
            <article>
              <div className="education-year">Expected 2030</div>
              <div>
                <h3>Paschimanchal Campus (WRC), IOE</h3>
                <p>B.E. Electronics Engineering · Currently running</p>
              </div>
            </article>
            <article>
              <div className="education-year">Completed</div>
              <div>
                <h3>SOS Hermann Gmeiner Secondary School, Gandaki</h3>
                <p>Higher Education +2 · Science</p>
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <TiltSurface className="contact-card">
            <div>
              <p className="contact-label">05 · Contact</p>
              <h2>Available for full-stack work, volunteer projects and collaboration.</h2>
              <p>If you are working on a web product and need help across React, APIs or PostgreSQL-backed features, you can reach me directly by email.</p>
              <SocialLinks />
            </div>
            <div className="contact-actions">
              <a href="mailto:acharyariwaz29@gmail.com" className="button button-primary"><Mail size={17} /> Email me</a>
              <a href="/Riwaz_Acharya_CV.pdf" target="_blank" rel="noreferrer" className="button button-secondary">Open resume <ExternalLink size={15} /></a>
            </div>
          </TiltSurface>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Riwaz Acharya</strong>
          <span>Full-stack Developer · Pokhara, Nepal</span>
        </div>
        <div className="footer-links">
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms and Conditions</a>
          <a href="mailto:acharyariwaz29@gmail.com">Email</a>
          <SocialLinks compact />
        </div>
        <p>© 2026 Riwaz Acharya.</p>
      </footer>
    </div>
  )
}
