export function initGeneratoreCaratteristiche() {
  const container = document.getElementById('generatore-caratteristiche-container');
  const output = document.getElementById('generatore-caratteristiche-output');

  // 🔒 Assicura che l'oggetto globale schedaPersonaggio esista
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

  const guida = document.createElement('p');
  guida.innerHTML = `
    🎲 <strong>Guida:</strong> Distribuisci 27 punti tra le 6 caratteristiche usando il sistema Point Buy.<br>
    📈 Se il tuo personaggio ha livello 4 o superiore, puoi applicare gli ASI (Aumenti dei Punteggi di Caratteristica).
  `;
  output.appendChild(guida);

  function getModificatore(val) {
    return Math.floor((val - 10) / 2);
  }

  function getAsiDisponibili() {
    const livello = window.schedaPersonaggio?.livello || 1;
    const soglie = [4, 8, 12, 16, 19];
    return soglie.filter(lv => lv <= livello).length * 2;
  }

  function aggiornaOutput() {
    const puntiUsati = Object.values(valori).reduce((totale, val) => totale + pointBuyCosts[val], 0);
    const asiTotali = getAsiDisponibili();
    const asiUsati = Object.values(asiAggiunti).reduce((a, b) => a + b, 0);
    const asiAttivi = asiTotali > 0 && !schedaPersonaggio.talento;

    output.innerHTML = '';
    output.appendChild(guida);

    const lista = document.createElement('ul');
    lista.style.listStyle = 'none';

    caratteristiche.forEach(stat => {
      const totale = valori[stat] + asiAggiunti[stat];
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${stat}</strong>: 
        <button data-stat="${stat}" data-action="point-">-</button>
        <span id="val-${stat}">${valori[stat]}</span>
        <button data-stat="${stat}" data-action="point+">+</button> 
        &nbsp; | ASI: 
        <button data-stat="${stat}" data-action="asi+" ${!asiAttivi ? 'disabled' : ''}>+</button>
        <span>+${asiAggiunti[stat]}</span>
        &nbsp; = Totale: <strong>${totale}</strong> (mod: ${getModificatore(totale)})
      `;
      if (totale > 20) li.style.color = 'red';
      lista.appendChild(li);
    });

    output.appendChild(lista);

    const info = document.createElement('p');
    info.innerHTML = `
      🧠 <strong>Point Buy</strong>: ${puntiUsati} / 27 &nbsp;| 
      📈 <strong>ASI Usati</strong>: ${asiUsati} / ${asiTotali} 
      ${schedaPersonaggio.talento ? "<br>🎭 <em>Talento selezionato – ASI disattivati.</em>" : ""}
    `;
    output.appendChild(info);

    document.querySelectorAll('button[data-stat]').forEach(btn => {
      btn.onclick = () => {
        const stat = btn.dataset.stat;
        const action = btn.dataset.action;

        if (action === 'point+') {
          const current = valori[stat];
          const nuovoCosto = pointBuyCosts[current + 1];
          const vecchioCosto = pointBuyCosts[current];
          if (current < 15 && (puntiUsati + (nuovoCosto - vecchioCosto)) <= 27) {
            valori[stat]++;
          }
        } else if (action === 'point-') {
          if (valori[stat] > 8) {
            valori[stat]--;
          }
        } else if (action === 'asi+' && asiAttivi) {
          const totale = valori[stat] + asiAggiunti[stat];
          if (asiUsati < asiTotali && totale < 20) {
            asiAggiunti[stat]++;
            // Se viene usato un ASI, disattiva eventuale talento
            schedaPersonaggio.talento = false;
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
}

