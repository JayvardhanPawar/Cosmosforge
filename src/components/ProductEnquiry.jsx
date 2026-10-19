import { useState } from "react";
import { sendEnquiry, emailConfigured } from "../utils/sendEnquiry";

const PHONE = "+91 9175689186";
const OWNER_EMAIL = "cosmosforge.engineering@gmail.com";

const TYPE_BY_KIND = {
  product: "Trading – tools, fasteners or consumables",
  manufacturing: "Manufacturing – part to drawing or sample",
};

const CSS = `
.pe {
  --ink: #0b1a26; --teal: #0f8f9c; --teal-dk: #0a6a74; --gold: #d9a440; --tint: #eef4f6; --line: #d5e0e4;
  scroll-margin-top: 100px; margin-top: 3rem; padding: clamp(1.4rem, 3.5vw, 2.4rem);
  display: grid; grid-template-columns: 0.85fr 1.4fr; gap: clamp(1.5rem, 4vw, 3rem); align-items: start;
  background: var(--tint); border-left: 5px solid var(--teal); border-radius: 4px;
  font-family: "Segoe UI", system-ui, sans-serif; color: #22333f; line-height: 1.6;
}
.pe * { box-sizing: border-box; }
.pe h2 { margin: 0; color: var(--ink); font-size: 1.5rem; font-weight: 800; line-height: 1.15; }
.pe-sub { margin: 0.6rem 0 0; }
.pe-product { display: inline-block; margin-top: 1rem; padding: 0.4rem 0.9rem; background: var(--ink); color: #fff; font-weight: 700; font-size: 0.92rem; border-radius: 3px; }
.pe-product small { color: var(--gold); font-weight: 700; margin-right: 0.4rem; }
.pe-list { list-style: none; padding: 0; margin: 1.3rem 0 0; display: grid; gap: 0.6rem; }
.pe-list li { display: flex; gap: 0.7rem; align-items: center; font-weight: 600; color: var(--ink); }
.pe-list svg { flex: none; width: 22px; height: 22px; padding: 3px; border-radius: 50%; background: var(--teal); color: #fff; }
.pe-call { margin: 1.3rem 0 0; font-size: 0.95rem; }
.pe-call a { color: var(--teal-dk); font-weight: 700; }

.pe-form { padding: clamp(1.3rem, 3vw, 1.8rem); background: #fff; border: 1px solid var(--line); border-top: 4px solid var(--gold); border-radius: 4px; box-shadow: 0 8px 22px rgba(11, 26, 38, 0.07); }
.pe-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.pe-field { display: grid; gap: 0.35rem; align-content: start; }
.pe-field--full { grid-column: 1 / -1; }
.pe-field label { font-size: 0.9rem; font-weight: 700; color: var(--ink); }
.pe-field label i { font-style: normal; color: #c0392b; margin-left: 0.15rem; }
.pe-field input, .pe-field textarea {
  width: 100%; min-height: 46px; padding: 0.65rem 0.85rem; font: inherit; color: #22333f;
  background: #f7fafb; border: 1px solid #b8c9cf; border-radius: 3px; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.pe-field textarea { min-height: 100px; resize: vertical; }
.pe-field input:hover, .pe-field textarea:hover { border-color: var(--teal); }
.pe-field input:focus, .pe-field textarea:focus { outline: none; background: #fff; border-color: var(--teal); box-shadow: 0 0 0 3px rgba(15, 143, 156, 0.18); }
.pe-hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }

.pe-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 0.8rem 1.2rem; margin-top: 1.3rem; }
.pe-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 0.9rem 1.6rem; font: inherit; font-weight: 700;
  background: var(--gold); color: var(--ink); border: 2px solid transparent; border-radius: 3px; cursor: pointer; transition: background 0.2s, transform 0.2s;
}
.pe-btn:hover { background: #e8b652; transform: translateY(-2px); }
.pe-btn:disabled { opacity: 0.75; cursor: wait; transform: none; }
.pe-btn:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }
.pe-note { margin: 0; flex: 1; min-width: 200px; font-size: 0.85rem; color: #5b707c; }
.pe-spin { width: 16px; height: 16px; border: 3px solid rgba(11, 26, 38, 0.3); border-top-color: var(--ink); border-radius: 50%; animation: pe-rot 0.7s linear infinite; }
@keyframes pe-rot { to { transform: rotate(360deg); } }

.pe-msg { margin-top: 1.1rem; padding: 0.9rem 1.1rem; border-radius: 3px; }
.pe-msg b { display: block; }
.pe-msg--ok { background: #e8f6ee; border-left: 5px solid #1f9d55; color: #14532d; }
.pe-msg--err { background: #fdecea; border-left: 5px solid #c0392b; color: #7a1f16; }
.pe-link { padding: 0; background: none; border: 0; font: inherit; font-weight: 700; color: inherit; text-decoration: underline; cursor: pointer; }

@media (max-width: 860px) { .pe { grid-template-columns: 1fr; } }
@media (max-width: 520px) { .pe-grid { grid-template-columns: 1fr; } .pe-btn { width: 100%; } }
@media (prefers-reduced-motion: reduce) { .pe-btn, .pe-spin { transition: none; animation: none; } .pe-btn:hover { transform: none; } }
`;

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/* Props
   productName : name of the product or part being enquired about
   kind        : "product" (trading) or "manufacturing"
   title       : heading text
   checklist   : list of "what to tell us" lines shown on the left */
