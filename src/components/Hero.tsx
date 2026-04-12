"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { DottedSurface } from "./DottedSurface";
import { LetterSwapPingPong } from "./LetterSwap";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0A] z-0" />
      <DottedSurface className="opacity-60" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_80%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-20 sm:mt-24 lg:mt-28 pb-20">
        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8 rounded-full border border-primary/20 bg-primary/10 px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary"
        >
          Now Accepting Bookings
        </motion.div>

        {/* Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex flex-col items-center gap-2 sm:gap-3 md:gap-4 w-full"
        >
          <h1 className="font-black tracking-tight text-white/95 leading-tight text-[clamp(2rem,6vw,5rem)]">
            <LetterSwapPingPong
              label="Your Car & Bike Deserves"
              className="flex-wrap justify-center"
            />
          </h1>

          <h1 className="font-black tracking-tight text-primary leading-tight text-[clamp(2.5rem,7vw,6rem)]">
            <LetterSwapPingPong
              label="RAPID FIX."
              className="flex-wrap justify-center"
            />
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl sm:max-w-2xl text-sm sm:text-lg md:text-xl text-white/70 leading-relaxed mb-8 sm:mb-10"
        >
          Expert diagnostics, precision repair, and same-day service —
          engineered for drivers who won&apos;t settle.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto"
        >
          <motion.button
            onClick={() =>
              document
                .querySelector("#assembly")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(245,245,245,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-[200px] md:w-[220px] rounded-full bg-primary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-black"
          >
            Book a Service
          </motion.button>

          <motion.button
            whileHover={{ backgroundColor: "rgba(245,245,245,0.1)" }}
            whileTap={{ scale: 1.05 }}
            className="w-full sm:w-[200px] md:w-[220px] rounded-full border-2 border-primary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-primary transition"
          >
            Call Us
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-primary/70">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
