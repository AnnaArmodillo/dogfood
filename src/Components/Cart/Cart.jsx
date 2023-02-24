import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import {
  checkAllProducts,
  getCartSelector,
  uncheckAllProducts,
} from '../../redux/slices/cartSlice';
import { getTokenSelector } from '../../redux/slices/userSlice/tokenSlice';
import { CartItem } from '../CartItem/CartItem';
import { scrollToTop } from '../HOCs/scrollToTop';
import { Loader } from '../Loader/Loader';
import { UnknownProduct } from '../UnknownProduct/UnknownProduct';
import cartStyle from './cart.module.css';

function CartInner() {
  const cart = useSelector(getCartSelector);
  const token = useSelector(getTokenSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function isCheckedAllProducts() {
    return cart.every((product) => product.isChecked);
  }
  function checkAllProductsHandler() {
    if (cart.every((product) => product.isChecked)) {
      dispatch(uncheckAllProducts());
    } else if (cart.some((product) => product.isChecked)) {
      dispatch(checkAllProducts());
    } else {
      dispatch(checkAllProducts());
    }
  }
  function buyHandler() {
    console.log('Заказ оформлен');
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
    isFetching,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: () => dogFoodApi.getProductsByIDs(
      cart.map((product) => product.id),
      token,
    ),
    enabled: !!token,
  });
  if (isLoading) return <Loader />;
  if (isError) {
    return <div className={cartStyle.errorMessage}>{error.message}</div>;
  }
  const checkedProducts = cart
    .filter((product) => product.isChecked)
    .filter((cartProduct) => products.find((product) => cartProduct.id === product['_id']));
  console.log(checkedProducts);
  const totalCount = checkedProducts.reduce((acc, el) => acc + el.count, 0);
  let totalCost = 0;
  checkedProducts.map((product) => {
    const checkedProduct = products.find((el) => product.id === el['_id']);
    totalCost
      += checkedProduct.price
      * (1 - checkedProduct.discount / 100)
      * product.count;
    return totalCost;
  });
  if (!cart.length) {
    return (
      <div className={cartStyle.emptyCartBlock}>
        <p>Корзина пуста</p>
        <div className={cartStyle.linksWrapper}>
          <NavLink
            to="/"
            className={cartStyle.link}
          >
            На главную
          </NavLink>
          <NavLink
            to="/products"
            className={cartStyle.link}
          >
            В каталог
          </NavLink>
          <NavLink
            to="/profile"
            className={cartStyle.link}
          >
            В профиль
          </NavLink>
        </div>
      </div>
    );
  }
  return (
    <div className={cartStyle.cart}>
      <div className={cartStyle.productsWrapper}>
        <label className={cartStyle.checkAll}>
          <input
            type="checkbox"
            onChange={checkAllProductsHandler}
            checked={isCheckedAllProducts()}
          />
          Выбрать все
        </label>
        <div className={cartStyle.products}>
          {products
            .filter((product) => !!product['_id'])
            .map((product) => (
              <CartItem
                key={product['_id']}
                title={product.name}
                photo={product.pictures}
                price={product.price}
                wight={product.wight}
                discount={product.discount}
                id={product['_id']}
                stock={product.stock}
              />
            ))}
          {cart
            .filter(
              (cartProduct) => !products.find((product) => cartProduct.id === product['_id']),
            )
            .map((product) => (
              <UnknownProduct
                key={product.id}
                id={product.id}
              />
            ))}
        </div>
        {isFetching && <Loader />}
      </div>
      <div className={cartStyle.order}>
        <div className={cartStyle.quantity}>
          Выбрано товаров:
          {' '}
          {totalCount}
        </div>
        <div className={cartStyle.totalPrice}>
          Общая сумма:
          {' '}
          {totalCost.toFixed(2)}
          {' '}
          ₽
        </div>
        <button
          type="button"
          onClick={buyHandler}
          className={cartStyle.buttonBuy}
        >
          Оформить
        </button>
      </div>
    </div>
  );
}
const CartScrollToTop = scrollToTop(CartInner);
export function Cart() {
  return <CartScrollToTop />;
}
