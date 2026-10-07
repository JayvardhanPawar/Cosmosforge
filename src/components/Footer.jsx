import { Link } from "react-router-dom";
import manufacturing from "../data/manufacturing.json";
import trading from "../data/trading.json";

const COMPANY = {
  name: "Cosmosforge Engineering",
  tagline: "Engineering Precision. Delivering Excellence.",
  about: "A Pune-based manufacturing partner for precision machined components, fabricated assemblies, industrial spares and custom-engineered solutions.",
  address: ["Plot No. 458, Indrayani Nagar,", "Sector 2, Bhosari,", "Pune – 411026, Maharashtra, India"],
  phone: "+91 9175689186",
  email: "cosmosforge.engineering@gmail.com",
};
const PHONE_TEL = COMPANY.phone.replace(/\s/g, "");
const PHONE_DIGITS = COMPANY.phone.replace(/\D/g, "");

const QUICK_LINKS = [
  ["Home", "/"],
  ["Manufacturing", "/manufacturing"],
  ["Trading", "/trading"],
  ["About Us", "/about"],
  ["Contact", "/contact"],
];

// Live from the JSON files, so new categories appear here on their own.
const MFG_CATEGORIES = [...new Set(manufacturing.map((i) => i.category))];
const TRADE_CATEGORIES = [...new Set(trading.map((i) => i.category))];
const MAX_LINKS = 7;

const ICONS = {
  pin: "M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 7.5a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6z",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  mail: "M3 5h18v14H3zM3 7l9 6 9-6",
  chat: "M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.3A8.4 8.4 0 1 1 21 11.5z",
  up: "M12 19V5M5 12l7-7 7 7",
  arrow: "M5 12h14M13 6l6 6-6 6",
};
const Icon = ({ name }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={ICONS[name]} />
  </svg>
);

const CSS = `
.ft {
  position: relative; overflow: hidden; isolation: isolate; color: #b9cfd6;
  font-family: "Segoe UI", system-ui, sans-serif; line-height: 1.6;
  border-top: 4px solid #0f8f9c;
  background:
    linear-gradient(rgba(15, 143, 156, 0.08) 1px, transparent 1px) 0 0 / 34px 34px,
    linear-gradient(90deg, rgba(15, 143, 156, 0.08) 1px, transparent 1px) 0 0 / 34px 34px,
    #0b1a26;
}
.ft * { box-sizing: border-box; }
.ft-wrap { width: min(1200px, 92%); margin: 0 auto; }
.ft a { color: inherit; text-decoration: none; }
.ft a:focus-visible, .ft button:focus-visible { outline: 3px solid #d9a440; outline-offset: 3px; }

.ft-main { display: grid; grid-template-columns: 1.5fr 0.8fr 1.1fr 1.1fr 1.3fr; gap: clamp(1.5rem, 3vw, 2.6rem); padding: clamp(2.8rem, 6vw, 4.2rem) 0 clamp(2rem, 4vw, 3rem); }

.ft-brand { display: inline-flex; align-items: center; gap: 0.75rem; color: #fff; }
.ft-brand img { border-radius: 6px; }
.ft-brand span { display: flex; flex-direction: column; font-size: 1.3rem; font-weight: 700; line-height: 1.1; }
.ft-brand small { margin-top: 3px; font-size: 0.68rem; font-weight: 600; color: #d9a440; letter-spacing: 0.25em; text-transform: uppercase; }
.ft-about { margin: 1.2rem 0 0; font-size: 0.95rem; max-width: 34ch; }
.ft-tag { margin: 1.1rem 0 0; padding-left: 0.9rem; border-left: 3px solid #d9a440; color: #fff; font-weight: 600; font-size: 0.95rem; }

.ft h3 { margin: 0 0 1.1rem; color: #fff; font-size: 0.95rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
.ft h3::after { content: ""; display: block; width: 2rem; height: 3px; margin-top: 0.55rem; background: #d9a440; }
.ft ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.55rem; }
.ft-links a { display: inline-block; font-size: 0.95rem; transition: color 0.2s, transform 0.2s; }
.ft-links a:hover { color: #d9a440; transform: translateX(4px); }
.ft-more { display: inline-flex !important; align-items: center; gap: 0.4rem; margin-top: 0.2rem; color: #d9a440; font-weight: 700; }
.ft-more svg { width: 15px; height: 15px; }

.ft-contact li { display: flex; gap: 0.75rem; font-size: 0.95rem; }
.ft-contact svg { flex: none; width: 20px; height: 20px; margin-top: 0.2rem; color: #d9a440; }
.ft-contact a { overflow-wrap: anywhere; transition: color 0.2s; }
.ft-contact a:hover { color: #d9a440; }
.ft-contact span { display: block; }
.ft-wa { display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 1.2rem; padding: 0.65rem 1.1rem; background: #1f9d55; color: #fff !important; font-weight: 700; font-size: 0.92rem; border-radius: 3px; transition: background 0.2s, transform 0.2s; }
.ft-wa svg { width: 18px; height: 18px; }
.ft-wa:hover { background: #188045; transform: translateY(-2px); }

.ft-bottom { border-top: 1px solid rgba(159, 211, 218, 0.2); background: rgba(0, 0, 0, 0.22); }
.ft-bottom-in { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem 1.5rem; padding: 1.1rem 0; font-size: 0.88rem; }
.ft-bottom p { margin: 0; }
.ft-top { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: transparent; color: #fff; font: inherit; font-weight: 600; font-size: 0.88rem; border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 3px; cursor: pointer; transition: background 0.2s, color 0.2s, border-color 0.2s; }
.ft-top svg { width: 16px; height: 16px; }
.ft-top:hover { background: #d9a440; color: #0b1a26; border-color: #d9a440; }

@media (max-width: 1050px) {
  .ft-main { grid-template-columns: repeat(3, 1fr); }
  .ft-col-brand { grid-column: 1 / -1; }
  .ft-about { max-width: 60ch; }
}
@media (max-width: 640px) {
  .ft-main { grid-template-columns: 1fr 1fr; }
  .ft-col-contact { grid-column: 1 / -1; }
}
@media (max-width: 420px) { .ft-main { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .ft-links a, .ft-wa, .ft-top { transition: none; } .ft-links a:hover, .ft-wa:hover { transform: none; } }
`;

