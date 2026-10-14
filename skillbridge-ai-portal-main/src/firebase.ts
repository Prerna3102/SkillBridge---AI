import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCl_iXVQQeCh1Iz4aCpVIe5-XkS6mJsPo",
  authDomain: "skillbridge-ai-b105c.firebaseapp.com",
  projectId: "skillbridge-ai-b105c",
  storageBucket: "skillbridge-ai-b105c.firebasestorage.app",
  messagingSenderId: "272207573805",
  appId: "1:272207573805:web:e63c50631d1e8f698259a4",
  measurementId: "G-54M5TJNFK4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);