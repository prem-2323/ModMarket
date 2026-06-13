const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../services/firebaseService');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';

exports.signup = async (req, res) => {
  const { fullName, username, email, password, accountType } = req.body;

  if (!fullName || !username || !email || !password || !accountType) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const usersRef = db.collection('users');
    const existing = await usersRef.where('email', '==', email).get();
    if (!existing.empty) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newDocRef = usersRef.doc();
    const uid = newDocRef.id;

    await newDocRef.set({
      uid,
      fullName,
      username,
      email,
      accountType,
      passwordHash: hashed,
      createdAt: new Date().toISOString(),
    });

    const token = jwt.sign({ uid, email }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({ uid, email, fullName, username, accountType, token });
  } catch (error) {
    console.error('Signup error detail:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const usersRef = db.collection('users');
    const q = await usersRef.where('email', '==', email).limit(1).get();
    if (q.empty) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }
    const doc = q.docs[0];
    const data = doc.data();

    const match = await bcrypt.compare(password, data.passwordHash || '');
    if (!match) return res.status(400).json({ error: 'Invalid credentials.' });

    const token = jwt.sign({ uid: data.uid, email: data.email }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({ uid: data.uid, email: data.email, token, profile: data });
  } catch (error) {
    console.error('Signin error detail:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
};

exports.test = async (req, res) => {
  try {
    return res.json({
      status: 'ok',
      message: 'Backend auth service is running and Firestore is reachable.',
    });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};
