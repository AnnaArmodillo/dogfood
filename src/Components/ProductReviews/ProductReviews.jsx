import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getTokenSelector } from '../../redux/slices/tokenSlice';
import { ProductReview } from '../ProductReview/ProductReview';
import productReviewsStyle from './productReviews.module.css';
import { productReviewsValidationScheme } from './productReviewsValidator';

export function ProductReviews({ reviews }) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const token = useSelector(getTokenSelector);
  const { id } = useParams();
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
  };
  console.log(isLoading, isError, error);
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
                      <i className="fa-solid fa-star" />
                    </label>
                    <Field
                      type="radio"
                      name="rating"
                      id="2"
                      value="2"
                    />
                    <label htmlFor="2">
                      <i className="fa-solid fa-star" />
                    </label>
                    <Field
                      type="radio"
                      name="rating"
                      id="3"
                      value="3"
                    />
                    <label htmlFor="3">
                      <i className="fa-solid fa-star" />
                    </label>
                    <Field
                      type="radio"
                      name="rating"
                      id="4"
                      value="4"
                    />
                    <label htmlFor="4">
                      <i className="fa-solid fa-star" />
                    </label>
                    <Field
                      type="radio"
                      name="rating"
                      id="5"
                      value="5"
                    />
                    <label htmlFor="5">
                      <i className="fa-solid fa-star" />
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
                    className={classNames(productReviewsStyle.button, {
                      [productReviewsStyle.disabled]: !isValid,
                    })}
                    type="submit"
                    disabled={!isValid}
                  >
                    Опубликовать отзыв
                  </button>
                  <button
                    type="button"
                    className={productReviewsStyle.button}
                    onClick={closeReviewFormHandler}
                  >
                    Отмена
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
      <ul className={productReviewsStyle.reviews}>
        {reviews.map((review) => (
          <ProductReview
            review={review}
            key={review.created_at}
          />
        ))}
      </ul>
    </>
  );
}
