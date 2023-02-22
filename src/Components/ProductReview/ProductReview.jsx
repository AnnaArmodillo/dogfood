import classNames from 'classnames';
import productReviewStyle from './productReview.module.css';

export function ProductReview({ review }) {
  const createdAt = new Date(Date.parse(review.created_at));
  const updatedAt = new Date(Date.parse(review.updated_at));
  const formattedCreatedAt = createdAt.toLocaleString(createdAt);
  const formattedUpdatedAt = updatedAt.toLocaleString(updatedAt);
  return (
    <li className={productReviewStyle.review}>
      <div className={productReviewStyle.top}>
        <div className={productReviewStyle.date}>
          Пользователь
          {' '}
          {review.author['_id']}
          ,
          {' '}
          {formattedCreatedAt}
          {(formattedCreatedAt !== formattedUpdatedAt) && (
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
          <i className={classNames('fa-solid fa-star', productReviewStyle.star)} />
        </div>
      </div>
      {review.text}
    </li>
  );
}
