import { useState, type SubmitEvent } from 'react';

type FilterValues = {
  thermal_power_min: number;
  thermal_power_max: number;
};

type SmrFilterProps = {
  initialMin?: number;
  initialMax?: number;
  onSubmit?: (values: FilterValues) => void;
};

export default function SmrFilter({
  initialMin = 100,
  initialMax = 500,
  onSubmit,
}: SmrFilterProps) {
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.({ thermal_power_min: min, thermal_power_max: max });
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
              onChange={(e) => setMin(Number(e.target.value))}
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
              onChange={(e) => setMax(Number(e.target.value))}
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
