// Initialization
const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");
const paddleHitSound = new Audio("./resources/ping-pong_ball_hit.wav");
const scoreSound = new Audio("./resources/point_tick.wav");

canvas.width = 800;
canvas.height = 600;

// Variables
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
let playerSpeed = 6;
let computerSpeed = 4;
let computerDelay = 0;
let upPressed = false;
let downPressed = false;

// Event Listeners
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") upPressed = true;
    if (event.key === "ArrowDown") downPressed = true;
});

document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowUp") upPressed = false;
    if (event.key === "ArrowDown") downPressed = false;
});

// Functions
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
            paddleHitSound.play();
        } else {
            computerScore++;
            scoreSound.play();
            resetBall();
        }
    }

    if (ballX + ballRadius > canvas.width) {
        if (ballY > computerY && ballY < computerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            paddleHitSound.play();
        } else {
            playerScore++;
            scoreSound.play();
            resetBall();
        }
    }
}

function movePlayerPaddle() {
    if(upPressed && playerY > 0) {
        playerY -= playerSpeed;
    }
    if (downPressed && playerY < canvas.height - paddleHeight) {
        playerY += playerSpeed;
    }
}

function moveComputerPaddle() {
    if (computerDelay === 0) {
        if (computerY + paddleHeight / 2 < ballY) {
            computerY += computerSpeed;
        } else {
            computerY -= computerSpeed;
        }
        computerDelay = 5;
    } else {
        computerDelay--;
    }
}

function gameLoop() {
    movePlayerPaddle();
    moveBall();
    moveComputerPaddle();
    draw();
}

setInterval(gameLoop, 1000 / 60);