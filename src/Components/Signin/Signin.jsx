import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import classNames from 'classnames';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { signinValidationScheme } from './signinValidator';
import signinStyle from './signin.module.css';

export function Signin() {
  function submitHandler(values) {
    console.log(values);
  }
  return (
    <Formik
      initialValues={{
        email: 'email here',
        password: 'password here',
      }}
      validationSchema={signinValidationScheme}
      // eslint-disable-next-line react/jsx-no-bind
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
              Отправить данные
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
