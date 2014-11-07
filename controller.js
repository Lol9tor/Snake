var core = new Core();

function changeDirection(e){
    var keyCode = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };
    switch(e.keyCode) {
        case keyCode.left:
            core.snake.direction = 3;
            break;
        case keyCode.up:
            core.snake.direction = 0;
            break;
        case keyCode.right:
            core.snake.direction = 1;
            break;
        case keyCode.down:
            core.snake.direction = 2;
            break;
    }
}
var start = document.getElementById('startGame');
start.onclick = function () {
    if (core.stop){
        core = new Core();
    }
};
window.addEventListener('keydown', changeDirection, false);
