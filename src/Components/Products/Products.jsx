import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dogFoodApi } from '../../api/DogFoodApi';
import { ProductItem } from '../ProductItem/ProductItem';
import productsStyle from './products.module.css';
import { Loader } from '../Loader/Loader';
import { getTokenSelector } from '../../redux/slices/tokenSlice';
import { getSearchSelector } from '../../redux/slices/filterSlice';
import { getQueryKey } from './helper';

export function Products() {
  console.log('render products');
  const navigate = useNavigate();
  const token = useSelector(getTokenSelector);
  const search = useSelector(getSearchSelector);
  if (token) {
    dogFoodApi.setToken(token);
    const {
      data, isLoading, isError, error,
    } = useQuery({
      queryKey: getQueryKey(search),
      queryFn: () => dogFoodApi.getAllProducts(search),
    });
    if (isLoading) return <Loader />;
    if (isError) {
      return (
        <div className="errorMessage">
          {error.message}
        </div>
      );
    }
    const { products } = data;
    if (products && !products.length) {
      return <p>Список пуст</p>;
    }
    return ({ products }
      && (
      <div className={productsStyle.products}>
        {products.map((product) => (
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
      )
    );
  }
  useEffect(() => { navigate('/signin'); });
}
