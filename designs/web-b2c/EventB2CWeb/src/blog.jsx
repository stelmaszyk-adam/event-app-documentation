// Blog section for eventapp Web B2C — list, detail, and home strip
const { useState: _bs, useEffect: _be, useMemo: _bm, useRef: _br } = React;

const BLOG_CATS = ['Wszystko', 'Nightlife', 'Kultura', 'Muzyka', 'Jedzenie', 'Sport', 'Wywiady'];

const AUTHORS = {
  mk: { initials: 'MK', name: 'Marta Kowalczyk', role: 'Redakcja · Poznań', tone: '', bio: 'Pisze o nocnej scenie i miejscach, które dopiero się otwierają. Od 2021 roku w eventapp.' },
  tw: { initials: 'TW', name: 'Tomasz Wierzba', role: 'Redakcja · Muzyka', tone: 'amber', bio: 'Jazz, improwizacja i małe sceny. Prowadzi cotygodniowy newsletter o koncertach.' },
  pz: { initials: 'PZ', name: 'Piotr Zając', role: 'Wywiady', tone: '', bio: 'Rozmawia z ludźmi, którzy robią wydarzenia — bookerami, technikami, właścicielami klubów.' },
  an: { initials: 'AN', name: 'Anna Nowicka', role: 'Kultura', tone: 'amber', bio: 'Wystawy, galerie i teatr. Szuka programów, które warto zaplanować z wyprzedzeniem.' },
};

