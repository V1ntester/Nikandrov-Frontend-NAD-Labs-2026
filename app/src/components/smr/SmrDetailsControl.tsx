import { Link } from 'react-router-dom';

type SmrDetailsControlProps = {
  likes: number;
  liked: boolean;
  onLike: () => void;
  nextTo: string;
  onMore: () => void;
};

export default function SmrDetailsControl({
  likes,
  liked,
  onLike,
  nextTo,
  onMore,
}: SmrDetailsControlProps) {
  return (
    <div className="product-controls">
      <div className="product-action">
        <button
          className={`btn action-btn like${liked ? ' active' : ''}`}
          onClick={onLike}
          aria-pressed={liked}
          aria-label="Нравится"
        >
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.252 2.11328C13.0717 0.36256 16.0316 0.36295 17.8516 2.11328H17.8525C19.6678 3.94907 19.6325 6.77901 17.8457 8.63672L17.8438 8.6377L10 16.8418L2.15625 8.6377L2.1543 8.63672L1.99219 8.45996C0.367323 6.60337 0.388131 3.89174 2.14648 2.11328C3.03426 1.21557 4.2187 0.822342 5.44727 0.822266C6.5991 0.822266 7.71161 1.16811 8.57812 1.95117L8.74805 2.11328L9.41992 2.82031L10 3.43164L10.5801 2.82031L11.252 2.11328Z"
              strokeWidth="1.6"
            />
          </svg>
        </button>
        <span>{likes}</span>
      </div>

      <div className="product-action">
        <Link className="btn action-btn next" to={nextTo}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 3L12 9L2 15V3Z" />
            <rect x="14" y="3" width="2" height="12" rx="0.5" />
          </svg>
        </Link>
      </div>

      <div className="product-action">
        <button type="button" className="more" onClick={onMore}>
          Еще
        </button>
      </div>
    </div>
  );
}
