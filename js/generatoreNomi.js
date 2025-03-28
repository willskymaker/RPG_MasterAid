export function initGeneratoreNomi() {
  const container = document.getElementById('generatore-nomi-container');
  const output = document.getElementById('generatore-nomi-output');
  const btn = document.createElement('button');
  btn.textContent = "Genera Nome Fantasy";

  const prefissi = ['Mor', 'Aer', 'Zan', 'Bel', 'Kar', 'Lun', 'Thar', 'Ely', 'Gal', 'Vor'];
  const suffissi = ['ion', 'eth', 'mir', 'ius', 'dor', 'an', 'ar', 'ien', 'ak', 'orn'];

  btn.addEventListener('click', () => {
    const nome = randomPick(prefissi) + randomPick(suffissi);
    output.textContent = `✨ ${nome}`;
  });

  container.appendChild(btn);

  function randomPick(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
  }
}

