"use client";

import { motion, Variants } from "framer-motion";
import { Wrench, ShieldAlert, CircleDashed, Droplet, Wind, Activity, Zap, PaintBucket, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SERVICES = [
  { name: "Engine Repair", desc: "Complete rebuilding, replacement, and major engine component repairs.", icon: Wrench },
  { name: "Brake Service", desc: "Pad replacement, rotor resurfacing, and brake fluid flushes for max stopping power.", icon: ShieldAlert },
  { name: "Tyre Fitting", desc: "Premium tyre sales, balancing, rotation, and laser-guided wheel alignment.", icon: CircleDashed },
  { name: "Oil & Fluids", desc: "Synthetic oil changes and comprehensive fluid top-ups to keep your car running smooth.", icon: Droplet },
  { name: "AC Repair", desc: "Recharging, leak detection, and compressor repairs for ice-cold climate control.", icon: Wind },
  { name: "Full Diagnostics", desc: "Advanced computer diagnostics to pinpoint issues with absolute accuracy.", icon: Activity },
  { name: "Electrical Systems", desc: "Battery, alternator, and starter testing, plus full wiring fault repairs.", icon: Zap },
  { name: "Bodywork & Paint", desc: "Scratch removal, collision repair, and factory-matched paint restoration.", icon: PaintBucket },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};


export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const openService = (index: number) => setSelectedService(index);
  const closeService = () => setSelectedService(null);

  return (
    <section id="services" className="w-full bg-[#111111] py-24 md:py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-white/95"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 md:gap-6 group/grid"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            
            // If any item is hovered, and it's NOT this one, blur and fade it
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
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className={cn(
                  "group relative flex flex-col bg-transparent p-0 rounded-none border-b border-[rgba(245,245,245,0.08)] pb-4 transition-all duration-500 sm:bg-[#1A1A1A] sm:p-6 sm:rounded-xl sm:border sm:border-[rgba(245,245,245,0.12)] sm:border-b-0 sm:pb-0",
                  isOtherHovered ? "blur-[2px] opacity-50 scale-[0.98]" : "opacity-100 scale-100"
                )}
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-black text-primary border border-primary/10 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white/95 mb-3">{service.name}</h3>
                <p className="hidden sm:block text-sm text-white/65 leading-relaxed flex-grow">{service.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-primary opacity-100 translate-x-0 md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300">
                  <span className="text-sm font-bold">Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {selectedService !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-10">
            <div className="absolute inset-0" onClick={closeService} />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full max-w-2xl rounded-[28px] border border-[rgba(245,245,245,0.12)] bg-[#1A1A1A] p-8 shadow-2xl"
            >
              <button
                type="button"
                onClick={closeService}
                className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/15"
              >
               X
              </button>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-black text-primary border border-primary/10">
                {(() => {
                  const ServiceIcon = SERVICES[selectedService].icon;
                  return <ServiceIcon className="h-6 w-6" />;
                })()}
              </div>
              <h3 className="text-2xl font-black text-white/95 mb-3">{SERVICES[selectedService].name}</h3>
              <p className="text-sm text-white/65 leading-relaxed mb-6">
                {SERVICES[selectedService].desc}
              </p>
              <div className="rounded-3xl border border-white/10 bg-black/50 p-6 text-sm text-white/70">
                <p>
                  Our team delivers premium service with a focus on precision and care. Tap any service card again to close this detail view.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
