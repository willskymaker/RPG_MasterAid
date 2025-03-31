import { initTiradadi } from './tiradadi.js';
import { initGeneratoreNomi } from './generatoreNomi.js';
import { initGeneratoreSpecie } from './generatoreSpecie.js';
import { initGeneratoreClassi } from './generatoreClassi.js';
import { initGeneratoreAllineamento } from './generatoreAllineamento.js';
import { initGeneratoreBackground } from './generatoreBackground.js';
import { initGeneratoreTalenti } from './generatoreTalenti.js';
import { initGeneratoreCaratteristiche } from './generatoreCaratteristiche.js';
import { initGeneratoreLivello } from './generatoreLivello.js';
import { initGeneratoreHpCaVelocita } from './generatoreHpCaVelocita.js';
import { initGeneratoreEquipaggiamento } from './generatoreEquipaggiamento.js';
import { initGeneratoreSchedaFinale } from './generatoreSchedaFinale.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inizializza l'oggetto globale
  window.schedaPersonaggio = window.schedaPersonaggio || {};
  schedaPersonaggio.modalita = 'niubbo'; // default

  // Inizializzazione moduli
  initTiradadi();
  initGeneratoreNomi();
  initGeneratoreSpecie();
  initGeneratoreClassi();
  initGeneratoreAllineamento();
  initGeneratoreBackground();
  initGeneratoreTalenti();
  initGeneratoreCaratteristiche();
  initGeneratoreLivello();
  initGeneratoreHpCaVelocita();
  initGeneratoreEquipaggiamento();
  initGeneratoreSchedaFinale();

  // Gestione modalità niubbo/pro
  const selettoreModalita = document.querySelectorAll('input[name="modalita"]');

  selettoreModalita.forEach(radio => {
    radio.addEventListener('change', () => {
      schedaPersonaggio.modalita = radio.value;
      console.log("🔁 Modalità selezionata:", radio.value);
      aggiornaModalitaUI();
    });
  });

  function aggiornaModalitaUI() {
    const modalita = schedaPersonaggio.modalita;
    const avanzati = document.querySelectorAll('.modulo-avanzato');

    avanzati.forEach(mod => {
      mod.style.display = modalita === 'niubbo' ? 'none' : 'block';
    });

    // Default in modalità niubbo
    if (modalita === 'niubbo') {
      // Inserisce almeno 1 talento base se non presente
      if (!schedaPersonaggio.talenti || schedaPersonaggio.talenti.length === 0) {
        schedaPersonaggio.talenti = [{
          nome: "Allerta",
          descrizione: "Ottieni un bonus di +5 all'iniziativa..."
        }];
        schedaPersonaggio.asiBloccato = true;
      }

      if (window.aggiornaTalenti) window.aggiornaTalenti();
      if (window.aggiornaCaratteristiche) window.aggiornaCaratteristiche();
    }
  }

  aggiornaModalitaUI(); // iniziale
});

