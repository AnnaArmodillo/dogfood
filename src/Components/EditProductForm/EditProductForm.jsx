import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getTokenSelector } from '../../redux/slices/userSlice/tokenSlice';
import { Loader } from '../Loader/Loader';
import editProductFormStyle from './editProductForm.module.css';
import { editProductFormValidationScheme } from './editProductFormValidator';

export function EditProductForm({ setIsModalEditProductActive, product }) {
  const token = useSelector(getTokenSelector);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.editProductByID(values, id, token),
  });
  const submitHandler = async (values) => {
    await mutateAsync(values);
    setIsModalEditProductActive(false);
    queryClient.invalidateQueries({
      queryKey: ['productByID'],
    });
  };
  return (
    <Formik
      initialValues={{
        available: product.available,
        pictures: product.pictures,
        name: product.name,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        wight: product.wight,
        description: product.description,
      }}
      validationSchema={editProductFormValidationScheme}
      onSubmit={submitHandler}
    >
      {(formik) => {
        const { isValid } = formik;
        return (
          <Form className={editProductFormStyle.form}>
            {!isLoading && (
            <>
              <div className={[editProductFormStyle.fieldWrapper]}>
                <Field
                  className={editProductFormStyle.field}
                  type="text"
                  name="name"
                  placeholder="наименование"
                  title="Наименование"
                />
                <ErrorMessage
                  className={editProductFormStyle.error}
                  name="name"
                  component="div"
                />
              </div>
              <div className={[editProductFormStyle.fieldWrapper]}>
                <Field
                  className={editProductFormStyle.field}
                  type="text"
                  name="price"
                  placeholder="цена"
                  title="Цена"
                />
                <ErrorMessage
                  className={editProductFormStyle.error}
                  name="price"
                  component="div"
                />
              </div>
              <div className={[editProductFormStyle.fieldWrapper]}>
                <Field
                  className={editProductFormStyle.field}
                  type="text"
                  name="wight"
                  placeholder="количество"
                  title="Количество"
                />
                <ErrorMessage
                  className={editProductFormStyle.error}
                  name="wight"
                  component="div"
                />
              </div>
              <div className={[editProductFormStyle.fieldWrapper]}>
                <Field
                  className={editProductFormStyle.field}
                  type="text"
                  name="description"
                  placeholder="описание"
                  title="Описание"
                />
                <ErrorMessage
                  className={editProductFormStyle.error}
                  name="description"
                  component="div"
                />
              </div>
              <div className={[editProductFormStyle.fieldWrapper]}>
                <Field
                  className={editProductFormStyle.field}
                  type="text"
                  name="stock"
                  placeholder="количество товара в наличии"
                  title="Количество товара в наличии"
                />
                <ErrorMessage
                  className={editProductFormStyle.error}
                  name="stock"
                  component="div"
                />
              </div>
              <div className={[editProductFormStyle.fieldWrapper]}>
                <Field
                  className={editProductFormStyle.field}
                  type="text"
                  name="discount"
                  placeholder="размер скидки"
                  title="Размер скидки"
                />
                <ErrorMessage
                  className={editProductFormStyle.error}
                  name="discount"
                  component="div"
                />
              </div>
              <div className={[editProductFormStyle.fieldWrapper]}>
                <Field
                  className={editProductFormStyle.field}
                  type="url"
                  name="pictures"
                  placeholder="ссылка на изображение товара"
                  title="Ссылка на изображение товара"
                />
                <ErrorMessage
                  className={editProductFormStyle.error}
                  name="pictures"
                  component="div"
                />
              </div>
              <div className={[editProductFormStyle.fieldWrapper]}>
                <label>
                  <Field type="checkbox" name="available" />
                  Товар доступен
                </label>
              </div>
              <button
                className={classNames(editProductFormStyle.button, {
                  [editProductFormStyle.disabled]: !isValid,
                })}
                type="submit"
                disabled={!isValid}
              >
                Сохранить изменения
              </button>
            </>
            )}
            {isLoading && (
            <div className={editProductFormStyle.loader}>
              <Loader />
            </div>
            )}
            {isError && (
            <div className={editProductFormStyle.errorMessage}>{error.message}</div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
