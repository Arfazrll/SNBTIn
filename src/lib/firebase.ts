import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  Firestore, 
  enableIndexedDbPersistence,
  connectFirestoreEmulator,
  doc, 
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import { 
  getDatabase, 
  Database, 
  connectDatabaseEmulator 
} from 'firebase/database';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Firebase configuration - use environment variables when possible
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDOxyQ6MXkdAsRx7V6t4oS_oCbDx2QtvDU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "snbtin-chat.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://snbtin-chat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "snbtin-chat",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "snbtin-chat.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "889149071346",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:889149071346:web:99b5af01fe2466f0a3956b",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-R5801CWH3N"
};

// Singleton pattern for Firebase instances
let firebaseApp: FirebaseApp | undefined = undefined;
let firestoreInstance: Firestore | undefined = undefined;
let databaseInstance: Database | undefined = undefined;
let analyticsInstance: Analytics | undefined = undefined;

/**
 * Initialize Firebase services safely
 */
export const initializeFirebase = async () => {
  if (typeof window === 'undefined') {
    console.log('Firebase initialization skipped (server-side)');
    return { success: false, error: 'Server-side rendering' };
  }

  try {
    // Initialize or reuse Firebase app
    if (!getApps().length) {
      console.log('Initializing new Firebase app instance');
      firebaseApp = initializeApp(firebaseConfig);
    } else {
      console.log('Using existing Firebase app instance');
      firebaseApp = getApps()[0];
    }

    // Initialize Firestore
    if (firebaseApp) {
      firestoreInstance = getFirestore(firebaseApp);
      console.log('Firestore initialized successfully');

      // Enable offline persistence for better user experience
      try {
        await enableIndexedDbPersistence(firestoreInstance);
        console.log('Firestore persistence enabled');
      } catch (err: any) {
        if (err.code === 'failed-precondition') {
          console.warn('Firestore persistence unavailable: multiple tabs open');
        } else if (err.code === 'unimplemented') {
          console.warn('Firestore persistence unavailable: browser unsupported');
        } else {
          console.error('Error enabling Firestore persistence:', err);
        }
      }

      // Initialize Realtime Database
      try {
        databaseInstance = getDatabase(firebaseApp);
        console.log('Realtime Database initialized successfully');
      } catch (err) {
        console.error('Error initializing Realtime Database:', err);
      }

      // Initialize Analytics in production only
      if (process.env.NODE_ENV === 'production') {
        try {
          const analyticsSupported = await isSupported();
          if (analyticsSupported) {
            analyticsInstance = getAnalytics(firebaseApp);
            console.log('Firebase Analytics initialized');
          } else {
            console.log('Firebase Analytics not supported in this environment');
          }
        } catch (err) {
          console.error('Analytics initialization error:', err);
        }
      }

      // Use emulators in development if configured
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true') {
        if (firestoreInstance) {
          connectFirestoreEmulator(firestoreInstance, 'localhost', 8080);
          console.log('Connected to Firestore emulator');
        }
        if (databaseInstance) {
          connectDatabaseEmulator(databaseInstance, 'localhost', 9000);
          console.log('Connected to Realtime Database emulator');
        }
      }

      return { success: true };
    } else {
      return { success: false, error: 'Firebase app initialization failed' };
    }
  } catch (err) {
    console.error('Firebase initialization error:', err);
    return { success: false, error: err };
  }
};

// Try to initialize Firebase on import
if (typeof window !== 'undefined') {
  initializeFirebase()
    .then(result => {
      if (!result.success) {
        console.error('Firebase initialization failed:', result.error);
      }
    })
    .catch(err => {
      console.error('Fatal error during Firebase initialization:', err);
    });
}

/**
 * Check Firebase connection status
 */
export const checkFirebaseConnection = () => {
  const isConnected = !!firebaseApp && (!!firestoreInstance || !!databaseInstance);
  
  console.log('Firebase connection status:', {
    isAppInitialized: !!firebaseApp,
    isFirestoreInitialized: !!firestoreInstance,
    isDatabaseInitialized: !!databaseInstance,
    environment: process.env.NODE_ENV,
    isConnected
  });
  
  return {
    isConnected,
    app: firebaseApp,
    firestore: firestoreInstance,
    database: databaseInstance
  };
};

/**
 * Get Firestore instance
 */
export const getFirestoreInstance = (): Firestore | undefined => {
  if (!firestoreInstance) {
    console.warn('Firestore not initialized yet. Try calling initializeFirebase() first.');
  }
  return firestoreInstance;
};

/**
 * Get Realtime Database instance
 */
export const getDatabaseInstance = (): Database | undefined => {
  if (!databaseInstance) {
    console.warn('Realtime Database not initialized yet. Try calling initializeFirebase() first.');
  }
  return databaseInstance;
};

// Export instances for direct use
export const app = firebaseApp;
export const firestore = firestoreInstance;
export const database = databaseInstance;
export const analytics = analyticsInstance;

// Special utility for testing permissions
export const testFirebasePermissions = async () => {
  if (!firestore) {
    return { success: false, error: 'Firestore not initialized' };
  }
  
  try {
    // Test writing to a special test document
    const testDoc = doc(firestore, 'system_tests', 'permissions_test');
    await setDoc(testDoc, { 
      timestamp: serverTimestamp(),
      testId: 'permission-check-' + new Date().getTime() 
    });
    console.log('Firebase permissions test passed: write successful');
    return { success: true };
  } catch (error: any) {
    console.error('Firebase permissions test failed:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown error',
      code: error.code,
      isPermissionError: error.code === 'permission-denied'
    };
  }
};