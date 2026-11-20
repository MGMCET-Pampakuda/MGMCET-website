import fs from "fs";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, collection, getDocs, writeBatch } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

console.log("Connecting to Firebase project:", firebaseConfig.projectId);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const rawData = fs.readFileSync(
  "/home/adarsh/.gemini/antigravity/brain/c69f908f-5ac6-4004-a75f-e019bf47c3ce/scratch/news_data.json",
  "utf-8"
);
const items = JSON.parse(rawData);
console.log(`Loaded ${items.length} news items from news_data.json`);

async function uploadAll() {
  console.log("Authenticating as admin@mgmcet.ac.in...");
  const userCredential = await signInWithEmailAndPassword(auth, "admin@mgmcet.ac.in", "admin123");
  console.log("Authenticated successfully! UID:", userCredential.user.uid);

  console.log("Committing batch writes to Firestore collection 'news'...");
  const batch = writeBatch(db);

  for (const item of items) {
    const docRef = doc(db, "news", item.id);
    batch.set(docRef, item, { merge: true });
  }

  await batch.commit();
  console.log(`Successfully written all ${items.length} news items to Firestore!`);

  // Verification read
  const snap = await getDocs(collection(db, "news"));
  console.log(`\n======================================================`);
  console.log(`VERIFICATION CONFIRMED: Found ${snap.size} total documents in Firestore 'news' collection.`);
  console.log(`======================================================\n`);

  process.exit(0);
}

uploadAll().catch((err) => {
  console.error("Firestore upload error:", err);
  process.exit(1);
});
