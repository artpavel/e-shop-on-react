import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';

import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch } from 'firebase/firestore';

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

/* <<< WORKS with DB >>> */
// add
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLocaleLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

// get
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
};


/* --- END WORKS with DB --- */

/* <<< Authentication >>> */
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
// first method
export const signInWithGooglePopup = () => signInWithPopup(auth, googleAuthProvider);
// second method
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleAuthProvider);
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

/* <<< check auth with password and email >>> */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

/* <<< close user which was auth >>> */
export const signOutUser = async () => signOut(auth);

/* <<< monitoring auth user >>> */
export const onAuthStateChangedListener = callback => onAuthStateChanged(auth, callback);

