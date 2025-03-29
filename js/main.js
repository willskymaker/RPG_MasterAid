import { initTiradadi } from './tiradadi.js';
import { initGeneratoreNomi } from './generatoreNomi.js';
import { initGeneratoreSpecie } from './generatoreSpecie.js';
import { initGeneratoreClassi } from './generatoreClassi.js';
import { initGeneratoreAllineamento } from './generatoreAllineamento.js';
import { initGeneratoreBackground } from './generatoreBackground.js';
import { initGeneratoreCaratteristiche } from './generatoreCaratteristiche.js';
import { initGeneratoreLivello } from './generatoreLivello.js';
import { initGeneratoreHpCaVelocita } from './generatoreHpCaVelocita.js';

document.addEventListener('DOMContentLoaded', () => {
  initTiradadi();
  initGeneratoreNomi();
  initGeneratoreSpecie();
  initGeneratoreClassi();
  initGeneratoreAllineamento();
  initGeneratoreBackground();
  initGeneratoreCaratteristiche();
  initGeneratoreLivello();
  initGeneratoreHpCaVelocita();
});
