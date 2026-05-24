// Inline Lucide-style SVG icons. Stroke 1.75 to match design system.
const _I = (size, paths) => ({ className, style, strokeWidth = 1.75 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
       className={className} style={style} aria-hidden="true">
    {paths}
  </svg>
);

const Icon = {
  // basics
  Search: _I(20, <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>),
  ChevronDown: _I(16, <path d="m6 9 6 6 6-6"/>),
  ChevronUp: _I(16, <path d="m18 15-6-6-6 6"/>),
  ChevronRight: _I(16, <path d="m9 6 6 6-6 6"/>),
  ChevronLeft: _I(16, <path d="m15 6-6 6 6 6"/>),
  X: _I(18, <path d="M18 6 6 18M6 6l12 12"/>),
  MapPin: _I(18, <><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></>),
  Calendar: _I(18, <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>),
  Clock: _I(18, <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>),
  Filter: _I(18, <path d="M3 6h18M6 12h12M10 18h4"/>),
  Heart: _I(18, <path d="M19 14c1.5-1.5 3-3.5 3-5.5a5.5 5.5 0 0 0-10-3 5.5 5.5 0 0 0-10 3c0 2 1.5 4 3 5.5l7 7Z"/>),
  HeartFill: _I(18, <path d="M19 14c1.5-1.5 3-3.5 3-5.5a5.5 5.5 0 0 0-10-3 5.5 5.5 0 0 0-10 3c0 2 1.5 4 3 5.5l7 7Z" fill="currentColor"/>),
  Share: _I(18, <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>),
  Navigation: _I(18, <polygon points="3 11 22 2 13 21 11 13 3 11"/>),
  Ticket: _I(18, <><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4Z"/><path d="M13 5v2M13 11v2M13 17v2"/></>),
  Bell: _I(18, <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>),
  Flame: _I(18, <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17h.5A4.5 4.5 0 0 0 16 12.5c0-3-2-5.5-3-7-1 1.5-1.5 2-2.5 3-1 1-2.5 2.5-2.5 5a2.5 2.5 0 0 0 .5 1.5Z"/>),
  Repeat: _I(16, <><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></>),
  Music: _I(16, <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>),
  Disc: _I(16, <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></>),
  Palette: _I(16, <><circle cx="12" cy="12" r="10"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 22a4 4 0 0 1 0-8 4 4 0 0 0 0-8c5.5 0 10 4.5 10 10s-4.5 6-10 6Z"/></>),
  Utensils: _I(16, <><path d="M3 2v7c0 1 1 2 2 2h2V2M11 2v20M11 14h8c0 0-1-2-1-5s1-7 1-7H11"/></>),
  Trophy: _I(16, <><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M17 4h3a2 2 0 0 1 0 4l-3 1M7 4H4a2 2 0 0 0 0 4l3 1"/></>),
  Drama: _I(16, <><path d="M10 11h.01M14 11h.01"/><path d="M4 7c0 4 2 11 8 11s8-7 8-11a4 4 0 0 0-7.5-2 4 4 0 0 0-7.5-2 4 4 0 0 0-1 4Z"/></>),
  Laugh: _I(16, <><circle cx="12" cy="12" r="10"/><path d="M18 13a6 6 0 0 1-12 0"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>),
  Cpu: _I(16, <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></>),
  Film: _I(16, <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 12h18M3 7.5h4M3 16.5h4M17 7.5h4M17 16.5h4"/></>),
  Sparkles: _I(16, <><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5Z"/><path d="M19 17v3M5 17v3M21 19h-3M7 19H4"/></>),
  Leaf: _I(16, <><path d="M11 20A7 7 0 0 1 4 13c0-8 8-9 17-9 0 5 0 17-10 17Z"/><path d="M4 21c2-7 7-12 12-13"/></>),
  Baby: _I(16, <><path d="M9 12h.01M15 12h.01M10 16c.5.3 1.3.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/></>),
  Globe: _I(16, <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20"/></>),
  Plus: _I(16, <path d="M12 5v14M5 12h14"/>),
  Minus: _I(16, <path d="M5 12h14"/>),
  Locate: _I(18, <><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/></>),
  ArrowRight: _I(14, <><path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/></>),
  ArrowUpRight: _I(14, <><path d="M7 17 17 7M7 7h10v10"/></>),
  Users: _I(16, <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>),
  Cookie: _I(24, <><path d="M11.5 2c1.4 0 2.7.4 3.8 1-.7.7-1.3 1.7-1.3 2.8 0 2 1.7 3.7 3.7 3.7 1.1 0 2-.6 2.8-1.3.6 1.1 1 2.4 1 3.8a10 10 0 1 1-10-10z"/><path d="M8.5 8.5h.01M12 12h.01M15 16h.01M16 8h.01M8 13h.01"/></>),
  Facebook: _I(16, <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>),
  Instagram: _I(16, <><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.4a4 4 0 1 1-7.9 1 4 4 0 0 1 7.9-1Z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>),
  Tiktok: _I(16, <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>),
  Tag: _I(16, <><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>),
  AtSign: _I(14, <><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.9 7.9"/></>),
  Eye: _I(18, <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>),
};

Object.assign(window, { Icon });
