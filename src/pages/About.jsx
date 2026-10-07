import { Link } from "react-router-dom";

const FACTS = [
  ["pin", "Based in Bhosari, Pune", "A key industrial hub with good connectivity"],
  ["doc", "Made to your drawing", "Or to a sample, or a worn-out part"],
  ["layers", "Manufacturing and trading", "Parts and supplies from one supplier"],
];

const DO = [
  ["gear", "Precision manufacturing", "Machined components, fabricated assemblies, jigs and fixtures, moulds, gauges, die casting spares and machine spares, made to your drawing or sample."],
  ["cycle", "Development and reverse engineering", "New components developed from a drawing, sample or application need, and legacy or discontinued parts reproduced."],
  ["box", "Industrial supplies", "Fasteners, hand tools, cutting tools, abrasives, bearings, pneumatics, hydraulics, safety products and consumables."],
];

const VALUES = [
  ["bulb", "Innovation", "We keep improving with new ideas and technology."],
  ["shield", "Trust", "Long-term relationships are built on reliability."],
  ["target", "Quality", "Products that meet the highest standards, every time."],
  ["growth", "Customer value", "Sustainable growth for the customers we serve."],
];

const STEPS = [
  ["You send a drawing or sample", "Share what you have, along with material, quantity and tolerance."],
  ["We review and quote", "We check feasibility and reply with a quotation."],
  ["We machine and assemble", "Turning, milling, grinding, fabrication and assembly as the part needs."],
  ["We inspect and deliver", "Parts are measured with calibrated instruments before dispatch."],
];

const QUALITY = [
  ["target", "Dimensional accuracy", "Strict dimensional control to meet critical tolerances."],
  ["gear", "Process control", "Defined and monitored processes for stable, repeatable quality."],
  ["doc", "Material traceability", "Certified raw materials with documentation."],
  ["ruler", "Measuring instruments", "Micrometers, verniers, bore gauges, slip gauges, height gauges, plug and thread gauges, and a granite surface plate."],
];

const ICONS = {
  pin: "M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 7.5a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6z",
  doc: "M6 2h9l5 5v15H6zM14 2v6h6M9 13h6M9 17h6",
  layers: "M12 2l9 5-9 5-9-5zM3 12l9 5 9-5M3 17l9 5 9-5",
  gear: "M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
  cycle: "M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3M18 3v4h-4M6 21v-4h4",
  box: "M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10",
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  growth: "M3 20h18M5 16l5-5 4 4 6-7M15 8h5v5",
  ruler: "M3 17L17 3l4 4L7 21zM8 12l2 2M11 9l2 2M14 6l2 2",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  arrow: "M5 12h14M13 6l6 6-6 6",
};
const Icon = ({ name }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={ICONS[name]} />
  </svg>
);

