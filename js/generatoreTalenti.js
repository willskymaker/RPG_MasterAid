export function initGeneratoreTalenti() {
  const container = document.getElementById('generatore-talenti-container');
  const output = document.getElementById('generatore-talenti-output');

  window.schedaPersonaggio = window.schedaPersonaggio || {};
  schedaPersonaggio.talenti = [];

  const talentiDisponibili = [
    {
      nome: "Robusto",
      descrizione: "Ottieni +1 a COS. I tuoi PF massimi aumentano di 1 per livello.",
      requisiti: { livello: 4 }
    },
    {
      nome: "Allerta",
      descrizione: "Ottieni +5 all'iniziativa. Non puoi essere sorpreso mentre sei cosciente.",
      requisiti: { livello: 4 }
    },
    {
      nome: "Maestro delle Armi",
      descrizione: "Ottieni competenza con 2 armi a tua scelta e +1 a FOR o DES.",
      requisiti: { livello: 4, forzaMin: 13 }
    },
    {
      nome: "Incantatore Esperto",
      descrizione: "Ottieni +1 a INT o SAG. Conosci un incantesimo aggiuntivo.",
      requisiti: { livello: 4, classi: ["Mago", "Chierico", "Stregone", "Druido", "Warlock", "Paladino"] }
    },
    {
      nome: "Duelista Difensivo",
      descrizione: "Richiede DES ≥ 13. Aumenti la tua CA mentre impugni un'arma leggera.",
      requisiti: { livello: 4, destrezzaMin: 13 }
    }
  ];

  const livelloPg = schedaPersonaggio.livello || 1;
  const classePg = schedaPersonaggio.classe || "";
  const caratteristiche = schedaPersonaggio.caratteristiche || {};

  // Calcola quanti slot ASI/talento sono disponibili (2 punti ASI per soglia)
  const soglie = [4, 8, 12, 16, 19];
  const slotTotali = soglie.filter(lv => lv <= livelloPg).length;

  const talentiSelezionati = [];

  const titolo = document.createElement('p');
  titolo.innerHTML = `🧠 Hai <strong>${slotTotali}</strong> slot utilizzabili per ASI o Talenti.`;
  container.appendChild(titolo);

  for (let i = 0; i < slotTotali; i++) {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = "10px";

    const label = document.createElement('label');
    label.textContent = `Slot Talento #${i + 1}`;
    const select = document.createElement('select');

    const optDefault = document.createElement('option');
    optDefault.textContent = "-- Nessun talento selezionato --";
    optDefault.value = "";
    select.appendChild(optDefault);

    talentiDisponibili.forEach(talento => {
      const opt = document.createElement('option');
      opt.value = talento.nome;
      opt.textContent = talento.nome;

      const r = talento.requisiti;
      let disabilitato = false;

      if (r.livello && livelloPg < r.livello) disabilitato = true;
      if (r.forzaMin && (caratteristiche.FOR || 0) < r.forzaMin) disabilitato = true;
      if (r.destrezzaMin && (caratteristiche.DES || 0) < r.destrezzaMin) disabilitato = true;
      if (r.classi && !r.classi.includes(classePg)) disabilitato = true;

      if (disabilitato) {
        opt.disabled = true;
        opt.textContent += " (non disponibile)";
      }

      select.appendChild(opt);
    });

    // Assegna evento di selezione
    select.addEventListener('change', () => {
      const talentoNome = select.value;
      const talentoInfo = talentiDisponibili.find(t => t.nome === talentoNome);

      if (talentoNome && talentoInfo) {
        talentiSelezionati[i] = {
          nome: talentoInfo.nome,
          descrizione: talentoInfo.descrizione
        };
      } else {
        talentiSelezionati[i] = null;
      }

      aggiornaSchedaTalenti();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(select);
    container.appendChild(wrapper);
  }

  function aggiornaSchedaTalenti() {
    schedaPersonaggio.talenti = talentiSelezionati.filter(t => t);
    schedaPersonaggio.talento = true; // Disattiva ASI
    aggiornaOutput();
  }

  function aggiornaOutput() {
    if (schedaPersonaggio.talenti.length === 0) {
      output.innerHTML = "<em>Nessun talento selezionato.</em>";
      return;
    }

    output.innerHTML = "<strong>🎭 Talenti selezionati:</strong><ul style='margin-top:5px'>";
    schedaPersonaggio.talenti.forEach(t => {
      output.innerHTML += `<li><strong>${t.nome}</strong>: <em>${t.descrizione}</em></li>`;
    });
    output.innerHTML += "</ul>";
  }

  aggiornaSchedaTalenti();
}
