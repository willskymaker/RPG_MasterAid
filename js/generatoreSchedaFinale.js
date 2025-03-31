
// js/generatoreSchedaFinale.js

const { jsPDF } = window.jspdf || {};

export function initGeneratoreSchedaFinale() {
  const container = document.getElementById('scheda-personaggio-output');
  if (container) container.innerHTML = ''; // Rimuove ogni contenuto in pagina

  window.aggiornaSchedaFinale = () => {}; // Funzione vuota per evitare errori
}

// ✅ Funzione corretta per esportare il PDF della scheda
export function esportaPDF(scheda) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("Errore: jsPDF non disponibile.");
    return;
  }

  const doc = new window.jspdf.jsPDF();
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
    `Abilità: ${scheda.abilitaClasse?.join(", ") || '—'}`,
    `Tratti Classe:`,
    ...(scheda.trattiClasse || []).map(t => `- ${t}`),
    ``,
    `Talenti:`,
    ...(scheda.talenti || []).map(t => `- ${t.nome}: ${t.descrizione}`),
    ``,
    `PF: ${scheda.hp || '—'} | CA: ${scheda.ca || '—'} | Velocità: ${scheda.velocita || '—'} piedi`,
    ``,
    `Equipaggiamento:`,
    ...(scheda.equipaggiamento || []).map(e => `- ${e}`)
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