const CSS = `
.ab {
  --ink: #0b1a26; --teal: #0f8f9c; --teal-dk: #0a6a74; --gold: #d9a440;
  --tint: #eef4f6; --line: #d5e0e4; --text: #22333f;
  font-family: "Segoe UI", system-ui, sans-serif; color: var(--text); line-height: 1.65; background: #fff;
}
.ab * { box-sizing: border-box; }
.ab-wrap { width: min(1200px, 92%); margin: 0 auto; }
.ab h1, .ab h2, .ab h3 { margin: 0; color: var(--ink); line-height: 1.15; }
.ab p { margin: 0; }
.ab a:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }
.ab-kicker { display: inline-flex; align-items: center; gap: 0.7rem; margin: 0 0 0.9rem; color: var(--teal-dk); font-weight: 700; font-size: 0.92rem; letter-spacing: 0.05em; }
.ab-kicker::before { content: ""; width: 2.2rem; height: 3px; background: var(--gold); }
.ab-kicker--light { color: var(--gold); }
.ab h2 { font-size: clamp(1.8rem, 3.6vw, 2.7rem); font-weight: 800; letter-spacing: -0.01em; }
.ab-sec { padding: clamp(3rem, 7vw, 5rem) 0; }
.ab-sec--tint { background: var(--tint); }
.ab-icon { display: grid; place-items: center; flex: none; }
.ab-icon svg { width: 26px; height: 26px; }

/* header */
.ab-head {
  padding: clamp(2.8rem, 7vw, 5rem) 0 clamp(6rem, 10vw, 8rem);
  background:
    linear-gradient(rgba(15, 143, 156, 0.13) 1px, transparent 1px) 0 0 / 32px 32px,
    linear-gradient(90deg, rgba(15, 143, 156, 0.13) 1px, transparent 1px) 0 0 / 32px 32px, var(--ink);
}
.ab-head h1 { color: #fff; font-size: clamp(2.1rem, 5vw, 3.6rem); font-weight: 800; letter-spacing: -0.015em; max-width: 19ch; }
.ab-head p { margin-top: 1.2rem; max-width: 60ch; color: #c5d9df; font-size: 1.1rem; }
.ab-facts { list-style: none; padding: 0; margin: -4rem auto 0; position: relative; z-index: 2; width: min(1200px, 92%); display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
.ab-fact { display: flex; gap: 1rem; align-items: center; height: 100%; padding: 1.3rem 1.4rem; background: #fff; border-radius: 4px; border-bottom: 4px solid var(--teal); box-shadow: 0 14px 32px rgba(11, 26, 38, 0.16); }
.ab-fact .ab-icon { width: 52px; height: 52px; border-radius: 50%; background: var(--ink); color: var(--gold); }
.ab-fact b { display: block; color: var(--ink); font-size: 1.05rem; }
.ab-fact span { font-size: 0.9rem; }

/* who we are */
.ab-who { display: grid; grid-template-columns: 1.4fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: start; }
.ab-who p { margin-top: 1.1rem; max-width: 60ch; font-size: 1.05rem; }
.ab-who h2 { margin-bottom: 0.5rem; }
.ab-card { padding: clamp(1.5rem, 3vw, 2rem); background: var(--ink); color: #c5d9df; border-radius: 4px; border-top: 5px solid var(--gold); }
.ab-card h3 { color: #fff; font-size: 1.3rem; }
.ab-list { list-style: none; padding: 0; margin: 1.3rem 0 0; display: grid; gap: 1.1rem; }
.ab-list li { display: flex; gap: 0.9rem; }
.ab-list svg { flex: none; width: 22px; height: 22px; margin-top: 0.15rem; color: var(--gold); }
.ab-list small { display: block; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #8fb0bb; }
.ab-list span { color: #fff; font-weight: 600; }

/* what we do */
.ab-do { list-style: none; padding: 0; margin: 2.2rem 0 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; }
.ab-do li { position: relative; padding: 1.8rem 1.6rem; background: #fff; border: 1px solid var(--line); border-bottom: 4px solid var(--teal); border-radius: 4px; transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s; }
.ab-do li:hover { transform: translateY(-5px); box-shadow: 0 16px 32px rgba(11, 26, 38, 0.12); border-bottom-color: var(--gold); }
.ab-do .ab-icon { width: 56px; height: 56px; border-radius: 4px; background: var(--ink); color: var(--gold); }
.ab-do h3 { margin-top: 1.2rem; font-size: 1.2rem; }
.ab-do p { margin-top: 0.6rem; font-size: 0.97rem; }

/* vision & mission */
.ab-vm {
  padding: clamp(3rem, 7vw, 5rem) 0; color: #fff;
  background:
    linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px) 0 0 / 34px 34px,
    linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px) 0 0 / 34px 34px,
    linear-gradient(135deg, #0a6a74 0%, #0b3a4a 55%, #0b1a26 100%);
}
.ab-vm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem; }
.ab-vm article { position: relative; padding: clamp(1.6rem, 3vw, 2.4rem); background: rgba(11, 26, 38, 0.6); border: 1px solid rgba(255, 255, 255, 0.2); border-top: 5px solid var(--gold); border-radius: 4px; }
.ab-vm article::before { content: "\\201C"; position: absolute; top: -0.4rem; right: 1.2rem; font-size: 7rem; line-height: 1; color: rgba(217, 164, 64, 0.35); font-family: Georgia, serif; }
.ab-vm h2, .ab-vm h3 { color: #fff; }
.ab-vm h3 { font-size: 1.5rem; }
.ab-vm article p { margin-top: 1rem; color: #e1eff2; font-size: 1.12rem; line-height: 1.7; }

/* values */
.ab-values { list-style: none; padding: 0; margin: 2.2rem 0 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.4rem; }
.ab-values li { padding-top: 1.2rem; border-top: 3px solid var(--teal); }
.ab-values .ab-icon { width: 50px; height: 50px; border-radius: 50%; background: var(--tint); color: var(--teal-dk); border: 1px solid var(--line); }
.ab-values h3 { margin-top: 1rem; font-size: 1.15rem; }
.ab-values p { margin-top: 0.4rem; }

/* steps */
.ab-steps { list-style: none; padding: 0; margin: 2.4rem 0 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; counter-reset: ab; }
.ab-steps li { counter-increment: ab; position: relative; padding-top: 3.6rem; }
.ab-steps li::before {
  content: counter(ab); position: absolute; top: 0; left: 0; width: 2.8rem; height: 2.8rem; display: grid; place-items: center;
  border-radius: 50%; background: var(--ink); color: var(--gold); font-weight: 800; font-size: 1.1rem; box-shadow: 0 0 0 6px var(--tint);
}
.ab-steps li::after { content: ""; position: absolute; top: 1.4rem; left: 3.6rem; right: -1rem; height: 2px; background: repeating-linear-gradient(90deg, var(--teal) 0 8px, transparent 8px 14px); }
.ab-steps li:last-child::after { display: none; }
.ab-steps h3 { font-size: 1.1rem; }
.ab-steps p { margin-top: 0.5rem; font-size: 0.96rem; }

/* quality */
.ab-q-head { max-width: 62ch; }
.ab-q-head p { margin-top: 1rem; font-size: 1.05rem; }
.ab-q { list-style: none; padding: 0; margin: 2.2rem 0 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.2rem; }
.ab-q li { display: flex; gap: 1.1rem; padding: 1.5rem; background: var(--tint); border-left: 5px solid var(--teal); border-radius: 4px; }
.ab-q .ab-icon { width: 52px; height: 52px; border-radius: 4px; background: var(--ink); color: var(--gold); }
.ab-q h3 { font-size: 1.12rem; }
.ab-q p { margin-top: 0.35rem; font-size: 0.96rem; }

/* cta */
.ab-cta { padding: clamp(2.8rem, 6vw, 4rem) 0; background: var(--ink); }
.ab-cta-in { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.8rem; }
.ab-cta h2 { color: #fff; font-size: clamp(1.7rem, 3.4vw, 2.5rem); }
.ab-cta p { margin-top: 0.6rem; color: #b9cfd6; font-size: 1.05rem; }
.ab-btns { display: flex; flex-wrap: wrap; gap: 0.9rem; }
.ab-btn { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.9rem 1.6rem; font-weight: 700; text-decoration: none; border-radius: 3px; border: 2px solid transparent; transition: transform 0.2s, background 0.2s, border-color 0.2s; }
.ab-btn svg { width: 18px; height: 18px; }
.ab-btn:hover { transform: translateY(-2px); }
.ab-btn--gold { background: var(--gold); color: var(--ink); }
.ab-btn--gold:hover { background: #e8b652; }
.ab-btn--line { border-color: rgba(255, 255, 255, 0.5); color: #fff; }
.ab-btn--line:hover { border-color: var(--gold); }

@media (max-width: 960px) {
  .ab-facts { grid-template-columns: 1fr; margin-top: -3rem; }
  .ab-who, .ab-vm-grid { grid-template-columns: 1fr; }
  .ab-do { grid-template-columns: 1fr; }
  .ab-values, .ab-steps { grid-template-columns: repeat(2, 1fr); }
  .ab-steps li::after { display: none; }
}
@media (max-width: 600px) {
  .ab-values, .ab-steps, .ab-q { grid-template-columns: 1fr; }
  .ab-btns, .ab-btn { width: 100%; justify-content: center; }
}
@media (prefers-reduced-motion: reduce) { .ab-do li, .ab-btn { transition: none; } .ab-do li:hover, .ab-btn:hover { transform: none; } }
`;

