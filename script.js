
let currentPlayer = 'X';
const board = document.getElementById('board');
const cells = [];

// Create the game board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
    cells.push(cell);
}

// Event handler for cell clicks
function handleCellClick(e) {
    const cell = e.target;

    if (cell.textContent === '' && !isGameWon()) {
        cell.textContent = currentPlayer;
        cell.style.cursor = 'not-allowed';
        if (isGameWon()) {
            document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
        } else if (isBoardFull()) {
            document.getElementById('status').textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Check if the game has been won
function isGameWon() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].style.color = 'green';
            cells[b].style.color = 'green';
            cells[c].style.color = 'green';
            return true;
        }
    }
    return false;
}

// Check if the board is full (a draw)
function isBoardFull() {
    return cells.every(cell => cell.textContent !== '');
}

// Reset the game board
function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = 'white';
        cell.style.cursor = 'pointer';
    });
    currentPlayer = 'X';
    document.getElementById('status').textContent = 'Player X\'s turn';
}
