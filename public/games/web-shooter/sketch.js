let video;
let handPose;
let hands = [];
let modelLoaded = false;
let setupError = "";
let cameraReady = false;

// Web mechanics
let isShooting = false;
let webs = [];
let webParticles = [];
let webSplats = [];

function loadMl5() {
    return new Promise((resolve, reject) => {
        if (window.ml5) return resolve();
        const s = document.createElement("script");
        s.src = "https://unpkg.com/ml5@1/dist/ml5.min.js";
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Failed to load ml5.js"));
        document.head.appendChild(s);
    });
}

async function setup() {
    createCanvas(windowWidth, windowHeight);

    try {
        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error("Camera access requires HTTPS or localhost.");
        }

        video = createCapture(VIDEO, { flipped: true });
        video.size(640, 480);
        video.hide();
        video.elt.addEventListener("loadeddata", () => {
            cameraReady = true;
        });
        video.elt.addEventListener("error", () => {
            setupError = "Camera could not be started. Check your browser permissions.";
        });

        await loadMl5();

        handPose = ml5.handPose({ flipped: true }, () => {
            modelLoaded = true;
            handPose.detectStart(video, (results) => {
                hands = results;
            });
        });
    } catch (error) {
        setupError = error instanceof Error
            ? error.message
            : "The camera or hand tracking could not be initialized.";
        console.error("Web Shooter initialization failed:", error);
    }
}

function draw() {
    background(15);

    if (video) {
        image(video, 0, 0, width, height);
    }

    // Dark overlay to highlight bright web effects
    fill(10, 15, 25, 140);
    noStroke();
    rect(0, 0, width, height);

    drawCenterCrosshair();

    if (setupError) {
        drawStatus("Web Shooter unavailable", setupError);
        return;
    }

    if (!cameraReady || !modelLoaded) {
        drawStatus(
            cameraReady ? "Initializing ml5 HandPose..." : "Requesting camera access...",
            "Allow camera access when your browser asks."
        );
        return;
    }

    let gestureDetected = false;

    if (hands.length > 0 && hands[0].keypoints) {
        const pts = hands[0].keypoints;

        const wrist = getPt(pts[0]);
        const indexTip = getPt(pts[8]);
        const middleTip = getPt(pts[12]);
        const ringTip = getPt(pts[16]);
        const pinkyTip = getPt(pts[20]);
        const midKnuckle = getPt(pts[9]);

        const handScale = dist(wrist.x, wrist.y, midKnuckle.x, midKnuckle.y);

        if (handScale > 0) {
            const rIndex = dist(wrist.x, wrist.y, indexTip.x, indexTip.y) / handScale;
            const rPinky = dist(wrist.x, wrist.y, pinkyTip.x, pinkyTip.y) / handScale;
            const rMiddle = dist(wrist.x, wrist.y, middleTip.x, middleTip.y) / handScale;
            const rRing = dist(wrist.x, wrist.y, ringTip.x, ringTip.y) / handScale;

            const extended = rIndex > 1.4 && rPinky > 1.2;
            const curled = rMiddle < 1.15 && rRing < 1.15;

            gestureDetected = extended && curled;

            const palm = {
                x: (wrist.x + midKnuckle.x) * 0.5,
                y: (wrist.y + midKnuckle.y) * 0.5,
            };

            if (gestureDetected) {
                if (!isShooting) {
                    isShooting = true;
                    shootWeb(palm);
                }
                drawAimReticle(palm.x, palm.y);
            } else {
                isShooting = false;
            }

            drawKeypoints([wrist, indexTip, middleTip, ringTip, pinkyTip], gestureDetected);
        }
    } else {
        isShooting = false;
    }

    updateAndRenderSplats();
    updateAndRenderWebs();
    drawHUD(gestureDetected);
}

function getPt(pt) {
    return {
        x: map(pt.x, 0, video.width, 0, width),
        y: map(pt.y, 0, video.height, 0, height),
    };
}

function shootWeb(origin) {
    const targetX = width / 2 + random(-15, 15);
    const targetY = height / 2 + random(-15, 15);

    let dir = createVector(targetX - origin.x, targetY - origin.y).normalize();

    webs.push({
        x1: origin.x,
        y1: origin.y,
        x2: targetX,
        y2: targetY,
        progress: 0,
        life: 255,
        splatted: false,
    });

    for (let i = 0; i < 18; i++) {
        webParticles.push({
            x: origin.x,
            y: origin.y,
            vx: dir.x * random(8, 18) + random(-3, 3),
            vy: dir.y * random(8, 18) + random(-3, 3),
            life: 255,
        });
    }
}

