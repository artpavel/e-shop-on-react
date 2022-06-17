import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss';
import Button from '../button/button.component';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.actions';

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
  const dispatch = useDispatch();

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
      dispatch(signUpStart(email, password, displayName))
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

  // data for create inputs
  const inputs = [
    {
      id: 1,
      label: 'Display Name',
      type: 'text',
      name: 'displayName',
      required: true,
      errorMessage: 'Username should be 3-16 characters',
      pattern: '^[A-Za-z0-9]{3,16}$'
    },
    {
      id: 2,
      label: 'Email',
      type: 'email',
      name: 'email',
      required: true,
      errorMessage: 'It should be a valid email address!'
    },
    {
      id: 3,
      label: 'Password',
      type: 'password',
      name: 'password',
      required: true,
      errorMessage: 'Password should be 6-10 characters',
      pattern: '^[A-Za-z0-9]{6,10}$'
    },
    {
      id: 4,
      label: 'Confirm Password',
      type: 'password',
      name: 'confirmPassword',
      required: true,
      errorMessage: 'Passwords don\'t match!',
      pattern: password
    }
  ];


  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sing up with your email and password</span>
      <form onSubmit={ handleSubmit }>
        {
          inputs.map(input => <FormInput key={ input.id }
                                         value={ formFields[input.name] }
                                         onChange={ handleChange }
                                         { ...input }
          />)
        }
        <div className="buttons-container">
          <Button type="submit">Sign Up</Button>
          <Button type="submit" onClick={ resetFormFields }>Reset</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;