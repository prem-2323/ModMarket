import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ShoppingCart, Download, DollarSign, TrendingUp, TrendingDown,
  Star, Calendar, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  ChevronDown, Eye
} from "lucide-react";

/* ─── Data ─── */
const revenueData = [
  { month: "May 5", total: 1200, mod: 900 },
  { month: "May 8", total: 1800, mod: 1400 },
  { month: "May 11", total: 1500, mod: 1100 },
  { month: "May 14", total: 2200, mod: 1700 },
  { month: "May 17", total: 1900, mod: 1400 },
  { month: "May 20", total: 2800, mod: 2100 },
  { month: "May 23", total: 2400, mod: 1800 },
  { month: "May 26", total: 3200, mod: 2500 },
  { month: "May 29", total: 2900, mod: 2200 },
  { month: "Jun 1", total: 3800, mod: 3000 },
  { month: "Jun 4", total: 3400, mod: 2700 },
  { month: "Jun 7", total: 4200, mod: 3300 },
];

const breakdownData = [
  { label: "Paid Mods", pct: 68, color: "#3B82F6" },
  { label: "Free Mods", pct: 18, color: "#10B981" },
  { label: "Bundles", pct: 9, color: "#8B5CF6" },
  { label: "Tips", pct: 5, color: "#F59E0B" },
];

const topEarning = [
  { name: "Performance API v4", version: "v4.2.0", color: "bg-indigo-900", revenue: "₹21,59,350", sales: 4330, change: "+12%" },
  { name: "Neon Horizon Overhaul", version: "v2.4.1", color: "bg-purple-900", revenue: "₹18,67,890", sales: 3142, change: "+8%" },
  { name: "Open Horizon Overhaul", version: "v3.1.2", color: "bg-blue-800", revenue: "₹14,23,540", sales: 2876, change: "+5%" },
  { name: "Ultra-VFX Shader Pack", version: "v3.0.0", color: "bg-blue-900", revenue: "₹12,45,755", sales: 2100, change: "-2%" },
  { name: "Modern Interior Assets", version: "v1.5.x", color: "bg-gray-600", revenue: "₹6,78,550", sales: 1890, change: "+3%" },
  { name: "Retro-World Conversion", version: "v0.9-Beta", color: "bg-orange-800", revenue: "₹4,01,230", sales: 1450, change: "+1%" },
];

const transactions = [
  { user: "IG", name: "ignite_paulo", mod: "Performance API v4", date: "Jun 10, 2024", amount: "₹499", status: "Paid" },
  { user: "MH", name: "moon_hacker", mod: "Neon Horizon Overhaul", date: "Jun 9, 2024", amount: "₹149", status: "Paid" },
  { user: "SV", name: "starverse_99", mod: "Ultra-VFX Shader Pack", date: "Jun 8, 2024", amount: "₹299", status: "Paid" },
  { user: "RX", name: "retro_xavier", mod: "Modern Interior Assets", date: "Jun 7, 2024", amount: "₹99", status: "Paid" },
  { user: "NF", name: "neon_flare", mod: "Performance API v4", date: "Jun 6, 2024", amount: "₹499", status: "Refunded" },
];

const featured = [
  { icon: "⭐", bg: "bg-yellow-50", border: "border-yellow-200", label: "Saturday", sub: "Top Seller Day", revenue: "₹1,28,400", extra: "+52% vs avg day" },
  { icon: "🚀", bg: "bg-blue-50", border: "border-blue-200", label: "Performance API v4", sub: "Best Selling Mod", revenue: "₹21,59,350", extra: "4,330 sales" },
  { icon: "📈", bg: "bg-green-50", border: "border-green-200", label: "Sunday", sub: "Highest Growth Day", revenue: "7.18%", extra: "Week-over-week" },
];

