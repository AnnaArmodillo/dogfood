import { useDispatch } from 'react-redux';
import {
  checkProduct,
  deleteProduct,
  increaseProductCount,
  reduceProductCount,
} from '../redux/slices/cartSlice';

export function useActions() {
  const dispatch = useDispatch();
  function deleteHandler(id) {
    dispatch(deleteProduct(id));
  }
  function quantityIncreaseHandler(id) {
    dispatch(increaseProductCount(id));
  }
  function quantityReduceHandler(id) {
    dispatch(reduceProductCount(id));
  }
  function checkProductHandler(id) {
    dispatch(checkProduct(id));
  }
  return {
    deleteHandler, quantityIncreaseHandler, quantityReduceHandler, checkProductHandler,
  };
}
