import { useState } from 'react';
import Layout from '../components/layout/Layout'
import SmrFilter from '../components/smr/SmrFilter';
import SmrCard from '../components/smr/SmrCard';
import type { Smr } from '../types/smr'
import { MOCK_SMRS, MOCK_LIKES } from '../modules/mock';

export default function SmrGridPage() {
  const [smrs] = useState<Smr[]>(MOCK_SMRS);
  const [likesMap] = useState<Record<number, number>>(MOCK_LIKES);

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
                        likes={likesMap[smr.id] ?? 0}
                    />
                    ))}
                    </div>
                </div>
            </article>
        </Layout>
    )
}
