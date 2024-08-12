// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


export async function getAuthConfig() {
  // Call AWS API to get firebase config
  // The only place need to change is the API url as it's specific for each project
  // const response = await axios.get("<Secure-AWS-API>").catch((error) => {
  //   console.log(error);
  // });
  // Get firebase config
  //  const firebaseConfig = await response.data;
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Get auth
  const auth = getAuth(app);
  return auth;
}
