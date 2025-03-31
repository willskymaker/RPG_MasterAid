// js/generatoreSchedaFinale.js

const { jsPDF } = window.jspdf || {};

export function initGeneratoreSchedaFinale() {
  const container = document.getElementById('scheda-personaggio-output');
  if (!container) {
    console.warn("⚠️ Contenitore per la scheda non trovato.");
    return;
  }

  function creaSezione(titolo, contenutoHtml) {
    const sezione = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.textContent = titolo;
    sezione.appendChild(h3);

    const contenuto = document.createElement('div');
    contenuto.innerHTML = contenutoHtml;
    sezione.appendChild(contenuto);

    return sezione;
  }

  function aggiornaScheda() {
    const scheda = window.schedaPersonaggio || {};
    container.innerHTML = '';

    const nome = scheda.nome || '—';
    const livello = scheda.livello || '—';
    const specie = scheda.specie || '—';
    const classe = scheda.classe || '—';
    const background = scheda.background || '—';
    const allineamento = scheda.allineamento || '—';

    const caratteristiche = scheda.caratteristiche || {};
    const modificatori = scheda.modificatori || {};
    const abilita = scheda.abilitaClasse || [];
    const tratti = scheda.trattiClasse || [];
    const talenti = scheda.talenti || [];
    const pf = scheda.hp || '—';
    const ca = scheda.ca || '—';
    const velocita = scheda.velocita || '—';
    const equip = scheda.equipaggiamento || [];

    container.appendChild(creaSezione("📛 Nome", nome));
    container.appendChild(creaSezione("🧬 Specie", specie));
    container.appendChild(creaSezione("⚔️ Classe", classe));
    container.appendChild(creaSezione("🎚️ Livello", livello));
    container.appendChild(creaSezione("🎭 Background", background));
    container.appendChild(creaSezione("⚖️ Allineamento", allineamento));

    if (Object.keys(caratteristiche).length > 0) {
      const statHtml = Object.entries(caratteristiche).map(
        ([stat, val]) => `<li>${stat}: <strong>${val}</strong> (mod: ${modificatori[stat] ?? 0})</li>`
      ).join('');
      container.appendChild(creaSezione("📊 Caratteristiche", `<ul>${statHtml}</ul>`));
    }

    container.appendChild(creaSezione("🧠 Abilità", abilita.length ? abilita.join(", ") : "—"));

    const trattiHtml = tratti.map(t => `<li>${t}</li>`).join('');
    if (trattiHtml) container.appendChild(creaSezione("💡 Tratti della Classe", `<ul>${trattiHtml}</ul>`));

    const talentiHtml = talenti.map(t => `<li><strong>${t.nome}</strong>: ${t.descrizione}</li>`).join('');
    if (talentiHtml) container.appendChild(creaSezione("✨ Talenti", `<ul>${talentiHtml}</ul>`));

    container.appendChild(creaSezione("❤️ Punti Ferita", pf));
    container.appendChild(creaSezione("🛡️ Classe Armatura", ca));
    container.appendChild(creaSezione("🏃 Velocità", velocita ? velocita + " piedi" : "—"));

    const equipHtml = equip.length ? equip.map(e => `<li>${e}</li>`).join('') : "—";
    container.appendChild(creaSezione("🎒 Equipaggiamento", `<ul>${equipHtml}</ul>`));

    // Pulsante per esportare in PDF
    const btnExport = document.createElement('button');
    btnExport.textContent = "📄 Esporta in PDF";
    btnExport.addEventListener('click', () => esportaPDF(scheda));
    container.appendChild(btnExport);
  }

  function esportaPDF(scheda) {
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
      ` `,
      `Caratteristiche:`,
      ...Object.entries(scheda.caratteristiche || {}).map(([stat, val]) =>
        `- ${stat}: ${val} (mod: ${scheda.modificatori?.[stat] ?? 0})`),
      ` `,
      `Abilità: ${scheda.abilitaClasse?.join(", ") || '—'}`,
      `Tratti Classe:`,
      ...(scheda.trattiClasse || []).map(t => `- ${t}`),
      ` `,
      `Talenti:`,
      ...(scheda.talenti || []).map(t => `- ${t.nome}: ${t.descrizione}`),
      ` `,
      `PF: ${scheda.hp || '—'} | CA: ${scheda.ca || '—'} | Velocità: ${scheda.velocita || '—'} piedi`,
      ` `,
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

  window.aggiornaSchedaFinale = aggiornaScheda;
  aggiornaScheda();
}

