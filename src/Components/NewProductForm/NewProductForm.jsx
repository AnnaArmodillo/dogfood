import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useSelector } from 'react-redux';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getSearchSelector } from '../../redux/slices/filterSlice';
import { getTokenSelector } from '../../redux/slices/userSlice/tokenSlice';
import { Loader } from '../Loader/Loader';
import { getQueryKey } from '../Products/helper';
import newProductFormStyle from './newProductForm.module.css';
import { newProductFormValidationScheme } from './newProductFormValidator';

export function NewProductForm({ setIsAddNewProductModalActive }) {
  const token = useSelector(getTokenSelector);
  const search = useSelector(getSearchSelector);
  const queryClient = useQueryClient();
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.addNewProduct(values, token),
  });
  const submitHandler = async (values) => {
    await mutateAsync(values);
    setIsAddNewProductModalActive(false);
    queryClient.invalidateQueries(getQueryKey(search));
  };
  return (
    <Formik
      initialValues={{
        available: true,
        pictures: '',
        name: '',
        price: '',
        discount: '',
        stock: '',
        wight: '',
        description: '',
      }}
      validationSchema={newProductFormValidationScheme}
      onSubmit={submitHandler}
    >
      {(formik) => {
        const { isValid } = formik;
        return (
          <Form className={newProductFormStyle.form}>
            {!isLoading && (
            <>
              <div className={[newProductFormStyle.fieldWrapper]}>
                <Field
                  className={newProductFormStyle.field}
                  type="text"
                  name="name"
                  placeholder="наименование"
                />
                <ErrorMessage
                  className={newProductFormStyle.error}
                  name="name"
                  component="div"
                />
              </div>
              <div className={[newProductFormStyle.fieldWrapper]}>
                <Field
                  className={newProductFormStyle.field}
                  type="text"
                  name="price"
                  placeholder="цена"
                />
                <ErrorMessage
                  className={newProductFormStyle.error}
                  name="price"
                  component="div"
                />
              </div>
              <div className={[newProductFormStyle.fieldWrapper]}>
                <Field
                  className={newProductFormStyle.field}
                  type="text"
                  name="wight"
                  placeholder="количество"
                />
                <ErrorMessage
                  className={newProductFormStyle.error}
                  name="wight"
                  component="div"
                />
              </div>
              <div className={[newProductFormStyle.fieldWrapper]}>
                <Field
                  className={newProductFormStyle.field}
                  type="text"
                  name="description"
                  placeholder="описание"
                />
                <ErrorMessage
                  className={newProductFormStyle.error}
                  name="description"
                  component="div"
                />
              </div>
              <div className={[newProductFormStyle.fieldWrapper]}>
                <Field
                  className={newProductFormStyle.field}
                  type="text"
                  name="stock"
                  placeholder="количество товара в наличии"
                />
                <ErrorMessage
                  className={newProductFormStyle.error}
                  name="stock"
                  component="div"
                />
              </div>
              <div className={[newProductFormStyle.fieldWrapper]}>
                <Field
                  className={newProductFormStyle.field}
                  type="text"
                  name="discount"
                  placeholder="размер скидки"
                />
                <ErrorMessage
                  className={newProductFormStyle.error}
                  name="discount"
                  component="div"
                />
              </div>
              <div className={[newProductFormStyle.fieldWrapper]}>
                <Field
                  className={newProductFormStyle.field}
                  type="url"
                  name="pictures"
                  placeholder="ссылка на изображение товара"
                />
                <ErrorMessage
                  className={newProductFormStyle.error}
                  name="pictures"
                  component="div"
                />
              </div>
              <div className={[newProductFormStyle.fieldWrapper]}>
                <label>
                  <Field type="checkbox" name="available" />
                  Товар доступен
                </label>
              </div>
              <button
                className={classNames(newProductFormStyle.button, {
                  [newProductFormStyle.disabled]: !isValid,
                })}
                type="submit"
                disabled={!isValid}
              >
                Добавить товар
              </button>
            </>
            )}
            {isLoading && (
            <div className={newProductFormStyle.loader}>
              <Loader />
            </div>
            )}
            {isError && (
            <div className={newProductFormStyle.errorMessage}>{error.message}</div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
