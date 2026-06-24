"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./providers/cart-provider";
import ThemeToggle from "./theme-toggle";
import InteractiveNavbar3D from "./interactive-navbar-3d";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

interface SubmenuItem {
  label: string;
  href: string;
  isExternal?: boolean;
  isForm?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  submenu?: SubmenuItem[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    submenu: [
      { label: "History", href: "/about#about-history" },
      { label: "Vision dan Mission", href: "/about#about-vision-mission" },
      { label: "Contact Us", href: "/about#about-contact" },
    ],
  },
  {
    label: "Business",
    href: "/business",
    submenu: [
      { label: "Resiprene Products", href: "/business#business-resiprene", isExternal: false },
      { label: "Rubber Article Products", href: "/business#business-rubber-articles", isExternal: false },
      { label: "Dummy Form kosong", href: "/business/ecommerce/dummy-form", isForm: false },
    ],
  },
  {
    label: "Media",
    href: "/media",
    submenu: [
      { label: "Gallery", href: "/media#media-gallery" },
      { label: "News", href: "/media#media-news" },
    ],
  },
  {
    label: "Sustainability",
    href: "/sustainability",
    submenu: [
      { label: "Certificate", href: "/sustainability#sustainability-certificate" },
      { label: "Our Customers", href: "/sustainability#sustainability-customers" },
      {
        label: "Brochure Resiprene 35",
        href: "https://drive.google.com/file/d/13KhOBIzmm9RsNHRR1NXmnbt1AM3taoyF/view?usp=drive_link",
        isExternal: true,
      },
      {
        label: "Brochure Rubber Articles",
        href: "https://drive.google.com/file/d/1NG1A0FH48M21G1UjcyI9HpBjLfj8PFdz/view?usp=drive_link",
        isExternal: true,
      },
      { label: "Whistle Blowing System", href: "/sustainability#sustainability-whistleblowing" },
      { label: "Reach Compliance", href: "/sustainability#sustainability-reach" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [dropdownX, setDropdownX] = useState<number>(0);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<Record<string, boolean>>({});
  const { setIsCartOpen, cartCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("ikn_logged_in") === "true");
      setUserEmail(localStorage.getItem("ikn_user_email") || "");
    }
  }, []);

  // Extract display name from email (part before @)
  const displayName = userEmail
    ? userEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Pengguna";
  const avatarInitial = displayName.charAt(0).toUpperCase();

  const isStorePage = pathname.startsWith("/ecommerce") || pathname === "/dashboard";
  const dropdownRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const navItemRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const leaveTimerRef = useRef<Record<number, NodeJS.Timeout | null>>({});
  const isHoveringRef = useRef<Record<number, boolean>>({});

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

