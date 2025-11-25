// Imports de Scripts sempre usados
import { initMedia } from "../hooks/media.js";
import { loadHeader } from "./essentials.js";
// import { toggleLang } from "./miscellaneous.js";

// Utils Functions
import { initTheme, toggleTheme } from "../hooks/utilsTheme.js";
import { initLang, toggleLang } from "../hooks/utilsLang.js";

// Import de Scripts de Componentes
import { initHeader } from "../components/header/header.js";
import { initConfigs } from "../components/header/config-menu/site-configs.js";

document.addEventListener("DOMContentLoaded", async () => {
  
  // Inicializações
  initMedia();
  await initTheme();
  await initLang();

  (async () => {
    try {
      await loadHeader(); 
      await initHeader();
      await initConfigs();
    } catch (error) {
      console.error("Erro ao inicializar:", error);
    }
  })();

  // === OBSERVADORES DO SISTEMA ===

  // Tema automático: detecta mudança de prefers-color-scheme em tempo real
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', e => {
    const LS = localStorage.getItem('user-theme');
    // console.warn(`DEBUG: System theme changed! New system theme = ${e.matches ? 'dark' : 'light'}`);
    if (LS === 'device') {
      toggleTheme('device', 'initial');
    }
  });

  // Idioma automático: detecta mudança do idioma (simulado por DevTools)
  // (Não é detectável em todos os navegadores, mas útil para debug e simulação)
  window.addEventListener('languagechange', () => {
    const LS = localStorage.getItem('user-lang');
    // console.warn(`DEBUG: System language changed!`);
    if (LS === 'device') {
      toggleLang('device', 'initial');
    }
  });

});
