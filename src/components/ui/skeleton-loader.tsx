import React from "react";

export default function SkeletonLoader({ type = "form" }: { type?: "form" | "grid" }) {
  if (type === "form") {
    return (
      <div className="relative min-h-full w-full flex items-center justify-center font-sans">
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left panel skeleton */}
            <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full shimmer-loader" />
                  <div className="h-4 w-28 rounded-full shimmer-loader" />
                </div>
                <div className="h-10 w-4/5 rounded-md shimmer-loader" />
                <div className="space-y-2.5 pt-2">
                  <div className="h-3.5 w-full rounded shimmer-loader" />
                  <div className="h-3.5 w-11/12 rounded shimmer-loader" />
                  <div className="h-3.5 w-10/12 rounded shimmer-loader" />
                </div>
              </div>
              <div className="h-28 w-full rounded-lg shimmer-loader" />
            </div>

            {/* Right form skeleton */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-6 sm:p-8 rounded-lg border border-border/40 space-y-6">
                <div className="h-6 w-1/3 rounded-md shimmer-loader" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-3 w-20 rounded shimmer-loader" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-10 rounded shimmer-loader" />
                      <div className="h-10 rounded shimmer-loader" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="space-y-2">
                      <div className="h-3 w-28 rounded shimmer-loader" />
                      <div className="h-9 rounded shimmer-loader" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-28 rounded shimmer-loader" />
                      <div className="h-9 rounded shimmer-loader" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-28 rounded shimmer-loader" />
                      <div className="h-9 rounded shimmer-loader" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-28 rounded shimmer-loader" />
                      <div className="h-9 rounded shimmer-loader" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-32 rounded shimmer-loader" />
                    <div className="h-24 rounded shimmer-loader" />
                  </div>
                </div>
                <div className="h-12 w-full rounded shimmer-loader" />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Grid type for media/gallery/news
  return (
    <div className="relative min-h-full w-full flex items-center justify-center font-sans">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <div className="h-3.5 w-24 rounded shimmer-loader" />
              <div className="h-8 w-2/3 rounded-md shimmer-loader" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full rounded shimmer-loader" />
              <div className="h-3 w-5/6 rounded shimmer-loader" />
            </div>
            <div className="h-44 w-full rounded-2xl shimmer-loader" />
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-[220px] rounded-xl shimmer-loader" />
            <div className="h-[220px] rounded-xl shimmer-loader" />
            <div className="h-[220px] rounded-xl shimmer-loader" />
            <div className="h-[220px] rounded-xl shimmer-loader" />
          </div>

        </div>
      </div>
    </div>
  );
}
