// --- FANE FUNKTIONALITET ---
function openCity(evt, tabName) {
    var i, tabcontent, tablinks;
    
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    
    // Stop snake loop hvis vi forlader spil fanen
    if(tabName !== 'Spil') {
        clearInterval(gameInterval);
    }
}

// --- HABIT TRACKER FUNKTIONALITET ---
function toggleDone(boxId) {
    var box = document.getElementById(boxId);
    box.classList.toggle("completed");
}

// --- SPIL MENU STYRING ---
function showGame(gameName) {
    // Skjul alle spil-områder
    document.getElementById('game-snake').style.display = 'none';
    document.getElementById('game-blackjack').style.display = 'none';
    
    // Stop snake hvis den kører
    clearInterval(gameInterval);

    // Vis valgte spil
    if(gameName === 'snake') {
        document.getElementById('game-snake').style.display = 'block';
        initSnake(); 
    } else if (gameName === 'blackjack') {
        document.getElementById('game-blackjack').style.display = 'block';
        // Reset blackjack UI uden at starte automatisk hvis man ikke vil
        document.getElementById('bj-message').innerText = "Tryk 'Start Spil' for at give kort";
    }
}

/* ------------------------------
   SNAKE SPIL LOGIK 2.0
   ------------------------------ */
var canvas, ctx;
var gameInterval;
var snakeSize = 20; 
var tileCount = 20; // 400px / 20 = 20 tiles
var playerX = 10, playerY = 10;
var velocityX = 0, velocityY = 0;
var trail = [];
var tail = 5;
var appleX = 15, appleY = 15;

var score = 0;
var highScore = localStorage.getItem("snakeHighScore") || 0;
var isGameOver = false;
var inputQueue = []; 

function initSnake() {
    canvas = document.getElementById('snakeCanvas');
    ctx = canvas.getContext('2d');
    
    // Reset værdier
    playerX = 10; playerY = 10;
    velocityX = 0; velocityY = 0;
    trail = [];
    tail = 5;
    score = 0;
    isGameOver = false;
    inputQueue = [];
    
    updateScoreBoard();
    
    // Placer første æble et tilfældigt sted
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);

    // Stop gammel loop og start ny (15 FPS)
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 1000/15); 
    
    // Fjern gamle listeners for at undgå dobbelt input
    document.removeEventListener('keydown', keyPush);
    document.addEventListener('keydown', keyPush);
}

function gameLoop() {
    if(isGameOver) {
        drawGameOver();
        return;
    }

    // Håndter input fra køen
    if (inputQueue.length > 0) {
        var nextMove = inputQueue.shift();
        velocityX = nextMove.x;
        velocityY = nextMove.y;
    }

    playerX += velocityX;
    playerY += velocityY;

    // Wrap around (Gå gennem vægge)
    if(playerX < 0) playerX = tileCount - 1;
    if(playerX > tileCount - 1) playerX = 0;
    if(playerY < 0) playerY = tileCount - 1;
    if(playerY > tileCount - 1) playerY = 0;

    // Tegn baggrund
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Tegn slange
    ctx.fillStyle = "#2ecc71";
    for(var i=0; i<trail.length; i++) {
        // Lidt mellemrum mellem led
        ctx.fillRect(trail[i].x * snakeSize + 1, trail[i].y * snakeSize + 1, snakeSize-2, snakeSize-2);
        
        // Kollision med sig selv
        if(trail[i].x == playerX && trail[i].y == playerY) {
            if(velocityX !== 0 || velocityY !== 0) {
                gameOver();
            }
        }
    }

    trail.push({x:playerX, y:playerY});
    while(trail.length > tail) {
        trail.shift();
    }

    // Tegn æble
    ctx.fillStyle = "#e74c3c";
    ctx.beginPath();
    var ax = appleX * snakeSize + snakeSize/2;
    var ay = appleY * snakeSize + snakeSize/2;
    ctx.arc(ax, ay, snakeSize/2 - 2, 0, 2 * Math.PI);
    ctx.fill();

    // Spis æble
    if(appleX == playerX && appleY == playerY) {
        tail++;
        score++;
        updateScoreBoard();
        var validSpawn = false;
        while(!validSpawn) {
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
            validSpawn = true;
            for(var i=0; i<trail.length; i++) {
                if(trail[i].x == appleX && trail[i].y == appleY) {
                    validSpawn = false;
                    break;
                }
            }
        }
    }
}

function updateScoreBoard() {
    document.getElementById('scoreText').innerText = "Score: " + score;
    document.getElementById('highScoreText').innerText = "Highscore: " + highScore;
}

function gameOver() {
    isGameOver = true;
    if(score > highScore) {
        highScore = score;
        localStorage.setItem("snakeHighScore", highScore);
        updateScoreBoard();
    }
}

function drawGameOver() {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width/2, canvas.height/2 - 10);
    
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, canvas.width/2, canvas.height/2 + 20);
    ctx.fillText("Tryk på 'Start Nyt Spil'", canvas.width/2, canvas.height/2 + 50);
}

