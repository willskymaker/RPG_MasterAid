# 🎲 RPG_MasterAid

RPG_MasterAid è un'applicazione JavaScript modulare progettata per supportare la creazione di personaggi nei giochi di ruolo, con un focus particolare su Dungeons & Dragons 5.5e (2024). Il progetto mira a semplificare e automatizzare il processo di generazione della scheda del personaggio, rispettando le regole ufficiali.

Funzionalità Attualmente Implementate

Sistema di generazione caratteristiche (FOR, DES, COS, INT, SAG, CAR)

Metodo Point Buy a 27 punti (secondo le regole ufficiali 5.5e)

Architettura modulare per supportare in futuro altri metodi di generazione


Gestione della specie

Solo specie ufficiali D&D 5.5e

Terminologia aggiornata ("specie" invece di "razza")

Selezione manuale della specie

Gestione dei bonus alle caratteristiche, con scelta personalizzata


Scelta classe, background e allineamento

Selezione manuale da elenco (placeholder in fase di sviluppo)


Oggetto centrale schedaPersonaggio

Tutte le informazioni vengono salvate in un oggetto centrale per consentire l’esportazione e la generazione della scheda finale



Funzionalità in sviluppo

Calcolo automatico dei Punti Ferita (HP) e della Classe Armatura (CA)

Gestione ASI (Aumenti dei Punteggi di Caratteristica) in base al livello

Calcolo della velocità in base alla specie

Assegnazione delle abilità in base alla classe e al background

Generazione della scheda personaggio completa e stampabile


Obiettivi futuri

Aggiunta del supporto per più metodi di generazione delle caratteristiche

Completamento della logica di equipaggiamento iniziale

Interfaccia utente interattiva

Esportazione in PDF e compatibilità con tool digitali per il gioco online

Modalità Randomizer opzionale per generare personaggi completamente casuali


Struttura del progetto

RPG_MasterAid/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── generatoreCaratteristiche.js
│   ├── selettoreSpecie.js
│   └── schedaPersonaggio.js
└── assets/

Contribuire

Il progetto è open source e in continua evoluzione. Se sei appassionato di GdR e sviluppo, sentiti libero di aprire una pull request o proporre nuove funzionalità tramite le issues.

Licenza

MIT License

