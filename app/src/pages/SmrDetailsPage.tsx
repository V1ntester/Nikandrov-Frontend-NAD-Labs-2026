import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { getMockSmr, MOCK_LIKES, DEFAULT_VIDEO } from '../modules/mock';

export default function SmrDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const smr = getMockSmr(id ?? '');

  const [likes, setLikes] = useState(() => MOCK_LIKES[Number(id)] ?? 0);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (!smr) {
    return (
      <Layout>
        <article className="cards-block">
          <div className="container">
            <h2 className="page-title">Реактор не найден</h2>
          </div>
        </article>
      </Layout>
    );
  }

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    setLikes((n) => n + (next ? 1 : -1));
  };

  const shortDescription =
    (smr.description ?? '').length > 29
      ? smr.description!.slice(0, 29) + '...'
      : smr.description ?? '';

  return (
    <Layout>
      <article className="product-block">
        <video
          className="product-block-background"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={smr.video_url || DEFAULT_VIDEO} type="video/mp4" />
        </video>

        <div className="container">
          <div className="product-block-overlay">
            <div className="overlay-header">
              <h1>{smr.name}</h1>
              <h1>{smr.manufacturer}</h1>
              <h2>Тепловая мощность: {smr.thermal_power} МВт</h2>
              <h2>Электрическая мощность: {smr.electrical_power} МВт</h2>
            </div>

            <div className="overlay-footer">
              <div className="product-controls">
                <div className="product-action">
                  <button
                    className={`like action-btn${liked ? ' active' : ''}`}
                    onClick={handleLike}
                    aria-pressed={liked}
                    aria-label="Нравится"
                  >
                    <svg width="20" height="18" viewBox="0 0 20 18"
                         xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.252 2.11328C13.0717 0.36256 16.0316 0.36295 17.8516 2.11328H17.8525C19.6678 3.94907 19.6325 6.77901 17.8457 8.63672L17.8438 8.6377L10 16.8418L2.15625 8.6377L2.1543 8.63672L1.99219 8.45996C0.367323 6.60337 0.388131 3.89174 2.14648 2.11328C3.03426 1.21557 4.2187 0.822342 5.44727 0.822266C6.5991 0.822266 7.71161 1.16811 8.57812 1.95117L8.74805 2.11328L9.41992 2.82031L10 3.43164L10.5801 2.82031L11.252 2.11328Z"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </button>
                  <span>{likes}</span>
                </div>

                <div className="product-action">
                  <Link className="next action-btn" to={`/smr/${smr.id}?next=true`}>
                    <svg width="20" height="20" viewBox="0 0 18 18"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3L12 9L2 15V3Z" />
                      <rect x="14" y="3" width="2" height="12" rx="0.5" />
                    </svg>
                  </Link>
                </div>

                <div className="product-action">
                  <button
                    type="button"
                    className="more"
                    onClick={() => setExpanded((v) => !v)}
                  >
                    Еще
                  </button>
                </div>
              </div>

              <div className="product-description">
                <h2>{expanded ? smr.description : shortDescription}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="overlay-header-tilt" />
        <div className="overlay-footer-tilt" />
      </article>
    </Layout>
  );
}
