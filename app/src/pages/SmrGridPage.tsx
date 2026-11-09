import { useAppSelector } from '../store';
import Layout from '../components/layout/Layout'
import SmrFilter from '../components/smr/SmrFilter';
import SmrCard from '../components/smr/SmrCard';
import { MOCK_SMRS, MOCK_LIKES } from '../modules/mock';

export default function SmrGridPage() {
  const { filter_min, filter_max } = useAppSelector((state) => state.smrFilters.applied);
  const smrs = MOCK_SMRS.filter(({ thermal_power }) =>
    thermal_power !== undefined && thermal_power >= filter_min && thermal_power <= filter_max,
  );

    return (
        <Layout>
            <article className="cards-block">
                <div className="container">
                    <h2 className="page-title">МАЛЫЕ МОДУЛЬНЫЕ РЕАКТОРЫ</h2>
                    <div className="cards">

                    <SmrFilter/>

                    {smrs.map((smr) => (
                    <SmrCard
                        key={smr.id}
                        smr={smr}
                        likes={MOCK_LIKES[smr.id] ?? 0}
                    />
                    ))}
                    </div>
                </div>
            </article>
        </Layout>
    )
}
