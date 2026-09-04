// Ball
let ballX, ballY;
let ballSpeedX = 0, ballSpeedY = 0;
const ballSize = 14;
let ballTrail = [];

// Paddles
const paddleWidth = 14;
const paddleHeight = 85;
const paddleOffset = 36;
let playerY, aiY;
const aiSpeed = 5.2;

// Score & VFX State
let playerScore = 0;
let aiScore = 0;
let particles = [];
let screenShakeTimer = 0;
let goalFlashAlpha = 0;
let goalFlashColor = [255, 255, 255];
let serveDelayTimer = 45; // brief pause before ball serves

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    ellipseMode(CENTER);
    playerY = height / 2;
    aiY = height / 2;
    resetBall();
}

function draw() {
    // Screen shake effect
    push();
    if (screenShakeTimer > 0) {
        translate(random(-screenShakeTimer, screenShakeTimer), random(-screenShakeTimer, screenShakeTimer));
        screenShakeTimer *= 0.85;
        if (screenShakeTimer < 0.5) screenShakeTimer = 0;
    }

    // Dark retro background with slight motion blur effect
    background(14, 16, 26);

    drawCourt();
    drawScores();
    updateParticles();
    movePlayer();
    moveAI();
    moveBall();
    drawTrail();

    // Draw paddles with rounded neon edges
    noStroke();
    fill(56, 189, 248); // Cyan for player
    rect(paddleOffset, playerY, paddleWidth, paddleHeight, 6);

    fill(244, 63, 94); // Rose red for AI
    rect(width - paddleOffset, aiY, paddleWidth, paddleHeight, 6);

    // Draw ball
    fill(255, 255, 255);
    ellipse(ballX, ballY, ballSize, ballSize);

    pop(); // End screen shake

    // Flash the screen on goal
    if (goalFlashAlpha > 0) {
        noStroke();
        fill(goalFlashColor[0], goalFlashColor[1], goalFlashColor[2], goalFlashAlpha);
        rect(width / 2, height / 2, width, height);
        goalFlashAlpha -= 12; // fade-out speed
    }
}

function drawCourt() {
    // Center dividing line with glowing dash segments
    stroke(40, 50, 75);
    strokeWeight(3);
    for (let y = 15; y < height; y += 32) {
        line(width / 2, y, width / 2, y + 16);
    }

    // Center circle accent
    noFill();
    stroke(30, 38, 58);
    strokeWeight(2);
    ellipse(width / 2, height / 2, 140, 140);
}

function drawScores() {
    noStroke();
    textStyle(BOLD);
    textAlign(CENTER, TOP);

    textSize(48);
    fill(56, 189, 248, 140);
    text(playerScore, width / 2 - 70, 30);

    fill(244, 63, 94, 140);
    text(aiScore, width / 2 + 70, 30);
}

function movePlayer() {
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) playerY -= 8;
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) playerY += 8;
    playerY = constrain(playerY, paddleHeight / 2, height - paddleHeight / 2);
}

function moveAI() {
    // Realistic AI: adds slight reaction lag
    let targetY = ballY + (noise(frameCount * 0.05) - 0.5) * 20;
    if (targetY < aiY - 10) aiY -= aiSpeed;
    else if (targetY > aiY + 10) aiY += aiSpeed;
    aiY = constrain(aiY, paddleHeight / 2, height - paddleHeight / 2);
}

function moveBall() {
    if (serveDelayTimer > 0) {
        serveDelayTimer--;
        return;
    }

    // Record positions for ball trail
    ballTrail.push({ x: ballX, y: ballY });
    if (ballTrail.length > 7) ballTrail.shift();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce off top and bottom walls
    if (ballY - ballSize / 2 <= 0) {
        ballY = ballSize / 2;
        ballSpeedY *= -1;
        spawnParticles(ballX, ballY, [200, 200, 200], 6);
    } else if (ballY + ballSize / 2 >= height) {
        ballY = height - ballSize / 2;
        ballSpeedY *= -1;
        spawnParticles(ballX, ballY, [200, 200, 200], 6);
    }

    // Collision: Player Paddle (Left)
    if (
        ballX - ballSize / 2 <= paddleOffset + paddleWidth / 2 &&
        ballX + ballSize / 2 >= paddleOffset - paddleWidth / 2 &&
        ballY >= playerY - paddleHeight / 2 &&
        ballY <= playerY + paddleHeight / 2
    ) {
        ballSpeedX = Math.abs(ballSpeedX) * 1.05; // Slight speed up on hit
        adjustAngle(playerY);
        screenShakeTimer = 4;
        spawnParticles(ballX, ballY, [56, 189, 248], 15);
    }

    // Collision: AI Paddle (Right)
    if (
        ballX + ballSize / 2 >= width - paddleOffset - paddleWidth / 2 &&
        ballX - ballSize / 2 <= width - paddleOffset + paddleWidth / 2 &&
        ballY >= aiY - paddleHeight / 2 &&
        ballY <= aiY + paddleHeight / 2
    ) {
        ballSpeedX = -Math.abs(ballSpeedX) * 1.05;
        adjustAngle(aiY);
        screenShakeTimer = 4;
        spawnParticles(ballX, ballY, [244, 63, 94], 15);
    }

    // Goal checking
    if (ballX < 0) {
        aiScore++;
        triggerGoal([244, 63, 94]); // Flash red-pink
    } else if (ballX > width) {
        playerScore++;
        triggerGoal([56, 189, 248]); // Flash cyan
    }
}

function triggerGoal(col) {
    goalFlashAlpha = 140; // Opacity of screen flash
    goalFlashColor = col;
    screenShakeTimer = 16;
    resetBall();
}

function adjustAngle(paddleCenterY) {
    let impactOffset = ballY - paddleCenterY;
    ballSpeedY = impactOffset * 0.22;
}

function resetBall() {
    ballX = width / 2;
    ballY = height / 2;
    ballTrail = [];
    ballSpeedX = random() > 0.5 ? 7 : -7;
    ballSpeedY = random(-3, 3);
    serveDelayTimer = 40; // Pause briefly after a goal
}

function drawTrail() {
    noStroke();
    for (let i = 0; i < ballTrail.length; i++) {
        let p = ballTrail[i];
        let alpha = map(i, 0, ballTrail.length, 20, 120);
        let size = map(i, 0, ballTrail.length, 4, ballSize);
        fill(255, 255, 255, alpha);
        ellipse(p.x, p.y, size, size);
    }
}

function spawnParticles(x, y, rgb, count) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            vx: random(-4, 4),
            vy: random(-4, 4),
            life: 255,
            rgb: rgb,
            size: random(3, 6)
        });
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 10;
        noStroke();
        fill(p.rgb[0], p.rgb[1], p.rgb[2], p.life);
        ellipse(p.x, p.y, p.size, p.size);

        if (p.life <= 0) particles.splice(i, 1);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
