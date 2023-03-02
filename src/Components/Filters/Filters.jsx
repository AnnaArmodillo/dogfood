import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { changeSearchFilterName, getSearchFilterSelector } from '../../redux/slices/filterSlice';
import { FilterItem } from '../FilterItem/FilterItem';
import {
  CHEAP, EXPENSIVE, NEW, OLD, SALES, POPULAR,
} from './constants';
import FiltersStyle from './filters.module.css';

export function Filters() {
  const FILTERS = [NEW, OLD, SALES, CHEAP, EXPENSIVE, POPULAR];
  const [searchParams, setSearchParams] = useSearchParams();
  const filterFromRedux = useSelector(getSearchFilterSelector);
  const currentFilterName = searchParams.get('filterName') ?? filterFromRedux;
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentFilterName === '') {
      searchParams.delete('filterName');
      setSearchParams(searchParams);
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        filterName: currentFilterName,
      });
    }
  }, [currentFilterName]);
  function clickFilterHandler(filterName) {
    if (currentFilterName !== filterName) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        filterName,
      });
      dispatch(changeSearchFilterName(filterName));
    } else {
      searchParams.delete('filterName');
      setSearchParams(searchParams);
      dispatch(changeSearchFilterName(''));
    }
  }
  return (
    <div className={FiltersStyle.filtersWrapper}>
      {FILTERS.map((filterName) => (
        <FilterItem
          key={filterName}
          filterName={filterName}
          clickFilterHandler={clickFilterHandler}
        />
      ))}
    </div>
  );
}
