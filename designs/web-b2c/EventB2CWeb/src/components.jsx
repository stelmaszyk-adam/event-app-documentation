// Shared components for eventapp Web B2C
const { useState, useEffect, useRef, useMemo } = React;

// ---------- ICONS FROM CATEGORY ----------
function CatIcon({ catId, size = 14 }) {
  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) return null;
  const I = Icon[cat.icon];
  return I ? <I /> : null;
}

// ---------- LOGO ----------
function Logo({ onClick }) {
  return (
    <button onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span className="logo-glyph">E</span>
      <span className="logo-wordmark">eventapp</span>
    </button>
  );
}

// ---------- HEADER "MORE" MENU ----------
function MoreMenu({ onNavigate, lang, setLang, view }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="user-menu-wrap">
      <button className={`more-menu-btn ${open ? 'is-open' : ''}`} onClick={() => setOpen(o => !o)} aria-expanded={open}>
        Więcej
        <Icon.ChevronDown />
      </button>
      {open && (
        <>
          <div className="user-menu-scrim" onClick={() => setOpen(false)} />
          <div className="user-menu">
            <button className={view === 'blog' || view === 'blog-post' ? 'is-active' : ''} onClick={() => { setOpen(false); onNavigate('blog'); }}><Icon.Sparkles /> Blog</button>
            <button onClick={() => { setOpen(false); onNavigate('add-event'); }}><Icon.Plus /> Dodaj wydarzenie</button>
            <a className="user-menu-link" href="#" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}><Icon.ArrowUpRight /> Dla Organizatorów</a>
            <div className="user-menu-sep" />
            <div className="user-menu-lang">
              <span>Język</span>
              <div className="lang-toggle">
                <button className={lang === 'pl' ? 'is-active' : ''} onClick={() => setLang('pl')}>PL</button>
                <button className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>EN</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ---------- TOP HEADER ----------
function AppHeader({ city, onPickCity, onNavigate, lang, setLang, user, onLogout, view }) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Logo onClick={() => onNavigate('home')} />
        <button className="city-selector" onClick={onPickCity} aria-label="Wybierz miasto">
          <Icon.MapPin />
          <span>{city.name}</span>
          <Icon.ChevronDown />
        </button>
        <div style={{ flex: 1 }}></div>
        <MoreMenu onNavigate={onNavigate} lang={lang} setLang={setLang} view={view} />
        <div className="auth-header-actions">
          {user ? (
            <UserMenu user={user} onNavigate={onNavigate} onLogout={onLogout} />
          ) : (
            <>
              <button className="btn btn-tertiary" onClick={() => onNavigate('login')}>Zaloguj się</button>
              <button className="btn btn-primary" onClick={() => onNavigate('register')}>Zarejestruj się</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

// ---------- FILTER BAR ----------
function FilterBar({ activeCats, toggleCat, onDateClick, dateLabel, onDistanceClick, distanceKm, sortBy, setSortBy, liveOnly, setLiveOnly }) {
  return (
    <div className="filter-bar">
      <div className="filter-search">
        <div className="search-input">
          <Icon.Search />
          <input placeholder="Szukaj wydarzeń, miejsc, artystów…" />
        </div>
      </div>
      <div className="filter-bar-inner">
        <div className="chip-row">
          <button
            className={`chip ${liveOnly ? 'is-selected' : ''}`}
            onClick={() => setLiveOnly(!liveOnly)}
            style={{ '--live-red': 'var(--live-red)' }}
          >
            <Icon.Flame />
            Dzieje się teraz
          </button>
          <span className="filter-divider" />
          {CATEGORIES.filter(c => !c.special).map(c => {
            const sel = activeCats.includes(c.id);
            return (
              <button
                key={c.id}
                className={`chip ${sel ? 'is-selected' : ''}`}
                onClick={() => toggleCat(c.id)}
                style={{ '--brand-primary': c.color }}
              >
                <CatIcon catId={c.id} />
                {c.label}
              </button>
            );
          })}
        </div>
        <span className="filter-divider" />
        <button className="chip" onClick={onDateClick}>
          <Icon.Calendar />
          {dateLabel}
          <Icon.ChevronDown />
        </button>
        <button className={`chip ${distanceKm !== 5 ? 'is-selected' : ''}`} onClick={onDistanceClick}>
          <Icon.Navigation />
          Do {distanceKm} km
          <Icon.ChevronDown />
        </button>
        <button className="chip" onClick={() => {
          const opts = ['Trafność', 'Data', 'Odległość'];
          const i = opts.indexOf(sortBy);
          setSortBy(opts[(i + 1) % opts.length]);
        }}>
          <Icon.Filter />
          Sortuj: {sortBy}
        </button>
      </div>
    </div>
  );
}

// ---------- EVENT CARD (search result) ----------
function EventCard({ event, highlighted, onHover, onLeave, onClick, onFav, saved }) {
  const cat = CATEGORIES.find(c => c.id === event.cat);
  const isFree = event.priceFrom === 0;
  return (
    <article
      className={`event-card ${highlighted ? 'is-highlighted' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="event-card-thumb">
        <img src={event.image} alt={event.title} />
        <div className="thumb-overlay" />
        <div className="thumb-badges">
          {event.badges.includes('live') && <span className="badge badge-live">Na żywo</span>}
          {event.badges.includes('fast') && <span className="badge badge-fast"><Icon.Flame strokeWidth={2.5} /> Szybko znika</span>}
          {event.badges.includes('recur') && <span className="badge badge-recur"><Icon.Repeat strokeWidth={2.5} /> Cotygodniowo</span>}
        </div>
        <button className={`event-card-fav ${saved ? 'is-saved' : ''}`} onClick={(e) => { e.stopPropagation(); onFav(); }} aria-label="Zapisz">
          {saved ? <Icon.HeartFill /> : <Icon.Heart />}
        </button>
      </div>
      <div className="event-card-body">
        <div className="event-card-meta-top">
          <span className="badge-cat" style={{ '--cat-color': cat?.color }}>
            <CatIcon catId={event.cat} />
            {cat?.label}
          </span>
          <span>{event.date}</span>
          <span className="dot" />
          <span><Icon.Clock strokeWidth={2} /> {event.time}</span>
        </div>
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-venue">
          <Icon.MapPin strokeWidth={2} />
          {event.venue.name} · {event.venue.address}
        </p>
        <div className="event-card-foot">
          <div>
            {event.tipBy && (
              <span style={{ font: 'var(--type-caption)', color: 'var(--on-surface-variant)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Icon.AtSign /> Polecone przez <strong style={{ color: 'var(--brand-primary)', marginLeft: 2 }}>{event.tipBy}</strong>
              </span>
            )}
          </div>
          <div className="event-card-price">
            {isFree ? <span className="badge badge-free">Bezpłatne</span>
                    : <><span className="from">od</span>{event.priceFrom} zł</>}
          </div>
        </div>
      </div>
    </article>
  );
}

// ---------- MAP CANVAS (stylized SVG) ----------
function MapCanvas() {
  // Abstract Poznań-like map: river Warta diagonally, two parks, road grid
  return (
    <svg className="map-canvas" viewBox="0 0 1000 720" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1"/>
        </pattern>
        <linearGradient id="river" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B8D5EC"/>
          <stop offset="100%" stopColor="#C9DEF0"/>
        </linearGradient>
      </defs>
      {/* base */}
      <rect width="1000" height="720" fill="#E8EBF1" />
      <rect width="1000" height="720" fill="url(#grid)" />
      {/* parks */}
      <path d="M 60 120 Q 200 80 320 140 Q 360 200 280 240 Q 180 280 100 240 Z" fill="#C7E0C4" />
      <ellipse cx="820" cy="540" rx="160" ry="100" fill="#C7E0C4" />
      <path d="M 700 80 Q 820 60 900 120 L 920 200 L 820 220 Q 740 200 700 140 Z" fill="#C7E0C4" />
      {/* river Warta */}
      <path d="M 640 -20 C 600 120 720 240 660 380 C 600 520 720 640 700 760"
            stroke="url(#river)" strokeWidth="80" fill="none" strokeLinecap="round" />
      {/* roads */}
      <g stroke="#fff" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.95">
        <path d="M -20 320 L 1020 380" />
        <path d="M -20 200 L 1020 240" />
        <path d="M -20 480 L 1020 460" />
        <path d="M 220 -20 L 260 740" />
        <path d="M 460 -20 L 500 740" />
        <path d="M 380 -20 L 420 740" />
      </g>
      <g stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8">
        <path d="M -20 140 L 1020 160" />
        <path d="M -20 580 L 1020 600" />
        <path d="M 120 -20 L 140 740" />
        <path d="M 580 -20 L 600 740" />
        <path d="M 740 -20 L 760 740" />
        <path d="M 880 -20 L 900 740" />
      </g>
      {/* labels */}
      <g fill="#7A7A92" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="500" letterSpacing="0.4">
        <text x="180" y="180" textAnchor="middle">Park Sołacki</text>
        <text x="820" y="540" textAnchor="middle">Cytadela</text>
        <text x="500" y="365" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5C5C7A">Stare Miasto</text>
        <text x="320" y="455" textAnchor="middle">Wilda</text>
        <text x="780" y="660" textAnchor="middle">Śródka</text>
        <text x="160" y="490" textAnchor="middle">Łazarz</text>
      </g>
      <g fill="#86A0B5" fontFamily="Inter, sans-serif" fontSize="10" fontStyle="italic">
        <text x="680" y="500" transform="rotate(60, 680, 500)">Warta</text>
      </g>
    </svg>
  );
}

// ---------- MAP PIN ----------
function MapPin({ event, active, onClick }) {
  const cat = CATEGORIES.find(c => c.id === event.cat);
  return (
    <div
      className={`map-pin ${active ? 'is-active' : ''}`}
      style={{ left: `${event.coords.x / 10}%`, top: `${event.coords.y / 7.2}%`, '--cat-color': cat.color }}
      onClick={onClick}
    >
      <div className="map-pin-bubble">
        <span className="pin-icon"><CatIcon catId={event.cat} /></span>
        <span>{event.priceFrom === 0 ? 'Free' : `${event.priceFrom} zł`}</span>
      </div>
    </div>
  );
}

// ---------- MAP POPUP ----------
function MapPopup({ event, onClose, onClick }) {
  const cat = CATEGORIES.find(c => c.id === event.cat);
  return (
    <div className="map-popup"
         style={{ left: `${event.coords.x / 10}%`, top: `${event.coords.y / 7.2}%`, transform: 'translate(-50%, -110%)' }}
         onClick={onClick}>
      <div className="popup-image">
        <img src={event.image} alt="" />
        <div className="badges">
          <span className="badge-cat" style={{ '--cat-color': cat.color, background: 'rgba(255,255,255,0.95)' }}>
            <CatIcon catId={event.cat} />
            {cat.label}
          </span>
        </div>
        <button className="popup-close" onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Zamknij">
          <Icon.X />
        </button>
      </div>
      <div className="popup-body">
        <div className="popup-meta">{event.date} · {event.time}</div>
        <h4 className="popup-title">{event.title}</h4>
        <p className="popup-venue">{event.venue.name}</p>
        <a className="popup-link">Zobacz szczegóły <Icon.ChevronRight /></a>
      </div>
    </div>
  );
}

// ---------- FOOTER ----------
function AppFooter({ onNavigate }) {
  return (
    <>
      <footer className="app-footer">
        <div className="app-footer-inner">
          <div className="footer-brand">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span className="logo-glyph">E</span>
              <span className="logo-wordmark">eventapp</span>
            </div>
            <p>Odkrywaj koncerty, kluby, wystawy i wydarzenia w polskich miastach. Twoja lokalna scena, w jednym miejscu.</p>
            <div className="footer-app-badges">
              <a className="app-store-badge" href="#">
                <Icon.AtSign />
                <span>Pobierz w<br/><strong>App Store</strong></span>
              </a>
              <a className="app-store-badge" href="#">
                <Icon.Sparkles />
                <span>Zainstaluj z<br/><strong>Google Play</strong></span>
              </a>
            </div>
          </div>
          <div>
            <h4>Odkryj</h4>
            <ul>
              <li><a href="#">Poznań</a></li>
              <li><a href="#">Kraków</a></li>
              <li><a href="#">Warszawa</a></li>
              <li><a href="#">Wrocław</a></li>
              <li><a href="#">Wszystkie miasta</a></li>
              <li><a href="#blog" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('blog'); }}>Blog</a></li>
            </ul>
          </div>
          <div>
            <h4>Kategorie</h4>
            <ul>
              <li><a href="#">Muzyka</a></li>
              <li><a href="#">Kluby</a></li>
              <li><a href="#">Teatr</a></li>
              <li><a href="#">Sztuka</a></li>
              <li><a href="#">Sport</a></li>
            </ul>
          </div>
          <div>
            <h4>Dla biznesu</h4>
            <ul>
              <li><a href="#" target="_blank">Panel Organizatora <Icon.ArrowUpRight /></a></li>
              <li style={{ font: 'var(--type-caption)', color: 'var(--on-surface-variant)', marginTop: -4 }}>Zarządzaj miejscem, dodawaj wydarzenia, śledź statystyki</li>
              <li style={{ marginTop: 8 }}><a href="#">Reklama</a></li>
              <li><a href="#">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h4>Prawne</h4>
            <ul>
              <li><a href="#">Regulamin</a></li>
              <li><a href="#">Polityka prywatności</a></li>
              <li><a href="#">Polityka cookies</a></li>
              <li><a href="#">Zarządzaj cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="app-footer-bottom">
          <span>© 2026 eventapp · Wszystkie prawa zastrzeżone</span>
          <div className="social-row">
            <button className="btn-icon" aria-label="Instagram"><Icon.Instagram /></button>
            <button className="btn-icon" aria-label="Facebook"><Icon.Facebook /></button>
            <button className="btn-icon" aria-label="TikTok"><Icon.Tiktok /></button>
          </div>
        </div>
      </footer>
    </>
  );
}

Object.assign(window, {
  CatIcon, Logo, MoreMenu, AppHeader, FilterBar, EventCard,
  MapCanvas, MapPin, MapPopup, AppFooter,
});
