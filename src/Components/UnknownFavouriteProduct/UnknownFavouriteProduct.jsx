import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { deleteFromFavourite } from '../../redux/slices/favouriteSlice';
import unknownFavouriteProductStyle from './unknownFavouriteProduct.module.css';

export function UnknownFavouriteProduct({ id }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  function deleteFromFavouriteHandler() {
    dispatch(deleteFromFavourite(id));
    queryClient.invalidateQueries({
      queryKey: ['favourite'],
    });
  }
  return (
    <div className={unknownFavouriteProductStyle.card}>
      <div className={unknownFavouriteProductStyle.image}>
        <i className="fa-solid fa-question" />
      </div>
      <div className={unknownFavouriteProductStyle.info}>
        Такого товара не существует. Вероятно, он был удален из каталога.
      </div>
      <div className={unknownFavouriteProductStyle.like} onClick={deleteFromFavouriteHandler}>
        <i className="fa-solid fa-heart" title="Удалить из избранного" />
      </div>
    </div>
  );
}
