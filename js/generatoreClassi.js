export function initGeneratoreClassi() {
  const container = document.getElementById('generatore-classi-container');
  const output = document.getElementById('generatore-classi-output');

  const classi = [
    "Barbaro", "Bardo", "Chierico", "Druido", "Guerriero",
    "Ladro", "Mago", "Monaco", "Paladino", "Ranger", "Stregone", "Warlock"
  ];

  const select = document.createElement('select');
  const optionDefault = document.createElement('option');
  optionDefault.textContent = "-- Seleziona una classe --";
  optionDefault.disabled = true;
  optionDefault.selected = true;
  select.appendChild(optionDefault);

  classi.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    select.appendChild(opt);
  });

  const btnRandom = document.createElement('button');
  btnRandom.textContent = "🎲 Genera casualmente";

  btnRandom.addEventListener('click', () => {
    const scelta = classi[Math.floor(Math.random() * classi.length)];
    select.value = scelta;
    output.textContent = `🛡️ Classe: ${scelta}`;
  });

  select.addEventListener('change', () => {
    output.textContent = `🛡️ Classe: ${select.value}`;
  });

  container.appendChild(select);
  container.appendChild(btnRandom);
}
