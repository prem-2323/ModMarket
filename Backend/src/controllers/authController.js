const axios = require("axios");
const { auth, db } = require("../services/firebaseService");

exports.signup = async (req, res) => {
  const { fullName, username, email, password, accountType } = req.body;

  if (!fullName || !username || !email || !password || !accountType) {
    return res.status(400).json({ error: "Please provide all required fields." });
  }

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: fullName,
    });

    await db.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      fullName,
      username,
      email,
      accountType,
      createdAt: new Date().toISOString(),
    });

    return res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      accountType,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  if (!process.env.FIREBASE_API_KEY) {
    return res.status(500).json({ error: "FIREBASE_API_KEY is not configured." });
  }

  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;
    const response = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken, expiresIn, localId } = response.data;
    const userDoc = await db.collection("users").doc(localId).get();

    return res.json({
      uid: localId,
      email,
      idToken,
      refreshToken,
      expiresIn,
      profile: userDoc.exists ? userDoc.data() : null,
    });
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message;
    return res.status(400).json({ error: message });
  }
};
