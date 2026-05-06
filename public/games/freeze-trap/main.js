// main.js
import { GameManager } from './game_manager.js';
import { BoundaryHandler } from './boundary_handler.js';
import { Particle } from './particle.js';
import { PARTICLE_COUNT, LEVELS } from './config.js';

// --- SETUP ---
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const boundaryCanvas = document.getElementById('boundaryCanvas');
const boundaryCtx = boundaryCanvas.getContext('2d');
const bgCanvas = document.getElementById('backgroundCanvas');
const bgCtx = bgCanvas.getContext('2d');
const mainMenu = document.getElementById('mainMenu');
const customMenu = document.getElementById('customMenu');
const inGameControls = document.getElementById('inGameControls');
const gameOverMenu = document.getElementById('gameOverMenu');
const mainTitle = document.getElementById('mainTitle');


// --- GAME STATE ---
let gameState = 'MENU';
let gameManager = null;
let boundaryHandler = null;
let particles = [];
let mousePos = { x: 0, y: 0 };
let isDrawing = false;
let currentLine = [];
let currentLineLength = 0;
let gridOffset = 0;
let currentLevelIndex = 0;
let bakingLines = []; 
let customGameSettings = null; 
let demoManager = null;
let demoFrameCounter = 0;

// Crayon colors for drawing lines
const CRAYON_COLORS = ['#ec4899', '#facc15', '#22d3ee', '#4ade80', '#f97316']; // Pink, Yellow, Cyan, Green, Orange
let drawingColor = CRAYON_COLORS[0]; 
let demoLineColor = CRAYON_COLORS[0];

// Helper function to convert hex color to rgba for transparency effects
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// --- RESIZE LOGIC ---
function resizeCanvases() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    bgCanvas.width = gameCanvas.width = boundaryCanvas.width = w;
    bgCanvas.height = gameCanvas.height = boundaryCanvas.height = h;
    if (boundaryHandler && boundaryCtx) {
        boundaryCtx.clearRect(0, 0, w, h);
        boundaryHandler.boundaries.forEach(boundary => {
            drawBrushStroke(boundaryCtx, boundary.points, boundary.color);
        });
    }
}

// --- MOUSE POSITION HELPER ---
function getScaledMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    };
}

// --- MENU & GAME STATE FUNCTIONS ---

function showMenu() {
    mainMenu.style.display = 'flex';
    customMenu.style.display = 'none';
    inGameControls.style.display = 'none';
    gameOverMenu.style.display = 'none';
    gameState = 'MENU';
    gameManager = null;
    boundaryHandler = new BoundaryHandler();
    if (boundaryCtx) boundaryCtx.clearRect(0, 0, boundaryCanvas.width, boundaryCanvas.height);
    particles = [];
    
    mainTitle.style.display = 'block'; // Make title visible
    mainTitle.classList.remove('ingame-title');

    demoFrameCounter = 0;
    demoManager = new GameManager(LEVELS[2], () => {}, true);
}

function showGameOverMenu(didWin) {
    gameState = 'GAME_OVER';
    inGameControls.style.display = 'none';
    
    const subtitle = document.getElementById('gameOverSubtitle');
    const message = document.getElementById('gameOverMessage');
    const nextLevelBtn = document.getElementById('btn-next-level');
    const tryAgainBtn = document.getElementById('btn-try-again');
    const winColor = '#facc15', loseColor = '#ef4444';

    if (didWin) {
        if (customGameSettings === null && currentLevelIndex >= LEVELS.length - 1) {
            subtitle.textContent = "Congratulations!";
            message.textContent = "You Beat The Game!";
            message.style.color = winColor;
            nextLevelBtn.style.display = 'none';
            tryAgainBtn.style.display = 'none';
        } else {
            subtitle.textContent = "Level Complete!";
            message.textContent = gameManager.gameOverMessage;
            message.style.color = winColor;
            nextLevelBtn.style.display = 'block';
            tryAgainBtn.style.display = 'none';
            if (customGameSettings) nextLevelBtn.style.display = 'none';
        }
    } else {
        subtitle.textContent = "Try Again!";
        message.textContent = gameManager.gameOverMessage;
        message.style.color = loseColor;
        nextLevelBtn.style.display = 'none';
        tryAgainBtn.style.display = 'block';
    }
    
    setTimeout(() => gameOverMenu.style.display = 'flex', 500);
}

