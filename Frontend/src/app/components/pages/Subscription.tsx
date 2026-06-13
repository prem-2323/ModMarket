import { motion } from "motion/react";
import { Check, AlertTriangle, Download, Zap, Shield, Star } from "lucide-react";

const plans = [
  { name: "Free Plan", storage: "5 GB", desc: "Perfect for getting started", price: "₹0", tag: null, current: true, features: ["5 GB Storage", "Unlimited Mods", "Standard Support", "Limited Bandwidth"] },
  { name: "Starter Plan", storage: "7 GB", desc: "More space for your mods", price: "₹50", tag: "Popular", current: false, features: ["7 GB Storage", "Unlimited Mods", "Standard Support", "More Bandwidth"] },
  { name: "Pro Plan", storage: "10 GB", desc: "Great for growing creators", price: "₹100", tag: null, current: false, features: ["10 GB Storage", "Unlimited Mods", "Priority Support", "High Bandwidth"] },
  { name: "Pro+ Plan", storage: "25 GB", desc: "For professional creators", price: "₹250", tag: null, current: false, features: ["25 GB Storage", "Unlimited Mods", "Priority Support", "High Bandwidth"] },
  { name: "Studio Plan", storage: "50 GB", desc: "For teams and studios", price: "₹500", tag: null, current: false, features: ["50 GB Storage", "Unlimited Mods", "VIP Support", "Highest Bandwidth"] },
];

const historyRows = [
  { plan: "Starter Plan (7 GB)", badge: "Upgraded", amount: "₹50.00", status: "Completed", start: "May 15, 2024", end: "June 15, 2024", method: "UPI" },
  { plan: "Starter Plan (7 GB)", badge: "Renewed", amount: "₹50.00", status: "Completed", start: "April 15, 2024", end: "May 15, 2024", method: "UPI" },
];

const featureRows = [
  { name: "Storage", free: "5 GB", starter: "7 GB", pro: "10 GB", proPlus: "25 GB", studio: "50 GB" },
  { name: "Unlimited Mods", free: true, starter: true, pro: true, proPlus: true, studio: true },
  { name: "Priority Support", free: false, starter: false, pro: true, proPlus: true, studio: true },
  { name: "Bandwidth", free: "Limited", starter: "More", pro: "High", proPlus: "High", studio: "Highest" },
  { name: "Early Access", free: false, starter: false, pro: true, proPlus: true, studio: true },
];

const renderCell = (v: boolean | string) => {
  if (v === true) return <Check size={13} className="text-green-500 mx-auto" />;
  if (v === false) return <span className="text-gray-300 text-sm block text-center">—</span>;
  return <span className="text-xs text-gray-700 text-center block">{v}</span>;
};

