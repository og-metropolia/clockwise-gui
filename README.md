# Clockwise GUI

Ryhmän jäesenet: Adrian Gashi, Yamir Haque, Leo Härkönen

Clockwise on innovatiivinen mobiilisovellus, joka tuo työaikaseurannan nykyaikaan digitalisoimalla ja automatisoimalla perinteiset prosessit. Se minimoi inhimillisiä virheitä ja vapauttaa arvokasta aikaa, jonka yritykset voivat suunnata tuottavampaan työhön. Sovellus sisältää monipuoliset hallintatyökalut, jotka eivät ainoastaan tehosta työajan seurantaa vaan myös tarjoavat yksityiskohtaisen analyysin työajankäytöstä, auttaen näin yrityksiä optimoimaan resurssiensa käyttöä

## Kohderyhmä

Clockwise-mobiilisovellus on luotu palvelemaan pieniä ja keskisuuria yrityksiä, jotka kaipaavat dynaamista ja joustavaa työajan hallintaa. Sovelluksen käytön helppous ja kustannustehokkuus tekevät siitä ihanteellisen valinnan niille, jotka haluavat päästä eroon tarpeettomista hallinnollisista taakoista. Intuitiivinen käyttöliittymä mahdollistaa työaikojen ja poissaolojen nopean kirjaamisen, jolloin yritykset voivat keskittyä olennaiseen: ydinliiketoimintaansa.

Esimerkiksi logistiikka-alalla, missä ruokakuljetusyritykset kohtaavat haasteita työntekijöiden tuntien manuaalisen seurannan kanssa, Clockwise tarjoaa ratkaisun. Sen sijaan, että työntekijät ilmoittaisivat toteutuneita tunteja tekstiviestillä tai pikaviestisovelluksessa – menetelmä, joka on altis unohduksille ja virheille – Clockwise mahdollistaa työtuntien kirjaamisen heti niiden toteutuessa. Tämä järjestelmä paitsi säästää aikaa, myös poistaa epäselvyydet ja auttaa varmistamaan, että jokainen työtunti kirjataan oikein ja oikea-aikaisesti.

## Toiminnallisuudet

  - Työajan Leimaus: Työntekijät voivat leimata työaikansa mobiilisti, simuloimaan perinteisen leimauskortin käyttöä.
  - Poissaolojen Hallinta: Helppo tapa kirjata lomat, sairauspoissaolot ja muut poissaolot.
  - Raportointi ja Analytiikka: Automatisoitu raportointi työtunneista ja poissaoloista tiimi- ja yritystasolla.
  - Kutsujärjestelmä: Managerit voivat lähettää kutsuja uusille työntekijöille ja hallita tiimiään sovelluksessa.
  - Monikielisyys: Sovellus tukee useita kieliä, mahdollistaen monikulttuurisen käytön.
  - Käyttäjäprofiilien Hallinta: Mahdollisuus hallita henkilökohtaisia tietoja ja työhistoriaa.
  - Intuitiivinen Käyttöliittymä: Sujuva käyttäjäkokemus vähemmän teknisesti orientoituneillekin käyttäjille.
  - Reaaliaikainen Seuranta: Näe työntekijöiden status reaaliajassa, parantaen työn suunnittelua.

## Sovelluksen Käyttö

### Kokeile Sovellusta

Voit kokeilla Clockwise-sovellusta tästä linkistä: [Käyttöliittymän linkki] (Lisää linkki tähän)

## Käyttöliittymän Kuvakaappaukset

### Kirjautumisnäkymä
![Login Screen](./images/login.png)
*Kirjautumisnäkymä, jossa käyttäjät voivat kirjautua sisään.*

### Rekisteröintinäkymä
![Signup Screen](./images/signup.png)
*Rekisteröintinäkymä uusille käyttäjille.*

### Salasanan Palautus
![Reset Password](./images/reset-password.png)
*Salasanan palautusnäkymä unohtuneita salasanoja varten.*

### Dashboard
![Dashboard](./images/dashboard.png)
*Käyttäjän dashboard, josta voi leimata itsensä sisään ja ulos, sekä näkee päivittäiset aktiviteetit ja työajan kirjaukset.*

### Raportit
![Report](./images/report.png)
*Raporttinäkymä, joka näyttää työtunnit ja mahdolliset ylityöt.*

### Lomat ja Poissaolot
![Vacation](./images/vacation.png)
*Lomien ja poissaolojen merkintäsivu.*

