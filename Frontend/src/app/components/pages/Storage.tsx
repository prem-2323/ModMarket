import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Cloud, HardDrive, Folder, AlertTriangle, TrendingUp, Download, Trash2 } from "lucide-react";

const files = [
  { name: "neon_horizon_overhaul_v2.4.1.zip", mod: "Neon Horizon Overhaul", size: "512 MB", date: "May 28, 2024", status: "Active" },
  { name: "scriptmaster_pro_v1.2.0.zip", mod: "ScriptMaster Pro", size: "256 MB", date: "May 22, 2024", status: "Active" },
  { name: "ultra_vfx_shader_pack_v3.0.0.zip", mod: "Ultra-VFX Shader Pack", size: "1.2 GB", date: "May 18, 2024", status: "Active" },
  { name: "modern_interior_assets_v1.5.x.zip", mod: "Modern Interior Assets", size: "890 MB", date: "May 15, 2024", status: "Active" },
  { name: "retro_world_conversion_v0.9.zip", mod: "Retro-World Conversion", size: "430 MB", date: "May 10, 2024", status: "Active" },
];

const upgradePlans = [
  { extra: "+2 GB", price: "₹50", total: "Total 7 GB Storage", highlight: true },
  { extra: "+5 GB", price: "₹100", total: "Total 10 GB Storage", highlight: false },
  { extra: "+20 GB", price: "₹250", total: "Total 25 GB Storage", highlight: false },
  { extra: "+45 GB", price: "₹500", total: "Total 50 GB Storage", highlight: false },
];

