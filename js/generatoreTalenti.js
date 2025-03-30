export function initGeneratoreTalenti() {
  const container = document.getElementById('generatore-talenti-container');
  const output = document.getElementById('generatore-talenti-output');

  window.schedaPersonaggio = window.schedaPersonaggio || {};
  schedaPersonaggio.talenti = [];

  // Salviamo la lista checkbox per eventuali filtri
  let checkboxList;

  // Checkbox filtro
  let filtroCheckbox;

  // Lista di talenti ufficiali
const talenti = [
  {
    nome: "Allerta",
    descrizione: "Ottieni un bonus di +5 all'iniziativa e non puoi essere sorpreso mentre sei cosciente.",
    prerequisiti: {}
  },
  {
    nome: "Atleta",
    descrizione: "Aumenti FOR o DES di 1. Migliori arrampicata, salto e rialzata da prono.",
    prerequisiti: {}
  },
  {
    nome: "Fortunato",
    descrizione: "Hai 3 punti fortuna per ritirare tiri d20 tuoi o di altri, una volta per turno.",
    prerequisiti: {}
  },
  {
    nome: "Maestro delle Armi Grandi",
    descrizione: "Quando abbatti o critichi, ottieni un attacco bonus. Puoi infliggere +10 danni con penalità -5 all’attacco.",
    prerequisiti: { caratteristica: { FOR: 13 } }
  },
  {
    nome: "Tiratore Scelto",
    descrizione: "Ignori copertura, rimuovi svantaggio da distanza, puoi infliggere +10 danni con penalità -5 all’attacco.",
    prerequisiti: { caratteristica: { DES: 13 } }
  },
  {
    nome: "Resiliente",
    descrizione: "Aumenti una caratteristica di 1 e ottieni competenza nei tiri salvezza per essa.",
    prerequisiti: {}
  },
  {
    nome: "Abile",
    descrizione: "Ottieni competenza in tre abilità a tua scelta.",
    prerequisiti: {}
  },
  {
    nome: "Osservatore",
    descrizione: "Aumenti INT o SAG di 1, +5 a Percezione e Investigazione passiva, puoi leggere le labbra.",
    prerequisiti: { caratteristica: { INT: 13 } } // o SAG, a seconda della scelta
  },
  {
    nome: "Sentinella",
    descrizione: "Se colpisci con attacco di opportunità, il bersaglio è bloccato. Puoi reagire anche se il nemico usa Disimpegno.",
    prerequisiti: {}
  },
  {
    nome: "Mobile",
    descrizione: "Velocità +10 piedi, nessun attacco di opportunità se colpisci in mischia, ignorazione terreno difficile durante scatti.",
    prerequisiti: {}
  },
    {
    nome: "Duro a Morire",
    descrizione: "I tuoi punti ferita massimi aumentano di 2 per ogni livello.",
    prerequisiti: {}
  },
  {
    nome: "Maestro con Scudo",
    descrizione: "Puoi usare lo scudo per spingere, e ottieni bonus difensivi su tiri salvezza DES.",
    prerequisiti: {}
  },
  {
    nome: "Maestro delle Armature Pesanti",
    descrizione: "Riduci di 3 i danni non magici da armi mentre indossi armature pesanti.",
    prerequisiti: { caratteristica: { FOR: 13 } }
  },
  {
    nome: "Iniziato alla Magia",
    descrizione: "Impari 2 trucchetti e un incantesimo di livello 1 da una lista di classe.",
    prerequisiti: {}
  },
  {
    nome: "Telepatico",
    descrizione: "Aumenti INT, SAG o CAR di 1. Comunichi telepaticamente con chi vedi entro 18 metri.",
    prerequisiti: {}
  },
  {
    nome: "Telecinetico",
    descrizione: "Aumenti INT, SAG o CAR di 1. Muovi oggetti con la mente e influenzi l’ambiente.",
    prerequisiti: {}
  },
  {
    nome: "Duelista Difensivo",
    descrizione: "Puoi usare la tua DES per aggiungere bonus alla CA come reazione se impugni arma finesse.",
    prerequisiti: { caratteristica: { DES: 13 } }
  },
  {
    nome: "Linguista",
    descrizione: "Aumenti INT di 1, impari 3 lingue e puoi creare codici scritti.",
    prerequisiti: {}
  },
  {
    nome: "Maestro con Balestra",
    descrizione: "Ignori ricarica, puoi attaccare con mano secondaria e reagire se nemico entra nel tuo raggio.",
    prerequisiti: {}
  },
  {
    nome: "Incantatore da Guerra",
    descrizione: "Hai vantaggio nei TS per mantenere concentrazione, puoi lanciare come reazione.",
    prerequisiti: { tipoClasse: "caster-pieno" }
  },
  {
    nome: "Maestro delle Armature Medie",
    descrizione: "Aumenti la tua DES di 1 (massimo 14) e ottieni competenza nelle armature medie.",
    prerequisiti: { caratteristica: { FOR: 13 } }
  },
  {
    nome: "Carismatico Naturale",
    descrizione: "Aumenti CAR di 1. Ottieni competenza in Persuasione o Inganno.",
    prerequisiti: { caratteristica: { CAR: 13 } }
  },
  {
    nome: "Studioso",
    descrizione: "Aumenti INT di 1. Ottieni competenza in Arcano o Storia.",
    prerequisiti: { caratteristica: { INT: 13 } }
  },
  {
    nome: "Empatico",
    descrizione: "Aumenti SAG di 1. Ottieni competenza in Intuizione o Medicina.",
    prerequisiti: { caratteristica: { SAG: 13 } }
  },
  {
    nome: "Infallibile",
    descrizione: "Puoi ritirare un tiro fallito 1 volta al giorno.",
    prerequisiti: { livello: 8 }
  },
  {
    nome: "Maestro di Armi da Lancio",
    descrizione: "Aumenti FOR o DES di 1. I tuoi attacchi a distanza ignorano la portata normale.",
    prerequisiti: {}
  },
  {
    nome: "Stratega",
    descrizione: "Aumenti INT di 1. Puoi fornire vantaggio tattico agli alleati vicini.",
    prerequisiti: { caratteristica: { INT: 13 } }
  },
  {
    nome: "Ritirata Rapida",
    descrizione: "Puoi usare l’azione bonus per Disimpegno o Scatto.",
    prerequisiti: {}
  },
  {
    nome: "Occhio di Falco",
    descrizione: "Aumenti DES di 1. Portata doppia con armi da tiro, vantaggio su Percezione visiva.",
    prerequisiti: { caratteristica: { DES: 13 } }
  },
  {
    nome: "Pelle di Pietra",
    descrizione: "Aumenti COS di 1. Ottieni +1 CA se non indossi armatura pesante.",
    prerequisiti: { caratteristica: { COS: 13 } }
  },
  {
    nome: "Combattente Versatile",
    descrizione: "Aumenti FOR o DES di 1. Puoi cambiare arma o stile al volo come azione bonus.",
    prerequisiti: {}
  },
  {
    nome: "Maestro delle Due Armi",
    descrizione: "Puoi usare armi non leggere nella mano secondaria e aggiungi bonus al danno.",
    prerequisiti: { caratteristica: { DES: 13 } }
  },
  {
    nome: "Corpo a Corpo Letale",
    descrizione: "Aumenti FOR o DES di 1. Se colpisci, puoi spingere o far cadere il bersaglio.",
    prerequisiti: {}
  },
  {
    nome: "Scudo Magico",
    descrizione: "Quando lanci Scudo, ottieni +5 CA e puoi riflettere danni a chi ti colpisce in mischia.",
    prerequisiti: { tipoClasse: "caster-pieno" }
  },
  {
    nome: "Precisione Elfica",
    descrizione: "Se ottieni vantaggio con DES, puoi ritirare uno dei dadi d20.",
    prerequisiti: { caratteristica: { DES: 13 } }
  },
  {
    nome: "Maestro delle Armature Leggere",
    descrizione: "Aumenti DES di 1. Ottieni competenza nelle armature leggere.",
    prerequisiti: { caratteristica: { DES: 13 } }
  },
  {
    nome: "Colpo Devastante",
    descrizione: "Se infliggi critico, aggiungi 1d6 danni extra con armi da mischia.",
    prerequisiti: {}
  },
  {
    nome: "Sangue Freddo",
    descrizione: "Hai vantaggio contro effetti di paura, intimidazione e confusione mentale.",
    prerequisiti: { caratteristica: { SAG: 13 } }
  },
  {
    nome: "Tattico Esperto",
    descrizione: "Puoi usare l'azione per aiutare un alleato entro 9 metri senza penalità.",
    prerequisiti: {}
  },
  {
    nome: "Implacabile",
    descrizione: "Una volta per riposo lungo, puoi rimanere a 1 PF invece che scendere a 0.",
    prerequisiti: {}
  },
  {
    nome: "Combattente Corazzato",
    descrizione: "Aumenti FOR o COS di 1. Ignori penalità alle prove di Destrezza quando indossi armature pesanti.",
    prerequisiti: { caratteristica: { FOR: 13 } }
  },
  {
    nome: "Esperto di Sopravvivenza",
    descrizione: "Ottieni vantaggio nelle prove di Natura e Sopravvivenza. Perfetto per esploratori.",
    prerequisiti: {}
  },
  {
    nome: "Pugni d'Acciaio",
    descrizione: "Puoi combattere senz'armi con danni migliorati e attacchi extra.",
    prerequisiti: { classe: "Monaco" }
  },
  {
    nome: "Furtivo Letale",
    descrizione: "Il tuo attacco furtivo infligge +1d6 danni. Ti muovi silenziosamente.",
    prerequisiti: { classe: "Ladro" }
  },
  {
    nome: "Parlatore Carismatico",
    descrizione: "Aumenti CAR di 1. Ottieni competenza in Persuasione e Inganno se non l’hai già.",
    prerequisiti: { caratteristica: { CAR: 13 } }
  },
  {
    nome: "Combattente con Lancia",
    descrizione: "Quando impugni una lancia a due mani, ottieni +1 CA e maggiore portata.",
    prerequisiti: {}
  },
  {
    nome: "Controllo Mentale",
    descrizione: "Ottieni resistenza a incantesimi che influenzano la mente e vantaggio su TS di SAG.",
    prerequisiti: { tipoClasse: "caster-pieno" }
  },
  {
    nome: "Comandante da Battaglia",
    descrizione: "Una volta per turno puoi ordinare a un alleato di attaccare come reazione.",
    prerequisiti: {}
  },
  {
    nome: "Forgia del Fuoco",
    descrizione: "Resistenza al fuoco, competenza negli attrezzi da fabbro.",
    prerequisiti: { specie: "Nano" }
  },
  {
    nome: "Studente di Magia",
    descrizione: "Impari 2 trucchetti e un incantesimo da un'altra lista di classe.",
    prerequisiti: { tipoClasse: "caster-pieno" }
  },

  //inserisci qui altri talenti
];

  // Verifica i prerequisiti per ogni talento
  function verificaPrerequisiti(talento) {
    const scheda = schedaPersonaggio;

    if (talento.prerequisiti.tipoClasse && talento.prerequisiti.tipoClasse !== scheda.tipoClasse) return false;
    if (talento.prerequisiti.classe && talento.prerequisiti.classe !== scheda.classe) return false;
    if (talento.prerequisiti.specie && talento.prerequisiti.specie !== scheda.specie) return false;
    if (talento.prerequisiti.livello && (scheda.livello || 1) < talento.prerequisiti.livello) return false;

    if (talento.prerequisiti.caratteristica) {
      for (const [stat, val] of Object.entries(talento.prerequisiti.caratteristica)) {
        if (!scheda.caratteristiche || (scheda.caratteristiche[stat] || 0) < val) return false;
      }
    }

    return true;
  }

  // Calcola slot disponibili
  function livelloConsenteTalenti() {
    const liv = schedaPersonaggio.livello || 1;
    return Math.floor(liv / 4); // Slot ai livelli 4, 8, 12, 16, 19
  }

  // Ricostruisce l'elenco dei talenti
  function renderTalenti() {
    // Svuota
    if (checkboxList) checkboxList.remove();
    checkboxList = document.createElement('div');

    talenti.forEach(talento => {
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = talento.nome;

      const slotMassimo = livelloConsenteTalenti();
      const isDisponibile = verificaPrerequisiti(talento);

      checkbox.disabled = !isDisponibile;
      if (!isDisponibile) label.classList.add('talento-disabilitato');
      else label.classList.remove('talento-disabilitato');

      checkbox.checked = schedaPersonaggio.talenti.some(t => t.nome === talento.nome);

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
          schedaPersonaggio.asiBloccato = true;
        } else {
          schedaPersonaggio.talenti = schedaPersonaggio.talenti.filter(t => t.nome !== talento.nome);
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

    container.appendChild(checkboxList);
    aggiornaOutput();
    applicaFiltro(); // Rende il filtro funzionante
  }

  // Output
  function aggiornaOutput() {
    if (schedaPersonaggio.talenti.length === 0) {
      output.innerHTML = `✨ Nessun talento selezionato.`;
    } else {
      const lista = schedaPersonaggio.talenti.map(t => `<li><strong>${t.nome}</strong>: ${t.descrizione}</li>`).join("");
      output.innerHTML = `✨ Talenti selezionati:<ul>${lista}</ul>`;
    }
  }

  // Filtro visivo dei talenti
  function creaFiltro() {
    filtroCheckbox = document.createElement('input');
    filtroCheckbox.type = 'checkbox';
    filtroCheckbox.id = 'filtra-talenti';

    const filtroLabel = document.createElement('label');
    filtroLabel.textContent = " Mostra solo talenti selezionabili";
    filtroLabel.prepend(filtroCheckbox);
    filtroLabel.style.display = "block";
    filtroLabel.style.marginBottom = "10px";

    filtroCheckbox.addEventListener('change', () => {
      applicaFiltro();
    });

    container.appendChild(filtroLabel);
  }

  function applicaFiltro() {
    if (!filtroCheckbox || !checkboxList) return;
    const tuttiLabel = checkboxList.querySelectorAll('label');
    tuttiLabel.forEach(label => {
      const disabilitato = label.classList.contains('talento-disabilitato');
      label.style.display = (!filtroCheckbox.checked || !disabilitato) ? "block" : "none";
    });
  }

  // Inizializzazione
  creaFiltro();
  renderTalenti();

  // Funzione globale richiamabile per aggiornare dinamicamente
  window.aggiornaTalenti = renderTalenti;
}
