const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');

document.addEventListener('keydown', function(event) {
    console.log('Key pressed:', event.key);
    jump();
});

function jump() {
    console.log('Jump triggered');
    dino.classList.remove('jump');
    void dino.offsetWidth;
    dino.classList.add('jump');
}

function restartGame() {
    // Сбрасываем позицию динозавра
    dino.style.top = '150px';
    dino.classList.remove('jump');

    // Проверяем, что кактус существует
    if (cactus) {
        // Сбрасываем позицию кактуса
        cactus.style.left = '560px';
        cactus.style.animation = 'none';
        void cactus.offsetWidth;
        cactus.style.animation = 'cactusMov 1.5s infinite linear';
    } else {
        console.error('Cactus element not found!');
        return;
    }

    // Запускаем проверку столкновений
    let isAlive = setInterval(function() {
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
        let cactusLeft = cactus ? parseInt(window.getComputedStyle(cactus).getPropertyValue('left')) : -100;

        if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 130) {
            clearInterval(isAlive);
            if (confirm('Game Over! Restart?')) {
                restartGame();
            }
        }
    }, 10);
    return isAlive;
}

let gameInterval = restartGame();