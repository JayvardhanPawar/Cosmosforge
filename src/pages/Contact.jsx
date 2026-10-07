import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import trading from "../data/trading.json";

const CONTACT = {
  company: "Cosmosforge Engineering",
  proprietor: "Mr. Pratik Kundargi",
  address: ["Plot No. 458, Indrayani Nagar,", "Sector 2, Bhosari,", "Pune – 411026, Maharashtra, India"],
  phone: "+91 9175689186",
  email: "cosmosforge.engineering@gmail.com",
};
const PHONE_TEL = CONTACT.phone.replace(/\s/g, "");
const PHONE_DIGITS = CONTACT.phone.replace(/\D/g, "");

/* ---------- MAP: replace these two values later ----------
   1. Google Maps > search your address > Share > Embed a map > copy the src="..." value
      and paste it into MAP_EMBED_SRC.
   2. MAP_LINK opens the location in Google Maps. Replace it with your own share link
      if you want an exact pin.
--------------------------------------------------------- */
const MAP_EMBED_SRC = "";
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Plot 458, Indrayani Nagar, Sector 2, Bhosari, Pune 411026");

const TYPE_PARTS = "Manufacturing – part to drawing or sample";
const TYPE_TRADING = "Trading – tools, fasteners or consumables";
const ENQUIRY_TYPES = [
  TYPE_PARTS,
  "Manufacturing – fixtures, moulds or gauges",
  "Manufacturing – spares or reverse engineering",
  TYPE_TRADING,
  "Other",
];

const CHECKLIST = [
  "Drawing (PDF or CAD) or a sample",
  "Material and grade",
  "Quantity and delivery date",
  "Tolerance and surface finish",
];

const ICONS = {
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  chat: "M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.3A8.4 8.4 0 1 1 21 11.5z",
  mail: "M3 5h18v14H3zM3 7l9 6 9-6",
  pin: "M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 7.5a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  check: "M5 12.5l4.5 4.5L19 7.5",
  arrow: "M5 12h14M13 6l6 6-6 6",
};
const Icon = ({ name }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={ICONS[name]} />
  </svg>
);

