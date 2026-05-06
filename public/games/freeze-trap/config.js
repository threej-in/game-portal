// config.js

// These are now the STARTING values for level 1
export const BALL_RADIUS = 20;
export const MAX_LINE_LENGTH = 1000;

// Shared effects
export const PARTICLE_COUNT = 80;

/**
 * Generates an array of level configurations.
 * @param {number} count The number of levels to generate.
 * @returns {object[]} An array of level objects.
 */
function generateLevels(count) {
    const levels = [];
    const baseLevel = {
        timeLimit: 60,
        numBalls: 1,
        drawsAllowed: 15,
        ballSpeedRange: [4, 5],
        cursorRepelStrength: 100,
        drawDelay: 0,
        ballRadius: BALL_RADIUS,
        maxLineLength: MAX_LINE_LENGTH,
    };

    for (let i = 0; i < count; i++) {
        const progress = i / (count - 1); // A value from 0 to 1 representing game completion
        
        // MODIFIED: Use a square root curve. This is steep at the start and flattens out,
        // making the difficulty increase noticeable from the very first levels.
        const difficultyCurve = Math.sqrt(progress);

        const newLevel = { ...baseLevel };
        newLevel.levelName = `Level ${i + 1}`;

        // --- Parameter Interpolation ---
        // Lerp (Linear Interpolation) function: start + (end - start) * progress
        
        // Time gets shorter (60s -> 20s)
        newLevel.timeLimit = Math.round(60 - 40 * difficultyCurve);

        // Number of balls increases (1 -> 10)
        newLevel.numBalls = 1 + Math.floor(9 * difficultyCurve);

        // Draws allowed decreases (15 -> 5)
        newLevel.drawsAllowed = 15 - Math.floor(10 * difficultyCurve);
        
        // Ball speed increases ([4,5] -> [12,15])
        const minSpeed = 4 + 8 * difficultyCurve;
        newLevel.ballSpeedRange = [minSpeed, minSpeed + 3];
        newLevel.ballMaxSpeed = 15 + 25 * difficultyCurve;
        
        // Repulsion gets stronger (100 -> 600)
        newLevel.cursorRepelStrength = 100 + 500 * difficultyCurve;
        newLevel.cursorRepelRadius = 120 + 180 * difficultyCurve;
        
        // --- YOUR NEW IDEAS ---
        // These later-game changes can keep their more gradual curves.
        // Ball radius gets smaller (20 -> 12) - starts shrinking after level 20
        if (i > 20) {
            const shrinkProgress = (i - 20) / (count - 1 - 20);
            newLevel.ballRadius = 20 - Math.floor(8 * Math.pow(shrinkProgress, 2));
        }

        // Max line length gets shorter (1000 -> 400) - starts shrinking after level 40
        if (i > 40) {
            const lineProgress = (i - 40) / (count - 1 - 40);
            newLevel.maxLineLength = 1000 - Math.floor(600 * Math.pow(lineProgress, 1.5));
        }
        
        // --- THEMED CHALLENGES ---
        // Draw delay is introduced after level 10
        if (i > 10) {
            const delayProgress = (i - 10) / (count - 1 - 10);
            newLevel.drawDelay = Math.floor(120 * delayProgress); // Up to 2-second delay
        }

        levels.push(newLevel);
    }
    return levels;
}

// Export the generated array of 100 levels
export const LEVELS = generateLevels(100);