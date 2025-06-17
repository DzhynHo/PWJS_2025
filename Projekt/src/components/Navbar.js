import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../pages/LanguageContext";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="navbar">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        {t.navbar.home}
      </Link>
      <Link
        to="/favorites"
        className={location.pathname === "/favorites" ? "active" : ""}
      >
        {t.navbar.favorites}
      </Link>
      <Link
        to="/all-songs"
        className={location.pathname === "/all-songs" ? "active" : ""}
      >
        {t.navbar.allSongs}
      </Link>
      <Link
        to="/stats"
        className={location.pathname === "/stats" ? "active" : ""}
      >
        {t.navbar.stats}
      </Link>
      <Link
        to="/settings"
        className={location.pathname === "/settings" ? "active" : ""}
      >
        {t.navbar.settings}
      </Link>
    </nav>
  );
}