const POSTS = [
  {
    id: 'piwnice', cat: 'Nightlife', date: '17 sierpnia 2026', dateShort: '17 sierpnia', read: '8 min czytania',
    author: 'mk', image: IMG.techno, featured: true,
    title: 'Nowa fala poznańskich piwnic. Gdzie tańczy się do rana',
    lede: 'Sześć klubów, które w ostatnim roku przedefiniowały nocną scenę miasta — i ludzie, którzy je prowadzą.',
    excerpt: 'Sześć klubów, które w ostatnim roku przedefiniowały nocną scenę miasta — i ludzie, którzy je prowadzą.',
    eventIds: ['e1', 'e2', 'e3'],
    body: [
      { t: 'p', v: 'Przez ostatnie dwa lata nocna mapa Poznania przesunęła się o kilkaset metrów. Kluby, które definiowały weekendy w okolicy Starego Rynku, ustąpiły miejsca piwnicom po drugiej stronie Warty — mniejszym, tańszym i prowadzonym przez ludzi, którzy jeszcze niedawno stali za barem.' },
      { t: 'h', v: 'Piwnica jako format' },
      { t: 'p', v: 'Nowe miejsca łączy skala: dwie sale, sto pięćdziesiąt osób, jeden dobrze ustawiony system. Bookerzy mówią o tym wprost — mniejsza pojemność oznacza mniejsze ryzyko i odważniejszy line-up. Zamiast jednego dużego nazwiska w miesiącu pojawiają się cztery weekendy z lokalnymi selektorami.' },
      { t: 'q', v: '„Nie potrzebujemy tysiąca osób. Potrzebujemy stu pięćdziesięciu, które wracają." — Kamil, współzałożyciel Basenu' },
      { t: 'p', v: 'Efekt widać w kalendarzach. Rezydentury wracają po latach przerwy, a wejściówki na piątkowe sety rozchodzą się dzień przed wydarzeniem, bez kampanii i bez pośredników.' },
      { t: 'event', v: 'e1' },
      { t: 'h', v: 'Kto za tym stoi' },
      { t: 'p', v: 'Właściciele czterech z sześciu opisywanych miejsc pracowali wcześniej w klubach, które zamknęły się w 2023 roku. Doświadczenie przekłada się na organizację: wspólne kalendarze, wymiana ekip technicznych i nieformalna zasada, że dwa duże wydarzenia nie odbywają się tego samego wieczoru.' },
      { t: 'h', v: 'Co dalej' },
      { t: 'p', v: 'Na jesień zapowiedziano dwa kolejne otwarcia, oba w dawnych halach po zakładach przy Zamenhofa. Jeśli utrzymają format, w ciągu roku środek nocnego życia miasta przesunie się na prawy brzeg definitywnie.' },
    ],
  },
  {
    id: 'jazz', cat: 'Muzyka', date: '12 sierpnia 2026', dateShort: '12 sierpnia', read: '6 min czytania',
    author: 'tw', image: IMG.jazz,
    title: 'Jazz w Poznaniu wrócił do klubów. Przewodnik po siedmiu scenach',
    lede: 'Od piwnicznych jam sessions po sceny festiwalowe — mapa miejsc z najlepszymi składami improwizowanymi w Wielkopolsce.',
    excerpt: 'Od piwnicznych jam sessions po sceny festiwalowe — mapa miejsc, w których w tym sezonie usłyszysz najlepsze składy improwizowane w Wielkopolsce.',
    eventIds: ['e2', 'e1', 'e3'],
    body: [
      { t: 'p', v: 'Jam sessions wróciły do kalendarzy tygodniowych, a nie tylko festiwalowych. Siedem miejsc w mieście prowadzi dziś regularne wieczory improwizowane — od klubów studenckich po sale koncertowe z wynajmowanym fortepianem.' },
      { t: 'h', v: 'Gdzie zacząć' },
      { t: 'p', v: 'Najniższy próg wejścia mają czwartki: wstęp bezpłatny, składy otwarte, publiczność mieszana. Weekendy należą do biletowanych koncertów z zapowiedzianym line-upem.' },
      { t: 'event', v: 'e2' },
      { t: 'h', v: 'Czego słuchać' },
      { t: 'p', v: 'W tym sezonie dominują małe składy — trio i kwartet. Organizatorzy tłumaczą to prosto: łatwiej zmieścić je na scenie i łatwiej rozliczyć wieczór bez dofinansowania.' },
    ],
  },
  {
    id: 'booker', cat: 'Wywiady', date: '9 sierpnia 2026', dateShort: '9 sierpnia', read: '11 min czytania',
    author: 'pz', image: IMG.rock,
    title: '„Bilety to nie wszystko" — rozmowa z bookerem Klubu Stodoła',
    lede: 'O tym, jak układa się line-up na jesień i co decyduje o powrocie zespołu do miasta.',
    excerpt: 'O tym, jak układa się line-up na jesień, dlaczego mniejsze sceny wygrywają z arenami i co decyduje o powrocie zespołu do miasta.',
    eventIds: ['e3', 'e1', 'e2'],
    body: [
      { t: 'p', v: 'Rozmawiamy tydzień po ogłoszeniu jesiennego programu. Na liście dwadzieścia jeden koncertów, z czego osiem to debiuty w mieście.' },
      { t: 'h', v: 'Jak powstaje kalendarz' },
      { t: 'p', v: 'Punktem wyjścia nie jest nazwisko, ale data. Agenci przysyłają trasy z gotowymi oknami, a klub dopasowuje do nich sale i budżet techniczny.' },
      { t: 'event', v: 'e3' },
      { t: 'h', v: 'Co decyduje o powrocie' },
      { t: 'p', v: 'Frekwencja jest drugorzędna. Liczy się, jak wieczór wygląda od strony zespołu: garderoba, czas próby, obsługa. Dobrze poprowadzony pierwszy koncert to zwykle trzy kolejne w ciągu dwóch lat.' },
    ],
  },
  {
    id: 'wystawy', cat: 'Kultura', date: '5 sierpnia 2026', dateShort: '5 sierpnia', read: '7 min czytania',
    author: 'an', image: IMG.venue,
    title: 'Dwanaście wystaw, które warto zobaczyć przed końcem lata',
    lede: 'Galerie miejskie otwierają sezon wcześniej niż zwykle.',
    excerpt: 'Galerie miejskie otwierają sezon wcześniej niż zwykle. Wybraliśmy ekspozycje, na które warto zaplanować osobne popołudnie.',
    eventIds: ['e1', 'e3', 'e2'],
    body: [
      { t: 'p', v: 'Sierpień bywał w galeriach martwy. W tym roku cztery instytucje przesunęły wernisaże z września, żeby złapać koniec wakacji.' },
      { t: 'h', v: 'Duże otwarcia' },
      { t: 'p', v: 'Trzy ekspozycje zajmują całe piętra i wymagają co najmniej godziny. Bilety łączone obowiązują do końca września.' },
      { t: 'h', v: 'Mniejsze miejsca' },
      { t: 'p', v: 'Reszta listy to galerie prowadzone przez artystów — otwarte krótko, zwykle od czwartku do soboty, i warte sprawdzenia przed wyjściem.' },
    ],
  },
  {
    id: 'afterparty', cat: 'Nightlife', date: '1 sierpnia 2026', dateShort: '1 sierpnia', read: '5 min czytania',
    author: 'mk', image: IMG.techno,
    title: 'Afterparty bez kolejek: jak działa nowy system wejściówek',
    lede: 'Kluby testują wejścia na godziny.',
    excerpt: 'Kluby testują wejścia na godziny. Sprawdziliśmy, komu to się opłaca i jak nie przepłacić za wieczór w centrum.',
    eventIds: ['e1', 'e2', 'e3'],
    body: [
      { t: 'p', v: 'Wejściówki godzinowe pojawiły się w czterech klubach w mieście. Zamiast jednej ceny za wieczór obowiązują trzy progi — do 23:00, do 1:00 i po 1:00.' },
      { t: 'h', v: 'Komu się to opłaca' },
      { t: 'p', v: 'Klubom, bo rozkłada ruch przy wejściu. Gościom, jeśli przychodzą wcześnie — różnica sięga trzydziestu złotych.' },
    ],
  },
  {
    id: 'jedzenie', cat: 'Jedzenie', date: '28 lipca 2026', dateShort: '28 lipca', read: '6 min czytania',
    author: 'an', image: IMG.jazz,
    title: 'Gdzie zjeść po koncercie. Dwanaście kuchni otwartych po północy',
    lede: 'Lista miejsc, które kończą pracę razem z klubami.',
    excerpt: 'Lista miejsc, które kończą pracę razem z klubami — z godzinami, cenami i dzielnicami.',
    eventIds: ['e2', 'e3', 'e1'],
    body: [
      { t: 'p', v: 'Po pierwszej w nocy wybór zawęża się do kilkunastu adresów. Zebraliśmy je według dzielnic, z godzinami zamknięcia kuchni.' },
      { t: 'h', v: 'Centrum' },
      { t: 'p', v: 'Najwięcej opcji w promieniu dziesięciu minut od Starego Rynku, ale też najdłuższe kolejki w weekendy.' },
    ],
  },
  {
    id: 'jam', cat: 'Muzyka', date: '16 sierpnia 2026', dateShort: '16 sierpnia', read: '7 min czytania',
    author: 'tw', image: IMG.jazz,
    title: 'Jam session wrócił na Wildę. Cztery piwnice, jeden kalendarz',
    lede: 'Muzycy dzielą sprzęt i publiczność.',
    excerpt: 'Muzycy dzielą sprzęt i publiczność. Sprawdziliśmy, jak to działa w praktyce i kto płaci za wieczór.',
    eventIds: ['e1', 'e2', 'e3'],
    body: [
      { t: 'p', v: 'Cztery miejsca na Wildzie prowadzą dziś wspólny kalendarz jam sessions. Wieczory nie nakładają się na siebie, a ekipy techniczne krążą między piwnicami.' },
      { t: 'h', v: 'Kto płaci za wieczór' },
      { t: 'p', v: 'Zwykle klub — wstęp jest bezpłatny, a koszt zamyka się w honorarium sekcji rytmicznej i obsłudze baru. Kapelusz zbierany po drugim secie pokrywa resztę.' },
      { t: 'event', v: 'e1' },
      { t: 'p', v: 'Publiczność jest mieszana: studenci, muzycy po próbach i stali bywalcy, którzy przychodzą co czwartek od dwóch lat.' },
    ],
  },
  {
    id: 'backstage', cat: 'Muzyka', date: '15 sierpnia 2026', dateShort: '15 sierpnia', read: '4 min czytania',
    author: 'pz', image: IMG.rock, video: '6:24',
    title: 'Backstage: jedna próba przed jesienną trasą',
    lede: 'Kamera na ostatniej próbie przed tournée.',
    excerpt: 'Zabraliśmy kamerę na ostatnią próbę zespołu przed jesiennym tournée po sześciu miastach.',
    eventIds: ['e2', 'e3', 'e1'],
    body: [
      { t: 'p', v: 'Sześć godzin w sali prób, dwie przerwy i lista dwudziestu jeden utworów do skrócenia o połowę. Tak wygląda ostatni dzień przed wyjazdem.' },
      { t: 'h', v: 'Co się zmienia w trasie' },
      { t: 'p', v: 'Setlisty układa się pod sale, nie pod płytę. W klubach zostają wersje krótsze, na festiwalach — rozciągnięte finały.' },
    ],
  },
  {
    id: 'teatr', cat: 'Kultura', date: '13 sierpnia 2026', dateShort: '13 sierpnia', read: '9 min czytania',
    author: 'an', image: IMG.venue,
    title: 'Teatr w dawnej hali. Jak Stara Rzeźnia zmieniła sezon',
    lede: 'Trzy premiery, jedna scena, mniejszy budżet.',
    excerpt: 'Trzy premiery, jedna scena i budżet mniejszy niż rok temu. Rozmowa z dyrekcją artystyczną.',
    eventIds: ['e3', 'e1', 'e2'],
    body: [
      { t: 'p', v: 'Hala po zakładach mięsnych działa jako scena drugi sezon. Widownia liczy dwieście miejsc, a scenografię buduje się na miejscu, bo transport z magazynu pochłaniał trzecią część kosztów.' },
      { t: 'h', v: 'Program na jesień' },
      { t: 'p', v: 'Trzy premiery zamiast pięciu, w zamian dłuższe serie spektakli. Dyrekcja liczy, że pozwoli to domknąć sezon bez dodatkowej dotacji.' },
    ],
  },
  {
    id: 'kadry', cat: 'Kultura', date: '11 sierpnia 2026', dateShort: '11 sierpnia', read: '2 min czytania',
    author: 'an', image: IMG.rock, gallery: 18,
    title: 'Weekend w kadrach: Malta Festival',
    lede: 'Osiemnaście zdjęć z trzech dni festiwalu.',
    excerpt: 'Osiemnaście zdjęć z trzech dni festiwalu — sceny plenerowe, próby i publiczność nad Wartą.',
    eventIds: ['e1', 'e3', 'e2'],
    body: [
      { t: 'p', v: 'Trzy dni, cztery sceny i pogoda, która wytrzymała do soboty. Wybór zdjęć z festiwalowego weekendu.' },
      { t: 'p', v: 'Największa frekwencja padła w piątek wieczorem, przy scenie nad Wartą — organizatorzy mówią o dziewięciu tysiącach osób.' },
    ],
  },
  {
    id: 'selektorka', cat: 'Nightlife', date: '7 sierpnia 2026', dateShort: '7 sierpnia', read: '10 min czytania',
    author: 'mk', image: IMG.jazz, video: '12:08',
    title: 'Selektorka, która zbudowała scenę z niczego',
    lede: 'O pierwszych imprezach w garażu i publiczności, która wraca po siedmiu latach.',
    excerpt: 'O pierwszych imprezach w garażu, sprzęcie z drugiej ręki i publiczności, która wraca po siedmiu latach.',
    eventIds: ['e3', 'e2', 'e1'],
    body: [
      { t: 'p', v: 'Zaczynała w garażu na Dębcu, z dwoma odtwarzaczami pożyczonymi od kolegi. Dziś prowadzi rezydenturę w dwóch klubach i cykl, który wyjeżdża na festiwale.' },
      { t: 'h', v: 'Sprzęt i pieniądze' },
      { t: 'p', v: 'Pierwsze trzy lata bez honorariów, cały budżet szedł na nagłośnienie. Dopiero czwarty rok domknął się na zero.' },
      { t: 'event', v: 'e3' },
      { t: 'h', v: 'Publiczność' },
      { t: 'p', v: 'Na listach gości od początku te same nazwiska. Mówi, że to jedyny wskaźnik, który śledzi.' },
    ],
  },
];

