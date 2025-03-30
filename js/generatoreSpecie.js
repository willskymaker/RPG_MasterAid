export function initGeneratoreSpecie() {
  const container = document.getElementById('generatore-specie-container');
  const output = document.getElementById('generatore-specie-output');

  const specie = [
    "Umano", "Elfo", "Nano", "Halfling", "Dragonide",
    "Tiefling", "Goliath", "Orco", "Gnomo", "Ardling", "Aasimar"
  ];

  const caratteristiche = ['FOR', 'DES', 'COS', 'INT', 'SAG', 'CAR'];
  const bonusContainer = document.createElement('div');
  bonusContainer.style.marginTop = '10px';

  let metodoBonus = '+2/+1';
  let bonusSelezionati = {};

  const resetBonus = () => {
    bonusSelezionati = {};
    aggiornaBonusUI();
    salvaInScheda();
  };

  const aggiornaBonusUI = () => {
    bonusOutput.innerHTML = '';
    caratteristiche.forEach(stat => {
      const val = bonusSelezionati[stat] || 0;
      const p = document.createElement('div');
      p.textContent = `${stat}: +${val}`;
      bonusOutput.appendChild(p);
    });
  };

  const creaBottoniCaratteristiche = () => {
    const wrapper = document.createElement('div');
    caratteristiche.forEach(stat => {
      const btn = document.createElement('button');
      btn.textContent = stat;
      btn.style.margin = '4px';
      btn.addEventListener('click', () => {
        if (metodoBonus === '+2/+1') {
          const counts = Object.values(bonusSelezionati);
          const ha2 = counts.includes(2);
          const ha1 = counts.includes(1);
          const attuale = bonusSelezionati[stat] || 0;

          if (attuale === 2 || attuale === 1) {
            delete bonusSelezionati[stat];
          } else if (!ha2) {
            bonusSelezionati[stat] = 2;
          } else if (!ha1 && attuale !== 2) {
            bonusSelezionati[stat] = 1;
          }

        } else if (metodoBonus === '+1/+1/+1') {
          const count = Object.values(bonusSelezionati).filter(v => v === 1).length;
          const attuale = bonusSelezionati[stat] || 0;
          if (attuale === 1) {
            delete bonusSelezionati[stat];
          } else if (count < 3) {
            bonusSelezionati[stat] = 1;
          }
        }

        aggiornaBonusUI();
        salvaInScheda();
      });
      wrapper.appendChild(btn);
    });
    return wrapper;
  };

  const salvaInScheda = () => {
    window.schedaPersonaggio = window.schedaPersonaggio || {};
    schedaPersonaggio.specie = select.value || null;
    schedaPersonaggio.bonusSpecie = bonusSelezionati;
  };

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

  const bonusOutput = document.createElement('div');
  bonusOutput.style.marginTop = '10px';

  const radioWrapper = document.createElement('div');
  radioWrapper.innerHTML = `
    <label><input type="radio" name="metodoBonus" value="+2/+1" checked> +2 e +1</label>
    <label><input type="radio" name="metodoBonus" value="+1/+1/+1" style="margin-left: 10px;"> +1 / +1 / +1</label>
  `;
  radioWrapper.addEventListener('change', (e) => {
    metodoBonus = e.target.value;
    resetBonus();
  });

  btnRandom.addEventListener('click', () => {
    const scelta = specie[Math.floor(Math.random() * specie.length)];
    select.value = scelta;
    output.textContent = `🧬 Specie: ${scelta}`;
    bonusContainer.style.display = 'block';
    resetBonus();
    salvaInScheda();
    if (window.aggiornaTalenti) window.aggiornaTalenti(); // ✅ AGGIUNTO
  });

  select.addEventListener('change', () => {
    output.textContent = `🧬 Specie: ${select.value}`;
    bonusContainer.style.display = 'block';
    resetBonus();
    salvaInScheda();
    if (window.aggiornaTalenti) window.aggiornaTalenti(); // ✅ AGGIUNTO
  });

  bonusContainer.appendChild(radioWrapper);
  bonusContainer.appendChild(creaBottoniCaratteristiche());
  bonusContainer.appendChild(bonusOutput);
  bonusContainer.style.display = 'none';

  container.appendChild(select);
  container.appendChild(btnRandom);
  container.appendChild(bonusContainer);
}

