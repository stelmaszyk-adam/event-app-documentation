// eventapp B2B — Marketing landing page

/* === icons === */
;(function(){
  const I = ({ d, size = 20, stroke = "currentColor", strokeWidth = 1.75, fill = "none", children, ...rest }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} stroke={stroke}
         strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {d ? <path d={d}/> : children}
    </svg>
  );
  const Icons = {
    Pin:        (p) => <I {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></I>,
    Calendar:   (p) => <I {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></I>,
    Bell:       (p) => <I {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></I>,
    BarChart:   (p) => <I {...p}><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/></I>,
    Users:      (p) => <I {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></I>,
    Building:   (p) => <I {...p}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M10 22v-4h4v4"/><line x1="9" y1="7" x2="9.01" y2="7"/><line x1="15" y1="7" x2="15.01" y2="7"/><line x1="9" y1="11" x2="9.01" y2="11"/><line x1="15" y1="11" x2="15.01" y2="11"/></I>,
    Check:      (p) => <I {...p}><polyline points="20 6 9 17 4 12"/></I>,
    CheckCircle:(p) => <I {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></I>,
    X:          (p) => <I {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></I>,
    Minus:      (p) => <I {...p}><line x1="5" y1="12" x2="19" y2="12"/></I>,
    Arrow:      (p) => <I {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></I>,
    ArrowUpRight:(p)=> <I {...p}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></I>,
    Chevron:    (p) => <I {...p}><polyline points="9 18 15 12 9 6"/></I>,
    ChevronDown:(p) => <I {...p}><polyline points="6 9 12 15 18 9"/></I>,
    Plus:       (p) => <I {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></I>,
    Sparkles:   (p) => <I {...p}><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/></I>,
    Send:       (p) => <I {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></I>,
    Heart:      (p) => <I {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></I>,
    Eye:        (p) => <I {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></I>,
    Layers:     (p) => <I {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></I>,
    Lock:       (p) => <I {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></I>,
    Zap:        (p) => <I {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></I>,
    Ticket:     (p) => <I {...p}><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4z"/></I>,
    Repeat:     (p) => <I {...p}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15A9 9 0 0 1 5.64 18.36L1 14"/></I>,
    Image:      (p) => <I {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></I>,
    Globe:      (p) => <I {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></I>,
    Phone:      (p) => <I {...p}><rect x="5" y="2" width="14" height="20" rx="3"/><line x1="11" y1="18" x2="13" y2="18"/></I>,
    Map:        (p) => <I {...p}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></I>,
    Mail:       (p) => <I {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></I>,
    Star:       (p) => <I {...p}><polygon points="12 2 15 8.5 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 9 8.5"/></I>,
    Flame:      (p) => <I {...p}><path d="M12 2s4.5 4.5 4.5 9a4.5 4.5 0 1 1-9 0c0-2.5 2-4 2-4s-1 3 1 4c2 1 4-3 1.5-9z"/></I>,
    Settings:   (p) => <I {...p}><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/></I>,
    Menu:       (p) => <I {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></I>,
  };
  window.MIcons = Icons;
})();


/* === shared primitives === */
;(function(){
  const { MIcons } = window;

  const Logo = ({ size = 28, withWordmark = true, white = false }) => {
    const radii = { 20: 6, 28: 10, 32: 11, 36: 12, 44: 14 };
    const fonts = { 20: 9, 28: 11, 32: 13, 36: 14, 44: 18 };
    const radius = radii[size] || Math.round(size * 0.36);
    const fontSize = fonts[size] || Math.round(size * 0.42);
    return (
      <span style={{display:"inline-flex", alignItems:"center", gap: 10}}>
        <span style={{
          width: size, height: size, borderRadius: radius,
          background: white ? "rgba(255,255,255,0.16)" : "linear-gradient(135deg, #6C3FEB 0%, #A97EF8 100%)",
          color: "#fff", fontWeight: 700, fontSize, fontFamily: "var(--font-sans)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          boxShadow: white ? "none" : "0 6px 16px rgba(108,63,235,0.25)",
          letterSpacing: "0.5px",
        }}>E</span>
        {withWordmark && (
          <span style={{display: "inline-flex", flexDirection: "column", lineHeight: 1}}>
            <span style={{fontWeight: 700, fontSize: 17, letterSpacing: "-0.6px",
              color: white ? "#fff" : "var(--on-surface)"}}>eventapp</span>
            <span style={{fontWeight: 500, fontSize: 9.5, letterSpacing: "1.4px",
              textTransform: "uppercase",
              color: white ? "rgba(255,255,255,0.7)" : "var(--brand-primary)", marginTop: 3}}>
              dla organizatorów
            </span>
          </span>
        )}
      </span>
    );
  };

  const Btn = ({ variant = "primary", size = "md", icon, iconRight, children, onClick, href, style, ...rest }) => {
    const heights = { sm: 38, md: 46, lg: 56 };
    const pad     = { sm: "0 18px", md: "0 22px", lg: "0 28px" };
    const base = {
      height: heights[size],
      padding: pad[size],
      borderRadius: 9999,
      border: 0,
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: size === "sm" ? 13 : size === "lg" ? 16 : 14,
      letterSpacing: "var(--tracking-body-m)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      cursor: "pointer",
      transition: "transform 120ms var(--ease-out), filter 200ms var(--ease-out), background 200ms var(--ease-out)",
      whiteSpace: "nowrap",
      textDecoration: "none",
      ...style,
    };
    const variants = {
      primary: {
        background: "linear-gradient(135deg, #6C3FEB 0%, #8C56F4 50%, #A97EF8 100%)",
        color: "#fff",
        boxShadow: "var(--shadow-md), 0 10px 28px rgba(108,63,235,0.32)",
      },
      glass: {
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.24)",
        color: "#fff",
        backdropFilter: "blur(16px)",
      },
      secondary: {
        background: "var(--surface-high)",
        border: "1px solid var(--outline)",
        color: "var(--on-surface)",
      },
      ghost: {
        background: "transparent",
        color: "var(--on-surface)",
      },
      dark: {
        background: "var(--on-surface)",
        color: "#fff",
      },
    };
    const onMouseDown = e => { e.currentTarget.style.transform = "scale(0.97)"; };
    const onMouseUp = e => { e.currentTarget.style.transform = ""; };
    const onMouseLeave = e => { e.currentTarget.style.transform = ""; };
    const inner = (<>
      {icon && <span style={{display: "inline-flex"}}>{icon}</span>}
      <span>{children}</span>
      {iconRight && <span style={{display: "inline-flex"}}>{iconRight}</span>}
    </>);
    if (href) return <a href={href} style={{...base, ...variants[variant]}} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave} {...rest}>{inner}</a>;
    return <button onClick={onClick} style={{...base, ...variants[variant]}} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave} {...rest}>{inner}</button>;
  };

  const Pill = ({ tone = "brand", icon, children }) => {
    const tones = {
      brand:   { bg: "var(--brand-primary-container)", fg: "var(--brand-primary)" },
      amber:   { bg: "#FFECCC", fg: "#92400E" },
      success: { bg: "#DBF3E6", fg: "#15643F" },
      muted:   { bg: "var(--surface-mid)", fg: "var(--on-surface-variant)" },
      onDark:  { bg: "rgba(255,255,255,0.14)", fg: "#fff" },
    };
    const t = tones[tone];
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        height: 26, padding: "0 12px", borderRadius: 9999,
        fontSize: 12, fontWeight: 600, letterSpacing: "var(--tracking-body-m)",
        background: t.bg, color: t.fg,
      }}>{icon}{children}</span>
    );
  };

  Object.assign(window, { MLogo: Logo, MBtn: Btn, MPill: Pill });
})();


/* === Nav === */
;(function(){
  const { MIcons, MLogo, MBtn } = window;

  const Nav = ({ onCta }) => {
    const [scrolled, setScrolled] = React.useState(false);
    React.useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 16);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
      { label: "Jak to działa", href: "#how" },
      { label: "Funkcje",        href: "#features" },
      { label: "Mapa rozwoju",   href: "#roadmap" },
      { label: "Porównanie",     href: "#compare" },
      { label: "Cena",           href: "#pricing" },
      { label: "FAQ",            href: "#faq" },
    ];

    return (
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        padding: scrolled ? "10px 0" : "16px 0",
        background: scrolled ? "rgba(248,248,251,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid var(--outline)" : "1px solid transparent",
        transition: "all 200ms var(--ease-out)",
      }}>
        <div className="mw" style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24}}>
          <a href="#top"><MLogo size={28}/></a>
          <nav style={{display: "flex", alignItems: "center", gap: 4}}>
            {links.map(l => (
              <a key={l.href} href={l.href} style={{
                padding: "8px 14px", fontSize: 14, fontWeight: 500,
                color: "var(--on-surface-variant)", borderRadius: 9999,
                transition: "color 200ms, background 200ms",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--on-surface)"; e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--on-surface-variant)"; e.currentTarget.style.background = "transparent"; }}>
                {l.label}
              </a>
            ))}
          </nav>
          <div style={{display: "flex", alignItems: "center", gap: 10}}>
            <a href="index.html" style={{
              fontSize: 14, fontWeight: 500, color: "var(--on-surface-variant)",
              padding: "8px 14px",
            }}>Zaloguj się</a>
            <MBtn size="sm" variant="primary" iconRight={<MIcons.Arrow size={14}/>} onClick={onCta}>
              Przejmij lokal
            </MBtn>
          </div>
        </div>
      </div>
    );
  };

  window.MNav = Nav;
})();


/* === Hero === */
;(function(){
  const { MIcons, MBtn, MPill } = window;

  const Hero = () => {
    return (
      <section id="top" style={{
        position: "relative",
        padding: "40px 0 96px",
        overflow: "hidden",
      }}>
        {/* Background ornaments */}
        <div aria-hidden style={{
          position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)",
          width: 1100, height: 1100, borderRadius: "50%",
          background: "radial-gradient(circle at 50% 30%, rgba(169,126,248,0.22) 0%, rgba(108,63,235,0.08) 30%, transparent 60%)",
          pointerEvents: "none", zIndex: 0,
        }}/>
        <div aria-hidden className="dot-grid" style={{
          position: "absolute", inset: 0, opacity: 0.5,
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }}/>

        <div className="mw" style={{position: "relative", zIndex: 1}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
            gap: 28, paddingTop: 32, maxWidth: 920, margin: "0 auto"}}>
            <div className="reveal" style={{animationDelay: "0ms"}}>
              <MPill tone="brand" icon={<MIcons.Sparkles size={13}/>}>
                Premiera — 7 polskich miast · darmowe konto
              </MPill>
            </div>
            <h1 className="h-display reveal" style={{animationDelay: "60ms"}}>
              Twoje miejsce <span className="gradient-text">już jest na mapie</span>.<br/>
              Przejmij kontrolę — za darmo.
            </h1>
            <p className="lead reveal" style={{maxWidth: 660, fontSize: 20, animationDelay: "140ms"}}>
              eventapp to jeden panel, w którym publikujesz wydarzenia, wysyłasz powiadomienia push do obserwujących
              i czytasz analitykę. Bez prowizji, bez algorytmu, bez chowania zasięgu.
            </p>

            <div className="reveal" style={{display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", animationDelay: "220ms"}}>
              <MBtn size="lg" variant="primary" iconRight={<MIcons.Arrow size={16}/>}>
                Przejmij swój lokal
              </MBtn>
              <MBtn size="lg" variant="secondary" icon={<MIcons.Eye size={16}/>} href="index.html">
                Zobacz panel na żywo
              </MBtn>
            </div>

            <div className="reveal" style={{display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center",
              fontSize: 13, color: "var(--on-surface-variant)", marginTop: 4, animationDelay: "300ms"}}>
              <span style={{display: "inline-flex", alignItems: "center", gap: 6}}>
                <MIcons.Check size={14} stroke="#1F8A5B" strokeWidth={2.5}/> Bez karty
              </span>
              <span style={{display: "inline-flex", alignItems: "center", gap: 6}}>
                <MIcons.Check size={14} stroke="#1F8A5B" strokeWidth={2.5}/> 5 minut weryfikacji
              </span>
              <span style={{display: "inline-flex", alignItems: "center", gap: 6}}>
                <MIcons.Check size={14} stroke="#1F8A5B" strokeWidth={2.5}/> 0% prowizji od biletu
              </span>
            </div>
          </div>

          {/* Product mockup */}
          <ProductMock/>
        </div>
      </section>
    );
  };

  // Stylised dashboard preview rendered with CSS — anchors hero visually
  const ProductMock = () => {
    return (
      <div className="reveal" style={{
        marginTop: 64,
        position: "relative",
        animationDelay: "380ms",
      }}>
        <div style={{
          maxWidth: 1080, margin: "0 auto",
          background: "var(--surface-high)",
          borderRadius: 24,
          boxShadow: "var(--shadow-xl), 0 40px 80px -20px rgba(108,63,235,0.25)",
          border: "1px solid var(--outline)",
          padding: 12,
        }}>
          {/* Browser chrome */}
          <div style={{display: "flex", alignItems: "center", gap: 10, padding: "6px 12px 14px"}}>
            <span style={{width: 12, height: 12, borderRadius: 99, background: "#FF5F57"}}/>
            <span style={{width: 12, height: 12, borderRadius: 99, background: "#FEBC2E"}}/>
            <span style={{width: 12, height: 12, borderRadius: 99, background: "#28C840"}}/>
            <div style={{
              flex: 1, margin: "0 12px", padding: "6px 14px", borderRadius: 9999,
              background: "var(--surface-low)", fontSize: 12, color: "var(--on-surface-muted)",
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-mono)",
            }}>
              <MIcons.Lock size={11}/>
              dashboard.eventapp.dev / pulpit
            </div>
          </div>

          {/* Dashboard contents */}
          <div style={{
            background: "var(--surface-bg)",
            borderRadius: 16, padding: 24,
            display: "grid", gridTemplateColumns: "200px 1fr", gap: 24,
            minHeight: 460,
          }}>
            {/* Sidebar */}
            <div style={{display: "flex", flexDirection: "column", gap: 4}}>
              <div style={{padding: "8px 0 14px"}}>
                <window.MLogo size={20} withWordmark={false}/>
              </div>
              <NavRow icon={<MIcons.Building size={16}/>} active>Pulpit</NavRow>
              <NavRow icon={<MIcons.Calendar size={16}/>}>Eventy <span style={{
                marginLeft: "auto", padding: "1px 8px", background: "var(--brand-primary-container)",
                color: "var(--brand-primary)", borderRadius: 9999, fontSize: 10, fontWeight: 600,
              }}>7</span></NavRow>
              <NavRow icon={<MIcons.Bell size={16}/>}>Powiadomienia</NavRow>
              <NavRow icon={<MIcons.BarChart size={16}/>}>Analityka</NavRow>
              <NavRow icon={<MIcons.Settings size={16}/>}>Ustawienia</NavRow>
            </div>

            {/* Main */}
            <div style={{display: "flex", flexDirection: "column", gap: 16}}>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div>
                  <div style={{fontSize: 11, fontWeight: 600, letterSpacing: "1.2px",
                    textTransform: "uppercase", color: "var(--on-surface-muted)", marginBottom: 4}}>
                    Klub Stodoła · Warszawa
                  </div>
                  <div style={{fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px"}}>Dzień dobry, Marek</div>
                </div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "8px 16px", borderRadius: 9999,
                  background: "linear-gradient(135deg, #6C3FEB, #A97EF8)",
                  color: "#fff", fontSize: 13, fontWeight: 600,
                  boxShadow: "0 6px 16px rgba(108,63,235,0.32)",
                }}>
                  <MIcons.Plus size={14}/> Nowy event
                </div>
              </div>

              {/* Stats grid */}
              <div style={{display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10}}>
                <Stat label="Obserwujący" value="12 483" delta="+8%"/>
                <Stat label="Wyświetlenia (7d)" value="14 206" delta="+24%"/>
                <Stat label="Klik bilet" value="2 841" delta="+12%"/>
                <Stat label="Otwarcia push" value="38.9%" delta="+5pp"/>
              </div>

              {/* Event row */}
              <div style={{
                background: "var(--surface-high)", borderRadius: 16, padding: 12,
                border: "1px solid var(--outline)",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 12,
                  background: "url(assets/event-techno.jpg) center / cover",
                  flex: "0 0 auto",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{position: "absolute", inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(10,8,20,0.5) 100%)"}}/>
                </div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: 4}}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 9999,
                      background: "#DBF3E6", color: "#15643F",
                    }}>
                      <span style={{width: 5, height: 5, borderRadius: 99, background: "#1F8A5B"}}/>
                      Opublikowany
                    </span>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 9999,
                      background: "#FFECCC", color: "#92400E",
                    }}>
                      <MIcons.Flame size={10}/> Szybko znika
                    </span>
                  </div>
                  <div style={{fontSize: 14, fontWeight: 600, color: "var(--on-surface)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                    Techno Warsaw: Charlotte de Witte (B2B)
                  </div>
                  <div style={{fontSize: 11.5, color: "var(--on-surface-variant)", marginTop: 2}}>
                    Sob, 31 Maja · 22:00 · Bilet od 149 zł
                  </div>
                </div>
                <div style={{textAlign: "right"}}>
                  <div style={{fontSize: 18, fontWeight: 700, color: "var(--on-surface)"}}>2 841</div>
                  <div style={{fontSize: 10, color: "var(--on-surface-variant)", letterSpacing: "1px",
                    textTransform: "uppercase", fontWeight: 600}}>kliknięć</div>
                </div>
              </div>

              {/* Push composer */}
              <div style={{
                background: "linear-gradient(135deg, rgba(108,63,235,0.06), rgba(169,126,248,0.10))",
                border: "1px solid var(--brand-primary-container)",
                borderRadius: 16, padding: 14,
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "linear-gradient(135deg, #6C3FEB, #A97EF8)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  color: "#fff",
                }}><MIcons.Send size={16}/></div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{fontSize: 13, fontWeight: 600}}>Powiadom 12 483 obserwujących</div>
                  <div style={{fontSize: 11.5, color: "var(--on-surface-variant)"}}>1/1 dostępne dzisiaj · średnio 35% otwarć</div>
                </div>
                <div style={{
                  padding: "6px 14px", borderRadius: 9999,
                  background: "var(--on-surface)", color: "#fff",
                  fontSize: 12, fontWeight: 600,
                }}>Wyślij push</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating push card */}
        <div style={{
          position: "absolute", right: "max(16px, calc(50% - 580px))", top: 60,
          width: 280, padding: 14, borderRadius: 16,
          background: "var(--surface-high)",
          boxShadow: "var(--shadow-xl), 0 20px 40px rgba(0,0,0,0.10)",
          border: "1px solid var(--outline)",
          display: "flex", gap: 12,
          animation: "mFloat 4s ease-in-out infinite",
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #6C3FEB, #A97EF8)",
            color: "#fff", fontWeight: 700, fontSize: 13,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            flex: "0 0 auto",
          }}>E</div>
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
              <span style={{fontSize: 11, fontWeight: 600, color: "var(--on-surface)"}}>eventapp</span>
              <span style={{fontSize: 10, color: "var(--on-surface-muted)"}}>teraz</span>
            </div>
            <div style={{fontSize: 12.5, fontWeight: 600, color: "var(--on-surface)", marginTop: 2}}>Klub Stodoła</div>
            <div style={{fontSize: 11.5, color: "var(--on-surface-variant)", lineHeight: 1.4, marginTop: 2}}>
              Charlotte de Witte już w sobotę — ostatnie bilety w przedsprzedaży
            </div>
          </div>
        </div>

        {/* Floating map pin card */}
        <div style={{
          position: "absolute", left: "max(16px, calc(50% - 600px))", bottom: 40,
          padding: "10px 14px 10px 12px", borderRadius: 9999,
          background: "var(--surface-high)",
          boxShadow: "var(--shadow-lg), 0 12px 32px rgba(0,0,0,0.10)",
          border: "1px solid var(--outline)",
          display: "inline-flex", alignItems: "center", gap: 10,
          animation: "mFloat 5s ease-in-out infinite",
          animationDelay: "1s",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 9999,
            background: "linear-gradient(135deg, #6C3FEB, #A97EF8)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
            position: "relative",
          }}>
            <MIcons.Pin size={14} fill="#fff" stroke="#fff"/>
            <span style={{
              position: "absolute", inset: -6, borderRadius: 9999,
              border: "2px solid rgba(108,63,235,0.4)",
              animation: "mPing 2s ease-out infinite",
            }}/>
          </div>
          <div>
            <div style={{fontSize: 11, fontWeight: 600, color: "var(--on-surface)"}}>+ 142 nowych obserwujących</div>
            <div style={{fontSize: 10, color: "var(--on-surface-variant)"}}>w tym tygodniu</div>
          </div>
        </div>
      </div>
    );
  };

  const NavRow = ({ icon, active, children }) => (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "8px 10px", borderRadius: 8,
      background: active ? "var(--brand-primary-container)" : "transparent",
      color: active ? "var(--brand-primary)" : "var(--on-surface-variant)",
      fontSize: 12.5, fontWeight: active ? 600 : 500,
    }}>{icon}{children}</div>
  );

  const Stat = ({ label, value, delta }) => (
    <div style={{
      background: "var(--surface-high)", borderRadius: 12, padding: 12,
      border: "1px solid var(--outline)",
    }}>
      <div style={{fontSize: 10, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase",
        color: "var(--on-surface-muted)", marginBottom: 6}}>{label}</div>
      <div style={{display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 6}}>
        <span style={{fontSize: 19, fontWeight: 700, letterSpacing: "-0.4px"}}>{value}</span>
        <span style={{fontSize: 11, fontWeight: 600, color: "#15643F"}}>{delta}</span>
      </div>
    </div>
  );

  window.MHero = Hero;
})();


