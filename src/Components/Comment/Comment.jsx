import classNames from 'classnames';
import { Link } from 'react-router-dom';
import commentStyle from './comment.module.css';

export function Comment({ review }) {
  const createdAt = new Date(Date.parse(review.created_at));
  const updatedAt = new Date(Date.parse(review.updated_at));
  const formattedCreatedAt = createdAt.toLocaleString(createdAt);
  const formattedUpdatedAt = updatedAt.toLocaleString(updatedAt);
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
    </li>
  );
}
