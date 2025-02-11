document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    function handleCellClick(e) {
      const index = e.target.getAttribute('data-index');
      if (board[index] || !gameActive) {
        return;
      }
      
      board[index] = currentPlayer;
      e.target.textContent = currentPlayer;
      
      if (checkWin(currentPlayer)) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        gameActive = false;
        return;
      }
      
      if (board.every(cell => cell)) {
        setTimeout(() => alert("It's a tie!"), 100);
        gameActive = false;
        return;
      }
      
      
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    function checkWin(player) {
      return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
      });
    }
  
    function resetGame() {
      board = Array(9).fill(null);
      gameActive = true;
      currentPlayer = 'X';
      cells.forEach(cell => (cell.textContent = ''));
    }
  
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
  });
  