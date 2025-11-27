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

  const themeSelect = document.getElementById('select-theme');
  const langSelect = document.getElementById('select-lang');

  // Ajusta selects conforme valor atual
  themeSelect.value = localStorage.getItem('user-theme') || 'device';
  langSelect.value = localStorage.getItem('user-lang') || 'device';

  // Listeners de selects manuais
  themeSelect.addEventListener('change', e => {
    toggleTheme(e.target.value, 'userSelect');
  });

  langSelect.addEventListener('change', e => {
    toggleLang(e.target.value, 'userSelect');
  });

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
