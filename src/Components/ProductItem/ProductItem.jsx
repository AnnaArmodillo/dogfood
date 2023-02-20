import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewProduct } from '../../redux/slices/cartSlice';
import {
  addToFavourite, deleteFromFavourite, getFavouriteSelector,
} from '../../redux/slices/favouriteSlice';
import productItemStyle from './productItem.module.css';

export function ProductItem({
  title,
  photo,
  price,
  wight,
  discount,
  tags,
  id,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favourite = useSelector(getFavouriteSelector);
  function addToCartHandler() {
    dispatch(addNewProduct(id));
  }
  function showProductHandler(event) {
    if (
      !event.target.closest('button')
      && !event.target.closest('i')
    ) {
      navigate(`/products/${id}`);
    }
  }
  function likeHandler() {
    if (favourite.includes(id)) {
      dispatch(deleteFromFavourite(id));
    } else {
      dispatch(addToFavourite(id));
    }
  }
  return (
    <div
      className={productItemStyle.card}
      onClick={showProductHandler}
    >
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
      <div
        className={productItemStyle.like}
        onClick={likeHandler}
      >
        {favourite.includes(id) ? (
          <i className="fa-solid fa-heart" title="Удалить из избранного" />
        ) : (
          <i className="fa-regular fa-heart" title="Добавить в избранное" />
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
