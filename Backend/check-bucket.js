require("dotenv").config();
const admin = require("firebase-admin");
const fs = require("fs");

const cred = admin.credential.cert(
  JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"))
);

const app = admin.initializeApp({
  credential: cred,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const st = admin.storage();
console.log("Bucket name:", st.bucket().name);

admin.storage().bucket().getMetadata()
  .then(([meta]) => console.log("Bucket metadata:", JSON.stringify(meta)))
  .catch((err) => console.log("Bucket error:", err.message))
  .finally(() => process.exit());
