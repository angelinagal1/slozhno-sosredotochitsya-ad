(function initTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    setTheme(theme);
  } else {
    // Если тема не сохранена, устанавливаем "auto" по умолчанию
    setTheme('auto');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = [...document.documentElement.classList]
    .find((cn) => cn.startsWith('theme-'))
    ?.replace('theme-', '') || 'auto'; // Добавляем значение по умолчанию
  
  const themeButtons = [
    ...document.querySelectorAll('.header__theme-menu-button'),
  ];
  
  setActiveButton(themeButtons, currentTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const typeClass = [...button.classList].find((cn) => cn.includes('_type_'));
      
      if (typeClass) {
        const chosenTheme = typeClass.split('_type_')[1];
        setTheme(chosenTheme);
        setActiveButton(themeButtons, chosenTheme);
      } else {
        console.error('Не найден класс с типом темы у кнопки:', button);
      }
    });
  });
});

function setTheme(theme) {
  console.log('Устанавливаем тему:', theme); // Для отладки
  
  // Полностью очищаем классы и добавляем нужную тему
  document.documentElement.className = `theme-${theme}`;
  localStorage.setItem('theme', theme);
}

function setActiveButton(buttonsArray, theme) {
  console.log('Активируем кнопку для темы:', theme); // Для отладки
  
  buttonsArray.forEach((button) => {
    button.classList.remove('header__theme-menu-button_active');
    button.disabled = false;
  });
  
  const target = buttonsArray.find((button) =>
    button.classList.contains(`header__theme-menu-button_type_${theme}`)
  );
  
  if (target) {
    target.classList.add('header__theme-menu-button_active');
    target.disabled = true;
  } else {
    // Если кнопка не найдена, активируем "auto"
    const autoButton = document.querySelector('.header__theme-menu-button_type_auto');
    if (autoButton) {
      autoButton.classList.add('header__theme-menu-button_active');
      autoButton.disabled = true;
    }
  }
}
