// No longer need to import assets
// import { assets } from './assets.js';

export class Ball {
    constructor(x, y, radius, settings) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        // this.image = assets.getAsset('duck'); // REMOVED
        
        const speed = Math.random() * (settings.ballSpeedRange[1] - settings.ballSpeedRange[0]) + settings.ballSpeedRange[0];
        const angle = Math.random() * Math.PI * 2;
        this.dx = Math.cos(angle) * speed;
        this.dy = Math.sin(angle) * speed;
        // this.rotation = angle; // REMOVED

        this.repelRadius = settings.cursorRepelRadius;
        this.repelStrength = settings.cursorRepelStrength;
        this.maxSpeed = settings.ballMaxSpeed;
        
        this.isBurst = false;
        this.collidedThisFrame = false;
        this.collisionHistory = [];
        this.lowSpeedFrames = 0;
        this.particlesCreated = false;
        
        this.TRAP_CHECK_FRAMES = 120;
        this.TRAP_COLLISION_THRESHOLD = 60;
        this.STUCK_SPEED_THRESHOLD = 1.5;
        this.STUCK_FRAMES_THRESHOLD = 30;
    }

    draw(ctx) {
        if (this.isBurst) return;

        // --- DYNAMIC DRAWING LOGIC ---

        // 1. Draw the main body (a vibrant yellow circle)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#facc15'; // Vibrant Yellow
        ctx.fill();
        ctx.closePath();

        // 2. Draw the whites of the eyes
        const eyeRadius = this.radius * 0.25;
        const eyeOffsetX = this.radius * 0.4;
        const eyeOffsetY = this.radius * 0.2;
        const leftEyeX = this.x - eyeOffsetX;
        const rightEyeX = this.x + eyeOffsetX;
        const eyeY = this.y - eyeOffsetY;

        ctx.beginPath();
        ctx.arc(leftEyeX, eyeY, eyeRadius, 0, Math.PI * 2);
        ctx.arc(rightEyeX, eyeY, eyeRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();

        // 3. Calculate pupil position based on velocity
        const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        let dirX = 0;
        let dirY = 0;
        if (speed > 0.1) {
            dirX = this.dx / speed;
            dirY = this.dy / speed;
        }
        
        const maxLookDist = eyeRadius * 0.5;
        const lookDist = Math.min(speed / 4, maxLookDist);
        
        const pupilRadius = eyeRadius * 0.5;
        const leftPupilX = leftEyeX + dirX * lookDist;
        const rightPupilX = rightEyeX + dirX * lookDist;
        const pupilY = eyeY + dirY * lookDist;

        // 4. Draw the pupils
        ctx.beginPath();
        ctx.arc(leftPupilX, pupilY, pupilRadius, 0, Math.PI * 2);
        ctx.arc(rightPupilX, pupilY, pupilRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    }

    // The update, checkIfTrapped, and _handleCursorRepulsion methods remain the same
    update(canvas, mousePos, boundaryHandler) {
        if (this.isBurst) return;

        this.collidedThisFrame = false;
        this._handleCursorRepulsion(mousePos);

        let speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        if (speed > this.maxSpeed) {
            this.dx = (this.dx / speed) * this.maxSpeed;
            this.dy = (this.dy / speed) * this.maxSpeed;
            speed = this.maxSpeed;
        }

        const substeps = Math.ceil(speed / (this.radius * 0.5)) + 1;
        const stepDx = this.dx / substeps;
        const stepDy = this.dy / substeps;

        for (let i = 0; i < substeps; i++) {
            this.x += stepDx;
            this.y += stepDy;

            const boundaryCollision = boundaryHandler.checkAndResolveCollision(this);
            if (boundaryCollision) break;

            let wallCollision = false;
            if (this.x + this.radius > canvas.width) {
                this.x = canvas.width - this.radius;
                this.dx *= -1;
                wallCollision = true;
            } else if (this.x - this.radius < 0) {
                this.x = this.radius;
                this.dx *= -1;
                wallCollision = true;
            }

            if (this.y + this.radius > canvas.height) {
                this.y = canvas.height - this.radius;
                this.dy *= -1;
                wallCollision = true;
            } else if (this.y - this.radius < 0) {
                this.y = this.radius;
                this.dy *= -1;
                wallCollision = true;
            }
            
            if (wallCollision) {
                this.collidedThisFrame = true;
                break;
            }
        }
    }
    
    checkIfTrapped() {
        if (this.isBurst) return;

        this.collisionHistory.push(this.collidedThisFrame);
        if (this.collisionHistory.length > this.TRAP_CHECK_FRAMES) {
            this.collisionHistory.shift();
        }
        const collisionCount = this.collisionHistory.filter(c => c).length;
        const isBouncingFrantically = collisionCount >= this.TRAP_COLLISION_THRESHOLD;

        const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        if (speed < this.STUCK_SPEED_THRESHOLD && this.collidedThisFrame) {
            this.lowSpeedFrames++;
        } else {
            this.lowSpeedFrames = 0;
        }
        const isStuck = this.lowSpeedFrames >= this.STUCK_FRAMES_THRESHOLD;

        if (isBouncingFrantically || isStuck) {
            this.isBurst = true;
        }
    }

    _handleCursorRepulsion(mousePos) {
        if (!mousePos) return;
        const toCursor = { x: mousePos.x - this.x, y: mousePos.y - this.y };
        const distance = Math.sqrt(toCursor.x * toCursor.x + toCursor.y * toCursor.y);
        if (distance > 0 && distance < this.repelRadius) {
            const force = this.repelStrength / (distance * distance);
            const directionAway = { x: -toCursor.x / distance, y: -toCursor.y / distance };
            this.dx += directionAway.x * force;
            this.dy += directionAway.y * force;
        }
    }
}