import React from "react";
import heroImg from "../assets/heroicon.png";

const Hero = () => {
  return (
    <section className="bg-[#292929] relative w-full min-h-fit overflow-hidden flex items-start justify-center pt-20">

      {/* 🔥 Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-yellow-300/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-green-400/30 blur-[140px] rounded-full"></div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl w-full px-4 pt-10 
                      flex flex-col items-start text-left 
                      gap-6 ">

        {/* ✨ TEXT */}
        <h1 className="text-white font-outfit font-bold leading-[0.95] tracking-tight 
                       text-[clamp(3rem,8vw,5rem)]">

          <span className="text-3xl font-light block opacity-0 animate-[fadeUp_.8s_ease_forwards]">
            Hi, Saya <span className="text-[#50E99A] font-pacifico">Elsa</span>
          </span>

          <span className="block opacity-0 animate-[fadeUp_.8s_.2s_ease_forwards]">
            Public Speaking
          </span>

          <span className="block text-[#50E99A] opacity-0 animate-[fadeUp_.8s_.4s_ease_forwards]">
            is My Identity
          </span>
        </h1>

        {/* 🔘 CTA (NOW INLINE) */}
        <button className="px-8 py-2 bg-[#22C872] text-white font-light text-lg rounded-full 
                           relative overflow-hidden group 
                           opacity-0 animate-[fadeUp_.8s_.6s_ease_forwards] shadow-lg">

          <span className="relative z-10">Book me!</span>

          <div className="absolute inset-0 bg-yellow-400 translate-y-full 
                          group-hover:translate-y-0 transition duration-500"></div>
        </button>

        {/* 🟡 IMAGE (ABSOLUTE BOTTOM) */}
        <div className="relative bottom-0 left-1/2 -translate-x-1/3 
                        h-full sm:w-1/2 md:w-1/3 lg:w-1/4 pointer-events-none">

          <div className="relative">

            <img
              src={heroImg}
              alt="Elsa"
              className="w-auto h-full object-cover 
                        drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
            />
          </div>
      </div>
      </div>
   
    </section>
  );
};

export default Hero;