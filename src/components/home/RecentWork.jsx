import { useState } from "react";
import { Link } from "react-router-dom";
import items from "../../data/manufacturing.json";

/* Which types of work to show on the home page, in this order.
   One item is shown per type: the first one in manufacturing.json,
   or the one marked  "featured": true  if you add that to an item. */
const FEATURED_CATEGORIES = [
  "Die Casting Spares",
  "Precision Turning & Assembly",
  "Fixtures",
  "Mould Development",
  "Surgical Trolley",
  "Drift Machine",
];

const pick = (category) => {
  const inCategory = items.filter((i) => i.category === category);
  return inCategory.find((i) => i.featured) || inCategory[0];
};

const CSS = `
.rw { padding: clamp(3rem, 7vw, 5rem) 0; font-family: "Segoe UI", system-ui, sans-serif; color: #22333f; }
.rw * { box-sizing: border-box; }
.rw-wrap { width: min(1200px, 92%); margin: 0 auto; }
.rw h2 { margin: 0; color: #0b1a26; font-size: clamp(1.6rem, 3.2vw, 2.4rem); font-weight: 700; line-height: 1.15; }
.rw-intro { margin: 0.8rem 0 0; max-width: 60ch; font-size: 1.05rem; }
.rw-grid { list-style: none; padding: 0; margin: 2rem 0 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
.rw-card { background: #fff; border: 1px solid #d5e0e4; transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; }
.rw-card:hover { border-color: #0f8f9c; box-shadow: 0 10px 22px rgba(11, 26, 38, 0.12); transform: translateY(-3px); }
.rw-link { display: block; color: inherit; text-decoration: none; }
.rw-link:focus-visible { outline: 3px solid #d9a440; outline-offset: 2px; }
.rw-img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; background: #13293a; }
.rw-img--empty {
  display: grid; place-items: center;
  background: repeating-linear-gradient(45deg, #13293a, #13293a 10px, #0b1a26 10px, #0b1a26 20px);
}
.rw-img--empty span { font-size: 2.6rem; font-weight: 800; color: #d9a440; }
.rw-cap { padding: 0.85rem 1rem 1rem; border-top: 3px solid #d9a440; }
.rw-cat { display: block; font-size: 0.78rem; font-weight: 700; color: #0a6a74; }
.rw-name { display: block; margin-top: 0.15rem; font-weight: 700; color: #0b1a26; line-height: 1.3; }
.rw-more { display: inline-block; margin-top: 1.5rem; font-weight: 700; color: #0a6a74; }
@media (max-width: 860px) { .rw-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .rw-grid { grid-template-columns: 1fr; } }
`;

function Photo({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className="rw-img rw-img--empty" role="img" aria-label={alt}>
        <span>{alt.charAt(0)}</span>
      </div>
    );
  }
  return <img className="rw-img" src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}

export default function RecentWork() {
  const shown = FEATURED_CATEGORIES.map(pick).filter(Boolean);
  if (shown.length === 0) return null;

  return (
    <section className="rw">
      <style>{CSS}</style>
      <div className="rw-wrap">
        <h2>Our Manufacturing</h2>
        <p className="rw-intro">A selection of parts, fixtures and machines we have made to customer drawings and samples.</p>

        <ul className="rw-grid">
          {shown.map((item) => (
            <li key={item.id} className="rw-card">
              <Link to={`/manufacturing/${item.id}`} className="rw-link">
                <Photo src={item.image} alt={item.name} />
                <span className="rw-cap">
                  <span className="rw-cat">{item.category}</span>
                  <span className="rw-name">{item.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/manufacturing" className="rw-more">
          View all {items.length} manufacturing examples
        </Link>
      </div>
    </section>
  );
}