function LinkList({ items, base, param, allLabel, allTo }) {
  const shown = items.slice(0, MAX_LINKS);
  return (
    <ul className="ft-links">
      {shown.map((c) => (
        <li key={c}><Link to={`${base}?${param}=${encodeURIComponent(c)}`}>{c}</Link></li>
      ))}
      <li>
        <Link to={allTo} className="ft-more">{allLabel} <Icon name="arrow" /></Link>
      </li>
    </ul>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ft">
      <style>{CSS}</style>

      <div className="ft-wrap ft-main">
        {/* brand */}
        <div className="ft-col-brand">
          <Link to="/" className="ft-brand" aria-label={`${COMPANY.name} home`}>
            <img src="/images/logo.png" alt="" width="46" height="46" />
            <span>Cosmosforge<small>Engineering</small></span>
          </Link>
          <p className="ft-about">{COMPANY.about}</p>
          <p className="ft-tag">{COMPANY.tagline}</p>
        </div>

        {/* quick links */}
        <nav aria-label="Footer quick links">
          <h3>Quick links</h3>
          <ul className="ft-links">
            {QUICK_LINKS.map(([label, to]) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </nav>

        {/* manufacturing */}
        <nav aria-label="Manufacturing categories">
          <h3>Manufacturing</h3>
          <LinkList items={MFG_CATEGORIES} base="/manufacturing" param="category" allLabel="View all" allTo="/manufacturing" />
        </nav>

        {/* trading */}
        <nav aria-label="Trading categories">
          <h3>Trading</h3>
          <LinkList items={TRADE_CATEGORIES} base="/trading" param="category" allLabel="View all" allTo="/trading" />
        </nav>

        {/* contact */}
        <div className="ft-col-contact">
          <h3>Contact</h3>
          <ul className="ft-contact">
            <li>
              <Icon name="pin" />
              <span>{COMPANY.address.map((l) => <span key={l}>{l}</span>)}</span>
            </li>
            <li>
              <Icon name="phone" />
              <a href={`tel:${PHONE_TEL}`}>{COMPANY.phone}</a>
            </li>
            <li>
              <Icon name="mail" />
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </li>
          </ul>
          <a
            className="ft-wa"
            href={`https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent("Hello Cosmosforge Engineering, I would like to make an enquiry.")}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="chat" /> Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="ft-bottom">
        <div className="ft-wrap ft-bottom-in">
          <p>© {year} {COMPANY.name}. All rights reserved.</p>
          <p>Precision Engineering &amp; Manufacturing | Pune, Maharashtra</p>
          <button type="button" className="ft-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Icon name="up" /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}