/* ─── Animated dual-line chart ─── */
function RevenueChart() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const W = 460, H = 140, PAD = 10;
  const maxV = Math.max(...revenueData.map(d => d.total));
  const xs = revenueData.map((_, i) => PAD + (i / (revenueData.length - 1)) * (W - PAD * 2));
  const ys = (v: number) => H - PAD - ((v / maxV) * (H - PAD * 2));

  const buildPath = (vals: number[]) => {
    const pts = vals.map((v, i) => ({ x: xs[i], y: ys(v) }));
    const cutIdx = Math.floor(pts.length * progress);
    const slice = pts.slice(0, cutIdx + 1);
    if (slice.length < 2) return "";
    return slice.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  };

  const buildArea = (vals: number[]) => {
    const pts = vals.map((v, i) => ({ x: xs[i], y: ys(v) }));
    const cutIdx = Math.floor(pts.length * progress);
    const slice = pts.slice(0, cutIdx + 1);
    if (slice.length < 2) return "";
    const line = slice.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    return `${line} L${slice[slice.length - 1].x.toFixed(1)},${H - PAD} L${slice[0].x.toFixed(1)},${H - PAD} Z`;
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <defs>
        <linearGradient id="areaGradTotal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="areaGradMod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={PAD} x2={W - PAD} y1={ys(maxV * t)} y2={ys(maxV * t)} stroke="#F3F4F6" strokeWidth="1" />
      ))}
      <path d={buildArea(revenueData.map(d => d.total))} fill="url(#areaGradTotal)" />
      <path d={buildArea(revenueData.map(d => d.mod))} fill="url(#areaGradMod)" />
      <path d={buildPath(revenueData.map(d => d.total))} fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={buildPath(revenueData.map(d => d.mod))} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Donut chart ─── */
function DonutChart() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const r = 42, cx = 60, cy = 60, circ = 2 * Math.PI * r;
  let offset = 0;
  const arcs = breakdownData.map(seg => {
    const dash = (seg.pct / 100) * circ * progress;
    const arc = { dash, offset, color: seg.color };
    offset += (seg.pct / 100) * circ;
    return arc;
  });

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F3F4F6" strokeWidth="14" />
      {arcs.map((a, i) => (
        <circle
          key={i} cx={cx} cy={cy} r={r} fill="none"
          stroke={a.color} strokeWidth="14"
          strokeDasharray={`${a.dash} ${circ - a.dash}`}
          strokeDashoffset={-a.offset}
        />
      ))}
    </svg>
  );
}

