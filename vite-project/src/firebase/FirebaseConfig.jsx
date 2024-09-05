//Frontend/FirebaseConfig.jsx
import axios from 'axios';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Function to fetch Firebase config from the backend
const fetchFirebaseConfig = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/config/firebase-config');
    return response.data;
  } catch (error) {
    console.error('Error fetching Firebase config:', error.response ? error.response.data : error.message);
    return null;
  }
};

// Firebase variables
let app;
let firedb;
let auth;

// Function to initialize Firebase
export const initializeFirebase = async () => {
  if (!app) {  // Initialize only if not already initialized
    try {
      const firebaseConfig = await fetchFirebaseConfig();
      if (firebaseConfig) {
        app = initializeApp(firebaseConfig);
        firedb = getFirestore(app);
        auth = getAuth(app);
      } else {
        console.error('Firebase configuration is null');
      }
    } catch (error) {
      console.error('Error initializing Firebase:', error.message);
    }
  }
  return { firedb, auth };
};
//Sign in with Google
export const signInWithGoogle = async () => {
  if (!auth) {
    console.error('Firebase Auth is not initialized');
    return null;
  }

  const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        
        const user = result.user;
        const idtoken = await user.getIdToken(); // Fetch ID token from user object
        console.log('Google Sign-In successful:', user);
        return { user, idtoken }; // Return ID token instead of access token
    } catch (error) {
        console.error('Google Sign-In failed:', error.message);
        return null;
    }
};

export { firedb, auth };
