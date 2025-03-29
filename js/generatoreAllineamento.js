export function initGeneratoreAllineamento() {
  const container = document.getElementById('generatore-allineamento-container');
  const output = document.getElementById('generatore-allineamento-output');

  const allineamenti = [
    "Legale Buono", "Neutrale Buono", "Caotico Buono",
    "Legale Neutrale", "Neutrale Puro", "Caotico Neutrale",
    "Legale Malvagio", "Neutrale Malvagio", "Caotico Malvagio"
  ];

  const select = document.createElement('select');
  const optionDefault = document.createElement('option');
  optionDefault.textContent = "-- Seleziona un allineamento --";
  optionDefault.disabled = true;
  optionDefault.selected = true;
  select.appendChild(optionDefault);

  allineamenti.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a;
    opt.textContent = a;
    select.appendChild(opt);
  });

  const btnRandom = document.createElement('button');
  btnRandom.textContent = "🎲 Genera casualmente";

  btnRandom.addEventListener('click', () => {
    const scelta = allineamenti[Math.floor(Math.random() * allineamenti.length)];
    select.value = scelta;
    output.textContent = `⚖️ Allineamento: ${scelta}`;
  });

  select.addEventListener('change', () => {
    output.textContent = `⚖️ Allineamento: ${select.value}`;
  });

  container.appendChild(select);
  container.appendChild(btnRandom);
}

