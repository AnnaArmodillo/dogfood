import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSearchFilter } from '../../redux/slices/filterSlice';
import searchStyle from './search.module.css';

export function Search({ closeSearchHandler }) {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  function changeSearchHandler(event) {
    const newSearchValue = event.target.innerText;
    console.log(newSearchValue);
    setSearch(newSearchValue);
    dispatch(changeSearchFilter(newSearchValue));
  }
  return (
    <div className={searchStyle.searchWrapper}>
      <div
        contentEditable
        suppressContentEditableWarning
        className={searchStyle.search}
        type="text"
        onInput={changeSearchHandler}
        value={search}
      />
      {/* <input
        type="text"
        placeholder="Поиск..."
        value={search}
        className={searchStyle.search}
        onChange={changeSearchHandler}
      /> */}
      <i
        onClick={closeSearchHandler}
        className={classNames(
          'fa-solid fa-circle-xmark',
          searchStyle.searchCloseButton,
        )}
      />
    </div>
  );
}