// ---------- LIST-PAGE MODULES (trending, topics, briefs, ads) ----------
const BLOG_TRENDING = ['jedzenie', 'jazz', 'afterparty', 'piwnice', 'selektorka'];

const BLOG_TOPICS = [
  { name: 'Nightlife', count: '128 tekstów', image: IMG.techno, tint: 't1', big: true },
  { name: 'Muzyka', count: '214 tekstów', image: IMG.jazz, tint: 't3' },
  { name: 'Kultura', count: '96 tekstów', image: IMG.venue, tint: 't1' },
  { name: 'Jedzenie', count: '73 teksty', image: IMG.rock, tint: 't2' },
  { name: 'Sport', count: '41 tekstów', image: IMG.techno, tint: 't2' },
];

const BLOG_BRIEFS = [
  { t: 'Klub Basen wydłuża godziny w weekendy', image: IMG.techno, to: 'afterparty' },
  { t: 'Trzy nowe sceny na Jeżycach do końca roku', image: IMG.jazz, to: 'piwnice' },
  { t: 'Galerie miejskie z jednym biletem do września', image: IMG.venue, to: 'wystawy' },
  { t: 'Festiwal uliczny przesunięty na wrzesień', image: IMG.rock, to: 'kadry' },
];

const BLOG_AD_CARD = {
  brand: 'Entry Pass', mark: 'EP', image: IMG.techno,
  title: 'Nowy system wejściówek na godziny. Jak działa?',
  text: 'Partner platformy testuje wejścia czasowe w sześciu klubach. Sprawdź, gdzie już działają.',
  cta: 'Dowiedz się więcej',
};

