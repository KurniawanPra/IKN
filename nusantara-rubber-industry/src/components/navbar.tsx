"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#about" },
  { label: "Business", href: "#business" },
  { label: "Media", href: "#media" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Produk", href: "#produk" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-500 font-sans ${
          scrolled
            ? "bg-[#0a1628]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="flex items-center gap-3"
          >
            <span className="text-[#f0f0ec] font-bold text-2xl tracking-tight">
              IKN
            </span>
            <span className="hidden sm:block text-[#f0f0ec]/70 text-sm leading-tight">
              PT. Industri Karet
              <br />
              Nusantara
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-[#f0f0ec] text-sm font-medium hover:text-[#c44040] transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/login"
              className="ml-4 px-5 py-2 text-sm font-medium text-[#f0f0ec] border border-[#f0f0ec]/40 rounded hover:border-[#c44040] hover:text-[#c44040] transition-all duration-300"
            >
              Login
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[#f0f0ec] p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#0a1628] flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-[#f0f0ec] text-2xl font-medium hover:text-[#c44040] transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 text-lg font-medium text-[#f0f0ec] border border-[#f0f0ec]/40 rounded hover:border-[#c44040] hover:text-[#c44040] transition-all duration-300"
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
