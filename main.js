// у меня вопрос как мне сапер сделать? и я не то имя указал js

document.addEventListener('DOMContentLoaded', () => {
    

    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

  
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(savedTheme);

    themeToggleBtn.addEventListener('click', () => {

        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });


    const toggleAboutBtn = document.getElementById('toggle-about');
    const aboutContent = document.getElementById('about-content');
    


    toggleAboutBtn.addEventListener('click', () => {

        aboutContent.classList.toggle('hidden');
        if (aboutContent.classList.contains('hidden')) {
            toggleAboutBtn.textContent = 'Показать Описание';
        } else {
            toggleAboutBtn.textContent = 'Скрыть Описание';
        }
    });
});