function startGame(settingsOrLevelIndex) {
    let settings;
    if (typeof settingsOrLevelIndex === 'number') {
        currentLevelIndex = settingsOrLevelIndex;
        settings = LEVELS[currentLevelIndex];
        customGameSettings = null;
    } else {
        settings = settingsOrLevelIndex;
        customGameSettings = settings;
    }
    
    mainMenu.style.display = 'none';
    customMenu.style.display = 'none';
    inGameControls.style.display = 'flex';
    gameOverMenu.style.display = 'none';
    demoManager = null; 

    // MODIFIED: Hide the main title completely during gameplay
    // instead of moving it.
    mainTitle.style.display = 'none';

    boundaryHandler = new BoundaryHandler();
    boundaryCtx.clearRect(0, 0, boundaryCanvas.width, boundaryCanvas.height);
    particles = [];
    bakingLines = [];
    
    gameManager = new GameManager(settings, showGameOverMenu);
    gameState = 'PLAYING';
}

// NEW: Function to start the Pollock painting mode
function startPollockMode() {
    mainMenu.style.display = 'none';
    mainTitle.style.display = 'none'; // Hide the title completely
    inGameControls.style.display = 'flex'; // Show Home/Restart buttons
    
    gameState = 'POLLOCK';
    boundaryHandler = new BoundaryHandler();
    boundaryCtx.clearRect(0, 0, boundaryCanvas.width, boundaryCanvas.height);
    particles = [];
    demoFrameCounter = 0;
    
    const pollockSettings = {
        levelName: 'Pollock',
        numBalls: 15, // More balls for more action
        ballSpeedRange: [5, 12], ballMaxSpeed: 25,
        cursorRepelRadius: 0, cursorRepelStrength: 0,
        ballRadius: 15
    };
    demoManager = new GameManager(pollockSettings, () => {}, true);
}

function startNextLevel() {
    if (currentLevelIndex < LEVELS.length - 1) {
        startGame(currentLevelIndex + 1);
    }
}

function tryAgain() {
    if (customGameSettings) {
        startGame(customGameSettings);
    } else {
        startGame(currentLevelIndex);
    }
}


// --- EVENT LISTENERS ---
window.addEventListener('resize', resizeCanvases);

document.getElementById('btn-start-campaign').onclick = () => startGame(0);
document.getElementById('btn-custom').onclick = () => { mainMenu.style.display = 'none'; customMenu.style.display = 'flex'; };
document.getElementById('btn-pollock').onclick = startPollockMode; // New button event

const timeSlider = document.getElementById('time-slider'), timeValue = document.getElementById('time-value');
const ballsSlider = document.getElementById('balls-slider'), ballsValue = document.getElementById('balls-value');
timeSlider.oninput = () => { timeValue.textContent = timeSlider.value; };
ballsSlider.oninput = () => { ballsValue.textContent = ballsSlider.value; };
document.getElementById('btn-start-custom').onclick = () => {
    const customSettings = {
        levelName: 'Custom',
        timeLimit: parseInt(timeSlider.value, 10),
        numBalls: parseInt(ballsSlider.value, 10),
        drawsAllowed: Infinity,
        ballSpeedRange: [6, 7], ballMaxSpeed: 20,
        cursorRepelRadius: 150, cursorRepelStrength: 150,
        drawDelay: 0, ballRadius: 20, maxLineLength: 1000
    };
    startGame(customSettings);
};
document.getElementById('btn-back').onclick = showMenu;
document.getElementById('btn-home').onclick = showMenu;
document.getElementById('btn-next-level').onclick = startNextLevel;
document.getElementById('btn-try-again').onclick = tryAgain;
document.getElementById('btn-home-gameover').onclick = showMenu;

// MODIFIED: Restart button now handles Pollock mode
document.getElementById('btn-restart').onclick = () => {
    if (gameState === 'POLLOCK') {
        boundaryCtx.clearRect(0, 0, boundaryCanvas.width, boundaryCanvas.height);
        boundaryHandler.boundaries = [];
        demoManager._spawnBalls(gameCanvas);
    } else {
        tryAgain();
    }
};


