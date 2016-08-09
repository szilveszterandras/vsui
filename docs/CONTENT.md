# A modern front-end fejlesztő eszköztára

## Bevezető

Nehéz elképzelni a modern világot internet nélkül, és az is egyértelmű, hogy ez a jövőben sem lesz másképp. Az internet által biztosított globális hálózat kilépett a luxus kategóriából és mára jóformán alapvető emberi szükségletté vált, ennek megszakítása világméretű katasztrófát eredményezne, úgyhogy bizton állíthatjuk, hogy a világháló ugyanúgy a jövő alapköve, mint a kerék vagy az elektromosság. Ezt a trendet a számítógépeink is követik, és abban a környezetben, amelyben jóformán minden eszköznek van internet-elérése - a szervereinknek, laptopjainknak, telefonjainknak de még az otthoni vízmelegítőinknek is - az egyszerű program helyét átvette a web-alkalmazás.

Minden web-alkalmazás alapvetően egy osztott rendszer, hiszen meghatározásából adódóan legalább két számítógépet vesz igénybe. A leggyakoribb szervezési elv egy ilyen rendszer kezelésére a szerver-kliens architektúra, ahol a kliens program több példánya csatlakozhat a szerver program egy példányához. Ebben a meghatározásban eltekintek a szerverparkok esetétől, hiszen a kliens nézőpontjából egy példányként viselkednek, és figyelmen kívül hagyom az úgynevezett peer-to-peer rendszereket. A két komponensnek különböző jellemzői vannak: a szerver felelős az információ központosításáért és biztonságos tárolásáért, ezért egy felügyelt környezetben fut, ahol nem hozzáértő személyek nem férhetnek hozzá. Mivel minden kliens kapcsolata a rendszerhez a szerveren keresztül történik, ennek a lehető legoptimálisabbnak kell lennie, ezért általában speciális, nagy teljesítményű, magas sávszélességet biztosító hardveren fut. Ezzel szemben a kliens komponens hozzáférhető külső személyek által, ezért egyedül a szerverrel létesít kapcsolatot és nem felel az információ biztonságáért. Mivel nem felügyelt környezetben fut, rugalmasabbnak kell lennie a szervernél a futási környezet szempontjából.

Nem minden program fog minden számítógépen futni, ez függ a számítógép architektúrájától, operációs rendszertől, a programban használt technológiától, stb. A szerver esetében ez nem probléma, mivel az egy kontrollált környezetben fut, a kliens kapcsán azonban egy komoly kihívást jelent. Alkalmazásaink számára érdemes olyan technológiát választani, amelyhez biztosítva van egy futási környezet a lehető legtöbb célfelhasználó esetén. Ilyen népszerű technológiák a .NET, a Microsoft csomagja, amely az igen elterjedt Windows PC-khez kötött, a Java, amelynek legfőbb célja a lehető legtöbb architektúra támogatása, és ne feletkezzünk meg az egyre népszerűbb Android és IOS rendszerekről sem. A legnépszerűbb futási környezet azonban az elsőre meglepő lehetőség: a böngésző.

Elsőre nem intuitív a web-böngészőt futási környezetként kezelni, de minden weboldal egy alkalmazás, amelyet egy vagy több fejlesztő készített egy technológia segítségével, amelyet a böngésző képes futtatni. Ez a dolgozat erről a böngésző által használt technológiáról szól.

## Áttekintés

Bármilyen hálózatban szükség van egy protokollra, amelyen a résztvevő felek egyetértenek. Azon számítógépek, amelyek nem ismerik vagy nem tartják tiszteletben a közös protokollt, nem képesek részt venni a kommunikációban. A web-böngésző sikere annak köszönhető, hogy egy egységes környezetet biztosít egymással kommunikáló számítógépek számára, ezzel lehetővé téve olyan programok fejlesztését, amelyek egy széles közönség számára elérhetőek. Bárki, aki rendelkezik egy böngészővel képes bármilyen, a böngésző környezetét használó alkalmazást futtatni. Ezen programokat sokáig weboldalaknak neveztük, azonban a technológia fejlődésével egyre komplexebb programokat hozunk létre, így mára a webalkalmazás kifejezés jobban írja le a valóságot. A szerver-kliens architektúrában a “front-end” kifejezés is használt, jelölve, hogy a kliens komponensről beszélünk.

Webalkalmazások készítéséhez több programnyelvet használhatunk:
HTML - Úgynevezett jelölőnyelv (markup languange), hasonló az XML-hez, a böngésző az állományainkba iktatott címkéket (tag) értelmezi, ezek segítségével jeleníti meg az állomány tartalmát.
CSS - Stílusleíró nyelv, szoros kapcsolatban áll a HTML-el, a böngészőbe betöltött struktúrált tartalom formázását teszi lehetővé.
Javascript - Szkript alapú programozási nyelv, a böngésző környezetében futtatható, lehetővé teszi a dinamikus web-alkalmazások létrehozását.

A fenti három nyelv alkotja a böngésző technológiáját. A böngésző képes más nyelveket is értelmezni, például XML-t, de a modern front-end fejlesztésben a HTML/CSS/JS az alapvető technológia. A három komponens szerepeit így foglalhatjuk össze: HTML írja le az alkalmazás tartalmát, CSS a kinézetét, JS a viselkedését.  A HTML és CSS leíró nyelvek, ezért statikus tartalom létrehozására használhatók, míg a Javascript teszi lehetővé a komplex, dinamikus alkalmazások készítését, ezért ebben a dolgozatban az utóbbira koncentrálok.

## Történelem

### Kezdetek

