const { db } = require("../services/firebaseService");

// Upload a new mod
exports.uploadMod = async (req, res) => {
  try {
    const { title, game, category, version, shortDescription, fullDescription, price, isFree } = req.body;
    const userId = req.user?.uid;

    // Validation
    if (!title || !game || !category || !version || !fullDescription || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.files || !req.files.thumbnail || !req.files.modFile) {
      return res.status(400).json({ message: "Thumbnail and mod file are required" });
    }

    let screenshots = req.files.screenshots || [];
    if (!Array.isArray(screenshots) && screenshots) {
      screenshots = [screenshots];
    }

    if (screenshots.length < 3) {
      return res.status(400).json({ message: "At least 3 screenshots are required" });
    }

    // Create new mod document
    const newMod = {
      title,
      game,
      category,
      version,
      shortDescription,
      fullDescription,
      price: isFree === "true" ? 0 : parseFloat(price),
      isFree: isFree === "true",
      createdBy: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "pending_review",
      downloads: 0,
      rating: 0,
      reviews: 0,
      // File metadata
      files: {
        thumbnail: {
          name: req.files.thumbnail[0].originalname,
          size: req.files.thumbnail[0].size,
          mimetype: req.files.thumbnail[0].mimetype,
        },
        modFile: {
          name: req.files.modFile[0].originalname,
          size: req.files.modFile[0].size,
          mimetype: req.files.modFile[0].mimetype,
        },
        screenshots: screenshots.map((file) => ({
          name: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
        })),
      },
    };

    // Add to Firestore
    const docRef = await db.collection("mods").add(newMod);

    res.status(201).json({
      message: "Mod uploaded successfully",
      modId: docRef.id,
      mod: newMod,
    });
  } catch (error) {
    console.error("Error uploading mod:", error);
    res.status(500).json({ message: "Error uploading mod", error: error.message });
  }
};

// Get all mods
exports.getAllMods = async (req, res) => {
  try {
    const snapshot = await db
      .collection("mods")
      .orderBy("createdAt", "desc")
      .get();

    const mods = [];
    snapshot.forEach((doc) => {
      // Only return published mods
      if (doc.data().status === "published") {
        mods.push({ id: doc.id, ...doc.data() });
      }
    });

    res.json(mods);
  } catch (error) {
    console.error("Error fetching mods:", error);
    res.status(500).json({ message: "Error fetching mods", error: error.message });
  }
};

// Get mod by ID
exports.getModById = async (req, res) => {
  try {
    const { modId } = req.params;
    const doc = await db.collection("mods").doc(modId).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Mod not found" });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching mod:", error);
    res.status(500).json({ message: "Error fetching mod", error: error.message });
  }
};

// Get user's mods
exports.getUserMods = async (req, res) => {
  try {
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const snapshot = await db
      .collection("mods")
      .where("createdBy", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    const mods = [];
    snapshot.forEach((doc) => {
      mods.push({ id: doc.id, ...doc.data() });
    });

    res.json(mods);
  } catch (error) {
    console.error("Error fetching user mods:", error);
    res.status(500).json({ message: "Error fetching user mods", error: error.message });
  }
};

// Update mod
exports.updateMod = async (req, res) => {
  try {
    const { modId } = req.params;
    const userId = req.user?.uid;
    const updates = req.body;

    // Check ownership
    const doc = await db.collection("mods").doc(modId).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Mod not found" });
    }

    if (doc.data().createdBy !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update the document
    await db.collection("mods").doc(modId).update({
      ...updates,
      updatedAt: new Date(),
    });

    res.json({ message: "Mod updated successfully" });
  } catch (error) {
    console.error("Error updating mod:", error);
    res.status(500).json({ message: "Error updating mod", error: error.message });
  }
};

// Delete mod
exports.deleteMod = async (req, res) => {
  try {
    const { modId } = req.params;
    const userId = req.user?.uid;

    // Check ownership
    const doc = await db.collection("mods").doc(modId).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Mod not found" });
    }

    if (doc.data().createdBy !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete the document
    await db.collection("mods").doc(modId).delete();

    res.json({ message: "Mod deleted successfully" });
  } catch (error) {
    console.error("Error deleting mod:", error);
    res.status(500).json({ message: "Error deleting mod", error: error.message });
  }
};

// Search mods
exports.searchMods = async (req, res) => {
  try {
    const { query, game, category } = req.query;

    let queryRef = db.collection("mods").where("status", "==", "published");

    if (game) {
      queryRef = queryRef.where("game", "==", game);
    }

    if (category) {
      queryRef = queryRef.where("category", "==", category);
    }

    const snapshot = await queryRef.orderBy("createdAt", "desc").get();

    let mods = [];
    snapshot.forEach((doc) => {
      mods.push({ id: doc.id, ...doc.data() });
    });

    // Client-side search for title/description if query provided
    if (query) {
      const lowerQuery = query.toLowerCase();
      mods = mods.filter(
        (mod) =>
          mod.title.toLowerCase().includes(lowerQuery) ||
          mod.shortDescription.toLowerCase().includes(lowerQuery)
      );
    }

    res.json(mods);
  } catch (error) {
    console.error("Error searching mods:", error);
    res.status(500).json({ message: "Error searching mods", error: error.message });
  }
};
