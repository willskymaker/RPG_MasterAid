export function initTiradadi() {
  const container = document.getElementById('tiradadi-buttons');
  const output = document.getElementById('tiradadi-output');

  const dadi = [4, 6, 8, 10, 12, 20, 100];

  dadi.forEach(facce => {
    const btn = document.createElement('button');
    btn.textContent = `d${facce}`;
    btn.addEventListener('click', () => {
      const risultato = Math.floor(Math.random() * facce) + 1;
      output.textContent = `Hai tirato un d${facce}: ${risultato}`;
    });
    container.appendChild(btn);
  });
}
