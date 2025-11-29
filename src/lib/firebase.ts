import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyANG9w-VoQdb8Im33VR5-vUfJ88LLKnuB0",
  authDomain: "meditation-1512c.firebaseapp.com",
  projectId: "meditation-1512c",
  storageBucket: "meditation-1512c.firebasestorage.app",
  messagingSenderId: "498859107942",
  appId: "1:498859107942:web:f5f3febe53ce701f3b2fa7",
  measurementId: "G-WSXVWD6W29"
};

// Check if Firebase is properly configured
const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

// Initialize Firebase with error handling
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

try {
	if (isConfigured) {
		app = initializeApp(firebaseConfig);
		auth = getAuth(app);
		db = getFirestore(app);
	} else {
		console.warn('⚠️ Firebase not configured. Auth and database features will not work. See FIREBASE_SETUP.md');
	}
} catch (error) {
	console.error('Firebase initialization failed:', error);
}

export { app, auth, db, isConfigured };
