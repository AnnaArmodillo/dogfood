import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getTokenSelector } from '../../redux/slices/userSlice/tokenSlice';
import { getUserIDSelector } from '../../redux/slices/userSlice/userIDSlice';
import { Loader } from '../Loader/Loader';
import productReviewStyle from './productReview.module.css';

export function ProductReview({ review }) {
  const createdAt = new Date(Date.parse(review.created_at));
  const updatedAt = new Date(Date.parse(review.updated_at));
  const formattedCreatedAt = createdAt.toLocaleString(createdAt);
  const formattedUpdatedAt = updatedAt.toLocaleString(updatedAt);
  const queryClient = useQueryClient();
  const userID = useSelector(getUserIDSelector);
  const { id } = useParams();
  const token = useSelector(getTokenSelector);
  const {
    mutateAsync,
    isError: isErrorDelete,
    error: errorDelete,
    isLoading: isLoadingDelete,
  } = useMutation({
    mutationFn: () => dogFoodApi.deleteReview(token, id, review['_id']),
  });
  const deleteReviewHandler = async () => {
    await mutateAsync();
    queryClient.invalidateQueries({
      queryKey: ['productByID'],
    });
  };
  if (isLoadingDelete) return <Loader />;
  if (isErrorDelete) {
    return (
      <div className={productReviewStyle.errorMessage}>
        {errorDelete.message}
      </div>
    );
  }
  return (
    <li className={productReviewStyle.review}>
      <div className={productReviewStyle.top}>
        <div className={productReviewStyle.date}>
          Пользователь
          {' '}
          {review.author}
          ,
          {' '}
          {formattedCreatedAt}
          {formattedCreatedAt !== formattedUpdatedAt && (
            <div>
              Обновлено
              {' '}
              {formattedUpdatedAt}
            </div>
          )}
        </div>
        <div>
          Оценка
          {' '}
          {review.rating}
          <i
            className={classNames('fa-solid fa-star', productReviewStyle.star)}
          />
        </div>
      </div>
      {review.text}
      {(userID === review.author) && (
        <button
          type="button"
          title="Удалить отзыв"
          onClick={deleteReviewHandler}
          className={productReviewStyle.button}
        >
          <i className="fa-solid fa-trash" />
        </button>
      )}
    </li>
  );
}
