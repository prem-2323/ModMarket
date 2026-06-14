require("dotenv").config();
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const API = "http://localhost:5001/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ6ejNoSm55YUs0OWFlbnBHQUcwTSIsImVtYWlsIjoicHJlbW0uMjRhaW1Aa29uZ3UuZWR1IiwiaWF0IjoxNzgxNDMwMjM4LCJleHAiOjE3ODIwMzUwMzh9.wILdVgPyQZVyNe21Z8X5Jk2TUFecO2FbuGSdwwCklEc";

const importsDir = path.join(__dirname, "..", "Frontend", "src", "imports");

async function uploadMod() {
  const form = new FormData();

  form.append("title", "Test BMW M5 Mod");
  form.append("game", "ets2");
  form.append("version", "1.0.0");
  form.append("shortDescription", "A test mod for ETS2");
  form.append("fullDescription", "This is a **test** mod uploaded via API. *Italic* and [link](https://example.com).");
  form.append("price", "0");
  form.append("isFree", "true");

  // Thumbnail
  form.append("thumbnail", fs.createReadStream(path.join(importsDir, "sharemods__page-0001.jpg")));
  // Screenshots (3 minimum)
  form.append("screenshots", fs.createReadStream(path.join(importsDir, "image.png")));
  form.append("screenshots", fs.createReadStream(path.join(importsDir, "image-1.png")));
  form.append("screenshots", fs.createReadStream(path.join(importsDir, "image-2.png")));
  // Mod file
  form.append("modFile", fs.createReadStream(path.join(__dirname, "test-mod.zip")));

  console.log("Uploading mod...");
  try {
    const res = await axios.post(`${API}/mods/upload`, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${TOKEN}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    console.log("Upload success:", JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error("Upload failed:", err.response?.status, JSON.stringify(err.response?.data) || err.message);
  }
}

uploadMod();
