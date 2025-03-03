Potrzebne: 
- Java 23
- Docker
- Maven

Uruchomienie aplikacji: 
1. Sklonuj repozytorium
2. W głównym katalogu projektu uruchom komendę `docker-compose up` co powinno utworzyć kontener z bazą danych. Ewentualnie można uruchomić bazę danych postgres lokalnie na porcie 5432.
3. Następnie zainstaluj zależności Maven komendą `mvn install`
4. Uruchom aplikację komendą `mvn spring-boot:run`

Aplikacja Spring działa na porcie 8080, a baza danych na porcie 5432.
Teraz możesz korzystać z API i odpalić aplikacje frontendową.