
import { dbArmi } from './data/dbArmi.js';
import { dbArmature } from './data/dbArmature.js';
import { dbOggetti } from './data/dbOggetti.js';

export function initGeneratoreEquipaggiamento() {
  const container = document.getElementById('generatore-equipaggiamento-container');
  const output = document.getElementById('generatore-equipaggiamento-output');

  window.schedaPersonaggio = window.schedaPersonaggio || {};
  schedaPersonaggio.equipaggiamento = {
    armi: [],
    armatura: null,
    oggetti: []
  };

  function creaCheckbox(item, categoria, limite) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = item.nome;

    if (!puòUsare(item)) {
      checkbox.disabled = true;
      label.classList.add('disabilitato');
    }

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        const selezione = schedaPersonaggio.equipaggiamento[categoria];
        if (categoria === 'armatura' && selezione !== null) {
          checkbox.checked = false;
          alert('Puoi selezionare solo 1 armatura.');
          return;
        } else if (Array.isArray(selezione) && selezione.length >= limite) {
          checkbox.checked = false;
          alert(`Puoi selezionare solo ${limite} ${categoria}.`);
          return;
        }

        if (categoria === 'armatura') {
          schedaPersonaggio.equipaggiamento.armatura = item.nome;
        } else {
          selezione.push(item.nome);
        }
      } else {
        if (categoria === 'armatura') {
          schedaPersonaggio.equipaggiamento.armatura = null;
        } else {
          schedaPersonaggio.equipaggiamento[categoria] =
            schedaPersonaggio.equipaggiamento[categoria].filter(n => n !== item.nome);
        }
      }

      aggiornaOutput();
    });

    label.appendChild(checkbox);
    label.append(` ${item.nome} – ${item.descrizione}`);
    return label;
  }

  function puòUsare(item) {
    const classe = schedaPersonaggio.classe;
    if (!item.proficienza) return true;
    return item.proficienza.includes(classe);
  }

  function aggiornaOutput() {
    const { armi, armatura, oggetti } = schedaPersonaggio.equipaggiamento;
    output.innerHTML = `
      <p><strong>Armi:</strong> ${armi.join(', ') || '—'}</p>
      <p><strong>Armatura:</strong> ${armatura || '—'}</p>
      <p><strong>Oggetti:</strong> ${oggetti.join(', ') || '—'}</p>
    `;
  }

  function creaSezione(titolo, lista, categoria, limite) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<h3>${titolo}</h3>`;
    lista.forEach(item => {
      wrapper.appendChild(creaCheckbox(item, categoria, limite));
      wrapper.appendChild(document.createElement('br'));
    });
    return wrapper;
  }

  container.innerHTML = '';
  container.appendChild(creaSezione('Armi', dbArmi, 'armi', 2));
  container.appendChild(creaSezione('Armature', dbArmature, 'armatura', 1));
  container.appendChild(creaSezione('Oggetti', dbOggetti, 'oggetti', 3));
  aggiornaOutput();
}
