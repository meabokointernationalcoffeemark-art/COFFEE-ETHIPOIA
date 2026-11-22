import { useMemo, useState } from 'react';

const EMAIL = import.meta.env.VITE_INQUIRY_EMAIL || 'meaboko11@gmail.com';
const WHATSAPP = 'https://wa.me/251926133289';
const TELEGRAM = 'https://t.me/coffeemarketet';

const products = [
  { id: 1, name: 'Sidama Washed Arabica', origin: 'Sidama', region: 'Southern Ethiopia', form: 'Green beans', market: 'Export', process: 'Washed', grade: 'Grade 1', notes: 'Floral · citrus · tea-like', unit: 'Inquiry for price', image: 'photo-1445116572660-236099ec97a0', description: 'A sample listing for a washed coffee from Sidama. Confirm crop year, lot size, cup score, documents and availability with the supplier.' },
  { id: 2, name: 'Guji Natural Arabica', origin: 'Guji', region: 'Oromia, Ethiopia', form: 'Green beans', market: 'Export', process: 'Natural', grade: 'Grade 1', notes: 'Blueberry · cocoa · red fruit', unit: 'Inquiry for price', image: 'photo-1442512595331-e89e73853f31', description: 'A sample listing representing natural processed Guji coffee. Actual lot specifications and stock must be verified.' },
  { id: 3, name: 'Yirgacheffe Washed', origin: 'Yirgacheffe', region: 'Gedeo, Ethiopia', form: 'Green beans', market: 'Export', process: 'Washed', grade: 'Grade 1', notes: 'Lemon · jasmine · bergamot', unit: 'Inquiry for price', image: 'photo-1495474472287-4d71bcdd2085', description: 'A sample listing for a classic washed Yirgacheffe profile. Contact MEA-BOKO to request current offers.' },
  { id: 4, name: 'Limu Coffee', origin: 'Limu', region: 'Southwest Ethiopia', form: 'Green beans', market: 'Export', process: 'Washed', grade: 'Grade 2', notes: 'Citrus · caramel · soft spice', unit: 'Inquiry for price', image: 'photo-1511537190424-bbbab87ac5eb', description: 'A sample listing for Limu coffee. Confirm grade, processing details and shipment readiness before purchase.' },
  { id: 5, name: 'Harar Natural', origin: 'Harar', region: 'Eastern Ethiopia', form: 'Green beans', market: 'Export', process: 'Natural', grade: 'Grade 4', notes: 'Mocca · dried fruit · warm spice', unit: 'Inquiry for price', image: 'photo-1501339847302-ac426a4a7cbb', description: 'A sample listing for naturally processed Harar coffee. Lot availability is not live.' },
  { id: 6, name: 'MEA-BOKO House Roast', origin: 'Ethiopian blend', region: 'Roasted in Ethiopia', form: 'Roasted beans', market: 'Domestic', process: 'Medium roast', grade: 'Specialty', notes: 'Chocolate · caramel · balanced', unit: 'Ask for retail / wholesale price', image: 'photo-1559525839-b184a4d698c7', description: 'A sample roasted-coffee product concept. Pack sizes, roast date, price and availability need confirmation.' },
  { id: 7, name: 'Guji Espresso Roast', origin: 'Guji', region: 'Oromia, Ethiopia', form: 'Ground coffee', market: 'Domestic', process: 'Dark roast', grade: 'Specialty', notes: 'Cocoa · ripe fruit · rich body', unit: 'Ask for retail / wholesale price', image: 'photo-1447933601403-0c6688de566e', description: 'A sample ground-coffee product concept for domestic cafes and households. Confirm grind size and packaging.' },
  { id: 8, name: 'Sidama Filter Roast', origin: 'Sidama', region: 'Southern Ethiopia', form: 'Roasted beans', market: 'Domestic', process: 'Light roast', grade: 'Specialty', notes: 'Floral · peach · citrus', unit: 'Ask for retail / wholesale price', image: 'photo-1509042239860-f550ce710b93', description: 'A sample filter-roast concept. Roast profile, pack size, stock and price are subject to confirmation.' },
];

const origins = ['All origins', 'Sidama', 'Guji', 'Yirgacheffe', 'Limu', 'Harar'];
const markets = ['All markets', 'Domestic', 'Export'];

function Brand() {
  return <a className="brand" href="#home" aria-label="MEA-BOKO home"><span className="brand-mark">M</span><span className="brand-copy"><strong>MEA-BOKO</strong><small>ETHIO COFFEE MARKETPLACE</small></span></a>;
}

function ProductCard({ item, onDetails }) {
  return <article className="market-card">
    <div className="market-card-image" style={{ backgroundImage: `url(https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=900&q=85)` }}>
      <span className="market-pill">{item.form}</span><span className="market-market-tag">{item.market}</span>
    </div>
    <div className="market-card-body">
      <div className="market-card-meta">{item.origin} · {item.region}</div>
      <h3>{item.name}</h3>
      <p className="market-notes">{item.notes}</p>
      <div className="market-specs"><span><b>PROCESS</b>{item.process}</span><span><b>GRADE</b>{item.grade}</span></div>
      <div className="market-card-bottom"><span>{item.unit}</span><button onClick={() => onDetails(item)}>View details ↗</button></div>
    </div>
  </article>;
}