const BLOG_AD_BANNER = {
  image: IMG.venue,
  title: 'Karnet Jesień 2026 — cztery koncerty w cenie dwóch',
  text: 'Wspólna oferta ośmiu poznańskich klubów. Sprzedaż do 31 sierpnia.',
  cta: 'Zobacz karnet',
};

const _post = (id) => POSTS.find(p => p.id === id) || POSTS[0];
const _slug = (s) => s.toLowerCase().replace(/[^a-z0-9ąćęłńóśźż]+/g, '-').replace(/^-|-$/g, '');

// ---------- POST CARD ----------
function BlogPostCard({ post, onClick }) {
  const a = AUTHORS[post.author];
  return (
    <article className="blog-card" onClick={onClick}>
      <img src={post.image} alt="" />
      <div className="shade" />
      <div className="body">
        <div className="blog-byline">
          <span className={`blog-av ${a.tone}`}>{a.initials}</span>
          <span className="blog-label">{post.dateShort} · {post.cat}</span>
        </div>
        <h3>{post.title}</h3>
        <p className="excerpt">{post.excerpt}</p>
      </div>
    </article>
  );
}

// ---------- HOME STRIP ----------
function BlogStrip({ city, onNavigate }) {
  return (
    <section className="blog-strip" data-screen-label="Z bloga">
      <div className="blog-strip-head">
        <div>
          <h2>Z bloga</h2>
          <p>Przewodniki i wywiady od redakcji — {city.name} i okolice</p>
        </div>
        <button className="btn btn-tertiary" onClick={() => onNavigate('blog')}>
          Wszystkie artykuły <Icon.ChevronRight />
        </button>
      </div>
      <div className="blog-strip-grid">
        {POSTS.slice(0, 3).map(p => (
          <BlogPostCard key={p.id} post={p} onClick={() => onNavigate('blog-post', p.id)} />
        ))}
      </div>
    </section>
  );
}

