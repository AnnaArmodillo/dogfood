import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { changeSearchFilter } from '../../redux/slices/filterSlice';
import searchStyle from './search.module.css';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get('q');
    return searchValueFromQuery ?? '';
  });
  const dispatch = useDispatch();
  const debouncedSearchValue = useDebounce(search, 1000);
  function clearSearchHandler() {
    setSearch('');
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: '',
    });
  }
  function changeSearchHandler(event) {
    const newSearchValue = event.target.value;
    setSearch(newSearchValue);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: newSearchValue,
    });
  }
  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue));
  }, [dispatch, debouncedSearchValue]);
  return (
    <div className={searchStyle.searchWrapper}>
      <input
        type="text"
        placeholder="Поиск..."
        value={search}
        className={searchStyle.inputSearch}
        onChange={changeSearchHandler}
      />
      <i
        onClick={clearSearchHandler}
        title="Сбросить поиск"
        className={classNames(
          'fa-solid fa-circle-xmark',
          searchStyle.searchClearButton,
        )}
      />
    </div>
  );
}
