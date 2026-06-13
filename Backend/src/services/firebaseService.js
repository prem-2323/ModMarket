const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountPath && !serviceAccountKey) {
  throw new Error(
    "Missing Firebase credentials. Set FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT_KEY in Backend/.env"
  );
}

let credential;
if (serviceAccountPath) {
  const fileContents = fs.readFileSync(serviceAccountPath, "utf8");
  credential = admin.credential.cert(JSON.parse(fileContents));
} else {
  credential = admin.credential.cert(JSON.parse(serviceAccountKey));
}

admin.initializeApp({
  credential,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = {
  auth,
  db,
};
