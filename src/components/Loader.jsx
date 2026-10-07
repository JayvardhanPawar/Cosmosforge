import { useEffect, useState } from "react";

const HOLES = [0, 60, 120, 180, 240, 300];

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const CSS = `
.ld {
  position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; padding: 1.5rem;
  background:
    linear-gradient(rgba(15, 143, 156, 0.13) 1px, transparent 1px) 0 0 / 32px 32px,
    linear-gradient(90deg, rgba(15, 143, 156, 0.13) 1px, transparent 1px) 0 0 / 32px 32px,
    radial-gradient(circle at 50% 40%, #11344a 0%, #0b1a26 70%);
  font-family: "Segoe UI", system-ui, sans-serif; color: #fff;
  transition: opacity 0.6s ease, transform 0.6s ease, visibility 0s 0.6s;
}
.ld.is-hiding { opacity: 0; transform: translateY(-24px); visibility: hidden; pointer-events: none; }
.ld-box { display: grid; justify-items: center; text-align: center; }

.ld-art { width: min(240px, 62vw); height: auto; overflow: visible; }
.ld-art circle, .ld-art path { fill: none; stroke: #0f8f9c; stroke-width: 1.6; }
.ld-art .ld-dim { stroke: #d9a440; stroke-width: 1.2; }
.ld-art text { fill: #d9a440; font-size: 12px; opacity: 0; animation: ld-fade 0.5s ease 1.5s forwards; }

.ld-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ld-draw 1.1s cubic-bezier(0.6, 0, 0.3, 1) forwards; }
.ld-hole { opacity: 0; transform-box: fill-box; transform-origin: center; animation: ld-pop 0.4s ease forwards; }
.ld-spin { transform-box: view-box; transform-origin: 160px 150px; animation: ld-rotate 9s linear infinite; }
@keyframes ld-draw { to { stroke-dashoffset: 0; } }
@keyframes ld-pop { from { opacity: 0; transform: scale(0.2); } to { opacity: 1; transform: scale(1); } }
@keyframes ld-fade { to { opacity: 1; } }
@keyframes ld-rotate { to { transform: rotate(360deg); } }

.ld-brand { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.4rem; opacity: 0; transform: translateY(10px); animation: ld-up 0.6s ease 0.6s forwards; }
.ld-brand img { width: 44px; height: 44px; border-radius: 6px; }
.ld-name { display: flex; flex-direction: column; text-align: left; font-size: 1.4rem; font-weight: 700; line-height: 1.1; }
.ld-name small { margin-top: 3px; font-size: 0.68rem; font-weight: 600; color: #d9a440; letter-spacing: 0.28em; text-transform: uppercase; }
.ld-tag { margin: 0.9rem 0 0; font-size: 0.9rem; color: #9fb8c1; opacity: 0; animation: ld-fade 0.6s ease 1s forwards; }
@keyframes ld-up { to { opacity: 1; transform: none; } }

.ld-bar { width: min(240px, 62vw); height: 3px; margin-top: 1.6rem; background: rgba(255, 255, 255, 0.15); overflow: hidden; border-radius: 2px; }
.ld-bar span { display: block; height: 100%; width: 0; background: linear-gradient(90deg, #0f8f9c, #d9a440); animation: ld-fill linear forwards; }
@keyframes ld-fill { to { width: 100%; } }

@media (prefers-reduced-motion: reduce) {
  .ld-draw { animation: none; stroke-dashoffset: 0; }
  .ld-hole, .ld-brand, .ld-tag, .ld-art text { animation: none; opacity: 1; transform: none; }
  .ld-spin { animation: none; }
  .ld { transition: opacity 0.2s; }
}
`;

export default function Loader() {
  const [phase, setPhase] = useState("show"); // show -> hiding -> gone
  const MIN = reducedMotion() ? 500 : 2000; // shortest time the loader stays (ms)
  const MAX = 6000;                          // never wait longer than this (ms)

  useEffect(() => {
    if (phase === "gone") return;
    document.body.style.overflow = "hidden"; // no scrolling behind the loader
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  useEffect(() => {
    const start = performance.now();
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN - (performance.now() - start));
      setTimeout(() => setPhase("hiding"), wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const failSafe = setTimeout(finish, MAX);

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(failSafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "hiding") return;
    const t = setTimeout(() => setPhase("gone"), 700);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div className={`ld ${phase === "hiding" ? "is-hiding" : ""}`} role="status" aria-live="polite" aria-label="Loading Cosmosforge Engineering">
      <style>{CSS}</style>
      <div className="ld-box">
        <svg className="ld-art" viewBox="0 0 320 330" aria-hidden="true">
          <circle className="ld-draw" pathLength="1" cx="160" cy="150" r="120" />
          <circle className="ld-draw" pathLength="1" cx="160" cy="150" r="70" style={{ animationDelay: "0.25s" }} />
          <circle className="ld-draw" pathLength="1" cx="160" cy="150" r="26" style={{ animationDelay: "0.5s" }} />
          <g className="ld-spin">
            {HOLES.map((a, i) => (
              <circle
                key={a}
                className="ld-hole"
                cx={160 + 95 * Math.cos((a * Math.PI) / 180)}
                cy={150 + 95 * Math.sin((a * Math.PI) / 180)}
                r="9"
                style={{ animationDelay: `${0.9 + i * 0.1}s` }}
              />
            ))}
          </g>
          <path className="ld-dim ld-draw" pathLength="1" d="M40 290h240M40 282v16M280 282v16" style={{ animationDelay: "1.1s" }} />
          <path className="ld-dim ld-draw" pathLength="1" d="M300 30v240M292 30h16M292 270h16" style={{ animationDelay: "1.2s" }} />
          <text x="160" y="316" textAnchor="middle">Ø 240</text>
        </svg>

        <div className="ld-brand">
          <img src="/images/logo.png" alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
          <span className="ld-name">Cosmosforge<small>Engineering</small></span>
        </div>
        <p className="ld-tag">Engineering Precision. Delivering Excellence.</p>

        <div className="ld-bar" aria-hidden="true">
          <span style={{ animationDuration: `${MIN}ms` }} />
        </div>
      </div>
    </div>
  );
}