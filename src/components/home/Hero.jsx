import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HOLES = [0, 60, 120, 180, 240, 300];
const INTERVAL = 4000; // milliseconds between slides

// Photos go in public/images/hero/. If a photo is missing, the slide still looks fine.
const SLIDES = [
  {
    label: "Made to your drawing",
    title: "From drawing to dependable part.",
    text: "Cosmosforge Engineering is a Pune-based manufacturing partner for precision machined components, fabricated assemblies, industrial spares and custom-engineered solutions.",
    tags: ["Precision machining", "Assemblies", "Industrial spares"],
    image: "/images/hero/hero-1.jpg",
    primary: { to: "/contact", text: "Request a quote" },
    secondary: { to: "/manufacturing", text: "See what we make" },
  },
  {
    label: "Machining",
    title: "Turning, milling and grinding under one roof.",
    text: "CNC turning, VMC machining, surface and cylindrical grinding, threading and splining, finished to the tolerance on your drawing.",
    tags: ["CNC turning", "VMC machining", "Grinding"],
    image: "/images/hero/hero-2.jpg",
    primary: { to: "/manufacturing", text: "Explore manufacturing" },
    secondary: { to: "/contact", text: "Send your drawing" },
  },
  {
    label: "Fixtures & moulds",
    title: "Fixtures, moulds and gauges built for repeatability.",
    text: "Jigs, fixtures, mould components and relation gauges that cut set-up time and keep every part the same.",
    tags: ["Jigs & fixtures", "Mould development", "Gauging"],
    image: "/images/hero/hero-3.jpg",
    primary: { to: "/manufacturing?category=Fixtures", text: "View fixtures" },
    secondary: { to: "/contact", text: "Discuss your project" },
  },
  {
    label: "Industrial supplies",
    title: "Tools, fasteners and consumables from one supplier.",
    text: "Cutting tools, bearings, abrasives, pneumatics, hydraulics, safety products and more, with help choosing the right product.",
    tags: ["Cutting tools", "Bearings", "Pneumatics & hydraulics"],
    image: "/images/hero/hero-4.jpg",
    primary: { to: "/trading", text: "Browse supplies" },
    secondary: { to: "/contact", text: "Ask for a quote" },
  },
];

