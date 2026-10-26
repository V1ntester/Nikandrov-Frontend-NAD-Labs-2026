import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="brand"><Link to="/">НОВАТОМ</Link></div>
      </div>
    </header>
  );
}
