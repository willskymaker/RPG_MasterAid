export function initGeneratoreAllineamento() {
  const container = document.getElementById('generatore-allineamento-container');
  const output = document.getElementById('generatore-allineamento-output');
  const btn = document.greateElement('button');
  btn.textContent = "Genera Allineamento";

  const allineamenti = [
    "Legale Buono"
    "Neutrale Buono"
    "Caotico Buono"
    "Legale Neutrale"
     "Neutrale Puro",
    "Caotico Neutrale",
    "Legale Malvagio",
    "Neutrale Malvagio",
    "Caotico Malvagio"
  ];

  btn.addEventListener('click', () => {
    const allineamento = allineamenti[Math.floor(Math.random() * allineamenti.length)];
    output.textContent = `⚖️ Allineamento: ${allineamento}`;
  });

  container.appendChild(btn);
}