// ---------- LIST-PAGE CARD VARIANTS ----------
const BENTO_IDS = ['piwnice', 'jazz', 'booker', 'wystawy'];
const FEED_ORDER = ['jam', 'backstage', '__briefs', '__event', '__ad', 'teatr', 'afterparty', 'kadry', 'selektorka', 'jedzenie'];
const SPAN_ROWS = [[5, 4, 3], [3, 4, 5], [4, 3, 5]];

function BlogSpotCard({ post, variant, onClick }) {
  const a = AUTHORS[post.author];
  return (
    <article className={`bl-spot ${variant || ''}`} onClick={onClick}>
      <div className="th"><img src={post.image} alt="" /></div>
      <div className="b">
        <div className="bl-meta"><span className="cat">{post.cat}</span><i className="bl-dot" /><span>{post.dateShort}</span></div>
        <h3>{post.title}</h3>
        {variant !== 'wide' && <p className="bl-ex">{post.excerpt}</p>}
        <div className="blog-byline bl-push"><span className={`blog-av sm ${a.tone}`}>{a.initials}</span><span className="bl-ex">{a.name}</span></div>
      </div>
    </article>
  );
}

function BlogTrendCard({ post, rank, onClick }) {
  return (
    <article className="bl-tcard" onClick={onClick}>
      <div className="th"><img src={post.image} alt="" /><span className="rank">{rank}</span></div>
      <div className="b">
        <h3>{post.title}</h3>
        <p className="bl-ex bl-clamp1">{post.lede}</p>
        <span className="blog-label bl-push bl-muted">{post.read.replace(' czytania', '')} · {post.cat}</span>
      </div>
    </article>
  );
}

function BlogAdBanner() {
  const ad = BLOG_AD_BANNER;
  return (
    <div className="bl-adbanner" data-screen-label="Reklama · baner śródstronowy">
      <img src={ad.image} alt="" />
      <div className="veil" />
      <div className="c">
        <span className="bl-adtag">Materiał partnera</span>
        <h3>{ad.title}</h3>
        <p>{ad.text}</p>
        <span className="bl-adcta">{ad.cta}</span>
      </div>
    </div>
  );
}

function BlogAdCard() {
  const ad = BLOG_AD_CARD;
  return (
    <article className="bl-adcard" data-screen-label="Reklama · native interstitial">
      <div className="th"><img src={ad.image} alt="" /><span className="sp">Sponsorowane</span></div>
      <div className="b">
        <h3>{ad.title}</h3>
        <p className="bl-ex bl-clamp2">{ad.text}</p>
        <div className="brandrow">
          <span className="mark">{ad.mark}</span>
          <span className="nm">{ad.brand}</span>
          <span className="blog-label cta">{ad.cta}</span>
        </div>
      </div>
    </article>
  );
}

function BlogBriefs({ onNavigate }) {
  return (
    <div className="bl-briefs">
      <h4>W skrócie</h4>
      {BLOG_BRIEFS.map((b, i) => (
        <div key={i} className="row" onClick={() => onNavigate('blog-post', b.to)}>
          <div className="th"><img src={b.image} alt="" /></div>
          <span className="t">{b.t}</span>
        </div>
      ))}
    </div>
  );
}

function BlogFeedEvent({ event, onNavigate }) {
  return (
    <article className="bl-ecard" onClick={() => onNavigate('event', event.id)}>
      <div className="th">
        <img src={event.image} alt="" />
        <span className="date"><b>{event.dateShort.d}</b><span>{event.dateShort.m}</span></span>
      </div>
      <div className="b">
        <span className="bl-evtag">Wydarzenie · pasuje do tematu</span>
        <h3>{event.title}</h3>
        <p className="bl-ex bl-clamp1">{event.venue.name}, {event.venue.address} · {event.time}</p>
        <div className="foot">
          <span className="price">{event.priceFrom === 0 ? 'Bezpłatne' : `od ${event.priceFrom} zł`}</span>
          <span className="btn btn-primary">Bilety</span>
        </div>
      </div>
    </article>
  );
}

