import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dogFoodApi } from '../../api/DogFoodApi';
import { ProductItem } from '../ProductItem/ProductItem';
import productsStyle from './products.module.css';
import { Loader } from '../Loader/Loader';
import { getTokenSelector } from '../../redux/slices/tokenSlice';
import {
  getSearchFilterSelector,
  getSearchSelector,
} from '../../redux/slices/filterSlice';
import { getQueryKey } from './helper';
import { Filters } from '../Filters/Filters';
import { Search } from '../Search/Search';
import { scrollToTop } from '../HOCs/scrollToTop';
import {
  CHEAP, EXPENSIVE, NEW, SALES,
} from '../Filters/constants';

function ProductsInner() {
  console.log('render products');
  const navigate = useNavigate();
  const token = useSelector(getTokenSelector);
  const search = useSelector(getSearchSelector);
  const filterName = useSelector(getSearchFilterSelector);
  let sortedProducts = [];
  function sortProducts([...products]) {
    switch (filterName) {
      case NEW:
        sortedProducts = products.filter((product) => product.tags.includes('new'));
        break;
      case SALES:
        sortedProducts = products.filter((product) => product.discount);
        break;
      case CHEAP:
        sortedProducts = products.sort((a, b) => (a.price - b.price));
        break;
      case EXPENSIVE:
        sortedProducts = products.sort((a, b) => (b.price - a.price));
        break;
      default:
        sortedProducts = products;
        break;
    }
  }
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
  } = useQuery({
    queryKey: getQueryKey(search),
    queryFn: () => dogFoodApi.getAllProducts(search, token),
    enabled: !!token,
  });
  if (isLoading) return <Loader />;
  if (isError) {
    return <div className={productsStyle.errorMessage}>{error.message}</div>;
  }
  sortProducts(products);
  return (
    <>
      <Search />
      <Filters />
      {products[0] && (
        <div className={productsStyle.products}>
          {sortedProducts.map((product) => (
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
      {!products[0] && products && (
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
