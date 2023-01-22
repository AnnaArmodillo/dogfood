import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { dogFoodApi } from '../../api/DogFoodApi';
import { ProductItem } from '../ProductItem/ProductItem';
import productsStyle from './products.module.css';
import { withQuery } from '../HOCs/withQuery';
import { AppContext } from '../../Contexts/AppContextProvider';

function ProductsInner({ data }) {
  const { token } = useContext(AppContext);
  if (!token) {
    const navigate = useNavigate();
    navigate('/signin');
  }

  const { products } = data;
  if (!products.length) {
    return <p>Список пуст</p>;
  }
  return (
    <div className={productsStyle.products}>
      {products.map((product) => (
        <ProductItem
          key={product['_id']}
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
  );
}
const ProductsWithQuery = withQuery(ProductsInner);
export function Products() {
  console.log('render products');
  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryKey: ['allProducts'],
    queryFn: () => dogFoodApi.getAllProducts(),
  });
  return (
    <ProductsWithQuery
      isError={isError}
      isLoading={isLoading}
      error={error}
      data={data}
    />

  );
}