/* === Cities strip === */
;(function(){
  const Cities = () => {
    const cities = [
      { name: "Kraków",   ev: 1240, badge: "Pierwsze miasto" },
      { name: "Wrocław",  ev:  860, badge: "" },
      { name: "Warszawa", ev: 2380, badge: "" },
      { name: "Trójmiasto", ev: 720, badge: "" },
      { name: "Poznań",   ev:  640, badge: "" },
      { name: "Katowice", ev:  520, badge: "" },
      { name: "Łódź",     ev:  460, badge: "" },
    ];
    return (
      <section style={{
        padding: "48px 0 32px",
        borderTop: "1px solid var(--outline)",
        background: "var(--surface-high)",
      }}>
        <div className="mw">
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 24}}>
            <div style={{fontSize: 13, fontWeight: 600, color: "var(--on-surface-variant)",
              letterSpacing: "1.4px", textTransform: "uppercase"}}>
              Mapa eventów · 7 polskich miast · ponad 6 800 wydarzeń
            </div>
            <div style={{display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center"}}>
              {cities.map(c => (
                <div key={c.name} style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "10px 18px", borderRadius: 9999,
                  background: "var(--surface-bg)",
                  border: "1px solid var(--outline)",
                }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: 9999,
                    background: "linear-gradient(135deg, #6C3FEB, #A97EF8)",
                  }}/>
                  <span style={{fontSize: 14, fontWeight: 600, color: "var(--on-surface)"}}>{c.name}</span>
                  <span style={{fontSize: 12, color: "var(--on-surface-variant)",
                    fontFamily: "var(--font-mono)"}}>{c.ev.toLocaleString("pl-PL").replace(/,/g, " ")}</span>
                  {c.badge && (
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 9999,
                      background: "var(--brand-primary-container)", color: "var(--brand-primary)",
                      letterSpacing: "0.4px",
                    }}>{c.badge}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  window.MCities = Cities;
})();


/* === Pain points === */
;(function(){
  const { MIcons } = window;

  const Pains = () => {
    const items = [
      { pain: "Wydarzenia rozsiane po Facebooku, Instagramie i własnej stronie",
        fix:  "Jeden formularz, jeden panel, jedno źródło prawdy — widoczne na mapie miasta" },
      { pain: "Algorytm Facebooka chowa Twój zasięg, nawet do własnych fanów",
        fix:  "Push notification trafia do 100% obserwujących lokalu — bez algorytmu" },
      { pain: "Nie wiesz, ile osób widziało event ani kto kliknął bilet",
        fix:  "Statystyki: wyświetlenia, kliki biletów, nawigacja, wzrost obserwujących" },
      { pain: "Grafiki na social media zżerają wieczór przed każdym koncertem",
        fix:  "Auto-generowane grafiki eventu na Instagram i Stories (wkrótce)" },
      { pain: "Aplikacje do sprzedaży biletów biorą 5–10% prowizji",
        fix:  "0% prowizji. Twój sklep biletowy, Twoje pieniądze, my tylko kierujemy ruch" },
      { pain: "Zarządzanie obecnością wymaga osobnego etatu marketingu",
        fix:  "Przejęcie lokalu = 5 minut. Publikacja eventu = 90 sekund" },
    ];
    return (
      <section style={{padding: "96px 0", borderTop: "1px solid var(--outline)"}}>
        <div className="mw">
          <div style={{display: "flex", flexDirection: "column", gap: 16, marginBottom: 56, maxWidth: 720}}>
            <span className="eyebrow">Problem</span>
            <h2 className="h-section">
              Promujesz tak samo, jak 10 lat temu.<br/>
              <span style={{color: "var(--on-surface-variant)"}}>Trafiasz do tych samych osób.</span>
            </h2>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16}}>
            {items.map((it, i) => (
              <div key={i} style={{
                background: "var(--surface-high)", borderRadius: 20, padding: 24,
                border: "1px solid var(--outline)",
                display: "flex", flexDirection: "column", gap: 20,
              }}>
                <div style={{display: "flex", gap: 12, alignItems: "flex-start"}}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 9999, flex: "0 0 auto",
                    background: "var(--destructive-container)",
                    color: "var(--destructive)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <MIcons.X size={14} strokeWidth={2.5}/>
                  </span>
                  <p style={{margin: 0, fontSize: 15, fontWeight: 500, color: "var(--on-surface)",
                    lineHeight: 1.4, textDecoration: "line-through", textDecorationColor: "var(--on-surface-muted)",
                    textDecorationThickness: 1.5,
                  }}>{it.pain}</p>
                </div>
                <div style={{height: 1, background: "var(--outline)"}}/>
                <div style={{display: "flex", gap: 12, alignItems: "flex-start"}}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 9999, flex: "0 0 auto",
                    background: "linear-gradient(135deg, #6C3FEB, #A97EF8)",
                    color: "#fff",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <MIcons.Check size={14} strokeWidth={2.5}/>
                  </span>
                  <p style={{margin: 0, fontSize: 15, fontWeight: 500, color: "var(--on-surface)",
                    lineHeight: 1.4}}>{it.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  window.MPains = Pains;
})();


/* === How it works === */
;(function(){
  const { MIcons } = window;

  const How = () => {
    const steps = [
      { n: "01", icon: <MIcons.Building size={22}/>, t: "Znajdź swój lokal",
        d: "Twój lokal najpewniej jest już na mapie — zaciągnięty z publicznych źródeł. Wpisz nazwę, znajdź pin.",
        tag: "10 sekund" },
      { n: "02", icon: <MIcons.Lock size={22}/>, t: "Zweryfikuj się",
        d: "SMS na numer z wizytówki, e-mail w domenie lokalu lub dokument CEIDG/KRS. Wybierasz, co masz pod ręką.",
        tag: "2 minuty" },
      { n: "03", icon: <MIcons.Calendar size={22}/>, t: "Opublikuj wydarzenia",
        d: "Tytuł, data, zdjęcie, opis, link do biletu. Powtarzające się eventy (np. „Jazz wtorki”) ustawiasz raz.",
        tag: "90 sekund / event" },
      { n: "04", icon: <MIcons.Send size={22}/>, t: "Powiadom obserwujących",
        d: "Jedno powiadomienie push dziennie do wszystkich, którzy obserwują lokal. Średnio 35% otwiera.",
        tag: "1× dziennie" },
    ];
    return (
      <section id="how" style={{
        padding: "96px 0",
        background: "linear-gradient(180deg, var(--surface-bg) 0%, var(--surface-high) 100%)",
        borderTop: "1px solid var(--outline)",
      }}>
        <div className="mw">
          <div style={{display: "flex", flexDirection: "column", gap: 16, marginBottom: 56,
            alignItems: "center", textAlign: "center", maxWidth: 720, margin: "0 auto 56px"}}>
            <span className="eyebrow">Jak to działa</span>
            <h2 className="h-section">
              Od „przejmij lokal” do pierwszego pusha — <span className="gradient-text">w południe</span>
            </h2>
            <p className="lead">
              Żadnych integracji, żadnego SDK, żadnego pliku XML. Wszystko z przeglądarki.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            position: "relative",
          }}>
            {steps.map((s, i) => (
              <div key={i} style={{
                background: "var(--surface-high)",
                borderRadius: 20, padding: 24,
                border: "1px solid var(--outline)",
                display: "flex", flexDirection: "column", gap: 16,
                position: "relative",
                boxShadow: "var(--shadow-sm)",
              }}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                  <span style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "var(--brand-primary-container)",
                    color: "var(--brand-primary)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                  }}>{s.icon}</span>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 12,
                    color: "var(--on-surface-muted)",
                    letterSpacing: "1px",
                  }}>{s.n}</span>
                </div>
                <div>
                  <h3 style={{margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: "-0.3px",
                    color: "var(--on-surface)"}}>{s.t}</h3>
                  <p style={{margin: "8px 0 0", fontSize: 14, lineHeight: 1.5, color: "var(--on-surface-variant)"}}>
                    {s.d}
                  </p>
                </div>
                <div style={{marginTop: "auto"}}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    fontSize: 11, fontWeight: 600, color: "var(--brand-primary)",
                    background: "var(--brand-primary-container)",
                    padding: "4px 10px", borderRadius: 9999,
                  }}>
                    <MIcons.Zap size={11}/> {s.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  window.MHow = How;
})();


Object.assign(window, { __ready_part1: true });
