const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const FormData = require("form-data");

const API_BASE = "http://localhost:5001/api";
const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret_change_me";

async function testUpload() {
  try {
    console.log("1. Generating test authentication token...");
    const testToken = jwt.sign(
      { uid: "test_user_123", email: "test@modmarket.com" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("   ✓ Token generated");

    console.log("\n2. Creating test files...");
    // Create minimal test files
    fs.writeFileSync("thumbnail.png", Buffer.from("PNG_DATA"));
    fs.writeFileSync("test_mod.zip", Buffer.from("ZIP_DATA"));
    fs.writeFileSync("screenshot1.png", Buffer.from("PNG_DATA"));
    fs.writeFileSync("screenshot2.png", Buffer.from("PNG_DATA"));
    fs.writeFileSync("screenshot3.png", Buffer.from("PNG_DATA"));
    console.log("   ✓ Test files created");

    console.log("\n3. Uploading mod with axios...");
    const formData = new FormData();
    formData.append("title", "Test Neon Overhaul");
    formData.append("game", "cyberpunk2077");
    formData.append("category", "environment");
    formData.append("version", "1.0.0");
    formData.append("shortDescription", "A test mod");
    formData.append("fullDescription", "This is a test mod for the ModMarket platform");
    formData.append("price", "99.99");
    formData.append("isFree", "false");
    formData.append("thumbnail", fs.createReadStream("thumbnail.png"), "thumbnail.png");
    formData.append("modFile", fs.createReadStream("test_mod.zip"), "test_mod.zip");
    formData.append("screenshots", fs.createReadStream("screenshot1.png"), "screenshot1.png");
    formData.append("screenshots", fs.createReadStream("screenshot2.png"), "screenshot2.png");
    formData.append("screenshots", fs.createReadStream("screenshot3.png"), "screenshot3.png");

    const uploadRes = await axios.post(`${API_BASE}/mods/upload`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${testToken}`,
      },
    });

    console.log("   ✓ Upload successful!");
    console.log("   Status:", uploadRes.status);
    console.log("   Response:", JSON.stringify(uploadRes.data, null, 2));

    if (uploadRes.data.modId) {
      console.log("\n4. Verifying mod in Firestore...");
      const getRes = await axios.get(`${API_BASE}/mods/${uploadRes.data.modId}`, {
        headers: {
          Authorization: `Bearer ${testToken}`,
        },
      });
      console.log("   ✓ Mod retrieved!");
      console.log("   Title:", getRes.data.title);
      console.log("   Game:", getRes.data.game);
      console.log("   Status:", getRes.data.status);
    }

    // Cleanup
    fs.unlinkSync("thumbnail.png");
    fs.unlinkSync("test_mod.zip");
    fs.unlinkSync("screenshot1.png");
    fs.unlinkSync("screenshot2.png");
    fs.unlinkSync("screenshot3.png");

    console.log("\n✓ All tests passed!");
  } catch (error) {
    console.error("✗ Test failed:");
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data:`, JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Error:", error.message);
    }
    process.exit(1);
  }
}

testUpload();
