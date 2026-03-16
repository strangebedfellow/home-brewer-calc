# Home Brewer Calculator

Nowoczesna wersja kalkulatora dla piwowarów domowych oparta o Next.js i Tailwind CSS.

## Co zostało zmienione

- Migracja z Webpack + React 16 do Next.js (App Router)
- Zamiana komponentów klasowych na komponenty funkcyjne z `useState`
- Przeniesienie wzorów do warstwy `src/lib` (bez zmiany logiki obliczeń)
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

Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

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

- `src/app` - layout, strona główna, style globalne
- `src/components` - komponenty UI i kalkulatory
- `src/lib` - funkcje konwersji i wzory