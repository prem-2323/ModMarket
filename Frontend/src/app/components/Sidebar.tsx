import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, Package, BarChart3, DollarSign, Star, CreditCard,
  Upload, BookOpen, User, HardDrive, Settings, LogOut,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  {
    section: "OVERVIEW",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "my-mods", label: "My Mods", icon: Package },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
      { id: "sales", label: "Sales & Earnings", icon: DollarSign },
      { id: "reviews", label: "Reviews", icon: Star },
      { id: "payouts", label: "Payouts", icon: CreditCard },
    ],
  },
  {
    section: "MANAGE",
    items: [
      { id: "upload-mod", label: "Upload Mod", icon: Upload },
      { id: "my-library", label: "My Library", icon: BookOpen },
    ],
  },
  {
    section: "ACCOUNT",
    items: [
      { id: "profile", label: "Profile", icon: User },
      { id: "storage", label: "Storage", icon: HardDrive, badge: "5.2/5 GB", badgeRed: true },
      { id: "subscription", label: "Subscription", icon: Settings },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
];

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const { profile, logout } = useAuth();
  const displayName = profile?.username || "Guest";
  const initials = profile?.fullName ? profile.fullName.substring(0,2).toUpperCase() : "DG";

  return (
    <motion.div
      className="w-[168px] min-h-screen bg-white border-r border-gray-200 flex flex-col shrink-0"
      initial={{ x: -168, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-white font-bold text-xs">M</span>
          </motion.div>
          <span className="font-bold text-gray-900 text-sm">ModMarket</span>
        </div>
      </div>

      {/* User */}
      <div className="px-3 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold shrink-0"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {initials}
          </motion.div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-gray-900 truncate">@{displayName}</div>
            <div className="text-[10px] text-gray-500">Creator</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-2">
        {navItems.map((group, gi) => (
          <motion.div
            key={group.section}
            className="mb-2"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + gi * 0.08 }}
          >
            <div className="px-3 py-1.5 text-[9px] font-semibold text-gray-400 tracking-wider uppercase">
              {group.section}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs rounded-md mx-1 transition-colors text-left relative ${
                    isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  style={{ width: "calc(100% - 8px)" }}
                  whileHover={{ x: isActive ? 0 : 2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-1 bottom-1 w-0.5 bg-blue-600 rounded-full"
                        layoutId="sidebar-active-bar"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                  <Icon size={13} className="shrink-0" />
                  <span className="truncate flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-medium px-1 rounded shrink-0 ${item.badgeRed ? "text-red-500" : "text-gray-500"}`}>
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 py-2 px-1">
        <motion.button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.97 }}
        >
          <LogOut size={13} />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
