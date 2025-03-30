export function initGeneratoreLivello() {
  const container = document.getElementById('generatore-livello-container');
  const output = document.getElementById('generatore-livello-output');

  window.schedaPersonaggio = window.schedaPersonaggio || {};
  schedaPersonaggio.livello = 1;

  const select = document.createElement('select');
  for (let i = 1; i <= 20; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `Livello ${i}`;
    if (i === 1) opt.selected = true;
    select.appendChild(opt);
  }

  select.addEventListener('change', () => {
    schedaPersonaggio.livello = parseInt(select.value);
    output.textContent = `🎚️ Livello selezionato: ${schedaPersonaggio.livello}`;
  });

  container.appendChild(select);
  output.textContent = `🎚️ Livello selezionato: ${schedaPersonaggio.livello}`;
}

