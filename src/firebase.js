import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCY37KT30JLLpJZJzda6IpsGE0RKRx2qC8",
  authDomain: "netflix-clone-basic-beb89.firebaseapp.com",
  projectId: "netflix-clone-basic-beb89",
  storageBucket: "netflix-clone-basic-beb89.appspot.com",
  messagingSenderId: "546190070491",
  appId: "1:546190070491:web:532c647f378429683332fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return user;
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));

  }
};

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Successfully Logged In")
    return res.user;
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));

  }
};

export { auth, db, login, signup, logout };
