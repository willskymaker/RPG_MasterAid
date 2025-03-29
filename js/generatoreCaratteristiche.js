// js/generatoreCaratteristiche.js

export function initGeneratoreCaratteristiche() {
  const container = document.getElementById('generatore-caratteristiche-container');
  const output = document.getElementById('generatore-caratteristiche-output');
  
  const caratteristiche = ['FOR', 'DES', 'COS', 'INT', 'SAG', 'CAR'];
  const valori = {};
  const pointBuyCosts = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
  };
  let puntiDisponibili = 27;

  caratteristiche.forEach(stat => {
    valori[stat] = 8;
  });

  function aggiornaOutput() {
    output.innerHTML = '';
    let puntiUsati = Object.values(valori).reduce((totale, val) => totale + pointBuyCosts[val], 0);
    const rimanenti = 27 - puntiUsati;

    const lista = document.createElement('ul');
    lista.style.listStyle = 'none';
    caratteristiche.forEach(stat => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${stat}</strong>: 
        <button data-stat="${stat}" data-action="-">-</button>
        <span id="val-${stat}">${valori[stat]}</span>
        <button data-stat="${stat}" data-action="+">+</button>
      `;
      lista.appendChild(li);
    });

    output.appendChild(lista);

    const info = document.createElement('p');
    info.textContent = `Punti spesi: ${puntiUsati} / 27 | Punti rimanenti: ${rimanenti}`;
    output.appendChild(info);

    document.querySelectorAll('button[data-stat]').forEach(btn => {
      btn.onclick = () => {
        const stat = btn.dataset.stat;
        const action = btn.dataset.action;
        const current = valori[stat];

        if (action === '+' && current < 15) {
          const nuovoCosto = pointBuyCosts[current + 1];
          const vecchioCosto = pointBuyCosts[current];
          if ((puntiUsati + (nuovoCosto - vecchioCosto)) <= 27) {
            valori[stat]++;
          }
        } else if (action === '-' && current > 8) {
          valori[stat]--;
        }

        aggiornaOutput();
      }
    });
  }

  aggiornaOutput();
}

