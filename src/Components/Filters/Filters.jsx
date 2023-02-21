import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { changeSearchFilterName } from '../../redux/slices/filterSlice';
import { FilterItem } from '../FilterItem/FilterItem';
import {
  CHEAP, EXPENSIVE, NEW, SALES,
} from './constants';
import FiltersStyle from './filters.module.css';

export function Filters() {
  const FILTERS = [NEW, SALES, CHEAP, EXPENSIVE];
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilterName = searchParams.get('filterName');
  const dispatch = useDispatch();
  function clickFilterHandler(filterName) {
    if (currentFilterName !== filterName) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        filterName,
      });
      dispatch((changeSearchFilterName(filterName)));
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        filterName: '',
      });
      dispatch((changeSearchFilterName('')));
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
