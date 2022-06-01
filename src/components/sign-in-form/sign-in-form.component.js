import React, { useState, useContext } from 'react';
import './sign-in-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../context/user.context';

// for fields form
const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  // state
  const [formFields, setFormFields] = useState(defaultFormFields);

  // context
  const { setCurrentUser } = useContext(UserContext);

  // destructor
  const { email, password } = formFields;

  const handleChange = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(event)

    try {
      const user = await signInAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(error.message);
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

  // data for create inputs
  const inputs = [
    {
      id: 11,
      label: 'Email',
      type: 'email',
      name: 'email',
      required: true,
      errorMessage: 'It should be a valid email address!'
    },
    {
      id: 12,
      label: 'Password',
      type: 'password',
      name: 'password',
      required: true,
      errorMessage: 'Password should be 6-10 characters',
      pattern: '^[A-Za-z0-9]{6,10}$'
    }
  ];

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sing in with your email and password</span>
      <form onSubmit={ handleSubmit }>
        {
          inputs.map(input => <FormInput key={ input.id }
                                         value={ formFields[input.name] }
                                         onChange={ handleChange }
                                         { ...input }
          />)
        }
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