"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Target, Shield, ChevronRight } from "lucide-react";

const missions = [
  {
    id: "01",
    title: "High Quality",
    desc: "Committed to producing high-quality downstream rubber products that meet established quality standards and are tailored to customer needs and expectations.",
    color: "from-rubber-red-light to-amber-500",
    textHover: "group-hover:text-amber-500",
  },
  {
    id: "02",
    title: "Governance",
    desc: "Committed to fostering a measurable and purpose-driven work environment supported by sound corporate governance.",
    color: "from-emerald-500 to-teal-500",
    textHover: "group-hover:text-emerald-500",
  },
  {
    id: "03",
    title: "AKHLAK Values",
    desc: "To develop human resources guided by AKHLAK values: Trustworthy, Competent, Harmonious, Loyal, Adaptive, and Collaborative.",
    color: "from-blue-500 to-cyan-500",
    textHover: "group-hover:text-cyan-500",
  },
  {
    id: "04",
    title: "Partnerships",
    desc: "To establish mutually beneficial strategic partnerships with customers and stakeholders.",
    color: "from-purple-500 to-pink-500",
    textHover: "group-hover:text-pink-500",
  },
  {
    id: "05",
    title: "Technology",
    desc: "To utilize and develop technology in business processes.",
    color: "from-amber-500 to-orange-500",
    textHover: "group-hover:text-orange-500",
  },
];

export default function VisionMissionSection() {
  const [activeMission, setActiveMission] = useState(0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 lg:py-20 w-full min-h-full flex flex-col justify-center">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-2 text-rubber-red-light">
          <Shield className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-wider font-semibold">Integrity & Standard</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl tracking-tight">Visi dan Misi Perusahaan</h2>
        <p className="text-xs sm:text-sm text-muted max-w-lg mx-auto mt-2 leading-relaxed">
          Landasan etos kerja dan komitmen jangka panjang kami untuk menghasilkan produk hilir karet alam terbaik di kancah global.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rubber-red-light/20 to-amber-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden border border-border/50 h-full flex flex-col justify-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-color)_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.05] pointer-events-none" />
            
            <div className="p-4 bg-rubber-red-light/10 text-rubber-red-light rounded-2xl w-16 h-16 flex items-center justify-center relative mb-6">
              <Compass className="w-8 h-8 text-rubber-red-light" />
              <div className="absolute inset-0 rounded-2xl border border-rubber-red-light/30 animate-ping opacity-50" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4 uppercase tracking-widest">Vision</h3>
            <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
              To be a leading downstream rubber industry company that fulfills customer needs through excellent corporate governance and demonstrates strong global competitiveness.
            </p>
          </div>
        </motion.div>

        {/* Mission Section - Interactive Accordion/Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-6 h-6 text-emerald-500" />
            <h3 className="text-2xl font-bold text-foreground uppercase tracking-widest">Missions</h3>
          </div>

          <div className="flex flex-col gap-3">
            {missions.map((mission, index) => {
              const isActive = activeMission === index;
              return (
                <div
                  key={mission.id}
                  onClick={() => setActiveMission(index)}
                  className={`relative cursor-pointer transition-all duration-500 rounded-2xl overflow-hidden group ${
                    isActive ? "bg-elevated/80 border-border shadow-lg" : "bg-elevated/20 border-transparent hover:bg-elevated/40"
                  } border`}
                >
                  {/* Active Gradient Line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${mission.color} transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                  <div className="p-5 pl-7 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`text-sm font-bold font-mono ${isActive ? "text-foreground" : "text-muted-dim group-hover:text-muted"} transition-colors`}>
                          {mission.id}
                        </span>
                        <h4 className={`text-sm md:text-base font-semibold ${isActive ? "text-foreground" : "text-muted group-hover:text-foreground"} transition-colors`}>
                          {mission.title}
                        </h4>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-muted transition-transform duration-300 ${isActive ? "rotate-90 text-foreground" : ""}`} />
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-xs md:text-sm text-muted leading-relaxed pl-9">
                            {mission.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
