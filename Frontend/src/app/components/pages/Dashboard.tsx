import { TrendingUp, Download, ShoppingBag, Star, Upload, BarChart2, Tag, AlertTriangle, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

// ── Custom SVG dual-line chart (avoids recharts duplicate-key bug) ──────────
function DualLineChart({ data }: { data: { date: string; revenue: number; last: number }[] }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const W = 560, H = 190, PL = 44, PR = 8, PT = 10, PB = 28;
  const cw = W - PL - PR, ch = H - PT - PB;
  const maxVal = Math.max(...data.map((d) => Math.max(d.revenue, d.last)));
  const range = maxVal || 1;
  const xs = data.map((_, i) => PL + (i / (data.length - 1)) * cw);
  const yRev = data.map((d) => PT + ch - (d.revenue / range) * ch);
  const yLast = data.map((d) => PT + ch - (d.last / range) * ch);

  const buildPath = (ys: number[], p: number) => {
    const count = Math.max(2, Math.round(p * (data.length - 1)) + 1);
    return xs
      .slice(0, count)
      .map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`)
      .join(" ");
  };

  const revPath = buildPath(yRev, progress);
  const lastPath = buildPath(yLast, progress);
  const fullRevPath = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${yRev[i].toFixed(1)}`).join(" ");
  const areaPath = `${fullRevPath} L${xs[xs.length - 1].toFixed(1)},${(PT + ch).toFixed(1)} L${xs[0].toFixed(1)},${(PT + ch).toFixed(1)} Z`;
  const yTicks = [0, 20000, 40000, 60000, 80000].filter((v) => v <= maxVal * 1.1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      {yTicks.map((v) => {
        const y = PT + ch - (v / range) * ch;
        return (
          <g key={`yt-${v}`}>
            <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#F3F4F6" strokeWidth={1} />
            <text x={PL - 4} y={y + 3} textAnchor="end" fontSize={9} fill="#9CA3AF">
              ₹{v / 1000}K
            </text>
          </g>
        );
      })}
      {data.map((d, i) => (
        <text key={`xl-${i}`} x={xs[i]} y={H - 6} textAnchor="middle" fontSize={9} fill="#9CA3AF">
          {d.date}
        </text>
      ))}
      <path d={areaPath} fill="#3B82F6" fillOpacity={0.08 * progress} />
      <path d={revPath} fill="none" stroke="#3B82F6" strokeWidth={2} strokeLinejoin="round" />
      <path d={lastPath} fill="none" stroke="#9CA3AF" strokeWidth={1.5} strokeDasharray="4 4" strokeLinejoin="round" />
    </svg>
  );
}

// ── Animated counter ─────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: string; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  useEffect(() => {
    if (isNaN(numericValue)) { setDisplay(value); return; }
    const start = performance.now();
    const duration = 1000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = eased * numericValue;
      setDisplay(
        current >= 1000
          ? current.toLocaleString("en-IN", { maximumFractionDigits: 0 })
          : current.toFixed(1)
      );
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);
  return <span>{prefix}{display}{suffix}</span>;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const chartData = [
  { date: "May 1", revenue: 28000, last: 22000 },
  { date: "May 6", revenue: 32000, last: 25000 },
  { date: "May 11", revenue: 27000, last: 30000 },
  { date: "May 16", revenue: 35000, last: 28000 },
  { date: "May 21", revenue: 42000, last: 31000 },
  { date: "May 26", revenue: 68000, last: 40000 },
  { date: "May 31", revenue: 72000, last: 45000 },
];

const recentMods = [
  { name: "Neon Horizon Overhaul", desc: "Complete lighting and texture rework for the central district.", price: "₹149.00", rating: 4.9, reviews: 342, downloads: 12456, gain: "₹18,67,890", status: "Published", color: "bg-purple-900" },
  { name: "ScriptMaster Pro", desc: "Advanced visual scripting interface for complex NPC behaviors.", price: "Free", rating: 4.7, reviews: 128, downloads: 45830, gain: "₹0.00", status: "Published", color: "bg-gray-800" },
  { name: "Ultra-VFX Shader Pack", desc: "PBR-ready shader suite with dynamic water and realistic subsurface.", price: "₹299.00", rating: 5.0, reviews: 256, downloads: 8245, gain: "₹12,45,755", status: "Published", color: "bg-blue-900" },
];

const stats = [
  { icon: <TrendingUp size={18} className="text-blue-500" />, bg: "bg-blue-50", label: "Total Revenue", value: "12,84,580", prefix: "₹", sub: "↗ 18.6% vs last 30 days" },
  { icon: <Download size={18} className="text-green-500" />, bg: "bg-green-50", label: "Total Downloads", value: "45201", prefix: "", sub: "↗ 24.3% vs last 30 days" },
  { icon: <ShoppingBag size={18} className="text-purple-500" />, bg: "bg-purple-50", label: "Total Sales", value: "3246", prefix: "", sub: "↗ 15.7% vs last 30 days" },
  { icon: <Star size={18} className="text-yellow-400" />, bg: "bg-yellow-50", label: "Average Rating", value: "4.7", prefix: "", sub: "↗ 0.3 vs last 30 days" },
];