const CSS = `
.ct {
  --ink: #0b1a26; --ink-2: #13293a; --teal: #0f8f9c; --teal-dk: #0a6a74;
  --gold: #d9a440; --tint: #eef4f6; --line: #d5e0e4; --text: #22333f;
  font-family: "Segoe UI", system-ui, sans-serif; color: var(--text); line-height: 1.6; background: #fff;
}
.ct * { box-sizing: border-box; }
.ct-wrap { width: min(1200px, 92%); margin: 0 auto; }
.ct h1, .ct h2, .ct h3 { margin: 0; color: var(--ink); line-height: 1.15; }
.ct a:focus-visible, .ct input:focus-visible, .ct select:focus-visible, .ct textarea:focus-visible, .ct button:focus-visible {
  outline: 3px solid var(--gold); outline-offset: 2px;
}

/* header */
.ct-head {
  padding: clamp(2.8rem, 7vw, 5rem) 0 clamp(6rem, 10vw, 8rem);
  background:
    linear-gradient(rgba(15, 143, 156, 0.13) 1px, transparent 1px) 0 0 / 32px 32px,
    linear-gradient(90deg, rgba(15, 143, 156, 0.13) 1px, transparent 1px) 0 0 / 32px 32px,
    var(--ink);
}
.ct-kicker { display: inline-flex; align-items: center; gap: 0.7rem; margin: 0 0 0.9rem; color: var(--gold); font-weight: 700; font-size: 0.92rem; letter-spacing: 0.05em; }
.ct-kicker::before { content: ""; width: 2.2rem; height: 3px; background: var(--gold); }
.ct-head h1 { color: #fff; font-size: clamp(2.1rem, 5vw, 3.5rem); font-weight: 800; letter-spacing: -0.015em; }
.ct-head p { margin: 1rem 0 0; max-width: 60ch; color: #c5d9df; font-size: 1.1rem; }

/* quick contact cards overlap the header */
.ct-quick { list-style: none; padding: 0; margin: -4rem auto 0; position: relative; z-index: 2; width: min(1200px, 92%); display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
.ct-qcard {
  display: flex; align-items: center; gap: 1rem; height: 100%; padding: 1.3rem 1.4rem;
  background: #fff; color: inherit; text-decoration: none; border-radius: 4px; border-bottom: 4px solid var(--teal);
  box-shadow: 0 14px 32px rgba(11, 26, 38, 0.16); transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
}
.ct-qcard:hover { transform: translateY(-4px); box-shadow: 0 20px 38px rgba(11, 26, 38, 0.22); border-bottom-color: var(--gold); }
.ct-qicon { flex: none; width: 52px; height: 52px; display: grid; place-items: center; border-radius: 50%; background: var(--ink); color: var(--gold); }
.ct-qicon svg { width: 24px; height: 24px; }
.ct-qcard--wa .ct-qicon { background: #1f9d55; color: #fff; }
.ct-qlabel { display: block; font-size: 0.82rem; font-weight: 700; color: var(--teal-dk); letter-spacing: 0.04em; text-transform: uppercase; }
.ct-qvalue { display: block; margin-top: 0.1rem; font-size: 1.05rem; font-weight: 700; color: var(--ink); overflow-wrap: anywhere; }

/* main two columns */
.ct-main { display: grid; grid-template-columns: 1.45fr 1fr; gap: clamp(1.5rem, 4vw, 3rem); padding: clamp(2.5rem, 6vw, 4.5rem) 0; align-items: start; }

/* form card */
.ct-form { padding: clamp(1.5rem, 3.5vw, 2.5rem); background: #fff; border: 1px solid var(--line); border-top: 5px solid var(--teal); border-radius: 4px; box-shadow: 0 10px 28px rgba(11, 26, 38, 0.07); }
.ct-form h2 { font-size: 1.7rem; font-weight: 800; }
.ct-form-sub { margin: 0.5rem 0 1.6rem; }
.ct-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem 1.2rem; }
.ct-field { display: grid; gap: 0.4rem; align-content: start; }
.ct-field--full { grid-column: 1 / -1; }
.ct-field label { font-weight: 700; font-size: 0.92rem; color: var(--ink); }
.ct-field label i { font-style: normal; color: #c0392b; margin-left: 0.15rem; }
.ct-field input, .ct-field select, .ct-field textarea {
  width: 100%; min-height: 48px; padding: 0.7rem 0.9rem; font: inherit; color: var(--text);
  background: #f7fafb; border: 1px solid #b8c9cf; border-radius: 3px; transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}
.ct-field textarea { min-height: 140px; resize: vertical; }
.ct-field input:hover, .ct-field select:hover, .ct-field textarea:hover { border-color: var(--teal); }
.ct-field input:focus, .ct-field select:focus, .ct-field textarea:focus { background: #fff; border-color: var(--teal); box-shadow: 0 0 0 3px rgba(15, 143, 156, 0.18); outline: none; }
.ct-submit { display: flex; align-items: center; flex-wrap: wrap; gap: 1rem 1.4rem; margin-top: 1.6rem; }
.ct-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 0.95rem 1.7rem; font: inherit; font-weight: 700; font-size: 1rem;
  text-decoration: none; border-radius: 3px; border: 2px solid transparent; cursor: pointer; transition: background 0.2s, transform 0.2s, color 0.2s;
}
.ct-btn svg { width: 18px; height: 18px; }
.ct-btn:hover { transform: translateY(-2px); }
.ct-btn--gold { background: var(--gold); color: var(--ink); }
.ct-btn--gold:hover { background: #e8b652; }
.ct-btn--line { border-color: var(--ink); color: var(--ink); }
.ct-btn--line:hover { background: var(--ink); color: #fff; }
.ct-note { margin: 0; font-size: 0.88rem; color: #5b707c; flex: 1; min-width: 220px; }
.ct-sent { margin-top: 1.4rem; padding: 1rem 1.2rem; background: #e8f6ee; border-left: 5px solid #1f9d55; border-radius: 3px; color: #14532d; }
.ct-sent b { display: block; }

/* side panel */
.ct-side { position: sticky; top: 92px; display: grid; gap: 1.2rem; }
.ct-info { padding: clamp(1.4rem, 3vw, 2rem); background: var(--ink); color: #c5d9df; border-radius: 4px; border-top: 5px solid var(--gold); }
.ct-info h2 { color: #fff; font-size: 1.35rem; font-weight: 700; }
.ct-list { list-style: none; padding: 0; margin: 1.3rem 0 0; display: grid; gap: 1.1rem; }
.ct-list li { display: flex; gap: 0.9rem; align-items: flex-start; }
.ct-list svg { flex: none; width: 22px; height: 22px; margin-top: 0.15rem; color: var(--gold); }
.ct-list small { display: block; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #8fb0bb; }
.ct-list span, .ct-list a { color: #fff; font-weight: 600; text-decoration: none; overflow-wrap: anywhere; }
.ct-list a:hover { color: var(--gold); }
.ct-list span.ct-line { display: block; }

.ct-check { padding: clamp(1.4rem, 3vw, 1.8rem); background: var(--tint); border-left: 5px solid var(--teal); border-radius: 4px; }
.ct-check h3 { font-size: 1.1rem; font-weight: 700; }
.ct-check ul { list-style: none; padding: 0; margin: 1rem 0 0; display: grid; gap: 0.6rem; }
.ct-check li { display: flex; gap: 0.7rem; align-items: center; font-weight: 600; color: var(--ink); }
.ct-check li svg { flex: none; width: 22px; height: 22px; padding: 3px; border-radius: 50%; background: var(--teal); color: #fff; }

/* map */
.ct-mapsec { padding-bottom: clamp(3rem, 7vw, 5rem); }
.ct-maphead { display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 1.2rem; margin-bottom: 1.4rem; }
.ct-maphead h2 { font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; }
.ct-maphead p { margin: 0.4rem 0 0; }
.ct-map { position: relative; height: 440px; border: 1px solid var(--line); border-radius: 4px; overflow: hidden; background: var(--tint); }
.ct-map iframe { width: 100%; height: 100%; border: 0; display: block; }
.ct-mapph {
  height: 100%; display: grid; place-content: center; justify-items: center; gap: 0.5rem; text-align: center; padding: 1rem;
  background:
    linear-gradient(rgba(15, 143, 156, 0.14) 1px, transparent 1px) 0 0 / 30px 30px,
    linear-gradient(90deg, rgba(15, 143, 156, 0.14) 1px, transparent 1px) 0 0 / 30px 30px, var(--tint);
}
.ct-mapph svg { width: 44px; height: 44px; color: var(--teal-dk); }
.ct-mapph b { font-size: 1.15rem; color: var(--ink); }
.ct-mapph small { color: #5b707c; }
.ct-mapcard { position: absolute; left: 1.2rem; bottom: 1.2rem; max-width: 300px; padding: 1rem 1.2rem; background: #fff; border-left: 5px solid var(--gold); border-radius: 3px; box-shadow: 0 10px 24px rgba(11, 26, 38, 0.2); font-size: 0.92rem; }
.ct-mapcard b { display: block; color: var(--ink); }

@media (max-width: 960px) {
  .ct-quick { grid-template-columns: 1fr; margin-top: -3rem; }
  .ct-main { grid-template-columns: 1fr; }
  .ct-side { position: static; }
}
@media (max-width: 600px) {
  .ct-fields { grid-template-columns: 1fr; }
  .ct-btn { width: 100%; }
  .ct-map { height: 340px; }
  .ct-mapcard { position: static; max-width: none; border-radius: 0; box-shadow: none; }
}
@media (prefers-reduced-motion: reduce) { .ct-qcard, .ct-btn { transition: none; } .ct-qcard:hover, .ct-btn:hover { transform: none; } }
`;

