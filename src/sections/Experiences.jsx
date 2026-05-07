import React, { useRef, useEffect, useState } from "react";
import service4Img from "../assets/service4.jpg";
import expImg2 from "../assets/exp2.jpg";

// 🔹 DATA (FIXED)
const experiences = [
  {
    title: "PASKIBRAKA",
    image: service4Img,
    periods: [
      {
        label: "2022-2023",
        role: {
          title: "JABATAN 1",
          desc: ["Lorem", "Lorem", "Lorem"]
        }
      },
      {
        label: "2023-2024",
        role: {
          title: "JABATAN 2",
          desc: ["Lorem", "Lorem", "Lorem"]
        }
      }
    ]
  },
  {
    title: "PRAMUKA",
    image: expImg2,
    periods: [
      {
        label: "2022-2023",
        role: {
          title: "JABATAN 1",
          desc: ["Lorem", "Lorem", "Lorem"]
        }
      },
      {
        label: "2023-2024",
        role: {
          title: "JABATAN 2",
          desc: ["Lorem", "Lorem", "Lorem"]
        }
      }
    ]
  },
  {
    title: "UINSA PUBLIC SPEAKING",
    image: service4Img,
    periods: [
      {
        label: "2025-Now",
        role: {
          title: "JABATAN",
          desc: ["Lorem", "Lorem", "Lorem"]
        }
      }
    ]
  },
  {
    title: "UINSA TV",
    image: expImg2,
    periods: [
      {
        label: "2025-Now",
        role: {
          title: "JABATAN",
          desc: ["Lorem", "Lorem", "Lorem"]
        }
      }
    ]
  }
];


// 🔹 TIMELINE (FIXED: SINGLE ROLE)
const Timeline = ({ role }) => {
  return (
    <div className="space-y-4 mt-4">

      {/* JABATAN */}
      <h4 className="font-bold text-white mb-2">
        {role.title}
      </h4>

      {/* LIST */}
    <div className="relative">
        {role.desc.map((item, j) => (
            <div key={j} className="flex items-start gap-3 relative mb-4 last:mb-0">

                {/* DOT */}
                <div className="relative flex flex-col items-center">
                    <span className="w-2 h-2 bg-[#1BB867] rounded-full mt-[6px]"></span>

                {/* LINE */}
                {j !== role.desc.length - 1 && (
                    <span className="w-[2px] flex-1 bg-[#1BB867]/40 mt-1"></span>
                )}
                </div>

                {/* TEXT */}
                <p className="text-sm text-gray-300 leading-relaxed">
                    {item}
                </p>

    </div>
  ))}
</div>

    </div>
  );
};


// 🔹 CARD
const Card = ({ data, isActive }) => {
  const [activePeriod, setActivePeriod] = useState(0);

  return (
    <div
      className={`min-w-[280px] max-w-[280px] rounded-2xl p-4 transition-all duration-500
      ${isActive 
        ? "scale-100 border border-[#1BB867] shadow-[0_0_25px_rgba(27,184,103,0.4)]" 
        : "scale-90 grayscale opacity-60"
      } bg-[#1f1f1f]`}
    >
      
      {/* IMAGE */}
      <div className="w-full aspect-square rounded-xl overflow-hidden mb-4">
        <img src={data.image} alt={`${data.title} experience`} className="w-full h-full object-cover" loading="lazy" />
      </div>

      {/* TITLE */}
      <h3 className="text-white font-bold text-lg mb-3">
        {data.title}
      </h3>

      {/* PERIOD BUTTON */}
      <div className="flex gap-2 flex-wrap">
        {data.periods.map((p, i) => (
          <button
            key={i}
            onClick={() => setActivePeriod(i)}
            className={`px-3 py-1 rounded-full text-xs transition
              ${i === activePeriod 
                ? "bg-[#1BB867] text-white" 
                : "bg-[#1BB867]/20 text-[#1BB867]"
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* DESCRIPTION (FIXED) */}
      <div className="mt-3 animate-fadeIn">
        <Timeline role={data.periods[activePeriod].role} />
      </div>
    </div>
  );
};


// 🔹 MAIN SECTION (UNCHANGED)
const Experiences = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);
  const headingText = "Working Experiences";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const children = [...container.children];
      const center = container.scrollLeft + container.offsetWidth / 2;

      let closest = 0;
      let closestDistance = Infinity;

      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(center - childCenter);

        if (distance < closestDistance) {
          closest = i;
          closestDistance = distance;
        }
      });

      setActiveIndex(closest);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCard = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const children = [...container.children];
    const target = children[index];
    if (!target) return;

    const left = target.offsetLeft - (container.offsetWidth - target.offsetWidth) / 2;
    container.scrollTo({ left, behavior: "smooth" });
  };

  const moveCarousel = (direction) => {
    const nextIndex =
      direction === "next"
        ? (activeIndex + 1) % experiences.length
        : (activeIndex - 1 + experiences.length) % experiences.length;

    scrollToCard(nextIndex);
  };

  useEffect(() => {
    if (isPaused) return;

    autoScrollRef.current = setInterval(() => {
      setActiveIndex((current) => {
        const nextIndex = (current + 1) % experiences.length;
        scrollToCard(nextIndex);
        return nextIndex;
      });
    }, 3200);

    return () => clearInterval(autoScrollRef.current);
  }, [isPaused]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experiences" ref={sectionRef} className="w-full bg-[#292929] py-14 flex flex-col gap-8 scroll-mt-20">
      <style>{`
        .experiences-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .experiences-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .experiences-typing {
          display: inline-block;
          white-space: nowrap;
        }

        .experiences-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(10px);
        }

        .experiences-typing.is-visible .experiences-letter {
          animation: experiencesLetterIn 0.35s ease forwards;
          animation-delay: calc(var(--letter-index) * 0.055s);
        }

        @keyframes experiencesLetterIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* TITLE */}
      <h2 className="text-center text-[#38DD88] text-2xl font-semibold min-h-[2rem]">
        <span className={`experiences-typing ${headingVisible ? "is-visible" : ""}`} aria-label={headingText}>
          {headingText.split("").map((char, i) => (
            <span
              key={`${char}-${i}`}
              aria-hidden="true"
              className="experiences-letter"
              style={{ "--letter-index": i }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </h2>

      {/* SCROLL AREA */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="experiences-scrollbar flex gap-6 overflow-x-auto px-[calc(50%_-_140px)] snap-x snap-mandatory scroll-smooth"
      >
        {experiences.map((exp, i) => (
          <div key={i} className="snap-center flex-shrink-0">
            <Card data={exp} isActive={i === activeIndex} />
          </div>
        ))}
      </div>

      {/* ARROW HINT */}
      <div className="flex items-center justify-center gap-4 text-[#38DD88]">
        <button
          type="button"
          aria-label="Previous experience"
          onClick={() => moveCarousel("prev")}
          className="w-9 h-9 rounded-full border border-[#38DD88]/40 text-xl leading-none hover:bg-[#38DD88] hover:text-[#292929] transition"
        >
          ‹
        </button>

        <span className="h-px w-12 bg-[#38DD88]/35" />

        <button
          type="button"
          aria-label="Next experience"
          onClick={() => moveCarousel("next")}
          className="w-9 h-9 rounded-full border border-[#38DD88]/40 text-xl leading-none hover:bg-[#38DD88] hover:text-[#292929] transition"
        >
          ›
        </button>
      </div>

    </section>
  );
};

export default Experiences;
