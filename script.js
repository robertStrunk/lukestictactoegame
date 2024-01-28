const cells = document.querySelectorAll('[data-cell]');
const status = document.querySelector('.status');
let currentPlayer = '🧅';
let gameOver = false;

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    if (cell.textContent !== '' || gameOver) return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
    } else if ([...cells].every(cell => cell.textContent !== '')) {
        status.textContent = "It's a draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === '🧅' ? '🥔' : '🧅';
        status.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent;
    });
}
