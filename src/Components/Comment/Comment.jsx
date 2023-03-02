import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getTokenSelector } from '../../redux/slices/userSlice/tokenSlice';
import { getUserIDSelector } from '../../redux/slices/userSlice/userIDSlice';
import { Loader } from '../Loader/Loader';
import commentStyle from './comment.module.css';

export function Comment({ review }) {
  const createdAt = new Date(Date.parse(review.created_at));
  const updatedAt = new Date(Date.parse(review.updated_at));
  const formattedCreatedAt = createdAt.toLocaleString(createdAt);
  const formattedUpdatedAt = updatedAt.toLocaleString(updatedAt);
  const queryClient = useQueryClient();
  const userID = useSelector(getUserIDSelector);
  const token = useSelector(getTokenSelector);
  const {
    mutateAsync,
    isError: isErrorDelete,
    error: errorDelete,
    isLoading: isLoadingDelete,
  } = useMutation({
    mutationFn: () => dogFoodApi.deleteReview(token, review.product, review['_id']),
  });
  const deleteReviewHandler = async () => {
    await mutateAsync();
    queryClient.invalidateQueries({
      queryKey: ['allReviews'],
    });
  };
  if (isLoadingDelete) return <Loader />;
  if (isErrorDelete) {
    return (
      <div className={commentStyle.errorMessage}>
        {errorDelete.message}
      </div>
    );
  }
  return (
    <li className={commentStyle.review}>
      <div className={commentStyle.top}>
        <div className={commentStyle.date}>
          Пользователь
          {' '}
          {review.author['_id']}
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
          <i className={classNames('fa-solid fa-star', commentStyle.star)} />
        </div>
      </div>
      {review.text}
      <Link
        to={`/products/${review.product}`}
        className={commentStyle.product}
      >
        Перейти к товару
      </Link>
      {(userID === review.author['_id']) && (
        <button
          type="button"
          title="Удалить отзыв"
          onClick={deleteReviewHandler}
          className={commentStyle.button}
        >
          <i className="fa-solid fa-trash" />
        </button>
      )}
    </li>
  );
}
