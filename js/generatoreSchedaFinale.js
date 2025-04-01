
// js/generatoreSchedaFinale.js

export function initGeneratoreSchedaFinale() {
  const container = document.getElementById('scheda-personaggio-output');
  if (container) container.innerHTML = '';
  window.aggiornaSchedaFinale = () => {};
}

export function esportaPDF(scheda) {
  const jsPDF = window.jspdf?.jsPDF;
  if (!jsPDF) {
    alert("Errore: jsPDF non disponibile.");
    return;
  }

  const doc = new jsPDF();
  let y = 10;

  const linee = [
    `Nome: ${scheda.nome || '—'}`,
    `Specie: ${scheda.specie || '—'}`,
    `Classe: ${scheda.classe || '—'}`,
    `Livello: ${scheda.livello || '—'}`,
    `Background: ${scheda.background || '—'}`,
    `Allineamento: ${scheda.allineamento || '—'}`,
    ``,
    `Caratteristiche:`,
    ...Object.entries(scheda.caratteristiche || {}).map(([stat, val]) =>
      `- ${stat}: ${val} (mod: ${scheda.modificatori?.[stat] ?? 0})`),
    ``,
    `Abilità: ${Array.isArray(scheda.abilitaClasse) ? scheda.abilitaClasse.join(", ") : '—'}`,
    `Tratti Classe:`,
    ...(Array.isArray(scheda.trattiClasse) ? scheda.trattiClasse.map(t => `- ${t}`) : [`—`]),
    ``,
    `Talenti:`,
    ...(Array.isArray(scheda.talenti)
        ? scheda.talenti.map(t => `- ${t.nome}: ${t.descrizione}`)
        : [`—`]),
    ``,
    `PF: ${scheda.hp || '—'} | CA: ${scheda.ca || '—'} | Velocità: ${scheda.velocita || '—'} piedi`,
    ``,
    `Equipaggiamento:`,
    ...(Array.isArray(scheda.equipaggiamento)
        ? scheda.equipaggiamento.map(e => `- ${e}`)
        : [`- ${scheda.equipaggiamento || '—'}`])
  ];

  linee.forEach(linea => {
    if (y > 280) {
      doc.addPage();
      y = 10;
    }
    doc.text(linea, 10, y);
    y += 7;
  });

  doc.save(`${scheda.nome || 'scheda_pg'}.pdf`);
}
