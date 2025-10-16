document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  // === Функция переключения описания продукта ===
  window.toggleDescription = function (id) {
    const el = document.getElementById(id);
    if (el && el.classList.contains('hidden')) {
      el.classList.remove('hidden');
    } else if (el) {
      el.classList.add('hidden');
    }
  };

  // === Список якорей, относящихся к секции "Наши работы" ===
  const projectAnchors = new Set(['#zso', '#zapas', '#geofizika', '#modelirovanie', '#vodozabor']);

  // === Определяет, к какой секции относится данный хеш ===
  function getSectionIdFromHash(hash) {
    if (projectAnchors.has(hash)) {
      return '#projects';
    }
    // Для остальных — хеш и есть ID секции
    return hash;
  }

  // === Прокрутка к элементу с учётом смещения ===
  function smoothScrollToElement(element, offset = 70) {
    if (!element) return;
    const topPos = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: topPos,
      behavior: "smooth"
    });
  }

  // === Показываем нужную секцию ===
  function showSection(targetHash) {
    // Определяем, какую секцию активировать
    const sectionId = getSectionIdFromHash(targetHash);
    const targetSection = document.querySelector(sectionId);

    // Снимаем active со всех секций и навигации
    sections.forEach(section => section.classList.remove("active"));
    navLinks.forEach(link => link.classList.remove("active"));

    // Активируем целевую секцию
    if (targetSection) {
      targetSection.classList.add("active");
    }

    // Активируем пункт меню, соответствующий секции
    const activeNavLink = document.querySelector(`a[href="${sectionId}"]`);
    if (activeNavLink) {
      activeNavLink.classList.add("active");
    }

    // Прокручиваем к конкретному якорю (если он существует)
    const anchorElement = document.querySelector(targetHash);
    if (anchorElement && projectAnchors.has(targetHash)) {
      smoothScrollToElement(anchorElement, 70);
    }
  }

  // === Определяем активную секцию при прокрутке ===
  function activateSectionOnScroll() {
    let currentSection = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const top = rect.top;
      const bottom = rect.bottom;

      // Считаем секцию активной, если она занимает верхнюю часть экрана
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
      const targetHash = this.getAttribute("href"); // например: "#zso" или "#services"

      // Обновляем URL
      history.pushState(null, null, targetHash);

      // Показываем нужную секцию
      showSection(targetHash);
    });
  });

  // === Обработка нажатия "Назад" в браузере ===
  window.addEventListener("popstate", function () {
    const hash = window.location.hash || "#about";
    showSection(hash);
  });

  // === Инициализация при загрузке ===
  function onInit() {
    const initialHash = window.location.hash || "#about";
    showSection(initialHash);
  }

  // Запускаем
  onInit();
  window.addEventListener("scroll", activateSectionOnScroll);
  window.addEventListener("load", activateSectionOnScroll);
});