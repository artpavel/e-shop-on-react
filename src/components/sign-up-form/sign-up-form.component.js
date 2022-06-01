import React, { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss';
import Button from '../button/button.component';

// for fields form
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  // state
  const [formFields, setFormFields] = useState(defaultFormFields);

  // destructor
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };


  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sing up with your email and password</span>
      <form onSubmit={ handleSubmit }>
        <FormInput label="Display Name" type="text" name="displayName" required
                   onChange={ handleChange } value={ displayName }
        />

        <FormInput label="Email" type="email" name="email" required
                   value={ email } onChange={ handleChange }
        />

        <FormInput label="Password" type="password" name="password" required
                   value={ password } onChange={ handleChange }
        />

        <FormInput label="Confirm Password" type="password" name="confirmPassword" required
                   value={ confirmPassword } onChange={ handleChange }
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;