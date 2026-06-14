const axios = require("axios");
const jwt = require("jsonwebtoken");

const API_BASE = "http://localhost:5001/api";
const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret_change_me";

async function testHealthAndAuth() {
  try {
    console.log("1. Testing server health...");
    const healthRes = await axios.get(`${API_BASE.replace('/api', '')}/health`);
    console.log("   ✓ Health check passed:", healthRes.status);

    console.log("\n2. Testing with auth token...");
    const testToken = jwt.sign(
      { uid: "test_user_123", email: "test@modmarket.com" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Test a simple GET endpoint with auth
    console.log("   Testing GET /mods (which requires no files)...");
    const modsRes = await axios.get(`${API_BASE}/mods`, {
      headers: {
        Authorization: `Bearer ${testToken}`,
      },
    });
    console.log("   ✓ GET /mods successful:", modsRes.status);
    console.log("   Response:", modsRes.data);

    console.log("\n✓ All tests passed!");
  } catch (error) {
    console.error("✗ Test failed:");
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Headers:`, error.response.headers);
      console.error(`Data:`, error.response.data);
    } else {
      console.error("Error:", error.message);
    }
    process.exit(1);
  }
}

testHealthAndAuth();
