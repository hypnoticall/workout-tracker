# 💪 FitLog – Osobni Trening Dnevnik

## 1. Opis projekta

### Što aplikacija rješava?

FitLog je web aplikacija namijenjena svima koji redovito vježbaju i žele pratiti svoj napredak na strukturiran i pregledan način. Osnovna ideja je jednostavna: kada osoba trenira, rijetko pamti koliko je kilogramima dizala prošli tjedan, koliko serija je napravila ili kako se razvijala njezina snaga kroz nekoliko mjeseci. Bilježnice i excel tablice su nepraktične, a većina aplikacija za trening su komplicirane, prevelike ili zahtijevaju pretplatu.

FitLog rješava upravo taj problem – daje korisniku čist, brz i besplatan digitalni dnevnik treninga koji radi na svim uređajima. Korisnik dolazi na aplikaciju, prijavi se, i za manje od minute može zabilježiti cijeli trening: koje vježbe je radio, koliko serija, koliko ponavljanja i s kojom težinom.

### Tko su korisnici?

Primarna ciljana skupina su **rekreativni vježbači** – studenti, radnici, sportaši amateri koji idu u teretanu jednom do tri puta tjedno i žele pratiti napredak bez kompliciranih alata. Sekundarna skupina su **osobni treneri** koji bi mogli koristiti administratorski prikaz za praćenje više klijenata odjednom (naprednija mogućnost).

### Zašto ova tematika?

Tjelesna aktivnost i zdravlje su iznimno aktualne teme, posebno među mladima. Postoji jasna potreba za jednostavnim alatom koji nije preplavljeno reklamama ni iza paywall-a. Tehnički, projekt je idealan za ovaj predmet jer prirodno uključuje sve ključne koncepte: autentifikaciju korisnika, CRUD operacije nad Firestore bazom, reaktivnost korisničkog sučelja kroz SolidJS i responzivni dizajn. Svaki trening je zapis u bazi, svaka vježba je pod-kolekcija – što daje dobru strukturu podataka za učenje.

Osobno, tematika je motivirajuća jer je praktično upotrebljiva u svakodnevnom životu – aplikacija koju bi i sam autor koristio.

---

## 2. Tablica funkcionalnosti

### ✅ Osnovne mogućnosti (MVP)

| # | Funkcionalnost | Opis |
|---|---------------|------|
| 1 | Registracija i prijava | Email/lozinka putem Firebase Auth |
| 2 | Odjava i oporavak zaporke | Reset putem emaila |
| 3 | Korisnički profil | Prikaz i uređivanje imena, avatara |
| 4 | Kreiranje treninga | Naziv, datum, trajanje, bilješka |
| 5 | Dodavanje vježbi u trening | Naziv vježbe, broj serija, ponavljanja, težina (kg) |
| 6 | Pregled liste treninga | Kronološki popis svih prošlih treninga |
| 7 | Detalji treninga | Prikaz svih vježbi unutar jednog treninga |
| 8 | Uređivanje treninga | Mijenjanje podataka o treningu i vježbama |
| 9 | Brisanje treninga | Uklanjanje cijelog treninga iz baze |
| 10 | Responzivni dizajn | Funkcionalno na mobitelu i desktopu |
| 11 | Firebase Hosting | Javno dostupna aplikacija online |

### ⭐ Napredne mogućnosti (ako ostane vremena)

| # | Funkcionalnost | Opis |
|---|---------------|------|
| 12 | Grafički prikaz napretka | Linijski graf težine po vježbi kroz vrijeme |
| 13 | Predlošci treninga | Mogućnost kopiranja prošlog treninga kao template |
| 14 | Knjižnica vježbi | Globalna lista vježbi s opisom i muscle group tagom |
| 15 | Admin panel | Pregled svih korisnika i njihove aktivnosti |
| 16 | Pretraga i filtriranje | Filtriranje treninga po datumu ili vježbi |
| 17 | Tjedni/mjesečni sažetak | Statistike: ukupno treninga, volumena, najaktivniji dan |

---

## 3. Scenarij korištenja (korisnički tijekovi)

### 👤 Scenarij A – Novi korisnik

```
1. Korisnik otvara aplikaciju → prikazuje se Landing stranica
2. Klikne "Registracija" → ispunjava email i lozinku
3. Firebase Auth kreira račun → korisnik je automatski prijavljen
4. Preusmjeren na stranicu "Moj profil" → unosi ime i sprema
5. Odlazi na "Dashboard" → vidi praznu listu treninga i gumb "Novi trening"
```

### 🏋️ Scenarij B – Bilježenje treninga

```
1. Prijavljeni korisnik klikne "Novi trening"
2. Unosi naziv (npr. "Noge - ponedjeljak"), datum i trajanje
3. Klikne "Dodaj vježbu" → unosi naziv, serije, ponavljanja, kg
4. Dodaje još vježbi po potrebi
5. Klikne "Spremi trening" → trening se zapisuje u Firestore
6. Vraća se na Dashboard, novi trening je vidljiv na vrhu liste
```

### 📋 Scenarij C – Pregled prošlog treninga

```
1. Korisnik na Dashboardu vidi listu treninga s datumima
2. Klikne na jedan trening → otvara se detaljni prikaz
3. Vidi sve vježbe, serije, ponavljanja i težine
4. Ima opcije: "Uredi" ili "Obriši"
5. Klikom na "Uredi" može mijenjati podatke i ponovo spremiti
```

### 🔑 Scenarij D – Zaboravljena lozinka

```
1. Korisnik na Login stranici klikne "Zaboravili ste lozinku?"
2. Unosi email adresu
3. Firebase šalje reset email
4. Korisnik klikne link u emailu → postavlja novu lozinku
5. Prijavljuje se s novom lozinkom
```

---

## 4. Struktura Firestore baze podataka

```
users/
  {userId}/
    displayName: string
    email: string
    createdAt: timestamp
    role: "user" | "admin"

workouts/
  {workoutId}/
    userId: string          ← vlasnik treninga
    title: string
    date: timestamp
    durationMinutes: number
    notes: string
    createdAt: timestamp
    
    exercises/              ← pod-kolekcija
      {exerciseId}/
        name: string
        sets: number
        reps: number
        weightKg: number
        order: number
```

---

## 5. Vizualni prototip

Prototip aplikacije dostupan je kao statična HTML stranica u datoteci **`prototype.html`** u repozitoriju.

Prikazane stranice:
- 🔐 Login / Registracija
- 🏠 Dashboard (lista treninga)
- ➕ Forma za novi trening
- 📄 Detalji treninga

---

## 6. Tehnički stack

| Tehnologija | Uloga |
|-------------|-------|
| **SolidJS** | Frontend framework (reaktivnost, routing) |
| **TailwindCSS** | Utility-first CSS stilizacija |
| **DaisyUI** | Komponente (kartice, forme, navigacija) |
| **Firebase Auth** | Autentifikacija korisnika |
| **Firestore** | NoSQL baza podataka u realnom vremenu |
| **Firebase Hosting** | Javno objavljivanje aplikacije |
| **GitHub** | Verzioniranje koda |

---

## 7. Status projekta

| Faza | Status |
|------|--------|
| Faza 1 – Planiranje i dokumentacija | ✅ Završeno |
| Faza 2 – Postavljanje i autentifikacija | 🔲 U tijeku |
| Faza 3 – Implementacija i hosting | 🔲 Nije počelo |
| Završna – Prezentacija | 🔲 Nije počelo |

---

*Autor: [Ime i prezime] | Školska godina: 2025./2026.*