## Build

A UI-t először buildelni, majd egy webszerveren futtatni kell.

1. A build-hez a node és npm (node package manager) dependenciákra van szükség, létezik windows installer, illetve linux alá package manager csomagok (`apt-get install nodejs npm`).
2. A projekt gyökérkönyvtárban az `npm install` parancs installálja a szükséges függőségeket.
3. A futtatás legyegyszerűbb módja az `npm run dev` parancs, ezzel egy development szerver indul a localhost:8080 porton. A alternatívan a `node build.js dev` parancs.

A szerver alapból a localhost:9092 és 9093 portokon fut, ez a UI-ba hardcode-olva van. Ha ez változik, a kövekező helyeken kell módosítani:
* `src/app/components/upload-component`; http szerver portja
* `src/app/components/register-page`; http szerver portja
* `src/app/components/main-page`; websocket szerver portja
