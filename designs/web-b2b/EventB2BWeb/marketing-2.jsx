// eventapp B2B Marketing — Part 2: features, roadmap, comparison, pricing, FAQ, CTA, footer, mount

/* === Features grid === */
;(function(){
  const { MIcons, MPill } = window;

  const FEATURES = [
    {
      cat: "now",
      icon: <MIcons.Map size={20}/>,
      t: "Pin na mapie miasta",
      d: "Twój lokal i wszystkie eventy widoczne na interaktywnej mapie. 12 kategorii, własna ikona pinezki, otwarcie profilu jednym tapnięciem.",
    },
    {
      cat: "now",
      icon: <MIcons.Calendar size={20}/>,
      t: "Publikacja w 90 sekund",
      d: "Tytuł, data, godzina, miejsce, zdjęcie, opis, link do biletu, kategoria. Wszystko z jednego formularza, z podglądem na żywo.",
    },
    {
      cat: "now",
      icon: <MIcons.Bell size={20}/>,
      t: "Push do obserwujących",
      d: "Jedno powiadomienie dziennie do wszystkich, którzy obserwują Twój lokal w aplikacji mobilnej. Średnio 35% otwarć.",
    },
    {
      cat: "now",
      icon: <MIcons.BarChart size={20}/>,
      t: "Analityka eventu",
      d: "Wyświetlenia, kliknięcia w bilet, kliknięcia w nawigację, wzrost obserwujących, otwarcia push. Tygodniowy digest na e-mail.",
    },
    {
      cat: "now",
      icon: <MIcons.Repeat size={20}/>,
      t: "Wydarzenia cykliczne",
      d: "Ustaw raz — „Co wtorek od 20:30 do 30 czerwca” — i daj sobie spokój. Każde wystąpienie ma własną statystykę.",
    },
    {
      cat: "now",
      icon: <MIcons.Image size={20}/>,
      t: "Zdjęcia i galeria lokalu",
      d: "Zdjęcie tła, galeria do 8 zdjęć, opis, godziny otwarcia, kategoria, social media, telefon, e-mail. Profil, który wygląda jak należy.",
    },
    {
      cat: "now",
      icon: <MIcons.Users size={20}/>,
      t: "Wielu organizatorów",
      d: "Zaproś menedżera, bookera lub osobę od social media. Każdy ze swoim loginem, audyt zmian, jeden panel.",
    },
    {
      cat: "now",
      icon: <MIcons.Globe size={20}/>,
      t: "Otwarte linki i SEO",
      d: "Każdy event ma własny adres URL, OG-tagi pod podgląd na Facebooku i tagi dla Google. Udostępniasz raz, indeksuje się samo.",
    },
    {
      cat: "next",
      icon: <MIcons.Sparkles size={20}/>,
      t: "Auto-grafiki na social media",
      d: "Jednym kliknięciem generujesz post na Instagram, Story i Facebook. Twój layout, Twoja typografia, dane z eventu.",
      eta: "Q3 2026",
    },
    {
      cat: "next",
      icon: <MIcons.Ticket size={20}/>,
      t: "Integracje biletowe",
      d: "Deep linki do eBilet, Going, Kupbilety i Goout. Statystyki klików w obu kierunkach, bez ręcznego przepisywania.",
      eta: "Q3 2026",
    },
    {
      cat: "next",
      icon: <MIcons.Heart size={20}/>,
      t: "Segmenty obserwujących",
      d: "Push tylko do osób, które byli już na koncercie tego artysty. Lub tylko do nowych. Lub tylko do warszawiaków.",
      eta: "Q4 2026",
    },
    {
      cat: "later",
      icon: <MIcons.Star size={20}/>,
      t: "Karty stałego klienta",
      d: "Twój własny program lojalnościowy — punkty za bilet, zniżki dla VIP-ów, dostęp do przedsprzedaży tylko dla obserwujących.",
      eta: "Faza 5",
    },
    {
      cat: "later",
      icon: <MIcons.Flame size={20}/>,
      t: "Promowane wydarzenie",
      d: "Wybijaj się ponad konkurencję — Twój event wyżej w mapie i kanale w dni z największym ruchem.",
      eta: "Faza 5",
    },
    {
      cat: "later",
      icon: <MIcons.Ticket size={20}/>,
      t: "Natywna sprzedaż biletów",
      d: "Bilety w aplikacji, walidacja przy wejściu, raporty post-event. Prowizja niższa niż u dotychczasowych operatorów.",
      eta: "Faza 5",
    },
  ];

  const TONES = {
    now:   { label: "Dostępne teraz",   tone: "success", icon: <MIcons.CheckCircle size={11}/> },
    next:  { label: "W produkcji",      tone: "brand",   icon: <MIcons.Sparkles size={11}/> },
    later: { label: "Plan długoterminowy", tone: "amber", icon: <MIcons.Layers size={11}/> },
  };

  const Features = () => {
    const [filter, setFilter] = React.useState("all");
    const filtered = filter === "all" ? FEATURES : FEATURES.filter(f => f.cat === filter);
    return (
      <section id="features" style={{padding: "96px 0", borderTop: "1px solid var(--outline)"}}>
        <div className="mw">
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap",
            gap: 24, marginBottom: 48}}>
            <div style={{display: "flex", flexDirection: "column", gap: 16, maxWidth: 640}}>
              <span className="eyebrow">Funkcje</span>
              <h2 className="h-section">
                Co działa teraz, <span className="gradient-text">co budujemy</span>, co przyjdzie później
              </h2>
              <p className="lead">
                Roadmapa jest publiczna. Nigdy nie sprzedajemy obietnic — tylko to, co już można kliknąć.
              </p>
            </div>
            <div style={{
              display: "inline-flex", padding: 4, borderRadius: 9999,
              background: "var(--surface-mid)", gap: 4,
            }}>
              {[
                { v: "all",   label: "Wszystko" },
                { v: "now",   label: "Teraz" },
                { v: "next",  label: "Wkrótce" },
                { v: "later", label: "Później" },
              ].map(t => (
                <button key={t.v} onClick={() => setFilter(t.v)} style={{
                  border: 0, height: 36, padding: "0 16px", borderRadius: 9999,
                  cursor: "pointer",
                  background: filter === t.v ? "var(--surface-high)" : "transparent",
                  color: filter === t.v ? "var(--on-surface)" : "var(--on-surface-variant)",
                  fontSize: 13, fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                  boxShadow: filter === t.v ? "var(--shadow-sm)" : "none",
                  transition: "all 200ms var(--ease-out)",
                }}>{t.label}</button>
              ))}
            </div>
          </div>

          <div style={{display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 16}}>
            {filtered.map((f, i) => {
              const t = TONES[f.cat];
              return (
                <div key={i} style={{
                  background: "var(--surface-high)",
                  borderRadius: 20, padding: 22,
                  border: "1px solid var(--outline)",
                  display: "flex", flexDirection: "column", gap: 14,
                  position: "relative",
                  transition: "transform 200ms var(--ease-out), box-shadow 200ms var(--ease-out)",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8}}>
                    <span style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: f.cat === "now"
                        ? "linear-gradient(135deg, rgba(108,63,235,0.10), rgba(169,126,248,0.18))"
                        : f.cat === "next"
                          ? "linear-gradient(135deg, rgba(108,63,235,0.10), rgba(169,126,248,0.18))"
                          : "linear-gradient(135deg, rgba(249,115,22,0.10), rgba(255,184,77,0.18))",
                      color: f.cat === "later" ? "#92400E" : "var(--brand-primary)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      flex: "0 0 auto",
                    }}>{f.icon}</span>
                    <MPill tone={t.tone} icon={t.icon}>{f.eta || t.label}</MPill>
                  </div>
                  <div>
                    <h3 style={{margin: 0, fontSize: 17, fontWeight: 700, letterSpacing: "-0.3px",
                      color: "var(--on-surface)"}}>{f.t}</h3>
                    <p style={{margin: "8px 0 0", fontSize: 14, lineHeight: 1.5,
                      color: "var(--on-surface-variant)"}}>{f.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };
  window.MFeatures = Features;
})();


/* === Roadmap timeline === */
;(function(){
  const { MIcons } = window;

  const Roadmap = () => {
    const phases = [
      {
        when: "Faza 0 · Tydzień 1–2",
        status: "done",
        title: "Fundamenty",
        items: [
          "Polityka prywatności, regulamin, zgodność z RODO",
          "Schema bazy danych: eventy, lokale, użytkownicy, zgłoszenia",
          "Pipeline agregacji eventów z portali miejskich i RSS",
          "Design system, tokens, biblioteka komponentów",
        ],
      },
      {
        when: "Faza 1 · Tydzień 3–6",
        status: "done",
        title: "Aplikacja B2C i panel",
        items: [
          "iOS i Android — mapa, kanał, profil lokalu, profil eventu",
          "Push notifications (FCM + APNs) z opt-in",
          "Panel B2B: przejęcie lokalu, weryfikacja, edycja",
          "Dodawanie eventów, statusy moderacji, statystyki podstawowe",
        ],
      },
      {
        when: "Faza 2 · Tydzień 7–10",
        status: "now",
        title: "Skala i jakość",
        items: [
          "Pełny dashboard analityki — kliki, push, obserwujący",
          "Wydarzenia cykliczne i serie",
          "Deep linki dla aplikacji mobilnej",
          "i18n (PL + EN), accessibility WCAG 2.1 AA",
        ],
      },
      {
        when: "Faza 3 · Miesiące 4–6",
        status: "next",
        title: "Monetyzacja i integracje",
        items: [
          "Auto-grafiki na social media (Instagram, Stories, FB)",
          "Integracje biletowe: eBilet, Going, Kupbilety, Goout",
          "Plan Pro: nielimitowane eventy, priorytetowa moderacja, pełna analityka",
          "Stripe Checkout + Customer Portal dla subskrypcji",
        ],
      },
      {
        when: "Faza 4 · Miesiące 7–12",
        status: "later",
        title: "Promocja i segmentacja",
        items: [
          "Segmenty obserwujących (lokalizacja, historia, kategoria)",
          "Promowane wydarzenia — wybijanie się na mapie",
          "Hyper-Boost — kontekstowa promocja",
          "Sceny tematyczne (np. „Wino i jazz”), miejskie ścieżki",
        ],
      },
      {
        when: "Faza 5 · Rok 2",
        status: "later",
        title: "Bilety i lojalność",
        items: [
          "Natywna sprzedaż biletów + walidacja przy wejściu",
          "Karty stałego klienta i programy lojalnościowe",
          "Ankiety po wydarzeniu",
          "API dla zewnętrznych systemów (POS, CRM)",
        ],
      },
    ];

    const STATUS = {
      done:  { label: "Gotowe",     color: "#1F8A5B", bg: "#DBF3E6", dot: "#1F8A5B" },
      now:   { label: "W realizacji", color: "#6C3FEB", bg: "var(--brand-primary-container)", dot: "#6C3FEB" },
      next:  { label: "Zaplanowane", color: "#92400E", bg: "#FFECCC", dot: "#F97316" },
      later: { label: "Wizja",       color: "var(--on-surface-variant)", bg: "var(--surface-mid)", dot: "var(--on-surface-muted)" },
    };

    return (
      <section id="roadmap" style={{
        padding: "96px 0",
        background: "var(--on-surface)",
        color: "#fff",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative glow */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(circle at 80% 30%, rgba(108,63,235,0.25) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(169,126,248,0.18) 0%, transparent 50%)",
        }}/>
        <div className="mw" style={{position: "relative"}}>
          <div style={{display: "flex", flexDirection: "column", gap: 16, marginBottom: 64, maxWidth: 720}}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 12, fontWeight: 600, letterSpacing: "1.4px",
              textTransform: "uppercase", color: "#A97EF8",
            }}>
              <span style={{width: 24, height: 1.5, background: "#A97EF8"}}/>
              Mapa rozwoju
            </span>
            <h2 className="h-section" style={{color: "#fff"}}>
              Wszystkie karty na stole.<br/>
              <span style={{color: "rgba(255,255,255,0.6)"}}>Nic w ukryciu.</span>
            </h2>
            <p className="lead" style={{color: "rgba(255,255,255,0.65)"}}>
              Sześć faz, 12 miesięcy, jeden cel: zostać domyślnym miejscem, w którym mieszkańcy 7 miast szukają eventów.
            </p>
          </div>

          <div style={{position: "relative", paddingLeft: 24}}>
            {/* Vertical line */}
            <div style={{
              position: "absolute", left: 7, top: 12, bottom: 12, width: 2,
              background: "linear-gradient(180deg, rgba(108,63,235,0.6) 0%, rgba(169,126,248,0.3) 50%, rgba(255,255,255,0.05) 100%)",
            }}/>

            {phases.map((p, i) => {
              const s = STATUS[p.status];
              return (
                <div key={i} style={{position: "relative", paddingLeft: 32, paddingBottom: i === phases.length-1 ? 0 : 40}}>
                  {/* Node */}
                  <span style={{
                    position: "absolute", left: -8, top: 6,
                    width: 18, height: 18, borderRadius: 9999,
                    background: s.dot,
                    border: "3px solid var(--on-surface)",
                    boxShadow: p.status === "now" ? `0 0 0 4px ${s.dot}40` : "none",
                  }}/>

                  <div style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 20, padding: 24,
                    backdropFilter: "blur(20px)",
                  }}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center",
                      gap: 12, flexWrap: "wrap", marginBottom: 14}}>
                      <div>
                        <div style={{fontSize: 11, fontWeight: 600, letterSpacing: "1.2px",
                          textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8}}>
                          {p.when}
                        </div>
                        <h3 style={{margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px"}}>
                          {p.title}
                        </h3>
                      </div>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "6px 12px", borderRadius: 9999,
                        background: p.status === "now" ? "rgba(108,63,235,0.18)" : "rgba(255,255,255,0.08)",
                        color: p.status === "now" ? "#A97EF8" : "rgba(255,255,255,0.7)",
                        fontSize: 12, fontWeight: 600, letterSpacing: "0.4px",
                      }}>
                        <span style={{width: 6, height: 6, borderRadius: 9999, background: s.dot,
                          animation: p.status === "now" ? "mPulseDot 1.6s ease-in-out infinite" : "none"}}/>
                        {s.label}
                      </span>
                    </div>

                    <ul style={{margin: 0, padding: 0, listStyle: "none",
                      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10}}>
                      {p.items.map((it, j) => (
                        <li key={j} style={{
                          display: "flex", gap: 10, alignItems: "flex-start",
                          fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.45,
                        }}>
                          <MIcons.Check size={14} stroke={p.status === "done" ? "#5AD296" : p.status === "now" ? "#A97EF8" : "rgba(255,255,255,0.4)"} strokeWidth={2.5} style={{flex: "0 0 auto", marginTop: 3}}/>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Goal banner */}
          <div style={{
            marginTop: 56,
            background: "linear-gradient(135deg, rgba(108,63,235,0.18), rgba(169,126,248,0.08))",
            border: "1px solid rgba(169,126,248,0.3)",
            borderRadius: 24, padding: 32,
            display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap",
          }}>
            <div style={{flex: "1 1 320px"}}>
              <div style={{fontSize: 11, fontWeight: 600, letterSpacing: "1.2px",
                textTransform: "uppercase", color: "#A97EF8", marginBottom: 8}}>
                Cel proof-of-concept · 3 miesiące od startu
              </div>
              <div style={{fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px", lineHeight: 1.25}}>
                7 miast · 1 000+ wydarzeń · 200 przejętych lokali · 120 aktywnych organizatorów
              </div>
            </div>
            <div style={{display: "flex", gap: 24, flexWrap: "wrap"}}>
              {[
                { k: "7",    l: "miast" },
                { k: "1 000+", l: "eventów" },
                { k: "200",  l: "lokali" },
                { k: "60%",  l: "aktywacji" },
              ].map((kpi, i) => (
                <div key={i}>
                  <div style={{fontSize: 28, fontWeight: 700, letterSpacing: "-0.6px",
                    color: "#fff", lineHeight: 1}}>{kpi.k}</div>
                  <div style={{fontSize: 11, fontWeight: 500, letterSpacing: "1.2px",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 6}}>{kpi.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  window.MRoadmap = Roadmap;
})();


/* === Comparison === */
;(function(){
  const { MIcons } = window;

  const Compare = () => {
    const rows = [
      { label: "Mapa miasta",                    ea: "yes",      fb: "no",       eb: "partial",  cp: "yes"   },
      { label: "Push notifications do fanów",    ea: "yes",      fb: "no",       eb: "partial",  cp: "no"    },
      { label: "Bez algorytmu — pełny zasięg",   ea: "yes",      fb: "no",       eb: "partial",  cp: "yes"   },
      { label: "Wydarzenia cykliczne",            ea: "yes",      fb: "partial",  eb: "yes",      cp: "partial" },
      { label: "Statystyki eventów",              ea: "yes",      fb: "partial",  eb: "yes",      cp: "no"    },
      { label: "Profil lokalu z galerią",         ea: "yes",      fb: "yes",      eb: "no",       cp: "partial" },
      { label: "Wiele osób w panelu",             ea: "yes",      fb: "yes",      eb: "yes",      cp: "no"    },
      { label: "Wsparcie organizatora po PL",     ea: "yes",      fb: "no",       eb: "partial",  cp: "yes"   },
      { label: "Prowizja od biletu",              ea: "0%",       fb: "—",        eb: "ok. 5–10%", cp: "—"     },
      { label: "Cena bazowa",                     ea: "0 zł",     fb: "0 zł",     eb: "0 zł",     cp: "—"     },
    ];

    const cols = [
      { id: "ea",  name: "eventapp",       sub: "dla organizatorów", brand: true },
      { id: "fb",  name: "Facebook Events", sub: "Meta" },
      { id: "eb",  name: "Eventbrite / Going", sub: "Biletownie" },
      { id: "cp",  name: "Portale miejskie", sub: "Karnet, Going OUT" },
    ];

    const Cell = ({ v, brand }) => {
      if (v === "yes")
        return <MIcons.CheckCircle size={20} stroke={brand ? "var(--brand-primary)" : "#1F8A5B"} strokeWidth={2}/>;
      if (v === "no")
        return <MIcons.X size={18} stroke="var(--on-surface-muted)" strokeWidth={2}/>;
      if (v === "partial")
        return <MIcons.Minus size={18} stroke="var(--on-surface-muted)" strokeWidth={2}/>;
      return <span style={{fontSize: 14, fontWeight: 600,
        color: brand ? "var(--brand-primary)" : "var(--on-surface-variant)"}}>{v}</span>;
    };

    return (
      <section id="compare" style={{padding: "96px 0", borderTop: "1px solid var(--outline)"}}>
        <div className="mw">
          <div style={{display: "flex", flexDirection: "column", gap: 16, marginBottom: 48,
            maxWidth: 720, margin: "0 auto 48px", alignItems: "center", textAlign: "center"}}>
            <span className="eyebrow">Porównanie</span>
            <h2 className="h-section">
              Gdzie publikujesz dziś, <span className="gradient-text">a gdzie warto</span>
            </h2>
            <p className="lead">
              Nie zastępujemy Facebooka — uzupełniamy go. eventapp to miejsce, w którym ludzie szukają eventów,
              a nie scrollują pamiątki znajomych.
            </p>
          </div>

          <div style={{
            background: "var(--surface-high)",
            borderRadius: 24, overflow: "hidden",
            border: "1px solid var(--outline)",
            boxShadow: "var(--shadow-sm)",
          }}>
            <table style={{width: "100%", borderCollapse: "collapse"}}>
              <thead>
                <tr>
                  <th style={{padding: "20px 24px", textAlign: "left",
                    fontSize: 11, fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase",
                    color: "var(--on-surface-muted)", background: "var(--surface-low)",
                    width: "32%"}}>
                    Funkcja
                  </th>
                  {cols.map(c => (
                    <th key={c.id} style={{
                      padding: "20px 24px", textAlign: "center",
                      background: c.brand ? "linear-gradient(180deg, var(--brand-primary-container) 0%, var(--surface-high) 100%)" : "var(--surface-low)",
                      borderLeft: c.brand ? "2px solid var(--brand-primary)" : "1px solid var(--outline)",
                      borderRight: c.brand ? "2px solid var(--brand-primary)" : undefined,
                      position: "relative",
                    }}>
                      <div style={{fontSize: 15, fontWeight: 700,
                        color: c.brand ? "var(--brand-primary)" : "var(--on-surface)"}}>
                        {c.name}
                      </div>
                      <div style={{fontSize: 11, color: c.brand ? "var(--brand-primary)" : "var(--on-surface-muted)",
                        fontWeight: 500, marginTop: 2}}>
                        {c.sub}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{borderTop: "1px solid var(--outline)"}}>
                    <td style={{padding: "16px 24px", fontSize: 14, fontWeight: 500, color: "var(--on-surface)"}}>
                      {r.label}
                    </td>
                    {cols.map(c => (
                      <td key={c.id} style={{
                        padding: "16px 24px", textAlign: "center",
                        background: c.brand ? "rgba(108,63,235,0.04)" : "transparent",
                        borderLeft: c.brand ? "2px solid var(--brand-primary)" : "1px solid var(--outline)",
                        borderRight: c.brand ? "2px solid var(--brand-primary)" : undefined,
                      }}>
                        <Cell v={r[c.id]} brand={c.brand}/>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{fontSize: 12, color: "var(--on-surface-muted)", marginTop: 16, textAlign: "center"}}>
            Stan na maj 2026. Porównanie oparte na publicznie dostępnych funkcjach platform — sprawdź u dostawców przed wdrożeniem.
          </p>
        </div>
      </section>
    );
  };
  window.MCompare = Compare;
})();


Object.assign(window, { __ready_part2: true });
