import { useMemo, useState } from 'react';

const CONTACT_EMAIL = import.meta.env.VITE_INQUIRY_EMAIL || 'meaboko11@gmail.com';
const origins = ['All origins', 'Sidama', 'Guji', 'Yirgacheffe', 'Limu', 'Harar'];
const coffees = [
  { id: 'sidama', origin: 'Sidama', region: 'Southern Ethiopia', process: 'Washed', altitude: '1,900–2,200 m', tasting: 'Peach · bergamot · jasmine', grade: 'Grade 1', image: 'photo-1445116572660-236099ec97a0', note: 'Floral clarity from highland farms' },
  { id: 'guji', origin: 'Guji', region: 'Oromia, Ethiopia', process: 'Natural', altitude: '1,950–2,300 m', tasting: 'Blueberry · cocoa · red fruit', grade: 'Grade 1', image: 'photo-1442512595331-e89e73853f31', note: 'Expressive fruit from the Guji highlands' },
  { id: 'yirgacheffe', origin: 'Yirgacheffe', region: 'Gedeo, Ethiopia', process: 'Washed', altitude: '1,800–2,100 m', tasting: 'Lemon · honeysuckle · tea', grade: 'Grade 1', image: 'photo-1495474472287-4d71bcdd2085', note: 'A celebrated profile with delicate florals' },
  { id: 'limu', origin: 'Limu', region: 'Southwest Ethiopia', process: 'Washed', altitude: '1,600–1,900 m', tasting: 'Citrus · caramel · soft spice', grade: 'Grade 2', image: 'photo-1511537190424-bbbab87ac5eb', note: 'Balanced cup from forest coffee country' },
  { id: 'harar', origin: 'Harar', region: 'Eastern Ethiopia', process: 'Natural', altitude: '1,500–2,100 m', tasting: 'Mocca · dried fruit · warm spice', grade: 'Grade 4', image: 'photo-1501339847302-ac426a4a7cbb', note: 'Distinctive dry-processed eastern lots' },
];

function CoffeeMark({ light = false }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#home" aria-label="MEA-BOKO Coffee Ethiopia home"><span className="brand-mark" aria-hidden="true">M</span><span className="brand-copy"><strong>MEA-BOKO</strong><small>COFFEE ETHIOPIA</small></span></a>;
}

function ArrowIcon() { return <span aria-hidden="true">↗</span>; }

function CoffeeCard({ coffee, onInquire }) {
  return (
    <article className="coffee-card">
      <div className="coffee-image" style={{ backgroundImage: `url(https://images.unsplash.com/${coffee.image}?auto=format&fit=crop&w=900&q=85)` }}>
        <span className="grade-tag">{coffee.grade}</span>
        <span className="process-tag">{coffee.process}</span>
      </div>
      <div className="coffee-content">
        <p className="eyebrow">{coffee.region}</p>
        <div className="coffee-title-row"><h3>{coffee.origin}</h3><span className="origin-arrow" aria-hidden="true">↗</span></div>
        <p className="coffee-note">{coffee.note}</p>
        <div className="coffee-details"><span><b>ALTITUDE</b>{coffee.altitude}</span><span><b>CUP NOTES</b>{coffee.tasting}</span></div>
        <button className="text-button" onClick={() => onInquire(coffee.origin)}>Inquire about this origin <ArrowIcon /></button>
      </div>
    </article>
  );
}

