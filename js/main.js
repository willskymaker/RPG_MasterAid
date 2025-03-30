import { initTiradadi } from './tiradadi.js';
import { initGeneratoreNomi } from './generatoreNomi.js';
import { initGeneratoreSpecie } from './generatoreSpecie.js';
import { initGeneratoreClassi } from './generatoreClassi.js';
import { initGeneratoreAllineamento } from './generatoreAllineamento.js';
import { initGeneratoreBackground } from './generatoreBackground.js';
import {initGeneratoreTalenti } from './generatoreTalenti.js';
import { initGeneratoreCaratteristiche } from './generatoreCaratteristiche.js';
import { initGeneratoreLivello } from './generatoreLivello.js';
import { initGeneratoreHpCaVelocita } from './generatoreHpCaVelocita.js';

document.addEventListener('DOMContentLoaded', () => {
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

 // MODALITÀ NIUBBO / PRO PLAYER
  const selettoreModalita = document.querySelectorAll('input[name="modalita"]');
  window.schedaPersonaggio = window.schedaPersonaggio || {};
  schedaPersonaggio.modalita = 'niubbo'; // default

  selettoreModalita.forEach(radio => {
    radio.addEventListener('change', () => {
      schedaPersonaggio.modalita = radio.value;
      console.log("🔁 Modalità selezionata:", radio.value);

      // Trigger moduli che possono reagire al cambio modalità
      if (window.aggiornaTalenti) window.aggiornaTalenti();
      if (window.aggiornaCaratteristiche) window.aggiornaCaratteristiche();
      // Altri moduli da aggiungere in futuro
    });
  });
});