/* ─── Animated number ─── */
function AnimatedNumber({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 900;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return <span>{prefix}{val.toLocaleString()}{suffix}</span>;
}

/* ─── Main page ─── */
export function SalesEarnings() {
  const [period, setPeriod] = useState("Last 30 Days");

  const stats = [
    { icon: ShoppingCart, bg: "bg-blue-50", iconClass: "text-blue-500", label: "Total Sales", value: 3246, prefix: "", suffix: "", sub: "+12.4% vs 30 days ago", up: true },
    { icon: DollarSign, bg: "bg-green-50", iconClass: "text-green-500", label: "Total Revenue", value: 18500, prefix: "₹", suffix: "", sub: "+8.7% vs 30 days ago", up: true },
    { icon: ShoppingCart, bg: "bg-purple-50", iconClass: "text-purple-500", label: "This Week", value: 165, prefix: "₹", suffix: "", sub: "-2.1% vs last week", up: false },
  ];

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
          <h1 className="text-xl font-bold text-gray-900">Sales & Earnings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track your income, sales and payouts.</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-700 hover:bg-white transition-colors shadow-sm bg-white"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          >
            <Filter size={12} />Export
          </motion.button>
          <motion.button
            className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-700 hover:bg-white transition-colors shadow-sm bg-white"
            onClick={() => setPeriod(period === "Last 30 Days" ? "Last 7 Days" : "Last 30 Days")}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          >
            <Calendar size={12} />{period}<ChevronDown size={11} />
          </motion.button>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center`}>
                  <Icon size={18} className={s.iconClass} />
                </div>
                <span className={`text-[10px] font-semibold flex items-center gap-0.5 ${s.up ? "text-green-600" : "text-red-500"}`}>
                  {s.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                  {s.sub.split(" ")[0]}
                </span>
              </div>
              <div className="text-[11px] text-gray-500 mb-1">{s.label}</div>
              <div className="text-xl font-bold text-gray-900">
                <AnimatedNumber target={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-[11px] text-gray-400 mt-1">{s.sub}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Revenue Over Time */}
        <motion.div
          className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Revenue Overview</h2>
              <p className="text-[11px] text-gray-400 mt-0.5">Total revenue vs mod-specific revenue</p>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /><span className="text-gray-500">Total Revenue</span></div>
              <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /><span className="text-gray-500">Mod Revenue</span></div>
            </div>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <div className="text-2xl font-bold text-gray-900">₹18,500</div>
            <span className="text-xs text-green-600 font-semibold mb-1 flex items-center gap-0.5"><ArrowUpRight size={11} />8.7%</span>
            <span className="text-xs text-gray-400 mb-1">vs last month</span>
          </div>
          <div className="h-36">
            <RevenueChart />
          </div>
          <div className="flex justify-between mt-1">
            {revenueData.filter((_, i) => i % 3 === 0).map(d => (
              <span key={d.month} className="text-[9px] text-gray-400">{d.month}</span>
            ))}
          </div>
        </motion.div>

        {/* Revenue Breakdown */}
        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.32 }}
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Revenue Breakdown</h2>
          <p className="text-[11px] text-gray-400 mb-3">By mod type</p>
          <div className="flex items-center gap-4">
            <div className="relative w-28 h-28 shrink-0">
              <DonutChart />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-gray-900">₹18,500</span>
                <span className="text-[9px] text-gray-400">Total</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {breakdownData.map((seg, i) => (
                <motion.div
                  key={seg.label}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.07 }}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                    <span className="text-[10px] text-gray-600">{seg.label}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-900">{seg.pct}%</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Available balance */}
          <div className="mt-4 border-t border-gray-100 pt-3">
            <div className="text-[10px] text-gray-400 mb-0.5">Available Balance</div>
            <motion.div
              className="text-xl font-bold text-gray-900"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65, type: "spring", stiffness: 280 }}
            >
              ₹18,500
            </motion.div>
            <div className="text-[10px] text-gray-400 mt-0.5 mb-2">Available for payout</div>
            <div className="space-y-0.5 text-[10px] text-gray-500">
              <div className="flex justify-between"><span>Last Payout</span><span className="font-medium text-gray-700">Jan 10, 2024</span></div>
              <div className="flex justify-between"><span>Amount</span><span className="font-medium text-gray-700">₹24,801</span></div>
              <div className="flex justify-between"><span>Platform Fee (5%)</span><span className="font-medium text-gray-700">₹42,881</span></div>
            </div>
            <motion.button
              className="w-full mt-3 bg-blue-600 text-white rounded-lg py-1.5 text-xs font-semibold hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            >
              Request Payout
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Top Earning + Recent Transactions */}
      <div className="grid grid-cols-2 gap-4">
        {/* Top Earning Mods */}
        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Top Earning Mods</h2>
            <button className="text-xs text-blue-600 font-medium hover:underline">View All</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/60">
                {["MOD", "REVENUE", "SALES", "CHANGE"].map(h => (
                  <th key={h} className="px-4 py-2 text-left text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topEarning.map((mod, i) => (
                <motion.tr
                  key={mod.name}
                  className="border-b border-gray-50 hover:bg-blue-50/20 transition-colors group"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.48 + i * 0.07 }}
                >
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-6 ${mod.color} rounded shrink-0`} />
                      <div>
                        <div className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-none">{mod.name}</div>
                        <div className="text-[9px] text-gray-400">{mod.version}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-xs font-medium text-gray-900">{mod.revenue}</td>
                  <td className="px-4 py-2.5 text-xs text-gray-600">{mod.sales.toLocaleString()}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[10px] font-semibold flex items-center gap-0.5 ${mod.change.startsWith("+") ? "text-green-600" : "text-red-500"}`}>
                      {mod.change.startsWith("+") ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {mod.change}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.46 }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Recent Transactions</h2>
            <button className="text-xs text-blue-600 font-medium hover:underline">View All</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/60">
                {["USER", "MOD", "DATE", "AMOUNT", "STATUS"].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <motion.tr
                  key={`tx-${i}`}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.52 + i * 0.07 }}
                >
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-600">{tx.user}</div>
                      <span className="text-[10px] text-gray-700">{tx.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[10px] text-gray-600 max-w-[100px]">
                    <span className="truncate block">{tx.mod}</span>
                  </td>
                  <td className="px-3 py-2.5 text-[10px] text-gray-500">{tx.date}</td>
                  <td className="px-3 py-2.5 text-xs font-medium text-gray-900">{tx.amount}</td>
                  <td className="px-3 py-2.5">
                    <motion.span
                      className={`px-1.5 py-0.5 text-[9px] font-semibold rounded-full ${tx.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.07, type: "spring" }}
                    >
                      {tx.status}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-400">Showing 5 of 124 transactions</span>
            <button className="text-[10px] text-blue-600 font-medium hover:underline">Load more</button>
          </div>
        </motion.div>
      </div>

      {/* Featured insights */}
      <div className="grid grid-cols-3 gap-4">
        {featured.map((f, i) => (
          <motion.div
            key={f.label}
            className={`${f.bg} border ${f.border} rounded-xl p-4`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.09 }}
            whileHover={{ y: -2, boxShadow: "0 6px 18px rgba(0,0,0,0.07)" }}
          >
            <div className="text-2xl mb-2">{f.icon}</div>
            <div className="text-xs font-bold text-gray-900">{f.label}</div>
            <div className="text-[10px] text-gray-500 mb-2">{f.sub}</div>
            <div className="text-lg font-bold text-gray-900">{f.revenue}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">{f.extra}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
