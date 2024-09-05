//services/authServices.js
const firebase = require('firebase-admin');
// Initialize Firebase with your credentials
firebase.initializeApp({
  credential: firebase.credential.applicationDefault(),
  // Other Firebase configurations
});

const auth = firebase.auth();

const loginUser = async (email, password) => {
  // Authenticate with Firebase or your database
  const user = await auth.signInWithEmailAndPassword(email, password);
  return user;
};

const sendPasswordResetEmail = async (email) => {
  // Send a password reset email using Firebase or your service
  await auth.sendPasswordResetEmail(email);
};

module.exports = { loginUser, sendPasswordResetEmail };
