import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signinValidationScheme } from './signinValidator';
import signinStyle from './signin.module.css';
import { withQuery } from '../HOCs/withQuery';
import { AppContext, AppMethodsContext } from '../../Contexts/AppContextProvider';

function SigninInner({ mutateAsync }) {
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    await mutateAsync(values);
    navigate('/products');
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={signinValidationScheme}
      onSubmit={submitHandler}
    >
      {(formik) => {
        const { isValid } = formik;
        return (
          <Form className={signinStyle.form}>
            <Field
              className={signinStyle.field}
              type="email"
              name="email"
              placeholder="email"
            />
            <ErrorMessage
              className={signinStyle.error}
              name="email"
              component="div"
            />
            <Field
              className={signinStyle.field}
              type="password"
              name="password"
              placeholder="пароль"
            />
            <ErrorMessage
              className={signinStyle.error}
              name="password"
              component="div"
            />
            <button
              className={classNames(signinStyle.button, {
                [signinStyle.disabled]: !isValid,
              })}
              type="submit"
              disabled={!isValid}
            >
              Войти
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
const SigninWithQuery = withQuery(SigninInner);
function Signin() {
  console.log('render signin');
  const token = useContext(AppContext);
  const setToken = useContext(AppMethodsContext);
  console.log(token);
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (values) => fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.status === 401) {
        throw new Error('Неверные логин или пароль');
      } else if (res.status === 404) {
        throw new Error('Пользователь с указанным email не найден');
      } else if (res.status >= 300) {
        throw new Error(`Ошибка, код ${res.status}`);
      }
      return res.json();
    }).then((result) => {
      setToken(result.token);
    }),
  });

  return (
    <SigninWithQuery
      mutateAsync={mutateAsync}
      isError={isError}
      error={error}
      isLoading={isLoading}
    />

  );
}
export const SigninMemo = React.memo(Signin);
