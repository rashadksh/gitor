import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { basicLoginValidationSchema, basicSignupValidationSchema } from '@dev-hub-monitor/validation';

import { BasicLogin, BasicSignup, getUserData } from '../services/auth.service';
import { handelYupErrors } from '../utils/handle-yup-errors';
import Dashboard from '../pages/home-page';

import Button from './Button';
import CustomTypography from './Typography';

interface DynamicFormProps
{
  formType: 'signup' | 'login';
}

const AuthForm: React.FC<DynamicFormProps> = ({ formType }) =>
{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();

  const isSignup = formType === 'signup';
  const validationSchema = isSignup ? basicSignupValidationSchema : basicLoginValidationSchema;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) =>
    {
      try {
        if (isSignup) {
          await BasicSignup(values);
          window.alert('Registration successful! You will be redirected to the login page');
        } else {
          const loginResponse = await BasicLogin(values);
          const token = loginResponse.data.accessToken;
          const userData = await getUserData(token);
          setUserData(userData);
          if (!userData.githubToken) {
            console.log("");
          } else {
            setIsLoggedIn(true);
          }
        }
      } catch (error: any) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          formik.setErrors({ email: errorMessage });
        }
      }
    },
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validate: (values) =>
    {
      const errors: Record<string, string> = {};
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        if (isSignup && values.password !== values.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
      } catch (error: any) {
        return handelYupErrors(error);
      }
    },
  });

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;

  }

  return (
    <Form onFinish={formik.submitForm}>
      <Form.Item
        name='email'
        validateStatus={formik.errors.email ? 'error' : ''}
        help={<CustomTypography type='text' text={formik.errors.email || ''} />}
      >
        <Input
          type='email'
          placeholder='Email'
          size='large'
          required
          {...formik.getFieldProps('email')}
        />
      </Form.Item>
      <Form.Item
        name='password'
        validateStatus={formik.errors.password ? 'error' : ''}
        help={<CustomTypography type='text' text={formik.errors.password || ''} />}
      >
        <Input.Password
          type='password'
          placeholder='Password'
          size='large'
          required
          {...formik.getFieldProps('password')}
        />
      </Form.Item>
      {isSignup && (
        <Form.Item
          name='confirmPassword'
          dependencies={['password']}
          hasFeedback
          validateStatus={formik.errors.confirmPassword ? 'error' : ''}
          help={<CustomTypography type='text' text={formik.errors.confirmPassword || ''} />}
        >
          <Input.Password
            type='password'
            required
            placeholder='Confirm Password'
            size='large'
            {...formik.getFieldProps('confirmPassword')}
          />
        </Form.Item>
      )}
      <Form.Item>
        <Button text={isSignup ? 'Sign Up' : 'Login'} />
      </Form.Item>
    </Form>
  );
};

export default AuthForm;
