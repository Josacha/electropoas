// Importaciones Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";


// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBLd3FPCHhLbOsIupHULDn3hxLt4UDREgU",
  authDomain: "electropoas.firebaseapp.com",
  projectId: "electropoas",
  storageBucket: "electropoas.firebasestorage.app",
  messagingSenderId: "478757140513",
  appId: "1:478757140513:web:46f61ef5654e7d4224cb60",
  measurementId: "G-GGZSCLLWBY"
};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);


// Inicializar servicios
const analytics = getAnalytics(app);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);


// Exportar servicios
export { db, auth, storage, analytics };
