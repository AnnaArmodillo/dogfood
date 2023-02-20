import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteFromFavourite, getFavouriteSelector } from '../../redux/slices/favouriteSlice';
import favouriteItemStyle from './favouriteItem.module.css';

export function FavouriteItem({
  title, photo, price, wight, discount, id, stock, tags, reviews,
}) {
  const dispatch = useDispatch();
  const favourite = useSelector(getFavouriteSelector);
  function likeHandler() {
    dispatch(deleteFromFavourite(id));
  }
  if (!favourite.includes(id)) {
    return null;
  }
  return (
    <div className={favouriteItemStyle.card}>
      <div className={favouriteItemStyle.photo}>
        <img
          src={photo}
          alt="изображение товара"
        />
      </div>
      <div className={favouriteItemStyle.info}>
        <Link to={`/products/${id}`} className={favouriteItemStyle.title}>{title}</Link>
        <div className={favouriteItemStyle.wight}>{wight}</div>
        {tags.includes('new') ? (
          <div className={favouriteItemStyle.new}>Новинка</div>
        ) : (
          ''
        )}
        {discount ? (
          <div className={favouriteItemStyle.discount}>
            -
            {discount}
            %
          </div>
        ) : (
          ''
        )}
        {stock ? (
          <div>
            В наличии
            {' '}
            {stock}
            {' '}
            шт.
          </div>
        ) : (
          <div>
            Нет в наличии
          </div>
        )}
        <div>
          Отзывов:
          {' '}
          {reviews.length}
        </div>
      </div>
      <div className={favouriteItemStyle.priceWrapper}>
        <div className={favouriteItemStyle.totalPrice}>
          {(price * (1 - discount / 100)).toFixed(2)}
          {' '}
          ₽
        </div>
        {discount ? (
          <div className={favouriteItemStyle.price}>
            {price.toFixed(2)}
            {' '}
            ₽
          </div>
        ) : null}
      </div>
      <div className={favouriteItemStyle.like} onClick={likeHandler}>
        <i className="fa-solid fa-heart" title="Удалить из избранного" />
      </div>
    </div>
  );
}
