import React from "react";
import heroImg from "../assets/heroicon.png";

const whatsappLink = "https://wa.me/6285608890886";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex w-full items-start justify-center overflow-hidden bg-[#292929] px-4 pt-16 scroll-mt-20 sm:px-6 lg:min-h-[700px] lg:items-end lg:px-10 lg:pt-20 xl:min-h-[760px] 2xl:min-h-[820px]"
    >
      <div className="grid w-full max-w-7xl items-end gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] xl:max-w-[88rem] xl:gap-12 2xl:max-w-[104rem] 2xl:gap-16">
        <div className="relative z-10 self-start pt-2 pb-6 sm:pt-6 sm:pb-10 lg:pt-10 lg:pb-0 xl:pt-12 2xl:pt-14">
          <h1 className="font-outfit text-[clamp(3rem,9vw,7.75rem)] font-bold leading-[0.95] tracking-tight text-white xl:text-[clamp(6rem,7.5vw,9.5rem)] 2xl:text-[clamp(7rem,7vw,11rem)]">
            <span className="block text-[clamp(1.5rem,2.4vw,2.5rem)] font-light opacity-0 animate-[fadeUp_.8s_ease_forwards]">
              Hi, Saya <span className="font-pacifico text-[#50E99A]">Elsa</span>
            </span>

            <span className="block opacity-0 animate-[fadeUp_.8s_.2s_ease_forwards]">
              Public Speaking
            </span>

            <span className="block text-[#50E99A] opacity-0 animate-[fadeUp_.8s_.4s_ease_forwards]">
              is My Identity
            </span>
          </h1>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-5 inline-block overflow-hidden rounded-full bg-[#22C872] px-8 py-2 text-lg font-light text-white opacity-0 shadow-lg animate-[fadeUp_.8s_.6s_ease_forwards] xl:mt-7 xl:px-10 xl:py-3 xl:text-xl"
          >
            <span className="relative z-10">Book me!</span>
            <div className="absolute inset-0 translate-y-full bg-yellow-400 transition duration-500 group-hover:translate-y-0"></div>
          </a>
        </div>

        <div className="pointer-events-none relative mx-auto flex w-full max-w-[360px] justify-center sm:max-w-[430px] md:max-w-[520px] lg:mx-0 lg:max-w-none lg:justify-end">
          <img
            src={heroImg}
            alt="Elsa Nala public speaker"
            className="h-auto max-h-[52vh] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] sm:max-h-[58vh] lg:max-h-[640px] xl:max-h-[700px] 2xl:max-h-[760px]"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
