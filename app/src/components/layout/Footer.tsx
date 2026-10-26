import { Link } from 'react-router-dom';

type NavLink = {
  to: string;
  label: string;
};

export default function Footer({ links = [] }: { links?: NavLink[] }) {
  return (
    <footer className="footer">
      <div className="container">
        <nav className="navigation">
          {links.map(({ to, label }) => (
            <Link key={to} to={to}>{label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
