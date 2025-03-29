export function initGeneratoreBackground() {
  const container = document.getElementById('generatore-background-container');
  const output = document.getElementById('generatore-background-output');

  const backgrounds = [
    {
      nome: "Accolito",
      descrizione: "Cresciuto in un tempio, conosci riti sacri, liturgie e credi religiosi."
    },
    {
      nome: "Artigiano",
      descrizione: "Membro di una gilda, esperto in un mestiere pratico e tradizionale."
    },
    {
      nome: "Ciarlatano",
      descrizione: "Truffatore nato, abile con bugie, travestimenti e manipolazioni."
    },
    {
      nome: "Intrattenitore",
      descrizione: "Artista carismatico: musicista, attore o saltimbanco noto al pubblico."
    },
    {
      nome: "Esploratore",
      descrizione: "Hai vissuto all’aperto, guidando spedizioni in terre selvagge e ignote."
    },
    {
      nome: "Contadino",
      descrizione: "Persona semplice, legata alla terra, al lavoro e ai valori rurali."
    },
    {
      nome: "Gladiatore",
      descrizione: "Lottatore da arena, addestrato a combattere per lo spettacolo."
    },
    {
      nome: "Guardia",
      descrizione: "Ex membro di una milizia cittadina, pattugliavi strade o confini."
    },
    {
      nome: "Guida",
      descrizione: "Conosci ambienti ostili, tracciati e rifugi nascosti. Sai condurre."
    },
    {
      nome: "Eremita",
      descrizione: "Hai vissuto isolato, ritirato dal mondo, in cerca di verità interiori."
    },
    {
      nome: "Manovale",
      descrizione: "Hai lavorato con fatica fisica: minatore, facchino o muratore."
    },
    {
      nome: "Nobile",
      descrizione: "Cresciuto tra ricchezze e doveri, conosci il protocollo e il potere."
    },
    {
      nome: "Pellegrino",
      descrizione: "Sei in cammino spinto dalla fede, dalla redenzione o da un voto sacro."
    },
    {
      nome: "Saggio",
      descrizione: "Studioso appassionato di storia, magia e misteri dimenticati."
    },
    {
      nome: "Marinaio",
      descrizione: "Abituato alla vita in mare, tra vele, burrasche e porti lontani."
    },
    {
      nome: "Soldato",
      descrizione: "Hai servito in battaglia, seguendo ordini, onore e strategia."
    },
    {
      nome: "Ragazzo di strada",
      descrizione: "Cresciuto in quartieri malfamati, sopravvivi grazie a ingegno e velocità."
    }
  ];

  const select = document.createElement('select');
  const optionDefault = document.createElement('option');
  optionDefault.textContent = "-- Seleziona un background --";
  optionDefault.disabled = true;
  optionDefault.selected = true;
  select.appendChild(optionDefault);

  backgrounds.forEach(bg => {
    const opt = document.createElement('option');
    opt.value = bg.nome;
    opt.textContent = bg.nome;
    select.appendChild(opt);
  });

  const btnRandom = document.createElement('button');
  btnRandom.textContent = "🎲 Genera casualmente";

  const mostraOutput = (nome) => {
    const bg = backgrounds.find(b => b.nome === nome);
    output.innerHTML = `📜 <strong>${bg.nome}</strong><br><em>${bg.descrizione}</em>`;
  };

  btnRandom.addEventListener('click', () => {
    const scelta = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    select.value = scelta.nome;
    mostraOutput(scelta.nome);
  });

  select.addEventListener('change', () => {
    mostraOutput(select.value);
  });

  container.appendChild(select);
  container.appendChild(btnRandom);
}