export default function ProductEnquiry({ productName, kind = "product", title = "Request a quotation", checklist = [] }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", quantity: "", details: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [honey, setHoney] = useState(""); // spam trap
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const buildMessage = () =>
    [`Product / part: ${productName}`, `Quantity: ${form.quantity || "Not stated"}`, "", form.details || "(No extra details)"].join("\n");

  const submit = async (e) => {
    e.preventDefault();
    if (honey) return;
    setStatus("sending");
    try {
      await sendEnquiry({
        name: form.name,
        phone: form.phone,
        email: form.email,
        company: "",
        type: TYPE_BY_KIND[kind] || "General enquiry",
        message: buildMessage(),
        source: `${kind === "product" ? "Product" : "Manufacturing"} page: ${productName}`,
      });
      setStatus("success");
      setForm({ name: "", phone: "", email: "", quantity: "", details: "" });
    } catch (err) {
      console.error("Enquiry could not be sent:", err);
      setStatus("error");
    }
  };

  // if sending fails, let the visitor use their own email app
  const mailtoFallback = () => {
    const body = [`Name: ${form.name}`, `Phone: ${form.phone}`, `Email: ${form.email}`, "", buildMessage()].join("\n");
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent("Enquiry: " + productName)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="pe" id="quote" aria-labelledby="pe-title">
      <style>{CSS}</style>

      <div>
        <h2 id="pe-title">{title}</h2>
        <p className="pe-sub">Fill in the form and we will reply with a quotation.</p>
        <span className="pe-product"><small>For</small>{productName}</span>

        {checklist.length > 0 && (
          <ul className="pe-list">
            {checklist.map((c) => <li key={c}><Check />{c}</li>)}
          </ul>
        )}
        <p className="pe-call">Prefer to talk? Call <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a></p>
      </div>

      <form className="pe-form" onSubmit={submit}>
        <div className="pe-grid">
          <div className="pe-field">
            <label htmlFor="pe-name">Your name<i>*</i></label>
            <input id="pe-name" required value={form.name} onChange={set("name")} autoComplete="name" />
          </div>
          <div className="pe-field">
            <label htmlFor="pe-phone">Phone<i>*</i></label>
            <input id="pe-phone" required type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
          </div>
          <div className="pe-field">
            <label htmlFor="pe-email">Email</label>
            <input id="pe-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" />
          </div>
          <div className="pe-field">
            <label htmlFor="pe-qty">Quantity needed</label>
            <input id="pe-qty" value={form.quantity} onChange={set("quantity")} placeholder="e.g. 50 pieces" />
          </div>
          <div className="pe-field pe-field--full">
            <label htmlFor="pe-details">Details</label>
            <textarea id="pe-details" value={form.details} onChange={set("details")} placeholder="Size, material or grade, drawing or sample available, delivery date..." />
          </div>
        </div>

        <div className="pe-hp" aria-hidden="true">
          <label htmlFor="pe-website">Leave this empty</label>
          <input id="pe-website" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
        </div>

        <div className="pe-actions">
          <button type="submit" className="pe-btn" disabled={status === "sending"}>
            {status === "sending" ? (<><span className="pe-spin" aria-hidden="true" /> Sending...</>) : "Send enquiry"}
          </button>
          <p className="pe-note">The product name is included automatically.</p>
        </div>

        {status === "success" && (
          <div className="pe-msg pe-msg--ok" role="status">
            <b>Thank you. Your enquiry has been sent.</b>
            We will contact you soon. For anything urgent, call {PHONE}.
          </div>
        )}
        {status === "error" && (
          <div className="pe-msg pe-msg--err" role="alert">
            <b>Sorry, we could not send your enquiry.</b>
            {emailConfigured ? "Please check your connection and try again, or " : "Online sending is not set up yet, so "}
            <button type="button" className="pe-link" onClick={mailtoFallback}>send it with your email app</button>
            {" "}or call {PHONE}.
          </div>
        )}
      </form>
    </section>
  );
}