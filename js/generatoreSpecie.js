export function initGeneratoreSpecie() {
  const container = document.getElementById('generatore-specie-container');
  const output = document.getElementById('generatore-specie-output');
  const btn = document.createElement('button');
  btn.textContent = "Genera Specie (5.5e)";

  const specie = [
    "Umano",
    "Elfo",
    "Nano",
    "Halfling",
    "Dragonide",
    "Tiefling",
    "Goliath",
    "Orco",
    "Gnomo",
    "Ardling",
    "Aasimar"
  ];

  btn.addEventListener('click', () => {
    const scelta = specie[Math.floor(Math.random() * specie.length)];
    output.textContent = `🧬 Specie: ${scelta}`;
  });

  container.appendChild(btn);
}
