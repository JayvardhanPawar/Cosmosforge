import { Link } from "react-router-dom";
import manufacturing from "../../data/manufacturing.json";
import trading from "../../data/trading.json";

const countTypes = (list) => new Set(list.map((i) => i.category)).size;

/* Photos are optional: public/images/home/manufacturing.jpg and trading.jpg.
   Without them the cards use a dark engineering-grid background. */
const CARDS = [
  {
    key: "manufacturing",
    to: "/manufacturing",
    number: "01",
    eyebrow: "Manufacturing",
    title: "Parts made to your drawing",
    text: "Precision machining, grinding, fabrication and assembly for components, fixtures, moulds and spares.",
    chips: ["CNC turning", "VMC machining", "Fixtures & moulds", "Machine spares"],
    stat: [manufacturing.length, "examples", countTypes(manufacturing), "types of work"],
    cta: "Explore manufacturing",
    image: "/images/home/manufacturing.jpg",
    tone: "teal",
  },
  {
    key: "trading",
    to: "/trading",
    number: "02",
    eyebrow: "Trading",
    title: "Industrial supplies, one supplier",
    text: "Fasteners, cutting tools, abrasives, bearings, pneumatics, hydraulics, safety products and consumables.",
    chips: ["Fasteners", "Cutting tools", "Bearings", "Safety products"],
    stat: [trading.length, "products", countTypes(trading), "categories"],
    cta: "Browse supplies",
    image: "/images/home/trading.jpg",
    tone: "gold",
  },
];

const CSS = `
.bs { position: relative; z-index: 2; margin-top: -3.5rem; padding: 0 0 clamp(2.5rem, 6vw, 4rem); font-family: "Segoe UI", system-ui, sans-serif; }
.bs * { box-sizing: border-box; }
.bs-grid { width: min(1200px, 92%); margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

.bs-card {
  --accent: #0f8f9c;
  position: relative; overflow: hidden; isolation: isolate;
  display: flex; flex-direction: column; min-height: 400px; padding: clamp(1.6rem, 3vw, 2.4rem);
  color: #fff; text-decoration: none; border-radius: 4px;
  border-top: 5px solid var(--accent);
  box-shadow: 0 18px 40px rgba(11, 26, 38, 0.28);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.bs-card--gold { --accent: #d9a440; }
.bs-card:hover { transform: translateY(-6px); box-shadow: 0 26px 50px rgba(11, 26, 38, 0.36); }
.bs-card:focus-visible { outline: 3px solid #d9a440; outline-offset: 4px; }

.bs-bg {
  position: absolute; inset: 0; z-index: -2;
  background:
    linear-gradient(180deg, rgba(11, 26, 38, 0.72) 0%, rgba(11, 26, 38, 0.94) 75%),
    var(--img) center / cover no-repeat,
    linear-gradient(rgba(15, 143, 156, 0.14) 1px, transparent 1px) 0 0 / 30px 30px,
    linear-gradient(90deg, rgba(15, 143, 156, 0.14) 1px, transparent 1px) 0 0 / 30px 30px,
    #0b1a26;
  transition: transform 0.8s ease;
}
.bs-card:hover .bs-bg { transform: scale(1.06); }

.bs-number {
  position: absolute; top: 0.6rem; right: 1.4rem; z-index: -1;
  font-size: clamp(5rem, 11vw, 8rem); font-weight: 900; line-height: 1;
  color: rgba(255, 255, 255, 0.07); letter-spacing: -0.04em;
}
.bs-eyebrow { display: inline-flex; align-items: center; gap: 0.7rem; color: var(--accent); font-weight: 700; font-size: 0.95rem; letter-spacing: 0.05em; }
.bs-eyebrow::before { content: ""; width: 2.2rem; height: 3px; background: var(--accent); }
.bs-title { margin: 0.9rem 0 0; font-size: clamp(1.7rem, 3vw, 2.3rem); font-weight: 800; line-height: 1.12; letter-spacing: -0.01em; color: #fff; max-width: 18ch; }
.bs-text { margin: 1rem 0 0; max-width: 46ch; color: #c5d9df; line-height: 1.6; }

.bs-chips { list-style: none; padding: 0; margin: 1.3rem 0 0; display: flex; flex-wrap: wrap; gap: 0.5rem; }
.bs-chips li { padding: 0.3rem 0.8rem; font-size: 0.85rem; font-weight: 600; color: #e9f4f6; border: 1px solid rgba(255, 255, 255, 0.28); background: rgba(255, 255, 255, 0.07); border-radius: 999px; }

.bs-foot { margin-top: auto; padding-top: 1.8rem; display: flex; align-items: end; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
.bs-stat { display: flex; gap: 1.6rem; }
.bs-stat b { display: block; font-size: 1.9rem; font-weight: 800; line-height: 1; color: #fff; }
.bs-stat span { display: block; margin-top: 0.3rem; font-size: 0.82rem; color: #9fb8c1; }

.bs-cta { display: inline-flex; align-items: center; gap: 0.7rem; font-weight: 700; color: #fff; }
.bs-arrow {
  width: 46px; height: 46px; display: grid; place-items: center; border-radius: 50%;
  background: var(--accent); color: #0b1a26; transition: transform 0.3s ease;
}
.bs-arrow svg { width: 20px; height: 20px; }
.bs-card:hover .bs-arrow { transform: translateX(6px); }

@media (max-width: 860px) {
  .bs { margin-top: -2rem; }
  .bs-grid { grid-template-columns: 1fr; }
  .bs-card { min-height: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .bs-card, .bs-bg, .bs-arrow { transition: none; }
  .bs-card:hover, .bs-card:hover .bs-bg, .bs-card:hover .bs-arrow { transform: none; }
}
`;

export default function BusinessSplit() {
  return (
    <section className="bs" aria-label="What we do">
      <style>{CSS}</style>
      <div className="bs-grid">
        {CARDS.map((c) => (
          <Link key={c.key} to={c.to} className={`bs-card bs-card--${c.tone}`}>
            <div className="bs-bg" style={{ "--img": `url(${c.image})` }} aria-hidden="true" />
            <span className="bs-number" aria-hidden="true">{c.number}</span>

            <span className="bs-eyebrow">{c.eyebrow}</span>
            <h2 className="bs-title">{c.title}</h2>
            <p className="bs-text">{c.text}</p>

            <ul className="bs-chips">
              {c.chips.map((chip) => <li key={chip}>{chip}</li>)}
            </ul>

            <div className="bs-foot">
              <div className="bs-stat">
                <div><b>{c.stat[0]}</b><span>{c.stat[1]}</span></div>
                <div><b>{c.stat[2]}</b><span>{c.stat[3]}</span></div>
              </div>
              <span className="bs-cta">
                {c.cta}
                <span className="bs-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}