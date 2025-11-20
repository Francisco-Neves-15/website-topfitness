# 🧭 Guia de Estrutura de Paths para GitHub Pages — Projeto `website-top_fitness`

## 📁 Estrutura de pastas

📦website-top_fitness
┣ 📂public
┃ ┣ 📂assets
┃ ┃ ┣ 📂brand
┃ ┃ ┃ ┣ 📜banner.png
┃ ┃ ┃ ┗ 📜logo.png
┃ ┃ ┣ 📂images
┃ ┃ ┣ 📂svg
┃ ┃ ┗ 📂video
┃ ┗ 📂placeholder
┃ ┃ ┗ 📜placeholder.jpg
┣ 📂src
┃ ┣ 📂js
┃ ┣ 📂pages
┃ ┃ ┗ 📜contato.html
┃ ┣ 📂styles
┃ ┃ ┣ 📂Pre-Fabric-Style
┃ ┃ ┃ ┣ 📜borders.css
┃ ┃ ┃ ┣ 📜layout.css
┃ ┃ ┃ ┣ 📜spacing.css
┃ ┃ ┃ ┣ 📜typography.css
┃ ┃ ┃ ┗ 📜utilities.css
┃ ┃ ┣ 📂theme
┃ ┃ ┃ ┗ 📜theme.css
┃ ┃ ┣ 📜global.css
┃ ┃ ┣ 📜main.css
┃ ┃ ┣ 📜_reset.css
┃ ┃ ┗ 📜_stylesheet.css
┃ ┗ 📂util
┗ 📜index.html

---

## 🌐 Contexto do GitHub Pages

O comportamento do GitHub Pages depende **de onde o site é publicado**:

| Tipo de publicação | URL final | Caminho base (base path) |
|--------------------|------------|---------------------------|
| `username.github.io` (site pessoal/organizacional) | `https://username.github.io/` | `/` |
| `username.github.io/repo-name` (site de projeto) | `https://username.github.io/website-top_fitness/` | `/website-top_fitness/` |

🔹 Site ficará disponível em:

```
https://Francisco-Neves-15.github.io/website-top_fitness/
```

---

## ✅ Boas práticas de caminhos (paths)

### 🚫 Errado — caminhos absolutos
Esses caminhos **quebram** no GitHub Pages, pois o `/` inicial aponta para a raiz do domínio:
```html
<img src="/public/assets/brand/logo.png">
<link rel="stylesheet" href="/src/styles/main.css">
```

### ✅ Certo — caminhos relativos
Esses funcionam corretamente em qualquer ambiente:
```html
<img src="./public/assets/brand/logo.png">
<link rel="stylesheet" href="./src/styles/main.css">
```

### ⚙️ Alternativa — usando `<base>`
Dentro do `<head>` do index.html, é possível definir:
```html
<base href="/website-top_fitness/">
```

Com isso, os caminhos passam a funcionar assim:
```html
<img src="public/assets/brand/logo.png">
<link rel="stylesheet" href="src/styles/main.css">
```

⚠️ Observação: ao testar localmente (sem servidor), esses caminhos podem falhar. Prefira live-server ou vite preview para testes locais.

---

## 📌 Caminhos relativos conforme a posição do arquivo

| Local do arquivo | Caminho até CSS (`src/styles/main.css`) | Caminho até imagem (`public/assets/brand/logo.png`) |
|------------------|------------------------------------------|----------------------------------------------------|
| index.html | src/styles/main.css | public/assets/brand/logo.png |
| src/pages/contato.html | ../styles/main.css | ../../public/assets/brand/logo.png |

---

## 🧩 Uso de iframes

Se suas páginas (como contato.html) forem carregadas em iframes, lembre-se:

Cada iframe é um documento independente, então os caminhos relativos são resolvidos a partir da página dentro do iframe, e não do index.html principal.

Exemplo:
```html
<!-- index.html -->
<iframe src="src/pages/contato.html"></iframe>
```

Dentro de `contato.html`:

🚫 **Errado:**
```html
<link rel="stylesheet" href="styles/main.css">
```

✅ **Correto:**
```html
<link rel="stylesheet" href="../styles/main.css">
<img src="../../public/assets/brand/logo.png" alt="Logo">
```

### 💡 Simplificação com `<base>` dentro do iframe
Dentro do `<head>` da página iframe (`contato.html`), adicione:
```html
<base href="/website-top_fitness/">
```

Assim você pode usar:
```html
<link rel="stylesheet" href="src/styles/main.css">
<img src="public/assets/brand/logo.png" alt="Logo">
```

⚠️ Cuidado: esses caminhos com `<base>` dependem do nome exato do repositório (`/website-top_fitness/`).

---

## ⚙️ Para projetos com build (opcional)

### 🧩 Vite
```js
export default defineConfig({
  base: '/website-top_fitness/',
});
```

### ⚛️ React (CRA)
```json
"homepage": "https://username.github.io/website-top_fitness"
```

---

## 🧠 Conclusão

Prefira **caminhos relativos** ou use `<base href>` com o nome do repositório.

Lembre-se que **iframes são independentes** — paths precisam ser ajustados neles.

Teste com um **servidor local** antes de publicar no GitHub Pages.

📄 Arquivo de referência: `github-pages-paths.md`
