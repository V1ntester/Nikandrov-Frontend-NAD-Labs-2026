import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useAppSelector } from '../../store';

const NAV_LINKS = [
  {
    to: '/smr/1?next=true',
    label: 'Лента'
  },
  {
    to: '/',
    label: 'Добавление'
  },
  {
    to: '/',
    label: 'Плитка'
  },
  ];

export default function Layout({ children }: { children: ReactNode }) {
  const guest = useAppSelector((state) => state.auth.status === 'guest');
  const links = guest ? [...NAV_LINKS, { to: '/login', label: 'Вход' }] : NAV_LINKS;

  return (
    <div className="space">
      <Header />
      <main className="content">{children}</main>
      <Footer links={links} />
    </div>
  );
}
