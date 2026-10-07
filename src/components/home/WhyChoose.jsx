import { Link } from "react-router-dom";

const WHY = [
  {
    title: "Made to your drawing or sample",
    text: "Send us either. We work from what you have.",
    icon: "M6 2h9l5 5v15H6zM14 2v6h6M9 13h6M9 17h6",
  },
  {
    title: "Small batches or large volumes",
    text: "Flexible production to suit the project.",
    icon: "M12 2l9 5-9 5-9-5zM3 12l9 5 9-5M3 17l9 5 9-5",
  },
  {
    title: "Measured at every stage",
    text: "Checked with calibrated instruments, with certified raw material.",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  },
  {
    title: "Quick quotes, direct answers",
    text: "You talk to the people who run the machines.",
    icon: "M4 4h16v12H9l-5 4z",
  },
  {
    title: "Delivered on the date promised",
    text: "Planning and inventory built around your schedule.",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  },
  {
    title: "One supplier for parts and supplies",
    text: "Buy tools, fasteners and consumables from the same place.",
    icon: "M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10",
  },
];

const CSS = `
.wy { padding: clamp(3rem, 7vw, 5.5rem) 0; background: #fff; font-family: "Segoe UI", system-ui, sans-serif; color: #22333f; }
.wy * { box-sizing: border-box; }
.wy-wrap { width: min(1200px, 92%); margin: 0 auto; display: grid; grid-template-columns: 0.85fr 1.5fr; gap: clamp(2rem, 5vw, 4.5rem); align-items: start; }

/* left column */
.wy-side { position: sticky; top: 100px; }
.wy-kicker { display: inline-flex; align-items: center; gap: 0.7rem; margin: 0 0 0.9rem; color: #0a6a74; font-weight: 700; font-size: 0.92rem; letter-spacing: 0.05em; }
.wy-kicker::before { content: ""; width: 2.2rem; height: 3px; background: #d9a440; }
.wy h2 { margin: 0; color: #0b1a26; font-size: clamp(1.9rem, 3.8vw, 2.9rem); font-weight: 800; line-height: 1.08; letter-spacing: -0.01em; }
.wy h2 em { font-style: normal; color: #0f8f9c; }
.wy-intro { margin: 1.1rem 0 0; font-size: 1.05rem; line-height: 1.65; max-width: 40ch; }
.wy-actions { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1.8rem; }
.wy-btn { display: inline-block; padding: 0.8rem 1.4rem; font-weight: 700; text-decoration: none; border-radius: 3px; border: 2px solid transparent; transition: background 0.2s, color 0.2s, transform 0.2s; }
.wy-btn:hover { transform: translateY(-2px); }
.wy-btn--gold { background: #d9a440; color: #0b1a26; }
.wy-btn--gold:hover { background: #e8b652; }
.wy-btn--line { border-color: #0b1a26; color: #0b1a26; }
.wy-btn--line:hover { background: #0b1a26; color: #fff; }
.wy-btn:focus-visible { outline: 3px solid #d9a440; outline-offset: 3px; }

/* right grid */
.wy-grid { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.2rem; counter-reset: wy; }
.wy-item {
  counter-increment: wy; position: relative; overflow: hidden;
  padding: 1.6rem 1.5rem 1.5rem; background: #f4f8f9; border: 1px solid #d5e0e4; border-radius: 4px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;
}
.wy-item::after {
  content: "0" counter(wy); position: absolute; top: 0.6rem; right: 1rem;
  font-size: 3rem; font-weight: 900; line-height: 1; color: rgba(11, 26, 38, 0.06); transition: color 0.25s;
}
.wy-item:hover { transform: translateY(-4px); background: #0b1a26; border-color: #0b1a26; box-shadow: 0 16px 32px rgba(11, 26, 38, 0.2); }
.wy-item:hover::after { color: rgba(255, 255, 255, 0.08); }

.wy-icon { width: 50px; height: 50px; display: grid; place-items: center; border-radius: 4px; background: #fff; color: #0f8f9c; border: 1px solid #d5e0e4; transition: background 0.25s, color 0.25s, border-color 0.25s; }
.wy-icon svg { width: 26px; height: 26px; }
.wy-item:hover .wy-icon { background: #d9a440; color: #0b1a26; border-color: #d9a440; }
.wy-title { margin: 1.1rem 0 0; font-size: 1.1rem; font-weight: 700; line-height: 1.25; color: #0b1a26; transition: color 0.25s; }
.wy-text { margin: 0.5rem 0 0; font-size: 0.95rem; line-height: 1.55; transition: color 0.25s; }
.wy-item:hover .wy-title { color: #fff; }
.wy-item:hover .wy-text { color: #b9cfd6; }

@media (max-width: 900px) {
  .wy-wrap { grid-template-columns: 1fr; }
  .wy-side { position: static; }
  .wy-intro { max-width: 60ch; }
}
@media (max-width: 560px) { .wy-grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) {
  .wy-item, .wy-btn, .wy-icon { transition: none; }
  .wy-item:hover, .wy-btn:hover { transform: none; }
}
`;

export default function WhyChoose() {
  return (
    <section className="wy" aria-labelledby="wy-title">
      <style>{CSS}</style>
      <div className="wy-wrap">
        <div className="wy-side">
          <p className="wy-kicker">Why Cosmosforge</p>
          <h2 id="wy-title">Why customers <em>choose</em> Cosmosforge</h2>
          <p className="wy-intro">
            We keep it simple: work from your drawing, tell you honestly what it takes, and deliver
            what we promised.
          </p>
          <div className="wy-actions">
            <Link to="/contact" className="wy-btn wy-btn--gold">Request a quote</Link>
            <a href="tel:+919175689186" className="wy-btn wy-btn--line">Call us</a>
          </div>
        </div>

        <ul className="wy-grid">
          {WHY.map((w) => (
            <li key={w.title} className="wy-item">
              <span className="wy-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d={w.icon} />
                </svg>
              </span>
              <h3 className="wy-title">{w.title}</h3>
              <p className="wy-text">{w.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}