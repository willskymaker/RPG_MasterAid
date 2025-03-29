export function initGeneratoreClassi() {
  const container = document.getElementById('generatore-classi-container');
  const output = document.getElementById('generatore-classi-output');
  const btn = document.createElement('button');
  btn.textContent = "Genera Classe (5.5e)";

  const classi = [
    "Barbaro", "Bardo", "Chierico", "Druido", "Guerriero",
    "Ladro", "Mago", "Monaco", "Paladino", "Ranger", "Stregone", "Warlock"
  ];

  btn.addEventListener('click', () => {
    const classe = classi[Math.floor(Math.random() * classi.length)];
    output.textContent = `🛡️ Classe: ${classe}`;
  });

  container.appendChild(btn);
}
