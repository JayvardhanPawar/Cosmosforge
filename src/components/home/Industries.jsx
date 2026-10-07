import { Link } from "react-router-dom";

/* "text" is based on work shown in your company profile.
   Each card links to matching examples on the Manufacturing page. */
const INDUSTRIES = [
  {
    name: "Pharmaceutical",
    text: "Precision mount plates and machine parts for pharmaceutical equipment.",
    to: "/manufacturing?q=pharma",
    cta: "See examples",
    icon: "M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7zM8.5 8.5l7 7",
  },
  {
    name: "Robotics & automation",
    text: "Fabricated and machined dolly plates for robotic weld fixtures.",
    to: "/manufacturing?q=robotics",
    cta: "See examples",
    icon: "M5 8h14v11H5zM12 8V4M9 13h.01M15 13h.01M9 16.5h6",
  },
  {
    name: "Packaging",
    text: "Durable components and spares for packaging machinery.",
    to: "/contact",
    cta: "Discuss your part",
    icon: "M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10",
  },
  {
    name: "Automotive",
    text: "Pistons, connecting rods and other engine and machine components.",
    to: "/manufacturing?category=Component%20Development",
    cta: "See examples",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM12 3v6.5M4.2 16.5l6-3.5M19.8 16.5l-6-3.5",
  },
  {
    name: "Medical equipment",
    text: "Ergonomic surgical trolleys built for stability in clinical use.",
    to: "/manufacturing?category=Surgical%20Trolley",
    cta: "See examples",
    icon: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6z",
  },
  {
    name: "Die casting",
    text: "Die casting spares and precision machining of cast parts.",
    to: "/manufacturing?category=Die%20Casting%20Spares",
    cta: "See examples",
    icon: "M4 8h16v12H4zM7 8V4h10v4M12 12v4",
  },
  {
    name: "General engineering",
    text: "Shafts, flanges, bushes, brackets and turned parts made to drawing.",
    to: "/manufacturing?category=Labour%20Work",
    cta: "See examples",
    icon: "M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
  },
];

const CSS = `
.ind {
  position: relative; overflow: hidden; isolation: isolate;
  padding: clamp(3rem, 7vw, 5.5rem) 0; color: #c5d9df;
  font-family: "Segoe UI", system-ui, sans-serif;
  background:
    linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px) 0 0 / 34px 34px,
    linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px) 0 0 / 34px 34px,
    radial-gradient(circle at 85% 0%, rgba(217, 164, 64, 0.22), transparent 45%),
    linear-gradient(135deg, #0a6a74 0%, #0b3a4a 55%, #0b1a26 100%);
}
.ind * { box-sizing: border-box; }
.ind-wrap { width: min(1200px, 92%); margin: 0 auto; }

.ind-kicker { display: inline-flex; align-items: center; gap: 0.7rem; margin: 0 0 0.9rem; color: #d9a440; font-weight: 700; font-size: 0.92rem; letter-spacing: 0.05em; }
.ind-kicker::before { content: ""; width: 2.2rem; height: 3px; background: #d9a440; }
.ind h2 { margin: 0; color: #fff; font-size: clamp(1.8rem, 3.6vw, 2.7rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.01em; }
.ind-intro { margin: 1rem 0 0; color: #cfe3e8; max-width: 58ch; font-size: 1.05rem; line-height: 1.6; }

.ind-grid { list-style: none; padding: 0; margin: 2.5rem 0 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; }
.ind-item { display: flex; }

.ind-card {
  position: relative; overflow: hidden; display: flex; flex-direction: column; width: 100%; min-height: 250px;
  padding: 1.5rem 1.4rem 1.3rem; color: #22333f; text-decoration: none;
  background: #fff; border: 1px solid transparent; border-radius: 4px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.ind-card::before {
  content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: #d9a440;
  transform: scaleY(0); transform-origin: top; transition: transform 0.3s ease;
}
.ind-card:hover, .ind-card:focus-visible { transform: translateY(-5px); border-color: #d9a440; box-shadow: 0 18px 36px rgba(0, 0, 0, 0.35); background: #fff; }
.ind-card:hover::before, .ind-card:focus-visible::before { transform: scaleY(1); }
.ind-card:focus-visible { outline: 3px solid #d9a440; outline-offset: 3px; }

.ind-icon {
  width: 58px; height: 58px; display: grid; place-items: center; border-radius: 50%;
  background: #0b1a26; color: #d9a440; transition: background 0.25s, color 0.25s, transform 0.3s;
}
.ind-icon svg { width: 27px; height: 27px; }
.ind-card:hover .ind-icon { background: #0f8f9c; color: #fff; transform: rotate(-8deg) scale(1.06); }

.ind-name { margin: 1.2rem 0 0; font-size: 1.15rem; font-weight: 700; color: #0b1a26; line-height: 1.25; }
.ind-text { margin: 0.5rem 0 0; font-size: 0.93rem; line-height: 1.55; }
.ind-go { margin-top: auto; padding-top: 1.1rem; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; font-weight: 700; color: #0a6a74; transition: gap 0.25s; }
.ind-go svg { width: 16px; height: 16px; }
.ind-card:hover .ind-go { gap: 0.85rem; }

/* last card: invitation */
.ind-card--cta { background: #d9a440; border-color: #d9a440; color: #0b1a26; justify-content: center; }
.ind-card--cta .ind-name { color: #0b1a26; margin-top: 0; font-size: 1.35rem; }
.ind-card--cta .ind-text { color: #33280c; }
.ind-card--cta .ind-go { color: #0b1a26; }
.ind-card--cta:hover { background: #e8b652; border-color: #fff; }

@media (max-width: 1000px) { .ind-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .ind-grid { grid-template-columns: 1fr; } .ind-card { min-height: 0; } }
@media (prefers-reduced-motion: reduce) {
  .ind-card, .ind-card::before, .ind-icon, .ind-go { transition: none; }
  .ind-card:hover, .ind-card:hover .ind-icon { transform: none; }
}
`;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Industries() {
  return (
    <section className="ind" aria-labelledby="ind-title">
      <style>{CSS}</style>
      <div className="ind-wrap">
        <p className="ind-kicker">Who we serve</p>
        <h2 id="ind-title">Industries we work with</h2>
        <p className="ind-intro">
          Different industries, the same demand: parts that fit, last and arrive on time.
        </p>

        <ul className="ind-grid">
          {INDUSTRIES.map((i) => (
            <li key={i.name} className="ind-item">
              <Link to={i.to} className="ind-card">
                <span className="ind-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={i.icon} />
                  </svg>
                </span>
                <h3 className="ind-name">{i.name}</h3>
                <p className="ind-text">{i.text}</p>
                <span className="ind-go">{i.cta} <Arrow /></span>
              </Link>
            </li>
          ))}

          <li className="ind-item">
            <Link to="/contact" className="ind-card ind-card--cta">
              <h3 className="ind-name">Your industry not listed?</h3>
              <p className="ind-text">If it can be drawn, we can probably make it. Send us your requirement.</p>
              <span className="ind-go">Talk to us <Arrow /></span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}