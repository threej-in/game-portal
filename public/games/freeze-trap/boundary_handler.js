export class BoundaryHandler {
    constructor() {
        // MODIFIED: The array will now store objects with points and a color
        this.boundaries = [];
    }

    addBoundary(lineObject) {
        // MODIFIED: We now add a complete line object
        if (lineObject && lineObject.points && lineObject.points.length > 1) {
            this.boundaries.push(lineObject);
        }
    }

    /**
     * Checks a single ball against all boundary lines and resolves the first collision found.
     * @param {Ball} ball The ball to check.
     * @returns {boolean} True if a collision occurred, otherwise false.
     */
    checkAndResolveCollision(ball) {
        if (ball.isBurst) return false;

        // MODIFIED: Loop through the boundary objects to get the points
        for (const boundary of this.boundaries) {
            const linePoints = boundary.points;
            for (let i = 0; i < linePoints.length - 1; i++) {
                const p1 = linePoints[i];
                const p2 = linePoints[i + 1];
                
                if (this._checkSegmentCollision(ball, p1, p2)) {
                    return true; // Collision detected and resolved
                }
            }
        }
        return false; // No collision with any boundary
    }
    
    /**
     * Helper function to check and resolve a collision between a ball and a single line segment.
     * @returns {boolean} True if a collision occurred, otherwise false.
     */
    _checkSegmentCollision(ball, p1, p2) {
        const lineVec = { x: p2.x - p1.x, y: p2.y - p1.y };
        const pointVec = { x: ball.x - p1.x, y: ball.y - p1.y };
        const lineLenSq = lineVec.x * lineVec.x + lineVec.y * lineVec.y;
        if (lineLenSq === 0) return false;

        const t = Math.max(0, Math.min(1, (pointVec.x * lineVec.x + pointVec.y * lineVec.y) / lineLenSq));
        const closestPoint = { x: p1.x + t * lineVec.x, y: p1.y + t * lineVec.y };
        const distVec = { x: ball.x - closestPoint.x, y: ball.y - closestPoint.y };
        const distSq = distVec.x * distVec.x + distVec.y * distVec.y;

        if (distSq > 0 && distSq < ball.radius * ball.radius) {
            ball.collidedThisFrame = true;
            const distance = Math.sqrt(distSq);
            const overlap = ball.radius - distance;
            const normal = { x: distVec.x / distance, y: distVec.y / distance };

            // Push the ball out of the line to prevent sinking
            ball.x += normal.x * overlap;
            ball.y += normal.y * overlap;
            
            // Reflect the velocity
            const dotProduct = ball.dx * normal.x + ball.dy * normal.y;
            ball.dx -= 2 * dotProduct * normal.x;
            ball.dy -= 2 * dotProduct * normal.y;
            
            return true; // Collision occurred
        }
        return false; // No collision
    }
}