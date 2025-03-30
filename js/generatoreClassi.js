export function initGeneratoreClassi() {
  const container = document.getElementById('generatore-classi-container');
  const output = document.getElementById('generatore-classi-output');

  window.schedaPersonaggio = window.schedaPersonaggio || {};

  const classi = {
    Barbaro: {
      abilitaDisponibili: ["Atletica", "Intimidazione", "Percezione", "Sopravvivenza"],
      numeroAbilita: 2,
      tratti: [
        "Furia (2 volte al giorno)",
        "Difesa senza armatura",
        "Attacco con arma potente"
      ],
      tipo: "non-caster"
    },
    Bardo: {
      abilitaDisponibili: ["Acrobazia", "Intrattenere", "Intuizione", "Furtività", "Percezione", "Persuasione"],
      numeroAbilita: 3,
      tratti: [
        "Incantesimi bardici",
        "Ispirazione bardica (d6)",
        "Competenze in strumenti musicali"
      ],
      tipo: "caster-pieno"
    },
    Chierico: {
      abilitaDisponibili: ["Intuizione", "Medicina", "Religione", "Persuasione"],
      numeroAbilita: 2,
      tratti: [
        "Incantesimi divini",
        "Dominio divino",
        "Canale Divino (1 uso)"
      ],
      tipo: "caster-pieno"
    },
    Druido: {
      abilitaDisponibili: ["Intuizione", "Medicina", "Natura", "Percezione", "Sopravvivenza", "Addestrare Animali"],
      numeroAbilita: 2,
      tratti: [
        "Incantesimi naturali",
        "Parlare con gli animali",
        "Forma selvatica (trasformazione)"
      ],
      tipo: "caster-pieno"
    },
    Guerriero: {
      abilitaDisponibili: ["Atletica", "Intimidazione", "Storia", "Sopravvivenza", "Percezione", "Intuizione"],
      numeroAbilita: 2,
      tratti: [
        "Secondo vento (cura)",
        "Azione impetuosa (1 volta al giorno)",
        "Stile di combattimento"
      ],
      tipo: "non-caster"
    },
    Ladro: {
      abilitaDisponibili: ["Furtività", "Rapidità di Mano", "Acrobazia", "Investigazione", "Percezione", "Inganno", "Intuizione", "Atletica"],
      numeroAbilita: 4,
      tratti: [
        "Attacco furtivo (1d6)",
        "Movimento furtivo",
        "Esperienza in 2 abilità"
      ],
      tipo: "non-caster"
    },
    Mago: {
      abilitaDisponibili: ["Arcano", "Storia", "Indagare", "Religione", "Intuizione"],
      numeroAbilita: 2,
      tratti: [
        "Incantesimi arcani",
        "Recupero arcano",
        "Tradizione arcana (scuola)"
      ],
      tipo: "caster-pieno"
    },
    Monaco: {
      abilitaDisponibili: ["Acrobazia", "Atletica", "Furtività", "Intuizione", "Religione"],
      numeroAbilita: 2,
      tratti: [
        "Arti marziali",
        "Difesa senza armatura",
        "Punti Ki (2)"
      ],
      tipo: "non-caster"
    },
    Paladino: {
      abilitaDisponibili: ["Atletica", "Intuizione", "Intimidazione", "Medicina", "Persuasione", "Religione"],
      numeroAbilita: 2,
      tratti: [
        "Imposizione delle mani (cura)",
        "Giuramento sacro",
        "Incantesimi divini"
      ],
      tipo: "mezzo-caster"
    },
    Ranger: {
      abilitaDisponibili: ["Addestrare Animali", "Atletica", "Intuizione", "Indagare", "Natura", "Percezione", "Sopravvivenza", "Furtività"],
      numeroAbilita: 3,
      tratti: [
        "Nemico prescelto",
        "Esploratore nato",
        "Incantesimi naturali"
      ],
      tipo: "mezzo-caster"
    },
    Stregone: {
      abilitaDisponibili: ["Arcano", "Inganno", "Intuizione", "Persuasione", "Religione"],
      numeroAbilita: 2,
      tratti: [
        "Origine magica",
        "Incantesimi innati",
        "Fonti di potere magico (punti stregoneria)"
      ],
      tipo: "caster-pieno"
    },
    Warlock: {
      abilitaDisponibili: ["Arcano", "Inganno", "Intimidazione", "Natura", "Religione"],
      numeroAbilita: 2,
      tratti: [
        "Patto con un'entità",
        "Invocazioni mistiche",
        "Incantesimi del patto"
      ],
      tipo: "caster-pieno"
    }
  };

  const select = document.createElement('select');
  const optionDefault = document.createElement('option');
  optionDefault.textContent = "-- Seleziona una classe --";
  optionDefault.disabled = true;
  optionDefault.selected = true;
  select.appendChild(optionDefault);

  Object.keys(classi).forEach(nomeClasse => {
    const opt = document.createElement('option');
    opt.value = nomeClasse;
    opt.textContent = nomeClasse;
    select.appendChild(opt);
  });

  const abilitaBox = document.createElement('div');

  select.addEventListener('change', () => {
    const scelta = select.value;
    const datiClasse = classi[scelta];
    schedaPersonaggio.classe = scelta;
    schedaPersonaggio.trattiClasse = datiClasse.tratti;
    schedaPersonaggio.tipoClasse = datiClasse.tipo;

    // 🔁 Aggiorna dinamicamente i talenti disponibili
    if (window.aggiornaTalenti) window.aggiornaTalenti();

    const { abilitaDisponibili, numeroAbilita } = datiClasse;
    abilitaBox.innerHTML = `<p>Seleziona ${numeroAbilita} abilità:</p>`;
    const selezionate = [];

    abilitaDisponibili.forEach(abilita => {
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = abilita;

      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          selezionate.push(abilita);
          if (selezionate.length > numeroAbilita) {
            const rimosso = selezionate.shift();
            const daDeselezionare = abilitaBox.querySelector(`input[value="${rimosso}"]`);
            if (daDeselezionare) daDeselezionare.checked = false;
          }
        } else {
          const idx = selezionate.indexOf(abilita);
          if (idx !== -1) selezionate.splice(idx, 1);
        }

        schedaPersonaggio.abilitaClasse = [...selezionate];
        aggiornaOutput();
      });

      label.appendChild(checkbox);
      label.append(` ${abilita}`);
      abilitaBox.appendChild(label);
      abilitaBox.appendChild(document.createElement('br'));
    });

    aggiornaOutput();
  });

  function aggiornaOutput() {
    const classe = schedaPersonaggio.classe || "Nessuna";
    const abilita = schedaPersonaggio.abilitaClasse || [];
    output.innerHTML = `⚔️ Classe selezionata: <strong>${classe}</strong><br>🧠 Abilità: ${abilita.join(", ")}`;
  }

  container.appendChild(select);
  container.appendChild(abilitaBox);
  container.appendChild(output);
}

