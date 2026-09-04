import React, { useEffect, useRef } from "react";
import p5 from "p5";

export default function PongGame() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      // Ball
      let ballX: number, ballY: number;
      let ballSpeedX = 0, ballSpeedY = 0;
      const ballSize = 14;
      let ballTrail: { x: number; y: number }[] = [];

      // Paddles
      const paddleWidth = 14;
      const paddleHeight = 85;
      const paddleOffset = 36;
      let playerY: number, aiY: number;
      const aiSpeed = 5.2;

      // Score & VFX State
      let playerScore = 0;
      let aiScore = 0;
      let particles: {
        x: number;
        y: number;
        vx: number;
        vy: number;
        life: number;
        rgb: number[];
        size: number;
      }[] = [];
      let screenShakeTimer = 0;
      let goalFlashAlpha = 0;
      let goalFlashColor = [255, 255, 255];
      let serveDelayTimer = 45;

      const resetBall = () => {
        ballX = p.width / 2;
        ballY = p.height / 2;
        ballTrail = [];
        ballSpeedX = p.random() > 0.5 ? 7 : -7;
        ballSpeedY = p.random(-3, 3);
        serveDelayTimer = 40;
      };

      const spawnParticles = (x: number, y: number, rgb: number[], count: number) => {
        for (let i = 0; i < count; i++) {
          particles.push({
            x,
            y,
            vx: p.random(-4, 4),
            vy: p.random(-4, 4),
            life: 255,
            rgb,
            size: p.random(3, 6),
          });
        }
      };

      const triggerGoal = (col: number[]) => {
        goalFlashAlpha = 140;
        goalFlashColor = col;
        screenShakeTimer = 16;
        resetBall();
      };

      const adjustAngle = (paddleCenterY: number) => {
        const impactOffset = ballY - paddleCenterY;
        ballSpeedY = impactOffset * 0.22;
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(containerRef.current!);
        p.rectMode(p.CENTER);
        p.ellipseMode(p.CENTER);
        playerY = p.height / 2;
        aiY = p.height / 2;
        resetBall();
      };

      p.draw = () => {
        p.push();
        if (screenShakeTimer > 0) {
          p.translate(
            p.random(-screenShakeTimer, screenShakeTimer),
            p.random(-screenShakeTimer, screenShakeTimer)
          );
          screenShakeTimer *= 0.85;
          if (screenShakeTimer < 0.5) screenShakeTimer = 0;
        }

        p.background(14, 16, 26);

        // Court
        p.stroke(40, 50, 75);
        p.strokeWeight(3);
        for (let y = 15; y < p.height; y += 32) {
          p.line(p.width / 2, y, p.width / 2, y + 16);
        }
        p.noFill();
        p.stroke(30, 38, 58);
        p.strokeWeight(2);
        p.ellipse(p.width / 2, p.height / 2, 140, 140);

        // Scores
        p.noStroke();
        p.textStyle(p.BOLD);
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(48);
        p.fill(56, 189, 248, 140);
        p.text(playerScore, p.width / 2 - 70, 30);
        p.fill(244, 63, 94, 140);
        p.text(aiScore, p.width / 2 + 70, 30);

        // Particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const pt = particles[i];
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.life -= 10;
          p.noStroke();
          p.fill(pt.rgb[0], pt.rgb[1], pt.rgb[2], pt.life);
          p.ellipse(pt.x, pt.y, pt.size, pt.size);
          if (pt.life <= 0) particles.splice(i, 1);
        }

        // Move Player
        if (p.keyIsDown(p.UP_ARROW) || p.keyIsDown(87)) playerY -= 8;
        if (p.keyIsDown(p.DOWN_ARROW) || p.keyIsDown(83)) playerY += 8;
        playerY = p.constrain(playerY, paddleHeight / 2, p.height - paddleHeight / 2);

        // Move AI
        const targetY = ballY + (p.noise(p.frameCount * 0.05) - 0.5) * 20;
        if (targetY < aiY - 10) aiY -= aiSpeed;
        else if (targetY > aiY + 10) aiY += aiSpeed;
        aiY = p.constrain(aiY, paddleHeight / 2, p.height - paddleHeight / 2);

        // Move Ball
        if (serveDelayTimer > 0) {
          serveDelayTimer--;
        } else {
          ballTrail.push({ x: ballX, y: ballY });
          if (ballTrail.length > 7) ballTrail.shift();

          ballX += ballSpeedX;
          ballY += ballSpeedY;

          // Wall bounces
          if (ballY - ballSize / 2 <= 0) {
            ballY = ballSize / 2;
            ballSpeedY *= -1;
            spawnParticles(ballX, ballY, [200, 200, 200], 6);
          } else if (ballY + ballSize / 2 >= p.height) {
            ballY = p.height - ballSize / 2;
            ballSpeedY *= -1;
            spawnParticles(ballX, ballY, [200, 200, 200], 6);
          }

          // Player collision
          if (
            ballX - ballSize / 2 <= paddleOffset + paddleWidth / 2 &&
            ballX + ballSize / 2 >= paddleOffset - paddleWidth / 2 &&
            ballY >= playerY - paddleHeight / 2 &&
            ballY <= playerY + paddleHeight / 2
          ) {
            ballSpeedX = Math.abs(ballSpeedX) * 1.05;
            adjustAngle(playerY);
            screenShakeTimer = 4;
            spawnParticles(ballX, ballY, [56, 189, 248], 15);
          }

          // AI collision
          if (
            ballX + ballSize / 2 >= p.width - paddleOffset - paddleWidth / 2 &&
            ballX - ballSize / 2 <= p.width - paddleOffset + paddleWidth / 2 &&
            ballY >= aiY - paddleHeight / 2 &&
            ballY <= aiY + paddleHeight / 2
          ) {
            ballSpeedX = -Math.abs(ballSpeedX) * 1.05;
            adjustAngle(aiY);
            screenShakeTimer = 4;
            spawnParticles(ballX, ballY, [244, 63, 94], 15);
          }

          // Goals
          if (ballX < 0) {
            aiScore++;
            triggerGoal([244, 63, 94]);
          } else if (ballX > p.width) {
            playerScore++;
            triggerGoal([56, 189, 248]);
          }
        }

        // Draw Trail
        p.noStroke();
        for (let i = 0; i < ballTrail.length; i++) {
          const pt = ballTrail[i];
          const alpha = p.map(i, 0, ballTrail.length, 20, 120);
          const size = p.map(i, 0, ballTrail.length, 4, ballSize);
          p.fill(255, 255, 255, alpha);
          p.ellipse(pt.x, pt.y, size, size);
        }

        // Render Paddles & Ball
        p.fill(56, 189, 248);
        p.rect(paddleOffset, playerY, paddleWidth, paddleHeight, 6);

        p.fill(244, 63, 94);
        p.rect(p.width - paddleOffset, aiY, paddleWidth, paddleHeight, 6);

        p.fill(255, 255, 255);
        p.ellipse(ballX, ballY, ballSize, ballSize);

        p.pop();

        // Screen flash on goal
        if (goalFlashAlpha > 0) {
          p.noStroke();
          p.fill(goalFlashColor[0], goalFlashColor[1], goalFlashColor[2], goalFlashAlpha);
          p.rect(p.width / 2, p.height / 2, p.width, p.height);
          goalFlashAlpha -= 12;
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    const instance = new p5(sketch);
    return () => {
      instance.remove();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-screen overflow-hidden" />;
}
