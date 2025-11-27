// Dicionário de proporções
const MAP_SIZES_PROPOR = {
  small: "1/1",
  medium: "5/3",
  large: "5/3",
};

// Lê os breakpoints definidos no :root
export function getBreakpoints() {
  const styles = getComputedStyle(document.documentElement);
  return {
    small: parseInt(styles.getPropertyValue("--breakpoint-small")),
    medium: parseInt(styles.getPropertyValue("--breakpoint-medium")),
    large: parseInt(styles.getPropertyValue("--breakpoint-large"))
  };
}

// Função para atualizar as dimensões do iframe
export function updateMapSize() {
  const iframe = document.getElementById("map-social-topfitness");
  if (!iframe) return;

  const breakpoints = getBreakpoints();
  const screenWidth = window.innerWidth;

  let proporcao;
  let width;

  // SMALL
  if (screenWidth < breakpoints.small) {
    proporcao = MAP_SIZES_PROPOR.small;

    width = screenWidth * 0.8;
    width = Math.min(width, 320);
  }

  // MEDIUM
  else if (screenWidth < breakpoints.medium) {
    proporcao = MAP_SIZES_PROPOR.medium;

    width = screenWidth * 0.9;
    width = Math.max(width, 500);
    width = Math.min(width, 600);
  }

  // LARGE — acima de breakpoint-large
  else {
    proporcao = MAP_SIZES_PROPOR.large;

    width = 600;
  }

  // Converte proporção "5/3" → [5,3]
  const [wRatio, hRatio] = proporcao.split("/").map(Number);

  // Calcula altura proporcional
  const height = Math.round((width * hRatio) / wRatio);

  // iframe.style.width = width + "px";
  // iframe.style.height = height + "px";
  iframe.setAttribute("width", width)
  iframe.setAttribute("height", height)
}
