import * as dotenv from 'dotenv';
import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { getMessaging } from 'firebase-admin/messaging';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore'; // Import Firestore

dotenv.config();

let db_ref_verse_app = undefined;
let auth_verse_app = undefined;
let messaging_verse_app = undefined;
let firebaseStorageBucket = undefined;

const firebaseConfig = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  storageBucket: 'verse-9c645.appspot.com',
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

const initializeFirebaseApp = () => {
  const verse_app = initializeApp(
    {
      credential: cert(firebaseConfig),
      databaseURL: process.env.VERSE_DATABASE_URL,
      databaseAuthVariableOverride: {
        uid: process.env.VERSE_AUTH_SECRET,
      },
    },
    'verse_app'
  );

  db_ref_verse_app = getDatabase(verse_app).ref();

  auth_verse_app = getAuth(verse_app);

  messaging_verse_app = getMessaging(verse_app);
  firebaseStorageBucket = getStorage(verse_app).bucket('verse-9c645.appspot.com');
};

const getDBRefVerseApp = () => {
  return db_ref_verse_app;
};

const getAuthVerseApp = () => {
  return auth_verse_app;
};

const getMessagingVerseApp = () => {
  return messaging_verse_app;
};

const getStorageReferenceVerseApp = () => {
  return firebaseStorageBucket;
};

export { initializeFirebaseApp, getDBRefVerseApp, getAuthVerseApp, getMessagingVerseApp, getStorageReferenceVerseApp };
