const express = require("express");
const multer = require("multer");
const { authenticate } = require("../middleware/authMiddleware");
const modController = require("../controllers/modController");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2GB limit
  fileFilter: (req, file, cb) => {
    // Validate file types
    const allowedMimetypes = [
      "image/jpeg",
      "image/png",
      "application/zip",
      "application/x-rar-compressed",
      "application/x-zip-compressed",
    ];

    if (file.fieldname === "thumbnail" || file.fieldname.startsWith("screenshot_")) {
      if (allowedMimetypes.slice(0, 2).includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid image type. Only JPEG and PNG are allowed."));
      }
    } else if (file.fieldname === "modFile") {
      if (allowedMimetypes.slice(2).includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type. Only ZIP and RAR are allowed."));
      }
    } else {
      cb(null, true);
    }
  },
});

// Routes
// POST /api/mods/upload - Upload a new mod
router.post(
  "/upload",
  authenticate,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "modFile", maxCount: 1 },
    { name: "screenshots", maxCount: 10 },
  ]),
  modController.uploadMod
);

// GET /api/mods - Get all published mods
router.get("/", modController.getAllMods);

// GET /api/mods/search - Search mods
router.get("/search", modController.searchMods);

// GET /api/mods/my-mods - Get user's mods
router.get("/my-mods", authenticate, modController.getUserMods);

// GET /api/mods/:modId - Get mod by ID
router.get("/:modId", modController.getModById);

// PUT /api/mods/:modId - Update mod
router.put("/:modId", authenticate, modController.updateMod);

// DELETE /api/mods/:modId - Delete mod
router.delete("/:modId", authenticate, modController.deleteMod);

module.exports = router;
