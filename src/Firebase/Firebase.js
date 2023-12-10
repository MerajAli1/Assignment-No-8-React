import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase,
push,
set,
ref,
onChildAdded } from "firebase/database";
import { getStorage, ref as storageRef } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBYu0EiqCJ4gHgEf1qkN-HhxPhkmdd2glc",
  authDomain: "ecommerce-web-app-b3e69.firebaseapp.com",
  databaseURL: "https://ecommerce-web-app-b3e69-default-rtdb.firebaseio.com",
  projectId: "ecommerce-web-app-b3e69",
  storageBucket: "ecommerce-web-app-b3e69.appspot.com",
  messagingSenderId: "423099790982",
  appId: "1:423099790982:web:d22ff82c50955ad7db4307",
  measurementId: "G-50PT62S5DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth   = getAuth(app);
const DATABASE = getDatabase(app)
const STORAGE = getStorage(app)

export {
    auth,
    DATABASE,
    push,
    set,
    ref,
    onChildAdded,
    STORAGE,
    storageRef
}