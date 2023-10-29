const mario = document.querySelector('.mario');
const gameBoard = document.querySelector('.game-board');
const pipe = document.querySelector('.pipe');
let jumping = false;

let gameRunning = true;

function jump() {
    if (gameRunning) {
        if (!jumping) {
            jumping = true;
            let jumpHeight = 180; // Adjust this value to control the jump height
            let jumpDuration = 500; // Adjust this value to control the jump duration
            mario.style.transition = `bottom ${jumpDuration}ms`;
            mario.style.bottom = `${jumpHeight}px`;

            jumpInterval = setInterval(() => {
                // Continuously check if the jump is completed
                const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
                if (marioPosition === jumpHeight) {
                    clearInterval(jumpInterval);
                    fall();
                }
            }, 10);
        }
    }
}

function fall() {
    if (jumping) {
        let jumpHeight = 180; // Adjust this value to control the jump height
        let jumpDuration = 500; // Adjust this value to control the jump duration
        mario.style.transition = `bottom ${jumpDuration}ms`;
        mario.style.bottom = '0';

        fallInterval = setInterval(() => {
            // Continuously check if the fall is completed
            const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
            if (marioPosition === 0) {
                clearInterval(fallInterval);
                jumping = false; // Jumping is complete
            }
        }, 10);
    }
}

function gameOver() {
    gameRunning = false; // Stop the game
    clearInterval(pipeAnimation);
    clearInterval(gameLoop);
    const playAgain = confirm('Game Over! Do you want to try again?');
    if (playAgain) {
        // Restart the game
        location.reload();
    }
}

function checkCollision() {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        gameOver();
    }
}

function movePipe() {
    if (gameRunning) {
        const pipePosition = pipe.offsetLeft;
        const gameBoardWidth = gameBoard.offsetWidth;

        if (pipePosition <= -80) {
            pipe.style.left = `${gameBoardWidth}px`;
        } else {
            pipe.style.left = `${pipePosition - 2}px`; // Adjust the speed by changing the value
        }
    }
}

// Listen for keyboard events (keydown)
document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) {
        jump();
    }
});

// Listen for mouse clicks
document.addEventListener('click', () => {
    jump();
});

let pipeAnimation = setInterval(movePipe, 5); // Faster pipe animation
let gameLoop = setInterval(checkCollision, 5); // Faster collision check


function gameOver() {
    gameRunning = false; // Pare o jogo
    clearInterval(pipeAnimation);
    clearInterval(gameLoop);
    const gameBoard = document.querySelector('.game-board');
    const mario = document.querySelector('.mario');
    const gameoverImage = document.querySelector('.game-over');

    mario.style.display = 'none'; // Oculta a imagem do Mario
    gameoverImage.style.display = 'block'; // Exibe a imagem de "game over"

    // Você também pode adicionar um botão ou mensagem para reiniciar o jogo aqui.
    // Por exemplo, um botão "Reiniciar" que chama uma função para recarregar a página.
}

// ... Seu código existente ...

function gameOver() {
    gameRunning = false; // Pare o jogo
    clearInterval(pipeAnimation);
    clearInterval(gameLoop);

    const mario = document.querySelector('.mario');
    const gameoverImage = document.getElementById('game-over-image');

    mario.style.display = 'none'; // Oculta a imagem do Mario
    gameoverImage.style.display = 'block'; // Exibe a imagem de "game over"

    // Exiba o pop-up de "Game Over"
    const gameOverPopup = document.getElementById('game-over-popup');
    gameOverPopup.style.display = 'block';

    // Adicione tratamento de evento para o botão "Try Again"
    const tryAgainButton = document.getElementById('try-again-button');
    tryAgainButton.addEventListener('click', restartGame);

    // Adicione tratamento de evento para o botão "Exit"
    const exitButton = document.getElementById('exit-button');
    exitButton.addEventListener('click', exitGame);
}

// Função para reiniciar o jogo
function restartGame() {
    location.reload(); // Recarrega a página para reiniciar o jogo
}

// Função para sair do jogo
function exitGame() {
    // Adicione aqui qualquer ação necessária para sair do jogo, como redirecionar para outra página ou fechar a janela.
    window.close(); // Exemplo: fecha a janela do jogo
}