export function Subscription() {
  return (
    <div className="p-6 space-y-5 min-h-full bg-gray-50">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-xl font-bold text-gray-900">Subscription</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your storage plan and subscription details.</p>
      </motion.div>

      {/* Upgrade banner */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 flex items-center justify-between shadow-md"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">You're on the Free Plan</div>
            <div className="text-blue-100 text-xs mt-0.5">Upgrade now to unlock more storage and premium features.</div>
          </div>
        </div>
        <motion.button
          className="bg-white text-blue-600 rounded-lg px-4 py-1.5 text-xs font-semibold hover:bg-blue-50 transition-colors shrink-0"
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
        >
          Upgrade Now
        </motion.button>
      </motion.div>

      {/* Plans */}
      <motion.div
        className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.18 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Choose Your Plan</h2>
            <p className="text-xs text-gray-500 mt-0.5">Upgrade your storage to upload larger assets and grow your creator business.</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="font-medium text-gray-700">All plans include:</span>
            {["Unlimited Mods", "Secure Storage", "Priority Support"].map((f) => (
              <div key={f} className="flex items-center gap-1">
                <Check size={11} className="text-green-500" /><span>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`border rounded-xl p-4 relative ${plan.current ? "border-blue-300 bg-blue-50/30" : "border-gray-200"}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 + i * 0.07 }}
              whileHover={{ y: -4, boxShadow: "0 10px 28px rgba(0,0,0,0.1)" }}
            >
              {plan.tag && (
                <motion.div
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 400 }}
                >
                  {plan.tag}
                </motion.div>
              )}
              <div className="text-xs font-bold text-blue-600 mb-1">{plan.name}</div>
              <div className="text-2xl font-bold text-gray-900">{plan.storage}</div>
              <div className="text-[11px] text-gray-500 mb-2">{plan.desc}</div>
              <div className="text-lg font-bold text-gray-900 mb-3">{plan.price} <span className="text-xs font-normal text-gray-500">/ month</span></div>
              <motion.button
                className={`w-full rounded-lg py-1.5 text-xs font-semibold transition-colors mb-3 ${plan.current ? "border border-gray-300 text-gray-700 hover:bg-gray-50" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                {plan.current ? "Current Plan" : "Upgrade Plan"}
              </motion.button>
              <div className="space-y-1.5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-1.5">
                    <Check size={11} className="text-green-500 shrink-0" />
                    <span className="text-[10px] text-gray-600">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Current Plan + Comparison */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.45 }}
        >
          <h2 className="text-sm font-semibold text-gray-900">Current Plan Details</h2>
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-lg">📦</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">Free Plan</span>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">Current</span>
                </div>
                <div className="text-xs text-gray-500">Renews Never (Free Plan)</div>
              </div>
            </div>
            <motion.button
              className="border border-blue-600 text-blue-600 rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              Upgrade Plan
            </motion.button>
          </div>
          <p className="text-xs text-gray-500">You are currently on the Free Plan. Upgrade to get more storage and additional benefits.</p>
          <div>
            <div className="flex justify-between text-xs text-gray-700 mb-1.5">
              <span>Storage Usage</span>
              <span className="font-medium text-red-600">5.2 GB / 5 GB Used</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-red-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1.5">You have used 100%+ of your storage.</div>
          </div>
          <motion.div
            className="bg-red-50 border border-red-200 rounded-lg p-2.5 flex items-start gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
          >
            <AlertTriangle size={12} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-xs text-red-600">Storage limit reached! Upgrade your plan to continue uploading new mods.</p>
          </motion.div>
          <div className="flex items-center gap-4 pt-1">
            {[
              { icon: <Shield size={11} className="text-green-600" />, label: "Secure Payments" },
              { icon: <Star size={11} className="text-yellow-500" />, label: "4.9 Rated" },
              { icon: <Zap size={11} className="text-blue-500" />, label: "Instant Upgrade" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1 text-[10px] text-gray-500">
                {b.icon}<span>{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.5 }}
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Plan Features Comparison</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase pb-2 w-28">FEATURES</th>
                {["FREE", "STARTER", "PRO", "PRO+", "STUDIO"].map((h) => (
                  <th key={h} className="text-[10px] font-semibold text-gray-400 uppercase pb-2 text-center">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureRows.map((row, i) => (
                <motion.tr
                  key={row.name}
                  className="border-b border-gray-50"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.07 }}
                >
                  <td className="py-2 text-xs text-gray-700 font-medium">{row.name}</td>
                  <td className="py-2">{renderCell(row.free)}</td>
                  <td className="py-2">{renderCell(row.starter)}</td>
                  <td className="py-2">{renderCell(row.pro)}</td>
                  <td className="py-2">{renderCell(row.proPlus)}</td>
                  <td className="py-2">{renderCell(row.studio)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* History */}
      <motion.div
        className="bg-white rounded-xl border border-gray-200 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.6 }}
      >
        <div className="px-5 py-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Subscription History</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {["PLAN", "AMOUNT", "STATUS", "START DATE", "END DATE", "PAYMENT METHOD", "INVOICE"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {historyRows.map((row, i) => (
              <motion.tr
                key={`hr-${i}`}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + i * 0.08 }}
              >
                <td className="px-4 py-3 text-xs font-medium text-gray-900">
                  {row.plan}
                  <span className={`ml-2 text-[9px] px-1.5 py-0.5 rounded font-semibold ${row.badge === "Upgraded" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>{row.badge}</span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-700">{row.amount}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full">{row.status}</span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600">{row.start}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{row.end}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{row.method}</td>
                <td className="px-4 py-3">
                  <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <Download size={11} />Download
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        className="text-center text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Need help? Read our <a href="#" className="text-blue-600 hover:underline">Subscription Guide</a> or <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
      </motion.div>
    </div>
  );
}
