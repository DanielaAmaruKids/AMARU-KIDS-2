import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean);

const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;

export function isFirebaseReady() {
  return Boolean(db);
}

export async function saveFamilyProgress(progress) {
  const payload = {
    ...progress,
    updatedAt: new Date().toISOString(),
  };

  if (!db) {
    localStorage.setItem('amaru-kids-progress', JSON.stringify(payload));
    return { mode: 'local' };
  }

  await setDoc(
    doc(db, 'familyReports', 'demo-user'),
    {
      ...progress,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  return { mode: 'firebase' };
}
