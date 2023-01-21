/* eslint-disable import/prefer-default-export */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import classNames from 'classnames';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import signupStyle from './signup.module.css';
import { signupValidationScheme } from './signupValidator';
import { withQuery } from '../HOCs/withQuery';

function SignupInner({ mutateAsync }) {
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    await mutateAsync(values);
    navigate('/signin');
  };
  return (
    <Formik
      initialValues={{
        email: '',
        group: 'sm9',
        password: '',
      }}
      validationSchema={signupValidationScheme}
      onSubmit={submitHandler}
    >
      {(formik) => {
        const { isValid } = formik;
        return (
          <Form className={signupStyle.form}>
            <Field
              className={signupStyle.field}
              type="email"
              name="email"
              placeholder="email"
            />
            <ErrorMessage
              className={signupStyle.error}
              name="email"
              component="div"
            />
            <Field
              className={signupStyle.field}
              type="group"
              name="group"
            />
            <ErrorMessage
              className={signupStyle.error}
              name="group"
              component="div"
            />
            <Field
              className={signupStyle.field}
              type="password"
              name="password"
              placeholder="пароль"
            />
            <ErrorMessage
              className={signupStyle.error}
              name="password"
              component="div"
            />
            <button
              className={classNames(signupStyle.button, {
                [signupStyle.disabled]: !isValid,
              })}
              type="submit"
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>
          </Form>
        );
      } }
    </Formik>
  );
}
const SignupWithQuery = withQuery(SignupInner);
export function Signup() {
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (values) => fetch('https://api.react-learning.ru/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.status === 409) {
        throw new Error('Юзер с указанным email уже существует');
      } else if (res.status === 400) {
        throw new Error('Некорректно заполнено одно из полей');
      } else if (res.status >= 300) {
        throw new Error(`Ошибка, код ${res.status}`);
      }
    }),
  });

  return (
    <SignupWithQuery
      mutateAsync={mutateAsync}
      isError={isError}
      error={error}
      isLoading={isLoading}
    />

  );
}
