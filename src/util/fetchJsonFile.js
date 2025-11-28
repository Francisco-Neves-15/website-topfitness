const knownJsonFiles = {
  configs: "./src/data/configs.json",
};

export default async function fetchJsonFile(keyOrPath) {
  try {
    let finalPath = keyOrPath;

    // Se NÃO terminar com .json, assume que é uma chave de knownJsonFiles
    if (!keyOrPath.endsWith(".json")) {
      if (knownJsonFiles[keyOrPath]) {
        finalPath = knownJsonFiles[keyOrPath];
      } else {
        throw new Error(
          `Chave '${keyOrPath}' não encontrada em knownJsonFiles e não é um arquivo .json`
        );
      }
    }

    const res = await fetch(finalPath);

    if (!res.ok) {
      throw new Error(`Erro ao carregar JSON: ${res.status} ${res.statusText}`);
    }

    return await res.json();

  } catch (err) {
    console.error("[fetchJsonFile] Erro:", err);
    return null;
  }
}

// const configs = await fetchJsonFile("configs");
// const coisas = await fetchJsonFile("../teste/naoCadastrado.json");