export default function Contact() {
  const [params] = useSearchParams();
  const product = params.get("product");
  const isTrading = product && trading.some((p) => p.name === product);

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    type: product ? (isTrading ? TYPE_TRADING : TYPE_PARTS) : TYPE_PARTS,
    message: product ? `I would like a quotation for: ${product}\nQuantity: \nSize / specification: ` : "",
  });
  const [sent, setSent] = useState(false);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Enquiry: ${form.type}`,
      "",
      form.message,
    ].join("\n");
    window.location.href =
      `mailto:${CONTACT.email}?subject=${encodeURIComponent("Website enquiry: " + form.type)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const whatsapp = `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
    product ? `Hello Cosmosforge Engineering, I would like a quotation for: ${product}.` : "Hello Cosmosforge Engineering, I would like to make an enquiry."
  )}`;

  return (
    <main className="ct">
      <style>{CSS}</style>

      <header className="ct-head">
        <div className="ct-wrap">
          <p className="ct-kicker">Contact us</p>
          <h1>Send us your drawing</h1>
          <p>
            For quotations, custom manufacturing, product enquiries or technical support, write to us or
            call. Share your drawing or sample details and we will reply with what it takes to make it.
          </p>
        </div>
      </header>

      <ul className="ct-quick">
        <li>
          <a className="ct-qcard" href={`tel:${PHONE_TEL}`}>
            <span className="ct-qicon"><Icon name="phone" /></span>
            <span><span className="ct-qlabel">Call us</span><span className="ct-qvalue">{CONTACT.phone}</span></span>
          </a>
        </li>
        <li>
          <a className="ct-qcard ct-qcard--wa" href={whatsapp} target="_blank" rel="noreferrer">
            <span className="ct-qicon"><Icon name="chat" /></span>
            <span><span className="ct-qlabel">WhatsApp</span><span className="ct-qvalue">Chat with us</span></span>
          </a>
        </li>
        <li>
          <a className="ct-qcard" href={`mailto:${CONTACT.email}`}>
            <span className="ct-qicon"><Icon name="mail" /></span>
            <span><span className="ct-qlabel">Email</span><span className="ct-qvalue">{CONTACT.email}</span></span>
          </a>
        </li>
      </ul>

      <div className="ct-wrap ct-main">
        {/* FORM */}
        <form className="ct-form" onSubmit={submit}>
          <h2>Enquiry form</h2>
          <p className="ct-form-sub">Tell us what you need. Fields marked <i style={{ color: "#c0392b", fontStyle: "normal" }}>*</i> are required.</p>

          <div className="ct-fields">
            <div className="ct-field">
              <label htmlFor="ct-name">Your name<i>*</i></label>
              <input id="ct-name" required value={form.name} onChange={set("name")} autoComplete="name" />
            </div>
            <div className="ct-field">
              <label htmlFor="ct-company">Company</label>
              <input id="ct-company" value={form.company} onChange={set("company")} autoComplete="organization" />
            </div>
            <div className="ct-field">
              <label htmlFor="ct-phone">Phone<i>*</i></label>
              <input id="ct-phone" required type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
            </div>
            <div className="ct-field">
              <label htmlFor="ct-email">Email</label>
              <input id="ct-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" />
            </div>
            <div className="ct-field ct-field--full">
              <label htmlFor="ct-type">What is your enquiry about?</label>
              <select id="ct-type" value={form.type} onChange={set("type")}>
                {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="ct-field ct-field--full">
              <label htmlFor="ct-msg">Details<i>*</i></label>
              <textarea
                id="ct-msg"
                required
                value={form.message}
                onChange={set("message")}
                placeholder="Part name, material, quantity, tolerance. Is a drawing or sample available?"
              />
            </div>
          </div>

          <div className="ct-submit">
            <button type="submit" className="ct-btn ct-btn--gold">Send enquiry <Icon name="arrow" /></button>
            <p className="ct-note">This opens your email app with the details filled in. To share a drawing, attach it there, or send it on WhatsApp.</p>
          </div>

          {sent && (
            <div className="ct-sent" role="status">
              <b>Your email app should be opening.</b>
              If nothing happens, write to us directly at {CONTACT.email} or call {CONTACT.phone}.
            </div>
          )}
        </form>

        {/* SIDE */}
        <aside className="ct-side">
          <div className="ct-info">
            <h2>Contact details</h2>
            <ul className="ct-list">
              <li>
                <Icon name="user" />
                <div><small>Proprietor</small><span>{CONTACT.proprietor}</span></div>
              </li>
              <li>
                <Icon name="pin" />
                <div>
                  <small>{CONTACT.company}</small>
                  {CONTACT.address.map((line) => <span key={line} className="ct-line">{line}</span>)}
                </div>
              </li>
              <li>
                <Icon name="phone" />
                <div><small>Phone</small><a href={`tel:${PHONE_TEL}`}>{CONTACT.phone}</a></div>
              </li>
              <li>
                <Icon name="mail" />
                <div><small>Email</small><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
              </li>
            </ul>
          </div>

          <div className="ct-check">
            <h3>For a quick quotation, include</h3>
            <ul>
              {CHECKLIST.map((c) => (
                <li key={c}><Icon name="check" />{c}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* MAP */}
      <section className="ct-wrap ct-mapsec" aria-labelledby="ct-map-title">
        <div className="ct-maphead">
          <div>
            <h2 id="ct-map-title">Find us</h2>
            <p>Bhosari, Pune: a key industrial hub with good connectivity, near MIDC Bhosari.</p>
          </div>
          <a className="ct-btn ct-btn--line" href={MAP_LINK} target="_blank" rel="noreferrer">
            Open in Google Maps <Icon name="arrow" />
          </a>
        </div>

        <div className="ct-map">
          {MAP_EMBED_SRC ? (
            <iframe
              title="Cosmosforge Engineering location"
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="ct-mapph">
              <Icon name="pin" />
              <b>Map will appear here</b>
              <small>Paste your Google Maps embed link into MAP_EMBED_SRC in Contact.jsx</small>
            </div>
          )}
          <div className="ct-mapcard">
            <b>{CONTACT.company}</b>
            {CONTACT.address.join(" ")}
          </div>
        </div>
      </section>
    </main>
  );
}