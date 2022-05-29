import React from 'react';
import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  // create or check user
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={ logGoogleUser }>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;