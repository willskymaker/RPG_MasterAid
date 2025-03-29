export function initGeneratoreHpCaVelocita() {
  const container = document.getElementById('generatore-hp-ca-container');
  const output = document.getElementById('generatore-hp-ca-output');

  const dadoPerClasse = {
    Barbaro: 12,
    Guerriero: 10,
    Paladino: 10,
    Ranger: 10,
    Ladro: 8,
    Monaco: 8,
    Bardo: 8,
    Chierico: 8,
    Druido: 8,
    Warlock: 8,
    Mago: 6,
    Stregone: 6
  };

  const velocitaPerSpecie = {
    Nano: 7.5,
    Halfling: 7.5
    // Tutte le altre sono 9
  };

  const getMediaFissa = dado => {
    return Math.floor(dado / 2) + 1;
  };

  const aggiornaOutput = () => {
    const classe = schedaPersonaggio?.classe;
    const specie = schedaPersonaggio?.specie;
    const livello = schedaPersonaggio?.livello || 1;
    const modCOS = schedaPersonaggio?.modificatori?.COS || 0;
    const modDES = schedaPersonaggio?.modificatori?.DES || 0;

    if (!classe || !dadoPerClasse[classe]) {
      output.textContent = "⚠️ Classe non valida o non selezionata.";
      return;
    }

    const dado = dadoPerClasse[classe];
    const media = getMediaFissa(dado);

    let hp = dado + modCOS; // livello 1
    for (let lv = 2; lv <= livello; lv++) {
      hp += media + modCOS;
    }

    const ca = 10 + modDES;
    const velocita = velocitaPerSpecie[specie] || 9;

    output.innerHTML = `
      🩸 <strong>HP Totali:</strong> ${hp}<br>
      🛡️ <strong>CA Base:</strong> ${ca}<br>
      🏃 <strong>Velocità:</strong> ${velocita} m
    `;
  };

  // Ricalcola ogni 500ms (puoi sostituire con eventi in futuro)
  setInterval(aggiornaOutput, 500);

  container.appendChild(output);
}
