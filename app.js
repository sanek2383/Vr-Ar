// Получаем контейнер и блоки
const scrollWrapper = document.querySelector('.scroll-wrapper');
const scrollSections = document.querySelectorAll('.scroll-section');
const dotsContainer = document.querySelector('.pagination');

// Очищаем контейнер точек
dotsContainer.innerHTML = '';

// Создаем точки пагинации для каждого блока
for (let i = 0; i < scrollSections.length; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.dataset.index = i;
  dotsContainer.appendChild(dot);
}

// Индекс текущего блока
let currentSectionIndex = 0;

// Добавляем класс active к первой точке при загрузке страницы
dotsContainer.querySelector('.dot').classList.add('active');

// Функция для прокрутки к следующему блоку
function scrollToNextSection() {
  // Проверяем, не дошли ли мы до конца блоков
  if (currentSectionIndex < scrollSections.length - 1) {
    currentSectionIndex++;
  } else {
    currentSectionIndex = 0; // Возвращаемся к началу, если достигнут конец
  }

  // Прокручиваем к текущему блоку с плавной анимацией
  scrollSections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
  updateActiveDot();
}

// Добавляем обработчик события для прокрутки колеса мыши
scrollWrapper.addEventListener('wheel', function (event) {
  event.preventDefault(); // Предотвращаем стандартное поведение прокрутки

  // Определяем направление прокрутки колеса мыши
  const delta = Math.sign(event.deltaY);

  // Если прокручиваем вверх, прокручиваем к предыдущему блоку, иначе к следующему
  if (delta < 0 && currentSectionIndex > 0) {
    currentSectionIndex--;
  } else if (delta > 0 && currentSectionIndex < scrollSections.length - 1) {
    currentSectionIndex++;
  }

  // Прокручиваем к текущему блоку с плавной анимацией
  scrollSections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
  setTimeout(updateActiveDot, 500); // Добавляем небольшую задержку перед обновлением точек
});

// Добавляем обработчик события для нажатия на точки пагинации
const dots = document.querySelectorAll('.dot');
dots.forEach(dot => {
  dot.addEventListener('click', function () {
    const index = parseInt(this.dataset.index);
    currentSectionIndex = index;
    scrollSections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
    updateActiveDot();
  });
});

// Обновляем активную точку
function updateActiveDot() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentSectionIndex].classList.add('active');
}

// Добавляем обработчик события для прокрутки и обновляем активную точку
scrollWrapper.addEventListener('scroll', function () {
  const visibleSectionIndex = Math.round(scrollWrapper.scrollTop / scrollWrapper.clientHeight);
  currentSectionIndex = visibleSectionIndex;
  updateActiveDot();
});


// ----бургер меню----
const burgerMenu = document.querySelector('.burger-menu');
const menu = document.querySelector('.menu');
const link = document.querySelector('.menu-list');
const overlay = document.querySelector('.overlay');
const closeMenu = document.querySelector('.close-menu');

burgerMenu.addEventListener('click', () => {
  menu.classList.toggle('show');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', () => {
  menu.classList.remove('show');
  overlay.classList.remove('show');
});

closeMenu.addEventListener('click', () => {
  menu.classList.remove('show');
  overlay.classList.remove('show');
});

link.addEventListener('click', () => {
  menu.classList.remove('show');
  overlay.classList.remove('show');
});

// ---свайпер решения----
const swiper = new Swiper('.swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.differences-link-next',
    prevEl: '.differences-link-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

// ---свайпер дизайн----
const swiperDisign = new Swiper('.swiper-design', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.disign-link-next',
    prevEl: '.disign-link-prev',
  },
  nested: true,
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

//----Прокрутка галереи при наведении мыши----
const galleryBlock = document.querySelector('.design-gallery__wrapper');

galleryBlock.addEventListener('mouseenter', event => {
  galleryBlock.style.overflowY = 'auto';
});

galleryBlock.addEventListener('mouseleave', event => {
  galleryBlock.style.overflowY = 'hidden';
});
const onGalleryScroll = (event) => {
  event.stopPropagation();
};

galleryBlock.addEventListener('wheel', onGalleryScroll);


// ---Счетчики---
const counters = document.querySelectorAll('.counter');
  
  const runCounter = (counter) => {
    let value = 0;
    const target = +counter.getAttribute('data-target');
    const increment = target / 100;

    const interval = setInterval(() => {
      value += increment;
      counter.innerText = Math.floor(value).toString();
      if (value >= target) {
        clearInterval(interval);
        counter.innerText = target.toString();
      }
    }, 20);
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target); // Остановка наблюдения после запуска счетчика
      }
    });
  }, { threshold: 0.5 }); // 0.5 означает, что счётчик запустится, когда половина элемента будет видна

  counters.forEach(counter => {
    observer.observe(counter);
  });

  // комманда слайдер
  new Swiper('.team-slider', {
    loop: true,
    slidesPerView:5,
    navigation: {
      nextEl: '.swiper-button-next__team',
      prevEl: '.swiper-button-prev__team',
    },
    nested: true,
  });

   // отзывы слайдер
   new Swiper('.reviews-slider', {
    // loop: true,
    slidesPerView:1.5,
    navigation: {
      nextEl: '.swiper-button-next__reviews',
      prevEl: '.swiper-button-prev__reviews',
    },
    nested: true,
    centeredSlides: true,
  });


  //  форма
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const privacyPolicyChecked = document.getElementById('privacy-policy').checked;
  
    if (!privacyPolicyChecked) {
      document.getElementById('error-message').classList.remove('hidden');
      return; // Останавливаем выполнение функции, если чекбокс не отмечен
    }
  
    // Здесь можно добавить логику для отправки данных (например, AJAX-запрос к серверу)
  
    // Для этого примера просто показываем сообщение об успешной отправке
    document.getElementById('success-message').classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('success-message').classList.add('hidden');
      document.getElementById('privacy-policy').checked = false; // Снимаем галочку с чекбокса после успешной отправки
    }, 3000);
  
    // Опционально, очищаем поля формы
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
  });
  
  // Скрыть уведомление при изменении состояния чекбокса
  document.getElementById('privacy-policy').addEventListener('change', () => {
    document.getElementById('error-message').classList.add('hidden');
  });
  
  
  
  
