const fs = require("fs");
const path = require("path");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { spawn } = require("child_process");

const API_BASE = "http://localhost:5001/api";
const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret_change_me";

// Generate a test JWT token
function generateTestToken() {
  const payload = {
    uid: "test_user_123",
    email: "test@modmarket.com",
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

async function testUploadMod() {
  try {
    console.log("=== MOD UPLOAD TEST ===\n");

    // Generate test token
    console.log("1. Generating test authentication token...");
    const testToken = generateTestToken();
    console.log(`   ✓ Token generated for user: test@modmarket.com`);
    console.log(`   Token: ${testToken.substring(0, 30)}...`);

    // Create test files
    console.log("\n2. Creating test files...");
    const testDir = path.join(__dirname, ".test-files");
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Create a dummy thumbnail image (1x1 pixel PNG)
    const pngBuffer = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
      0xde, 0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x63, 0xf8, 0x0f, 0x00, 0x00,
      0x01, 0x01, 0x00, 0x05, 0xb6, 0xee, 0x56, 0x2e, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44,
      0xae, 0x42, 0x60, 0x82,
    ]);

    const thumbnailPath = path.join(testDir, "thumbnail.png");
    fs.writeFileSync(thumbnailPath, pngBuffer);
    console.log(`   ✓ Created thumbnail: ${path.basename(thumbnailPath)}`);

    // Create dummy mod file (ZIP)
    const modFilePath = path.join(testDir, "test_mod.zip");
    fs.writeFileSync(modFilePath, Buffer.from("PK\x03\x04test mod content"));
    console.log(`   ✓ Created mod file: ${path.basename(modFilePath)}`);

    // Create screenshot files
    const screenshotPaths = [];
    for (let i = 1; i <= 3; i++) {
      const screenshotPath = path.join(testDir, `screenshot_${i}.png`);
      fs.writeFileSync(screenshotPath, pngBuffer);
      screenshotPaths.push(screenshotPath);
    }
    console.log(`   ✓ Created 3 screenshot files`);

    console.log("\n3. Preparing curl upload request...");

    const formDataArgs = [
      "-X", "POST",
      "-H", `Authorization: Bearer ${testToken}`,
      "-F", `title="Test Neon Overhaul"`,
      "-F", `game="cyberpunk2077"`,
      "-F", `category="environment"`,
      "-F", `version="1.0.0"`,
      "-F", `shortDescription="A complete neon enhancement mod for testing"`,
      "-F", `fullDescription="This is a comprehensive test mod that includes:\n• Enhanced neon lights\n• Improved reflections\n• Better performance"`,
      "-F", `price="99.99"`,
      "-F", `isFree="false"`,
      "-F", `thumbnail=@${thumbnailPath}`,
      "-F", `modFile=@${modFilePath}`,
    ];

    // Add screenshots
    screenshotPaths.forEach((screenshotPath) => {
      formDataArgs.push("-F");
      formDataArgs.push(`screenshots=@${screenshotPath}`);
    });

    formDataArgs.push(`${API_BASE}/mods/upload`);

    console.log("   ✓ FormData prepared");
    console.log("   • Title: Test Neon Overhaul");
    console.log("   • Game: cyberpunk2077");
    console.log("   • Category: environment");
    console.log("   • Price: ₹99.99");
    console.log("   • Screenshots: 3");

    console.log("\n4. Sending upload request via curl...");
    console.log(`   Endpoint: POST ${API_BASE}/mods/upload`);

    // Use curl for the upload
    const curlResult = await new Promise((resolve, reject) => {
      const curl = spawn("curl", formDataArgs);
      let stdout = "";
      let stderr = "";

      curl.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      curl.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      curl.on("close", (code) => {
        if (code === 0) {
          resolve(stdout);
        } else {
          reject(new Error(`curl exited with code ${code}: ${stderr}`));
        }
      });
    });

    const response = JSON.parse(curlResult);

    console.log("\n✓ Upload successful!");
    console.log(`   Message: ${response.message}`);
    console.log(`   Mod ID: ${response.modId}`);

    console.log("\n5. Verifying mod in Firestore...");
    const modData = response.mod;
    console.log(`   Title: ${modData.title}`);
    console.log(`   Game: ${modData.game}`);
    console.log(`   Category: ${modData.category}`);
    console.log(`   Version: ${modData.version}`);
    console.log(`   Price: ₹${modData.price}`);
    console.log(`   Status: ${modData.status}`);

    console.log("\n6. File metadata in Firestore:");
    console.log(`   Thumbnail:`);
    console.log(`     • Name: ${modData.files.thumbnail.name}`);
    console.log(`     • Size: ${modData.files.thumbnail.size} bytes`);
    console.log(`     • Type: ${modData.files.thumbnail.mimetype}`);

    console.log(`   Mod File:`);
    console.log(`     • Name: ${modData.files.modFile.name}`);
    console.log(`     • Size: ${modData.files.modFile.size} bytes`);
    console.log(`     • Type: ${modData.files.modFile.mimetype}`);

    console.log(`   Screenshots: ${modData.files.screenshots.length}`);
    modData.files.screenshots.forEach((screenshot, i) => {
      console.log(`     ${i + 1}. ${screenshot.name} (${screenshot.size} bytes)`);
    });

    console.log("\n7. Testing GET endpoint...");

    // Get specific mod
    const getResponse = await axios.get(`${API_BASE}/mods/${response.modId}`, {
      headers: {
        Authorization: `Bearer ${testToken}`,
      },
    });
    console.log(`   ✓ GET /mods/${response.modId} - Retrieved specific mod`);
    console.log(`     Title: ${getResponse.data.title}`);
    console.log(`     Status: ${getResponse.data.status}`);

    console.log("\n=== TEST COMPLETE ===");
    console.log("✓ Mod upload successful");
    console.log("✓ Files stored with metadata in Firestore");
    console.log("✓ API endpoints working correctly");
    console.log(`✓ Mod ID: ${response.modId}`);

    // Cleanup
    console.log("\n8. Cleaning up test files...");
    fs.rmSync(testDir, { recursive: true });
    console.log("   ✓ Test files cleaned up");

    process.exit(0);
  } catch (error) {
    console.error("\n✗ TEST FAILED");
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Error: ${JSON.stringify(error.response.data, null, 2)}`);
    } else if (error.message && error.message.includes("curl")) {
      console.error("curl command failed");
      console.error(error.message);
    } else {
      console.error(`Error: ${error.message}`);
    }
    process.exit(1);
  }
}

// Run the test
testUploadMod();
