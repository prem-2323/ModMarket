import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User, Bell, Shield, CreditCard, Globe, Palette, Key, Trash2,
  ChevronRight, Check, Toggle, Eye, EyeOff, Camera, Moon, Sun,
  Smartphone, Mail, Lock, AlertTriangle
} from "lucide-react";

/* ─── Sidebar tabs ─── */
const tabs = [
  { id: "general", label: "General", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security & Privacy", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Globe },
];

/* ─── Toggle switch ─── */
function Toggle2({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-colors ${on ? "bg-blue-600" : "bg-gray-200"}`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow"
        animate={{ left: on ? "calc(100% - 18px)" : "2px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );
}

/* ─── Section wrapper ─── */
function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {desc && <p className="text-xs text-gray-500 mt-0.5">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

/* ─── Row ─── */
function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div>
        <div className="text-xs font-medium text-gray-800">{label}</div>
        {desc && <div className="text-[11px] text-gray-400 mt-0.5">{desc}</div>}
      </div>
      {children}
    </div>
  );
}

/* ─── General Tab ─── */
function GeneralTab() {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="space-y-4">
      <Section title="Profile Information" desc="Update your public creator profile details.">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative group">
            <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold">DG</div>
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera size={14} className="text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-gray-900">DarkGaming</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Creator account • Joined Jan 2024</div>
            <button className="mt-2 text-[11px] text-blue-600 hover:underline">Change avatar</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Full Name", placeholder: "Dark Gaming", type: "text" },
            { label: "Username", placeholder: "darkgaming", type: "text" },
            { label: "Email Address", placeholder: "dark@gaming.com", type: "email" },
            { label: "Phone Number", placeholder: "+91 98765 43210", type: "tel" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-medium text-gray-700 mb-1">{f.label}</label>
              <input
                type={f.type}
                defaultValue={f.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
        <div className="mt-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            defaultValue="Professional mod creator specializing in graphics, performance, and immersive game environments."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <div className="mt-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">Country / Region</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option>India</option>
            <option>United States</option>
            <option>United Kingdom</option>
          </select>
        </div>
        <div className="flex justify-end mt-4">
          <motion.button
            className="bg-blue-600 text-white rounded-lg px-4 py-1.5 text-xs font-semibold hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          >
            Save Changes
          </motion.button>
        </div>
      </Section>

      <Section title="Password" desc="Change your account password.">
        {["Current Password", "New Password", "Confirm New Password"].map((label, i) => (
          <div key={label} className={i > 0 ? "mt-3" : ""}>
            <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
              <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••••"
                className="w-full pl-8 pr-9 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {i === 0 && (
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <motion.button
            className="bg-blue-600 text-white rounded-lg px-4 py-1.5 text-xs font-semibold hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          >
            Update Password
          </motion.button>
        </div>
      </Section>

      <Section title="Danger Zone" desc="Irreversible account actions.">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-orange-200 bg-orange-50 rounded-lg">
            <div>
              <div className="text-xs font-semibold text-orange-800">Deactivate Account</div>
              <div className="text-[11px] text-orange-600 mt-0.5">Temporarily disable your creator account.</div>
            </div>
            <button className="text-xs border border-orange-400 text-orange-700 rounded-lg px-3 py-1.5 hover:bg-orange-100 transition-colors font-medium">Deactivate</button>
          </div>
          <div className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
            <div>
              <div className="text-xs font-semibold text-red-800 flex items-center gap-1"><AlertTriangle size={11} /> Delete Account</div>
              <div className="text-[11px] text-red-600 mt-0.5">Permanently delete all your data. This cannot be undone.</div>
            </div>
            <button className="text-xs bg-red-600 text-white rounded-lg px-3 py-1.5 hover:bg-red-700 transition-colors font-medium flex items-center gap-1">
              <Trash2 size={11} /> Delete
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ─── Notifications Tab ─── */
function NotificationsTab() {
  const [notifs, setNotifs] = useState({
    newDownload: true, newReview: true, newSale: true, weeklyReport: true,
    productUpdates: false, marketingEmails: false, payoutAlerts: true,
    pushDownload: false, pushReview: true, pushSale: true,
  });
  const toggle = (key: keyof typeof notifs) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-4">
      <Section title="Email Notifications" desc="Choose which emails you'd like to receive.">
        {[
          { key: "newDownload", label: "New Downloads", desc: "When someone downloads one of your mods" },
          { key: "newReview", label: "New Reviews", desc: "When a customer leaves a review" },
          { key: "newSale", label: "New Sales", desc: "When you make a paid sale" },
          { key: "weeklyReport", label: "Weekly Report", desc: "Weekly summary of your performance" },
          { key: "payoutAlerts", label: "Payout Alerts", desc: "When a payout is processed or scheduled" },
          { key: "productUpdates", label: "Product Updates", desc: "New features and platform announcements" },
          { key: "marketingEmails", label: "Marketing Emails", desc: "Promotional content and offers" },
        ].map(n => (
          <SettingRow key={n.key} label={n.label} desc={n.desc}>
            <Toggle2 on={notifs[n.key as keyof typeof notifs]} onToggle={() => toggle(n.key as keyof typeof notifs)} />
          </SettingRow>
        ))}
      </Section>

      <Section title="Push Notifications" desc="Control in-app and browser notifications.">
        {[
          { key: "pushDownload", label: "Download Alerts", desc: "Browser push when a mod is downloaded" },
          { key: "pushReview", label: "Review Alerts", desc: "Browser push when a review is posted" },
          { key: "pushSale", label: "Sale Alerts", desc: "Browser push on every new sale" },
        ].map(n => (
          <SettingRow key={n.key} label={n.label} desc={n.desc}>
            <Toggle2 on={notifs[n.key as keyof typeof notifs]} onToggle={() => toggle(n.key as keyof typeof notifs)} />
          </SettingRow>
        ))}
      </Section>
    </div>
  );
}

/* ─── Security Tab ─── */
function SecurityTab() {
  const [twoFA, setTwoFA] = useState(false);
  const sessions = [
    { device: "Chrome on macOS", location: "Mumbai, IN", time: "Now", current: true },
    { device: "Firefox on Windows", location: "Delhi, IN", time: "2 days ago", current: false },
    { device: "Safari on iPhone", location: "Bangalore, IN", time: "5 days ago", current: false },
  ];
  return (
    <div className="space-y-4">
      <Section title="Two-Factor Authentication" desc="Add an extra layer of security to your account.">
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${twoFA ? "bg-green-50" : "bg-gray-50"}`}>
              <Smartphone size={16} className={twoFA ? "text-green-600" : "text-gray-400"} />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-900">Authenticator App</div>
              <div className="text-[11px] text-gray-400">{twoFA ? "2FA is enabled — your account is protected" : "Not configured"}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {twoFA && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Active</span>}
            <Toggle2 on={twoFA} onToggle={() => setTwoFA(!twoFA)} />
          </div>
        </div>
      </Section>

      <Section title="Login Activity" desc="Manage active sessions across your devices.">
        <div className="space-y-2">
          {sessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                  <Smartphone size={14} className="text-gray-500" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-900">{s.device}</div>
                  <div className="text-[10px] text-gray-400">{s.location} · {s.time}</div>
                </div>
              </div>
              {s.current ? (
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Current</span>
              ) : (
                <button className="text-[10px] text-red-500 hover:underline font-medium">Revoke</button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-end">
          <button className="text-xs text-red-500 hover:underline font-medium">Revoke all other sessions</button>
        </div>
      </Section>

      <Section title="API Keys" desc="Manage API keys for third-party integrations.">
        <div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-900 font-mono">mk_live_••••••••••••••••7f3a</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Created May 1, 2024 · Last used 2h ago</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-[10px] text-blue-600 border border-blue-200 rounded px-2 py-0.5 hover:bg-blue-50">
              <Key size={10} className="inline mr-1" />Reveal
            </button>
            <button className="text-[10px] text-red-500 border border-red-200 rounded px-2 py-0.5 hover:bg-red-50">Revoke</button>
          </div>
        </div>
        <motion.button
          className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:underline"
          whileHover={{ x: 2 }}
        >
          <Key size={12} /> Generate new API key
        </motion.button>
      </Section>
    </div>
  );
}

/* ─── Appearance Tab ─── */
function AppearanceTab() {
  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("blue");
  const [density, setDensity] = useState("default");

  const accents = ["blue", "indigo", "purple", "green", "orange"];
  const accentColors: Record<string, string> = {
    blue: "bg-blue-500", indigo: "bg-indigo-500", purple: "bg-purple-500", green: "bg-green-500", orange: "bg-orange-500"
  };

  return (
    <div className="space-y-4">
      <Section title="Theme" desc="Choose your preferred color scheme.">
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "light", label: "Light", icon: Sun },
            { id: "dark", label: "Dark", icon: Moon },
            { id: "system", label: "System", icon: Smartphone },
          ].map(t => {
            const Icon = t.icon;
            return (
              <motion.button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition-colors ${theme === t.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              >
                <Icon size={20} className={theme === t.id ? "text-blue-600" : "text-gray-500"} />
                <span className={`text-xs font-medium ${theme === t.id ? "text-blue-700" : "text-gray-700"}`}>{t.label}</span>
                {theme === t.id && <Check size={12} className="text-blue-600" />}
              </motion.button>
            );
          })}
        </div>
      </Section>

      <Section title="Accent Color" desc="Pick your brand accent color.">
        <div className="flex items-center gap-3">
          {accents.map(c => (
            <motion.button
              key={c}
              onClick={() => setAccent(c)}
              className={`w-8 h-8 rounded-full ${accentColors[c]} flex items-center justify-center`}
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
            >
              {accent === c && <Check size={14} className="text-white" />}
            </motion.button>
          ))}
        </div>
      </Section>

      <Section title="Display Density" desc="Control how compact the interface appears.">
        <div className="grid grid-cols-3 gap-3">
          {["compact", "default", "comfortable"].map(d => (
            <motion.button
              key={d}
              onClick={() => setDensity(d)}
              className={`p-3 border-2 rounded-xl text-xs font-medium capitalize transition-colors ${density === d ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            >
              {d}
            </motion.button>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ─── Billing Tab ─── */
function BillingTab() {
  return (
    <div className="space-y-4">
      <Section title="Current Plan" desc="Your active subscription.">
        <div className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center text-lg">📦</div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Free Plan</div>
              <div className="text-[11px] text-gray-500">5 GB storage · Unlimited mods · Standard support</div>
            </div>
          </div>
          <motion.button
            className="bg-blue-600 text-white rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            Upgrade
          </motion.button>
        </div>
      </Section>

      <Section title="Payment Method" desc="Manage your payment options.">
        <div className="space-y-2">
          {[
            { icon: "🏦", label: "HDFC Bank", detail: "••••7842", badge: "Primary" },
            { icon: "📱", label: "UPI — darkgaming@upi", detail: null, badge: null },
          ].map((pm, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2.5">
                <span className="text-base">{pm.icon}</span>
                <div>
                  <div className="text-xs font-semibold text-gray-900">{pm.label}</div>
                  {pm.detail && <div className="text-[10px] text-gray-400">{pm.detail}</div>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {pm.badge && <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-semibold">{pm.badge}</span>}
                <button className="text-[10px] text-red-500 hover:underline">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <motion.button
          className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:underline"
          whileHover={{ x: 2 }}
        >
          + Add payment method
        </motion.button>
      </Section>

      <Section title="Billing History" desc="Your recent invoices.">
        {[
          { date: "May 15, 2024", desc: "Free Plan", amount: "₹0.00", status: "Paid" },
          { date: "Apr 15, 2024", desc: "Starter Plan — 1 month", amount: "₹50.00", status: "Paid" },
          { date: "Mar 15, 2024", desc: "Starter Plan — 1 month", amount: "₹50.00", status: "Paid" },
        ].map((inv, i) => (
          <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
            <div>
              <div className="text-xs font-medium text-gray-900">{inv.desc}</div>
              <div className="text-[10px] text-gray-400">{inv.date}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-900">{inv.amount}</span>
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{inv.status}</span>
              <button className="text-[10px] text-blue-600 hover:underline">PDF</button>
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}

/* ─── Integrations Tab ─── */
function IntegrationsTab() {
  const [connected, setConnected] = useState<Record<string, boolean>>({ discord: true, github: false, twitter: false, google: true });
  const integrations = [
    { id: "discord", icon: "🎮", name: "Discord", desc: "Sync your creator role and announce new mods in your server." },
    { id: "github", icon: "⚙️", name: "GitHub", desc: "Link your GitHub profile to showcase open-source mods." },
    { id: "twitter", icon: "🐦", name: "Twitter / X", desc: "Auto-post when you publish a new mod." },
    { id: "google", icon: "🔍", name: "Google", desc: "Sign in with Google and sync your account." },
  ];
  return (
    <div className="space-y-4">
      <Section title="Connected Apps" desc="Manage third-party integrations with your ModMarket account.">
        <div className="space-y-3">
          {integrations.map((intg, i) => (
            <motion.div
              key={intg.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-base">{intg.icon}</div>
                <div>
                  <div className="text-xs font-semibold text-gray-900">{intg.name}</div>
                  <div className="text-[11px] text-gray-400 max-w-xs">{intg.desc}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {connected[intg.id] && (
                  <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Connected</span>
                )}
                <motion.button
                  onClick={() => setConnected(prev => ({ ...prev, [intg.id]: !prev[intg.id] }))}
                  className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors ${connected[intg.id] ? "border-red-300 text-red-600 hover:bg-red-50" : "border-blue-300 text-blue-600 hover:bg-blue-50"}`}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                >
                  {connected[intg.id] ? "Disconnect" : "Connect"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ─── Tab content map ─── */
const tabContent: Record<string, React.ReactNode> = {
  general: <GeneralTab />,
  notifications: <NotificationsTab />,
  security: <SecurityTab />,
  billing: <BillingTab />,
  appearance: <AppearanceTab />,
  integrations: <IntegrationsTab />,
};

/* ─── Main page ─── */
export function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="p-6 min-h-full bg-gray-50">
      <motion.div className="mb-5" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account, preferences, and integrations.</p>
      </motion.div>

      <div className="flex gap-5">
        {/* Sidebar */}
        <motion.div
          className="w-44 shrink-0"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 space-y-0.5">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors text-left ${isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  whileHover={!isActive ? { x: 2 } : {}}
                >
                  <Icon size={13} className="shrink-0" />
                  <span className="font-medium">{tab.label}</span>
                  {!isActive && <ChevronRight size={11} className="ml-auto text-gray-300" />}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