export default function About() {
  return (
    <main className="ab">
      <style>{CSS}</style>

      <header className="ab-head">
        <div className="ab-wrap">
          <p className="ab-kicker ab-kicker--light">About us</p>
          <h1>A manufacturing partner built around your drawing.</h1>
          <p>
            Cosmosforge Engineering is a Pune-based manufacturer and supplier serving industry from
            Bhosari. We make precision components and spares, and we supply the tools and consumables
            that keep your shop running.
          </p>
        </div>
      </header>

      <ul className="ab-facts">
        {FACTS.map(([icon, title, text]) => (
          <li key={title} className="ab-fact">
            <span className="ab-icon"><Icon name={icon} /></span>
            <span><b>{title}</b><span>{text}</span></span>
          </li>
        ))}
      </ul>

      {/* WHO WE ARE */}
      <section className="ab-sec">
        <div className="ab-wrap ab-who">
          <div>
            <p className="ab-kicker">Our story</p>
            <h2>Who we are</h2>
            <p>
              Our work starts where your part starts: a drawing, a sample, or a worn-out piece that
              needs to be made again. We turn it into a dependable, repeatable component, whether you
              need one prototype or a regular batch.
            </p>
            <p>
              We work across pharmaceutical, robotics, packaging, automotive, medical equipment and
              die casting applications. Our aim is simple: accurate parts, honest communication and
              delivery on the date we give you.
            </p>
          </div>
          <aside className="ab-card">
            <h3>Company details</h3>
            <ul className="ab-list">
              <li><Icon name="layers" /><div><small>Company</small><span>Cosmosforge Engineering</span></div></li>
              <li><Icon name="user" /><div><small>Proprietor</small><span>Mr. Pratik Kundargi</span></div></li>
              <li><Icon name="pin" /><div><small>Location</small><span>Plot No. 458, Indrayani Nagar, Sector 2, Bhosari, Pune – 411026</span></div></li>
              <li><Icon name="gear" /><div><small>Business</small><span>Precision manufacturing and industrial trading</span></div></li>
            </ul>
          </aside>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="ab-sec ab-sec--tint">
        <div className="ab-wrap">
          <p className="ab-kicker">Our work</p>
          <h2>What we do</h2>
          <ul className="ab-do">
            {DO.map(([icon, t, d]) => (
              <li key={t}>
                <span className="ab-icon"><Icon name={icon} /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="ab-vm">
        <div className="ab-wrap">
          <p className="ab-kicker ab-kicker--light">Where we are heading</p>
          <h2 style={{ color: "#fff" }}>Vision and mission</h2>
          <div className="ab-vm-grid">
            <article>
              <h3>Our vision</h3>
              <p>
                To become a trusted engineering partner by delivering innovative, reliable and
                high-quality manufacturing solutions that create long-term value for our customers.
              </p>
            </article>
            <article>
              <h3>Our mission</h3>
              <p>
                To provide precision-engineered products through advanced manufacturing practices,
                technical expertise, and a commitment to quality, reliability and customer satisfaction.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="ab-sec">
        <div className="ab-wrap">
          <p className="ab-kicker">Our values</p>
          <h2>What we stand for</h2>
          <ul className="ab-values">
            {VALUES.map(([icon, t, d]) => (
              <li key={t}>
                <span className="ab-icon"><Icon name={icon} /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW A JOB MOVES */}
      <section className="ab-sec ab-sec--tint">
        <div className="ab-wrap">
          <p className="ab-kicker">Our process</p>
          <h2>How a job moves through our shop</h2>
          <ol className="ab-steps">
            {STEPS.map(([t, d]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* QUALITY */}
      <section className="ab-sec">
        <div className="ab-wrap">
          <div className="ab-q-head">
            <p className="ab-kicker">Quality</p>
            <h2>Quality is part of the process</h2>
            <p>
              Checks run from material selection to final inspection, so problems are caught on the
              machine and not at your end.
            </p>
          </div>
          <ul className="ab-q">
            {QUALITY.map(([icon, t, d]) => (
              <li key={t}>
                <span className="ab-icon"><Icon name={icon} /></span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <div className="ab-wrap ab-cta-in">
          <div>
            <h2>Let's talk about your part.</h2>
            <p>Send a drawing or sample and we will tell you what it takes to make it.</p>
          </div>
          <div className="ab-btns">
            <Link to="/contact" className="ab-btn ab-btn--gold">Request a quote <Icon name="arrow" /></Link>
            <Link to="/manufacturing" className="ab-btn ab-btn--line">See our work</Link>
          </div>
        </div>
      </section>
    </main>
  );
}