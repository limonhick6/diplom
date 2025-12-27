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

        const gamesData = [
    { id: 1, title: "Tetris", category: "logic", desc: "Классическая головоломка с фигурами.", fullDesc: "Тетрис был изобретен в 1984 году. Это игра, в которой нужно собирать полные линии из падающих блоков.", img: "3bc0dc4f773759c4d7391c28fbe28238.png" },
    { id: 2, title: "Minesweeper", category: "logic", desc: "Найдите все мины на поле.", fullDesc: "Логическая игра, где каждое число показывает, сколько мин находится вокруг клетки.", img: "сапёр.png" },
    { id: 3, title: "Snake", category: "arcade", desc: "Управляйте змейкой и ешьте яблоки.", fullDesc: "Популярная игра с телефонов Nokia. Ваша цель — вырасти как можно больше, не врезаясь в стены.", img: "Zmeyka-01.jpg" },
    { id: 4, title: "2048", category: "logic", desc: "Сложите плитки до числа 2048.", fullDesc: "Математическая головоломка, требующая стратегии и планирования ходов.", img: "logo200.png" },
    { id: 5, title: "Pac-Man", category: "arcade", desc: "Побег от привидений в лабиринте.", fullDesc: "Культовая аркада, где нужно съесть все точки на уровне и избегать призраков.", img: "https://via.placeholder.com/200?text=Pacman" },
    { id: 6, title: "Space Invaders", category: "arcade", desc: "Защитите Землю от пришельцев.", fullDesc: "Классический шутер, заложивший основы жанра космических баталий.", img: "https://via.placeholder.com/200?text=Invaders" }
];

const grid = document.getElementById('games-grid');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
function renderGames(filter = 'all') {
    grid.innerHTML = ''; 

    const filteredGames = filter === 'all' 
        ? gamesData 
        : gamesData.filter(game => game.category === filter);
    filteredGames.forEach(game => {
        const card = document.createElement('article');
        card.className = 'game-card';
        card.innerHTML = `
            <h3>${game.title}</h3>
            <img src="${game.img}" alt="${game.title}">
            <p>${game.desc}</p>
            <button class="game-link more-btn" onclick="openModal(${game.id})">Подробнее</button>
        `;
        grid.appendChild(card);
    });
}
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        renderGames(e.target.dataset.category);
    });
});
window.openModal = function(id) {
    const game = gamesData.find(g => g.id === id);
    modalBody.innerHTML = `
        <h2>${game.title}</h2>
        <img src="${game.img}" style="max-width: 100%; border-radius: 10px;">
        <p style="margin-top: 20px;">${game.fullDesc}</p>
        <p><strong>Категория:</strong> ${game.category}</p>
    `;
    modal.style.display = "block";
}
document.querySelector('.close-modal').onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };
renderGames();
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

