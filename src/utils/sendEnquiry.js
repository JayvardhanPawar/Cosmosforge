import emailjs from "@emailjs/browser";

/* EmailJS settings come from the .env file in the project root (see .env.example).
   Vite only exposes variables that start with VITE_ and you must restart
   "npm run dev" after changing .env. */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const emailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/* Sends one enquiry to the website owner.
   The keys below are the {{variables}} used in your EmailJS template. */
export async function sendEnquiry({ name, phone, email, company, type, message, source }) {
  if (!emailConfigured) {
    throw new Error("EmailJS is not configured. Check the .env file.");
  }

  const templateParams = {
    from_name: name,
    from_phone: phone,
    from_email: email || "Not provided",
    company: company || "Not provided",
    enquiry_type: type || "General enquiry",
    message,
    source: source || "Website",
    page_url: typeof window !== "undefined" ? window.location.href : "",
    reply_to: email || "",
    sent_at: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });
}