// Imports de Scripts sempre usados
import './essentials.js';
import '../hooks/media.js';

// Import de Scripts de Componentes
import '../components/header/header.js';

// Utils Functions
import { toggleTheme } from "../hooks/utilsTheme.js";
import { toggleLang } from "../hooks/utilsLang.js";
import { updateMapSize } from './maps-configs.js';

document.addEventListener("DOMContentLoaded", () => {
  // Header
  // toggleHeader("initial");

  // Inicializações
  toggleTheme("default", "initial");
  toggleLang("default", "initial");

  // === OBSERVADORES DO SISTEMA ===

  // Tema automático: detecta mudança de prefers-color-scheme em tempo real
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', e => {
    const LS = localStorage.getItem('user-theme');
    console.warn(`DEBUG: System theme changed! New system theme = ${e.matches ? 'dark' : 'light'}`);
    if (LS === 'device') {
      toggleTheme('device', 'initial');
    }
  });

  // Idioma automático: detecta mudança do idioma (simulado por DevTools)
  // (Nem todos os navegadores dão suporte)
  window.addEventListener('languagechange', () => {
    const LS = localStorage.getItem('user-lang');
    console.warn(`DEBUG: System language changed!`);
    if (LS === 'device') {
      toggleLang('device', 'initial');
    }
  });

  updateMapSize()
  // Atualiza ao redimnsionar a janela
  window.addEventListener("resize", updateMapSize);

});
