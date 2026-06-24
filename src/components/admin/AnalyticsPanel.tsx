"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Activity,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Award,
  CheckCircle,
} from "lucide-react";

// Types for data structure
interface ChartDataPoint {
  label: string;
  revenue: number;
  volume: number;
  orders: number;
}

interface ProductPerformance {
  name: string;
  category: string;
  revenue: number;
  volume: number;
  percentage: number;
  color: string;
}

// 1. Data Range Presets
type TimeRange = "7d" | "30d" | "ytd";

const DATA_PRESETS: Record<TimeRange, {
  label: string;
  summary: { revenue: number; volume: number; conversion: number; activeUsers: number };
  chartData: ChartDataPoint[];
  topProducts: ProductPerformance[];
}> = {
  "7d": {
    label: "7 Hari Terakhir",
    summary: { revenue: 74000000, volume: 1800, conversion: 85.7, activeUsers: 14 },
    chartData: [
      { label: "Sen", revenue: 8500000, volume: 200, orders: 1 },
      { label: "Sel", revenue: 16500000, volume: 300, orders: 2 },
      { label: "Rab", revenue: 5000000, volume: 100, orders: 1 },
      { label: "Kam", revenue: 22500000, volume: 500, orders: 2 },
      { label: "Jum", revenue: 0, volume: 0, orders: 0 },
      { label: "Sab", revenue: 18000000, volume: 400, orders: 1 },
      { label: "Min", revenue: 3500000, volume: 300, orders: 1 },
    ],
    topProducts: [
      { name: "Resiprene 35", category: "Resin & Coating", revenue: 36000000, volume: 800, percentage: 48, color: "bg-emerald-500" },
      { name: "RUBIN", category: "Resin & Coating", revenue: 22000000, volume: 400, percentage: 30, color: "bg-blue-500" },
      { name: "Rubber Thread", category: "Rubber Thread", revenue: 10500000, volume: 300, percentage: 14, color: "bg-amber-500" },
      { name: "Cyclized Rubber", category: "Raw Material", revenue: 5500000, volume: 300, percentage: 8, color: "bg-purple-500" },
    ],
  },
  "30d": {
    label: "30 Hari Terakhir",
    summary: { revenue: 312000000, volume: 7400, conversion: 89.2, activeUsers: 28 },
    chartData: [
      { label: "Minggu 1", revenue: 65000000, volume: 1500, orders: 6 },
      { label: "Minggu 2", revenue: 95000000, volume: 2200, orders: 8 },
      { label: "Minggu 3", revenue: 78000000, volume: 1900, orders: 7 },
      { label: "Minggu 4", revenue: 74000000, volume: 1800, orders: 5 },
    ],
    topProducts: [
      { name: "Resiprene 35", category: "Resin & Coating", revenue: 148500000, volume: 3300, percentage: 47, color: "bg-emerald-500" },
      { name: "RUBIN", category: "Resin & Coating", revenue: 88000000, volume: 1600, percentage: 28, color: "bg-blue-500" },
      { name: "Rubber Thread", category: "Rubber Thread", revenue: 45500000, volume: 1300, percentage: 15, color: "bg-amber-500" },
      { name: "Cyclized Rubber", category: "Raw Material", revenue: 30000000, volume: 1200, percentage: 10, color: "bg-purple-500" },
    ],
  },
  "ytd": {
    label: "Tahun Ini (YTD)",
    summary: { revenue: 1420000000, volume: 34500, conversion: 91.5, activeUsers: 64 },
    chartData: [
      { label: "Jan", revenue: 180000000, volume: 4200, orders: 12 },
      { label: "Feb", revenue: 210000000, volume: 5100, orders: 15 },
      { label: "Mar", revenue: 150000000, volume: 3600, orders: 10 },
      { label: "Apr", revenue: 240000000, volume: 5800, orders: 18 },
      { label: "Mei", revenue: 328000000, volume: 8000, orders: 24 },
      { label: "Jun", revenue: 312000000, volume: 7800, orders: 22 },
    ],
    topProducts: [
      { name: "Resiprene 35", category: "Resin & Coating", revenue: 680000000, volume: 15100, percentage: 48, color: "bg-emerald-500" },
      { name: "RUBIN", category: "Resin & Coating", revenue: 385000000, volume: 8800, percentage: 27, color: "bg-blue-500" },
      { name: "Rubber Thread", category: "Rubber Thread", revenue: 210000000, volume: 6000, percentage: 15, color: "bg-amber-500" },
      { name: "Cyclized Rubber", category: "Raw Material", revenue: 145000000, volume: 4600, percentage: 10, color: "bg-purple-500" },
    ],
  },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);

const formatWeight = (value: number) =>
  new Intl.NumberFormat("id-ID").format(value) + " kg";