function spawnWebSplat(x, y) {
    const spokes = floor(random(8, 12));
    const spokeRads = [];
    const baseRadius = random(70, 120);

    for (let i = 0; i < spokes; i++) {
        const angle = (TWO_PI / spokes) * i + random(-0.15, 0.15);
        const r = baseRadius * random(0.7, 1.3);
        spokeRads.push({
            x: x + cos(angle) * r,
            y: y + sin(angle) * r,
        });
    }

    webSplats.push({
        x: x,
        y: y,
        spokes: spokeRads,
        rings: floor(random(4, 6)),
        life: 255,
        maxLife: 255,
    });

    for (let i = 0; i < 20; i++) {
        const angle = random(TWO_PI);
        const spd = random(3, 8);
        webParticles.push({
            x: x,
            y: y,
            vx: cos(angle) * spd,
            vy: sin(angle) * spd,
            life: 220,
        });
    }
}

function updateAndRenderWebs() {
    for (let i = webs.length - 1; i >= 0; i--) {
        const w = webs[i];
        w.progress = min(w.progress + 0.22, 1.0);

        const curX = lerp(w.x1, w.x2, w.progress);
        const curY = lerp(w.y1, w.y2, w.progress);

        if (w.progress >= 1.0 && !w.splatted) {
            spawnWebSplat(w.x2, w.y2);
            w.splatted = true;
        }

        stroke(0, 210, 255, w.life * 0.45);
        strokeWeight(9);
        line(w.x1, w.y1, curX, curY);

        stroke(255, 255, 255, w.life);
        strokeWeight(3.5);
        line(w.x1, w.y1, curX, curY);

        w.life -= 7;
        if (w.life <= 0) webs.splice(i, 1);
    }

    for (let i = webParticles.length - 1; i >= 0; i--) {
        const p = webParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 9;

        noStroke();
        fill(255, 255, 255, p.life);
        circle(p.x, p.y, random(2.5, 5));

        if (p.life <= 0) webParticles.splice(i, 1);
    }
}

function updateAndRenderSplats() {
    for (let i = webSplats.length - 1; i >= 0; i--) {
        const s = webSplats[i];
        const alphaNorm = s.life / s.maxLife;

        push();
        stroke(180, 235, 255, s.life * 0.85);
        strokeWeight(2);
        for (const spoke of s.spokes) {
            line(s.x, s.y, spoke.x, spoke.y);
        }

        stroke(255, 255, 255, s.life * 0.75);
        strokeWeight(1.4);
        noFill();
        for (let r = 1; r <= s.rings; r++) {
            const step = r / (s.rings + 1);
            beginShape();
            for (let j = 0; j < s.spokes.length; j++) {
                const spoke = s.spokes[j];
                const px = lerp(s.x, spoke.x, step);
                const py = lerp(s.y, spoke.y, step);
                vertex(px, py);
            }
            endShape(CLOSE);
        }

        noStroke();
        fill(0, 220, 255, s.life * 0.35);
        circle(s.x, s.y, 35 * alphaNorm);

        fill(255, 255, 255, s.life);
        circle(s.x, s.y, 14 * alphaNorm);
        pop();

        s.life -= 1.6;
        if (s.life <= 0) webSplats.splice(i, 1);
    }
}

function drawCenterCrosshair() {
    push();
    stroke(0, 220, 255, 60);
    strokeWeight(1.5);
    noFill();
    circle(width / 2, height / 2, 24);
    line(width / 2 - 18, height / 2, width / 2 + 18, height / 2);
    line(width / 2, height / 2 - 18, width / 2, height / 2 + 18);
    pop();
}

function drawAimReticle(x, y) {
    noFill();
    stroke(0, 220, 255, 200);
    strokeWeight(2.5);
    circle(x, y, 40 + sin(frameCount * 0.3) * 6);
    fill(255);
    noStroke();
    circle(x, y, 8);
}

function drawKeypoints(points, active) {
    noStroke();
    fill(active ? color(0, 230, 255) : color(255, 75, 75));
    for (const pt of points) {
        circle(pt.x, pt.y, 10);
    }
}

function drawHUD(active) {
    fill(10, 15, 25, 200);
    stroke(50, 70, 100);
    strokeWeight(1);
    rect(20, 20, 260, 85, 8);

    noStroke();
    fill(255);
    textSize(15);
    textAlign(LEFT, TOP);
    text("Spidey Web Shooter", 35, 30);

    textSize(12);
    fill(active ? color(0, 230, 255) : color(180));
    text(`Status: ${active ? "THWIP! (SCREEN HIT)" : "AIMING CENTER"}`, 35, 54);

    fill(140);
    text("Extend Index + Pinky to shoot center", 35, 74);
}

function drawStatus(mainText, subText) {
    fill(10, 15, 25, 220);
    stroke(50, 70, 100);
    rect(20, 20, 260, 70, 8);

    noStroke();
    fill(255);
    textSize(14);
    textAlign(LEFT, TOP);
    text(mainText, 35, 32);
    textSize(11);
    fill(160);
    text(subText, 35, 55);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}