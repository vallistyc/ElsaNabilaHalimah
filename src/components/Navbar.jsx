import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menu = ["Beranda", "Profil", "Proyek", "Kontak"];

  return (
    <nav className="fixed w-full top-0 left-0 bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="font-syne text-2xl font-extrabold text-[#0E8748]">
          Elsa
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          {menu.map((item, index) => (
            <li key={index}>
              <a href="#" className="hover:text-black transition">
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white px-4 transition-all duration-300 ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col justify-center items-center pb-4 gap-4 text-gray-700 font-medium">
          {menu.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="block hover:text-black transition"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;