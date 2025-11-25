import { toggleTheme } from "../../../hooks/utilsTheme.js"
import { toggleLang } from "../../../hooks/utilsLang.js"
import fetchJsonFile from "../../../util/fetchJsonFile.js";
import { buildConfigMenu } from "./buildConfigMenu.js";

function toggleConfigs(config, value) {
  if (config === "theme") {
      toggleTheme(value, "userSelect");
  } else if (config === "lang") {
      toggleLang(value, "userSelect");
  } else return;
}

function updateCurrentIcons(name, selectedValue, iconList) {
    if (name === "lang" && selectedValue === "device") {
    const browserLang = navigator.language || navigator.userLanguage || "en-US";

    if (browserLang.startsWith("pt")) selectedValue = "pt-BR";
    else if (browserLang.startsWith("fr")) selectedValue = "fr-FR";
    else selectedValue = "en-US";
  }

  // Selecionar ícones normalmente
  iconList.forEach(icon => {
    const iconValue = icon.getAttribute("data-current-icon");

    if (iconValue === selectedValue) {
      icon.classList.remove("noSelected");
      icon.classList.add("selected");
    } else {
      icon.classList.remove("selected");
      icon.classList.add("noSelected");
    }
  });
}

async function initConfigBtnClicks(name) {
  const allButtons = document.querySelectorAll(`.i-select-${name}`);
  const allCurrentIcons = document.querySelectorAll(`.icon-current-${name}`);

  const ls = localStorage.getItem(`user-${name}`);

  function applyInitialSelection() {
    const initialValue = ls || "device";

    allButtons.forEach(btn => {
      const value = btn.getAttribute(`data-${name}-value`);

      if (value === initialValue) {
        btn.setAttribute("data-select", "true");
      } else {
        btn.setAttribute("data-select", "false");
      }
    });

    updateCurrentIcons(name, initialValue, allCurrentIcons);
  }

  allButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedValue = btn.getAttribute(`data-${name}-value`);

      allButtons.forEach(b => b.setAttribute("data-select", "false"));
      btn.setAttribute("data-select", "true");

      updateCurrentIcons(name, selectedValue, allCurrentIcons);

      toggleConfigs(name, selectedValue);
    });
  });

  applyInitialSelection();
}

async function initConfigPopovers(name) {
  const btn = document.getElementById(`btn-config-popover-${name}`);
  const popover = document.getElementById(`config-popover-${name}`);

  if (!btn || !popover) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // impede de fechar automaticamente

    const isOpen = btn.getAttribute("data-popover") === "true";

    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  });

  //  Impede fechamento ao clicar dentro do popover
  popover.addEventListener("click", e => {
    e.stopPropagation();
  });

  // Fecha ao clicar fora
  document.addEventListener("click", () => {
    closePopover();
  });

  function openPopover() {
    document.querySelectorAll(".btn-config-all[data-popover='true']").forEach(openBtn => {
      if (openBtn !== btn) {
        const id = openBtn.id.replace("btn-config-popover-", "");
        const otherPopover = document.getElementById(`config-popover-${id}`);

        openBtn.setAttribute("data-popover", "false");
        otherPopover.classList.remove("show");
      }
    });

    // Abre o popover atual
    btn.setAttribute("data-popover", "true");
    popover.classList.add("show");
  }

  function closePopover() {
    btn.setAttribute("data-popover", "false");
    popover.classList.remove("show");
  }

  closePopover()

}

const AVAILABLE_CONFIGS = ["theme", "lang"]
const ID_CONFIG_CONTAINER = "config-menu"

export async function initConfigs() {
  // Load configs
  const configs = await fetchJsonFile("configs");
  if (!configs) throw new Error("configs.json not find");
  // create configs menu
  await buildConfigMenu(AVAILABLE_CONFIGS, configs, `#${ID_CONFIG_CONTAINER}`)
  // apply essencials
  for (const config of AVAILABLE_CONFIGS) {
    await initConfigBtnClicks(config);
    await initConfigPopovers(config);
  }
  console.log("*INFO*: Configs initialized");
}
