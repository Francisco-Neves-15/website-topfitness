const AVAILABLE_THEMES = ["light", "dark", "solarized", "dracula"];
const FALLBACK_THEME = "light";

export function toggleTheme(theme, type) {
  const html = document.documentElement;
  const LS_KEY = 'user-theme';

  // let linkTheme = document.getElementById('link-theme');

  // // Se o link não existe, cria um
  // if (!linkTheme) {
  //   linkTheme = document.createElement('link');
  //   linkTheme.id = 'link-theme';
  //   linkTheme.rel = 'stylesheet';
  //   linkTheme.type = 'text/css';
  //   document.head.appendChild(linkTheme);
  // }

  console.log(`LOG: *func: ToggleTheme | LS: ${localStorage.getItem(LS_KEY)}`);

  // Apply the theme
  function applyTheme(themeToApply) {
    console.log(`LOG: *func: ApplyTheme | TH: ${themeToApply}`);
    html.setAttribute('data-theme', themeToApply);
    console.warn(`DEBUG: Theme applied -> ${themeToApply}`);
    console.warn(`DEBUG: LS value -> ${localStorage.getItem(LS_KEY)}`);
    // linkTheme.href = `./src/styles/theme/theme-${themeToApply}.css`;
  }

  // Detecte browser theme
  function detectSystemTheme() {
    const detected = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    console.warn(`DEBUG: *func: DetectSystemTheme | Detected system theme: ${detected}`);
    return detected;
  }

  // Choice the theme based on the LS save and the type
  function determineTheme() {
    const saved = localStorage.getItem(LS_KEY);

    // If inicial
    // - Search the theme in the options, if has return
    // -- In case not, search the theme system
    // -- If is not save, save in LS device or null
    if (type === 'initial') {
      console.warn(`DEBUG: Initial theme load | Saved: ${saved}`);
      if (AVAILABLE_THEMES.includes(saved)) return saved;
      const systemTheme = detectSystemTheme();
      if (saved !== 'device') localStorage.setItem(LS_KEY, 'device');
      return systemTheme;
    }

    // If user choice
    // - If user select 'device', set on LS 'device';
    // - Else this, Save immediately on LS;
    if (type === 'userSelect') {
      console.warn(`DEBUG: User selected theme: ${theme}`);
      if (theme === 'device') {
        localStorage.setItem(LS_KEY, 'device');
        return detectSystemTheme();
      }
      if (AVAILABLE_THEMES.includes(theme)) {
        localStorage.setItem(LS_KEY, theme);
        return theme;
      }
      console.warn(`WARN: *func: DetermineTheme | Theme "${theme}" not available. Using fallback.`);
      return FALLBACK_THEME;
    }

    // fallback
    console.warn(`DEBUG: Fallback to system theme`);
    return detectSystemTheme();
  }

  // Aplly the final theme
  const finalTheme = determineTheme();
  applyTheme(finalTheme);
}
