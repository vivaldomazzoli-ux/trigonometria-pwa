# Trigonometria interattiva — Web App / PWA

**Progetto scolastico: Maria Vittoria Mazzoli · Classe 4ª B · Liceo Alessi.**

Una versione web separata dell’applicazione desktop Python. Nessun file desktop è stato modificato. La PWA non richiede Python, account, installazione di librerie o un server applicativo: basta un browser. È pronta per GitHub Pages e può essere salvata sulla schermata Home del telefono.

## Per iniziare

### Aggiornamento 1.0.6 — PC e iPhone

Sul PC la circonferenza occupa meno larghezza e i quattro grafici hanno più spazio. Sul telefono circonferenza a sinistra e una curva a destra restano visibili insieme; scegli la funzione con i quattro pulsanti colorati. Play e Reset sono subito sotto. Ruota il telefono in orizzontale per ingrandire la vista; in verticale le etichette del cerchio sono necessariamente più piccole.

Il riepilogo vicino all’angolo usa frazioni semplici come π/2, 7π/2 o 13π/9 quando corrispondono all’angolo; per gli altri valori usa radianti decimali con ≈. Il convertitore conserva la sua forma con π anche per gli angoli generici.

Per aggiornare il sito già pubblicato:

1. Apri `https://github.com/vivaldomazzoli-ux/trigonometria-pwa`.
2. Scegli **Add file → Upload files**.
3. Trascina tutto il contenuto della cartella aggiornata `Trigonometria_PWA`, comprese le cartelle `css`, `js` e `icons`. Non trascinare il contenitore `Trigonometria_PWA` né lo ZIP. Il file `index.html` deve restare nella radice.
4. Premi **Commit changes**. La pubblicazione GitHub Pages parte automaticamente; non occorre cambiare nuovamente Settings → Pages.
5. Dopo la pubblicazione, riapri il sito online e premi **Aggiorna l’app** se compare, anche sull’iPhone. L’indirizzo del sito resta `https://vivaldomazzoli-ux.github.io/trigonometria-pwa/`.

La versione del service worker è già incrementata a 1.0.6: non devi editarla per questo aggiornamento.

### Prima apertura

1. Estrai lo ZIP.
2. Apri la cartella `Trigonometria_PWA`.
3. Puoi aprire `index.html` con un doppio clic per una prima prova della circonferenza e del convertitore.
4. Per provare installazione e offline, usa un server locale o pubblicala su HTTPS. Il semplice doppio clic non attiva il service worker.

## Funzioni conservate

- Circonferenza goniometrica, raggio OP e punto P trascinabile con mouse o dito. Il trascinamento si interrompe su annullamento del tocco e sospende l’animazione.
- Tacche ogni 15°, tutti gli angoli notevoli della versione Python e relative equivalenze in π. Il punto a 0° mostra anche 360° = 2π.
- Angoli totali da −36.000° a +36.000° (100 giri in entrambi i versi), equivalente nel giro, giri e resto, radianti totali e quadrante.
- Seno blu, coseno verde, tangente arancione e cotangente viola: stessi colori nei segmenti, nei valori e nei grafici.
- Punti non definiti, segni dei limiti laterali e frecce oltre la scala del cerchio. Un valore finito molto grande resta distinto da un valore non definito.
- Quattro grafici che si costruiscono da 0 all’angolo totale, continuano oltre 360° e mostrano asintoti senza collegare erroneamente i due rami. Il punto attuale è un triangolo quando è fuori scala.
- Play/Pausa, Reset, velocità da 1 a 120°/s, ingresso manuale, pulsanti ±360°, caselle per mostrare/nascondere le funzioni.
- Convertitore: gradi decimali, gradi-minuti-secondi e radianti, anche come multipli di π; pulsante per usare il risultato sulla circonferenza.
- Quattro istruzioni sotto il cerchio, nome del progetto scolastico, disposizione responsive e scroll naturale.

## Come scrivere gli angoli

| Formato selezionato | Esempio | Significato |
|---|---|---|
| Gradi decimali | `13,17` oppure `13.17` oppure `13,17°` | 13,17 gradi |
| Gradi, minuti, secondi | `15 30 0` oppure `15° 30′ 0″` | 15,5 gradi |
| Radianti / forma con π | `2` | 2 radianti, circa 114,59° |
| Radianti / forma con π | `2pi` oppure `2π` | 360° |
| Radianti / forma con π | `7pi/2`, `7/2pi`, `(7/2)*pi` | 630° |
| Radianti / forma con π | `13pi/9` oppure `13/9π` | 260° |
| Radianti / forma con π | `17π/4` | 765° |
| Radianti / forma con π | `13/9` | 13/9 radianti, senza π |

Usa una sola virgola o un solo punto decimale, senza separatori delle migliaia. Minuti e secondi devono essere inferiori a 60. Il convertitore può mostrare risultati oltre ±36.000°, ma il pulsante per applicarli alla circonferenza segnala il limite.

## Prova in locale

### Con Python già disponibile sul PC

Apri un terminale nella cartella `Trigonometria_PWA` e avvia:

```text
python -m http.server 8000 --bind 127.0.0.1
```

Poi visita **http://127.0.0.1:8000/**. Python serve soltanto a questa prova locale; la versione online e installata non lo richiede. Puoi usare anche un server statico, ad esempio l’estensione Live Server di VS Code.

### Prova offline

