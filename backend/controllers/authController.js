//backend/authControllers
// Define the login function
//const { auth, db } = require('../congig/firebaseConfig');

//const { auth } = require("firebase-admin");
const { firedb, auth } = require("../config/firebaseConfig");

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Call the authService function for login
      const user = await authService.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error });
    }
  };
  
  // Define the forgotPassword function
  const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      // Call the authService function for password reset
      await authService.forgotPassword(email);
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send password reset email', error });
    }
  };
 
  const googleSignIn = async (req, res) => {
    try {
      const { idToken } = req.body; // ID token sent from frontend
  
      // Verify the ID token
      const decodedToken = await auth.verifyIdToken(idToken);
      const { uid, email, name, picture } = decodedToken;
  
      // Check if the user already exists in Firestore
      const userRef = firedb.collection('users').doc(uid);
      const doc = await userRef.get();
  
      if (!doc.exists) {
        // Create a new user if not already in Firestore
        await userRef.set({
          uid,
          email,
          displayName: name,
          photoURL: picture,
          provider: 'google',
        });
      }
  
      // Send the user information as a response
      res.status(200).json({
        uid,
        email,
        displayName: name,
        photoURL: picture,
      });
    } catch (error) {
      res.status(500).json({ message: 'Google sign-in failed', error });
    }
  };
  
  // Export the functions
  module.exports = { login, forgotPassword, googleSignIn };
  
  
