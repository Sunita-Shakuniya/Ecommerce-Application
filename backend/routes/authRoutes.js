// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { firedb, auth} = require('../config/firebaseConfig');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
const admin = require('firebase-admin');
const { googleSignIn } = require('../controllers/authController');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * @route   POST /api/signup
 * @desc    Register a new user with email and password
 * @access  Public
 */
router.post('/signup', async (req, res) => {
    console.log('adminAuth:', auth); // This should output the adminAuth object

    if (!auth) {
        return res.status(500).json({ error: 'Firebase Admin is not initialized properly.' });
    }
    
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create user with email and password
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: name,
        });

        // Optionally, add additional user data to Firestore
        await firedb.collection('users').doc(userRecord.uid).set({
            name,
            email,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).json({ message: 'User created successfully', user: userRecord });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: error.message });
    }
});

/**
 * @route   POST /api/google-signin
 * @desc    Sign in with Google using ID Token
 * @access  Public
 */
router.post('/google-signin', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const idtoken = authHeader && authHeader.split('Bearer ')[1]; // Get the token part from 'Bearer token'

    
    console.log(idtoken)
    try {
      const decodedToken = await admin.auth().verifyIdToken(idtoken);
      const user = await admin.auth().getUser(decodedToken.uid);
      res.json({ user });
    } catch (error) {
      console.error('Error verifying Google ID token:', error);
      res.status(401).json({ error: 'Invalid token' });
    }
  });

module.exports = router;
