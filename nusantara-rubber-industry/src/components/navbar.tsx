"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./providers/cart-provider";
import ThemeToggle from "./theme-toggle";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#about" },
  { label: "Business", href: "#business" },
  { label: "Media", href: "#media" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Produk", href: "#produk" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setIsCartOpen, cartCount } = useCart();

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
        className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 font-sans glass-nav shadow-lg"
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
            <span className="text-foreground font-bold text-2xl tracking-tight">
              IKN
            </span>
            <span className="hidden sm:block text-muted text-xs leading-tight font-sans">
              Nusantara Rubber
              <br />
              Industry
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-foreground text-sm font-medium hover:text-accent-hover transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-foreground hover:text-accent-hover transition-colors duration-300"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white ring-1 ring-background">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href="/login"
              className="ml-2 px-5 py-2 text-sm font-medium text-foreground border border-border rounded hover:border-accent hover:text-accent transition-all duration-300"
            >
              Login
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Shopping Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground hover:text-accent-hover transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white ring-1 ring-background">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-foreground p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-40 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden font-sans"
            style={{ background: 'var(--overlay-bg)', backdropFilter: 'blur(24px)' }}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-foreground text-2xl font-medium hover:text-accent-hover transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 text-lg font-medium text-foreground border border-border rounded hover:border-accent hover:text-accent transition-all duration-300"
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
