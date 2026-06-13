const { db } = require('../services/firebaseService');

exports.getProfile = async (req, res) => {
  try {
    const uid = req.user.uid;
    const usersRef = db.collection('users');
    const doc = await usersRef.doc(uid).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const data = doc.data();
    // Return the profile without password hash
    delete data.passwordHash;
    
    return res.json({ profile: data });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ error: 'Server error fetching profile.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { fullName, email, username, bio, country, language, totalMods, totalRevenue, totalDownloads } = req.body;

    const usersRef = db.collection('users');
    
    // Create an object with only the fields that were provided
    const updates = {};
    if (fullName !== undefined) updates.fullName = fullName;
    if (email !== undefined) updates.email = email;
    if (username !== undefined) updates.username = username;
    if (bio !== undefined) updates.bio = bio;
    if (country !== undefined) updates.country = country;
    if (language !== undefined) updates.language = language;
    if (totalMods !== undefined) updates.totalMods = totalMods;
    if (totalRevenue !== undefined) updates.totalRevenue = totalRevenue;
    if (totalDownloads !== undefined) updates.totalDownloads = totalDownloads;
    
    updates.updatedAt = new Date().toISOString();

    await usersRef.doc(uid).update(updates);

    return res.json({ message: 'Profile updated successfully.', updates });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ error: 'Server error updating profile.' });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { username, email, fullName } = req.body;

    if (!username || !email || !fullName) {
      return res.status(400).json({ error: 'Missing required verification fields (username, email, fullName).' });
    }

    const usersRef = db.collection('users');
    const doc = await usersRef.doc(uid).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const userData = doc.data();

    // Verify the details match
    if (userData.username !== username || userData.email !== email || userData.fullName !== fullName) {
      return res.status(400).json({ error: 'Verification failed. Details do not match the account.' });
    }

    // Details match, delete the account
    await usersRef.doc(uid).delete();

    return res.json({ message: 'Account deleted successfully.' });
  } catch (error) {
    console.error('Error deleting account:', error);
    return res.status(500).json({ error: 'Server error deleting account.' });
  }
};
