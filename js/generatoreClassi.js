export function initGeneratoreClassi() {
  const container = document.getElementById('generatore-classi-container');
  const output = document.getElementById('generatore-classi-output');

  const classi = [
    "Barbaro", "Bardo", "Chierico", "Druido", "Guerriero",
    "Ladro", "Mago", "Monaco", "Paladino", "Ranger", "Stregone", "Warlock"
  ];

  const abilitaPerClasse = {
    Barbaro: { max: 2, abilita: ["Atletica", "Intimidazione", "Sopravvivenza", "Percezione"] },
    Bardo: { max: 3, abilita: ["Intrattenere", "Storia", "Intuizione", "Persuasione"] },
    Ladro: { max: 4, abilita: ["Furtività", "Acrobazia", "Rapidità di mano", "Percezione"] },
    Guerriero: { max: 2, abilita: ["Atletica", "Sopravvivenza", "Intimidazione", "Percezione"] },
    Mago: { max: 2, abilita: ["Arcano", "Storia", "Indagare", "Religione"] }
    // Aggiungeremo le altre man mano
  };

  const select = document.createElement('select');
  const optionDefault = document.createElement('option');
  optionDefault.textContent = "-- Seleziona una classe --";
  optionDefault.disabled = true;
  optionDefault.selected = true;
  select.appendChild(optionDefault);

  classi.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    select.appendChild(opt);
  });

  const btnRandom = document.createElement('button');
  btnRandom.textContent = "🎲 Genera casualmente";

  const abilitaContainer = document.createElement('div');
  abilitaContainer.style.marginTop = '10px';
  const selectedLabel = document.createElement('p');

  let abilitaSelezionate = [];

  function mostraAbilita(classe) {
    const dati = abilitaPerClasse[classe];
    if (!dati) {
      abilitaContainer.innerHTML = '';
      selectedLabel.textContent = '';
      return;
    }

    const { abilita, max } = dati;
    abilitaSelezionate = [];
    abilitaContainer.innerHTML = '';
    selectedLabel.textContent = `Abilità selezionate (0/${max}):`;

    abilita.forEach(nome => {
      const label = document.createElement('label');
      label.style.display = 'block';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.value = nome;

      cb.addEventListener('change', () => {
        if (cb.checked) {
          if (abilitaSelezionate.length < max) {
            abilitaSelezionate.push(nome);
          } else {
            cb.checked = false;
          }
        } else {
          abilitaSelezionate = abilitaSelezionate.filter(v => v !== nome);
        }

        selectedLabel.textContent = `Abilità selezionate (${abilitaSelezionate.length}/${max}): ${abilitaSelezionate.join(", ")}`;
      });

      label.appendChild(cb);
      label.appendChild(document.createTextNode(" " + nome));
      abilitaContainer.appendChild(label);
    });
  }

  select.addEventListener('change', () => {
    const classe = select.value;
    output.textContent = `🛡️ Classe: ${classe}`;
    mostraAbilita(classe);
  });

  btnRandom.addEventListener('click', () => {
    const scelta = classi[Math.floor(Math.random() * classi.length)];
    select.value = scelta;
    output.textContent = `🛡️ Classe: ${scelta}`;
    mostraAbilita(scelta);
  });

  container.appendChild(select);
  container.appendChild(btnRandom);
  container.appendChild(abilitaContainer);
  container.appendChild(selectedLabel);
}

