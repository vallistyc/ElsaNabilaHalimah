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
        <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
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
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const children = [...container.children];
      const center = container.offsetWidth / 2;

      let closest = 0;
      let closestDistance = Infinity;

      children.forEach((child, i) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
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

  return (
    <section className="w-full bg-[#292929] py-14 flex flex-col gap-8">

      {/* TITLE */}
      <h2 className="text-center text-[#38DD88] text-2xl font-semibold">
        Working Experience
      </h2>

      {/* SCROLL AREA */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto px-6 snap-x snap-mandatory scroll-smooth"
      >
        {experiences.map((exp, i) => (
          <div key={i} className="snap-center flex-shrink-0">
            <Card data={exp} isActive={i === activeIndex} />
          </div>
        ))}
      </div>

    </section>
  );
};

export default Experiences;