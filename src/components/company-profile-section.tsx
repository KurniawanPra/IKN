"use client";

import React from "react";
import { motion } from "framer-motion";
import BackgroundBlobs from "@/components/background-blobs";
import VideoPlayer from "@/components/ui/video-player";

export default function CompanyProfileSection() {
  return (
    <section
      id="about-video"
      className="snap-section relative flex items-center overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40"
    >
      <BackgroundBlobs transparentBg={true} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-20 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Video Description */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-left">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-1 inline-block"
            >
              Company Profile Video
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl font-bold text-foreground sm:text-3xl leading-tight"
            >
              PT Industri Karet Nusantara
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-sm leading-relaxed text-muted flex flex-col gap-3 font-sans max-h-[35vh] overflow-y-auto pr-2"
            >
              <p>
                Experienced since 1965, PT. Nusantara Rubber Industry (PT. IKN), was founded as a subsidiary of PT. Perkebunan Nusantara III (Persero) and become a rubber-based downstream company. PT. The Nusantara Rubber Industry fully understands that knowledge and experience in creating products with strong advantages is the key in the competition to become market leader in the rubber industry.
              </p>
              <p>
                We always strive to provide solutions to our customers by producing high quality products made from the best quality natural rubber, ready to use and specially designed according to market needs. We are committed to always maintaining our customer satisfaction by maintaining product excellence, on time delivery, service and ease of doing business.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 w-full flex items-center justify-center"
          >
            <div className="w-full aspect-video glass-panel p-3 rounded-xl border border-border">
              <VideoPlayer src="https://youtu.be/FGJQW6l2hrk?si=7GnnGxaKmc4BvmyP" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
