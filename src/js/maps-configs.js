// Dicionário de proporções
const MAP_SIZES_PROPOR = {
  small: "1/1",
  medium: "4/3",
  large: "5/3",
};

// Função para atualizar as dimensões do iframe
export function updateMapSize(device, layout) {
  const iframe = document.getElementById("map-social-topfitness");
  if (!iframe) return;

  const screenWidth = window.innerWidth;

  let proporcao;
  let width;

  // LARGE — acima de breakpoint-large
  if (device === "large") {
    proporcao = MAP_SIZES_PROPOR.large;
    width = 600;
  }

  // MEDIUM
  else if (device === "medium") {
    proporcao = MAP_SIZES_PROPOR.medium;

    width = screenWidth * 0.5;
    width = Math.max(width, 500);
    width = Math.min(width, 600);
  }

  // SMALL
  else {
    proporcao = MAP_SIZES_PROPOR.small;

    width = screenWidth * 0.8;
    width = Math.min(width, 320);
  }
  console.log(device)

  // Converte proporção "5/3" → [5,3]
  const [wRatio, hRatio] = proporcao.split("/").map(Number);

  // Calcula altura proporcional
  const height = Math.round((width * hRatio) / wRatio);

  // iframe.style.width = width + "px";
  // iframe.style.height = height + "px";
  iframe.setAttribute("width", width)
  iframe.setAttribute("height", height)
}
