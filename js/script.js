document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  // === Функция переключения описания продукта ===
  window.toggleDescription = function (id) {
    const el = document.getElementById(id);
    if (el.classList.contains('hidden')) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  };

  // === Показываем нужную секцию ===
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

  // === Определяем активную секцию при прокрутке ===
  function activateSectionOnScroll() {
    let currentSection = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const top = rect.top;
      const bottom = rect.bottom;

      if (top <= 100 && bottom >= 100) {
        currentSection = section.id;
      }
    });

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

      history.pushState(null, null, targetId);
      showSection(targetId);
    });
  });

  // === Инициализация при загрузке ===
  function onInit() {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      showSection(window.location.hash);
    } else {
      showSection("#about");
    }
  }

  // Запускаем
  onInit();
  window.addEventListener("scroll", activateSectionOnScroll);
  window.addEventListener("load", activateSectionOnScroll);
});