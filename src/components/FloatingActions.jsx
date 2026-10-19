import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sendEnquiry, emailConfigured } from "../utils/sendEnquiry";

const PHONE = "+91 9175689186";
const PHONE_DIGITS = PHONE.replace(/\D/g, "");
const EMAIL = "cosmosforge.engineering@gmail.com";

const ICONS = {
  whatsapp: "M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.3A8.4 8.4 0 1 1 21 11.5zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4.5 4.5 0 0 1-2-2l.8-1-1-2z",
  mail: "M3 5h18v14H3zM3 7l9 6 9-6",
  enquiry: "M4 4h16v12H9l-5 4zM8 9h8M8 12h5",
  close: "M6 6l12 12M18 6L6 18",
  arrow: "M5 12h14M13 6l6 6-6 6",
};
const Icon = ({ name }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={ICONS[name]} />
  </svg>
);

const CSS = `
.fa { position: fixed; right: 1rem; bottom: 1rem; z-index: 900; display: flex; flex-direction: column; align-items: flex-end; gap: 0.7rem; font-family: "Segoe UI", system-ui, sans-serif; }
.fa * { box-sizing: border-box; }

.fa-btn {
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem;
  height: 54px; min-width: 54px; padding: 0; border: 0; border-radius: 999px; cursor: pointer;
  color: #fff; font: inherit; font-weight: 700; text-decoration: none;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.3); transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.fa-btn svg { width: 26px; height: 26px; flex: none; }
.fa-btn:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 12px 26px rgba(0, 0, 0, 0.36); }
.fa-btn:focus-visible { outline: 3px solid #d9a440; outline-offset: 3px; }
.fa-btn--wa { background: #1f9d55; }
.fa-btn--wa:hover { background: #188045; }
.fa-btn--mail { background: #0f8f9c; }
.fa-btn--mail:hover { background: #0a6a74; }
.fa-btn--enq { background: #d9a440; color: #0b1a26; padding: 0 1.3rem 0 1.1rem; }
.fa-btn--enq:hover { background: #e8b652; }
.fa-btn--enq.is-open { background: #0b1a26; color: #fff; }

/* pulse ring on WhatsApp */
.fa-btn--wa::before {
  content: ""; position: absolute; inset: 0; border-radius: 999px; background: #1f9d55; z-index: -1;
  animation: fa-pulse 2.4s ease-out infinite;
}
@keyframes fa-pulse { 0% { transform: scale(1); opacity: 0.55; } 100% { transform: scale(1.7); opacity: 0; } }

/* hover label (desktop) */
.fa-label {
  position: absolute; right: calc(100% + 0.7rem); top: 50%; transform: translateY(-50%) translateX(6px);
  padding: 0.4rem 0.8rem; background: #0b1a26; color: #fff; font-size: 0.85rem; font-weight: 600; white-space: nowrap;
  border-radius: 4px; opacity: 0; pointer-events: none; transition: opacity 0.2s, transform 0.2s;
}
.fa-btn:hover .fa-label, .fa-btn:focus-visible .fa-label { opacity: 1; transform: translateY(-50%); }

/* enquiry panel */
.fa-backdrop { position: fixed; inset: 0; z-index: -1; background: rgba(11, 26, 38, 0.35); animation: fa-fade 0.2s ease; }
.fa-panel {
  width: min(360px, calc(100vw - 2rem)); padding: 1.3rem; background: #fff; color: #22333f;
  border-radius: 6px; border-top: 5px solid #d9a440; box-shadow: 0 20px 44px rgba(0, 0, 0, 0.35);
  transform-origin: bottom right; animation: fa-pop 0.25s ease;
}
@keyframes fa-pop { from { opacity: 0; transform: translateY(12px) scale(0.96); } to { opacity: 1; transform: none; } }
@keyframes fa-fade { from { opacity: 0; } to { opacity: 1; } }
.fa-panel-head { display: flex; justify-content: space-between; align-items: start; gap: 1rem; }
.fa-panel h2 { margin: 0; font-size: 1.2rem; font-weight: 800; color: #0b1a26; line-height: 1.2; }
.fa-panel-sub { margin: 0.3rem 0 0; font-size: 0.88rem; color: #5b707c; }
.fa-x { flex: none; width: 34px; height: 34px; display: grid; place-items: center; background: #eef4f6; color: #0b1a26; border: 0; border-radius: 50%; cursor: pointer; }
.fa-x svg { width: 18px; height: 18px; }
.fa-x:hover { background: #d5e0e4; }
.fa-x:focus-visible { outline: 3px solid #d9a440; outline-offset: 2px; }

.fa-form { display: grid; gap: 0.8rem; margin-top: 1rem; }
.fa-field { display: grid; gap: 0.3rem; }
.fa-field label { font-size: 0.85rem; font-weight: 700; color: #0b1a26; }
.fa-field input, .fa-field textarea {
  width: 100%; padding: 0.65rem 0.75rem; font: inherit; font-size: 0.95rem; color: #22333f;
  background: #f7fafb; border: 1px solid #b8c9cf; border-radius: 3px;
}
.fa-field textarea { min-height: 84px; resize: vertical; }
.fa-field input:focus, .fa-field textarea:focus { outline: none; background: #fff; border-color: #0f8f9c; box-shadow: 0 0 0 3px rgba(15, 143, 156, 0.18); }
.fa-send { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-top: 0.2rem; }
.fa-send button {
  padding: 0.75rem 0.5rem; font: inherit; font-size: 0.92rem; font-weight: 700; border: 0; border-radius: 3px; cursor: pointer; transition: background 0.2s;
}
.fa-send button:focus-visible { outline: 3px solid #d9a440; outline-offset: 2px; }
.fa-send .wa { background: #1f9d55; color: #fff; }
.fa-send .wa:hover { background: #188045; }
.fa-send .em { background: #d9a440; color: #0b1a26; }
.fa-send .em:hover { background: #e8b652; }
.fa-hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.fa-send button:disabled { opacity: 0.7; cursor: wait; }
.fa-msg { margin: 0; padding: 0.7rem 0.8rem; font-size: 0.88rem; border-radius: 3px; }
.fa-msg b { display: block; }
.fa-msg--ok { background: #e8f6ee; border-left: 4px solid #1f9d55; color: #14532d; }
.fa-msg--err { background: #fdecea; border-left: 4px solid #c0392b; color: #7a1f16; }
.fa-full { display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.9rem; font-size: 0.88rem; font-weight: 700; color: #0a6a74; text-decoration: none; }
.fa-full svg { width: 15px; height: 15px; }
.fa-full:hover { text-decoration: underline; }

@media (max-width: 760px) {
  .fa { right: 0.8rem; bottom: 0.8rem; }
  .fa-btn { height: 52px; min-width: 52px; }
  .fa-label { display: none; }
  .fa-btn--enq { padding: 0 1.1rem 0 0.9rem; }
}
@media (prefers-reduced-motion: reduce) {
  .fa-btn, .fa-label { transition: none; }
  .fa-btn:hover { transform: none; }
  .fa-btn--wa::before, .fa-panel, .fa-backdrop { animation: none; }
}
`;

