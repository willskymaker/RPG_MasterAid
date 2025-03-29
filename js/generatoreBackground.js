export function initGeneratoreBackground() {
  const container = document.getElementById('generatore-background-container');
  const output = document.getElementById('generatore-background-output');
  const btn = document.createElement('button');
  btn.textContent = "Genera Background";

  const backgroundList = [
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

  btn.addEventListener('click', () => {
    const bg = backgroundList[Math.floor(Math.random() * backgroundList.length)];
    output.innerHTML = `📜 <strong>${bg.nome}</strong><br><em>${bg.descrizione}</em>`;
  });

  container.appendChild(btn);
}