Számítógépes hálózatok több mint 50 éve léteznek, azonban az úgynevezett világháló (World Wide Web) kezdete 1990-re vezethető vissza, amikor Tim Berners-Lee, a CERN mérnöke elkészítette a világ első böngészőjét illetve web-szerverét azzal a céllal, hogy a szervezet által használt számítógépes dokumentumokat könnyen elérhetővé tegye. A kettő közötti kommunikációhoz egy, az előző évben általa megtervezett protokollt használt, amely a már létező, a CERN által használt SMGL nyelven alapult. A protokollt HTML-nek (Hypertext Markup Language) nevezte, és újdonsága a link (hyperlink) volt, amely lehetővé tette a dokumentumok közötti navigációt. [A világ első weboldala](http://info.cern.ch/hypertext/WWW/TheProject.html), HTML-ben írva ma is elérhető.

Tim Berners-Lee 1994-ben megalapította a W3C (World Wide Web Consortium) szervezetet, amelyet máig vezet, és amelynek célja a web technológiák egységesítése. A HTML fejlődése során többféle specifikáció és implementáció született, azonban 1996-tól kezdve a W3C kezeli a standardot.

A CSS (Cascading StyleSheets) nyelvet először 1994-ben javasolta  Håkon Wium Lie, és 1996-ban vált W3C standarddá.

A Javascript első változata a Netscape Navigator 2.0 böngészővel került piacra, 1995-ben. A cég ugyanebben az időszakban tette elérhetővé az új Java nyelvet a böngészőben, és szerettek volna egy egyszerűbb szkript nyelvet is beépíteni, hasonló szintaxissal. Több versengő ötlet miatt egy gyors prototípusra volt szükség, és Brendan Eich 10 nap alatt készítette el a Javascript első verzióját. Az elnevezés nem volt túl szerencsés, hiszen a nyelvnek a szintaxis hasonlóságán kívül nincs köze a Java-hoz.
A Microsoft, korábbi próbálkozások (VBScript, JScript) után adoptálta a Javascript technológiát, és ez részét képezte az Internet Explorer 3 böngészőnek. Az első standard, amely a Javascriptet magába foglalta, az 1997-ben megjelent ECMAScript standard volt.

### Böngésző háború:

Az 1994-ben megjelent Netscape Navigator volt az első széles körben elterjedt web-böngésző, népszerűsége számos hozzájárulást eredményezett a World Wide Web kezdeti, innovációs szakaszában. A 2.0 verziótól elérhető Javascript nevű szkript-nyelv szintén népszerűvé vált a weboldalak készítői körében.

A Microsoft saját böngészője, az először 1995-ben kiadott Internet Explorer sokáig nem volt versenytárs piaci részesedés szempontjából, többek között a Netscape technológiákat használó weboldalak megfelelő kezelésének hiányában. A probléma megoldására a Microsoft beleépítette a nyelv saját változatát a 3.0-s verzióba, illetve a Windows operációs rendszerrel együtt kezdte szállítani a szoftvert. Az évtized végére piaci verseny alakult ki a két cég között.

A webtechnológák egységességének hiánya miatt a két böngésző eltérően értelmezte a kért tartalmat, ez leginkább a Javascript implementációkban mutatkozott meg. Ennek eredményeként a weboldalak készítői kénytelenek voltak egyik böngészőre optimizálni a munkájukat, vagy megpróbálni mindkét verzióban megfelelően működő kódot írni, amely extra erőfeszítést jelentett. A Javascript standardizálását a Netscape kezdeményezte az ECMAScript standard bevezetésével, azonban a rivális Internet Explorer ezt sokáig nem követte.

A kétezres évek elejére az Internet Explorer átvette a vezetést a böngésző versenyben, a Netscape részesedésre 2002-től 2007-ig, az utolsó verzióig minimális maradt. A Microsofttól független ECMA továbbfejlesztette az ECMAScript standardot, a második verzió 1998-ban, a harmadig 1999-ben, míg az 5. 2009-ben jelent meg. Az Internet Explorer nem tett nagyobb igyekezetet ezen standardok követésében, és egyedül uralta a böngésző piacot egészen a 2004-ben megjelent, de sokáig sikertelen Mozilla Firefox, majd a 2008-as Google Chrome megjelenéséig. Mindkét új böngésző hangsúlyt fektetett az ECMAScript standardok betartására, ezzel kényszerítve a Microsoftot, hogy az Internet Explorer 8. verziójától kezdve kövesse a példát.

### A félreértett nyelv

A kompatibilitási problémák mellett a Javacript nyelvet más tulajdonságai miatt is átlag alatti nyelvnek tekintették programozói körökben.

Kezdetként, a név: a Java előtag azt érzékelteti, hogy kapcsolatban áll a Java nyelvvel, annak egy kevésbé alkalmas változata. A szintaxis hasonló a Java-éhoz, pont annyira, mint a Java-é a C-hez. Ennek ellenére a Java-nak nincs köze a C-hez, hasonlóképpen a Javascript-nek sem a Javahoz. A Script utótag azt a benyomást kelti, hogy nem egy teljes programozási nyelv, “csak” egy szkript-nyelv.

A C és Java-jellegű szintaxis, a kapcsos zárójelek, for ciklusok azt sugallják, hogy procedurális nyelv, pedig több közös tulajdonsága van funkcionális nyelvekkel, int a Lisp vagy Scheme, például elsőosztályú függvények és lambda kifejezések. A Javascript dinamikus, interpretált nyelv, erős kifejező erővel, ezért funkcionális nyelvként is használható, ugyanakkor alkalmas egy inkább obiektum-orientált stílus esetében is.

A nyelvet a Netscape fejlesztette ki a Navigator számára, és sikere miatt alapvető technológiává vált minden azt követő böngészőben. Modern verziók a böngészőn kívül is használhatók, ennek ellenére a köztudatban még mindig a böngésző nyelveként ismert.

Egy programozási nyelv sem tökéletes, és a Javascript tervezésében is követtek el hibákat. A nyelv kezdeti funkciói hagytak kívánni valót maguk után, és bár a későbbi verziók bővítettek a lehetőségeken, sok alapvető problémát a későbbi verziókban sem orvosoltak. Ehhez hozzájárulnak a sokszor hibás, nem megfelelő kezdeti implementációk, amelyek egy rossz nyelv benyomását keltették.

A nyelv standardizálására tett kezdeti erőfeszítések nem hozták meg a kívánt hatást, egyrészt maguk az ECMA standardok sok esetben hagytak kívánni valót maguk után, másrészt sok esetben a böngészők sem tisztelték a létező dokumentumokat.

A nyelv szándékos egyszerűsége és kifejező ereje azt eredményezte, hogy a fejlesztők kevés programozói ismerettel is hasznos kódot írhattak, ezért sok felhaszáló “amatőr”-nek számított, kiterjedt programozói ismeretek nélkül. Ez rossz benyomást keltett a procerdurális nyelveket használó programozók körében, ez a stigma a mai napig jelen van a fejlesztői körökben.

### Alternatív technológiák

A fent említett problémák orvoslására több szoftver cég is alternatív, a böngészőben használható technológia fejlesztését kezdeményezte. A három legnagyobb ilyen próbálkozás a Macromedia/Adobe Flash, Microsoft Silverlight és a Java Applet. Közös tulajdonságuk, hogy gazdag internet alkalmazások (RIA, Rich Internet Application) fejlesztésére alkalmasak, és a böngészőbe épülő plug-in segítségével kapcsolódnak a kívánt webalkalmazáshoz. Hátrányuk a böngészőtől való elkülönülés, a Javascripttel - amely a böngészővel és a HTML/CSS nyelvekkel szoros kapcsolatban fejlődött - szemben nehézkes a weboldalakkal való integráció. Ennek ellenére ezek a keretrendszerek nagy népszerűségre tettek szert, mert lehetővé tették olyan online tartalom kezelését, amelyre a standard front-end technológia nem volt képes, például videók vagy játékok készítését. Az újabb ECMAScript standardok és jobb böngésző-támogatottság miatt egyre kevesebb olyan funkció van, amelyet a modern front-end technológia ne tudna ellátni, így ezek a kiegészítő rendszerek kiszorulni tűnnek a piacról.

### Douglas Crockford és a jó részek

A Javascript mindig a web nyelve volt. A Netscape Navigator 2.0 verziójától kezdve minden böngésző értelmez, a weboldalak nagyrésze tartalmaz értelmezendő Javascript kódot. Minden ennyire népszerű programozási nyelv éretté válik, és ez ebben az esetben sem kivétel: bár a fent említett okok miatt sok szoftverfejlesztő leírta, mint másodrendű technológiát, voltak, akik értékelték a dinamizmusban rejlő potenciált, segítettek eloszlatni a nyelvet körülvevő tévhiteket, és irányadókat vezettek be a jobb minőségű kód érdekében. A legkiemelkedőbb ilyen személy Douglas Crockford, aki többek között bevezette a JSON formátumot, segített az ECMAScript standardok formálásában, és a mai napig aktívan részt vesz a nyelv fejlesztésében.

Crockford könyve, a Javascript: The good parts alapvető olvasmány a nyelvet tanulók körében, és az alap ötlete elég egyszerű:

Minden programozási nyelv tervezésében követnek el hibákat, ezért minden nyelvben léteznek jó és rossz részek. Ez különösen igaz a Javascript nyelvre, amely egy rövid idő alatt vált ismeretlenből népszerűvé, a minőségétől függetlenül. Egy standard kezelő bizottságnak nehéz kivenni az olyan részeket a nyelvből, amelyek rossznak bizonyultak, hiszen az a létező programokat tenné használhatatlanná, ezért inkább új funkciókat építenek be, ezek szintén néha jó, néha rossz résznek bizonyulnak. A felhasználónak megvan a lehetősége, hogy csak a jó részhalmazt használja. Crockford könyve katalogizálja a Javascript jó részeit, és elmagyarázza az indítékot a választásra.

Hogyha hiszünk Crockfordnak, ez a hozzáállás két szempontból változtatja meg a nyelv használatát: egyrészt segít kiválasztani azokat a részeket, amelyeket tapasztalt tervezők és fejlesztők jónak találnak, másrészt belénk ülteti azt az elvet, hogy megvizsgáljuk azokat az eszközöket, amelyeket a nyelv ad, és döntsünk használatukról. Ez önkontrollt jelent a nyelv használatában és a kód írásában, amelyre ebben az esetben nagy szükség van.

### Könyvtárak, jQuery

Az egyik legfontosabb paradigma a szoftverfejlesztésben a DRY (Don’t Repeat Yourself) elv, ami a kód újrahasználását hangsúlyozza. Sokszor a saját kódunkat használjuk újra, de ha egy problémával sokan szembesültek előttünk, használhatjuk az előttünk járók megoldásait is, könyvtárak formájában. A front-end fejlesztés legnagyobb problémája sokáig a böngészők kompatibilitása volt, más néven Cross-Browser támogatás. Ennek a problémának a megoldására született John Resig könyvtára, a jQuery, amely a mai napig a legismertebb Javascript kiegészítő. A jQuery egyik alaptulajdonságaként egységesít: elrejti a különböző böngészők közötti különbségeket egy egységes interfész mögé, CSS-jellegű kiválasztókat alkalmaz Javascript komponensekre. A jQuery másik alaptuajdonsága az egyszerűsítés: AJAX kérések, dinamikus tartalom létrehozása, egyszerűbb aszinkron objektumok. A periódusban, amikor a böngészők Javascript motorjai között jelentős különbségek voltak, illetve sok Javascript funkció nehézkes volt, a jQuery használata elengedhetetlen volt. Mára a könyvtár jelentősége csökkenőben van, hiszen a Javascript standardok egyre jobbak, a böngészők közötti különbségek jóformán elhanyagoltak, és jóval több funkció érhető el egyszerű Javascriptben.

A remek könyvtáron kívül John Resig elérhetővé teszi a fejlesztés közben szerzett tapasztalatait [egy remek könyv](https://www.manning.com/books/secrets-of-the-javascript-ninja) keretein belül.

### A Javascript ökoszisztéma

A jQuery megjelenése érdekes reakciót váltott ki a Javascript közösségben. Resig két alapvető elve - Cross-Browser támogatás és egyszerűbb interfészek (API, Application Programming Interface) - rámutatott, hogy nem kötelező a standardokra és böngésző-támogatásra hagyatkozni a nyelv fejlesztéséhez, lehetőség van különböző könyvtárak és keretrendszerek építésére, amelyek javíthatnak az írott kód minőségén. Jobban meghatározott, értettebb nyelvek és technológiák esetén ez a paradigma rég óta a köztudatban él, de a Javascript életciklusában a jQuery megjelenése váltotta ki ezt a változást.

Egy másik faktor a nyelvvel szembeni hozzáállás változásában a következő: Tapasztalt fejlesztők, például Crockford, akik az általános véleménnyel szemben hirdették a Javascript életképességét, hallgatóságra találtak olyan szoftverfejlesztőkben, akik ismerték már a Javascript nyelvet és szintén szerettek volna pozitív változásokat látni a fejlődés irányában, mint Addy Osmani és Paul Irish.

A Javascripttel szembeni gondolkodásmód változásának eredményeként új könyvtárak és keretrendszerek születtek mindenféle felhasználási területen, általános eszköztárak, tervezési minták, architekturális keretrendszerek, felhasználói interfészek formájában. Ezek közül egy pár:
* JavascriptMVC, az egyik első MVC keretrendszer JS-re
* Backbone.js, Addy Osmani által készített MVC keretrendszer,
* AngularJS, MVW keretrendszer,
* EmberJS, MVVM keretrendszer,
* underscore/lodash, funkcionális segédfüggvények eszköztára,
* RxJS, aszinkron esemény-kezelő könyvtár,
* React, a facebook által fejlesztett UI-keretrendszer
* RequireJS, modul-kezelő rendszer
* Mocha, Chai, teszt-keretrendszer

A Javascript-re épülő könyvtárak és keretrendszerek világa folyamatosan növekszik és változik, ez a dinamizmus annak a jele, hogy a nyelv fejlődik és a fejlesztők szükségét érzik új nézőpontok és paradigmák felfedezésének.

### A jelen és a jövő

Az ECMAScript 5. verziója 2009-ben jelent meg, miután a 4. verziót alkalmatlannak találták, így az 1999-es 3. verzióra épült. Minden modern böngésző támogatja a standardot, így a kompatibilitási problémák megszűnőben vannak. 2009 óta sok minden történt, az ECMAScript 6. verzióját 2015-ben fogadták el. Ez a verzió jelentős módosításokat hoz a nyelvben, amelyekről később szó lesz. A standard jelenleg [részlegesen támogatott](http://kangax.github.io/compat-table/es6/) a böngészők jelenlegi változataiban, és a munkálatok folyamatban vannak a teljes támogatás eléréséhez. Az ECMAScript 7. verzióját 2016-ban publikálták.

## Az eszköztár

### Felhasználói felület

Dedikált asztali alkalmazások (Desktop Application) általában egy szűkebb, specializálódott közönséget céloznak - gondolhatunk itt a pénzügyi, vendéglátói, stb. szoftverekre -, ezért a felhasználói felület minősége sokszor nem a legfontosabb paraméter. Ezzel szemben áll a webalkalmazásoknak az a kategóriája, amely a lehető legszélesebb célközönség számára készül, legyen ez egy okostelefonos alkalmazás vagy egy honlap, amelyek nagy hangsúlyt fektet az úgynevezett UX (User eXperience, felhasználói élmény) minőségére. A legtöbb modern vállalatnak van legalább egy bemutató honlapja, amely a cég márkáját (brand) képviseli, és egy rossz UX rossz marketinget eredményez a tulajdonos számára.

Másrészt, egy termék fejlődésével és a felhasználói tapasztalatok gyűjtésével együtt jár a UX fejlődése, legyen ez számítógépes, vagy bármilyen  egyéb területen. A modern felhasználó tájékozott a UX minősége terén, ezért értékeli a jó felhasználói élményt, ezért a termékek és szolgáltatások készítői kénytelenek hangsúlyt fektetni erre a nézőponta, hogyha kompetitívek szeretnének maradni. Példaként felhozhatjuk a kedvenc operációs rendszerünk fejlődését, az első iPhone megjelenését vagy akár egy jól megtervezett épületet is. Ezek alapján nem meglepő, hogy a webalkalmazások terén a jó UX nagyobb hangsúlyt kap, mint valaha.

Hagyományosan, a jó felhasználói élmény megtervezése nem a szoftverfejlesztők feladata, mert egy kreatívabb folyamatról van szó, ahol szükség van a termék tulajdonosának véleményére, jó esztétikai érzékre, és számítógépes grafikai ismeretekre is, ezért gyakran specializálódott személyek, úgynevezett “webdesignerek” végzik ezt a munkát. Ezen személyek gyakran nem képzettek a HTML/CSS használatában, ezért statikus erőforrásokat, “asset”-eket gyártanak, például képeket és animációkat, vagy honlap [prototípus programok](https://www.invisionapp.com/) segítségével közvetítik a munkájuk eredményét. Az előnye ennek az elhatárolódásnak az, hogy ezek a prototípusok gyorsabban elkészíthetők, így a megrendelő véleménye is gyorsabban érvényesül, a UX hamarabb elkészül. Hátránya, hogy a prototípusokat le kell fordítani a böngésző által értelmezhető formátumba, ez extra munkát jelent. Az alternatív megoldás, amelyen egyre többen alkalmaznak, egy olyan szakember, aki a folyamat mindkét komponensét elvégezheti, egyszerre designer és szoftverfejlesztő is.

A UX három kategóriára bontható: milyen tartalmat jelenítünk meg, hogyan néz ki ez a tartalom, illetve hogyan viselkedik. A párhuzam egyértelmű a front-end technológiák hármasához, és állíthatjuk, hogy mindhárom komponensnek szerepe van a UX elkészítésében.

A HTML egy leíró nyelv, ez azt jelenti, hogy a tartalom közé illesztett címkék vagy tag-ek utasításokat adnak a böngészőnek arra, hogy hogyan jelenítse meg a tartalmat:

```
// Hangsúlyozzuk a tartalmat egy vastagabb (bold) betűtípust használva
<b>Hello World!</b>

// A tartalom egy cím (heading)
<h3>Harmadik szintű cím</h3>

// Táblázat
<table>
    <tr>
        <td>Első oszlop</td>
        <td>Második oszlop</td>
    </tr>
</table>

// Állítsuk a tartalom háttérszínét a megadott színre
<body bgcolor="#BADA55">
```

A WWW kezdeti időszakában ezek a speciális címkék adtak lehetőséget a tartalom alacsony szintű formázására. A CSS megjelenése egy új lehetőséget adott a fejlesztőknek arra, hogy a tartalmukat egy magasabb szinten is formázni tudják.

```
// Állítsuk a táblázat háttérszínét a megadott színre
table {
    background-color #BADA55
}
```

Látható, hogy ugyanaz a hatás mindkét komponens segítségével elérhető, és a felelősségek nincsenek megfelelően elhatárolva. Ennek következménye az, hogy a fejlesztők a HTML által meghatározott címkéket a tartalom stílusának igazgatására hasznáják, ez egy nem túl szerencsés technika, és a klasszikus példa a táblázatok használata a teljes weboldal feldarabolására és pozícionálására, holott a az információ eredetileg nem tabuláris.

Mára a komponensek szerepei egyértelműek: a HTML felelős a tartalom megfelelő leírásáért, míg a CSS a tartalom formázásáért. A gyakran használt "szemantikus HTML" kifejezés azt jelenti, hogy a rendelkezésre álló címkéket arra használjuk, hogy jelezzük a tartalom típusát, például a cím (`<h1>, <h2>, ...`), paragrafus (`<p>`), tabuláris adat (`<table>`) címkék használatával. A 2014-ben bevezetett HTML5 standard komoly erőfeszítéseket tett ebbe az irányba, és a mai böngészők mind támogatják a standardot. A szemantikus leírást segítő új címkék például a `<article>`, `<header>`, `<footer>`, `<figure>`.

A technológia fejlődésével a CSS vált a web kinézetért felelős komponensévé, annak ellenére, hogy a böngészők a kelleténél lassabban integrálták a standardot, a kezdeti egységesítési próbálkozások is hagytak kívánni valót maguk után, és az implementáció beli különbségek is fejfájást okoztak a fejlesztőknek. A 2.1-s standard végleges verziója 2011-ben jelent meg, azonban a legtöbb böngésző már régebb óta támogatta a leírt funkciók nagyrészét. A 2.1-es standard sok lehetőset biztosított a tartalom formázására, azonban nem volt képes a programozók egyre növekvő igényeit kielégíteni a komplexebb vizuális feladatok, mint például árnyékok vagy animációk terén. Ennek leküzdésére, és a kívánt hatások elérésére a különböző böngészők saját implementációkat vezettek be, úgynevezett böngésző-specifikus előtagokat ([vendor-prefix](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix)) használva, például:

```
// vendor prefixek
-webkit-box-shadow
-moz-box-shadow
-o-box-shadow
-ms-box-shadow

// W3C standard
box-shadow
```

A legújabb, CSS 3 specifikáció modulokra van osztva, és 2012-ben a négy legfontosabb modul került publikálásra, és mára a 3.0 verzió nagyrészt teljes. Mivel a böngészők ezen funkciók nagy részét eleve támogatták, az újabb verziók megfelelnek a legújabb standardoknak, így a Cross-Browser támogatottság egyre jobb, és egyre kevésbé van szükség alternatív megoldásokra. Néhány példa CSS3 funkciókra:

#### Tanzíciók (`transition`) és animációk (`animation`)

A CSS egyik nagy hiányossága a mozgó effektusok, animációk támogatásának hiánya volt. A múltban tipikusan Javascript könyvtárakat használtunk ilyen hatások és animációk elérésére, azonban ez egy szükségmegoldás. A már említett elkülönítés, amelyben a CSS felelős az alkalmazás *kinézetéért*, és a Javascript a *viselkedésért*, sérül azzal, ha Javascript kódot vezetünk be az ilyen, egyértelműen kinézet kategóriához tartozó kihívások megoldására; ezen kívül az ilyen animációk teljesítménye is gyenge, erről később is lesz szó. Az új, effektusokat vezérlő `transition` és `animation` CSS funkciók egy elegáns megoldást jelentenek, megőrzik a szerepek elkülönítését (SoC, Separation of Concerns), és teljesítményük is felsőbbrendű.

#### Media Query-k

A *Media Query* bevezetése igazi fordulópont a front-end fejlesztés fejlődésében. Ez a funkció lehetővé teszi a programozó számára, hogy a futási környezetről nyert információra reagálva építse fel az alkalmazás stílusát. Ezen funkció bevezetése előtt a legrugalmasabb lehetőség az volt, hogy a fejlesztő a lehető legkisebb elfogadható kijelzőre készítse a kódot - például az 1024px széles képernyő esetén 960px szélességre, innen ered a híres [960 rendszer](http://960.gs/) -, és egy külön alkalmazást készítsen a hordozható kijelzők számára.

A Media Query leggyakoribb felhasználási módja a következő CSS szabály:

```
@media (max-width: 600px) {
    // ...
}
```

Ez a kód lehetővé teszi a fejlesztő számára, hogy más-más szamályokat alkalmazzon a különböző méretű kijelzők esetén, vagyis **ugyanazt** a kódot optimizálja több, különböző méretű eszközre. Ez egy erőteljes lehetőség, ami tovább segíti az egységes kód készítését felhasználók egyre változatosabb tömege számára.

Néhány példa más fontos CSS3 funkciókra:
* Új kiválasztók (CSS3 selectors)
* Elő és utó pszeudo-tagok (`:before`, `:after`)
* Árnyalatok (CSS3 gradient)
* Árnyékok (`box-shadow`)

#### Pre-processzorok
Bár a CSS-ért felelős standard-fenntartó bizottság, a W3C nagy előrelépéseket tett a nyelv fejlesztését illetően, sok kezdeményezés született, amelyek célja, hogy javítsanak a CSS felhasználhatóságán. Ezen eszközök legnépszerűbb kategóriája az úgynevezett CSS Pre-processor. Az ilyen eszközök definiálnak egy saját szintaxist, és CSS kódot generálnak.

Az esettanulmány a Stylus nevű könyvtárat használja, amely `.styl` kiterjesztésű állományokat fogad el, és kimenetként CSS-t gyárt. Adott a kérdés, hogy miben segít egy ilyen eszköz a jobb minőségű kód írásában; néhány példa ezt illusztrálja:

```
// Nincs szükség kapcsos zárójelekre vagy pontosvesszőre
body
  font: 12px Helvetica, Arial, sans-serif

// Változók használata
$badass = #BADA55
body
  background-color: $badass

// Mixinek, amelyek újrahasználhatóak
border-radius()
  -webkit-border-radius: arguments
  -moz-border-radius: arguments
  border-radius: arguments

button
  border-radius(5px)

// Kisebb modulok készítése és összefűzése
@import 'vendor'

// Függvények, dinamikus szabályok
for w in 20, 40, 60, 80
    .col-{w}
        width wpx

// ...
```

A modern HTML5 és CSS3 technikáknak köszönhetően külső eszköztárak, pluginok, és sok esetben Javascript kód nélkül is lehetséges olyan gazdag web-alkalmazásokat (RIA) készíteni, amelyek a böngészők széles spektrumán megfelelően működnek. A dolgozatban bemutatott esettanulmány az itt leírt elvekkel egyetértésben készült, a bemutatott koncepciókra a tanulmány konkrét példákat tartalmaz.

### Vanilla Javascript

Mára jóformán minden front-end alkalmazás használ egy vagy több Javascript alapú könyvtárat, ezért nem egyértelmű, hogy mire hivatkozik a kifejezés. A "Vanilla" előtag azt hivatott illusztrálni, hogy a standardnak megfelelő, külső könyvtárakat nem használó, egyszerű kódról beszélünk. A későbbiekben egy pár fontosabb könyvtárat is bemutatok, ez a fejezet azonban az erről az azonnal futtatható, a böngészővel szoros kapcsolatban álló, néha jó, néha rossz nyelvről lesz szó. A történeti áttekintő segít megérteni a nyelv fejlődésének miértjeit és hogyanjait, de nem elégséges ahhoz, hogy megértsük a nyelv *természetét*. Ezt a fogalmat nehéz behatárolni, de tény az, hogy programozói körökben nehezen találnánk egy másik nyelvet, amely ennyire vitatott, félreértett és több általános frusztrációt keltő lenne. Ezért különösen fontos, hogy azokra a mára elfogadott tényekre építsünk, amelyek segítenek eloszlatni a Javascript-et körülvevő értetlenséget.

Az első kérdés az, hogy a nyelv funkcionális vagy objektum orientált-e. A válasz szokás szerint nem egyszerű: a Javascript egy általános nyelv, képes mindkét programozási stílushoz hozzájárulni. A modern technológiák legnépszerűbbjei erősen típusos, objektum orientált nyelvek. A legtöbb programozó a "klasszikus", OO nyelvekben járatos, és a Javascriptet is egy ilyen nyelvnek tekintik, hiszen a nevében is Java szerepel, a szintaxisa a Java-éhoz hasonlít, léteznek objektumok, amelyek adatokat tárolnak és metódusok az adatok feldolgozására. Nincsenek osztályok, de vannak konstruktorok amelyek hasonlóan működnek, nincs klasszikus értelemben vett öröklődés, de van prototípusos öröklődés. Ezek a hasonlóságok azonban nem jelentik, hogy a nyelv procedurális. Ellenkezőleg, több közös tulajdonsága van a Lisp és Schema jellegű funkcionális nyelvekkel: gyengén típusos, első-osztályú függvényeket használ, erőteljes kifejező szintaxist használ. A Javascript az első igazán népszerű lambda nyelv. A nyelv tehát mindkét programozási paradigmát ki tudja szolgálni, viszont fontos megérteni az alapvető tulajdonságokat. Ennek hiánya hagyományosan sok frusztrációt okozott a klasszikus, erősen típusos nyelveket használó programozók körében. Ezt a rugalmasságot az ECMAScript újabb standardjai is támogatják, az ES2015, azaz a 6. szabvány bevezette például a funkcionális stílust elősegítő "nyíl függvényeket" (arrow function): `(param1, param2, …, paramN) => expression`; ugyanakkor az OO körökben népszerű osztály fogalmát: `class MyClass {...}`.

A nyelv egy másik problémás tulajdonsága a prototípusos öröklődés. Mivel az objektumok nincsenek osztályokhoz kötve, objektumok csak más objektumoktól örökölhetnek. Ez egy erőteljes tulajdonság, de ismeretlek a klasszikus OO nyelvek használói számára. A rugalmasságnak köszönhetően lehetséges egy klasszikus öröklődési modell létrehozása, de ez erőltetettként hat, míg a prototípusok elfogadása és megkérdése egy egyszerűbb stílushoz vezet.

A nyelv gyengén típusos és kompiláció helyett interpretált, emiatt nem lehetséges olyan statikus hiba-ellenőrző eszközöket használni, amelyeket más, klasszikus nyelvekben megszokhattunk. Ez sok esetben hátrányt jelent, de a nyelv dinamikus volta és kifejező ereje ellensúlyozza az ilyen problémákat. Bár az ilyen típus-ellenőrzések előnyt jelentenek, nem helyettesítik a kód tesztelését. Ezen kívül léteznek és népszerűek az úgynevezett linter programok, amelyek heurisztikus módon, statikus idejű ellenőrzéseket végeznek az írt kódon, javítva annak minőségén.

A Javascript közösség hosszú ideje dolgozik azon, hogy több mint két évtized tapasztalatait felhasználva javítsanak a nyelven, kiszűrjék a negatív tulajdonságokat, és biztosítsák a jó irányt a jövőbeli fejlődéshez. Ennek érdekében az elmúlt időszakban sok remek, a nyelvet oktató erőforrás született, például:

* [Javascript: The definitive guide](http://shop.oreilly.com/product/9780596805531.do)
* A már említett [Javascript: The good parts](http://shop.oreilly.com/product/9780596517748.do), Douglas Crockford alapműnek számító könyve
* John Resig, a jQuery alkotójának műve, [Secrets of the Javascript ninja](https://www.manning.com/books/secrets-of-the-javascript-ninja)
* Marijn Haverbeke remek összefogó írása, [Eloquent Javascript](http://eloquentjavascript.net/)

Ezek, és a folyamatosan bővülő erőforrás-készlet segíthetnek az átlagos fejlesztőnek nyelv pontos megértésében, a jó és rossz részek elkülönítésében és egy jó programozói stílus elsajátításában. A megfelelő oktatás minden érett programozási nyelv alapfeltétele, és a Javascript jó irányba halad ezen a téren is.

### jQuery

A jQuery egyedül felelős az elmúlt évtized lehetőségeiért a Cross-Browser, nagy tömegeket elérő front-end alkalmazásai terén. 2006-ben jelent meg, abban az időszakban, amikor az Internet Explorer kezdte elveszteni egyeduralmát a böngésző piacon, a front-end technológiákkal kapcsolatos szabványok folyamatos fejlődésben voltak és jóformán lehetetlen volt több böngészőben is tökéletesen működő kódot írni. A könyvtár mindkét alapvető funkciója, böngésző interfész egységesítése és a HTML-el való interakció egyszerűsítése betöltött egy űrt, amely a mai napig a Web legnépszerűbb Javascript könyvtárává tette. Erre a sikerre építve a könyvtárat 2011-ig az eredeti alkotó, később egy hozzáértő közösség fejlesztette, új funkciókat, lehetőségeket adva a felhasználók kezébe. Az egyszerű API, a lehetőségek tömkelege sokáig osztatlan sikert aratott a közösség köreiben.

A jQuery kapcsán fontos megemlíteni a DOM-ot (Document Object Model). Ahogy a név is mutatja, a DOM a HTML objektum modellje, vagyis az a szerkezet, amelyet a HTML használ a betöltött állományokban leírt tartalom reprezentációjára, amely a dokumentum tartalmát, illetve a valamennyi összetevőjét magában foglalja. A DOM-ot első sorban a front-end triád Javscript komponense használja a böngészőben megjelenő tartalom manipulására, másszóval a DOM a kapcsolat a HTML és Javascript komponensek között. Ennek a szoros kapcsolatnak a hátránya magában a DOM-ban rejlik: hagyományosan, a DOM interfész nem túl hatékony, használata nehézkes és hibákra hajlamos. Ennek okai már ismerősek: nem elég jó szabványok, böngészők nem következetes implementációi, stb. A jQuery bevezetése jelentősen stabilabbá tette és egyszerűsítette a DOM-mal való értekezést, példaként említhetjük a CSS jellegű kiválasztókat DOM elemek elérésére.

Egy programozási nyelv vagy könyvtár sem tökéletes, és tíz év használat után egyértelmű, hogy a jQuery-nek is megvannak a hátrányai. Az egyik legnagyobb probléma a teljesítmény: bármikor, amikor jQuery-t használunk, egy új réteggel különítjük el magunkat a böngészőtől, ezzel rontva a hatékonyságon. A jQuery-ben írt animációk, CSS lekérdezések, DOM módosítások mind lassabbak a vanilla változatnál, és ez a különbség az egyre komplexebb alkalmazások esetén egyre jobban észrevehető. A másik, talán legnagyobb probléma az interfész egyszerűségében rejlik: a könyvtár nem kényszeríti a felhasználót semmilyen struktúra betartására. A könyvtár egy segédeszköz, nem pedig egy keretrendszer, ezért nem segít a kód szervezésében. Ennek eredményeként a jQuery-ben írt kód hajlamos úgynevezett "spagetti-kód"-dá válni. Ennek jelentése, hogy a kód folyása bonyolult és sok esetben követhetetlen.

Egy másik szempont, amelyet figyelembe kell vennünk a modern szabványok és böngészők állapota. Tíz év telt el az jQuery kezdetek óta, azóta mind a DOM, mind a Javascript terén új standardok születtek, a böngészők  soha nem látott igyekezettel próbálnak ezen irányoknak megfelelni, és azon problémák, amelyek népszerűvé tették a könyvtárat, sok esetben megoldódtak. A jQuery mindent megoldani próbáló rendszere helyett válogathatunk specializálódott, hatékonyabb megoldások között, és használhatjuk a HTML és Javascript újdonságait is, például a szintén CSS szelektorokon alapuló `document.querySelectorAll()` függvényt. Az esettanulmány nem használ jQuery-t, cserébe a natív Javascript és specializáltabb könyvtárak interfészeiért.

### Tervezési minták és MVC

A front-end technológia fejlődése régi problémákat old meg és új eszközöket bocsájt a fejlesztők rendelkezésére, nem meglepő hát, hogy egyre komplexebb front-end webalkalmazások születnek. Ez a növekedés egyértelművé tette azt, hogy szükség van olyan keretrendszerekre, amelyek segítenek a kód jobb struktúrájában. Bár a 2006-ban megjelent jQuery és társai segítettek bizonyos gyakori problémák megoldásában, ezek inkább nevezhetők segédkönyvtáraknak. Az első komoly architekturális keretrendszer a 2008-ban megjelent JavascriptMVC volt. Ahogy a neve is mutatja, a back-end technológiákból már ismert Model View Controller mintát tette elérhetővé Javascript fejlesztők számára, ezen felül pedig egyéb, OO rendszerekben bevált technikákat is implementált, ezzel elindítva a front-end keretrendszerek új nemzedékét. Az MVC minta jellegzetességeit nem részletezem, de a Javascript világban a mintát alkalmazó keretrendszerekre MV*-ként hivatkozunk, ahol a * azt illusztrálja, hogy a mintának több változata létezik, ahol a Model és View komponensek adottak, viszont a kettő közötti kapcsolatban eltérések vannak. Több példa is igen népszerű, említésre méltó az AngularJS, Ember, Knockout, Meteor, stb. Ezen rendszerek tulajdonságait - a teljesség igénye nélkül -, a szintén népszerű Backbone keretrendszeren keresztül mutatom be.

Hagyományosan, a web-alkalmazások területén az adatok kezelésének oroszlánrésze a szerver feladatkörébe tartozott, a kliens a szerver által előállított HTML oldalakat egészben töltötte le, és a kliens-oldali Javascript a felhasználói élmény javítására szolgált. A jQuery és AJAX használata változtatott ezen, azonban a kliens oldali komplexitás növekedése miatt a jó architektúra gyorsan kritikussá vált. Backbone és hasonló keretrendszerek lehetővé tették, hogy a viszony szerver és kliens között megforduljon, vagyis a kliens nyers adatokat kapjon a szervertől és ezeket a saját feltételeinek megfelelően dolgozza fel. Ez az architektúra ideális az úgynevezet SPA (Single Page Application) rendszerek fejlesztésére, ahol a böngésző betölti az alkalmazást, ez pedig reagál az adatok változásaira, a nélkül, hogy az oldalt újratöltené.

A Backbone szerzője Jeremy Ashkenas, ugyanakkor Addy Osmani, akinek a neve ismerős lehet az egyik előző fejezetből, egy remek [bevezető könyvvel](https://addyosmani.com/backbone-fundamentals/) járul hozzá a projekthez. A könyvtár az MVC mintának azt a változatát alkalmazza, ahol a hagyományosan a kontrollerbe épített funkciók a View komponens részét képezik. Az MV* architektúra sok helyen az Observer (Megfigyelő) tervezési mintára hagyatkozik, ez a Backbone esetén sincs másképp. Az alapvető struktúrák a következőek:

* Model

    A modell felel meg az Observable komponensnek, szerepe az alkalmazásba betöltött adatok tárolása. Lehetőség van a modell módosítására, és a megfigyelő komponens értesül a módosításról.

* Collection

    A Backbone lehetőséget ad a modellek csoportosítására, minden kollekció ugyanolyan típusú modellek gyűjteményének felel meg.

* View

    A nézet szerepe az adatok kinyerése a modell rétegből, és ezek megjelenítése a felhasználói felületen. Ennek elérésére a DOM interfészt használja. A Backbone különlegessége az, hogy nincs dedikált kontroller, amely hagyományosan a felhasználó cselekvései nyomán a modelleket módosítja, ezt a szerepet is a nézet tölti be.

Ebben a fejezetben egy gyors betekintést szerettem volna adni az MV* könyvtárak világába, hiszen az esettanulmány nem erre az architektúrára alapul, ezért további részletekért Osmani már említett könyvét ajánlom.

### Funkcionális segédkönyvtárak

A Javascript nyelv, rugalmasságából adódóan több programozói paradigmát is támogat. A nyelv szinaxisa a Java alapján készült, ezért használhatjuk a klasszikus procedurális nyelvek technikáit:

```
// Vektor létrehozása
var v = new Array();
var i;
for (i = 0; i < v.length; i++) {
    // ...
}
```

Ennek ellenére a nyelv nem tekinthető sem objektum orientáltnak sem procedurálisnak, hiszen ahogy már említettem, dinamikus, gyengén típusos és sok, a funkcionális paradigmából átvett technikát használ. Egy ilyen funkció például az úgynevezett "literal notation":

```
// Vektor létrehozása
var v = [];

// Objektum létrehozása
var o = {};
```

A fenti példa illusztrálja a funkcionális természetet, azonban ezen a téren sokáig korlátozott volt az eszközkészletünk. A `map`, `filter` és hasonló függvények hiánya arra késztette a fejlesztőket, hogy ilyen irányú segédkönyvtárakat hozzanak létre. Két nagyon hasonló, népszerű eszköztár az `underscore` és `lodash`. Közös tulajdonságuk, hogy az `_` szimbólumú globális változó alatt biztosítják azokat a vektorokkal, objektumokkal és egyebekkel foglalkozó segédfüggvényeket, amelyeket funkcionális nyelvekből már megszokhattunk, mint például a `map`, `filter`, `concat`, `take`, `clone`, stb.

Az ilyen törekvések arra késztették a szabványok kezelőit és a böngészők tervezőit, hogy elismerjék a szükségét a nyelv egy funkcionális részhalmazának, így az ES2015 standard már leírja a fent említettek többségét. A funkcionális irány fejlődését mutatja az olyan új funkciók szabványosítása, mint a formális lambda kifejezések (Arrow function) a már bemutatott `(param1, param2, …, paramN) => expression` szintaxissal, valamint a "tail recursion" optimizáció.

### React

A React a Facebook technikai csoportjának üdvöskéje, egy viszonylag új szereplő a Javascript keretrendszerek színpadán, rövid idő alatt nagy népszerűségre tett szert, és többek között a bemutatott esttanulmány központjában is áll. Az esettanulmányban használt kód megértéséhez szükség van kiegészítő információkra is, ez a fejezet a React alapelveire koncentrál.

A React filozófiája megtévesztően egyszerű: célja egy olyan API, amely látszólag minden helyzetben az egész alkalmazást frissíti. Ennek a valóságban az az eredménye, hogy a fejlesztőnek elég azt kifejeznie, hogy adott helyzetben hogyan nézzen ki az alkalmazás, és ha az alapul szolgáló adatok változnak, a React rendszer látszólag lenyomja a frissítés gombot, és az egész alkalmazást újra-rendereli. Ez a nagyvonalú hozzáállás egy felhasználói interfész kezeléséhez ellentmond a hagyományos technikáknak, mégis ez a rendszer alapköve. Annak megértéséhez, hogy hogyan képes React ezt a metodológiát kivitelezni, először tekintsük a könyvtár alapvető működését.

Először is, a könyvtár kizárólag a felhasználói interfésszel foglalkozik, nincs adattároló vagy -kezelő komponense, vagyis az MVC rendszerben a View rétegnek felel meg. Az alapvető kód-szervezési egység a komponens, amely elősegíti a kód újrahasználását és a kompozíciós minták használatát. Egy React alkalmazás tulajdonképpen könnyen újrahasználható és csoportosítható komponensek halmaza.

Alapvetően egy komponens feladata az, hogy meghatározott bemeneti adatokból egy HTML alapú kimenetet generáljon, és azokat a DOM-on keresztül megjelenítse. Bár ezen komponensek létrehozását és DOM-ba történő integrálását egyszerű Javascript segítsgégével is elérhetjük, React rendelkezésünkre bocsájt egy saját, JSX nevű szintaxist, amely nagyban megkönnyíti a munkánkat, mert triviálissá teszi a komponenseink fa struktúrába rendezését. A JSX-ben írt komponensek szintaxisa hasonlít a HTML szintaxisra, és használhatunk hagyományos HTML címkéket is, ezzel a saját komponenseink és a html elemek közötti súrlódás csökken. A következő kódrészlet nem egy `html`, hanem egy `jsx` állomány tartalma, amely egy React komponens definíciójához tartozik:

```
<div className="search-tag" onClick={onClick}>
    <h3>{result.get("tag")} ({result.get("count")})</h3>
</div>
// search-component.jsx :24
```

Amint látható, a hagyományos HTML tag-ek használata megengedett JSX-ben. A HTML-ben használt `class` szót a `className` váltja fel, mert a *class* lefoglalt szó Javascriptben, és a `{}` között szereplő kifejezés kiértékelődik. Végezetül figyeljük meg an `onClick` eseménykezelő használatát, erről a későbbiekben bővebben is szó lesz. A fenti kódrészletet a következő módon illeszthetjük be egy komponensbe:

```
class MyComponent extends React.Component {
    render {
        return <div className="search-tag" onClick={onClick}>
            <h3>{this.props.result.get("tag")}
                ({this.props.result.get("count")})
            </h3>
        </div>;
    }
};
```

Figyeljük meg az ES2015 szabványban definiált `class` kifejezés használatát. A fenti kód eredményeként létrehoztunk egy MyComponent nevű React komponenst, amely a render metódusa segítségével a leírt tartalmat illeszti a DOM-ba. A kódban haszált `result` változó magyarázatra szorul. Megértésére bevezetjük a komponensek egy alapvető tulajdonságát, amely szerint minden komponens rendelkezik két jól meghatározott adatstruktúrával:
* A `props` kulcsszó jelöli azokat az adatokat, amelyeket a komponens az őt *birtokló* másik komponenstől kap, ezzel leírva a komponens **tulajdonságait** (properties)
* A `state` kulcsszó azon adatokat jelöli, amelyet a komponens saját magának állít be, ezzel modellezve a belső **állapotát**.
Egy jól viselkedő komponens kizárólag erre a két adatstruktúrára hagyatkozik a `render` metódus kimenetének összeállításához, vagyis a komponens determinisztikus a `props` és `state` változókra nézve. Mellesleg megjegyezhetjük, hogy a React 15. verziójától kezdve biztosít egy egyszerűsített szintaxist állapotot nem tartalmazó, tisztán funkcionális komponensek számára (`(props) => (...)`). Ez a szintaxis figyelhető meg az esettanulmányban bemutatott kódrészletben:

```
const TagResult = ({result, onClick}) => (
    <div className="search-tag" onClick={onClick}>
        <h3>{result.get("tag")} ({result.get("count")})</h3>
    </div>
);
// search-component.jsx :23
```

Az elkészített komponens önmagában nem kerülhet be a DOM-ba. Erre a `ReactDOM.render()` függvényét használhatjuk, azonban ez nem fogad el nyers komponenseket, ezeket kontextusba kell helyeznünk, azaz meg kell határoznunk az őt birtokló komponenst. Ezt például a következőképpen érhetjük el:

```
const r = {
    tag: "tag"
    count: 0
};
const onClick = () => {
    console.log("on click");
};
const Result = () => (
    <TagResult result={r} onClick={onClick}/>;
)
```

A fenti példa illusztrálja a kompozíció erejét a React rendszerben. Ezzel a rövid példával kifejeztük, hogy a `Result` komponens a birtokló komponense a `TagResult` komponensnek, és hogy ennek egy **példányát** hogyan hozzuk létre. Megfigyelhető a `result` illetve `onClick` nevű tulajdonságok átadása is. Természetesen ez egyelőre semmit sem jelent, hiszen a `Result` komponenst sem példányosítottuk, és nem illesztettük be a DOM-ba. Az alábbi példa a komponens és elem közötti különbséget illusztrálja.

```
const myElement = <Result>;
ReactDOM.render(myElement, body);
```

A React rendszerekben elfogadott módszer a komponensek egyetlen közös őse, amelyet a HTML, pontosabban a DOM lehető legfelső szintjén illesztünk be a fenti módszer segítségével, és a közös ősből építjük ki a komponenseink fáját, minden komponensek egyednek pontosan megadva a tulajdonságait a `props` mező segítségével.

A komponensek és elemek rendszerébe jól beleillik a létező HTML címkék használata is. A `TagResult` komponens render metódusában használt `div` címkét szintén `<>` között használjuk, tehát ez is felfogható React elemként, és megadtuk a `className` és `onClick` tulajdonságokat is. A React a kis- és nagy-kezdőbetű konvencióját használja arra, hogy különbséget tegyen HTML elemek és komponensek között. A két típus hasonlósághoz hozzá járul a React szintetikus eseményrendszere is, ugyanis a HTML elemekre csatolt esemény kezelőink nem a nyers Javascript eseménytípusokat térítik vissza, hanem ezeket közrezárják egy `SyntheticEvent` típusba. Ez az események standardizálását és a Cross-browser támogatást szolgálja, ilyen téren hasonló a jQuery esemény-rendszeréhez, azonban pontosan utánozza a nyers esemény interfészét és elérhetővé teszi az eredeti eseményt a `nativeEvent` mezőn keresztül.

A fenti ismeretek birtokában már megérthetjük, hogyan éri el a React a látszólag mindent újra-renderelő, egyszerű API-t súlyos teljesítmény veszteségek nélkül. Mivel a komponenseink kimenetét kizárólag a `props` és `state` mezők befolyásolják, bármikor, amikor a komponens új tulajdonságokat vagy állapotot kap, kénytelen újra-renderelni önmagát és a hozzá tartozó al-fát. A felhasználó szempontjából egy egy igen egyszerű interfész, hiszen ha elkészítjük a komponensünk kimenetét minden lehetséges prop és state kombinációra, egyéb dolgunk nincs is, a rendszer automatikusan frissíti az alkalmazásunk állapotát. Tekintsünk egy példát, ahol egy komponensünk az alábbi al-fát rendereli:

```
renderColumn(column) {
    return (<div className="column">
        {column.map(photo =>
            <PhotoThumb key={photo.get("id")} photo={photo}
                isStarrable={photo.get("username") !== Session.user.get("username")}
                isStarred={this.props.stars.includes(photo.get("hash"))}
            />)}
    </div>);
}
// vertical-gallery.jsx :19
```

A komponens többi részétől az egyszerűség kedvéért eltekintünk. A fenti függvény egy fotókból álló listát kap paraméterül, majd minden fotó esetén egy előnézet komponenst generál. Tegyük fel, hogy a szülő komponens prop-ként kapja a képek listáját, és szeretnénk egy új képet beilleszteni. A kód egy másik része átadja az új listát a szülő komponensnek, amely a változás nyomán újra hívja a render metódust. Ennek következményeként előnézetek egy új listáját kapjuk, az új képet beleértve. Az API szempontjából ez elegánsan egyszerű, hiszen nem kell az állapotra figyelnünk, azzal, ahogy kifejeztük az adatok és tartalom közötti kapcsolatot, biztosítottuk ezek szinkronizációját. Egy klasszikusabb MV* rendszerben lehetetlen lenne ilyen nagyvonalúnak lenni, és természetesen a React sem törli le majd készíti újra a teljes felületet.

A React csapatnak komoly optimizációs munkát kellett végeznie, hogy a bemutatott rendszert valós alkalmazásokban használni lehessen. Az első és legnagyobb probléma a DOM kapcsán jelenik meg. Az interfész kimondottan lassú, ezért minden DOM-mal kapcsolatos műveletre különösen oda kell figyelni, ez könyvtártól és keretrendszertől független. Belátható, hogy egy a React-éhez hasonló paradigma hagyományosan az átlagosnál jóval több DOM-műveletet végeze, ez pedig ellehetetlenítené az algoritmust. Erre egy brilliáns megoldás született, az úgynevezett Virtual DOM. Mivel a modern Javascript értelmezők jelentősen gyorsabbak az említett műveletek terén, érdemes a teljes DOM-ról egy helyi, egyszerűsített másolatot tartani a JS futási környezetben, és ezen végezni a költséges összehasonlításokat és módosításokat, végül pedig a valós DOM tartalmát hozzáigazítani a másolathoz. Ez az első és legfontosabb teljesítmény növelő technika a rendszerben, az algoritmusra "reconciliation"-ként hivatkozunk, és magas szinten a következőként műküdik: ha egy DOM-ba illesztett komponens új prop vagy state adatokat kap, React létrehoz egy új virtuális DOM-ot ami az adatok-beli változást is tartalmazza. Ezt összehasonlítja a régi verzióval, majd a különbségeket a valódi DOM-ba is beilleszti. Ez a módszer a React ökoszisztémát gyorssá teszi, sok esetben gyorsabbá a jobban specializálódott vetélytársaknál is. Ennek ellenére vannak módszerek, amelyekkel tovább javíthatunk az alkalmazásunk teljesítményén.

Mivel a virtuális DOM a futási környezet része, az összehasonlítás jelentősen gyorsabb az alternatívánál, viszont ez a művelet még minddig a leginkább erőforrás igényes az algoritmus folyamán, mert komplex webalkalmazások hatalmas DOM-fákkal járnak együtt. Egy másik problémás rész a DOM módosítása: a műveletek lassú természete miatt fontos, hogy a módosítás minél kevesebb műveletet vegyen igénybe, vagyis az optimizációs probléma a két virtuális DOM közötti váltás a lehető legkevesebb transzformáció segítségével. Mindkét helyzetben tehetünk lépéseket a teljesítmény javítására:

Minden komponens rendelkezik egy opcionális `key` mezővel. Ez különösen fontos abban az esetben, amikor több, egyforma komponenssel dolgozunk, például listák esetén, amint a fenti példában is bemutattuk. Hogyha képesek vagyunk olyan egyedi kulcsokat adni a komponenseinknek, amelyek stabilak maradnak több render ciklus esetén, segítünk az algoritmusnak a közel optimális transzformáció megtalálásához. Erre különösen alkalmasak az adatokból származó egyedi azonosítók.

A virtuális DOM összehasonlítása, másnéven diff esetén a React rendelkezésünkre bocsájtja a `shouldComponentUpdate` életciklus-függvényt. Az alapértelmezett implementáció minden esetben `igaz`-at térít vissza, tehát a diff létrehozása és összehasonlítása minden komponens esetén megtörténik. Mivel egy jól viselkedő komponens determinisztikus a props és state mezőkre nézve, a felhasználó implementálhat egy algoritmust, amely eldönti, hogy szükség van-e a diff elvégzésére, ezzel tulajdonképpen vágásokat alkalmazva a DOM fán. A brute-force módszer egy ilyen algoritmusra a props és state objektumok mély összehasonlítása, amely bár helyes eredményt ad, költséges művelet, ezért valószínűleg nem fog teljesítmény növekedéshez vezetni. Gondolkodhatunk sekély összehasonlításon is, viszont a Javascript vektorokat és objektumokat referencia alapján hasonlít össze, ez pedig hibás negatív eredményeket hozhat. Létezik azonban az adatstruktúráknak egy olyan típusa, amely esetén az összehasonlító műveletek konstans időben történnek: megváltoztathatatlan, vagy immutable objektumok.

### Immutable JS

Az immutable objektumok karakterisztikája, hogy minden rajtuk végzett módosítás egy új objektumot, vagyis új referenciát eredményez. Ez azt jelenti, hogy két ilyen objektum **akkor és csak akkor** lehet egyforma, ha referenciáik is egyformák. Ez a tulajdonság tökéletesen megoldja az előző fejezetben leírt problémát, ha elfogadjuk a következő feltételt: minden prop vagy state objektum sekély, vagyis kizárólag primitív vagy immutable típusokat tartalmaz. Ebben az esetben végezhetünk sekély összehasonlításokat, és nagyban felgyorsíthatjuk az alkalmazásunkat. Egy extra előny az immutable objektumok használata esetén az, hogy elkerüljük a prop objektum véletlen módosítását a komponensen belül.

A legnépszerűbb Javascript-ben implementált immutable könyvtár a szintén Facebook által készített ImmutableJS. Ez a könyvtár több adatstruktúrát bocsájt rendelkezésünkre, többek között a `Map` és `List` típusokat, amelyek megfelelnek a natív Object és Array típusoknak. Az ezeken használható funkcionális, az ES2015 standardhoz hasonló függvények eszköztára szintén a könyvtár része.

Elsőre úgy tűnhet, hogy egy ilyen rendszer használata sok extra erőfeszítéssel jár, de a használata egyszerű, és a teljesítmény-beli előnyök mellet segít a kódszervezés javításában is, és hozzájárul a jó fejlesztői szokások kialakításához.

### RxJS

Mivel a React a felhasználói interfésszel foglalkozik, felmerül a kérdés, hogy mit használjunk az alkalmazás egyéb szerepeinek kitöltésére. Sok esetben a könyvtárat egy MVC rendszer View rétegeként használják, például a már említett Backbone keretein belül. A React csapat hivatalos javaslata a Flux, amely az eddig taglalt letölthető és használható megoldásokkal szemben egy elméleti paradigma. Több Javascript implementációja is létezik, de a közös tulajdonságuk, hogy a React egy fontos tulajdonságát valósítják meg.

A React természetéből adódik egy architekturális sajátosság: az információ áramlás egyirányú, vagyis unidirekcionális, a props mezőbe foglalt adatok szülőtől egyerek fele áramlanak. Ez alól az eseménykezelők, illetve a prop-ként átadott függvények kivételek, de ezek általában állapot módosítására használatosak, és prop-ként vannak a gyerek komponensekbe visszacsatolva. Erre példaként tekintsük a kövektező kódrészleteket:

```
<DetailsEditor
    title={this.state.title}
    description={this.state.description}
    tags={this.state.tags}
    onChange={this.onDetailsChange}
/>
// upload-component.jsx :32

onDetailsChange(data) {
    this.setState({
        title: data.title,
        description: data.description,
        tags: data.tags
    });
}
// upload-component.jsx :46
```

A `DetailsEditor` komponens `title`, `description` és `tags` attribútumai a szülő állapotában vannak rögzítve. Ezen kívül egy   `onChange` callback függvényt is átadunk, amelyet a gyerek akkor hív meg, ha a belső értékei változnak. Ez az állapot módosításához vezet, amely újraküldi a módosított értékeket az attribútumokban keresztül, megtartva az egyirányú adat-áramlást.

A flux architektúra továbbgondolja, és a React rétegen kívül is elősegíti ezt az ötletet. Az adatokat egy "Store"-nak nevezett rétegben tárolja, innen a már jól ismert prop mezőn keresztül juttatja a megfelelő komponensekhez. A Store-ok módosításáért a Dispatcher felelős. Ha a View réteg, például egy React komponens szeretne módosításokat végezni egy Store tartalmában, akkor létrehoz egy Action objektumot, amelyet elküld a már említett Dispatchernek. Ez kiválasztja a megfelelő Store-t, és elvégzi a kért módosítást. Szerver-oldali adatok szintén egy Action objektum segítségével kerülnek a rendszerbe. Így az adat-áramlás az Action -> Dispatcher -> Store -> View útvonalon halad, és sosem a másik irányba. Az unidirekcionális adat-áramlás segít leegyszerűsíteni az alkalmazás architektúráját, és nagyon jól egészíti ki a már említett React metodológiát. Az esettanulmány egy hasonló mintát követ, azonban más irányból közelíti meg azt.

Bármilyen webes technológiáról legyen szó, a kommunikáció szerver és kliens között mindig aszinkron. Hagyományosan a szerver teljes weboldalakat küldött a kliens felé, de a modern, komplex alkalmazások esetén ez a fajta információcsere nem elég, szükség van arra, hogy a kliens kezelni tudja az aszinkron adatáramlást. A fentiekben beszéltünk az alkalmazáson belüli adat-áramlásról is, amely szintén aszinkron, és a kettő szoros kapcsolatan áll egymással. A backend technológiákban elterjedt *esemény-folyamok* pontosan az efféle problémák megoldására alkalmasak. A több platformra is implementált Reactive Extensions keretrendszer Javascriptre is elérhető, RxJS név alatt.

Az esemény-folyam alapú rendszerek felépítése egyszerű: használjuk az Observable tervezési mintát egy gyűjtemény típusú adatstruktúrára. Ezt a gyűjteményt, például listát ezután használhatjuk események modellezésére, és a listát megfigyelő objektumok értesülnek ezen eseményekről. Ez önmagában nem egy túl csábító koncepció, de ha hozzáadjuk a funkcionális paradigmákból ismert módosító függvényeket és lusta kiértékelést, egy igen erőteljes technikát kapunk. Az RxJS rendszerben az ilyen listát Observable-nek, míg a listát megfigyelő objektumokat Observer-nek nevezzük. Az Observable folyamon elérhető transzformációs függvények a funkcionális nyelveknek megfelelőek, `map`, `filter`, stb. Egy kiemelendő funció a `scan` operáció, amely a `reduce` függvény aszinkron megfelelője. A scan szintaxisa a következő: `Rx.Observable.prototype.scan(accumulator, [seed])`, ahol a seed a kezdeti kimeneti értéket írja le, míg az akkumulátor függvényt a bemenet minden új értékére meghívja a rendszer, az új érték és az előző lépés kimenetének ismeretében visszatéríti az új kimenetet. A klasszikus példa egy lista elemeinek összeadása:

```
[1, 2, 3, 4, 5].reduce((sum, value) => sum + value, 0);
// 15
```
A függvény felveszi a 0 kezdőértéket, majd a bemeneti lista minden értékére visszatéríti az előző összeghez hozzáadott értéket. Az rx `scan` művelete hasonlóan műküdik, az alapvető különbség, hogy az akkumulátor minden új eseményre, aszinkron módon van meghívva.

A tanulmányban használt hálózati kommunikáció részleteiről lesz még szó, egyelőre elég azt tudni, hogy a szerverrel való kapcsolat belépési pontján egy Observable folyam regisztrálja az eseményeket, ez továbbítódik a rendszeren keresztül. Néhány transzformációs függvény után a bejövő eseményeket egy `scan` operációba csatolom, ez összesíti a bejövő adatokat, ebből generál kimenetet. Az érdekelt React komponensek megfigyelik ezt a kimenetet, és állapotként tárolják az összesített adatokat, majd prop-ként továbbítják őket a megfelelő komponenseknek, például:

```
.scan((state, update) => {
    const m = update.reduce((map, x) =>
        map.set(x.get("tag"), x.get("count")), Immutable.Map());
    return state.merge(m);
}, Immutable.Map())
// tag-service.js :17
```

Itt az RxJS `scan` függvényét és az Immutable könyvtár lehetőségeit használom a megfelelő adat-állapot eléréséhez. A példa az alkalmazáson belüli címkéket, és azoknak számosságát tárolja egy `Immutable.Map` objektumban. A szerver egyszerre több címke listáját küldi a kliensnek, minden új csomag esetén lefut az aggregátor függvény. Az alkalmazás inicializálása közben létrehozok egy Map-et a scan kezdeti értékeként, majd feldolgozom az érkezett listát (`x`), és módosítom az előző állapotot (`state`), majd továbbküldöm az összesített információt. Elsőre nem egyértelmű, ezért érdekes megfigyelni, hogy a beérkező adatok milyen struktúrában vannak tárolva. Nincs a Flux rendszer Store-jához hasonló explicit adattároló, hanem az RxJS által biztosított scan operáció kezdeti értéke, az általam létrehozott Map az, amit a `state` paraméter hordoz az első adat érkezésekor. Ez az implicit adattárolási mód egy erősen funkcionális technika, és ez a fajta expresszív erő jellemző a bemutatott esemény-folyamokra.

Az RxJS Observable struktúráinak egy fontos jellemzője a lusta kiértékelés, vagyis a folyam semmilyen része nem értékelődik ki addig, amíg nincs legalább egy megfigyelője. Ha az előző példát tekintjük, a scan operáció által visszatérített érték szintén Observable, amelyet megfigyelhetnek Observer típusú objektumok a `subscribe` metódus segítségével. Amíg ez nem történik meg, a scan operáció aggregátor függvénye nem lesz meghívva semmilyen bemeneti értékre. A lusta kiértékelés szintén egy funkcionális technika, és sok előnnyel jár, azonban néhány esetben problémát jelent. Tekintsük azt a lehetőséget, amikor a böngésző még nem hozta létre, illetve illesztette be azt a komponenst, amelyik az Observable objektumot megfigyelné, viszont a szerver már küldött egy adatcsomagot. Ebben az esetben az információ elveszett, mert a folyam nem értékelődik ki. RxJS lehetőséget ad a hasonló problémák megoldására.

A Subject típus implementálja az Observer és az Observable típust is, így egyszerre Observer és Observable. Ennek következményeként egy Subject példány feliratkozhat egy Observable-re, ezzel megkerülve a lusta kiértékelést, míg más Observer típusok megfigyelhetik a példányt. A Subject típusoknak más felhasználása is van, például viselkedhet aggregátorként, amely több bemeneti folyamot összegez egy kimeneti folyammá. A könyvtár lehetőséget ad arra, hogy implementáljuk a saját Subject típusainkat, és rendelkezésünkre bocsájt néhány speciális változatot:
* ReplaySubject: eltárolja az eddig beérkezett eseményeket, így amikor egy Observer feliratkozik, azonnal megkapja az összes eddigi eseményt.
* BehaviorSubject: hasonló a ReplaySubject-hez, az utolsó beérkezett eseményt tárolja.
* AsyncSubject: visszatartja az összes beérkezett eseményt egészen addig, amíg befejezésre nem kerül, ekkor újraküldi a tárolt eseményeket.

Tekintsük az előző példa kibővített változatát:

 ```
 this.subject = new Rx.BehaviorSubject(Immutable.Map());
 this.subject.subscribe(onUpdate);
 this.subscription = this.stream.scan((state, update) => {
     const m = update.reduce((map, x) =>
         map.set(x.get("tag"), x.get("count")), Immutable.Map());
     return state.merge(m);
 }, Immutable.Map()).subscribe(this.subject);
 this.stream.take(1).subscribe(onComplete);
 ```

Az előző példában bemutatott scan operáció eredményét egy szintén kezdeti értékkel létrehozott BehaviorSubject típusba csatoljuk, így ez mindig az adatok legutóbbi aggregált nézetét tartalmazza. Bármelyik friss megfigyelő, a feliratkozás pillanatában megkapja a rendszer jelenlegi állapotát.

Ha nyomon követjük az adatok folyamét a rendszeren belül, láthatjuk, hogy ez hasonló az előbbiekben tárgyalt Flux paradigmáéhoz. A Store struktúrát felváltja a scan operáció, az Action és Dispatcher konstrukciókat pedig a különböző transzformációs függvények, az egyirányú adat-folyam elvét viszont megőrzi a módszer.

Ez a fejezet zárja a tanulmányban használt technológiák és könyvtárak általános bemutatását. A továbbiakban közelebbről is szemügyre veszem, hogyan használhatók ezek a lehetőségek egy modern, komplex web-alkalmazás elkészítésénél, illetve bemutatom az általam elkészített esettanulmányt.

## Egy modern webalkalmazás elkészítése

### Architektúra és felépítés

A rendszer tervezésének egyik fontos szempontja az volt, hogy a termék felhasználói felülete és háttéralkalmazása ne álljanak szoros kapcsolatban egymással, ennek megfelelően a szerver-oldalt egy webes szolgáltatásként készítettem el. Ez azt jelenti, hogy a jól meghatározott interfészen keresztül és a megadott protokollt betartva bármilyen felhasználói felület képes a nyújtott funkciókat felhasználni. A készített front-end alkalmazás a szolgáltatás **fogyasztója**, nem pedig része. A szolgáltatás egy Netty alapú, egyszerű Java alkalmazásnak fogható fel, amely kizárólag a szükséges funkciókat biztosítja, a front-end pedig egy HTML alapú webes alkalmazás, amely a böngészőben fut és szüksége van egy web szerverre. Fejlesztői környezetben egyszerű, lokális és specializálódott szervereket használok erre a célra, üzleti alkalmazásnál kiváló lehetőséget nyújtanak a hasonló célokra létrehozott CDN-ek. Fontos megjegyezni, hogy az erőforrások elérése HTTP protokollon keresztül történik - amelyet a szolgáltató természetesen nem biztosít, hiszen az egy WebSocket interfésszel rendelkezik -, ez is hozzájárul egy külön front-end szerver szükségességéhez.

Ennek az architektúrának előnyei közé tartozik, hogy a front-end nem tud a szolgáltatás infrastruktúrájának részleteiről, és fordítva. Ezen túl lehetőség van ugyanazon rendszeren belül több fogyasztó elkészítésére is, például okostelefonos alkalmazások esetén.

### Fejlesztői környezet

A jQuery-ről szóló fejezetben említettem a spagetti kód problémáját. Mivel a Javscript nyelv nem erősen típusos, a kód szervezésével kapcsolatban sincsenek nagy elvárásai. Hagyományosan, a környezet a HTML dokumentumban hivatkozott `.js` állományok letöltése után sorra végrehajtotta a bennük szereplő utasításokat. Az Javascript nyelv egyik komoly hiányossága, hogy nem lehetséges más erőforrásokat betölteni, rájuk hivatkozni a HTML dokumentum bevonása nélkül. A fejlesztők felismerték az ebből adódó problémákat, és tettek erőfeszítéseket a nyelv modulárissá tételére. Egy ilyen lehetőség az igen népszerű [RequireJS](http://requirejs.org/) könyvtár, amely HTML trükkök alkalmazásával elérhetővé teszi a moduláris fejlesztést. A funkció szükségességét a ECMA bizottság is elismerte, ezért az ES2015 szabvány már támogatja a kód modulokra osztását az `import` és `export` kulcsszavak segítésével. A tanulmány ezt a módszert használja a forráskód rendszerezésére.

Nehéz elképzelni a modern Javascript fejlesztést az ES2015, röviden ES6 szabvány által biztosított funkciók nélkül, és a fenti csak egy példa a sok elengedhetetlen lehetőség közül. Az alkalmazás rendszeresen használja a lambda kifejezéseket (arrow functions), `class` kulcsszót, új vektor függvényeket, stb. A böngészők soha nem látott gyorsasággal illesztik be az új szabványokat a futási környezetbe, azonban a lefedettség még nem teljes, és ne felejtsük el a régebbi böngészők létezését sem. A kompatibilitás problémáját a [Babel könyvtár](https://babeljs.io/) oldja meg, amely képes az ES6 standarban írt kódot egy ES3-nak megfelelő változatba átírni. Ez biztonságosabbá teszi az új funkciók használatát, és biztosítja a régebbi böngészők támogatását. A React fejezetben említettem a JSX szintaxist, azt azonban nem, hogy ez sem azonnal futtatható kódot eredményez, és át kell alakítani standard JS formába. A Babel algoritmusa ezt is megteszi nekünk.

A modularitás lehetővé teszi a kód szervezettségének javítását, ez azonban teljesítmény-beli hátrányokkal jár. A kódot több, kisebb darabra osztjuk, ezzel a böngészőnek több kérést kell intéznie a szerver felé, rontva a hálózat hatékonyságát. Értelmezett nyelv lévén, a JS futási környezet nem törődik a betöltött állományok struktúrájával, vagyis az egy állományba ömlesztett forráskódot képes pontosan úgy értelmezni, mint egy felosztott változatot. Könnyen belátható, hogy a fejlesztés során szeretnénk minél jobban feldarabolt, sűrűn kommentált, deszkriptív elnevezésekkel ellátott kóddal dolgozni, egy fogyasztásra alkalmas szoftver esetén pedig minél jobban központosított, a lehető legtömörebb verziót választanánk. Az olyan eszközök, mint a RequireJS könyvtár, képesek a megírt modulok által létrehozott függőségi fát értelmezni, és a kód egy állományba tömörített, egyszerűsített elnevezésekkel rendelkező változatát generálni.

```
!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}n(1);var o=n(13),i=r(o),s=n(14),u=r(s),a=n(48),c=r(a),l=n(188),p=n(251),f=r(p),h=n(647),d=r(h),v=n(648),y=r(v),b=n(654),m=r(b),g=n(665),_=r(g),w=n(666),E=r(w),O=n(667),x=r(O),N=n(669),S=r(N);window.logger=i["default"],window.logger.enableAll(),c["default"].render(u["default"].createElement(l.Router,{history:l.hashHistory},u["default"].createElement(l.Route,{path:"/",component:f["default"]},u["default"].createElement(l.IndexRedirect,{to:"/dashboard"}),u["default"].createElement(l.Route,{name:"login",path:"login",component:d["default"]}),u["default"].createElement(l.Route,{name:"register",path:"register",component:y["default"]}),u["default"].createElement(l.Route,{name:"dashboard",path:"dashboard",component:m["default"]}),u["default"].createElement(l.Route,{name:"userRoot",path:":username",component:_["default"]},u["default"].createElement(l.Route,{name:"photos",path:"photos",component:E["default"]}),u["default"].createElement(l.Route,{name:"photo",path:"photo/:photoHash",component:x["default"]})),u["default"].createElement(l.Route,{name:"byTags",path:"search/:tag",component:S["default"]}))),document.getElementById("root"))},function(t,e){},,,,,,,,,,,,function(t,e,n){var r,o;!function(i,s){"use strict";r=s,o="function"==typeof r?r.call(e,n,e,t):r,!(void 0!==o&&(t.exports=o))}
```
Ez a példa az esettanulmány kódjának optimizált változatából származik.

A tanulmányban erre a célra a Webpack rendszert használom, amely több hasznos szerepet is ellát:
* Úgynevezett `loader`-eket bocsájt rendelkezésünkre a betöltött állományok feldolgozására, például a már említett Babel könyvtárat a `.js` és `.jsx`, és a Stylus könyvtárat a `.styl` fájlok átalakítására.
* Beépülő (plugin) rendszere segítségével konfigurálhatjuk az építési (build) folyamatot. Például a létrehozott állományok HTML dokumentumba való beszúrását egy ilyen plugin segítségével érem el.
* Lehetőséget ad mind a JS, mind a CSS kód optimizálására.
* Rendelkezik egy saját, fejlesztésre alkalmas HTTP szerverrel, amely a módosított állományokat valós időben újraépíti, így mindig elérhető az alkalmazás legfrissebb változata.

A tanulmány Webpack konfigurációja a `build.js` állományban található, és segítségével lehetséges a projekt mind fejlesztői, mind végleges verziójának felépítése. A fogyasztásra alkalmas verzió egy darab - hatalmas - `.js` állományt tartalmaz, amelyet a böngésző a HTML dokumentum egy `<script>` címkéje alapján ér el. Ezen kívül egy CSS állomány és néhány kép illetve betűtípus állomány születik. Ezeket egy webszerveren vagy CDN-en keresztül kell elérhetővé tennem.

### Kommunikáció

A weben keresztül történő adatkommunikáció alapzata a HTTP protokoll, ezért ismerete minden web fejlesztő számára alapkövetelmény. A fejlesztését Tim Berners-Lee és a CERN mérnökei kezdték el a HTML protokollal egyetemben, és a kettő azóta is szoros kapcsolatban áll egymsással. A böngésző is HTTP-t használ a kért oldalak és egyéb erőforrások megjelenítésére (bizonyos média típusok, például videó más protokollt igényel, ezekről ebben a tanulmányban nem lesz szó).

A HTTP egy kérés-válasz (request-response) architektúra, vagyis a böngésző, a felhasználó cselekedetei alapján egy HTTP kérést intéz a szerver felé, amely egy HTTP válasszal reagál. Mind a kérés, mind a válasz tartalmazza a kommunikáció lebonyotlításához szükséges információt fejlécek (header) illetve tartalom (content) formájában. Például, amikor a felhasználó egy honlapra navigál, a böngésző kérést intéz a szerver fele, az erre érkezett válasz pedig tartalmazza a kért HTML dokumentumot. Ez egy egyszerű és hatékony protokollt eredményez, amely hagyományosan megfelelt az átlagos webfejlesztő elvárásainak.

A HTTP kezdeti korlátozásai nem tették lehetővé komplex alkalmazások készítését, ezt a fejlődő keretrendszerek különböző technikákkal próbálták megkerülni. a Java EE ökoszisztémában például a kliens-oldali állapot módosítása kivált egy HTTP kérést, amelynek nyomán a szerver létrehoz egy új HTML oldalt, amelyet HTTP válasz formájában küld vissza a kliensnek. Ennek következményeként minden kliens-oldali módosítás egy teljes oldalfrissítést eredményez, ez pedig nem ideális felhasználói élmény szempontjából. Egy igazi mérföldkő a front-end technológiákban az úgynevezet AJAX (Asynchronous JavaScript and XML) protokoll bevezetése volt. Ez, ahogy a neve is mutatja, lehetővé tette aszinkron HTTP kérések és válaszok kezelését a Javascript környezetben, elkerülve a teljes oldalfrissítést. Ettől az időponttól ered a SPA (Single Page Application) forradalma. Lehetségessé vált a HTML tartalom egyszeri letöltése és bármilyen későbbi kommunikáció aszinkron módon történő lebonyolítása. Ez lehetőséget adott komplexebb, gyorsabb alkalmazások készítésére és utat nyitott a már említett strukturális keretrendszereknek. Backbone, és a hozzá hasonló könyvtárak rendszeresen kihasználják az aszinkron HTTP kommunikációt.

Az aszinkron kérések bevezetése nem változtat a HTTP alapvető hiányosságán: a kérés-válasz architektúra nem ad lehetőséget a másik irányú kommunikációra, azaz a szerver nem képes a klienst változásokról értesíteni. Ideális esetben a kommunikáció mindkét irányba nyitott, ezt full-duplex rendszernek nevezzük, ezt a HTTP nem képes biztosítani. Ez a limitáció megkerülhető, például kérések periodikus küldésével (short polling), a kérés csatorna nyitva-tartásával ameddig csak lehet (long polling), a már említett RIA, például flash pluginok használatával (flash sockets), stb.; számos könyvtár létezik erre a célra. Szerencsére, a modern fejlesztőnek nem kell ilyen lépésekre hagyatkoznia, hiszen rendelkezésére áll a 2011-ben bevezetett, és a legtöbb modern böngészőben implementált WebSocket protokoll.

A WS protokoll a HTTP-hez hasonlóan TCP alapú, és a kettő szoros kapcsolatban áll egymással. A HTTP-vel ellentétben azonban lehetőséget nyújt full-duplex kommunikációra, egy TCP kapcsolat tetején nyitott kétirányú kommunikációs csatorna segítségével, így mind a kliens, mind a szerver üzeneteket küldhet a nyitott csatornán keresztül. A WS protokollt akkor érdemes használni, ha az alkalmazásunk szeretne valós idejű üzeneteket feldolgozni a szerver részéről. Az esettanulmány ebbe a kategóriába tartozik.

Az alkalmazás egy `socket.io` nevű protokollt használ, amely a WebSocket technológiára épül, és ezt próbálja egységesíteni. Abban az esetben, ha a websocket kommunikáció nem elérhető, a már említett alternatív lehetőségek közül választ, ejtett kapcsolat esetén megpróbál újrakapcsolódni, és az interfésze `(csatorna, üzenet)` típusú adatcsomagokat küld és fogad. Hagyományosan a protokoll kiegészítésként szolgál a standard HTTP kérés-válasz módszeréhez, ezzel téve lehetővé a valós idejű szerver-oldali üzeneteket; a tanulmány esetén úgy döntöttem, hogy a fordított irányt is socket.io alapján modellezem, így az alkalmazás egy, egységes protokollt használ. Ez alól kivétel a statikus erőforrások, azaz képek kezelése, erről nemsokára részletesebben lesz szó.

Az egyszerű <csatorna, üzenet> API nem elégséges egy komplex webalkalmazás számára, ezért egy saját, egyszerű protokoll szabályait így fektettem le: A küldött üzenet egy JSON adatstruktúra `String` reprezentációja, és a következő borítékot tartalmazza:

```
{
    topic,      // string, az üzenet típusa
    requestId,  // number, a kliens által generált egyedi azonosító
    token,      // string, az adatbiztonságot segítő érték
    payload     // json, a küldött adatok JSON formátumban
}
```
Mind a szerver, mind a kliens JSON formátumba konvertálja a borítékot, majd a topic mezőt felhasználva dekódolja a `payload` mező tartalmát is. Az alkalmazás három csatornát használ, a "request" csatornán egy kliens oldali kérést modellez, ahol a kliens küldi az első üzenetet, majd választ vár a szervertől; a requestId mezőt használja a megfelelő válasz azonosítására. A "stream" csatorna hasonlóan viselkedik, azonban a kliens nem csak egy választ vár, hanem egy kezdeti jelenlegi állapot (snapshot) fogadása után valós idejű módosításokat is elfogad. A "command" csatorna a szerver által kezdeményezett üzenetek küldésére szolgál.

#### Szerver

Bár az alkalmazás szervere nem képezi részét a dolgozatnak, a kommunikáció és az általános architektúra szempontjából érdemes szót ejteni róla. A kommunikációs protokoll szerver-oldali implementációjaként a `netty-socketio` nevű könyvtárat használom, amely a Netty Java keretrendszerre épül. A Java alkalmazás futtatásakor a könyvtár megnyitja a megfelelő csatornákat, majd várja a beérkező üzeneteket. Új üzenet esetén a JSON formátumú borítékot POJO-vá alakítva, a topic mezőt használva létrehozza a megfelelő kezelő objektum (handler) példányát. Ez a kezelő dekódolja és POJO-vá alakítja a `payload` mezőt, majd Hibernate-et használva elvégzi a megfelelő lekérdezéseket illetve műveleteket, végül egy másik borítékban, JSON formátumban elküldi a választ. Ha a kezelő "request" típusú, ezen a ponton lezárom; ha "stream" típusú, akkor hozzáadom a jelenleg futó kezelők listájához, így az adatok módosítása esetén frissítéseket küldhet ugyanazt a `requestId`-t használva.

```
final SocketIOServer server = new SocketIOServer(config);
server.addConnectListener(new ConnectListener() {
	@Override
	public void onConnect(SocketIOClient client) {
		ConnectionPool.getInstance().addConnection(new UserConnection(client));
	}
});
server.addDisconnectListener(new DisconnectListener() {
	@Override
	public void onDisconnect(SocketIOClient client) {
		HandlerPool.getInstance().purgeHandlers(client.getSessionId());
		ConnectionPool.getInstance().removeConnection(client.getSessionId());
	}
});
server.addEventListener("request", SocketObject.class, new DataListener<SocketObject>() {
	@Override
	public void onData(SocketIOClient client, SocketObject data, AckRequest ackRequest) {
		HandlerFactory
				.createHandler("request", data, ConnectionPool.getInstance().findConnection(client.getSessionId()))
				.authorize().run();
	}
});
```
```
public class SocketObject {
	private String topic;
	private String requestId;
	private String payload;
	private String token;

    // ...
}
```
Ez a példa demonstrálja a szerver-oldali kód kapcsolattal foglalkozó részét, megfigyelhető a `SocketIOServer` létrehozása, a kliensek kapcsolatainak kezelése, valamint a "request" típusú kezelők létrehozása. A `SocketObject` az említett boríték POJO változata, a bejövő üzenet JSON-ból való átalakítását a könyvtár automatikusan végzi.

#### kliens

A kliens, életciklusa kezdetén megnyit egy socket.io kapcsolatot a szerver felé. Ezt a kapcsolatot egy `Session` nevű, statikusnak felfogható objektumban tárolja. Az alkalmazás többi része nem fér hozzá a nyers kapcsolathoz, de a Session modul biztosítja a megfelelő `request` és `stream` interfészeket.

```
// A socket.io connection objektum létrehozása
this.socket = io.connect("http://" + options.host + ":" + options.port);
this.socket.on("connect", this._onConnect);
this.socket.on("disconnect", this._onDisconnect);
// session.js :25
```
```
// Példa a session interfész használatára
Session.request("login", {
    username: this.refs.username.value,
    password: this.refs.password.value
}, r => {...}
// login-page.jsx :28
```

#### Képek feltöltése és elérése

Az esettanulmány alapvető funkciója a felhasználók képeinek tárolása és terjesztése, ezért szükség van feltöltő és elérési stratégiákra. Ezek a funkciók általában HTTP-re épülnek, a hagyományos HTML form modellt követve a HTTP `POST` protokollt feltöltésre, a `GET` protokollt elérésre használjuk. Ez egy komoly problémát okoz a fentiekben bemutatott rendszer esetén, mert a szolgáltatás HTTP helyett WebSocket alapú. Egy lehetséges megoldás a kép bináris adatként való kezelése: mind a websocket, mind a socket.io protokoll lehetőséget ad bináris üzenetek kezelésére, ezért lehetséges a fel- és letöltendő képeket bináris formátummá alakítani egyik oldalon, illetve vissza-állítani a másikon. Ez a szerver szempontjából elfogadható, azonban a böngésző és a Javascript motor nehézkes és hibákra hajlamos a komplex bináris adatstruktúrák terén. A HTML szoros kapcsolata a HTTP protokollal sok eseteben ellehetetleníti az ilyen műveleteket. Tekintsük példaként a képek standard megjelenítési módját:
```
<img src="..." />
```
Amikor az értelmező ezzel a címkével találkozik, egy HTTP kérést indít el a `src` mezőben megadott címre, és a válaszként küldött képet megjeleníti. A helyi, bináris adatok esetén a szintaxis erre módosul: `<img src="data:base64, ... ">`. Látható ennek a nehézkes természete, valamint nem minden böngésző támogatja egységesen a módszert, a HTML közösségben inkább "trükknek" számít.

Mivel a fejlesztő által létrehozott erőforrások, többek között a HTML oldal és Javascript kód is a szolgáltatlástól független webszerveren tartózkodik, amely HTTP alapú, ez nem probléma. A felhasználó által feltöltött képeket azonban nem tárolhatjuk a statikus szerveren, hiszen a szolgáltatás részei, ezért ez sem megfelelő megoldás.

Egy lehetséges út egy külső CDN szolgáltatás használata, amelyet a szolgáltatáshoz csatolhatunk. A CDN integrálása a saját rendszerünkbe, illetve a képek és az adatbázisunkban tárolt adatok szinkronban tartása komplex művelet, és a front-end-nek ismernie kell ezt a függőséget, ezzel sértve a service-alapú architektúrát.

Ne felejtsük el, hogy a szerver Netty alapú. A projekt kezdőoldalán olvasható, hogy a keretrendszer alkalmas mindenféle hálózat alapú protokoll implementációjára (a netty-socketio könyvtár is pontosan ezt a tulajdonságot használja a socket.io protokoll esetében). A [projekt oldalán](http://netty.io/wiki/) több hálózati standardra is találhatunk példákat, a tanulmány szempontjából azonban a HTTP-re vonatkozó részek érdekesek. Ezen példákat használva írtam meg egy egyszerű HTTP GET és POST protokoll implementációt, amelynek feladata a hagyományos módon feltöltött képek fogadása, illetve a kért képek elérhetővé tétele.

Ezzel az adalékkal a képfeltöltés folyamata a következőképpen néz ki:
1. A kliens elindít egy HTTP POST alapú állomány feltöltést
2. A webszolgáltatás HTTP része a protokoll szabványa alapján dekódolja az üzenetet
3. A megadott képet bájt vektorrá alakítva, egy ideiglenes tárba helyezi
4. A sikeres feltöltés nyomán egy egyedi azonosítót küld a kliensnek
5. A kliens kinyeri az egyedi azonosítót a küldött HTTP válaszból
6. A képhez tartozó egyéb információkat, és az egyedi azonosítót egy WebSocket alapú, "request" típusú üzenetként elküldi a szolgáltatásnak
7. A szolgáltatás, az egyedi azonosító segítségével kinyeri, majd a lemezre írja a feltöltött képet, majd a sikeres műveletet jelzi a kliensnek.

```
// A socket.io szerver mellett elindítok egy saját implementációjú HTTP szervert
new HttpServer().run();
// App.java :85
```

A megoldás fontos része az ideiglenes tár. A feltöltött kép nem kerül a lemezre egészen a 7. lépésig, ezzel biztosítva az alkalmazás biztonságát. A képfeltöltő interfész az egyetlen HTTP alapú komponens.

### Adatkezelés

A lebonyolított kommunikáció oroszlánrésze a `stream` interfészen keresztül történik, ugyanis a szerver által tárolt adatok kizárólag adatfolyamként érhetők el. A stream API kérés-válasz módon van implementálva, de ez csak annyit jelent, hogy a kliens kifejezi *érdekeltségét* az adatok egy halmazát illetően, és a szerver elküldi a jelenleg ismert állapotot (snapshot), majd a későbbi változásokat (update). Ezzel szemben a `request` interfész a kliens által kezdeményzett kommunikáció, és általában a válasz egy sikert vagy hibát jelző állapot-üzenet (status). Az, hogy az adatok a stream, nem a request üzenetek válaszaként érhetők el, hozzájárul az előzőekben taglalt unidirekcionális adat-áramlás elvéhez. Ennek illusztrálására tekintsük a rendszer egyik egyszerűbb rétegét.

Egy felhasználó megjelölhet egy neki tetsző fotót egy csillag ikon segítségével, majd később megtekintheti ezen fotók listáját. Annak modellezésére, hogy az adott felhasználó melyik fotókat jelölte csillaggal, egyedi azonosítókból, vagyis hash-értékekből álló listát használok. A kliens a következő módon kéri az értékek listáját:
```
const d = Session.stream("stars/stream", data);
this.stream = d.stream;
this.requestId = d.requestId;
// star-service.js :8
```
Majd a már ismert scan operáció segítségével tárolja a beérkező értékeket:
```
this.subscription = this.stream
    .scan((state, update) =>
        update.get("operation") === "add" ?
            state.concat(update.get("stars")) :
            state.filterNot(s => update.get("stars").includes(s))
    , Immutable.List())
    .subscribe(this.subject);
```
Az aggregátor függvényből látható, hogy a szerverről beérkező üzenetek a frissen hozzáadott vagy eltávolított hash-értékek listáját tartalmazzák, ezek alapján, az Immutable könyvtár megfelelő függvényeit használva módosítom az adatok állapotát.

Csillagok hozzáadása és eltávolítása a `request` interfészt használja:
```
Session.request(this.props.isStarred ? "star/delete" : "star/new", {
    hash: this.props.photo.get("hash")
});
```

Fontos kiemelni, hogy a kérés mellé nem illesztettünk a válasz esetén végrehajtandó függvényt. Ennek az az oka, hogy válaszként nem várok semmilyen fontos értéket, hiszen az adatok frissítéséért a másik, `stream` típusú kérés felelős. Ennek az elkülönítésnek több szempontból is nagy szerepe van, amelyeket az alkalmazás minden területén alkamazok:
* A rendszerbe kerülő adatoknak egyetlen igazság-forrásuk van, minden pillanatban pontosan tudjuk a jelenlegi állapotot.
* Az adatok szinkronban tartása triviális feladat, hiszen a szerver bevonása nélkül a helyi állapototot sosem változtatjuk.
* Az információ áramlása unidirekcionális.
* A módszer nagyon jól egészíti ki a React filozófiát, ahol a komponensek a rendszer pillanatnyi állapotát dolgozzák fel, ebből generálnak kimenetet. Az adat réteg felel a jelenlegi állapot karbantartásáért, és amikor az állapot változik, értesíti a megfelelő komponenseket, amelyek automatikusan elvégzik a felhasználói interfész megfelelő módosításait.
* Ennek a rendszernek a modellezésére az RxJS könyvtár struktúrái tökéletesen alkalmasak

Az alkalmazás bemeneti pontja a kapcsolat számára megnyitott socket példány `.on` függvényén keresztül érhető el. Ezen a ponton vezetem be az RxJS szolgáltatásait, egy-egy Observable objektumot regisztrálva a releváns csatornákhoz, például:
```
this.requestStream = Rx.Observable.fromEvent(this.socket, "request");
// session.js :82
```
Ezek után, a beérkező események megfelelő kezelőihez való irányítást a `requestId` mező segítségével végzem, a következő képpen:
```
request(topic, data, callback) {
    const requestId = _.uniqueId();
    this.requestStream.filter(r => r.requestId === requestId)
        .map(r => Immutable.fromJS(JSON.parse(r.payload)))
        .take(1)
        .subscribe(callback);

    this._send("request", topic, requestId, data);
}
// session.js :31
```
Amikor az alkalmazás egy másik része meghívja a `request` API-t, a rendszer egy egyedi azonosítót generál. Ezt a `requestId`-t használom arra, hogy a válaszok listájából a `filter` függvény segítségével kiszűrjem a megfelelő eseményt. A beérkező adatot immutable-lé alakítom, a `take(1)` direktíva jelzi az RxJS rendszernek, hogy egy válasz után bezárhatja az objektumot. Ezek után a külsőleg megadott visszahívó függvényt regisztrálom megfigyelőként, végül elküldöm a megadott üzenetet a szervernek. Figyeljük meg, hogy mennyire egyszerűvé teszi a módszer a beérkező üzenetek és az érdekelt felek párosítását. Amikor a "request" csatornán megkérkezik a következő üzenet, csak az az folyam kapja meg az eseményt, amelyik a megfelelő `requestId`-val rendelkezik.

Az folyamat következő része a már bemutatott `scan` függvény használata a jelenlegi állapot tárolására és frissítésére. Mivel az aggregátor függvények az adat típusától függően változnak, szükségünk van egy olyan kód szervezési elvre, amely lehetővé teszi ezt a rugalmasságot, de nem eredményez spagetti kódot. Az érkező adatok típusa szorosan összefügg a kért folyam típusától, amelyet ezentúl témának (topic) nevezek. A téma határozza meg a beérkező adatok típusát és az aggregátor függvények tartalmát, ezért ezen információkat egy szolgáltatás (service) objektumba csoportosítom. Tekintsük most a teljes csillag szolgáltatást:

```
export default class StarService {
    constructor(data, onUpdate, onComplete) {
        const d = Session.stream("stars/stream", data);
        this.stream = d.stream;
        this.requestId = d.requestId;

        this.subject = new Rx.BehaviorSubject(Immutable.List());
        this.subject.subscribe(onUpdate);

        this.subscription = this.stream
            .scan((state, update) =>
                update.get("operation") === "add" ?
                    state.concat(update.get("stars")) :
                    state.filterNot(s => update.get("stars").includes(s))
            , Immutable.List())
            .subscribe(this.subject);
        this.stream.take(1).subscribe(onComplete);
    }
    destroy() {
        Session.cancel(this.requestId, () => {
            this.subscription.unsubscribe();
            this.subject.dispose();
        });
    }
}
// star-service.js
```
A service konstruktorának szüksége van azokra az adatokra, amelyeket a `stream` kérés részeként a szerver felé küldünk, valamint egy függvényre, amelyet az adatok frissítése esetén hívok meg. A service kérvényezi az adat-folyamot, majd inicializálja az adatok tárolására szolgáló `BehaviorSubject` objektumot. A scan operáció és az aggregátor függvény végzik az adatok frissítését, végül beállítunk egy segédfüggvényt, amely az első válasz (snapshot) érkezésekor fut le. Amikor egy, a megfelelő `requestId`-val rendelkező esemény érkezik, az aggregátor frissíti a jelenlegi állapotot, ezt továbbítja a subject objektumnak, amely a megadott `onUpdate` függvényen keresztül értesíti az érdekelt feleket az állapot változásáról. A service bezárása a szerver értesítéséből, majd az erőforrások felszabadításából áll.

A szolgáltatás objektumot a következő képpen használom:
```
this.starService = new StarService({
    username: Session.user.get("username")
}, stars => {
    this.setState({
        stars
    });
});
// dashboard-page.jsx :38
```

A második paraméter az a függvény, amely az adatok frissítésekor fut le, az új állapotot a React komponens `state` mezejében tárolja. Ennek módosításakor a React rendszer újra rendereli a komponenst, valamint a gyerek komponensek teljes al-fáját, így a leszármazottaknak `prop`-ként átadott `star` lista mindig naprakész marad. Ne feledjük el, hogy a példában megadott `stars` objektum egy `Immutable.Map` példánya.

Ennek az architektúrának köszönhetően azok a komponenseink, amelyek az adat réteggel kapcsolatban állnak, általában közel helyezkednek el a React komponensek gyökeréhez, és a prop mechanizmus segítségével teszik az adatokat elérhetővé a gyerek-komponensek számára. A React rendszerben jó szokás a lehető legbutább komponensek írása, ezért az ilyen "okos", adatokkal foglalkozó objektumokat gyakran Kontroller Komponensnek nevezzük.

A tanulmány esetében minden adattípus kezelését egy service objektum végzi, és a frissítéseket egy magas szintű (azaz a gyökérhez közelebbi) React komponens fogyasztja el, a mindenkori állapotot `prop`-ként továbbítva. A csillag adat-réteg példája esetén a fenti `dashboard` komponens csatlakozik a service objektumhoz, majd a render metódusban továbbítja az adatokat:

```
<DashboardSection
    title="My Photos"
    maxCount={8}
    photos={this.state.photos.toList()}
    stars={this.state.stars}
    onMore={this.onMyPhotos}/>
// dashboard-page.jsx
```
Majd a `DashboardSection` komponens render metódusában:
```
<VerticalGallery
    photos={photos}
    stars={this.props.stars}
    columns={4}/>
// dashboard-section.jsx
```
Végül a `VerticalGallery` komponens szintjén kerülnek feldolgozásra:
```
isStarred={this.props.stars.includes(photo.get("hash"))
// vertical-gallery.jsx
```

### A megjelenítő réteg: React

Az előző fejezet végén adott példa remekül illusztrálja a React munkafolyamatot és az elemek kompozíciójának erejét. A fentről lefele folyó információ, a fa szerkezetbe szervezett komponensek és a felhasználói interfész automatikus frissítése egy, a procedurális paradigmától gyökeresen eltérő gondolkodásmódra készteti a fejlesztőt, és ennek a látásmódnak az elsajátítása kulcs-szerepet játszik a hatékony React programozásban. Ennek a különbségnek a bemutatására tekintsük a következő használati esetet: létezzen egy olyan online képgaléria, amelybe a felhasználó képeket illeszthet be. Amikor a felhasználó egy új képet tölt fel, a rendszer ezt automatikusan beilleszti a galériába, megőrizve a kiválasztott rendezési sorrendet, illetve kezelve a feltöltés során felmerülő hibákat.

Egy hagyományos, például MV* keretrendszerben az első döntés, amelyet meg kell hoznunk, hogy optimista vagy pesszimista módon végezzük a beillesztést. Ebben a helyzetben több értelme van a pesszimista módszernek, azaz megvárjuk a szerver visszajelzését a kép beszúrásához. Ennek megfelelően először AJAX segítségével feltöltjük a képet, és a kérésre rácsatolunk egy visszahívó függvényt. Ha a szerver hibát jelez, ezt megjelenítjük, ellenkező esetben létrehozunk egy új képet a galéria számára. Végigjárjuk a létező DOM komponenseket, megkeressük a kép pontos pozícióját, majd beszúrjuk az új elemet. Esetleg szükség lehet a létező fotók újracsoportosítására; az esettanulmányban egy olyan galéria szerepel, amely oszlopokra osztja a képeket, és könnyen előfordulhat, hogy egy kép beszúrása megváltoztatja az oszlopok felépítését.

Ugyanez az eset a React architektúrában: a fotók listáját egy szervice objektum biztosítja, például a `DashboardPage` komponens számára, amely továbbítja ezt a `DashboardSection` komponensnek:
```
// Állapot lekérése a service objektumtól
new PhotosService("photos/stream", {
    username: Session.user.get("username")
}, photos => {
    this.setState({
        photos
    });
});

// Al-komponens létrehozása
<DashboardSection
    title="My Photos"
    maxCount={8}
    photos={this.state.photos.toList()}
    stars={this.state.stars}
    onMore={this.onMyPhotos}/>
// dashboard-page.jsx
```

 A `DashboardSection` komponens felel az adatok rendezéséért, majd továbbítja ezeket a galériáért felelős komponensnek:
```
onSortChange(sortValue) {
    this.setState({
        sortValue
    });
}

const photos = this.props.photos
    .sort(this.sorters[this.state.sortValue])
    .take(this.props.maxCount || Infinity);

return (<VerticalGallery
    photos={photos}
    stars={this.props.stars}
    columns={4}/>)
// dashboard-section.jsx
```

A komponens saját `state` struktúrájában tárolja a jelenlegi rendezési elvet. Ezt használja a fotók listájának rendezésére, majd továbbítja a rendezett listát a galéria komponensnek.
```
renderColumn(column) {
    return (<div className="column">
        {column.map(photo =>
            <PhotoThumb key={photo.get("id")} photo={photo}
                isStarrable={photo.get("username") !== Session.user.get("username")}
                isStarred={this.props.stars.includes(photo.get("hash"))}
            />)}
    </div>);
}
```

A `VerticalGallery` komponens egy kissé változtat a megjelenítés módján, de a lényeges rész a `renderColumn` metódus. Ez végigjárja a fotók listáját a `map` függvény segítségével, és mindegyik számára megjelenít egy előnézetet, az `<img src={this.props.photo.get("path")} />` szintaxist használva.

Vizsgáljuk meg, hogyan viselkedik a rendszer egy új fotó beillesztése esetén. Kezdetnek, a service objektum frissíti az állapotát, majd értesíti a `DashboardPage` komponenst. Ez felülírja az előző fotókat az új listával, amely eggyel több elemet tartalmaz, és továbbítja az új állapotot a `DashboardSection` komponensnek. Ez a `render` metódusban rendezi az új listát a már kiválasztott rendezési elv alapján, majd értesíti a galéria komponenst, amely a régi lista helyén megjeleníti az újat. Ez a folyamat triviálisnak tűnhet, mert az is, elvégre a React interfészének ez az egyszerűség alapvető célja.

Sok esetben nem tűnik intuitívnak ez a gondolkodásmód, magunkban felhorkantunk és feltesszük a kérdést, "miért renderelném újra a teljes listát, amikor csak egy értéket szeretnék beszúrni?", de ne feledjük, hogy a Javascriptben végzett műveletek gyorsak, és tudjuk, hogy a motorháztető alatt a React ennyire nagyvonalú és komoly optimizációk történnek, amelyek biztosítják a lehető legjobb teljesítményt. A két gondolkodásmód közötti különbséget legtömörebben talán úgy foglalhatnánk össze, hogy amíg a hagyományos, MV* alapú rendszerek viselkedési (behavioral) mintákat, addig a React építészeti (architectural) mintákat alkalmaznak. Az imperatív és deklaratív nyelvek közötti különbség illusztrálására gyakran használjuk a kifejezést: az előbbi a *hogyan*, míg utóbbi a *mit* (*how* versus *what*) kérdésre keresi a választ. A párhuzamot talán a React deklaratív stílusára is ki lehet terjeszteni.

Az esettanulmányban bemutatott alkalmazás végeredményben két, önmagukban egyszerű komponensből áll. Az első a már bemutatott adatok hálózata. Ezek nagyrésze a szerverről származik, az üzleti logika része, és a service objektumok felelősek minden szinkronban tartásáért. A másik réteg tulajdonképpen React komponensek egy halmaza, amelyek az adatok köré vannak építve, és a nyers információt alakítják az alkalmazás tartalmává. Bármikor, amikor az alapul szolgáló információ változik, a tartalom reagál.

### Kiegészítő információk

Az alkalmazás fejlesztői folyamatának bemutatásakor érintettem minden nagyobb témakört, azonban van pár olyan érdekesség és koncepció, amelyekről még nem esett szó.

A HTML/CSS réteg implementációjának részleteit nem mutattam be. Ennek az oka nagyrészt az egyszerűségben rejlik, a teljes HTML tartalom például ennyiből áll:
```
<html>
    <head>
        <title>VSUI</title>
    </head>
    <body>
        <div id="root" />
    </body>
</html>
```
Az egyetlen div címke arra szolgál, hogy a gyökér React elemet legyen hová beilleszteni, a tartalom többi része kizárólag komponensekből és react-módon generált HTML elemekből áll. A CSS az általános bemutatóban leírt Stylus könyvtár szabályai alapján készült, a megértéséhez alapvető CSS ismeretekre van szükség, amelyekre ez a munka nem koncentrál.

Az adatbiztonság implementációja az elterjedt "munkamenet kulcs" (session token) alapján történik. Minden új, a szerver felé nyitott kapcsolat nem-biztonságosként jön létre. A felhasználó bejelentkezésekor a szerver generál egy egyedi kulcsot, amit az adatbázisban tárol a felhasználó identitásával és a lejárati idővel együtt, majd visszatéríti ezt a tokent a felhasználónak. A következő kérések esetén a kliens alkalmazásnak mindig csatolnia kell a token-t az üzenet borítékához, ellenkező esetben a szerver nem fogadja el a kérést. Ha a token helyes, a szerver a kapcsolatot biztonságosként kezeli, elvégzi a kért utasítást és növeli a lejárati időt. A kliens a tokent helyi tárba mentheti, és a következő munkamenet folyamán újrahasználhatja. Létezik egy `validate` API, amely segítségével a kliens értesülhet a token helyi másolatának állapotáról.

A SPA-ök hátránya a többoldalas alternatívákkal szemben, hogy nem használható bennük a böngésző navigációja. Ez nem csak kényelmetlen, de egy weboldal URL-je állapotot is tárolhat, például, a már említett "internet első weboldala" esetén hivatkozhatok bármelyik HTML dokumentumra. Egy SPA erre nem képes, hiszen nincs több HTML dokumentum. Ennek megoldására léteznek az úgynevezett kliens oldali routerek. Ezek a könyvtárak a böngésző navigációs és történelmi rendszeréhez csatlakozva imitálják a többoldalas rendszerek navigációs képességeit. Az esettanulmány a kimondottan React rendszerek számára készített React-router könyvtárat használja, és működése igen egyszerű.
```
<Route name="userRoot" path=":username" component={UserRoot} >
    <Route name="photo" path="photo/:photoHash" component={PhotoPage} />
</Route>
```

Ez a példa azt mutatja be, hogyan irányítja a rendszer a megadott URL információt a megfelelő komponensekhez. Ha egy felhasználó az `ip:port/<username>/photo/<photo-hash>` mintájú URL-el nyitja meg az alkalmazást, a router a megfelelő komponenseket illeszti a DOM-ba. A router lehetőséget ad az oldalak közötti navigációhoz is, a `router.push({pathname})` API segítségével. Természetesen ez nem navigál egy másik oldalra, de megváltoztatja a URL-t és a helyes állapotba hozza a komponenseket, ezzel emulálva a hagyományos navigációs interfészt.

A modern Javascript fejlesztés nincs a böngészőre korlátozva, sok fejlesztő ír szerver-oldali kódot a JS környezetben. A node.js könyvtár tartalmaz egy szerver-oldali JS motort, illetve egy `npm` nevű függőség kezelő rendszert is. Ez utóbbit front-end rendszerek is használhatják, ugyanis a legtöbb itt felsorolt könyvtár és eszköz futtatható mind node, mind böngésző környezetben (még a React is, sokan használják előre renderelt szerver-oldali komponensek gyártására, de ez jelen dolgozat kiterjedésén kívül áll). Ez az esettanulmány is az `npm` rendszert használja függőségek kezelésére, ezért a futtatáshoz szükség van egy telepített node környezetre, és a függőségek teljes listája megtalálható a `package.json` állományban. Megjegyzendő, hogy az alkalmazás optimizált verziója egy darab `.js` állományt tartalmaz, amelybe az összes használt könyvtár bele van építve, így ennek futtatásához nincs szükség külső állományokra.

## Konklúzió

Lenyűgöző belegondolni, hogy az utóbbi pár év mennyi fejlődést hozott a front-end technológia terén. Ez a tempó a szenvedélyes közösségnek köszönhető, és segített abban, hogy a Javascript kiváljon a sűrűn használt, de még sűrűbben átkozott nyelvek kategóriájából, és felkerüljön a legnépszerűbb webes technológiák listájára. A jövő kecsegtető, az egyre jobb standardok, ezeknek megfelelni kívánó böngészők, szerver-oldali terjeszkedés annak jele, hogy a nyelv jó irányba halad. Ezzel a munkával szerettem volna, természetesen a teljesség igénye nélkül, betekintést nyújtani a modern JS fejlesztés egy kis szeletébe.
