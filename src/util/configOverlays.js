
export function toggleOverlay(doWhat = "show" | "hide" | "initial", elOverlay, {docUse = false}) {
  const bodyEl = document.body;

  if (doWhat === "initial") {
    elOverlay.classList.remove("show");
    bodyEl.classList.remove("noScroll");
    return;
  }

  if (doWhat === "show") {
    elOverlay.classList.add("show")
    if (docUse) {
      bodyEl.classList.add("noScroll")
    }
  } else {
    elOverlay.classList.remove("show")
    if (docUse) {
      bodyEl.classList.remove("noScroll")
    }
  }
}
