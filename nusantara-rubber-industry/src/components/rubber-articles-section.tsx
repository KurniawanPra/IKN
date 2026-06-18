"use client";

import { motion, Variants } from "framer-motion";
import { Factory, Leaf, ShieldCheck, Clock, PackageCheck, Wrench, FlaskRound, Building2, Cog, CircleDot, ExternalLink } from "lucide-react";
import BackgroundBlobs from "./background-blobs";

const products = [
  { icon: Building2, title: "Cement Plants", desc: "Rubber components engineered for cement processing plants — conveyor belts, vibration dampers, and wear-resistant linings." },
  { icon: FlaskRound, title: "Centrifugal Latex & Rubber Crumb Plants", desc: "Specialized rubber parts for latex centrifuge machines and rubber crumb processing equipment." },
  { icon: Factory, title: "Sugar Plants", desc: "Heat and abrasion-resistant rubber components designed for sugar cane milling and refining operations." },
  { icon: Cog, title: "Aluminum Plants", desc: "High-performance rubber products for aluminum smelting and processing environments." },
  { icon: CircleDot, title: "Palm Oil Plants", desc: "Durable rubber components for palm oil mills — press rollers, conveyor belts, and filtration systems." },
  { icon: Wrench, title: "Various Applications", desc: "Custom rubber articles for diverse industrial applications — gaskets, seals, rollers, and anti-vibration mounts." },
];

const advantages = [
  { icon: Leaf, title: "High-Quality Natural Latex", desc: "Premium-grade natural latex sourced from sustainable plantations as the primary raw material." },
  { icon: Cog, title: "Modern Technology", desc: "Produced using advanced manufacturing technology for consistent quality and performance." },
  { icon: ShieldCheck, title: "Strict Quality Control", desc: "Rigorous multi-stage quality inspection ensuring every product meets export standards." },
  { icon: PackageCheck, title: "Guaranteed Availability", desc: "Sustainable production capacity of 91 tons/year with reliable supply chain management." },
  { icon: Clock, title: "Timely Delivery", desc: "On-time logistics and delivery to meet your production schedules and expectations." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } }),
};

export default function RubberArticlesSection() {
  return (
    <div className="relative min-h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans">
      <BackgroundBlobs sectionId="rubber-articles" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-0 w-full min-h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-2">
            Rubber Article Products
          </p>
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Rubber Articles
          </h2>
          <p className="text-sm text-muted mt-2 leading-relaxed max-w-2xl">
            Industrial rubber components produced from rubber thread waste using modern technology.
            Capable of producing valuable products with a production capacity of{" "}
            <span className="text-foreground font-semibold">91 tons per year</span>.
          </p>

          {/* Capacity badge */}
          <div className="inline-flex items-center gap-2 mt-4 bg-elevated/50 border border-border/40 px-4 py-2 rounded-sm">
            <Factory className="w-4 h-4 text-rubber-red-light" />
            <span className="text-xs font-mono text-foreground">
              Production Capacity: <span className="font-bold text-rubber-red-light">91 tons/year</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Product Categories */}
          <div className="lg:col-span-7">
            <h3 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider mb-4">
              Product Categories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    variants={fadeUp as unknown as Variants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className="glass-panel glass-panel-hover p-4 rounded-md flex gap-3 items-start"
                  >
                    <div className="p-2 bg-rubber-red-light/10 rounded shrink-0">
                      <Icon className="w-5 h-5 text-rubber-red-light" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground mb-1">{p.title}</h4>
                      <p className="text-[10px] text-muted leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Advantages */}
          <div className="lg:col-span-5">
            <h3 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider mb-4">
              Advantages
            </h3>
            <div className="space-y-3">
              {advantages.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div
                    key={a.title}
                    variants={fadeUp as unknown as Variants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className="glass-panel p-4 rounded-md flex gap-3 items-start"
                  >
                    <div className="p-2 bg-emerald-500/10 rounded shrink-0">
                      <Icon className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground mb-1">{a.title}</h4>
                      <p className="text-[10px] text-muted leading-relaxed">{a.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-end"
        >
          <a
            href="https://ikn.co.id/rubber-article-products/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] font-mono text-rubber-red-light hover:text-rubber-red-light/80 transition-colors"
          >
            View on ikn.co.id <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
