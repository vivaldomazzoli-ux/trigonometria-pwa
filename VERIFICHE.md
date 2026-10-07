# Verifiche della PWA

Versione consegnata: **1.0.2**. La cartella PWA è separata dai file Python desktop.

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

- La PWA **non è stata pubblicata su un account GitHub**: non è stato fornito un repository di destinazione. Il README descrive tutti i passaggi necessari.
- I prerequisiti PWA sono presenti e verificati, ma il browser di anteprima integrato **non ha esposto la richiesta nativa di installazione**. Non è stata quindi effettuata un’installazione reale sul sistema operativo.
- Non sono stati disponibili iPhone o Android fisici: verificare l’aggiunta alla schermata Home e il trascinamento con il dito sui dispositivi di destinazione. Il test touch automatico riguarda i gestori degli eventi, non un telefono reale.
- Il tentativo di trascinamento completo tramite lo strumento di controllo del browser è stato interrotto da un errore dello strumento; il clic iniziale ha aggiornato il punto. La continuità del trascinamento è verificata dai test degli eventi mouse/touch, ma va confermata con un gesto manuale nel browser di destinazione.
- Safari/iOS, Chrome Android e installazione offline dopo il primo caricamento HTTPS vanno provati usando il link finale pubblicato.

## Differenze intenzionali rispetto al desktop

- La pagina scorre naturalmente; sul telefono i pannelli sono impilati, con la circonferenza per prima.
- Il cursore regola **il giro corrente**, conservando la base del totale. Per aggiungere giri usa ±360° o il campo totale.
- Python/Qt/Matplotlib sono sostituiti da SVG, Canvas e JavaScript locale. I calcoli di riferimento, i limiti e i colori sono conservati.
- Installazione dal browser, icone, cache offline e pulsante di aggiornamento sostituiscono l’EXE.
- Nessuno stato viene conservato al riavvio: come nel desktop, l’angolo iniziale è 0°.
