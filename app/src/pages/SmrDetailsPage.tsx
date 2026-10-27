import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SmrDetailsControls from '../components/smr/SmrDetailsControl';
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
              <SmrDetailsControls
                likes={likes}
                liked={liked}
                onLike={handleLike}
                nextTo={`/smr/${smr.id}?next=true`}
                onMore={() => setExpanded((v) => !v)}
              />

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
