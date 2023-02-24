import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../redux/slices/cartSlice';
import unknownProductStyle from './unknownProduct.module.css';

export function UnknownProduct({ id }) {
  const dispatch = useDispatch();
  function deleteFromCartHandler() {
    dispatch(deleteProduct(id));
  }
  return (
    <div className={unknownProductStyle.card}>
      <div className={unknownProductStyle.image}>
        <i className="fa-solid fa-question" />
      </div>
      <div className={unknownProductStyle.info}>
        Такого товара не существует. Вероятно, он был удален из каталога.
      </div>
      <button
        type="button"
        onClick={deleteFromCartHandler}
        title="Убрать из корзины"
        className={unknownProductStyle.deleteButton}
      >
        <i className="fa-solid fa-trash" />
      </button>
    </div>
  );
}
