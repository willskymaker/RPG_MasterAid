export function initGeneratoreAllineamento() {
  const container = document.getElementById('generatore-allineamento-container');
  const output = document.getElementById('generatore-allineamento-output');

  const allineamenti = {
    "Legale Buono": "Agisci con compassione e onore secondo un codice o una legge.",
    "Neutrale Buono": "Fai del bene senza preoccuparti di regole o caos.",
    "Caotico Buono": "Segui il tuo cuore e fai il bene senza badare all’autorità.",
    "Legale Neutrale": "Rispetti la legge, la tradizione o un codice senza schierarti.",
    "Neutrale Puro": "Cerchi l’equilibrio tra ordine e caos, bene e male.",
    "Caotico Neutrale": "Fai ciò che vuoi, senza curarti di bene o male, ordine o caos.",
    "Legale Malvagio": "Usi la legge e la struttura per ottenere potere personale.",
    "Neutrale Malvagio": "Pensi solo a te stesso, senza scrupoli o compassione.",
    "Caotico Malvagio": "Fai del male per il gusto di farlo, senza regole o controllo."
  };

  const allineamentiNomi = Object.keys(allineamenti);

  const select = document.createElement('select');
  const optionDefault = document.createElement('option');
  optionDefault.textContent = "-- Seleziona un allineamento --";
  optionDefault.disabled = true;
  optionDefault.selected = true;
  select.appendChild(optionDefault);

  allineamentiNomi.forEach(al => {
    const opt = document.createElement('option');
    opt.value = al;
    opt.textContent = al;
    select.appendChild(opt);
  });

  const btnRandom = document.createElement('button');
  btnRandom.textContent = "🎲 Genera casualmente";

  function aggiornaOutput(al) {
    const descrizione = allineamenti[al];
    output.innerHTML = `<strong>⚖️ Allineamento:</strong> ${al}<br><em>${descrizione}</em>`;
    salvaInScheda(al);
  }

  function salvaInScheda(allineamento) {
    window.schedaPersonaggio = window.schedaPersonaggio || {};
    schedaPersonaggio.allineamento = allineamento;
  }

  select.addEventListener('change', () => {
    aggiornaOutput(select.value);
  });

  btnRandom.addEventListener('click', () => {
    const randomAl = allineamentiNomi[Math.floor(Math.random() * allineamentiNomi.length)];
    select.value = randomAl;
    aggiornaOutput(randomAl);
  });

  container.appendChild(select);
  container.appendChild(btnRandom);
  container.appendChild(output);
}

