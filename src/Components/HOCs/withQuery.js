// eslint-disable-next-line func-names
export const withQuery = (WrappedComponent) => function ({ isError, error, ...rest }) {
  if (isError) {
    return (
      <>
        <WrappedComponent {...rest} />
        <div className="errorMessage">
          {error.message}
        </div>
      </>
    );
  }
  return (
    <WrappedComponent {...rest} />
  );
};
