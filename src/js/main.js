// Imports de Scripts sempre usados
import { initMedia } from "../hooks/media.js";
import { loadHeader, loadFooter } from "./essentials.js";
import { scrollToFunction, detectScroll, configScrollTopBtn } from "../js/miscellaneous.js";

// Utils Functions
import { initTheme, toggleTheme } from "../hooks/utilsTheme.js";
import { initLang, toggleLang } from "../hooks/utilsLang.js";
import { updateMapSize } from './maps-configs.js';
import { initCarousel } from "../util/carousel.js";

// Import de Scripts de Componentes
import { initHeader } from "../components/header/header.js";
import { initConfigs } from "../components/header/config-menu/site-configs.js";

document.addEventListener("DOMContentLoaded", async () => {
  
  // Inicializações

  (async () => {
    try {
      await initMedia();
      await initTheme();
      await initLang();
      await loadHeader(); 
      await initHeader();
      await initConfigs();
      await loadFooter(); 
      await initCarousel(); 
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
  // (Nem todos os navegadores dão suporte)
  window.addEventListener('languagechange', () => {
    const LS = localStorage.getItem('user-lang');
    // console.warn(`DEBUG: System language changed!`);
    if (LS === 'device') {
      toggleLang('device', 'initial');
    }
  });

  updateMapSize()
  // Atualiza ao redimnsionar a janela
  window.addEventListener("resize", updateMapSize);
  window.addEventListener("breakpointchange", (event) => {
    const { device, layout } = event.detail;
    updateMapSize(device, layout)
  });
  
  scrollToFunction("initial")
  window.addEventListener("scroll", detectScroll);
  window.addEventListener("breakpointchange", (event) => {
    const { device, layout } = event.detail;
    configScrollTopBtn(device, layout)
  });

});
