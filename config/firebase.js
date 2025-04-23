// config/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Configuración de Firebase desde google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyDp-3RxQC8mEXBeYlfxVED2jfMn4HxZGFQ",
  authDomain: "gstreamso.firebaseapp.com",
  projectId: "gstreamso",
  storageBucket: "gstreamso.appspot.com",
  messagingSenderId: "801397332820",
  appId: "1:801397332820:android:4508d9e11469cbc5fe46c1"
};

// ✅ Inicializar Firebase si no fue inicializado previamente
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Exportar servicios para usar en toda la app
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
