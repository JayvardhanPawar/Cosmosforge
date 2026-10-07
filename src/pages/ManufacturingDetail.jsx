import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import items from "../data/manufacturing.json";
import "./ProductDetail.css"; // shares the detail layout with the product page

const PHONE = "+91 9175689186";
const PHONE_DIGITS = PHONE.replace(/\D/g, "");

function Img({ src, name, className }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className={`${className} pd-img--empty`} role="img" aria-label={name}>
        <span>{name.charAt(0)}</span>
      </div>
    );
  }
  return <img className={className} src={src} alt={name} onError={() => setFailed(true)} />;
}

export default function ManufacturingDetail() {
  const { id } = useParams();
  const item = items.find((p) => p.id === id);

  useEffect(() => {
    document.title = item ? `${item.name} | Cosmosforge Engineering` : "Not found | Cosmosforge Engineering";
    window.scrollTo(0, 0);
  }, [item]);

  if (!item) {
    return (
      <main className="pd">
        <div className="pd-wrap pd-missing">
          <h1>We couldn't find that page</h1>
          <p>It may have been renamed or removed. Browse our work, or send us your drawing directly.</p>
          <Link to="/manufacturing" className="pd-btn pd-btn--dark">Back to manufacturing</Link>
          <Link to="/contact" className="pd-btn pd-btn--gold">Send your drawing</Link>
        </div>
      </main>
    );
  }

  const sameCategory = items.filter((p) => p.category === item.category);
  const related = sameCategory.filter((p) => p.id !== item.id).slice(0, 4);
  const pos = sameCategory.findIndex((p) => p.id === item.id);
  const prev = sameCategory[pos - 1];
  const next = sameCategory[pos + 1];

  const catLink = `/manufacturing?category=${encodeURIComponent(item.category)}`;
  const enquiry = `/contact?product=${encodeURIComponent(item.name)}`;
  const waText = encodeURIComponent(`Hello Cosmosforge Engineering, I would like a quotation for: ${item.name}. I can share the drawing or sample.`);
  const specs = item.specs ? Object.entries(item.specs) : [];

  return (
    <main className="pd">
      <div className="pd-wrap">
        <nav className="pd-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/manufacturing">Manufacturing</Link>
          <span aria-hidden="true">/</span>
          <Link to={catLink}>{item.category}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{item.name}</span>
        </nav>

        <section className="pd-main">
          <Img key={item.id} className="pd-hero" src={item.image} name={item.name} />

          <div className="pd-info">
            <Link className="pd-cat" to={catLink}>{item.category}</Link>
            <h1>{item.name}</h1>
            <p className="pd-desc">{item.description}</p>

            {item.processes?.length > 0 && (
              <div className="pd-sizes">
                <h2>Typical processes</h2>
                <ul>
                  {item.processes.map((p) => (
                    <li key={p}>
                      <Link to={`/manufacturing?process=${encodeURIComponent(p)}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {p}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pd-actions">
              <Link to={enquiry} className="pd-btn pd-btn--gold">Request a quote</Link>
              <a className="pd-btn pd-btn--wa" href={`https://wa.me/${PHONE_DIGITS}?text=${waText}`} target="_blank" rel="noreferrer">
                Share drawing on WhatsApp
              </a>
              <a className="pd-btn pd-btn--line" href={`tel:${PHONE.replace(/\s/g, "")}`}>Call {PHONE}</a>
            </div>

            <ul className="pd-points">
              <li>Made to your drawing or sample</li>
              <li>One-off parts and repeat batches</li>
              <li>Machining, fabrication and assembly under one roof</li>
            </ul>
          </div>
        </section>

        {specs.length > 0 && (
          <section className="pd-block">
            <h2>At a glance</h2>
            <table>
              <tbody>
                {specs.map(([k, v]) => (
                  <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <section className="pd-block pd-need">
          <h2>What to send us for a quotation</h2>
          <ul>
            <li>Drawing (PDF or CAD) or a sample</li>
            <li>Material and grade</li>
            <li>Quantity and delivery date</li>
            <li>Tolerance and surface finish</li>
          </ul>
        </section>

        {related.length > 0 && (
          <section className="pd-block">
            <h2>More in {item.category}</h2>
            <ul className="pd-related">
              {related.map((r) => (
                <li key={r.id}>
                  <Link to={`/manufacturing/${r.id}`}>
                    <Img key={r.id} className="pd-thumb" src={r.image} name={r.name} />
                    <span>{r.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav className="pd-pager" aria-label="Navigate examples">
          {prev ? <Link to={`/manufacturing/${prev.id}`}>Previous: {prev.name}</Link> : <span />}
          <Link to="/manufacturing">All manufacturing</Link>
          {next ? <Link to={`/manufacturing/${next.id}`}>Next: {next.name}</Link> : <span />}
        </nav>
      </div>
    </main>
  );
}