// ── Component ─────────────────────────────────────────────────────────────────
interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { profile } = useAuth();
  const displayName = profile?.username || "DarkGaming";

  return (
    <div className="p-6 space-y-5 min-h-full bg-gray-50">

      {/* Header */}
      <motion.div
        className="flex items-start justify-between"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="text-xl font-bold text-gray-900">Welcome back, @{displayName}! 👋</h1>
          <p className="text-sm text-gray-500 mt-0.5">Here's what's happening with your mods today.</p>
        </div>
        <button className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-white transition-colors shadow-sm">
          <Calendar size={13} />
          Last 30 Days
          <span className="text-gray-400">▾</span>
        </button>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
          >
            <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
              {stat.icon}
            </div>
            <div className="text-[11px] text-gray-500 mb-1">{stat.label}</div>
            <div className="text-xl font-bold text-gray-900">
              <AnimatedNumber value={stat.value} prefix={stat.prefix} />
            </div>
            <div className="text-[11px] text-green-600 mt-1">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart + Storage */}
      <div className="grid grid-cols-3 gap-4">
        {/* Chart */}
        <motion.div
          className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Performance Overview</h2>
            <div className="flex gap-1">
              <button className="px-2.5 py-1 bg-blue-600 text-white rounded text-xs font-medium">Revenue</button>
              <button className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 rounded text-xs transition-colors">Downloads</button>
            </div>
          </div>
          <DualLineChart data={chartData} />
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-[11px] text-gray-500">This Period</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="20" height="4"><line x1="0" y1="2" x2="20" y2="2" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4 3" /></svg>
              <span className="text-[11px] text-gray-500">Last Period</span>
            </div>
          </div>
        </motion.div>

        {/* Right panel */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {/* Storage */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">Storage Usage</h3>
              <button className="text-xs text-blue-600 font-medium hover:underline">Upgrade</button>
            </div>
            <div className="text-sm font-bold text-gray-900 mb-1">5.2 GB / 5 GB</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
              <motion.div
                className="bg-red-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              />
            </div>
            <div className="text-xs text-red-500 mb-3">104% of your total capacity used</div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 mb-3">
              <div className="flex items-start gap-2">
                <AlertTriangle size={12} className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-xs text-red-600">Storage limit exceeded! Please upgrade your plan to continue uploading mods...</p>
              </div>
            </div>
            <motion.button
              className="w-full bg-blue-600 text-white rounded-lg py-1.5 text-xs font-semibold hover:bg-blue-700 transition-colors"
              whileTap={{ scale: 0.97 }}
            >
              Upgrade Plan
            </motion.button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <Upload size={14} className="text-blue-500" />, label: "Upload New Mod", page: "upload-mod" },
                { icon: <BarChart2 size={14} className="text-purple-500" />, label: "View Analytics", page: "analytics" },
                { icon: <Tag size={14} className="text-green-500" />, label: "Create Promotion", page: "" },
              ].map((action, i) => (
                <motion.button
                  key={action.label}
                  onClick={() => action.page && onNavigate(action.page)}
                  className="flex flex-col items-center gap-1.5 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-200 transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {action.icon}
                  <span className="text-[10px] text-gray-600 text-center leading-tight">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Mods */}
      <motion.div
        className="bg-white rounded-xl border border-gray-200 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Recent Mods</h2>
          <button onClick={() => onNavigate("my-mods")} className="text-xs text-blue-600 font-medium hover:underline">
            View All Mods
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {["MOD", "TITLE & DESCRIPTION", "PRICE", "REVIEWS", "DOWNLOADS", "TOTAL GAIN", "STATUS", "ACTIONS"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentMods.map((mod, i) => (
              <motion.tr
                key={mod.name}
                className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.55 + i * 0.07 }}
              >
                <td className="px-4 py-3">
                  <div className={`w-12 h-9 ${mod.color} rounded-md`} />
                </td>
                <td className="px-4 py-3">
                  <div className="text-xs font-semibold text-gray-900">{mod.name}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5 max-w-[180px] truncate">{mod.desc}</div>
                </td>
                <td className="px-4 py-3 text-xs font-medium text-gray-900">{mod.price}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-gray-900">{mod.rating}</span>
                  </div>
                  <div className="text-[10px] text-gray-400">({mod.reviews})</div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-700">{mod.downloads.toLocaleString()}</td>
                <td className="px-4 py-3 text-xs font-medium text-gray-900">{mod.gain}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full">
                    {mod.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-gray-400 hover:text-gray-700 p-1 text-base leading-none transition-colors">⋮</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 text-xs text-gray-500 border-t border-gray-100 flex items-center justify-between">
          <span>Showing 1 to 3 of 24 mods</span>
          <div className="flex items-center gap-1">
            {(["‹", "1", "2", "3", "...", "8", "›"] as const).map((p, i) => (
              <button
                key={`page-${i}`}
                className={`w-6 h-6 flex items-center justify-center rounded text-xs transition-colors ${
                  p === "1" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
