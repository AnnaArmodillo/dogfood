import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkProduct,
  deleteProduct,
  getCartSelector,
  increaseProductCount,
  reduceProductCount,
} from '../../redux/slices/cartSlice';
import { Modal } from '../Modal/Modal';
import cartItemStyle from './cartItem.module.css';

export function CartItem({
  title, photo, price, wight, discount, id, stock,
}) {
  const [isModalActive, setIsModalActive] = useState(false);
  const cart = useSelector(getCartSelector);
  let count = 0;
  let isChecked = false;
  const currentProduct = cart.find((product) => product.id === id);
  if (currentProduct) {
    count = currentProduct.count;
    isChecked = currentProduct.isChecked;
  }
  const dispatch = useDispatch();
  function closeModalHandler() {
    setIsModalActive(false);
  }
  function openModalHandler() {
    setIsModalActive(true);
  }
  function deleteHandler() {
    dispatch(deleteProduct(id));
  }
  function quantityIncreaseHandler() {
    dispatch(increaseProductCount(id));
  }
  function quantityReduceHandler() {
    dispatch(reduceProductCount(id));
  }
  function checkProductHandler() {
    dispatch(checkProduct(id));
  }
  if (count === 0) return null;
  return (
    <div className={cartItemStyle.card}>
      <label className={cartItemStyle.check}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={checkProductHandler}
        />
      </label>
      <div className={cartItemStyle.photo}>
        <img
          src={photo}
          alt="изображение товара"
        />
      </div>
      <div className={cartItemStyle.info}>
        <div className={cartItemStyle.title}>{title}</div>
        <div className={cartItemStyle.wight}>{wight}</div>
        {discount ? (
          <div className={cartItemStyle.discount}>
            -
            {discount}
            %
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={cartItemStyle.buttonsWrapper}>
        <div className={cartItemStyle.quantityWrapper}>
          <button
            type="button"
            disabled={count < 2}
            onClick={quantityReduceHandler}
            className={cartItemStyle.quantityButton}
          >
            <i className="fa-solid fa-minus" />
          </button>
          {count}
          <button
            type="button"
            disabled={count > stock - 1}
            onClick={quantityIncreaseHandler}
            className={cartItemStyle.quantityButton}
          >
            <i className="fa-solid fa-plus" />
          </button>
        </div>
        <div className={cartItemStyle.price}>
          {price.toFixed(2)}
          {' '}
          ₽/шт.
        </div>
        <button
          type="button"
          onClick={openModalHandler}
          title="Убрать из корзины"
          className={cartItemStyle.deleteButton}
        >
          <i className="fa-solid fa-trash" />
        </button>
      </div>
      <div className={cartItemStyle.costWrapper}>
        <div className={cartItemStyle.totalCost}>
          {(price * count * (1 - discount / 100)).toFixed(2)}
          {' '}
          ₽
        </div>
        {discount ? (
          <div className={cartItemStyle.cost}>
            {(price * count).toFixed(2)}
            {' '}
            ₽
          </div>
        ) : null}
      </div>
      <Modal isModalActive={isModalActive} closeModalHandler={closeModalHandler}>
        <div className={cartItemStyle.question}>
          Точно удалить товар &quot;
          {title}
          &quot;?
        </div>
        <div className={cartItemStyle.buttonsModalWrapper}>
          <button
            onClick={closeModalHandler}
            className={cartItemStyle.buttonCancel}
            type="button"
          >
            Отмена
          </button>
          <button
            onClick={deleteHandler}
            className={cartItemStyle.buttonClear}
            type="button"
          >
            Удалить
          </button>
        </div>
      </Modal>
    </div>
  );
}
