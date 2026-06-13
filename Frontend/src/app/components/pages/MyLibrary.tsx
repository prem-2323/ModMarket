import { Download, Search, Grid, List } from "lucide-react";
import { useState } from "react";

const items = [
  { name: "Neon Horizon Overhaul", desc: "Complete lighting and texture rework for the central district.", game: "Cyberpunk 2077", price: "₹149.00", purchased: "May 28, 2024", updated: "May 25, 2024", version: "v2.4.1", status: "Up to date", color: "bg-purple-900" },
  { name: "ScriptMaster Pro", desc: "Advanced visual scripting interface for complex NPC behaviors.", game: "Skyrim SE", price: "Free", purchased: "May 22, 2024", updated: "May 20, 2024", version: "v1.2.0", status: "Up to date", color: "bg-gray-800" },
  { name: "Ultra-VFX Shader Pack", desc: "PBR-ready shader suite with dynamic water and realistic subsurface.", game: "Unreal Engine 5", price: "₹299.00", purchased: "May 18, 2024", updated: "May 17, 2024", version: "v3.0.0", status: "Up to date", color: "bg-blue-900" },
  { name: "Modern Interior Assets", desc: "200+ high-quality furniture and prop models for modern environments.", game: "3ds Max", price: "₹99.00", purchased: "May 15, 2024", updated: "May 12, 2024", version: "v1.5.x", status: "Update Available", color: "bg-gray-600" },
  { name: "Retro-World Conversion", desc: "Total conversion mod that transforms modern game worlds into 90s-style.", game: "GTA V", price: "Free", purchased: "May 10, 2024", updated: "May 8, 2024", version: "v0.9-Beta", status: "Up to date", color: "bg-orange-800" },
  { name: "Performance API v4", desc: "Enterprise-grade optimization framework that boosts frame rate and reduces lag.", game: "Unity", price: "₹499.00", purchased: "May 5, 2024", updated: "May 4, 2024", version: "v4.2.0", status: "Up to date", color: "bg-indigo-900" },
];

export function MyLibrary() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  return (
    <div className="p-6 space-y-5 min-h-full bg-gray-50">
      <div>
        <h1 className="text-xl font-bold text-gray-900">My Library</h1>
        <p className="text-sm text-gray-500 mt-0.5">All the mods and assets you have purchased.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: "📦", bg: "bg-blue-50", label: "Total Items", value: "18", sub: "Assets in your library" },
          { icon: "⬇️", bg: "bg-green-50", label: "Total Downloads", value: "36", sub: "Total times downloaded" },
          { icon: "📅", bg: "bg-purple-50", label: "Member Since", value: "Jan 15, 2024", sub: "1 year, 4 months" },
          { icon: "🏆", bg: "bg-yellow-50", label: "Total Spent", value: "₹8,245.00", sub: "Across all purchases" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3 text-base`}>{s.icon}</div>
            <div className="text-[11px] text-gray-500 mb-1">{s.label}</div>
            <div className="text-base font-bold text-gray-900">{s.value}</div>
            <div className="text-[11px] text-gray-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 p-3 border-b border-gray-100">
          <div className="relative flex-1 max-w-64">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input placeholder="Search your library..." className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <select className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option>All Games</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option>All Categories</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option>Sort by: Most Recent</option>
          </select>
          <div className="flex gap-1 ml-auto">
            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}><Grid size={14} /></button>
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}><List size={14} /></button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="p-4">
            <div className="grid grid-cols-5 gap-3">
              {items.map((item) => (
                <div key={item.name} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`w-full h-24 ${item.color} relative`}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button className="bg-white text-gray-800 rounded-lg px-2 py-1 text-[10px] font-semibold flex items-center gap-1 hover:bg-gray-100 transition-colors">
                        <Download size={10} />Download
                      </button>
                    </div>
                    <div className="absolute top-1.5 right-1.5">
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${item.status === "Up to date" ? "bg-green-500 text-white" : "bg-orange-500 text-white"}`}>
                        {item.status === "Up to date" ? "✓" : "↑"}
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <div className="text-[11px] font-semibold text-gray-900 truncate leading-tight">{item.name}</div>
                    <div className="text-[9px] text-gray-400 mt-0.5 truncate">{item.game}</div>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[10px] font-bold text-blue-600">{item.price}</span>
                      <span className="text-[9px] text-gray-400">{item.version}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 text-xs text-gray-500 flex items-center justify-between border-t border-gray-100 mt-4">
              <span>Showing 1 to 6 of 18 items</span>
              <div className="flex items-center gap-1">
                {["‹", "1", "2", "3", "›"].map((p, i) => (
                  <button key={`pg-${i}`} className={`w-6 h-6 flex items-center justify-center rounded text-xs ${p === "1" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {["ITEM", "GAME", "PRICE", "PURCHASED ON", "LAST UPDATED", "STATUS", "ACTION"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-14 h-10 ${item.color} rounded-lg shrink-0`}></div>
                        <div>
                          <div className="text-xs font-semibold text-gray-900">{item.name}</div>
                          <div className="text-[10px] text-gray-500 max-w-[180px] truncate">{item.desc}</div>
                          <div className="text-[10px] text-blue-500 mt-0.5">{item.version}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded bg-gray-200"></div>
                        <span className="text-xs text-gray-700">{item.game}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium text-gray-900">{item.price}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{item.purchased}</td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-gray-600">{item.updated}</div>
                      <div className="text-[10px] text-gray-400">{item.version}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                        item.status === "Up to date" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                      }`}>{item.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                          <Download size={11} />Download
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 p-1">⋮</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 text-xs text-gray-500 border-t border-gray-100 flex items-center justify-between">
              <span>Showing 1 to 6 of 18 items</span>
              <div className="flex items-center gap-1">
                {["‹", "1", "2", "3", "›"].map((p, i) => (
                  <button key={`lp-${i}`} className={`w-6 h-6 flex items-center justify-center rounded text-xs ${p === "1" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}>{p}</button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