function BlogFeedCard({ post, layout, onClick }) {
  const a = AUTHORS[post.author];
  if (layout === 'hero') {
    return (
      <article className="bl-fcard img" onClick={onClick}>
        <img src={post.image} alt="" /><div className="shade" />
        <div className="onimg">
          <div className="bl-meta on"><span>{post.cat}</span><i className="bl-dot" /><span>{post.dateShort}</span></div>
          <h3>{post.title}</h3>
          <p className="bl-ex bl-clamp2">{post.excerpt}</p>
          <div className="blog-byline"><span className={`blog-av sm ${a.tone}`}>{a.initials}</span><span className="blog-label">{a.name}</span></div>
        </div>
      </article>
    );
  }
  if (layout === 'gallery') {
    return (
      <article className="bl-fcard img short" onClick={onClick}>
        <img src={post.image} alt="" /><div className="shade soft" />
        <div className="onimg">
          <span className="bl-glass">Galeria · {post.gallery} zdjęć</span>
          <h3>{post.title}</h3>
        </div>
      </article>
    );
  }
  if (layout === 'row') {
    return (
      <article className="bl-fcard row" onClick={onClick}>
        <div className="th"><img src={post.image} alt="" /></div>
        <div className="b">
          <div className="bl-meta"><span className="cat">{post.cat}</span><i className="bl-dot" /><span>{post.dateShort}</span><i className="bl-dot" /><span>{post.read.replace(' czytania', '')}</span></div>
          <h3>{post.title}</h3>
          <p className="bl-ex bl-clamp2">{post.excerpt}</p>
          <div className="blog-byline"><span className={`blog-av sm ${a.tone}`}>{a.initials}</span><span className="bl-ex">{a.name}</span></div>
        </div>
      </article>
    );
  }
  const isVideo = !!post.video;
  return (
    <article className={`bl-fcard ${layout === 'compact' ? 'compact' : ''}`} onClick={onClick}>
      <div className="th">
        <img src={post.image} alt="" />
        {isVideo && <span className="bl-play" />}
        {isVideo && <span className="bl-dur">{post.video}</span>}
      </div>
      <div className="b">
        <div className="bl-meta"><span className="cat">{isVideo ? `Wideo · ${post.cat}` : post.cat}</span><i className="bl-dot" /><span>{post.dateShort}</span></div>
        <h3>{post.title}</h3>
        {layout !== 'compact' && <p className="bl-ex bl-clamp2">{post.excerpt}</p>}
        <div className="blog-byline bl-push"><span className={`blog-av sm ${a.tone}`}>{a.initials}</span><span className="bl-ex">{a.name}</span></div>
      </div>
    </article>
  );
}

