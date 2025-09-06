document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  // Показываем нужную секцию
  function showSection(targetId) {
    sections.forEach(section => section.classList.remove("active"));
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.classList.add("active");
    }

    navLinks.forEach(link => link.classList.remove("active"));
    const activeLink = document.querySelector(`a[href="${targetId}"]`);
    if (activeLink) activeLink.classList.add("active");
  }

  // Определяем активную секцию при прокрутке
  function activateSectionOnScroll() {
    let currentSection = null;

    // Проходим по всем секциям сверху вниз
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const top = rect.top;
      const bottom = rect.bottom;

      // Считаем, что секция "видна", если её верх в пределах экрана (с поправкой на хедер)
      if (top <= 100 && bottom >= 100) {
        currentSection = section.id;
      }
    });

    // Если нашли активную секцию — обновляем меню
    if (currentSection) {
      navLinks.forEach(link => link.classList.remove("active"));
      const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  }

  // === Клик по навигации ===
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth"
        });
      }

      // Меняем URL и активную секцию
      history.pushState(null, null, targetId);
      showSection(targetId);
    });
  });

  // === Инициализация при загрузке ===
  function onInit() {
    // Если в URL есть якорь — используем его
    if (window.location.hash && document.querySelector(window.location.hash)) {
      showSection(window.location.hash);
    } else {
      // Иначе — по умолчанию "О компании"
      showSection("#about");
    }
  }

  // Запускаем
  onInit();
  window.addEventListener("scroll", activateSectionOnScroll);
  window.addEventListener("load", activateSectionOnScroll);
});