"use client";

import { motion, Variants } from "framer-motion";
import {
  Wrench,
  ShieldAlert,
  CircleDashed,
  Droplet,
  Wind,
  Activity,
  Zap,
  PaintBucket,
  ArrowRight,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    name: "Engine Repair",
    desc: "Complete rebuilding, replacement, and major engine component repairs.",
    icon: Wrench,
  },
  {
    name: "Brake Service",
    desc: "Pad replacement, rotor resurfacing, and brake fluid flushes for max stopping power.",
    icon: ShieldAlert,
  },
  {
    name: "Tyre Fitting",
    desc: "Premium tyre sales, balancing, rotation, and laser-guided wheel alignment.",
    icon: CircleDashed,
  },
  {
    name: "Oil & Fluids",
    desc: "Synthetic oil changes and comprehensive fluid top-ups to keep your car running smooth.",
    icon: Droplet,
  },
  {
    name: "AC Repair",
    desc: "Recharging, leak detection, and compressor repairs for ice-cold climate control.",
    icon: Wind,
  },
  {
    name: "Full Diagnostics",
    desc: "Advanced computer diagnostics to pinpoint issues with absolute accuracy.",
    icon: Activity,
  },
  {
    name: "Electrical Systems",
    desc: "Battery, alternator, and starter testing, plus full wiring fault repairs.",
    icon: Zap,
  },
  {
    name: "Bodywork & Paint",
    desc: "Scratch removal, collision repair, and factory-matched paint restoration.",
    icon: PaintBucket,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface ServicesProps {
  onServiceOpenChange?: (isOpen: boolean) => void;
}

export default function Services({ onServiceOpenChange }: ServicesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const openService = (index: number) => {
    setSelectedService(index);
    onServiceOpenChange?.(true);
  };

  const closeService = () => {
    setSelectedService(null);
    onServiceOpenChange?.(false);
  };

  return (
    <section
      id="services"
      className="w-full bg-[#0A0A0A] py-16 md:py-24 lg:py-32 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white/95"
          >
            What We Fix
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="h-1 bg-primary mt-4"
          />
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === i;
            const isOtherHovered = hoveredIndex !== null && !isHovered;

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={() => openService(i)}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(245,245,245,0.5)",
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className={cn(
                  "group relative flex flex-col cursor-pointer",
                  "bg-[#1A1A1A] p-4 sm:p-5 md:p-6",
                  "rounded-xl border border-[rgba(245,245,245,0.12)]",
                  "transition-all duration-500",
                  isOtherHovered
                    ? "blur-[2px] opacity-50 scale-[0.98]"
                    : "opacity-100 scale-100",
                )}
              >
                <div className="mb-4 md:mb-6 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-black text-primary border border-primary/10 group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white/95 mb-2 md:mb-3">
                  {service.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed flex-grow">
                  {service.desc}
                </p>
                <div className="mt-4 md:mt-6 flex items-center gap-2 text-primary opacity-100 translate-x-0 md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300">
                  <span className="text-xs sm:text-sm font-bold">
                    Learn More
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Modal */}
        {selectedService !== null && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-0 sm:px-4 py-0 sm:py-10">
            <div className="absolute inset-0" onClick={closeService} />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative w-full sm:max-w-2xl rounded-t-[28px] sm:rounded-[14px] border border-[rgba(245,245,245,0.12)] bg-[#1A1A1A] p-6 sm:p-8 shadow-2xl"
            >
              {/* Drag handle — mobile only */}
              <div className="flex justify-center mb-5 sm:hidden">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={closeService}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/70 transition hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Icon */}
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-black text-primary border border-primary/10">
                {(() => {
                  const ServiceIcon = SERVICES[selectedService].icon;
                  return <ServiceIcon className="h-6 w-6" />;
                })()}
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white/95 mb-3">
                {SERVICES[selectedService].name}
              </h3>
              <p className="text-sm text-white/65 leading-relaxed mb-6">
                {SERVICES[selectedService].desc}
              </p>
              <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-black/50 p-4 sm:p-6 mb-12 text-sm text-white/70">
                <p>
                  Our team delivers premium service with a focus on precision
                  and care. Tap any service card again to close this detail
                  view.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
