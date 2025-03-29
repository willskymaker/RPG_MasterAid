import { initTiradadi } from './tiradadi.js';
import { initGeneratoreNomi } from './generatoreNomi.js';
import { initGeneratoreSpecie } from './generatoreSpecie.js';
import { initGeneratoreClassi } from './generatoreClassi.js';
import { initGeneratoreAllineamento } from './generatoreAllineamento.js';


document.addEventListener('DOMContentLoaded', () => {
  initTiradadi();
  initGeneratoreNomi();
  initGeneratoreSpecie();
  initGeneratoreClassi();
  initGeneratoreAllineamento();
});
