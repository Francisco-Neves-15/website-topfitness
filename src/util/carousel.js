const carousel = document.getElementById("carouselSlides");

export async function initCarousel() {
  if (!carousel) return console.warn("Carousel not found.");

  // Normaliza classes (caso tenha algo vindo de configs)
  carousel.className = "carousel-slides";

  const carouselContainer = carousel.parentElement;
  if (carouselContainer) carouselContainer.className = "carousel";

  const dots = document.querySelectorAll(".carousel-dot");

  dots.forEach(dot => dot.className = "carousel-dot");

  let index = 0;
  const totalSlides = carousel.children.length;

  function updateCarousel() {
    // CORREÇÃO IMPORTANTE → translateX precisa de string e template literal certo
    carousel.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  // Botão Anterior
  const prevBtn = document.getElementById("prevBtn");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });
  }

  // Botão Próximo
  const nextBtn = document.getElementById("nextBtn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % totalSlides;
      updateCarousel();
    });
  }

  // Navegação pelos dots
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      updateCarousel();
    });
  });

  // Auto-slide
  setInterval(() => {
    index = (index + 1) % totalSlides;
    updateCarousel();
  }, 4000);

  updateCarousel();
}