
import { dbArmi } from './data/dbArmi.js';
import { dbArmature } from './data/dbArmature.js';
import { dbOggetti } from './data/dbOggetti.js';

export function initGeneratoreEquipaggiamento() {
  const container = document.getElementById('generatore-equipaggiamento-container');
  const output = document.getElementById('generatore-equipaggiamento-output');

  window.schedaPersonaggio = window.schedaPersonaggio || {};
  schedaPersonaggio.equipaggiamento = [];

  const maxArmi = 2;
  const maxArmature = 1;
  const maxOggetti = 3;

  function haProficienza(tipo) {
    const prof = schedaPersonaggio.proficienze || [];
    return prof.includes(tipo);
  }

  function creaBlocco(titolo, lista, tipo, max) {
    const blocco = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.textContent = titolo;
    blocco.appendChild(h3);

    lista.forEach(el => {
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = el.nome;

      const profOk = !el.proficienza || haProficienza(el.proficienza);
      checkbox.disabled = !profOk;
      if (!profOk) label.classList.add('equip-disabilitato');

      checkbox.checked = schedaPersonaggio.equipaggiamento.some(e => e.nome === el.nome);

      checkbox.addEventListener('change', () => {
        const selezionati = schedaPersonaggio.equipaggiamento.filter(e => e.tipo === tipo);
        if (checkbox.checked) {
          if (selezionati.length >= max) {
            checkbox.checked = false;
            alert(`Puoi selezionare solo ${max} ${tipo}.`);
            return;
          }
          schedaPersonaggio.equipaggiamento.push({ ...el, tipo });
        } else {
          schedaPersonaggio.equipaggiamento = schedaPersonaggio.equipaggiamento.filter(e => e.nome !== el.nome);
        }
        aggiornaOutput();
      });

      label.appendChild(checkbox);
      label.append(` ${el.nome} — ${el.descrizione}`);
      blocco.appendChild(label);
      blocco.appendChild(document.createElement('br'));
    });

    return blocco;
  }

  function aggiornaOutput() {
    if (schedaPersonaggio.equipaggiamento.length === 0) {
      output.innerHTML = "🎒 Nessun equipaggiamento selezionato.";
    } else {
      const elenco = schedaPersonaggio.equipaggiamento.map(e => `<li><strong>${e.nome}</strong> (${e.tipo}): ${e.descrizione}</li>`).join('');
      output.innerHTML = `<ul>${elenco}</ul>`;
    }
  }

  container.innerHTML = '';
  container.appendChild(creaBlocco("⚔️ Armi", dbArmi, "arma", maxArmi));
  container.appendChild(creaBlocco("🛡️ Armature", dbArmature, "armatura", maxArmature));
  container.appendChild(creaBlocco("🎒 Oggetti", dbOggetti, "oggetto", maxOggetti));
  container.appendChild(output);
}