function AnimatedDonut() {
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
  const r = 38;
  const circ = 2 * Math.PI * r;
  const fill = Math.min(progress * 1.04, 1) * circ;
  return (
    <div className="relative w-28 h-28 shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#E5E7EB" strokeWidth="14" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="#EF4444" strokeWidth="14" strokeDasharray={`${fill} ${circ}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-gray-900">5.2 GB</span>
        <span className="text-[10px] text-gray-500">of 5 GB</span>
      </div>
    </div>
  );
}

export function Storage() {
  const statCards = [
    { icon: Cloud, iconClass: "text-blue-500", bg: "bg-blue-50", label: "Total Storage", value: "5 GB", sub: "Allocated Storage", subRed: false },
    { icon: HardDrive, iconClass: "text-red-500", bg: "bg-red-50", label: "Used Storage", value: "5.2 GB", sub: "104% of total used", subRed: true },
    { icon: Folder, iconClass: "text-purple-500", bg: "bg-purple-50", label: "Files Stored", value: "48", sub: "Total files", subRed: false },
    { icon: Cloud, iconClass: "text-gray-400", bg: "bg-gray-100", label: "Available Storage", value: "0 GB", sub: "No space remaining", subRed: true },
  ];

  return (
    <div className="p-6 space-y-5 min-h-full bg-gray-50">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-xl font-bold text-gray-900">Storage</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your storage usage, view upload history, and upgrade your plan.</p>
      </motion.div>

      <div className="grid grid-cols-4 gap-4">
        {statCards.map((s, i) => {
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
              <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
                <Icon size={18} className={s.iconClass} />
              </div>
              <div className="text-[11px] text-gray-500 mb-1">{s.label}</div>
              <div className="text-xl font-bold text-gray-900">{s.value}</div>
              <div className={`text-[11px] mt-1 ${s.subRed ? "text-red-500" : "text-gray-400"}`}>{s.sub}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Storage Usage</h2>
          <div className="flex items-center gap-6">
            <AnimatedDonut />
            <div className="flex-1">
              <motion.div
                className="text-2xl font-bold text-red-500 mb-0.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
              >
                104%
              </motion.div>
              <div className="text-sm font-semibold text-red-500 mb-2">Storage Limit Exceeded</div>
              <p className="text-xs text-gray-500 mb-3">You have exceeded your storage limit by 0.2 GB. Upgrade your plan to continue uploading mods without interruption.</p>
              <motion.button
                className="bg-blue-600 text-white rounded-lg px-4 py-1.5 text-xs font-semibold hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                Upgrade Plan
              </motion.button>
            </div>
          </div>
          <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
            {[
              { color: "bg-red-500", label: "Used Storage", val: "5.2 GB (104%)" },
              { color: "bg-gray-200", label: "Available Storage", val: "0 GB (0%)" },
            ].map((row, i) => (
              <motion.div
                key={row.label}
                className="flex items-center justify-between text-xs"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75 + i * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${row.color}`} />
                  <span className="text-gray-600">{row.label}</span>
                </div>
                <span className="text-gray-900 font-medium">{row.val}</span>
              </motion.div>
            ))}
            <div className="flex items-center justify-between text-xs font-semibold pt-1 border-t border-gray-100">
              <span className="text-gray-700">Total Storage</span>
              <span className="text-gray-900">5 GB</span>
            </div>
          </div>
          <motion.div
            className="mt-3 bg-red-50 border border-red-200 rounded-lg p-2.5 flex items-start gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
          >
            <AlertTriangle size={12} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-xs text-red-600">Storage limit exceeded! Upgrade your plan to continue uploading.</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Storage Plan</h2>
          <div className="border border-gray-200 rounded-lg p-3 mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900">Free Plan</div>
              <div className="text-xs text-gray-500">Renews Never (Free Plan)</div>
              <div className="text-[11px] text-gray-400 mt-0.5">5 GB Storage • Unlimited Mods • Limited Bandwidth</div>
            </div>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">Current Plan</span>
          </div>
          <h3 className="text-xs font-semibold text-gray-900 mb-2">Upgrade Your Plan</h3>
          <div className="grid grid-cols-2 gap-2">
            {upgradePlans.map((plan, i) => (
              <motion.div
                key={plan.extra}
                className={`border rounded-lg p-3 ${plan.highlight ? "border-blue-400 bg-blue-50" : "border-gray-200"}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.07)" }}
              >
                <div className="text-sm font-bold text-gray-900">{plan.extra}</div>
                <div className={`text-xs font-semibold mb-1 ${plan.highlight ? "text-blue-600" : "text-gray-700"}`}>{plan.price} / month</div>
                <div className="text-[10px] text-gray-500 mb-2">{plan.total}</div>
                <motion.button
                  className={`w-full rounded py-1 text-xs font-semibold transition-colors ${plan.highlight ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                >
                  Upgrade
                </motion.button>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 flex items-start gap-1.5">
            <TrendingUp size={11} className="text-blue-500 mt-0.5 shrink-0" />
            <p className="text-[10px] text-gray-500">Upgrading gives you instant additional storage.</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="bg-white rounded-xl border border-gray-200 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.55 }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Recent Uploads</h2>
          <button className="text-xs text-blue-600 font-medium hover:underline">View All Files</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {["FILE NAME", "MOD NAME", "SIZE", "UPLOADED ON", "STATUS", "ACTIONS"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {files.map((file, i) => (
              <motion.tr
                key={file.name}
                className="border-b border-gray-50 hover:bg-blue-50/20 transition-colors group"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.6 + i * 0.07 }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                      <span className="text-orange-600 text-[10px] font-bold">ZIP</span>
                    </div>
                    <span className="text-xs text-gray-700 font-mono">{file.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-700">{file.mod}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{file.size}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{file.date}</td>
                <td className="px-4 py-3">
                  <motion.span
                    className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full inline-block"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.07, type: "spring" }}
                  >
                    {file.status}
                  </motion.span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors"><Download size={12} /></button>
                    <button className="p-1 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 text-xs text-gray-500 border-t border-gray-100 flex items-center justify-between">
          <span>Showing 1 to 5 of 48 files</span>
          <div className="flex items-center gap-1">
            {["‹", "1", "2", "3", "...", "10", "›"].map((p, i) => (
              <motion.button
                key={`fp-${i}`}
                className={`w-6 h-6 flex items-center justify-center rounded text-xs ${p === "1" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              >
                {p}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
