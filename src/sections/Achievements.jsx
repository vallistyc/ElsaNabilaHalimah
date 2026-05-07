import React, { useRef, useEffect } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";

import img1 from "../assets/ach1.jpg";
import img2 from "../assets/ach2.jpg";
import img3 from "../assets/ach3.jpg";

const achievements = [
  { title: "Tarik Tambang",   image: img1, rank: "1" },
  { title: "Lomba Debat",     image: img2, rank: "2" },
  { title: "Public Speaking", image: img3, rank: "1" },
];

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// ─── FLIP MATH ────────────────────────────────────────────────────────────────
//
// globalAngle: 0 → totalSheets * 180
//
// Setiap "lembar" k mendapat giliran saat globalAngle ada di [k*180 .. (k+1)*180].
// Di luar range itu: diam di 0° (belum giliran) atau -180° (sudah selesai).
//
//   localProgress = globalAngle - k * 180
//   rotateY = -(clamp(localProgress, 0, 180))
//
//   k=0 (cover), globalAngle=0   → local=0    → rotateY=0      ✓ tegak
//   k=0 (cover), globalAngle=90  → local=90   → rotateY=-90    ✓ setengah flip
//   k=0 (cover), globalAngle=180 → local=180  → rotateY=-180   ✓ terbuka penuh
//   k=1 (page1), globalAngle=0   → local=-180 → clamp→0 → rotateY=0  ✓ diam
//   k=1 (page1), globalAngle=180 → local=0    → rotateY=0      ✓ mulai flip
//   k=1 (page1), globalAngle=270 → local=90   → rotateY=-90    ✓ setengah
//   k=1 (page1), globalAngle=360 → local=180  → rotateY=-180   ✓ selesai

const getSheetRotation = (globalAngle, k) => {
  const local = globalAngle - k * 180;
  return -clamp(local, 0, 180);
};

