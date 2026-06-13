import { useState } from "react";
import { Bold, Italic, List, Link, Upload, CheckCircle, AlertTriangle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const checklist = [
  { label: "Mod Title", done: true },
  { label: "Description", done: true },
  { label: "Thumbnail", done: true },
  { label: "At least 3 Screenshots", done: true },
  { label: "Mod File", done: false },
  { label: "Price Set", done: true },
];

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.09 } }),
};

export function UploadMod() {
  const [price, setPrice] = useState("149.00");
  const [isFree, setIsFree] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const platformFee = isFree ? 0 : Math.round(parseFloat(price || "0") * 0.05 * 100) / 100;
  const youEarn = isFree ? 0 : Math.round((parseFloat(price || "0") - platformFee) * 100) / 100;

  return (
    <div className="p-6 min-h-full bg-gray-50">

      {/* Header */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
          <span>Dashboard</span>
          <ChevronRight size={11} />
          <span className="text-gray-700 font-medium">Upload New Mod</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Upload New Mod</h1>
        <p className="text-sm text-gray-500 mt-0.5">Add your mod details and upload files. After submission, it will be reviewed by our team.</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-5">
        {/* ── Main form ── */}
        <div className="col-span-2 space-y-4">

          {/* Step 1 — Basic Info */}
          <motion.div
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
            custom={0} variants={cardVariants} initial="hidden" animate="visible"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
              <h2 className="text-sm font-semibold text-gray-900">Basic Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Mod Title <span className="text-red-500">*</span>
                </label>
                <input
                  defaultValue="Neon Horizon Overhaul"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  placeholder="Choose a title that describes your mod"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Game <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow">
                  <option>Cyberpunk 2077</option>
                  <option>GTA V</option>
                  <option>Skyrim SE</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-shadow">
                  <option>Environment Mods</option>
                  <option>Character Mods</option>
                  <option>Gameplay Mods</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Version <span className="text-red-500">*</span>
                </label>
                <input
                  defaultValue="v2.4.1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  placeholder="e.g., 1.0.0"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-shadow"
                rows={2}
                defaultValue="Complete lighting and texture rework for the central district, adding realistic reflections, improved shadows, and neon effects."
                placeholder="Briefly describe what your mod does (Max 200 characters)"
              />
              <div className="text-right text-[10px] text-gray-400 mt-0.5">128/200</div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Full Description <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
                <div className="flex items-center gap-1 border-b border-gray-200 px-3 py-2 bg-gray-50">
                  {[Bold, Italic, List, Link].map((Icon, i) => (
                    <button key={i} className="p-1 rounded hover:bg-gray-200 text-gray-600 transition-colors">
                      <Icon size={12} />
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full px-3 py-2 text-sm text-gray-900 focus:outline-none resize-none"
                  rows={5}
                  defaultValue={`Neon Horizon Overhaul is a complete visual enhancement mod for Cyberpunk 2077 that transforms the central district into a more immersive and realistic experience.\n\nFeatures:\n• Complete lighting rework\n• High-resolution textures\n• Realistic neon reflections\n• Optimized performance`}
                />
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[10px] text-gray-400">Provide a detailed description of your mod</span>
                <span className="text-[10px] text-gray-400">326/2000</span>
              </div>
            </div>
          </motion.div>

          {/* Step 2 — Media */}
          <motion.div
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
            custom={1} variants={cardVariants} initial="hidden" animate="visible"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
              <h2 className="text-sm font-semibold text-gray-900">Media</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Thumbnail Image <span className="text-red-500">*</span>
                </label>
                <motion.div
                  className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-blue-400 transition-colors h-28 relative"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="absolute inset-0 bg-purple-900 opacity-80" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <motion.div whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Upload size={16} className="text-white" />
                    </motion.div>
                    <span className="text-[11px] text-white font-medium">Change Image</span>
                    <span className="text-[10px] text-white/60">PNG, JPG up to 5MB</span>
                  </div>
                </motion.div>
                <div className="text-[10px] text-gray-400 mt-1">This image will represent your mod</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Screenshots <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {["bg-purple-900", "bg-blue-900", "bg-gray-700"].map((bg, i) => (
                    <motion.div
                      key={i}
                      className={`h-14 rounded-lg ${bg} cursor-pointer`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  ))}
                  <motion.div
                    className="h-14 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-lg text-gray-400 leading-none">+</span>
                    <span className="text-[9px] text-gray-400">Add More</span>
                  </motion.div>
                </div>
                <div className="text-[10px] text-gray-400 mt-1">Upload at least 3 screenshots (Max 10). 3/10</div>
              </div>
            </div>
          </motion.div>

          {/* Step 3 — Upload File */}
          <motion.div
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
            custom={2} variants={cardVariants} initial="hidden" animate="visible"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
              <h2 className="text-sm font-semibold text-gray-900">Upload File</h2>
            </div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Mod File (ZIP, RAR) <span className="text-red-500">*</span>
            </label>
            <motion.div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50/50"
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) setUploadedFile(file.name);
              }}
              onClick={() => setUploadedFile("neon_horizon_v2.4.1.zip")}
              animate={{ scale: isDragging ? 1.01 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <AnimatePresence mode="wait">
                {uploadedFile ? (
                  <motion.div
                    key="uploaded"
                    className="flex flex-col items-center gap-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <CheckCircle size={22} className="text-green-500 mb-1" />
                    <span className="text-sm font-medium text-green-700">{uploadedFile}</span>
                    <span className="text-xs text-gray-400">File ready for upload</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    className="flex flex-col items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div animate={{ y: isDragging ? -4 : 0 }} transition={{ type: "spring" }}>
                      <Upload size={20} className="text-blue-500 mb-1" />
                    </motion.div>
                    <span className="text-sm font-medium text-blue-600">Click to upload</span>
                    <span className="text-xs text-gray-500">or drag and drop</span>
                    <span className="text-[10px] text-gray-400 mt-1">ZIP or RAR file, max 2GB</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <div className="text-[10px] text-gray-400 mt-1">Make sure your mod file is properly compressed</div>
          </motion.div>

          {/* Step 4 — Pricing */}
          <motion.div
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
            custom={3} variants={cardVariants} initial="hidden" animate="visible"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">4</div>
              <h2 className="text-sm font-semibold text-gray-900">Pricing</h2>
            </div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Set Price <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
                <span className="px-3 py-2 bg-gray-50 border-r border-gray-300 text-sm text-gray-600">₹</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={isFree}
                  className="px-3 py-2 text-sm text-gray-900 focus:outline-none w-24 disabled:bg-gray-50 disabled:text-gray-400 transition-colors"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  className={`w-9 h-5 rounded-full transition-colors ${isFree ? "bg-blue-600" : "bg-gray-300"} relative`}
                  onClick={() => setIsFree(!isFree)}
                >
                  <motion.div
                    className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow"
                    animate={{ x: isFree ? 18 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
                <span className="text-sm text-gray-700">Free Mod</span>
              </label>
            </div>
            <div className="text-[10px] text-gray-400 mt-1">Set the selling price for your mod</div>
          </motion.div>

          <div className="text-center py-2 text-xs text-gray-500">
            Need help? Read our{" "}
            <a href="#" className="text-blue-600 hover:underline">Upload Guide</a>{" "}or{" "}
            <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-4">

          {/* Pricing Summary */}
          <motion.div
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
            custom={0} variants={cardVariants} initial="hidden" animate="visible"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Pricing Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Your Price</span>
                <span className="text-gray-900 font-medium">
                  ₹{isFree ? "0.00" : parseFloat(price || "0").toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform Fee (5%)</span>
                <span className="text-red-500">-₹{platformFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between text-sm font-semibold">
                <span className="text-gray-900">You Earn (95%)</span>
                <motion.span
                  key={youEarn}
                  className="text-green-600"
                  initial={{ scale: 1.2, color: "#16a34a" }}
                  animate={{ scale: 1, color: "#16a34a" }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  ₹{youEarn.toFixed(2)}
                </motion.span>
              </div>
            </div>
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-2.5">
              <p className="text-[10px] text-blue-700">You will receive 95% of every sale. Payouts are processed weekly.</p>
            </div>
          </motion.div>

          {/* Storage Impact */}
          <motion.div
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
            custom={1} variants={cardVariants} initial="hidden" animate="visible"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Storage Impact</h3>
            <div className="space-y-2 text-xs mb-3">
              {[
                ["File Size (approx.)", "512 MB", false],
                ["Your Current Usage", "5.2 GB", false],
                ["After Upload", "5.7 GB / 5 GB", true],
              ].map(([k, v, red]) => (
                <div key={String(k)} className="flex justify-between">
                  <span className="text-gray-500">{String(k)}</span>
                  <span className={`font-medium ${red ? "text-red-500" : "text-gray-900"}`}>{String(v)}</span>
                </div>
              ))}
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 flex items-start gap-2 mb-3">
              <AlertTriangle size={11} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-[10px] text-red-600">Storage limit exceeded! Please upgrade your plan to upload this mod.</p>
            </div>
            <motion.button
              className="w-full bg-blue-600 text-white rounded-lg py-1.5 text-xs font-semibold hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            >
              Upgrade Plan
            </motion.button>
          </motion.div>

          {/* Submission Checklist */}
          <motion.div
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
            custom={2} variants={cardVariants} initial="hidden" animate="visible"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Submission Checklist</h3>
            <div className="space-y-2">
              {checklist.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                >
                  <span className="text-xs text-gray-600">{item.label}</span>
                  <AnimatePresence mode="wait">
                    {item.done ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400, delay: 0.55 + i * 0.06 }}
                      >
                        <CheckCircle size={14} className="text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3.5 h-3.5 rounded-full border-2 border-gray-300"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Submit button */}
          <motion.div
            custom={3} variants={cardVariants} initial="hidden" animate="visible"
          >
            <motion.button
              className="w-full bg-blue-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(59,130,246,0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Upload size={14} />
              Review & Submit
            </motion.button>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Your mod will be reviewed before it goes live on the marketplace.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
