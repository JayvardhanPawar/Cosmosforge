import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../data/trading.json";
import ProductEnquiry from "../components/ProductEnquiry";
import "./ProductDetail.css";

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

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  useEffect(() => {
    document.title = product ? `${product.name} | Cosmosforge Engineering` : "Product not found | Cosmosforge Engineering";
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <main className="pd">
        <div className="pd-wrap pd-missing">
          <h1>We couldn't find that product</h1>
          <p>It may have been renamed or removed. Browse the full list or ask us to source it.</p>
          <Link to="/trading" className="pd-btn pd-btn--dark">Back to all products</Link>
          <Link to="/contact" className="pd-btn pd-btn--gold">Ask us to source it</Link>
        </div>
      </main>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const sameCategory = products.filter((p) => p.category === product.category);
  const pos = sameCategory.findIndex((p) => p.id === product.id);
  const prev = sameCategory[pos - 1];
  const next = sameCategory[pos + 1];

  const waText = encodeURIComponent(`Hello Cosmosforge Engineering, I would like a quotation for: ${product.name}.`);

  const goToForm = (e) => {
    e.preventDefault();
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  const specs = product.specs ? Object.entries(product.specs) : [];

  return (
    <main className="pd">
      <div className="pd-wrap">
        <nav className="pd-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/trading">Trading</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/trading?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <section className="pd-main">
          <Img key={product.id} className="pd-hero" src={product.image} name={product.name} />

          <div className="pd-info">
            <Link className="pd-cat" to={`/trading?category=${encodeURIComponent(product.category)}`}>
              {product.category}
            </Link>
            <h1>{product.name}</h1>

            <p className="pd-desc">
              {product.description ||
                `We supply ${product.name.toLowerCase()} for maintenance, production and general engineering use. Tell us the size, grade and quantity you need and we will send a quotation.`}
            </p>

            {Array.isArray(product.sizes) && product.sizes.length > 0 && (
              <div className="pd-sizes">
                <h2>Available sizes</h2>
                <ul>{product.sizes.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            )}

            <div className="pd-actions">
              <a href="#quote" onClick={goToForm} className="pd-btn pd-btn--gold">Request a quote</a>
              <a className="pd-btn pd-btn--wa" href={`https://wa.me/${PHONE_DIGITS}?text=${waText}`} target="_blank" rel="noreferrer">
                WhatsApp us
              </a>
              <a className="pd-btn pd-btn--line" href={`tel:${PHONE.replace(/\s/g, "")}`}>Call {PHONE}</a>
            </div>

            <ul className="pd-points">
              <li>Quotation on request, with pricing based on size, grade and quantity</li>
              <li>Small and bulk quantities</li>
              <li>Help choosing the right product for your application</li>
            </ul>
          </div>
        </section>

        {specs.length > 0 && (
          <section className="pd-block">
            <h2>Specifications</h2>
            <table>
              <tbody>
                {specs.map(([k, v]) => (
                  <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <ProductEnquiry
          key={product.id}
          productName={product.name}
          kind="product"
          title="Request a quotation"
          checklist={[
            "Size or specification",
            "Material or grade",
            "Quantity needed",
            "Brand preference, if any",
          ]}
        />

        {related.length > 0 && (
          <section className="pd-block">
            <h2>More in {product.category}</h2>
            <ul className="pd-related">
              {related.map((r) => (
                <li key={r.id}>
                  <Link to={`/trading/${r.id}`}>
                    <Img className="pd-thumb" src={r.image} name={r.name} />
                    <span>{r.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav className="pd-pager" aria-label="Product navigation">
          {prev ? <Link to={`/trading/${prev.id}`}>Previous: {prev.name}</Link> : <span />}
          <Link to="/trading">All products</Link>
          {next ? <Link to={`/trading/${next.id}`}>Next: {next.name}</Link> : <span />}
        </nav>
      </div>
    </main>
  );
}