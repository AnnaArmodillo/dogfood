/* eslint-disable import/prefer-default-export */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import classNames from 'classnames';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import signupStyle from './signup.module.css';
import { signupValidationScheme } from './signupValidator';
import { withQuery } from '../HOCs/withQuery';
import { dogFoodApi } from '../../api/DogFoodApi';

function SignupInner({ mutateAsync }) {
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    await mutateAsync(values);
    setTimeout(() => navigate('/signin'));
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
  console.log('render signup');
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.signup(values),
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
