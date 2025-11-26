// Load Header
export async function loadHeader() {
  const response = await fetch('./src/components/header/header.html');
  const html = await response.text();

  const container = document.querySelector('#header');
  container.innerHTML = html;

  const template = container.querySelector('#header-template');
  const clone = document.importNode(template.content, true);

  container.innerHTML = '';
  container.appendChild(clone);
}

// Load Footer
export async function loadFooter() {
  const response = await fetch('./src/components/footer/footer.html');
  const html = await response.text();

  const container = document.querySelector('#footer');
  container.innerHTML = html;

  const template = container.querySelector('#footer-template');
  const clone = document.importNode(template.content, true);

  container.innerHTML = '';
  container.appendChild(clone);
}
