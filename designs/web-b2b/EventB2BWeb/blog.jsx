// eventapp B2B — Blog Editorial Panel: data + post list dashboard
;(function(){

const BLOG_CATEGORIES = [
  { value: "city-guide",     label: "Przewodnik po mieście" },
  { value: "roundup",        label: "Przegląd wydarzeń" },
  { value: "venue",          label: "Spotlight na lokal" },
  { value: "organizer",      label: "Historia organizatora" },
  { value: "tips",           label: "Porady i triki" },
  { value: "news",           label: "Aktualności" },
  { value: "other",          label: "Inne" },
];

const BLOG_POSTS = [
  {
    id: "b1",
    title: "Gdzie w Warszawie posłuchać jazzu w maju? 7 miejsc, które znają tylko lokalsi",
    status: "Opublikowany", category: "city-guide", date: "18 Maja 2026", lang: "PL",
    excerpt: "Od piwnicznych jam sessions po duże sceny klubowe — subiektywny przewodnik po warszawskim jazzie.",
    views: 4212, image: "assets/event-jazz.jpg",
    body: "<p>Warszawski jazz nie mieszka w jednym miejscu. Rozsiadł się w piwnicach, na barkach i w salach koncertowych, które w tygodniu żyją zupełnie innym rytmem niż w weekend.</p><h2>Zacznij od wtorku</h2><p>Wtorkowe jam sessions to najlepszy sposób, żeby usłyszeć muzyków, którzy w sobotę zagrają na dużej scenie. Wejście zwykle kosztuje tyle, co bilet tramwajowy.</p><blockquote>Najlepsze koncerty w tym mieście zaczynają się o 22:30, kiedy oficjalna część już się skończyła.</blockquote>",
  },
  {
    id: "b2",
    title: "Techno w Warszawie: przewodnik po klubach na sezon 2026",
    status: "W moderacji", category: "roundup", date: "22 Maja 2026", lang: "PL",
    excerpt: "Nowe otwarcia, powroty i line-upy, na które warto polować w tym sezonie.",
    views: 0, image: "assets/event-techno.jpg",
    body: "<p>Sezon klubowy 2026 zaczął się od dwóch nowych otwarć i jednego powrotu, na który czekano trzy lata.</p>",
  },
  {
    id: "b3",
    title: "Jak zbudowaliśmy publiczność Stodoły od zera do 12 tysięcy obserwujących",
    status: "Odrzucony", category: "organizer", date: "14 Maja 2026", lang: "PL",
    excerpt: "Trzy lata, 400 koncertów i kilka błędów, których nie powtórzymy.",
    views: 0, image: "assets/venue-stodola.jpg",
    rejectedBy: "Redakcja eventapp",
    rejectedAt: "15 Maja 2026 · 11:24",
    rejectionReason: "Artykuł w obecnej formie jest materiałem promocyjnym jednego lokalu — brakuje kontekstu przydatnego czytelnikom spoza Stodoły. Prosimy o dodanie konkretnych wniosków, które inni organizatorzy mogą zastosować u siebie, oraz o usunięcie fragmentu z cenami biletów (sekcja 4). Po korekcie chętnie zobaczymy tekst ponownie.",
    body: "<p>Kiedy przejmowaliśmy profil, mieliśmy 900 obserwujących i jedną wyprzedaną salę na kwartał.</p>",
  },
  {
    id: "b4",
    title: "Stodoła: 70 lat historii w pięciu zdjęciach",
    status: "Szkic", category: "venue", date: "23 Maja 2026", lang: "PL",
    excerpt: "",
    views: 0, image: null,
    body: "<p>Zaczęło się w 1956 roku od studenckiej stołówki.</p>",
  },
  {
    id: "b5",
    title: "Rider techniczny bez stresu — checklista dla organizatorów",
    status: "W moderacji", category: "tips", date: "21 Maja 2026", lang: "EN",
    excerpt: "What to confirm with the artist's crew two weeks before the show.",
    views: 0, image: "assets/event-rock.jpg",
    body: "<p>Most production problems are booked three weeks before the show, not on the day.</p>",
  },
];

const catLabel = (v) => (BLOG_CATEGORIES.find(c => c.value === v) || {}).label || "—";

// ---------- ROW ACTION ICON BUTTON (hover / focus / disabled states) ----------
const RowAction = ({ children, title, danger, disabled, onClick }) => {
  const [h, setH] = React.useState(false);
  return (
    <button title={title} disabled={disabled} onClick={onClick} style={{
      width: 32, height: 32, borderRadius: 9999, border: 0, flex: "0 0 auto",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.38 : 1,
      background: h && !disabled ? (danger ? "var(--destructive-container)" : "var(--surface-mid)") : "transparent",
      color: danger ? "var(--destructive)" : "var(--on-surface-variant)",
      transition: "background var(--duration-fast) var(--ease-out)",
    }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>{children}</button>
  );
};

// ---------- REJECTION ACCORDION (interactive Odrzucony badge) ----------
const RejectedBadge = ({ post, open, onToggle }) => {
  const { Icons } = window;
  return (
    <button onClick={onToggle} aria-expanded={open} style={{
      display: "inline-flex", alignItems: "center", gap: 6, border: 0, cursor: "pointer",
      height: 24, padding: "0 8px 0 10px", borderRadius: 9999,
      background: open ? "var(--destructive)" : "var(--destructive-container)",
      color: open ? "#fff" : "var(--destructive)",
      fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
      transition: "background var(--duration-fast) var(--ease-out)",
    }}>
      <span style={{width: 6, height: 6, borderRadius: 99, background: open ? "#fff" : "var(--destructive)"}}/>
      Odrzucony
      <span style={{display: "inline-flex", transform: open ? "rotate(180deg)" : "none",
        transition: "transform var(--duration-base) var(--ease-out)"}}>
        <Icons.ChevronDown size={13}/>
      </span>
    </button>
  );
};

const RejectionPanel = ({ post, onEdit }) => {
  const { Icons, Button } = window;
  return (
    <div style={{
      gridColumn: "1 / -1", margin: "0 0 14px", padding: 16,
      borderRadius: "var(--radius-lg)", background: "var(--destructive-container)",
      display: "flex", gap: 14, animation: "fadeUp 0.24s var(--ease-out)",
    }}>
      <span style={{width: 32, height: 32, borderRadius: 9999, flex: "0 0 auto",
        background: "rgba(229,72,77,0.14)", color: "var(--destructive)",
        display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
        <Icons.Alert size={16}/>
      </span>
      <div style={{display: "flex", flexDirection: "column", gap: 8, minWidth: 0}}>
        <div style={{display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap"}}>
          <span style={{fontSize: 13, fontWeight: 600, color: "#8E1F23"}}>Powód odrzucenia</span>
          <span style={{fontSize: 12, color: "rgba(142,31,35,0.7)"}}>
            {post.rejectedBy} · {post.rejectedAt}
          </span>
        </div>
        <p style={{margin: 0, fontSize: 13, lineHeight: 1.55, color: "#8E1F23",
          maxWidth: 720, textWrap: "pretty"}}>{post.rejectionReason}</p>
        <div style={{display: "flex", gap: 8, marginTop: 2}}>
          <Button size="sm" icon={<Icons.Edit size={14}/>} onClick={onEdit}>Popraw artykuł</Button>
          <Button size="sm" variant="secondary" icon={<Icons.Mail size={14}/>}>Odpowiedz redakcji</Button>
        </div>
      </div>
    </div>
  );
};

// ---------- EMPTY STATE ----------
const BlogEmptyState = ({ onNew }) => {
  const { Icons, Button } = window;
  return (
    <div style={{
      padding: "72px 32px", display: "flex", flexDirection: "column",
      alignItems: "center", textAlign: "center", gap: 20,
    }}>
      <span style={{
        width: 88, height: 88, borderRadius: 28,
        background: "linear-gradient(135deg, rgba(108,63,235,0.10) 0%, rgba(169,126,248,0.18) 100%)",
        border: "1px solid var(--brand-primary-container)",
        color: "var(--brand-primary)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icons.Pencil size={34}/>
      </span>
      <div style={{display: "flex", flexDirection: "column", gap: 8, alignItems: "center"}}>
        <h3 style={{margin: 0, font: "var(--type-headline-l)", letterSpacing: "var(--tracking-headline-l)"}}>
          Nie napisałeś jeszcze żadnego artykułu
        </h3>
        <p style={{margin: 0, fontSize: 15, lineHeight: 1.55, color: "var(--on-surface-variant)",
          maxWidth: 460, textWrap: "pretty"}}>
          Artykuły na blogu eventapp pokazują Twój lokal ludziom, którzy jeszcze nie znają
          Twoich wydarzeń. Przewodnik po mieście, zapowiedź sezonu, historia lokalu — każdy
          tekst możesz połączyć z eventami i sprzedażą biletów.
        </p>
      </div>
      <div style={{display: "flex", gap: 10, alignItems: "center"}}>
        <Button size="lg" icon={<Icons.Pencil size={16}/>} onClick={onNew}>Napisz pierwszy artykuł</Button>
        <Button size="lg" variant="tertiary" iconRight={<Icons.Chevron size={14}/>}>Zasady publikacji</Button>
      </div>
      <div style={{display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 4}}>
        {["Przewodnik po mieście", "Przegląd wydarzeń", "Spotlight na lokal"].map(t => (
          <span key={t} style={{
            fontSize: 12, padding: "6px 12px", borderRadius: 9999,
            background: "var(--surface-low)", color: "var(--on-surface-variant)",
          }}>Pomysł: {t}</span>
        ))}
      </div>
    </div>
  );
};

// ---------- POST LIST DASHBOARD ----------
const BlogList = ({ onNew, onEdit }) => {
  const { Icons, Card, Button, Input, StatusBadge } = window;
  const [tab, setTab] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [expanded, setExpanded] = React.useState(null);
  const [empty, setEmpty] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(null);
  const posts = empty ? [] : BLOG_POSTS;

  const tabs = [
    { id: "all",       label: "Wszystkie",  n: posts.length },
    { id: "Szkic",     label: "Szkice",     n: posts.filter(p => p.status === "Szkic").length },
    { id: "W moderacji", label: "W moderacji", n: posts.filter(p => p.status === "W moderacji").length },
    { id: "Opublikowany", label: "Opublikowane", n: posts.filter(p => p.status === "Opublikowany").length },
    { id: "Odrzucony", label: "Odrzucone",  n: posts.filter(p => p.status === "Odrzucony").length },
  ];

  const filtered = posts
    .filter(p => tab === "all" || p.status === tab)
    .filter(p => !query || p.title.toLowerCase().includes(query.toLowerCase()));

  const cols = "minmax(300px, 2.6fr) 150px 190px 120px 84px";

  return (
    <div style={{display: "flex", flexDirection: "column", gap: 20, maxWidth: 1280}}>
      {/* Toolbar */}
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap"}}>
        <div style={{display: "flex", gap: 4, padding: 4, borderRadius: 9999,
          background: "var(--surface-low)", border: "1px solid var(--outline)"}}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setExpanded(null); }} style={{
              all: "unset", cursor: "pointer", padding: "8px 14px", borderRadius: 9999,
              background: tab === t.id ? "var(--surface-high)" : "transparent",
              boxShadow: tab === t.id ? "var(--shadow-sm)" : "none",
              color: tab === t.id ? "var(--on-surface)" : "var(--on-surface-variant)",
              fontWeight: tab === t.id ? 600 : 500, fontSize: 13,
              display: "inline-flex", alignItems: "center", gap: 7,
              transition: "all var(--duration-base) var(--ease-out)",
            }}>
              {t.label}
              <span style={{fontSize: 11, padding: "1px 7px", borderRadius: 9999, fontWeight: 600,
                background: tab === t.id ? "var(--brand-primary-container)" : "var(--surface-mid)",
                color: tab === t.id ? "var(--brand-primary)" : "var(--on-surface-variant)"}}>{t.n}</span>
            </button>
          ))}
        </div>
        <div style={{display: "flex", gap: 10, alignItems: "center"}}>
          <Input icon={<Icons.Search size={16}/>} placeholder="Szukaj artykułu…"
            value={query} onChange={e => setQuery(e.target.value)} style={{width: 260, height: 40}}/>
          <Button variant="secondary" icon={<Icons.Filter size={15}/>}>Filtry</Button>
        </div>
      </div>

      <Card padding={0} style={{overflow: "hidden"}}>
        {posts.length === 0 ? (
          <BlogEmptyState onNew={onNew}/>
        ) : (
          <>
            <div style={{display: "grid", gridTemplateColumns: cols, gap: 16, padding: "14px 20px",
              borderBottom: "1px solid var(--outline)", fontSize: 11, fontWeight: 600,
              letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--on-surface-muted)"}}>
              <div>Tytuł</div><div>Status</div><div>Kategoria</div><div>Data</div>
              <div style={{textAlign: "right"}}>Akcje</div>
            </div>

            {filtered.length === 0 ? (
              <div style={{padding: "48px 24px", textAlign: "center", color: "var(--on-surface-variant)", fontSize: 14}}>
                Brak artykułów w tym widoku
              </div>
            ) : filtered.map((p, i) => (
              <div key={p.id} style={{display: "grid", gridTemplateColumns: cols, gap: 16,
                borderBottom: i < filtered.length - 1 ? "1px solid var(--outline)" : "none"}}>
                <div style={{display: "grid", gridTemplateColumns: "subgrid", gridColumn: "1 / -1",
                  gap: 16, padding: "14px 20px", alignItems: "center",
                  transition: "background var(--duration-base) var(--ease-out)"}}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--surface-low)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  {/* Title */}
                  <div style={{display: "flex", alignItems: "center", gap: 12, minWidth: 0}}>
                    {p.image ? (
                      <span style={{width: 44, height: 44, borderRadius: 10, flex: "0 0 auto",
                        background: `url(${p.image}) center / cover`}}/>
                    ) : (
                      <span style={{width: 44, height: 44, borderRadius: 10, flex: "0 0 auto",
                        background: "var(--surface-low)", border: "1px dashed var(--outline-strong)",
                        color: "var(--on-surface-muted)", display: "inline-flex",
                        alignItems: "center", justifyContent: "center"}}>
                        <Icons.Image size={16}/>
                      </span>
                    )}
                    <div style={{minWidth: 0, display: "flex", flexDirection: "column", gap: 3}}>
                      <button onClick={() => onEdit(p.id)} style={{
                        all: "unset", cursor: "pointer", fontSize: 14, fontWeight: 500,
                        color: "var(--on-surface)", letterSpacing: "var(--tracking-body-l)",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>{p.title}</button>
                      <span style={{fontSize: 12, color: "var(--on-surface-variant)",
                        display: "inline-flex", alignItems: "center", gap: 8}}>
                        <span style={{fontFamily: "var(--font-mono)", fontSize: 11,
                          padding: "0 5px", borderRadius: 4, background: "var(--surface-mid)"}}>{p.lang}</span>
                        {p.status === "Opublikowany"
                          ? <><Icons.Eye size={11}/> {p.views.toLocaleString("pl-PL").replace(/,/g," ")} odsłon</>
                          : p.excerpt ? "Zajawka gotowa" : "Bez zajawki"}
                      </span>
                    </div>
                  </div>
                  {/* Status */}
                  <div>
                    {p.status === "Odrzucony"
                      ? <RejectedBadge post={p} open={expanded === p.id}
                          onToggle={() => setExpanded(expanded === p.id ? null : p.id)}/>
                      : <StatusBadge status={p.status}/>}
                  </div>
                  {/* Category */}
                  <div style={{fontSize: 13, color: "var(--on-surface-variant)"}}>{catLabel(p.category)}</div>
                  {/* Date */}
                  <div style={{fontSize: 13, color: "var(--on-surface)", fontVariantNumeric: "tabular-nums"}}>{p.date}</div>
                  {/* Actions */}
                  <div style={{display: "flex", justifyContent: "flex-end", gap: 2}}>
                    <RowAction title="Edytuj" onClick={() => onEdit(p.id)}><Icons.Edit size={15}/></RowAction>
                    <RowAction title={p.status === "W moderacji" ? "Nie można usunąć podczas moderacji" : "Usuń"}
                      danger disabled={p.status === "W moderacji"}
                      onClick={() => setConfirmDelete(p)}><Icons.Trash size={15}/></RowAction>
                  </div>
                </div>
                {expanded === p.id && <RejectionPanel post={p} onEdit={() => onEdit(p.id)}/>}
              </div>
            ))}
          </>
        )}
      </Card>

      {/* Footer: count + prototype state switch */}
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16}}>
        <span style={{fontSize: 13, color: "var(--on-surface-variant)"}}>
          {filtered.length} z {posts.length} artykułów
        </span>
        <button onClick={() => { setEmpty(e => !e); setExpanded(null); }} style={{
          all: "unset", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 11,
          color: "var(--on-surface-muted)", padding: "5px 10px", borderRadius: 9999,
          border: "1px dashed var(--outline-strong)",
        }}>{empty ? "demo: pokaż dane" : "demo: stan pusty"}</button>
      </div>

      {confirmDelete && (
        <BlogConfirm
          title="Usunąć artykuł?"
          desc={`„${confirmDelete.title}” zostanie trwale usunięty wraz z historią moderacji. Tej operacji nie można cofnąć.`}
          confirmLabel="Usuń artykuł" destructive
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => { setConfirmDelete(null); window.__blogToast?.({title: "Artykuł usunięty"}); }}/>
      )}
    </div>
  );
};

// ---------- SHARED CONFIRM DIALOG ----------
const BlogConfirm = ({ title, desc, confirmLabel, destructive, icon, onCancel, onConfirm, children }) => {
  const { Icons, Button } = window;
  return (
    <div onClick={onCancel} style={{
      position: "fixed", inset: 0, zIndex: 900, background: "rgba(16,16,30,0.42)",
      backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, animation: "fadeIn 0.18s var(--ease-out)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "min(480px, 100%)", background: "var(--surface-high)",
        borderRadius: "var(--radius-xl)", padding: 28, boxShadow: "var(--shadow-xl)",
        display: "flex", flexDirection: "column", gap: 16,
        animation: "scaleIn 0.22s var(--ease-out)",
      }}>
        <span style={{width: 44, height: 44, borderRadius: 14,
          background: destructive ? "var(--destructive-container)" : "var(--brand-primary-container)",
          color: destructive ? "var(--destructive)" : "var(--brand-primary)",
          display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
          {icon || (destructive ? <Icons.Trash size={20}/> : <Icons.Send size={20}/>)}
        </span>
        <div style={{display: "flex", flexDirection: "column", gap: 8}}>
          <h3 style={{margin: 0, font: "var(--type-headline-m)", letterSpacing: "var(--tracking-headline-m)"}}>{title}</h3>
          <p style={{margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--on-surface-variant)", textWrap: "pretty"}}>{desc}</p>
        </div>
        {children}
        <div style={{display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 4}}>
          <Button variant="secondary" onClick={onCancel}>Anuluj</Button>
          <Button variant={destructive ? "destructive" : "primary"} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { BLOG_POSTS, BLOG_CATEGORIES, BlogList, BlogEmptyState, BlogConfirm, RowAction, blogCatLabel: catLabel });

})();
