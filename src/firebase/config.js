import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgWDWZ3rAvFdfhhgrHI_4BIYMMZU3VmDI",
  authDomain: "miniblog-ref-5ab4d.firebaseapp.com",
  projectId: "miniblog-ref-5ab4d",
  storageBucket: "miniblog-ref-5ab4d.appspot.com",
  messagingSenderId: "564783812554",
  appId: "1:564783812554:web:cc4c165501de5c0ef8c933"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};