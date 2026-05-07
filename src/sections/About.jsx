import React from "react";
import profileImg from "../assets/profile.png";

const About = () => {
  return (
    <section
      id="about"
      className="w-full scroll-mt-20 rounded-b-[25px] bg-gradient-to-l from-[#22C872] to-[#00FF88] px-5 py-5 md:rounded-b-none lg:px-10 lg:py-10 xl:py-12 2xl:py-14"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-stretch gap-4 lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] lg:items-center lg:gap-8 xl:max-w-[88rem] xl:gap-12 2xl:max-w-[104rem]">
        <div className="flex w-full items-center gap-[15px] lg:gap-7 xl:gap-9">
          <div className="h-[75px] w-[75px] flex-shrink-0 overflow-hidden rounded-full border border-[#0E8748] sm:h-24 sm:w-24 lg:h-36 lg:w-36 xl:h-44 xl:w-44 2xl:h-52 2xl:w-52">
            <img
              src={profileImg}
              alt="Portrait of Elsa Nala"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center gap-[5px] lg:max-w-3xl lg:gap-3 xl:max-w-4xl">
            <h3 className="font-outfit text-[20px] font-bold leading-[24px] tracking-[-0.02em] text-[#0E8748] sm:text-2xl lg:text-4xl lg:leading-tight xl:text-5xl">
              Siapa Elsa?
            </h3>

            <p className="text-[14px] leading-[17px] text-[#0E8748] sm:text-base sm:leading-6 lg:text-lg lg:leading-8 xl:text-xl xl:leading-9">
              Saya merupakan seorang mahasiswa UINSA yang memiliki minat pada dunia public speaking. Minat ini telah saya kembangkan sejak dari bangku SMA, sehingga cukup banyak pengalaman public speaking yang telah saya lalui.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between rounded-xl border border-[#0E8748] bg-[#13A057] px-[30px] py-[5px] lg:min-h-32 lg:px-8 xl:min-h-36 xl:px-10">
          <div className="flex flex-col items-center text-center text-white">
            <span className="text-[14px] font-bold leading-[17px] lg:text-2xl lg:leading-tight xl:text-3xl">
              4+ years
            </span>
            <span className="text-[12px] leading-[15px] lg:text-sm xl:text-base">
              experiences
            </span>
          </div>

          <div className="h-[20px] w-[1px] bg-[#0E8748] lg:h-16"></div>

          <div className="flex flex-col items-center text-center text-white">
            <span className="text-[14px] font-bold leading-[17px] lg:text-2xl lg:leading-tight xl:text-3xl">
              100+
            </span>
            <span className="text-[12px] leading-[15px] lg:text-sm xl:text-base">
              clients
            </span>
          </div>

          <div className="h-[20px] w-[1px] bg-[#0E8748] lg:h-16"></div>

          <div className="flex flex-col items-center text-center text-white">
            <span className="text-[14px] font-bold leading-[17px] lg:text-2xl lg:leading-tight xl:text-3xl">
              CPSP
            </span>
            <span className="text-[12px] leading-[15px] lg:text-sm xl:text-base">
              certified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
