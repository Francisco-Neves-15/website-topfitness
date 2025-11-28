const btnScrollToTop = document.getElementById("btn-scrollToTop");
if (!btnScrollToTop) {
  console.warn("! Element #btn-scrollToTop don't find");
}

const SCROLL_SHOW_THRESHOLD = 100;
const OFFSET_SCROLL = 20;

export function detectScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > SCROLL_SHOW_THRESHOLD) {
    btnScrollToTop.classList.add("show");
  } else {
    btnScrollToTop.classList.remove("show");
  }
}

const prefersReducedMotion = window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function smoothOrAutoOptions(options = {}) {
  if (prefersReducedMotion) return { ...options, behavior: "auto" };
  return { ...options, behavior: options.behavior || "smooth" };
}

export function scrollToFunction(destiny) {
  if (destiny === "initial") {
    window.scrollTo(smoothOrAutoOptions({ top: 0, behavior: "auto" }));
    return;
  }
  if (destiny === "top") {
    window.scrollTo(smoothOrAutoOptions({ top: 0, behavior: "smooth" }));
    return;
  }

  const target = document.querySelector(destiny);

  if (!target) {
    alert(`Elemento não encontrado: ${destiny}`);
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - OFFSET_SCROLL;

  window.scrollTo({
    top: top,
    behavior: "smooth"
  });
}

export function configScrollTopBtn(device, layout) {
  if (!btnScrollToTop) return;

  if (device === "small" || device === "medium") {
    btnScrollToTop.classList.add("btn-icon");
  } else if (device === "large") {
    btnScrollToTop.classList.remove("btn-icon");
  }
}

btnScrollToTop?.addEventListener("click", () => {
  scrollToFunction("top");
});
