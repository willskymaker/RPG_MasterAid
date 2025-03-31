export const dbArmature = [
  // Armature leggere
  {
    nome: "Armatura di cuoio",
    categoria: "leggera",
    classeArmatura: 11,
    modificatore: "DES",
    svantaggioFurtività: false,
    forzaMinima: 0,
    peso: 10,
    proficienza: ["Bardo", "Ladro", "Ranger"]
  },
  {
    nome: "Armatura di cuoio borchiato",
    categoria: "leggera",
    classeArmatura: 12,
    modificatore: "DES",
    svantaggioFurtività: false,
    forzaMinima: 0,
    peso: 13,
    proficienza: ["Bardo", "Ladro", "Ranger"]
  },

  // Armature medie
  {
    nome: "Gambeson",
    categoria: "media",
    classeArmatura: 12,
    modificatore: "DES",
    limiteModificatore: 2,
    svantaggioFurtività: false,
    forzaMinima: 0,
    peso: 20,
    proficienza: ["Chierico", "Druido", "Ranger", "Paladino"]
  },
  {
    nome: "Corazza a scaglie",
    categoria: "media",
    classeArmatura: 14,
    modificatore: "DES",
    limiteModificatore: 2,
    svantaggioFurtività: true,
    forzaMinima: 0,
    peso: 45,
    proficienza: ["Chierico", "Druido", "Ranger", "Paladino"]
  },
  {
    nome: "Corazza di piastre parziale",
    categoria: "media",
    classeArmatura: 15,
    modificatore: "DES",
    limiteModificatore: 2,
    svantaggioFurtività: true,
    forzaMinima: 0,
    peso: 50,
    proficienza: ["Chierico", "Druido", "Ranger", "Paladino"]
  },

  // Armature pesanti
  {
    nome: "Cotta di maglia",
    categoria: "pesante",
    classeArmatura: 16,
    modificatore: null,
    svantaggioFurtività: true,
    forzaMinima: 13,
    peso: 55,
    proficienza: ["Paladino", "Guerriero"]
  },
  {
    nome: "Corazza ad anelli",
    categoria: "pesante",
    classeArmatura: 14,
    modificatore: null,
    svantaggioFurtività: true,
    forzaMinima: 0,
    peso: 40,
    proficienza: ["Paladino", "Guerriero"]
  },
  {
    nome: "Corazza a piastre",
    categoria: "pesante",
    classeArmatura: 18,
    modificatore: null,
    svantaggioFurtività: true,
    forzaMinima: 15,
    peso: 65,
    proficienza: ["Paladino", "Guerriero"]
  },

  // Scudi
  {
    nome: "Scudo",
    categoria: "scudo",
    classeArmatura: 2,
    modificatore: null,
    svantaggioFurtività: false,
    forzaMinima: 0,
    peso: 6,
    proficienza: ["Chierico", "Guerriero", "Paladino", "Ranger"]
  }
];
