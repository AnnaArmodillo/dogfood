import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { dogFoodApi } from '../../api/DogFoodApi';
import { ProductItem } from '../ProductItem/ProductItem';
import productsStyle from './products.module.css';
// import { withQuery } from '../HOCs/withQuery';
import { AppContext } from '../../Contexts/AppContextProvider';
import { Loader } from '../Loader/Loader';

// function ProductsInner({ data }) {

// }
// const ProductsWithQuery = withQuery(ProductsInner);
export function Products() {
  console.log('render products');
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  if (token) {
    const {
      data, isLoading, isError, error,
    } = useQuery({
      queryKey: ['allProducts'],
      queryFn: () => dogFoodApi.getAllProducts(),
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
  useEffect(() => { navigate('/signin'); });
}
