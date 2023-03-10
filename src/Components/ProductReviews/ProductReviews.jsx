import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getTokenSelector } from '../../redux/slices/userSlice/tokenSlice';
import { Loader } from '../Loader/Loader';
import { ProductReview } from '../ProductReview/ProductReview';
import productReviewsStyle from './productReviews.module.css';
import { productReviewsValidationScheme } from './productReviewsValidator';

export function ProductReviews({ reviews }) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const token = useSelector(getTokenSelector);
  const { id } = useParams();
  const queryClient = useQueryClient();
  reviews.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  function openReviewFormHandler() {
    setIsReviewFormOpen(true);
  }
  function closeReviewFormHandler() {
    setIsReviewFormOpen(false);
  }
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.addReview(values, token, id),
  });
  const submitHandler = async (values) => {
    await mutateAsync(values);
    setIsReviewFormOpen(false);
    queryClient.invalidateQueries({
      queryKey: ['productByID'],
    });
  };
  return (
    <>
      <h3>Отзывы</h3>
      {!isReviewFormOpen && (
        <button
          type="button"
          className={productReviewsStyle.button}
          onClick={openReviewFormHandler}
        >
          Добавить отзыв на товар
        </button>
      )}
      {isReviewFormOpen && (
        <Formik
          initialValues={{
            text: '',
            rating: '',
          }}
          validationSchema={productReviewsValidationScheme}
          onSubmit={submitHandler}
        >
          {(formik) => {
            const { isValid } = formik;
            return (
              <Form className={productReviewsStyle.form}>
                <div className={productReviewsStyle.ratingWrapper}>
                  <div id="ratingGroup">Оценка</div>
                  <div
                    role="group"
                    aria-labelledby="ratingGroup"
                  >
                    <Field
                      type="radio"
                      name="rating"
                      id="1"
                      value="1"
                    />
                    <label htmlFor="1">
                      <i className="fa-solid fa-star" title="1" />
                    </label>
                    <Field
                      type="radio"
                      name="rating"
                      id="2"
                      value="2"
                    />
                    <label htmlFor="2">
                      <i className="fa-solid fa-star" title="2" />
                    </label>
                    <Field
                      type="radio"
                      name="rating"
                      id="3"
                      value="3"
                    />
                    <label htmlFor="3">
                      <i className="fa-solid fa-star" title="3" />
                    </label>
                    <Field
                      type="radio"
                      name="rating"
                      id="4"
                      value="4"
                    />
                    <label htmlFor="4">
                      <i className="fa-solid fa-star" title="4" />
                    </label>
                    <Field
                      type="radio"
                      name="rating"
                      id="5"
                      value="5"
                    />
                    <label htmlFor="5">
                      <i className="fa-solid fa-star" title="5" />
                    </label>
                  </div>
                </div>
                <Field
                  className={productReviewsStyle.field}
                  as="textarea"
                  name="text"
                  placeholder="Текст отзыва"
                />
                <ErrorMessage
                  className={productReviewsStyle.error}
                  name="text"
                  component="div"
                />
                <div className={productReviewsStyle.buttonsWrapper}>
                  <button
                    type="button"
                    className={productReviewsStyle.button}
                    onClick={closeReviewFormHandler}
                  >
                    Отмена
                  </button>
                  <button
                    className={classNames(productReviewsStyle.button, {
                      [productReviewsStyle.disabled]: !isValid,
                    })}
                    type="submit"
                    disabled={!isValid}
                  >
                    Опубликовать отзыв
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
      {isLoading && (<div className={productReviewsStyle.loader}><Loader /></div>)}
      {isError && (<div className={productReviewsStyle.errorMessage}>{error.message}</div>)}
      <ul className={productReviewsStyle.reviews}>
        {reviews.map((review) => (
          <ProductReview
            review={review}
            key={review['_id']}
          />
        ))}
      </ul>
    </>
  );
}