export default function FloatingActions() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [honey, setHoney] = useState(""); // spam trap
  const formRef = useRef(null);
  const firstField = useRef(null);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  // close the panel when the page changes, and on Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => { if (!open) setStatus("idle"); }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    firstField.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const text = () =>
    `Hello Cosmosforge Engineering,\nName: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`;

  const valid = () => formRef.current?.reportValidity();

  // main action: sends the enquiry to the owner's inbox through EmailJS
  const submit = async () => {
    if (!valid() || honey) return;
    setStatus("sending");
    try {
      await sendEnquiry({ ...form, email: "", company: "", type: "Quick enquiry", source: `Quick enquiry button (${pathname})` });
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      console.error("Enquiry could not be sent:", err);
      setStatus("error");
    }
  };

  // alternative: send the same details on WhatsApp
  const sendWhatsApp = () => {
    if (!valid()) return;
    window.open(`https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(text())}`, "_blank", "noopener");
  };

  const onContactPage = pathname === "/contact";

  return (
    <div className="fa">
      <style>{CSS}</style>

      {open && <div className="fa-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}

      {open && (
        <div className="fa-panel" role="dialog" aria-modal="false" aria-labelledby="fa-title">
          <div className="fa-panel-head">
            <div>
              <h2 id="fa-title">Quick enquiry</h2>
              <p className="fa-panel-sub">Tell us what you need and we will get back to you.</p>
            </div>
            <button type="button" className="fa-x" onClick={() => setOpen(false)} aria-label="Close enquiry form">
              <Icon name="close" />
            </button>
          </div>

          <form className="fa-form" ref={formRef} onSubmit={(e) => e.preventDefault()}>
            <div className="fa-field">
              <label htmlFor="fa-name">Your name</label>
              <input id="fa-name" ref={firstField} required value={form.name} onChange={set("name")} autoComplete="name" />
            </div>
            <div className="fa-field">
              <label htmlFor="fa-phone">Phone</label>
              <input id="fa-phone" required type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
            </div>
            <div className="fa-field">
              <label htmlFor="fa-msg">What do you need?</label>
              <textarea id="fa-msg" required value={form.message} onChange={set("message")} placeholder="Part or product, quantity, drawing or sample available?" />
            </div>
            <div className="fa-hp" aria-hidden="true">
              <label htmlFor="fa-website">Leave this empty</label>
              <input id="fa-website" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
            </div>
            <div className="fa-send">
              <button type="button" className="em" onClick={submit} disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send enquiry"}
              </button>
              <button type="button" className="wa" onClick={sendWhatsApp}>WhatsApp</button>
            </div>
            {status === "success" && (
              <p className="fa-msg fa-msg--ok" role="status"><b>Thank you.</b> Your enquiry has been sent. We will contact you soon.</p>
            )}
            {status === "error" && (
              <p className="fa-msg fa-msg--err" role="alert">
                <b>Sorry, it could not be sent.</b>{" "}
                {emailConfigured ? "Please try again, or use WhatsApp." : "Online sending is not set up yet. Please use WhatsApp."}
              </p>
            )}
          </form>

          <Link to="/contact" className="fa-full">Open the full enquiry form <Icon name="arrow" /></Link>
        </div>
      )}

      <a
        className="fa-btn fa-btn--wa"
        href={`https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent("Hello Cosmosforge Engineering, I would like to make an enquiry.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <Icon name="whatsapp" />
        <span className="fa-label">WhatsApp us</span>
      </a>

      <a className="fa-btn fa-btn--mail" href={`mailto:${EMAIL}`} aria-label={`Email us at ${EMAIL}`}>
        <Icon name="mail" />
        <span className="fa-label">Email us</span>
      </a>

      {!onContactPage && (
        <button
          type="button"
          className={`fa-btn fa-btn--enq ${open ? "is-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close enquiry form" : "Open quick enquiry form"}
        >
          <Icon name={open ? "close" : "enquiry"} />
          <span>{open ? "Close" : "Enquiry"}</span>
        </button>
      )}
    </div>
  );
}