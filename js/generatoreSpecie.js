export function initGeneratoreSpecie() {
  const container = document.getElementById('generatore-specie-container');
  const output = document.getElementById('generatore-specie-output');

  const specie = [
    "Umano", "Elfo", "Nano", "Halfling", "Dragonide",
    "Tiefling", "Goliath", "Orco", "Gnomo", "Ardling", "Aasimar",
  ];

  const select = document.createElement('select');
  const optionDefault = document.createElement('option');
  optionDefault.textContent = "-- Seleziona una specie --";
  optionDefault.disabled = true;
  optionDefault.selected = true;
  select.appendChild(optionDefault);

  specie.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    select.appendChild(opt);
  });

  const btnRandom = document.createElement('button');
  btnRandom.textContent = "🎲 Genera casualmente";

  btnRandom.addEventListener('click', () => {
    const scelta = specie[Math.floor(Math.random() * specie.length)];
    select.value = scelta;
    output.textContent = `🧬 Specie: ${scelta}`;
  });

  select.addEventListener('change', () => {
    output.textContent = `🧬 Specie: ${select.value}`;
  });

  container.appendChild(select);
  container.appendChild(btnRandom);
}

