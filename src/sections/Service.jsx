import React from "react";
import service1Img from "../assets/service1.jpg";
import service2Img from "../assets/service2.jpg";
import service3Img from "../assets/service3.jpg";
import service4Img from "../assets/service4.jpg";

// 🔹 Reusable Card Component
const ServiceCard = ({ image, title, tags }) => {
  return (
    <div className="w-full flex items-center gap-4 
                    bg-white rounded-full p-[5px] pr-6
                    shadow-[0_4px_6.7px_rgba(0,0,0,0.25)]
                    hover:scale-[1.02] transition duration-300">

      {/* IMAGE */}
      <div className="w-[75px] h-[75px] rounded-full overflow-hidden border border-[#0E8748] flex-shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col gap-1">
        
        {/* TITLE */}
        <h3 className="text-[#1BB867] font-bold text-[22px] leading-none">
          {title}
        </h3>

        {/* TAGS */}
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {tags.map((tag, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-[8px] h-[8px] bg-[#1BB867] rounded-full"></div>
              <span className="text-[#292929] text-xs font-medium">
                {tag}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};


// 🔹 Main Section
const Services = () => {
  return (
    <section className="w-full bg-[#292929] px-5 py-12 flex flex-col items-center gap-6">

      {/* TITLE */}
      <h2 className="text-[#38DD88] text-[26px] font-medium">
        My Services
      </h2>

      {/* LIST */}
      <div className="w-full max-w-md flex flex-col gap-4">

        <ServiceCard
          image={service1Img}
          title="MC"
          tags={["Formal", "Informal", "Pemerintah"]}
        />

        <ServiceCard
          image={service2Img}
          title="Moderator"
          tags={["Debat", "Seminar", "Kajian Islam"]}
        />

        <ServiceCard
          image={service3Img}
          title="Host / Presenter"
          tags={["TV", "Sosial Media", "Radio"]}
        />

        <ServiceCard
          image={service4Img}
          title="Speaker"
          tags={["LDKS", "Pramuka", "Paskibraka"]}
        />

      </div>
    </section>
  );
};

export default Services;