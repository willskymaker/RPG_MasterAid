// js/generatoreSpecie.js
import { dbSpecie } from './data/dbSpecie.js';

export function initGeneratoreSpecie() {
  const container = document.getElementById('generatore-specie-container');
  const output = document.getElementById('generatore-specie-output');
  const caratteristiche = ['FOR', 'DES', 'COS', 'INT', 'SAG', 'CAR'];

  const selectSpecie = document.createElement('select');
  const selectSottospecie = document.createElement('select');
  selectSottospecie.style.display = 'none';
  const optionDefault = document.createElement('option');
  optionDefault.textContent = "-- Seleziona una specie --";
  optionDefault.disabled = true;
  optionDefault.selected = true;
  selectSpecie.appendChild(optionDefault);

  const bonusOutput = document.createElement('div');
  bonusOutput.style.marginTop = '10px';

  let metodoBonus = '+2/+1';
  let bonusSelezionati = {};

  const bonusContainer = document.createElement('div');
  bonusContainer.style.marginTop = '10px';
  bonusContainer.style.display = 'none';

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
    const specie = dbSpecie.find(s => s.nome === selectSpecie.value);
    const sottospecie = specie?.sottospecie?.find(ss => ss.nome === selectSottospecie.value);

    window.schedaPersonaggio = window.schedaPersonaggio || {};
    schedaPersonaggio.specie = specie.nome;
    schedaPersonaggio.taglia = specie.taglia;
    schedaPersonaggio.velocita = specie.velocita;
    schedaPersonaggio.scurovisione = specie.scurovisione;
    schedaPersonaggio.trattiSpecie = [...(specie.tratti || []), ...(sottospecie?.tratti || [])];
    schedaPersonaggio.competenzeSpecie = specie.competenze;
    schedaPersonaggio.sottospecie = sottospecie?.nome || null;

    if (specie.bonusCaratteristiche === "personalizzabile") {
      schedaPersonaggio.bonusSpecie = bonusSelezionati;
    } else {
      schedaPersonaggio.bonusSpecie = {
        ...specie.bonusCaratteristiche,
        ...(sottospecie?.bonusCaratteristiche || {})
      };
    }
  };

  dbSpecie.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.nome;
    opt.textContent = s.nome;
    selectSpecie.appendChild(opt);
  });

  const radioWrapper = document.createElement('div');
  radioWrapper.innerHTML = `
    <label><input type="radio" name="metodoBonus" value="+2/+1" checked> +2 e +1</label>
    <label><input type="radio" name="metodoBonus" value="+1/+1/+1" style="margin-left: 10px;"> +1 / +1 / +1</label>
  `;
  radioWrapper.addEventListener('change', (e) => {
    metodoBonus = e.target.value;
    resetBonus();
  });

  selectSpecie.addEventListener('change', () => {
    const specie = dbSpecie.find(s => s.nome === selectSpecie.value);
    output.textContent = `🧬 Specie: ${specie.nome}`;
    bonusContainer.style.display = specie.bonusCaratteristiche === "personalizzabile" ? 'block' : 'none';

    // sottospecie
    if (specie.sottospecie) {
      selectSottospecie.innerHTML = '';
      specie.sottospecie.forEach(ss => {
        const opt = document.createElement('option');
        opt.value = ss.nome;
        opt.textContent = ss.nome;
        selectSottospecie.appendChild(opt);
      });
      selectSottospecie.style.display = 'block';
    } else {
      selectSottospecie.style.display = 'none';
    }

    resetBonus();
    salvaInScheda();
    if (window.aggiornaTalenti) window.aggiornaTalenti();
  });

  selectSottospecie.addEventListener('change', () => {
    resetBonus();
    salvaInScheda();
  });

  const btnRandom = document.createElement('button');
  btnRandom.textContent = "🎲 Genera casualmente";
  btnRandom.addEventListener('click', () => {
    const specie = dbSpecie[Math.floor(Math.random() * dbSpecie.length)];
    selectSpecie.value = specie.nome;
    selectSpecie.dispatchEvent(new Event('change'));
  });

  bonusContainer.appendChild(radioWrapper);
  bonusContainer.appendChild(creaBottoniCaratteristiche());
  bonusContainer.appendChild(bonusOutput);

  container.appendChild(selectSpecie);
  container.appendChild(selectSottospecie);
  container.appendChild(btnRandom);
  container.appendChild(bonusContainer);
}