export default function App() {
  const [activeOrigin, setActiveOrigin] = useState('All origins');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState('');
  const filteredCoffee = useMemo(() => coffees.filter((coffee) => {
    const matchesOrigin = activeOrigin === 'All origins' || coffee.origin === activeOrigin;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [coffee.origin, coffee.region, coffee.process, coffee.tasting, coffee.note].join(' ').toLowerCase().includes(query);
    return matchesOrigin && matchesSearch;
  }), [activeOrigin, search]);

  function selectCoffee(origin) {
    document.getElementById('inquiry-origin').value = origin;
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    setFormState('');
  }

  function submitInquiry(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const origin = String(data.get('origin') || 'General inquiry');
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent(`Coffee inquiry — ${origin}`);
    const body = encodeURIComponent(`Hello MEA-BOKO Coffee Ethiopia,\n\n${message}\n\nName: ${name}\nReply email: ${email}\nOrigin of interest: ${origin}`);
    setFormState('Your email app is opening with your inquiry. This starter does not save or send inquiries itself.');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <div className="announcement"><span className="announcement-dot" /> Direct connections. Ethiopian origins. Global possibilities. <a href="#origins">Explore the harvest <span aria-hidden="true">→</span></a></div>
      <header className="site-header" id="home">
        <div className="nav-wrap"><CoffeeMark />
          <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '✕' : '☰'}</button>
          <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
            <a href="#origins">Coffee origins</a><a href="#story">Our approach</a><a href="#campaign">For suppliers</a><a className="nav-cta" href="#contact">Start a conversation <ArrowIcon /></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-backdrop" />
          <div className="hero-content">
            <p className="hero-kicker"><span /> A marketplace rooted in origin</p>
            <h1>ETHIOPIAN COFFEE<br />TO THE <em>WORLD.</em></h1>
            <p className="hero-subtitle">From farm to global market.</p>
            <p className="hero-description">Discover distinctive coffees, meet the people behind them, and build a more direct connection to Ethiopia’s extraordinary origins.</p>
            <div className="hero-actions"><a className="button button-light" href="#origins">Explore coffee origins <span>↓</span></a><a className="hero-link" href="#story">Get to know MEA-BOKO <ArrowIcon /></a></div>
          </div>
          <div className="hero-caption"><span>06° 12′ N &nbsp; 38° 12′ E</span><span>ETHIOPIAN HIGHLANDS</span></div>
          <div className="hero-stamp"><span>GROWN WITH</span><b>ORIGIN</b><span>AT HEART</span><i>✳</i></div>
        </section>

        <section className="origin-intro section-pad" id="story">
          <div className="section-label"><span>01 / OUR APPROACH</span><span>ETHIOPIA · THE BIRTHPLACE OF COFFEE</span></div>
          <div className="intro-grid"><h2>Every cup has<br />a <em>place.</em></h2><div className="intro-copy"><p>Ethiopia’s coffee is a story of landscape, care, and generations of knowledge. We’re building a considered marketplace that helps global buyers discover its character—one origin and one conversation at a time.</p><a className="underlined-link" href="#origins">Meet the origins <span>→</span></a></div></div>
          <div className="stats-row"><div><strong>5</strong><span>Distinctive origins</span></div><div><strong>1</strong><span>Country of origin</span></div><div><strong>∞</strong><span>Stories in every cup</span></div><p>Illustrative origin listings<br /><small>Lot availability and specifications are subject to confirmation.</small></p></div>
        </section>

        <section className="origins-section section-pad" id="origins">
          <div className="section-label"><span>02 / FIND YOUR ORIGIN</span><span>COFFEES OF ETHIOPIA</span></div>
          <div className="origins-heading"><div><h2>Explore the <em>landscape.</em></h2><p>From bright and floral to rich and fruit-forward, every region brings its own voice.</p></div><a href="#contact" className="underlined-link desktop-link">Looking for something specific? <span>→</span></a></div>
          <div className="filter-toolbar"><div className="origin-tabs" role="group" aria-label="Filter by coffee origin">{origins.map((origin) => <button key={origin} className={activeOrigin === origin ? 'origin-tab active' : 'origin-tab'} onClick={() => setActiveOrigin(origin)}>{origin}</button>)}</div><label className="search-box"><span aria-hidden="true">⌕</span><input type="search" placeholder="Search origins, notes…" value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search origins, processing, and tasting notes" /></label></div>
          <div className="coffee-grid">{filteredCoffee.map((coffee) => <CoffeeCard key={coffee.id} coffee={coffee} onInquire={selectCoffee} />)}</div>
          {filteredCoffee.length === 0 && <p className="empty-state">No origins match that search. Try another coffee note or region.</p>}
          <p className="listing-disclaimer">Sample listings for discovery only. These are not offers for sale; confirm availability, grade, processing, price, and export readiness directly with MEA-BOKO.</p>
        </section>

        <section className="campaign-section" id="campaign"><div className="campaign-image" role="img" aria-label="Coffee beans being sorted by hand" /><div className="campaign-content"><p className="eyebrow">A NOTE FOR ETHIOPIAN SUPPLIERS</p><h2>Good coffee deserves<br />a wider <em>audience.</em></h2><p>We’re interested in hearing from producers, cooperatives, washing stations, and exporters who want to share the character of their coffee with the world.</p><div className="commission-card"><span className="commission-number">0<span>%</span></span><div><strong>MEA-BOKO commission</strong><span>Supplier campaign · proposed</span></div></div><p className="campaign-terms"><b>Campaign terms and eligibility are not yet defined.</b> The 0% commission message is a proposed campaign, not a binding offer or guarantee. Confirm eligibility, duration, covered services, and any fees with MEA-BOKO before participating or launching.</p><a href="#contact" className="button button-dark">Talk to our team <ArrowIcon /></a></div></section>

        <section className="contact-section section-pad" id="contact"><div className="section-label"><span>03 / LET’S CONNECT</span><span>GOOD CONVERSATIONS START HERE</span></div><div className="contact-grid"><div className="contact-heading"><h2>Let’s talk<br />about <em>coffee.</em></h2><p>Tell us what you’re looking for. Our team will be glad to hear from you.</p><div className="contact-links"><a href={`mailto:${CONTACT_EMAIL}`}><span className="contact-icon">✉</span><span><small>EMAIL</small>{CONTACT_EMAIL}</span><ArrowIcon /></a><a href="https://wa.me/251926133289" target="_blank" rel="noreferrer"><span className="contact-icon">◉</span><span><small>WHATSAPP</small>+251 926 133 289</span><ArrowIcon /></a><a href="https://t.me/coffeemarketet" target="_blank" rel="noreferrer"><span className="contact-icon">↗</span><span><small>TELEGRAM</small>@coffeemarketet</span><ArrowIcon /></a></div></div>
          <form className="inquiry-form" onSubmit={submitInquiry}><p className="form-kicker">A FIRST HELLO</p><h3>Send an inquiry</h3><p className="form-description">We’ll prepare a message in your email app so you can send it directly.</p><div className="form-row"><label>Your name<input name="name" autoComplete="name" required placeholder="Name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label></div><label>Origin of interest<select id="inquiry-origin" name="origin"><option>General inquiry</option>{coffees.map((coffee) => <option key={coffee.id}>{coffee.origin}</option>)}</select></label><label>How can we help?<textarea name="message" required rows="4" placeholder="Tell us a little about the coffee you’re looking for…" /></label><button className="button button-dark form-submit" type="submit">Prepare email <ArrowIcon /></button><p className="form-note">Your message is not stored by this site. Submitting opens your email application.</p>{formState && <p className="form-status" role="status">{formState}</p>}</form></div></section>
      </main>

      <footer className="site-footer"><div className="footer-main"><CoffeeMark light /><p>ETHIOPIAN COFFEE TO THE WORLD<br />FROM FARM TO GLOBAL MARKET.</p><a className="back-top" href="#home">Back to top ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MEA-BOKO Coffee Ethiopia</span><span>Built around origin. Made for conversation.</span><span>Marketplace starter · Not a live trading platform</span></div></footer>
    </>
  );
}
