# Wydarzka — plan walidacji Poznań (30 dni)

> **Cel:** w 30 dni odpowiedzieć liczbami na trzy pytania, zanim zbudujemy resztę B2B, Stripe i kolejne miasta.
> **Zasada:** ręczna robota jest OK. Nie wysyłamy ludzi do niegotowej aplikacji mobilnej — MVP to web-b2c + newsletter + Instagram + my jako „redakcja”.
> **Start pracy:** czwartek 15 października 2026 (dzień −7). Dni −7…−1 (15–21.10) to przygotowanie.
> **Dzień 1:** czwartek 22 października 2026 — wydanie #1 newslettera. **Dzień 30:** piątek 20 listopada 2026 — decyzja.
> Tygodnie liczymy od czwartku do środy, bo czwartek 8:00 to rytm produktu (newsletter + IG).

Powiązane pliki: [SKRYPT-ROZMOWY.md](./SKRYPT-ROZMOWY.md) · [ONE-PAGER-PL.md](./ONE-PAGER-PL.md) · [LISTA-50-POZNAN.md](./LISTA-50-POZNAN.md)

**Kalendarz w pigułce:**

| Faza | Daty | Wydanie (czw 8:00) |
|---|---|---|
| Przygotowanie (dni −7…−1) | czw 15.10 – śr 21.10 | — (test wysyłki 21.10) |
| Tydzień 1 | czw 22.10 – śr 28.10 | #1 — 22.10 |
| Tydzień 2 | czw 29.10 – śr 4.11 | #2 — 29.10 (weekend Halloween / Wszystkich Świętych) |
| Tydzień 3 | czw 5.11 – śr 11.11 | #3 — 5.11 (11.11 to święto — środa) |
| Tydzień 4 | czw 12.11 – pt 20.11 | #4 — 12.11 (pierwsze płatne wyróżnienia), #5 — 19.11 |
| Decyzja | pt 20.11 | — |

---

## 1. Hipotezy i progi decyzji

