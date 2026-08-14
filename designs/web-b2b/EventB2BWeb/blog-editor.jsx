// eventapp B2B — Blog editor: title, excerpt, rich text + settings/publishing panel
;(function(){

const CHAR_MAX = 300;

// ---------- CHARACTER COUNTER ----------
const Counter = ({ value, max = CHAR_MAX }) => {
  const n = (value || "").length;
  const ratio = n / max;
  const color = n >= max ? "var(--destructive)" : ratio > 0.9 ? "var(--amber-700)" : "var(--on-surface-muted)";
  return (
    <span style={{fontFamily: "var(--font-mono)", fontSize: 11, color, whiteSpace: "nowrap",
      fontVariantNumeric: "tabular-nums"}}>{n} / {max}</span>
  );
};

// ---------- AUTOSAVE RECOVERY BANNER ----------
const RecoveryBanner = ({ snippet, savedAt, onRestore, onDiscard }) => {
  const { Icons, Button } = window;
  return (
    <div style={{
      padding: "16px 18px", borderRadius: "var(--radius-lg)",
      background: "var(--amber-50)", border: "1px solid var(--amber-200)",
      display: "flex", gap: 14, alignItems: "flex-start",
      animation: "fadeUp 0.3s var(--ease-out)",
    }}>
      <span style={{width: 34, height: 34, borderRadius: 10, flex: "0 0 auto",
        background: "var(--amber-100)", color: "var(--amber-700)",
        display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
        <Icons.Clock size={17}/>
      </span>
      <div style={{flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10}}>
        <div>
          <div style={{fontSize: 14, fontWeight: 600, color: "var(--amber-700)"}}>
            Znaleźliśmy niezapisaną wersję tego artykułu
          </div>
          <div style={{fontSize: 13, color: "#8A5A22", marginTop: 3}}>
            Kopia lokalna z {savedAt} — prawdopodobnie przeglądarka zamknęła się przed zapisem na serwerze.
          </div>
        </div>
        <div style={{padding: "10px 14px", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.7)",
          border: "1px solid var(--amber-200)", fontSize: 13, lineHeight: 1.5, color: "var(--gray-700)",
          fontStyle: "italic", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical"}}>
          „{snippet}”
        </div>
        <div style={{display: "flex", gap: 8}}>
          <Button size="sm" icon={<Icons.Repeat size={14}/>} onClick={onRestore}>Przywróć wersję</Button>
          <Button size="sm" variant="secondary" onClick={onDiscard}>Odrzuć kopię</Button>
        </div>
      </div>
      <button onClick={onDiscard} title="Zamknij" style={{all: "unset", cursor: "pointer",
        color: "var(--amber-700)", padding: 4, borderRadius: 9999, flex: "0 0 auto"}}>
        <Icons.X size={16}/>
      </button>
    </div>
  );
};

// ---------- TOOLBAR BUTTON (hover / focus / active / disabled) ----------
const TB = ({ children, label, active, disabled, onClick, width }) => {
  const [h, setH] = React.useState(false);
  return (
    <button title={label} aria-label={label} aria-pressed={!!active} disabled={disabled}
      onMouseDown={e => e.preventDefault()} onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        minWidth: width || 34, height: 34, padding: width ? "0 9px" : 0, borderRadius: 9,
        border: 0, display: "inline-flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.32 : 1,
        background: active ? "var(--brand-primary)" : h && !disabled ? "rgba(16,16,30,0.06)" : "transparent",
        color: active ? "#fff" : "var(--on-surface)",
        fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
        transition: "background var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out)",
      }}>{children}</button>
  );
};

const TBDivider = () => <span style={{width: 1, height: 20, background: "var(--outline)", flex: "0 0 auto"}}/>;

// ---------- RICH TEXT EDITOR ----------
const RichTextEditor = ({ initialHtml, onChange }) => {
  const { Icons, EmbedEventModal, UrlPopover } = window;
  const ref = React.useRef(null);
  const fileRef = React.useRef(null);
  const [marks, setMarks] = React.useState({});
  const [popover, setPopover] = React.useState(null);   // "link" | "youtube"
  const [embedOpen, setEmbedOpen] = React.useState(false);
  const [words, setWords] = React.useState(0);
  const savedRange = React.useRef(null);

  React.useEffect(() => {
    if (ref.current && initialHtml != null) ref.current.innerHTML = initialHtml;
    recount();
  }, []);

  const recount = () => {
    const t = (ref.current?.innerText || "").trim();
    setWords(t ? t.split(/\s+/).length : 0);
    onChange?.(ref.current?.innerHTML || "");
  };

  const syncMarks = () => {
    if (!ref.current || !ref.current.contains(document.getSelection()?.anchorNode || null)) return;
    const block = document.queryCommandValue("formatBlock");
    setMarks({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      ul: document.queryCommandState("insertUnorderedList"),
      ol: document.queryCommandState("insertOrderedList"),
      h2: /h2/i.test(block), h3: /h3/i.test(block), quote: /blockquote/i.test(block),
    });
  };

  React.useEffect(() => {
    document.addEventListener("selectionchange", syncMarks);
    return () => document.removeEventListener("selectionchange", syncMarks);
  }, []);

  const placeCaretEnd = () => {
    const el = ref.current;
    if (!el) return;
    if (!el.innerHTML.trim()) el.innerHTML = "<p><br></p>";
    const r = document.createRange();
    r.selectNodeContents(el); r.collapse(false);
    const sel = document.getSelection();
    sel.removeAllRanges(); sel.addRange(r);
  };
  const focusBack = () => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    const sel = document.getSelection();
    if (savedRange.current && el.contains(savedRange.current.startContainer)) {
      sel.removeAllRanges(); sel.addRange(savedRange.current);
    } else if (!sel || sel.rangeCount === 0 || !el.contains(sel.anchorNode)) {
      placeCaretEnd();
    }
  };
  const remember = () => {
    const sel = document.getSelection();
    if (sel && sel.rangeCount && ref.current?.contains(sel.anchorNode)) savedRange.current = sel.getRangeAt(0);
  };

  const exec = (cmd, val) => { focusBack(); document.execCommand(cmd, false, val); syncMarks(); recount(); };
  const block = (tag) => {
    focusBack();
    const cur = document.queryCommandValue("formatBlock");
    document.execCommand("formatBlock", false, new RegExp(tag, "i").test(cur) ? "P" : tag);
    syncMarks(); recount();
  };
  const insertHTML = (html) => {
    // run after the modal/popover unmounts, then insert at the caret (or at the end)
    setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const payload = html + "<p><br></p>";
      let done = false;
      try {
        el.focus();
        const sel = document.getSelection();
        let range = null;
        if (savedRange.current && el.contains(savedRange.current.startContainer)) range = savedRange.current;
        else if (sel && sel.rangeCount && el.contains(sel.anchorNode)) range = sel.getRangeAt(0);
        if (range) {
          range.deleteContents();
          range.insertNode(range.createContextualFragment(payload));
          range.collapse(false);
          done = true;
        }
      } catch (err) { done = false; }
      if (!done) el.insertAdjacentHTML("beforeend", payload);
      recount();
    }, 0);
  };

  const onImageFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    insertHTML(`<figure contenteditable="false" class="be-figure"><img src="${url}" alt=""/><figcaption contenteditable="true">Dodaj podpis zdjęcia…</figcaption></figure>`);
    e.target.value = "";
  };

  const insertYoutube = (url) => {
    const id = (url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/) || [])[1] || "dQw4w9WgXcQ";
    insertHTML(`<div contenteditable="false" class="be-embed"><span class="be-embed-play">▶</span><span class="be-embed-meta">YouTube · sandboxed iframe<br><code>${id}</code></span></div>`);
    setPopover(null);
  };

  const insertLink = (url) => {
    focusBack();
    const sel = document.getSelection();
    const hasText = sel && !sel.isCollapsed;
    if (hasText) document.execCommand("createLink", false, url);
    else document.execCommand("insertHTML", false, `<a href="${url}" rel="noopener nofollow">${url.replace(/^https?:\/\//, "")}</a>&nbsp;`);
    setPopover(null); recount();
  };

  const insertEvent = (ev, variant) => {
    setEmbedOpen(false);
    if (variant === "inline") {
      insertHTML(`<p class="be-event-inline"><a href="#" rel="noopener">${ev.title}</a> · ${ev.date}, ${ev.time} · ${ev.price}</p>`);
    } else {
      insertHTML(
        `<div contenteditable="false" class="be-event-card" data-event="${ev.id}">` +
        `<span class="be-event-img" style="background-image:url(${ev.image})"></span>` +
        `<span class="be-event-body"><span class="be-event-kicker">Event w eventapp</span>` +
        `<span class="be-event-title">${ev.title}</span>` +
        `<span class="be-event-meta">${ev.date} · ${ev.time} · Klub Stodoła</span></span>` +
        `<span class="be-event-cta">${ev.price}</span></div>`
      );
    }
  };

  return (
    <div>
      {/* Sticky glass toolbar */}
      <div style={{
        position: "sticky", top: 72, zIndex: 40, marginBottom: 14,
        display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
        padding: "7px 10px", borderRadius: "var(--radius-lg)",
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(16px) saturate(180%)", WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 1px 2px rgba(15,15,30,0.04), 0 8px 24px rgba(15,15,30,0.08)",
      }}>
        <TB label="Pogrubienie (⌘B)" active={marks.bold} onClick={() => exec("bold")}><Icons.Bold size={16}/></TB>
        <TB label="Kursywa (⌘I)" active={marks.italic} onClick={() => exec("italic")}><Icons.Italic size={16}/></TB>
        <TBDivider/>
        <TB label="Nagłówek 2" active={marks.h2} width={34} onClick={() => block("H2")}>H2</TB>
        <TB label="Nagłówek 3" active={marks.h3} width={34} onClick={() => block("H3")}>H3</TB>
        <TBDivider/>
        <TB label="Lista punktowana" active={marks.ul} onClick={() => exec("insertUnorderedList")}><Icons.ListUl size={16}/></TB>
        <TB label="Lista numerowana" active={marks.ol} onClick={() => exec("insertOrderedList")}><Icons.ListOl size={16}/></TB>
        <TB label="Cytat" active={marks.quote} onClick={() => block("BLOCKQUOTE")}><Icons.Quote size={16}/></TB>
        <TBDivider/>
        <div style={{position: "relative", display: "inline-flex"}}>
          <TB label="Wstaw link" active={popover === "link"}
            onClick={() => { remember(); setPopover(popover === "link" ? null : "link"); }}><Icons.Link size={16}/></TB>
          {popover === "link" && (
            <UrlPopover label="Wstaw link" placeholder="https://…"
              hint="Zaznacz tekst, aby podlinkować fragment. Adresy są sanityzowane, atrybut rel=&quot;nofollow&quot;."
              confirmLabel="Wstaw" onCancel={() => setPopover(null)} onConfirm={insertLink}/>
          )}
        </div>
        <TB label="Wstaw zdjęcie" onClick={() => fileRef.current?.click()}><Icons.Image size={16}/></TB>
        <div style={{position: "relative", display: "inline-flex"}}>
          <TB label="Osadź film z YouTube" active={popover === "youtube"}
            onClick={() => { remember(); setPopover(popover === "youtube" ? null : "youtube"); }}><Icons.Youtube size={16}/></TB>
          {popover === "youtube" && (
            <UrlPopover label="Osadź YouTube" placeholder="https://youtube.com/watch?v=…"
              hint="Film osadzamy w sandboxowanym iframe — bez ciasteczek reklamowych."
              confirmLabel="Osadź" onCancel={() => setPopover(null)} onConfirm={insertYoutube}/>
          )}
        </div>
        <TBDivider/>
        <TB label="Wstaw event" width={"auto"} onClick={() => { remember(); setEmbedOpen(true); }}>
          <span style={{display: "inline-flex", alignItems: "center", gap: 6, color: "var(--brand-primary)"}}>
            <Icons.Ticket size={15}/> Wstaw event
          </span>
        </TB>
        <span style={{flex: 1}}/>
        <TB label="Cofnij (⌘Z)" onClick={() => exec("undo")}><Icons.Undo size={16}/></TB>
        <TB label="Ponów (⌘⇧Z)" onClick={() => exec("redo")}><Icons.Redo size={16}/></TB>
      </div>

      <div ref={ref} className="be-content" contentEditable suppressContentEditableWarning
        onInput={recount} onKeyUp={syncMarks} onMouseUp={() => { syncMarks(); remember(); }}
        onBlur={remember}
        data-placeholder="Napisz artykuł… Zaznacz tekst, aby go sformatować."
        style={{minHeight: 420, outline: 0, fontSize: 17, lineHeight: 1.68,
          letterSpacing: "-0.2px", color: "var(--on-surface)"}}/>

      <div style={{marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--outline)",
        display: "flex", alignItems: "center", gap: 14, fontSize: 12, color: "var(--on-surface-variant)"}}>
        <span style={{fontFamily: "var(--font-mono)"}}>{words} słów</span>
        <span style={{color: "var(--outline-strong)"}}>·</span>
        <span>~{Math.max(1, Math.round(words / 200))} min czytania</span>
        <span style={{color: "var(--outline-strong)"}}>·</span>
        <span>Markdown i wklejony tekst są czyszczone ze stylów</span>
      </div>

      <input ref={fileRef} type="file" accept="image/*" onChange={onImageFile} style={{display: "none"}}/>
      {embedOpen && <EmbedEventModal onClose={() => setEmbedOpen(false)} onInsert={insertEvent}/>}
    </div>
  );
};

