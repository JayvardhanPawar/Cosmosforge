import { Link } from "react-router-dom";

const PHONE = "+91 9175689186";
const PHONE_TEL = PHONE.replace(/\s/g, "");
const PHONE_DIGITS = PHONE.replace(/\D/g, "");
const WA_TEXT = encodeURIComponent("Hello Cosmosforge Engineering, I have a drawing/sample and would like a quotation.");

const STEPS = [
  ["Send", "your drawing or sample"],
  ["Get", "a quotation from us"],
  ["Receive", "finished parts on time"],
];

const HOLES = [0, 60, 120, 180, 240, 300];

const CSS = `
.cb {
  position: relative; overflow: hidden; isolation: isolate;
  padding: clamp(3rem, 7vw, 5rem) 0; color: #fff;
  font-family: "Segoe UI", system-ui, sans-serif;
  background:
    linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px) 0 0 / 34px 34px,
    linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px) 0 0 / 34px 34px,
    linear-gradient(120deg, #0a6a74 0%, #0b4a5c 55%, #0b1a26 100%);
}
.cb * { box-sizing: border-box; }
.cb-wrap { width: min(1200px, 92%); margin: 0 auto; display: grid; grid-template-columns: 1.4fr 1fr; gap: 3rem; align-items: center; }

.cb-kicker { display: inline-flex; align-items: center; gap: 0.7rem; margin: 0 0 0.9rem; color: #d9a440; font-weight: 700; font-size: 0.92rem; letter-spacing: 0.05em; }
.cb-kicker::before { content: ""; width: 2.2rem; height: 3px; background: #d9a440; }
.cb h2 { margin: 0; color: #fff; font-size: clamp(2rem, 4.6vw, 3.4rem); font-weight: 800; line-height: 1.05; letter-spacing: -0.015em; max-width: 16ch; }
.cb-text { margin: 1.1rem 0 0; max-width: 50ch; color: #d3e8ec; font-size: 1.1rem; line-height: 1.6; }

.cb-steps { list-style: none; padding: 0; margin: 1.8rem 0 0; display: flex; flex-wrap: wrap; gap: 0.8rem 1.6rem; counter-reset: cb; }
.cb-steps li { counter-increment: cb; display: flex; align-items: center; gap: 0.7rem; font-size: 0.95rem; color: #d3e8ec; }
.cb-steps li::before {
  content: counter(cb); width: 1.9rem; height: 1.9rem; display: grid; place-items: center; flex: none;
  border-radius: 50%; background: #d9a440; color: #0b1a26; font-weight: 800; font-size: 0.9rem;
}
.cb-steps b { color: #fff; }

/* action panel */
.cb-panel { position: relative; padding: 1.8rem; background: rgba(11, 26, 38, 0.72); border: 1px solid rgba(255, 255, 255, 0.18); border-top: 5px solid #d9a440; border-radius: 4px; backdrop-filter: blur(4px); }
.cb-panel h3 { margin: 0; font-size: 1.2rem; font-weight: 700; color: #fff; }
.cb-panel p { margin: 0.4rem 0 1.2rem; font-size: 0.93rem; color: #b9cfd6; }
.cb-btns { display: grid; gap: 0.7rem; }
.cb-btn {
  display: flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 0.95rem 1.2rem;
  font-weight: 700; font-size: 1rem; text-decoration: none; border-radius: 3px; border: 2px solid transparent;
  transition: transform 0.2s, background 0.2s, border-color 0.2s;
}
.cb-btn svg { width: 19px; height: 19px; flex: none; }
.cb-btn:hover { transform: translateY(-2px); }
.cb-btn:focus-visible { outline: 3px solid #d9a440; outline-offset: 3px; }
.cb-btn--gold { background: #d9a440; color: #0b1a26; }
.cb-btn--gold:hover { background: #e8b652; }
.cb-btn--wa { background: #1f9d55; color: #fff; }
.cb-btn--wa:hover { background: #188045; }
.cb-btn--line { border-color: rgba(255, 255, 255, 0.5); color: #fff; }
.cb-btn--line:hover { border-color: #d9a440; }
.cb-mail { display: block; margin-top: 1rem; text-align: center; font-size: 0.88rem; color: #9fb8c1; }
.cb-mail a { color: #d9a440; }

/* faint drawing in the background */
.cb-art { position: absolute; z-index: -1; right: -90px; bottom: -110px; width: 420px; opacity: 0.16; pointer-events: none; }
.cb-art circle { fill: none; stroke: #fff; stroke-width: 1.5; }

@media (max-width: 900px) {
  .cb-wrap { grid-template-columns: 1fr; gap: 2rem; }
  .cb h2 { max-width: 20ch; }
}
@media (prefers-reduced-motion: reduce) { .cb-btn { transition: none; } .cb-btn:hover { transform: none; } }
`;

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.3A8.4 8.4 0 1 1 21 11.5z" />
  </svg>
);
const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2h9l5 5v15H6zM14 2v6h6M9 13h6M9 17h6" />
  </svg>
);

export default function CtaBand() {
  return (
    <section className="cb" aria-labelledby="cb-title">
      <style>{CSS}</style>

      <svg className="cb-art" viewBox="0 0 320 320" aria-hidden="true">
        <circle cx="160" cy="160" r="150" />
        <circle cx="160" cy="160" r="90" />
        <circle cx="160" cy="160" r="34" />
        {HOLES.map((a) => (
          <circle key={a} cx={160 + 120 * Math.cos((a * Math.PI) / 180)} cy={160 + 120 * Math.sin((a * Math.PI) / 180)} r="11" />
        ))}
      </svg>

      <div className="cb-wrap">
        <div>
          <p className="cb-kicker">Start a project</p>
          <h2 id="cb-title">Have a drawing or a sample?</h2>
          <p className="cb-text">
            Send it over for a quotation. We will tell you what it takes to make it.
          </p>
          <ol className="cb-steps">
            {STEPS.map(([verb, rest]) => (
              <li key={verb}><span><b>{verb}</b> {rest}</span></li>
            ))}
          </ol>
        </div>

        <div className="cb-panel">
          <h3>Get your quotation</h3>
          <p>Choose the way that suits you.</p>
          <div className="cb-btns">
            <Link to="/contact" className="cb-btn cb-btn--gold"><DocIcon /> Request a quote</Link>
            <a href={`https://wa.me/${PHONE_DIGITS}?text=${WA_TEXT}`} target="_blank" rel="noreferrer" className="cb-btn cb-btn--wa">
              <ChatIcon /> Chat on WhatsApp
            </a>
            <a href={`tel:${PHONE_TEL}`} className="cb-btn cb-btn--line"><PhoneIcon /> {PHONE}</a>
          </div>
          <span className="cb-mail">
            or email <a href="mailto:cosmosforge.engineering@gmail.com">cosmosforge.engineering@gmail.com</a>
          </span>
        </div>
      </div>
    </section>
  );
}