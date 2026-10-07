import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const MENU = [
  { label: "Home", to: "/" },
  { label: "Manufacturing", to: "/manufacturing" },
  { label: "Trading", to: "/trading" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // close the mobile menu whenever the page changes
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand" aria-label="Cosmosforge Engineering home">
          <img src="/images/logo.png" alt="" width="44" height="44" />
          <span className="nav__name">
            Cosmosforge
            <small>Engineering</small>
          </span>
        </Link>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>

        <nav id="nav-links" className={`nav__links ${open ? "is-open" : ""}`}>
          {MENU.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => (isActive ? "nav__link nav__link--current" : "nav__link")}
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contact" className="nav__cta">Get a Quote</Link>
        </nav>
      </div>
    </header>
  );
}