// ---------- LIST SCREEN ----------
function BlogListScreen({ city, onNavigate }) {
  const [cat, setCat] = _bs('Wszystko');
  const [page, setPage] = _bs(1);
  const rail = _br(null);
  const [railPage, setRailPage] = _bs(0);

  const featured = _post('piwnice');
  const spots = ['jazz', 'booker', 'wystawy'].map(_post);
  const trending = BLOG_TRENDING.map(_post);
  const matchedEvent = EVENTS.find(e => e.id === 'e1') || EVENTS[0];

  const stream = _bm(() => {
    if (cat !== 'Wszystko') {
      return POSTS.filter(p => p.cat === cat).map(p => ({ k: 'post', p }));
    }
    return FEED_ORDER.map(id => {
      if (id === '__briefs') return { k: 'briefs' };
      if (id === '__event') return { k: 'event' };
      if (id === '__ad') return { k: 'ad' };
      return { k: 'post', p: _post(id) };
    });
  }, [cat]);

  const shown = stream.slice(0, page * 6);
  const items = _bm(() => {
    const out = [];
    let wide = 0;
    for (let i = 0; i < shown.length; i += 3) {
      const group = shown.slice(i, i + 3);
      const spans = group.length === 3 ? SPAN_ROWS[(i / 3) % 3] : group.length === 2 ? [7, 5] : [12];
      group.forEach((it, j) => {
        const span = spans[j];
        let layout = 'std';
        if (it.k === 'post') {
          if (it.p.gallery) layout = 'gallery';
          else if (span >= 5) { layout = it.p.video ? 'std' : (wide++ % 2 === 0 ? 'hero' : 'row'); }
          else if (span <= 3) layout = 'compact';
        }
        out.push({ ...it, span, layout });
      });
    }
    return out;
  }, [shown]);

  const railScroll = (dir) => {
    const el = rail.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.82, behavior: 'smooth' });
  };
  const railPages = 3;

  return (
    <main className="bl-page">
      {/* 1 — DISCOVER BENTO */}
      <section className="bl-band bg">
        <div className="bl-in">
          <div className="bl-top">
            <div>
              <nav className="blog-breadcrumb">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>eventapp</a>
                <span className="sep">/</span>
                <span>Blog</span>
                <span className="sep">/</span>
                <span className="cur">{city.name}</span>
              </nav>
              <h1 className="bl-h1">Odkryj</h1>
            </div>
            <div className="blog-chips">
              {BLOG_CATS.map(c => (
                <button key={c} className={`chip ${cat === c ? 'is-selected' : ''}`} onClick={() => { setCat(c); setPage(1); }}>{c}</button>
              ))}
            </div>
          </div>
          <div className="bl-bento">
            <article className="bl-cover" onClick={() => onNavigate('blog-post', featured.id)}>
              <img src={featured.image} alt="" /><div className="shade" />
              <div className="onimg">
                <div className="bl-covermeta"><span className="blog-tag">Temat numeru</span><span className="blog-label">{featured.date} · {featured.read}</span></div>
                <h2>{featured.title}</h2>
                <p className="lede">{featured.lede}</p>
                <div className="blog-byline">
                  <span className={`blog-av ${AUTHORS[featured.author].tone}`}>{AUTHORS[featured.author].initials}</span>
                  <span className="blog-label">{AUTHORS[featured.author].name}</span>
                  <i className="bl-dot on" />
                  <span className="blog-label">12,4 tys. odsłon</span>
                </div>
              </div>
            </article>
            <BlogSpotCard post={spots[0]} variant="tall" onClick={() => onNavigate('blog-post', spots[0].id)} />
            <BlogSpotCard post={spots[1]} onClick={() => onNavigate('blog-post', spots[1].id)} />
            <BlogSpotCard post={spots[2]} variant="wide" onClick={() => onNavigate('blog-post', spots[2].id)} />
          </div>
        </div>
      </section>

      {/* 2A — TRENDING RAIL + MID-PAGE BANNER */}
      <section className="bl-band low">
        <div className="bl-in">
          <div className="bl-sechead">
            <div>
              <h2>Na fali w tym tygodniu</h2>
              <p>Najczęściej czytane teksty ostatnich siedmiu dni</p>
            </div>
            <div className="bl-railctl">
              <div className="bl-dots">
                {Array.from({ length: railPages }).map((_, i) => <i key={i} className={i === railPage ? 'on' : ''} />)}
              </div>
              <button className="bl-rbtn prev" onClick={() => railScroll(-1)} aria-label="Poprzednie"><Icon.ChevronRight /></button>
              <button className="bl-rbtn" onClick={() => railScroll(1)} aria-label="Następne"><Icon.ChevronRight /></button>
            </div>
          </div>
          <div className="bl-rail" ref={rail} onScroll={(e) => {
            const el = e.currentTarget;
            const max = Math.max(1, el.scrollWidth - el.clientWidth);
            setRailPage(Math.round((el.scrollLeft / max) * (railPages - 1)));
          }}>
            {trending.map((p, i) => (
              <BlogTrendCard key={p.id} post={p} rank={i + 1} onClick={() => onNavigate('blog-post', p.id)} />
            ))}
          </div>
          <BlogAdBanner />
        </div>
      </section>

      {/* 2B — TOPICS */}
      <section className="bl-band deep">
        <div className="bl-in">
          <div className="bl-sechead">
            <div>
              <h2>Przeglądaj tematy</h2>
              <p>Działy redakcyjne — od nocnej sceny do kuchni</p>
            </div>
            <button className="btn btn-tertiary" onClick={() => { setCat('Wszystko'); setPage(1); }}>Wszystkie tematy <Icon.ChevronRight /></button>
          </div>
          <div className="bl-topics">
            {BLOG_TOPICS.map(t => (
              <div key={t.name} className={`bl-topic ${t.big ? 'big' : ''}`} onClick={() => { setCat(BLOG_CATS.includes(t.name) ? t.name : 'Wszystko'); setPage(1); }}>
                <img src={t.image} alt="" />
                <div className={`tint ${t.tint}`} />
                <div className="c"><span className="blog-label">{t.name}</span><span className="n">{t.count}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — MIXED-MEDIA FEED */}
      <section className="bl-band bg last">
        <div className="bl-in">
          <div className="bl-sechead">
            <div>
              <h2>Najnowsze</h2>
              <p>Artykuły, wideo i wydarzenia dopasowane do {city.name}a</p>
            </div>
          </div>
          <div className="bl-feed">
            {items.map((it, i) => {
              const style = { gridColumn: `span ${it.span}` };
              if (it.k === 'briefs') return <div key="briefs" style={style}><BlogBriefs onNavigate={onNavigate} /></div>;
              if (it.k === 'event') return <div key="event" style={style}><BlogFeedEvent event={matchedEvent} onNavigate={onNavigate} /></div>;
              if (it.k === 'ad') return <div key="ad" style={style}><BlogAdCard /></div>;
              return (
                <div key={it.p.id + i} style={style}>
                  <BlogFeedCard post={it.p} layout={it.layout} onClick={() => onNavigate('blog-post', it.p.id)} />
                </div>
              );
            })}
          </div>
          {items.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--on-surface-variant)', font: 'var(--type-body-l)' }}>
              Brak artykułów w tej kategorii.
            </p>
          )}
          {shown.length < stream.length && (
            <button className="btn btn-secondary blog-loadmore" onClick={() => setPage(p => p + 1)}>Wczytaj więcej</button>
          )}
        </div>
      </section>
    </main>
  );
}

// ---------- INLINE MINI EVENT CARD ----------
function BlogMiniEvent({ eventId, onNavigate }) {
  const ev = EVENTS.find(e => e.id === eventId) || EVENTS[0];
  return (
    <div className="blog-mini" onClick={() => onNavigate('event', ev.id)}>
      <div className="th"><img src={ev.image} alt="" /></div>
      <div className="m">
        <span className="blog-label" style={{ color: 'var(--brand-primary)' }}>Wydarzenie · {ev.date}</span>
        <span className="t">{ev.title}</span>
        <span className="s">{ev.venue.name}, {ev.venue.address} · {ev.time}</span>
      </div>
      <div className="side">
        <span className="price">{ev.priceFrom === 0 ? 'Bezpłatne' : `od ${ev.priceFrom} zł`}</span>
        <span className="btn btn-primary">Zobacz wydarzenie</span>
      </div>
    </div>
  );
}

