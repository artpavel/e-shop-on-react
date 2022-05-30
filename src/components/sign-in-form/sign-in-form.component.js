import React, { useState } from 'react';
import './sign-in-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';

// for fields form
const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  // state
  const [formFields, setFormFields] = useState(defaultFormFields);

  // destructor
  const { email, password } = formFields;

  const handleChange = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response)
      resetFormFields();
    } catch (error) {
      switch (error.code){
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(error.message)
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // create or check user (signInWithPopup)
  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    await createUserDocumentFromAuth(response.user);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sing in with your email and password</span>
      <form onSubmit={ handleSubmit }>
        <FormInput label="Email" type="email" name="email" required
                   value={ email } onChange={ handleChange }
        />

        <FormInput label="Password" type="password" name="password" required
                   value={ password } onChange={ handleChange }
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google"
                  type="button"
                  onClick={ signInWithGoogle }
          >Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;