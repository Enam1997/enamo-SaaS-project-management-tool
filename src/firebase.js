import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyB7i1-6xmvwIPAcRRLHZCYLf3ec2IJwHY8",
  authDomain: "enamo-57ce7.firebaseapp.com",
  projectId: "enamo-57ce7",
  storageBucket: "enamo-57ce7.appspot.com",
  messagingSenderId: "51188273621",
  appId: "1:51188273621:web:8a1b315696a1178e682d5c",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9098");
  connectFirestoreEmulator(db, "localhost", 8082);
  connectFunctionsEmulator(fbFunctions, "localhost", 5002);
}
