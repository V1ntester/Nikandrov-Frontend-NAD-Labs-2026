import { proxyMediaUrl } from '../api/mediaUrl';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SmrDetailsControls from '../components/smr/SmrDetailsControl';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchSmrDetails } from '../features/smr/smrThunks';
import { getMockSmr, MOCK_SMRS, MOCK_LIKES, DEFAULT_VIDEO } from '../modules/mock';

export default function SmrDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [search] = useSearchParams();
  const smrId = Number(id);
  const selectNext = search.get('next') === 'true';
  const validId = Number.isSafeInteger(smrId) && smrId > 0;
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);
  const { details, requests } = useAppSelector((state) => state.smrs);
  const request = requests[fetchSmrDetails.typePrefix];
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!validId) return;
    const pending = dispatch(fetchSmrDetails({ id: smrId, selectNext }));
    return () => pending.abort();
  }, [dispatch, validId, smrId, selectNext, authStatus]);

  const useMock = authStatus === 'guest' && request?.readError === 'unavailable';
  const loading = validId && (!request || request.status === 'pending' || request.status === 'idle');
  const failed = validId && request?.status === 'rejected'
    && request.readError !== 'notFound' && !useMock;
  const mock = useMock
    ? (selectNext ? MOCK_SMRS.find((item) => item.id > smrId) ?? MOCK_SMRS[0] : getMockSmr(smrId))
    : undefined;
  const apiSmr = validId && request?.status === 'fulfilled' ? details : null;
  const smr = mock ?? apiSmr;

  if (loading || !smr || failed) {
    return (
      <Layout>
        <article className="cards-block">
          <div className="container" aria-busy={loading}>
            <h2 className="page-title">
              {loading ? 'Загрузка карточки…' : failed ? 'Не удалось загрузить карточку' : 'Реактор не найден'}
            </h2>
          </div>
        </article>
      </Layout>
    );
  }

  const likes = mock ? MOCK_LIKES[mock.id] ?? 0 : apiSmr?.likes_count ?? 0;
  const video = proxyMediaUrl(smr.video_url) || DEFAULT_VIDEO;

  const shortDescription =
    (smr.description ?? '').length > 29
      ? smr.description!.slice(0, 29) + '...'
      : smr.description ?? '';

  return (
    <Layout>
      <article className="product-block">
        <video
          key={video}
          className="product-block-background"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video} type="video/mp4" />
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
                liked={authStatus === 'authenticated' && Boolean(apiSmr?.is_liked)}
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