function keyPush(evt) {
    if([37,38,39,40].indexOf(evt.keyCode) > -1) {
        evt.preventDefault();
    }

    if(isGameOver) return;

    var lastMoveX = inputQueue.length > 0 ? inputQueue[inputQueue.length-1].x : velocityX;
    var lastMoveY = inputQueue.length > 0 ? inputQueue[inputQueue.length-1].y : velocityY;

    var nextX = 0, nextY = 0;

    switch(evt.keyCode) {
        case 37: nextX = -1; nextY = 0; break; // Venstre
        case 38: nextX = 0; nextY = -1; break; // Op
        case 39: nextX = 1; nextY = 0; break; // Højre
        case 40: nextX = 0; nextY = 1; break; // Ned
        default: return;
    }

    if ((lastMoveX !== 0 && nextX === -lastMoveX) || (lastMoveY !== 0 && nextY === -lastMoveY)) {
        return;
    }

    if (inputQueue.length < 2) {
        inputQueue.push({x: nextX, y: nextY});
    }
}

/* ------------------------------
   BLACKJACK LOGIK (Fixet)
   ------------------------------ */
var suits = ["♠", "♥", "♦", "♣"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = [];
var dealerHand = [];
var playerHand = [];
var bjGameOver = false;

function createDeck() {
    deck = [];
    for (var i = 0; i < values.length; i++) {
        for (var x = 0; x < suits.length; x++) {
            var weight = parseInt(values[i]);
            if (["J", "Q", "K"].includes(values[i])) weight = 10;
            if (values[i] == "A") weight = 11;
            var color = (suits[x] == "♥" || suits[x] == "♦") ? "red" : "black";
            var card = { Value: values[i], Suit: suits[x], Weight: weight, Color: color };
            deck.push(card);
        }
    }
}

function shuffle() {
    for (var i = 0; i < 1000; i++) {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function startBlackjack() {
    createDeck();
    shuffle();
    dealerHand = [];
    playerHand = [];
    bjGameOver = false;

    document.getElementById('btn-deal').disabled = true;
    document.getElementById('btn-hit').disabled = false;
    document.getElementById('btn-stand').disabled = false;
    document.getElementById('bj-message').innerText = "Vælg Hit eller Stand";
    document.getElementById('bj-message').style.color = "white";

    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());

    renderBJ(false); 
    checkForBlackjack();
}

function hit() {
    if (!bjGameOver) {
        playerHand.push(deck.pop());
        renderBJ(false);
        if (getPoints(playerHand) > 21) {
            document.getElementById('bj-message').innerText = "Du gik over 21! Huset vinder.";
            document.getElementById('bj-message').style.color = "#ffcccc";
            endBlackjackGame(true); 
        }
    }
}

function stand() {
    if (!bjGameOver) {
        while(getPoints(dealerHand) < 17) {
            dealerHand.push(deck.pop());
        }
        determineWinner();
        endBlackjackGame(true);
    }
}

function getPoints(hand) {
    var points = 0;
    var aces = 0;
    for(var i = 0; i < hand.length; i++) {
        points += hand[i].Weight;
        if(hand[i].Value == "A") aces++;
    }
    while (points > 21 && aces > 0) {
        points -= 10;
        aces--;
    }
    return points;
}

function renderCard(cardObj) {
    return `<div class="card ${cardObj.Color}">${cardObj.Value}<br>${cardObj.Suit}</div>`;
}

function renderBJ(showAllDealerCards) {
    var dealerDiv = document.getElementById('dealer-cards');
    var playerDiv = document.getElementById('player-cards');
    
    var dealerHtml = "";
    if(dealerHand.length > 0) {
        dealerHtml += renderCard(dealerHand[0]);
    }
    
    if (showAllDealerCards) {
        for(var i=1; i<dealerHand.length; i++) {
            dealerHtml += renderCard(dealerHand[i]);
        }
        document.getElementById('dealer-score').innerText = "Score: " + getPoints(dealerHand);
    } else {
        if(dealerHand.length > 1) {
            dealerHtml += `<div class="card" style="background:#2c3e50; border:2px solid white;">?</div>`;
        }
        if(dealerHand.length > 0) {
            document.getElementById('dealer-score').innerText = "Score: " + dealerHand[0].Weight + " + ?";
        }
    }
    dealerDiv.innerHTML = dealerHtml;

    var playerHtml = "";
    for(var i=0; i<playerHand.length; i++) {
        playerHtml += renderCard(playerHand[i]);
    }
    playerDiv.innerHTML = playerHtml;
    document.getElementById('player-score').innerText = "Score: " + getPoints(playerHand);
}

function checkForBlackjack() {
    var pScore = getPoints(playerHand);
    if(pScore == 21) {
        document.getElementById('bj-message').innerText = "Blackjack! Du vinder!";
        endBlackjackGame(true);
    }
}

function determineWinner() {
    var dScore = getPoints(dealerHand);
    var pScore = getPoints(playerHand);

    if (dScore > 21) {
        document.getElementById('bj-message').innerText = "Dealer gik over 21. Du vinder!";
    } else if (pScore > dScore) {
        document.getElementById('bj-message').innerText = "Du har højere score. Du vinder!";
    } else if (dScore > pScore) {
        document.getElementById('bj-message').innerText = "Dealer har højere score. Huset vinder.";
    } else {
        document.getElementById('bj-message').innerText = "Uafgjort (Push).";
    }
}

function endBlackjackGame(showCards) {
    bjGameOver = true;
    document.getElementById('btn-deal').disabled = false;
    document.getElementById('btn-hit').disabled = true;
    document.getElementById('btn-stand').disabled = true;
    renderBJ(showCards); 
}
