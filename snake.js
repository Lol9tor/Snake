function generateRandom (value) {
    return Math.floor(value*Math.random());
}

function checkExistenceCell(x, y, arr) {
    return (x<0 || y<0 || x>=arr.width || y>=arr.height);
}

function Field() {
    this.width = 20; // conditional size
    this.height = 20; // conditional size
}

function Core() {
    this.createField();
    this.createSnake();
    this.createApple();
    this.speed = 500; // 500ms 1 step
    this.intervalId = null;
    this.map = {
        0: {x: 0, y: -1},
        1: {x: 1, y: 0},
        2: {x: 0, y: 1},
        3: {x: -1, y: 0}
    };
    this.view = new View(this.field);
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
    var created = false;
    while (!created){
        created = true;
        this.apple = new Apple(this.field.height, this.field.width);
        for (var i = 0; i < this.snake.parts.length; i++){
            if (this.apple.x == this.snake.parts[i].x && this.apple.y == this.snake.parts[i].y){
                created = false;
            }

        }
    }
/*    for (var i = 0; i < this.snake.parts.length; i++){
        if (this.apple.x == this.snake.parts[i].x && this.apple.y == this.snake.parts[i].y){
            console.log(this.apple);
            this.apple = new Apple(this.field.height, this.field.width);
        }
    }*/
};

Core.prototype.step = function () {
    var getApple = this.checkApple();
    var checkWalls = this.checkWalls();
    var checkSelf = this.checkSelf();
    if (checkWalls && checkSelf) {
        this.snake.moveSnake();
        this.view.drawAll(this.snake.parts, this.apple);
    } else{
        this.stop();
    }
    if (getApple){
        this.speedUp();
    }
    this.prevStep = this.snake.direction;
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
    return true;
};

Core.prototype.speedUp = function () {
    var reductionSpeed = 25;
    this.stop();
    if (this.speed < 100){
        reductionSpeed = this.speed*0.2;
    }
    this.speed -= reductionSpeed;
    this.start();
};

Core.prototype.checkWalls = function () {
    var snakeHead = this.snake.parts[0],
        wall,
        map = this.map;
    var currentDir = map[this.snake.direction];
    wall = checkExistenceCell(snakeHead.x+currentDir.x, snakeHead.y+currentDir.y, this.field);
    return !(wall && this.prevStep == this.snake.direction);
};

Core.prototype.checkApple = function () {
    var x = this.snake.parts[0].x,
        y = this.snake.parts[0].y,
        dir = this.map[this.snake.direction];
    if (x+dir.x == this.apple.x && y+dir.y == this.apple.y) {
        this.snake.parts.unshift({x : this.apple.x, y : this.apple.y});
        this.apple = new Apple(this.field.height, this.field.width);
        return true;
    }
};

Core.prototype.checkSelf = function () {
    var snakeHead = this.snake.parts[0];
    for (var i = 1; i < this.snake.parts.length; i++){
        if (snakeHead.x == this.snake.parts[i].x && snakeHead.y == this.snake.parts[i].y){
            return false;
        }
    }
    return true;
};

