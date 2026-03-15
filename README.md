# Home Brewer Calculator

Nowoczesna wersja kalkulatora dla piwowarow domowych oparta o Next.js i Tailwind CSS.

## Co zostalo zmienione

- Migracja z Webpack + React 16 do Next.js (App Router)
- Zamiana komponentow klasowych na komponenty funkcyjne z `useState`
- Przeniesienie wzorow do warstwy `src/lib` (bez zmiany logiki obliczen)
- Wymiana Bootstrap + SCSS na Tailwind CSS
- Nowy, bardziej nowoczesny layout i lepsza struktura kodu

## Stack

- Next.js (latest)
- React (latest)
- Tailwind CSS (latest)

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja bedzie dostepna pod adresem `http://localhost:3000`.

## Produkcja

```bash
npm run build
npm start
```

## Testy

```bash
npm run test
```

## Struktura

- `src/app` - layout, strona glowna, style globalne
- `src/components` - komponenty UI i kalkulatory
- `src/lib` - funkcje konwersji i wzory