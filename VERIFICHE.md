# Verifiche della PWA

Versione consegnata: **1.0.11**. La cartella PWA è separata dai file Python desktop.

## Verifiche dell’aggiornamento 1.0.11

- Scala iniziale ±5 verificata per tangente e cotangente; aggiunta ±30. Test automatici verificano tacche, segni dei limiti, valori finiti fuori scala anche oltre ±30, conservazione dell’angolo/giri e selezione dei pulsanti.
- Altezza reale del Canvas: 320 pixel a 320×568 e 390×844, 331,5 pixel a 844×390; 176,6 pixel a 1366×768 come nel precedente layout PC. Nessuno scroll orizzontale alle quattro dimensioni.
- A 844×390 seno e coseno conservano il Canvas di circa 216 pixel; il Canvas di tangente/cotangente supera 331 pixel. Il confronto con i circa 194 pixel precedenti riguarda la tangente con il proprio selettore di scala.
- Scorrimento di 98 pixel nel browser orizzontale: il cerchio rimane nella schermata (bordo superiore del pannello a 8 pixel) e si vede la curva più alta. Continuando lo scroll, il pannello si arresta al confine della propria area e non copre i controlli.
- Aggiornamento tramite service worker verificato; console della versione finale senza errori. Gli altri test matematici, convertitori, mouse/touch simulati, animazione e multi-giro sono superati.
- Le misure sono del browser di anteprima, non di Safari su un iPhone fisico. La nuova cartella deve essere caricata su GitHub e poi provata sul telefono.

## Verifiche dell’aggiornamento 1.0.8

- Pulsanti ±2/±5 per tangente e cotangente provati con i veri gestori dell’app: selezione coerente, scala indipendente per funzione, angolo e multi-giro conservati. Scala iniziale ±2.
- Test del disegno Canvas: tacche ±2/±5 corrette; un valore finito fuori scala usa il triangolo al posto del punto; nella scala più ampia torna il punto. Seno/coseno conservano tacche ±1. Valori non definiti non sono confusi con valori finiti fuori scala; segni dei limiti verificati per entrambi i poli.
- Caso del telefono riprodotto nel browser con 471,03°: tangente circa −2,601018 (la differenza rispetto allo screenshot dipende dai decimali non mostrati). In ±2 appare fuori scala e in ±5 il punto è visibile. Due anteprime salvate.
- Layout verificato a 844×320, 844×390, 390×844, 320×568 e 1366×768; nessuno scroll orizzontale. Nel browser a 844×390 il Canvas passa da circa 148 a 194 pixel d’altezza; l’area della curva, esclusi gli assi e le etichette, passa da circa 97 a 143 pixel. Il grafico rientra nella schermata; i comandi inferiori possono richiedere scroll.
- Scala conservata cambiando dimensione dello schermo; test automatici di convertitore, mouse/touch simulati, multi-giro, animazione, selezione della curva e cache superati.
- Aggiornamento 1.0.6 → 1.0.8 provato tramite il pulsante della PWA. Server poi arrestato, pagina ricaricata dalla cache e scala ±5/cambio angolo da tastiera verificati offline. Nessun errore JavaScript della versione finale osservato.
- Questa versione locale deve essere caricata su GitHub; le prove Safari e touch fisico restano da effettuare dall’utente sul telefono.

## Verifiche dell’aggiornamento 1.0.6

- PC: pannello della circonferenza meno largo, quattro grafici con più spazio; misurazione a 1366×768 e 1920×1080.
- Telefono e tablet: circonferenza a sinistra e un grafico a destra; pulsanti Seno, Coseno, Tangente, Cotangente. Provati a 320×568, 390×844, 768×1024 e 844×390; nessuno scroll orizzontale. In orizzontale 844×390, anche Play e Reset rientrano nella schermata iniziale. Schermi più bassi possono richiedere uno scroll per questi comandi, ma cerchio e grafico restano affiancati.
- Tutti e quattro i pulsanti provati nel browser: una sola curva visibile, selezione indicata, angolo 765° conservato durante il cambio. I segmenti sul cerchio restano regolabili con le caselle nei valori correnti.
- Play/Pausa e Reset compatti condividono lo stato con i comandi principali. Verifica nel browser e test automatici della sincronizzazione.
- Radianti vicino all’angolo: frazioni semplici per angoli appropriati (90°, 260°, 630°, 765°, ±36.000°), decimali preceduti da ≈ per angoli generici. Caso segnalato 429,7025° → ≈ 7,49972 rad verificato nel browser; nessuna grande frazione nel riepilogo.
- Test automatici dei calcoli e convertitori, degli eventi mouse/touch, del multi-giro, dei poli e della nuova selezione superati.
- Aggiornamento della cache precedente provato nel browser. Gli asset vengono richiesti con cache reload per evitare file HTTP obsoleti durante l’installazione di una nuova versione.
- Offline riprovato sulla 1.0.6: server fermato, pagina ricaricata, selezione cotangente e modifica angolo da tastiera funzionanti; nessun errore della versione finale rilevato.
- Le prove di schermo sono fatte nel browser di anteprima; Safari e un iPhone fisico vanno verificati dall’utente dopo il caricamento. Il trascinamento touch è verificato con eventi simulati.

