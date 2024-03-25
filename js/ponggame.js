// select canvas element
const canvas = document.getElementById("pong");
const ctx = canvas.getContext('2d');

// Ball object
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 13,
    velocityY: 16,
    speed: 10,
    color: "white"
};

// User Paddle
const user = {
    x: 0,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    color: "white",
    score: 0
};

// COM Paddle
const com = {
    x: canvas.width - 10,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    color: "white",
    score: 0
};

// NET
const net = {
    x: (canvas.width - 2) / 2,
    y: 0,
    height: 10,
    width: 2,
    color: "white"
};

// draw a rectangle
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// draw circle
function drawArc(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

// draw the net
function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// draw text
function drawText(text, x, y) {
    ctx.fillStyle = "#FFF";
    ctx.font = "50px fantasy";
    ctx.fillText(text, x, y);
}

// update function
function update() {
    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // simple AI to control the COM paddle
    com.y += ((ball.y - (com.y + com.height/2))) * 0.2;
    
    // when the ball collides with top and bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
    }
    
    // collision detection with user paddle
    if (ball.x - ball.radius < user.x + user.width && ball.x + ball.radius > user.x && ball.y - ball.radius < user.y + user.height && ball.y + ball.radius > user.y) {
        ball.velocityX = -ball.velocityX;
    }
    
    // collision detection with COM paddle
    if (ball.x - ball.radius < com.x + com.width && ball.x + ball.radius > com.x && ball.y - ball.radius < com.y + com.height && ball.y + ball.radius > com.y) {
        ball.velocityX = -ball.velocityX;
    }
    
    // reset ball position if it goes beyond left and right walls
    if (ball.x - ball.radius < 0) {
        com.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }
}

// game loop
function game() {
    update();
    render();
}

// call the game function every 50 milliseconds
setInterval(game, 50);

// function to update user paddle position based on mouse movement
function movePaddle(evt) {
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height / 2;
}

// add event listener to track mouse movement
canvas.addEventListener("mousemove", movePaddle);

// render function
function render() {
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    
    // draw the net
    drawNet();
    
    // draw the user's paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    
    // draw the COM's paddle
    drawRect(com.x, com.y, com.width, com.height, com.color);
    
    // draw the ball
    drawArc(ball.x, ball.y, ball.radius, ball.color);
    
    // draw the user's score
    drawText(user.score, canvas.width / 4, canvas.height / 5);
    
    // draw the COM's score
    drawText(com.score, 3 * canvas.width / 4, canvas.height / 5);
}

// function to reset the ball position
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}
