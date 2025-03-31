import { dbBackground } from './js/data/dbBackground.js';

export function initGeneratoreBackground() {
  const container = document.getElementById('generatore-background-container');
  const output = document.getElementById('generatore-background-output');

  const backgroundNomi = dbBackground.map(bg => bg.nome);

  const select = document.createElement('select');
  const optionDefault = document.createElement('option');
  optionDefault.textContent = "-- Seleziona un background --";
  optionDefault.disabled = true;
  optionDefault.selected = true;
  select.appendChild(optionDefault);

  backgroundNomi.forEach(bg => {
    const opt = document.createElement('option');
    opt.value = bg;
    opt.textContent = bg;
    select.appendChild(opt);
  });

  const btnRandom = document.createElement('button');
  btnRandom.textContent = "🎲 Genera casualmente";

  function aggiornaOutput(bgNome) {
    const bg = dbBackground.find(el => el.nome === bgNome);
    if (!bg) return;

    output.innerHTML = `<strong>🎭 Background:</strong> ${bg.nome}<br><em>${bg.descrizione}</em>`;
    salvaInScheda(bg);
  }

  function salvaInScheda(bg) {
    window.schedaPersonaggio = window.schedaPersonaggio || {};
    schedaPersonaggio.background = {
      nome: bg.nome,
      descrizione: bg.descrizione
    };
  }

  select.addEventListener('change', () => {
    const bg = select.value;
    aggiornaOutput(bg);
  });

  btnRandom.addEventListener('click', () => {
    const randomBg = backgroundNomi[Math.floor(Math.random() * backgroundNomi.length)];
    select.value = randomBg;
    aggiornaOutput(randomBg);
  });

  container.appendChild(select);
  container.appendChild(btnRandom);
  container.appendChild(output);
}
