import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import filterItemStyle from './filterItem.module.css';

export function FilterItem({ filterName, clickFilterHandler }) {
  const [searchParams] = useSearchParams();
  const currentFilterName = searchParams.get('filterName');
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
