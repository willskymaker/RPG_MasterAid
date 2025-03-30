export function initGeneratoreNomi() {
  const container = document.getElementById('generatore-nomi-container');
  const output = document.getElementById('generatore-nomi-output');

  window.schedaPersonaggio = window.schedaPersonaggio || {};

  const prefissi = ['Mor', 'Aer', 'Zan', 'Bel', 'Kar', 'Lun', 'Thar', 'Ely', 'Gal', 'Vor'];
  const suffissi = ['ion', 'eth', 'mir', 'ius', 'dor', 'an', 'ar', 'ien', 'ak', 'orn'];

  const inputManuale = document.createElement('input');
  inputManuale.type = 'text';
  inputManuale.placeholder = "Inserisci un nome a tua scelta";
  inputManuale.style.marginRight = '10px';

  const btn = document.createElement('button');
  btn.textContent = "🎲 Genera Nome Fantasy";

  btn.addEventListener('click', () => {
    const nome = randomPick(prefissi) + randomPick(suffissi);
    inputManuale.value = nome;
    schedaPersonaggio.nome = nome;
    aggiornaOutput();
  });

  inputManuale.addEventListener('input', () => {
    schedaPersonaggio.nome = inputManuale.value.trim();
    aggiornaOutput();
  });

  function aggiornaOutput() {
    if (schedaPersonaggio.nome) {
      output.textContent = `✨ Nome del personaggio: ${schedaPersonaggio.nome}`;
    } else {
      output.textContent = '';
    }
  }

  function randomPick(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
  }

  container.appendChild(inputManuale);
  container.appendChild(btn);
}