  // Handle direct scroll logic on mount if there's a hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && typeof window !== "undefined") {
      const targetId = hash.replace("#", "");
      // Wait a moment for page layout/hydration to complete
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const container = document.querySelector(".snap-container") as HTMLElement;
          if (container) {
            const originalSnap = container.style.scrollSnapType;
            container.style.scrollSnapType = "none";
            gsap.to(container, {
              duration: 1.2,
              scrollTo: { y: el, offsetY: 0 },
              ease: "power3.inOut",
              onComplete: () => {
                container.style.scrollSnapType = originalSnap || "y mandatory";
              }
            });
          } else {
            gsap.to(window, {
              duration: 1.2,
              scrollTo: { y: el, offsetY: 80 },
              ease: "power3.inOut",
            });
          }
        }
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isForm?: boolean,
    isExternal?: boolean
  ) => {
    if (isExternal) {
      return;
    }

    setMobileOpen(false);

    if (isForm) {
      e.preventDefault();
      router.push(href);
      return;
    }

    e.preventDefault();

    if (!href.includes("#")) {
      const currentRoute = pathname === "" ? "/" : pathname;
      if (currentRoute === href) {
        const container = document.querySelector(".snap-container") as HTMLElement;
        if (container) {
          const originalSnap = container.style.scrollSnapType;
          container.style.scrollSnapType = "none";
          gsap.to(container, {
            duration: 1.0,
            scrollTo: { y: 0 },
            ease: "power3.inOut",
            onComplete: () => {
              container.style.scrollSnapType = originalSnap || "y mandatory";
            }
          });
        } else {
          gsap.to(window, {
            duration: 1.0,
            scrollTo: { y: 0 },
            ease: "power3.inOut",
          });
        }
        window.history.pushState(null, "", href);
      } else {
        router.push(href);
      }
      return;
    }

    const [route, targetId] = href.split("#");
    const targetRoute = route === "" ? "/" : route;
    const currentRoute = pathname === "" ? "/" : pathname;

    if (currentRoute === targetRoute) {
      const el = document.getElementById(targetId);
      if (el) {
        const container = document.querySelector(".snap-container") as HTMLElement;
        if (container) {
          const originalSnap = container.style.scrollSnapType;
          container.style.scrollSnapType = "none";
          gsap.to(container, {
            duration: 1.2,
            scrollTo: { y: el, offsetY: 0 },
            ease: "power3.inOut",
            onComplete: () => {
              container.style.scrollSnapType = originalSnap || "y mandatory";
            }
          });
        } else {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: el, offsetY: 80 },
            ease: "power3.inOut",
          });
        }
        window.history.pushState(null, "", href);
      }
    } else {
      router.push(href);
    }
  };

  const openDropdown = (index: number) => {
    if (leaveTimerRef.current[index]) {
      clearTimeout(leaveTimerRef.current[index]);
      leaveTimerRef.current[index] = null;
    }
    isHoveringRef.current[index] = true;

    // Calculate dropdown X position based on cursor/nav item position
    const navEl = navItemRefs.current[index];
    if (navEl) {
      const rect = navEl.getBoundingClientRect();
      const dropdownWidth = 240; // w-60 = 15rem = 240px
      let x = 0;

      // Clamp so dropdown doesn't overflow viewport
      const rightEdge = rect.left + dropdownWidth;
      if (rightEdge > window.innerWidth - 16) {
        x = window.innerWidth - 16 - dropdownWidth - rect.left;
      }

      setDropdownX(x);
    }

    setHoveredIndex(index);
    const el = dropdownRefs.current[index];
    if (el) {
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { opacity: 0, y: 8, display: "block" },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
      );
    }
  };

  const closeDropdown = (index: number, immediate = false) => {
    isHoveringRef.current[index] = false;

    const doClose = () => {
      if (isHoveringRef.current[index]) return; // re-entered, cancel

      const el = dropdownRefs.current[index];
      if (el) {
        gsap.to(el, {
          opacity: 0,
          y: 8,
          duration: 0.15,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
            setHoveredIndex((prev) => (prev === index ? null : prev));
          },
        });
      } else {
        setHoveredIndex((prev) => (prev === index ? null : prev));
      }
    };

    if (immediate) {
      doClose();
    } else {
      // Small delay so cursor can bridge from nav item to dropdown
      leaveTimerRef.current[index] = setTimeout(doClose, 120);
    }
  };

  const handleDropdownMouseMove = (e: React.MouseEvent, index: number) => {
    // Track cursor X within the dropdown for precise highlight
    const el = dropdownRefs.current[index];
    if (!el) return;

    // Find which submenu item the cursor is over
    const items = el.querySelectorAll<HTMLElement>("[data-submenu-item]");
    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const isOver =
        e.clientY >= itemRect.top &&
        e.clientY <= itemRect.bottom &&
        e.clientX >= itemRect.left &&
        e.clientX <= itemRect.right;
      if (isOver) {
        item.classList.add("submenu-active");
      } else {
        item.classList.remove("submenu-active");
      }
    });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 flex items-center transition-all duration-300 font-sans glass-nav shadow-lg">
        <div className="w-full max-w-7xl mx-auto px-3 md:px-6 flex items-center justify-between">
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-3 group relative"
          >
            <div className="w-12 h-12 relative shrink-0">
              <div className="absolute w-20 h-20 -top-4 -left-4 z-30 flex items-center justify-center">
                <InteractiveNavbar3D />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-bold text-lg leading-tight tracking-tight group-hover:text-accent transition-colors duration-300">
                IKN
              </span>
              <span className="hidden sm:block text-muted text-[10px] leading-tight font-sans">
                Nusantara Rubber
                <br />
                Industry
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => {
              const hasSubmenu = !!item.submenu;
              return (
                <div
                  key={item.label}
                  ref={(el) => { navItemRefs.current[index] = el; }}
                  className="relative group py-2"
                  onMouseEnter={() => hasSubmenu && openDropdown(index)}
                  onMouseLeave={() => hasSubmenu && closeDropdown(index)}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                      hoveredIndex === index
                        ? "text-accent-hover"
                        : "text-foreground hover:text-accent-hover"
                    }`}
                  >
                    {item.label}
                    {hasSubmenu && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          hoveredIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </a>

                  {hasSubmenu && (
                    <>
                      {/* Invisible bridge zone between nav item and dropdown */}
                      {hoveredIndex === index && (
                        <div
                          className="absolute left-0 right-0 top-full h-3 z-40"
                          style={{ transform: `translateX(${dropdownX}px)`, width: "240px" }}
                          onMouseEnter={() => openDropdown(index)}
                          onMouseLeave={() => closeDropdown(index)}
                        />
                      )}
                      {/* Dropdown panel */}
                      <div
                        ref={(el) => {
                          dropdownRefs.current[index] = el;
                        }}
                        className="absolute top-full z-50 rounded-md shadow-lg border border-border dropdown-glass overflow-hidden py-1.5 hidden"
                        style={{
                          opacity: 0,
                          transform: `translateX(${dropdownX}px) translateY(8px)`,
                          width: "240px",
                        }}
                        onMouseEnter={() => openDropdown(index)}
                        onMouseLeave={() => closeDropdown(index)}
                        onMouseMove={(e) => handleDropdownMouseMove(e, index)}
                      >
                        {item.submenu!.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            data-submenu-item
                            target={sub.isExternal ? "_blank" : undefined}
                            rel={sub.isExternal ? "noopener noreferrer" : undefined}
                            onClick={(e) =>
                              handleNavClick(e, sub.href, sub.isForm, sub.isExternal)
                            }
                            className="block px-4 py-2.5 text-xs font-medium text-foreground hover:bg-accent/10 hover:text-accent-hover transition-colors duration-150 cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              {sub.isExternal && (
                                <span className="w-1.5 h-1.5 rounded-full bg-rubber-red-light/60 shrink-0" />
                              )}
                              {sub.isForm && (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 shrink-0" />
                              )}
                              {sub.label}
                            </span>
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Shopping Cart Button */}
            {isStorePage && (
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
            )}

            {isLoggedIn ? (
              <Link
                href="/ecommerce"
                className="ml-2 flex items-center gap-2 px-3 py-1.5 rounded border border-border hover:border-accent/60 transition-all duration-300 group"
              >
                {/* Avatar circle with initial */}
                <span className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent text-xs font-bold shrink-0 group-hover:bg-accent/25 transition">
                  {avatarInitial}
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors max-w-[100px] truncate">
                  {displayName}
                </span>
              </Link>
            ) : (
              <GlassButton
                onClick={() => router.push("/login")}
                className="ml-2 text-sm font-medium"
                size="sm"
              >
                Login
              </GlassButton>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Shopping Cart */}
            {isStorePage && (
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
            )}

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

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 lg:hidden"
            style={{ background: "var(--overlay-bg)" }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Side Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 z-40 h-screen w-64 sm:w-72 overflow-y-auto no-scrollbar lg:hidden font-sans pt-20"
            style={{ background: "var(--bg-secondary)", borderRight: "1px solid var(--border-color)" }}
          >
            <div className="flex flex-col gap-2 py-4 px-3">
              {navItems.map((item) => {
                const hasSubmenu = !!item.submenu;
                const isOpen = !!mobileSubmenuOpen[item.label];

                return (
                  <div key={item.label} className="flex flex-col shrink-0">
                    <div className="flex items-center justify-between">
                      <a
                        href={item.href}
                        onClick={(e) => {
                          handleNavClick(e, item.href);
                        }}
                        className="flex-1 py-2.5 px-3 text-sm font-medium text-foreground hover:bg-accent/10 hover:text-accent-hover rounded transition-all duration-200"
                      >
                        {item.label}
                      </a>
                      {hasSubmenu && (
                        <button
                          onClick={() =>
                            setMobileSubmenuOpen((prev) => ({
                              ...prev,
                              [item.label]: !prev[item.label],
                            }))
                          }
                          className="p-2 text-foreground"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {hasSubmenu && (
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1 py-2 pl-3 border-l border-border/60">
                          {item.submenu!.map((sub) => (
                            <a
                              key={sub.label}
                              href={sub.href}
                              target={sub.isExternal ? "_blank" : undefined}
                              rel={sub.isExternal ? "noopener noreferrer" : undefined}
                              onClick={(e) =>
                                handleNavClick(e, sub.href, sub.isForm, sub.isExternal)
                              }
                              className="py-2 px-3 text-xs font-medium text-muted hover:text-accent-hover hover:bg-accent/10 rounded transition-all duration-200 flex items-center gap-2"
                            >
                              {sub.isExternal && (
                                <span className="w-1 h-1 rounded-full bg-rubber-red-light/60 shrink-0" />
                              )}
                              {sub.isForm && (
                                <span className="w-1 h-1 rounded-full bg-amber-400/60 shrink-0" />
                              )}
                              <span>{sub.label}</span>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
              
              {/* Divider */}
              <div className="my-3 h-px bg-border/40" />
              
              {/* Auth Section */}
              {isLoggedIn ? (
                <Link
                  href="/ecommerce"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground bg-accent/10 hover:bg-accent/15 rounded transition-all duration-200 border border-accent/30"
                >
                  <span className="w-7 h-7 rounded-full bg-accent/25 border border-accent/40 flex items-center justify-center text-accent text-xs font-bold shrink-0">
                    {avatarInitial}
                  </span>
                  <span className="truncate flex-1">{displayName}</span>
                </Link>
              ) : (
                <GlassButton
                  onClick={() => {
                    setMobileOpen(false);
                    router.push("/login");
                  }}
                  className="w-full text-sm font-medium"
                  size="sm"
                >
                  Login
                </GlassButton>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
