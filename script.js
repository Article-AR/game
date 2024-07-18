document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('player');
  const gameArea = document.getElementById('gameArea');
  const scoreDisplay = document.getElementById('score');
  const restartButton = document.getElementById('restart');
  const menu = document.getElementById('menu');
  const controls = document.querySelector('.controls');
  let score = 0;
  let gameInterval;
  let obstacleInterval;
  let gameSpeed = 5;
  let obstacleFrequency = 2000;

  document.getElementById('easy').addEventListener('click', () => startGame('easy'));
  document.getElementById('hard').addEventListener('click', () => startGame('hard'));
  document.getElementById('left').addEventListener('click', moveLeft);
  document.getElementById('right').addEventListener('click', moveRight);
  restartButton.addEventListener('click', restartGame);

  function startGame(difficulty) {
    if (difficulty === 'hard') {
      gameSpeed = 10;
      obstacleFrequency = 1000;
    } else {
      gameSpeed = 5;
      obstacleFrequency = 2000;
    }
    menu.style.display = 'none';
    gameArea.style.display = 'block';
    scoreDisplay.style.display = 'block';
    restartButton.style.display = 'none';
    controls.style.display = 'flex';
    score = 0;
    scoreDisplay.textContent = `النقاط: ${score}`;
    gameInterval = setInterval(gameLoop, 20);
    obstacleInterval = setInterval(createObstacle, obstacleFrequency);
  }

  function gameLoop() {
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => {
      const obstacleTop = parseInt(obstacle.style.top);
      if (obstacleTop >= 370 && collision(player, obstacle)) {
        endGame();
      }
      if (obstacleTop >= 400) {
        obstacle.remove();
        score++;
        scoreDisplay.textContent = `النقاط: ${score}`;
      } else {
        obstacle.style.top = `${obstacleTop + gameSpeed}px`;
      }
    });
  }

  function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = `${Math.floor(Math.random() * 270)}px`;
    gameArea.appendChild(obstacle);
  }

  function moveLeft() {
    const playerLeft = parseInt(player.style.left);
    if (playerLeft > 0) {
      player.style.left = `${playerLeft - 30}px`;
    }
  }

  function moveRight() {
    const playerLeft = parseInt(player.style.left);
    if (playerLeft < 270) {
      player.style.left = `${playerLeft + 30}px`;
    }
  }

  function collision(player, obstacle) {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    return !(
      playerRect.top > obstacleRect.bottom ||
      playerRect.bottom < obstacleRect.top ||
      playerRect.left > obstacleRect.right ||
      playerRect.right < obstacleRect.left
    );
  }

  function endGame() {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    controls.style.display = 'none';
    restartButton.style.display = 'block';
  }

  function restartGame() {
    document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
    player.style.left = '135px';
    score = 0;
    scoreDisplay.textContent = `النقاط: ${score}`;
    startGame(gameSpeed === 5 ? 'easy' : 'hard');
  }
});
