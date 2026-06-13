import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { DollarSign, TrendingUp, Calendar, Plus, Download, CheckCircle, Clock, XCircle } from "lucide-react";

/* ─── Data ─── */
const earningsData = [
  { label: "May 5", v: 3200 }, { label: "May 8", v: 4800 }, { label: "May 11", v: 4100 },
  { label: "May 14", v: 6200 }, { label: "May 17", v: 5400 }, { label: "May 20", v: 7800 },
  { label: "May 23", v: 6900 }, { label: "May 26", v: 9200 }, { label: "May 29", v: 8400 },
  { label: "Jun 1", v: 11000 }, { label: "Jun 4", v: 9800 }, { label: "Jun 7", v: 12400 },
];

const paymentMethods = [
  { icon: "🏦", name: "HDFC Bank", detail: "••••••7842", type: "Primary", status: "bg-green-100 text-green-700" },
  { icon: "🏦", name: "ICICI Bank", detail: "••••••3219", type: "Secondary", status: "bg-gray-100 text-gray-600" },
  { icon: "📱", name: "PayPal", detail: "dark@gaming.com", type: null, status: "bg-gray-100 text-gray-600" },
];

const historyRows = [
  { id: "#PAY-2024-001", date: "May 15, 2024", gross: "₹1,24,580", fee: "₹6,229", net: "₹1,18,351", method: "HDFC Bank ••••7842", status: "Completed" },
  { id: "#PAY-2024-002", date: "Apr 30, 2024", gross: "₹98,240", fee: "₹4,912", net: "₹93,328", method: "HDFC Bank ••••7842", status: "Completed" },
  { id: "#PAY-2024-003", date: "Apr 15, 2024", gross: "₹76,890", fee: "₹3,844", net: "₹73,046", method: "ICICI Bank ••••3219", status: "Completed" },
  { id: "#PAY-2024-004", date: "Mar 31, 2024", gross: "₹54,120", fee: "₹2,706", net: "₹51,414", method: "HDFC Bank ••••7842", status: "Completed" },
  { id: "#PAY-2024-005", date: "Mar 15, 2024", gross: "₹42,760", fee: "₹2,138", net: "₹40,622", method: "PayPal", status: "Processing" },
  { id: "#PAY-2024-006", date: "Feb 29, 2024", gross: "₹38,450", fee: "₹1,922", net: "₹36,528", method: "HDFC Bank ••••7842", status: "Failed" },
];

const breakdown = [
  { label: "Total Paid Out", value: "₹1,06,080", color: "#3B82F6", pct: 86 },
  { label: "Platform Fee (5%)", value: "₹14,880", color: "#10B981", pct: 12 },
  { label: "Tax (TDS 2%)", value: "₹3,340", color: "#8B5CF6", pct: 2.7 },
  { label: "Net Earnings", value: "₹3,240", color: "#F59E0B", pct: 2.6 },
];

