import fetchJsonFile from "../util/fetchJsonFile.js";

let AVAILABLE_LANGUAGES
let FALLBACK_LANG

export async function initLang() {
  const configs = await fetchJsonFile("configs");
  const langConfigs = configs && configs.lang ? configs.lang : null;
  if (!langConfigs) throw new Error('configs.lang não encontrado');

  AVAILABLE_LANGUAGES = langConfigs;
  FALLBACK_LANG = "en-US";

  toggleLang("default", "initial");
}

export function toggleLang(lang, type) {
  const html = document.documentElement;
  const LS_KEY = 'user-lang';

  // console.log(`LOG: *func: ToggleLang | LS: ${localStorage.getItem(LS_KEY)}`);

  // Apply the lang
  function applyLang(langToApply) {
    // console.log(`LOG: *func: ApplyLang | LA: ${langToApply}`);
    html.setAttribute('lang', langToApply);
    // console.warn(`DEBUG: Language applied -> ${langToApply}`);
    // console.warn(`DEBUG: LS value -> ${localStorage.getItem(LS_KEY)}`);
    // logica ainda não implantada
    // alert("Idiomas ainda não disponivel\nLanguages not yet available")
  }

  // Detecte browser lang
  function detectSystemLang() {
    const deviceLangRaw = (navigator.languages && navigator.languages[0]) || navigator.language || FALLBACK_LANG;
    const deviceLang = String(deviceLangRaw || "").trim();

    // match exato (pt-BR)
    if (AVAILABLE_LANGUAGES[deviceLang]) return deviceLang;

    // match por prefixo (pt -> pt-BR)
    const primary = deviceLang.split('-')[0];
    const keys = Object.keys(AVAILABLE_LANGUAGES);
    const matched = keys.find(k => k.toLowerCase().startsWith(primary.toLowerCase()));
    if (matched) return matched;

    return FALLBACK_LANG;
  }

  // Choice the lang based on the LS save and the type
  function determineLang() {
    const saved = localStorage.getItem(LS_KEY) || '';

    // If inicial
    // - Search the lang in the options, if has return
    // -- In case not, search the lang system
    // -- If is not save, save in LS device or null
    if (type === 'initial') {
      // console.warn(`DEBUG: Initial lang load | Saved: ${saved}`);
      if (saved && AVAILABLE_LANGUAGES[saved]) {
        return saved;
      }
      const systemLang = detectSystemLang();
      // if (!saved) localStorage.setItem(LS_KEY, 'device');
      if (!['device', ...Object.keys(AVAILABLE_LANGUAGES)].includes(saved)) {
        localStorage.setItem(LS_KEY, 'device');
      }
      return systemLang;
    }

    // If user choice
    // - If user select 'device', set on LS 'device';
    // - Else this, Save immediately on LS;
    if (type === 'userSelect') {
      // console.warn(`DEBUG: User selected lang: ${lang}`);
      if (lang === 'device') {
        localStorage.setItem(LS_KEY, 'device');
        return detectSystemLang();
      }
      localStorage.setItem(LS_KEY, lang);
      return lang;
    }

    // fallback
    // console.warn(`DEBUG: Fallback to system lang`);
    return detectSystemLang(); 
  }

  // Aplly the final lang
  const finalLang = determineLang();
  applyLang(finalLang);

  if (type === 'userSelect') {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.location.reload()
  }
}

// const meta = AVAILABLE_LANGUAGES[finalLang]; // { name, path, flag }
// console.log(meta.path, meta.flag);
