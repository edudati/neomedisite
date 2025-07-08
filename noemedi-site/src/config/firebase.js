import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyASDdArUboaeKvb_D7bvufFwobOcNi7mpw",
    authDomain: "neomedi-bb3f0.firebaseapp.com",
    projectId: "neomedi-bb3f0",
    storageBucket: "neomedi-bb3f0.firebasestorage.app",
    messagingSenderId: "419202996201",
    appId: "1:419202996201:web:c8ebd644825c0a0f00dd78"
  };

  
// Inicializa o app
const app = initializeApp(firebaseConfig);

// Exporte corretamente o auth e o provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider }; 