### Asetukset
![Settings](./images/settings.png)
*Asetussivu, jossa käyttäjät voivat muokata omia tietojaan.*

## Paikallinen Kehitys

Jos haluat kehittää sovellusta paikallisesti, noudata seuraavia ohjeita:

1. Kloonaa repositorio paikalliselle koneellesi.
2. Asenna pnpm käymällä osoitteessa [pnpm installation](https://pnpm.io/installation).
3. Suorita `pnpm install` asentaaksesi riippuvuudet.
4. Käynnistä paikallinen palvelin suorittamalla `pnpm run dev`.

## API

Clockwise-sovelluksen GraphQL API löytyy osoitteesta [og-metropolia/clockwise-api](https://github.com/og-metropolia/clockwise-api).

## Testausohjeet

Tässä ovat yksityiskohtaiset ja selkeät ohjeet kolmelle roolille: Admin, Manager ja Työntekijä, mobiilisovelluksen testaamiseen:

### Admin

- **Kirjaudu sisään Adminina.**
  - Käytä admin-käyttäjätunnuksiasi kirjautuaksesi sovellukseen mobiililaitteellasi.
- **Yrityksen ja Managerin Luominen.**
  - Navigoi sovelluksen alaosan keskimmäisestä valikosta "Create company" -välilehdelle.
  - Täytä vaaditut tiedot yrityksen ja managerin käyttäjätunnuksen luomiseksi.
- **Adminin Asetusten Muuttaminen.**
  - Siirry footerin oikeassa alakulmassa sijaitsevaan "Settings" -välilehteen.
  - Tässä osiossa voit muokata admin-käyttäjän asetuksia. 

### Manager

- **Kirjaudutaan sisään Managerina.**
  - Käytä manager-käyttäjätunnuksiasi kirjautuaksesi sovellukseen.
- **Navigoi asetuksiin.**
  - Siirry sovelluksen oikeasta alakulmasta "Settings"-kohtaan, joka löytyy ukko-ikonin kautta.
- **Kutsulinkin lähetys.**
  - Kopioi "Invite to company" -linkki oikeasta alakulmasta.
  - Lähetä kutsulinkki Työntekijälle sähköpostitse tai muulla viestintäkanavalla.
- **Muuta Managerin tietoja.**
  - Tässä näkymässä voit muuttaa Managerin henkilökohtaisia tietoja ja sovelluksen kieltä.

### Työntekijä

- **Luo käyttäjätunnus.**
  - Avaa Managerin lähettämä linkki mobiililaitteellasi ja luo käyttäjätunnus.
- **Kirjaudu sisään ja testaa toimintoja.**
  - **Time Log:** Kirjauduttuasi sisään, kokeile "Check In" ja "Check Out" -leimausta.
  - **Report:** Siirry footerista "Report"-välilehteen ja katso toteutuneita työtunteja.
  - **Poissaolot:** Siirry seuraavaan välilehteen footerissa, muokkaa poissaoloja valitsemalla ajanjakso ja syy, ja tallenna. Voit valita ajanjakson syöttämällä päivämäärät tai käyttämällä kalenteria.
  - **Asetukset:** Navigoi "Settings"-kohtaan, muuta käyttäjätietoja tai sovelluksen kieltä ja päivitä asetukset.

### Managerin seurantatoiminnot

- **Tarkastele toteutuneita tunteja.**
  - Siirry footerin navigointipalkista "Management"-välilehdelle.
  - Valitse työntekijä nähdäksesi hänen kirjaamansa työtunnit.

Testatessa keskittykää erityisesti käyttöliittymän sujuvuuteen ja toiminnallisuuteen mobiililaitteilla, dokumentoikaa kaikki havainnot, ja antakaa yksityiskohtaista palautetta kehittäjille.

## Anna Palautetta

Kutakin tiimiä pyydetään antamaan yksi yhteinen palaute. Muistathan, että formin luojalle näkyy, kuka on vastannut. Käytä alla olevaa linkkiä palautteen antamiseen. Kiitos panoksestanne!

[Palautelomake](https://forms.office.com/Pages/DesignPageV2.aspx?prevorigin=shell&origin=NeoPortalPage&subpage=design&id=12EaTaW2ZE-Hh_B0-HAT7vL9n9KAjfBFlFvZ30PlTgVUQ1VBVjBSUDUwVkU3S00xUE8yQlRDN1NKUy4u&analysis=false)

