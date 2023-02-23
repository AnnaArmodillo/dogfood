import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getSearchFilterSelector } from '../../redux/slices/filterSlice';
import filterItemStyle from './filterItem.module.css';

export function FilterItem({ filterName, clickFilterHandler }) {
  const [searchParams] = useSearchParams();
  const filterFromRedux = useSelector(getSearchFilterSelector);
  const currentFilterName = searchParams.get('filterName') ?? filterFromRedux;
  return (
    <button
      onClick={() => clickFilterHandler(filterName)}
      className={classNames(
        currentFilterName === filterName
          ? filterItemStyle.filterButtonActive
          : '',
        filterItemStyle.filterButton,
      )}
      type="button"
    >
      {filterName}
    </button>
  );
}
