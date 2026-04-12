"use client";

import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useSpring,
  useVelocity,
} from "framer-motion";
import {
  MorphingPopover,
  MorphingPopoverTrigger,
  MorphingPopoverContent,
} from "./MorphingPopover";

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
    setIsFastScrolling(Math.abs(v) > 1500);
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Load images
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

  // Draw frames
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!canvasRef.current || imagesRef.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(latest * FRAME_COUNT)),
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

  // Initial frame
  useEffect(() => {
    if (imagesLoaded > 0 && canvasRef.current && imagesRef.length > 0) {
      const img = imagesRef[0];
      if (img && img.complete) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (ctx) ctx.drawImage(img, 0, 0);
      }
    }
  }, [imagesLoaded, imagesRef]);

  const [currentPhase, setCurrentPhase] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.15) setCurrentPhase(0);
    else if (v < 0.4) setCurrentPhase(1);
    else if (v < 0.65) setCurrentPhase(2);
    else if (v < 0.85) setCurrentPhase(3);
    else setCurrentPhase(4);
  });

  return (
    <div
      id="assembly"
      ref={containerRef}
      className="relative h-[400vh] w-full bg-[#0A0A0A]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Loader */}
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A] z-20">
            <div className="text-primary font-bold tracking-widest text-xs sm:text-sm uppercase">
              Loading Engine {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
            </div>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            backgroundColor: "#0A0A0A",
          }}
        />

        {/* Blur overlay */}
        <AnimatePresence>
          {currentPhase !== -1 && !isFastScrolling && (
            <motion.div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="absolute inset-0 pointer-events-none px-4 sm:px-6 md:px-12 lg:px-24 py-10 z-20">
          <AnimatePresence mode="wait">
            {/* Phase 0 */}
            {currentPhase === 0 && !isFastScrolling && (
              <motion.div
                key="phase0"
                className="absolute inset-0 flex items-center justify-center text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-[#0A0A0A]/50 px-6 py-8 sm:px-10 sm:py-12 rounded-3xl backdrop-blur-md">
                  <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] font-black text-white mb-4">
                    Built to Last.
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl">
                    Every repair starts with precision diagnostics and honest
                    expertise.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Phase 1 */}
            {currentPhase === 1 && !isFastScrolling && (
              <motion.div
                key="phase1"
                className="absolute left-1/2 md:left-24 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 w-full max-w-md"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-[#0A0A0A]/50 p-5 sm:p-6 md:p-8 rounded-3xl backdrop-blur-md">
                  <h2 className="text-[clamp(1.5rem,4.5vw,3.5rem)] font-black text-white mb-4">
                    Every Component. Inspected.
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/80">
                    From brake pads to engine mounts — we check what others
                    miss.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Phase 2 */}
            {currentPhase === 2 && !isFastScrolling && (
              <motion.div
                key="phase2"
                className="absolute right-1/2 md:right-24 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0 w-full max-w-lg text-left md:text-right"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-[#0A0A0A]/50 p-5 sm:p-6 md:p-8 rounded-3xl backdrop-blur-md">
                  <h2 className="text-[clamp(1.5rem,4.5vw,3.5rem)] font-black text-white mb-4">
                    Engine Work. Done Right.
                  </h2>
                  <ul className="text-sm sm:text-base md:text-lg text-white/80 space-y-3">
                    <li>— Master technicians</li>
                    <li>— Premium parts</li>
                    <li>— Warranty included</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Phase 3 */}
            {currentPhase === 3 && !isFastScrolling && (
              <motion.div
                key="phase3"
                className="absolute left-1/2 md:left-24 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 w-full max-w-md"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-[#0A0A0A]/50 p-5 sm:p-6 md:p-8 rounded-3xl backdrop-blur-md">
                  <h2 className="text-[clamp(1.5rem,4.5vw,3.5rem)] font-black text-white mb-4">
                    Performance You Can Feel.
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/80">
                    Alignment, balancing, and suspension tuning — perfected.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Phase 4 */}
            {currentPhase === 4 && !isFastScrolling && (
              <motion.div
                key="phase4"
                className="absolute inset-0 flex items-center justify-center text-center"
              >
                <div className="bg-[#0A0A0A]/50 px-6 py-8 sm:px-10 sm:py-12 rounded-3xl backdrop-blur-md">
                  <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] font-black text-white mb-4">
                    Ready to Roll.
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6">
                    Book your service slot today — same-day availability.
                  </p>

                  <MorphingPopover>
                    <MorphingPopoverTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="pointer-events-auto rounded-full bg-primary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-black"
                      >
                        Book Now
                      </motion.button>
                    </MorphingPopoverTrigger>

                    <MorphingPopoverContent className="pointer-events-auto w-[280px] sm:w-[320px]">
                      <div className="flex flex-col gap-4 text-center">
                        <h3 className="text-lg font-bold text-primary">
                          Priority Booking
                        </h3>
                        <input
                          type="datetime-local"
                          className="w-full p-3 rounded-lg bg-black border border-white/20 text-white"
                        />
                        <button className="w-full bg-primary text-black font-bold py-3 rounded-lg">
                          Confirm Slot
                        </button>
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
