/**
 * buildConfigMenu(configs, containerSelector = ".config-menu")
 * - Gera dinamicamente os <li> do menu de configs a partir do objeto configs.
 * - Mantém IDs, classes e atributos exatamente no padrão do HTML estático.
 */
export async function buildConfigMenu(availableConfigs, configs, containerSelector) {
  if (!configs || typeof configs !== "object") {
    throw new Error("buildConfigMenu: configs inválido");
  }

  const container = document.querySelector(containerSelector);
  if (!container) {
    throw new Error(`buildConfigMenu: container ${containerSelector} não encontrado`);
  }

  // Funções auxiliares
  const readLS = (name) => localStorage.getItem(`user-${name}`);

  function resolveSystemLang(availableLangs, fallback = "en-US") {
    const raw = (navigator.languages && navigator.languages[0]) || navigator.language || fallback;
    const rawS = String(raw || "").trim();
    if (availableLangs[rawS]) return rawS;
    const primary = rawS.split("-")[0];
    const keys = Object.keys(availableLangs);
    const matched = keys.find(k => k.toLowerCase().startsWith(primary.toLowerCase()));
    return matched || fallback;
  }

  function resolveSystemTheme(availableThemes, fallback = "light") {
    const detected = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (availableThemes[detected]) return detected;
    // fallback para a primeira chave disponível
    const keys = Object.keys(availableThemes);
    return keys.length ? keys[0] : fallback;
  }

  // Gera botão "device" para um dado config name (theme | lang)
  function createDeviceButton(name) {
    const btn = document.createElement("button");
    btn.className = `i-select-${name} btn-ghost btn-select-config navbar-config-icon`;
    btn.setAttribute(`data-${name}-value`, "device");
    btn.setAttribute("data-select", "false");

    btn.innerHTML = `
      <div class="config-box-check-area"><i class="bi bi-check2"></i></div>
      <span>Detectar</span>
      ${name === "theme" ? `<i class="bi bi-circle-half"></i>` : `<i class="bi bi-search"></i>`}
    `;
    return btn;
  }

  // Create option button for theme (icon) or lang (flag img)
  function createOptionButton(name, key, meta) {
    const btn = document.createElement("button");
    btn.className = `i-select-${name} btn-ghost btn-select-config navbar-config-icon`;
    btn.setAttribute(`data-${name}-value`, key);
    btn.setAttribute("data-select", "false");

    const checkArea = `<div class="config-box-check-area"><i class="bi bi-check2"></i></div>`;

    if (name === "theme") {
      // meta.icon expected: "bi bi-brightness-high-fill"
      const iconHtml = `<i class="${meta.icon || ""}"></i>`;
      btn.innerHTML = `${checkArea}<span>${meta.name || key}</span>${iconHtml}`;
    } else {
      // lang -> show flag image
      const flagSrc = meta.flag || "";
      const imgHtml = `<img style="max-height: 64px;" src="${flagSrc}" alt="flag: ${key}">`;
      btn.innerHTML = `${checkArea}<span>${meta.name || key}</span>${imgHtml}`;
    }

    return btn;
  }

  // Create current-icon area (the small icons shown on the popover trigger)
  function createCurrentIconsDiv(name, entries, resolvedCurrentValue) {
    const wrapper = document.createElement("div");
    // same classes as your original HTML
    wrapper.className = `navbar-config-icon config-icon-current ${name}`;

    // For theme: create <i data-current-icon="light"...> and a device icon
    if (name === "theme") {
      // create icons for each theme key (entries is object)
      Object.keys(entries).forEach(k => {
        const i = document.createElement("i");
        i.setAttribute("data-current-icon", k);
        i.classList.add("icon-current-theme");
        // use the configured icon class if exists
        const iconClass = entries[k].icon || "";
        iconClass.split(" ").forEach(c => { if (c) i.classList.add(c); });

        // classes selected/noSelected according to resolvedCurrentValue
        if (k === resolvedCurrentValue) i.classList.add("selected");
        else i.classList.add("noSelected");

        wrapper.appendChild(i);
      });

      // device icon always present (but UI logic can ignore for lang)
      const deviceI = document.createElement("i");
      deviceI.setAttribute("data-current-icon", "device");
      deviceI.className = "bi bi-circle-half icon-current-theme";
      if (resolvedCurrentValue === "device") deviceI.classList.add("selected");
      else deviceI.classList.add("selected"); // default design in your HTML had device selected visually
      wrapper.appendChild(deviceI);
    } else {
      // For lang: create <img data-current-icon="pt-BR"...>
      Object.keys(entries).forEach(k => {
        const img = document.createElement("img");
        img.setAttribute("data-current-icon", k);
        img.classList.add("icon-current-lang");
        img.style.maxHeight = "64px";
        img.src = entries[k].flag || "";
        img.alt = `flag: ${k}`;

        if (k === resolvedCurrentValue) img.classList.add("selected");
        else img.classList.add("noSelected");

        wrapper.appendChild(img);
      });
      // note: we deliberately do NOT add a "device" icon here (you said lang never shows a search icon)
    }

    return wrapper;
  }

  // Build all <li> entries from configs keys in the same order as object keys
  container.innerHTML = ""; // clear existing static markup (if any)

  const keys = Object.keys(configs);
  for (const name of keys) {

    // !!! Pula quando não está na lista
    if (!availableConfigs.includes(name)) continue;

    const meta = configs[name];
    // create li
    const li = document.createElement("li");
    li.id = `config-menu-i-${name}`;
    li.className = "config-menu-i";

    // button trigger
    const btn = document.createElement("button");
    btn.className = "btn-ghost btn-config-all";
    btn.id = `btn-config-popover-${name}`;
    btn.setAttribute("data-popover", "false");

    // label
    const spanLabel = document.createElement("span");
    spanLabel.textContent = (name === "lang") ? "Idioma" : (name === "theme" ? "Tema" : name);
    btn.appendChild(spanLabel);

    // determine initial LS + resolved current value
    const saved = readLS(name); // may be null
    let resolvedCurrentValue;

    if (name === "lang") {
      // saved can be 'device' or a language key
      if (saved && saved !== "device" && meta[saved]) {
        resolvedCurrentValue = saved;
      } else if (saved === "device") {
        resolvedCurrentValue = resolveSystemLang(meta);
      } else {
        // no saved -> treat as device mode and resolve
        resolvedCurrentValue = resolveSystemLang(meta);
      }
    } else if (name === "theme") {
      if (saved && saved !== "device" && meta[saved]) {
        resolvedCurrentValue = saved;
      } else if (saved === "device") {
        resolvedCurrentValue = resolveSystemTheme(meta);
      } else {
        // no saved -> device by default, resolve
        resolvedCurrentValue = resolveSystemTheme(meta);
      }
    } else {
      // generic fallback: try saved, else first key
      if (saved && meta[saved]) resolvedCurrentValue = saved;
      else resolvedCurrentValue = Object.keys(meta)[0];
    }

    // current icons area
    const currentIcons = createCurrentIconsDiv(name, meta, resolvedCurrentValue);
    btn.appendChild(currentIcons);

    // popover content
    const popover = document.createElement("div");
    popover.id = `config-popover-${name}`;
    popover.className = `config-box ${name}`;

    const ul = document.createElement("ul");
    ul.className = "list-select-config";
    ul.id = `list-select-${name}`;

    // device button (always include)
    const deviceBtn = createDeviceButton(name);
    // set device button selected state depending on LS
    if (!readLS(name) || readLS(name) === "device") deviceBtn.setAttribute("data-select", "true");
    ul.appendChild(deviceBtn);

    // add each option button
    Object.keys(meta).forEach(k => {
      const optionBtn = createOptionButton(name, k, meta[k]);

      // set data-select true if saved equals this key
      if (readLS(name) === k) optionBtn.setAttribute("data-select", "true");
      // if nothing saved and we resolved to this key via device, mark false (device is selected)
      // we keep device selected when saved is 'device' or not set

      ul.appendChild(optionBtn);
    });

    popover.appendChild(ul);

    // append button and popover to li
    li.appendChild(btn);
    li.appendChild(popover);

    // append li to container
    container.appendChild(li);
  }
}
