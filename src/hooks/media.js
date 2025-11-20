const html = document.documentElement;

// --- helper para ler e normalizar variáveis CSS do :root ---
import readCssNumberVar from "../util/readCssNumberVar.js"

// --- lê os breakpoints definidos no :root ---
const small = readCssNumberVar('--breakpoint-small');
const medium = readCssNumberVar('--breakpoint-medium');
const large = readCssNumberVar('--breakpoint-large');

if (small == null || medium == null || large == null) {
  console.warn('Cant read all the breakpoints in :root. Check if --breakpoint-small/medium/large exist.');
} else {
  const mqDefs = {
    small: `(max-width: ${small - 1}px)`,
    medium: `(min-width: ${small}px) and (max-width: ${large - 1}px)`,
    large: `(min-width: ${large}px)`
  };

  // --- cria MediaQueryList e listeners ---
  const mqls = {};
  const handlers = {};

  function onEnterSmall(matchesEvent) {
    if (matchesEvent.matches) {
      console.log('LOG: *func: Screen Media | Entry in: SMALL');
      // coloque aqui o que precisa fazer ao entrar em small
      html.setAttribute("data-device", "small")
    } else {
      console.log('LOG: *func: Screen Media | Leave from SMALL');
    }
  }

  function onEnterMedium(matchesEvent) {
    if (matchesEvent.matches) {
      console.log('LOG: *func: Screen Media | Entry in: MEDIUM');
      // ações ao entrar em medium
      html.setAttribute("data-device", "medium")
    } else {
      console.log('LOG: *func: Screen Media | Leave from MEDIUM');
    }
  }

  function onEnterLarge(matchesEvent) {
    if (matchesEvent.matches) {
      console.log('LOG: *func: Screen Media | Entry in: LARGE');
      // ações ao entrar em large
      html.setAttribute("data-device", "large")
    } else {
      console.log('LOG: *func: Screen Media | Leave from LARGE');
    }
  }

  // mapear nomes para funções
  handlers.small = onEnterSmall;
  handlers.medium = onEnterMedium;
  handlers.large = onEnterLarge;

  // registra os MQLs
  Object.keys(mqDefs).forEach(key => {
    const mq = mqDefs[key];
    const mql = window.matchMedia(mq);
    mqls[key] = mql;

    // forma moderna:
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handlers[key]);
    } else {
      // fallback legado
      mql.addListener(handlers[key]);
    }

    // chama o handler uma vez para refletir o estado atual
    handlers[key](mql);
  });

  // --- função para limpar os listeners (se precisar) ---
  function cleanup() {
    Object.keys(mqls).forEach(key => {
      const mql = mqls[key];
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', handlers[key]);
      } else {
        mql.removeListener(handlers[key]);
      }
    });
  }

  // expõe cleanup se quiser usar
  window.__breakpointCleanup = cleanup;
}
