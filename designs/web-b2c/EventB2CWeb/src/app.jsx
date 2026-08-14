// Main app for eventapp Web B2C
const { useState: _aus, useEffect: _aue } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "darkMode": false,
  "showCookieBanner": true,
  "showCityPicker": false,
  "density": "comfortable",
  "accent": "purple",
  "signedIn": false
}/*EDITMODE-END*/;

const DEMO_USER = { name: 'Kasia Nowak', email: 'kasia.nowak@gmail.com', provider: 'google' };

const ACCENTS = {
  purple: { primary: '#6C3FEB', light: '#A97EF8', container: '#F3EEFF' },
  indigo: { primary: '#4F46E5', light: '#818CF8', container: '#E0E7FF' },
  rose:   { primary: '#E11D48', light: '#FB7185', container: '#FFE4E6' },
  teal:   { primary: '#0D9488', light: '#5EEAD4', container: '#CCFBF1' },
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const _initialView = (() => {
    const h = (window.location.hash || '').replace(/^#/, '');
    if (h.startsWith('blog-post')) return { name: 'blog-post', id: h.split('/')[1] || 'piwnice' };
    if (h.startsWith('blog')) return { name: 'blog', id: null };
    if (h.startsWith('event')) return { name: 'event', id: h.split('/')[1] || 'e1' };
    if (h.startsWith('venue')) return { name: 'venue', id: h.split('/')[1] || 'v3' };
    if (h.startsWith('add-event')) return { name: 'add-event', id: null };
    if (h.startsWith('login')) return { name: 'login', id: null };
    if (h.startsWith('register')) return { name: 'register', id: null };
    return { name: 'home', id: null };
  })();
  const [view, setView] = _aus(_initialView);
  const [user, setUser] = _aus(TWEAK_DEFAULTS.signedIn ? DEMO_USER : null);
  const [authIntent, setAuthIntent] = _aus(null);
  const [city, setCity] = _aus(CITIES[0]); // Poznań
  const [lang, setLang] = _aus('pl');
  const [cityPickerOpen, setCityPickerOpen] = _aus(tweaks.showCityPicker);
  const [datePickerOpen, setDatePickerOpen] = _aus(false);
  const [distancePickerOpen, setDistancePickerOpen] = _aus(false);
  const [distanceKm, setDistanceKm] = _aus(5);
  const [cookieOpen, setCookieOpen] = _aus(tweaks.showCookieBanner);
  const [cookiePrefsOpen, setCookiePrefsOpen] = _aus(false);
  const [dateSel, setDateSel] = _aus({ preset: 'this-weekend', label: 'W ten weekend' });

  _aue(() => { setCityPickerOpen(tweaks.showCityPicker); }, [tweaks.showCityPicker]);
  _aue(() => { setCookieOpen(tweaks.showCookieBanner); }, [tweaks.showCookieBanner]);

  _aue(() => {
    document.documentElement.dataset.theme = tweaks.darkMode ? 'dark' : 'light';
    const a = ACCENTS[tweaks.accent] || ACCENTS.purple;
    document.documentElement.style.setProperty('--brand-primary', a.primary);
    document.documentElement.style.setProperty('--purple-500', a.primary);
    document.documentElement.style.setProperty('--purple-300', a.light);
    document.documentElement.style.setProperty('--brand-primary-container', a.container);
    document.documentElement.style.setProperty('--brand-gradient', `linear-gradient(135deg, ${a.primary} 0%, ${a.light} 100%)`);
    document.documentElement.style.setProperty('--shadow-brand', `0 6px 18px ${a.primary}40`);
  }, [tweaks.darkMode, tweaks.accent]);

  _aue(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  _aue(() => {
    if (tweaks.signedIn && !user) setUser(DEMO_USER);
    if (!tweaks.signedIn && user) setUser(null);
  }, [tweaks.signedIn]);

  const onNavigate = (name, id = null) => {
    if (name === 'add-event' && !user) {
      setAuthIntent('add-event');
      setView({ name: 'login', id: null });
      return;
    }
    if (name !== 'login' && name !== 'register' && name !== 'reset') setAuthIntent(null);
    setView({ name, id });
  };

  const onAuth = (u) => {
    setUser(u);
    setTweak('signedIn', true);
    const next = authIntent === 'add-event' ? 'add-event' : 'home';
    setAuthIntent(null);
    setView({ name: next, id: null });
  };

  const onLogout = () => {
    setUser(null);
    setTweak('signedIn', false);
    setView(v => (v.name === 'add-event' ? { name: 'home', id: null } : v));
  };

  const onCreateEvent = (form) => {
    const venue = VENUES.find(v => v.id === form.venueId) || { id: form.venueId, name: '—', address: '' };
    const dt = new Date(form.startTime);
    const id = `e${EVENTS.length + 1}`;
    const newEvent = {
      id,
      title: form.name,
      cat: form.category,
      venue: { id: venue.id, name: venue.name, address: venue.address },
      image: IMG.jazz,
      date: dt.toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric', month: 'long' }),
      time: dt.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
      dateShort: { d: dt.getDate(), m: dt.toLocaleDateString('pl-PL', { month: 'short' }).replace('.', '') },
      priceFrom: Number(form.price) || 0,
      badges: [],
      coords: { x: 500, y: 350 },
      hashtags: [],
      desc: form.description,
      ticketUrl: form.ticketUrl,
      endTime: form.endTime || null,
    };
    EVENTS.unshift(newEvent);
    setView({ name: 'event', id });
  };

  return (
    <div data-screen-label={{ home: '01 Wyszukiwarka', event: '02 Szczegóły wydarzenia', venue: '03 Profil miejsca', 'add-event': '04 Dodaj wydarzenie', login: '05 Logowanie', register: '06 Rejestracja', reset: '07 Reset hasła', blog: '08 Blog — lista', 'blog-post': '09 Blog — artykuł' }[view.name]}>
      <AppHeader
        city={city}
        onPickCity={() => setCityPickerOpen(true)}
        onNavigate={onNavigate}
        lang={lang}
        setLang={setLang}
        user={user}
        onLogout={onLogout}
        view={view.name}
      />

      {view.name === 'home' && (
        <>
          <SearchDiscoveryScreen
            city={city}
            onNavigate={onNavigate}
            openCityPicker={() => setCityPickerOpen(true)}
            openDatePicker={() => setDatePickerOpen(true)}
            dateLabel={dateSel.label}
            openDistancePicker={() => setDistancePickerOpen(true)}
            distanceKm={distanceKm}
          />
          <BlogStrip city={city} onNavigate={onNavigate} />
        </>
      )}
      {view.name === 'blog' && (
        <BlogListScreen city={city} onNavigate={onNavigate} />
      )}
      {view.name === 'blog-post' && (
        <BlogDetailScreen postId={view.id} city={city} onNavigate={onNavigate} />
      )}
      {view.name === 'event' && (
        <EventDetailScreen eventId={view.id} city={city} onNavigate={onNavigate} />
      )}
      {view.name === 'venue' && (
        <VenueProfileScreen venueId={view.id} city={city} onNavigate={onNavigate} />
      )}
      {view.name === 'add-event' && (
        <AddEventScreen onNavigate={onNavigate} onCreate={onCreateEvent} user={user} />
      )}
      {view.name === 'login' && (
        <LoginScreen intent={authIntent} onNavigate={onNavigate} onAuth={onAuth} />
      )}
      {view.name === 'register' && (
        <RegisterScreen intent={authIntent} onNavigate={onNavigate} onAuth={onAuth} />
      )}
      {view.name === 'reset' && (
        <ResetScreen onNavigate={onNavigate} />
      )}

      <AppFooter onNavigate={onNavigate} />

      {cityPickerOpen && (
        <CityPickerOverlay
          city={city}
          onClose={() => { setCityPickerOpen(false); setTweak('showCityPicker', false); }}
          onSelect={(c) => { setCity(c); setCityPickerOpen(false); setTweak('showCityPicker', false); }}
        />
      )}
      {datePickerOpen && (
        <DatePickerOverlay
          value={dateSel}
          onClose={() => setDatePickerOpen(false)}
          onApply={(v) => { setDateSel(v); setDatePickerOpen(false); }}
        />
      )}
      {distancePickerOpen && (
        <DistancePickerOverlay
          value={distanceKm}
          cityName={city.name}
          onClose={() => setDistancePickerOpen(false)}
          onApply={(v) => { setDistanceKm(v); setDistancePickerOpen(false); }}
        />
      )}
      {cookieOpen && !cookiePrefsOpen && (
        <CookieBanner
          onClose={() => { setCookieOpen(false); setTweak('showCookieBanner', false); }}
          onManage={() => setCookiePrefsOpen(true)}
        />
      )}
      {cookiePrefsOpen && (
        <CookiePrefsOverlay
          onClose={() => setCookiePrefsOpen(false)}
          onSave={() => { setCookiePrefsOpen(false); setCookieOpen(false); setTweak('showCookieBanner', false); }}
        />
      )}

      <TweaksPanel title="Tweaks" defaultPosition="bottom-right">
        <TweakSection title="Motyw">
          <TweakToggle
            label="Dark mode"
            value={tweaks.darkMode}
            onChange={(v) => setTweak('darkMode', v)}
          />
          <TweakRadio
            label="Akcent"
            value={tweaks.accent}
            options={[
              { value: 'purple', label: 'Fiolet' },
              { value: 'indigo', label: 'Indygo' },
              { value: 'rose',   label: 'Róż' },
              { value: 'teal',   label: 'Teal' },
            ]}
            onChange={(v) => setTweak('accent', v)}
          />
        </TweakSection>
        <TweakSection title="Nawigacja">
          <TweakRadio
            label="Ekran"
            value={view.name}
            options={[
              { value: 'home', label: 'Wyszukiwarka' },
              { value: 'event', label: 'Wydarzenie' },
              { value: 'venue', label: 'Miejsce' },
              { value: 'blog', label: 'Blog' },
              { value: 'blog-post', label: 'Artykuł' },
            ]}
            onChange={(v) => onNavigate(v, v === 'event' ? 'e1' : v === 'venue' ? 'v3' : v === 'blog-post' ? 'piwnice' : null)}
          />
        </TweakSection>
        <TweakSection title="Konto">
          <TweakToggle
            label="Zalogowany"
            value={!!user}
            onChange={(v) => { setTweak('signedIn', v); if (v) setUser(DEMO_USER); else onLogout(); }}
          />
          <TweakButton label="Ekran logowania" onClick={() => setView({ name: 'login', id: null })} />
          <TweakButton label="Ekran rejestracji" onClick={() => setView({ name: 'register', id: null })} />
          <TweakButton label="Reset hasła" onClick={() => setView({ name: 'reset', id: null })} />
        </TweakSection>
        <TweakSection title="Pop-upy">
          <TweakToggle
            label="Banner cookies"
            value={cookieOpen}
            onChange={(v) => { setCookieOpen(v); setTweak('showCookieBanner', v); }}
          />
          <TweakButton
            label="Otwórz wybór miasta"
            onClick={() => setCityPickerOpen(true)}
          />
          <TweakButton
            label="Otwórz wybór daty"
            onClick={() => setDatePickerOpen(true)}
          />
          <TweakButton
            label="Otwórz wybór odległości"
            onClick={() => setDistancePickerOpen(true)}
          />
          <TweakButton
            label="Otwórz preferencje cookies"
            onClick={() => setCookiePrefsOpen(true)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
