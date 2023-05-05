import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxPDUC2lSRlpeicjbAx30DQcfWqjAnwR0",
  authDomain: "goit-react-hw-08-phonebo-bb1cd.firebaseapp.com",
  projectId: "goit-react-hw-08-phonebo-bb1cd",
  storageBucket: "goit-react-hw-08-phonebo-bb1cd.appspot.com",
  messagingSenderId: "825690652083",
  appId: "1:825690652083:web:bcfa6a82ecbeff4c695fc6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
