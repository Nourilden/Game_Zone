const player = document.getElementById('player');
const keys = document.querySelectorAll('.key');
const treasure = document.getElementById('treasure');
const storyline = document.getElementById('storyline');

let posX = 180;
let posY = 180;
let step = 20;
let keysCollected = 0;
let storyMessages = [
    "Welcome to Mystery Island!",
    "Find all the keys to unlock the treasure.",
    "You found a key! Keep searching...",
    "All keys collected! The treasure has been unlocked!",
    "Congratulations! You opened the treasure and solved the mystery!"
];

// Storyline Display
function showStory(message, delay = 3000) {
    storyline.textContent = message;
    storyline.style.display = 'block';
    setTimeout(() => {
        storyline.style.display = 'none';
    }, delay);
}

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

    checkKeyCollection();
    checkWin();
});

// Check if player collides with a key
function checkKeyCollection() {
    keys.forEach(key => {
        const keyRect = key.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (playerRect.left < keyRect.right &&
            playerRect.right > keyRect.left &&
            playerRect.top < keyRect.bottom &&
            playerRect.bottom > keyRect.top) {
            key.style.display = 'none';
            keysCollected++;
            showStory(storyMessages[2]);
        }
    });
}

// Check if all keys are collected (winning condition)
function checkWin() {
    if (keysCollected === keys.length) {
        treasure.style.display = 'block';
        showStory(storyMessages[3]);
        checkTreasure();
    }
}

// Treasure interaction
function checkTreasure() {
    const treasureRect = treasure.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (playerRect.left < treasureRect.right &&
        playerRect.right > treasureRect.left &&
        playerRect.top < treasureRect.bottom &&
        playerRect.bottom > treasureRect.top) {
        showStory(storyMessages[4], 5000);
        resetGame();
    }
}

// Reset game to initial state
function resetGame() {
    posX = 180;
    posY = 180;
    keysCollected = 0;

    player.style.top = `${posY}px`;
    player.style.left = `${posX}px`;

    keys.forEach(key => {
        key.style.display = 'block';
    });

    treasure.style.display = 'none';
}

// Initial story message
showStory(storyMessages[0], 5000);
