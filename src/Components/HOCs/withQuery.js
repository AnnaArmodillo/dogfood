import { Loader } from '../Loader/Loader';

// eslint-disable-next-line func-names
export const withQuery = (WrappedComponent) => function ({
  isError, error, isLoading, ...rest
}) {
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
  if (isLoading) return <Loader />;
  return (
    <WrappedComponent {...rest} />
  );
};
