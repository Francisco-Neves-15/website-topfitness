import readCssNumberVar from "../util/readCssNumberVar.js";

export async function initMedia() {
  const html = document.documentElement;

  // --- lê os breakpoints no :root ---
  const small = readCssNumberVar('--breakpoint-small');
  const medium = readCssNumberVar('--breakpoint-medium');
  const large = readCssNumberVar('--breakpoint-large');

  // Evento global
  function dispatchBreakpointEvent() {
    const detail = {
      device: html.getAttribute("data-device"),
      layout: html.getAttribute("data-layout")
    };

    const event = new CustomEvent("breakpointchange", { detail });
    window.dispatchEvent(event);
  }

  if (small == null || medium == null || large == null) {
    console.warn('Cant read all the breakpoints in :root. Check if --breakpoint-small/medium/large exist.');
  } else {

    // --- define as media queries ---
    const mqDefs = {
      small:  `(max-width: ${small - 1}px)`,
      medium: `(min-width: ${small}px) and (max-width: ${large - 1}px)`,
      large:  `(min-width: ${large}px)`
    };

    // --- define comportamento por breakpoint ---
    const stateConfig = {
      small:  { device: "small",  layout: "compact"  },
      medium: { device: "medium", layout: "expanded" },
      large:  { device: "large",  layout: "expanded" }
    };

    const mqls = {};
    const handlers = {};

    // função genérica para entrada/saída em cada breakpoint
    function createHandler(name) {
      return function (ev) {
        if (ev.matches) {
          // console.log(`LOG: *Screen Media | Enter: ${name.toUpperCase()}`);

          const cfg = stateConfig[name];
          html.setAttribute("data-device", cfg.device);
          html.setAttribute("data-layout", cfg.layout);
          dispatchBreakpointEvent();

        } else {
          // console.log(`LOG: *Screen Media | Leave: ${name.toUpperCase()}`);
        }
      };
    }

    // registrar MQLs
    Object.keys(mqDefs).forEach(name => {
      const mql = window.matchMedia(mqDefs[name]);
      mqls[name] = mql;

      handlers[name] = createHandler(name);

      if (mql.addEventListener) {
        mql.addEventListener("change", handlers[name]);
      } else {
        mql.addListener(handlers[name]);
      }
    });

    function setHandlersFor() {
      Object.keys(mqls).forEach(name => {
        handlers[name](mqls[name]);
      });
    }

    // acionar inicialmente após o DOM estar pronto
    // Isso garante que os elementos HTML existam e os listeners sejam registrados antes do evento inicial
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setHandlersFor()
      });
    } else {
      // DOM já está pronto, dispara imediatamente
      setTimeout(() => {
        setHandlersFor()
      }, 0);
    }

    // função para remover listeners
    function cleanup() {
      Object.keys(mqls).forEach(name => {
        const mql = mqls[name];
        if (mql.removeEventListener) {
          mql.removeEventListener("change", handlers[name]);
        } else {
          mql.removeListener(handlers[name]);
        }
      });
    }

    window.__breakpointCleanup = cleanup;
  }
}
