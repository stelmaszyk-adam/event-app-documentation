// Overlays for eventapp Web B2C
const { useState: _ous, useMemo: _oum } = React;

// =============================================================
// CITY PICKER OVERLAY
// =============================================================
function CityPickerOverlay({ city, onClose, onSelect }) {
  const [q, setQ] = _ous('');
  const results = _oum(() => {
    if (!q.trim()) return CITIES;
    const ql = q.toLowerCase().replace(/ą/g, 'a').replace(/ó/g, 'o').replace(/ł/g, 'l').replace(/ś/g, 's').replace(/ć/g, 'c').replace(/ń/g, 'n').replace(/ę/g, 'e').replace(/ź/g, 'z').replace(/ż/g, 'z');
    return CITIES.filter(c => c.name.toLowerCase().replace(/ą/g, 'a').replace(/ó/g, 'o').replace(/ł/g, 'l').replace(/ś/g, 's').replace(/ć/g, 'c').replace(/ń/g, 'n').replace(/ę/g, 'e').replace(/ź/g, 'z').replace(/ż/g, 'z').includes(ql));
  }, [q]);
  const noMatch = results.length === 0;

  return (
    <div className="scrim" onClick={onClose}>
      <div className="dialog" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
        <div className="dialog-head">
          <h2 className="dialog-title">Wybierz miasto</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Zamknij"><Icon.X /></button>
        </div>
        <div className="dialog-body">
          <div className="search-input" style={{ background: 'var(--surface-low)', marginBottom: 16 }}>
            <Icon.Search />
            <input
              autoFocus
              placeholder="Szukaj miasta…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {noMatch ? (
            <div style={{
              padding: 24, textAlign: 'center', borderRadius: 'var(--radius-lg)',
              background: 'var(--brand-primary-container)',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 'var(--radius-lg)',
                background: 'var(--surface-high)', color: 'var(--brand-primary)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
              }}>
                <Icon.MapPin />
              </div>
              <p className="type-title-l" style={{ margin: '0 0 4px' }}>
                <strong>{q}</strong> nie jest jeszcze dostępne
              </p>
              <p style={{ font: 'var(--type-body-m)', color: 'var(--on-surface-variant)', margin: '0 0 16px' }}>
                Daj nam znać, że chcesz oglądać wydarzenia w swoim mieście.
              </p>
              <button className="btn btn-primary">
                <Icon.Bell /> Zgłoś {q}
              </button>
            </div>
          ) : (
            <>
              <div style={{ font: 'var(--type-overline)', letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--on-surface-variant)', margin: '8px 0 8px' }}>
                Popularne miasta
              </div>
              <div className="city-grid">
                {results.map(c => (
                  <button
                    key={c.id}
                    className={`city-tile ${c.id === city.id ? 'is-active' : ''}`}
                    onClick={() => onSelect(c)}
                  >
                    <strong>{c.name}</strong>
                    <span>{c.count} wydarzeń · {c.region}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================
// DATE PICKER OVERLAY
// =============================================================
function DatePickerOverlay({ value, onClose, onApply }) {
  const [preset, setPreset] = _ous(value?.preset || 'this-weekend');
  // Build a simple May 2026 calendar (Mon-first). 2026-05-01 is a Friday.
  const month = { label: 'Maj 2026', firstDow: 4, days: 31 }; // Mon=0
  const dows = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];
  const TODAY = 17;
  let range = null;
  if (preset === 'today')         range = { from: TODAY, to: TODAY };
  if (preset === 'tomorrow')      range = { from: TODAY + 1, to: TODAY + 1 };
  if (preset === 'this-weekend')  range = { from: 23, to: 24 };
  if (preset === 'this-week')     range = { from: TODAY, to: 24 };

  const cells = [];
  for (let i = 0; i < month.firstDow; i++) cells.push({ blank: true });
  for (let d = 1; d <= month.days; d++) cells.push({ d });

  return (
    <div className="scrim" onClick={onClose}>
      <div className="dialog" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
        <div className="dialog-head">
          <h2 className="dialog-title">Wybierz datę</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Zamknij"><Icon.X /></button>
        </div>
        <div className="dialog-body">
          <div className="preset-row">
            {[
              ['today',        'Dzisiaj'],
              ['tomorrow',     'Jutro'],
              ['this-weekend', 'W ten weekend'],
              ['this-week',    'W tym tygodniu'],
              ['custom',       'Dowolny zakres'],
            ].map(([k, l]) => (
              <button
                key={k}
                className={`chip ${preset === k ? 'is-selected' : ''}`}
                onClick={() => setPreset(k)}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="calendar">
            <div className="calendar-head">
              <button className="btn-icon"><Icon.ChevronLeft /></button>
              <span className="calendar-month">{month.label}</span>
              <button className="btn-icon"><Icon.ChevronRight /></button>
            </div>
            <div className="calendar-grid">
              {dows.map(d => <div key={d} className="calendar-dow">{d}</div>)}
              {cells.map((c, i) => {
                if (c.blank) return <div key={`b${i}`} />;
                const isToday = c.d === TODAY;
                let cls = 'calendar-day';
                if (range && c.d >= range.from && c.d <= range.to) {
                  if (range.from === range.to) cls += ' is-range-single';
                  else if (c.d === range.from) cls += ' is-range-start';
                  else if (c.d === range.to)   cls += ' is-range-end';
                  else                          cls += ' is-in-range';
                } else if (isToday) cls += ' is-today';
                return <button key={c.d} className={cls}>{c.d}</button>;
              })}
            </div>
          </div>
        </div>
        <div className="dialog-foot">
          <button className="btn btn-tertiary" onClick={() => onApply({ preset: 'this-weekend', label: 'W ten weekend' })}>
            Wyczyść
          </button>
          <button className="btn btn-primary" onClick={() => {
            const labels = { today: 'Dzisiaj', tomorrow: 'Jutro', 'this-weekend': 'W ten weekend', 'this-week': 'W tym tygodniu', custom: 'Dowolny zakres' };
            onApply({ preset, label: labels[preset] });
          }}>
            Zastosuj
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// DISTANCE PICKER OVERLAY
// =============================================================
function DistancePickerOverlay({ value, onClose, onApply, cityName }) {
  const [km, setKm] = _ous(value || 5);
  const MIN = 5, MAX = 150;
  const pct = ((km - MIN) / (MAX - MIN)) * 100;
  const presets = [5, 15, 30, 60, 150];

  return (
    <div className="scrim" onClick={onClose}>
      <div className="dialog" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
        <div className="dialog-head">
          <h2 className="dialog-title">Odległość od miasta</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Zamknij"><Icon.X /></button>
        </div>
        <div className="dialog-body">
          <p style={{ font: 'var(--type-body-m)', color: 'var(--on-surface-variant)', margin: '0 0 24px' }}>
            Pokaż wydarzenia w promieniu wybranej odległości od centrum <strong>{cityName}</strong>.
          </p>
          <div className="distance-readout">
            <span className="distance-value">{km}</span>
            <span className="distance-unit">km</span>
          </div>
          <div className="distance-slider" style={{ '--pct': `${pct}%` }}>
            <input
              type="range"
              min={MIN}
              max={MAX}
              step={1}
              value={km}
              onChange={(e) => setKm(Number(e.target.value))}
              aria-label="Odległość w km"
            />
          </div>
          <div className="distance-scale">
            <span>{MIN} km</span>
            <span>{MAX} km</span>
          </div>
          <div className="preset-row" style={{ marginTop: 20 }}>
            {presets.map(p => (
              <button
                key={p}
                className={`chip ${km === p ? 'is-selected' : ''}`}
                onClick={() => setKm(p)}
              >
                {p} km
              </button>
            ))}
          </div>
        </div>
        <div className="dialog-foot">
          <button className="btn btn-tertiary" onClick={() => setKm(5)}>Wyczyść</button>
          <button className="btn btn-primary" onClick={() => onApply(km)}>Zastosuj</button>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// COOKIE CONSENT BANNER
// =============================================================
function CookieBanner({ onClose, onManage }) {
  return (
    <div className="cookie-banner">
      <div className="cookie-icon"><Icon.Cookie /></div>
      <div>
        <h3 className="cookie-title">Używamy plików cookie</h3>
        <p className="cookie-body">
          Wykorzystujemy ciasteczka, by ulepszać Twoje doświadczenie, analizować ruch i personalizować treści.
          Możesz zaakceptować wszystkie albo zarządzać preferencjami.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="btn btn-tertiary" onClick={onManage}>Zarządzaj</button>
        <button className="btn btn-secondary" onClick={onClose}>Odrzuć wszystkie</button>
        <button className="btn btn-primary" onClick={onClose}>Akceptuj wszystkie</button>
      </div>
    </div>
  );
}

// =============================================================
// COOKIE PREFERENCES MODAL
// =============================================================
function CookiePrefsOverlay({ onClose, onSave }) {
  const [analytics, setAnalytics] = _ous(true);
  const [marketing, setMarketing] = _ous(false);
  const Toggle = ({ on, onChange, disabled }) => (
    <button
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => !disabled && onChange(!on)}
      style={{
        width: 44, height: 26, borderRadius: 999,
        background: on ? 'var(--brand-primary)' : 'var(--gray-200)',
        position: 'relative', flexShrink: 0,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 200ms',
      }}>
      <span style={{
        position: 'absolute', top: 3, left: on ? 21 : 3,
        width: 20, height: 20, borderRadius: 999, background: '#fff',
        transition: 'left 200ms',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  );
  const Row = ({ title, desc, on, onChange, disabled }) => (
    <div style={{
      display: 'flex', gap: 16, alignItems: 'flex-start',
      padding: '16px 0',
      borderBottom: '1px solid var(--outline)',
    }}>
      <div style={{ flex: 1 }}>
        <strong style={{ font: 'var(--type-title-l)', display: 'block', marginBottom: 4 }}>{title}</strong>
        <span style={{ font: 'var(--type-body-m)', color: 'var(--on-surface-variant)' }}>{desc}</span>
      </div>
      <Toggle on={on} onChange={onChange} disabled={disabled} />
    </div>
  );
  return (
    <div className="scrim" onClick={onClose}>
      <div className="dialog" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
        <div className="dialog-head">
          <h2 className="dialog-title">Preferencje cookies</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Zamknij"><Icon.X /></button>
        </div>
        <div className="dialog-body">
          <p style={{ font: 'var(--type-body-m)', color: 'var(--on-surface-variant)', margin: '0 0 8px' }}>
            Zarządzaj kategoriami plików cookie. Niezbędne są zawsze aktywne — odpowiadają za działanie strony.
          </p>
          <Row title="Niezbędne" disabled on={true} onChange={() => {}}
               desc="Logowanie, koszyk, bezpieczeństwo. Bez nich strona nie działa." />
          <Row title="Analityczne" on={analytics} onChange={setAnalytics}
               desc="PostHog — anonimowo mierzymy, jak korzystasz ze strony, aby ją ulepszać." />
          <Row title="Marketingowe" on={marketing} onChange={setMarketing}
               desc="Piksele reklamowe Meta i Google. Pomagają nam pokazywać trafniejsze reklamy." />
        </div>
        <div className="dialog-foot">
          <button className="btn btn-tertiary" onClick={onClose}>Anuluj</button>
          <button className="btn btn-primary" onClick={() => onSave({ analytics, marketing })}>
            Zapisz preferencje
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CityPickerOverlay, DatePickerOverlay, DistancePickerOverlay, CookieBanner, CookiePrefsOverlay });
