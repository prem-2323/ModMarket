import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, Bell, ChevronDown, Settings, LogOut, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface TopBarProps {
  onMenuClick?: () => void;
}

const notifications = [
  { title: "New download", desc: "Neon Horizon Overhaul was downloaded 12 times", time: "2m ago", dot: "bg-blue-500" },
  { title: "Review received", desc: "Ultra-VFX Shader Pack got a 5★ review", time: "1h ago", dot: "bg-yellow-400" },
];

const menuItems = [
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export function TopBar({ onMenuClick }: TopBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { profile, logout } = useAuth();

  const displayName = profile?.username || "Guest";
  const initials = profile?.fullName ? profile.fullName.substring(0, 2).toUpperCase() : "DG";

  const closeAll = () => { setShowDropdown(false); setShowNotifications(false); };

  return (
    <motion.div
      className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0"
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.button
        onClick={onMenuClick}
        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      >
        <Menu size={16} />
      </motion.button>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <motion.button
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors relative"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => { setShowNotifications(!showNotifications); setShowDropdown(false); }}
          >
            <Bell size={16} />
            <motion.span
              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              2
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                className="absolute right-0 top-9 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
              >
                <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-900">Notifications</span>
                  <button className="text-[10px] text-blue-600 hover:underline">Mark all read</button>
                </div>
                {notifications.map((n, i) => (
                  <motion.div
                    key={i}
                    className="px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-900">{n.title}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{n.desc}</div>
                    </div>
                    <span className="text-[10px] text-gray-400 shrink-0">{n.time}</span>
                  </motion.div>
                ))}
                <div className="px-4 py-2 text-center">
                  <button className="text-xs text-blue-600 hover:underline">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User menu */}
        <div className="relative">
          <motion.button
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-md px-2 py-1 transition-colors"
            onClick={() => { setShowDropdown(!showDropdown); setShowNotifications(false); }}
          >
            <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold">{initials}</div>
            <div>
              <div className="text-xs font-semibold text-gray-900 leading-none">{displayName}</div>
              <div className="text-[10px] text-gray-500">Creator</div>
            </div>
            <motion.div animate={{ rotate: showDropdown ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={12} className="text-gray-400" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
              >
                {menuItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.label}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={closeAll}
                    >
                      <Icon size={12} className="text-gray-400" />
                      {item.label}
                    </motion.button>
                  );
                })}
                <div className="border-t border-gray-100">
                  <motion.button
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    onClick={() => { closeAll(); logout(); }}
                  >
                    <LogOut size={12} />
                    Logout
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {(showDropdown || showNotifications) && (
        <div className="fixed inset-0 z-40" onClick={closeAll} />
      )}
    </motion.div>
  );
}
