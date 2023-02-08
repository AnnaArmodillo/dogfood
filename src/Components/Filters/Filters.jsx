import { useSearchParams } from 'react-router-dom';
import { FilterItem } from '../FilterItem/FilterItem';
import FiltersStyle from './filters.module.css';

export function Filters() {
  const FILTERS = ['NEW', 'DISCOUNT'];
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilterName = searchParams.get('filterName');
  function clickFilterHandler(filterName) {
    if (currentFilterName !== filterName) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        filterName,
      });
    } else {
      console.log('2');
      console.log(Object.fromEntries(searchParams.entries()));
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        filterName: '',
      });
    }
  }
  console.log(Object.fromEntries(searchParams.entries()));
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
