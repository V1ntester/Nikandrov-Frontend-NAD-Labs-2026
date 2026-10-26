import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

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
    {
    to: '/',
    label: 'Вход'
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="space">
      <Header />
      <main className="content">{children}</main>
      <Footer links={NAV_LINKS} />
    </div>
  );
}
