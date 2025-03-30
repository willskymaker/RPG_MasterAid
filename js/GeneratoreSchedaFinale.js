// Inizializza jsPDF dalla libreria UMD se disponibile
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

    const statHtml = Object.entries(caratteristiche).map(
      ([stat, val]) => `<li>${stat}: <strong>${val}</strong> (mod: ${modificatori[stat] ?? 0})</li>`
    ).join('');
    container.appendChild(creaSezione("📊 Caratteristiche", `<ul>${statHtml}</ul>`));

    container.appendChild(creaSezione("🧠 Abilità", abilita.length ? abilita.join(", ") : "—"));

    const trattiHtml = tratti.map(t => `<li>${t}</li>`).join('');
    if (trattiHtml) container.appendChild(creaSezione("💡 Tratti della Classe", `<ul>${trattiHtml}</ul>`));

    const talentiHtml = talenti.map(t => `<li><strong>${t.nome}</strong>: ${t.descrizione}</li>`).join('');
    if (talentiHtml) container.appendChild(creaSezione("✨ Talenti", `<ul>${talentiHtml}</ul>`));

    container.appendChild(creaSezione("❤️ PF", pf));
    container.appendChild(creaSezione("🛡️ CA", ca));
    container.appendChild(creaSezione("🏃 Velocità", velocita + " piedi"));

    const equipHtml = equip.length ? equip.map(e => `<li>${e}</li>`).join('') : "—";
    container.appendChild(creaSezione("🎒 Equipaggiamento", `<ul>${equipHtml}</ul>`));

    // Pulsante Esporta PDF
    if (jsPDF) {
      const btnPDF = document.createElement('button');
      btnPDF.textContent = "📄 Esporta PDF";
      btnPDF.style.marginTop = '20px';
      btnPDF.addEventListener('click', () => esportaPDF(scheda));
      container.appendChild(btnPDF);
    } else {
      const warning = document.createElement('p');
      warning.textContent = "⚠️ PDF non disponibile. Libreria jsPDF non caricata.";
      warning.style.color = 'red';
      container.appendChild(warning);
    }
  }

  function esportaPDF(scheda) {
    const doc = new jsPDF();
    let y = 10;

    const addLine = (text, spacing = 7) => {
      doc.text(text, 10, y);
      y += spacing;
    };

    addLine("🧾 Scheda del Personaggio");
    addLine(`Nome: ${scheda.nome || "—"}`);
    addLine(`Specie: ${scheda.specie || "—"}`);
    addLine(`Classe: ${scheda.classe || "—"}`);
    addLine(`Livello: ${scheda.livello || "—"}`);
    addLine(`Background: ${scheda.background || "—"}`);
    addLine(`Allineamento: ${scheda.allineamento || "—"}`);
    addLine("");

    addLine("📊 Caratteristiche:");
    const stats = scheda.caratteristiche || {};
    const mods = scheda.modificatori || {};
    Object.entries(stats).forEach(([stat, val]) => {
      addLine(`• ${stat}: ${val} (mod: ${mods[stat] ?? 0})`);
    });

    addLine("");
    addLine("🧠 Abilità: " + (scheda.abilitaClasse?.join(", ") || "—"));
    addLine("");

    if (scheda.trattiClasse?.length) {
      addLine("💡 Tratti:");
      scheda.trattiClasse.forEach(t => addLine(`- ${t}`));
      addLine("");
    }

    if (scheda.talenti?.length) {
      addLine("✨ Talenti:");
      scheda.talenti.forEach(t => addLine(`- ${t.nome}: ${t.descrizione}`, 6));
      addLine("");
    }

    addLine(`❤️ PF: ${scheda.hp || "—"}`);
    addLine(`🛡️ CA: ${scheda.ca || "—"}`);
    addLine(`🏃 Velocità: ${scheda.velocita || "—"} piedi`);

    if (scheda.equipaggiamento?.length) {
      addLine("");
      addLine("🎒 Equipaggiamento:");
      scheda.equipaggiamento.forEach(eq => addLine(`- ${eq}`));
    }

    doc.save("Scheda_Personaggio.pdf");
  }

  // Rende disponibile globalmente
  window.aggiornaSchedaFinale = aggiornaScheda;

  // Inizializzazione immediata
  aggiornaScheda();
}

