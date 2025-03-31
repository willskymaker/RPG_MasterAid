
import { dbArmi } from './data/dbArmi.js';
import { dbArmature } from './data/dbArmature.js';
import { dbOggetti } from './data/dbOggetti.js';

export function initGeneratoreEquipaggiamento() {
  const container = document.getElementById('generatore-equipaggiamento-container');
  const output = document.getElementById('generatore-equipaggiamento-output');
  if (!container || !output) return;

  window.schedaPersonaggio = window.schedaPersonaggio || {};
  schedaPersonaggio.equipaggiamento = schedaPersonaggio.equipaggiamento || [];

  const tabs = ['Armi', 'Armature', 'Oggetti'];
  const tabButtons = document.createElement('div');
  const tabContents = {};

  let tabAttiva = 'Armi';

  function aggiornaOutput() {
    const equip = schedaPersonaggio.equipaggiamento || [];
    if (!equip.length) {
      output.innerHTML = "🎒 Nessun oggetto selezionato.";
    } else {
      const lista = equip.map(e => `<li><strong>${e.nome}</strong> (${e.tipo})</li>`).join('');
      output.innerHTML = `🎒 Equipaggiamento selezionato:<ul>${lista}</ul>`;
    }
  }

  function creaCheckboxOggetto(item, tipo) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = item.nome;

    const classe = schedaPersonaggio.classe || '';
    const proficienzaClasse = {
      'Armi': schedaPersonaggio.classe ? dbProficienzeArmi[classe] || [] : [],
      'Armature': schedaPersonaggio.classe ? dbProficienzeArmature[classe] || [] : [],
      'Oggetti': []
    };

    const profCorrente = proficienzaClasse[tipo];
    const abilitato = !item.proficienza || profCorrente.includes(item.proficienza);

    checkbox.disabled = !abilitato;
    if (!abilitato) label.classList.add('item-disabilitato');

    checkbox.checked = schedaPersonaggio.equipaggiamento.some(o => o.nome === item.nome);

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        schedaPersonaggio.equipaggiamento.push({ nome: item.nome, tipo });
      } else {
        schedaPersonaggio.equipaggiamento = schedaPersonaggio.equipaggiamento.filter(o => o.nome !== item.nome);
      }
      aggiornaOutput();
    });

    label.appendChild(checkbox);
    label.append(` ${item.nome} — ${item.descrizione || ''}`);
    return label;
  }

  function creaTabContent(nomeTab, dataList) {
    const div = document.createElement('div');
    dataList.forEach(item => {
      const label = creaCheckboxOggetto(item, nomeTab);
      div.appendChild(label);
      div.appendChild(document.createElement('br'));
    });
    return div;
  }

  tabs.forEach(nome => {
    const btn = document.createElement('button');
    btn.textContent = nome;
    btn.addEventListener('click', () => {
      tabAttiva = nome;
      aggiornaTab();
    });
    tabButtons.appendChild(btn);

    let dati = [];
    if (nome === 'Armi') dati = dbArmi;
    if (nome === 'Armature') dati = dbArmature;
    if (nome === 'Oggetti') dati = dbOggetti;

    tabContents[nome] = creaTabContent(nome, dati);
  });

  function aggiornaTab() {
    Object.keys(tabContents).forEach(tab => {
      tabContents[tab].style.display = (tab === tabAttiva) ? 'block' : 'none';
    });
  }

  container.appendChild(tabButtons);
  Object.values(tabContents).forEach(tab => container.appendChild(tab));
  aggiornaTab();
  aggiornaOutput();

  // Per aggiornamenti dinamici
  window.aggiornaEquipaggiamento = () => {
    container.innerHTML = '';
    initGeneratoreEquipaggiamento();
  };
}

const dbProficienzeArmi = {
  'Guerriero': ['semplice', 'marziale'],
  'Barbaro': ['semplice', 'marziale'],
  'Paladino': ['semplice', 'marziale'],
  'Ladro': ['semplice'],
  'Mago': ['bastone', 'pugnale'],
  'Stregone': ['semplice'],
  'Bardo': ['semplice'],
  'Warlock': ['semplice'],
  'Ranger': ['semplice', 'marziale'],
  'Monaco': ['semplice'],
  'Druido': ['clava', 'falce', 'lancia'],
  'Chierico': ['semplice']
};

const dbProficienzeArmature = {
  'Guerriero': ['leggera', 'media', 'pesante', 'scudo'],
  'Paladino': ['leggera', 'media', 'pesante', 'scudo'],
  'Ranger': ['leggera', 'media'],
  'Barbaro': ['leggera', 'media', 'scudo'],
  'Chierico': ['leggera', 'media', 'scudo'],
  'Druido': ['leggera', 'media', 'scudo'],
  'Bardo': ['leggera'],
  'Ladro': ['leggera'],
  'Warlock': ['leggera'],
  'Monaco': [],
  'Mago': [],
  'Stregone': []
};
