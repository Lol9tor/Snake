function generateRandom (value) {
    return Math.floor(value*Math.random());
}

function Field() {
    this.width = 20; // conditional size
    this.height = 20; // conditional size
}

function Core() {
    this.createField();
    this.createSnake();
    this.createApple();
    this.speed = 1000; // 1000ms 1 step
    this.intervalId = null;
    this.view = new View(this.field);
    console.log(this.view);
    this.start();
}

function Snake() {
    this.parts = [];
    this.direction = 1; //0 - up, 1 - right, 2 - down, 3 - left
}

Snake.prototype.moveSnake = function () {
    var lastPart = this.parts.pop();
    lastPart.x = this.parts[0].x;
    lastPart.y = this.parts[0].y;
    this.parts.unshift(lastPart);
    switch (this.direction) {
        case 0:
            lastPart.y--;
            break;
        case 1:
            lastPart.x++;
            break;
        case 2:
            lastPart.y++;
            break;
        case 3:
            lastPart.x--;
            break;
    }
};

function Apple(height, width) {
    this.x = generateRandom(width);
    this.y = generateRandom(height);
}

Core.prototype.createField = function () {
    this.field = new Field();
};

Core.prototype.createSnake = function () {
    this.snake = new Snake();
    this.snake.parts.push({x : 2, y : Math.floor(this.field.height/2)});
    this.snake.parts.push({x : 1, y : Math.floor(this.field.height/2)});
    this.snake.parts.push({x : 0, y : Math.floor(this.field.height/2)});
};

Core.prototype.createApple = function () {
    this.apple = new Apple();
};

Core.prototype.step = function () {
    this.snake.moveSnake();
    this.view.drawAll(this.snake.parts);
    this.checkApple();
    this.checkWalls();
    this.checkSelf();
    //this.stop();
};

Core.prototype.start = function () {
    var self = this;
    this.intervalId = setInterval(function () {
         self.step();
     }, this.speed);
};

Core.prototype.stop = function () {
    clearInterval(this.intervalId);
    console.log('stop');
};

Core.prototype.checkWalls = function () {

    //var init = new Core();
};

Core.prototype.checkApple = function () {

};

Core.prototype.checkSelf = function () {

    //var init = new Core();
};

