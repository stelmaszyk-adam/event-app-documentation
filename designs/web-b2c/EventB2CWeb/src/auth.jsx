// Login / registration screens for eventapp Web B2C
const { useState: _auths } = React;

const AUTH_BENEFITS = [
  ['Dodawaj i edytuj wydarzenia', 'Twoje zgłoszenia trafiają do bazy po szybkiej weryfikacji.'],
  ['Zapisuj ulubione', 'Buduj plan wyjścia i wracaj do niego z każdego urządzenia.'],
  ['Przypomnienia', 'Powiadomimy Cię, gdy zbliża się wydarzenie z Twojej listy.'],
];

function pwScore(v) {
  let s = 0;
  if (v.length >= 8) s++;
  if (v.length >= 12) s++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
  if (/[0-9]/.test(v) || /[^A-Za-z0-9]/.test(v)) s++;
  return Math.min(s, 4);
}

function GoogleMark() {
  return <span className="g-mark" aria-hidden="true">G</span>;
}

function AuthAside({ intent, onNavigate }) {
  return (
    <aside className="auth-aside">
      <div>
        <span className="auth-aside-eyebrow">{intent === 'add-event' ? 'Dodajesz wydarzenie' : 'Konto eventapp'}</span>
        <h2 className="auth-aside-title">
          {intent === 'add-event'
            ? 'Zaloguj się, aby zgłosić wydarzenie'
            : 'Jedno konto, cała lokalna scena'}
        </h2>
        <p className="auth-aside-sub">
          {intent === 'add-event'
            ? 'Potrzebujemy konta, żeby wiedzieć, kto dodał wydarzenie i móc się z Tobą skontaktować w razie zmian.'
            : 'Zapisuj wydarzenia, dodawaj własne i nie przegap niczego w swoim mieście.'}
        </p>
      </div>
      <ul className="auth-benefits">
        {AUTH_BENEFITS.map(([t, d]) => (
          <li key={t}>
            <span className="auth-bullet"><Icon.Check strokeWidth={3} /></span>
            <div>
              <strong>{t}</strong>
              <span>{d}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="auth-aside-foot">
        <span>Masz klub, teatr lub agencję?</span>
        <a href="https://dashboard.eventapp.dev" target="_blank" rel="noopener noreferrer">
          Panel Organizatora <Icon.ArrowUpRight />
        </a>
      </div>
    </aside>
  );
}

function PasswordInput({ label, hint, value, onChange, placeholder, autoComplete }) {
  const [show, setShow] = _auths(false);
  return (
    <label className="form-field">
      <span>{label}{hint && <em>{hint}</em>}</span>
      <div className="auth-pw">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <button type="button" className="auth-pw-toggle" onClick={() => setShow(s => !s)}
                aria-label={show ? 'Ukryj hasło' : 'Pokaż hasło'}>
          {show ? <Icon.EyeOff /> : <Icon.Eye />}
        </button>
      </div>
    </label>
  );
}

// =============================================================
// LOGIN
// =============================================================
function LoginScreen({ intent, onNavigate, onAuth }) {
  const [email, setEmail] = _auths('');
  const [pw, setPw] = _auths('');
  const [remember, setRemember] = _auths(true);
  const [error, setError] = _auths('');
  const [busy, setBusy] = _auths('');

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !pw) { setError('Podaj adres e-mail i hasło.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('To nie wygląda na poprawny adres e-mail.'); return; }
    setError('');
    setBusy('email');
    setTimeout(() => {
      const name = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      onAuth({ name, email, provider: 'email' });
    }, 550);
  };

  const google = () => {
    setError('');
    setBusy('google');
    setTimeout(() => onAuth({ name: 'Kasia Nowak', email: 'kasia.nowak@gmail.com', provider: 'google' }), 900);
  };

  return (
    <main className="auth-page" data-screen-label="05 Logowanie">
      <nav className="breadcrumb">
        <a onClick={() => onNavigate('home')}>Strona główna</a>
        <span className="sep">/</span>
        <span style={{ color: 'var(--on-surface)' }}>Logowanie</span>
      </nav>

      <div className="auth-card">
        <div className="auth-main">
          <span className="ae-eyebrow">Konto</span>
          <h1 className="auth-title">Zaloguj się</h1>
          <p className="auth-sub">Witaj ponownie. Zaloguj się, aby dodawać wydarzenia i zarządzać zapisanymi.</p>

          {intent === 'add-event' && (
            <div className="auth-intent">
              <Icon.Plus strokeWidth={2.5} />
              <span>Aby dodać wydarzenie, potrzebne jest konto. Po zalogowaniu wrócisz do formularza.</span>
            </div>
          )}

          <button type="button" className="btn auth-google" onClick={google} disabled={!!busy}>
            <GoogleMark />
            {busy === 'google' ? 'Łączenie z Google…' : 'Kontynuuj z Google'}
          </button>

          <div className="auth-divider"><span>lub e-mailem</span></div>

          <form className="auth-form" onSubmit={submit} noValidate>
            <label className="form-field">
              <span>Adres e-mail</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                     placeholder="imie@example.com" autoComplete="email" />
            </label>
            <PasswordInput label="Hasło" value={pw} onChange={(e) => setPw(e.target.value)}
                           placeholder="Twoje hasło" autoComplete="current-password" />

            {error && <p className="form-error"><Icon.X strokeWidth={2.5} /> {error}</p>}

            <div className="auth-row">
              <label className="auth-check">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <span>Zapamiętaj mnie</span>
              </label>
              <button type="button" className="auth-link" onClick={() => onNavigate('reset')}>
                Nie pamiętasz hasła?
              </button>
            </div>

            <button type="submit" className="btn btn-primary auth-submit" disabled={!!busy}>
              {busy === 'email' ? 'Logowanie…' : 'Zaloguj się'}
            </button>
          </form>

          <p className="auth-alt">
            Nie masz konta?{' '}
            <button type="button" className="auth-link" onClick={() => onNavigate('register')}>Zarejestruj się</button>
          </p>
        </div>
        <AuthAside intent={intent} onNavigate={onNavigate} />
      </div>
    </main>
  );
}

// =============================================================
// REGISTER
// =============================================================
function RegisterScreen({ intent, onNavigate, onAuth }) {
  const [f, setF] = _auths({ name: '', email: '', pw: '', pw2: '' });
  const [terms, setTerms] = _auths(false);
  const [news, setNews] = _auths(false);
  const [error, setError] = _auths('');
  const [busy, setBusy] = _auths('');
  const set = (k) => (e) => setF(v => ({ ...v, [k]: e.target.value }));
  const score = pwScore(f.pw);
  const scoreLabel = ['', 'Słabe', 'Średnie', 'Dobre', 'Mocne'][score];

  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.email.trim() || !f.pw) { setError('Wypełnij imię, e-mail i hasło.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) { setError('To nie wygląda na poprawny adres e-mail.'); return; }
    if (f.pw.length < 8) { setError('Hasło musi mieć co najmniej 8 znaków.'); return; }
    if (f.pw !== f.pw2) { setError('Hasła nie są identyczne.'); return; }
    if (!terms) { setError('Zaakceptuj regulamin i politykę prywatności.'); return; }
    setError('');
    setBusy('email');
    setTimeout(() => onAuth({ name: f.name.trim(), email: f.email.trim(), provider: 'email', news }), 550);
  };

  const google = () => {
    setError('');
    setBusy('google');
    setTimeout(() => onAuth({ name: 'Kasia Nowak', email: 'kasia.nowak@gmail.com', provider: 'google' }), 900);
  };

  return (
    <main className="auth-page" data-screen-label="06 Rejestracja">
      <nav className="breadcrumb">
        <a onClick={() => onNavigate('home')}>Strona główna</a>
        <span className="sep">/</span>
        <span style={{ color: 'var(--on-surface)' }}>Rejestracja</span>
      </nav>

      <div className="auth-card">
        <div className="auth-main">
          <span className="ae-eyebrow">Nowe konto</span>
          <h1 className="auth-title">Utwórz konto</h1>
          <p className="auth-sub">Zajmie to minutę. Konto jest bezpłatne dla wszystkich użytkowników.</p>

          {intent === 'add-event' && (
            <div className="auth-intent">
              <Icon.Plus strokeWidth={2.5} />
              <span>Po utworzeniu konta wrócisz do formularza zgłoszenia wydarzenia.</span>
            </div>
          )}

          <button type="button" className="btn auth-google" onClick={google} disabled={!!busy}>
            <GoogleMark />
            {busy === 'google' ? 'Łączenie z Google…' : 'Zarejestruj się przez Google'}
          </button>

          <div className="auth-divider"><span>lub e-mailem</span></div>

          <form className="auth-form" onSubmit={submit} noValidate>
            <div className="form-grid auth-grid">
              <label className="form-field form-span-2">
                <span>Imię i nazwisko</span>
                <input value={f.name} onChange={set('name')} placeholder="np. Kasia Nowak" autoComplete="name" />
              </label>
              <label className="form-field form-span-2">
                <span>Adres e-mail</span>
                <input type="email" value={f.email} onChange={set('email')} placeholder="imie@example.com" autoComplete="email" />
              </label>
              <div className="form-field form-span-2" style={{ gap: 10 }}>
                <PasswordInput label="Hasło" hint="min. 8 znaków" value={f.pw} onChange={set('pw')}
                               placeholder="Ustaw hasło" autoComplete="new-password" />
                <div className="pw-meter" data-score={score}>
                  {[1, 2, 3, 4].map(i => <span key={i} className={`pw-bar ${score >= i ? 'is-on' : ''}`} />)}
                  {f.pw && <em>{scoreLabel}</em>}
                </div>
              </div>
              <div className="form-span-2">
                <PasswordInput label="Powtórz hasło" value={f.pw2} onChange={set('pw2')}
                               placeholder="Powtórz hasło" autoComplete="new-password" />
              </div>
            </div>

            {error && <p className="form-error"><Icon.X strokeWidth={2.5} /> {error}</p>}

            <div className="auth-checks">
              <label className="auth-check">
                <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
                <span>Akceptuję <a href="#">Regulamin</a> i <a href="#">Politykę prywatności</a> eventapp.</span>
              </label>
              <label className="auth-check">
                <input type="checkbox" checked={news} onChange={(e) => setNews(e.target.checked)} />
                <span>Chcę dostawać cotygodniowy przegląd wydarzeń w moim mieście. <em>opcjonalnie</em></span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary auth-submit" disabled={!!busy}>
              {busy === 'email' ? 'Tworzenie konta…' : 'Utwórz konto'}
            </button>
          </form>

          <p className="auth-alt">
            Masz już konto?{' '}
            <button type="button" className="auth-link" onClick={() => onNavigate('login')}>Zaloguj się</button>
          </p>
        </div>
        <AuthAside intent={intent} onNavigate={onNavigate} />
      </div>
    </main>
  );
}

// =============================================================
// PASSWORD RESET
// =============================================================
function ResetScreen({ onNavigate }) {
  const [email, setEmail] = _auths('');
  const [sent, setSent] = _auths(false);
  return (
    <main className="auth-page auth-page-narrow" data-screen-label="07 Reset hasła">
      <nav className="breadcrumb">
        <a onClick={() => onNavigate('login')}>Logowanie</a>
        <span className="sep">/</span>
        <span style={{ color: 'var(--on-surface)' }}>Reset hasła</span>
      </nav>
      <div className="auth-card auth-card-single">
        <div className="auth-main">
          <span className="ae-eyebrow">Pomoc</span>
          <h1 className="auth-title">Zresetuj hasło</h1>
          {sent ? (
            <>
              <p className="auth-sub">Wysłaliśmy link do ustawienia nowego hasła na <strong>{email}</strong>. Link działa 60 minut.</p>
              <button className="btn btn-primary auth-submit" onClick={() => onNavigate('login')}>Wróć do logowania</button>
            </>
          ) : (
            <>
              <p className="auth-sub">Podaj adres e-mail powiązany z kontem — wyślemy link do ustawienia nowego hasła.</p>
              <form className="auth-form" onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSent(true); }}>
                <label className="form-field">
                  <span>Adres e-mail</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="imie@example.com" />
                </label>
                <button type="submit" className="btn btn-primary auth-submit">Wyślij link</button>
              </form>
              <p className="auth-alt">
                <button type="button" className="auth-link" onClick={() => onNavigate('login')}>Wróć do logowania</button>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

// =============================================================
// HEADER USER MENU
// =============================================================
function UserMenu({ user, onNavigate, onLogout }) {
  const [open, setOpen] = _auths(false);
  const initials = user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div className="user-menu-wrap">
      <button className="user-chip" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="user-avatar">{initials}</span>
        <span className="user-chip-name">{user.name.split(' ')[0]}</span>
        <Icon.ChevronDown />
      </button>
      {open && (
        <>
          <div className="user-menu-scrim" onClick={() => setOpen(false)} />
          <div className="user-menu">
            <div className="user-menu-head">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
              {user.provider === 'google' && <span className="user-provider"><GoogleMark /> Konto Google</span>}
            </div>
            <button onClick={() => { setOpen(false); onNavigate('add-event'); }}><Icon.Plus /> Dodaj wydarzenie</button>
            <button onClick={() => setOpen(false)}><Icon.Heart /> Zapisane wydarzenia</button>
            <button onClick={() => setOpen(false)}><Icon.User /> Ustawienia konta</button>
            <div className="user-menu-sep" />
            <button onClick={() => { setOpen(false); onLogout(); }}><Icon.LogOut /> Wyloguj się</button>
          </div>
        </>
      )}
    </div>
  );
}

Object.assign(window, { LoginScreen, RegisterScreen, ResetScreen, UserMenu, GoogleMark });
