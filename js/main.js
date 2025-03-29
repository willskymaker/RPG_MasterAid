import { initTiradadi } from './tiradadi.js';
import { initGeneratoreNomi } from './generatoreNomi.js';
import { initGeneratoreSpecie } from './generatoreSpecie.js';
import { initGeneratoreClasso } from './generatoreClassi.js';
document.addEventListener('DOMContentLoaded', () => {
  initTiradadi();
  initGeneratoreNomi();
  initGeneratoreSpecie();
  initGeneratoreClassi();
});
