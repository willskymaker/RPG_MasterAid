export function initGeneratoreLivello() {
  const container = document.getElementById('generatore-livello-container');
  const output = document.getElementById('generatore-livello-output');

  if (!container || !output) {
    console.warn("⚠️ Elementi HTML per il generatore livello non trovati.");
    return;
  }

  window.schedaPersonaggio = window.schedaPersonaggio || {};
  schedaPersonaggio.livello = 1;

  const label = document.createElement('label');
  label.textContent = "Seleziona il livello: ";
  label.setAttribute('for', 'livello-select');

  const select = document.createElement('select');
  select.id = 'livello-select';

  for (let i = 1; i <= 20; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `Livello ${i}`;
    if (i === 1) opt.selected = true;
    select.appendChild(opt);
  }

  select.addEventListener('change', () => {
    schedaPersonaggio.livello = parseInt(select.value);
    if (window.aggiornaTalenti) window.aggiornaTalenti();
    output.textContent = `🎚️ Livello selezionato: ${schedaPersonaggio.livello}`;
  });

  container.innerHTML = '';
  container.appendChild(label);
  container.appendChild(select);
  output.textContent = `🎚️ Livello selezionato: ${schedaPersonaggio.livello}`;
}

