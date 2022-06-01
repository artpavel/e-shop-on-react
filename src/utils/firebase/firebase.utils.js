import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// initialization
const firebaseConfig = {
  apiKey: 'AIzaSyCtCdWVEuY-zVS2kPh4L_uwiRGo85aQE_c',
  authDomain: 'crwn-db-f86e9.firebaseapp.com',
  projectId: 'crwn-db-f86e9',
  storageBucket: 'crwn-db-f86e9.appspot.com',
  messagingSenderId: '371460497986',
  appId: '1:371460497986:web:1c9b65bb4d0c8064c5c3db'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

/* <<< Authentication >>> */
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
// first method
export const signInWithGooglePopup = () => signInWithPopup(auth, googleAuthProvider);
// second method
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleAuthProvider);
/* --- END Authentication ---  */

/* <<< auth with GOOGLE >>> */
export const db = getFirestore();
// create or check user in my db
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  // if user data doesn't exist / set the document with data from userAuth in collection
  // if user data exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  // if user data exits
  return userDocRef;
};
/* --- END auth with GOOGLE --- */


/* <<< auth with password and email >>> */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
/* --- END auth with password and email --- */


/* <<< check auth with password and email >>> */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
/* --- END check with password and email --- */

/* <<< close user which was auth >>> */
export const signOutUser = async () => signOut(auth);
/* --- END close user which was auth --- */