// Z-index: lembar yang sedang aktif di-flip → paling atas
const getSheetZ = (globalAngle, k, totalSheets) => {
  const local = globalAngle - k * 180;
  if (local <= 0)   return totalSheets - k;   // belum giliran → urutan depan
  if (local >= 180) return k;                  // sudah selesai → terlempar ke belakang
  return totalSheets * 2;                      // sedang flip   → paling atas
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

// Dot indikator — tiap dot mewakili satu achievement
const Dot = ({ globalAngle, segmentIndex }) => {
  // Menyala saat segment segmentIndex+1 aktif (cover = segment 0, page i = segment i+1)
  const k = segmentIndex + 1;
  const opacity = useTransform(
    globalAngle,
    [k * 180 - 90, k * 180, (k + 1) * 180, (k + 1) * 180 + 90],
    [0.2, 1, 1, 0.2]
  );
  return (
    <motion.div
      style={{
        width: 7, height: 7,
        borderRadius: "50%",
        background: "#38DD88",
        opacity,
        flexShrink: 0,
      }}
    />
  );
};

// Sheet: wrapper dengan transform, wraps konten halaman
const Sheet = ({ rotateY, zIndex, children }) => (
  <motion.div
    style={{
      rotateY,
      zIndex,
      position: "absolute",
      inset: 0,
      transformOrigin: "left center",
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
    }}
  >
    {children}
  </motion.div>
);

const PageContent = ({ data }) => (
  <div style={{
    width: "100%", height: "100%",
    borderRadius: "1rem",
    background: "#ffffff",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "1.5rem",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    overflow: "hidden",
  }}>
    <div style={{
      width: "100%", height: 140,
      borderRadius: "0.75rem", overflow: "hidden",
      marginBottom: "1rem", flexShrink: 0,
    }}>
      <img src={data.image} alt={`${data.title} achievement`} loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <h3 style={{
      fontSize: "1.1rem", fontWeight: 700, color: "#1a1a1a",
      textAlign: "center", lineHeight: 1.3, marginBottom: "0.25rem",
    }}>
      {data.title}
    </h3>
    <div style={{
      fontSize: "0.6rem", fontWeight: 600,
      letterSpacing: "0.12em", color: "#bbb", marginBottom: "0.25rem",
    }}>
      JUARA
    </div>
    <div style={{
      fontSize: "3.5rem", fontWeight: 900,
      color: "#38DD88", lineHeight: 1,
    }}>
      {data.rank}
    </div>
  </div>
);

const CoverContent = () => (
  <div style={{
    width: "100%", height: "100%",
    borderRadius: "1rem",
    background: "linear-gradient(135deg, #38DD88 0%, #1a9e5f 100%)",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  }}>
    <div style={{
      fontSize: "0.55rem", letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem", fontWeight: 600,
    }}>
      Portfolio
    </div>
    <div style={{
      fontSize: "1.4rem", fontWeight: 900,
      color: "#fff", letterSpacing: "0.06em",
    }}>
      PRESTASIKU
    </div>
    <div style={{
      marginTop: "1.5rem", width: 28, height: 2,
      background: "rgba(255,255,255,0.3)", borderRadius: 99,
    }} />
    <div style={{
      marginTop: "0.6rem", fontSize: "0.6rem",
      color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em",
    }}>
      scroll untuk membuka ↓
    </div>
  </div>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────

const Achievements = () => {
  const sectionRef  = useRef(null);
  const rawTarget   = useRef(0);
  const smoothed    = useRef(0);

  const total       = achievements.length;
  // Lembar = 1 cover + N pages → N+1 lembar → N+1 segmen scroll
  // +1 tambahan untuk breathing room di akhir sebelum section berikutnya
  const totalSheets = total + 1;
  const TOTAL_ANGLE = totalSheets * 180;

  const globalAngle = useMotionValue(0);

  // Cover: lembar k=0
  const coverRotateY = useTransform(globalAngle, (v) => getSheetRotation(v, 0));
  const coverZ       = useTransform(globalAngle, (v) => getSheetZ(v, 0, totalSheets));

  // Pages: lembar k=1..N
  const pageRotations = achievements.map((_, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(globalAngle, (v) => getSheetRotation(v, i + 1))
  );
  const pageZIndexes = achievements.map((_, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(globalAngle, (v) => getSheetZ(v, i + 1, totalSheets))
  );

  const progressPct = useTransform(globalAngle, [0, TOTAL_ANGLE], ["0%", "100%"]);

  useEffect(() => {
    const LERP = 0.10;

    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrollable = el.offsetHeight - window.innerHeight;
      const progress   = clamp(-el.getBoundingClientRect().top / scrollable, 0, 1);
      rawTarget.current = progress * TOTAL_ANGLE;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let rafId;
    const loop = () => {
      smoothed.current += (rawTarget.current - smoothed.current) * LERP;
      globalAngle.set(smoothed.current);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [globalAngle, TOTAL_ANGLE]);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      style={{
        position: "relative",
        // 1 segmen per lembar + 1 segmen breathing room
        height: `${(totalSheets + 1) * 100}vh`,
        background: "#292929",
      }}
    >
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
      }}>

        {/* ── BOOK ── */}
        <div style={{
          position: "relative",
          width: 300, height: 400,
          perspective: "1200px",
        }}>
          {/* Back cover (statis, paling bawah) */}
          <div style={{
            position: "absolute", inset: 0,
            background: "#111",
            borderRadius: "1rem",
            boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
          }} />

          {/* Book spine */}
          <div style={{
            position: "absolute",
            left: 0, top: "4%",
            width: 5, height: "92%",
            background: "rgba(0,0,0,0.45)",
            borderRadius: "3px 0 0 3px",
          }} />

          {/* Pages: render dari belakang ke depan
              (index tinggi = belakang, render lebih dulu)
              supaya saat belum di-flip, halaman pertama ada di depan */}
          {[...achievements].reverse().map((item, ri) => {
            const i = total - 1 - ri;
            return (
              <Sheet key={i} rotateY={pageRotations[i]} zIndex={pageZIndexes[i]}>
                <PageContent data={item} />
              </Sheet>
            );
          })}

          {/* Cover: render terakhir = default paling depan */}
          <Sheet rotateY={coverRotateY} zIndex={coverZ}>
            <CoverContent />
          </Sheet>
        </div>

        {/* ── DOTS ── */}
        <div style={{ display: "flex", gap: 8 }}>
          {achievements.map((_, i) => (
            <Dot key={i} globalAngle={globalAngle} segmentIndex={i} />
          ))}
        </div>

        {/* ── PROGRESS BAR ── */}
        <div style={{
          position: "absolute",
          bottom: 28, left: "50%",
          transform: "translateX(-50%)",
          width: 100, height: 2,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 99, overflow: "hidden",
        }}>
          <motion.div style={{
            height: "100%",
            width: progressPct,
            background: "#38DD88",
            borderRadius: 99,
          }} />
        </div>
      </div>
    </section>
  );
};

export default Achievements;
