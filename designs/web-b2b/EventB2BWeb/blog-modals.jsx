// eventapp B2B — Blog: Embed Event modal + article preview drawer
;(function(){

// ---------- EMBED EVENT MODAL ----------
// Flow: toolbar „Wstaw event” → modal (search / filter → select → confirm) → inserts
// non-editable Event Card block at the caret position in the Tiptap document.
const EmbedEventModal = ({ onClose, onInsert }) => {
  const { Icons, Button, Input, StatusBadge, EVENTS } = window;
  const [query, setQuery] = React.useState("");
  const [scope, setScope] = React.useState("upcoming");
  const [picked, setPicked] = React.useState(null);
  const [variant, setVariant] = React.useState("card");

  const list = EVENTS
    .filter(e => scope === "all" ? true : scope === "past" ? e.past : !e.past)
    .filter(e => !query || e.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 950, background: "rgba(16,16,30,0.42)",
      backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, animation: "fadeIn 0.18s var(--ease-out)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "min(760px, 100%)", maxHeight: "84vh", background: "var(--surface-high)",
        borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-xl)",
        display: "flex", flexDirection: "column", overflow: "hidden",
        animation: "scaleIn 0.22s var(--ease-out)",
      }}>
        {/* Header */}
        <div style={{padding: "22px 24px 18px", borderBottom: "1px solid var(--outline)",
          display: "flex", alignItems: "flex-start", gap: 14}}>
          <span style={{width: 40, height: 40, borderRadius: 12, flex: "0 0 auto",
            background: "var(--brand-primary-container)", color: "var(--brand-primary)",
            display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
            <Icons.Ticket size={19}/>
          </span>
          <div style={{flex: 1, minWidth: 0}}>
            <h3 style={{margin: 0, font: "var(--type-headline-m)", letterSpacing: "var(--tracking-headline-m)"}}>
              Wstaw event do treści
            </h3>
            <p style={{margin: "4px 0 0", fontSize: 13, color: "var(--on-surface-variant)"}}>
              Wybierz jeden ze swoich eventów — w artykule pojawi się karta z aktualną datą i linkiem do biletów
            </p>
          </div>
          <button onClick={onClose} style={{all: "unset", cursor: "pointer", color: "var(--on-surface-variant)",
            padding: 4, borderRadius: 9999}}><Icons.X size={18}/></button>
        </div>

        {/* Search + scope */}
        <div style={{padding: "16px 24px", display: "flex", gap: 10, alignItems: "center",
          borderBottom: "1px solid var(--outline)"}}>
          <Input icon={<Icons.Search size={16}/>} placeholder="Szukaj wśród Twoich eventów…"
            value={query} onChange={e => setQuery(e.target.value)} style={{flex: 1, height: 42}} autoFocus/>
          <div style={{display: "flex", gap: 2, padding: 3, borderRadius: 9999, background: "var(--surface-low)"}}>
            {[{id:"upcoming",label:"Nadchodzące"},{id:"past",label:"Zakończone"},{id:"all",label:"Wszystkie"}].map(s => (
              <button key={s.id} onClick={() => setScope(s.id)} style={{
                all: "unset", cursor: "pointer", padding: "6px 12px", borderRadius: 9999, fontSize: 12,
                fontWeight: scope === s.id ? 600 : 500,
                background: scope === s.id ? "var(--surface-high)" : "transparent",
                boxShadow: scope === s.id ? "var(--shadow-sm)" : "none",
                color: scope === s.id ? "var(--on-surface)" : "var(--on-surface-variant)",
              }}>{s.label}</button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div style={{flex: 1, overflowY: "auto", padding: 8, minHeight: 200}}>
          {list.length === 0 ? (
            <div style={{padding: "56px 24px", textAlign: "center", color: "var(--on-surface-variant)"}}>
              <Icons.Confused size={26}/>
              <p style={{margin: "10px 0 0", fontSize: 14}}>Brak eventów spełniających kryteria</p>
            </div>
          ) : list.map(e => {
            const active = picked?.id === e.id;
            return (
              <button key={e.id} onClick={() => setPicked(e)} style={{
                all: "unset", cursor: "pointer", width: "calc(100% - 24px)", display: "flex",
                alignItems: "center", gap: 14, padding: 12, margin: "2px 4px", borderRadius: "var(--radius-lg)",
                background: active ? "var(--brand-primary-container)" : "transparent",
                border: `1px solid ${active ? "var(--brand-primary)" : "transparent"}`,
                transition: "background var(--duration-fast) var(--ease-out)",
              }}
                onMouseEnter={ev => { if (!active) ev.currentTarget.style.background = "var(--surface-low)"; }}
                onMouseLeave={ev => { if (!active) ev.currentTarget.style.background = "transparent"; }}>
                <span style={{width: 52, height: 52, borderRadius: 12, flex: "0 0 auto",
                  background: `url(${e.image}) center / cover`}}/>
                <span style={{flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4}}>
                  <span style={{fontSize: 14, fontWeight: 500, color: "var(--on-surface)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{e.title}</span>
                  <span style={{fontSize: 12, color: "var(--on-surface-variant)",
                    display: "inline-flex", alignItems: "center", gap: 8}}>
                    <Icons.Calendar size={11}/>{e.date} · {e.time}
                    <span style={{color: "var(--outline-strong)"}}>·</span>{e.price}
                  </span>
                </span>
                <StatusBadge status={e.status}/>
                <span style={{width: 20, height: 20, borderRadius: 9999, flex: "0 0 auto",
                  border: `1.5px solid ${active ? "var(--brand-primary)" : "var(--outline-strong)"}`,
                  background: active ? "var(--brand-primary)" : "transparent",
                  display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
                  {active && <Icons.Check size={13} stroke="#fff" strokeWidth={3}/>}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer: variant + insert */}
        <div style={{padding: "14px 24px", borderTop: "1px solid var(--outline)",
          background: "var(--surface-bg)", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16}}>
          <div style={{display: "flex", alignItems: "center", gap: 10}}>
            <span style={{fontSize: 12, color: "var(--on-surface-variant)"}}>Format bloku</span>
            <div style={{display: "flex", gap: 2, padding: 3, borderRadius: 9999,
              background: "var(--surface-mid)"}}>
              {[{id:"card",label:"Karta"},{id:"inline",label:"Linia tekstu"}].map(v => (
                <button key={v.id} onClick={() => setVariant(v.id)} style={{
                  all: "unset", cursor: "pointer", padding: "5px 12px", borderRadius: 9999, fontSize: 12,
                  fontWeight: variant === v.id ? 600 : 500,
                  background: variant === v.id ? "var(--surface-high)" : "transparent",
                  color: variant === v.id ? "var(--on-surface)" : "var(--on-surface-variant)",
                }}>{v.label}</button>
              ))}
            </div>
          </div>
          <div style={{display: "flex", gap: 10}}>
            <Button variant="secondary" onClick={onClose}>Anuluj</Button>
            <Button disabled={!picked} onClick={() => picked && onInsert(picked, variant)}
              icon={<Icons.Plus size={15}/>}>Wstaw event</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- LINK / YOUTUBE POPOVER ----------
const UrlPopover = ({ label, placeholder, hint, confirmLabel, onCancel, onConfirm }) => {
  const { Icons, Button, Input } = window;
  const [url, setUrl] = React.useState("");
  const safe = /^https?:\/\/[^\s]+\.[^\s]{2,}$/i.test(url.trim());
  const dirty = url.trim().length > 0;
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 10px)", left: 0, zIndex: 60,
      width: 380, padding: 16, borderRadius: "var(--radius-lg)",
      background: "var(--surface-high)", border: "1px solid var(--outline)",
      boxShadow: "var(--shadow-lg)", display: "flex", flexDirection: "column", gap: 10,
      animation: "fadeUp 0.16s var(--ease-out)",
    }}>
      <span style={{fontSize: 13, fontWeight: 600}}>{label}</span>
      <Input icon={<Icons.Link size={15}/>} placeholder={placeholder} value={url} autoFocus
        onChange={e => setUrl(e.target.value)} style={{height: 42}}
        error={dirty && !safe}
        onKeyDown={e => { if (e.key === "Enter" && safe) onConfirm(url.trim()); if (e.key === "Escape") onCancel(); }}/>
      <span style={{fontSize: 12, color: dirty && !safe ? "var(--destructive)" : "var(--on-surface-variant)"}}>
        {dirty && !safe ? "Podaj pełny adres z https:// — inne protokoły są odrzucane" : hint}
      </span>
      <div style={{display: "flex", justifyContent: "flex-end", gap: 8}}>
        <Button size="sm" variant="secondary" onClick={onCancel}>Anuluj</Button>
        <Button size="sm" disabled={!safe} onClick={() => onConfirm(url.trim())}>{confirmLabel}</Button>
      </div>
    </div>
  );
};

// ---------- ARTICLE PREVIEW (full-screen, public blog styling) ----------
const ArticlePreview = ({ post, onClose }) => {
  const { Icons, Button } = window;
  const { blogCatLabel } = window;
  React.useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 960, background: "rgba(16,16,30,0.5)",
      backdropFilter: "blur(6px)", display: "flex", justifyContent: "flex-end",
      animation: "fadeIn 0.18s var(--ease-out)",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "min(860px, 100%)", height: "100%", background: "#fff",
        display: "flex", flexDirection: "column", boxShadow: "var(--shadow-xl)",
        animation: "slideInRight 0.28s var(--ease-out)",
      }}>
        {/* Preview chrome */}
        <div style={{padding: "14px 24px", borderBottom: "1px solid var(--outline)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          background: "var(--surface-bg)"}}>
          <div style={{display: "flex", alignItems: "center", gap: 10}}>
            <span style={{fontFamily: "var(--font-mono)", fontSize: 11, padding: "3px 8px",
              borderRadius: 9999, background: "var(--surface-mid)", color: "var(--on-surface-variant)"}}>
              PODGLĄD
            </span>
            <span style={{fontSize: 13, color: "var(--on-surface-variant)"}}>
              Tak artykuł zobaczą czytelnicy eventapp
            </span>
          </div>
          <div style={{display: "flex", gap: 8, alignItems: "center"}}>
            <Button size="sm" variant="secondary" icon={<Icons.Globe size={14}/>}>eventapp.pl/blog</Button>
            <button onClick={onClose} style={{all: "unset", cursor: "pointer", padding: 6,
              borderRadius: 9999, color: "var(--on-surface-variant)"}}><Icons.X size={18}/></button>
          </div>
        </div>

        {/* Public article */}
        <div style={{flex: 1, overflowY: "auto", padding: "40px 0 80px"}}>
          <article style={{maxWidth: 660, margin: "0 auto", padding: "0 24px"}}>
            <div style={{display: "flex", alignItems: "center", gap: 10, marginBottom: 18}}>
              <span style={{fontSize: 12, fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase",
                color: "var(--brand-primary)"}}>{blogCatLabel(post.category)}</span>
              <span style={{color: "var(--outline-strong)"}}>·</span>
              <span style={{fontSize: 13, color: "var(--on-surface-variant)"}}>{post.date} · 6 min czytania</span>
            </div>
            <h1 style={{margin: "0 0 16px", fontSize: 40, lineHeight: 1.12, fontWeight: 700,
              letterSpacing: "-1px", color: "var(--gray-900)", textWrap: "balance"}}>
              {post.title || "Tytuł artykułu"}
            </h1>
            {post.excerpt && (
              <p style={{margin: "0 0 28px", fontSize: 19, lineHeight: 1.55, color: "var(--gray-600)",
                letterSpacing: "-0.2px", textWrap: "pretty"}}>{post.excerpt}</p>
            )}
            <div style={{display: "flex", alignItems: "center", gap: 12, paddingBottom: 28,
              marginBottom: 28, borderBottom: "1px solid var(--outline)"}}>
              <span style={{width: 40, height: 40, borderRadius: 9999,
                background: "url(assets/venue-stodola.jpg) center / cover"}}/>
              <div style={{display: "flex", flexDirection: "column", lineHeight: 1.3}}>
                <span style={{fontSize: 14, fontWeight: 600}}>Klub Stodoła</span>
                <span style={{fontSize: 12, color: "var(--on-surface-variant)"}}>Organizator · Warszawa</span>
              </div>
            </div>
            {post.image && (
              <div style={{height: 340, borderRadius: "var(--radius-lg)", marginBottom: 32,
                background: `url(${post.image}) center / cover`}}/>
            )}
            <div className="blog-public-body" dangerouslySetInnerHTML={{__html: post.body || "<p>Treść artykułu…</p>"}}/>
          </article>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { EmbedEventModal, UrlPopover, ArticlePreview });

})();