// --- NEW/REFACTORED Pointer (Mouse + Touch) Event Logic ---

function handlePointerDown(pos) {
    // Update mousePos for repulsion logic on the very first frame of touch/click
    mousePos.x = pos.x;
    mousePos.y = pos.y;

    if (gameState === 'PLAYING' && gameManager.drawsRemaining > 0) {
        isDrawing = true;
        currentLine = [pos];
        currentLineLength = 0;
        drawingColor = CRAYON_COLORS[Math.floor(Math.random() * CRAYON_COLORS.length)];
    }
}

function handlePointerMove(pos) {
    mousePos.x = pos.x;
    mousePos.y = pos.y;
    if (isDrawing) {
        const lastPoint = currentLine[currentLine.length - 1];
        if (Math.hypot(mousePos.x - lastPoint.x, mousePos.y - lastPoint.y) > 10) {
            currentLine.push({ ...mousePos });
            const segmentLength = Math.hypot(mousePos.x - lastPoint.x, mousePos.y - lastPoint.y);
            currentLineLength += segmentLength;
            if (currentLineLength >= gameManager.settings.maxLineLength) stopDrawing();
        }
    }
}

function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
    if (currentLine.length > 1 && gameManager.useDraw()) {
        const drawDelay = gameManager.settings.drawDelay || 0;
        bakingLines.push({
            points: [...currentLine],
            timer: drawDelay,
            color: drawingColor 
        });
    }
    currentLine = [];
    currentLineLength = 0;
}

// MOUSE EVENTS
gameCanvas.addEventListener('mousedown', e => {
    handlePointerDown(getScaledMousePos(gameCanvas, e));
});
gameCanvas.addEventListener('mousemove', e => {
    handlePointerMove(getScaledMousePos(gameCanvas, e));
});
gameCanvas.addEventListener('mouseup', stopDrawing);
gameCanvas.addEventListener('mouseleave', stopDrawing);

// TOUCH EVENTS
gameCanvas.addEventListener('touchstart', e => {
    e.preventDefault(); // Prevents page scrolling
    if (e.touches[0]) {
        handlePointerDown(getScaledMousePos(gameCanvas, e.touches[0]));
    }
}, { passive: false });

gameCanvas.addEventListener('touchmove', e => {
    e.preventDefault(); // Prevents page scrolling
    if (e.touches[0]) {
        handlePointerMove(getScaledMousePos(gameCanvas, e.touches[0]));
    }
}, { passive: false });

gameCanvas.addEventListener('touchend', e => {
    stopDrawing();
});


// --- DRAWING & GAME LOOP ---

function drawGrid(context, width, height) {
    context.clearRect(0, 0, width, height);
    context.save();
    const gridSize = 50;
    context.strokeStyle = "rgba(15, 23, 42, 0.1)";
    context.lineWidth = 1;
    gridOffset = (gridOffset + 0.2) % gridSize;
    for (let x = gridOffset; x < width; x += gridSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
    }
    for (let y = gridOffset; y < height; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
    }
    context.restore();
}

function drawBrushStroke(context, points, color) {
    if (points.length < 2) return;
    context.save();
    context.strokeStyle = color;
    context.lineCap = 'butt'; 
    context.lineJoin = 'round'; 
    let lastPoint = points[0];
    for (let i = 1; i < points.length; i++) {
        const currentPoint = points[i];
        const dx = currentPoint.x - lastPoint.x;
        const dy = currentPoint.y - lastPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance === 0) continue;
        const normalX = -dy / distance, normalY = dx / distance;
        const speed = Math.min(distance, 30);
        const baseWidth = Math.max(3, 18 - (speed * 0.5));
        const fibers = 30;
        for (let j = 0; j < fibers; j++) {
            const widthOffset = (Math.random() - 0.5) * baseWidth;
            const posOffset = { x: normalX * widthOffset, y: normalY * widthOffset };
            context.beginPath();
            context.moveTo(lastPoint.x + posOffset.x, lastPoint.y + posOffset.y);
            context.lineTo(currentPoint.x + posOffset.x, currentPoint.y + posOffset.y);
            context.globalAlpha = 0.15 + Math.random() * 0.1;
            context.lineWidth = 1.5 + Math.random() * 2;
            context.stroke();
        }
        lastPoint = currentPoint;
    }
    context.restore();
}

