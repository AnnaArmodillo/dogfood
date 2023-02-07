import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct } from '../../redux/slices/cartSlice';
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
  id,
}) {
  const userID = useSelector(getUserIDSelector);
  const dispatch = useDispatch();
  function addToCartHandler() {
    dispatch(addNewProduct(id));
  }
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
      <div className={productItemStyle.totalPrice}>
        {price * (1 - discount / 100)}
        {' '}
        ₽
      </div>
      {discount ? (
        <div className={productItemStyle.price}>
          {price}
          {' '}
          ₽
        </div>
      ) : null}
      <div className={productItemStyle.wight}>{wight}</div>
      <div className={productItemStyle.title}>{title}</div>
      <button
        onClick={addToCartHandler}
        className={productItemStyle.buttonBuy}
        type="button"
        title="В корзину"
      >
        <i className="fa-solid fa-cart-shopping" />
      </button>
    </div>
  );
}
