// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Конфиг берём из переменных окружения (.env.local)
// Убедись, что .env.local лежит в корне проекта и перезапустил dev-сервер
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.FIREBASE_APP_ID!,
};

// Инициализация Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore экспортируем
export const db = getFirestore(app);

// Лог для проверки (будет в терминале)
console.log("FIREBASE CONFIG LOADED:", {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
});