import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, ThumbsUp, MessageSquare, TrendingUp, Filter, ChevronDown } from "lucide-react";

/* ─── Data ─── */
const ratingDist = [
  { stars: 5, count: 856, pct: 69 },
  { stars: 4, count: 246, pct: 20 },
  { stars: 3, count: 98, pct: 8 },
  { stars: 2, count: 31, pct: 2.5 },
  { stars: 1, count: 15, pct: 1.2 },
];

const analyticsData = [
  { label: "May 1", v: 18 }, { label: "May 5", v: 24 }, { label: "May 9", v: 20 },
  { label: "May 13", v: 32 }, { label: "May 17", v: 28 }, { label: "May 21", v: 38 },
  { label: "May 25", v: 34 }, { label: "May 29", v: 42 }, { label: "Jun 2", v: 36 },
  { label: "Jun 6", v: 48 }, { label: "Jun 10", v: 44 },
];

const sentiments = [
  { label: "Positive", count: 1028, color: "bg-green-500", pct: 83 },
  { label: "Neutral", count: 143, color: "bg-yellow-400", pct: 12 },
  { label: "Negative (UGH)", count: 75, color: "bg-red-400", pct: 6 },
];

const recentReviews = [
  { initials: "IG", name: "ignite_paulo", mod: "Performance API v4", rating: 5, date: "Jun 10, 2024", text: "Absolutely incredible mod! Performance API v4 took my FPS from 45 to 120 in dense areas. The optimization is outstanding.", helpful: 24 },
  { initials: "ML", name: "mh_felix", mod: "Neon Horizon Overhaul", rating: 4, date: "Jun 9, 2024", text: "Neon Horizon Download absolutely incredible. Performance was boosted by 80%. Highly recommend!", helpful: 18 },
  { initials: "SV", name: "ultra_VFX Shader Pack", mod: "Ultra-VFX Shader Pack", rating: 5, date: "Jun 8, 2024", text: "Ultra-VFX Shader Pack is a game changer. The water effects are incredibly realistic.", helpful: 15 },
  { initials: "RX", name: "retro_xavier", mod: "Modern Interior Assets", mod2: "Download — this is exactly what I was looking for!", rating: 4, date: "Jun 7, 2024", text: "Modern Interior Assets Download — this is exactly what I was looking for! Beautiful designs with incredible detail.", helpful: 12 },
  { initials: "NF", name: "neon_flare", mod: "Retro-World Conversion", rating: 5, date: "Jun 6, 2024", text: "Retro-World Conversion absolutely blew my mind. It transforms the entire game world seamlessly.", helpful: 9 },
];

const topRated = [
  { name: "Performance API v4", color: "bg-indigo-900", rating: 4.9, reviews: 346 },
  { name: "Neon Horizon Overhaul", color: "bg-purple-900", rating: 4.8, reviews: 342 },
  { name: "Ultra-VFX Shader Pack", color: "bg-blue-900", rating: 5.0, reviews: 256 },
  { name: "ScriptMaster Pro", color: "bg-gray-800", rating: 4.7, reviews: 128 },
  { name: "Modern Interior Assets", color: "bg-gray-600", rating: 4.6, reviews: 98 },
];

/* ─── Sparkline chart ─── */
function ReviewsChart() {
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

  const W = 320, H = 80, PAD = 8;
  const max = Math.max(...analyticsData.map(d => d.v));
  const xs = analyticsData.map((_, i) => PAD + (i / (analyticsData.length - 1)) * (W - PAD * 2));
  const ys = (v: number) => H - PAD - ((v / max) * (H - PAD * 2));
  const cutIdx = Math.floor(analyticsData.length * progress);
  const slice = analyticsData.slice(0, cutIdx + 1);
  const line = slice.map((d, i) => `${i === 0 ? "M" : "L"}${xs[analyticsData.indexOf(d)].toFixed(1)},${ys(d.v).toFixed(1)}`).join(" ");
  const area = slice.length > 1 ? `${line} L${xs[analyticsData.indexOf(slice[slice.length - 1])].toFixed(1)},${H - PAD} L${xs[0].toFixed(1)},${H - PAD} Z` : "";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <defs>
        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {area && <path d={area} fill="url(#revGrad)" />}
      {line && <path d={line} fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

/* ─── Stars ─── */
function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={size} className={s <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
      ))}
    </div>
  );
}

