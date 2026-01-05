document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    body.classList.add(savedTheme);
    themeToggleBtn.addEventListener('click', () => {
        const isLight = body.classList.contains('light-theme');
        const newTheme = isLight ? 'dark-theme' : 'light-theme';
        body.classList.replace(isLight ? 'light-theme' : 'dark-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    const gamesData = [
        { id: 1, title: "Tetris", category: "logic", desc: "Классика из блоков.", img: "3bc0dc4f773759c4d7391c28fbe28238.png" },
        { id: 2, title: "Minesweeper", category: "logic", desc: "Найдите все мины.", img: "сапёр.png" },
        { id: 3, title: "Snake", category: "arcade", desc: "Старая добрая змейка.", img: "Zmeyka-01.jpg" },
        { id: 4, title: "2048", category: "logic", desc: "Сложите числа.", img: "logo200.png" }
    ];
    const grid = document.getElementById('games-grid');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    let gameInterval = null; 
    function renderGames(filter = 'all') {
        grid.innerHTML = ''; 
        const filtered = filter === 'all' ? gamesData : gamesData.filter(g => g.category === filter);
        filtered.forEach(game => {
            const card = document.createElement('article');
            card.className = 'game-card';
            card.innerHTML = `
                <h3>${game.title}</h3>
                <img src="${game.img}" alt="${game.title}">
                <p>${game.desc}</p>
                <button class="game-link" onclick="openModal(${game.id})">ИГРАТЬ</button>
            `;
            grid.appendChild(card);
        });
    }
    function initSnake(canvas) {
        const ctx = canvas.getContext('2d');
        let grid = 20;
        let count = 0;
        let snake = { x: 160, y: 160, dx: grid, dy: 0, cells: [], maxCells: 4 };
        let apple = { x: 320, y: 320 };
        function loop() {
            gameInterval = requestAnimationFrame(loop);
            if (++count < 16) return; 
            count = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            snake.x += snake.dx; snake.y += snake.dy;
            if (snake.x < 0) snake.x = canvas.width - grid;
            else if (snake.x >= canvas.width) snake.x = 0;
            if (snake.y < 0) snake.y = canvas.height - grid;
            else if (snake.y >= canvas.height) snake.y = 0;
            snake.cells.unshift({ x: snake.x, y: snake.y });
            if (snake.cells.length > snake.maxCells) snake.cells.pop();
            ctx.fillStyle = 'red'; ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);
            ctx.fillStyle = '#00ff41';
            snake.cells.forEach((cell, index) => {
                ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);
                if (cell.x === apple.x && cell.y === apple.y) {
                    snake.maxCells++;
                    apple.x = Math.floor(Math.random() * 20) * grid;
                    apple.y = Math.floor(Math.random() * 20) * grid;
                }
                for (let i = index + 1; i < snake.cells.length; i++) {
                    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                        snake.maxCells = 4; snake.cells = []; snake.x = 160; snake.y = 160;
                    }
                }
            });
        }
        document.onkeydown = (e) => {
            if (e.which === 37 && snake.dx === 0) { snake.dx = -grid; snake.dy = 0; }
            else if (e.which === 38 && snake.dy === 0) { snake.dy = -grid; snake.dx = 0; }
            else if (e.which === 39 && snake.dx === 0) { snake.dx = grid; snake.dy = 0; }
            else if (e.which === 40 && snake.dy === 0) { snake.dy = grid; snake.dx = 0; }
        };
        loop();
    }
    function initTetris(canvas) {
        const ctx = canvas.getContext('2d');
        const grid = 32;
        const columns = 10;
        const rows = 12;
        ctx.scale(1.2, 1.2);
        let board = Array.from({ length: rows }, () => Array(columns).fill(0));
        let player = { pos: { x: 3, y: 0 }, matrix: [[0, 1, 0], [1, 1, 1], [0, 0, 0]] };
        function draw() {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            player.matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value) {
                        ctx.fillStyle = '#ff9f1c';
                        ctx.fillRect(x + player.pos.x, y + player.pos.y, 0.9, 0.9);
                    }
                });
            });
        }
        function update() {
            player.pos.y++;
            if (player.pos.y > rows - 2) player.pos.y = 0;
            draw();
        }
        document.onkeydown = (e) => {
            if (e.which === 37) player.pos.x--;
            if (e.which === 39) player.pos.x++;
        };
        function tick() {
            update();
            gameInterval = setTimeout(tick, 500);
        }
        tick();
    }
    window.openModal = function(id) {
        const game = gamesData.find(g => g.id === id);
        modalBody.innerHTML = `
            <h2>${game.title}</h2>
            <div class="game-container">
                <canvas id="gameCanvas" width="400" height="400"></canvas>
            </div>
            <p>Управление: Стрелки клавиатуры</p> `;
        modal.style.display = "block";
        const canvas = document.getElementById('gameCanvas');
        if (game.title === "Snake") initSnake(canvas);
        if (game.title === "Tetris") initTetris(canvas);
    };
    document.querySelector('.close-modal').onclick = () => {
        modal.style.display = "none";
        cancelAnimationFrame(gameInterval);
        clearTimeout(gameInterval);
        document.onkeydown = null;
    };
    renderGames();
});
