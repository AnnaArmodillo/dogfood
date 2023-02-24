import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import {
  deleteFromFavourite,
  getFavouriteSelector,
} from '../../redux/slices/favouriteSlice';
import { getTokenSelector } from '../../redux/slices/userSlice/tokenSlice';
import { FavouriteItem } from '../FavouriteItem/FavouriteItem';
import { scrollToTop } from '../HOCs/scrollToTop';
import { Loader } from '../Loader/Loader';
import favouriteStyle from './favourite.module.css';

function FavouriteInner() {
  const favourite = useSelector(getFavouriteSelector);
  const token = useSelector(getTokenSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
  }, [token]);
  const {
    data: products,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['favourite'],
    queryFn: () => dogFoodApi.getProductsByIDs(
      favourite.map((product) => product),
      token,
    ),
    enabled: !!token,
  });
  if (isLoading) return <Loader />;
  if (isError) {
    return <div className={favouriteStyle.errorMessage}>{error.message}</div>;
  }
  if (!favourite.length) {
    return (
      <div className={favouriteStyle.emptyList}>
        <p>Отсутствуют избранные товары</p>
      </div>
    );
  }
  if (products.find((product) => !product['_id'])) {
    favourite.forEach((favouriteProduct) => {
      if (!products.find((product) => favouriteProduct === product['_id'])) {
        setTimeout(() => dispatch(deleteFromFavourite(favouriteProduct)));
      }
    });
  }
  return (
    <div className={favouriteStyle.favourite}>
      {products.filter((product) => !!product['_id']).map((product) => (
        <FavouriteItem
          key={product['_id']}
          title={product.name}
          photo={product.pictures}
          price={product.price}
          wight={product.wight}
          discount={product.discount}
          id={product['_id']}
          stock={product.stock}
          tags={product.tags}
          reviews={product.reviews}
        />
      ))}
      {isFetching && <Loader />}
    </div>
  );
}
const FavouriteScrollToTop = scrollToTop(FavouriteInner);
export function Favourite() {
  return (
    <FavouriteScrollToTop />
  );
}
