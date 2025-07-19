// firebase.js
import { getApps, getApp, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADrLMGHCYHsGnzttzehrWFExpGR0k7aXA",
  authDomain: "sla-applogin.firebaseapp.com",
  projectId: "sla-applogin",
  storageBucket: "sla-applogin.appspot.com", // 🔧 corrected from "firebasestorage.app" to "appspot.com"
  messagingSenderId: "389315729081",
  appId: "1:389315729081:web:2cf30b704b012caa23ed68",
  measurementId: "G-VLRFX1S372",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage };
