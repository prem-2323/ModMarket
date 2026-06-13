import { TrendingUp, Download, ShoppingBag, Star, Percent, Calendar } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Animated dual-line SVG chart ─────────────────────────────────────────────
function DualAreaChart({ data }: { data: { date: string; revenue: number; last: number }[] }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1300;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const W = 560, H = 180, PL = 44, PR = 8, PT = 10, PB = 28;
  const cw = W - PL - PR, ch = H - PT - PB;
  const maxVal = Math.max(...data.map((d) => Math.max(d.revenue, d.last)));
  const range = maxVal || 1;
  const xs = data.map((_, i) => PL + (i / (data.length - 1)) * cw);
  const yRev = data.map((d) => PT + ch - (d.revenue / range) * ch);
  const yLast = data.map((d) => PT + ch - (d.last / range) * ch);

  const buildPath = (ys: number[]) => {
    const count = Math.max(2, Math.round(progress * (data.length - 1)) + 1);
    return xs.slice(0, count).map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  };

  const fullRevPath = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${yRev[i].toFixed(1)}`).join(" ");
  const areaPath = `${fullRevPath} L${xs[xs.length - 1].toFixed(1)},${(PT + ch).toFixed(1)} L${xs[0].toFixed(1)},${(PT + ch).toFixed(1)} Z`;
  const yTicks = [0, 10000, 20000, 30000, 40000, 50000].filter((v) => v <= maxVal * 1.1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      {yTicks.map((v) => {
        const y = PT + ch - (v / range) * ch;
        return (
          <g key={`yt-${v}`}>
            <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#F3F4F6" strokeWidth={1} />
            <text x={PL - 4} y={y + 3} textAnchor="end" fontSize={9} fill="#9CA3AF">₹{v / 1000}K</text>
          </g>
        );
      })}
      {data.map((d, i) => (
        <text key={`xl-${i}`} x={xs[i]} y={H - 6} textAnchor="middle" fontSize={9} fill="#9CA3AF">{d.date}</text>
      ))}
      <path d={areaPath} fill="#3B82F6" fillOpacity={0.08 * progress} />
      <path d={buildPath(yRev)} fill="none" stroke="#3B82F6" strokeWidth={2} strokeLinejoin="round" />
      <path d={buildPath(yLast)} fill="none" stroke="#9CA3AF" strokeWidth={1.5} strokeDasharray="4 4" strokeLinejoin="round" />
    </svg>
  );
}

// ── Animated mini sparkline ───────────────────────────────────────────────────
function Sparkline({ data, color }: { data: { v: number }[]; color: string }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 900;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setProgress(1 - Math.pow(1 - p, 2));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const W = 200, H = 60;
  const maxV = Math.max(...data.map((d) => d.v));
  const minV = Math.min(...data.map((d) => d.v));
  const range = (maxV - minV) || 1;
  const xs = data.map((_, i) => (i / (data.length - 1)) * W);
  const ys = data.map((d) => H - 6 - ((d.v - minV) / range) * (H - 12));
  const count = Math.max(2, Math.round(progress * (data.length - 1)) + 1);
  const path = xs.slice(0, count).map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
}

// ── Animated donut chart ──────────────────────────────────────────────────────
function DonutChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const cx = 70, cy = 70, r = 52, inner = 32;
  const total = data.reduce((s, d) => s + d.value, 0);
  let angle = -Math.PI / 2;
  const slices = data.map((d) => {
    const sweep = (d.value / total) * 2 * Math.PI * progress;
    const start = angle;
    angle += (d.value / total) * 2 * Math.PI;
    return { ...d, start, sweep };
  });

  const arc = (cx: number, cy: number, r: number, start: number, sweep: number) => {
    if (sweep <= 0) return "";
    const end = start + sweep;
    const large = sweep > Math.PI ? 1 : 0;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };

  return (
    <svg viewBox="0 0 140 140" className="w-full" style={{ height: 140 }}>
      {slices.map((s) => (
        <path
          key={s.name}
          d={arc(cx, cy, (r + inner) / 2, s.start, s.sweep)}
          fill="none"
          stroke={s.color}
          strokeWidth={r - inner}
          strokeLinecap="butt"
        />
      ))}
      <circle cx={cx} cy={cy} r={inner} fill="white" />
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize={9} fill="#6B7280">Total</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize={11} fontWeight="bold" fill="#111827">₹12.84L</text>
    </svg>
  );
}

// ── Animated traffic bar ─────────────────────────────────────────────────────
function TrafficBar({ pct, color, delay }: { pct: number; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-[80px] overflow-hidden">
      <motion.div
        className={`${color} h-1.5 rounded-full`}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 0.7, delay, ease: "easeOut" }}
      />
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────
const revenueData = [
  { date: "May 1", revenue: 18000, last: 14000 },
  { date: "May 6", revenue: 22000, last: 17000 },
  { date: "May 11", revenue: 19000, last: 21000 },
  { date: "May 16", revenue: 32540, last: 19000 },
  { date: "May 21", revenue: 28000, last: 23000 },
  { date: "May 26", revenue: 45000, last: 31000 },
  { date: "May 31", revenue: 38000, last: 28000 },
];

const miniCharts = [
  { label: "Downloads Overview", value: "45,201", sub: "↗ 24.3%", data: [{ v: 800 }, { v: 1200 }, { v: 2200 }, { v: 1800 }, { v: 2800 }, { v: 1600 }], color: "#10B981" },
  { label: "Sales Overview", value: "3,246", sub: "↗ 15.7%", data: [{ v: 120 }, { v: 180 }, { v: 260 }, { v: 200 }, { v: 240 }, { v: 185 }], color: "#8B5CF6" },
  { label: "Average Rating", value: "4.7 / 5", sub: "↗ 0.2", data: [{ v: 4.4 }, { v: 4.5 }, { v: 4.7 }, { v: 4.6 }, { v: 4.7 }, { v: 4.7 }], color: "#F59E0B" },
  { label: "Conversion Rate", value: "7.18%", sub: "↗ 1.2%", data: [{ v: 6 }, { v: 7 }, { v: 8 }, { v: 7.5 }, { v: 8.2 }, { v: 7.18 }], color: "#06B6D4" },
];

const pieData = [
  { name: "Ultra-VFX Shader Pack", value: 32.1, color: "#3B82F6" },
  { name: "Neon Horizon Overhaul", value: 30.2, color: "#8B5CF6" },
  { name: "Performance API v4", value: 19.1, color: "#6366F1" },
  { name: "Modern Interior Assets", value: 10.0, color: "#F59E0B" },
  { name: "Others", value: 8.6, color: "#D1D5DB" },
];

const geography = [
  { country: "India", downloads: 18245, pct: "40.4%" },
  { country: "United States", downloads: 8421, pct: "18.6%" },
  { country: "Brazil", downloads: 4562, pct: "10.1%" },
  { country: "Germany", downloads: 2845, pct: "6.3%" },
  { country: "Russia", downloads: 2145, pct: "4.7%" },
  { country: "Others", downloads: 8983, pct: "19.9%" },
];

const trafficSources = [
  { source: "Direct", visitors: 32450, pct: 42.1, barColor: "bg-blue-500" },
  { source: "Search Engines", visitors: 22315, pct: 28.9, barColor: "bg-green-500" },
  { source: "Social Media", visitors: 12850, pct: 16.7, barColor: "bg-purple-400" },
  { source: "Referrals", visitors: 6245, pct: 8.1, barColor: "bg-orange-400" },
  { source: "Others", visitors: 3120, pct: 4.0, barColor: "bg-gray-300" },
];

const statCards = [
  { icon: <TrendingUp size={15} className="text-blue-500" />, bg: "bg-blue-50", label: "Total Revenue", value: "₹12,84,580", sub: "↗ 18.6% vs Apr 1 – Apr 30" },
  { icon: <Download size={15} className="text-green-500" />, bg: "bg-green-50", label: "Total Downloads", value: "45,201", sub: "↗ 24.3% vs Apr 1 – Apr 30" },
  { icon: <ShoppingBag size={15} className="text-purple-500" />, bg: "bg-purple-50", label: "Total Sales", value: "3,246", sub: "↗ 15.7% vs Apr 1 – Apr 30" },
  { icon: <Percent size={15} className="text-orange-400" />, bg: "bg-orange-50", label: "Conversion Rate", value: "7.18%", sub: "↗ 1.2% vs Apr 1 – Apr 30" },
  { icon: <Star size={15} className="text-yellow-400" />, bg: "bg-yellow-50", label: "Average Rating", value: "4.7", sub: "↗ 0.2 vs Apr 1 – Apr 30" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function Analytics() {
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
          <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track your performance and grow your creator journey.</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-white transition-colors shadow-sm"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          >
            <Calendar size={13} />
            May 1 – May 31, 2024
            <span className="text-gray-400">▾</span>
          </motion.button>
          <motion.button
            className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-white transition-colors shadow-sm"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          >
            <Download size={13} />
            Export Report
          </motion.button>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-5 gap-3">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
          >
            <div className={`w-7 h-7 ${s.bg} rounded-lg flex items-center justify-center mb-2`}>{s.icon}</div>
            <div className="text-[10px] text-gray-500">{s.label}</div>
            <div className="text-base font-bold text-gray-900 my-0.5">{s.value}</div>
            <div className="text-[10px] text-green-600">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Revenue chart + Donut */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900">Revenue Overview</h2>
            <div className="flex gap-1">
              {["Daily", "Weekly", "Monthly"].map((t, i) => (
                <button
                  key={t}
                  className={`px-2 py-0.5 rounded text-xs transition-colors ${i === 0 ? "bg-blue-600 text-white font-medium" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <DualAreaChart data={revenueData} />
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-[11px] text-gray-500">This Period</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="20" height="4"><line x1="0" y1="2" x2="20" y2="2" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4 3" /></svg>
              <span className="text-[11px] text-gray-500">Last Period</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Top Performing Mods</h2>
            <select className="text-xs text-gray-600 border border-gray-200 rounded px-1.5 py-0.5 bg-white focus:outline-none">
              <option>By Revenue</option>
            </select>
          </div>
          <DonutChart data={pieData} />
          <div className="space-y-1.5 mt-1">
            {pieData.map((d, i) => (
              <motion.div
                key={d.name}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.06 }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-[10px] text-gray-600 truncate max-w-[120px]">{d.name}</span>
                </div>
                <span className="text-[10px] text-gray-500">{d.value}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mini sparkline cards */}
      <div className="grid grid-cols-4 gap-4">
        {miniCharts.map((chart, i) => (
          <motion.div
            key={chart.label}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.07)" }}
          >
            <div className="text-xs font-semibold text-gray-700">{chart.label}</div>
            <div className="text-lg font-bold text-gray-900 mt-1">{chart.value}</div>
            <div className="text-[11px] text-green-600 mb-2">{chart.sub} vs Apr 1 – Apr 30</div>
            <Sparkline data={chart.data} color={chart.color} />
          </motion.div>
        ))}
      </div>

      {/* Geography + Traffic */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5 }}
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Audience Geography</h2>
          <div className="w-full h-28 bg-blue-50 rounded-lg mb-3 flex items-center justify-center text-xs text-blue-300 overflow-hidden relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 60% 50%, #3B82F6 0%, transparent 60%), radial-gradient(circle at 30% 40%, #6366F1 0%, transparent 50%)" }}
            />
            <span className="relative z-10 text-blue-400">🌍 World Map</span>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                {["COUNTRY", "DOWNLOADS"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide pb-1.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {geography.map((g, i) => (
                <motion.tr
                  key={g.country}
                  className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 + i * 0.05 }}
                >
                  <td className="py-1.5 text-xs text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400 inline-block shrink-0" />
                      {g.country}
                    </div>
                  </td>
                  <td className="py-1.5 text-xs text-gray-500">{g.downloads.toLocaleString()} ({g.pct})</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.55 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900">Traffic Source</h2>
            <button className="text-xs text-blue-600 font-medium hover:underline">View Details</button>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                {["SOURCE", "VISITORS", "PERCENTAGE"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide pb-1.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trafficSources.map((t, i) => (
                <motion.tr
                  key={t.source}
                  className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.06 }}
                >
                  <td className="py-1.5 text-xs text-gray-700">{t.source}</td>
                  <td className="py-1.5 text-xs text-gray-500">{t.visitors.toLocaleString()}</td>
                  <td className="py-1.5">
                    <div className="flex items-center gap-2">
                      <TrafficBar pct={t.pct} color={t.barColor} delay={0.65 + i * 0.06} />
                      <span className="text-[10px] text-gray-500">{t.pct}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
              <tr className="border-t border-gray-200">
                <td className="py-1.5 text-xs font-semibold text-gray-900">Total</td>
                <td className="py-1.5 text-xs font-semibold text-gray-900">76,980</td>
                <td className="py-1.5 text-xs font-semibold text-gray-900">100%</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
