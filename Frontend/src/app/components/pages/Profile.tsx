import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Camera, Loader2 } from "lucide-react";
import { updateProfile, deleteAccount, UserProfile } from "../../../services/userService";
import { useAuth } from "../../contexts/AuthContext";

export function Profile() {
  const { profile: contextProfile, refreshProfile, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const [profile, setProfile] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    if (contextProfile) {
      setProfile(contextProfile);
      setLoading(false);
    }
  }, [contextProfile]);

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await updateProfile(profile);
      setProfile(prev => ({ ...prev, ...result.updates }));
      await refreshProfile(); // Refresh global auth state
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to save profile", err);
      alert("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    setDeleting(true);
    try {
      await deleteAccount({
        username: profile.username || "",
        email: profile.email || "",
        fullName: profile.fullName || ""
      });
      alert("Account deleted successfully!");
      logout(); // Will handle token clearing and redirect
    } catch (err) {
      console.error("Failed to delete account", err);
      alert("Failed to delete account. Details do not match.");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 min-h-full bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-full bg-gray-50">
      <motion.div className="mb-4" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account information and preferences.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key="profile-info"
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
                    <span className="text-white text-2xl font-bold">{profile.fullName ? profile.fullName.substring(0,2).toUpperCase() : "DG"}</span>
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
                    <input 
                      value={profile.fullName || ""} 
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                    <div className="text-[10px] text-gray-400 mt-1">This is how your name will appear on the platform.</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                      <input 
                        value={profile.email || ""} 
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Username <span className="text-red-500">*</span></label>
                      <input 
                        value={profile.username || ""} 
                        onChange={(e) => handleChange("username", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                      <div className="text-[10px] text-gray-400 mt-1">This is your unique username.</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Bio</label>
                    <textarea 
                      value={profile.bio || ""} 
                      onChange={(e) => handleChange("bio", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
                      rows={3} 
                      placeholder="Tell us about yourself..." 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Country</label>
                      <input 
                        type="text"
                        value={profile.country || ""} 
                        onChange={(e) => handleChange("country", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="e.g. United States"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Language</label>
                      <input 
                        type="text"
                        value={profile.language || ""} 
                        onChange={(e) => handleChange("language", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="e.g. English"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <motion.button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    >
                      {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                      {saving ? "Saving..." : "Save Changes"}
                    </motion.button>
                  </div>
                </div>
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
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🗓</span>
                    <span className="text-xs text-gray-600">Member Since</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">{profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "Loading..."}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">👤</span>
                    <span className="text-xs text-gray-600">Account Type</span>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{profile.accountType || "User"}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📦</span>
                    <span className="text-xs text-gray-600">Total Mods</span>
                  </div>
                  <input 
                    type="text" 
                    value={profile.totalMods || ""} 
                    onChange={(e) => handleChange("totalMods", e.target.value)}
                    placeholder="e.g. 24"
                    className="w-24 text-right border border-gray-300 rounded px-2 py-1 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">💰</span>
                    <span className="text-xs text-gray-600">Total Revenue</span>
                  </div>
                  <input 
                    type="text" 
                    value={profile.totalRevenue || ""} 
                    onChange={(e) => handleChange("totalRevenue", e.target.value)}
                    placeholder="e.g. ₹12,84,580.00"
                    className="w-32 text-right border border-gray-300 rounded px-2 py-1 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">⬇️</span>
                    <span className="text-xs text-gray-600">Total Downloads</span>
                  </div>
                  <input 
                    type="text" 
                    value={profile.totalDownloads || ""} 
                    onChange={(e) => handleChange("totalDownloads", e.target.value)}
                    placeholder="e.g. 45,201"
                    className="w-28 text-right border border-gray-300 rounded px-2 py-1 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
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
                  { icon: "▶", label: "Username", value: profile.username || "Loading..." },
                  { icon: "✉", label: "Email Address", value: profile.email || "Loading..." },
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
              className="bg-white rounded-xl border border-red-200 shadow-sm p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className="text-sm font-semibold text-red-600 mb-2">Danger Zone</h3>
              <p className="text-[11px] text-gray-600 font-semibold mb-1">Delete Account</p>
              <p className="text-[10px] text-gray-500 mb-3">Permanently delete your account and all your data. This action cannot be undone.</p>
              <motion.button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full border border-red-300 text-red-600 rounded-lg py-1.5 text-xs font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              >
                {deleting ? <Loader2 size={16} className="animate-spin" /> : null}
                {deleting ? "Deleting..." : "Delete My Account"}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
