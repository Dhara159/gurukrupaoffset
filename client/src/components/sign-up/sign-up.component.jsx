import React, { useState } from 'react';

import FormInput from './../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.component';

import { SignUpContainer, SignUpTitle } from './sign-up.styles';

const SignUp = () => {

  const [userCredentials, setCredentials] = useState({
    displayName: '',
    email: '',
    address: '',
    contactNumber: '',
    gstin: '',
    password: '',
    confirmPassword: '',
  });

  const { displayName, email, address, contactNumber, gstin, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    // Call a method to signup
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  }

  return (
    <SignUpContainer>
      <SignUpTitle>I do not have a account</SignUpTitle>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='text'
          name='address'
          value={address}
          onChange={handleChange}
          label='Address'
          required
        />
        <FormInput
          type='tel'
          name='contactNumber'
          value={contactNumber}
          onChange={handleChange}
          label='Contact Number'
          required
        />
        <FormInput
          type='text'
          name='gstin'
          value={gstin}
          onChange={handleChange}
          label='Gstin'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </SignUpContainer>
  )
};

export default SignUp;