I controlli seguenti documentano anche le verifiche della versione iniziale.

## Controlli completati

- **Pagina in browser:** apertura da server locale, circonferenza SVG e quattro grafici Canvas visibili. Nessun errore JavaScript rilevato nella console durante le prove online e offline.
- **Interfaccia responsive:** larghezze di 320, 390, 768, 1440 e 1920 pixel; nessuno scroll orizzontale dell’intera pagina e nessun pannello più largo del proprio contenitore. Anteprime desktop e telefono salvate separatamente.
- **Angoli:** 0°, angoli notevoli e conversioni in π, angoli negativi, 630°, 765°, 1080° e limiti ±36.000°. Fuori intervallo rifiutato senza alterare lo stato corrente.
- **Calcolo:** confronto numerico con le funzioni estratte direttamente dal Python desktop su 153 angoli, compresi segni nei quattro quadranti e punti non definiti.
- **Convertitore:** virgola/punto, simbolo °, gradi-minuti-secondi, radianti numerici, frazioni senza π, `7pi/2`, `7/2pi`, `(7/2)*pi`, `13pi/9`, `17π/4`; rifiuto di denominatore zero e input non validi. Verifica in browser di 7π/2 = 630° e 13π/9 = 260°.
- **Interazioni:** controlli visibili Applica, Play/Pausa, conversione e uso del risultato; test automatici degli eventi mouse e touch attraverso gli stessi gestori Pointer Events, del passaggio 719° → 721° e −359° → −361°, dell’annullamento del tocco, delle frecce della tastiera e delle caselle di visibilità.
- **Grafici:** costruzione per giri multipli, interruzione ai poli, asintoti e segni dei limiti, indicatore del valore corrente e gestione dei valori fuori scala. Verifica visiva in browser con 765° e 90°.
- **Offline reale:** service worker installato nel browser; server locale arrestato; pagina ricaricata con successo dalla cache e usata per 1080° e la conversione di 13π/9. Nessun errore JavaScript osservato.
- **Aggiornamenti:** nuova versione del service worker rilevata; pulsante “Aggiorna l’app” provato nel browser; nuova versione caricata senza dover cancellare manualmente la cache.
- **Manifest e icone:** JSON valido, nome, `id`, `start_url`, `scope`, `display: standalone`, colori e icone PNG reali da 192 e 512 pixel, icona maskable con margine e icona Apple da 180 pixel. Riferimenti ai file locali controllati.
- **GitHub Pages:** percorsi relativi; test della cache e della navigazione offline simulando l’indirizzo in una sottocartella `/trigonometria-pwa/`.
- **Integrazione opzionale WebMCP:** strumenti registrati e invocati nel browser; input valido cambia lo stesso stato dell’interfaccia, input fuori limite respinto. Nessun requisito WebMCP per l’uso ordinario.

## Controlli da completare dopo la pubblicazione

- L’utente ha pubblicato la versione precedente sul proprio GitHub Pages. Questo aggiornamento locale deve ancora essere caricato nello stesso repository `vivaldomazzoli-ux/trigonometria-pwa`.
- I prerequisiti PWA sono presenti e verificati, ma il browser di anteprima integrato **non ha esposto la richiesta nativa di installazione**. Non è stata quindi effettuata un’installazione reale sul sistema operativo.
- Non sono stati disponibili iPhone o Android fisici: verificare l’aggiunta alla schermata Home e il trascinamento con il dito sui dispositivi di destinazione. Il test touch automatico riguarda i gestori degli eventi, non un telefono reale.
- Il tentativo di trascinamento completo tramite lo strumento di controllo del browser è stato interrotto da un errore dello strumento; il clic iniziale ha aggiornato il punto. La continuità del trascinamento è verificata dai test degli eventi mouse/touch, ma va confermata con un gesto manuale nel browser di destinazione.
- Safari/iOS, Chrome Android e installazione offline dopo il primo caricamento HTTPS vanno provati usando il link finale pubblicato.

## Differenze intenzionali rispetto al desktop

- La pagina scorre naturalmente; sul telefono circonferenza e curva selezionata sono affiancate, seguite dai controlli, dal convertitore e dalle istruzioni. Sul PC sono visibili i quattro grafici.
- Il cursore regola **il giro corrente**, conservando la base del totale. Per aggiungere giri usa ±360° o il campo totale.
- Python/Qt/Matplotlib sono sostituiti da SVG, Canvas e JavaScript locale. I calcoli di riferimento, i limiti e i colori sono conservati.
- Installazione dal browser, icone, cache offline e pulsante di aggiornamento sostituiscono l’EXE.
- Nessuno stato viene conservato al riavvio: come nel desktop, l’angolo iniziale è 0°.