export default function AnalyticsPanel() {
  const [range, setRange] = useState<TimeRange>("7d");
  const [metricTab, setMetricTab] = useState<"revenue" | "volume">("revenue");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeData = DATA_PRESETS[range];
  const chartPoints = activeData.chartData;

  // Find max value for normalization in SVG rendering
  const maxVal = Math.max(...chartPoints.map(p => metricTab === "revenue" ? p.revenue : p.volume), 1);

  // SVG Chart Config
  const width = 600;
  const height = 240;
  const padding = 35;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Convert points to SVG Coordinates
  const points = chartPoints.map((p, i) => {
    const val = metricTab === "revenue" ? p.revenue : p.volume;
    const x = padding + (i / (chartPoints.length - 1)) * chartWidth;
    const y = padding + chartHeight - (val / maxVal) * chartHeight;
    return { x, y, data: p };
  });

  // SVG Path generator helper
  const getLinePath = () => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      // Control points for smooth bezier curve
      const cpX1 = points[i - 1].x + chartWidth / (chartPoints.length - 1) / 3;
      const cpY1 = points[i - 1].y;
      const cpX2 = points[i].x - chartWidth / (chartPoints.length - 1) / 3;
      const cpY2 = points[i].y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  const getAreaPath = () => {
    const linePath = getLinePath();
    if (!linePath) return "";
    return `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
  };

  return (
    <div className="space-y-6 text-white pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>Analitik Performa Bisnis</span>
          </h2>
          <p className="text-xs text-white/40 mt-1 font-mono">
            Pantau penjualan, volume material, dan performa distributor IKN.
          </p>
        </div>

        {/* Date Presets Selector */}
        <div className="relative self-start sm:self-center">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 text-xs font-semibold text-white/80 transition"
          >
            <Calendar className="w-4 h-4 text-white/50" />
            <span>{activeData.label}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-white/40 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          
          <AnimatePresence>
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-1 w-48 rounded-xl border border-white/10 bg-[#141426]/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden"
                >
                  {(Object.keys(DATA_PRESETS) as TimeRange[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setRange(t);
                        setDropdownOpen(false);
                        setHoveredPoint(null);
                        setHoveredIndex(null);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition hover:bg-white/5 ${
                        range === t ? "text-emerald-400 bg-emerald-500/5 font-bold" : "text-white/60"
                      }`}
                    >
                      {DATA_PRESETS[t].label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Pendapatan",
            value: formatCurrency(activeData.summary.revenue),
            metric: "revenue",
            icon: <DollarSign className="w-4 h-4" />,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            trend: "+12.4% vs bln lalu",
            isUp: true,
          },
          {
            title: "Volume Penjualan",
            value: formatWeight(activeData.summary.volume),
            metric: "volume",
            icon: <Package className="w-4 h-4" />,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            trend: "+8.2% vs bln lalu",
            isUp: true,
          },
          {
            title: "Konversi Penawaran",
            value: `${activeData.summary.conversion}%`,
            icon: <Activity className="w-4 h-4" />,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
            trend: "-1.5% vs bln lalu",
            isUp: false,
          },
          {
            title: "Mitra B2B Aktif",
            value: `${activeData.summary.activeUsers} Akun`,
            icon: <Users className="w-4 h-4" />,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
            trend: "+3 pendaftaran baru",
            isUp: true,
          },
        ].map((item) => (
          <div
            key={item.title}
            onClick={() => {
              if (item.metric) setMetricTab(item.metric as "revenue" | "volume");
            }}
            className={`rounded-2xl border p-4 transition-all duration-300 relative overflow-hidden group cursor-pointer ${
              item.metric && metricTab === item.metric
                ? `${item.border} bg-white/[0.04]`
                : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
            }`}
          >
            {/* Background Accent glow */}
            <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full blur-2xl opacity-10 transition-all duration-500 group-hover:scale-125 ${item.color.replace("text-", "bg-")}`} />
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">{item.title}</span>
              <span className={`p-1.5 rounded-lg border ${item.color} ${item.border} ${item.bg}`}>
                {item.icon}
              </span>
            </div>
            
            <div className="space-y-1">
              <p className="text-lg font-bold font-mono text-white leading-none">{item.value}</p>
              <div className="flex items-center gap-1">
                {item.isUp ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
                )}
                <span className={`text-[9px] font-mono font-semibold ${item.isUp ? "text-emerald-400/80" : "text-red-400/80"}`}>
                  {item.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Graph & Product Performance Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: SVG Chart Card */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/[0.01] p-5 flex flex-col justify-between min-h-[360px] relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Grafik Trend Penjualan</h3>
              <p className="text-[10px] font-mono text-white/40 mt-0.5">
                Menampilkan {metricTab === "revenue" ? "Pendapatan kotor (IDR)" : "Volume Terkirim (Kg)"}
              </p>
            </div>
            <div className="flex bg-white/[0.03] border border-white/10 rounded-xl p-0.5">
              <button
                onClick={() => setMetricTab("revenue")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition ${
                  metricTab === "revenue" ? "bg-emerald-500/20 text-emerald-400" : "text-white/40 hover:text-white"
                }`}
              >
                Revenue (IDR)
              </button>
              <button
                onClick={() => setMetricTab("volume")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition ${
                  metricTab === "volume" ? "bg-blue-500/20 text-blue-400" : "text-white/40 hover:text-white"
                }`}
              >
                Volume (Kg)
              </button>
            </div>
          </div>

          {/* Interactive SVG Chart Container */}
          <div className="relative flex-1 w-full min-h-[220px] flex items-center justify-center">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-full select-none overflow-visible"
            >
              <defs>
                {/* Tailored Gradients */}
                <linearGradient id="glow-revenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="glow-volume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                const y = padding + chartHeight * ratio;
                const valueLabel = metricTab === "revenue"
                  ? formatCurrency(maxVal * (1 - ratio)).replace("Rp ", "")
                  : formatWeight(maxVal * (1 - ratio)).replace(" kg", "");

                return (
                  <g key={index} className="opacity-40">
                    <line
                      x1={padding}
                      y1={y}
                      x2={width - padding}
                      y2={y}
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeWidth={1}
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padding - 8}
                      y={y + 3}
                      fill="rgba(255, 255, 255, 0.25)"
                      fontSize={8}
                      fontFamily="monospace"
                      textAnchor="end"
                    >
                      {valueLabel}
                    </text>
                  </g>
                );
              })}

              {/* Area Under Curve */}
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={`area-${metricTab}-${range}`}
                d={getAreaPath()}
                fill={metricTab === "revenue" ? "url(#glow-revenue)" : "url(#glow-volume)"}
              />

              {/* Curve Line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                key={`line-${metricTab}-${range}`}
                d={getLinePath()}
                fill="none"
                stroke={metricTab === "revenue" ? "rgb(16, 185, 129)" : "rgb(59, 130, 246)"}
                strokeWidth={2}
              />

              {/* Interactive Hover Vertical Bar Indicator */}
              {hoveredIndex !== null && points[hoveredIndex] && (
                <line
                  x1={points[hoveredIndex].x}
                  y1={padding}
                  x2={points[hoveredIndex].x}
                  y2={height - padding}
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                />
              )}

              {/* Interactive Points Circles */}
              {points.map((p, idx) => (
                <g key={idx}>
                  {/* Invisible larger hover catcher circle */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={18}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => {
                      setHoveredPoint(p.data);
                      setHoveredIndex(idx);
                    }}
                    onMouseLeave={() => {
                      setHoveredPoint(null);
                      setHoveredIndex(null);
                    }}
                  />
                  
                  {/* Outer active glow circle */}
                  {hoveredIndex === idx && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={7}
                      fill={metricTab === "revenue" ? "rgba(16, 185, 129, 0.2)" : "rgba(59, 130, 246, 0.2)"}
                      className="pointer-events-none"
                    />
                  )}

                  {/* Core display circle */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={3.5}
                    fill={metricTab === "revenue" ? "rgb(16, 185, 129)" : "rgb(59, 130, 246)"}
                    stroke="#141426"
                    strokeWidth={1.5}
                    className="pointer-events-none"
                  />
                </g>
              ))}

              {/* X Axis Labels */}
              {points.map((p, idx) => (
                <text
                  key={idx}
                  x={p.x}
                  y={height - padding + 15}
                  fill="rgba(255, 255, 255, 0.3)"
                  fontSize={8}
                  fontFamily="monospace"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {p.data.label}
                </text>
              ))}
            </svg>

            {/* Custom Tooltip element positioned dynamically */}
            <AnimatePresence>
              {hoveredPoint && hoveredIndex !== null && points[hoveredIndex] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute p-3 rounded-xl border border-white/10 bg-[#16162a]/95 backdrop-blur-md shadow-2xl pointer-events-none text-left z-20 flex flex-col gap-1"
                  style={{
                    left: `${(points[hoveredIndex].x / width) * 100}%`,
                    top: `${Math.max(10, (points[hoveredIndex].y / height) * 100 - 30)}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider font-mono">
                    Periode: {hoveredPoint.label}
                  </span>
                  <div className="flex flex-col font-mono text-xs">
                    <span className="text-white font-semibold">
                      Revenue: {formatCurrency(hoveredPoint.revenue)}
                    </span>
                    <span className="text-white/60">
                      Volume: {formatWeight(hoveredPoint.volume)}
                    </span>
                    <span className="text-white/40 text-[10px]">
                      Pesanan: {hoveredPoint.orders} Order
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Top Performing Products */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-5 flex flex-col justify-between min-h-[360px]">
          <div className="space-y-1 mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Produk Unggulan</span>
            </h3>
            <p className="text-[10px] font-mono text-white/40">
              Breakdown volume pengapalan & penjualan.
            </p>
          </div>

          {/* Product breakdown bars */}
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {activeData.topProducts.map((p) => (
              <div key={p.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">{p.name}</span>
                    <span className="text-[9px] text-white/40 font-mono ml-2">({p.category})</span>
                  </div>
                  <span className="font-mono font-semibold text-white/80">{formatWeight(p.volume)}</span>
                </div>
                
                {/* Horizontal Progress Bar */}
                <div className="w-full h-2 rounded-full bg-white/[0.03] overflow-hidden border border-white/5 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p.percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full ${p.color} rounded-full`}
                  />
                </div>
                
                <div className="flex items-center justify-between text-[9px] text-white/40 font-mono">
                  <span>Kontribusi Volume: {p.percentage}%</span>
                  <span>Nilai: {formatCurrency(p.revenue)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] text-white/60 font-mono">Standar Global REACH & ISO</span>
            </div>
            <span className="text-[9px] text-white/30 font-mono">Update Realtime</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Order Status Distribution & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Order Status Breakdown */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-5 space-y-4">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Metrik Status Pesanan</h3>
            <p className="text-[10px] font-mono text-white/40 mt-0.5">Proporsi pemrosesan B2B.</p>
          </div>

          <div className="space-y-4">
            {/* Custom Multi-Color Bar */}
            <div className="w-full h-3 rounded-full bg-white/[0.02] flex overflow-hidden border border-white/5">
              <div className="bg-emerald-500 h-full hover:opacity-80 transition" style={{ width: "65%" }} title="Selesai: 65%" />
              <div className="bg-blue-500 h-full hover:opacity-80 transition" style={{ width: "25%" }} title="Diproses: 25%" />
              <div className="bg-amber-500 h-full hover:opacity-80 transition" style={{ width: "10%" }} title="Menunggu: 10%" />
            </div>

            {/* Labels & Details */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Selesai", val: "65%", count: "24 Order", color: "bg-emerald-500" },
                { label: "Diproses", val: "25%", count: "9 Order", color: "bg-blue-500" },
                { label: "Menunggu", val: "10%", count: "4 Order", color: "bg-amber-500" },
              ].map((item) => (
                <div key={item.label} className="text-center space-y-0.5 p-2 rounded-xl bg-white/[0.01] border border-white/5">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                    <span className="text-[9px] font-bold text-white/50">{item.label}</span>
                  </div>
                  <p className="text-xs font-bold font-mono text-white mt-1">{item.val}</p>
                  <p className="text-[8px] font-mono text-white/30">{item.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle & Right 2 Columns: Activity Log */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/[0.01] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Log Aktivitas Terbaru</h3>
              <p className="text-[10px] font-mono text-white/40 mt-0.5">Pembaruan sistem registrasi & pemesanan.</p>
            </div>
            <span className="text-[9px] text-white/40 font-mono bg-white/5 px-2 py-0.5 rounded-md border border-white/10">Live Feed</span>
          </div>

          <div className="space-y-3">
            {[
              {
                time: "10 mnt lalu",
                title: "Registrasi Baru PT Maju Perkasa",
                desc: "Mengirimkan formulasi B2B baru, butuh persetujuan admin.",
                type: "user",
                badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
              },
              {
                time: "2 jam lalu",
                title: "Pesanan Masuk ORD-004",
                desc: "PT Karet Makmur memesan 800 kg Resiprene 35 senilai Rp 36.000.000.",
                type: "order",
                badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
              },
              {
                time: "1 hari lalu",
                title: "Akun Distributor Disetujui",
                desc: "CV Karya Mandiri disetujui sebagai mitra B2B resmi.",
                type: "system",
                badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition border border-transparent hover:border-white/5"
              >
                <div className="flex items-start gap-3">
                  <span className={`px-2 py-0.5 rounded-md text-[8px] font-mono font-bold border shrink-0 mt-0.5 ${activity.badgeColor}`}>
                    {activity.type.toUpperCase()}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-none">{activity.title}</h4>
                    <p className="text-[10px] text-white/45 mt-1 font-mono">{activity.desc}</p>
                  </div>
                </div>
                <span className="text-[8px] font-mono text-white/30 shrink-0 mt-0.5">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
