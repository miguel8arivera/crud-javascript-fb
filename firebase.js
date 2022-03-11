// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM7hWGiUISLZGCRQNix_4FxfzdCfZ--MA",
  authDomain: "crud-javascript-fb-9da84.firebaseapp.com",
  projectId: "crud-javascript-fb-9da84",
  storageBucket: "crud-javascript-fb-9da84.appspot.com",
  messagingSenderId: "186587241528",
  appId: "1:186587241528:web:8b7975a347169110829acd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const taskSave = (title, description) => {
  addDoc(collection(db, "tasks"), { title, description });
};

export const getTasks = () => getDocs(collection(db, "tasks"));

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, nuwFields) =>
  updateDoc(doc(db, "tasks", id), nuwFields);
