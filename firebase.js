import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSENGER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


export default function initFirebase() {
  if (typeof window !== undefined) {
    initializeApp(firebaseConfig);
    console.log('Firebase has been init successfully');
  }
}
export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
