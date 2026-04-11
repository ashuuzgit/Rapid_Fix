"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Custom spring counting animation
  const count = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 15,
  });

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, value, count]);

  // Handle rounding and formatting for specific formats
  const displayValue = useTransform(count, (latest) => {
    return Math.floor(latest).toLocaleString() + suffix;
  });

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export default function Stats() {
  return (
    <section className="w-full bg-primary text-black py-12 md:py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-4xl md:text-5xl font-black mb-2">
              <Counter value={10000} suffix="+" />
            </h3>
            <p className="text-sm md:text-base font-bold uppercase tracking-wider opacity-80">Cars Serviced</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-4xl md:text-5xl font-black mb-2">
              <Counter value={98} suffix="%" />
            </h3>
            <p className="text-sm md:text-base font-bold uppercase tracking-wider opacity-80">Satisfaction Rate</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-4xl md:text-5xl font-black mb-2">
              <Counter value={15} />
            </h3>
            <p className="text-sm md:text-base font-bold uppercase tracking-wider opacity-80">Expert Mechanics</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <motion.h3 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-2 whitespace-nowrap"
            >
              Same-Day
            </motion.h3>
            <p className="text-sm md:text-base font-bold uppercase tracking-wider opacity-80">Service Available</p>
          </div>

        </div>
      </div>
    </section>
  );
}
