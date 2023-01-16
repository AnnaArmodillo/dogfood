/* eslint-disable import/prefer-default-export */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import classNames from 'classnames';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import signupStyle from './signup.module.css';
import { signupValidationScheme } from './signupValidator';

export function Signup() {
  function submitHandler(values) {
    console.log(values);
  }
  return (
    <Formik
      initialValues={{
        email: 'email here',
        group: 'sm9',
        password: 'password here',
      }}
      validationSchema={signupValidationScheme}
      // eslint-disable-next-line react/jsx-no-bind
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
              Отправить данные
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
