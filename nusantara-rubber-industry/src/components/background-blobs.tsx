"use client";

import { useTheme } from "./providers/theme-provider";

interface BackgroundBlobsProps {
  sectionId?: string;
}

export default function BackgroundBlobs({ sectionId }: BackgroundBlobsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Dark mode blob colors (original)
  let blobColors = isDark
    ? [
        "from-rubber-red/15 to-navy-light/5",
        "from-emerald-950/20 to-teal-900/10",
        "from-blue-900/15 to-purple-950/10",
      ]
    : [
        "from-rose-200/40 to-sky-100/20",
        "from-emerald-100/30 to-teal-50/20",
        "from-blue-100/30 to-purple-100/20",
      ];

  if (sectionId === "sustainability") {
    blobColors = isDark
      ? [
          "from-emerald-800/20 to-teal-950/10",
          "from-teal-800/15 to-emerald-950/5",
          "from-green-900/10 to-navy-light/10",
        ]
      : [
          "from-emerald-200/40 to-teal-100/20",
          "from-teal-100/30 to-emerald-50/20",
          "from-green-100/30 to-sky-50/15",
        ];
  } else if (sectionId === "hero") {
    blobColors = isDark
      ? [
          "from-rubber-red/20 to-navy-light/5",
          "from-red-950/15 to-purple-950/10",
          "from-[#1b2a4a]/20 to-navy-dark/10",
        ]
      : [
          "from-rose-200/50 to-sky-100/20",
          "from-red-100/30 to-purple-100/20",
          "from-sky-200/30 to-indigo-100/15",
        ];
  } else if (sectionId === "produk") {
    blobColors = isDark
      ? [
          "from-blue-900/15 to-teal-950/10",
          "from-rubber-red/15 to-navy-light/5",
          "from-violet-950/15 to-navy-dark/10",
        ]
      : [
          "from-blue-100/40 to-teal-50/20",
          "from-rose-100/30 to-sky-50/15",
          "from-violet-100/30 to-indigo-50/15",
        ];
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 transition-colors duration-500"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Glow orb 1 */}
      <div
        className={`absolute -top-10 -left-10 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-br ${blobColors[0]} blur-[80px] sm:blur-[120px] animate-float-slow`}
        style={{ opacity: 'var(--blob-opacity)' }}
      />
      {/* Glow orb 2 */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-br ${blobColors[1]} blur-[100px] sm:blur-[150px] animate-float-reverse`}
        style={{ opacity: 'var(--blob-opacity)' }}
      />
      {/* Glow orb 3 */}
      <div
        className={`absolute -bottom-20 -right-20 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-br ${blobColors[2]} blur-[80px] sm:blur-[120px] animate-float-medium`}
        style={{ opacity: 'var(--blob-opacity)' }}
      />
      
      {/* Grid overlay for a modern digital look */}
      <div 
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: isDark ? 0.02 : 0.03,
          backgroundImage: `radial-gradient(circle, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />
    </div>
  );
}
