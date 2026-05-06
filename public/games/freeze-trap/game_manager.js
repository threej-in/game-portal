import { Ball } from './ball.js';
import { BALL_RADIUS } from './config.js';

function getMenuSafeZone(canvas) {
    return {
        x: canvas.width / 2 - 225,
        y: canvas.height / 2 - 175,
        width: 450,
        height: 350
    };
}

export class GameManager {
    constructor(settings, onGameOverCallback, isDemo = false) {
        this.settings = settings;
        this.onGameOverCallback = onGameOverCallback;
        this.isDemo = isDemo;
        this.balls = [];
        this.timeRemaining = this.settings.timeLimit;
        this.frameCounter = 0;
        this.drawsRemaining = this.settings.drawsAllowed;
        this.isGameOver = false;
        this.gameOverMessage = "";
        this.demoLinePoints = [];
        this.levelName = settings.levelName || 'Custom';
    }

    _spawnBalls(canvas) {
        this.balls = [];
        const safeZone = getMenuSafeZone(canvas);
        for (let i = 0; i < this.settings.numBalls; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            // MODIFIED: Only respect the safe zone if this is a demo AND not in Pollock mode
            if (this.isDemo && this.levelName !== 'Pollock' && x > safeZone.x && x < safeZone.x + safeZone.width && y > safeZone.y && y < safeZone.y + safeZone.height) {
                i--; 
                continue;
            }
            this.balls.push(new Ball(x, y, this.settings.ballRadius, this.settings));
        }
    }

    update(canvas, mousePos, boundaryHandler) {
        if (this.balls.length === 0) {
            this._spawnBalls(canvas);
        }

        if (!this.isDemo && this.isGameOver) return;

        this.balls.forEach(ball => {
            ball.update(canvas, this.isDemo ? null : mousePos, boundaryHandler);
            ball.checkIfTrapped();
        });

        if (!this.isDemo) {
            this.frameCounter++;
            if (this.frameCounter % 60 === 0) {
                this.timeRemaining--;
            }

            if (this.balls.every(b => b.isBurst)) {
                this.isGameOver = true;
                this.gameOverMessage = "BAMM! You Win!";
                this.onGameOverCallback(true);
            } else if (this.timeRemaining <= 0) {
                this.isGameOver = true;
                this.gameOverMessage = "Oh Oh....Time's Up! ";
                this.timeRemaining = 0;
                this.onGameOverCallback(false);
            }
        }
    }

    _isPointInSafeZone(p, safeZone) {
        return p.x > safeZone.x && p.x < safeZone.x + safeZone.width &&
               p.y > safeZone.y && p.y < safeZone.y + safeZone.height;
    }

    _lineSegmentIntersection(p1, p2, p3, p4) {
        const d = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
        if (d === 0) return false;
        const t = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / d;
        const u = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / d;
        return t >= 0 && t <= 1 && u >= 0 && u <= 1;
    }

    _doesLineIntersectSafeZone(p1, p2, safeZone) {
        if (this._isPointInSafeZone(p1, safeZone) || this._isPointInSafeZone(p2, safeZone)) return true;
        const corners = [
            { x: safeZone.x, y: safeZone.y },
            { x: safeZone.x + safeZone.width, y: safeZone.y },
            { x: safeZone.x + safeZone.width, y: safeZone.y + safeZone.height },
            { x: safeZone.x, y: safeZone.y + safeZone.height }
        ];
        if (this._lineSegmentIntersection(p1, p2, corners[0], corners[1])) return true;
        if (this._lineSegmentIntersection(p1, p2, corners[1], corners[2])) return true;
        if (this._lineSegmentIntersection(p1, p2, corners[2], corners[3])) return true;
        if (this._lineSegmentIntersection(p1, p2, corners[3], corners[0])) return true;
        return false;
    }

