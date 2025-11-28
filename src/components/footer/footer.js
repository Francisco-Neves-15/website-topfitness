import copyToClipboard from "../../util/copyToClipboard.js"

export async function setLinksFooter() {
  const btnFooterPhone = document.getElementById("btn-footer-phone")
  btnFooterPhone.addEventListener("click", () => { copyToClipboard('+55 17 99259-5323') })
}