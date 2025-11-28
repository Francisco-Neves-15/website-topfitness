import csAlert from "./csAlert.js";

export default function copyToClipboard(text) {
  // Tentativa usando a API moderna
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => {
        csAlert({ msg: "Copiado para a área de transferência!", time: 3000, type: "success" });
      })
      .catch(err => {
        console.error("Erro ao copiar:", err);
        csAlert({ msg: "Falha ao copiar", time: 3000, type: "error" });
      });
  } else {
    // Fallback para navegadores antigos
    try {
      const temp = document.createElement("textarea");
      temp.value = text;
      temp.style.position = "fixed";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);

      csAlert({ msg: "Copiado para a área de transferência!", time: 3000, type: "success" });
    } catch (err) {
      console.error("Erro ao copiar (fallback):", err);
      csAlert({ msg: "Falha ao copiar", time: 3000, type: "error" });
    }
  }
}
