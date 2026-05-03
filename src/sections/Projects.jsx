import React, { useRef, useEffect, useState } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Ganti src image dengan import aktual dari ../assets/
const projects = [
  {
    id: "01",
    title: "Elsa Bluri",
    image: "/assets/project1.jpg", // ganti dengan import img
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget.",
    meta: {
      tempat: "Surabaya, ID",
      date: "Mar 2025",
      promotor: "Setyasa Studio",
      audience: "Profesional",
    },
  },
  {
    id: "02",
    title: "Portfolio Ahmad",
    image: "/assets/project2.jpg",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
    meta: {
      tempat: "Lamongan, ID",
      date: "Jan 2025",
      promotor: "Freelance",
      audience: "Mahasiswa",
    },
  },
  {
    id: "03",
    title: "Raisa Music",
    image: "/assets/project3.jpg",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    meta: {
      tempat: "Jakarta, ID",
      date: "Nov 2024",
      promotor: "Indie Label",
      audience: "Entertainer",
    },
  },
  {
    id: "04",
    title: "Studio Visi",
    image: "/assets/project4.jpg",
    description:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente.",
    meta: {
      tempat: "Bandung, ID",
      date: "Sep 2024",
      promotor: "Setyasa Studio",
      audience: "Fotografer",
    },
  },
];

// ─── CARD ─────────────────────────────────────────────────────────────────────

