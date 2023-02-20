import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { addNewProduct, getCartSelector } from '../../redux/slices/cartSlice';
import {
  addToFavourite, deleteFromFavourite, getFavouriteSelector,
} from '../../redux/slices/favouriteSlice';
import { getTokenSelector } from '../../redux/slices/tokenSlice';
import { Loader } from '../Loader/Loader';
import { ProductReviews } from '../ProductReviews/ProductReviews';
import detailStyle from './detail.module.css';

export function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector(getTokenSelector);
  const cart = useSelector(getCartSelector);
  const favourite = useSelector(getFavouriteSelector);
  const dispatch = useDispatch();
  function likeHandler() {
    if (favourite.includes(id)) {
      dispatch(deleteFromFavourite(id));
    } else {
      dispatch(addToFavourite(id));
    }
  }
  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
  }, [token]);
  const {
    data: product,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['productByID'],
    queryFn: () => dogFoodApi.getProductByID(id, token),
    enabled: !!token,
  });
  if (isLoading || isFetching) return <Loader />;
  if (isError) {
    return <div className={detailStyle.errorMessage}>{error.message}</div>;
  }
  return (
    <div className={detailStyle.card}>
      <h1>{product.name}</h1>
      <div className={detailStyle.wrapper}>
        <img
          className={detailStyle.photo}
          src={product.pictures}
          alt="изображение товара"
        />
        <div className={detailStyle.info}>
          <div className={detailStyle.priceWrapper}>
            <div className={detailStyle.totalPrice}>
              {product.price * (1 - product.discount / 100)}
              {' '}
              ₽
            </div>
            {product.discount ? (
              <div className={detailStyle.price}>
                {product.price}
                {' '}
                ₽
              </div>
            ) : null}
          </div>
          <div className={detailStyle.wight}>{product.wight}</div>
          {product.stock ? (
            <div>
              В наличии
              {' '}
              {product.stock}
              {' '}
              шт.
            </div>
          ) : (
            <div>
              Нет в наличии
            </div>
          )}
          {product.tags.includes('new') ? (
            <div className={detailStyle.new}>Новинка</div>
          ) : (
            ''
          )}
          {product.discount ? (
            <div className={detailStyle.discount}>
              -
              {product.discount}
              %
            </div>
          ) : (
            ''
          )}
          {(cart.findIndex((item) => item.id === product['_id'])) < 0 ? (
            <button
              onClick={() => dispatch(addNewProduct(id))}
              className={detailStyle.buttonBuy}
              type="button"
              title="В корзину"
            >
              <i className="fa-solid fa-cart-shopping" />
            </button>
          ) : (<div>Товар уже есть в Вашей корзине</div>)}
        </div>
        <div className={detailStyle.like} onClick={likeHandler}>
          {favourite.includes(id) ? (
            <i className="fa-solid fa-heart" title="Удалить из избранного" />
          ) : (
            <i className="fa-regular fa-heart" title="Добавить в избранное" />
          )}
        </div>
      </div>
      <div className={detailStyle.description}>{product.description}</div>
      <ProductReviews reviews={product.reviews} />
    </div>
  );
}
