document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    body.classList.add(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const isLight = body.classList.contains('light-theme');
        body.classList.toggle('light-theme', !isLight);
        body.classList.toggle('dark-theme', isLight);
        localStorage.setItem('theme', isLight ? 'dark-theme' : 'light-theme');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => card.style.transform = '', 150);
        });
    });
    const toggleAboutBtn = document.getElementById('toggle-about');
    const aboutContent = document.getElementById('about-content');
    toggleAboutBtn.addEventListener('click', () => {
        aboutContent.classList.toggle('hidden');
        toggleAboutBtn.textContent = aboutContent.classList.contains('hidden') 
    });
});
