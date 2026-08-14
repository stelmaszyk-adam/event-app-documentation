// Add Event screen for eventapp Web B2C
function AddEventScreen({ onNavigate, onCreate, user }) {
  const { useState: _aes } = React;
  const [form, setForm] = _aes({ name: '', venueId: '', startTime: '', endTime: '', category: '', description: '', price: '', ticketUrl: '', city: '', postCode: '', street: '', number: '', subNumber: '' });
  const [error, setError] = _aes('');
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const categories = CATEGORIES.filter(c => !c.special);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.venueId || !form.startTime || !form.category || !form.description || form.price === '' || !form.ticketUrl || !form.city || !form.postCode || !form.street || !form.number) {
      setError('Wypełnij wszystkie wymagane pola.');
      return;
    }
    onCreate(form);
  };

  return (
    <main className="detail-page" data-screen-label="Dodaj wydarzenie">
      <nav className="breadcrumb">
        <a onClick={() => onNavigate('home')}>Strona główna</a>
        <span className="sep">/</span>
        <span style={{ color: 'var(--on-surface)' }}>Dodaj wydarzenie</span>
      </nav>

      <div className="add-event-wrap">
        <header className="ae-hero">
          <span className="ae-eyebrow">Zgłoszenie</span>
          <h1 className="ae-title">Dodaj nowe wydarzenie</h1>
          <p className="ae-sub">Wypełnij formularz, aby zgłosić wydarzenie do bazy eventapp. Pola oznaczone gwiazdką są wymagane.</p>
          {user && (
            <p className="ae-asuser"><Icon.User /> Zgłaszasz jako <strong>{user.name}</strong> · {user.email}</p>
          )}
        </header>

        <div className="organizer-callout">
          <span className="organizer-callout-icon"><Icon.Sparkles /></span>
          <div className="organizer-callout-text">
            <strong>Jesteś organizatorem?</strong>
            <p>Zarządzaj wydarzeniami, miejscami i statystykami z jednego miejsca.</p>
          </div>
          <a className="btn organizer-callout-btn" href="https://dashboard.eventapp.dev" target="_blank" rel="noopener noreferrer">
            Panel Organizatora <Icon.ArrowUpRight />
          </a>
        </div>

        <form className="ae-form" onSubmit={submit}>
          <section className="ae-card">
            <div className="ae-card-head">
              <span className="ae-step">1</span>
              <div>
                <h2>Podstawowe informacje</h2>
                <p>Nazwa, miejsce i opis, które zobaczą użytkownicy.</p>
              </div>
            </div>
            <div className="form-grid">
              <label className="form-field form-span-2">
                <span>Nazwa wydarzenia *</span>
                <input value={form.name} onChange={set('name')} placeholder="np. Nils Frahm — All Encores Tour" required />
              </label>
              <label className="form-field">
                <span>Miejsce *</span>
                <select value={form.venueId} onChange={set('venueId')} required>
                  <option value="" disabled>Wybierz miejsce</option>
                  {VENUES.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </label>
              <label className="form-field">
                <span>Kategoria *</span>
                <select value={form.category} onChange={set('category')} required>
                  <option value="" disabled>Wybierz kategorię</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </label>
              <label className="form-field form-span-2">
                <span>Opis *</span>
                <textarea rows="5" value={form.description} onChange={set('description')} placeholder="Krótki opis wydarzenia…" required></textarea>
              </label>
            </div>
          </section>

          <section className="ae-card">
            <div className="ae-card-head">
              <span className="ae-step">2</span>
              <div>
                <h2>Termin i bilety</h2>
                <p>Kiedy się odbywa i gdzie kupić wejściówkę.</p>
              </div>
            </div>
            <div className="form-grid">
              <label className="form-field">
                <span>Początek *</span>
                <input type="datetime-local" value={form.startTime} onChange={set('startTime')} required />
              </label>
              <label className="form-field">
                <span>Koniec <em>opcjonalnie</em></span>
                <input type="datetime-local" value={form.endTime} onChange={set('endTime')} />
              </label>
              <label className="form-field">
                <span>Cena biletu (zł) *</span>
                <input type="number" min="0" step="1" value={form.price} onChange={set('price')} placeholder="0 = bezpłatne" required />
              </label>
              <label className="form-field">
                <span>Link do biletów *</span>
                <input type="url" value={form.ticketUrl} onChange={set('ticketUrl')} placeholder="https://…" required />
              </label>
            </div>
          </section>

          <section className="ae-card">
            <div className="ae-card-head">
              <span className="ae-step">3</span>
              <div>
                <h2>Adres</h2>
                <p>Dokładna lokalizacja — używamy jej na mapie.</p>
              </div>
            </div>
            <div className="form-grid ae-grid-address">
              <label className="form-field ae-col-street">
                <span>Ulica *</span>
                <input value={form.street} onChange={set('street')} placeholder="np. Wenecjańska" required />
              </label>
              <label className="form-field">
                <span>Numer *</span>
                <input value={form.number} onChange={set('number')} placeholder="9" required />
              </label>
              <label className="form-field">
                <span>Lokal <em>opcjonalnie</em></span>
                <input value={form.subNumber} onChange={set('subNumber')} placeholder="3" />
              </label>
              <label className="form-field">
                <span>Kod pocztowy *</span>
                <input value={form.postCode} onChange={set('postCode')} placeholder="61-108" required />
              </label>
              <label className="form-field ae-col-city">
                <span>Miasto *</span>
                <input value={form.city} onChange={set('city')} placeholder="np. Poznań" required />
              </label>
            </div>
          </section>

          {error && <p className="form-error"><Icon.X /> {error}</p>}

          <div className="form-actions">
            <p className="form-actions-note">Zgłoszenie trafia do moderacji — zwykle w ciągu 24 h.</p>
            <button type="button" className="btn btn-secondary" onClick={() => onNavigate('home')}>Anuluj</button>
            <button type="submit" className="btn ae-submit"><Icon.Plus /> Opublikuj wydarzenie</button>
          </div>
        </form>
      </div>
    </main>
  );
}

Object.assign(window, { AddEventScreen });
