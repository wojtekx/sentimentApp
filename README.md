# Sentiment Analysis App

## Opis projektu

Sentiment Analysis App to aplikacja frontendowa, która pozwala użytkownikowi analizować sentyment wpisanego tekstu. Wykorzystuje ona Hugging Face Inference API do przetwarzania tekstu i określania, czy jego tonacja jest pozytywna czy negatywna.

## Instrukcja uruchomienia

### Aby uruchomić projekt, potrzebujesz:

- Node.js
- NPM lub Yarn
- Klucz API z Hugging Face Inference API

## Instalacja i uruchomienie

### Sklonuj repozytorium:

git clone https://github.com/wojtekx/sentimentApp.git
cd sentiment-app

### Zainstaluj zależności:

npm install

### Skonfiguruj klucz API:

Utwórz plik .env w katalogu głównym projektu.

W ustawieniach konta uzyskaj darmowy Access Token (zakładka “Settings” → “Access Tokens”).

Dodaj do niego swój klucz API:
REACT_APP_API_KEY=twój-klucz-api

### Uruchom aplikację:

npm start

### Aplikacja będzie dostępna pod adresem: http://localhost:3000

## Technologie

- React + TypeScript – główny framework do budowy interfejsu użytkownika.
- CSS – do stylowania aplikacji.
- Hugging Face Inference API – do analizy sentymentu.
- ESLint + Prettier – do zapewnienia jakości kodu.
- Husky – do automatycznego uruchamiania linta przed commitami.

### Wyzwania podczas realizacji:

- Testy jednostkowe - Największym wyzwaniem było testowanie komponentów związanych z zapytaniami do API.
- Integracja z Hugging Face API - API zwraca wynik jako tablicę prawdopodobieństw dla różnych kategorii sentymentu. Trzeba było obsłużyć to w kodzie i poprawnie przypisać odpowiednie wartości.
- Konfiguracja narzędzia husky
