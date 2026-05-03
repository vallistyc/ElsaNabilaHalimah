import React from "react";
import profileImg from "../assets/profile.png"; // ganti sesuai asset kamu

const About = () => {
  return (
    <section
      className="
        w-full
        flex flex-col justify-center items-center
        p-5 gap-[15px]
        bg-gradient-to-l from-[#22C872] to-[#00FF88]
        rounded-b-[25px]
      "
    >
      {/* 🔥 TOP: PROFILE */}
      <div className="w-full flex items-center gap-[15px]">

        {/* IMAGE */}
        <div className="
          w-[75px] h-[75px]
          rounded-full overflow-hidden
          border border-[#0E8748]
          flex-shrink-0
        ">
          <img
            src={profileImg}
            alt="Elsa"
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT */}
        <div className="flex flex-col justify-center gap-[5px] flex-1">
          <h3 className="text-[#0E8748] font-outfit font-bold text-[20px] leading-[24px] tracking-[-0.02em]">
            Siapa Elsa?
          </h3>

          <p className="text-[#0E8748] text-[14px] leading-[17px]">
            Saya merupakan seorang mahasiswa UINSA yang memiliki minat pada dunia public speaking.
          </p>
        </div>
      </div>

      {/* 🔥 BOTTOM: STATS */}
      <div
        className="
          w-full h-[42px]
          flex items-center justify-between
          px-[30px] py-[5px]
          bg-[#13A057]
          border border-[#0E8748]
          rounded-[5px]
        "
      >

        {/* ITEM 1 */}
        <div className="flex flex-col items-center text-white text-center">
          <span className="text-[14px] font-bold leading-[17px]">
            4+ years
          </span>
          <span className="text-[12px] leading-[15px]">
            experiences
          </span>
        </div>

        {/* DIVIDER */}
        <div className="w-[1px] h-[20px] bg-[#0E8748]"></div>

        {/* ITEM 2 */}
        <div className="flex flex-col items-center text-white text-center">
          <span className="text-[14px] font-bold leading-[17px]">
            100+
          </span>
          <span className="text-[12px] leading-[15px]">
            clients
          </span>
        </div>

        {/* DIVIDER */}
        <div className="w-[1px] h-[20px] bg-[#0E8748]"></div>

        {/* ITEM 3 */}
        <div className="flex flex-col items-center text-white text-center">
          <span className="text-[14px] font-bold leading-[17px]">
            CPSP
          </span>
          <span className="text-[12px] leading-[15px]">
            certified
          </span>
        </div>
      </div>
    </section>
  );
};

export default About;