    _getRandomPointOnEdge(canvas) {
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
            case 0: // Top edge
                return { x: Math.random() * canvas.width, y: 0 };
            case 1: // Right edge
                return { x: canvas.width, y: Math.random() * canvas.height };
            case 2: // Bottom edge
                return { x: Math.random() * canvas.width, y: canvas.height };
            case 3: // Left edge
            default:
                return { x: 0, y: Math.random() * canvas.height };
        }
    }
    
    _generateValidLine(canvas, generator) {
        let attempts = 0;
        let points = [];
        const safeZone = getMenuSafeZone(canvas);
        do {
            points = generator(canvas);
            attempts++;
            if (attempts > 20) return []; 
            for (let i = 0; i < points.length - 1; i++) {
                // MODIFIED: Only respect the safe zone if this is a demo AND not in Pollock mode
                if (this.isDemo && this.levelName !== 'Pollock' && this._doesLineIntersectSafeZone(points[i], points[i+1], safeZone)) {
                    points = [];
                    break;
                }
            }
        } while (points.length < 2);
        this.demoLinePoints = points;
        return points.length > 0;
    }

    createDemoLine(canvas) {
        return this._generateValidLine(canvas, () => {
            const p1 = this._getRandomPointOnEdge(canvas);
            let p2;
            do {
                p2 = this._getRandomPointOnEdge(canvas);
            } while (Math.hypot(p1.x - p2.x, p1.y - p2.y) < 400); 
            return [p1, p2];
        });
    }

    createDemoSquiggle(canvas) {
        return this._generateValidLine(canvas, () => {
            const startPoint = this._getRandomPointOnEdge(canvas);
            let endPoint;
            do {
                endPoint = this._getRandomPointOnEdge(canvas);
            } while (Math.hypot(startPoint.x - endPoint.x, startPoint.y - endPoint.y) < 600); 

            const points = [];
            const numSegments = 30;
            const amplitude = (Math.random() * 60) + 30;
            const frequency = (Math.random() * 5) + 3;
            const lineVec = { x: endPoint.x - startPoint.x, y: endPoint.y - startPoint.y };
            const lineLength = Math.hypot(lineVec.x, lineVec.y);
            if (lineLength < 1) return [];
            const normalVec = { x: -lineVec.y / lineLength, y: lineVec.x / lineLength };
            for (let i = 0; i <= numSegments; i++) {
                const t = i / numSegments;
                const pointOnLine = { x: startPoint.x + lineVec.x * t, y: startPoint.y + lineVec.y * t };
                const offset = Math.sin(t * Math.PI * frequency) * amplitude;
                points.push({ x: pointOnLine.x + normalVec.x * offset, y: pointOnLine.y + normalVec.y * offset });
            }
            return points;
        });
    }

    createStrategicTrapLine(canvas) {
        const untrappedBalls = this.balls.filter(b => !b.isBurst);
        if (untrappedBalls.length === 0) return false;
        
        const corners = [
            { x: 0, y: 0 }, { x: canvas.width, y: 0 },
            { x: 0, y: canvas.height }, { x: canvas.width, y: canvas.height }
        ];
        
        let bestTarget = { ball: null, corner: null, dist: Infinity };
        for (const ball of untrappedBalls) {
            for (const corner of corners) {
                const dist = Math.hypot(ball.x - corner.x, ball.y - corner.y);
                if (dist < bestTarget.dist) {
                    bestTarget = { ball, corner, dist };
                }
            }
        }
        
        if (bestTarget.dist > 400) return false;
        
        const c = bestTarget.corner;
        const trapSize = 200 + Math.random() * 150;
        let p1, p2;

        if (c.x === 0 && c.y === 0) { 
            p1 = { x: trapSize, y: 0 }; p2 = { x: 0, y: trapSize };
        } else if (c.x > 0 && c.y === 0) { 
            p1 = { x: canvas.width - trapSize, y: 0 }; p2 = { x: canvas.width, y: trapSize };
        } else if (c.x === 0 && c.y > 0) { 
            p1 = { x: trapSize, y: canvas.height }; p2 = { x: 0, y: canvas.height - trapSize };
        } else { 
            p1 = { x: canvas.width - trapSize, y: canvas.height }; p2 = { x: canvas.width, y: canvas.height - trapSize };
        }
        
        const safeZone = getMenuSafeZone(canvas);
        // MODIFIED: Only respect the safe zone if this is a demo AND not in Pollock mode
        if (this.isDemo && this.levelName !== 'Pollock' && this._doesLineIntersectSafeZone(p1, p2, safeZone)) return false;
        
        this.demoLinePoints = [p1, p2];
        return true;
    }

    useDraw() {
        if (this.isDemo) return true;
        if (this.drawsRemaining > 0) {
            if (this.drawsRemaining !== Infinity) {
                this.drawsRemaining--;
            }
            return true;
        }
        return false;
    }

    _drawCrayonText(ctx, text, x, y, fontSize, color) {
        ctx.save();
        ctx.font = `${fontSize}px 'Press Start 2P', cursive`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;

        ctx.fillText(text, x, y);
        ctx.restore();
    }


    drawUI(ctx, canvas) {
        if (this.isDemo) return;
        ctx.save();
        
        // Dynamic UI sizing based on screen width
        const isMobile = canvas.width <= 768;
        const uiFontSize = isMobile ? 16 : 20;
        // MODIFIED: Use a clean, fixed Y position now that the HTML title is hidden
        const uiYPosition = 35; 
        const uiXMargin = isMobile ? 15 : 20;

        ctx.font = `${uiFontSize}px 'Press Start 2P', cursive`;
        ctx.fillStyle = "#0f172a";
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        ctx.textAlign = "left";
        // Uses dynamic variables for responsive positioning
        ctx.fillText(`Time: ${this.timeRemaining}`, uiXMargin, uiYPosition);

        ctx.textAlign = "right";
        const drawsText = this.drawsRemaining === Infinity ? '∞' : this.drawsRemaining;
        // Uses dynamic variables for responsive positioning
        ctx.fillText(`${this.levelName}   Draws: ${drawsText}`, canvas.width - uiXMargin, uiYPosition);
        
        ctx.restore();

        if (this.isGameOver) {
            ctx.fillStyle = "rgba(15, 23, 42, 0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}