// NEW: Refactored demo logic into its own function
function runDemoLogic(isPollockMode = false) {
    demoFrameCounter++;

    if (demoManager.balls.every(b => b.isBurst)) {
        if (!isPollockMode) {
            boundaryCtx.clearRect(0, 0, boundaryCanvas.width, boundaryCanvas.height);
            boundaryHandler.boundaries = [];
        }
        demoManager._spawnBalls(gameCanvas);
    }

    const lineCreationInterval = isPollockMode ? 90 : 90;

    if (demoManager.demoLinePoints.length === 0 && demoFrameCounter % lineCreationInterval === 0) {
        if (Math.random() < 0.6) demoManager.createDemoSquiggle(gameCanvas);
        else demoManager.createDemoLine(gameCanvas);
        demoLineColor = CRAYON_COLORS[Math.floor(Math.random() * CRAYON_COLORS.length)];
    }
    
    demoManager.update(gameCanvas, null, boundaryHandler);
    particles.forEach(p => p.update());
    particles = particles.filter(p => p.lifespan > 0);
    ctx.drawImage(boundaryCanvas, 0, 0);

    if (demoManager.demoLinePoints.length > 0) {
        const line = demoManager.demoLinePoints;
        const animationDuration = isPollockMode ? 89 : 89;
        const progress = (demoFrameCounter % lineCreationInterval) / animationDuration;
        const pointsToDraw = Math.floor(line.length * progress);
        
        drawBrushStroke(ctx, line.slice(0, pointsToDraw + 1), hexToRgba(demoLineColor, 0.4));
        
        if (demoFrameCounter % lineCreationInterval >= animationDuration) {
            drawBrushStroke(boundaryCtx, line, demoLineColor);
            boundaryHandler.addBoundary({ points: line, color: demoLineColor });
            demoManager.demoLinePoints = [];
        }
    }

    demoManager.balls.forEach(ball => {
        if (ball.isBurst && !ball.particlesCreated) {
            for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle(ball.x, ball.y));
            ball.particlesCreated = true;
        }
        ball.draw(ctx);
    });
    particles.forEach(p => p.draw(ctx));
}

function gameLoop() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    if (gameState === 'MENU' && demoManager) {
        runDemoLogic(false);
    } else if (gameState === 'POLLOCK' && demoManager) {
        runDemoLogic(true);
    } else if ((gameState === 'PLAYING' || gameState === 'GAME_OVER') && gameManager) {
        gameManager.update(gameCanvas, mousePos, boundaryHandler);
        
        gameManager.balls.forEach(ball => {
            if (ball.isBurst && !ball.particlesCreated) {
                for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle(ball.x, ball.y));
                ball.particlesCreated = true;
            }
        });
        particles.forEach(p => p.update());
        particles = particles.filter(p => p.lifespan > 0);

        ctx.drawImage(boundaryCanvas, 0, 0);

        for (let i = bakingLines.length - 1; i >= 0; i--) {
            const line = bakingLines[i];
            line.timer--;
            if (line.timer <= 0) {
                boundaryHandler.addBoundary({ points: line.points, color: line.color });
                drawBrushStroke(boundaryCtx, line.points, line.color);
                bakingLines.splice(i, 1);
            } else {
                const progress = line.timer / gameManager.settings.drawDelay;
                const alpha = 0.1 + (0.3 * (1 - progress));
                drawBrushStroke(ctx, line.points, hexToRgba(line.color, alpha));
            }
        }
        
        if (isDrawing) {
            drawBrushStroke(ctx, currentLine, hexToRgba(drawingColor, 0.4));
        }

        gameManager.balls.forEach(b => b.draw(ctx));
        particles.forEach(p => p.draw(ctx));
        gameManager.drawUI(ctx, gameCanvas);
    }
    requestAnimationFrame(gameLoop);
}

function backgroundLoop() {
    drawGrid(bgCtx, bgCanvas.width, bgCanvas.height);
    requestAnimationFrame(backgroundLoop);
}

// --- START ---
resizeCanvases();
showMenu();
backgroundLoop();
gameLoop();