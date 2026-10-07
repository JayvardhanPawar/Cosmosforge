import { Link } from "react-router-dom";

/* Each card links to the matching part of the Manufacturing page.
   Change "to" if you want a card to open somewhere else. */
const SERVICES = [
  {
    title: "Precision machined components",
    text: "High-accuracy CNC parts with tight tolerances.",
    to: "/manufacturing?category=Component%20Development",
    icon: "M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
  },
  {
    title: "Industrial machine parts",
    text: "Critical components for industrial machinery.",
    to: "/manufacturing?category=Machine%20Spares",
    icon: "M3 21V11l6 4v-4l6 4V5h4v16zM8 18h2M13 18h2",
  },
  {
    title: "Tool room components",
    text: "Dies, moulds, tooling and precision tool room parts.",
    to: "/manufacturing?category=Mould%20Development",
    icon: "M3 4h18v16H3zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM6.5 7.5h.01M17.5 7.5h.01M6.5 16.5h.01M17.5 16.5h.01",
  },
  {
    title: "Fabricated assemblies",
    text: "Assemblies built to your requirements.",
    to: "/manufacturing?process=Fabrication%20%26%20Welding",
    icon: "M3 3h10v10H3zM11 11h10v10H11z",
  },
  {
    title: "Jigs & fixtures",
    text: "Jigs, fixtures and checking devices, designed and made in-house.",
    to: "/manufacturing?category=Fixtures",
    icon: "M4 21h16M6 21V10h12v11M9 10V4h6v6M12 13v5",
  },
  {
    title: "Machine spares",
    text: "Replacement parts that keep production running.",
    to: "/manufacturing?category=Machine%20Spares",
    icon: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z",
  },
  {
    title: "Packaging machine components",
    text: "Precise, durable parts for packaging machinery.",
    to: "/manufacturing",
    icon: "M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10",
  },
  {
    title: "Reverse engineering",
    text: "Legacy or discontinued parts rebuilt from samples.",
    to: "/manufacturing?process=Reverse%20Engineering",
    icon: "M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3M18 3v4h-4M6 21v-4h4",
  },
];

const CSS = `
.sv { padding: clamp(3rem, 7vw, 5.5rem) 0; background: #f4f8f9; font-family: "Segoe UI", system-ui, sans-serif; color: #22333f; }
.sv * { box-sizing: border-box; }
.sv-wrap { width: min(1200px, 92%); margin: 0 auto; }

.sv-head { display: flex; justify-content: space-between; align-items: end; gap: 1.5rem; flex-wrap: wrap; }
.sv-kicker { display: inline-flex; align-items: center; gap: 0.7rem; margin: 0 0 0.8rem; color: #0a6a74; font-weight: 700; font-size: 0.92rem; letter-spacing: 0.05em; }
.sv-kicker::before { content: ""; width: 2.2rem; height: 3px; background: #d9a440; }
.sv h2 { margin: 0; color: #0b1a26; font-size: clamp(1.8rem, 3.6vw, 2.7rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.01em; }
.sv-intro { margin: 1rem 0 0; max-width: 56ch; font-size: 1.05rem; }
.sv-all { font-weight: 700; color: #0b1a26; text-decoration: none; padding: 0.7rem 1.3rem; border: 2px solid #0b1a26; border-radius: 3px; transition: background 0.2s, color 0.2s; }
.sv-all:hover { background: #0b1a26; color: #fff; }

.sv-grid { list-style: none; padding: 0; margin: 2.5rem 0 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; counter-reset: sv; }
.sv-item { counter-increment: sv; display: flex; }

.sv-card {
  position: relative; overflow: hidden; display: flex; flex-direction: column; width: 100%;
  padding: 1.6rem 1.4rem 1.4rem; color: inherit; text-decoration: none;
  background: #fff; border: 1px solid #d5e0e4; border-bottom: 4px solid #0f8f9c; border-radius: 4px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;
}
.sv-card::after {
  content: "0" counter(sv); position: absolute; top: 0.9rem; right: 1.1rem;
  font-size: 0.95rem; font-weight: 800; color: #c3d2d8; transition: color 0.25s;
}
.sv-card:hover, .sv-card:focus-visible {
  transform: translateY(-6px); background: #0b1a26; border-color: #0b1a26; border-bottom-color: #d9a440;
  box-shadow: 0 18px 36px rgba(11, 26, 38, 0.22);
}
.sv-card:focus-visible { outline: 3px solid #d9a440; outline-offset: 3px; }
.sv-card:hover::after { color: #3b5566; }

.sv-icon {
  width: 54px; height: 54px; display: grid; place-items: center; border-radius: 4px;
  background: #0b1a26; color: #d9a440; transition: background 0.25s, color 0.25s;
}
.sv-icon svg { width: 28px; height: 28px; }
.sv-card:hover .sv-icon { background: #0f8f9c; color: #fff; }

.sv-title { margin: 1.3rem 0 0; font-size: 1.12rem; font-weight: 700; line-height: 1.25; color: #0b1a26; transition: color 0.25s; }
.sv-text { margin: 0.6rem 0 0; font-size: 0.95rem; line-height: 1.55; transition: color 0.25s; }
.sv-card:hover .sv-title { color: #fff; }
.sv-card:hover .sv-text { color: #b9cfd6; }

.sv-more {
  margin-top: auto; padding-top: 1.3rem; display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.9rem; font-weight: 700; color: #0a6a74; transition: color 0.25s, gap 0.25s;
}
.sv-more svg { width: 16px; height: 16px; }
.sv-card:hover .sv-more { color: #d9a440; gap: 0.8rem; }

@media (max-width: 1000px) { .sv-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .sv-grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .sv-card, .sv-icon, .sv-more { transition: none; } .sv-card:hover { transform: none; } }
`;

export default function Services() {
  return (
    <section className="sv" aria-labelledby="sv-title">
      <style>{CSS}</style>
      <div className="sv-wrap">
        <div className="sv-head">
          <div>
            <p className="sv-kicker">What we do</p>
            <h2 id="sv-title">What we make</h2>
            <p className="sv-intro">
              From a single machined part to a full assembly, for industries that cannot afford loose tolerances.
            </p>
          </div>
          <Link to="/manufacturing" className="sv-all">See all manufacturing</Link>
        </div>

        <ul className="sv-grid">
          {SERVICES.map((s) => (
            <li key={s.title} className="sv-item">
              <Link to={s.to} className="sv-card">
                <span className="sv-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.icon} />
                  </svg>
                </span>
                <h3 className="sv-title">{s.title}</h3>
                <p className="sv-text">{s.text}</p>
                <span className="sv-more">
                  See examples
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}