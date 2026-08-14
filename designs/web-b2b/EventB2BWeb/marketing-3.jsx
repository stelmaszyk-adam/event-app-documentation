// eventapp B2B Marketing — Part 3: pricing, FAQ, CTA, footer, mount

/* === Pricing === */
;(function(){
  const { MIcons, MBtn, MPill } = window;

  const Pricing = () => {
    const plans = [
      {
        id: "free",
        name: "Free",
        tagline: "Dla każdego lokalu, który chce być na mapie",
        price: "0 zł",
        priceSub: "na zawsze",
        cta: "Przejmij lokal",
        ctaVariant: "secondary",
        highlight: false,
        features: [
          "Przejęcie lokalu i profil publiczny",
          "Do 2 eventów miesięcznie",
          "Statystyki podstawowe — wyświetlenia",
          "Profil w wynikach wyszukiwania",
          "Wsparcie e-mail",
        ],
        notAvailable: [
          "Powiadomienia push do obserwujących",
          "Wydarzenia cykliczne",
          "Pełna analityka",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        tagline: "Dla aktywnych klubów, sal i centrów kultury",
        price: "149 zł",
        priceSub: "miesięcznie · netto",
        cta: "Lista oczekujących",
        ctaVariant: "primary",
        highlight: true,
        badge: "Od Q3 2026",
        features: [
          "Wszystko z planu Free",
          "Nielimitowane eventy",
          "Push do obserwujących (1× dziennie)",
          "Wydarzenia cykliczne i serie",
          "Pełna analityka — kliki, push, źródła ruchu",
          "Priorytetowa moderacja (4 godziny)",
          "Auto-grafiki na social media",
          "Wsparcie telefoniczne",
        ],
      },
      {
        id: "city",
        name: "City",
        tagline: "Dla wydziałów kultury i lokalnych mediów",
        price: "Wycena",
        priceSub: "indywidualna",
        cta: "Porozmawiajmy",
        ctaVariant: "dark",
        highlight: false,
        features: [
          "Wszystko z planu Pro",
          "Wielu lokali w jednym panelu",
          "Logowanie SSO i SAML",
          "Współbranding profili",
          "Eksport danych i dostęp do API",
          "Dedykowany opiekun",
          "SLA 99,9%",
        ],
      },
    ];

    return (
      <section id="pricing" style={{padding: "96px 0", borderTop: "1px solid var(--outline)"}}>
        <div className="mw">
          <div style={{display: "flex", flexDirection: "column", gap: 16, marginBottom: 56,
            maxWidth: 720, margin: "0 auto 56px", alignItems: "center", textAlign: "center"}}>
            <span className="eyebrow">Cennik</span>
            <h2 className="h-section">
              Dziś wszystko <span className="gradient-text">za darmo</span>.<br/>
              Później — uczciwie i przewidywalnie.
            </h2>
            <p className="lead">
              W okresie PoC (3 miesiące) wszystkie funkcje są bezpłatne dla każdego lokalu.
              Plan Pro pojawi się po stronie produktu wtedy, kiedy będzie czym płacić — nie wcześniej.
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20, maxWidth: 1100, margin: "0 auto",
          }}>
            {plans.map(p => (
              <div key={p.id} style={{
                background: p.highlight
                  ? "linear-gradient(180deg, var(--on-surface) 0%, #1A1A2E 100%)"
                  : "var(--surface-high)",
                color: p.highlight ? "#fff" : "var(--on-surface)",
                borderRadius: 24, padding: 32,
                border: p.highlight ? "1px solid rgba(169,126,248,0.4)" : "1px solid var(--outline)",
                boxShadow: p.highlight
                  ? "var(--shadow-xl), 0 32px 64px -16px rgba(108,63,235,0.4)"
                  : "var(--shadow-sm)",
                display: "flex", flexDirection: "column", gap: 20,
                position: "relative",
                transform: p.highlight ? "translateY(-12px)" : "none",
              }}>
                {p.highlight && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    padding: "6px 16px", borderRadius: 9999,
                    background: "linear-gradient(135deg, #6C3FEB, #A97EF8)",
                    color: "#fff", fontSize: 11, fontWeight: 600,
                    letterSpacing: "1px", textTransform: "uppercase",
                    boxShadow: "0 8px 20px rgba(108,63,235,0.4)",
                  }}>
                    Najczęściej wybierany
                  </div>
                )}

                <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                  <div style={{display: "flex", alignItems: "center", gap: 10}}>
                    <h3 style={{margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px"}}>{p.name}</h3>
                    {p.badge && (
                      <span style={{
                        padding: "3px 9px", borderRadius: 9999,
                        background: p.highlight ? "rgba(255,255,255,0.12)" : "var(--surface-mid)",
                        color: p.highlight ? "rgba(255,255,255,0.85)" : "var(--on-surface-variant)",
                        fontSize: 10.5, fontWeight: 600,
                        letterSpacing: "0.8px", textTransform: "uppercase",
                      }}>{p.badge}</span>
                    )}
                  </div>
                  <div style={{fontSize: 13, color: p.highlight ? "rgba(255,255,255,0.65)" : "var(--on-surface-variant)",
                    lineHeight: 1.4}}>{p.tagline}</div>
                </div>

                <div style={{display: "flex", alignItems: "baseline", gap: 8}}>
                  <span style={{fontSize: 44, fontWeight: 700, letterSpacing: "-1.5px", lineHeight: 1}}>{p.price}</span>
                  <span style={{fontSize: 13, color: p.highlight ? "rgba(255,255,255,0.55)" : "var(--on-surface-variant)"}}>{p.priceSub}</span>
                </div>

                <MBtn variant={p.ctaVariant} size="md" iconRight={<MIcons.Arrow size={14}/>}>{p.cta}</MBtn>

                <div style={{height: 1, background: p.highlight ? "rgba(255,255,255,0.1)" : "var(--outline)"}}/>

                <ul style={{margin: 0, padding: 0, listStyle: "none",
                  display: "flex", flexDirection: "column", gap: 10}}>
                  {p.features.map((f, i) => (
                    <li key={i} style={{
                      display: "flex", gap: 10, alignItems: "flex-start",
                      fontSize: 14, lineHeight: 1.45,
                      color: p.highlight ? "rgba(255,255,255,0.92)" : "var(--on-surface)",
                    }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: 9999, flex: "0 0 auto", marginTop: 1,
                        background: p.highlight
                          ? "linear-gradient(135deg, #6C3FEB, #A97EF8)"
                          : "var(--brand-primary-container)",
                        color: p.highlight ? "#fff" : "var(--brand-primary)",
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <MIcons.Check size={11} strokeWidth={3}/>
                      </span>
                      {f}
                    </li>
                  ))}
                  {p.notAvailable && p.notAvailable.map((f, i) => (
                    <li key={"na"+i} style={{
                      display: "flex", gap: 10, alignItems: "flex-start",
                      fontSize: 14, lineHeight: 1.45,
                      color: "var(--on-surface-muted)",
                    }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: 9999, flex: "0 0 auto", marginTop: 1,
                        background: "var(--surface-mid)",
                        color: "var(--on-surface-muted)",
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <MIcons.Minus size={11} strokeWidth={2.5}/>
                      </span>
                      <span style={{textDecoration: "line-through", textDecorationThickness: 1}}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{textAlign: "center", marginTop: 32, fontSize: 13, color: "var(--on-surface-variant)"}}>
            Wszystkie ceny netto. Płatność miesięczna, anuluj w każdej chwili. Pierwsze 30 dni Pro za darmo dla pierwszych 20 lokali w każdym mieście.
          </div>
        </div>
      </section>
    );
  };
  window.MPricing = Pricing;
})();


/* === FAQ === */
;(function(){
  const { MIcons } = window;

  const FAQItem = ({ q, a, defaultOpen }) => {
    const [open, setOpen] = React.useState(!!defaultOpen);
    return (
      <div style={{
        background: "var(--surface-high)",
        borderRadius: 16, padding: "4px 4px",
        border: "1px solid var(--outline)",
        overflow: "hidden",
      }}>
        <button onClick={() => setOpen(o => !o)} style={{
          all: "unset", cursor: "pointer", width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16, padding: "18px 20px",
        }}>
          <span style={{fontSize: 16, fontWeight: 600, color: "var(--on-surface)",
            letterSpacing: "var(--tracking-body-l)"}}>{q}</span>
          <span style={{
            width: 30, height: 30, borderRadius: 9999, flex: "0 0 auto",
            background: open ? "var(--brand-primary)" : "var(--surface-mid)",
            color: open ? "#fff" : "var(--on-surface-variant)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            transition: "all 200ms var(--ease-out)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}>
            <MIcons.Plus size={14} strokeWidth={2.5}/>
          </span>
        </button>
        {open && (
          <div style={{
            padding: "0 20px 18px", animation: "mFadeUp 280ms var(--ease-out)",
          }}>
            <div style={{fontSize: 15, lineHeight: 1.6, color: "var(--on-surface-variant)",
              maxWidth: 760, textWrap: "pretty"}}>{a}</div>
          </div>
        )}
      </div>
    );
  };

  const Faq = () => {
    const faqs = [
      {
        q: "Już używamy Facebook Events. Po co nam jeszcze jedna platforma?",
        a: "Facebook pokazuje Twoje eventy tylko osobom, które już znają Twój lokal — i to nie wszystkim, bo algorytm chowa zasięg. eventapp pokazuje Cię osobom, które dopiero szukają, na czym spędzić sobotę. Nie zastępujemy Facebooka, uzupełniamy. Wystarczy 90 sekund na publikację — większość organizatorów po prostu kopiuje treść.",
      },
      {
        q: "Nie mamy czasu na kolejny panel.",
        a: "Przejęcie lokalu zajmuje 5 minut. Publikacja eventu — 90 sekund. To wszystko. Nie ma SDK, nie ma integracji, nie ma comiesięcznych raportów. Pierwszym 20 lokalom w każdym mieście pomagamy osobiście — przyjeżdżamy z tabletem, klikamy razem, wychodzimy z opublikowanym profilem.",
      },
      {
        q: "Ile to kosztuje?",
        a: "Dziś i przez najbliższe 3 miesiące — 0 zł. Wszystkie funkcje, bez limitów, bez karty. Później pojawi się plan Pro (149 zł/mies. netto) z dodatkowymi funkcjami: push, cykliczne eventy, pełna analityka. Plan Free zostanie na zawsze — przejęcie lokalu i 2 eventy miesięcznie nigdy nie będą płatne.",
      },
      {
        q: "Czy bierzecie prowizję od biletów?",
        a: "Nie. Twój sklep biletowy zostaje Twój. Linkujemy do eBilet, Going, Kupbilety, do Twojego własnego sklepu — co tylko wskażesz. W przyszłości udostępnimy własną sprzedaż biletów, ale tylko jako opcjonalną alternatywę z niższą prowizją niż konkurencja. Nigdy nie zmusimy Cię do migracji.",
      },
      {
        q: "Ilu macie użytkowników?",
        a: "Startujemy w maju 2026 z 7 miastami i ponad 6 800 wydarzeniami zaagregowanymi z publicznych źródeł. Cel na 3 miesiące: 200 przejętych lokali i 120 aktywnych organizatorów. Po pierwszym miesiącu publikujemy realne liczby — sprawdź panel, zanim się zdecydujesz.",
      },
      {
        q: "Jak weryfikujecie, że to faktycznie mój lokal?",
        a: "Trzy ścieżki, wybierasz najwygodniejszą: (1) SMS na numer telefonu z publicznej wizytówki lokalu, (2) e-mail w domenie lokalu (np. biuro@stodola.pl), (3) dokument CEIDG lub KRS przesłany do moderatora. Pierwsze dwie są automatyczne — średnio 90 sekund. Trzecia wymaga manualnej weryfikacji w ciągu 24 godzin.",
      },
      {
        q: "Co z RODO i danymi obserwujących?",
        a: "Jesteśmy administratorem danych wszystkich użytkowników aplikacji. Ty masz dostęp tylko do anonimowych statystyk — liczba obserwujących, zachowania w grupie. Nie udostępniamy danych osobowych. Każdy user ma w aplikacji jednoklik do opt-outu z powiadomień, my respektujemy quiet hours i limit 1 push/dzień/lokal.",
      },
      {
        q: "A jeśli ktoś inny przejmie mój lokal?",
        a: "Każdy lokal ma jednego głównego właściciela, którego zweryfikowaliśmy. Jeśli ktoś nieuprawniony to zrobi, otrzymasz alert e-mail/SMS na dane z publicznej wizytówki, a my zablokujemy konto w ciągu 24h po zgłoszeniu. Spory rozstrzyga moderator — zawsze na korzyść osoby z mocniejszym dowodem (KRS).",
      },
      {
        q: "Czy będę mógł(a) wyeksportować swoje dane?",
        a: "Tak, w każdej chwili. CSV z eventami, statystykami i listą obserwujących (zanonimizowaną). API do pobierania danych pojawi się w planie City. Jeśli zdecydujesz się odejść — Twoje dane wracają w pełni do Ciebie, a profil można skasować jednym kliknięciem.",
      },
    ];
    return (
      <section id="faq" style={{padding: "96px 0", borderTop: "1px solid var(--outline)",
        background: "var(--surface-bg)"}}>
        <div className="mw">
          <div style={{display: "grid", gridTemplateColumns: "minmax(280px, 360px) 1fr",
            gap: 56, alignItems: "flex-start"}}>
            <div style={{position: "sticky", top: 120, display: "flex", flexDirection: "column", gap: 16}}>
              <span className="eyebrow">FAQ</span>
              <h2 className="h-section">
                Częste pytania, <span className="gradient-text">szczere odpowiedzi</span>
              </h2>
              <p className="lead">
                Nie znalazłeś swojego? Napisz na <a href="mailto:b2b@eventapp.dev" style={{color: "var(--brand-primary)", fontWeight: 600}}>b2b@eventapp.dev</a> — odpowiadamy w 24h.
              </p>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: 10}}>
              {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} defaultOpen={i === 0}/>)}
            </div>
          </div>
        </div>
      </section>
    );
  };
  window.MFaq = Faq;
})();


/* === Final CTA === */
;(function(){
  const { MIcons, MBtn } = window;

  const FinalCta = () => {
    return (
      <section style={{padding: "96px 0", position: "relative"}}>
        <div className="mw">
          <div style={{
            position: "relative",
            background: "linear-gradient(135deg, #5A2FD6 0%, #6C3FEB 30%, #A97EF8 100%)",
            borderRadius: 32, padding: "64px 48px",
            overflow: "hidden",
            boxShadow: "var(--shadow-xl), 0 40px 80px -20px rgba(108,63,235,0.45)",
          }}>
            {/* Decorative shapes */}
            <div aria-hidden style={{
              position: "absolute", right: -120, top: -120,
              width: 380, height: 380, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 60%)",
            }}/>
            <div aria-hidden style={{
              position: "absolute", left: -60, bottom: -60,
              width: 240, height: 240, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 60%)",
            }}/>
            <div aria-hidden style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "linear-gradient(180deg, transparent, black, transparent)",
              WebkitMaskImage: "linear-gradient(180deg, transparent, black, transparent)",
            }}/>

            <div style={{position: "relative", maxWidth: 760, display: "flex", flexDirection: "column", gap: 24}}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 12, fontWeight: 600, letterSpacing: "1.4px",
                textTransform: "uppercase", color: "rgba(255,255,255,0.85)",
                background: "rgba(255,255,255,0.12)",
                padding: "6px 14px", borderRadius: 9999,
                width: "fit-content",
                backdropFilter: "blur(8px)",
              }}>
                <MIcons.Sparkles size={13}/>
                Pierwsze 20 lokali w każdym mieście — Pro za darmo przez 6 miesięcy
              </span>
              <h2 style={{
                margin: 0, color: "#fff",
                fontSize: "clamp(36px, 4.4vw, 56px)",
                fontWeight: 700, letterSpacing: "-1.2px", lineHeight: 1.05,
                textWrap: "balance",
              }}>
                5 minut. Twój lokal wraca w Twoje ręce.
              </h2>
              <p style={{margin: 0, fontSize: 18, color: "rgba(255,255,255,0.82)",
                lineHeight: 1.55, maxWidth: 600, textWrap: "pretty"}}>
                Wpisz nazwę, zweryfikuj się, opublikuj pierwsze wydarzenie. Bez karty, bez umowy, bez obietnic.
                Jeśli się nie spodoba — jedno kliknięcie i konto znika.
              </p>
              <div style={{display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8}}>
                <MBtn size="lg" variant="dark" iconRight={<MIcons.Arrow size={16}/>}>
                  Przejmij swój lokal
                </MBtn>
                <MBtn size="lg" variant="glass" icon={<MIcons.Phone size={16}/>}>
                  Umów rozmowę
                </MBtn>
              </div>

              <div style={{display: "flex", gap: 32, flexWrap: "wrap", marginTop: 16,
                paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.18)"}}>
                {[
                  { k: "5 min",   l: "weryfikacja" },
                  { k: "0 zł",    l: "do końca PoC" },
                  { k: "24h",     l: "wsparcie" },
                  { k: "7 miast", l: "od startu" },
                ].map((kpi, i) => (
                  <div key={i}>
                    <div style={{fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.4px"}}>{kpi.k}</div>
                    <div style={{fontSize: 11, fontWeight: 500, letterSpacing: "1.2px",
                      textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginTop: 4}}>{kpi.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  window.MFinalCta = FinalCta;
})();


/* === Footer === */
;(function(){
  const { MIcons, MLogo } = window;

  const Footer = () => {
    const cols = [
      {
        title: "Produkt",
        links: [
          { l: "Funkcje", h: "#features" },
          { l: "Cennik",  h: "#pricing" },
          { l: "Mapa rozwoju", h: "#roadmap" },
          { l: "Porównanie", h: "#compare" },
          { l: "Panel demo", h: "index.html" },
        ],
      },
      {
        title: "Dla organizatorów",
        links: [
          { l: "Przejmij lokal", h: "#" },
          { l: "Onboarding white-glove", h: "#" },
          { l: "Program ambasadorski", h: "#" },
          { l: "Case study", h: "#" },
          { l: "Materiały do druku", h: "#" },
        ],
      },
      {
        title: "Aplikacja B2C",
        links: [
          { l: "iOS App Store", h: "#" },
          { l: "Google Play", h: "#" },
          { l: "Web (eventapp.dev)", h: "#" },
          { l: "Zgłoś wydarzenie", h: "#" },
        ],
      },
      {
        title: "Firma",
        links: [
          { l: "O nas", h: "#" },
          { l: "Kariera", h: "#" },
          { l: "Kontakt prasowy", h: "#" },
          { l: "Polityka prywatności", h: "#" },
          { l: "Regulamin", h: "#" },
        ],
      },
    ];

    return (
      <footer style={{
        background: "var(--surface-high)",
        borderTop: "1px solid var(--outline)",
        padding: "64px 0 32px",
      }}>
        <div className="mw">
          <div style={{display: "grid",
            gridTemplateColumns: "minmax(220px, 1.4fr) repeat(4, 1fr)",
            gap: 40,
            paddingBottom: 48,
            borderBottom: "1px solid var(--outline)",
          }}>
            <div style={{display: "flex", flexDirection: "column", gap: 16}}>
              <MLogo size={32}/>
              <p style={{margin: 0, fontSize: 14, color: "var(--on-surface-variant)",
                lineHeight: 1.55, maxWidth: 280, textWrap: "pretty"}}>
                Wszystko, co dzieje się w mieście — w jednej aplikacji. Mapa, kanał, push do obserwujących.
              </p>
              <div style={{display: "flex", gap: 8, marginTop: 4}}>
                <a href="#" style={{
                  width: 34, height: 34, borderRadius: 9999,
                  background: "var(--surface-mid)", color: "var(--on-surface-variant)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}><MIcons.Mail size={14}/></a>
                <a href="#" style={{
                  width: 34, height: 34, borderRadius: 9999,
                  background: "var(--surface-mid)", color: "var(--on-surface-variant)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}><MIcons.Globe size={14}/></a>
                <a href="#" style={{
                  width: 34, height: 34, borderRadius: 9999,
                  background: "var(--surface-mid)", color: "var(--on-surface-variant)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}><MIcons.Phone size={14}/></a>
              </div>
            </div>
            {cols.map((c, i) => (
              <div key={i} style={{display: "flex", flexDirection: "column", gap: 14}}>
                <div style={{fontSize: 11, fontWeight: 600, letterSpacing: "1.4px",
                  textTransform: "uppercase", color: "var(--on-surface)"}}>
                  {c.title}
                </div>
                <ul style={{margin: 0, padding: 0, listStyle: "none",
                  display: "flex", flexDirection: "column", gap: 10}}>
                  {c.links.map((l, j) => (
                    <li key={j}>
                      <a href={l.h} style={{fontSize: 14, color: "var(--on-surface-variant)",
                        transition: "color 200ms"}}
                        onMouseEnter={e => e.currentTarget.style.color = "var(--brand-primary)"}
                        onMouseLeave={e => e.currentTarget.style.color = "var(--on-surface-variant)"}>
                        {l.l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 16, paddingTop: 32, fontSize: 13, color: "var(--on-surface-muted)"}}>
            <div>© 2026 eventapp sp. z o.o. · Wszystko, co dzieje się w mieście.</div>
            <div style={{display: "flex", gap: 24}}>
              <a href="#" style={{color: "var(--on-surface-muted)"}}>Polityka prywatności</a>
              <a href="#" style={{color: "var(--on-surface-muted)"}}>Regulamin</a>
              <a href="#" style={{color: "var(--on-surface-muted)"}}>Cookies</a>
              <a href="#" style={{color: "var(--on-surface-muted)"}}>Status</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  window.MFooter = Footer;
})();


/* === App mount === */
;(function(){
  const {
    MNav, MHero, MCities, MPains, MHow,
    MFeatures, MRoadmap, MCompare, MPricing, MFaq, MFinalCta, MFooter,
  } = window;

  const App = () => {
    return (
      <>
        <MNav/>
        <MHero/>
        <MCities/>
        <MPains/>
        <MHow/>
        <MFeatures/>
        <MRoadmap/>
        <MCompare/>
        <MPricing/>
        <MFaq/>
        <MFinalCta/>
        <MFooter/>
      </>
    );
  };

  ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
})();
