import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import products from "../data/trading.json";
import "./Trading.css";

const CATEGORIES = [...new Set(products.map((p) => p.category))];
const COUNTS = products.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {});

// "Die Casting Spare: Pins and Rods" -> "Pins and Rods"
// Works for any "Category: Product" name; names without a colon are left as is.
const shortName = (name = "") => {
  const i = name.indexOf(":");
  return i > -1 ? name.slice(i + 1).trim() : name;
};

function ProductImage({ src, name }) {
  const label = shortName(name);
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className="pimg pimg--empty" role="img" aria-label={label}>
        <span>{label.charAt(0)}</span>
      </div>
    );
  }
  return <img className="pimg" src={src} alt={label} loading="lazy" onError={() => setFailed(true)} />;
}

export default function Trading() {
  // filters live in the URL, so /trading?category=Bearings%20%26%20Transmission can be linked to
  const [params, setParams] = useSearchParams();
  const selected = params.getAll("category");
  const query = params.get("q") || "";
  const sort = params.get("sort") || "category";
  const [filtersOpen, setFiltersOpen] = useState(false);

  const update = (next) => {
    const p = new URLSearchParams();
    (next.category ?? selected).forEach((c) => p.append("category", c));
    const q = next.q ?? query;
    const s = next.sort ?? sort;
    if (q) p.set("q", q);
    if (s !== "category") p.set("sort", s);
    setParams(p, { replace: true });
  };

  const toggle = (cat) =>
    update({ category: selected.includes(cat) ? selected.filter((c) => c !== cat) : [...selected, cat] });

  const clear = () => setParams({}, { replace: true });

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    // search still matches the full name, category and description
    let list = products.filter(
      (p) =>
        (selected.length === 0 || selected.includes(p.category)) &&
        (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );
    // sort by the name people actually see
    if (sort === "az") list = [...list].sort((a, b) => shortName(a.name).localeCompare(shortName(b.name)));
    if (sort === "za") list = [...list].sort((a, b) => shortName(b.name).localeCompare(shortName(a.name)));
    return list;
  }, [selected.join("|"), query, sort]);

  const hasFilters = selected.length > 0 || query;

  return (
    <main className="trading">
      <header className="t-head">
        <div className="t-wrap">
          <h1>Industrial supplies</h1>
          <p>
            Fasteners, tools, abrasives, bearings, pneumatics, hydraulics, safety products and
            consumables, all from one supplier. Can't find what you need? Ask us, we will source it.
          </p>
        </div>
      </header>

      <div className="t-wrap t-layout">
        {/* FILTERS */}
        <aside className="filters">
          <button
            className="filters__toggle"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            Filters {selected.length > 0 && `(${selected.length})`}
          </button>

          <div className={`filters__body ${filtersOpen ? "is-open" : ""}`}>
            <label className="search">
              <span>Search products</span>
              <input
                type="search"
                value={query}
                placeholder="e.g. collet, bearing, gloves"
                onChange={(e) => update({ q: e.target.value })}
              />
            </label>

            <fieldset>
              <legend>Category</legend>
              {CATEGORIES.map((cat) => (
                <label key={cat} className="check">
                  <input type="checkbox" checked={selected.includes(cat)} onChange={() => toggle(cat)} />
                  <span>{cat}</span>
                  <em>{COUNTS[cat]}</em>
                </label>
              ))}
            </fieldset>

            {hasFilters && (
              <button className="clear" onClick={clear}>Clear all filters</button>
            )}
          </div>
        </aside>

        {/* RESULTS */}
        <section className="results" aria-live="polite">
          <div className="results__bar">
            <p>
              Showing <b>{results.length}</b> of {products.length} products
            </p>
            <label>
              Sort by
              <select value={sort} onChange={(e) => update({ sort: e.target.value })}>
                <option value="category">Category</option>
                <option value="az">Name A–Z</option>
                <option value="za">Name Z–A</option>
              </select>
            </label>
          </div>

          {selected.length > 0 && (
            <ul className="active">
              {selected.map((c) => (
                <li key={c}>
                  <button onClick={() => toggle(c)} aria-label={`Remove filter ${c}`}>{c} ×</button>
                </li>
              ))}
            </ul>
          )}

          {results.length === 0 ? (
            <div className="empty">
              <h2>No products match those filters</h2>
              <p>Try a different word, or clear the filters. We can also source items not listed here.</p>
              <button className="btn btn--dark" onClick={clear}>Clear filters</button>
              <Link to="/contact" className="btn btn--gold">Ask us to source it</Link>
            </div>
          ) : (
            <ul className="grid">
              {results.map((p) => (
                <li key={p.id} className="pcard">
                  <Link to={`/trading/${p.id}`} tabIndex={-1} aria-hidden="true">
                    <ProductImage src={p.image} name={p.name} />
                  </Link>
                  <div className="pcard__body">
                    <button className="pcard__cat" onClick={() => toggle(p.category)}>{p.category}</button>
                    <h3>
                      <Link to={`/trading/${p.id}`} className="pcard__name">{shortName(p.name)}</Link>
                    </h3>
                    {/* {p.description && <p>{p.description}</p>} */}
                    <Link to={`/trading/${p.id}`} className="pcard__enq">
                      View details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}