import { motion } from "motion/react";
import { Download, Star, Package, DollarSign } from "lucide-react";

const mods = [
  { name: "Neon Horizon Overhaul", version: "v2.4.1", desc: "Complete lighting and texture rework for the central district, adding...", price: "₹149.00", rating: 4.9, reviews: 342, downloads: 12456, gain: "₹18,67,890", status: "Published", color: "bg-purple-900" },
  { name: "ScriptMaster Pro", version: "v1.2.0", desc: "An advanced visual scripting interface for complex NPC behaviors...", price: "Free", rating: 4.7, reviews: 128, downloads: 45830, gain: "₹0.00", status: "Published", color: "bg-gray-800" },
  { name: "Ultra-VFX Shader Pack", version: "v3.0.0", desc: "PBR-ready shader suite including dynamic water, realistic subsurface...", price: "₹299.00", rating: 5.0, reviews: 256, downloads: 8245, gain: "₹12,45,755", status: "Published", color: "bg-blue-900" },
  { name: "Modern Interior Assets", version: "v1.5.x", desc: "A collection of 200+ high-quality furniture and prop models for modern...", price: "₹99.00", rating: 4.6, reviews: 98, downloads: 15120, gain: "₹6,78,550", status: "Published", color: "bg-gray-600" },
  { name: "Retro-World Conversion", version: "v0.9-Beta", desc: "Total conversion mod that transforms modern game worlds into a 90s-style...", price: "Free", rating: 4.8, reviews: 76, downloads: 3145, gain: "₹0.00", status: "Published", color: "bg-orange-800" },
  { name: "Performance API v4", version: "v4.2.0", desc: "Enterprise-grade optimization framework that can boost frame rate...", price: "₹499.00", rating: 4.9, reviews: 346, downloads: 21650, gain: "₹21,59,350", status: "Published", color: "bg-indigo-900" },
];

const stats = [
  { icon: <Package size={18} className="text-blue-500" />, bg: "bg-blue-50", label: "Total Mods", value: "24", sub: "Active mods" },
  { icon: <Download size={18} className="text-green-500" />, bg: "bg-green-50", label: "Total Downloads", value: "58,426", sub: "All time" },
  { icon: <DollarSign size={18} className="text-purple-500" />, bg: "bg-purple-50", label: "Total Revenue", value: "₹1,24,580", sub: "All time earnings" },
  { icon: <Star size={18} className="text-yellow-400" />, bg: "bg-yellow-50", label: "Average Rating", value: "4.7", sub: "From 1,246 reviews" },
];

const TABLE_HEADERS = ["MOD", "DESCRIPTION", "PRICE", "RATING", "DOWNLOADS", "TOTAL GAIN", "STATUS", "ACTIONS"];
const PAGES = ["‹", "1", "2", "3", "4", "›"];

interface MyModsProps {
  onNavigate: (page: string) => void;
}

export function MyMods({ onNavigate }: MyModsProps) {
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
          <h1 className="text-xl font-bold text-gray-900">My Mods</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and track performance of all your uploaded mods.</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-white transition-colors shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={13} />
            Export Report
          </motion.button>
          <motion.button
            onClick={() => onNavigate("upload-mod")}
            className="flex items-center gap-1.5 bg-blue-600 text-white rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-base leading-none">+</span>
            Upload New Mod
          </motion.button>
        </div>
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
            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-[11px] text-gray-400 mt-1">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <motion.div
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.35 }}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {TABLE_HEADERS.map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mods.map((mod, i) => (
              <motion.tr
                key={mod.name}
                className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors cursor-pointer group"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.4 + i * 0.07 }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <motion.div
                      className={`w-14 h-10 ${mod.color} rounded-lg shrink-0`}
                      whileHover={{ scale: 1.06 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {mod.name}
                      </div>
                      <div className="text-[10px] text-gray-400">{mod.version}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px]">
                  <span className="line-clamp-2">{mod.desc}</span>
                </td>
                <td className="px-4 py-3 text-xs font-medium text-gray-900">{mod.price}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-gray-900">{mod.rating}</span>
                  </div>
                  <div className="text-[10px] text-gray-400">({mod.reviews} reviews)</div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-700">{mod.downloads.toLocaleString()}</td>
                <td className="px-4 py-3 text-xs font-medium text-gray-900">{mod.gain}</td>
                <td className="px-4 py-3">
                  <motion.span
                    className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full inline-block"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.07 }}
                  >
                    {mod.status}
                  </motion.span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-gray-400 hover:text-gray-700 p-1 text-base leading-none transition-colors opacity-0 group-hover:opacity-100">
                    ⋮
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 text-xs text-gray-500 border-t border-gray-100 flex items-center justify-between">
          <span>Showing 1 to 6 of 24 mods</span>
          <div className="flex items-center gap-1">
            {PAGES.map((p, i) => (
              <motion.button
                key={`page-${i}`}
                className={`w-6 h-6 flex items-center justify-center rounded text-xs transition-colors ${
                  p === "1" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