| # | Hipoteza | Jak mierzymy | Zielone (idziemy dalej) | Czerwone (zmieniamy kurs) |
|---|---|---|---|---|
| H1 | **Popyt:** poznaniacy chcą co tydzień dostawać wyselekcjonowane „małe” wydarzenia (quizy, stand-up, open mic, wernisaże, darmowe) | newsletter + IG + ruch na web-b2c | ≥ 300 subskrybentów, open rate ≥ 45%, CTR ≥ 10%, ≥ 25% odbiorców klika w ≥ 2 z 4 wydań (#1–#4) | < 100 subskrybentów albo CTR < 4% |
| H2 | **Podaż:** małe lokale regularnie przekazują nam wydarzenia, jeśli nie muszą niczego obsługiwać | CRM (arkusz) | 10 partnerów przekazuje wydarzenia 3 tygodnie z rzędu (wydania #2–#4 lub #3–#5) | < 4 partnerów aktywnych w 3. tygodniu |
| H3 | **Płatność:** lokal zapłaci za widoczność | płatny test w tygodniu 4 (wydania #4 i #5) | ≥ 3 lokale płacą (49–99 zł) albo ≥ 5 deklaruje Pro po konkretnej cenie z datą startu | 0 płacących i „może kiedyś” u wszystkich |

Uwaga do H1: wydanie #2 (29.10) trafia w weekend Halloween / Wszystkich Świętych (31.10–1.11) — część ludzi wyjeżdża, puby mają własne imprezy. Liczymy je normalnie, ale jeśli jest wyraźnie słabsze od #1 i #3, nie traktujemy tego jako sygnału o popycie.

**Decyzja w dniu 30 (pt 20.11):**
- 3× zielone → kończymy panel B2B (claim + publikacja), potem drugie miasto.
- H1 zielone, H3 czerwone → model zarabia na użytkownikach/afiliacji biletów/sponsorach wydań, nie na abonamencie lokali. Przepisujemy monetyzację w `ROADMAP.md`.
- H1 czerwone → problem nie jest w B2B. Zmieniamy niszę lub kanał (np. tylko studenci/Erasmus, tylko rodziny z dziećmi) i powtarzamy 30 dni.

---

## 2. Blokery do usunięcia przed startem (dni −7…−1, 15–21.10)

Stan z lokalnej bazy deweloperskiej (`wydarzka-postgres`, 17.09.2026) — dane mają prawie miesiąc, **pierwszego dnia (15.10) powtórzyć zapytania na produkcji** i zaktualizować tabelę:

| Problem | Liczby (Poznań, 177 lokali) | Dlaczego blokuje walidację |
|---|---|---|
| Brak kategorii | 148/177 lokali = `other` (importer `city_portal` nie mapuje kategorii) | Filtry i kolorowe pinezki nie działają — mapa wygląda na pustą/szarą |
| Duplikaty lokali | np. Teatr Wielki ×3, Klub Tama ×3, Aula Artis ×3, Bazar Poznański ×3 | Pierwsze demo u właściciela: „czemu jesteśmy trzy razy?” |
| Śmieciowe nazwy z eBilet | lokale o nazwach „Poznań”, „Kraków, Poznań, Warszawa”, „Białystok, Poznań” | Wygląda na błąd — niszczy zaufanie |
| Lokale z innych miast w Poznaniu | „Teatr Belfegor” (Tychy), „Muzeum Geologiczne… we Wrocławiu” | Źle geokodowane → złe pinezki |
| Nazwa = adres, encje HTML | „Klub Pod Minogą, ul. Feliksa Nowowiejskiego 8”, „Cortiqu&#233;” | Brzydko w demo i w SEO |
| Dane seedowe (faker) | ~30 fikcyjnych lokali typu „Mika, Dec and Lipiński” | Nie mogą trafić na produkcję |
| Zero kontaktów | 0 telefonów, 0 www, 0 e-maili | Weryfikacja SMS z one-pagera nie zadziała; kontakty zbieramy ręcznie w CRM |
| Brak „długiego ogona” | Top lokale w danych to Teatr Muzyczny, Teatr Wielki, MTP — duże instytucje | Nisza, którą chcemy wygrać (puby, stand-up, quizy), **nie przychodzi z agregacji** — dodajemy ją ręcznie od partnerów |

Zadania do pipeline'u (przez `/new-task`, zgłosić 15.10, żeby były zmergowane i wdrożone do pn 19.10): mapowanie kategorii `city_portal`, deduplikacja lokali po nazwie+geo, filtr nazw-miast z eBilet, odrzucanie adresów spoza miasta, dekodowanie encji HTML, blokada seedów na prod. Co nie zdąży do 19.10 — obchodzimy ręcznie (np. ukrywamy duplikaty w bazie), nie przesuwamy wydania #1.

**Infrastruktura walidacji (bez nowego kodu, jeśli się da):**
- [ ] Web-b2c na `wydarzka.dev` ze stronami wydarzeń i `/poznan/this-weekend`. Jeśli nie jest gotowe do 21.10 — linki w newsletterze prowadzą do stron organizatorów przez skracacz z licznikiem kliknięć.
- [ ] UTM na każdym linku (`utm_source=newsletter|instagram|fb_group&utm_campaign=weekend_NN`) + zdarzenia w PostHog.
- [ ] Newsletter: darmowy MailerLite/Beehiiv z formularzem zgody (RODO) — Resend zostaje do maili transakcyjnych.
- [ ] Jedno konto IG i TikTok. Uwaga: dokumenty są niespójne (`@wydarzka_pl` vs `@wydarzka.pl`) — wybrać jedno 15.10 i poprawić wszędzie.
- [ ] CRM = arkusz Google (kolumny w §6).
- [ ] Formularz „Zgłoś wydarzenie” dla partnerów (Google Form wystarczy), wpisy trafiają do bazy jako `source=manual`.

### Plan dzień po dniu (15–21.10)

| Dzień | Co |
|---|---|
| **Czw 15.10 (−7)** | Decyzje bez dyskusji: handle IG/TikTok, narzędzie newsletterowe. Założyć konta, arkusz CRM (§6), Google Form „Zgłoś wydarzenie”. Sprawdzić blokery z §2 na produkcji, zgłosić zadania przez `/new-task`. Zamówić wydruki one-pagera i naklejki (termin odbioru: pn 19.10). |
| **Pt 16.10 (−6)** | Przepisać [LISTA-50-POZNAN.md](./LISTA-50-POZNAN.md) do CRM z dzielnicami. Pierwsze DM-y/telefony: umówić 8–12 rozmów na wt–śr 20–21.10 (Stare Miasto / Święty Marcin, Jeżyce). Lista 3–5 grup FB do obserwacji. |
| **Sb–Nd 17–18.10 (−5/−4)** | Teren: obejrzeć 3–4 lokale z listy w weekendowym ruchu, nagrać materiał na pierwszy Reels. Zebrać kandydatów wydarzeń na 23–25.10 do wydania #1 (cel: 20 kandydatów, z tego wybierzemy 10–12). |
| **Pn 19.10 (−3)** | Fixy danych zmergowane i wdrożone. UTM + zdarzenia PostHog podpięte. Formularz zapisu na newsletter na web-b2c (lub landing w narzędziu newsletterowym). Odbiór wydruków. |
| **Wt 20.10 (−2)** | 4–6 wizyt (Stare Miasto / Święty Marcin) wg [SKRYPT-ROZMOWY.md](./SKRYPT-ROZMOWY.md) — liczą się do 15 rozmów tygodnia 1. Kontakt z ESN Poznań i samorządami studenckimi. |
| **Śr 21.10 (−1)** | 4–6 wizyt (Jeżyce). Wieczorem: selekcja 10–12 wydarzeń na 23–25.10, grafiki karuzeli, **testowa wysyłka newslettera** na własne adresy, sprawdzenie UTM-ów w PostHog. |
| **Czw 22.10 (dzień 1)** | 8:00 wydanie #1 + karuzela IG + TikTok. |

---

## 3. Harmonogram

### Tydzień 1 (czw 22.10 – śr 28.10) — słuchamy, nie sprzedajemy
- [ ] 15 rozmów z lokalami z [LISTA-50-POZNAN.md](./LISTA-50-POZNAN.md) wg [SKRYPT-ROZMOWY.md](./SKRYPT-ROZMOWY.md) — **zero pitchu** w pierwszych 10 minutach. Wliczamy wizyty z 20–21.10; reszta wt–śr 27–28.10 (Łazarz / MTP).
- [ ] Wydanie #1 newslettera i karuzela IG „Co robić w Poznaniu w ten weekend” (czw 22.10, 8:00). 10–12 wydarzeń, min. połowa z „długiego ogona”.
- [ ] Posty z wartością w 3–5 poznańskich grupach FB (odpowiedzi na „co robić w weekend?”, nie spam) — pt 23.10.
- [ ] Odpowiedź od ESN Poznań i samorządów studenckich: „robimy angielską wersję zestawienia dla Erasmusów — chcecie ją udostępniać?”.

### Tydzień 2 (czw 29.10 – śr 4.11) — pierwsi partnerzy
- [ ] Wydanie #2 (czw 29.10) — weekend Halloween / Wszystkich Świętych: celowo więcej imprez tematycznych i wydarzeń na sobotę 31.10, mniej na niedzielę 1.11. Pierwsze Reels (15–30 s) z jednego partnera.
- [ ] Kolejne 15 rozmów (razem 30) — wt–śr 3–4.11 (Wilda / Rataje + dobicie Starego Miasta).
- [ ] Z rozmów wybieramy 10–15 lokali z największym bólem → propozycja „Partner założyciel” ([ONE-PAGER-PL.md](./ONE-PAGER-PL.md)).
- [ ] Onboarding w modelu „robimy za Ciebie”: partner przysyła program (WhatsApp/e-mail/formularz), my wpisujemy. Cel: partnerzy widoczni już w wydaniu #3.

### Tydzień 3 (czw 5.11 – śr 11.11) — dowozimy wartość
- [ ] Wydanie #3 (czw 5.11). Pierwsze wydanie EN dla Erasmusów (jeśli ESN się zgodził).
- [ ] Każdy partner dostaje w poniedziałek 9.11 **raport**: wyświetlenia, kliknięcia „bilety/nawigacja”, wzmianki w newsletterze/IG.
- [ ] Rozmowy „po 2 tygodniach” z partnerami: co by było, gdybyśmy zniknęli? (miara wartości). Wizyty pn–wt 9–10.11 — **śr 11.11 to święto**, lokale zamknięte lub w trybie weekendowym.
- [ ] Test organiczny vs. płatny: 150–300 zł na promowanie 1–2 karuzel IG w promieniu Poznania (start pt 6.11) → koszt subskrybenta.

### Tydzień 4 (czw 12.11 – pt 20.11) — test płatności i decyzja
- [ ] Oferta płatna dla wszystkich partnerów (wysłana pn 9.11, żeby zdążyć do #4): **„Wyróżnienie w wydaniu weekendowym” — 49 zł** (lub 99 zł za pakiet: newsletter + story IG + góra listy na web). Faktura/przelew, bez Stripe. Wydanie #4 (12.11) i #5 (19.11) to dwa sloty na płatne wyróżnienia.
- [ ] Rozmowy cenowe o Pro: „Za 99 zł/mies. dostajesz X. Startujemy 1 stycznia 2027. Wchodzisz?” — zapisujemy odpowiedź, nie grzeczności. (Grudzień odpada: nie zdążymy z panelem B2B po decyzji 20.11, a lokale mają sezon świąteczny.)
- [ ] Wydanie #4 (12.11) i #5 (19.11), podsumowanie metryk pt 20.11, decyzja wg tabeli z §1.
- [ ] Aktualizacja `ROADMAP.md` (monetyzacja, kolejność miast, zakres B2B) na podstawie wyników — do wt 24.11.

---

## 4. Rytm tygodnia

| Dzień | Co |
|---|---|
| Pn | Raporty dla partnerów, zbieranie programów na weekend, przegląd metryk z poprzedniego tygodnia |
| Wt–Śr (14:00–17:00) | Wizyty w lokalach (poza godzinami szczytu) — 4–6 wizyt/dzień w jednej dzielnicy |
| Śr wieczór | Selekcja 10–12 wydarzeń na weekend, grafiki |
| Czw 8:00 | Newsletter + karuzela IG + TikTok |
| Pt | Stories „dziś wieczorem”, odpowiedzi w grupach FB |
| Nd | Notatki z rozmów → CRM, plan wizyt na kolejny tydzień |

Wizyty grupujemy dzielnicami: **Stare Miasto / Święty Marcin** (Pod Minogą, CK Zamek, Blue Note, Nowowiejskiego) → **Jeżyce** → **Łazarz / MTP** → **Wilda / Rataje**.

Kolejność w kalendarzu: 20.10 Stare Miasto · 21.10 Jeżyce · 27–28.10 Łazarz / MTP · 3–4.11 Wilda / Rataje + powroty · 9–10.11 rozmowy „po 2 tygodniach” z partnerami.

---

## 5. Budżet (do 20.11)

| Pozycja | PLN |
|---|---|
| Wydruki one-pagera i naklejki/ramki „Znajdziesz nas na Wydarzka” (50 szt.) | 200–300 |
| Kawa/zakupy przy wizytach | 150–250 |
| Promowane posty IG (test kosztu subskrybenta) | 150–300 |
| Narzędzia (newsletter, skracacz, arkusz) | 0 (darmowe plany) |
| **Razem** | **~500–850** |

---

## 6. CRM — kolumny arkusza

`Nazwa · Typ · Dzielnica · Osoba decyzyjna · Kontakt (tel/e-mail/IG) · Źródło kontaktu · Zgoda na kontakt handlowy (T/N, data) · Status (lista / rozmowa umówiona / rozmowa odbyta / partner / aktywny / płacący / odmowa) · Data rozmowy · Jak promują dziś · Wydatki na promocję/mies. · Największy ból (cytat) · Ocena bólu 1–5 · Wydarzeń/mies. · Następny krok + data · Notatki`

---

## 7. Zasady prawne i etyczne (do potwierdzenia z prawnikiem)

- **Zimne maile handlowe:** od listopada 2024 Prawo komunikacji elektronicznej wymaga uprzedniej zgody na marketing bezpośredni e-mailem i telefonicznie — także wobec firm. Dlatego pierwszy kontakt to **wizyta, DM lub prośba o rozmowę/opinię bez oferty**; ofertę wysyłamy po uzyskaniu zgody (zapisujemy ją w CRM). Sekwencja 4 zimnych e-maili z `MARKETING-B2B.md` wymaga przeglądu pod tym kątem.
- Newsletter: zgoda przy zapisie, link do wypisu, polityka prywatności na `wydarzka.dev/privacy`.
- Nie obiecujemy liczby użytkowników, której nie mamy. Pokazujemy realne liczby z raportów.

---

## 8. Czego NIE robimy do 20.11

- Nie budujemy Stripe, bloga, Pro-planów ani kolejnych miast.
- Nie wydajemy na reklamy instalacji aplikacji mobilnej.
- Nie obiecujemy „za darmo na zawsze” (patrz one-pager).
- Nie idziemy do dużych instytucji (Teatr Wielki, MTP) jako partnerów — mają widownię i dane już mamy z agregacji. Wyjątek: instytucje z dużą siecią małych wydarzeń (domy kultury, CK Zamek) jako źródło danych i kanał.
- Nie przesuwamy wydania #1 z 22.10, nawet jeśli dane nie są idealne — lepszy ręcznie poprawiony newsletter niż kolejny tydzień zwłoki.