Apri la PWA via server locale o HTTPS e attendi **“Disponibile offline”** nel fondo della pagina. Chiudila, disattiva la connessione e riaprila. Tutte le risorse principali, comprese le icone, sono locali e memorizzate dal service worker. La disponibilità è limitata al browser/dispositivo che ha effettuato il primo caricamento e può terminare se ne cancelli i dati o se il sistema libera lo spazio.

## Pubblicazione gratuita su GitHub Pages

1. Accedi a GitHub e crea un repository **pubblico**, ad esempio `trigonometria-pwa`.
2. Nel repository scegli **Add file → Upload files**.
3. Carica il **contenuto** di `Trigonometria_PWA`: `index.html` deve essere nella radice del repository, accanto alle cartelle `css`, `js` e `icons`. Non caricare soltanto lo ZIP.
4. Salva i file con **Commit changes**.
5. Vai a **Settings → Pages**.
6. In **Build and deployment**, scegli **Deploy from a branch**, poi **main** e **/ (root)**. Salva.
7. Attendi la pubblicazione; la stessa pagina mostrerà il link, normalmente `https://TUO-NOME.github.io/trigonometria-pwa/`.
8. Apri il link, controlla il cerchio e attendi “Disponibile offline”. Puoi condividere quel link.

I percorsi sono relativi: la PWA funziona anche nella sottocartella del repository, senza riscrivere JavaScript o manifest. GitHub Pages pubblica siti statici; non serve compilare il progetto. [Guida ufficiale GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Aggiornare la versione online

1. Modifica i file nella tua copia della PWA.
2. Per modifiche successive a questo pacchetto cambia `VERSION` all’inizio di `service-worker.js`, per esempio da `1.0.6` a `1.0.7`.
3. Carica e salva su GitHub tutti i file modificati, incluso `service-worker.js`.
4. Dopo la pubblicazione, riapri l’app online. Quando appare **“Aggiorna l’app”**, premilo: il nuovo service worker sostituisce la versione precedente e ricarica la pagina.

Il cambio di versione è necessario per aggiornare la cache in modo coerente. Senza questo passaggio, i dispositivi già visitati possono continuare a usare la vecchia app. Non aggiornare mentre vuoi conservare un angolo corrente: l’aggiornamento riparte da 0°.

## Installazione su iPhone / iPad

1. Apri il link pubblicato in **Safari**.
2. Tocca **Condividi**.
3. Scegli **Aggiungi alla schermata Home**.
4. Se presente, attiva **Apri come app web**; conferma con **Aggiungi**.
5. Apri la nuova icona mentre sei ancora online e attendi “Disponibile offline”.

Il pulsante “Installa l’app” nella pagina mostra queste istruzioni quando il browser non offre un’installazione automatica. Le voci possono variare con la versione di iOS. [Istruzioni ufficiali Apple](https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios).

## Installazione su Android e PC

Su Android apri il link con **Chrome**. Premi **“Installa l’app”**, se viene proposto, oppure usa il menu del browser: **Installa app / Aggiungi alla schermata Home**. Conferma l’aggiunta. Su PC, Chrome ed Edge offrono un comando di installazione nella barra degli indirizzi o nel menu. Il sito resta utilizzabile anche nei browser che non propongono l’installazione. [Requisiti e supporto PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable).

## Alternativa: Cloudflare Pages

Nel pannello Cloudflare scegli **Workers & Pages**, crea un progetto Pages tramite **Direct Upload**, assegna un nome e carica i file statici della PWA. Puoi trascinare la cartella o un archivio del progetto: `index.html` deve essere nella radice del sito risultante. Cloudflare fornisce un link HTTPS `*.pages.dev`; non è richiesto un comando di build. [Guida ufficiale al caricamento diretto](https://developers.cloudflare.com/pages/get-started/direct-upload/).

## Problemi comuni

- **Pagina 404 su GitHub:** controlla che `index.html` sia nella radice, che Pages punti a `main / (root)` e che la pubblicazione sia terminata.
- **Vedo la vecchia versione:** incrementa `VERSION`, pubblica il service worker e premi “Aggiorna l’app”. In alternativa cancella i dati del solo sito e riaprilo online.
- **Offline non disponibile:** `file://` non basta. Usa HTTPS oppure `http://localhost` / `http://127.0.0.1`. Un indirizzo HTTP nella rete locale non soddisfa normalmente i requisiti di sicurezza del service worker.
- **Sul telefono non vedo Installa:** usa Safari su iPhone e Chrome su Android; l’installazione può stare nel menu invece che nella pagina.
- **Il convertitore non accetta π:** scegli il formato Radianti / forma con π. Sono accettati `pi` e `π`.
- **Tangente non definita:** a 90° + k·180° il valore non esiste; i limiti sono +∞ a sinistra e −∞ a destra. Per cotangente, a k·180° i limiti sono −∞ a sinistra e +∞ a destra.
- **Tocco vicino al centro:** il trascinamento inizia soltanto vicino a P o alla circonferenza; avvicinarsi al centro durante un trascinamento non cambia l’angolo.

## Struttura

```text
Trigonometria_PWA/
  index.html
  css/style.css
  js/math.js
  js/app.js
  icons/favicon.svg
  icons/icon-192.png
  icons/icon-512.png
  icons/icon-maskable-512.png
  icons/apple-touch-icon.png
  manifest.webmanifest
  service-worker.js
  .nojekyll
  README.md
  VERIFICHE.md
```

`js/math.js` è separato per permettere i test del calcolo. Non sono usate librerie, CDN, font remoti, statistiche o backend. Il service worker conserva una cache distinta per ciascun indirizzo del sito. Il file `VERIFICHE.md` descrive i controlli realmente effettuati e quelli da completare su dispositivi fisici.
