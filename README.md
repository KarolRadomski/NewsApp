# NewsApp

NewsApp to serwis informacyjny z wbudowanym systemem CMS dla administratora. Backend aplikacji został wykonany przy użyciu Node.js oraz frameworka Express.js. Jako baza danych zostało użyte MongoDB obsługiwane za pomocą biblioteki Mongoose. Frontend został przygotowany w React.js. Dla poprawienia czytelności i wygody zarządania danymi wewnątrz aplikacji zastosowany został Redux wraz z Redux Toolkit.

## Funkcjonalności

- System CMS dla administracji umożliwiający dodawanie, usuwanie oraz edycję wiadomości. Dzięki implementacji edytora Rich Text umożliwiającego dodawanie formatowania autor może udekorować finalny artykuł. Przycisk "Login" w nagłówku strony jest tam tylko dla wygody osoby przeglądającej projekt.
- Pełna responsywność na wszystkich urządzeniach. Dla mniejszych rozdzielczości po zalogowaniu się do panelu administratora (większa ilość przycisków) standardowe menu zamienia się w menu rozwijane. Układ strony głównej również w pełni dopasowuje się do rozdzielczości urządzenia na którym aplikacja jest wyświetlana.
- Inteligentne formatowanie strony głównej powoduje zmianę struktury w zależności od ilości wiadomości do wyświetlenia.
- Filtrowanie wiadomości po kategoriach
- Możliwość komentowania wpisów oraz oceniania komentarzy przez użytkowników bez konieczności logowania. Dodane zostały także zabezpieczenia przed kilkukrotnym ocenieniem tego samego komentarza przez jednego użytkownika. Po zalogowaniu jako administrator istnieje możliwość moderowania komentarzy.

## Demo

Aplikacja dostępna jest pod adresem: https://newsappradomski.herokuapp.com

- Dostęp do panelu administratora:
  E-mail: karol@gmail.com
  Hasło: 123456

## Instalacja

Aby uruchomić projekt na serwerze lokalnym należy zainstalować wszystkie zależności za pomocą npm.
`# Backend `
`npm install`

`# Frontend`
`cd frontend`
`npm install`

Uruchomienie aplikacji
`npm run server`
`npm run client`

Aplikacja do poprawnego działania potrzebuje pliku .env o polach:
`NODE_ENV = development`
`PORT = 5000`
`MONGO_URI = <URI bazy danych podane na stronie MongoDB>`
`JWT_SECRET = <dowolny ciąg znaków>`
