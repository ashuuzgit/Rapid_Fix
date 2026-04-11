"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { DottedSurface } from "./DottedSurface";
import { LetterSwapPingPong } from "./LetterSwap";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-visible">
      {/* Background Gradient & Dotted Surface */}
      <div className="absolute inset-0 bg-[#0A0A0A] z-0" />
      <DottedSurface className="opacity-60" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_80%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-16 pb-16">

        {/* Pill Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-[0_0_15px_rgba(245,245,245,0.1)]"
        >
          Now Accepting Bookings
        </motion.div>

        {/* Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-6 text-4xl font-black tracking-tighter min-[400px]:text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white/95 flex flex-col items-center gap-2 md:gap-4 w-full"
        >
          <LetterSwapPingPong label="Your Car & Bike Deserves" className="flex-wrap justify-center text-center" />
          <LetterSwapPingPong label="RAPID FIX." className="text-primary tracking-tight flex-wrap justify-center text-center" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-2xl text-lg sm:text-xl text-white/65 leading-relaxed mb-10"
        >
          Expert diagnostics, precision repair, and same-day service — engineered for drivers who won&apos;t settle.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <motion.button
            onClick={() => document.querySelector("#assembly")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245,245,245,0.4)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="rounded-full bg-primary px-8 py-4 text-base font-bold text-black w-full sm:w-[220px]"
          >
            Book a Service
          </motion.button>

          <motion.button
            whileHover={{ backgroundColor: "rgba(245, 245, 245, 0.1)" }}
            whileTap={{ scale: 1.1}}
            transition={{ delay: 0 }}
            className="rounded-full border-2 border-primary px-8 py-3.5 text-base font-bold text-primary transition-colors hover:text-primary w-full sm:w-[220px] shadow-[0_0_15px_rgba(245,245,245,0.05)] hover:shadow-[0_0_20px_rgba(245,245,245,0.15)]"
          >
            Call Us
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 z-10"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">
          Scroll Down
        </span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
