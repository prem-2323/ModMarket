import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ExternalLink, Settings, Shield, Camera } from "lucide-react";

const tabs = ["Profile Information", "Public Profile", "Payment Details", "Social Links", "Security"];

export function Profile() {
  const [activeTab, setActiveTab] = useState("Profile Information");

  return (
    <div className="p-6 min-h-full bg-gray-50">
      <motion.div className="mb-4" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account information, public profile, and preferences.</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="flex gap-0 border-b border-gray-200 mb-5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap relative ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22 }}
          className="grid grid-cols-3 gap-5"
        >
          <div className="col-span-2 space-y-5">
            <motion.div
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Profile Information</h2>
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center relative cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-white text-2xl font-bold">DG</span>
                    <motion.div
                      className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0"
                      whileHover={{ opacity: 1 }}
                    >
                      <Camera size={16} className="text-white" />
                    </motion.div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-[10px]">✎</span>
                    </div>
                  </motion.div>
                  <button className="text-xs text-blue-600 border border-blue-300 rounded-lg px-3 py-1 hover:bg-blue-50 transition-colors">Change Avatar</button>
                  <div className="text-[10px] text-gray-400">JPG, PNG or WEBP. Max 2MB.</div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Display Name <span className="text-red-500">*</span></label>
                    <input defaultValue="DarkGaming" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <div className="text-[10px] text-gray-400 mt-1">This is how your name will appear on the platform.</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                      <input defaultValue="darkgaming@example.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Username <span className="text-red-500">*</span></label>
                      <input defaultValue="darkgaming" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      <div className="text-[10px] text-gray-400 mt-1">This is your unique username.</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Bio <span className="text-red-500">*</span></label>
                    <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" rows={3} defaultValue="Game mod creator and 3D environment artist. Creating high-quality mods to enhance gaming experiences." />
                    <div className="text-[10px] text-gray-400 mt-1 text-right">84/500 characters</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Country</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option>India</option><option>United States</option><option>United Kingdom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Language</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option>English</option><option>Hindi</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <motion.button
                      className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
            >
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Update Password</h2>
              <div className="grid grid-cols-3 gap-4">
                {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">{label}</label>
                    <input type="password" placeholder={`Enter ${label.toLowerCase()}`} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <motion.button
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                >
                  Update Password
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.div
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Account Summary</h3>
              <div className="space-y-2.5">
                {[
                  { icon: "🗓", label: "Member Since", value: "Jan 15, 2024", badge: null },
                  { icon: "👤", label: "Account Type", value: null, badge: "Creator" },
                  { icon: "📦", label: "Total Mods", value: "24", badge: null },
                  { icon: "💰", label: "Total Revenue", value: "₹12,84,580.00", badge: null },
                  { icon: "⬇️", label: "Total Downloads", value: "45,201", badge: null },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-xs text-gray-600">{item.label}</span>
                    </div>
                    {item.badge
                      ? <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{item.badge}</span>
                      : <span className="text-xs font-semibold text-gray-900">{item.value}</span>
                    }
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Verifications</h3>
              <div className="space-y-2.5">
                {[
                  { icon: "▶", label: "YouTube Channel", value: "DarkGaming" },
                  { icon: "✉", label: "Email Address", value: "darkgaming@example.com" },
                ].map((v) => (
                  <div key={v.label} className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">{v.label}</div>
                      <div className="text-xs font-medium text-gray-900">{v.value}</div>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                      <Check size={9} />Verified
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-1">
                {[
                  { icon: <ExternalLink size={12} />, label: "View Public Profile" },
                  { icon: <Settings size={12} />, label: "Manage Subscription" },
                  { icon: <Shield size={12} />, label: "Security Settings" },
                ].map((action) => (
                  <motion.button
                    key={action.label}
                    className="w-full flex items-center gap-2 text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-2 py-1.5 transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    {action.icon}{action.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl border border-red-200 shadow-sm p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <h3 className="text-sm font-semibold text-red-600 mb-2">Danger Zone</h3>
              <p className="text-[11px] text-gray-600 font-semibold mb-1">Delete Account</p>
              <p className="text-[10px] text-gray-500 mb-3">Permanently delete your account and all your data. This action cannot be undone.</p>
              <motion.button
                className="w-full border border-red-300 text-red-600 rounded-lg py-1.5 text-xs font-semibold hover:bg-red-50 transition-colors"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              >
                Delete My Account
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
