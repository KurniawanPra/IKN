"use client";

interface BackgroundBlobsProps {
  sectionId?: string;
}

export default function BackgroundBlobs({ sectionId }: BackgroundBlobsProps) {
  // We can vary colors depending on the section to create a unique atmosphere for each
  let blobColors = [
    "from-rubber-red/15 to-navy-light/5",
    "from-emerald-950/20 to-teal-900/10",
    "from-blue-900/15 to-purple-950/10",
  ];

  if (sectionId === "sustainability") {
    blobColors = [
      "from-emerald-800/20 to-teal-950/10",
      "from-teal-800/15 to-emerald-950/5",
      "from-green-900/10 to-navy-light/10",
    ];
  } else if (sectionId === "hero") {
    blobColors = [
      "from-rubber-red/20 to-navy-light/5",
      "from-red-950/15 to-purple-950/10",
      "from-[#1b2a4a]/20 to-navy-dark/10",
    ];
  } else if (sectionId === "produk") {
    blobColors = [
      "from-blue-900/15 to-teal-950/10",
      "from-rubber-red/15 to-navy-light/5",
      "from-violet-950/15 to-navy-dark/10",
    ];
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-navy-dark">
      {/* Glow orb 1 */}
      <div
        className={`absolute -top-10 -left-10 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-br ${blobColors[0]} blur-[80px] sm:blur-[120px] animate-float-slow`}
      />
      {/* Glow orb 2 */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-br ${blobColors[1]} blur-[100px] sm:blur-[150px] animate-float-reverse`}
      />
      {/* Glow orb 3 */}
      <div
        className={`absolute -bottom-20 -right-20 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-br ${blobColors[2]} blur-[80px] sm:blur-[120px] animate-float-medium`}
      />
      
      {/* Grid overlay for a modern digital look */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />
    </div>
  );
}
