import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, User, AtSign, Shield, Upload, BarChart2, Users } from "lucide-react";
import { signUp } from "../../../services/authService";

interface RegisterProps {
  onNavigate: (page: string) => void;
}

const features = [
  { icon: Shield, label: "Secure & Trusted", desc: "Your data and files are always protected with enterprise-grade security." },
  { icon: Upload, label: "Easy Asset Management", desc: "Upload, organize and manage all your mods in one place." },
  { icon: BarChart2, label: "Powerful Analytics", desc: "Track downloads, revenue and performance in real-time." },
  { icon: Users, label: "Grow Your Audience", desc: "Reach thousands of gamers and grow your creator brand." },
];

const providers = [
  { label: "Continue with Google", icon: "G" },
  { label: "Continue with GitHub", icon: "◎" },
  { label: "Continue with Discord", icon: "⊕" },
];

export function Register({ onNavigate }: RegisterProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accountType, setAccountType] = useState<"creator" | "buyer">("creator");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await signUp({ fullName, username, email, password, accountType });
      onNavigate("dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Left */}
        <div className="w-72 bg-gradient-to-b from-blue-600 to-blue-700 p-8 flex flex-col justify-between shrink-0">
          <div>
            <motion.div className="flex items-center gap-2 mb-8" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">M</span>
              </div>
              <span className="text-white font-bold text-base">ModMarket</span>
            </motion.div>
            <motion.h2 className="text-2xl font-bold text-white mb-2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
              Join ModMarket
            </motion.h2>
            <motion.p className="text-blue-100 text-sm mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.34 }}>
              Create your account and start building your creator journey.
            </motion.p>
            <div className="space-y-5">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div key={f.label} className="flex gap-3" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}>
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white shrink-0"><Icon size={16} /></div>
                    <div>
                      <div className="text-white text-xs font-semibold">{f.label}</div>
                      <div className="text-blue-100 text-[11px] mt-0.5">{f.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <motion.div className="mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
            <div className="bg-blue-500 rounded-xl p-4 h-24 flex items-center justify-center relative overflow-hidden">
              <div className="absolute bottom-0 left-4 w-20 h-14 bg-white/10 rounded-t-lg" />
              <motion.div
                className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center absolute bottom-3 right-8"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Upload size={14} className="text-white" />
              </motion.div>
            </div>
          </motion.div>
          <div className="text-blue-200 text-[10px] mt-4">© 2024 ModMarket Inc. All rights reserved.</div>
        </div>

        {/* Right */}
        <div className="flex-1 p-8 overflow-y-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
            <p className="text-sm text-gray-500 mb-5">
              Already have an account?{" "}
              <button onClick={() => onNavigate("login")} className="text-blue-600 font-medium hover:underline">Log in</button>
            </p>
          </motion.div>
          <div className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {[
                { label: "Full Name", icon: <User size={14} className="text-gray-400" />, placeholder: "Enter your full name", type: "text", value: fullName, onChange: (value: string) => setFullName(value), delay: 0.32 },
                { label: "Email Address", icon: <Mail size={14} className="text-gray-400" />, placeholder: "Enter your email", type: "email", value: email, onChange: (value: string) => setEmail(value), delay: 0.38 },
                { label: "Username", icon: <AtSign size={14} className="text-gray-400" />, placeholder: "Choose a username", type: "text", value: username, onChange: (value: string) => setUsername(value), delay: 0.44 },
              ].map((field) => (
                <motion.div key={field.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: field.delay }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">{field.icon}</div>
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(event) => field.onChange(event.target.value)}
                      placeholder={field.placeholder}
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </motion.div>
              ))}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { type: "creator" as const, label: "Creator", sub: "I want to upload & sell mods", icon: <User size={14} /> },
                  { type: "buyer" as const, label: "Buyer", sub: "I want to buy mods", icon: <Shield size={14} /> },
                ].map((opt) => (
                  <motion.button
                    key={opt.type}
                    onClick={() => setAccountType(opt.type)}
                    className={`flex items-center gap-2 border rounded-lg p-3 transition-colors ${accountType === opt.type ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"}`}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${accountType === opt.type ? "bg-blue-100" : "bg-gray-100"}`}>
                      <span className={accountType === opt.type ? "text-blue-600" : "text-gray-500"}>{opt.icon}</span>
                    </div>
                    <div className="text-left">
                      <div className={`text-xs font-semibold ${accountType === opt.type ? "text-blue-600" : "text-gray-700"}`}>{opt.label}</div>
                      <div className="text-[10px] text-gray-400">{opt.sub}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.56 }}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPass ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </motion.div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <motion.label className="flex items-start gap-2 cursor-pointer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.68 }}>
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5" />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{" "}and{" "}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </span>
            </motion.label>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.74 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </motion.button>
            <motion.div className="flex items-center gap-3 my-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.78 }}>
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </motion.div>
            <div className="space-y-2.5">
              {providers.map((provider, i) => (
                <motion.button
                  key={provider.label}
                  className="w-full flex items-center justify-center gap-2.5 border border-gray-300 rounded-lg py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.82 + i * 0.07 }}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                >
                  <span className="font-bold text-gray-600">{provider.icon}</span>
                  {provider.label}
                </motion.button>
              ))}
            </div>
          </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
