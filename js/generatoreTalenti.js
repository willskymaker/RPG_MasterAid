export function initGeneratoreTalenti() {
  const container = document.getElementById('generatore-talenti-container');
  const output = document.getElementById('generatore-talenti-output');

  window.schedaPersonaggio = window.schedaPersonaggio || {};
  schedaPersonaggio.talenti = [];

  const talenti = [
    {
      nome: "Allerta",
      descrizione: "Hai un bonus di +5 all’iniziativa e non puoi essere sorpreso.",
      prerequisiti: {}
    },
    {
      nome: "Atletico",
      descrizione: "Aumenti FOR o DES di 1. Raddoppi le prove di arrampicata, salto e nuoto.",
      prerequisiti: {}
    },
    {
      nome: "Incantatore da Guerra",
      descrizione: "Hai vantaggio nei tiri salvezza per mantenere concentrazione.",
      prerequisiti: { tipoClasse: "caster-pieno" }
    },
    {
      nome: "Duro a Morire",
      descrizione: "Aumenti di 1 la tua COS. Ottieni PF extra ogni livello.",
      prerequisiti: { caratteristica: { COS: 13 } }
    },
    {
      nome: "Maestro d'Armi",
      descrizione: "Ottieni manovre speciali con armi da mischia pesanti.",
      prerequisiti: { caratteristica: { FOR: 13 } }
    }
    // Aggiungine altri man mano...
  ];

  function livelloConsenteTalenti() {
    const liv = schedaPersonaggio.livello || 1;
    return Math.floor(liv / 4); // slot a liv 4, 8, 12, 16, 19
  }

  function verificaPrerequisiti(talento) {
    const scheda = schedaPersonaggio;

    if (talento.prerequisiti.tipoClasse && talento.prerequisiti.tipoClasse !== scheda.tipoClasse)
      return false;

    if (talento.prerequisiti.caratteristica) {
      for (const [stat, val] of Object.entries(talento.prerequisiti.caratteristica)) {
        if (!scheda.caratteristiche || (scheda.caratteristiche[stat] || 0) < val)
          return false;
      }
    }

    return true;
  }

  const checkboxList = document.createElement('div');

  talenti.forEach(talento => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = talento.nome;

    const slotMassimo = livelloConsenteTalenti();

    checkbox.disabled = !verificaPrerequisiti(talento);

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        if (schedaPersonaggio.talenti.length >= slotMassimo) {
          checkbox.checked = false;
          alert(`Hai già selezionato il numero massimo di talenti (${slotMassimo}).`);
          return;
        }
        schedaPersonaggio.talenti.push({
          nome: talento.nome,
          descrizione: talento.descrizione
        });

        // Disattiva ASI
        schedaPersonaggio.asiBloccato = true;
      } else {
        schedaPersonaggio.talenti = schedaPersonaggio.talenti.filter(t => t.nome !== talento.nome);

        // Se non hai più talenti selezionati, riattiva ASI
        if (schedaPersonaggio.talenti.length === 0) {
          schedaPersonaggio.asiBloccato = false;
        }
      }

      aggiornaOutput();
    });

    label.appendChild(checkbox);
    label.append(` ${talento.nome} — ${talento.descrizione}`);
    checkboxList.appendChild(label);
    checkboxList.appendChild(document.createElement('br'));
  });

  function aggiornaOutput() {
    if (schedaPersonaggio.talenti.length === 0) {
      output.innerHTML = `✨ Nessun talento selezionato.`;
    } else {
      const lista = schedaPersonaggio.talenti.map(t => `<li><strong>${t.nome}</strong>: ${t.descrizione}</li>`).join("");
      output.innerHTML = `✨ Talenti selezionati:<ul>${lista}</ul>`;
    }
  }

  container.appendChild(checkboxList);
  container.appendChild(output);
}

