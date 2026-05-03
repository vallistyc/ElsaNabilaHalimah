import React, { useRef, useState } from "react";

// ── LINKS ─────────────────────────────────────────────────────────────────────
const SOCMED = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    handle: "+62 856-0889-0886",
    href: "https://wa.me/6285608890886?text=" + encodeURIComponent("Haii Elsa! Aku tertarik buat ngobrol soal kolaborasi nih 👋"),
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: "#25D366",
    bgLight: "rgba(37,211,102,0.12)",
    cta: true, // ini yang jadi button utama
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@elsanala_",
    href: "https://www.instagram.com/elsanala_/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    color: "#E1306C",
    bgLight: "rgba(225,48,108,0.1)",
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@urfvelsaa",
    href: "https://www.tiktok.com/@urfvelsaa",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.52V6.75a4.85 4.85 0 01-1.02-.06z"/>
      </svg>
    ),
    color: "#010101",
    bgLight: "rgba(1,1,1,0.08)",
  },
];

const MARQUEE_ITEMS = [
  "Let's Talk ✦", "Public Speaking ✦", "Yuk Ngobrol ✦",
  "Hire Elsa ✦", "Let's Collab ✦", "Say Hi ✦",
];

const BADGES = [
  { text: "Open for Collab 🤝", x: "6%",  y: "22%", rotate: "-5deg", delay: "0s"   },
  { text: "DM me bestie 💬",    x: "70%", y: "14%", rotate: "4deg",  delay: "0.4s" },
  { text: "Available now ✅",   x: "74%", y: "66%", rotate: "-3deg", delay: "0.8s" },
  { text: "Let's vibe 🎤",      x: "4%",  y: "70%", rotate: "5deg",  delay: "1.2s" },
];

// ── CUSTOM CURSOR ─────────────────────────────────────────────────────────────
const useCursor = (sectionRef) => {
  const move = (e) => {
    const el = document.getElementById("cta-cursor-el");
    if (el) { el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px"; }
  };
  const enter = () => {
    const el = document.getElementById("cta-cursor-el");
    if (el) el.classList.add("visible");
  };
  const leave = () => {
    const el = document.getElementById("cta-cursor-el");
    if (el) el.classList.remove("visible", "big");
  };
  return { move, enter, leave };
};

// ── CTA SECTION ───────────────────────────────────────────────────────────────
const CtaSection = () => {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const rippleId = useRef(0);
  const { move, enter, leave } = useCursor(sectionRef);

  const handleMouseMove = (e) => {
    move(e);
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width  - 0.5) * 18,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 10,
    });
  };

  const handleClick = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    const id = rippleId.current++;
    setRipples(p => [...p, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 900);
  };

  const waLink = SOCMED.find(s => s.id === "whatsapp").href;

  return (
    <section
      ref={sectionRef}
      className="cta-section"
      onMouseMove={handleMouseMove}
      onMouseEnter={enter}
      onMouseLeave={() => { leave(); setMousePos({ x: 0, y: 0 }); }}
      onClick={handleClick}
    >
      <div className="cta-noise" />
      <div className="cta-grid" />

      {ripples.map(r => (
        <div key={r.id} className="cta-ripple" style={{ left: r.x, top: r.y }} />
      ))}

      {BADGES.map((b, i) => (
        <div key={i} className="cta-badge"
          style={{ left: b.x, top: b.y, "--rotate": b.rotate, animationDelay: b.delay }}>
          {b.text}
        </div>
      ))}

      {/* Top marquee */}
      <MarqueeBar />

      {/* Main */}
      <div className="cta-main">
        <div className="cta-eyebrow">
          <span className="eyebrow-dot" />
          Available untuk ngobrol sekarang
        </div>

        <h2 className="cta-heading"
          style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}>
          <span style={{ display: "block" }}>Punya event?</span>
          <span style={{ display: "block" }}>
            <span className="line-accent line-em">Elsa</span> siap
          </span>
          <span style={{ display: "block" }}>tampil buat Kamu.</span>
        </h2>

        <p className="cta-sub">
          Butuh MC, moderator, atau public speaker buat acara lo?
          Chat langsung aja — no ribet, no formal, enjoy saja. ✨
        </p>

        {/* Primary WA button */}
        <div className="cta-btn-group">
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="cta-btn-primary"
            onMouseEnter={() => { const el = document.getElementById("cta-cursor-el"); if (el) el.classList.add("big"); }}
            onMouseLeave={() => { const el = document.getElementById("cta-cursor-el"); if (el) el.classList.remove("big"); }}>
            <span className="cta-btn-icon">💬</span>
            Chat di WhatsApp
          </a>
          <span className="cta-btn-hint">saya akan membalas dalam beberapa</span>
        </div>

        {/* Divider */}
        <div className="cta-divider">
          <span className="cta-divider-line" />
          <span className="cta-divider-text">atau temuin Elsa di sini</span>
          <span className="cta-divider-line" />
        </div>

        {/* Social links */}
        <div className="cta-socmed-row">
          {SOCMED.filter(s => !s.cta).map(s => (
            <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer"
              className="cta-socmed-chip"
              style={{ "--chip-color": s.color, "--chip-bg": s.bgLight }}>
              <span className="chip-icon">{s.icon}</span>
              <span className="chip-info">
                <span className="chip-label">{s.label}</span>
                <span className="chip-handle">{s.handle}</span>
              </span>
              <svg className="chip-arrow" viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom marquee reversed */}
      <MarqueeBar reverse />
    </section>
  );
};

