function View(field){
    this.field = field;
    this.canvas = null;
    this.context = null;
    this.initialize();
}

View.prototype.drawField = function () {

};

View.prototype.drawSnake = function (snakeParts) {
    var step = this.step;
    for (var i = 0; i < snakeParts.length; i++) {
        this.context.fillRect(step * snakeParts[i].x, step * snakeParts[i].y, step-1, step-1)
    }
};

View.prototype.drawApple = function (apple) {

};

View.prototype.drawAll = function (snakeParts, apple) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawField();
    this.drawSnake(snakeParts);
    //this.drawApple(apple);
};

View.prototype.initialize = function () {
    this.canvas = document.getElementById('canvas');
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.canvas.style.border = '2px solid';
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = 'black';
    this.step = this.canvas.width/this.field.width;
    this.drawField();
};