/* ─── Page ─── */
export function Reviews() {
  const [filter, setFilter] = useState("All Mods");
  const [tab, setTab] = useState<"weekly" | "monthly">("weekly");

  return (
    <div className="p-6 space-y-5 min-h-full bg-gray-50">
      {/* Header */}
      <motion.div className="flex items-start justify-between" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Reviews</h1>
          <p className="text-sm text-gray-500 mt-0.5">See customer feedback and ratings for your mods.</p>
        </div>
        <motion.button
          className="flex items-center gap-1.5 border border-gray-300 bg-white rounded-lg px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        >
          <Filter size={12} /> Filter Reviews <ChevronDown size={11} />
        </motion.button>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: MessageSquare, bg: "bg-blue-50", iconClass: "text-blue-500", label: "Total Reviews", value: "1,246", sub: "+40 vs 30 days ago", up: true },
          { icon: Star, bg: "bg-yellow-50", iconClass: "text-yellow-400", label: "Total Reviews", value: "856", sub: "+18 vs last month", up: true },
          { icon: Star, bg: "bg-green-50", iconClass: "text-green-500", label: "5-Star Reviews", value: "856", sub: "+18 vs last month", up: true },
          { icon: TrendingUp, bg: "bg-purple-50", iconClass: "text-purple-500", label: "Response Rate", value: "30", sub: "Last 30 days", up: false },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={`sc-${i}`}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            >
              <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
                <Icon size={18} className={s.iconClass} />
              </div>
              <div className="text-[11px] text-gray-500 mb-1">{s.label}</div>
              <div className="text-xl font-bold text-gray-900">{s.value}</div>
              <div className="text-[11px] text-gray-400 mt-1">{s.sub}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Rating distribution + Analytics */}
      <div className="grid grid-cols-2 gap-4">
        {/* Rating Distribution */}
        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.32 }}
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Rating Distribution</h2>
          <div className="flex items-start gap-6">
            <div className="text-center shrink-0">
              <div className="text-4xl font-bold text-gray-900">4.8</div>
              <Stars rating={5} size={14} />
              <div className="text-[11px] text-gray-400 mt-1">1,246 reviews</div>
            </div>
            <div className="flex-1 space-y-2">
              {ratingDist.map((row, i) => (
                <motion.div
                  key={row.stars}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.38 + i * 0.07 }}
                >
                  <span className="text-[11px] text-gray-600 w-4 text-right">{row.stars}</span>
                  <Star size={10} className="text-yellow-400 fill-yellow-400 shrink-0" />
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-2 rounded-full bg-yellow-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${row.pct}%` }}
                      transition={{ duration: 0.9, delay: 0.5 + i * 0.07, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-[11px] text-gray-500 w-12 text-right">{row.count.toLocaleString()}</span>
                  <span className="text-[10px] text-gray-400 w-8 text-right">({row.pct}%)</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sentiment */}
          <div className="mt-4 border-t border-gray-100 pt-3">
            <div className="text-xs font-semibold text-gray-700 mb-2">Sentiment Analysis</div>
            <div className="flex gap-2">
              {sentiments.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="flex-1 border border-gray-100 rounded-lg p-2 text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + i * 0.07 }}
                >
                  <div className={`w-2 h-2 rounded-full ${s.color} mx-auto mb-1`} />
                  <div className="text-xs font-bold text-gray-900">{s.count.toLocaleString()}</div>
                  <div className="text-[9px] text-gray-400 truncate">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Review Analytics */}
        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.36 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900">Review Analytics</h2>
            <div className="flex gap-1">
              {(["weekly", "monthly"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors font-medium ${tab === t ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <div className="text-xl font-bold text-gray-900">1,246</div>
            <span className="text-xs text-green-600 font-semibold mb-0.5">+12.4%</span>
          </div>
          <div className="text-[11px] text-gray-400 mb-3">Total reviews this period</div>
          <div className="h-20">
            <ReviewsChart />
          </div>
          <div className="flex justify-between mt-1">
            {analyticsData.filter((_, i) => i % 3 === 0).map(d => (
              <span key={d.label} className="text-[9px] text-gray-400">{d.label}</span>
            ))}
          </div>

          {/* Filter dropdown */}
          <div className="mt-4 border-t border-gray-100 pt-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Filter by:</span>
              {["All Mods", "5 Star", "4 Star", "Negative (UGH)"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2 py-0.5 text-[10px] rounded-full font-medium transition-colors ${filter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Reviews + Top Rated */}
      <div className="grid grid-cols-3 gap-4">
        {/* Recent Reviews */}
        <motion.div
          className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.44 }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Recent Reviews</h2>
            <button className="text-xs text-blue-600 font-medium hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentReviews.map((rev, i) => (
              <motion.div
                key={`rev-${i}`}
                className="px-4 py-3 hover:bg-gray-50/50 transition-colors"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    {rev.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-gray-900">{rev.name}</span>
                        <span className="text-[10px] text-gray-400 ml-2">on <span className="text-blue-500">{rev.mod}</span></span>
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 mb-1">
                      <Stars rating={rev.rating} size={10} />
                    </div>
                    <p className="text-[11px] text-gray-600 line-clamp-2">{rev.text}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <button className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-blue-600 transition-colors">
                        <ThumbsUp size={10} /> Helpful ({rev.helpful})
                      </button>
                      <span className="text-gray-200 mx-1">|</span>
                      <button className="text-[10px] text-blue-500 hover:underline">Reply</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="px-4 py-2.5 border-t border-gray-100 text-[10px] text-gray-400">
            Showing 1–5 of 1,246 reviews
          </div>
        </motion.div>

        {/* Top Rated Mods */}
        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.48 }}
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Top Rated Mods</h2>
          <div className="space-y-3">
            {topRated.map((mod, i) => (
              <motion.div
                key={mod.name}
                className="flex items-center gap-2.5 group cursor-pointer"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.07 }}
              >
                <div className={`w-10 h-8 ${mod.color} rounded-lg shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{mod.name}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Stars rating={Math.round(mod.rating)} size={9} />
                    <span className="text-[10px] text-gray-500">{mod.rating} ({mod.reviews})</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Most Mentioned Words */}
          <div className="mt-4 border-t border-gray-100 pt-3">
            <div className="text-xs font-semibold text-gray-700 mb-2">Most Mentioned Words</div>
            <div className="flex flex-wrap gap-1.5">
              {[["performance", "bg-blue-100 text-blue-700"], ["incredible", "bg-green-100 text-green-700"], ["graphics", "bg-purple-100 text-purple-700"], ["optimization", "bg-yellow-100 text-yellow-700"], ["realistic", "bg-pink-100 text-pink-700"], ["smooth", "bg-indigo-100 text-indigo-700"]].map(([word, cls]) => (
                <span key={word} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cls}`}>{word}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
