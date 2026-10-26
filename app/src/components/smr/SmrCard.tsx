import { Link } from 'react-router-dom';
import type { SubmitEvent } from 'react';
import type { Smr } from '../../types/smr'
import { DEFAULT_IMAGE } from '../../modules/mock';

type SmrCardProps = {
  smr: Smr;
  likes?: number;
  defaultImage?: string;
  onDelete?: (id: number) => void;
};

export default function SmrCard({
  smr,
  likes = 0,
  defaultImage = DEFAULT_IMAGE,
  onDelete,
}: SmrCardProps) {
    const handleDelete = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onDelete?.(smr.id);
    };

  return (
    <div className="product-item">
      <Link to={`/smr/${smr.id}`}>
        <div className="product-card">
          <div className="image-container">
            <img src={smr.image_url || defaultImage} alt={smr.name || 'Реактор'} />
          </div>
          <div className="description">
            <h4 className="manufacturer">{smr.manufacturer}</h4>
            <h4 className="name">{smr.name}</h4>
            <div className="likes">
              <svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.252 2.11328C13.0717 0.36256 16.0316 0.36295 17.8516 2.11328H17.8525C19.6678 3.94907 19.6325 6.77901 17.8457 8.63672L17.8438 8.6377L10 16.8418L2.15625 8.6377L2.1543 8.63672L1.99219 8.45996C0.367323 6.60337 0.388131 3.89174 2.14648 2.11328C3.03426 1.21557 4.2187 0.822342 5.44727 0.822266C6.5991 0.822266 7.71161 1.16811 8.57812 1.95117L8.74805 2.11328L9.41992 2.82031L10 3.43164L10.5801 2.82031L11.252 2.11328Z"
                  strokeWidth="1.6"
                />
              </svg>
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </Link>

      {onDelete && (
        <form className="delete-form" onSubmit={handleDelete}>
          <button type="submit" className="delete-link">Удалить</button>
        </form>
      )}
    </div>
  );
}
