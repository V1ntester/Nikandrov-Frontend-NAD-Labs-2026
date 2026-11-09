import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import Layout from '../components/layout/Layout';
import SmrFilter from '../components/smr/SmrFilter';
import SmrCard from '../components/smr/SmrCard';
import { fetchSmrs } from '../features/smr/smrThunks';
import { MOCK_SMRS, MOCK_LIKES } from '../modules/mock';

export default function SmrGridPage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.smrFilters.applied);
  const authStatus = useAppSelector((state) => state.auth.status);
  const { list, requests } = useAppSelector((state) => state.smrs);
  const request = requests[fetchSmrs.typePrefix];

  useEffect(() => {
    const pending = dispatch(fetchSmrs(filters));
    return () => pending.abort();
  }, [dispatch, filters, authStatus]);

  const useMock = authStatus === 'guest' && request?.readError === 'unavailable';
  const loading = !request || request.status === 'pending' || request.status === 'idle';
  const cards = useMock
    ? MOCK_SMRS.filter(({ thermal_power }) =>
        thermal_power != null && thermal_power >= filters.filter_min && thermal_power <= filters.filter_max,
      ).map((smr) => ({ smr, likes: MOCK_LIKES[smr.id] ?? 0 }))
    : list.map((smr) => ({ smr, likes: smr.likes_count }));

  return (
    <Layout>
      <article className="cards-block">
        <div className="container">
          <h2 className="page-title">
            {useMock ? 'МАЛЫЕ МОДУЛЬНЫЕ РЕАКТОРЫ ДЕМО' : 'МАЛЫЕ МОДУЛЬНЫЕ РЕАКТОРЫ'}
          </h2>
          <div className="cards" aria-busy={loading}>
            <SmrFilter />
            {loading ? (
              <p role="status">Загрузка каталога…</p>
            ) : request.status === 'rejected' && !useMock ? (
              <p role="alert">Не удалось загрузить каталог.</p>
            ) : (
              <>
                {cards.length === 0 && <p>Реакторы не найдены.</p>}
                {cards.map(({ smr, likes }) => <SmrCard key={smr.id} smr={smr} likes={likes} />)}
              </>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
}
