var core = new Core();
function changeDirection(e){
    var keyMap = {
        37: 3,
        38: 0,
        39: 1,
        40: 2
    };

    if (e.keyCode in keyMap){
        core.snake.direction = keyMap[e.keyCode];
    }

}
var start = document.getElementById('startGame');
var gameOver = document.getElementById('gameOver');
window.addEventListener('keydown', changeDirection, false);
function endGame() {
    gameOver.innerHTML = 'GAME OVER! YOUR SNAKE\'S SIZE IS <b>'+core.snake.parts.length+'</b>. PLEASE, TRY AGAIN.';
}




