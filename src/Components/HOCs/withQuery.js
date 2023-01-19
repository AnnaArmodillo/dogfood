import signupStyle from '../Signup/signup.module.css';
// eslint-disable-next-line func-names
export const withQuery = (WrappedComponent) => function ({ isError, error, ...rest }) {
  if (isError) {
    return (
      <>
        <WrappedComponent {...rest} />
        <div className={signupStyle.signupError}>
          {error.message}
        </div>
      </>
    );
  }
  return (
    <WrappedComponent {...rest} />
  );
};
