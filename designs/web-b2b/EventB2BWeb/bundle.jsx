// eventapp B2B — bundled (IIFE-per-file for scope isolation)

/* === icons.jsx === */
;(function(){

// eventapp UI kit — line icons (Lucide-family style).
// Substitution note: Figma file uses hand-traced paths; these are Lucide-equivalent.
// Stroke 1.75, round caps, no fill. Use size prop or CSS to scale.

const I = ({ d, size = 20, stroke = "currentColor", strokeWidth = 1.75, fill = "none", children, ...rest }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} stroke={stroke}
       strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {d ? <path d={d}/> : children}
  </svg>
);

const Icons = {
  Search:    (p) => <I {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></I>,
  Pin:       (p) => <I {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></I>,
  Calendar:  (p) => <I {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></I>,
  Heart:     (p) => <I {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></I>,
  HeartFill: (p) => <I {...p} fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></I>,
  Bell:      (p) => <I {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></I>,
  Share:     (p) => <I {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></I>,
  Plus:      (p) => <I {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></I>,
  Chevron:   (p) => <I {...p}><polyline points="9 18 15 12 9 6"/></I>,
  ChevronDown:(p)=> <I {...p}><polyline points="6 9 12 15 18 9"/></I>,
  ChevronLeft:(p)=> <I {...p}><polyline points="15 18 9 12 15 6"/></I>,
  Arrow:     (p) => <I {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></I>,
  Flame:     (p) => <I {...p}><path d="M12 2s4.5 4.5 4.5 9a4.5 4.5 0 1 1-9 0c0-2.5 2-4 2-4s-1 3 1 4c2 1 4-3 1.5-9z"/></I>,
  Repeat:    (p) => <I {...p}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15A9 9 0 0 1 5.64 18.36L1 14"/></I>,
  Star:      (p) => <I {...p}><polygon points="12 2 15 8.5 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 9 8.5"/></I>,
  Music:     (p) => <I {...p}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></I>,
  Ticket:    (p) => <I {...p}><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4z"/><line x1="13" y1="5" x2="13" y2="19" strokeDasharray="2 3"/></I>,
  Filter:    (p) => <I {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></I>,
  Users:     (p) => <I {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></I>,
  User:      (p) => <I {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></I>,
  Home:      (p) => <I {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></I>,
  Map:       (p) => <I {...p}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></I>,
  Bookmark:  (p) => <I {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></I>,
  X:         (p) => <I {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></I>,
  More:      (p) => <I {...p}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></I>,
  Crosshair: (p) => <I {...p}><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></I>,
  Layers:    (p) => <I {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></I>,
  Sliders:   (p) => <I {...p}><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></I>,
  Clock:     (p) => <I {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></I>,
  Info:      (p) => <I {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></I>,
  Smile:     (p) => <I {...p}><circle cx="12" cy="12" r="10"/><line x1="9" y1="16" x2="15" y2="16"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></I>,
  Confused:  (p) => <I {...p}><circle cx="12" cy="12" r="10"/><path d="M9 17a3 3 0 0 1 6 0"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></I>,
  Grid:      (p) => <I {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></I>,
  Building:  (p) => <I {...p}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="7" x2="9" y2="7.01"/><line x1="15" y1="7" x2="15" y2="7.01"/><line x1="9" y1="11" x2="9" y2="11.01"/><line x1="15" y1="11" x2="15" y2="11.01"/><line x1="9" y1="15" x2="9" y2="15.01"/><line x1="15" y1="15" x2="15" y2="15.01"/><path d="M10 22v-4h4v4"/></I>,
  BarChart:  (p) => <I {...p}><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/></I>,
  Settings:  (p) => <I {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></I>,
  LogOut:    (p) => <I {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></I>,
  Edit:      (p) => <I {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></I>,
  Trash:     (p) => <I {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></I>,
  Copy:      (p) => <I {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></I>,
  Camera:    (p) => <I {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></I>,
  Upload:    (p) => <I {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></I>,
  Image:     (p) => <I {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></I>,
  Send:      (p) => <I {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></I>,
  Check:     (p) => <I {...p}><polyline points="20 6 9 17 4 12"/></I>,
  CheckCircle:(p)=> <I {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></I>,
  Alert:     (p) => <I {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></I>,
  Eye:       (p) => <I {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></I>,
  TrendUp:   (p) => <I {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></I>,
  TrendDown: (p) => <I {...p}><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></I>,
  Globe:     (p) => <I {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></I>,
  Move:      (p) => <I {...p}><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></I>,
  GripVertical:(p)=> <I {...p}><circle cx="9" cy="5" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="19" r="1" fill="currentColor"/><circle cx="15" cy="5" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="19" r="1" fill="currentColor"/></I>,
  Phone:     (p) => <I {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></I>,
  Mail:      (p) => <I {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></I>,
  Link:      (p) => <I {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></I>,
  Sparkles:  (p) => <I {...p}><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/></I>,
  Pencil:    (p) => <I {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></I>,
  Bold:      (p) => <I {...p}><path d="M6 4h7a4 4 0 0 1 0 8H6z"/><path d="M6 12h8a4 4 0 0 1 0 8H6z"/></I>,
  Italic:    (p) => <I {...p}><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></I>,
  ListUl:    (p) => <I {...p}><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1.2" fill="currentColor"/><circle cx="4.5" cy="12" r="1.2" fill="currentColor"/><circle cx="4.5" cy="18" r="1.2" fill="currentColor"/></I>,
  ListOl:    (p) => <I {...p}><line x1="10" y1="6" x2="20" y2="6"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="10" y1="18" x2="20" y2="18"/><path d="M4 4.5h1.5V9"/><path d="M3.8 14h2.4l-2.4 3.2h2.6"/></I>,
  Quote:     (p) => <I {...p}><path d="M7 7H4.5A1.5 1.5 0 0 0 3 8.5V11a1.5 1.5 0 0 0 1.5 1.5H7V15a2 2 0 0 1-2 2"/><path d="M17 7h-2.5A1.5 1.5 0 0 0 13 8.5V11a1.5 1.5 0 0 0 1.5 1.5H17V15a2 2 0 0 1-2 2"/></I>,
  Undo:      (p) => <I {...p}><polyline points="9 14 4 9 9 4"/><path d="M4 9h11a5 5 0 0 1 0 10h-6"/></I>,
  Redo:      (p) => <I {...p}><polyline points="15 14 20 9 15 4"/><path d="M20 9H9a5 5 0 0 0 0 10h6"/></I>,
  Youtube:   (p) => <I {...p}><rect x="2" y="5" width="20" height="14" rx="4"/><polygon points="10.5 9 15.5 12 10.5 15" fill="currentColor" stroke="none"/></I>,
};

window.Icons = Icons;



})();

/* === primitives.jsx === */
;(function(){

// eventapp B2B — primitive components for dashboard

const { Icons } = window;

// ---------- BUTTON ----------
const Button = ({ variant = "primary", size = "md", icon, iconRight, disabled, children, onClick, style, fullWidth, ...rest }) => {
  const heights = { sm: 36, md: 44, lg: 52 };
  const pad     = { sm: "0 16px", md: "0 20px", lg: "0 28px" };
  const base = {
    height: heights[size],
    padding: pad[size],
    borderRadius: 9999,
    border: 0,
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: size === "sm" ? 13 : size === "lg" ? 15 : 14,
    letterSpacing: "var(--tracking-body-m)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.38 : 1,
    transition: "transform var(--duration-fast) var(--ease-out), filter var(--duration-fast) var(--ease-out), background var(--duration-base) var(--ease-out)",
    whiteSpace: "nowrap",
    width: fullWidth ? "100%" : undefined,
    ...style,
  };
  const variants = {
    primary: {
      background: "linear-gradient(135deg, #6C3FEB 0%, #8C56F4 50%, #A97EF8 100%)",
      color: "#fff",
      boxShadow: "var(--shadow-md), 0 6px 18px rgba(108,63,235,0.28)",
    },
    secondary: {
      background: "var(--surface-high)",
      border: "1px solid var(--outline)",
      color: "var(--on-surface)",
    },
    glass: {
      background: "rgba(255,255,255,0.7)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid var(--outline)",
      color: "var(--on-surface)",
    },
    tertiary: {
      background: "transparent",
      color: "var(--brand-primary)",
    },
    destructive: {
      background: "var(--destructive)",
      color: "#fff",
    },
    surface: {
      background: "var(--surface-mid)",
      color: "var(--on-surface)",
    },
  };
  return (
    <button {...rest} disabled={disabled} onClick={onClick} style={{...base, ...variants[variant]}}
      onMouseDown={e => !disabled && (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={e => (e.currentTarget.style.transform = "")}
      onMouseLeave={e => (e.currentTarget.style.transform = "")}>
      {icon && <span style={{display: "inline-flex"}}>{icon}</span>}
      <span>{children}</span>
      {iconRight && <span style={{display: "inline-flex"}}>{iconRight}</span>}
    </button>
  );
};

// ---------- ICON BUTTON ----------
const IconButton = ({ variant = "ghost", size = 36, children, onClick, title, style, ...rest }) => {
  const variants = {
    surface: { background: "var(--surface-mid)", color: "var(--on-surface)" },
    outline: { background: "transparent", border: "1px solid var(--outline)", color: "var(--on-surface)" },
    brand:   { background: "linear-gradient(135deg, #6C3FEB, #A97EF8)", color: "#fff", boxShadow: "var(--shadow-md)" },
    ghost:   { background: "transparent", color: "var(--on-surface-variant)" },
    danger:  { background: "transparent", color: "var(--destructive)" },
  };
  return (
    <button onClick={onClick} title={title} {...rest} style={{
      width: size, height: size, borderRadius: 9999, border: variants[variant].border || 0,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", flex: "0 0 auto",
      transition: "background var(--duration-base) var(--ease-out), transform var(--duration-fast) var(--ease-out)",
      ...variants[variant], ...style,
    }}
    onMouseEnter={e => { if (variant === "ghost") e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
    onMouseLeave={e => { if (variant === "ghost") e.currentTarget.style.background = "transparent"; }}>
      {children}
    </button>
  );
};

// ---------- BADGE ----------
const Badge = ({ tone = "neutral", icon, children, style }) => {
  const tones = {
    neutral:   { background: "var(--surface-mid)", color: "var(--on-surface)" },
    brand:     { background: "var(--brand-primary-container)", color: "var(--brand-primary)" },
    success:   { background: "#DBF3E6", color: "#15643F" },
    warning:   { background: "#FFECCC", color: "#92400E" },
    danger:    { background: "var(--destructive-container)", color: "var(--destructive)" },
    live:      { background: "#E5484D", color: "#fff" },
    muted:     { background: "var(--surface-low)", color: "var(--on-surface-variant)" },
    onImage:   { background: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)" },
  };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      height: 24, padding: "0 10px", borderRadius: 9999,
      fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
      letterSpacing: "var(--tracking-body-m)",
      ...tones[tone], ...style,
    }}>
      {icon}{children}
    </span>
  );
};

// status badge -> tone mapping
const StatusBadge = ({ status }) => {
  const map = {
    "Opublikowany":     { tone: "success", dot: "#1F8A5B" },
    "Szkic":            { tone: "muted",   dot: "#6C6C88" },
    "W moderacji":      { tone: "warning", dot: "#B45309" },
    "Odrzucony":        { tone: "danger",  dot: "#E5484D" },
    "Anulowany":        { tone: "danger",  dot: "#E5484D" },
  };
  const m = map[status] || { tone: "neutral", dot: "#6C6C88" };
  return (
    <Badge tone={m.tone} icon={<span style={{width:6, height:6, borderRadius:99, background: m.dot}}/>}>
      {status}
    </Badge>
  );
};

// ---------- INPUT ----------
const Field = ({ label, hint, error, required, children, style }) => (
  <label style={{display: "flex", flexDirection: "column", gap: 6, ...style}}>
    {label && (
      <span style={{
        fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500,
        color: "var(--on-surface)", letterSpacing: "var(--tracking-body-m)",
      }}>
        {label}{required && <span style={{color: "var(--destructive)", marginLeft: 3}}>*</span>}
      </span>
    )}
    {children}
    {hint && !error && (
      <span style={{fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--on-surface-variant)"}}>{hint}</span>
    )}
    {error && (
      <span style={{fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--destructive)"}}>{error}</span>
    )}
  </label>
);

const Input = ({ icon, value, onChange, placeholder, type = "text", suffix, style, error, ...rest }) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{
      height: 48, borderRadius: "var(--radius-lg)",
      background: "var(--surface-low)",
      display: "flex", alignItems: "center",
      padding: "0 14px", gap: 10,
      border: `1px solid ${error ? "var(--destructive)" : focused ? "var(--brand-primary)" : "transparent"}`,
      boxShadow: focused ? "0 0 0 3px rgba(108,63,235,0.12)" : "none",
      transition: "border-color var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out)",
      ...style,
    }}>
      {icon && <span style={{display:"inline-flex", color: "var(--on-surface-variant)"}}>{icon}</span>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        {...rest}
        style={{
          background: "transparent", border: 0, outline: 0, flex: 1, minWidth: 0,
          fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--on-surface)",
          letterSpacing: "var(--tracking-body-m)",
        }}/>
      {suffix && <span style={{display:"inline-flex", color: "var(--on-surface-variant)", fontSize: 13}}>{suffix}</span>}
    </div>
  );
};

const Textarea = ({ value, onChange, placeholder, rows = 4, maxLength, style, ...rest }) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-low)",
      padding: "12px 14px",
      border: `1px solid ${focused ? "var(--brand-primary)" : "transparent"}`,
      boxShadow: focused ? "0 0 0 3px rgba(108,63,235,0.12)" : "none",
      transition: "border-color var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out)",
      ...style,
    }}>
      <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} maxLength={maxLength}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        {...rest}
        style={{
          background: "transparent", border: 0, outline: 0, width: "100%",
          resize: "vertical", fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--on-surface)",
          letterSpacing: "var(--tracking-body-l)", lineHeight: 1.5,
        }}/>
      {maxLength && (
        <div style={{display: "flex", justifyContent: "flex-end", marginTop: 4,
          fontSize: 12, color: "var(--on-surface-muted)", fontFamily: "var(--font-sans)"}}>
          {(value || "").length} / {maxLength}
        </div>
      )}
    </div>
  );
};

// ---------- SELECT ----------
const Select = ({ value, onChange, options, placeholder, style }) => {
  return (
    <div style={{position: "relative", ...style}}>
      <select value={value} onChange={onChange} style={{
        appearance: "none", WebkitAppearance: "none",
        height: 48, width: "100%", borderRadius: "var(--radius-lg)",
        background: "var(--surface-low)", border: "1px solid transparent",
        padding: "0 40px 0 14px", fontFamily: "var(--font-sans)", fontSize: 14,
        color: value ? "var(--on-surface)" : "var(--on-surface-muted)",
        letterSpacing: "var(--tracking-body-m)", outline: 0, cursor: "pointer",
      }}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <span style={{position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
        pointerEvents: "none", color: "var(--on-surface-variant)"}}>
        <Icons.ChevronDown size={18}/>
      </span>
    </div>
  );
};

// ---------- TOGGLE ----------
const Toggle = ({ checked, onChange, label }) => (
  <label style={{display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer"}}>
    <input type="checkbox" checked={checked} onChange={onChange} style={{display: "none"}}/>
    <span style={{
      width: 40, height: 24, borderRadius: 9999, position: "relative",
      background: checked ? "var(--brand-primary)" : "var(--gray-300)",
      transition: "background var(--duration-base) var(--ease-out)",
      flex: "0 0 auto",
    }}>
      <span style={{
        position: "absolute", top: 2, left: checked ? 18 : 2,
        width: 20, height: 20, borderRadius: 9999, background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        transition: "left var(--duration-base) var(--ease-out)",
      }}/>
    </span>
    {label && <span style={{fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--on-surface)"}}>{label}</span>}
  </label>
);

// ---------- CHECKBOX ----------
const Checkbox = ({ checked, onChange, label }) => (
  <label style={{display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer"}}>
    <input type="checkbox" checked={checked} onChange={onChange} style={{display: "none"}}/>
    <span style={{
      width: 20, height: 20, borderRadius: 6,
      background: checked ? "var(--brand-primary)" : "var(--surface-high)",
      border: `1.5px solid ${checked ? "var(--brand-primary)" : "var(--outline-strong)"}`,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      transition: "background var(--duration-base) var(--ease-out)",
      flex: "0 0 auto",
    }}>
      {checked && <Icons.Check size={14} stroke="#fff" strokeWidth={3}/>}
    </span>
    {label && <span style={{fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--on-surface)"}}>{label}</span>}
  </label>
);

// ---------- RADIO ----------
const Radio = ({ checked, onChange, label, sublabel, name, value }) => (
  <label style={{display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer"}}>
    <input type="radio" name={name} value={value} checked={checked} onChange={onChange} style={{display: "none"}}/>
    <span style={{
      width: 20, height: 20, borderRadius: 9999, marginTop: 1,
      background: "var(--surface-high)",
      border: `1.5px solid ${checked ? "var(--brand-primary)" : "var(--outline-strong)"}`,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      flex: "0 0 auto",
    }}>
      {checked && <span style={{width: 10, height: 10, borderRadius: 9999, background: "var(--brand-primary)"}}/>}
    </span>
    <span style={{display: "flex", flexDirection: "column", gap: 2}}>
      <span style={{fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--on-surface)"}}>{label}</span>
      {sublabel && <span style={{fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--on-surface-variant)"}}>{sublabel}</span>}
    </span>
  </label>
);

// ---------- CARD (surface container) ----------
const Card = ({ children, padding = 24, style, ...rest }) => (
  <div {...rest} style={{
    background: "var(--surface-high)",
    borderRadius: "var(--radius-xl)",
    padding,
    boxShadow: "var(--shadow-sm)",
    ...style,
  }}>{children}</div>
);

// ---------- LOGO ----------
const Logo = ({ size = 28, withWordmark = false }) => {
  const radii = { 20: 6, 28: 10, 36: 12, 44: 14 };
  const fonts = { 20: 9, 28: 11, 36: 14, 44: 18 };
  const radius = radii[size] || Math.round(size * 0.36);
  const fontSize = fonts[size] || Math.round(size * 0.42);
  return (
    <span style={{display:"inline-flex", alignItems:"center", gap: 10}}>
      <span style={{
        width: size, height: size, borderRadius: radius,
        background: "linear-gradient(135deg, #6C3FEB 0%, #A97EF8 100%)",
        color: "#fff", fontWeight: 700, fontSize, fontFamily: "var(--font-sans)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 12px rgba(108,63,235,0.25)",
      }}>E</span>
      {withWordmark && (
        <span style={{display: "inline-flex", flexDirection: "column", lineHeight: 1}}>
          <span style={{fontWeight: 700, fontSize: 16, letterSpacing: "-0.5px", color: "var(--on-surface)"}}>eventapp</span>
          <span style={{fontWeight: 500, fontSize: 10, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--brand-primary)", marginTop: 2}}>Studio</span>
        </span>
      )}
    </span>
  );
};

// ---------- AVATAR ----------
const Avatar = ({ src, name, size = 32, style }) => {
  const initial = (name || "?").charAt(0).toUpperCase();
  return (
    <span style={{
      width: size, height: size, borderRadius: 9999,
      background: src ? `url(${src}) center / cover` : "linear-gradient(135deg, #6C3FEB, #A97EF8)",
      color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: size * 0.4,
      flex: "0 0 auto", ...style,
    }}>{!src && initial}</span>
  );
};

// ---------- KBD ----------
const Kbd = ({ children }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    minWidth: 20, height: 20, padding: "0 5px",
    borderRadius: 4, background: "var(--surface-mid)",
    fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--on-surface-variant)",
    border: "1px solid var(--outline)",
  }}>{children}</span>
);

Object.assign(window, {
  Button, IconButton, Badge, StatusBadge, Field, Input, Textarea, Select,
  Toggle, Checkbox, Radio, Card, Logo, Avatar, Kbd,
});



})();

/* === data.jsx === */
;(function(){

// eventapp B2B — Dashboard data: mock venues, events, etc.

const VENUES = [
  {
    id: "stodola",
    name: "Klub Stodoła",
    type: "Klub muzyczny",
    city: "Warszawa",
    address: "ul. Batorego 10, 02-591 Warszawa",
    image: "assets/venue-stodola.jpg",
    followers: 12483,
    upcoming: 7,
    description: "Legendarny warszawski klub muzyczny działający od 1956 roku. Sala koncertowa na 1200 osób, klub na 400.",
    category: "Klub muzyczny",
    website: "stodola.pl",
    facebook: "klubstodola",
    instagram: "klubstodola",
    phone: "+48 22 825 60 31",
    email: "biuro@stodola.pl",
    hours: {
      mon: { open: "20:00", close: "04:00", closed: false },
      tue: { open: "20:00", close: "04:00", closed: false },
      wed: { open: "20:00", close: "04:00", closed: false },
      thu: { open: "20:00", close: "04:00", closed: false },
      fri: { open: "20:00", close: "05:00", closed: false, flexible: true },
      sat: { open: "20:00", close: "05:00", closed: false, flexible: true },
      sun: { closed: true },
    },
  },
  {
    id: "barka",
    name: "Barka Wisła",
    type: "Bar / Klub",
    city: "Warszawa",
    image: "assets/event-jazz.jpg",
    followers: 3204,
    upcoming: 4,
  },
  {
    id: "powiekszenie",
    name: "Powiększenie",
    type: "Klub muzyczny",
    city: "Warszawa",
    image: "assets/event-techno.jpg",
    followers: 5872,
    upcoming: 9,
  },
];

const EVENTS = [
  {
    id: "e1",
    title: "Daria Zawiałow — Trasa „Wojny i Pokoju”",
    image: "assets/event-rock.jpg",
    date: "Sob, 24 Maja",
    time: "20:00",
    duration: "2h 30 min",
    status: "Opublikowany",
    category: "Koncert",
    price: "Bilet od 89 zł",
    priceType: "paid",
    ticketLink: "ebilet.pl/daria-zawialow",
    description: "Daria Zawiałow powraca do Warszawy z premierowym materiałem. Wyjątkowy koncert w sali koncertowej Stodoły — pełne brzmienie nowej trasy i hity poprzednich płyt.",
    views: 8429,
    ticketClicks: 1124,
    navigateClicks: 412,
    pushReach: 12483,
    pushOpenRate: 0.31,
    pushSent: true,
    recurring: false,
    adopted: false,
  },
  {
    id: "e2",
    title: "Techno Warsaw: Charlotte de Witte (B2B)",
    image: "assets/event-techno.jpg",
    date: "Sob, 31 Maja",
    time: "22:00",
    duration: "8h",
    status: "Opublikowany",
    category: "Klubowa noc",
    price: "Bilet od 149 zł",
    priceType: "paid",
    views: 14206,
    ticketClicks: 2841,
    navigateClicks: 723,
    pushReach: 12483,
    pushOpenRate: 0.39,
    pushSent: true,
    recurring: false,
    adopted: false,
    selling: true,
  },
  {
    id: "e3",
    title: "Jazz Wtorki — Marcin Wasilewski Trio",
    image: "assets/event-jazz.jpg",
    date: "Wt, 27 Maja",
    time: "20:30",
    duration: "1h 45 min",
    status: "Opublikowany",
    category: "Koncert · Jazz",
    price: "Bilet od 65 zł",
    priceType: "paid",
    views: 3120,
    ticketClicks: 384,
    navigateClicks: 142,
    pushSent: false,
    recurring: true,
    recurringText: "Co wtorek do 30 czerwca",
    adopted: false,
  },
  {
    id: "e4",
    title: "Otwarte mikrofony — slam poetycki",
    image: "assets/event-rock.jpg",
    date: "Czw, 29 Maja",
    time: "19:00",
    status: "Szkic",
    category: "Spoken word",
    price: "Bezpłatne",
    priceType: "free",
    views: 0,
    ticketClicks: 0,
    navigateClicks: 0,
    pushSent: false,
    recurring: false,
    adopted: false,
  },
  {
    id: "e5",
    title: "Disco Polo Night — odsłona 4",
    image: "assets/event-techno.jpg",
    date: "Sob, 7 Czerwca",
    time: "22:00",
    status: "W moderacji",
    category: "Klubowa noc",
    price: "Bilet od 49 zł",
    priceType: "paid",
    views: 0,
    ticketClicks: 0,
    navigateClicks: 0,
    pushSent: false,
    recurring: false,
    adopted: true,
    adoptedSource: "stodola.pl/wydarzenia",
  },
  {
    id: "e6",
    title: "Pidżama Porno — 30 lat na scenie",
    image: "assets/event-rock.jpg",
    date: "Pt, 11 Kwiet",
    time: "20:00",
    status: "Opublikowany",
    past: true,
    category: "Koncert",
    price: "Wyprzedane",
    priceType: "paid",
    views: 18420,
    ticketClicks: 4204,
    navigateClicks: 1209,
    pushSent: true,
    recurring: false,
    adopted: false,
  },
];

const PUSH_HISTORY = [
  {
    id: "p1",
    content: "Charlotte de Witte już w sobotę w Stodole — ostatnie bilety w przedsprzedaży 🎧",
    eventTitle: "Techno Warsaw: Charlotte de Witte (B2B)",
    sent: "Pn, 19 Maja · 18:00",
    reach: 12483,
    opens: 4854,
    openRate: 0.389,
  },
  {
    id: "p2",
    content: "Nowa data: Daria Zawiałow zagra w Stodole 24 maja. Bilety od 89 zł.",
    eventTitle: "Daria Zawiałow — Trasa „Wojny i Pokoju”",
    sent: "Czw, 8 Maja · 12:30",
    reach: 12128,
    opens: 3760,
    openRate: 0.310,
  },
  {
    id: "p3",
    content: "Jazz Wtorki wracają — Marcin Wasilewski Trio. Co wtorek od 20:30.",
    eventTitle: "Jazz Wtorki — Marcin Wasilewski Trio",
    sent: "Wt, 29 Kwie · 17:00",
    reach: 11904,
    opens: 2738,
    openRate: 0.230,
  },
];

const CATEGORIES = [
  { value: "concert",    label: "Koncert" },
  { value: "club",       label: "Klubowa noc" },
  { value: "jazz",       label: "Jazz" },
  { value: "festival",   label: "Festiwal" },
  { value: "exhibition", label: "Wystawa" },
  { value: "theatre",    label: "Teatr / spektakl" },
  { value: "standup",    label: "Stand-up" },
  { value: "workshop",   label: "Warsztaty" },
  { value: "meeting",    label: "Spotkanie" },
  { value: "kids",       label: "Dla dzieci" },
  { value: "sport",      label: "Sport" },
  { value: "other",      label: "Inne" },
];

Object.assign(window, { VENUES, EVENTS, PUSH_HISTORY, CATEGORIES });



})();

/* === shell.jsx === */
;(function(){

// eventapp B2B — Dashboard shell: sidebar nav + top bar + venue switcher

const { Icons, Logo, Avatar, Badge, IconButton, Button, Kbd } = window;

// ---------- VENUE SWITCHER ----------
const VenueSwitcher = ({ current, venues, onSelect, onMyVenues }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{position: "relative"}}>
      <button onClick={() => setOpen(o => !o)} style={{
        all: "unset", cursor: "pointer", width: "100%",
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 12px", borderRadius: "var(--radius-lg)",
        background: open ? "var(--surface-low)" : "transparent",
        border: "1px solid var(--outline)",
        transition: "background var(--duration-base) var(--ease-out)",
      }}>
        <span style={{
          width: 36, height: 36, borderRadius: 10,
          background: `url(${current.image}) center / cover`,
          flex: "0 0 auto",
        }}/>
        <span style={{flex: 1, minWidth: 0, display: "flex", flexDirection: "column", lineHeight: 1.2}}>
          <span style={{fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "var(--on-surface)",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{current.name}</span>
          <span style={{fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--on-surface-variant)",
            letterSpacing: "1.2px", textTransform: "uppercase", fontWeight: 500, marginTop: 4}}>
            {current.city}
          </span>
        </span>
        <Icons.ChevronDown size={16} stroke="var(--on-surface-variant)"/>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
          background: "var(--surface-high)", borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)", border: "1px solid var(--outline)",
          padding: 6, zIndex: 1000,
        }}>
          <div style={{padding: "6px 10px 4px", fontSize: 11, fontWeight: 500,
            letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--on-surface-muted)"}}>
            Twoje lokale ({venues.length})
          </div>
          {venues.map(v => (
            <button key={v.id} onClick={() => { onSelect(v); setOpen(false); }} style={{
              all: "unset", cursor: "pointer", width: "calc(100% - 16px)",
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px", borderRadius: "var(--radius-md)",
              margin: "2px 0",
              background: v.id === current.id ? "var(--surface-low)" : "transparent",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--surface-low)"}
              onMouseLeave={e => e.currentTarget.style.background = v.id === current.id ? "var(--surface-low)" : "transparent"}>
              <span style={{width: 28, height: 28, borderRadius: 8,
                background: `url(${v.image}) center / cover`, flex: "0 0 auto"}}/>
              <span style={{flex: 1, minWidth: 0, display: "flex", flexDirection: "column", lineHeight: 1.3}}>
                <span style={{fontSize: 13, fontWeight: 500, color: "var(--on-surface)"}}>{v.name}</span>
                <span style={{fontSize: 11, color: "var(--on-surface-variant)"}}>
                  {v.followers.toLocaleString("pl-PL").replace(/,/g, " ")} obserwujących
                </span>
              </span>
              {v.id === current.id && <Icons.Check size={14} stroke="var(--brand-primary)" strokeWidth={2.5}/>}
            </button>
          ))}
          <div style={{height: 1, background: "var(--outline)", margin: "6px 4px"}}/>
          <button onClick={() => { onMyVenues(); setOpen(false); }} style={{
            all: "unset", cursor: "pointer", width: "calc(100% - 16px)",
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px", borderRadius: "var(--radius-md)", margin: "2px 0",
            color: "var(--brand-primary)", fontSize: 13, fontWeight: 500,
          }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--surface-low)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <Icons.Grid size={14}/>
            <span>Moje lokale</span>
          </button>
          <button style={{
            all: "unset", cursor: "pointer", width: "calc(100% - 16px)",
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px", borderRadius: "var(--radius-md)", margin: "2px 0",
            color: "var(--on-surface-variant)", fontSize: 13, fontWeight: 500,
          }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--surface-low)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <Icons.Plus size={14}/>
            <span>Przejmij kolejny lokal</span>
          </button>
        </div>
      )}
    </div>
  );
};

// ---------- SIDEBAR ----------
const NAV_ITEMS = [
  { id: "dashboard", label: "Pulpit",        icon: Icons.Home,     route: "/dashboard" },
  { id: "events",    label: "Eventy",         icon: Icons.Calendar, route: "/events" },
  { id: "blog",      label: "Blog",           icon: Icons.Pencil,   route: "/blog", pending: 2,
    children: [
      { id: "blog",     label: "Moje artykuły" },
      { id: "blog-new", label: "Nowy artykuł" },
    ] },
  { id: "venue",     label: "Profil lokalu",  icon: Icons.Building, route: "/venue" },
  { id: "push",      label: "Powiadomienia",  icon: Icons.Bell,     route: "/push", badge: "1/1" },
  { id: "analytics", label: "Analityka",      icon: Icons.BarChart, route: "/analytics" },
];

const SECONDARY_NAV = [
  { id: "settings",  label: "Ustawienia",     icon: Icons.Settings, route: "/settings" },
];

const Sidebar = ({ active, route, onNavigate, venue, venues, onVenueSelect, onMyVenues }) => {
  return (
    <aside style={{
      width: 264, flex: "0 0 264px",
      background: "var(--surface-high)",
      borderRight: "1px solid var(--outline)",
      display: "flex", flexDirection: "column",
      padding: 16,
      gap: 16, height: "100vh",
      position: "sticky", top: 0,
    }}>
      {/* Logo */}
      <div style={{padding: "8px 8px 4px"}}>
        <Logo size={28} withWordmark/>
      </div>

      {/* Venue switcher */}
      <VenueSwitcher current={venue} venues={venues} onSelect={onVenueSelect} onMyVenues={onMyVenues}/>

      {/* Primary nav */}
      <nav style={{display: "flex", flexDirection: "column", gap: 2, marginTop: 4}}>
        <div style={{padding: "4px 12px 8px", fontSize: 11, fontWeight: 600,
          letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--on-surface-muted)"}}>
          Zarządzanie
        </div>
        {NAV_ITEMS.map(item => {
          const IconC = item.icon;
          const isActive = active === item.id;
          return (
            <React.Fragment key={item.id}>
            <button onClick={() => onNavigate(item.id)} style={{
              all: "unset", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 12px", borderRadius: "var(--radius-md)",
              background: isActive ? "var(--brand-primary-container)" : "transparent",
              color: isActive ? "var(--brand-primary)" : "var(--on-surface)",
              fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: isActive ? 600 : 500,
              transition: "background var(--duration-base) var(--ease-out)",
              position: "relative",
            }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "var(--surface-low)"; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
              {isActive && <span style={{position: "absolute", left: -16, top: 8, bottom: 8, width: 3,
                background: "var(--brand-primary)", borderRadius: "0 4px 4px 0"}}/>}
              <IconC size={18} stroke={isActive ? "var(--brand-primary)" : "var(--on-surface-variant)"}/>
              <span style={{flex: 1}}>{item.label}</span>
              {item.badge && (
                <span style={{
                  fontSize: 11, padding: "2px 8px", borderRadius: 9999,
                  background: isActive ? "var(--brand-primary)" : "var(--surface-low)",
                  color: isActive ? "#fff" : "var(--on-surface-variant)",
                  fontWeight: 500,
                  fontFamily: "var(--font-mono)",
                }}>{item.badge}</span>
              )}
              {item.pending > 0 && (
                <span title={`${item.pending} artykuły w moderacji`} style={{
                  minWidth: 20, height: 20, padding: "0 6px", borderRadius: 9999,
                  background: "var(--amber-500)", color: "#3D2300",
                  fontSize: 11, fontWeight: 700, fontVariantNumeric: "tabular-nums",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>{item.pending}</span>
              )}
            </button>
            {item.children && isActive && (
              <div style={{display: "flex", flexDirection: "column", gap: 2, margin: "2px 0 6px"}}>
                {item.children.map(sub => {
                  const subActive = route === sub.id;
                  return (
                    <button key={sub.id} onClick={() => onNavigate(sub.id)} style={{
                      all: "unset", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "7px 12px 7px 42px", borderRadius: "var(--radius-md)",
                      fontFamily: "var(--font-sans)", fontSize: 13,
                      fontWeight: subActive ? 600 : 500,
                      color: subActive ? "var(--brand-primary)" : "var(--on-surface-variant)",
                      background: subActive ? "var(--surface-low)" : "transparent",
                      transition: "background var(--duration-base) var(--ease-out)",
                    }}
                      onMouseEnter={e => { if (!subActive) e.currentTarget.style.background = "var(--surface-low)"; }}
                      onMouseLeave={e => { if (!subActive) e.currentTarget.style.background = "transparent"; }}>
                      <span style={{width: 5, height: 5, borderRadius: 99, flex: "0 0 auto",
                        background: subActive ? "var(--brand-primary)" : "var(--outline-strong)"}}/>
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            )}
            </React.Fragment>
          );
        })}
      </nav>

      <div style={{flex: 1}}/>

      {/* Onboarding progress card */}
      <OnboardingMini onClick={() => onNavigate("dashboard")}/>

      {/* Secondary nav */}
      <nav style={{display: "flex", flexDirection: "column", gap: 2,
        paddingTop: 12, borderTop: "1px solid var(--outline)"}}>
        {SECONDARY_NAV.map(item => {
          const IconC = item.icon;
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)} style={{
              all: "unset", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 12px", borderRadius: "var(--radius-md)",
              background: isActive ? "var(--brand-primary-container)" : "transparent",
              color: isActive ? "var(--brand-primary)" : "var(--on-surface)",
              fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500,
            }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "var(--surface-low)"; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
              <IconC size={18} stroke={isActive ? "var(--brand-primary)" : "var(--on-surface-variant)"}/>
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* User row */}
        <div style={{display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px", marginTop: 4}}>
          <Avatar name="Marek" size={32}/>
          <span style={{flex: 1, minWidth: 0, display: "flex", flexDirection: "column", lineHeight: 1.2}}>
            <span style={{fontSize: 13, fontWeight: 600, color: "var(--on-surface)"}}>Marek Nowicki</span>
            <span style={{fontSize: 11, color: "var(--on-surface-variant)",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
              marek@stodola.pl
            </span>
          </span>
          <IconButton variant="ghost" size={28} title="Wyloguj" onClick={() => window.__logout?.()}>
            <Icons.LogOut size={15}/>
          </IconButton>
        </div>
      </nav>
    </aside>
  );
};

// Compact onboarding card in sidebar
const OnboardingMini = ({ onClick }) => {
  const completed = 3;
  const total = 5;
  const pct = (completed / total) * 100;
  return (
    <button onClick={onClick} style={{
      all: "unset", cursor: "pointer",
      padding: 14, borderRadius: "var(--radius-lg)",
      background: "linear-gradient(135deg, rgba(108,63,235,0.06) 0%, rgba(169,126,248,0.10) 100%)",
      border: "1px solid var(--brand-primary-container)",
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <span style={{fontSize: 12, fontWeight: 600, color: "var(--brand-primary)",
          letterSpacing: "var(--tracking-body-m)"}}>
          <Icons.Sparkles size={12} style={{display: "inline", verticalAlign: "-2px", marginRight: 4}}/>
          Skonfiguruj lokal
        </span>
        <span style={{fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--brand-primary)"}}>{completed}/{total}</span>
      </div>
      <div style={{height: 6, borderRadius: 9999, background: "rgba(108,63,235,0.12)", overflow: "hidden"}}>
        <div style={{width: `${pct}%`, height: "100%",
          background: "linear-gradient(90deg, #6C3FEB, #A97EF8)", borderRadius: 9999,
          transition: "width var(--duration-slow) var(--ease-out)"}}/>
      </div>
      <div style={{fontSize: 11, color: "var(--on-surface-variant)", textAlign: "left"}}>
        Dokończ, aby lokal pojawił się obserwującym
      </div>
    </button>
  );
};

// ---------- TOP BAR ----------
const TopBar = ({ title, subtitle, breadcrumbs, actions }) => {
  return (
    <header style={{
      height: 72, padding: "0 32px",
      borderBottom: "1px solid var(--outline)",
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{display: "flex", flexDirection: "column", gap: 4, minWidth: 0}}>
        {breadcrumbs && (
          <div style={{display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, color: "var(--on-surface-variant)"}}>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <Icons.Chevron size={11}/>}
                <span style={{color: i === breadcrumbs.length - 1 ? "var(--on-surface)" : undefined,
                  fontWeight: i === breadcrumbs.length - 1 ? 500 : 400}}>
                  {b}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}
        <div style={{display: "flex", alignItems: "baseline", gap: 12}}>
          <h1 style={{margin: 0, font: "var(--type-headline-l)",
            letterSpacing: "var(--tracking-headline-l)", color: "var(--on-surface)"}}>
            {title}
          </h1>
          {subtitle && (
            <span style={{fontSize: 14, color: "var(--on-surface-variant)"}}>{subtitle}</span>
          )}
        </div>
      </div>

      <div style={{display: "flex", alignItems: "center", gap: 12}}>
        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          height: 40, padding: "0 14px", borderRadius: "var(--radius-lg)",
          background: "var(--surface-low)", minWidth: 240,
          fontSize: 13, color: "var(--on-surface-muted)",
        }}>
          <Icons.Search size={15}/>
          <span style={{flex: 1}}>Szukaj eventów, lokali…</span>
          <Kbd>⌘K</Kbd>
        </div>

        {/* Notifications */}
        <IconButton variant="ghost" size={40} title="Powiadomienia">
          <span style={{position: "relative"}}>
            <Icons.Bell size={18}/>
            <span style={{position: "absolute", top: -2, right: -2,
              width: 8, height: 8, borderRadius: 9999, background: "var(--destructive)",
              border: "2px solid var(--surface-high)"}}/>
          </span>
        </IconButton>

        {actions}
      </div>
    </header>
  );
};

// ---------- SHELL ----------
const Shell = ({ active, route, onNavigate, venue, venues, onVenueSelect, onMyVenues, topBar, children }) => {
  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: "var(--surface-bg)",
      fontFamily: "var(--font-sans)",
      color: "var(--on-surface)",
    }}>
      <Sidebar active={active} route={route} onNavigate={onNavigate} venue={venue} venues={venues}
        onVenueSelect={onVenueSelect} onMyVenues={onMyVenues}/>
      <main style={{flex: 1, minWidth: 0, display: "flex", flexDirection: "column"}}>
        <div style={{flex: 1, padding: "28px 32px 64px"}}>
          {children}
        </div>
      </main>
    </div>
  );
};

Object.assign(window, { Shell, Sidebar, TopBar, VenueSwitcher });



})();

/* === screen-dashboard.jsx === */
;(function(){

// eventapp B2B — Dashboard Overview screen

const { Icons, Card, Button, IconButton, Badge, StatusBadge, Avatar, EVENTS, PUSH_HISTORY } = window;

// ---------- STAT CARD ----------
const StatCard = ({ label, value, delta, icon, trend }) => {
  const positive = (delta || "").startsWith("+");
  return (
    <Card padding={20} style={{display: "flex", flexDirection: "column", gap: 12, minHeight: 132}}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <span style={{
          width: 36, height: 36, borderRadius: 10,
          background: "var(--brand-primary-container)",
          color: "var(--brand-primary)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>{icon}</span>
        {delta && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            fontSize: 12, fontWeight: 600,
            color: positive ? "#15643F" : "var(--destructive)",
            background: positive ? "#DBF3E6" : "var(--destructive-container)",
            padding: "3px 8px", borderRadius: 9999,
          }}>
            {positive ? <Icons.TrendUp size={11}/> : <Icons.TrendDown size={11}/>}
            {delta}
          </span>
        )}
      </div>
      <div style={{display: "flex", flexDirection: "column", gap: 4}}>
        <div style={{font: "var(--type-headline-l)", letterSpacing: "-0.6px", color: "var(--on-surface)", lineHeight: 1}}>
          {value}
        </div>
        <div style={{fontSize: 13, color: "var(--on-surface-variant)", letterSpacing: "var(--tracking-body-m)"}}>{label}</div>
      </div>
      {trend && (
        <Sparkline data={trend}/>
      )}
    </Card>
  );
};

// Tiny inline sparkline
const Sparkline = ({ data, color = "var(--brand-primary)", height = 28 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  const areaPoints = `0,${height} ${points} ${w},${height}`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" width="100%" height={height}>
      <defs>
        <linearGradient id={`spark-${color.replace(/[^a-z0-9]/gi, "")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#spark-${color.replace(/[^a-z0-9]/gi, "")})`}/>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// ---------- ONBOARDING CHECKLIST (expanded) ----------
const OnboardingChecklist = ({ onNavigate }) => {
  const steps = [
    { id: 1, label: "Dodaj zdjęcia lokalu",        done: true,  desc: "Min. 1 zdjęcie tytułowe", to: "venue" },
    { id: 2, label: "Uzupełnij opis i godziny",    done: true,  desc: "Opis + godziny otwarcia",  to: "venue" },
    { id: 3, label: "Połącz konta social media",   done: true,  desc: "Facebook, Instagram, www", to: "venue" },
    { id: 4, label: "Dodaj pierwszy event",        done: false, desc: "Albo zweryfikuj zaadoptowane wydarzenia", to: "events" },
    { id: 5, label: "Wyślij powiadomienie",        done: false, desc: "Daj znać 12 483 obserwującym", to: "push" },
  ];
  const completed = steps.filter(s => s.done).length;

  return (
    <Card padding={0} style={{overflow: "hidden"}}>
      <div style={{
        padding: "20px 24px",
        background: "linear-gradient(135deg, rgba(108,63,235,0.04) 0%, rgba(169,126,248,0.08) 100%)",
        borderBottom: "1px solid var(--outline)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      }}>
        <div>
          <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: 4}}>
            <Icons.Sparkles size={16} stroke="var(--brand-primary)"/>
            <h3 style={{margin: 0, font: "var(--type-headline-m)", letterSpacing: "var(--tracking-headline-m)"}}>
              Skonfiguruj lokal
            </h3>
            <Badge tone="brand">{completed}/{steps.length}</Badge>
          </div>
          <p style={{margin: 0, fontSize: 13, color: "var(--on-surface-variant)"}}>
            Dokończ konfigurację, aby maksymalnie wykorzystać profil w eventapp
          </p>
        </div>
        <button style={{
          all: "unset", cursor: "pointer", color: "var(--on-surface-variant)",
          fontSize: 13, padding: "6px 10px", borderRadius: 9999,
        }}>Pomiń</button>
      </div>
      <div style={{padding: 8}}>
        {steps.map(s => (
          <button key={s.id} onClick={() => onNavigate(s.to)} disabled={s.done} style={{
            all: "unset", cursor: s.done ? "default" : "pointer", width: "calc(100% - 32px)",
            display: "flex", alignItems: "center", gap: 14,
            padding: "14px 16px", borderRadius: "var(--radius-md)",
          }}
            onMouseEnter={e => { if (!s.done) e.currentTarget.style.background = "var(--surface-low)"; }}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <span style={{
              width: 24, height: 24, borderRadius: 9999, flex: "0 0 auto",
              background: s.done ? "var(--brand-primary)" : "transparent",
              border: s.done ? 0 : "1.5px solid var(--outline-strong)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>
              {s.done && <Icons.Check size={14} stroke="#fff" strokeWidth={3}/>}
            </span>
            <span style={{flex: 1, display: "flex", flexDirection: "column", gap: 2, textAlign: "left"}}>
              <span style={{fontSize: 14, fontWeight: 500,
                color: s.done ? "var(--on-surface-muted)" : "var(--on-surface)",
                textDecoration: s.done ? "line-through" : "none"}}>{s.label}</span>
              <span style={{fontSize: 12, color: "var(--on-surface-variant)"}}>{s.desc}</span>
            </span>
            {!s.done && <Icons.Chevron size={14} stroke="var(--on-surface-variant)"/>}
          </button>
        ))}
      </div>
    </Card>
  );
};

// ---------- UPCOMING EVENT ROW ----------
const UpcomingEventRow = ({ event, onClick }) => (
  <button onClick={onClick} style={{
    all: "unset", cursor: "pointer", width: "100%",
    display: "grid", gridTemplateColumns: "56px 1fr auto", gap: 14, alignItems: "center",
    padding: "12px 14px", borderRadius: "var(--radius-md)",
    transition: "background var(--duration-base) var(--ease-out)",
  }}
    onMouseEnter={e => e.currentTarget.style.background = "var(--surface-low)"}
    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
    <span style={{width: 56, height: 56, borderRadius: 12,
      background: `url(${event.image}) center / cover`, flex: "0 0 auto"}}/>
    <span style={{display: "flex", flexDirection: "column", gap: 4, minWidth: 0}}>
      <span style={{fontSize: 14, fontWeight: 500, color: "var(--on-surface)",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{event.title}</span>
      <span style={{fontSize: 12, color: "var(--on-surface-variant)",
        display: "flex", alignItems: "center", gap: 8}}>
        <Icons.Calendar size={11}/>{event.date} · {event.time}
        <span style={{color: "var(--outline-strong)"}}>·</span>
        <span>{event.category}</span>
      </span>
    </span>
    <StatusBadge status={event.status}/>
  </button>
);

// ---------- QUICK ACTION ----------
const QuickAction = ({ icon, title, desc, onClick, accent }) => (
  <button onClick={onClick} style={{
    all: "unset", cursor: "pointer", flex: 1, minWidth: 0,
    display: "flex", alignItems: "center", gap: 14,
    padding: 16, borderRadius: "var(--radius-lg)",
    background: accent ? "linear-gradient(135deg, #6C3FEB 0%, #8C56F4 50%, #A97EF8 100%)" : "var(--surface-high)",
    color: accent ? "#fff" : "var(--on-surface)",
    border: accent ? "0" : "1px solid var(--outline)",
    boxShadow: accent ? "0 6px 18px rgba(108,63,235,0.28)" : "var(--shadow-sm)",
    transition: "transform var(--duration-fast) var(--ease-out)",
  }}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
    <span style={{
      width: 40, height: 40, borderRadius: 12,
      background: accent ? "rgba(255,255,255,0.18)" : "var(--brand-primary-container)",
      color: accent ? "#fff" : "var(--brand-primary)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      flex: "0 0 auto", backdropFilter: accent ? "blur(8px)" : undefined,
    }}>{icon}</span>
    <span style={{flex: 1, display: "flex", flexDirection: "column", gap: 2}}>
      <span style={{fontSize: 14, fontWeight: 600}}>{title}</span>
      <span style={{fontSize: 12, opacity: 0.75}}>{desc}</span>
    </span>
    <Icons.Arrow size={16} stroke={accent ? "#fff" : "var(--on-surface-variant)"}/>
  </button>
);

// ---------- DASHBOARD OVERVIEW ----------
const DashboardOverview = ({ venue, onNavigate, onOpenEvent }) => {
  const upcoming = EVENTS.filter(e => !e.past && e.status === "Opublikowany").slice(0, 3);
  const recentPush = PUSH_HISTORY.slice(0, 2);

  return (
    <div style={{display: "flex", flexDirection: "column", gap: 24, maxWidth: 1280}}>
      {/* Hero greeting */}
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24}}>
        <div style={{display: "flex", flexDirection: "column", gap: 8}}>
          <span style={{fontSize: 13, color: "var(--brand-primary)", fontWeight: 600,
            letterSpacing: "1.2px", textTransform: "uppercase"}}>Cześć, Marek 👋</span>
          <p style={{margin: 0, fontSize: 16, color: "var(--on-surface-variant)", maxWidth: 560,
            letterSpacing: "var(--tracking-body-l)"}}>
            W tym tygodniu masz <strong style={{color: "var(--on-surface)"}}>3 zaplanowane eventy</strong> i&nbsp;
            <strong style={{color: "var(--on-surface)"}}>1 dostępne powiadomienie push</strong> do wysłania
            do {venue.followers.toLocaleString("pl-PL").replace(/,/g, " ")} obserwujących Stodoły.
          </p>
        </div>
        <span style={{fontSize: 12, color: "var(--on-surface-muted)",
          display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px",
          borderRadius: 9999, background: "var(--surface-high)", border: "1px solid var(--outline)"}}>
          <span style={{width: 6, height: 6, borderRadius: 99, background: "#1F8A5B",
            boxShadow: "0 0 0 3px rgba(31,138,91,0.18)"}}/>
          Profil widoczny publicznie
        </span>
      </div>

      {/* Stat cards */}
      <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16}}>
        <StatCard label="Obserwujący" value="12 483" delta="+184" icon={<Icons.Users size={18}/>}
          trend={[120, 134, 128, 145, 158, 172, 184]}/>
        <StatCard label="Wyświetlenia eventów · 30 dni" value="48,2k" delta="+12.4%" icon={<Icons.Eye size={18}/>}
          trend={[40, 42, 38, 50, 48, 62, 55, 70, 68, 72]}/>
        <StatCard label="Kliki „Kup bilety” · 30 dni" value="6 412" delta="+8.1%" icon={<Icons.Ticket size={18}/>}
          trend={[20, 22, 28, 25, 30, 28, 36, 40, 38, 42]}/>
        <StatCard label="Kliki „Nawiguj” · 30 dni" value="2 087" delta="-2.3%" icon={<Icons.Pin size={18}/>}
          trend={[24, 22, 26, 25, 24, 22, 20, 21, 19, 20]}/>
      </div>

      {/* Quick actions */}
      <div style={{display: "flex", gap: 12}}>
        <QuickAction
          icon={<Icons.Plus size={20}/>}
          title="Stwórz event"
          desc="Konstruktor z autosave i szkicami"
          onClick={() => onNavigate("event-new")}
          accent
        />
        <QuickAction
          icon={<Icons.Send size={18}/>}
          title="Wyślij powiadomienie"
          desc="1 z 1 dziennego limitu dostępne"
          onClick={() => onNavigate("push-new")}
        />
        <QuickAction
          icon={<Icons.Edit size={18}/>}
          title="Edytuj profil lokalu"
          desc="Godziny, zdjęcia, social media"
          onClick={() => onNavigate("venue")}
        />
      </div>

      {/* Two-col layout */}
      <div style={{display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16}}>
        {/* Upcoming events */}
        <Card padding={0}>
          <div style={{padding: "20px 24px 8px", display: "flex",
            alignItems: "center", justifyContent: "space-between"}}>
            <div>
              <h3 style={{margin: 0, font: "var(--type-headline-m)", letterSpacing: "var(--tracking-headline-m)"}}>
                Nadchodzące eventy
              </h3>
              <p style={{margin: "4px 0 0", fontSize: 13, color: "var(--on-surface-variant)"}}>
                Najbliższe 7 dni — kliknij, aby otworzyć szczegóły
              </p>
            </div>
            <button onClick={() => onNavigate("events")} style={{
              all: "unset", cursor: "pointer",
              fontSize: 13, fontWeight: 500, color: "var(--brand-primary)",
              display: "inline-flex", alignItems: "center", gap: 4,
            }}>Zobacz wszystkie <Icons.Chevron size={12}/></button>
          </div>
          <div style={{padding: 8}}>
            {upcoming.map(e => (
              <UpcomingEventRow key={e.id} event={e} onClick={() => onOpenEvent(e.id)}/>
            ))}
          </div>
        </Card>

        {/* Onboarding + push */}
        <div style={{display: "flex", flexDirection: "column", gap: 16}}>
          <OnboardingChecklist onNavigate={onNavigate}/>

          <Card padding={0}>
            <div style={{padding: "16px 20px 4px", display: "flex",
              alignItems: "center", justifyContent: "space-between"}}>
              <h3 style={{margin: 0, font: "var(--type-headline-m)", fontSize: 17,
                letterSpacing: "var(--tracking-headline-m)"}}>Ostatnie powiadomienia</h3>
              <button onClick={() => onNavigate("push")} style={{
                all: "unset", cursor: "pointer",
                fontSize: 12, color: "var(--brand-primary)", fontWeight: 500,
              }}>Historia →</button>
            </div>
            <div style={{padding: "8px 12px 14px"}}>
              {recentPush.map(p => (
                <div key={p.id} style={{
                  padding: "10px 12px", borderRadius: "var(--radius-md)",
                  display: "flex", flexDirection: "column", gap: 6,
                }}>
                  <p style={{margin: 0, fontSize: 13, color: "var(--on-surface)", lineHeight: 1.4,
                    textWrap: "balance"}}>{p.content}</p>
                  <div style={{display: "flex", alignItems: "center", gap: 12,
                    fontSize: 11, color: "var(--on-surface-variant)"}}>
                    <span>{p.sent}</span>
                    <span style={{color: "var(--outline-strong)"}}>·</span>
                    <span><Icons.Users size={11} style={{verticalAlign: "-2px", marginRight: 3}}/>{p.reach.toLocaleString("pl-PL").replace(/,/g, " ")}</span>
                    <span style={{color: "var(--outline-strong)"}}>·</span>
                    <span style={{color: p.openRate > 0.3 ? "#15643F" : "var(--on-surface-variant)", fontWeight: 500}}>
                      {Math.round(p.openRate * 100)}% otwarć
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { DashboardOverview, StatCard, Sparkline, OnboardingChecklist, QuickAction });



})();

/* === screen-events.jsx === */
;(function(){

// eventapp B2B — Events list + Event form screens

const {
  Icons, Card, Button, IconButton, Badge, StatusBadge, Avatar, Input, Textarea, Select,
  Field, Toggle, Checkbox, Radio, EVENTS, CATEGORIES,
} = window;

// ---------- EVENTS LIST ----------
const EventsList = ({ onOpenEvent, onNew }) => {
  const [tab, setTab] = React.useState("upcoming");
  const [query, setQuery] = React.useState("");

  const tabs = [
    { id: "upcoming", label: "Nadchodzące", count: EVENTS.filter(e => !e.past && e.status !== "Szkic").length },
    { id: "past",     label: "Zakończone",  count: EVENTS.filter(e => e.past).length },
    { id: "draft",    label: "Szkice",      count: EVENTS.filter(e => e.status === "Szkic").length },
  ];

  const filtered = EVENTS.filter(e => {
    if (tab === "upcoming") return !e.past && e.status !== "Szkic";
    if (tab === "past") return e.past;
    if (tab === "draft") return e.status === "Szkic";
    return true;
  }).filter(e => !query || e.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{display: "flex", flexDirection: "column", gap: 20, maxWidth: 1280}}>
      {/* Tabs + search */}
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap"}}>
        <div style={{display: "flex", gap: 4, padding: 4, borderRadius: 9999,
          background: "var(--surface-low)", border: "1px solid var(--outline)"}}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              all: "unset", cursor: "pointer",
              padding: "8px 16px", borderRadius: 9999,
              background: tab === t.id ? "var(--surface-high)" : "transparent",
              boxShadow: tab === t.id ? "var(--shadow-sm)" : "none",
              color: tab === t.id ? "var(--on-surface)" : "var(--on-surface-variant)",
              fontWeight: tab === t.id ? 600 : 500, fontSize: 13,
              transition: "all var(--duration-base) var(--ease-out)",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              {t.label}
              <span style={{
                fontSize: 11, padding: "1px 7px", borderRadius: 9999,
                background: tab === t.id ? "var(--brand-primary-container)" : "var(--surface-mid)",
                color: tab === t.id ? "var(--brand-primary)" : "var(--on-surface-variant)",
                fontWeight: 600,
              }}>{t.count}</span>
            </button>
          ))}
        </div>

        <div style={{display: "flex", gap: 10, alignItems: "center"}}>
          <Input icon={<Icons.Search size={16}/>} placeholder="Szukaj eventu…"
            value={query} onChange={e => setQuery(e.target.value)} style={{width: 260, height: 40}}/>
          <Button variant="secondary" icon={<Icons.Filter size={15}/>}>Filtry</Button>
        </div>
      </div>

      {/* Table */}
      <Card padding={0} style={{overflow: "hidden"}}>
        {/* Header row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 2.5fr) 160px 130px 110px 110px 64px",
          gap: 16, padding: "14px 20px",
          borderBottom: "1px solid var(--outline)",
          fontSize: 11, fontWeight: 600,
          letterSpacing: "1.2px", textTransform: "uppercase",
          color: "var(--on-surface-muted)",
        }}>
          <div>Event</div>
          <div>Data</div>
          <div>Status</div>
          <div style={{textAlign: "right"}}>Wyświetlenia</div>
          <div style={{textAlign: "right"}}>CTA</div>
          <div></div>
        </div>

        {filtered.length === 0 ? (
          <EmptyEvents tab={tab} onNew={onNew}/>
        ) : (
          filtered.map((e, i) => (
            <EventRow key={e.id} event={e} onClick={() => onOpenEvent(e.id)}
              divider={i < filtered.length - 1}/>
          ))
        )}
      </Card>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <span style={{fontSize: 13, color: "var(--on-surface-variant)"}}>
            {filtered.length} z {EVENTS.length} eventów
          </span>
          <div style={{display: "flex", gap: 6}}>
            <IconButton variant="outline" size={36}><Icons.ChevronLeft size={15}/></IconButton>
            <Button variant="surface" size="sm" style={{width: 36, padding: 0}}>1</Button>
            <Button variant="tertiary" size="sm" style={{width: 36, padding: 0}}>2</Button>
            <IconButton variant="outline" size={36}><Icons.Chevron size={15}/></IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

const EventRow = ({ event, onClick, divider }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "minmax(280px, 2.5fr) 160px 130px 110px 110px 64px",
    gap: 16, padding: "14px 20px", alignItems: "center",
    borderBottom: divider ? "1px solid var(--outline)" : "none",
    cursor: "pointer",
    transition: "background var(--duration-base) var(--ease-out)",
  }}
    onClick={onClick}
    onMouseEnter={e => e.currentTarget.style.background = "var(--surface-low)"}
    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
    <div style={{display: "flex", alignItems: "center", gap: 12, minWidth: 0}}>
      <span style={{width: 56, height: 56, borderRadius: 12,
        background: `url(${event.image}) center / cover`, flex: "0 0 auto", position: "relative"}}>
        {event.recurring && (
          <span style={{position: "absolute", bottom: -4, right: -4,
            background: "var(--surface-high)", borderRadius: 9999, padding: 3,
            boxShadow: "var(--shadow-sm)", color: "var(--brand-primary)"}}>
            <Icons.Repeat size={10}/>
          </span>
        )}
      </span>
      <div style={{display: "flex", flexDirection: "column", gap: 4, minWidth: 0}}>
        <div style={{display: "flex", alignItems: "center", gap: 6}}>
          <span style={{fontSize: 14, fontWeight: 500, color: "var(--on-surface)",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            letterSpacing: "var(--tracking-body-l)"}}>{event.title}</span>
          {event.adopted && (
            <span title={`Zaimportowane z ${event.adoptedSource}`}
              style={{flex: "0 0 auto", display: "inline-flex", color: "var(--color-tertiary)"}}>
              <Icons.Sparkles size={12}/>
            </span>
          )}
          {event.selling && (
            <Badge tone="warning" style={{height: 20, padding: "0 8px", fontSize: 10}}
              icon={<Icons.Flame size={10}/>}>Szybko znika</Badge>
          )}
        </div>
        <span style={{fontSize: 12, color: "var(--on-surface-variant)",
          display: "inline-flex", alignItems: "center", gap: 8}}>
          {event.category}
          {event.recurring && (
            <>
              <span style={{color: "var(--outline-strong)"}}>·</span>
              <span style={{color: "var(--brand-primary)"}}>{event.recurringText}</span>
            </>
          )}
        </span>
      </div>
    </div>

    <div style={{display: "flex", flexDirection: "column", gap: 2}}>
      <span style={{fontSize: 13, fontWeight: 500, color: "var(--on-surface)"}}>{event.date}</span>
      <span style={{fontSize: 12, color: "var(--on-surface-variant)"}}>{event.time} · {event.duration || "—"}</span>
    </div>

    <div><StatusBadge status={event.status}/></div>

    <div style={{textAlign: "right", fontSize: 13, fontVariantNumeric: "tabular-nums",
      color: event.views > 0 ? "var(--on-surface)" : "var(--on-surface-muted)"}}>
      {event.views > 0 ? event.views.toLocaleString("pl-PL").replace(/,/g, " ") : "—"}
    </div>

    <div style={{textAlign: "right", fontSize: 13, fontVariantNumeric: "tabular-nums",
      color: event.ticketClicks > 0 ? "var(--on-surface)" : "var(--on-surface-muted)"}}>
      {event.ticketClicks > 0 ? event.ticketClicks.toLocaleString("pl-PL").replace(/,/g, " ") : "—"}
    </div>

    <div style={{display: "flex", justifyContent: "flex-end"}}
      onClick={e => e.stopPropagation()}>
      <IconButton variant="ghost" size={32} title="Więcej"><Icons.More size={16}/></IconButton>
    </div>
  </div>
);

const EmptyEvents = ({ tab, onNew }) => (
  <div style={{padding: "64px 24px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: 16, textAlign: "center"}}>
    <span style={{width: 64, height: 64, borderRadius: 9999,
      background: "var(--surface-low)", color: "var(--on-surface-muted)",
      display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
      <Icons.Confused size={28}/>
    </span>
    <div>
      <h4 style={{margin: 0, fontSize: 16, fontWeight: 600, color: "var(--on-surface)"}}>
        {tab === "draft" ? "Brak szkiców" : tab === "past" ? "Brak zakończonych eventów" : "Brak eventów"}
      </h4>
      <p style={{margin: "6px 0 0", fontSize: 13, color: "var(--on-surface-variant)", maxWidth: 320}}>
        {tab === "draft"
          ? "Wszystkie Twoje szkice są opublikowane"
          : "Stwórz pierwszy event, aby pojawił się w aplikacji"}
      </p>
    </div>
    {tab !== "draft" && (
      <Button icon={<Icons.Plus size={16}/>} onClick={onNew}>Stwórz event</Button>
    )}
  </div>
);

// ---------- EVENT FORM ----------
const EventForm = ({ initial, onCancel, onSave, mode = "create" }) => {
  const [data, setData] = React.useState(initial || {
    title: "", date: "", time: "", duration: "", category: "",
    description: "", price: "free", priceAmount: "", ticketLink: "",
    recurring: false, frequency: "weekly", venueOptional: false,
  });
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const [autosaved, setAutosaved] = React.useState("teraz");

  return (
    <div style={{display: "flex", flexDirection: "column", gap: 20, maxWidth: 920}}>
      {/* Autosave hint */}
      <div style={{display: "flex", alignItems: "center", gap: 8, fontSize: 12,
        color: "var(--on-surface-variant)"}}>
        <Icons.CheckCircle size={14} stroke="#1F8A5B"/>
        <span>Szkic zapisany {autosaved}</span>
      </div>

      {/* Basic info */}
      <Card>
        <SectionHeader title="Podstawowe informacje" desc="Te dane są widoczne na stronie eventu"/>
        <div style={{display: "flex", flexDirection: "column", gap: 18}}>
          <Field label="Nazwa eventu" required>
            <Input value={data.title} onChange={e => set("title", e.target.value)}
              placeholder="np. Daria Zawiałow — Trasa „Wojny i Pokoju”"/>
          </Field>

          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14}}>
            <Field label="Data" required>
              <Input icon={<Icons.Calendar size={16}/>} value={data.date}
                onChange={e => set("date", e.target.value)} placeholder="24.05.2026" type="date"/>
            </Field>
            <Field label="Godzina" required hint="CEST (UTC+2)">
              <Input icon={<Icons.Clock size={16}/>} value={data.time}
                onChange={e => set("time", e.target.value)} placeholder="20:00" type="time"/>
            </Field>
            <Field label="Czas trwania" hint="opcjonalnie">
              <Input value={data.duration} onChange={e => set("duration", e.target.value)}
                placeholder="2h 30 min" suffix={<Icons.Clock size={14}/>}/>
            </Field>
          </div>

          <Field label="Kategoria" required>
            <Select value={data.category} onChange={e => set("category", e.target.value)}
              options={CATEGORIES} placeholder="Wybierz kategorię…"/>
          </Field>

          <Field label="Opis" hint="Krótki opis, który zachęci do przyjścia">
            <Textarea value={data.description} onChange={e => set("description", e.target.value)}
              maxLength={1000} rows={5}
              placeholder="Opowiedz, co wyjątkowego wydarzy się podczas tego eventu…"/>
          </Field>
        </div>
      </Card>

      {/* Recurring */}
      <Card>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16}}>
          <div>
            <h3 style={{margin: 0, font: "var(--type-headline-m)", letterSpacing: "var(--tracking-headline-m)"}}>
              Event cykliczny
            </h3>
            <p style={{margin: "4px 0 0", fontSize: 13, color: "var(--on-surface-variant)"}}>
              Powtarza się codziennie, co tydzień lub co miesiąc
            </p>
          </div>
          <Toggle checked={data.recurring} onChange={e => set("recurring", e.target.checked)}/>
        </div>

        {data.recurring && (
          <div style={{marginTop: 20, padding: 18, borderRadius: "var(--radius-lg)",
            background: "var(--surface-low)", display: "flex", flexDirection: "column", gap: 16}}>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14}}>
              <Field label="Częstotliwość">
                <Select value={data.frequency} onChange={e => set("frequency", e.target.value)}
                  options={[{value:"daily",label:"Codziennie"},{value:"weekly",label:"Co tydzień"},{value:"monthly",label:"Co miesiąc"}]}/>
              </Field>
              <Field label="Zakończenie">
                <Select value="date" onChange={() => {}} options={[
                  {value:"never",label:"Nigdy"},
                  {value:"date",label:"W konkretną datę"},
                  {value:"count",label:"Po liczbie wystąpień"},
                ]}/>
              </Field>
            </div>

            {data.frequency === "weekly" && (
              <Field label="Dni tygodnia">
                <div style={{display: "flex", gap: 6}}>
                  {["Pn","Wt","Śr","Cz","Pt","Sb","Nd"].map((d, i) => (
                    <button key={d} style={{
                      all: "unset", cursor: "pointer", flex: 1,
                      height: 40, borderRadius: "var(--radius-md)",
                      background: i === 1 ? "var(--brand-primary)" : "var(--surface-high)",
                      color: i === 1 ? "#fff" : "var(--on-surface)",
                      border: `1px solid ${i === 1 ? "var(--brand-primary)" : "var(--outline)"}`,
                      textAlign: "center", fontWeight: 500, fontSize: 13,
                    }}>{d}</button>
                  ))}
                </div>
              </Field>
            )}

            <div style={{padding: 12, borderRadius: "var(--radius-md)",
              background: "var(--brand-primary-container)", display: "flex", alignItems: "center", gap: 10}}>
              <Icons.Info size={16} stroke="var(--brand-primary)"/>
              <span style={{fontSize: 13, color: "var(--brand-primary)"}}>
                Event powtórzy się <strong>co wtorek do 30 czerwca 2026</strong> · 6 wystąpień
              </span>
            </div>
          </div>
        )}
      </Card>

      {/* Photos */}
      <Card>
        <SectionHeader title="Zdjęcia" desc="Maks. 3 zdjęcia · pierwsze będzie zdjęciem głównym"/>
        <PhotoUpload max={3}/>
      </Card>

      {/* Pricing */}
      <Card>
        <SectionHeader title="Bilety i cena"/>
        <div style={{display: "flex", flexDirection: "column", gap: 16}}>
          <div style={{display: "flex", gap: 12}}>
            <button onClick={() => set("price", "free")} style={{
              all: "unset", cursor: "pointer", flex: 1,
              padding: 16, borderRadius: "var(--radius-lg)",
              background: data.price === "free" ? "var(--brand-primary-container)" : "var(--surface-low)",
              border: `1px solid ${data.price === "free" ? "var(--brand-primary)" : "transparent"}`,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <Radio checked={data.price === "free"} onChange={() => {}}
                label="Bezpłatne" sublabel="Wstęp wolny dla wszystkich"/>
            </button>
            <button onClick={() => set("price", "paid")} style={{
              all: "unset", cursor: "pointer", flex: 1,
              padding: 16, borderRadius: "var(--radius-lg)",
              background: data.price === "paid" ? "var(--brand-primary-container)" : "var(--surface-low)",
              border: `1px solid ${data.price === "paid" ? "var(--brand-primary)" : "transparent"}`,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <Radio checked={data.price === "paid"} onChange={() => {}}
                label="Płatne" sublabel="Z linkiem do biletów"/>
            </button>
          </div>

          {data.price === "paid" && (
            <div style={{display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14}}>
              <Field label="Cena od">
                <Input value={data.priceAmount} onChange={e => set("priceAmount", e.target.value)}
                  placeholder="89" suffix="zł"/>
              </Field>
              <Field label="Link do biletów" hint="eBilet, Going, własna strona">
                <Input icon={<Icons.Link size={16}/>}
                  value={data.ticketLink} onChange={e => set("ticketLink", e.target.value)}
                  placeholder="https://ebilet.pl/…"/>
              </Field>
            </div>
          )}
        </div>
      </Card>

      {/* Venue */}
      <Card>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16}}>
          <div>
            <h3 style={{margin: 0, font: "var(--type-headline-m)", letterSpacing: "var(--tracking-headline-m)"}}>
              Event bez stałej lokalizacji
            </h3>
            <p style={{margin: "4px 0 0", fontSize: 13, color: "var(--on-surface-variant)"}}>
              Włącz, jeśli event odbywa się poza Twoim głównym lokalem (food truck, pop-up)
            </p>
          </div>
          <Toggle checked={data.venueOptional} onChange={e => set("venueOptional", e.target.checked)}/>
        </div>
        {data.venueOptional && (
          <div style={{marginTop: 16}}>
            <Field label="Adres" required>
              <Input icon={<Icons.Pin size={16}/>}
                placeholder="ul. Krakowskie Przedmieście 24, Warszawa"/>
            </Field>
          </div>
        )}
      </Card>

      {/* Sticky footer */}
      <div style={{
        position: "sticky", bottom: 0, marginTop: 12,
        padding: "16px 20px", borderRadius: "var(--radius-xl)",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--outline)", boxShadow: "var(--shadow-lg)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      }}>
        <button onClick={onCancel} style={{
          all: "unset", cursor: "pointer", color: "var(--on-surface-variant)",
          fontSize: 14, fontWeight: 500,
        }}>Odrzuć zmiany</button>
        <div style={{display: "flex", gap: 10}}>
          <Button variant="secondary" onClick={onSave}>Zapisz jako szkic</Button>
          <Button onClick={onSave} icon={<Icons.Sparkles size={15}/>}>Opublikuj event</Button>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, desc }) => (
  <div style={{marginBottom: 20}}>
    <h3 style={{margin: 0, font: "var(--type-headline-m)", letterSpacing: "var(--tracking-headline-m)"}}>{title}</h3>
    {desc && <p style={{margin: "4px 0 0", fontSize: 13, color: "var(--on-surface-variant)"}}>{desc}</p>}
  </div>
);

// ---------- PHOTO UPLOAD ----------
const PhotoUpload = ({ max = 3 }) => {
  const [photos] = React.useState([
    { id: "p1", src: "assets/event-rock.jpg", main: true },
  ]);

  return (
    <div style={{display: "grid", gridTemplateColumns: `repeat(${max + 1}, 1fr)`, gap: 12}}>
      {photos.map((p, i) => (
        <div key={p.id} style={{
          position: "relative", aspectRatio: "4/3",
          borderRadius: "var(--radius-lg)", overflow: "hidden",
          background: `url(${p.src}) center / cover`,
          boxShadow: "var(--shadow-sm)",
        }}>
          {p.main && (
            <span style={{position: "absolute", top: 8, left: 8,
              background: "rgba(0,0,0,0.6)", color: "#fff", backdropFilter: "blur(8px)",
              padding: "3px 9px", borderRadius: 9999, fontSize: 11, fontWeight: 500}}>
              Główne
            </span>
          )}
          <div style={{position: "absolute", bottom: 8, right: 8, display: "flex", gap: 6}}>
            <IconButton variant="surface" size={28} style={{background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)"}}>
              <Icons.GripVertical size={14}/>
            </IconButton>
            <IconButton variant="surface" size={28} style={{background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", color: "var(--destructive)"}}>
              <Icons.Trash size={14}/>
            </IconButton>
          </div>
        </div>
      ))}
      {[...Array(max - photos.length)].map((_, i) => (
        <div key={`empty-${i}`} style={{
          aspectRatio: "4/3",
          borderRadius: "var(--radius-lg)",
          background: "var(--surface-low)",
          border: "1.5px dashed var(--outline-strong)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 8, cursor: "pointer", color: "var(--on-surface-variant)",
          transition: "all var(--duration-base) var(--ease-out)",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--brand-primary-container)"; e.currentTarget.style.borderColor = "var(--brand-primary)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--surface-low)"; e.currentTarget.style.borderColor = "var(--outline-strong)"; }}>
          <Icons.Upload size={20}/>
          <span style={{fontSize: 12, fontWeight: 500}}>Dodaj zdjęcie</span>
          <span style={{fontSize: 11, color: "var(--on-surface-muted)"}}>JPEG, PNG, WebP · 10 MB</span>
        </div>
      ))}
    </div>
  );
};

Object.assign(window, { EventsList, EventRow, EventForm, PhotoUpload, SectionHeader });



})();

/* === screen-event-detail.jsx === */
;(function(){

// eventapp B2B — Event detail + Push notifications screens

const {
  Icons, Card, Button, IconButton, Badge, StatusBadge, Textarea,
  EVENTS, PUSH_HISTORY, StatCard, Sparkline,
} = window;

// ---------- EVENT DETAIL ----------
const EventDetail = ({ eventId, onBack, onEdit, onPush }) => {
  const event = EVENTS.find(e => e.id === eventId) || EVENTS[0];

  return (
    <div style={{display: "flex", flexDirection: "column", gap: 20, maxWidth: 1180}}>
      {/* Hero */}
      <Card padding={0} style={{overflow: "hidden"}}>
        <div style={{
          position: "relative", height: 320,
          background: `linear-gradient(rgba(10,8,20,0.1) 0%, rgba(10,8,20,0.85) 100%), url(${event.image}) center / cover`,
          color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: 28,
        }}>
          <div style={{position: "absolute", top: 20, left: 20, display: "flex", gap: 8}}>
            <Badge tone="onImage">{event.category}</Badge>
            {event.adopted && (
              <Badge tone="onImage" icon={<Icons.Sparkles size={11}/>}>
                Zaimportowane z {event.adoptedSource}
              </Badge>
            )}
            {event.recurring && (
              <Badge tone="onImage" icon={<Icons.Repeat size={11}/>}>
                {event.recurringText}
              </Badge>
            )}
          </div>
          <h1 style={{margin: "0 0 12px", fontSize: 32, fontWeight: 700, lineHeight: 1.15,
            letterSpacing: "-0.6px", textWrap: "balance", maxWidth: 760}}>
            {event.title}
          </h1>
          <div style={{display: "flex", gap: 24, flexWrap: "wrap", fontSize: 14, opacity: 0.92}}>
            <span style={{display: "inline-flex", alignItems: "center", gap: 8}}>
              <Icons.Calendar size={15}/>{event.date} · {event.time}
            </span>
            {event.duration && (
              <span style={{display: "inline-flex", alignItems: "center", gap: 8}}>
                <Icons.Clock size={15}/>{event.duration}
              </span>
            )}
            <span style={{display: "inline-flex", alignItems: "center", gap: 8}}>
              <Icons.Pin size={15}/>Klub Stodoła · Warszawa
            </span>
            <span style={{display: "inline-flex", alignItems: "center", gap: 8}}>
              <Icons.Ticket size={15}/>{event.price}
            </span>
          </div>
        </div>

        {/* Action bar */}
        <div style={{padding: "16px 24px", display: "flex",
          alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap"}}>
          <div style={{display: "flex", alignItems: "center", gap: 12}}>
            <StatusBadge status={event.status}/>
            {event.pushSent && (
              <span style={{fontSize: 12, color: "var(--on-surface-variant)",
                display: "inline-flex", alignItems: "center", gap: 6}}>
                <Icons.CheckCircle size={13} stroke="#1F8A5B"/>
                Powiadomienie wysłane
              </span>
            )}
          </div>
          <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
            <Button variant="secondary" icon={<Icons.Eye size={15}/>} iconRight={<Icons.Globe size={13}/>}>
              Zobacz publicznie
            </Button>
            <Button variant="secondary" icon={<Icons.Copy size={15}/>}>Duplikuj</Button>
            <Button variant="secondary" icon={<Icons.Trash size={15}/>}
              style={{color: "var(--destructive)"}}>Usuń</Button>
            <Button onClick={onEdit} icon={<Icons.Edit size={15}/>}>Edytuj event</Button>
          </div>
        </div>
      </Card>

      {/* Two col */}
      <div style={{display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16}}>
        {/* Left: details */}
        <div style={{display: "flex", flexDirection: "column", gap: 16}}>
          {/* Analytics summary */}
          <Card>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18}}>
              <h3 style={{margin: 0, font: "var(--type-headline-m)",
                letterSpacing: "var(--tracking-headline-m)"}}>Wydajność eventu</h3>
              <span style={{fontSize: 12, color: "var(--on-surface-variant)"}}>Ostatnie 30 dni</span>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16}}>
              <MetricBlock label="Wyświetlenia" value={event.views} delta="+12%" trend={[20,24,28,30,38,42,48]}/>
              <MetricBlock label="Kliki „Kup bilety”" value={event.ticketClicks} delta="+18%" trend={[10,14,18,16,22,26,28]}/>
              <MetricBlock label="Kliki „Nawiguj”" value={event.navigateClicks} delta="+4%" trend={[8,9,10,12,11,13,14]}/>
              <MetricBlock label="Zasięg push"
                value={event.pushReach}
                sub={`${Math.round((event.pushOpenRate||0) * 100)}% otwarć`}
                trend={null}/>
            </div>
          </Card>

          {/* Description */}
          <Card>
            <h3 style={{margin: "0 0 14px", font: "var(--type-headline-m)",
              letterSpacing: "var(--tracking-headline-m)"}}>Opis</h3>
            <p style={{margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--on-surface)",
              letterSpacing: "var(--tracking-body-l)", textWrap: "pretty"}}>
              {event.description || "Daria Zawiałow powraca do Warszawy z premierowym materiałem. Wyjątkowy koncert w sali koncertowej Stodoły — pełne brzmienie nowej trasy i hity poprzednich płyt. Wystąpi z pełnym składem zespołu."}
            </p>
          </Card>

          {/* Activity timeline */}
          <Card>
            <h3 style={{margin: "0 0 18px", font: "var(--type-headline-m)",
              letterSpacing: "var(--tracking-headline-m)"}}>Historia eventu</h3>
            <Timeline items={[
              { icon: <Icons.Plus size={12}/>, label: "Event stworzony", time: "12 Maja · 14:23", who: "Marek Nowicki" },
              { icon: <Icons.Sparkles size={12}/>, label: "Opublikowany", time: "12 Maja · 14:45", who: "Marek Nowicki" },
              { icon: <Icons.Send size={12}/>, label: "Powiadomienie push wysłane",
                time: "19 Maja · 18:00", who: "12 483 odbiorców · 31% otwarć" },
              { icon: <Icons.TrendUp size={12}/>, label: "Osiągnięty próg 8k wyświetleń",
                time: "21 Maja · 09:12", who: "Wzrost o 184% wzg. tygodnia" },
            ]}/>
          </Card>
        </div>

        {/* Right: side panels */}
        <div style={{display: "flex", flexDirection: "column", gap: 16}}>
          {/* Push CTA */}
          {!event.pushSent ? (
            <Card style={{background: "linear-gradient(135deg, #6C3FEB 0%, #8C56F4 50%, #A97EF8 100%)",
              color: "#fff", border: "0", boxShadow: "0 12px 32px rgba(108,63,235,0.30)"}}>
              <div style={{display: "flex", alignItems: "center", gap: 10, marginBottom: 8}}>
                <Icons.Bell size={18}/>
                <span style={{fontSize: 13, fontWeight: 600, letterSpacing: "1.2px",
                  textTransform: "uppercase", opacity: 0.85}}>1/1 dziennego limitu</span>
              </div>
              <h3 style={{margin: "0 0 8px", fontSize: 20, fontWeight: 700, letterSpacing: "-0.4px"}}>
                Powiadom 12 483 obserwujących
              </h3>
              <p style={{margin: "0 0 16px", fontSize: 13, opacity: 0.85, lineHeight: 1.5}}>
                Wyślij powiadomienie push o tym evencie. Średnia otwarć Twoich powiadomień:&nbsp;
                <strong>31%</strong>
              </p>
              <Button variant="glass" icon={<Icons.Send size={15}/>} onClick={onPush} fullWidth
                style={{background: "rgba(255,255,255,0.95)", color: "#6C3FEB", border: 0}}>
                Wyślij powiadomienie
              </Button>
            </Card>
          ) : (
            <Card>
              <div style={{display: "flex", alignItems: "center", gap: 10, marginBottom: 12}}>
                <span style={{width: 36, height: 36, borderRadius: 10, background: "#DBF3E6",
                  color: "#15643F", display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
                  <Icons.CheckCircle size={18}/>
                </span>
                <div>
                  <div style={{fontSize: 13, fontWeight: 600}}>Powiadomienie wysłane</div>
                  <div style={{fontSize: 12, color: "var(--on-surface-variant)"}}>Pn, 19 Maja · 18:00</div>
                </div>
              </div>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14}}>
                <div style={{padding: 10, borderRadius: "var(--radius-md)", background: "var(--surface-low)"}}>
                  <div style={{fontSize: 11, color: "var(--on-surface-variant)", letterSpacing: "1.2px",
                    textTransform: "uppercase", fontWeight: 600}}>Zasięg</div>
                  <div style={{fontSize: 18, fontWeight: 700, marginTop: 4}}>12 483</div>
                </div>
                <div style={{padding: 10, borderRadius: "var(--radius-md)", background: "var(--surface-low)"}}>
                  <div style={{fontSize: 11, color: "var(--on-surface-variant)", letterSpacing: "1.2px",
                    textTransform: "uppercase", fontWeight: 600}}>Otwarcia</div>
                  <div style={{fontSize: 18, fontWeight: 700, marginTop: 4, color: "#15643F"}}>31%</div>
                </div>
              </div>
            </Card>
          )}

          {/* Venue info */}
          <Card padding={0} style={{overflow: "hidden"}}>
            <div style={{height: 100, background: "url(assets/venue-stodola.jpg) center / cover",
              position: "relative"}}>
              <div style={{position: "absolute", inset: 0,
                background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)"}}/>
              <div style={{position: "absolute", bottom: 10, left: 14, color: "#fff"}}>
                <div style={{fontSize: 15, fontWeight: 600}}>Klub Stodoła</div>
                <div style={{fontSize: 12, opacity: 0.85}}>Sala koncertowa · Warszawa</div>
              </div>
            </div>
            <div style={{padding: 16, display: "flex", flexDirection: "column", gap: 10}}>
              <div style={{display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13,
                color: "var(--on-surface-variant)"}}>
                <Icons.Pin size={14} style={{flex: "0 0 auto", marginTop: 2}}/>
                <span>ul. Stefana Batorego 10<br/>02-591 Warszawa</span>
              </div>
              <Button variant="secondary" size="sm" fullWidth icon={<Icons.Map size={14}/>}>
                Otwórz w mapach
              </Button>
            </div>
          </Card>

          {/* Quick info */}
          <Card>
            <div style={{display: "flex", flexDirection: "column", gap: 12}}>
              <InfoRow label="ID eventu" value="evt_24a8f9b" mono/>
              <InfoRow label="Bilety" value="ebilet.pl/daria-zawialow" link/>
              <InfoRow label="Cena od" value="89 zł"/>
              <InfoRow label="Czas trwania" value={event.duration || "2h 30 min"}/>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const MetricBlock = ({ label, value, delta, sub, trend }) => (
  <div style={{display: "flex", flexDirection: "column", gap: 6}}>
    <div style={{fontSize: 11, fontWeight: 600, letterSpacing: "1.2px",
      textTransform: "uppercase", color: "var(--on-surface-muted)"}}>{label}</div>
    <div style={{display: "flex", alignItems: "baseline", gap: 8}}>
      <span style={{fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px"}}>
        {typeof value === "number" ? value.toLocaleString("pl-PL").replace(/,/g, " ") : value}
      </span>
      {delta && (
        <span style={{fontSize: 12, color: "#15643F", fontWeight: 600}}>{delta}</span>
      )}
    </div>
    {sub && <span style={{fontSize: 12, color: "var(--on-surface-variant)"}}>{sub}</span>}
    {trend && <Sparkline data={trend} height={20}/>}
  </div>
);

const Timeline = ({ items }) => (
  <div style={{display: "flex", flexDirection: "column"}}>
    {items.map((item, i) => (
      <div key={i} style={{display: "flex", gap: 14, position: "relative",
        paddingBottom: i < items.length - 1 ? 18 : 0}}>
        <div style={{position: "relative", flex: "0 0 auto"}}>
          <span style={{
            width: 28, height: 28, borderRadius: 9999,
            background: "var(--brand-primary-container)", color: "var(--brand-primary)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>{item.icon}</span>
          {i < items.length - 1 && (
            <span style={{position: "absolute", top: 32, left: 13, bottom: -8, width: 2,
              background: "var(--outline)"}}/>
          )}
        </div>
        <div style={{display: "flex", flexDirection: "column", gap: 2, paddingTop: 4}}>
          <span style={{fontSize: 14, fontWeight: 500, color: "var(--on-surface)"}}>{item.label}</span>
          <span style={{fontSize: 12, color: "var(--on-surface-variant)"}}>
            {item.time} · {item.who}
          </span>
        </div>
      </div>
    ))}
  </div>
);

const InfoRow = ({ label, value, mono, link }) => (
  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12}}>
    <span style={{fontSize: 12, color: "var(--on-surface-muted)", fontWeight: 500,
      letterSpacing: "1.2px", textTransform: "uppercase"}}>{label}</span>
    <span style={{fontSize: 13, color: link ? "var(--brand-primary)" : "var(--on-surface)",
      fontFamily: mono ? "var(--font-mono)" : undefined, fontWeight: link ? 500 : 400,
      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0,
      textAlign: "right"}}>{value}</span>
  </div>
);

// ============================================================================
// PUSH NEW — Compose notification
// ============================================================================
const PushNew = ({ onBack, onSent }) => {
  const [content, setContent] = React.useState(
    "Charlotte de Witte już w sobotę w Stodole — ostatnie bilety w przedsprzedaży 🎧"
  );
  const [showConfirm, setShowConfirm] = React.useState(false);
  const charsLeft = 120 - content.length;

  return (
    <div style={{maxWidth: 1100}}>
      <div style={{display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24}}>
        {/* Left: composer */}
        <div style={{display: "flex", flexDirection: "column", gap: 16}}>
          <Card>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 16}}>
              <div>
                <h3 style={{margin: 0, font: "var(--type-headline-m)",
                  letterSpacing: "var(--tracking-headline-m)"}}>Treść powiadomienia</h3>
                <p style={{margin: "4px 0 0", fontSize: 13, color: "var(--on-surface-variant)"}}>
                  Krótko i konkretnie — najlepsze wyniki ma copy poniżej 90 znaków
                </p>
              </div>
              <span style={{fontSize: 12, padding: "4px 10px", borderRadius: 9999,
                background: "var(--brand-primary-container)", color: "var(--brand-primary)",
                fontWeight: 500}}>
                1 z 1 dziennego limitu dostępne
              </span>
            </div>

            <Textarea value={content} onChange={e => setContent(e.target.value)}
              maxLength={120} rows={4}
              placeholder="np. Nowy event w Stodole — bilety od 89 zł"/>

            {/* Linked event */}
            <div style={{marginTop: 16, padding: 12, borderRadius: "var(--radius-lg)",
              background: "var(--surface-low)", border: "1px solid var(--outline)",
              display: "flex", alignItems: "center", gap: 12}}>
              <span style={{width: 48, height: 48, borderRadius: 10,
                background: "url(assets/event-techno.jpg) center / cover", flex: "0 0 auto"}}/>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontSize: 11, color: "var(--brand-primary)",
                  letterSpacing: "1.2px", textTransform: "uppercase", fontWeight: 600, marginBottom: 2}}>
                  Powiązany event
                </div>
                <div style={{fontSize: 14, fontWeight: 500, color: "var(--on-surface)",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                  Techno Warsaw: Charlotte de Witte (B2B)
                </div>
                <div style={{fontSize: 12, color: "var(--on-surface-variant)"}}>
                  Sob, 31 Maja · 22:00
                </div>
              </div>
              <Button variant="tertiary" size="sm">Zmień</Button>
            </div>
          </Card>

          {/* Audience */}
          <Card>
            <h3 style={{margin: "0 0 14px", font: "var(--type-headline-m)",
              letterSpacing: "var(--tracking-headline-m)"}}>Odbiorcy</h3>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: 14, borderRadius: "var(--radius-lg)", background: "var(--surface-low)"}}>
              <div style={{display: "flex", alignItems: "center", gap: 14}}>
                <span style={{width: 40, height: 40, borderRadius: 12,
                  background: "var(--brand-primary)", color: "#fff",
                  display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
                  <Icons.Users size={18}/>
                </span>
                <div>
                  <div style={{fontSize: 20, fontWeight: 700, letterSpacing: "-0.3px"}}>12 483</div>
                  <div style={{fontSize: 13, color: "var(--on-surface-variant)"}}>
                    obserwujących Klubu Stodoły
                  </div>
                </div>
              </div>
              <div style={{textAlign: "right"}}>
                <div style={{fontSize: 11, color: "var(--on-surface-muted)",
                  letterSpacing: "1.2px", textTransform: "uppercase", fontWeight: 600}}>Spodziewane otwarcia</div>
                <div style={{fontSize: 16, fontWeight: 600, color: "#15643F", marginTop: 2}}>
                  ~3 870 (31%)
                </div>
              </div>
            </div>
          </Card>

          {/* Best practices */}
          <Card style={{background: "var(--brand-primary-container)", border: 0}}>
            <div style={{display: "flex", gap: 12}}>
              <Icons.Info size={18} stroke="var(--brand-primary)" style={{flex: "0 0 auto", marginTop: 2}}/>
              <div>
                <h4 style={{margin: 0, fontSize: 14, fontWeight: 600, color: "var(--brand-primary)"}}>
                  Wskazówka
                </h4>
                <p style={{margin: "4px 0 0", fontSize: 13, color: "var(--brand-primary)",
                  letterSpacing: "var(--tracking-body-m)", lineHeight: 1.5}}>
                  Najlepsze wyniki dają powiadomienia wysyłane <strong>3–5 dni przed eventem</strong>,
                  między 17:00 a 19:00. Po wysłaniu nie możesz cofnąć ani edytować powiadomienia.
                </p>
              </div>
            </div>
          </Card>

          <div style={{display: "flex", gap: 10, justifyContent: "flex-end"}}>
            <Button variant="secondary" onClick={onBack}>Anuluj</Button>
            <Button onClick={() => setShowConfirm(true)} icon={<Icons.Send size={15}/>}>
              Wyślij powiadomienie
            </Button>
          </div>
        </div>

        {/* Right: phone preview */}
        <div>
          <div style={{position: "sticky", top: 96, display: "flex", flexDirection: "column", gap: 12,
            alignItems: "center"}}>
            <span style={{fontSize: 11, fontWeight: 600, letterSpacing: "1.2px",
              textTransform: "uppercase", color: "var(--on-surface-muted)"}}>Podgląd na urządzeniu</span>
            <PhonePreview content={content}/>
            <span style={{fontSize: 12, color: "var(--on-surface-variant)", textAlign: "center",
              maxWidth: 280}}>
              Tak Twoje powiadomienie pojawi się na ekranie blokady obserwujących
            </span>
          </div>
        </div>
      </div>

      {showConfirm && <ConfirmModal onCancel={() => setShowConfirm(false)} onConfirm={() => { setShowConfirm(false); onSent(); }}/>}
    </div>
  );
};

const PhonePreview = ({ content }) => {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  return (
    <div style={{
      width: 300, padding: 12,
      background: "linear-gradient(180deg, #28206b 0%, #07071A 100%)",
      borderRadius: 40, boxShadow: "var(--shadow-xl)",
    }}>
      <div style={{height: 540, borderRadius: 30,
        background: "url(https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80) center / cover",
        position: "relative", overflow: "hidden",
        boxShadow: "inset 0 0 0 4px rgba(0,0,0,0.4)"}}>
        {/* Status bar */}
        <div style={{padding: "16px 24px 12px", display: "flex",
          justifyContent: "space-between", alignItems: "center", color: "#fff",
          fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600}}>
          <span>{hh}:{mm}</span>
          <span style={{display: "inline-flex", gap: 5, alignItems: "center"}}>
            <span style={{display: "flex", gap: 2, alignItems: "flex-end"}}>
              {[3,5,7,9].map(h => <span key={h} style={{width: 3, height: h, background: "#fff", borderRadius: 1}}/>)}
            </span>
            <span style={{width: 22, height: 11, border: "1.5px solid #fff", borderRadius: 3, position: "relative"}}>
              <span style={{position: "absolute", inset: 1, background: "#fff", borderRadius: 1, width: "70%"}}/>
            </span>
          </span>
        </div>

        {/* Date */}
        <div style={{textAlign: "center", color: "#fff", marginTop: 20}}>
          <div style={{fontSize: 13, opacity: 0.85, fontWeight: 500}}>sobota, 24 maja</div>
          <div style={{fontSize: 64, fontWeight: 200, lineHeight: 1, marginTop: 2,
            textShadow: "0 2px 8px rgba(0,0,0,0.3)"}}>{hh}:{mm}</div>
        </div>

        {/* Notification */}
        <div style={{position: "absolute", bottom: 20, left: 14, right: 14,
          padding: 12, borderRadius: 16, background: "rgba(40, 30, 80, 0.65)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          color: "#fff", display: "flex", gap: 10, animation: "slideIn 0.4s var(--ease-out)"}}>
          <span style={{width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #6C3FEB, #A97EF8)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14, flex: "0 0 auto"}}>E</span>
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{display: "flex", justifyContent: "space-between",
              fontSize: 11, opacity: 0.85, marginBottom: 2}}>
              <span style={{fontWeight: 600}}>EVENTAPP · KLUB STODOŁA</span>
              <span>teraz</span>
            </div>
            <div style={{fontSize: 13, lineHeight: 1.35, textWrap: "pretty"}}>
              {content || "Treść powiadomienia pojawi się tutaj…"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfirmModal = ({ onCancel, onConfirm }) => (
  <div style={{
    position: "fixed", inset: 0, background: "rgba(15,15,30,0.5)",
    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
    zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    animation: "fadeIn 0.2s var(--ease-out)",
  }} onClick={onCancel}>
    <div onClick={e => e.stopPropagation()} style={{
      background: "var(--surface-high)", borderRadius: "var(--radius-xl)",
      width: "min(440px, 100%)", padding: 28, boxShadow: "var(--shadow-xl)",
      animation: "scaleIn 0.25s var(--ease-out)",
    }}>
      <span style={{width: 52, height: 52, borderRadius: 9999,
        background: "var(--brand-primary-container)", color: "var(--brand-primary)",
        display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16}}>
        <Icons.Send size={22}/>
      </span>
      <h3 style={{margin: "0 0 8px", font: "var(--type-headline-m)",
        letterSpacing: "var(--tracking-headline-m)"}}>Wysłać powiadomienie?</h3>
      <p style={{margin: "0 0 20px", fontSize: 14, color: "var(--on-surface-variant)",
        lineHeight: 1.5, letterSpacing: "var(--tracking-body-m)"}}>
        Powiadomienie zostanie wysłane do <strong>12 483 obserwujących</strong>.
        To jest Twój dzienny push dla Klubu Stodoła — nie będzie można go cofnąć ani wysłać kolejnego dzisiaj.
      </p>
      <div style={{display: "flex", gap: 10, justifyContent: "flex-end"}}>
        <Button variant="secondary" onClick={onCancel}>Anuluj</Button>
        <Button onClick={onConfirm} icon={<Icons.Send size={14}/>}>Wyślij teraz</Button>
      </div>
    </div>
  </div>
);

// ============================================================================
// PUSH HISTORY
// ============================================================================
const PushHistory = ({ onNew }) => (
  <div style={{display: "flex", flexDirection: "column", gap: 16, maxWidth: 1100}}>
    {/* Quota card */}
    <Card style={{background: "linear-gradient(135deg, #6C3FEB 0%, #A97EF8 100%)",
      color: "#fff", border: 0, boxShadow: "0 12px 32px rgba(108,63,235,0.30)"}}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24}}>
        <div>
          <div style={{fontSize: 13, fontWeight: 600, letterSpacing: "1.2px",
            textTransform: "uppercase", opacity: 0.85, marginBottom: 8}}>Dzienny limit</div>
          <h2 style={{margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.4px"}}>
            1 z 1 powiadomień dostępne
          </h2>
          <p style={{margin: "8px 0 0", fontSize: 14, opacity: 0.85, maxWidth: 480}}>
            Maksymalnie 1 powiadomienie push dziennie na lokal. Limit odnowi się jutro o 00:00.
          </p>
        </div>
        <Button variant="glass" onClick={onNew}
          style={{background: "rgba(255,255,255,0.95)", color: "#6C3FEB", border: 0}}
          icon={<Icons.Send size={15}/>}>
          Wyślij powiadomienie
        </Button>
      </div>
    </Card>

    {/* History list */}
    <Card padding={0}>
      <div style={{padding: "18px 24px 12px"}}>
        <h3 style={{margin: 0, font: "var(--type-headline-m)",
          letterSpacing: "var(--tracking-headline-m)"}}>Historia powiadomień</h3>
        <p style={{margin: "4px 0 0", fontSize: 13, color: "var(--on-surface-variant)"}}>
          Ostatnie 30 wysłanych powiadomień push
        </p>
      </div>
      {PUSH_HISTORY.map((p, i) => (
        <PushHistoryRow key={p.id} push={p} divider={i < PUSH_HISTORY.length - 1}/>
      ))}
    </Card>
  </div>
);

const PushHistoryRow = ({ push, divider }) => (
  <div style={{
    padding: "16px 24px",
    borderBottom: divider ? "1px solid var(--outline)" : "none",
    display: "grid", gridTemplateColumns: "1fr 180px 120px 120px", gap: 16, alignItems: "center",
  }}>
    <div style={{display: "flex", flexDirection: "column", gap: 6, minWidth: 0}}>
      <p style={{margin: 0, fontSize: 14, color: "var(--on-surface)", lineHeight: 1.4,
        textWrap: "balance"}}>{push.content}</p>
      <div style={{display: "flex", alignItems: "center", gap: 8, fontSize: 12,
        color: "var(--brand-primary)"}}>
        <Icons.Calendar size={11}/>
        <span style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
          {push.eventTitle}
        </span>
      </div>
    </div>
    <div style={{fontSize: 13, color: "var(--on-surface-variant)"}}>{push.sent}</div>
    <div style={{textAlign: "right"}}>
      <div style={{fontSize: 11, color: "var(--on-surface-muted)", fontWeight: 600,
        letterSpacing: "1.2px", textTransform: "uppercase"}}>Zasięg</div>
      <div style={{fontSize: 15, fontWeight: 600, fontVariantNumeric: "tabular-nums"}}>
        {push.reach.toLocaleString("pl-PL").replace(/,/g, " ")}
      </div>
    </div>
    <div style={{textAlign: "right"}}>
      <div style={{fontSize: 11, color: "var(--on-surface-muted)", fontWeight: 600,
        letterSpacing: "1.2px", textTransform: "uppercase"}}>Otwarcia</div>
      <div style={{fontSize: 15, fontWeight: 600,
        color: push.openRate > 0.3 ? "#15643F" : "var(--on-surface)",
        fontVariantNumeric: "tabular-nums"}}>
        {Math.round(push.openRate * 100)}%
        <span style={{fontSize: 12, color: "var(--on-surface-muted)", fontWeight: 400, marginLeft: 6}}>
          {push.opens.toLocaleString("pl-PL").replace(/,/g, " ")}
        </span>
      </div>
    </div>
  </div>
);

Object.assign(window, {
  EventDetail, PushNew, PhonePreview, PushHistory, MetricBlock, Timeline, InfoRow, ConfirmModal,
});



})();

/* === screen-venue-analytics.jsx === */
;(function(){

// eventapp B2B — Venue Profile + Analytics + My Venues screens

const {
  Icons, Card, Button, IconButton, Badge, Input, Textarea, Select, Field, Toggle,
  Avatar, StatCard, Sparkline, VENUES, EVENTS, CATEGORIES,
} = window;

// ============================================================================
// VENUE PROFILE EDITOR
// ============================================================================
const VenueProfile = ({ venue, onPreview }) => {
  const [data, setData] = React.useState({
    name: venue.name,
    description: "Legendarny warszawski klub muzyczny działający od 1956 roku. Sala koncertowa na 1200 osób, klub na 400. Od ponad 60 lat na naszej scenie występują najwięksi artyści polskiej i światowej muzyki.",
    category: "club",
    address: venue.address || "ul. Stefana Batorego 10, 02-591 Warszawa",
    website: venue.website || "stodola.pl",
    facebook: venue.facebook || "klubstodola",
    instagram: venue.instagram || "klubstodola",
    phone: venue.phone || "+48 22 825 60 31",
    email: venue.email || "biuro@stodola.pl",
  });
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <div style={{display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, maxWidth: 1280}}>
      <div style={{display: "flex", flexDirection: "column", gap: 20, minWidth: 0}}>
        {/* Photos */}
        <Card>
          <SectionHead title="Zdjęcia lokalu" desc="Maks. 5 zdjęć · pierwsze będzie zdjęciem głównym"/>
          <VenuePhotoGallery/>
        </Card>

        {/* Basic info */}
        <Card>
          <SectionHead title="Podstawowe informacje"/>
          <div style={{display: "flex", flexDirection: "column", gap: 16}}>
            <Field label="Nazwa lokalu" required>
              <Input value={data.name} onChange={e => set("name", e.target.value)}/>
            </Field>
            <Field label="Kategoria" required>
              <Select value={data.category} onChange={e => set("category", e.target.value)}
                options={[
                  {value:"club",label:"Klub muzyczny"},
                  {value:"bar",label:"Bar"},
                  {value:"concert",label:"Sala koncertowa"},
                  {value:"gallery",label:"Galeria"},
                  {value:"theatre",label:"Teatr"},
                ]}/>
            </Field>
            <Field label="Opis" hint="Maks. 500 znaków · widoczny na profilu publicznym">
              <Textarea value={data.description} onChange={e => set("description", e.target.value)}
                maxLength={500} rows={4}/>
            </Field>
            <Field label="Adres" hint="Wyświetlany na profilu i używany do nawigacji">
              <Input icon={<Icons.Pin size={16}/>} value={data.address}
                onChange={e => set("address", e.target.value)}/>
            </Field>
          </div>
        </Card>

        {/* Opening hours */}
        <Card>
          <SectionHead title="Godziny otwarcia" desc="Ustaw, kiedy lokal jest otwarty dla gości"/>
          <OpeningHours/>

          <div style={{marginTop: 20, padding: 14, borderRadius: "var(--radius-lg)",
            background: "var(--surface-low)"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 8}}>
              <span style={{fontSize: 13, fontWeight: 600}}>Godziny świąteczne i tymczasowe zamknięcia</span>
              <Button variant="tertiary" size="sm" icon={<Icons.Plus size={14}/>}>Dodaj wyjątek</Button>
            </div>
            <p style={{margin: 0, fontSize: 12, color: "var(--on-surface-variant)"}}>
              Np. „Zamknięte na remont 15 stycznia – 1 lutego” lub specjalne godziny w święta
            </p>
          </div>
        </Card>

        {/* Contact + social */}
        <Card>
          <SectionHead title="Kontakt i social media"/>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14}}>
            <Field label="Telefon">
              <Input icon={<Icons.Phone size={15}/>} value={data.phone}
                onChange={e => set("phone", e.target.value)}/>
            </Field>
            <Field label="E-mail">
              <Input icon={<Icons.Mail size={15}/>} value={data.email}
                onChange={e => set("email", e.target.value)}/>
            </Field>
            <Field label="Strona WWW">
              <Input icon={<Icons.Globe size={15}/>} value={data.website}
                onChange={e => set("website", e.target.value)}/>
            </Field>
            <Field label="Facebook">
              <Input value={data.facebook} onChange={e => set("facebook", e.target.value)}
                suffix={<span style={{fontSize: 12}}>fb.com/</span>}/>
            </Field>
            <Field label="Instagram" style={{gridColumn: "span 2"}}>
              <Input value={data.instagram} onChange={e => set("instagram", e.target.value)}
                suffix={<span style={{fontSize: 12}}>instagram.com/</span>}/>
            </Field>
          </div>
        </Card>

        {/* Save bar */}
        <div style={{
          position: "sticky", bottom: 12,
          padding: "14px 18px", borderRadius: "var(--radius-xl)",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--outline)", boxShadow: "var(--shadow-lg)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        }}>
          <span style={{fontSize: 13, color: "var(--on-surface-variant)",
            display: "inline-flex", alignItems: "center", gap: 8}}>
            <Icons.CheckCircle size={14} stroke="#1F8A5B"/> Wszystkie zmiany zapisane
          </span>
          <div style={{display: "flex", gap: 10}}>
            <Button variant="secondary" icon={<Icons.Eye size={15}/>} onClick={onPreview}>
              Podgląd
            </Button>
            <Button>Zapisz zmiany</Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{display: "flex", flexDirection: "column", gap: 16}}>
        {/* Live preview card */}
        <Card padding={0} style={{overflow: "hidden", position: "sticky", top: 96}}>
          <div style={{padding: "14px 16px", borderBottom: "1px solid var(--outline)",
            display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <span style={{fontSize: 11, fontWeight: 600, letterSpacing: "1.2px",
              textTransform: "uppercase", color: "var(--on-surface-muted)"}}>
              Podgląd profilu
            </span>
            <Badge tone="brand" icon={<Icons.Eye size={11}/>}>Live</Badge>
          </div>
          <div style={{height: 140, background: "url(assets/venue-stodola.jpg) center / cover",
            position: "relative"}}>
            <div style={{position: "absolute", inset: 0,
              background: "linear-gradient(rgba(10,8,20,0.2) 0%, rgba(10,8,20,0.85) 100%)"}}/>
            <div style={{position: "absolute", bottom: 12, left: 14, right: 14, color: "#fff"}}>
              <div style={{fontSize: 11, opacity: 0.85, fontWeight: 500, letterSpacing: "1.2px",
                textTransform: "uppercase", marginBottom: 4}}>{data.category === "club" ? "Klub muzyczny" : "Lokal"} · Warszawa</div>
              <div style={{fontSize: 18, fontWeight: 700, letterSpacing: "-0.3px"}}>{data.name}</div>
            </div>
          </div>
          <div style={{padding: 14, display: "flex", flexDirection: "column", gap: 12}}>
            <p style={{margin: 0, fontSize: 13, color: "var(--on-surface)", lineHeight: 1.5,
              display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden"}}>
              {data.description}
            </p>
            <div style={{display: "flex", gap: 8}}>
              <Button variant="primary" size="sm" fullWidth icon={<Icons.Heart size={14}/>}>
                Obserwuj
              </Button>
              <IconButton variant="outline" size={36}><Icons.Share size={15}/></IconButton>
            </div>
            <div style={{display: "flex", gap: 14, paddingTop: 8, borderTop: "1px solid var(--outline)",
              fontSize: 12, color: "var(--on-surface-variant)"}}>
              <span style={{display: "inline-flex", alignItems: "center", gap: 5}}>
                <Icons.Users size={12}/>12 483
              </span>
              <span style={{display: "inline-flex", alignItems: "center", gap: 5}}>
                <Icons.Calendar size={12}/>7 nadchodzących
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{display: "flex", flexDirection: "column", gap: 8}}>
            <span style={{fontSize: 11, fontWeight: 600, letterSpacing: "1.2px",
              textTransform: "uppercase", color: "var(--on-surface-muted)"}}>Wskazówka</span>
            <p style={{margin: 0, fontSize: 13, lineHeight: 1.5, color: "var(--on-surface)"}}>
              Lokale z <strong>kompletnym opisem i 5 zdjęciami</strong> mają średnio 2.4× więcej
              obserwujących niż profile bez zdjęć.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

const SectionHead = ({ title, desc }) => (
  <div style={{marginBottom: 20}}>
    <h3 style={{margin: 0, font: "var(--type-headline-m)", letterSpacing: "var(--tracking-headline-m)"}}>{title}</h3>
    {desc && <p style={{margin: "4px 0 0", fontSize: 13, color: "var(--on-surface-variant)"}}>{desc}</p>}
  </div>
);

// ---------- VENUE PHOTO GALLERY (drag-reorder mock) ----------
const VenuePhotoGallery = () => {
  const photos = [
    { id: 1, src: "assets/venue-stodola.jpg", main: true },
    { id: 2, src: "assets/event-rock.jpg" },
    { id: 3, src: "assets/event-techno.jpg" },
    { id: 4, src: "assets/event-jazz.jpg" },
  ];
  return (
    <div style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12}}>
      {photos.map(p => (
        <div key={p.id} style={{
          position: "relative", aspectRatio: "1/1",
          borderRadius: "var(--radius-lg)", overflow: "hidden",
          background: `url(${p.src}) center / cover`,
          boxShadow: "var(--shadow-sm)", cursor: "grab",
        }}>
          {p.main && (
            <span style={{position: "absolute", top: 8, left: 8,
              background: "rgba(0,0,0,0.65)", color: "#fff", backdropFilter: "blur(8px)",
              padding: "3px 9px", borderRadius: 9999, fontSize: 11, fontWeight: 500,
              display: "inline-flex", alignItems: "center", gap: 4}}>
              <Icons.Star size={10} fill="#FFB84D" stroke="#FFB84D"/>
              Główne
            </span>
          )}
          <div style={{position: "absolute", top: 8, right: 8, opacity: 0.9}}>
            <IconButton variant="surface" size={26}
              style={{background: "rgba(0,0,0,0.5)", color: "#fff", backdropFilter: "blur(8px)"}}>
              <Icons.GripVertical size={13}/>
            </IconButton>
          </div>
          <div style={{position: "absolute", bottom: 8, right: 8}}>
            <IconButton variant="surface" size={26}
              style={{background: "rgba(229,72,77,0.9)", color: "#fff", backdropFilter: "blur(8px)"}}>
              <Icons.Trash size={13}/>
            </IconButton>
          </div>
        </div>
      ))}
      <div style={{
        aspectRatio: "1/1",
        borderRadius: "var(--radius-lg)",
        background: "var(--surface-low)",
        border: "1.5px dashed var(--outline-strong)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 6, cursor: "pointer", color: "var(--on-surface-variant)",
        transition: "all var(--duration-base) var(--ease-out)",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "var(--brand-primary-container)"; e.currentTarget.style.borderColor = "var(--brand-primary)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "var(--surface-low)"; e.currentTarget.style.borderColor = "var(--outline-strong)"; }}>
        <Icons.Upload size={18}/>
        <span style={{fontSize: 12, fontWeight: 500}}>Dodaj</span>
      </div>
    </div>
  );
};

// ---------- OPENING HOURS ----------
const DAYS = [
  ["mon","Poniedziałek"],["tue","Wtorek"],["wed","Środa"],["thu","Czwartek"],
  ["fri","Piątek"],["sat","Sobota"],["sun","Niedziela"],
];
const OpeningHours = () => {
  const [hours, setHours] = React.useState({
    mon: { open: "20:00", close: "04:00", closed: false },
    tue: { open: "20:00", close: "04:00", closed: false },
    wed: { open: "20:00", close: "04:00", closed: false },
    thu: { open: "20:00", close: "04:00", closed: false },
    fri: { open: "20:00", close: "05:00", closed: false, flexible: true },
    sat: { open: "20:00", close: "05:00", closed: false, flexible: true },
    sun: { open: "", close: "", closed: true },
  });
  const set = (day, k, v) => setHours(h => ({ ...h, [day]: { ...h[day], [k]: v }}));

  return (
    <div style={{display: "flex", flexDirection: "column", gap: 6}}>
      {DAYS.map(([key, label]) => {
        const d = hours[key];
        return (
          <div key={key} style={{
            display: "grid", gridTemplateColumns: "140px 90px 120px 1fr 28px 110px",
            gap: 10, alignItems: "center", padding: "8px 12px",
            borderRadius: "var(--radius-md)", background: "var(--surface-low)",
            opacity: d.closed ? 0.55 : 1,
          }}>
            <span style={{fontSize: 14, fontWeight: 500, color: "var(--on-surface)"}}>{label}</span>
            <Toggle checked={!d.closed} onChange={e => set(key, "closed", !e.target.checked)}/>
            {!d.closed ? (
              <>
                <input type="time" value={d.open} onChange={e => set(key, "open", e.target.value)}
                  style={{padding: "8px 10px", borderRadius: 8, border: "1px solid var(--outline)",
                    background: "var(--surface-high)", fontFamily: "var(--font-sans)", fontSize: 13}}/>
                <input type="time" value={d.close} onChange={e => set(key, "close", e.target.value)}
                  style={{padding: "8px 10px", borderRadius: 8, border: "1px solid var(--outline)",
                    background: "var(--surface-high)", fontFamily: "var(--font-sans)", fontSize: 13,
                    width: 120}}/>
                <span/>
                <label style={{display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 12, color: "var(--on-surface-variant)", cursor: "pointer"}}>
                  <input type="checkbox" checked={!!d.flexible}
                    onChange={e => set(key, "flexible", e.target.checked)}/>
                  Otwarte do późna
                </label>
              </>
            ) : (
              <span style={{gridColumn: "span 4", fontSize: 13, color: "var(--on-surface-muted)"}}>
                Zamknięte
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ============================================================================
// ANALYTICS
// ============================================================================
const Analytics = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", gap: 20, maxWidth: 1280}}>
      {/* Top filter row */}
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16}}>
        <div style={{display: "flex", gap: 8}}>
          {["7 dni", "30 dni", "90 dni", "Cały czas"].map((r, i) => (
            <button key={r} style={{
              all: "unset", cursor: "pointer",
              padding: "8px 14px", borderRadius: 9999, fontSize: 13, fontWeight: 500,
              background: i === 1 ? "var(--brand-primary)" : "var(--surface-high)",
              color: i === 1 ? "#fff" : "var(--on-surface)",
              border: i === 1 ? "0" : "1px solid var(--outline)",
              boxShadow: i === 1 ? "var(--shadow-md), 0 6px 18px rgba(108,63,235,0.28)" : "none",
            }}>{r}</button>
          ))}
        </div>
        <Button variant="secondary" icon={<Icons.Upload size={14}/>}>Eksport CSV</Button>
      </div>

      {/* Stat cards */}
      <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16}}>
        <StatCard label="Obserwujący" value="12 483" delta="+184" icon={<Icons.Users size={18}/>}
          trend={[12100, 12150, 12180, 12230, 12290, 12340, 12483]}/>
        <StatCard label="Wyświetlenia · 30 dni" value="48 217" delta="+12.4%" icon={<Icons.Eye size={18}/>}
          trend={[40,42,38,50,48,62,55,70,68,72,80,88]}/>
        <StatCard label="Kliki „Kup bilety”" value="6 412" delta="+8.1%" icon={<Icons.Ticket size={18}/>}
          trend={[20,22,28,25,30,28,36,40,38,42,50,52]}/>
        <StatCard label="Kliki „Nawiguj”" value="2 087" delta="-2.3%" icon={<Icons.Pin size={18}/>}
          trend={[24,22,26,25,24,22,20,21,19,20,18,19]}/>
      </div>

      {/* Main chart */}
      <Card>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          marginBottom: 20}}>
          <div>
            <h3 style={{margin: 0, font: "var(--type-headline-m)",
              letterSpacing: "var(--tracking-headline-m)"}}>Obserwujący w czasie</h3>
            <p style={{margin: "4px 0 0", fontSize: 13, color: "var(--on-surface-variant)"}}>
              Wzrost o <strong style={{color: "#15643F"}}>+184 obserwujących</strong> w ostatnim tygodniu
            </p>
          </div>
          <div style={{display: "flex", gap: 16, fontSize: 12, color: "var(--on-surface-variant)"}}>
            <span style={{display: "inline-flex", alignItems: "center", gap: 6}}>
              <span style={{width: 8, height: 8, borderRadius: 99, background: "var(--brand-primary)"}}/>
              Obserwujący
            </span>
            <span style={{display: "inline-flex", alignItems: "center", gap: 6}}>
              <span style={{width: 8, height: 8, borderRadius: 99, background: "var(--color-tertiary)"}}/>
              Średnia kategorii
            </span>
          </div>
        </div>
        <BigChart/>
      </Card>

      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16}}>
        {/* Top events */}
        <Card>
          <h3 style={{margin: "0 0 16px", font: "var(--type-headline-m)",
            letterSpacing: "var(--tracking-headline-m)"}}>Najpopularniejsze eventy</h3>
          <div style={{display: "flex", flexDirection: "column", gap: 8}}>
            {EVENTS.filter(e => e.views > 0).sort((a,b) => b.views - a.views).slice(0, 4).map((e, i) => (
              <div key={e.id} style={{display: "grid", gridTemplateColumns: "20px 48px 1fr 80px",
                gap: 12, alignItems: "center", padding: "8px 4px"}}>
                <span style={{fontSize: 13, color: "var(--on-surface-muted)",
                  fontFamily: "var(--font-mono)", textAlign: "center"}}>{i + 1}</span>
                <span style={{width: 48, height: 48, borderRadius: 10,
                  background: `url(${e.image}) center / cover`}}/>
                <div style={{minWidth: 0}}>
                  <div style={{fontSize: 13, fontWeight: 500, color: "var(--on-surface)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                    {e.title}
                  </div>
                  <div style={{fontSize: 11, color: "var(--on-surface-variant)"}}>
                    {e.views.toLocaleString("pl-PL").replace(/,/g, " ")} wyświetleń · {e.ticketClicks} klików
                  </div>
                </div>
                <div style={{fontSize: 12, fontWeight: 600, color: "#15643F", textAlign: "right"}}>
                  +{Math.round(Math.random() * 30 + 8)}%
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Category benchmark */}
        <Card>
          <h3 style={{margin: "0 0 4px", font: "var(--type-headline-m)",
            letterSpacing: "var(--tracking-headline-m)"}}>Twoje eventy vs średnia kategorii</h3>
          <p style={{margin: "0 0 16px", fontSize: 13, color: "var(--on-surface-variant)"}}>
            Porównanie do innych klubów muzycznych w Warszawie
          </p>
          <div style={{display: "flex", flexDirection: "column", gap: 16}}>
            {[
              { label: "Wyświetlenia / event", yours: 8200, avg: 5400, unit: "" },
              { label: "Współczynnik kliknięć biletów", yours: 13.4, avg: 8.1, unit: "%" },
              { label: "Otwarcia powiadomień push", yours: 31, avg: 22, unit: "%" },
            ].map((m, i) => (
              <BenchmarkRow key={i} {...m}/>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const BenchmarkRow = ({ label, yours, avg, unit }) => {
  const max = Math.max(yours, avg) * 1.15;
  return (
    <div style={{display: "flex", flexDirection: "column", gap: 8}}>
      <div style={{display: "flex", justifyContent: "space-between", fontSize: 13}}>
        <span style={{color: "var(--on-surface-variant)"}}>{label}</span>
        <span style={{color: "var(--on-surface)", fontWeight: 600}}>
          {yours}{unit} <span style={{color: "var(--on-surface-muted)", fontWeight: 400}}>vs {avg}{unit}</span>
        </span>
      </div>
      <div style={{position: "relative", height: 8, background: "var(--surface-low)", borderRadius: 9999}}>
        <div style={{position: "absolute", top: 0, left: 0, height: "100%",
          width: `${(yours/max)*100}%`,
          background: "linear-gradient(90deg, #6C3FEB, #A97EF8)", borderRadius: 9999}}/>
        <div style={{position: "absolute", top: -3, left: `${(avg/max)*100}%`,
          width: 2, height: 14, background: "var(--color-tertiary)",
          borderRadius: 99, transform: "translateX(-1px)"}}/>
      </div>
    </div>
  );
};

// ---------- BIG LINE CHART ----------
const BigChart = () => {
  const w = 1100;
  const h = 240;
  const padding = { l: 36, r: 12, t: 12, b: 32 };
  const innerW = w - padding.l - padding.r;
  const innerH = h - padding.t - padding.b;

  // 12 weeks
  const data = [11540, 11620, 11680, 11790, 11890, 11970, 12080, 12180, 12260, 12340, 12410, 12483];
  const avg =  [10100, 10180, 10240, 10320, 10410, 10490, 10580, 10650, 10720, 10800, 10880, 10950];
  const labels = ["W1","W2","W3","W4","W5","W6","W7","W8","W9","W10","W11","W12"];

  const min = 10000;
  const max = 12600;
  const yRange = max - min;

  const x = i => padding.l + (i / (data.length - 1)) * innerW;
  const y = v => padding.t + innerH - ((v - min) / yRange) * innerH;

  const linePath = data.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
  const avgPath = avg.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
  const areaPath = `${linePath} L ${x(data.length-1)} ${y(min)} L ${x(0)} ${y(min)} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none"
      style={{overflow: "visible"}}>
      <defs>
        <linearGradient id="chartArea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#6C3FEB" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#6C3FEB" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
        <line key={i} x1={padding.l} x2={w - padding.r} y1={padding.t + innerH * p} y2={padding.t + innerH * p}
          stroke="var(--outline)" strokeDasharray={i === 0 || i === 4 ? "" : "2 4"}/>
      ))}
      {/* y labels */}
      {[max, max - yRange*0.25, max - yRange*0.5, max - yRange*0.75, min].map((v, i) => (
        <text key={i} x={padding.l - 8} y={padding.t + innerH * (i*0.25) + 4}
          fontSize="11" fontFamily="var(--font-sans)" fill="var(--on-surface-muted)" textAnchor="end">
          {Math.round(v/1000)}k
        </text>
      ))}
      {/* area */}
      <path d={areaPath} fill="url(#chartArea)"/>
      {/* avg line */}
      <path d={avgPath} stroke="var(--color-tertiary)" strokeWidth="1.5" fill="none" strokeDasharray="4 4"/>
      {/* main line */}
      <path d={linePath} stroke="#6C3FEB" strokeWidth="2.5" fill="none"
        strokeLinecap="round" strokeLinejoin="round"/>
      {/* dots */}
      {data.map((v, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(v)} r="4" fill="#fff" stroke="#6C3FEB" strokeWidth="2"/>
        </g>
      ))}
      {/* x labels */}
      {labels.map((l, i) => (
        <text key={i} x={x(i)} y={h - 12} fontSize="11" fontFamily="var(--font-sans)"
          fill="var(--on-surface-muted)" textAnchor="middle">{l}</text>
      ))}
      {/* current value label */}
      <g transform={`translate(${x(data.length-1)}, ${y(data[data.length-1]) - 20})`}>
        <rect x="-32" y="-18" width="64" height="22" rx="6" fill="#6C3FEB"/>
        <text x="0" y="-3" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600"
          fontFamily="var(--font-sans)">12 483</text>
      </g>
    </svg>
  );
};

// ============================================================================
// MY VENUES list
// ============================================================================
const MyVenues = ({ onSelect }) => {
  return (
    <div style={{display: "flex", flexDirection: "column", gap: 20, maxWidth: 1180}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <span style={{fontSize: 14, color: "var(--on-surface-variant)"}}>
          Zarządzasz <strong style={{color: "var(--on-surface)"}}>{VENUES.length} lokalami</strong> · łącznie 21 559 obserwujących
        </span>
        <Button icon={<Icons.Plus size={15}/>}>Przejmij kolejny lokal</Button>
      </div>

      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16}}>
        {VENUES.map(v => (
          <Card key={v.id} padding={0} style={{overflow: "hidden", cursor: "pointer",
            transition: "transform var(--duration-base) var(--ease-out)"}}
            onClick={() => onSelect(v)}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{height: 168,
              background: `linear-gradient(rgba(10,8,20,0.15) 0%, rgba(10,8,20,0.55) 100%), url(${v.image}) center / cover`,
              position: "relative", color: "#fff"}}>
              <div style={{position: "absolute", top: 14, right: 14}}>
                <Badge tone="onImage">{v.type || "Lokal"}</Badge>
              </div>
              <div style={{position: "absolute", bottom: 14, left: 16, right: 16}}>
                <div style={{fontSize: 19, fontWeight: 700, letterSpacing: "-0.3px"}}>{v.name}</div>
                <div style={{fontSize: 12, opacity: 0.85, marginTop: 2}}>{v.city}</div>
              </div>
            </div>
            <div style={{padding: 16, display: "flex", flexDirection: "column", gap: 14}}>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12}}>
                <div>
                  <div style={{fontSize: 11, color: "var(--on-surface-muted)", fontWeight: 600,
                    letterSpacing: "1.2px", textTransform: "uppercase"}}>Obserwujący</div>
                  <div style={{fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px", marginTop: 2}}>
                    {v.followers.toLocaleString("pl-PL").replace(/,/g, " ")}
                  </div>
                </div>
                <div>
                  <div style={{fontSize: 11, color: "var(--on-surface-muted)", fontWeight: 600,
                    letterSpacing: "1.2px", textTransform: "uppercase"}}>Eventy</div>
                  <div style={{fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px", marginTop: 2}}>
                    {v.upcoming}
                  </div>
                </div>
              </div>
              <div style={{display: "flex", alignItems: "center", gap: 8,
                padding: "10px 12px", borderRadius: "var(--radius-md)",
                background: "var(--surface-low)", fontSize: 12, color: "var(--on-surface-variant)"}}>
                <Icons.TrendUp size={13} stroke="#1F8A5B"/>
                <span>+{Math.round(Math.random() * 200 + 50)} w tym tygodniu</span>
                <span style={{flex: 1}}/>
                <span style={{color: "var(--brand-primary)", fontWeight: 500}}>
                  Otwórz <Icons.Chevron size={11} style={{verticalAlign: "-1px"}}/>
                </span>
              </div>
            </div>
          </Card>
        ))}

        {/* Add new card */}
        <Card padding={0} style={{
          minHeight: 360, display: "flex", alignItems: "center", justifyContent: "center",
          background: "transparent", border: "1.5px dashed var(--outline-strong)",
          boxShadow: "none", cursor: "pointer",
          transition: "all var(--duration-base) var(--ease-out)",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--brand-primary-container)"; e.currentTarget.style.borderColor = "var(--brand-primary)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--outline-strong)"; }}>
          <div style={{textAlign: "center", color: "var(--on-surface-variant)"}}>
            <span style={{width: 48, height: 48, borderRadius: 9999,
              background: "var(--brand-primary-container)", color: "var(--brand-primary)",
              display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12}}>
              <Icons.Plus size={22}/>
            </span>
            <div style={{fontSize: 15, fontWeight: 600, color: "var(--on-surface)"}}>Przejmij nowy lokal</div>
            <div style={{fontSize: 13, marginTop: 4, maxWidth: 220, marginInline: "auto"}}>
              Dodaj kolejny lokal do swojego konta organizatora
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

Object.assign(window, { VenueProfile, Analytics, BigChart, MyVenues, OpeningHours });



})();

/* === app.jsx === */
;(function(){

// eventapp B2B — main App: routing + state + tweaks panel

const {
  Shell, TopBar, IconButton, Button, Icons,
  DashboardOverview, EventsList, EventForm, EventDetail,
  PushNew, PushHistory, VenueProfile, Analytics, MyVenues,
  VENUES, EVENTS,
} = window;

// Cookie banner shown on first load
const CookieBanner = ({ onClose }) => {
  return (
    <div style={{
      position: "fixed", bottom: 16, left: 16, right: 16, zIndex: 999,
      pointerEvents: "none",
    }}>
      <div style={{
        maxWidth: 720, marginInline: "auto", padding: 16, pointerEvents: "auto",
        background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--outline)", borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-lg)",
        display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
      }}>
        <span style={{
          width: 36, height: 36, borderRadius: 10, flex: "0 0 auto",
          background: "var(--brand-primary-container)", color: "var(--brand-primary)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>🍪</span>
        <div style={{flex: 1, minWidth: 200}}>
          <div style={{fontSize: 14, fontWeight: 600, marginBottom: 2}}>Cookies w eventapp Studio</div>
          <div style={{fontSize: 12, color: "var(--on-surface-variant)", letterSpacing: "var(--tracking-body-m)"}}>
            Używamy plików cookie do analityki produktowej (PostHog). Niezbędne cookies są zawsze włączone.
          </div>
        </div>
        <div style={{display: "flex", gap: 8}}>
          <Button variant="tertiary" size="sm" onClick={onClose}>Tylko niezbędne</Button>
          <Button variant="secondary" size="sm">Ustawienia</Button>
          <Button size="sm" onClick={onClose}>Akceptuj wszystkie</Button>
        </div>
      </div>
    </div>
  );
};

// Toast
const Toast = ({ message, onClose }) => {
  React.useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div style={{
      position: "fixed", top: 90, right: 24, zIndex: 9999,
      background: "var(--surface-high)", padding: "14px 18px",
      borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xl)",
      border: "1px solid var(--outline)",
      display: "flex", alignItems: "center", gap: 12, maxWidth: 380,
      animation: "slideInRight 0.3s var(--ease-out)",
    }}>
      <span style={{width: 32, height: 32, borderRadius: 9999, background: "#DBF3E6", color: "#15643F",
        display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto"}}>
        <Icons.CheckCircle size={16}/>
      </span>
      <div>
        <div style={{fontSize: 14, fontWeight: 600}}>{message.title}</div>
        {message.desc && <div style={{fontSize: 12, color: "var(--on-surface-variant)", marginTop: 2}}>{message.desc}</div>}
      </div>
      <IconButton variant="ghost" size={28} onClick={onClose}><Icons.X size={14}/></IconButton>
    </div>
  );
};

// ---------- AUTH SCREENS ----------
const AuthShell = ({ children, hero }) => (
  <div style={{
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr 560px",
    background: "var(--surface-bg)",
    fontFamily: "var(--font-sans)",
  }}>
    {/* Left: brand panel */}
    <div style={{
      position: "relative",
      background: "linear-gradient(135deg, #21125A 0%, #4622A8 40%, #6C3FEB 75%, #A97EF8 100%)",
      color: "#fff",
      padding: "48px 56px",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      overflow: "hidden",
    }}>
      {/* Decorative blobs */}
      <div style={{position: "absolute", top: -120, left: -80, width: 360, height: 360,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(255,184,77,0.35) 0%, transparent 70%)"}}/>
      <div style={{position: "absolute", bottom: -160, right: -100, width: 460, height: 460,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(169,126,248,0.45) 0%, transparent 65%)"}}/>

      <Logo size={36} withWordmark/>

      <div style={{position: "relative", display: "flex", flexDirection: "column", gap: 24, maxWidth: 480}}>
        <span style={{fontSize: 12, fontWeight: 600, letterSpacing: "1.4px", textTransform: "uppercase",
          opacity: 0.75}}>Panel organizatora</span>
        <h1 style={{margin: 0, fontSize: 44, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.8px",
          textWrap: "balance"}}>
          {hero?.title || "Twój lokal,\nna oczach miasta."}
        </h1>
        <p style={{margin: 0, fontSize: 16, lineHeight: 1.55, opacity: 0.85, letterSpacing: "-0.1px",
          textWrap: "pretty"}}>
          {hero?.desc || "Dodawaj eventy, wysyłaj powiadomienia push do obserwujących i mierz, co naprawdę przyciąga ludzi do drzwi — wszystko z jednego panelu."}
        </p>

        <div style={{display: "flex", flexDirection: "column", gap: 14, marginTop: 8}}>
          {[
            ["Zarządzaj eventami i biletami w jednym miejscu", Icons.Calendar],
            ["Push do obserwujących — 1 darmowy dziennie", Icons.Bell],
            ["Realna analityka: kliki biletów, zasięg, nawigacje", Icons.BarChart],
          ].map(([txt, Ico], i) => (
            <div key={i} style={{display: "flex", alignItems: "center", gap: 12, fontSize: 14}}>
              <span style={{width: 32, height: 32, borderRadius: 9999,
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
                <Ico size={15}/>
              </span>
              <span style={{opacity: 0.92}}>{txt}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{position: "relative", display: "flex", alignItems: "center", gap: 14,
        padding: 16, borderRadius: "var(--radius-lg)",
        background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.15)"}}>
        <div style={{display: "flex", marginRight: -8}}>
          {["#FFB84D", "#A97EF8", "#8C56F4"].map((c, i) => (
            <span key={i} style={{width: 32, height: 32, borderRadius: 9999, background: c,
              border: "2px solid #4622A8", marginLeft: i ? -10 : 0, fontSize: 13, fontWeight: 700,
              display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#21125A"}}>
              {["S","P","B"][i]}
            </span>
          ))}
        </div>
        <div>
          <div style={{fontSize: 14, fontWeight: 600}}>Już 320+ lokali w Polsce</div>
          <div style={{fontSize: 12, opacity: 0.75}}>Stodoła, Powiększenie, Barka, Smolna…</div>
        </div>
      </div>
    </div>

    {/* Right: form */}
    <div style={{padding: "48px 56px", display: "flex", flexDirection: "column",
      justifyContent: "center", overflow: "auto"}}>
      {children}
    </div>
  </div>
);

// ---------- LOGIN ----------
const AuthLogin = ({ onLogin, onRegister, onForgot }) => {
  const [email, setEmail] = React.useState("marek@stodola.pl");
  const [password, setPassword] = React.useState("••••••••");
  return (
    <AuthShell>
      <div style={{maxWidth: 400, width: "100%", marginInline: "auto",
        display: "flex", flexDirection: "column", gap: 28}}>
        <div style={{display: "flex", flexDirection: "column", gap: 8}}>
          <span style={{fontSize: 12, fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase",
            color: "var(--brand-primary)"}}>Witaj z powrotem</span>
          <h2 style={{margin: 0, font: "var(--type-headline-l)", letterSpacing: "var(--tracking-headline-l)"}}>
            Zaloguj się do Studio
          </h2>
          <p style={{margin: 0, fontSize: 14, color: "var(--on-surface-variant)"}}>
            Wpisz dane organizatora przypisane do Twojego lokalu
          </p>
        </div>

        <form onSubmit={e => { e.preventDefault(); onLogin(); }}
          style={{display: "flex", flexDirection: "column", gap: 16}}>
          <Field label="Adres e-mail" required>
            <Input icon={<Icons.Mail size={16}/>} value={email}
              onChange={e => setEmail(e.target.value)} placeholder="lokal@przyklad.pl" type="email"/>
          </Field>

          <Field label="Hasło" required>
            <Input value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" type="password"
              icon={<Icons.Settings size={16}/>}/>
          </Field>

          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between",
            marginTop: -4}}>
            <Checkbox label="Zapamiętaj mnie" checked={true} onChange={() => {}}/>
            <button type="button" onClick={onForgot} style={{
              all: "unset", cursor: "pointer", fontSize: 13, fontWeight: 500,
              color: "var(--brand-primary)",
            }}>Nie pamiętam hasła</button>
          </div>

          <Button size="lg" fullWidth onClick={onLogin} style={{marginTop: 8}}>
            Zaloguj się
          </Button>

          <div style={{display: "flex", alignItems: "center", gap: 12, marginTop: 4}}>
            <span style={{flex: 1, height: 1, background: "var(--outline)"}}/>
            <span style={{fontSize: 12, color: "var(--on-surface-muted)", fontWeight: 500,
              letterSpacing: "1.2px", textTransform: "uppercase"}}>lub</span>
            <span style={{flex: 1, height: 1, background: "var(--outline)"}}/>
          </div>

          <Button variant="secondary" size="lg" fullWidth onClick={onLogin}
            icon={<span style={{
              width: 16, height: 16, display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "conic-gradient(from -45deg, #EA4335, #FBBC05, #34A853, #4285F4, #EA4335)",
              borderRadius: 9999,
            }}/>}>
            Kontynuuj z Google Business
          </Button>
        </form>

        <div style={{textAlign: "center", fontSize: 13, color: "var(--on-surface-variant)"}}>
          Nie masz jeszcze konta?{" "}
          <button onClick={onRegister} style={{
            all: "unset", cursor: "pointer", color: "var(--brand-primary)", fontWeight: 600,
          }}>Zarejestruj lokal</button>
        </div>
      </div>
    </AuthShell>
  );
};

// ---------- REGISTER ----------
const AuthRegister = ({ onRegister, onLogin }) => {
  const [tos, setTos] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);
  return (
    <AuthShell hero={{
      title: "Zarejestruj swój\nlokal w 2 minuty.",
      desc: "Profil organizatora jest bezpłatny. Płacisz tylko jeśli korzystasz z naszych płatnych kanałów promocyjnych — i tylko wtedy.",
    }}>
      <div style={{maxWidth: 440, width: "100%", marginInline: "auto",
        display: "flex", flexDirection: "column", gap: 24}}>
        <div style={{display: "flex", flexDirection: "column", gap: 6}}>
          <span style={{fontSize: 12, fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase",
            color: "var(--brand-primary)"}}>Krok 1 z 3 · Konto organizatora</span>
          <h2 style={{margin: 0, font: "var(--type-headline-l)", letterSpacing: "var(--tracking-headline-l)"}}>
            Załóż konto organizatora
          </h2>
        </div>

        {/* Progress steps */}
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8}}>
          {["Konto", "Weryfikacja e-mail", "Lokal i obserwujący"].map((label, i) => (
            <div key={i} style={{display: "flex", flexDirection: "column", gap: 6}}>
              <div style={{height: 4, borderRadius: 9999,
                background: i === 0 ? "var(--brand-primary)" : "var(--surface-mid)"}}/>
              <span style={{fontSize: 11, fontWeight: 600, color: i === 0 ? "var(--brand-primary)" : "var(--on-surface-muted)",
                letterSpacing: "var(--tracking-body-m)"}}>{label}</span>
            </div>
          ))}
        </div>

        <form onSubmit={e => { e.preventDefault(); onRegister(); }}
          style={{display: "flex", flexDirection: "column", gap: 16}}>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12}}>
            <Field label="Imię" required>
              <Input placeholder="Marek"/>
            </Field>
            <Field label="Nazwisko" required>
              <Input placeholder="Nowicki"/>
            </Field>
          </div>

          <Field label="Służbowy adres e-mail" required hint="Najlepiej z domeny lokalu — przyspieszy weryfikację">
            <Input icon={<Icons.Mail size={16}/>} placeholder="marek@stodola.pl" type="email"/>
          </Field>

          <Field label="Hasło" required hint="Min. 10 znaków, w tym cyfra i znak specjalny">
            <Input placeholder="Wymyśl mocne hasło" type="password"/>
          </Field>

          <div style={{padding: 14, borderRadius: "var(--radius-lg)", background: "var(--surface-low)",
            display: "flex", flexDirection: "column", gap: 10}}>
            <Checkbox checked={tos} onChange={e => setTos(e.target.checked)}
              label={<span style={{fontSize: 13, lineHeight: 1.5}}>
                Akceptuję{" "}
                <a href="#" style={{color: "var(--brand-primary)", fontWeight: 500}}>Regulamin</a>
                {" "}i{" "}
                <a href="#" style={{color: "var(--brand-primary)", fontWeight: 500}}>Politykę Prywatności</a>
                {" "}eventapp Studio
              </span>}/>
            <Checkbox checked={marketing} onChange={e => setMarketing(e.target.checked)}
              label={<span style={{fontSize: 13, lineHeight: 1.5, color: "var(--on-surface-variant)"}}>
                Chcę otrzymywać wskazówki i nowości produktowe (opcjonalnie)
              </span>}/>
          </div>

          <Button size="lg" fullWidth disabled={!tos} onClick={onRegister}
            iconRight={<Icons.Arrow size={16}/>}>
            Przejdź do weryfikacji
          </Button>
        </form>

        <div style={{textAlign: "center", fontSize: 13, color: "var(--on-surface-variant)"}}>
          Masz już konto?{" "}
          <button onClick={onLogin} style={{
            all: "unset", cursor: "pointer", color: "var(--brand-primary)", fontWeight: 600,
          }}>Zaloguj się</button>
        </div>
      </div>
    </AuthShell>
  );
};

// ---------- EMAIL VERIFY ----------
const AuthVerify = ({ onContinue, onResend, onBack }) => {
  const [resent, setResent] = React.useState(false);
  return (
    <AuthShell hero={{
      title: "Sprawdź swoją\nskrzynkę pocztową.",
      desc: "Wysłaliśmy 6-cyfrowy kod weryfikacyjny. Wpisz go obok, żeby aktywować konto.",
    }}>
      <div style={{maxWidth: 420, width: "100%", marginInline: "auto",
        display: "flex", flexDirection: "column", gap: 24}}>
        <div style={{display: "flex", flexDirection: "column", gap: 6}}>
          <span style={{fontSize: 12, fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase",
            color: "var(--brand-primary)"}}>Krok 2 z 3 · Weryfikacja</span>
          <h2 style={{margin: 0, font: "var(--type-headline-l)", letterSpacing: "var(--tracking-headline-l)"}}>
            Wpisz kod z e-maila
          </h2>
        </div>

        <div style={{padding: 16, borderRadius: "var(--radius-lg)",
          background: "var(--brand-primary-container)",
          display: "flex", alignItems: "center", gap: 12}}>
          <span style={{width: 36, height: 36, borderRadius: 10, background: "var(--brand-primary)",
            color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto"}}>
            <Icons.Mail size={17}/>
          </span>
          <div style={{fontSize: 13, color: "var(--brand-primary)"}}>
            Kod wysłany na <strong>marek@stodola.pl</strong>
          </div>
        </div>

        {/* OTP boxes */}
        <div style={{display: "flex", gap: 10, justifyContent: "space-between"}}>
          {["7","3","4","2","9",""].map((d, i) => (
            <div key={i} style={{
              width: 52, height: 64, borderRadius: "var(--radius-lg)",
              background: "var(--surface-low)",
              border: `1.5px solid ${d ? "var(--brand-primary)" : "transparent"}`,
              boxShadow: d ? "0 0 0 3px rgba(108,63,235,0.12)" : "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-sans)", fontSize: 28, fontWeight: 700,
              color: d ? "var(--on-surface)" : "var(--on-surface-muted)",
            }}>{d || "•"}</div>
          ))}
        </div>

        <Button size="lg" fullWidth onClick={onContinue}>Zweryfikuj kod</Button>

        <div style={{textAlign: "center", fontSize: 13, color: "var(--on-surface-variant)"}}>
          {resent ? (
            <span style={{color: "#15643F", display: "inline-flex", alignItems: "center", gap: 6, justifyContent: "center"}}>
              <Icons.CheckCircle size={14} stroke="#15643F"/> Nowy kod wysłany
            </span>
          ) : (
            <>Nie dostałeś kodu?{" "}
            <button onClick={() => { setResent(true); onResend?.(); }} style={{
              all: "unset", cursor: "pointer", color: "var(--brand-primary)", fontWeight: 600,
            }}>Wyślij ponownie</button>
            {" "}<span style={{color: "var(--on-surface-muted)"}}>(za 60s)</span>
            </>
          )}
        </div>

        <button onClick={onBack} style={{
          all: "unset", cursor: "pointer", fontSize: 13, color: "var(--on-surface-variant)",
          display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "center",
        }}>
          <Icons.ChevronLeft size={13}/> Zmień adres e-mail
        </button>
      </div>
    </AuthShell>
  );
};

// ---------- PASSWORD RESET ----------
const AuthForgot = ({ onSubmit, onBack }) => {
  const [sent, setSent] = React.useState(false);
  return (
    <AuthShell hero={{
      title: "Odzyskaj dostęp\ndo Studio.",
      desc: "Wpisz swój e-mail organizatora — wyślemy link, którym ustawisz nowe hasło. Link będzie ważny 30 minut.",
    }}>
      <div style={{maxWidth: 420, width: "100%", marginInline: "auto",
        display: "flex", flexDirection: "column", gap: 22}}>
        <button onClick={onBack} style={{
          all: "unset", cursor: "pointer", fontSize: 13, color: "var(--on-surface-variant)",
          display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start",
        }}>
          <Icons.ChevronLeft size={13}/> Wróć do logowania
        </button>

        {!sent ? (
          <>
            <div style={{display: "flex", flexDirection: "column", gap: 6}}>
              <h2 style={{margin: 0, font: "var(--type-headline-l)", letterSpacing: "var(--tracking-headline-l)"}}>
                Resetuj hasło
              </h2>
              <p style={{margin: 0, fontSize: 14, color: "var(--on-surface-variant)"}}>
                Wyślemy link do ustawienia nowego hasła
              </p>
            </div>

            <Field label="Adres e-mail organizatora" required>
              <Input icon={<Icons.Mail size={16}/>} placeholder="marek@stodola.pl" type="email"/>
            </Field>

            <Button size="lg" fullWidth onClick={() => setSent(true)}
              icon={<Icons.Send size={15}/>}>Wyślij link resetujący</Button>
          </>
        ) : (
          <>
            <span style={{width: 56, height: 56, borderRadius: 9999, alignSelf: "flex-start",
              background: "#DBF3E6", color: "#15643F",
              display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
              <Icons.CheckCircle size={26}/>
            </span>
            <div style={{display: "flex", flexDirection: "column", gap: 6}}>
              <h2 style={{margin: 0, font: "var(--type-headline-l)", letterSpacing: "var(--tracking-headline-l)"}}>
                Sprawdź skrzynkę
              </h2>
              <p style={{margin: 0, fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.5}}>
                Wysłaliśmy link na <strong>marek@stodola.pl</strong>. Otwórz wiadomość i kliknij przycisk,
                żeby ustawić nowe hasło. Link będzie ważny 30 minut.
              </p>
            </div>
            <Button size="lg" variant="secondary" fullWidth onClick={onBack}>
              Wróć do logowania
            </Button>
            <p style={{margin: 0, fontSize: 12, color: "var(--on-surface-muted)", textAlign: "center"}}>
              Nie otrzymałeś maila? Sprawdź folder Spam lub{" "}
              <button onClick={() => setSent(false)} style={{
                all: "unset", cursor: "pointer", color: "var(--brand-primary)", fontWeight: 500,
              }}>spróbuj ponownie</button>
            </p>
          </>
        )}
      </div>
    </AuthShell>
  );
};

// ---------- APP ----------
const App = () => {
  const [authState, setAuthState] = React.useState("authed"); // login | register | verify | forgot | authed
  const [route, setRoute] = React.useState("blog");

  React.useEffect(() => {
    window.__logout = () => { setAuthState("login"); setRoute("dashboard"); };
    return () => { delete window.__logout; };
  }, []);
  const [activeVenue, setActiveVenue] = React.useState(VENUES[0]);
  const [activeEventId, setActiveEventId] = React.useState(EVENTS[0].id);
  const [activePostId, setActivePostId] = React.useState(null);
  const [cookieClosed, setCookieClosed] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  const onNavigate = (id, opts = {}) => {
    setRoute(id);
    if (opts.eventId) setActiveEventId(opts.eventId);
    if ("postId" in opts) setActivePostId(opts.postId);
  };

  React.useEffect(() => { window.__blogToast = setToast; return () => { delete window.__blogToast; }; }, []);

  const navMap = {
    "dashboard":   "dashboard",
    "events":      "events",
    "event-new":   "events",
    "event-edit":  "events",
    "event-detail":"events",
    "blog":        "blog",
    "blog-new":    "blog",
    "blog-edit":   "blog",
    "venue":       "venue",
    "my-venues":   "venue",
    "push":        "push",
    "push-new":    "push",
    "analytics":   "analytics",
    "settings":    "settings",
  };

  let topBar, content, key = route;

  switch (route) {
    case "dashboard":
      topBar = <TopBar title="Pulpit" subtitle="Klub Stodoła · Warszawa"
        actions={<Button icon={<Icons.Plus size={15}/>} onClick={() => onNavigate("event-new")}>Stwórz event</Button>}/>;
      content = <DashboardOverview venue={activeVenue}
        onNavigate={(id) => {
          if (id === "venue" || id === "events" || id === "push" || id === "analytics") onNavigate(id);
          else if (id === "event-new") onNavigate("event-new");
          else if (id === "push-new") onNavigate("push-new");
        }}
        onOpenEvent={id => onNavigate("event-detail", { eventId: id })}/>;
      break;

    case "events":
      topBar = <TopBar title="Eventy" subtitle="Zarządzaj wszystkimi eventami Klubu Stodoły"
        actions={<Button icon={<Icons.Plus size={15}/>} onClick={() => onNavigate("event-new")}>Stwórz event</Button>}/>;
      content = <EventsList
        onOpenEvent={id => onNavigate("event-detail", { eventId: id })}
        onNew={() => onNavigate("event-new")}/>;
      break;

    case "event-new":
      topBar = <TopBar title="Nowy event"
        breadcrumbs={["Eventy", "Nowy event"]}
        actions={
          <Button variant="secondary" icon={<Icons.ChevronLeft size={14}/>} onClick={() => onNavigate("events")}>
            Wróć do listy
          </Button>}/>;
      content = <EventForm mode="create"
        onCancel={() => onNavigate("events")}
        onSave={() => { setToast({title: "Event opublikowany", desc: "Pojawi się w aplikacji w ciągu 2 minut"}); onNavigate("events"); }}/>;
      break;

    case "event-detail":
      const ev = EVENTS.find(e => e.id === activeEventId);
      topBar = <TopBar title={ev?.title || "Event"}
        breadcrumbs={["Eventy", "Szczegóły"]}
        actions={
          <Button variant="secondary" icon={<Icons.ChevronLeft size={14}/>} onClick={() => onNavigate("events")}>
            Wróć do listy
          </Button>}/>;
      content = <EventDetail eventId={activeEventId}
        onBack={() => onNavigate("events")}
        onEdit={() => onNavigate("event-edit")}
        onPush={() => onNavigate("push-new")}/>;
      break;

    case "event-edit":
      const eve = EVENTS.find(e => e.id === activeEventId);
      topBar = <TopBar title="Edytuj event"
        breadcrumbs={["Eventy", eve?.title?.slice(0,28) || "Event", "Edycja"]}
        actions={
          <Button variant="secondary" icon={<Icons.ChevronLeft size={14}/>} onClick={() => onNavigate("event-detail")}>
            Anuluj edycję
          </Button>}/>;
      content = <EventForm mode="edit" initial={{
        title: eve?.title, date: "2026-05-24", time: "20:00", duration: "2h 30 min",
        category: "concert", description: eve?.description || "",
        price: "paid", priceAmount: "89", ticketLink: "https://ebilet.pl/daria-zawialow",
        recurring: false,
      }}
        onCancel={() => onNavigate("event-detail")}
        onSave={() => { setToast({title: "Zmiany zapisane"}); onNavigate("event-detail"); }}/>;
      break;

    case "blog":
      topBar = <TopBar title="Blog" subtitle="Artykuły Klubu Stodoły na blogu eventapp"
        actions={<Button icon={<Icons.Pencil size={15}/>} onClick={() => onNavigate("blog-new", { postId: null })}>
          Nowy artykuł</Button>}/>;
      content = <window.BlogList
        onNew={() => onNavigate("blog-new", { postId: null })}
        onEdit={id => onNavigate("blog-edit", { postId: id })}/>;
      break;

    case "blog-new":
      topBar = <TopBar title="Nowy artykuł"
        breadcrumbs={["Blog", "Nowy artykuł"]}
        actions={
          <Button variant="secondary" icon={<Icons.ChevronLeft size={14}/>} onClick={() => onNavigate("blog")}>
            Wróć do listy
          </Button>}/>;
      content = <window.BlogEditor mode="create"
        onCancel={() => onNavigate("blog")}
        onSaved={() => setToast({title: "Szkic zapisany", desc: "Znajdziesz go w zakładce Szkice"})}
        onSubmitted={() => {
          setToast({title: "Artykuł wysłany do moderacji", desc: "Sprawdzimy go w ciągu 24 h — dostaniesz e-mail"});
          onNavigate("blog");
        }}/>;
      break;

    case "blog-edit": {
      const bp = (window.BLOG_POSTS || []).find(p => p.id === activePostId);
      topBar = <TopBar title="Edytuj artykuł"
        breadcrumbs={["Blog", bp?.title?.slice(0, 32) || "Artykuł", "Edycja"]}
        actions={
          <Button variant="secondary" icon={<Icons.ChevronLeft size={14}/>} onClick={() => onNavigate("blog")}>
            Wróć do listy
          </Button>}/>;
      content = <window.BlogEditor mode="edit" post={bp}
        onCancel={() => onNavigate("blog")}
        onSaved={() => setToast({title: "Szkic zapisany"})}
        onSubmitted={() => {
          setToast({title: "Artykuł wysłany do moderacji", desc: "Sprawdzimy go w ciągu 24 h — dostaniesz e-mail"});
          onNavigate("blog");
        }}/>;
      break;
    }

    case "venue":
      topBar = <TopBar title="Profil lokalu" subtitle="Klub Stodoła"
        actions={<Button variant="secondary" icon={<Icons.Eye size={15}/>}>Podgląd publiczny</Button>}/>;
      content = <VenueProfile venue={activeVenue} onPreview={() => {}}/>;
      break;

    case "my-venues":
      topBar = <TopBar title="Moje lokale" subtitle={`${VENUES.length} lokali w zarządzaniu`}/>;
      content = <MyVenues onSelect={v => { setActiveVenue(v); onNavigate("dashboard"); }}/>;
      break;

    case "push":
      topBar = <TopBar title="Powiadomienia push" subtitle="Klub Stodoła · 12 483 obserwujących"
        actions={<Button icon={<Icons.Send size={15}/>} onClick={() => onNavigate("push-new")}>
          Nowe powiadomienie</Button>}/>;
      content = <PushHistory onNew={() => onNavigate("push-new")}/>;
      break;

    case "push-new":
      topBar = <TopBar title="Wyślij powiadomienie"
        breadcrumbs={["Powiadomienia", "Nowe"]}
        actions={
          <Button variant="secondary" icon={<Icons.ChevronLeft size={14}/>} onClick={() => onNavigate("push")}>
            Wróć
          </Button>}/>;
      content = <PushNew
        onBack={() => onNavigate("push")}
        onSent={() => { setToast({title: "Powiadomienie wysłane", desc: "Dotrze do 12 483 obserwujących w ciągu 2 minut"}); onNavigate("push"); }}/>;
      break;

    case "analytics":
      topBar = <TopBar title="Analityka" subtitle="Klub Stodoła · ostatnie 30 dni"
        actions={<Button variant="secondary" icon={<Icons.Upload size={14}/>}>Eksport CSV</Button>}/>;
      content = <Analytics/>;
      break;

    case "settings":
      topBar = <TopBar title="Ustawienia"/>;
      content = <SettingsPlaceholder/>;
      break;

    default:
      content = <div>Loading…</div>;
  }

  return (
    <>
      {authState !== "authed" && (
        <>
          {authState === "login"    && <AuthLogin
            onLogin={() => setAuthState("authed")}
            onRegister={() => setAuthState("register")}
            onForgot={() => setAuthState("forgot")}/>}
          {authState === "register" && <AuthRegister
            onRegister={() => setAuthState("verify")}
            onLogin={() => setAuthState("login")}/>}
          {authState === "verify"   && <AuthVerify
            onContinue={() => setAuthState("authed")}
            onBack={() => setAuthState("register")}/>}
          {authState === "forgot"   && <AuthForgot
            onBack={() => setAuthState("login")}/>}
        </>
      )}
      {authState === "authed" && <>
      <Shell
        active={navMap[route] || route}
        route={route}
        onNavigate={onNavigate}
        venue={activeVenue}
        venues={VENUES}
        onVenueSelect={setActiveVenue}
        onMyVenues={() => onNavigate("my-venues")}
        topBar={topBar}>
        <div key={key} style={{animation: "fadeUp 0.32s var(--ease-out)"}}>
          {content}
        </div>
      </Shell>

      {!cookieClosed && <CookieBanner onClose={() => setCookieClosed(true)}/>}
      {toast && <Toast message={toast} onClose={() => setToast(null)}/>}
      </>}
    </>
  );
};

const SettingsPlaceholder = () => (
  <div style={{maxWidth: 700, display: "flex", flexDirection: "column", gap: 16}}>
    {[
      { title: "Konto",          desc: "E-mail, hasło, język aplikacji",     icon: <Icons.User size={18}/> },
      { title: "Powiadomienia",  desc: "E-maile o aktywności obserwujących", icon: <Icons.Bell size={18}/> },
      { title: "Faktury i dane firmy", desc: "NIP, dane do faktur, historia", icon: <Icons.Building size={18}/> },
      { title: "Bezpieczeństwo", desc: "Sesje, logowanie 2FA",               icon: <Icons.Settings size={18}/> },
      { title: "Polityka cookies", desc: "Zarządzaj zgodami analitycznymi",   icon: <span style={{fontSize: 18}}>🍪</span> },
    ].map((s, i) => (
      <div key={i} style={{
        padding: 16, borderRadius: "var(--radius-lg)",
        background: "var(--surface-high)", boxShadow: "var(--shadow-sm)",
        display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
      }}>
        <span style={{width: 40, height: 40, borderRadius: 10,
          background: "var(--brand-primary-container)", color: "var(--brand-primary)",
          display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
          {s.icon}
        </span>
        <div style={{flex: 1}}>
          <div style={{fontSize: 15, fontWeight: 600}}>{s.title}</div>
          <div style={{fontSize: 13, color: "var(--on-surface-variant)"}}>{s.desc}</div>
        </div>
        <Icons.Chevron size={15} stroke="var(--on-surface-muted)"/>
      </div>
    ))}
  </div>
);

// ---------- mount ----------
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);


})();
