// All Home page styles live here (no separate .css file).
// Rendered once by Home.jsx as a <style> tag.
const css = `
.home {
  --ink: #0b1a26;
  --ink-2: #13293a;
  --teal: #0f8f9c;
  --teal-dk: #0a6a74;
  --gold: #d9a440;
  --tint: #eef4f6;
  --line: #d5e0e4;
  --text: #22333f;
  font-family: "Segoe UI", system-ui, sans-serif;
  color: var(--text);
  line-height: 1.6;
}
.home * { box-sizing: border-box; }
.home-wrap { width: min(1200px, 92%); margin: 0 auto; }
.home h1, .home h2, .home h3 { margin: 0; line-height: 1.15; color: var(--ink); }
.home h1 { font-size: clamp(2.4rem, 6vw, 4.2rem); font-weight: 800; color: #fff; letter-spacing: -0.01em; }
.home h2 { font-size: clamp(1.6rem, 3.2vw, 2.4rem); font-weight: 700; }
.home h3 { font-size: 1.08rem; font-weight: 600; }
.home a:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }

/* buttons */
.home .btn {
  display: inline-block; padding: 0.85rem 1.6rem; font-weight: 700; font-size: 1rem;
  text-decoration: none; border-radius: 3px; border: 2px solid transparent; transition: background 0.2s, border-color 0.2s;
}
.home .btn--gold { background: var(--gold); color: var(--ink); }
.home .btn--gold:hover { background: #e8b652; }
.home .btn--line { border-color: #6f8c99; color: #fff; }
.home .btn--line:hover { border-color: var(--gold); }

/* hero */
.hero {
  padding: clamp(3rem, 8vw, 6rem) 0;
  background:
    linear-gradient(rgba(15, 143, 156, 0.13) 1px, transparent 1px) 0 0 / 32px 32px,
    linear-gradient(90deg, rgba(15, 143, 156, 0.13) 1px, transparent 1px) 0 0 / 32px 32px,
    var(--ink);
}
.hero__inner { display: grid; grid-template-columns: 1.3fr 1fr; gap: 3rem; align-items: center; }
.hero__lead { color: #bcd2d8; font-size: 1.15rem; max-width: 52ch; margin: 1.4rem 0 2rem; }
.hero__cta { display: flex; flex-wrap: wrap; gap: 1rem; }
.hero__loc { margin: 2rem 0 0; color: #7fa0ad; font-size: 0.95rem; }
.hero__drawing { margin: 0; }
.hero__drawing svg { width: 100%; max-width: 380px; margin: 0 auto; display: block; }
.hero__drawing circle { fill: none; stroke: var(--teal); stroke-width: 1.5; }
.hero__drawing .dim { fill: none; stroke: var(--gold); stroke-width: 1; }
.hero__drawing text { fill: var(--gold); font-size: 12px; }

/* manufacturing / trading split */
.split { background: var(--tint); padding: 2.5rem 0; }
.split__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.split__card {
  display: block; padding: 2rem; background: #fff; text-decoration: none; color: var(--text);
  border-top: 5px solid var(--teal); transition: transform 0.2s, box-shadow 0.2s;
}
.split__card--alt { border-top-color: var(--gold); }
.split__card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(11, 26, 38, 0.12); }
.split__card p { margin: 0.7rem 0 1.2rem; }
.split__go { font-weight: 700; color: var(--teal-dk); }
.split__card--alt .split__go { color: #9a6d10; }

/* generic blocks */
.block { padding: clamp(3rem, 7vw, 5rem) 0; }
.block--dark { background: var(--ink); }
.block--dark h2 { color: #fff; max-width: 24ch; }
.block--tint { background: var(--tint); }
.block__intro { max-width: 60ch; margin: 0.8rem 0 0; font-size: 1.05rem; }
.block__note { color: #9fbac4; max-width: 70ch; margin: 2rem 0 0; }
.textlink { display: inline-block; margin-top: 1.5rem; font-weight: 700; color: var(--teal-dk); }

/* services */
.services {
  list-style: none; padding: 0; margin: 2rem 0 0;
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 0 3rem;
}
.services li { padding: 1.1rem 0; border-bottom: 1px solid var(--line); }
.services p { margin: 0.3rem 0 0; }

/* chips */
.chips { list-style: none; padding: 0; margin: 2rem 0 0; display: flex; flex-wrap: wrap; gap: 0.6rem; }
.chips li { padding: 0.5rem 1.05rem; border-radius: 3px; background: var(--ink-2); color: #fff; border: 1px solid #2b4a5f; font-size: 0.95rem; }
.chips--light li { background: #fff; color: var(--ink); border-color: var(--line); }

/* work gallery */
.work { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin-top: 2rem; }
.work__item { margin: 0; border: 1px solid var(--line); background: #fff; }
.work__item figcaption { padding: 0.8rem 1rem; font-weight: 600; color: var(--ink); border-top: 3px solid var(--gold); }
.home-photo { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; background: var(--ink-2); }
.home-photo--empty { background: repeating-linear-gradient(45deg, var(--ink-2), var(--ink-2) 10px, var(--ink) 10px, var(--ink) 20px); }

/* why */
.why { list-style: none; padding: 0; margin: 2rem 0 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.why li { padding-top: 0.9rem; border-top: 3px solid var(--teal); }
.why p { margin: 0.4rem 0 0; }

/* CTA band */
.cta { background: var(--teal-dk); padding: 3rem 0; }
.cta__inner { display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; }
.cta h2 { color: #fff; }
.cta p { color: #d6eef1; margin: 0.5rem 0 0; }
.cta__actions { display: flex; gap: 1rem; flex-wrap: wrap; }

@media (max-width: 860px) {
  .hero__inner, .split__grid { grid-template-columns: 1fr; }
  .hero__drawing { display: none; }
  .services { grid-template-columns: 1fr; }
  .work { grid-template-columns: repeat(2, 1fr); }
  .why { grid-template-columns: 1fr; }
}
@media (max-width: 520px) {
  .work { grid-template-columns: 1fr; }
}
`;

export default function HomeStyles() {
  return <style>{css}</style>;
}