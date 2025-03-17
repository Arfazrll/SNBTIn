// firebase.ts - File setup Firebase terpisah
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getDatabase, Database } from 'firebase/database';
import { getAnalytics, Analytics } from 'firebase/analytics';

// Konfigurasi Firebase dari console
const firebaseConfig = {
  apiKey: "AIzaSyDOxyQ6MXkdAsRx7V6t4oS_oCbDx2QtvDU",
  authDomain: "snbtin-chat.firebaseapp.com",
  databaseURL: "https://snbtin-chat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "snbtin-chat",
  storageBucket: "snbtin-chat.firebasestorage.app",
  messagingSenderId: "889149071346",
  appId: "1:889149071346:web:99b5af01fe2466f0a3956b",
  measurementId: "G-R5801CWH3N"
};

// Inisialisasi Firebase - singleton pattern
let firebaseApp: FirebaseApp | undefined = undefined;
let firestoreInstance: Firestore | undefined = undefined;
let databaseInstance: Database | undefined = undefined;
let analyticsInstance: Analytics | undefined = undefined;

if (typeof window !== 'undefined') {
  try {
    if (!getApps().length) {
      firebaseApp = initializeApp(firebaseConfig);
      console.log('Firebase initialized successfully');
    } else {
      firebaseApp = getApps()[0];
      console.log('Using existing Firebase instance');
    }

    // Inisialisasi layanan yang dibutuhkan
    if (firebaseApp) {
      firestoreInstance = getFirestore(firebaseApp);
      
      // Database Realtime secara opsional, terpisah dari Firestore
      try {
        databaseInstance = getDatabase(firebaseApp);
        console.log('Realtime Database initialized successfully');
      } catch (dbError) {
        console.error('Error initializing Realtime Database:', dbError);
        databaseInstance = undefined;
      }

      // Analytics secara opsional
      if (process.env.NODE_ENV === 'production') {
        try {
          analyticsInstance = getAnalytics(firebaseApp);
        } catch (analyticsError) {
          console.error('Analytics not available:', analyticsError);
        }
      }
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

// Export semua instance yang dibutuhkan
export const app = firebaseApp;
export const firestore = firestoreInstance;
export const database = databaseInstance;
export const analytics = analyticsInstance;

type FirebaseConnectionStatus = {
  isConnected: boolean;
  app: FirebaseApp | undefined;
  firestore: Firestore | undefined;
  database: Database | undefined;
};

// Fungsi utility untuk debugging
export const checkFirebaseConnection = (): FirebaseConnectionStatus => {
  console.log({
    isAppInitialized: !!firebaseApp,
    isFirestoreInitialized: !!firestoreInstance,
    isDatabaseInitialized: !!databaseInstance,
    env: process.env.NODE_ENV
  });
  
  return {
    isConnected: !!firebaseApp && !!firestoreInstance,
    app: firebaseApp,
    firestore: firestoreInstance,
    database: databaseInstance
  };
};