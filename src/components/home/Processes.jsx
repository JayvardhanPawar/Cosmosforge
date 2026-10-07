import { Link } from "react-router-dom";
import manufacturing from "../../data/manufacturing.json";

/* Names match the "processes" values in manufacturing.json, so each tile can
   link to the filtered Manufacturing page and show a live count.
   Processes with no examples in the JSON yet are shown without a link. */
const PROCESSES = [
  "CNC Turning",
  "VMC Machining",
  "Conventional Milling",
  "Surface Grinding",
  "Cylindrical Grinding",
  "Slotting & Keyway",
  "Thread Cutting",
  "Spline Cutting",
  "Fabrication & Welding",
  "Precision Assembly",
  "Reverse Engineering",
  "CAD-Based Development",
];

const MATERIALS = [
  ["Steels", ["Mild steel", "EN series", "Alloy steels", "42CrMo4 / 42MoCr4", "Tool steels", "Stainless steel"]],
  ["Cast iron", ["Cast iron"]],
  ["Non-ferrous", ["Brass", "Copper", "Aluminium"]],
  ["Plastics & imported", ["Engineering plastics & polymers", "Imported engineering grades"]],
];

const countFor = (name) => manufacturing.filter((i) => i.processes?.includes(name)).length;

const CSS = `
.pr {
  position: relative; overflow: hidden; isolation: isolate;
  padding: clamp(3rem, 7vw, 5.5rem) 0; color: #fff;
  font-family: "Segoe UI", system-ui, sans-serif;
  background:
    linear-gradient(rgba(15, 143, 156, 0.10) 1px, transparent 1px) 0 0 / 34px 34px,
    linear-gradient(90deg, rgba(15, 143, 156, 0.10) 1px, transparent 1px) 0 0 / 34px 34px,
    #0b1a26;
}
.pr * { box-sizing: border-box; }
.pr-wrap { width: min(1200px, 92%); margin: 0 auto; }

.pr-kicker { display: inline-flex; align-items: center; gap: 0.7rem; margin: 0 0 0.9rem; color: #d9a440; font-weight: 700; font-size: 0.92rem; letter-spacing: 0.05em; }
.pr-kicker::before { content: ""; width: 2.2rem; height: 3px; background: #d9a440; }
.pr h2 { margin: 0; color: #fff; font-size: clamp(1.8rem, 3.8vw, 2.9rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.01em; max-width: 22ch; }
.pr-intro { margin: 1rem 0 0; max-width: 58ch; color: #d9eaee; font-size: 1.1rem; line-height: 1.6; }

.pr-grid { list-style: none; padding: 0; margin: 2.5rem 0 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; background: #0f8f9c; border: 2px solid #0f8f9c; }
.pr-item { display: flex; background: #143c56; }

.pr-tile {
  position: relative; display: flex; flex-direction: column; width: 100%; min-height: 150px;
  padding: 1.2rem 1.2rem 1.1rem; color: inherit; text-decoration: none;
  transition: background 0.25s ease, transform 0.25s ease;
}
.pr-no { font-size: 1.05rem; font-weight: 800; color: #f0bf5a; transition: color 0.25s; }
.pr-name { margin: 0.7rem 0 0; font-size: 1.2rem; font-weight: 700; line-height: 1.25; color: #fff; }
.pr-meta { margin-top: auto; padding-top: 1rem; display: flex; align-items: center; justify-content: space-between; font-size: 0.92rem; font-weight: 600; color: #dcecf0; }
.pr-meta svg { width: 18px; height: 18px; color: #f0bf5a; transition: transform 0.25s; }
.pr-bar { position: absolute; left: 0; bottom: 0; height: 3px; width: 0; background: #d9a440; transition: width 0.3s ease; }

a.pr-tile:hover, a.pr-tile:focus-visible { background: #0f8f9c; }
a.pr-tile:hover .pr-no, a.pr-tile:focus-visible .pr-no { color: #0b1a26; }
a.pr-tile:hover .pr-meta svg { color: #fff; }
a.pr-tile:hover .pr-bar { background: #fff; }
a.pr-tile:hover .pr-bar, a.pr-tile:focus-visible .pr-bar { width: 100%; }
a.pr-tile:hover .pr-meta svg { transform: translateX(5px); }
a.pr-tile:focus-visible { outline: 3px solid #d9a440; outline-offset: -3px; }
span.pr-tile { cursor: default; }
span.pr-tile .pr-meta { color: #b4cdd5; font-weight: 500; }

/* materials */
.pr-mat { margin-top: 3rem; padding: clamp(1.4rem, 3vw, 2.2rem); background: #143c56; border-left: 5px solid #d9a440; }
.pr-mat h3 { margin: 0; font-size: 1.35rem; font-weight: 700; color: #fff; }
.pr-mat p { margin: 0.4rem 0 0; color: #dcecf0; }
.pr-mat-grid { display: grid; grid-template-columns: 1.6fr 0.8fr 1fr 1.4fr; gap: 1.8rem; margin-top: 1.6rem; }
.pr-mat-grid h4 { margin: 0 0 0.7rem; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #d9a440; }
.pr-mat-grid ul { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pr-mat-grid li { padding: 0.3rem 0.8rem; font-size: 0.9rem; font-weight: 600; color: #fff; border: 1px solid rgba(255, 255, 255, 0.45); background: rgba(255, 255, 255, 0.1); border-radius: 999px; }

@media (max-width: 1000px) {
  .pr-grid { grid-template-columns: repeat(2, 1fr); }
  .pr-mat-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 520px) {
  .pr-grid { grid-template-columns: 1fr; }
  .pr-tile { min-height: 0; }
  .pr-mat-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) { .pr-tile, .pr-bar, .pr-meta svg { transition: none; } }
`;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Processes() {
  return (
    <section className="pr" aria-labelledby="pr-title">
      <style>{CSS}</style>
      <div className="pr-wrap">
        <p className="pr-kicker">Our capabilities</p>
        <h2 id="pr-title">Machining, grinding, fabrication and assembly under one roof</h2>
        <p className="pr-intro">
          Keeping the processes in one place means fewer hand-offs, shorter lead times and one team
          answerable for the finished part.
        </p>

        <ul className="pr-grid">
          {PROCESSES.map((name, idx) => {
            const n = countFor(name);
            const inner = (
              <>
                <span className="pr-no">{String(idx + 1).padStart(2, "0")}</span>
                <h3 className="pr-name">{name}</h3>
                <span className="pr-meta">
                  <span>{n > 0 ? `${n} example${n === 1 ? "" : "s"}` : "Available on request"}</span>
                  {n > 0 && <Arrow />}
                </span>
                <span className="pr-bar" aria-hidden="true" />
              </>
            );
            return (
              <li key={name} className="pr-item">
                {n > 0 ? (
                  <Link to={`/manufacturing?process=${encodeURIComponent(name)}`} className="pr-tile">{inner}</Link>
                ) : (
                  <span className="pr-tile">{inner}</span>
                )}
              </li>
            );
          })}
        </ul>

        <div className="pr-mat">
          <h3>Materials we work with</h3>
          <p>Certified raw material, with documentation on request.</p>
          <div className="pr-mat-grid">
            {MATERIALS.map(([group, list]) => (
              <div key={group}>
                <h4>{group}</h4>
                <ul>{list.map((m) => <li key={m}>{m}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}