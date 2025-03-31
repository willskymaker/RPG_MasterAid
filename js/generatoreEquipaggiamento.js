
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

  function creaCheckbox(item, tipo) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = item.nome;

    checkbox.addEventListener('change', () => {
      const selezionati = schedaPersonaggio.equipaggiamento.filter(i => i.tipo === tipo);
      if (checkbox.checked) {
        if (selezionati.length >= getMax(tipo)) {
          checkbox.checked = false;
          alert(`Puoi selezionare solo ${getMax(tipo)} ${tipo}${getMax(tipo) > 1 ? 'i' : ''}.`);
          return;
        }
        schedaPersonaggio.equipaggiamento.push({ ...item, tipo });
      } else {
        schedaPersonaggio.equipaggiamento = schedaPersonaggio.equipaggiamento.filter(i => i.nome !== item.nome);
      }
      aggiornaOutput();
    });

    label.appendChild(checkbox);
    label.innerHTML += ` <strong>${item.nome}</strong> — <em>${item.descrizione}</em>`;
    return label;
  }

  function getMax(tipo) {
    switch (tipo) {
      case 'arma': return maxArmi;
      case 'armatura': return maxArmature;
      case 'oggetto': return maxOggetti;
      default: return 1;
    }
  }

  function filtraPerClasse(lista, tipo) {
    const classe = schedaPersonaggio.classe || "";
    const prof = schedaPersonaggio.proficienze || [];
    return lista.filter(item => {
      if (!item.proficienza) return true;
      return prof.includes(item.proficienza);
    });
  }

  function renderSezione(titolo, lista, tipo) {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.textContent = titolo;
    div.appendChild(h3);

    const filtrati = filtraPerClasse(lista, tipo);
    filtrati.forEach(item => {
      const checkbox = creaCheckbox(item, tipo);
      div.appendChild(checkbox);
      div.appendChild(document.createElement('br'));
    });

    return div;
  }

  function aggiornaOutput() {
    const equip = schedaPersonaggio.equipaggiamento || [];
    if (equip.length === 0) {
      output.innerHTML = "🎒 Nessun equipaggiamento selezionato.";
    } else {
      const lista = equip.map(e => `<li><strong>${e.nome}</strong>: ${e.descrizione}</li>`).join('');
      output.innerHTML = `<ul>${lista}</ul>`;
    }
  }

  container.innerHTML = '';
  container.appendChild(renderSezione("🔪 Armi", dbArmi, 'arma'));
  container.appendChild(renderSezione("🛡️ Armature", dbArmature, 'armatura'));
  container.appendChild(renderSezione("🎒 Oggetti Utili", dbOggetti, 'oggetto'));
  container.appendChild(output);
}
