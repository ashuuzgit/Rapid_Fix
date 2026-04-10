"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, motion, AnimatePresence, useMotionValueEvent, useSpring, useVelocity } from "framer-motion";
import { MorphingPopover, MorphingPopoverTrigger, MorphingPopoverContent } from "./MorphingPopover";

const FRAME_COUNT = 240;

const pad = (n: number) => n.toString().padStart(3, "0");

export default function ScrollyTellingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesRef, setImagesRef] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isFastScrolling, setIsFastScrolling] = useState(false);

  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollVelocity = useVelocity(scrollY);

  useMotionValueEvent(scrollVelocity, "change", (v) => {
    // If scrolling faster than ~1000px/s, it's a jump/rapid scroll
    setIsFastScrolling(Math.abs(v) > 1500);
  });

  // Smoothen the scroll progress to avoid jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });

  // Load all images into memory
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/sequence/ezgif-frame-${pad(i)}.jpg`;
      img.onload = () => {
        loaded++;
        setImagesLoaded(loaded);
      };
      images.push(img);
    }
    setImagesRef(images);
  }, []);

  // Update canvas on smooth scroll
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (imagesLoaded === 0 || !canvasRef.current || imagesRef.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(latest * FRAME_COUNT))
    );

    const img = imagesRef[frameIndex];
    if (img && img.complete) {
      if (canvas.width !== img.width || canvas.height !== img.height) {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      ctx.drawImage(img, 0, 0);
    }
  });

  // Ensure first frame is drawn initially before scrolling
  useEffect(() => {
    if (imagesLoaded > 0 && canvasRef.current && imagesRef.length > 0) {
      const img = imagesRef[0];
      if (img && img.complete) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (ctx) {
          if (canvas.width !== img.width || canvas.height !== img.height) {
            canvas.width = img.width;
            canvas.height = img.height;
          }
          ctx.drawImage(img, 0, 0);
        }
      }
    }
  }, [imagesLoaded, imagesRef]);

  const [currentPhase, setCurrentPhase] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.15) setCurrentPhase(0);
    else if (v >= 0.15 && v < 0.40) setCurrentPhase(1);
    else if (v >= 0.40 && v < 0.65) setCurrentPhase(2);
    else if (v >= 0.65 && v < 0.85) setCurrentPhase(3);
    else setCurrentPhase(4);
  });

  return (
    <div id="assembly" ref={containerRef} className="relative h-[400vh] w-full" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* The loading placeholder */}
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A] z-20">
             <div className="text-primary font-bold tracking-widest text-sm uppercase">Loading Engine {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%</div>
          </div>
        )}

        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Backdrop blur overlay active whenever text is shown */}
        <AnimatePresence>
          {currentPhase !== -1 && !isFastScrolling && (
             <motion.div 
               className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none z-10"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.8 }}
             />
          )}
        </AnimatePresence>

        {/* Text Overlays */}
        <div className="absolute inset-0 pointer-events-none p-6 md:p-24 z-20">
          <AnimatePresence mode="wait">
            
            {/* Phase 0: 0-15% Center */}
            {currentPhase === 0 && !isFastScrolling && (
              <motion.div
                key="phase0"
                className="absolute inset-0 flex flex-col items-center justify-center text-center will-change-[opacity,transform]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-[#0A0A0A]/50 px-10 py-12 rounded-3xl border border-white/5 backdrop-blur-md">
                  <h2 className="text-5xl md:text-7xl font-black text-white/95 mb-4 drop-shadow-xl">Built to Last.</h2>
                  <p className="text-xl text-white/80 max-w-xl mx-auto font-medium shadow-black">Every repair starts with precision diagnostics and honest expertise.</p>
                </div>
              </motion.div>
            )}

            {/* Phase 1: 15-40% Left */}
            {currentPhase === 1 && !isFastScrolling && (
              <motion.div
                key="phase1"
                className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 flex flex-col items-start w-[90%] md:max-w-md will-change-[opacity,transform]"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-[#0A0A0A]/50 p-8 rounded-3xl border border-white/5 backdrop-blur-md">
                  <div className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-6 shadow-[0_0_15px_rgba(245,245,245,0.1)]">
                    Full Diagnostics
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white/95 mb-4 drop-shadow-xl">Every Component.<br/>Inspected.</h2>
                  <p className="text-lg md:text-xl text-white/80 font-medium font-medium">From brake pads to engine mounts — we check what others miss.</p>
                </div>
              </motion.div>
            )}

            {/* Phase 2: 40-65% Right */}
            {currentPhase === 2 && !isFastScrolling && (
              <motion.div
                key="phase2"
                className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 flex flex-col items-start w-[90%] md:max-w-xl will-change-[opacity,transform] md:items-end md:text-right"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-[#0A0A0A]/50 p-8 rounded-3xl border border-white/5 backdrop-blur-md inline-block">
                  <h2 className="text-4xl md:text-6xl font-black text-white/95 mb-6 text-left md:text-right drop-shadow-xl">Engine Work.<br/>Done Right.</h2>
                  <ul className="flex flex-col gap-4 text-white/80 text-lg font-medium">
                    <li className="flex items-center md:justify-end gap-3"><span className="text-primary font-black text-xl drop-shadow-lg">—</span> Trained master technicians</li>
                    <li className="flex items-center md:justify-end gap-3"><span className="text-primary font-black text-xl drop-shadow-lg">—</span> OEM and premium aftermarket parts</li>
                    <li className="flex items-center md:justify-end gap-3"><span className="text-primary font-black text-xl drop-shadow-lg">—</span> Warranty on all major repairs</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Phase 3: 65-85% Left */}
            {currentPhase === 3 && !isFastScrolling && (
              <motion.div
                key="phase3"
                className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 flex flex-col items-start w-[90%] md:max-w-md will-change-[opacity,transform]"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-[#0A0A0A]/50 p-8 rounded-3xl border border-white/5 backdrop-blur-md">
                  <h2 className="text-4xl md:text-6xl font-black text-white/95 mb-4 drop-shadow-xl">Performance You Can Feel.</h2>
                  <p className="text-lg md:text-xl text-white/80 font-medium">Wheel alignment, tyre balancing, and suspension tuning — restored to factory spec or better.</p>
                </div>
              </motion.div>
            )}

            {/* Phase 4: 85-100% Center */}
            {currentPhase === 4 && !isFastScrolling && (
              <motion.div
                key="phase4"
                className="absolute inset-0 flex flex-col items-center justify-center text-center will-change-[opacity,transform]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-[#0A0A0A]/50 px-10 py-12 rounded-3xl border border-white/5 backdrop-blur-md">
                  <h2 className="text-5xl md:text-7xl font-black text-white/95 mb-4 drop-shadow-xl">Ready to Roll.</h2>
                  <p className="text-xl text-white/80 font-medium max-w-xl mx-auto mb-8">Book your service slot today — same-day availability.</p>
                  <MorphingPopover>
                    <MorphingPopoverTrigger asChild>
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245,245,245,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="pointer-events-auto rounded-full bg-primary px-8 py-4 text-base font-bold text-black shadow-lg"
                      >
                        Book Now
                      </motion.button>
                    </MorphingPopoverTrigger>
                    <MorphingPopoverContent className="pointer-events-auto w-[300px]">
                      <div className="flex flex-col gap-4 text-center">
                        <h3 className="text-xl font-bold text-primary">Priority Booking</h3>
                        <p className="text-sm text-white/70">Secure your same-day service slot instantly.</p>
                        <input type="datetime-local" className="w-full p-3 rounded-lg bg-black border border-white/20 outline-none focus:border-primary text-sm text-white/90" />
                        <button className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">Confirm Slot</button>
                      </div>
                    </MorphingPopoverContent>
                  </MorphingPopover>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
