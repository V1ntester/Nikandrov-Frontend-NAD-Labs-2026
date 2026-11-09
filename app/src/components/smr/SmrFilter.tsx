import type { SubmitEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { applyRange, selectRange } from '../../features/smr/smrFiltersSlice';

export default function SmrFilter() {
  const dispatch = useAppDispatch();
  const { filter_min: min, filter_max: max } = useAppSelector((state) => state.smrFilters.selected);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(applyRange());
  };

  return (
    <div className="filter-card">
      <h3>Тепловая мощность, МВт</h3>
      <form className="filter-controls" onSubmit={handleSubmit}>
        <span className="filter-range">От {min} до {max}</span>

        <div className="filter-action power-range">
          <div className="range-row">
            <input
              className="action-range"
              type="range"
              name="thermal_power_min"
              min={100}
              max={240}
              step={10}
              value={min}
              onChange={(e) => dispatch(selectRange({ filter_min: Number(e.target.value), filter_max: max }))}
            />
          </div>
          <div className="range-row">
            <input
              className="action-range"
              type="range"
              name="thermal_power_max"
              min={260}
              max={500}
              step={10}
              value={max}
              onChange={(e) => dispatch(selectRange({ filter_min: min, filter_max: Number(e.target.value) }))}
            />
          </div>
        </div>

        <div className="filter-action find">
          <button type="submit" className="btn btn-light action-btn">
            Найти
          </button>
        </div>
      </form>
    </div>
  );
}
