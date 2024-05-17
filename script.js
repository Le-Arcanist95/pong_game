const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let playerY = (canvas.height - paddleHeight) / 2;
let computerY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let playerScore = 0;
let computerScore = 0;

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "#000"); //Background
    drawRect(0, playerY, paddleWidth, paddleHeight, "#fff"); //Player paddle
    drawRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight, "#fff"); //Computer paddle
    drawCircle(ballX, ballY, ballRadius, "#fff"); //Ball

    //Scoreboard
    context.fillStyle = "#fff";
    context.fillText("Player: " + playerScore, 50, 50);
    context.fillText("Computer: " + computerScore, canvas.width - 150, 50);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }
    
    if (ballX - ballRadius < 0) {
        if(ballY > playerY && ballY < playerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            computerScore++;
            resetBall();
        }
    }

    if (ballX + ballRadius > canvas.width) {
        if (ballY > computerY && ballY < computerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            playerScore++;
            resetBall();
        }
    }
}

function movePaddle(event) {
    const key = event.key;

    if(key === "ArrowUp" && playerY > 0) {
        playerY -= 20;
    } else if (key === "ArrowDown" && playerY < canvas.height - paddleHeight) {
        playerY += 20;
    }
}

function moveComputerPaddle() {
    if (computerY + paddleHeight / 2 < ballY) {
        computerY += 4;
    } else {
        computerY -= 4;
    }
}

function gameLoop() {
    moveBall();
    moveComputerPaddle();
    draw();
}

setInterval(gameLoop, 1000 / 60);