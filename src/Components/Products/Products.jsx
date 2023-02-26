import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dogFoodApi } from '../../api/DogFoodApi';
import { ProductItem } from '../ProductItem/ProductItem';
import productsStyle from './products.module.css';
import { Loader } from '../Loader/Loader';
import { getTokenSelector } from '../../redux/slices/userSlice/tokenSlice';
import {
  getSearchFilterSelector,
  getSearchSelector,
} from '../../redux/slices/filterSlice';
import { getQueryKey } from './helper';
import { Filters } from '../Filters/Filters';
import { Search } from '../Search/Search';
import { scrollToTop } from '../HOCs/scrollToTop';
import {
  CHEAP, EXPENSIVE, NEW, OLD, SALES,
} from '../Filters/constants';

function ProductsInner() {
  const navigate = useNavigate();
  const token = useSelector(getTokenSelector);
  const [searchParams] = useSearchParams();
  const search = useSelector(getSearchSelector);
  const filterFromRedux = useSelector(getSearchFilterSelector);
  const filterName = searchParams.get('filterName') ?? filterFromRedux;
  const sortedProducts = (products) => {
    switch (filterName) {
      case NEW:
        return products.sort(
          (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
        );
      case OLD:
        return products.sort(
          (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at),
        );
      case SALES:
        return products.filter((product) => product.discount);
      case CHEAP:
        return products.sort((a, b) => a.price - b.price);
      case EXPENSIVE:
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };
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
    queryKey: getQueryKey(search),
    queryFn: () => dogFoodApi.getAllProducts(search, token),
    enabled: !!token,
  });
  if (isLoading) return <Loader />;
  if (isError) {
    return <div className={productsStyle.errorMessage}>{error.message}</div>;
  }
  return (
    <>
      <Search />
      <Filters />
      {isFetching && (<Loader />)}
      {products[0] && (
        <div className={productsStyle.products}>
          {sortedProducts([...products]).map((product) => (
            <ProductItem
              key={product['_id']}
              id={product['_id']}
              title={product.name}
              photo={product.pictures}
              price={product.price}
              wight={product.wight}
              discount={product.discount}
              tags={product.tags}
              likes={product.likes}
            />
          ))}
        </div>
      )}
      {!sortedProducts([...products])[0] && products && (
        <div className={productsStyle.emptyList}>
          По Вашему запросу ничего не найдено
        </div>
      )}
    </>
  );
}
const ProductsScrollToTop = scrollToTop(ProductsInner);
export function Products() {
  return <ProductsScrollToTop />;
}
