// Imports de Scripts sempre usados
import { initMedia } from "../hooks/media.js";
import { loadHeader, loadFooter } from "./essentials.js";
import { scrollToFunction, detectScroll, configScrollTopBtn } from "../js/miscellaneous.js";
import copyToClipboard from "../util/copyToClipboard.js";

// Utils Functions
import { initTheme, toggleTheme } from "../hooks/utilsTheme.js";
import { initLang, toggleLang } from "../hooks/utilsLang.js";
import { updateMapSize } from './maps-configs.js';
import { initCarousel } from "../util/carousel.js";

// Import de Scripts de Componentes
import { initHeader, setLinksHeader } from "../components/header/header.js";
import { setLinksFooter } from "../components/footer/footer.js";
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
      await setLinksHeader();
      await initConfigs();
      await loadFooter(); 
      await setLinksFooter(); 
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

  // Link

  // Banner
  const linkToSobre = document.getElementById("hero-link-sobre")
  const linkToContato = document.getElementById("hero-link-contato")
  const linkToSocial = document.getElementById("hero-link-social")
  const btnToServicos = document.getElementById("hero-button-servicos")
  linkToSobre.addEventListener("click", () => { scrollToFunction('#secao-sobre') })
  linkToContato.addEventListener("click", () => { scrollToFunction('#secao-social') })
  linkToSocial.addEventListener("click", () => { scrollToFunction('#secao-horarios') })
  btnToServicos.addEventListener("click", () => { scrollToFunction('#secao-servicos') })
  
  const btnSocialPhone = document.getElementById("btn-social-phone")
  btnSocialPhone.addEventListener("click", () => { copyToClipboard('+55 17 99259-5323') })
});
