// Function to simulate playing a game with animations
function playGame(gameName) {
    const gamePopup = document.createElement('div');
    gamePopup.classList.add('game-popup');
    gamePopup.innerHTML = `
        <div class="game-popup-content">
            <h2>Loading ${gameName}...</h2>
            <div class="loader"></div>
            <p>Get ready!</p>
            <button id="closePopup">Close</button>
        </div>
    `;
    document.body.appendChild(gamePopup);

    // Add loading effect for a few seconds before showing the close button
    setTimeout(() => {
        gamePopup.querySelector('h2').textContent = `${gameName} is Ready!`;
        gamePopup.querySelector('.loader').style.display = 'none';
        gamePopup.querySelector('button').style.display = 'inline-block';
    }, 3000);

    // Add event listener to close the popup
    document.getElementById('closePopup').addEventListener('click', () => {
        document.body.removeChild(gamePopup);
    });
}

// Contact form validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('All fields are required!');
    } else if (!validateEmail(email)) {
        alert('Please enter a valid email address!');
    } else {
        alert('Thank you for your message, ' + name + '!');
        this.reset();
    }
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
function scrollToGames() {
    document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
}
function playGame(gameName) {
    alert(`Loading ${gameName}...`);
    // Here you can implement the logic to load or redirect to the game
    // For example, you could use:
    // window.location.href = "https://example.com/game1";
}