const ProjectCard = ({ project, index, total, progress }) => {
  // Tiap card mulai "active" ketika progress masuk segment-nya
  // progress: 0 → 1 untuk seluruh section
  // Card i aktif di progress range [i/total .. (i+1)/total]
  const segStart = index / total;
  const segEnd   = (index + 1) / total;
  const segProg  = Math.max(0, Math.min(1, (progress - segStart) / (segEnd - segStart)));

  // Card push up saat card berikutnya datang
  // Setelah card ini jadi "past", dia naik ke atas dan mengecil
  const isPast   = progress > segEnd + 0.01;
  const isActive = !isPast && progress >= segStart - 0.01;

  // Scale & translate untuk stacking effect
  // Card past: semakin kecil dan naik
  const stackOffset  = isPast ? index * 8 : 0;
  const stackScale   = isPast ? 1 - (total - index) * 0.02 : 1;

  return (
    <div
      className="project-card"
      style={{
        "--stack-offset": `${stackOffset}px`,
        "--stack-scale": stackScale,
        zIndex: isActive ? 10 : index + 1,
      }}
    >
      <div className="card-inner">
        {/* ── IMAGE ── */}
        <div className="card-image-wrapper">
          <img
            src={project.image}
            alt={project.title}
            className="card-image"
          />
          {/* Overlay number */}
          <div className="card-number">({project.id})</div>
        </div>

        {/* ── CONTENT ── */}
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">{project.title}</h3>
            <div className="card-divider" />
          </div>

          <p className="card-description">{project.description}</p>

          {/* ── META TAGS ── */}
          <div className="card-meta-grid">
            {Object.entries(project.meta).map(([key, val]) => (
              <div key={key} className="card-meta-tag">
                <span className="meta-label">{key}</span>
                <span className="meta-value">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

const Projects = () => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrollable = el.offsetHeight - window.innerHeight;
      const prog = Math.max(0, Math.min(1, -el.getBoundingClientRect().top / scrollable));
      setProgress(prog);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        /* ── SECTION ── */
        .projects-section {
          position: relative;
          background: #292929;
          /* tinggi virtual: 1 viewport per card + 1 breathing room */
          height: ${(projects.length + 1) * 100}vh;
        }

        .projects-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 5vw;
          overflow: hidden;
        }

        /* ── HEADER ── */
        .projects-header {
          position: absolute;
          top: 2.5rem;
          left: 5vw;
          right: 5vw;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px solid rgba(197,253,224,0.12);
          padding-bottom: 0.75rem;
        }

        .projects-label {
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(197,253,224,0.5);
          font-family: 'DM Mono', 'Courier New', monospace;
        }

        .projects-count {
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: rgba(197,253,224,0.3);
          font-family: 'DM Mono', 'Courier New', monospace;
        }

        /* ── CARD STACK ── */
        .cards-stack {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: 480px;
        }

        .project-card {
          position: absolute;
          inset: 0;
          transform:
            translateY(var(--stack-offset, 0px))
            scale(var(--stack-scale, 1));
          transform-origin: top center;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card-inner {
          width: 100%;
          height: 100%;
          background: #1a1a1a;
          border: 1px solid rgba(197,253,224,0.08);
          border-radius: 16px;
          display: grid;
          grid-template-columns: 380px 1fr;
          overflow: hidden;
        }

        /* ── IMAGE ── */
        .card-image-wrapper {
          position: relative;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(20%);
          transition: filter 0.4s ease, transform 0.6s ease;
        }

        .card-inner:hover .card-image {
          filter: grayscale(0%);
          transform: scale(1.03);
        }

        .card-number {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-size: 0.65rem;
          font-family: 'DM Mono', 'Courier New', monospace;
          letter-spacing: 0.12em;
          color: rgba(197,253,224,0.6);
          background: rgba(0,0,0,0.5);
          padding: 0.3rem 0.6rem;
          border-radius: 99px;
          backdrop-filter: blur(4px);
        }

        /* ── CONTENT ── */
        .card-content {
          padding: 2rem 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          overflow: hidden;
        }

        .card-header {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .card-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 2.2rem;
          font-weight: 400;
          color: #f0ede8;
          line-height: 1.1;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .card-divider {
          width: 2rem;
          height: 1.5px;
          background: #38DD88;
          border-radius: 99px;
        }

        .card-description {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: rgba(240,237,232,0.55);
          line-height: 1.7;
          margin: 0;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── META TAGS ── */
        .card-meta-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        /* Last tag spans 2 cols if 4 items in 3-col grid */
        .card-meta-grid .card-meta-tag:last-child:nth-child(4) {
          grid-column: span 1;
        }

        .card-meta-tag {
          border: 1px solid rgba(197,253,224,0.25);
          border-radius: 99px;
          padding: 0.4rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .card-meta-tag:hover {
          border-color: rgba(197,253,224,0.55);
          background: rgba(197,253,224,0.04);
        }

        .meta-label {
          font-size: 0.55rem;
          font-family: 'DM Mono', 'Courier New', monospace;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(197,253,224,0.4);
          line-height: 1;
        }

        .meta-value {
          font-size: 0.78rem;
          font-family: 'DM Sans', sans-serif;
          color: rgba(240,237,232,0.8);
          font-weight: 500;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── PROGRESS INDICATOR ── */
        .projects-progress {
          position: absolute;
          bottom: 2.5rem;
          left: 5vw;
          right: 5vw;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .progress-track {
          flex: 1;
          height: 1px;
          background: rgba(197,253,224,0.1);
          border-radius: 99px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #38DD88;
          border-radius: 99px;
          transition: width 0.1s linear;
        }

        .progress-label {
          font-size: 0.6rem;
          font-family: 'DM Mono', 'Courier New', monospace;
          letter-spacing: 0.15em;
          color: rgba(197,253,224,0.3);
          white-space: nowrap;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .card-inner {
            grid-template-columns: 1fr;
            grid-template-rows: 200px 1fr;
          }

          .cards-stack {
            height: 520px;
          }

          .card-meta-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .card-title {
            font-size: 1.6rem;
          }
        }
      `}</style>

      <section ref={sectionRef} className="projects-section">
        <div className="projects-sticky">

          {/* ── SECTION HEADER ── */}
          <div className="projects-header">
            <span className="projects-label">Selected Projects</span>
            <span className="projects-count">
              {String(Math.min(
                projects.length,
                Math.ceil(progress * projects.length) + 1
              )).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          {/* ── CARD STACK ── */}
          <div className="cards-stack">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                total={projects.length}
                progress={progress}
              />
            ))}
          </div>

          {/* ── PROGRESS BAR ── */}
          <div className="projects-progress">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="progress-label">
              {Math.round(progress * 100)}%
            </span>
          </div>

        </div>
      </section>
    </>
  );
};

export default Projects;