export default function App() {
  const [market, setMarket] = useState('All markets');
  const [form, setForm] = useState('All products');
  const [origin, setOrigin] = useState('All origins');
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('EN');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState('');

  const filtered = useMemo(() => products.filter((p) => {
    const q = query.trim().toLowerCase();
    return (market === 'All markets' || p.market === market)
      && (form === 'All products' || p.form === form)
      && (origin === 'All origins' || p.origin === origin)
      && (!q || [p.name, p.origin, p.region, p.form, p.market, p.process, p.notes].join(' ').toLowerCase().includes(q));
  }), [market, form, origin, query]);

  function inquire(item) {
    const subject = encodeURIComponent(`MEA-BOKO coffee marketplace inquiry — ${item?.name || 'General inquiry'}`);
    const body = encodeURIComponent(`Hello MEA-BOKO team,\n\nI am interested in: ${item?.name || 'Your coffee marketplace'}.\nMarket: ${item?.market || 'Please advise'}\nProduct type: ${item?.form || 'Please advise'}\n\nPlease share current availability, specifications, pricing, minimum order quantity, and next steps.\n\nThank you.`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  function submitSeller(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent('MEA-BOKO supplier / exporter registration interest');
    const body = encodeURIComponent([...data.entries()].map(([key, value]) => `${key}: ${value}`).join('\n'));
    setNotice('Your email application is opening. This starter does not save registrations online.');
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return <>
    <div className="market-topline">ETHIOPIAN COFFEE TO THE WORLD <span>•</span> FROM FARM TO GLOBAL MARKET</div>
    <header className="site-header market-header" id="home"><div className="nav-wrap"><Brand />
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '✕' : '☰'}</button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} onClick={() => setMenuOpen(false)}>
        <a href="#market">Marketplace</a><a href="#how">How it works</a><a href="#suppliers">For suppliers</a><a href="#contact">Contact</a>
        <a className="nav-cta" href="#suppliers">Join the marketplace ↗</a>
      </nav>
    </div></header>

    <main>
      <section className="market-hero">
        <div className="market-hero-photo" />
        <div className="market-hero-content">
          <p className="market-kicker"><span /> THE HOME OF ETHIOPIAN COFFEE</p>
          <h1>Discover coffee.<br /><em>Connect markets.</em></h1>
          <p>One marketplace for Ethiopian green coffee, roasted coffee, producers, buyers, exporters and importers.</p>
          <div className="market-hero-actions"><a className="button button-light" href="#market">Explore marketplace ↓</a><a className="market-outline-link" href="#suppliers">Register as a supplier ↗</a></div>
          <div className="market-hero-caption">SIDAMA · GUJI · YIRGACHEFFE · LIMU · HARAR</div>
        </div>
      </section>

      <section className="market-intro section-pad">
        <div><p className="eyebrow">ONE DIGITAL COFFEE TRADE HUB</p><h2>From Ethiopian origins<br />to <em>global opportunity.</em></h2></div>
        <p>MEA-BOKO brings domestic and international coffee trade into one place. Explore green beans for wholesale and export, discover roasted coffee for local markets, and connect directly with suppliers and buyers.</p>
      </section>

      <section className="marketplace-section section-pad" id="market">
        <div className="section-label"><span>01 / MARKETPLACE</span><span>GREEN COFFEE · ROASTED COFFEE · TRADE</span></div>
        <div className="market-title-row"><div><h2>Find your <em>coffee.</em></h2><p>Browse sample product categories and send an inquiry to our team.</p></div><span className="market-count">{filtered.length} SAMPLE LISTINGS</span></div>
        <div className="market-controls">
          <div className="market-filter-line"><span className="filter-label">MARKET</span>{markets.map(x => <button key={x} className={market === x ? 'filter-chip active' : 'filter-chip'} onClick={() => setMarket(x)}>{x}</button>)}</div>
          <div className="market-filter-line"><span className="filter-label">PRODUCT</span>{['All products', 'Green beans', 'Roasted beans', 'Ground coffee'].map(x => <button key={x} className={form === x ? 'filter-chip active' : 'filter-chip'} onClick={() => setForm(x)}>{x}</button>)}</div>
          <div className="market-search-row"><label className="search-box"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search coffee, origin, tasting notes…" aria-label="Search marketplace" /></label><select value={origin} onChange={e => setOrigin(e.target.value)} aria-label="Filter by origin">{origins.map(x => <option key={x}>{x}</option>)}</select></div>
        </div>
        <div className="market-grid">{filtered.map(item => <ProductCard key={item.id} item={item} onDetails={setSelected} />)}</div>
        {filtered.length === 0 && <div className="empty-state">No listings match your filters. Change the search or select another market.</div>}
        <p className="market-disclaimer">Important: These are demonstration listings, not confirmed inventory or offers for sale. Prices, stock, grades, crop years, certifications, minimum order quantities and export readiness must be confirmed directly with MEA-BOKO and the relevant supplier.</p>
      </section>

      <section className="trade-path-section" id="how"><div className="section-pad"><div className="section-label"><span>02 / HOW IT WORKS</span><span>A SIMPLE WAY TO START TRADE</span></div><h2>One hub. <em>Four steps.</em></h2><div className="trade-steps">
        <div><b>01</b><h3>Explore</h3><p>Browse origins, green coffee, roasted products and market categories.</p></div>
        <div><b>02</b><h3>Connect</h3><p>Send your product inquiry or tell us what you want to buy or sell.</p></div>
        <div><b>03</b><h3>Verify</h3><p>Confirm supplier identity, samples, specifications, documents, price and terms.</p></div>
        <div><b>04</b><h3>Trade</h3><p>Agree on payment, delivery, export and shipping arrangements with the parties.</p></div>
      </div></div></section>

      <section className="supplier-section" id="suppliers"><div className="supplier-photo" /><div className="supplier-content"><p className="eyebrow">03 / GROW WITH MEA-BOKO</p><h2>Are you a coffee<br /><em>supplier or exporter?</em></h2><p>We welcome Ethiopian coffee farmers, cooperatives, washing stations, processors, roasters, exporters and import partners. Introduce your business and the coffee you can supply.</p>
        <div className="supplier-benefits"><span>✓ Supplier profile interest</span><span>✓ Green and roasted coffee</span><span>✓ Domestic and export inquiries</span></div><a className="button button-dark" href="#supplier-form">Register your interest ↗</a>
      </div></section>

      <section className="supplier-form-section section-pad" id="supplier-form"><div className="section-label"><span>04 / SUPPLIER REGISTRATION</span><span>START WITH YOUR BUSINESS DETAILS</span></div><div className="supplier-form-grid"><div><h2>Let’s bring your<br /><em>coffee to market.</em></h2><p>Submit your details by email. Our team can follow up to verify your business and product information.</p><p className="small-warning">This is an inquiry form only. It does not create an account, verify an exporter, publish a listing or store data online.</p></div>
        <form className="inquiry-form" onSubmit={submitSeller}><div className="form-row"><label>Contact person<input name="Contact person" required placeholder="Full name" /></label><label>Business name<input name="Business name" required placeholder="Company / cooperative" /></label></div><div className="form-row"><label>Email<input name="Email" type="email" required placeholder="name@company.com" /></label><label>Phone / WhatsApp<input name="Phone" required placeholder="+251..." /></label></div><div className="form-row"><label>Business role<select name="Business role"><option>Farmer / Producer</option><option>Cooperative</option><option>Washing station</option><option>Supplier / Trader</option><option>Roaster</option><option>Exporter</option><option>Importer / Buyer</option></select></label><label>Market interest<select name="Market interest"><option>Domestic</option><option>Export / International</option><option>Both domestic and export</option></select></label></div><label>Coffee and origin details<textarea name="Coffee details" rows="3" placeholder="Origin, process, grade, available quantity, crop year, product type…" /></label><button className="button button-dark form-submit" type="submit">Prepare registration email ↗</button>{notice && <p className="form-status" role="status">{notice}</p>}</form>
      </div></section>

      <section className="market-contact section-pad" id="contact"><div><p className="eyebrow">LET’S TALK COFFEE</p><h2>Make your next<br /><em>connection.</em></h2><p>Contact MEA-BOKO for buyer inquiries, supplier registration and marketplace partnership discussions.</p></div><div className="market-contact-links"><a href={`mailto:${EMAIL}`}>✉ <span><small>EMAIL</small>{EMAIL}</span>↗</a><a href={WHATSAPP} target="_blank" rel="noreferrer">◉ <span><small>WHATSAPP</small>+251 926 133 289</span>↗</a><a href={TELEGRAM} target="_blank" rel="noreferrer">↗ <span><small>TELEGRAM</small>@coffeemarketet</span>↗</a></div></section>
    </main>
    <footer className="site-footer"><div className="footer-main"><Brand /><p>ETHIOPIAN COFFEE TO THE WORLD<br />FROM FARM TO GLOBAL MARKET.</p><a className="back-top" href="#home">Back to top ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MEA-BOKO ETHIO COFFEE MARKETPLACE</span><span>Marketplace starter · Demo listings only</span></div></footer>

    {selected && <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}><section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close details">×</button><div className="modal-image" style={{ backgroundImage: `url(https://images.unsplash.com/${selected.image}?auto=format&fit=crop&w=1000&q=85)` }} /><div className="modal-copy"><p className="eyebrow">{selected.market} MARKET · {selected.form}</p><h2 id="product-modal-title">{selected.name}</h2><p>{selected.description}</p><dl><div><dt>Origin</dt><dd>{selected.origin}</dd></div><div><dt>Process</dt><dd>{selected.process}</dd></div><div><dt>Grade</dt><dd>{selected.grade}</dd></div><div><dt>Cup notes</dt><dd>{selected.notes}</dd></div></dl><p className="modal-disclaimer">Demonstration listing. Confirm all commercial details before placing an order.</p><button className="button button-dark" onClick={() => inquire(selected)}>Inquire about this coffee ↗</button></div></section></div>}
  </>;
}
