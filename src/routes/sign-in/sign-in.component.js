import React from 'react';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {

  // create or check user (signInWithPopup)
  const logGoogleUserPopup = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
  };


  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={ logGoogleUserPopup }>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;