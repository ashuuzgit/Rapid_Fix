"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Globe } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="w-full bg-[#0A0A0A] py-24 md:py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Contact Details */}
          <div className="flex flex-col">
            <h2 className="text-4xl md:text-5xl font-black text-white/95 mb-10">Find Us</h2>

            <div className="flex flex-col gap-8 mb-12">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white/95 mb-1">Rapid Fix Repair</h4>
                  <p className="text-white/65 leading-relaxed text-base">
                     Noida<br />
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary shrink-0" />
                <a href="tel:+15550123456" className="text-lg font-bold text-white/90 hover:text-primary transition-colors">
                  +91 999 012-3456
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary shrink-0" />
                <a href="mailto:service@apexauto.com" className="text-lg font-bold text-white/90 hover:text-primary transition-colors">
                  service@rapidfix.com
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <MessageCircle className="h-6 w-6 text-[#25D366] flex-shrink-0" />
                <a 
                  href="https://wa.me/15550123456" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-primary px-5 py-2 text-sm font-bold text-primary hover:bg-primary/10 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="mb-10 p-6 rounded-xl bg-[#111111] border border-[rgba(245,245,245,0.1)]">
              <h4 className="text-primary font-bold mb-2">Operating Hours</h4>
              <p className="text-white/65">Mon – Sat: 8:00 AM – 7:00 PM</p>
              <p className="text-white/65">Sunday: Closed</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245,245,245,0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-full sm:w-auto self-start rounded-full bg-primary px-8 py-4 text-lg font-bold text-black mb-12 shadow-[0_0_15px_rgba(245,245,245,0.15)]"
            >
              Book a Service
            </motion.button>

            {/* Socials */}
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="p-3 rounded-full border border-[rgba(245,245,245,0.3)] text-primary hover:bg-primary hover:text-black transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="Facebook" className="p-3 rounded-full border border-[rgba(245,245,245,0.3)] text-primary hover:bg-primary hover:text-black transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" aria-label="Google Business" className="p-3 rounded-full border border-[rgba(245,245,245,0.3)] text-primary hover:bg-primary hover:text-black transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="flex flex-col">
            <div className="w-full h-[420px] rounded-xl overflow-hidden border border-[rgba(245,245,245,0.2)] mb-4">
              <iframe
                src="https://maps.google.com/maps?q=28.5847634,77.4081356&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Apex Auto Repair Location Map"
              ></iframe>
            </div>
            <p className="text-white/40 text-sm text-center lg:text-left">
              RapidFix Repair — Noida
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