const CSS = `
.hs {
  --ink: #0b1a26;
  --teal: #0f8f9c;
  --gold: #d9a440;
  position: relative;
  overflow: hidden;
  min-height: clamp(520px, 80vh, 720px);
  display: flex;
  align-items: center;
  background: var(--ink);
  color: #fff;
  font-family: "Segoe UI", system-ui, sans-serif;
  isolation: isolate;
}
.hs * { box-sizing: border-box; }
.hs :focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }

.hs-bg {
  position: absolute; inset: 0; z-index: -3;
  background:
    linear-gradient(100deg, rgba(11, 26, 38, 0.96) 0%, rgba(11, 26, 38, 0.82) 45%, rgba(11, 26, 38, 0.45) 100%),
    var(--img) center / cover no-repeat,
    var(--ink);
  opacity: 0;
  transform: scale(1.06);
  transition: opacity 0.9s ease, transform 7s ease-out;
}
.hs-bg.is-active { opacity: 1; transform: scale(1); }
.hs-grid {
  position: absolute; inset: 0; z-index: -2; pointer-events: none;
  background:
    linear-gradient(rgba(15, 143, 156, 0.13) 1px, transparent 1px) 0 0 / 32px 32px,
    linear-gradient(90deg, rgba(15, 143, 156, 0.13) 1px, transparent 1px) 0 0 / 32px 32px;
  mask-image: linear-gradient(90deg, transparent 0%, #000 60%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 60%);
}

.hs-inner {
  width: min(1200px, 92%); margin: 0 auto;
  display: grid; grid-template-columns: 1.25fr 1fr; align-items: center; gap: 2rem;
  padding: 3.5rem 0;
}
.hs-slide {
  grid-column: 1; grid-row: 1;
  visibility: hidden; opacity: 0; transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease, visibility 0s 0.6s;
}
.hs-slide.is-active { visibility: visible; opacity: 1; transform: none; transition-delay: 0.25s, 0.25s, 0s; }

.hs-kicker {
  display: inline-flex; align-items: center; gap: 0.8rem; margin: 0 0 1.1rem;
  color: var(--gold); font-weight: 700; font-size: 0.95rem; letter-spacing: 0.04em;
}
.hs-kicker::before { content: ""; width: 2.6rem; height: 3px; background: var(--gold); }
.hs-title {
  margin: 0; color: #fff; font-weight: 800; letter-spacing: -0.015em; line-height: 1.05;
  font-size: clamp(2.3rem, 5.6vw, 4.3rem); max-width: 17ch;
}
.hs-text { margin: 1.4rem 0 0; max-width: 54ch; color: #c5d9df; font-size: clamp(1rem, 1.6vw, 1.2rem); line-height: 1.65; }
.hs-tags { list-style: none; padding: 0; margin: 1.5rem 0 0; display: flex; flex-wrap: wrap; gap: 0.6rem; }
.hs-tags li {
  padding: 0.35rem 0.9rem; font-size: 0.88rem; font-weight: 600; color: #e9f4f6;
  border: 1px solid rgba(159, 211, 218, 0.4); background: rgba(15, 143, 156, 0.18); border-radius: 999px;
}
.hs-cta { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; }
.hs-btn {
  display: inline-block; padding: 0.9rem 1.7rem; font-weight: 700; font-size: 1rem; text-decoration: none;
  border-radius: 3px; border: 2px solid transparent; transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.hs-btn:hover { transform: translateY(-2px); }
.hs-btn--gold { background: var(--gold); color: var(--ink); }
.hs-btn--gold:hover { background: #e8b652; }
.hs-btn--line { border-color: rgba(255, 255, 255, 0.5); color: #fff; }
.hs-btn--line:hover { border-color: var(--gold); }

.hs-drawing { grid-column: 2; grid-row: 1; margin: 0; }
.hs-drawing svg { width: 100%; max-width: 400px; margin: 0 auto; display: block; filter: drop-shadow(0 0 18px rgba(15, 143, 156, 0.35)); }
.hs-drawing circle { fill: none; stroke: var(--teal); stroke-width: 1.5; }
.hs-drawing .dim { fill: none; stroke: var(--gold); stroke-width: 1; }
.hs-drawing text { fill: var(--gold); font-size: 12px; }
.hs-spin { transform-box: view-box; transform-origin: 160px 150px; animation: hs-rotate 40s linear infinite; }
@keyframes hs-rotate { to { transform: rotate(360deg); } }

@media (max-width: 900px) {
  .hs { min-height: 560px; }
  .hs-inner { grid-template-columns: 1fr; }
  .hs-drawing { display: none; }
  .hs-bg { background:
    linear-gradient(rgba(11, 26, 38, 0.9), rgba(11, 26, 38, 0.82)),
    var(--img) center / cover no-repeat, var(--ink); }
}
@media (prefers-reduced-motion: reduce) {
  .hs-bg, .hs-slide { transform: none; }
  .hs-spin { animation: none; }
}
`;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);

  // auto slide: moves to the next slide every INTERVAL milliseconds, and loops
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // swipe on touch screens
  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) {
      setIndex((i) => (i + (dx < 0 ? 1 : -1) + SLIDES.length) % SLIDES.length);
    }
    touchX.current = null;
  };

  return (
    <section
      className="hs"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured services"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{CSS}</style>

      {SLIDES.map((s, i) => (
        <div
          key={s.label}
          className={`hs-bg ${i === index ? "is-active" : ""}`}
          style={{ "--img": `url(${s.image})` }}
          aria-hidden="true"
        />
      ))}
      <div className="hs-grid" aria-hidden="true" />

      <div className="hs-inner">
        {SLIDES.map((s, i) => (
          <div
            key={s.label}
            className={`hs-slide ${i === index ? "is-active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}: ${s.label}`}
            aria-hidden={i !== index}
          >
            <p className="hs-kicker">{s.label}</p>
            <h1 className="hs-title">{s.title}</h1>
            <p className="hs-text">{s.text}</p>
            <ul className="hs-tags">
              {s.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <div className="hs-cta">
              <Link to={s.primary.to} tabIndex={i === index ? 0 : -1} className="hs-btn hs-btn--gold">
                {s.primary.text}
              </Link>
              <Link to={s.secondary.to} tabIndex={i === index ? 0 : -1} className="hs-btn hs-btn--line">
                {s.secondary.text}
              </Link>
            </div>
          </div>
        ))}

        <figure className="hs-drawing" aria-hidden="true">
          <svg viewBox="0 0 320 330">
            <circle cx="160" cy="150" r="120" />
            <circle cx="160" cy="150" r="70" />
            <circle cx="160" cy="150" r="26" />
            <g className="hs-spin">
              {HOLES.map((a) => (
                <circle
                  key={a}
                  cx={160 + 95 * Math.cos((a * Math.PI) / 180)}
                  cy={150 + 95 * Math.sin((a * Math.PI) / 180)}
                  r="9"
                />
              ))}
            </g>
            <path className="dim" d="M40 290h240M40 282v16M280 282v16M300 30v240M292 30h16M292 270h16" />
            <text x="160" y="316" textAnchor="middle">Ø 240</text>
          </svg>
        </figure>
      </div>
    </section>
  );
}