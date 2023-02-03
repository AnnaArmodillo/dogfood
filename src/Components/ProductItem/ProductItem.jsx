import { useSelector } from 'react-redux';
import { getUserIDSelector } from '../../redux/slices/userIDSlice';
import productItemStyle from './productItem.module.css';

export function ProductItem({
  title,
  photo,
  price,
  wight,
  discount,
  tags,
  likes,
}) {
  const userID = useSelector(getUserIDSelector);
  return (
    <div className={productItemStyle.card}>
      <div className={productItemStyle.tagsWrapper}>
        {discount ? (
          <div className={productItemStyle.discount}>
            -
            {discount}
            %
          </div>
        ) : (
          ''
        )}
        {tags.includes('new') ? (
          <div className={productItemStyle.new}>Новинка</div>
        ) : (
          ''
        )}
      </div>
      <div className={productItemStyle.photo}>
        <img
          src={photo}
          alt="изображение товара"
        />
      </div>
      <div className={productItemStyle.like}>
        {likes.includes(userID) ? (
          <i className="fa-solid fa-heart" />
        ) : (
          <i className="fa-regular fa-heart" />
        )}
      </div>
      <div className={productItemStyle.price}>
        {price}
        {' '}
        ₽
      </div>
      <div className={productItemStyle.wight}>{wight}</div>
      <div className={productItemStyle.title}>{title}</div>
      <button
        className={productItemStyle.buttonBuy}
        type="button"
      >
        В корзину
      </button>
    </div>
  );
}
