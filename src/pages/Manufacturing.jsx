import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import items from "../data/manufacturing.json";
import "./Trading.css"; // shares the listing layout with the Trading page

const CATEGORIES = [...new Set(items.map((p) => p.category))];
const PROCESSES = [...new Set(items.flatMap((p) => p.processes || []))].sort();
const countBy = (key) =>
  items.reduce((acc, p) => {
    [].concat(p[key]).forEach((v) => (acc[v] = (acc[v] || 0) + 1));
    return acc;
  }, {});
const CAT_COUNTS = countBy("category");
const PROC_COUNTS = countBy("processes");

// "Die Casting Spare: Pins and Rods" -> "Pins and Rods"
// Works for any "Category: Item" name; names without a colon are left as is.
const shortName = (name = "") => {
  const i = name.indexOf(":");
  return i > -1 ? name.slice(i + 1).trim() : name;
};

function ItemImage({ src, name }) {
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

export default function Manufacturing() {
  const [params, setParams] = useSearchParams();
  const cats = params.getAll("category");
  const procs = params.getAll("process");
  const query = params.get("q") || "";
  const sort = params.get("sort") || "category";
  const [filtersOpen, setFiltersOpen] = useState(false);

  const update = (next) => {
    const p = new URLSearchParams();
    (next.category ?? cats).forEach((c) => p.append("category", c));
    (next.process ?? procs).forEach((c) => p.append("process", c));
    const q = next.q ?? query;
    const s = next.sort ?? sort;
    if (q) p.set("q", q);
    if (s !== "category") p.set("sort", s);
    setParams(p, { replace: true });
  };
  const toggle = (list, value) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  const clear = () => setParams({}, { replace: true });

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    // search still matches the full name, category and description
    let list = items.filter(
      (p) =>
        (cats.length === 0 || cats.includes(p.category)) &&
        (procs.length === 0 || procs.some((x) => (p.processes || []).includes(x))) &&
        (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );
    // sort by the name people actually see
    if (sort === "az") list = [...list].sort((a, b) => shortName(a.name).localeCompare(shortName(b.name)));
    if (sort === "za") list = [...list].sort((a, b) => shortName(b.name).localeCompare(shortName(a.name)));
    return list;
  }, [cats.join("|"), procs.join("|"), query, sort]);

  const activeCount = cats.length + procs.length;

  return (
    <main className="trading">
      <header className="t-head">
        <div className="t-wrap">
          <h1>Manufacturing</h1>
          <p>
            Precision parts, assemblies, fixtures, moulds and spares, made to your drawing or sample.
            Browse examples of our work, then send us your own requirement.
          </p>
        </div>
      </header>

      <div className="t-wrap t-layout">
        <aside className="filters">
          <button className="filters__toggle" aria-expanded={filtersOpen} onClick={() => setFiltersOpen(!filtersOpen)}>
            Filters {activeCount > 0 && `(${activeCount})`}
          </button>

          <div className={`filters__body ${filtersOpen ? "is-open" : ""}`}>
            <label className="search">
              <span>Search our work</span>
              <input
                type="search"
                value={query}
                placeholder="e.g. flange, fixture, shaft"
                onChange={(e) => update({ q: e.target.value })}
              />
            </label>

            <fieldset>
              <legend>Type of work</legend>
              {CATEGORIES.map((c) => (
                <label key={c} className="check">
                  <input type="checkbox" checked={cats.includes(c)} onChange={() => update({ category: toggle(cats, c) })} />
                  <span>{c}</span>
                  <em>{CAT_COUNTS[c]}</em>
                </label>
              ))}
            </fieldset>

            <fieldset>
              <legend>Process</legend>
              {PROCESSES.map((c) => (
                <label key={c} className="check">
                  <input type="checkbox" checked={procs.includes(c)} onChange={() => update({ process: toggle(procs, c) })} />
                  <span>{c}</span>
                  <em>{PROC_COUNTS[c]}</em>
                </label>
              ))}
            </fieldset>

            {(activeCount > 0 || query) && <button className="clear" onClick={clear}>Clear all filters</button>}
          </div>
        </aside>

        <section className="results" aria-live="polite">
          <div className="results__bar">
            <p>Showing <b>{results.length}</b> of {items.length} examples</p>
            <label>
              Sort by
              <select value={sort} onChange={(e) => update({ sort: e.target.value })}>
                <option value="category">Type of work</option>
                <option value="az">Name A–Z</option>
                <option value="za">Name Z–A</option>
              </select>
            </label>
          </div>

          {activeCount > 0 && (
            <ul className="active">
              {cats.map((c) => (
                <li key={"c" + c}><button onClick={() => update({ category: toggle(cats, c) })} aria-label={`Remove filter ${c}`}>{c} ×</button></li>
              ))}
              {procs.map((c) => (
                <li key={"p" + c}><button onClick={() => update({ process: toggle(procs, c) })} aria-label={`Remove filter ${c}`}>{c} ×</button></li>
              ))}
            </ul>
          )}

          {results.length === 0 ? (
            <div className="empty">
              <h2>No examples match those filters</h2>
              <p>Try fewer filters. Even if you don't see your part here, send us the drawing and we will tell you if we can make it.</p>
              <button className="btn btn--dark" onClick={clear}>Clear filters</button>
              <Link to="/contact" className="btn btn--gold">Send your drawing</Link>
            </div>
          ) : (
            <ul className="grid">
              {results.map((p) => (
                <li key={p.id} className="pcard">
                  <Link to={`/manufacturing/${p.id}`} tabIndex={-1} aria-hidden="true">
                    <ItemImage src={p.image} name={p.name} />
                  </Link>
                  <div className="pcard__body">
                    <button className="pcard__cat" onClick={() => update({ category: toggle(cats, p.category) })}>{p.category}</button>
                    <h3>
                      <Link to={`/manufacturing/${p.id}`} className="pcard__name">{shortName(p.name)}</Link>
                    </h3>
                    <Link to={`/manufacturing/${p.id}`} className="pcard__enq">View details</Link>
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