/* ─── Animated line chart ─── */
function EarningsChart() {
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
  const W = 380, H = 100, PAD = 10;
  const max = Math.max(...earningsData.map(d => d.v));
  const xs = earningsData.map((_, i) => PAD + (i / (earningsData.length - 1)) * (W - PAD * 2));
  const ys = (v: number) => H - PAD - ((v / max) * (H - PAD * 2));
  const cutIdx = Math.floor(earningsData.length * progress);
  const slice = earningsData.slice(0, Math.max(cutIdx + 1, 1));
  const line = slice.map((d, i) => `${i === 0 ? "M" : "L"}${xs[i].toFixed(1)},${ys(d.v).toFixed(1)}`).join(" ");
  const area = slice.length > 1 ? `${line} L${xs[slice.length - 1].toFixed(1)},${H - PAD} L${xs[0].toFixed(1)},${H - PAD} Z` : "";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <defs>
        <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map(t => (
        <line key={t} x1={PAD} x2={W - PAD} y1={ys(max * t)} y2={ys(max * t)} stroke="#F3F4F6" strokeWidth="1" />
      ))}
      {area && <path d={area} fill="url(#payGrad)" />}
      {line && <path d={line} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

/* ─── Donut ─── */
function EarningsDonut() {
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
  const r = 40, cx = 56, cy = 56, circ = 2 * Math.PI * r;
  let offset = 0;
  const arcs = breakdown.map(seg => {
    const dash = (seg.pct / 100) * circ * progress;
    const arc = { dash, offset, color: seg.color };
    offset += (seg.pct / 100) * circ;
    return arc;
  });
  return (
    <svg viewBox="0 0 112 112" className="w-full h-full -rotate-90">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F3F4F6" strokeWidth="14" />
      {arcs.map((a, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none"
          stroke={a.color} strokeWidth="14"
          strokeDasharray={`${a.dash} ${circ - a.dash}`}
          strokeDashoffset={-a.offset}
        />
      ))}
    </svg>
  );
}

/* ─── Status badge ─── */
function StatusBadge({ status }: { status: string }) {
  if (status === "Completed") return (
    <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full">
      <CheckCircle size={9} /> Completed
    </span>
  );
  if (status === "Processing") return (
    <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-semibold rounded-full">
      <Clock size={9} /> Processing
    </span>
  );
  return (
    <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-semibold rounded-full">
      <XCircle size={9} /> Failed
    </span>
  );
}

/* ─── Page ─── */
export function Payouts() {
  return (
    <div className="p-6 space-y-5 min-h-full bg-gray-50">
      {/* Header */}
      <motion.div className="flex items-start justify-between" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Payouts</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track your earnings, payouts and payment methods.</p>
        </div>
        <motion.button
          className="flex items-center gap-1.5 border border-gray-300 bg-white rounded-lg px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 shadow-sm"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        >
          <Calendar size={12} /> Payout Settings
        </motion.button>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: DollarSign, bg: "bg-blue-50", iconClass: "text-blue-500", label: "Total Earnings", value: "₹18,500", sub: "Ready for payout", subRed: false },
          { icon: TrendingUp, bg: "bg-green-50", iconClass: "text-green-500", label: "Pending Payouts", value: "₹0", sub: "No pending payouts", subRed: false },
          { icon: DollarSign, bg: "bg-purple-50", iconClass: "text-purple-500", label: "Total Paid Out", value: "₹1,06,080", sub: "All time earnings", subRed: false },
          { icon: Calendar, bg: "bg-orange-50", iconClass: "text-orange-500", label: "Next Payout", value: "Jun 15, 2024", sub: "Next payout scheduled", subRed: false },
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
              <div className="text-lg font-bold text-gray-900">{s.value}</div>
              <div className="text-[11px] text-gray-400 mt-1">{s.sub}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Earnings chart + Payment methods */}
      <div className="grid grid-cols-3 gap-4">
        {/* Chart */}
        <motion.div
          className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.32 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Earnings Overview</h2>
            <span className="text-[10px] text-gray-400">Last 30 days</span>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <motion.div
              className="text-2xl font-bold text-gray-900"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              ₹1,24,580
            </motion.div>
            <span className="text-xs text-green-600 font-semibold mb-1">+8.7% vs last 30 days</span>
          </div>
          <div className="h-24 mb-1">
            <EarningsChart />
          </div>
          <div className="flex justify-between">
            {earningsData.filter((_, i) => i % 3 === 0).map(d => (
              <span key={d.label} className="text-[9px] text-gray-400">{d.label}</span>
            ))}
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.36 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900">Add Payout Method</h2>
            <motion.button
              className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline"
              whileHover={{ scale: 1.04 }}
            >
              <Plus size={12} /> Add
            </motion.button>
          </div>
          <div className="space-y-2">
            {paymentMethods.map((pm, i) => (
              <motion.div
                key={pm.name}
                className="flex items-center gap-2.5 border border-gray-200 rounded-lg p-2.5 hover:border-blue-300 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.42 + i * 0.08 }}
                whileHover={{ x: 2 }}
              >
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-base">{pm.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-900">{pm.name}</div>
                  <div className="text-[10px] text-gray-400">{pm.detail}</div>
                </div>
                {pm.type && (
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${pm.status}`}>{pm.type}</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Request payout */}
          <div className="mt-4 border-t border-gray-100 pt-3">
            <div className="text-[11px] text-gray-500 mb-2">No payout method limit and no transaction fees</div>
            <motion.button
              className="w-full bg-blue-600 text-white rounded-lg py-2 text-xs font-semibold hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            >
              Request Payout
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Payout History + Breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {/* History table */}
        <motion.div
          className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.44 }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Payout History</h2>
            <button className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
              <Download size={11} /> Export
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                {["PAYOUT ID", "DATE", "GROSS", "FEE", "NET AMOUNT", "METHOD", "STATUS"].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {historyRows.map((row, i) => (
                <motion.tr
                  key={row.id}
                  className="border-b border-gray-50 hover:bg-blue-50/20 transition-colors"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                >
                  <td className="px-3 py-2.5 text-[10px] font-mono text-blue-600">{row.id}</td>
                  <td className="px-3 py-2.5 text-[10px] text-gray-600">{row.date}</td>
                  <td className="px-3 py-2.5 text-[10px] font-medium text-gray-900">{row.gross}</td>
                  <td className="px-3 py-2.5 text-[10px] text-red-500">{row.fee}</td>
                  <td className="px-3 py-2.5 text-[10px] font-semibold text-green-600">{row.net}</td>
                  <td className="px-3 py-2.5 text-[10px] text-gray-500">{row.method}</td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={row.status} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-400">Showing 1–6 of 14 payouts</span>
            <div className="flex items-center gap-1">
              {["‹", "1", "2", "3", "›"].map((p, i) => (
                <motion.button
                  key={`pp-${i}`}
                  className={`w-6 h-6 flex items-center justify-center rounded text-xs ${p === "1" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                >
                  {p}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Earnings Breakdown */}
        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.48 }}
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Earnings Breakdown</h2>
          <div className="relative w-28 h-28 mx-auto mb-3">
            <EarningsDonut />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-gray-900">₹1,24,580</span>
              <span className="text-[9px] text-gray-400">Total</span>
            </div>
          </div>
          <div className="space-y-2">
            {breakdown.map((seg, i) => (
              <motion.div
                key={seg.label}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="text-[10px] text-gray-600">{seg.label}</span>
                </div>
                <span className="text-[10px] font-semibold text-gray-900">{seg.value}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 p-2.5 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-[10px] text-blue-600">Earnings breakdown excludes tax. Final payout may vary based on local tax exemptions.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
