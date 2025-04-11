## SmartCalendar
SmartCalendar är en kalenderapplikation utformad för att hjälpa användare att hantera sina händelser och scheman på ett effektivt sätt.

Versionen av koden som har lämnats för granskning är taggad som v1.0-review. För att ladda ner och använda denna version:

1. Gå till projektets GitHub-sida: https://github.com/slidecart/G19SmartCalender.

2. Klicka på fliken "Releases" eller "Tags" och hitta taggen v1.0-review.
3. Klicka på "Download ZIP" under v1.0-review för att ladda ner källkoden som en ZIP-fil.

4. Extrahera ZIP-filen till en mapp på din dator.

5. Öppna projektet i din IDE:
  - IntelliJ IDEA: Välj "Open" och navigera till den extraherade mappen.
  - VS Code: Välj "Open Folder" och välj den extraherade mappen.

## Starta applikationen
**Backend**

Backend är en Spring Boot-applikation byggd med Maven och startas via klassen AppApplication. För att köra den krävs:

- Java 17 (eller den version som anges i pom.xml).
- Maven (installerat på din dator eller via din IDE:s inbyggda stöd).
- Docker (installerat på din dator). Det går att starta programmet utan docker men det kommer uppstå 2 errors och vissa funktioner kommer inte fungera. Se README.md filen i backend/backend/app för mer information om detta.


**Steg i IntelliJ IDEA**
1. Öppna projektet i IntelliJ IDEA genom att välja den extraherade mappen.
2. Vänta tills IntelliJ har indexerat projektet och laddat ner Maven-beroenden (detta sker automatiskt om Maven är aktiverat).
3. Starta Docker och kör följande kommando i backend/backend/app i IntelliJ IDEA terminalen eller utanför för att starta email-servern:
   `docker-compose up`
4. Hitta filen `AppApplication.java` i backend/backend/app/src/main/java/com.smartcalender.app/AppApplication.java
5. Högerklicka på `AppApplication.java` och välj "Run 'AppApplication.main()'".
6. Backend startar och körs på port 8080 ifall man vill testa detta på webbläsaren eller i exempelvis programmet Postman.

**Steg i VS Code**
1. Öppna projektet i VS Code genom att välja den extraherade mappen.
2. Installera rekommenderade tillägg som "Java Extension Pack" och "Spring Boot Extension Pack" om du inte redan har dem.
3. Starta Docker och kör följande kommando i backend/backend/app i VS Code terminalen eller utanför för att starta email-servern:
   `docker-compose up`
4. Öppna en terminal i VS Code (Terminal > New Terminal).
5. Navigera till rotmappen (om du inte redan är där) och kör:
  `mvn clean install`
  `mvn spring-boot:run`
6. Backend startar och körs på port 8080.

**Frontend**
Frontend är byggd med Create React App, en verktygslåda för React-applikationer som använder Node.js och npm. För att köra den krävs:
- Node.js (rekommenderas version 16 eller senare) och npm (ingår med Node.js). Ladda ner från nodejs.org om det inte är installerat.

**Steg i IntelliJ IDEA**
1. Öppna en terminal i IntelliJ (View > Tool Windows > Terminal).
2. Navigera till frontend-mappen:
  `cd frontend`
3. Installera beroenden:
   `npm install`
4. Starta frontend:
   `npm start`
5. Frontend startar på port 3000 och öppnas automatiskt i din webbläsare på http://localhost:3000.

**Steg i VS Code**
1. Öppna projektet i VS Code och navigera till frontend-mappen i filutforskaren.
2. Öppna en terminal (Terminal > New Terminal).
3. Kontrollera att du är i frontend-mappen (annars: cd frontend).
4. Installera beroenden:
   `npm install`
5. Starta frontend:
   `npm start`
6. Frontend startar på port 3000 och öppnas automatiskt i din webbläsare på http://localhost:3000.

7. ## Ytterligare information
- Backend: Applikationen använder en extern PostgreSQL-databas vilket kan orsaka problem för externa aktörer som försöker använda funktioner kopplat till datan i databasen.
  
- Frontend: I dagsläget är funktionaliteten begränsad, men applikationen startar utan problem och visar en grundläggande vy.

- Portar: Se till att portarna 8080 (backend) och 3000 (frontend) är lediga på din dator.

- IDE-inställningar: Om du stöter på problem, kontrollera att din IDE har rätt Java- och Node.js-versioner konfigurerade i inställningarna.


