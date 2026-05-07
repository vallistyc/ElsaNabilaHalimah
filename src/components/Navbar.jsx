import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { label: "Beranda", href: "#home" },
    { label: "Profil", href: "#about" },
    { label: "Proyek", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed w-full top-0 left-0 bg-white shadow-md z-50" aria-label="Primary navigation">
      <div className="mx-auto px-10 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <a href="#home" className="font-syne text-2xl font-extrabold text-[#0E8748]" aria-label="Elsa home">
          Elsa
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          {menu.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="transition hover:text-[#22C872]">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-navigation"
        className={`md:hidden bg-white px-4 transition-all duration-300 ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col justify-center items-center pb-4 gap-4 text-gray-700 font-medium">
          {menu.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="block transition hover:text-[#22C872]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
