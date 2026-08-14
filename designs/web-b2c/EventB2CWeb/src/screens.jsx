// Screens for eventapp Web B2C
const { useState: _us, useEffect: _ue, useMemo: _um, useRef: _ur } = React;

// =============================================================
// SEARCH & DISCOVERY (split-screen)
// =============================================================
function SearchDiscoveryScreen({ city, onNavigate, openCityPicker, openDatePicker, dateLabel, openDistancePicker, distanceKm }) {
  const [activeCats, setActiveCats] = _us([]);
  const [sortBy, setSortBy] = _us('Trafność');
  const [liveOnly, setLiveOnly] = _us(false);
  const [hoveredId, setHoveredId] = _us(null);
  const [activePinId, setActivePinId] = _us(null);
  const [saved, setSaved] = _us(new Set());
  const [showSearchArea, setShowSearchArea] = _us(false);
  const [mapSheetOpen, setMapSheetOpen] = _us(false);
  const [mapFull, setMapFull] = _us(false);
  React.useEffect(() => {
    if (!mapFull) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMapFull(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [mapFull]);
  const cardRefs = _ur({});

  const toggleCat = (id) => {
    setActiveCats(p => p.includes(id) ? p.filter(c => c !== id) : [...p, id]);
  };
  const toggleSave = (id) => {
    setSaved(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  const filteredEvents = _um(() => {
    let list = EVENTS;
    if (activeCats.length > 0) list = list.filter(e => activeCats.includes(e.cat));
    if (liveOnly) list = list.filter(e => e.badges.includes('live'));
    return list;
  }, [activeCats, liveOnly]);

  const activeEvent = filteredEvents.find(e => e.id === activePinId);

  const onPinClick = (id) => {
    setActivePinId(id);
    const el = cardRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <FilterBar
        activeCats={activeCats}
        toggleCat={toggleCat}
        onDateClick={openDatePicker}
        dateLabel={dateLabel}
        onDistanceClick={openDistancePicker}
        distanceKm={distanceKm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        liveOnly={liveOnly}
        setLiveOnly={setLiveOnly}
      />
      <main className="split">
        <section className="results-panel">
          <div className="results-head">
            <div>
              <div className="results-count">
                <em>{filteredEvents.length}</em> wydarzeń w <em>{city.name}</em>
              </div>
              <div className="results-sub">{dateLabel} · w promieniu {distanceKm} km od centrum</div>
            </div>
          </div>
          <div className="results-list" data-screen-label="Lista wyników">
            {filteredEvents.map(ev => (
              <div key={ev.id} ref={(el) => cardRefs.current[ev.id] = el}>
                <EventCard
                  event={ev}
                  highlighted={hoveredId === ev.id || activePinId === ev.id}
                  onHover={() => setHoveredId(ev.id)}
                  onLeave={() => setHoveredId(null)}
                  onClick={() => onNavigate('event', ev.id)}
                  onFav={() => toggleSave(ev.id)}
                  saved={saved.has(ev.id)}
                />
              </div>
            ))}
            {filteredEvents.length === 0 && (
              <div style={{ padding: 48, textAlign: 'center', color: 'var(--on-surface-variant)' }}>
                <Icon.Search />
                <p className="type-title-l" style={{ marginTop: 12 }}>Brak wydarzeń pasujących do filtrów</p>
                <p>Spróbuj zmienić kategorię lub zakres dat.</p>
              </div>
            )}
            <div style={{
              marginTop: 12, padding: 20, background: 'var(--surface-high)',
              borderRadius: 'var(--radius-xl)', border: '1px dashed var(--outline-strong)',
              display: 'flex', alignItems: 'center', gap: 16
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 'var(--radius-lg)',
                background: 'var(--color-tertiary-container)', color: 'var(--color-tertiary)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <Icon.Sparkles />
              </div>
              <div style={{ flex: 1 }}>
                <strong style={{ font: 'var(--type-title-l)', display: 'block' }}>Wiesz o ciekawym wydarzeniu?</strong>
                <span style={{ font: 'var(--type-body-m)', color: 'var(--on-surface-variant)' }}>
                  Zgłoś je w aplikacji mobilnej — kuratorzy dodadzą je do bazy w 24 h.
                </span>
              </div>
              <button className="btn btn-secondary" onClick={() => onNavigate('add-event')}>Dodaj wydarzenie <Icon.ChevronRight /></button>
            </div>
          </div>
        </section>

        <aside className={`map-panel ${mapSheetOpen ? 'is-mobile-open' : ''} ${mapFull ? 'is-fullscreen' : ''}`} data-screen-label="Mapa">
          {mapSheetOpen && (
            <button className="map-sheet-close btn-icon" onClick={() => setMapSheetOpen(false)} aria-label="Zamknij mapę">
              <Icon.X />
            </button>
          )}
          <MapCanvas />
          {filteredEvents.map(ev => (
            <MapPin key={ev.id}
              event={ev}
              active={hoveredId === ev.id || activePinId === ev.id}
              onClick={() => onPinClick(ev.id)}
            />
          ))}
          {/* cluster decoy */}
          <div className="map-pin" style={{ left: '76%', top: '18%' }}>
            <div className="map-pin-cluster">+8</div>
          </div>
          {activeEvent && (
            <MapPopup
              event={activeEvent}
              onClose={() => setActivePinId(null)}
              onClick={() => onNavigate('event', activeEvent.id)}
            />
          )}
          <button className="map-fab" onClick={() => setMapFull(v => !v)}
                  aria-label={mapFull ? 'Zamknij pełny ekran' : 'Pełny ekran'}
                  aria-pressed={mapFull} title={mapFull ? 'Zamknij pełny ekran (Esc)' : 'Pełny ekran'}>
            {mapFull ? <Icon.Collapse strokeWidth={2} /> : <Icon.Expand strokeWidth={2} />}
          </button>
          <div className="map-controls">
            <button className="btn-icon" onClick={() => setShowSearchArea(true)} aria-label="Lokalizacja">
              <Icon.Locate />
            </button>
            <button className="btn-icon" aria-label="Powiększ"><Icon.Plus /></button>
            <button className="btn-icon" aria-label="Pomniejsz"><Icon.Minus /></button>
          </div>
          {showSearchArea && (
            <div className="map-search-area">
              <button className="btn btn-glass" onClick={() => setShowSearchArea(false)}>
                <Icon.Search /> Szukaj w tym obszarze
              </button>
            </div>
          )}
        </aside>
      </main>

      <button className="btn btn-primary show-on-map-fab" onClick={() => setMapSheetOpen(true)}>
        <Icon.MapPin /> Pokaż na mapie
      </button>
    </>
  );
}

// =============================================================
// EVENT DETAIL
// =============================================================
function EventDetailScreen({ eventId, city, onNavigate }) {
  const ev = EVENTS.find(e => e.id === eventId) || EVENTS[0];
  const cat = CATEGORIES.find(c => c.id === ev.cat);
  const related = EVENTS.filter(e => e.id !== ev.id && e.cat === ev.cat).slice(0, 4);
  if (related.length < 3) {
    EVENTS.filter(e => e.id !== ev.id).forEach(e => { if (related.length < 4 && !related.includes(e)) related.push(e); });
  }
  const [saved, setSaved] = _us(false);

  return (
    <main className="detail-page" data-screen-label="Szczegóły wydarzenia">
      <nav className="breadcrumb">
        <a onClick={() => onNavigate('home')}>{city.name}</a>
        <span className="sep">/</span>
        <a onClick={() => onNavigate('home')}>{cat.label}</a>
        <span className="sep">/</span>
        <span style={{ color: 'var(--on-surface)' }}>{ev.title}</span>
      </nav>

      <div className="detail-hero">
        <img src={ev.image} alt={ev.title} />
        <div className="hero-grad" />
        <div className="hero-top">
          <span className="badge-cat" style={{ '--cat-color': cat.color, background: 'rgba(255,255,255,0.95)', height: 32, padding: '0 14px' }}>
            <CatIcon catId={ev.cat} />
            {cat.label}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {ev.badges.includes('fast') && <span className="badge badge-fast" style={{ height: 32, padding: '0 12px', fontSize: 13 }}>
              <Icon.Flame strokeWidth={2.5} /> Szybko znika
            </span>}
            <button className="btn-icon on-image" aria-label="Udostępnij"><Icon.Share /></button>
          </div>
        </div>
        <div className="hero-thumbs">
          <div className="hero-thumb is-active"><img src={ev.image} alt=""/></div>
          <div className="hero-thumb"><img src={IMG.rock} alt=""/></div>
          <div className="hero-thumb"><img src={IMG.techno} alt=""/></div>
          <div className="hero-thumb"><img src={IMG.jazz} alt=""/></div>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <h1 className="detail-title">{ev.title}</h1>
          {ev.tipBy && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 12px', borderRadius: 'var(--radius-full)',
              background: 'var(--brand-primary-container)', color: 'var(--brand-primary)',
              font: 'var(--type-label-m)', marginBottom: 12,
            }}>
              <Icon.AtSign /> Polecone przez <strong>{ev.tipBy}</strong>
            </div>
          )}

          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-icon"><Icon.Calendar /></span>
              <div>
                <p className="meta-label">Data</p>
                <p className="meta-value">{ev.date}</p>
                <p className="meta-sub">{ev.time}</p>
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-icon"><Icon.MapPin /></span>
              <div>
                <p className="meta-label">Miejsce</p>
                <p className="meta-value">{ev.venue.name}</p>
                <p className="meta-sub">{ev.venue.address}, {city.name}</p>
              </div>
            </div>
            {ev.badges.includes('recur') && (
              <div className="meta-item">
                <span className="meta-icon"><Icon.Repeat /></span>
                <div>
                  <p className="meta-label">Cykl</p>
                  <p className="meta-value">Cotygodniowo</p>
                  <a style={{ font: 'var(--type-body-m)', color: 'var(--brand-primary)', cursor: 'pointer' }}>Zobacz wszystkie daty →</a>
                </div>
              </div>
            )}
          </div>

          <section className="detail-section">
            <h2>O wydarzeniu</h2>
            <p>{ev.desc}</p>
            <p style={{ color: 'var(--on-surface-variant)' }}>
              Drzwi otwierają się 30 minut przed występem. Bilety dostępne online oraz w kasie miejsca (przy dostępności).
              Wydarzenie 18+, przy wejściu konieczna ważna legitymacja.
            </p>
            <div className="hashtag-row">
              {ev.hashtags.map(h => <span key={h} className="hashtag">{h}</span>)}
            </div>
          </section>

          <section className="detail-section">
            <h2>Dodaj do kalendarza</h2>
            <div className="cal-options">
              <button className="cal-option">
                <span style={{ width: 32, height: 32, borderRadius: 8, background: '#4285F4', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '700 13px/1 Inter' }}>G</span>
                <div><strong>Google Calendar</strong><span>Otwórz w przeglądarce</span></div>
              </button>
              <button className="cal-option">
                <span style={{ width: 32, height: 32, borderRadius: 8, background: '#000', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '700 13px/1 Inter' }}>A</span>
                <div><strong>Apple Calendar</strong><span>Pobierz .ics</span></div>
              </button>
              <button className="cal-option">
                <span style={{ width: 32, height: 32, borderRadius: 8, background: '#0078D4', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '700 13px/1 Inter' }}>O</span>
                <div><strong>Outlook</strong><span>Pobierz .ics</span></div>
              </button>
            </div>
          </section>

          <section className="detail-section">
            <h2>Może Cię też zainteresować</h2>
            <div className="related-grid">
              {related.slice(0, 4).map(re => (
                <EventCard key={re.id}
                  event={re}
                  onHover={() => {}} onLeave={() => {}}
                  onClick={() => onNavigate('event', re.id)}
                  onFav={() => {}}
                  saved={false}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="aside">
          <div className="aside-card price-card">
            <div className="price-row">
              <span className="price-from">Bilet od</span>
            </div>
            {ev.priceFrom === 0 ? (
              <div className="price-row">
                <span className="price-value" style={{ color: 'var(--brand-primary)' }}>Bezpłatne</span>
              </div>
            ) : (
              <div className="price-row">
                <span className="price-value">{ev.priceFrom}</span>
                <span className="price-currency">zł</span>
              </div>
            )}
            {ev.badges.includes('fast') && (
              <div className="urgency">
                <Icon.Flame strokeWidth={2.5} />
                Ostatnie 12% biletów
              </div>
            )}
            <button className="btn btn-primary" style={{ width: '100%', height: 52, marginTop: 4 }}>
              <Icon.Ticket /> Kup bilety
            </button>
            <div className="btn-row">
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                <Icon.Navigation /> Nawiguj
              </button>
              <button className={`btn btn-secondary ${saved ? '' : ''}`}
                      style={{ flex: 1, color: saved ? 'var(--color-tertiary)' : undefined }}
                      onClick={() => setSaved(!saved)}>
                {saved ? <Icon.HeartFill /> : <Icon.Heart />}
                Zapisz
              </button>
            </div>
            <p style={{ font: 'var(--type-caption)', color: 'var(--on-surface-muted)', textAlign: 'center', marginTop: 12, marginBottom: 0 }}>
              Sprzedaż przez {ev.venue.name} · eBilet
            </p>
          </div>

          <div className="aside-card">
            <div className="meta-label" style={{ marginBottom: 8 }}>Organizator</div>
            <div className="venue-mini" onClick={() => onNavigate('venue', ev.venue.id)}>
              <div className="venue-avatar" style={{ backgroundImage: `url(${IMG.venue})` }} />
              <div className="venue-mini-text">
                <strong>{ev.venue.name}</strong>
                <span><Icon.Users strokeWidth={2} /> 4 280 obserwujących</span>
              </div>
              <Icon.ChevronRight />
            </div>
          </div>

          <div className="smart-banner">
            <div className="sb-icon"><Icon.Bell /></div>
            <div className="smart-banner-text">
              <strong>Zapisz w aplikacji</strong>
              <span>Otrzymuj przypomnienia 24 h przed wydarzeniem</span>
            </div>
            <div className="sb-actions">
              <a className="app-store-badge"><strong>App Store</strong></a>
              <a className="app-store-badge"><strong>Google Play</strong></a>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

// =============================================================
// VENUE PROFILE
// =============================================================
function VenueProfileScreen({ venueId, city, onNavigate }) {
  // Pull venue from VENUE_DETAILS or fabricate from event venue
  let v = VENUE_DETAILS[venueId];
  if (!v) {
    const ev = EVENTS.find(e => e.venue.id === venueId);
    if (ev) {
      v = {
        id: venueId,
        name: ev.venue.name,
        category: 'Miejsce wydarzeń',
        address: ev.venue.address + ', ' + city.name,
        description: 'Jedno z ulubionych miejsc lokalnej publiczności. Sprawdź nadchodzące wydarzenia poniżej.',
        followers: '2 140',
        photo: ev.image,
        coords: ev.coords,
        upcoming: EVENTS.filter(e => e.venue.id === venueId).map(e => e.id),
        hours: VENUE_DETAILS.v3.hours,
        todayDay: 'Sobota',
      };
    } else v = VENUE_DETAILS.v3;
  }
  const upcoming = v.upcoming.map(id => EVENTS.find(e => e.id === id)).filter(Boolean);

  return (
    <main className="detail-page" data-screen-label="Profil miejsca">
      <nav className="breadcrumb">
        <a onClick={() => onNavigate('home')}>{city.name}</a>
        <span className="sep">/</span>
        <span>Miejsca</span>
        <span className="sep">/</span>
        <span style={{ color: 'var(--on-surface)' }}>{v.name}</span>
      </nav>

      <div className="detail-hero" style={{ height: 340 }}>
        <img src={v.photo} alt={v.name} />
        <div className="hero-grad" />
        <div className="hero-top">
          <span className="badge-cat" style={{ '--cat-color': 'var(--cat-club)', background: 'rgba(255,255,255,0.95)', height: 32, padding: '0 14px' }}>
            <Icon.Disc />
            {v.category}
          </span>
          <button className="btn-icon on-image" aria-label="Udostępnij"><Icon.Share /></button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <h1 className="detail-title">{v.name}</h1>
          <div className="venue-info-row">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--on-surface-variant)' }}>
              <Icon.MapPin /> {v.address}
            </span>
          </div>
          <div className="venue-stats">
            <div className="venue-stat">
              <Icon.Users />
              <strong>{v.followers}</strong>
              <span>obserwujących</span>
            </div>
            <div className="venue-stat">
              <Icon.Calendar />
              <strong>{upcoming.length || 12}</strong>
              <span>nadchodzących wydarzeń</span>
            </div>
            <div className="venue-stat">
              <span style={{ width: 8, height: 8, borderRadius: 99, background: '#16A34A' }}></span>
              <strong style={{ color: '#16A34A' }}>Otwarte</strong>
              <span>do 06:00</span>
            </div>
          </div>

          <section className="detail-section">
            <h2>O miejscu</h2>
            <p>{v.description}</p>
            <div className="claim-cta">
              <Icon.Tag />
              <span>To Twoje miejsce? <a href="#" target="_blank" rel="noopener noreferrer">Przejmij je w Panelu Organizatora <Icon.ArrowUpRight /></a></span>
            </div>
          </section>

          <section className="detail-section">
            <h2>Godziny otwarcia</h2>
            <div className="opening-hours">
              {v.hours.map(([day, hours]) => (
                <React.Fragment key={day}>
                  <span className={`day ${day === v.todayDay ? 'today' : ''}`}>{day}</span>
                  <span className={day === v.todayDay ? 'today' : ''}>{hours}</span>
                </React.Fragment>
              ))}
            </div>
          </section>

          <section className="detail-section">
            <h2>Nadchodzące wydarzenia</h2>
            {upcoming.length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', background: 'var(--surface-high)', borderRadius: 'var(--radius-xl)' }}>
                <p style={{ color: 'var(--on-surface-variant)', margin: 0 }}>Brak nadchodzących wydarzeń. Obserwuj miejsce, aby otrzymywać powiadomienia o nowych terminach.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                {upcoming.map(ev => (
                  <div key={ev.id} className="upcoming-event-row" onClick={() => onNavigate('event', ev.id)}>
                    <div className="upcoming-thumb" style={{ backgroundImage: `url(${ev.image})` }} />
                    <div>
                      <div style={{ font: 'var(--type-label-s)', letterSpacing: 'var(--tracking-label-s)', textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>
                        {ev.date} · {ev.time}
                      </div>
                      <h3 style={{ font: 'var(--type-title-l)', letterSpacing: 'var(--tracking-title-l)', margin: '4px 0 0' }}>{ev.title}</h3>
                    </div>
                    <div className="upcoming-date-block">
                      <span className="d-day">{ev.dateShort.d}</span>
                      <span className="d-month">{ev.dateShort.m}</span>
                    </div>
                  </div>
                ))}
                {/* fabricated extra rows for fuller venue feel */}
                <div className="upcoming-event-row" onClick={() => onNavigate('event', 'e2')}>
                  <div className="upcoming-thumb" style={{ backgroundImage: `url(${IMG.rock})` }} />
                  <div>
                    <div style={{ font: 'var(--type-label-s)', letterSpacing: 'var(--tracking-label-s)', textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>
                      Pt, 6 cze · 23:00
                    </div>
                    <h3 style={{ font: 'var(--type-title-l)', letterSpacing: 'var(--tracking-title-l)', margin: '4px 0 0' }}>Concrete Soul: DVS1 + Roman Flügel</h3>
                  </div>
                  <div className="upcoming-date-block"><span className="d-day">06</span><span className="d-month">cze</span></div>
                </div>
                <div className="upcoming-event-row" onClick={() => onNavigate('event', 'e2')}>
                  <div className="upcoming-thumb" style={{ backgroundImage: `url(${IMG.techno})` }} />
                  <div>
                    <div style={{ font: 'var(--type-label-s)', letterSpacing: 'var(--tracking-label-s)', textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>
                      Sob, 14 cze · 23:00
                    </div>
                    <h3 style={{ font: 'var(--type-title-l)', letterSpacing: 'var(--tracking-title-l)', margin: '4px 0 0' }}>Modular: Polygonia + Ondesso</h3>
                  </div>
                  <div className="upcoming-date-block"><span className="d-day">14</span><span className="d-month">cze</span></div>
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="aside">
          <div className="aside-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: 220, position: 'relative', background: '#E8EBF1' }}>
              <svg width="100%" height="100%" viewBox="0 0 360 220" preserveAspectRatio="xMidYMid slice">
                <rect width="360" height="220" fill="#E8EBF1" />
                <g stroke="#fff" strokeWidth="6" fill="none">
                  <path d="M-10 70 L370 90" />
                  <path d="M-10 150 L370 130" />
                  <path d="M120 -10 L140 230" />
                  <path d="M230 -10 L240 230" />
                </g>
                <path d="M 200 -20 C 180 80 240 140 200 240" stroke="#B8D5EC" strokeWidth="40" fill="none" />
              </svg>
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -100%)' }}>
                <div className="map-pin-bubble" style={{ '--cat-color': 'var(--cat-club)' }}>
                  <span className="pin-icon" style={{ background: 'var(--cat-club)' }}><Icon.Disc /></span>
                  {v.name}
                </div>
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ font: 'var(--type-body-m)', color: 'var(--on-surface)', margin: '0 0 8px' }}>{v.address}</p>
              <button className="btn btn-secondary" style={{ width: '100%' }}>
                <Icon.Navigation /> Nawiguj
              </button>
            </div>
          </div>

          <div className="smart-banner">
            <div className="sb-icon"><Icon.Heart /></div>
            <div className="smart-banner-text">
              <strong>Obserwuj w aplikacji</strong>
              <span>Powiadomienia o nowych wydarzeniach z {v.name}</span>
            </div>
            <div className="sb-actions">
              <a className="app-store-badge"><strong>App Store</strong></a>
              <a className="app-store-badge"><strong>Google Play</strong></a>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

Object.assign(window, { SearchDiscoveryScreen, EventDetailScreen, VenueProfileScreen });
