"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Wrench, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "How It Works", href: "#assembly" },
  { name: "Services", href: "#services" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Find Us", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 60);
    });
  }, [scrollY]);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex h-16 items-center transition-colors duration-300",
        isScrolled ? "bg-[rgba(10,10,10,0.80)] backdrop-blur-md border-b border-white/5" : "bg-transparent",
        isMobileMenuOpen && "bg- [#0A0A0A] border-b border-white/5"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        {/* Left: Logo */}
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group transition-transform active:scale-95"
        >
          <Wrench className="h-6 w-6 text-primary group-hover:rotate-12 active:rotate-12 transition-transform" />
          <span className="text-xl font-bold tracking-tight text-white/95">
            RAPID<span className="text-primary">FIX</span>
          </span>
        </Link>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-white/65 hover:text-white transition-colors py-2"
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: "auto" });
              }}
            >
              {link.name}
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/admin/login"
            className="hidden lg:block text-xs font-medium text-white/40 hover:text-white transition-colors"
          >
            Admin
          </Link>
          
          <motion.button
            className="flex items-center gap-1.5 rounded-full bg-danger px-3 py-1.5 text-xs font-bold text-white shadow-lg"
            animate={{
              boxShadow: ["0 0 0px #FF3B3B", "0 0 14px #FF3B3B", "0 0 0px #FF3B3B"],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🚨 SOS
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(245,245,245,0.4)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="hidden md:block rounded-full bg-primary px-5 py-2 text-sm font-bold text-black"
            onClick={() => document.querySelector("#assembly")?.scrollIntoView({ behavior: "smooth" })}
          >
            Book Now
          </motion.button>

          {/* Hamburger Menu Toggle */}
          <button
            className="md:hidden p-1 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-[#0A0A0A] border-b border-white/10 md:hidden flex flex-col px-6 py-4 shadow-2xl"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-4 text-lg font-medium text-white/80 border-b border-white/5"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "auto" });
                }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="py-4 text-lg font-medium text-white/80 border-b border-white/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin
            </Link>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(245,245,245,0.3)]"
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.querySelector("#assembly")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
