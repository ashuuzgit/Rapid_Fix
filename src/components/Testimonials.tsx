"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "James O.",
    role: "Toyota Camry 2019",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    text: "Absolutely phenomenal service. They diagnosed an engine issue that three other shops couldn't figure out. Honest, transparent pricing and the car runs like brand new.",
  },
  {
    name: "Sarah M.",
    role: "BMW 3 Series 2021",
    image: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    text: "The only place I trust with my BMW. The master technicians are truly experts, and the complimentary full diagnostic gave me total peace of mind before a long road trip.",
  },
  {
    name: "David T.",
    role: "Ford Mustang 2018",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    text: "Fastest turnaround time I've ever experienced. Brought it in for suspension work and had it back the same day. The shop feels premium but the prices are very fair.",
  },
  {
    name: "Elena R.",
    role: "Honda Civic Type R",
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    text: "I was super impressed by the professionalism. They didn't just fix my brakes; they walked me through the entire repair process. I'll never go anywhere else.",
  }
];

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-8 rounded-3xl border border-[rgba(245,245,245,0.15)] bg-[#111111] shadow-lg shadow-black max-w-xs w-full text-white" key={i}>
                  <div className="text-white/80 italic">"{text}"</div>
                  <div className="flex items-center gap-4 mt-6">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-12 w-12 rounded-full border border-primary/20 object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold tracking-tight text-white/95">{name}</div>
                      <div className="text-sm opacity-60 tracking-tight text-primary/80">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export default function Testimonials() {
  return (
    <section 
      id="testimonials"
      className="relative w-full bg-[#0A0A0A] py-24 md:py-32 px-6 overflow-hidden flex flex-col items-center"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <h2 className="text-3xl md:text-5xl font-black text-white/95 mb-16 text-center z-10 w-full max-w-7xl mx-auto">
        Trusted by Thousands of Drivers
      </h2>

      {/* Marquee Container */}
      <div className="relative w-full max-w-5xl h-[600px] flex justify-center gap-6 overflow-hidden mask-vertical z-10">
        <TestimonialsColumn 
          testimonials={testimonials.slice(0, 2)} 
          className="flex-1 max-w-xs" 
          duration={15} 
        />
        <TestimonialsColumn 
          testimonials={testimonials.slice(2, 4)} 
          className="flex-1 max-w-xs hidden md:block" 
          duration={20} 
        />
        <TestimonialsColumn 
          testimonials={testimonials} 
          className="flex-1 max-w-xs hidden lg:block" 
          duration={25} 
        />
        
        {/* Gradient overlays to feather the top and bottom edges */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
