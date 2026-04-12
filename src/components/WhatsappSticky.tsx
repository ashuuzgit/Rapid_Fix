"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function WhatsappSticky() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 40 }}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 25px rgba(37,211,102,0.5)",
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="
            fixed z-[100]
            flex items-center justify-center
            rounded-full shadow-lg bg-white
            
            h-12 w-12 sm:h-14 sm:w-14
            
            bottom-4 right-4 
            sm:bottom-6 sm:right-10
            md:bottom-8 md:right-14
            md:rounded-6xl
            mb-[env(safe-area-inset-bottom)]
            mr-[env(safe-area-inset-right)]
          "
        >
          <Image
            src="/whatsapp.png"
            alt="WhatsApp"
            width={32}
            height={32}
            className="object-contain rounded-full h-48 w-48 bg-none"
            unoptimized
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