// ---------- DETAIL SCREEN ----------
function BlogDetailScreen({ postId, city, onNavigate }) {
  const post = _post(postId);
  const a = AUTHORS[post.author];
  const heads = post.body.filter(b => b.t === 'h').map(b => ({ id: _slug(b.v), label: b.v }));
  const [active, setActive] = _bs(heads[0] ? heads[0].id : null);

  _be(() => {
    const onScroll = () => {
      let cur = heads[0] ? heads[0].id : null;
      heads.forEach(h => {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top < 160) cur = h.id;
      });
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [postId]);

  const related = POSTS.filter(p => p.id !== post.id).slice(0, 3);
  const events = post.eventIds.map(id => EVENTS.find(e => e.id === id)).filter(Boolean);

  return (
    <main className="blog-page">
      <nav className="blog-breadcrumb">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>eventapp</a>
        <span className="sep">/</span>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}>Blog</a>
        <span className="sep">/</span>
        <span className="cur">{post.cat}</span>
      </nav>

      <div className="blog-article">
        <div className="blog-main">
          <div className="blog-article-hero"><img src={post.image} alt="" /></div>
          <header className="blog-article-head">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="blog-tag">{post.cat}</span>
              <span className="blog-label" style={{ color: 'var(--on-surface-variant)' }}>{post.read}</span>
            </div>
            <h1>{post.title}</h1>
            <div className="blog-byline" style={{ gap: 12 }}>
              <span className={`blog-av lg ${a.tone}`}>{a.initials}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ font: 'var(--type-label-m)' }}>{a.name}</span>
                <span className="blog-label" style={{ color: 'var(--on-surface-variant)' }}>{post.date}</span>
              </div>
            </div>
          </header>

          <div className="blog-body">
            {post.body.map((b, i) => {
              if (b.t === 'h') return <h2 key={i} id={_slug(b.v)}>{b.v}</h2>;
              if (b.t === 'q') return <blockquote key={i}>{b.v}</blockquote>;
              if (b.t === 'event') return <BlogMiniEvent key={i} eventId={b.v} onNavigate={onNavigate} />;
              return <p key={i}>{b.v}</p>;
            })}
          </div>

          <section className="blog-section">
            <h2>Wydarzenia z artykułu</h2>
            <div className="blog-events">
              {events.map(ev => (
                <article key={ev.id} className="blog-ecard" onClick={() => onNavigate('event', ev.id)}>
                  <div className="th"><img src={ev.image} alt="" /></div>
                  <div className="b">
                    <span className="blog-label" style={{ color: 'var(--brand-primary)' }}>{ev.date} · {ev.time}</span>
                    <span className="t">{ev.title}</span>
                    <span className="s">{ev.venue.name}</span>
                    <span className="price">{ev.priceFrom === 0 ? 'Bezpłatne' : `od ${ev.priceFrom} zł`}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="blog-related">
            <div className="head">
              <h2 style={{ margin: 0, font: '600 24px/1.3 var(--font-sans)', letterSpacing: '-.6px' }}>Czytaj dalej</h2>
              <button className="btn btn-tertiary" onClick={() => onNavigate('blog')}>Wszystkie artykuły <Icon.ChevronRight /></button>
            </div>
            <div className="list">
              {related.map(p => (
                <div key={p.id} className="blog-relrow" onClick={() => onNavigate('blog-post', p.id)}>
                  <div className="th"><img src={p.image} alt="" /></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span className="blog-label" style={{ color: 'var(--on-surface-variant)' }}>{p.cat} · {p.dateShort}</span>
                    <span className="t">{p.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="blog-side">
          <div className="blog-box">
            <div className="blog-byline" style={{ gap: 14 }}>
              <span className={`blog-av lg ${a.tone}`}>{a.initials}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={{ font: 'var(--type-label-m)' }}>{a.name}</span>
                <span className="blog-role">{a.role}</span>
              </div>
            </div>
            <p>{a.bio}</p>
          </div>
          <div className="blog-box">
            <span className="blog-label" style={{ color: 'var(--on-surface-variant)' }}>W tym artykule</span>
            <nav className="blog-toc">
              {heads.map(h => (
                <a key={h.id} href={`#${h.id}`} className={active === h.id ? 'is-active' : ''}>{h.label}</a>
              ))}
            </nav>
          </div>
          <button className="btn btn-primary blog-share"><Icon.Share /> Udostępnij</button>
        </aside>
      </div>
    </main>
  );
}

Object.assign(window, { POSTS, AUTHORS, BLOG_CATS, BLOG_TOPICS, BLOG_BRIEFS, BLOG_TRENDING, BlogPostCard, BlogStrip, BlogListScreen, BlogDetailScreen, BlogMiniEvent, BlogSpotCard, BlogTrendCard, BlogFeedCard, BlogAdCard, BlogAdBanner, BlogBriefs, BlogFeedEvent });