// ---------- FEATURED IMAGE DROPZONE ----------
const FeaturedImage = ({ src, onChange }) => {
  const { Icons } = window;
  const [over, setOver] = React.useState(false);
  const inputRef = React.useRef(null);
  const read = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => onChange(r.result);
    r.readAsDataURL(file);
  };
  if (src) {
    return (
      <div style={{position: "relative", aspectRatio: "16/9", borderRadius: "var(--radius-lg)",
        overflow: "hidden", background: `url(${src}) center / cover`, boxShadow: "var(--shadow-sm)"}}>
        <div style={{position: "absolute", inset: 0, background: "linear-gradient(transparent 50%, rgba(0,0,0,0.5))"}}/>
        <div style={{position: "absolute", bottom: 8, left: 10, fontSize: 11, color: "#fff",
          fontFamily: "var(--font-mono)"}}>1200 × 675 · OG image</div>
        <div style={{position: "absolute", top: 8, right: 8, display: "flex", gap: 6}}>
          <button onClick={() => inputRef.current?.click()} title="Zmień" style={{all: "unset", cursor: "pointer",
            width: 28, height: 28, borderRadius: 9999, background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)", display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
            <Icons.Edit size={13}/>
          </button>
          <button onClick={() => onChange(null)} title="Usuń" style={{all: "unset", cursor: "pointer",
            width: 28, height: 28, borderRadius: 9999, background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)", color: "var(--destructive)",
            display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
            <Icons.Trash size={13}/>
          </button>
        </div>
        <input ref={inputRef} type="file" accept="image/*" style={{display: "none"}}
          onChange={e => read(e.target.files?.[0])}/>
      </div>
    );
  }
  return (
    <div onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); read(e.dataTransfer.files?.[0]); }}
      style={{
        aspectRatio: "16/9", borderRadius: "var(--radius-lg)", cursor: "pointer",
        background: over ? "var(--brand-primary-container)" : "var(--surface-low)",
        border: `1.5px dashed ${over ? "var(--brand-primary)" : "var(--outline-strong)"}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
        color: over ? "var(--brand-primary)" : "var(--on-surface-variant)",
        transition: "all var(--duration-base) var(--ease-out)",
      }}>
      <Icons.Upload size={20}/>
      <span style={{fontSize: 13, fontWeight: 500}}>Przeciągnij zdjęcie lub wybierz plik</span>
      <span style={{fontSize: 11, color: "var(--on-surface-muted)"}}>JPEG, PNG, WebP · min. 1200 × 675 · 10 MB</span>
      <input ref={inputRef} type="file" accept="image/*" style={{display: "none"}}
        onChange={e => read(e.target.files?.[0])}/>
    </div>
  );
};

// ---------- SETTINGS PANEL SECTION ----------
const PanelSection = ({ title, hint, children, action }) => (
  <div style={{display: "flex", flexDirection: "column", gap: 10,
    paddingBottom: 18, borderBottom: "1px solid var(--outline)"}}>
    <div style={{display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10}}>
      <span style={{fontSize: 11, fontWeight: 600, letterSpacing: "1.2px",
        textTransform: "uppercase", color: "var(--on-surface-muted)"}}>{title}</span>
      {action}
    </div>
    {children}
    {hint && <span style={{fontSize: 12, color: "var(--on-surface-variant)", lineHeight: 1.45}}>{hint}</span>}
  </div>
);

// ---------- BLOG EDITOR SCREEN ----------
const BlogEditor = ({ post, mode = "create", onCancel, onSaved, onSubmitted }) => {
  const { Icons, Card, Button, Select, Toggle, Checkbox, Input, BLOG_CATEGORIES, VENUES, EVENTS,
    ArticlePreview, BlogConfirm } = window;

  const [title, setTitle] = React.useState(post?.title || "");
  const [excerpt, setExcerpt] = React.useState(post?.excerpt || "");
  const [bodyHtml, setBodyHtml] = React.useState(post?.body || "");
  const [category, setCategory] = React.useState(post?.category || "");
  const [venue, setVenue] = React.useState("stodola");
  const [related, setRelated] = React.useState(post ? ["e1"] : []);
  const [image, setImage] = React.useState(post?.image || null);
  const [lang, setLang] = React.useState(post?.lang || "PL");
  const [savedAt, setSavedAt] = React.useState(mode === "edit" ? "14:02" : null);
  const [saving, setSaving] = React.useState(false);
  const [recovery, setRecovery] = React.useState(mode === "create");
  const [preview, setPreview] = React.useState(false);
  const [confirmSubmit, setConfirmSubmit] = React.useState(false);
  const excerptRef = React.useRef(null);

  // auto-save every 30 s
  React.useEffect(() => {
    const t = setInterval(() => {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setSavedAt(new Date().toLocaleTimeString("pl-PL", {hour: "2-digit", minute: "2-digit"}));
      }, 700);
    }, 30000);
    return () => clearInterval(t);
  }, []);

  const autoGrow = (el) => { if (el) { el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; } };
  React.useEffect(() => autoGrow(excerptRef.current), [excerpt]);

  const canSubmit = title.trim().length > 3 && category && bodyHtml.replace(/<[^>]*>/g, "").trim().length > 40;

  const RECOVERED = {
    title: "Techno w Warszawie: przewodnik po klubach na sezon 2026",
    snippet: "Sezon klubowy 2026 zaczął się od dwóch nowych otwarć i jednego powrotu, na który czekano trzy lata. Zebraliśmy wszystkie miejsca, w których…",
    at: "wczoraj, 23:41",
  };

  return (
    <div style={{maxWidth: 1280, display: "flex", flexDirection: "column", gap: 16}}>
      {recovery && (
        <RecoveryBanner snippet={RECOVERED.snippet} savedAt={RECOVERED.at}
          onRestore={() => {
            setTitle(RECOVERED.title);
            setExcerpt("Nowe otwarcia, powroty i line-upy, na które warto polować w tym sezonie.");
            setRecovery(false);
            window.__blogToast?.({title: "Wersja przywrócona", desc: "Odzyskaliśmy tytuł i treść z kopii lokalnej"});
          }}
          onDiscard={() => setRecovery(false)}/>
      )}

      <div style={{display: "grid", gridTemplateColumns: "minmax(0, 1fr) 344px", gap: 16, alignItems: "start"}}>
        {/* ---------- MAIN CONTENT ---------- */}
        <Card padding={28} style={{display: "flex", flexDirection: "column", gap: 22}}>
          {/* Title */}
          <div style={{display: "flex", flexDirection: "column", gap: 8}}>
            <textarea rows={1} value={title} maxLength={CHAR_MAX}
              onChange={e => setTitle(e.target.value)}
              onInput={e => autoGrow(e.target)}
              ref={el => autoGrow(el)}
              placeholder="Tytuł artykułu"
              style={{
                border: 0, outline: 0, resize: "none", overflow: "hidden", width: "100%",
                background: "transparent", fontFamily: "var(--font-sans)", fontWeight: 700,
                fontSize: 34, lineHeight: 1.18, letterSpacing: "-0.8px", color: "var(--on-surface)",
                padding: 0,
              }}/>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12}}>
              <span style={{fontSize: 12, color: "var(--on-surface-variant)"}}>
                Tytuł trafia do wyników wyszukiwania i karty społecznościowej
              </span>
              <Counter value={title}/>
            </div>
          </div>

          <div style={{height: 1, background: "var(--outline)"}}/>

          {/* Excerpt */}
          <div style={{display: "flex", flexDirection: "column", gap: 8}}>
            <span style={{fontSize: 13, fontWeight: 500}}>Zajawka</span>
            <textarea ref={excerptRef} rows={2} value={excerpt} maxLength={CHAR_MAX}
              onChange={e => setExcerpt(e.target.value)}
              placeholder="Dwa–trzy zdania, które zachęcą do kliknięcia. Używamy ich też jako opisu SEO i OG."
              style={{
                border: 0, outline: 0, resize: "none", overflow: "hidden", width: "100%",
                background: "transparent", fontFamily: "var(--font-sans)", fontSize: 16,
                lineHeight: 1.55, letterSpacing: "-0.2px", color: "var(--on-surface)", padding: 0,
              }}/>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12}}>
              <span style={{fontSize: 12, color: "var(--on-surface-variant)"}}>
                Widoczna na liście artykułów i w podglądzie linku
              </span>
              <Counter value={excerpt}/>
            </div>
          </div>

          <div style={{height: 1, background: "var(--outline)"}}/>

          <RichTextEditor initialHtml={post?.body || ""} onChange={setBodyHtml}/>
        </Card>

        {/* ---------- SETTINGS & PUBLISHING PANEL ---------- */}
        <div style={{position: "sticky", top: 88, display: "flex", flexDirection: "column", gap: 16}}>
          <Card padding={20} style={{display: "flex", flexDirection: "column", gap: 18}}>
            {/* Autosave status */}
            <div style={{display: "flex", alignItems: "center", gap: 8, fontSize: 12,
              color: "var(--on-surface-variant)"}}>
              {saving ? (
                <><span style={{width: 12, height: 12, borderRadius: 9999,
                  border: "2px solid var(--brand-primary)", borderTopColor: "transparent",
                  animation: "spin 0.7s linear infinite", display: "inline-block"}}/>
                  Zapisywanie…</>
              ) : savedAt ? (
                <><Icons.CheckCircle size={13} stroke="#1F8A5B"/> Szkic zapisany automatycznie o {savedAt}</>
              ) : (
                <><Icons.Clock size={13}/> Autozapis co 30 sekund</>
              )}
            </div>

            <PanelSection title="Kategoria">
              <Select value={category} onChange={e => setCategory(e.target.value)}
                options={BLOG_CATEGORIES} placeholder="Wybierz kategorię…"/>
            </PanelSection>

            <PanelSection title="Powiązany lokal" hint="Wstępnie ustawiony na aktywny lokal. Możesz zostawić puste, jeśli tekst nie dotyczy konkretnego miejsca.">
              <Select value={venue} onChange={e => setVenue(e.target.value)}
                options={[{value: "", label: "Bez lokalu"}, ...VENUES.map(v => ({value: v.id, label: v.name}))]}/>
            </PanelSection>

            <PanelSection title="Powiązane eventy"
              action={<span style={{fontFamily: "var(--font-mono)", fontSize: 11,
                color: "var(--on-surface-muted)"}}>{related.length} wybrane</span>}>
              <div style={{display: "flex", flexDirection: "column", gap: 2, maxHeight: 168,
                overflowY: "auto", margin: "0 -8px", padding: "0 8px"}}>
                {EVENTS.filter(e => !e.past).map(e => {
                  const on = related.includes(e.id);
                  return (
                    <label key={e.id} style={{display: "flex", alignItems: "center", gap: 10,
                      padding: "8px", borderRadius: "var(--radius-md)", cursor: "pointer",
                      background: on ? "var(--brand-primary-container)" : "transparent"}}
                      onMouseEnter={ev => { if (!on) ev.currentTarget.style.background = "var(--surface-low)"; }}
                      onMouseLeave={ev => { if (!on) ev.currentTarget.style.background = "transparent"; }}>
                      <Checkbox checked={on} onChange={() =>
                        setRelated(r => on ? r.filter(x => x !== e.id) : [...r, e.id])}/>
                      <span style={{minWidth: 0, display: "flex", flexDirection: "column", gap: 2}}>
                        <span style={{fontSize: 13, color: "var(--on-surface)", overflow: "hidden",
                          textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 210}}>{e.title}</span>
                        <span style={{fontSize: 11, color: "var(--on-surface-variant)"}}>{e.date} · {e.time}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </PanelSection>

            <PanelSection title="Zdjęcie główne" hint="Używane jako obraz hero i karta przy udostępnianiu w social media.">
              <FeaturedImage src={image} onChange={setImage}/>
            </PanelSection>

            <PanelSection title="Język artykułu">
              <div style={{display: "flex", gap: 2, padding: 3, borderRadius: 9999,
                background: "var(--surface-low)", width: "fit-content"}}>
                {["PL", "EN"].map(l => (
                  <button key={l} onClick={() => setLang(l)} style={{
                    all: "unset", cursor: "pointer", padding: "7px 20px", borderRadius: 9999,
                    fontSize: 13, fontWeight: lang === l ? 600 : 500,
                    background: lang === l ? "var(--surface-high)" : "transparent",
                    boxShadow: lang === l ? "var(--shadow-sm)" : "none",
                    color: lang === l ? "var(--on-surface)" : "var(--on-surface-variant)",
                    transition: "all var(--duration-base) var(--ease-out)",
                  }}>{l}</button>
                ))}
              </div>
            </PanelSection>

            {/* Action area */}
            <div style={{display: "flex", flexDirection: "column", gap: 10}}>
              <Button fullWidth disabled={!canSubmit} icon={<Icons.Send size={15}/>}
                onClick={() => setConfirmSubmit(true)}>Wyślij do moderacji</Button>
              <div style={{display: "flex", gap: 8}}>
                <Button variant="secondary" style={{flex: 1}} icon={<Icons.Eye size={15}/>}
                  onClick={() => setPreview(true)}>Podgląd</Button>
                <Button variant="secondary" style={{flex: 1}}
                  onClick={() => { setSavedAt(new Date().toLocaleTimeString("pl-PL", {hour:"2-digit",minute:"2-digit"}));
                    onSaved?.(); }}>Zapisz szkic</Button>
              </div>
              {!canSubmit && (
                <span style={{fontSize: 12, color: "var(--on-surface-variant)", lineHeight: 1.45}}>
                  Do wysłania potrzebny jest tytuł, kategoria i co najmniej akapit treści.
                </span>
              )}
              <button onClick={onCancel} style={{all: "unset", cursor: "pointer", textAlign: "center",
                fontSize: 13, color: "var(--on-surface-variant)", padding: "6px 0"}}>
                Odrzuć zmiany i wróć do listy
              </button>
            </div>
          </Card>
        </div>
      </div>

      {preview && (
        <ArticlePreview onClose={() => setPreview(false)}
          post={{title, excerpt, body: bodyHtml || post?.body, category, image,
            date: new Date().toLocaleDateString("pl-PL", {day: "numeric", month: "long", year: "numeric"})}}/>
      )}

      {confirmSubmit && (
        <BlogConfirm
          title="Wysłać artykuł do moderacji?"
          desc="Twój artykuł zostanie sprawdzony w ciągu 24 h. Dostaniesz e-mail, gdy zostanie zaakceptowany. Do tego czasu tekst pozostaje zablokowany do edycji."
          confirmLabel="Wyślij do moderacji"
          icon={<window.Icons.Send size={20}/>}
          onCancel={() => setConfirmSubmit(false)}
          onConfirm={() => { setConfirmSubmit(false); onSubmitted?.(); }}>
          <div style={{padding: 14, borderRadius: "var(--radius-md)", background: "var(--surface-low)",
            display: "flex", flexDirection: "column", gap: 8}}>
            {[["Tytuł", title || "—"], ["Kategoria", (BLOG_CATEGORIES.find(c => c.value === category) || {}).label || "—"],
              ["Powiązane eventy", `${related.length}`], ["Język", lang]].map(([k, v]) => (
              <div key={k} style={{display: "flex", justifyContent: "space-between", gap: 16, fontSize: 13}}>
                <span style={{color: "var(--on-surface-variant)", flex: "0 0 auto"}}>{k}</span>
                <span style={{fontWeight: 500, textAlign: "right", overflow: "hidden",
                  textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{v}</span>
              </div>
            ))}
          </div>
        </BlogConfirm>
      )}
    </div>
  );
};

Object.assign(window, { BlogEditor, RichTextEditor, FeaturedImage, RecoveryBanner });

})();
