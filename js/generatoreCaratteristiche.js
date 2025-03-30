export function initGeneratoreCaratteristiche() {
  const container = document.getElementById('generatore-caratteristiche-container');
  const output = document.getElementById('generatore-caratteristiche-output');
  window.schedaPersonaggio = window.schedaPersonaggio || {};

  const caratteristiche = ['FOR', 'DES', 'COS', 'INT', 'SAG', 'CAR'];
  const valori = {};
  const asiAggiunti = {};
  const pointBuyCosts = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
  };

  caratteristiche.forEach(stat => {
    valori[stat] = 8;
    asiAggiunti[stat] = 0;
  });

  function getModificatore(val) {
    return Math.floor((val - 10) / 2);
  }

  function getAsiDisponibili() {
    const livello = window.schedaPersonaggio?.livello || 1;
    const soglie = [4, 8, 12, 16, 19];
    return soglie.filter(lv => lv <= livello).length * 2;
  }

  function aggiornaOutput() {
    const puntiUsati = Object.values(valori).reduce((tot, val) => tot + pointBuyCosts[val], 0);
    const asiTotali = getAsiDisponibili();
    const asiUsati = Object.values(asiAggiunti).reduce((a, b) => a + b, 0);
    const asiAttivi = asiTotali > 0 && !schedaPersonaggio.talento;
    const isPro = schedaPersonaggio.modalita === "pro";

    output.innerHTML = '';

    const guida = document.createElement('p');
    guida.innerHTML = isPro
      ? `🎲 <strong>Distribuisci 27 punti (Point Buy)</strong>. Se il livello ≥4, puoi usare ASI (📈)`
      : `👶 <strong>Distribuisci i tuoi 27 punti</strong> come preferisci.`;
    output.appendChild(guida);

    const lista = document.createElement('ul');
    lista.style.listStyle = 'none';

    caratteristiche.forEach(stat => {
      const totale = valori[stat] + asiAggiunti[stat];
      const li = document.createElement('li');

      let html = `
        <strong>${stat}</strong>: 
        <button data-stat="${stat}" data-action="point-">-</button>
        <span id="val-${stat}">${valori[stat]}</span>
        <button data-stat="${stat}" data-action="point+">+</button>
      `;

      if (isPro) {
        html += `
          &nbsp; | ASI: 
          <button data-stat="${stat}" data-action="asi+" ${!asiAttivi ? 'disabled' : ''}>+</button>
          <span>+${asiAggiunti[stat]}</span>
          &nbsp; = Totale: <strong>${totale}</strong> (mod: ${getModificatore(totale)})
        `;
      } else {
        html += `&nbsp; ➜ Totale: <strong>${totale}</strong>`;
      }

      li.innerHTML = html;
      if (totale > 20) li.style.color = 'red';
      lista.appendChild(li);
    });

    output.appendChild(lista);

    if (isPro) {
      const info = document.createElement('p');
      info.innerHTML = `
        🧠 <strong>Point Buy:</strong> ${puntiUsati} / 27 &nbsp;| 
        📈 <strong>ASI:</strong> ${asiUsati} / ${asiTotali} 
        ${schedaPersonaggio.talento ? "<br>🎭 Talento selezionato – ASI disattivati." : ""}
      `;
      output.appendChild(info);
    }

    document.querySelectorAll('button[data-stat]').forEach(btn => {
      btn.onclick = () => {
        const stat = btn.dataset.stat;
        const action = btn.dataset.action;

        if (action === 'point+') {
          const current = valori[stat];
          const nuovoCosto = pointBuyCosts[current + 1];
          const vecchioCosto = pointBuyCosts[current];
          const puntiUsatiCorrenti = Object.values(valori).reduce((tot, val) => tot + pointBuyCosts[val], 0);
          if (current < 15 && (puntiUsatiCorrenti + (nuovoCosto - vecchioCosto)) <= 27) {
            valori[stat]++;
          }
        } else if (action === 'point-') {
          if (valori[stat] > 8) {
            valori[stat]--;
          }
        } else if (action === 'asi+' && isPro && asiAttivi) {
          const totale = valori[stat] + asiAggiunti[stat];
          if (asiUsati < asiTotali && totale < 20) {
            asiAggiunti[stat]++;
            schedaPersonaggio.talento = false; // disattiva talento
          }
        }

        aggiornaOutput();
        salvaInScheda();
      };
    });

    salvaInScheda();
  }

  function salvaInScheda() {
    const stats = {};
    const mods = {};

    caratteristiche.forEach(stat => {
      const totale = valori[stat] + asiAggiunti[stat];
      stats[stat] = totale;
      mods[stat] = getModificatore(totale);
    });

    schedaPersonaggio.caratteristiche = stats;
    schedaPersonaggio.modificatori = mods;
  }

  aggiornaOutput();

  // Rende richiamabile da main.js quando cambia la modalità
  window.aggiornaCaratteristiche = aggiornaOutput;
}

