import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { changeSearchValue, getSearchSelector } from '../../redux/slices/filterSlice';
import searchStyle from './search.module.css';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromRedux = useSelector(getSearchSelector);
  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get('q');
    return searchValueFromQuery ?? searchFromRedux;
  });
  useEffect(() => {
    if (search === '') {
      searchParams.delete('q');
      setSearchParams(searchParams);
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        q: search,
      });
    }
  }, [search, searchParams]);
  const dispatch = useDispatch();
  const debouncedSearchValue = useDebounce(search, 1000);
  function clearSearchHandler() {
    setSearch('');
    searchParams.delete('q');
    setSearchParams(searchParams);
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
    dispatch(changeSearchValue(debouncedSearchValue));
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
