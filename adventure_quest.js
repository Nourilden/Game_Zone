const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const items = document.querySelectorAll('.item');
const healthBar = document.getElementById('health-bar');

let posX = 180;
let posY = 180;
let enemyX = 100;
let enemyY = 100;
let step = 20;
let health = 100;
let itemsCollected = 0;

// Player movement
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            if (posY > 0) posY -= step;
            break;
        case 'ArrowDown':
        case 's':
            if (posY < 360) posY += step;
            break;
        case 'ArrowLeft':
        case 'a':
            if (posX > 0) posX -= step;
            break;
        case 'ArrowRight':
        case 'd':
            if (posX < 360) posX += step;
            break;
    }

    player.style.top = `${posY}px`;
    player.style.left = `${posX}px`;

    checkCollisions();
    checkWin();
});

// Enemy movement
function moveEnemy() {
    const randomDirection = Math.floor(Math.random() * 4);
    switch (randomDirection) {
        case 0: if (enemyY > 0) enemyY -= step; break; // Up
        case 1: if (enemyY < 360) enemyY += step; break; // Down
        case 2: if (enemyX > 0) enemyX -= step; break; // Left
        case 3: if (enemyX < 360) enemyX += step; break; // Right
    }

    enemy.style.top = `${enemyY}px`;
    enemy.style.left = `${enemyX}px`;

    checkEnemyCollision();
}

// Check player collision with items
function checkCollisions() {
    items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (playerRect.left < itemRect.right &&
            playerRect.right > itemRect.left &&
            playerRect.top < itemRect.bottom &&
            playerRect.bottom > itemRect.top) {
            item.style.display = 'none';
            itemsCollected++;
        }
    });
}

// Check collision with enemy
function checkEnemyCollision() {
    const enemyRect = enemy.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (playerRect.left < enemyRect.right &&
        playerRect.right > enemyRect.left &&
        playerRect.top < enemyRect.bottom &&
        playerRect.bottom > enemyRect.top) {
        // Reduce health when hit by enemy
        health -= 10;
        healthBar.style.width = `${health}%`;

        if (health <= 0) {
            alert('Game Over! You were defeated.');
            resetGame();
        }
    }
}

// Check if player has collected all items
function checkWin() {
    if (itemsCollected === items.length) {
        alert('Congratulations! You won by collecting all items!');
        resetGame();
    }
}

// Reset game
function resetGame() {
    posX = 180;
    posY = 180;
    enemyX = 100;
    enemyY = 100;
    health = 100;
    itemsCollected = 0;

    healthBar.style.width = '100%';

    player.style.top = `${posY}px`;
    player.style.left = `${posX}px`;
    enemy.style.top = `${enemyY}px`;
    enemy.style.left = `${enemyX}px`;

    items.forEach(item => {
        item.style.display = 'block';
    });
}

// Move the enemy randomly every 1 second
setInterval(moveEnemy, 1000);
