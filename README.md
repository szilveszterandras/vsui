## Build

A UI-t először buildelni, majd egy webszerveren futtatni kell.

1. A build-hez a node és npm (node package manager) dependenciákra van szükség, létezik windows installer, illetve linux alá package manager csomagok (`apt-get install nodejs npm`).
2. A projekt gyökérkönyvtárban az `npm install` parancs installálja a szükséges függőségeket.
3. A futtatás legyegyszerűbb módja az `npm run dev` parancs (alternatívan a `node build.js dev` parancs), ezzel egy development szerver indul a `localhost:8080` porton. Ha ez nem felel meg, bármilyen web-szervert lehet használni, az `npm run prod` parancs előkészíti az állományokat a `build` könyvtárban, ezeket bármilyen web-szerverből lehet futtatni.
4. A UI-nak egy futó szerverhez kell csatlakoznia. Alapértelmezetten a `9092` porton létesíti a websocket kapcsolatot, illetve a `9093` porton a képfeltöltéshez szükséges API-hoz. A szerver Ip címe (helyi szervernél `localhost`), valamint a portok a `src/app/utils/globals.js` állományban módosíthatók. Újra-buildelés szükséges.

A minimális futtatáshoz:
1. Fusson a szerver a helyi gépen.
2. Futtassuk az `npm install` parancsot.
3. Futtassuk az `npm run dev` parancsot.
4. Nyissuk meg a `localhost:8080` címet Chrome-ban.
