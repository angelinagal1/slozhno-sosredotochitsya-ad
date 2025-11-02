// Упрощенный и надежный код для переключения тем
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM загружен, инициализируем темы...');
  
  // Инициализация темы из localStorage или установка по умолчанию
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme || 'auto';
  applyTheme(initialTheme);
  updateActiveButton(initialTheme);
  
  // Обработчики для кнопок
  const lightButton = document.querySelector('.header__theme-menu-button_type_light');
  const autoButton = document.querySelector('.header__theme-menu-button_type_auto');
  const darkButton = document.querySelector('.header__theme-menu-button_type_dark');
  
  if (lightButton) {
    lightButton.addEventListener('click', function() {
      console.log('Клик на День');
      applyTheme('light');
      updateActiveButton('light');
    });
  }
  
  if (autoButton) {
    autoButton.addEventListener('click', function() {
      console.log('Клик на Авто');
      applyTheme('auto');
      updateActiveButton('auto');
    });
  }
  
  if (darkButton) {
    darkButton.addEventListener('click', function() {
      console.log('Клик на Неон');
      applyTheme('dark');
      updateActiveButton('dark');
    });
  }
  
  // Проверка элементов
  console.log('Найдены кнопки:', {
    light: !!lightButton,
    auto: !!autoButton,
    dark: !!darkButton
  });
});

function applyTheme(theme) {
  console.log('Применяем тему:', theme);
  
  // Удаляем все классы тем
  document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-auto');
  
  // Добавляем нужный класс
  document.documentElement.classList.add('theme-' + theme);
  
  // Сохраняем в localStorage
  localStorage.setItem('theme', theme);
  
  console.log('Текущие классы html:', document.documentElement.className);
}

function updateActiveButton(theme) {
  console.log('Обновляем активную кнопку для темы:', theme);
  
  // Сбрасываем все кнопки
  const allButtons = document.querySelectorAll('.header__theme-menu-button');
  allButtons.forEach(button => {
    button.classList.remove('header__theme-menu-button_active');
    button.disabled = false;
  });
  
  // Активируем нужную кнопку
  const activeButton = document.querySelector(`.header__theme-menu-button_type_${theme}`);
  if (activeButton) {
    activeButton.classList.add('header__theme-menu-button_active');
    activeButton.disabled = true;
    console.log('Активирована кнопка:', theme);
  } else {
    console.error('Кнопка для темы не найдена:', theme);
  }
}

// Проверка загрузки скрипта
console.log('Script.js загружен');
