import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdY1bCaSLynhzgFcHjPxNezpVYdmeNbT8",
  authDomain: "notorio-aeec1.firebaseapp.com",
  databaseURL: "https://notorio-aeec1-default-rtdb.firebaseio.com",
  projectId: "notorio-aeec1",
  storageBucket: "notorio-aeec1.appspot.com",
  messagingSenderId: "649026423297",
  appId: "1:649026423297:web:f4cf920e3f69fe747cce00"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

// Comentarios en español:
// Este archivo configura Firebase para nuestra aplicación.
// Exportamos los servicios de autenticación, base de datos en tiempo real y almacenamiento.