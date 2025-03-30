export function initGeneratoreBackground() {
  const container = document.getElementById('generatore-background-container');
  const output = document.getElementById('generatore-background-output');

  const backgroundList = {
    "Accolito": "Hai passato la tua vita al servizio di un tempio specifico, imparando riti sacri e dogmi.",
    "Criminale": "Hai un passato nel mondo del crimine. Sai come muoverti nell'ombra.",
    "Eroe del Popolo": "Hai difeso la gente comune contro l'oppressione, diventando un simbolo di speranza.",
    "Marinaio": "Hai trascorso anni solcando i mari e affrontando tempeste.",
    "Sapiente": "Hai dedicato la tua vita allo studio di testi antichi, arti e scienze.",
    "Artigiano Gildato": "Appartieni a una gilda di artigiani riconosciuta per maestria e tradizione.",
    "Viandante": "Hai vissuto nella natura selvaggia, lontano dalla civiltà.",
    "Nobile": "Sei nato in una famiglia importante e hai imparato le arti del comando e della diplomazia."
    // Aggiungibili altri background
  };

  const backgroundNomi = Object.keys(backgroundList);

  const select = document.createElement('select');
  const optionDefault = document.createElement('option');
  optionDefault.textContent = "-- Seleziona un background --";
  optionDefault.disabled = true;
  optionDefault.selected = true;
  select.appendChild(optionDefault);

  backgroundNomi.forEach(bg => {
    const opt = document.createElement('option');
    opt.value = bg;
    opt.textContent = bg;
    select.appendChild(opt);
  });

  const btnRandom = document.createElement('button');
  btnRandom.textContent = "🎲 Genera casualmente";

  function aggiornaOutput(bg) {
    const descrizione = backgroundList[bg];
    output.innerHTML = `<strong>🎭 Background:</strong> ${bg}<br><em>${descrizione}</em>`;
    salvaInScheda(bg, descrizione);
  }

  function salvaInScheda(nome, descrizione) {
    window.schedaPersonaggio = window.schedaPersonaggio || {};
    schedaPersonaggio.background = {
      nome: nome,
      descrizione: descrizione
    };
  }

  select.addEventListener('change', () => {
    const bg = select.value;
    aggiornaOutput(bg);
  });

  btnRandom.addEventListener('click', () => {
    const randomBg = backgroundNomi[Math.floor(Math.random() * backgroundNomi.length)];
    select.value = randomBg;
    aggiornaOutput(randomBg);
  });

  container.appendChild(select);
  container.appendChild(btnRandom);
  container.appendChild(output);
}