const MarqueeBar = ({ reverse }) => (
  <div className="cta-marquee-wrapper" style={reverse ? { transform: "scaleX(-1)" } : {}}>
    <div className="cta-marquee-track" style={reverse ? { animationDuration: "22s" } : {}}>
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span key={i} className="cta-marquee-item"
          style={reverse ? { display: "inline-block", transform: "scaleX(-1)" } : {}}>
          {item}
        </span>
      ))}
    </div>
  </div>
);

// ── FOOTER ────────────────────────────────────────────────────────────────────
const Footer = () => {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: "Home",          href: "#home"          },
    { label: "About",         href: "#about"         },
    { label: "Achievements",  href: "#achievements"  },
    { label: "Projects",      href: "#projects"      },
    { label: "Contact",       href: "#contact"       },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* ── TOP: big name + tagline ── */}
        <div className="footer-top">
          <div className="footer-name-block">
            <p className="footer-eyebrow">Personal Branding</p>
            <h2 className="footer-name">Elsa</h2>
            <p className="footer-tagline">
              Public Speaker · MC · Moderator
            </p>
          </div>

          {/* Nav links */}
          <nav className="footer-nav">
            <p className="footer-nav-label">Sitemap</p>
            <ul className="footer-nav-list">
              {navLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="footer-nav-link">
                    <span className="nav-link-arrow">↗</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socmed */}
          <div className="footer-socmed-block">
            <p className="footer-nav-label">Find me</p>
            <div className="footer-socmed-list">
              {SOCMED.map(s => (
                <a key={s.id} href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  className="footer-socmed-link"
                  style={{ "--s-color": s.color }}>
                  <span className="footer-socmed-icon">{s.icon}</span>
                  <div className="footer-socmed-info">
                    <span className="footer-socmed-name">{s.label}</span>
                    <span className="footer-socmed-handle">{s.handle}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="footer-bottom">
          <span className="footer-copy">© {year} Elsa Nala. All rights reserved.</span>
          <span className="footer-credit">
            Built with 💚 by{" "}
            <a href="https://setyasa.com" target="_blank" rel="noopener noreferrer"
              className="footer-credit-link">
              Setyasa Web Studio
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

// ── STYLES ────────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;1,700&family=DM+Mono:wght@400;500&display=swap');

    /* ════════════════════════════════
       CTA SECTION
    ════════════════════════════════ */
    .cta-section {
      position: relative;
      background: #38DD88;
      overflow: hidden;
      cursor: none;
      font-family: 'DM Sans', sans-serif;
    }

    /* Cursor */
    #cta-cursor-el {
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      width: 48px; height: 48px;
      border-radius: 50%;
      background: #1a1a1a;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), opacity 0.15s;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px;
      opacity: 0;
    }
    #cta-cursor-el.visible {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    #cta-cursor-el.big {
      transform: translate(-50%, -50%) scale(2.4);
    }

    /* Texture + grid */
    .cta-noise {
      position: absolute; inset: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
      opacity: 0.3; mix-blend-mode: overlay;
    }
    .cta-grid {
      position: absolute; inset: 0; pointer-events: none;
      background-image:
        linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    /* Ripple */
    .cta-ripple {
      position: absolute; border-radius: 50%;
      background: rgba(255,255,255,0.2);
      width: 10px; height: 10px;
      margin-left: -5px; margin-top: -5px;
      transform: scale(0); pointer-events: none;
      animation: rippleOut 0.9s ease-out forwards;
    }
    @keyframes rippleOut { to { transform: scale(120); opacity: 0; } }

    /* Marquee */
    .cta-marquee-wrapper {
      width: 100%; overflow: hidden;
      padding: 1.1rem 0;
      border-top: 1.5px solid rgba(0,0,0,0.1);
      border-bottom: 1.5px solid rgba(0,0,0,0.1);
      background: rgba(0,0,0,0.04);
    }
    .cta-marquee-track {
      display: flex; width: max-content;
      animation: marqueeScroll 18s linear infinite;
    }
    .cta-marquee-wrapper:hover .cta-marquee-track { animation-play-state: paused; }
    @keyframes marqueeScroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .cta-marquee-item {
      font-family: 'Syne', sans-serif;
      font-size: 0.75rem; font-weight: 700;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: rgba(0,0,0,0.4); padding: 0 2.5rem; white-space: nowrap;
    }

    /* Floating badges */
    .cta-badge {
      position: absolute; z-index: 3;
      background: #fff; color: #1a1a1a;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.72rem; font-weight: 500;
      padding: 0.4rem 0.9rem; border-radius: 99px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      white-space: nowrap; pointer-events: none;
      animation: floatBadge 3.2s ease-in-out infinite;
    }
    .cta-badge:nth-child(2) { animation-delay: -0.9s; }
    .cta-badge:nth-child(3) { animation-delay: -1.8s; }
    .cta-badge:nth-child(4) { animation-delay: -2.7s; }
    @keyframes floatBadge {
      0%,100% { transform: translateY(0) rotate(var(--rotate,0deg)); }
      50%      { transform: translateY(-9px) rotate(var(--rotate,0deg)); }
    }

    /* Main */
    .cta-main {
      position: relative; z-index: 2;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 4.5rem 5vw 4rem;
      text-align: center; gap: 1.75rem;
    }

    /* Eyebrow */
    .cta-eyebrow {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: rgba(0,0,0,0.08);
      border: 1.5px solid rgba(0,0,0,0.12);
      border-radius: 99px; padding: 0.35rem 1rem;
      font-size: 0.68rem; font-weight: 500;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(0,0,0,0.5);
    }
    .eyebrow-dot {
      width: 6px; height: 6px; background: #1a1a1a;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%,100% { opacity: 1; transform: scale(1); }
      50%     { opacity: 0.35; transform: scale(0.65); }
    }

    /* Heading */
    .cta-heading {
      font-family: 'Syne', sans-serif;
      font-size: clamp(3.2rem, 9vw, 7.5rem);
      font-weight: 800; line-height: 0.95;
      color: #1a1a1a; margin: 0;
      letter-spacing: -0.03em;
      transition: transform 0.08s ease;
      user-select: none;
    }
    .line-accent {
      display: inline-block; color: #fff;
      -webkit-text-stroke: 2.5px #1a1a1a;
      text-shadow: 3px 3px 0 #1a1a1a, -1px -1px 0 #1a1a1a;
    }
    .line-em { font-style: italic; }

    /* Sub */
    .cta-sub {
      font-size: 1rem; color: rgba(0,0,0,0.5);
      max-width: 400px; line-height: 1.7; margin: 0;
    }

    /* Primary button */
    .cta-btn-group {
      display: flex; flex-direction: column;
      align-items: center; gap: 0.6rem;
    }
    .cta-btn-primary {
      display: inline-flex; align-items: center; gap: 0.7rem;
      background: #1a1a1a; color: #38DD88;
      text-decoration: none;
      font-family: 'Syne', sans-serif;
      font-size: 1.05rem; font-weight: 700;
      padding: 1rem 2.25rem; border-radius: 99px;
      cursor: none; position: relative; overflow: hidden;
      box-shadow: 0 4px 28px rgba(0,0,0,0.22);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .cta-btn-primary:hover {
      transform: translateY(-3px) scale(1.03);
      box-shadow: 0 14px 40px rgba(0,0,0,0.3);
    }
    .cta-btn-primary:active { transform: scale(0.98); }
    .cta-btn-icon { font-size: 1.2rem; transition: transform 0.3s ease; }
    .cta-btn-primary:hover .cta-btn-icon { transform: rotate(12deg) scale(1.2); }
    .cta-btn-primary::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(105deg, transparent 40%, rgba(56,221,136,0.12) 50%, transparent 60%);
      background-size: 200%; background-position: 200%;
      transition: background-position 0.5s ease;
    }
    .cta-btn-primary:hover::after { background-position: -50%; }
    .cta-btn-hint {
      font-size: 0.68rem; color: rgba(0,0,0,0.38); letter-spacing: 0.06em;
    }

    /* Divider */
    .cta-divider {
      display: flex; align-items: center; gap: 1rem;
      width: 100%; max-width: 480px;
    }
    .cta-divider-line {
      flex: 1; height: 1px; background: rgba(0,0,0,0.15);
    }
    .cta-divider-text {
      font-size: 0.68rem; color: rgba(0,0,0,0.45);
      letter-spacing: 0.1em; white-space: nowrap;
    }

    /* Socmed chips */
    .cta-socmed-row {
      display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center;
    }
    .cta-socmed-chip {
      display: inline-flex; align-items: center; gap: 0.65rem;
      background: rgba(255,255,255,0.7);
      border: 1.5px solid rgba(0,0,0,0.1);
      border-radius: 99px; padding: 0.55rem 1.1rem 0.55rem 0.7rem;
      text-decoration: none; cursor: none;
      transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
      backdrop-filter: blur(8px);
    }
    .cta-socmed-chip:hover {
      background: rgba(255,255,255,0.95);
      border-color: var(--chip-color);
      transform: translateY(-2px);
    }
    .chip-icon {
      color: var(--chip-color);
      display: flex; align-items: center; justify-content: center;
      background: var(--chip-bg);
      width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
    }
    .chip-info {
      display: flex; flex-direction: column; gap: 0.05rem;
    }
    .chip-label {
      font-size: 0.6rem; font-weight: 500;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: rgba(0,0,0,0.4); line-height: 1;
    }
    .chip-handle {
      font-size: 0.82rem; font-weight: 600;
      color: #1a1a1a; line-height: 1.2;
    }
    .chip-arrow {
      color: rgba(0,0,0,0.3); margin-left: 0.25rem;
      transition: transform 0.2s ease;
    }
    .cta-socmed-chip:hover .chip-arrow {
      transform: translate(2px, -2px);
      color: var(--chip-color);
    }

    /* ════════════════════════════════
       FOOTER
    ════════════════════════════════ */
    .footer {
      background: #0f0f0f;
      border-top: 1px solid rgba(255,255,255,0.06);
      font-family: 'DM Sans', sans-serif;
    }
    .footer-inner {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 5vw;
    }

    /* Footer top */
    .footer-top {
      display: grid;
      grid-template-columns: 1fr auto auto;
      gap: 4rem;
      padding: 4rem 0 3rem;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      align-items: start;
    }

    /* Name block */
    .footer-eyebrow {
      font-size: 0.6rem; font-weight: 500;
      letter-spacing: 0.2em; text-transform: uppercase;
      color: #38DD88; margin: 0 0 0.5rem;
    }
    .footer-name {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800; color: #f0ede8;
      margin: 0 0 0.5rem;
      letter-spacing: -0.03em; line-height: 1;
    }
    .footer-tagline {
      font-size: 0.82rem; color: rgba(240,237,232,0.4);
      margin: 0; letter-spacing: 0.04em;
    }

    /* Nav */
    .footer-nav-label {
      font-size: 0.58rem; font-weight: 500;
      letter-spacing: 0.2em; text-transform: uppercase;
      color: rgba(240,237,232,0.3); margin: 0 0 1.1rem;
    }
    .footer-nav-list {
      list-style: none; margin: 0; padding: 0;
      display: flex; flex-direction: column; gap: 0.55rem;
    }
    .footer-nav-link {
      display: inline-flex; align-items: center; gap: 0.4rem;
      font-size: 0.9rem; color: rgba(240,237,232,0.6);
      text-decoration: none;
      transition: color 0.2s ease, gap 0.2s ease;
    }
    .footer-nav-link:hover { color: #38DD88; gap: 0.6rem; }
    .nav-link-arrow {
      font-size: 0.7rem; opacity: 0;
      transition: opacity 0.2s ease;
    }
    .footer-nav-link:hover .nav-link-arrow { opacity: 1; }

    /* Socmed */
    .footer-socmed-list {
      display: flex; flex-direction: column; gap: 0.75rem;
    }
    .footer-socmed-link {
      display: flex; align-items: center; gap: 0.75rem;
      text-decoration: none; padding: 0.5rem 0.75rem;
      border-radius: 10px;
      transition: background 0.2s ease;
    }
    .footer-socmed-link:hover { background: rgba(255,255,255,0.04); }
    .footer-socmed-icon {
      color: var(--s-color);
      display: flex; align-items: center;
      background: rgba(255,255,255,0.05);
      width: 34px; height: 34px; border-radius: 8px;
      justify-content: center; flex-shrink: 0;
      transition: background 0.2s ease;
    }
    .footer-socmed-link:hover .footer-socmed-icon {
      background: rgba(255,255,255,0.08);
    }
    .footer-socmed-info {
      display: flex; flex-direction: column; gap: 0.05rem;
    }
    .footer-socmed-name {
      font-size: 0.58rem; font-weight: 500;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(240,237,232,0.3); line-height: 1;
    }
    .footer-socmed-handle {
      font-size: 0.85rem; font-weight: 500;
      color: rgba(240,237,232,0.7); line-height: 1.3;
    }

    /* Bottom bar */
    .footer-bottom {
      display: flex; justify-content: space-between; align-items: center;
      padding: 1.25rem 0;
      font-size: 0.72rem; color: rgba(240,237,232,0.25);
      letter-spacing: 0.04em; gap: 1rem; flex-wrap: wrap;
    }
    .footer-credit-link {
      color: #38DD88; text-decoration: none;
      transition: opacity 0.2s ease;
    }
    .footer-credit-link:hover { opacity: 0.7; }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      .cta-badge { display: none; }
      .cta-main { padding: 3rem 6vw; }
      .cta-socmed-row { flex-direction: column; align-items: center; }
      .footer-top {
        grid-template-columns: 1fr;
        gap: 2.5rem; padding: 3rem 0 2.5rem;
      }
      .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
    }
  `}</style>
);

// ── EXPORT: gabungan CTA + Footer ─────────────────────────────────────────────
const CtaAndFooter = () => (
  <>
    <Styles />
    {/* Custom cursor — rendered sekali di luar section */}
    <div id="cta-cursor-el">💬</div>
    <CtaSection />
    <Footer />
  </>
);

export default CtaAndFooter;