// Main app for eventapp Web B2C
const { useState: _aus, useEffect: _aue } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "darkMode": false,
  "showCookieBanner": true,
  "showCityPicker": false,
  "density": "comfortable",
  "accent": "purple"
}/*EDITMODE-END*/;

const ACCENTS = {
  purple: { primary: '#6C3FEB', light: '#A97EF8', container: '#F3EEFF' },
  indigo: { primary: '#4F46E5', light: '#818CF8', container: '#E0E7FF' },
  rose:   { primary: '#E11D48', light: '#FB7185', container: '#FFE4E6' },
  teal:   { primary: '#0D9488', light: '#5EEAD4', container: '#CCFBF1' },
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = _aus({ name: 'home', id: null });
  const [city, setCity] = _aus(CITIES[0]); // Poznań
  const [lang, setLang] = _aus('pl');
  const [cityPickerOpen, setCityPickerOpen] = _aus(tweaks.showCityPicker);
  const [datePickerOpen, setDatePickerOpen] = _aus(false);
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

  const onNavigate = (name, id = null) => setView({ name, id });

  return (
    <div data-screen-label={`${view.name === 'home' ? '01 Wyszukiwarka' : view.name === 'event' ? '02 Szczegóły wydarzenia' : '03 Profil miejsca'}`}>
      <AppHeader
        city={city}
        onPickCity={() => setCityPickerOpen(true)}
        onNavigate={onNavigate}
        lang={lang}
        setLang={setLang}
      />

      {view.name === 'home' && (
        <SearchDiscoveryScreen
          city={city}
          onNavigate={onNavigate}
          openCityPicker={() => setCityPickerOpen(true)}
          openDatePicker={() => setDatePickerOpen(true)}
          dateLabel={dateSel.label}
        />
      )}
      {view.name === 'event' && (
        <EventDetailScreen eventId={view.id} city={city} onNavigate={onNavigate} />
      )}
      {view.name === 'venue' && (
        <VenueProfileScreen venueId={view.id} city={city} onNavigate={onNavigate} />
      )}

      <AppFooter />

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
            ]}
            onChange={(v) => onNavigate(v, v === 'event' ? 'e1' : v === 'venue' ? 'v3' : null)}
          />
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
