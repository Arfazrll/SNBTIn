// firebase/firebaseConfig.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDOxyQ6MXkdAsRx7V6t4oS_oCbDx2QtvDU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "snbtin-chat.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://snbtin-chat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "snbtin-chat",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "snbtin-chat.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "889149071346",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:889149071346:web:99b5af01fe2466f0a3956b",
};

// Initialize Firebase
let app: FirebaseApp | undefined = undefined;
let database: Database | undefined = undefined;

// Cek apakah Firebase sudah diinisialisasi
if (typeof window !== 'undefined') {
  try {
    // Cek apakah Firebase sudah diinisialisasi sebelumnya
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    
    if (app) {
      database = getDatabase(app);
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

export { app, database };