// services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDp-3RxQC8mEXBeYlfxVED2jfMn4HxZGFQ",
  authDomain: "gstreamso.firebaseapp.com",
  projectId: "gstreamso",
  storageBucket: "gstreamso.appspot.com",
  messagingSenderId: "801397332820",
  appId: "1:801397332820:android:4508d9e11469cbc5fe46c1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
